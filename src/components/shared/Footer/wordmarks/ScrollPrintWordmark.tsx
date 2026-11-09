"use client";

import { useEffect, useRef } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { Letters, wordmarkFrameClasses, wordmarkLayerPosition, wordmarkTypography } from "@/components/shared/Footer/wordmarks/shared";

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/** Each colour pass: starts at `from`, finishes at `to` (share of the scroll through the footer). */
const passes = [
  { variable: "--p1", from: 0, to: 0.34 },
  { variable: "--p2", from: 0.2, to: 0.54 },
  { variable: "--p3", from: 0.4, to: 0.74 },
  { variable: "--p4", from: 0.6, to: 1 },
];

/**
 * VARIANT E — "Scroll print pass".
 * Scroll down through the footer and the name is printed in front of you: a cyan pass, then magenta,
 * then yellow, and finally the full CMYK finish — each wiping left to right, tied to your scroll.
 */
export default function ScrollPrintWordmark() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 98%", "end 62%"] });

  const applyProgress = (value: number) => {
    const container = containerRef.current;
    if (!container) return;
    passes.forEach((pass) => {
      const passProgress = prefersReducedMotion ? 1 : clamp01((value - pass.from) / (pass.to - pass.from));
      container.style.setProperty(pass.variable, String(passProgress));
    });
  };

  useMotionValueEvent(scrollYProgress, "change", applyProgress);

  useEffect(() => {
    applyProgress(scrollYProgress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className={wordmarkFrameClasses} aria-hidden="true">
      <div className={`text-outline-light relative opacity-60 ${wordmarkTypography}`}>
        <Letters isStatic />
      </div>
      {[
        { variable: "--p1", className: "", color: "var(--color-brand-blue)" },
        { variable: "--p2", className: "", color: "var(--color-brand-red)" },
        { variable: "--p3", className: "", color: "var(--color-brand-yellow)" },
        { variable: "--p4", className: "wordmark-flow", color: undefined },
      ].map((pass) => (
        <div
          key={pass.variable}
          className={`wordmark-wipe ${pass.className} ${wordmarkLayerPosition} ${wordmarkTypography}`}
          style={{ ["--p" as string]: `var(${pass.variable}, 0)`, color: pass.color }}
        >
          <Letters isStatic />
        </div>
      ))}
    </div>
  );
}
