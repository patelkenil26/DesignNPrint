'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Reveal from '@/components/shared/Reveal';
import { quoteChecklist } from '@/data/contactData';

/** Six things that make a quote come back faster — each tick is drawn in as the card appears. */
export default function QuoteChecklist() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-studio-dark text-white" aria-labelledby="checklist-heading">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-10 sm:py-24">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-yellow">Before you send</p>
          <h2 id="checklist-heading" className="mt-3 font-display text-3xl font-bold leading-tight sm:text-5xl">
            Quotes come back faster when you include these.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/70">
            Do not worry if you do not know everything — tell us what you have and we will help with the rest.
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quoteChecklist.map((item, index) => (
            <li key={item.id}>
              <Reveal delay={(index % 3) * 0.08} className="h-full">
                <div className="flex h-full gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.08]">
                  <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-ink">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <motion.path
                        d="M5 12.5l4.5 4.5L19 7.5"
                        initial={prefersReducedMotion ? false : { pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, delay: 0.35 + index * 0.12, ease: 'easeOut' }}
                      />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/65">{item.detail}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
