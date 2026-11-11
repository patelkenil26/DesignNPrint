'use client';

import { useRef, useState } from 'react';
import { finishOptions, type FinishId } from '@/data/homeData';
import { siteConfig } from '@/data/siteConfig';

/** Tiny noise texture (SVG turbulence) that gives the velvet finish its fine grain. */
const GRAIN_TEXTURE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/></filter><rect width='160' height='160' filter='url(%23n)'/></svg>\")";

/** Classes for the big logo mark on the card, per finish — this is where each finish looks different. */
const markClassByFinish: Record<FinishId, string> = {
  velvet: 'text-white/90',
  spotUv:
    'text-white/10 [background-image:radial-gradient(circle_at_var(--sheen-x)_var(--sheen-y),white_0%,color-mix(in_srgb,white_30%,transparent)_18%,transparent_42%)] [-webkit-background-clip:text] [background-clip:text] [-webkit-text-fill-color:transparent]',
  foil:
    '[background-image:linear-gradient(115deg,var(--color-foil)_0%,var(--color-foil-light)_calc(var(--sheen-x)_-_8%),white_var(--sheen-x),var(--color-foil-light)_calc(var(--sheen-x)_+_8%),var(--color-foil)_100%)] [-webkit-background-clip:text] [background-clip:text] [-webkit-text-fill-color:transparent]',
  emboss:
    'text-ink-soft [text-shadow:var(--shade-x,-2px)_var(--shade-y,-2px)_1px_color-mix(in_srgb,black_65%,transparent),calc(var(--shade-x,-2px)*-1)_calc(var(--shade-y,-2px)*-1)_1px_color-mix(in_srgb,white_60%,transparent)]',
};

const cardSurfaceByFinish: Record<FinishId, string> = {
  velvet: 'bg-ink-soft',
  spotUv: 'bg-ink-soft',
  foil: 'bg-ink',
  emboss: 'bg-paper-deep',
};

/** Pointer-driven light on a CSS card: no WebGL, so it stays smooth on any phone. */
function FinishCard({ finish }: { finish: FinishId }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isPointerOver, setIsPointerOver] = useState(false);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    const percentX = ((event.clientX - bounds.left) / bounds.width) * 100;
    const percentY = ((event.clientY - bounds.top) / bounds.height) * 100;
    card.style.setProperty('--sheen-x', `${percentX}%`);
    card.style.setProperty('--sheen-y', `${percentY}%`);
    card.style.setProperty('--shade-x', `${(percentX - 50) * 0.08}px`);
    card.style.setProperty('--shade-y', `${(percentY - 50) * 0.08}px`);
    card.style.setProperty('--tilt-x', `${(percentY - 50) * -0.18}deg`);
    card.style.setProperty('--tilt-y', `${(percentX - 50) * 0.18}deg`);
  };

  const resetCard = () => {
    const card = cardRef.current;
    setIsPointerOver(false);
    card?.style.removeProperty('--tilt-x');
    card?.style.removeProperty('--tilt-y');
    card?.style.removeProperty('--shade-x');
    card?.style.removeProperty('--shade-y');
  };

  return (
    <div className="[perspective:1000px]">
      <div
        ref={cardRef}
        onPointerEnter={() => setIsPointerOver(true)}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetCard}
        className={`relative mx-auto aspect-[1.75/1] w-full max-w-[34rem] touch-none select-none overflow-hidden rounded-3xl shadow-2xl transition-[transform,background-color] duration-300 ease-out [transform:rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))] ${cardSurfaceByFinish[finish]} ${
          isPointerOver ? '' : 'animate-sheen-sweep'
        }`}
        role="img"
        aria-label={`${siteConfig.name} visiting card with a ${finish} finish`}
      >
        {/* paper grain — strong on velvet, whisper-light elsewhere */}
        <span
          className={`absolute inset-0 mix-blend-overlay transition-opacity duration-500 ${finish === 'velvet' ? 'opacity-40' : 'opacity-10'}`}
          style={{ backgroundImage: GRAIN_TEXTURE }}
          aria-hidden="true"
        />
        {/* soft light that follows the pointer */}
        <span
          className={`absolute inset-0 transition-opacity duration-500 ${finish === 'velvet' ? 'opacity-25' : 'opacity-60'}`}
          style={{
            background:
              'radial-gradient(circle at var(--sheen-x, 50%) var(--sheen-y, 50%), color-mix(in srgb, white 35%, transparent), transparent 55%)',
          }}
          aria-hidden="true"
        />
        <span className="cmyk-strip absolute inset-x-0 bottom-0 h-2" aria-hidden="true" />

        <div className="relative flex h-full flex-col justify-between p-6 sm:p-9">
          <p
            key={finish}
            className={`animate-fade-up font-display text-4xl font-black leading-[0.95] tracking-tight sm:text-6xl ${markClassByFinish[finish]}`}
          >
            DESIGN
            <br />N PRINT
          </p>
          <p
            className={`text-[10px] font-semibold uppercase tracking-[0.3em] sm:text-xs ${
              finish === 'emboss' ? 'text-ink/50' : 'text-white/50'
            }`}
          >
            {siteConfig.location}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FinishesLab() {
  const [activeFinish, setActiveFinish] = useState<FinishId>('velvet');
  const activeOption = finishOptions.find((option) => option.id === activeFinish) ?? finishOptions[0];

  return (
    <section className="bg-studio-dark relative overflow-hidden text-white" aria-labelledby="finishes-heading">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 sm:px-10 lg:min-h-[40rem] lg:grid-cols-2 lg:py-28">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-yellow">Finishes Lab</p>
          <h2 id="finishes-heading" className="mt-3 font-display text-3xl font-bold leading-tight sm:text-5xl">
            Don&apos;t just read about finishes. Feel them.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
            Pick a finish, then move your cursor (or drag your finger) over the card — watch how real print finishes catch the light.
          </p>

          <div role="radiogroup" aria-label="Print finish" className="mt-8 grid gap-3 sm:grid-cols-2">
            {finishOptions.map((option) => {
              const isActive = option.id === activeFinish;
              return (
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => setActiveFinish(option.id)}
                  className={`rounded-2xl border px-4 py-3.5 text-left transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
                    isActive
                      ? 'border-brand-yellow bg-white/10 shadow-lg'
                      : 'border-white/15 bg-white/[0.03] hover:border-white/40'
                  }`}
                >
                  <span className="block text-sm font-semibold">{option.name}</span>
                  <span className="mt-0.5 block text-xs text-white/60">{option.tagline}</span>
                </button>
              );
            })}
          </div>

          <p className="mt-6 min-h-12 max-w-md text-sm leading-relaxed text-white/75" aria-live="polite">
            {activeOption.description}
          </p>
        </div>

        <FinishCard finish={activeFinish} />
      </div>
    </section>
  );
}
