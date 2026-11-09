'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface InkRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/** Colour layers that "print" over the content, then slide away — one per ink in the logo strip. */
const inkLayers = ['var(--color-brand-yellow)', 'var(--color-brand-red)', 'var(--color-brand-blue)', 'var(--color-ink)'];

/**
 * Scroll-triggered reveal themed on four-colour printing: the content is covered by C/M/Y/K-style
 * colour sheets that wipe off one after another while the content settles in.
 * Wrap images or cards (the wrapper clips, so give it the rounded corners you need).
 */
export default function InkReveal({ children, delay = 0, className = '' }: InkRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={`overflow-hidden ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '-60px' }}
    >
      <motion.div
        className="relative h-full w-full"
        variants={{ hidden: { scale: 1.14 }, shown: { scale: 1 } }}
        transition={{ duration: 1.1, delay: delay + 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
      {inkLayers.map((color, layerIndex) => (
        <motion.span
          key={color}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 origin-right"
          style={{ backgroundColor: color, zIndex: inkLayers.length - layerIndex }}
          variants={{ hidden: { scaleX: 1 }, shown: { scaleX: 0 } }}
          transition={{ duration: 0.6, delay: delay + layerIndex * 0.1, ease: [0.76, 0, 0.24, 1] }}
        />
      ))}
    </motion.div>
  );
}
