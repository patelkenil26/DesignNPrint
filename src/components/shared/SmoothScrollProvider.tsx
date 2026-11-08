'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Global smooth-scroll (Lenis) for the immersive home page.
 * Scroll-driven 3D scenes read their progress straight from the DOM,
 * so this provider only needs to make the scrolling feel weighty and smooth.
 */
export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
