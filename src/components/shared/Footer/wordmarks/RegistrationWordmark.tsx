"use client";

import { useEffect, useRef } from "react";
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
import { Letters, wordmarkFrameClasses, wordmarkLayerPosition, wordmarkTypography } from "@/components/shared/Footer/wordmarks/shared";

/** Cyan, magenta and yellow plates — added together (screen) they register into white. */
const plates = [
  { color: "var(--color-brand-blue)", x: -1, y: -0.5 },
  { color: "var(--color-brand-red)", x: 1, y: -0.35 },
  { color: "var(--color-brand-yellow)", x: 0.2, y: 1 },
];

const INTRO_OFFSET_PX = 34;
const POINTER_OFFSET_PX = 12;

interface PlateProps {
  color: string;
  directionX: number;
  directionY: number;
  intro: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  isStatic: boolean;
}

function Plate({ color, directionX, directionY, intro, pointerX, pointerY, isStatic }: PlateProps) {
  const x = useTransform([intro, pointerX], (values: number[]) => directionX * (values[0] * INTRO_OFFSET_PX + Math.abs(values[1]) * POINTER_OFFSET_PX));
  const y = useTransform([intro, pointerY], (values: number[]) => directionY * (values[0] * INTRO_OFFSET_PX + Math.abs(values[1]) * POINTER_OFFSET_PX));

  return (
    <motion.div className={`${wordmarkLayerPosition} mix-blend-screen ${wordmarkTypography}`} style={{ x, y, color }} aria-hidden="true">
      <Letters isStatic={isStatic} />
    </motion.div>
  );
}

/**
 * VARIANT B — "Registration snap".
 * Three solid colour plates slide in misregistered and lock into perfect registration (white).
 * Move the cursor across it and the plates drift apart again, the further from the centre the wider.
 */
export default function RegistrationWordmark() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const hasEnteredView = useInView(containerRef, { once: true, amount: 0.2 });

  const intro = useMotionValue(prefersReducedMotion ? 0 : 1);
  const rawPointerX = useMotionValue(0);
  const rawPointerY = useMotionValue(0);
  const pointerX = useSpring(rawPointerX, { stiffness: 110, damping: 14 });
  const pointerY = useSpring(rawPointerY, { stiffness: 110, damping: 14 });

  useEffect(() => {
    if (!hasEnteredView || prefersReducedMotion) return;
    const controls = animate(intro, 0, { duration: 2.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [hasEnteredView, intro, prefersReducedMotion]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion) return;
    const bounds = container.getBoundingClientRect();
    rawPointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
    rawPointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
  };

  const handlePointerLeave = () => {
    rawPointerX.set(0);
    rawPointerY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={wordmarkFrameClasses}
      aria-hidden="true"
    >
      {/* in-flow copy that gives the frame its height (invisible) */}
      <div className={`relative opacity-0 ${wordmarkTypography}`}>
        <Letters isStatic />
      </div>
      {plates.map((plate) => (
        <Plate
          key={plate.color}
          color={plate.color}
          directionX={plate.x}
          directionY={plate.y}
          intro={intro}
          pointerX={pointerX}
          pointerY={pointerY}
          isStatic={Boolean(prefersReducedMotion)}
        />
      ))}
    </div>
  );
}
