'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface InkBarProps {
  color: string;
  delay?: number;
  className?: string;
}

/** A vertical bar of ink that fills from the bottom when scrolled into view. */
export default function InkBar({ color, delay = 0, className = '' }: InkBarProps) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      className={`block origin-bottom ${className}`}
      style={{ backgroundColor: color }}
      initial={prefersReducedMotion ? false : { scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
