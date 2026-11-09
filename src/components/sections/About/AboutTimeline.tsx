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
          <h2 id="journey-heading" className="mt-3 font-display text-3xl font-bold leading-tight sm:text-5xl">
            Remarkable growth in the printing industry.
          </h2>
        </Reveal>

        <ol ref={listRef} className="relative mt-16 space-y-16 pl-10 sm:pl-16">
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
                <p className="text-outline-light font-display text-5xl font-black leading-none sm:text-7xl">{milestone.year}</p>
                <h3 className="mt-3 font-display text-xl font-bold sm:text-3xl">{milestone.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">{milestone.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
