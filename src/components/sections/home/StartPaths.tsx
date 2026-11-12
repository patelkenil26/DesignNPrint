'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import LinkButton from '@/components/shared/LinkButton';
import Reveal from '@/components/shared/Reveal';
import { startPaths, type BrandAccent } from '@/data/homeData';
import { buildWhatsAppLink } from '@/data/siteConfig';

/** Panel tint per path, so switching the toggle visibly changes the mood. */
const pathAccents: BrandAccent[] = ['yellow', 'blue'];

/** "I have a design" vs "I need a design" — a toggle that swaps the whole panel and redraws the step timeline. */
export default function StartPaths() {
  const [activeIndex, setActiveIndex] = useState(0);
  const path = startPaths[activeIndex] ?? startPaths[0];
  const accentColor = `var(--color-brand-${pathAccents[activeIndex] ?? 'yellow'})`;

  return (
    <section className="bg-paper pt-20 sm:pt-28" aria-labelledby="start-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">Start your project</p>
          <h2 id="start-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-5xl">
            Two ways to begin. Both end with a print you&apos;re proud of.
          </h2>
        </Reveal>

        <div role="tablist" aria-label="How do you want to start?" className="relative mt-10 inline-flex rounded-full bg-paper-deep p-1.5">
          {startPaths.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`start-tab-${item.id}`}
                aria-selected={isActive}
                aria-controls="start-panel"
                onClick={() => setActiveIndex(index)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue sm:px-7 ${
                  isActive ? 'text-white' : 'text-ink/65 hover:text-ink'
                }`}
              >
                {isActive && (
                  <motion.span layoutId="start-toggle-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">{item.title}</span>
              </button>
            );
          })}
        </div>

        <div
          id="start-panel"
          role="tabpanel"
          aria-labelledby={`start-tab-${path.id}`}
          className="relative mt-6 overflow-hidden rounded-[2rem] p-7 transition-colors duration-700 sm:p-12"
          style={{ backgroundColor: `color-mix(in srgb, ${accentColor} 22%, var(--color-paper))` }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={path.id}
              className="grid gap-10 lg:grid-cols-2 lg:gap-16"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-col">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/60">{path.eyebrow}</p>
                <h3 className="mt-3 font-display text-3xl font-bold text-ink sm:text-5xl">{path.title}</h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-ink/75">{path.body}</p>
                <div className="mt-8">
                  <LinkButton href={buildWhatsAppLink(path.whatsappMessage)} isExternal variant="whatsapp">
                    <MessageCircle className="h-4 w-4" /> {path.ctaLabel}
                  </LinkButton>
                </div>
              </div>

              {/* timeline: the line draws itself down, each step lands in turn */}
              <ol className="relative space-y-5 pl-14">
                <motion.span
                  className="absolute bottom-6 left-[1.05rem] top-6 w-0.5 origin-top bg-ink/70"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.9, delay: 0.2, ease: 'easeInOut' }}
                  aria-hidden="true"
                />
                {path.steps.map((step, stepIndex) => (
                  <motion.li
                    key={step}
                    className="relative rounded-2xl bg-white/80 px-5 py-4 text-base font-semibold text-ink shadow-sm"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 + stepIndex * 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="absolute -left-14 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink font-display text-sm font-bold text-white">
                      {stepIndex + 1}
                    </span>
                    {step}
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
