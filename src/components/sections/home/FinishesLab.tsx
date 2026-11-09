'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { finishOptions, FinishId } from '@/data/homeData';

const FinishCardScene = dynamic(() => import('@/components/three/FinishCardScene'), { ssr: false });

export default function FinishesLab() {
  const [activeFinish, setActiveFinish] = useState<FinishId>('velvet');
  const activeOption = finishOptions.find((option) => option.id === activeFinish) ?? finishOptions[0];

  return (
    <section className="bg-studio-dark relative overflow-hidden text-white" aria-labelledby="finishes-heading">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-20 sm:px-10 lg:min-h-[44rem] lg:grid-cols-2 lg:py-28">
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

        <div className="relative h-[22rem] sm:h-[30rem] lg:h-[34rem]">
          <FinishCardScene finish={activeFinish} />
        </div>
      </div>
    </section>
  );
}
