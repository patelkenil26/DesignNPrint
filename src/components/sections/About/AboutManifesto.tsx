'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { aboutManifesto } from '@/data/aboutData';

interface ManifestoWordProps {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  isStatic: boolean;
}

function ManifestoWord({ word, index, total, progress, isStatic }: ManifestoWordProps) {
  const start = index / total;
  const end = (index + 1.5) / total;
  const opacity = useTransform(progress, [start, Math.min(end, 1)], [0.16, 1]);
  return (
    <motion.span style={{ opacity: isStatic ? 1 : opacity }} className="mr-[0.28em] inline-block">
      {word}
    </motion.span>
  );
}

/** One big statement that "inks in" word by word as you scroll through it. */
export default function AboutManifesto() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start 0.85', 'end 0.55'] });
  const words = aboutManifesto.split(' ');

  return (
    <section ref={containerRef} className="bg-paper py-20 sm:py-32" aria-labelledby="manifesto-heading">
      <div className="mx-auto max-w-5xl px-5 sm:px-10">
        <p id="manifesto-heading" className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-muted">
          <span className="cmyk-strip h-1.5 w-10 rounded-full" />
          What we stand for
        </p>
        <p className="mt-6 font-display text-3xl font-bold leading-[1.2] tracking-tight text-ink sm:text-5xl sm:leading-[1.15]">
          <span className="sr-only">{aboutManifesto}</span>
          <span aria-hidden="true">
            {words.map((word, index) => (
              <ManifestoWord
                key={`${word}-${index}`}
                word={word}
                index={index}
                total={words.length}
                progress={scrollYProgress}
                isStatic={Boolean(prefersReducedMotion)}
              />
            ))}
          </span>
        </p>
      </div>
    </section>
  );
}
