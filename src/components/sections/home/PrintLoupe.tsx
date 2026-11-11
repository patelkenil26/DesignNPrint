'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { Search } from 'lucide-react';
import { loupePrints } from '@/data/homeData';

/** How many times the lens magnifies the print. */
const ZOOM = 3;

/** One layer of halftone dots; each ink is printed at its own screen angle, which is what makes the rosette pattern. */
const dotPlates = [
  { id: 'cyan', color: 'var(--color-brand-blue)', angle: 15 },
  { id: 'magenta', color: 'var(--color-brand-red)', angle: 75 },
  { id: 'yellow', color: 'var(--color-brand-yellow)', angle: 0 },
  { id: 'black', color: 'var(--color-ink)', angle: 45 },
] as const;

/**
 * "Look closer" — a printer's loupe glides over a real print. Under the glass the image is magnified and, with the
 * switch on, shown as the four overlapping halftone dot screens that offset printing is made of.
 * It wanders by itself until you take over with a mouse or finger.
 */
export default function PrintLoupe() {
  const prefersReducedMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageSize, setStageSize] = useState(480);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showDots, setShowDots] = useState(true);
  const [isHandsOn, setIsHandsOn] = useState(false);
  const activePrint = loupePrints[activeIndex];

  const lensSize = Math.round(Math.min(220, Math.max(120, stageSize * 0.34)));
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const lensX = useSpring(rawX, { stiffness: 120, damping: 20 });
  const lensY = useSpring(rawY, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(([entry]) => setStageSize(entry.contentRect.width));
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  /** while nobody is touching it, the loupe drifts along a slow figure-of-eight */
  useAnimationFrame((time) => {
    if (isHandsOn || prefersReducedMotion) return;
    rawX.set(0.5 + 0.3 * Math.sin(time / 2100));
    rawY.set(0.5 + 0.28 * Math.sin(time / 1500 + 1));
  });

  const lensLeft = useTransform(lensX, (value) => value * stageSize - lensSize / 2);
  const lensTop = useTransform(lensY, (value) => value * stageSize - lensSize / 2);
  const backgroundPosition = useTransform([lensX, lensY], ([x, y]: number[]) =>
    `${-(x * stageSize * ZOOM - lensSize / 2)}px ${-(y * stageSize * ZOOM - lensSize / 2)}px`,
  );

  const followPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage) return;
    const bounds = stage.getBoundingClientRect();
    rawX.set(Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width)));
    rawY.set(Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height)));
  };

  return (
    <section className="bg-studio-dark relative overflow-hidden text-white" aria-labelledby="loupe-heading">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 sm:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-28">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-yellow">Under the loupe</p>
          <h2 id="loupe-heading" className="mt-3 font-display text-3xl font-bold leading-tight sm:text-5xl">
            Quality lives in the details. Look closer.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
            Every job is judged up close — fine text, codes and colour. Take the loupe over real work from our press.
          </p>

          <div role="tablist" aria-label="Choose a print" className="mt-8 flex flex-wrap gap-2">
            {loupePrints.map((print, index) => (
              <button
                key={print.id}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                onClick={() => setActiveIndex(index)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow ${
                  index === activeIndex ? 'border-brand-yellow bg-brand-yellow text-ink' : 'border-white/20 text-white/80 hover:border-white/50'
                }`}
              >
                {print.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={activePrint.id}
              className="mt-5 min-h-12 max-w-md text-sm leading-relaxed text-white/80"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              aria-live="polite"
            >
              {activePrint.note}
            </motion.p>
          </AnimatePresence>

          <button
            type="button"
            role="switch"
            aria-checked={showDots}
            onClick={() => setShowDots((current) => !current)}
            className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] py-2 pl-2 pr-5 text-sm font-semibold transition-colors hover:border-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
          >
            <span className={`relative h-6 w-11 rounded-full transition-colors ${showDots ? 'bg-brand-yellow' : 'bg-white/20'}`}>
              <span className={`absolute top-1 h-4 w-4 rounded-full bg-ink transition-all ${showDots ? 'left-6' : 'left-1'}`} />
            </span>
            Show the halftone dots
          </button>
        </div>

        <div
          ref={stageRef}
          onPointerEnter={() => setIsHandsOn(true)}
          onPointerMove={followPointer}
          onPointerLeave={() => setIsHandsOn(false)}
          onPointerDown={(event) => {
            setIsHandsOn(true);
            followPointer(event);
          }}
          className="relative mx-auto aspect-square w-full max-w-[34rem] cursor-none touch-pan-y select-none lg:max-w-none"
        >
          <div className="absolute -inset-4 rounded-[2.5rem] bg-brand-yellow/10 blur-3xl" aria-hidden="true" />

          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={activePrint.id}
              className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src={activePrint.image} alt={activePrint.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" priority />
            </motion.div>
          </AnimatePresence>

          {/* the loupe */}
          <motion.div
            className="pointer-events-none absolute left-0 top-0 overflow-hidden rounded-full border-[5px] border-white/90 shadow-[0_20px_60px_-10px_color-mix(in_srgb,black_70%,transparent),inset_0_0_30px_color-mix(in_srgb,black_35%,transparent)]"
            style={{
              width: lensSize,
              height: lensSize,
              x: lensLeft,
              y: lensTop,
              backgroundImage: `url(${activePrint.image})`,
              backgroundSize: `${stageSize * ZOOM}px ${stageSize * ZOOM}px`,
              backgroundPosition,
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'var(--color-paper)',
            }}
            aria-hidden="true"
          >
            {/* halftone screens, each rotated to its own angle */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${showDots ? 'opacity-100' : 'opacity-0'}`}>
              <span className="absolute inset-0 bg-paper/55" />
              {dotPlates.map((plate) => (
                <span
                  key={plate.id}
                  className="absolute -inset-1/2 mix-blend-multiply"
                  style={{
                    transform: `rotate(${plate.angle}deg)`,
                    backgroundImage: `radial-gradient(circle at center, ${plate.color} 0 34%, transparent 36%)`,
                    backgroundSize: '9px 9px',
                    opacity: plate.id === 'black' ? 0.55 : 0.75,
                  }}
                />
              ))}
            </div>
            {/* glass reflection + cross-hair */}
            <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,color-mix(in_srgb,white_40%,transparent),transparent_45%)]" />
            <span className="absolute left-1/2 top-1/2 h-px w-8 -translate-x-1/2 bg-ink/40" />
            <span className="absolute left-1/2 top-1/2 h-8 w-px -translate-y-1/2 bg-ink/40" />
          </motion.div>

          <span className="pointer-events-none absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-ink/75 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur">
            <Search className="h-3.5 w-3.5 text-brand-yellow" /> {ZOOM}× loupe
          </span>
        </div>
      </div>
    </section>
  );
}
