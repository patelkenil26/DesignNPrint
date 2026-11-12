'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import Reveal from '@/components/shared/Reveal';
import { timelineMilestones } from '@/data/aboutData';

const timelineGradient =
  'linear-gradient(180deg, var(--color-brand-red), var(--color-brand-yellow), var(--color-brand-green), var(--color-brand-blue))';

/** Our journey — a four-colour line that is "printed" down the page as you scroll. */
export default function AboutTimeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.7', 'end 0.55'] });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.4 });

  return (
    <section className="bg-studio-dark py-16 text-white sm:py-28" aria-labelledby="journey-heading">
      <div className="mx-auto max-w-5xl px-5 sm:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-yellow">Our journey</p>
          <h2 id="journey-heading" className="mt-3 text-balance font-display text-3xl font-bold leading-tight sm:text-5xl">
            Remarkable growth in the printing industry.
          </h2>
        </Reveal>

        <ol ref={listRef} className="relative mt-12 space-y-10 pl-10 sm:mt-16 sm:space-y-16 sm:pl-16">
          <span className="absolute left-[7px] top-0 h-full w-0.5 bg-white/15 sm:left-[11px]" aria-hidden="true" />
          <motion.span
            aria-hidden="true"
            className="absolute left-[7px] top-0 h-full w-0.5 origin-top sm:left-[11px]"
            style={{ background: timelineGradient, scaleY: prefersReducedMotion ? 1 : lineProgress }}
          />

          {timelineMilestones.map((milestone, index) => (
            <li key={milestone.id} className="relative">
              <motion.span
                aria-hidden="true"
                className="absolute -left-10 top-3 h-4 w-4 rounded-full border-2 border-brand-yellow bg-ink sm:-left-16 sm:top-5 sm:h-6 sm:w-6"
                initial={prefersReducedMotion ? false : { scale: 0.4, backgroundColor: 'var(--color-ink)' }}
                whileInView={{ scale: 1, backgroundColor: 'var(--color-brand-yellow)' }}
                viewport={{ once: true, margin: '-35% 0px -35% 0px' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
              <Reveal delay={index * 0.05}>
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
                  <p className="relative font-display text-5xl font-black leading-none sm:text-7xl">
                    <span className="text-outline-light block">{milestone.year}</span>
                    {/* fills with the four inks once the milestone is on screen */}
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-0 block bg-clip-text text-transparent"
                      style={{ backgroundImage: timelineGradient.replace('180deg', '90deg') }}
                      initial={prefersReducedMotion ? false : { opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: '-30% 0px -30% 0px' }}
                      transition={{ duration: 0.9 }}
                    >
                      {milestone.year}
                    </motion.span>
                  </p>
                  <h3 className="mt-3 font-display text-xl font-bold sm:text-3xl">{milestone.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">{milestone.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
