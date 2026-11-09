"use client";

import { useReducedMotion } from "framer-motion";
import { Letters, wordmarkFrameClasses, wordmarkLayerPosition, wordmarkTypography } from "@/components/shared/Footer/wordmarks/shared";

const dot = (color: string, solidRadius: string, fadeRadius: string) =>
  `radial-gradient(circle, ${color} ${solidRadius}, transparent ${fadeRadius})`;

/** Three fine screens (C, M, Y) — each drifts at its own phase so the dots weave in and out of each other. */
const fineScreens = [
  { color: "var(--color-brand-blue)", delay: "0s" },
  { color: "var(--color-brand-red)", delay: "-0.35s" },
  { color: "var(--color-brand-yellow)", delay: "-0.7s" },
];

/**
 * VARIANT D — "Halftone".
 * The letters are made of real printing halftone dots in the three process colours, growing coarser
 * toward the bottom, drifting slowly — the way a magnified print looks.
 */
export default function HalftoneWordmark() {
  const isStatic = Boolean(useReducedMotion());

  return (
    <div className={wordmarkFrameClasses} aria-hidden="true">
      <div className={`text-outline-light relative opacity-50 ${wordmarkTypography}`}>
        <Letters isStatic={isStatic} />
      </div>

      {fineScreens.map((screen) => (
        <div
          key={screen.color}
          className={`wordmark-halftone mix-blend-screen ${wordmarkLayerPosition} ${wordmarkTypography}`}
          style={{ backgroundImage: dot(screen.color, "1.9px", "2.5px"), animationDelay: screen.delay }}
        >
          <Letters isStatic={isStatic} />
        </div>
      ))}

      {/* coarse dots, strongest at the bottom of the letters */}
      <div
        className={`wordmark-halftone ${wordmarkLayerPosition} ${wordmarkTypography}`}
        style={{
          backgroundImage: dot("var(--color-brand-red)", "3.3px", "3.9px"),
          animationDelay: "-0.5s",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 30%, #000 100%)",
          maskImage: "linear-gradient(to bottom, transparent 30%, #000 100%)",
        }}
      >
        <Letters isStatic={isStatic} />
      </div>
    </div>
  );
}
