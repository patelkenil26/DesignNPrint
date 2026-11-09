'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { storyHighlights } from '@/data/aboutData';

const cardPoses = [
  { rotate: -4, rise: [60, -30], className: 'left-0 top-0 sm:left-2', ink: 'var(--color-brand-blue)' },
  { rotate: 3, rise: [90, -50], className: 'right-0 top-[7.5rem] sm:right-2 sm:top-36', ink: 'var(--color-brand-red)' },
  { rotate: -2, rise: [120, -70], className: 'left-4 top-[15rem] sm:left-10 sm:top-72', ink: 'var(--color-brand-yellow)' },
] as const;

/** Three "proof sheets" that drift into a stack at different speeds as the section scrolls past. */
export default function StoryStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });

  const firstRise = useTransform(scrollYProgress, [0, 1], [...cardPoses[0].rise]);
  const secondRise = useTransform(scrollYProgress, [0, 1], [...cardPoses[1].rise]);
  const thirdRise = useTransform(scrollYProgress, [0, 1], [...cardPoses[2].rise]);
  const risers = [firstRise, secondRise, thirdRise];

  return (
    <div ref={containerRef} className="relative mx-auto h-[28rem] w-full max-w-md sm:h-[34rem]">
      {storyHighlights.map((highlight, index) => {
        const pose = cardPoses[index];
        return (
          <motion.article
            key={highlight.id}
            className={`absolute w-[85%] rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-ink/10 sm:w-[80%] sm:p-7 ${pose.className}`}
            style={{ y: prefersReducedMotion ? 0 : risers[index], rotate: pose.rotate, zIndex: index + 1 }}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="absolute inset-x-0 top-0 h-1.5 rounded-t-2xl" style={{ backgroundColor: pose.ink }} />
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted">
              0{index + 1} — {highlight.label}
            </p>
            <h3 className="mt-3 font-display text-xl font-bold text-ink sm:text-2xl">{highlight.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{highlight.body}</p>
          </motion.article>
        );
      })}
    </div>
  );
}
