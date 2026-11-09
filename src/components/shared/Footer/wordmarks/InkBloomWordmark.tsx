"use client";

import { useEffect, useRef } from "react";
import { Letters, wordmarkFrameClasses, wordmarkLayerPosition, wordmarkTypography as layerTypography } from "@/components/shared/Footer/wordmarks/shared";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

/** Offset plates: cyan / magenta / yellow, each pushed in its own direction. */
const registrationPlates = [
  { color: "var(--color-brand-blue)", x: -1, y: -0.6 },
  { color: "var(--color-brand-red)", x: 1, y: -0.4 },
  { color: "var(--color-brand-yellow)", x: 0.3, y: 1 },
];

const INTRO_OFFSET_PX = 22;
const RESTING_OFFSET_PX = 1;
const POINTER_OFFSET_PX = 5;

interface PlateProps {
  color: string;
  directionX: number;
  directionY: number;
  intro: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  isStatic: boolean;
}

/** A coloured outline copy that starts misregistered and settles into a faint chromatic fringe. */
function Plate({ color, directionX, directionY, intro, pointerX, pointerY, isStatic }: PlateProps) {
  const x = useTransform([intro, pointerX], (values: number[]) =>
    directionX * (values[0] * INTRO_OFFSET_PX + RESTING_OFFSET_PX + values[1] * POINTER_OFFSET_PX),
  );
  const y = useTransform([intro, pointerY], (values: number[]) =>
    directionY * (values[0] * INTRO_OFFSET_PX + RESTING_OFFSET_PX + values[1] * POINTER_OFFSET_PX),
  );

  return (
    <motion.div
      className={`${wordmarkLayerPosition} mix-blend-screen ${layerTypography}`}
      style={{ x, y, color: "transparent", WebkitTextStroke: `1.2px ${color}`, opacity: 0.5 }}
      aria-hidden="true"
    >
      <Letters isStatic={isStatic} />
    </motion.div>
  );
}

/**
 * The big footer name, printed in four layers:
 *  1. a pale outline,  2. CMYK plates that slide into (near) registration when it scrolls in,
 *  3. a CMYK ink fill that blooms wherever the cursor is — and drifts on its own when nobody is there,
 *  4. a foil-shine sweep every few seconds.
 */
export default function InkBloomWordmark() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(containerRef, { amount: 0.2 });
  const hasEnteredView = useInView(containerRef, { once: true, amount: 0.2 });
  const isPointerOverRef = useRef(false);

  const intro = useMotionValue(prefersReducedMotion ? 0 : 1);
  const rawPointerX = useMotionValue(0);
  const rawPointerY = useMotionValue(0);
  const pointerX = useSpring(rawPointerX, { stiffness: 120, damping: 18 });
  const pointerY = useSpring(rawPointerY, { stiffness: 120, damping: 18 });

  // plates settle once the wordmark first scrolls into view
  useEffect(() => {
    if (!hasEnteredView || prefersReducedMotion) return;
    const controls = animate(intro, 0, { duration: 1.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [hasEnteredView, intro, prefersReducedMotion]);

  // the ink bloom drifts across the letters by itself until a pointer takes over
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isInView || prefersReducedMotion) return;
    let frameId = 0;
    const drift = (time: number) => {
      if (!isPointerOverRef.current) {
        const seconds = time / 1000;
        container.style.setProperty("--spot-x", `${50 + 38 * Math.sin(seconds * 0.45)}%`);
        container.style.setProperty("--spot-y", `${50 + 14 * Math.cos(seconds * 0.7)}%`);
      }
      frameId = requestAnimationFrame(drift);
    };
    frameId = requestAnimationFrame(drift);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, prefersReducedMotion]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion) return;
    const bounds = container.getBoundingClientRect();
    const percentX = ((event.clientX - bounds.left) / bounds.width) * 100;
    const percentY = ((event.clientY - bounds.top) / bounds.height) * 100;
    isPointerOverRef.current = true;
    container.style.setProperty("--spot-x", `${percentX}%`);
    container.style.setProperty("--spot-y", `${percentY}%`);
    rawPointerX.set((percentX / 100 - 0.5) * 2);
    rawPointerY.set((percentY / 100 - 0.5) * 2);
  };

  const handlePointerLeave = () => {
    isPointerOverRef.current = false;
    rawPointerX.set(0);
    rawPointerY.set(0);
  };

  const isStatic = Boolean(prefersReducedMotion);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={wordmarkFrameClasses}
      aria-hidden="true"
    >
      {/* 1 · pale outline — also gives the block its height */}
      <div className={`text-outline-light relative opacity-70 ${layerTypography}`}>
        <Letters isStatic={isStatic} />
      </div>

      {/* 2 · cyan / magenta / yellow plates */}
      {registrationPlates.map((plate) => (
        <Plate
          key={plate.color}
          color={plate.color}
          directionX={plate.x}
          directionY={plate.y}
          intro={intro}
          pointerX={pointerX}
          pointerY={pointerY}
          isStatic={isStatic}
        />
      ))}

      {/* 3 · CMYK ink that blooms under the cursor */}
      <div className={`wordmark-fill ${wordmarkLayerPosition} ${layerTypography}`}>
        <Letters isStatic={isStatic} />
      </div>

      {/* 4 · foil shine */}
      <div className={`wordmark-shine ${wordmarkLayerPosition} ${layerTypography}`}>
        <Letters isStatic={isStatic} />
      </div>
    </div>
  );
}
