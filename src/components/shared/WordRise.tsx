'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface WordRiseProps {
  text: string;
  className?: string;
  /** seconds before the first word starts */
  delay?: number;
}

/** Each word slides up out of its own mask, one after another — a clean line-reveal for headlines. */
export default function WordRise({ text, className = '', delay = 0 }: WordRiseProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(' ');

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className="inline-block"
              initial={prefersReducedMotion ? false : { y: '115%', rotate: 4 }}
              animate={{ y: '0%', rotate: 0 }}
              transition={{ duration: 0.9, delay: delay + index * 0.09, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </span>
  );
}
