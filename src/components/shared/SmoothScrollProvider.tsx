'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { useSceneStore } from '@/lib/store';

/**
 * Provides global smooth-scroll via Lenis and syncs scroll progress
 * into the Zustand store for the 3D canvas to read.
 * Does NOT mount SceneRoot itself — the homepage mounts SceneRoot directly.
 */
export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const setScrollProgress = useSceneStore((state) => state.setScrollProgress);
  const setActiveChapter  = useSceneStore((state) => state.setActiveChapter);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      setScrollProgress(progress);

      if (progress < 0.28)      setActiveChapter(0);
      else if (progress < 0.65) setActiveChapter(1);
      else                       setActiveChapter(2);
    };

    lenis.on('scroll', handleScroll);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    handleScroll();

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, [setScrollProgress, setActiveChapter]);

  return <>{children}</>;
}
