'use client';

import dynamic from 'next/dynamic';
import { pressSteps } from '@/data/homeData';
import { useChapterIndex, useScrollTrack } from '@/lib/useScrollTrack';

const PressScene = dynamic(() => import('@/components/three/PressScene'), { ssr: false });

const stepStarts = pressSteps.map((step) => step.start);

export default function PressProcess() {
  const { trackRef, stickyRef, getProgress } = useScrollTrack();
  const activeIndex = useChapterIndex(getProgress, stepStarts);

  return (
    <section ref={trackRef} className="relative h-[520vh]" aria-labelledby="press-heading">
      <div
        ref={stickyRef}
        className="bg-studio sticky top-[var(--nav-height)] h-[calc(100svh-var(--nav-height))] w-full overflow-hidden"
      >
        <PressScene getProgress={getProgress} />

        <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-between px-5 py-8 sm:px-10 lg:py-14">
          <div className="max-w-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">Inside the press</p>
            <h2 id="press-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-5xl">
              From blank sheet to brilliant print.
            </h2>
          </div>

          <ol className="grid max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {pressSteps.map((step, index) => {
              const isActive = index === activeIndex;
              return (
                <li
                  key={step.id}
                  className={`rounded-2xl border p-4 backdrop-blur-md transition-all duration-500 ${
                    isActive
                      ? 'border-ink bg-ink text-white shadow-xl'
                      : 'border-ink/10 bg-white/60 text-ink/60'
                  } ${isActive ? '' : 'max-sm:hidden'}`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  <span className={`font-display text-sm font-bold ${isActive ? 'text-brand-yellow' : 'text-ink/40'}`}>
                    {step.number}
                  </span>
                  <h3 className="mt-1 text-sm font-semibold">{step.title}</h3>
                  <p
                    className={`mt-1 overflow-hidden text-xs leading-relaxed transition-all duration-500 ${
                      isActive ? 'max-h-32 opacity-80' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {step.body}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
