"use client";

import { useReducedMotion } from "framer-motion";
import { Letters, wordmarkFrameClasses, wordmarkLayerPosition, wordmarkTypography } from "@/components/shared/Footer/wordmarks/shared";

/**
 * VARIANT C — "Foil gradient".
 * The whole name is filled with a slow-flowing CMYK gradient that fades toward the bottom edge,
 * with a bright foil-shine band sweeping across it. No interaction needed — it just looks expensive.
 */
export default function FoilWordmark() {
  const isStatic = Boolean(useReducedMotion());
  const depthFade = { WebkitMaskImage: "linear-gradient(to bottom, #000 25%, rgba(0,0,0,0.35) 100%)", maskImage: "linear-gradient(to bottom, #000 25%, rgba(0,0,0,0.35) 100%)" };

  return (
    <div className={wordmarkFrameClasses} aria-hidden="true">
      <div className={`text-outline-light relative opacity-60 ${wordmarkTypography}`}>
        <Letters isStatic={isStatic} />
      </div>
      <div className={`wordmark-flow ${wordmarkLayerPosition} ${wordmarkTypography}`} style={depthFade}>
        <Letters isStatic={isStatic} />
      </div>
      <div className={`wordmark-shine ${wordmarkLayerPosition} ${wordmarkTypography}`}>
        <Letters isStatic={isStatic} />
      </div>
    </div>
  );
}
