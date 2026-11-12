'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { storyHighlights } from '@/data/aboutData';

/** Phones: each card pins a little lower than the one before, so the three sheets pile up as you scroll. */
const phoneStackTops = [
  'max-sm:top-[calc(var(--nav-height)+1rem)]',
  'max-sm:top-[calc(var(--nav-height)+1.9rem)]',
  'max-sm:top-[calc(var(--nav-height)+2.8rem)]',
] as const;

/** `sm:` offsets place the cards in an overlapping stack on larger screens; on phones they simply stack down the page. */
const cardPoses = [
  { rotate: -4, mobileRotate: -1.5, rise: [60, -30], className: 'sm:left-2 sm:top-0', ink: 'var(--color-brand-blue)' },
  { rotate: 3, mobileRotate: 1.2, rise: [90, -50], className: 'sm:right-2 sm:top-36', ink: 'var(--color-brand-red)' },
  { rotate: -2, mobileRotate: -0.8, rise: [120, -70], className: 'sm:left-10 sm:top-72', ink: 'var(--color-brand-yellow)' },
] as const;

/**
 * Three "proof sheets". On tablet/desktop they drift into an overlapping stack at different speeds as the
 * section scrolls past; on phones they sit one under the other so every word stays readable.
 */
export default function StoryStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isStackLayout, setIsStackLayout] = useState(false);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });

  useEffect(() => {
    const query = window.matchMedia('(min-width: 640px)');
    const syncLayout = () => setIsStackLayout(query.matches);
    syncLayout();
    query.addEventListener('change', syncLayout);
    return () => query.removeEventListener('change', syncLayout);
  }, []);

  const firstRise = useTransform(scrollYProgress, [0, 1], [...cardPoses[0].rise]);
  const secondRise = useTransform(scrollYProgress, [0, 1], [...cardPoses[1].rise]);
  const thirdRise = useTransform(scrollYProgress, [0, 1], [...cardPoses[2].rise]);
  const risers = [firstRise, secondRise, thirdRise];

  return (
    <div ref={containerRef} className="relative mx-auto flex w-full max-w-md flex-col gap-6 sm:block sm:h-[34rem]">
      {storyHighlights.map((highlight, index) => {
        const pose = cardPoses[index];
        return (
          <motion.article
            key={highlight.id}
            className={`relative w-full rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-ink/10 max-sm:sticky ${phoneStackTops[index]} sm:absolute sm:w-[80%] sm:p-7 ${pose.className}`}
            style={{
              y: prefersReducedMotion || !isStackLayout ? 0 : risers[index],
              rotate: isStackLayout ? pose.rotate : pose.mobileRotate,
              zIndex: index + 1,
            }}
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
