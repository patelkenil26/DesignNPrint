'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

/**
 * Scroll-story helper for "tall track + sticky stage" sections.
 *
 *   <section ref={trackRef} className="h-[600vh]">
 *     <div ref={stickyRef} className="sticky top-… h-…">…</div>
 *   </section>
 *
 * `getProgress()` returns 0 → 1 while the sticky stage is pinned. It reads the DOM
 * directly (no React state), so 3D scenes can call it every frame without re-rendering.
 */
export function useScrollTrack() {
  const trackRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  const getProgress = useCallback((): number => {
    const track = trackRef.current;
    const sticky = stickyRef.current;
    if (!track || !sticky) return 0;
    const stickyTop = parseFloat(getComputedStyle(sticky).top) || 0;
    const scrollable = track.offsetHeight - sticky.offsetHeight;
    if (scrollable <= 0) return 0;
    return clamp01((stickyTop - track.getBoundingClientRect().top) / scrollable);
  }, []);

  return { trackRef, stickyRef, getProgress };
}

/** Returns the index of the active chapter given the progress thresholds (re-renders only on change). */
export function useChapterIndex(getProgress: () => number, chapterStarts: number[]): number {
  const [chapterIndex, setChapterIndex] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const updateChapter = () => {
      frameId = 0;
      const progress = getProgress();
      let nextIndex = 0;
      chapterStarts.forEach((start, index) => {
        if (progress >= start) nextIndex = index;
      });
      setChapterIndex((current) => (current === nextIndex ? current : nextIndex));
    };

    const scheduleUpdate = () => {
      if (!frameId) frameId = requestAnimationFrame(updateChapter);
    };

    updateChapter();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [getProgress, chapterStarts]);

  return chapterIndex;
}

export const smoothStep = (edge0: number, edge1: number, value: number): number => {
  const t = clamp01((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

export { clamp01 };
