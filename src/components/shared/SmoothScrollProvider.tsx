'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Lenis from 'lenis';
import { useSceneStore } from '@/lib/store';

// Client-only dynamic import of the WebGL SceneRoot
const SceneRoot = dynamic(() => import('@/components/three/SceneRoot'), {
  ssr: false,
});

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const setScrollProgress = useSceneStore((state) => state.setScrollProgress);
  const setActiveChapter = useSceneStore((state) => state.setActiveChapter);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      
      setScrollProgress(progress);

      // Chapter threshold calculation for navigation indicators
      if (progress < 0.28) {
        setActiveChapter(0);
      } else if (progress < 0.65) {
        setActiveChapter(1);
      } else {
        setActiveChapter(2);
      }
    };

    lenis.on('scroll', handleScroll);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Initial check
    handleScroll();

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, [setScrollProgress, setActiveChapter]);

  return (
    <>
      {/* Persistent WebGL 3D Canvas */}
      <SceneRoot />
      {children}
    </>
  );
}
