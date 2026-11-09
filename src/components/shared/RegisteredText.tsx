'use client';

import { useEffect, useRef } from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';

interface RegisteredTextProps {
  children: string;
  className?: string;
}

/** Cyan / magenta / yellow plates, each nudged in its own direction. */
const plates = [
  { color: 'var(--color-brand-blue)', x: -1, y: -0.55 },
  { color: 'var(--color-brand-red)', x: 1, y: -0.35 },
  { color: 'var(--color-brand-yellow)', x: 0.25, y: 1 },
];

const INTRO_OFFSET_PX = 20;
const POINTER_OFFSET_PX = 7;

interface PlateProps {
  text: string;
  color: string;
  directionX: number;
  directionY: number;
  intro: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
}

function Plate({ text, color, directionX, directionY, intro, pointerX, pointerY }: PlateProps) {
  const x = useTransform([intro, pointerX], (values: number[]) => directionX * (values[0] * INTRO_OFFSET_PX + values[1] * POINTER_OFFSET_PX));
  const y = useTransform([intro, pointerY], (values: number[]) => directionY * (values[0] * INTRO_OFFSET_PX + values[1] * POINTER_OFFSET_PX));

  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 block select-none mix-blend-multiply"
      style={{ x, y, color }}
    >
      {text}
    </motion.span>
  );
}

/**
 * Headline that "prints in misregistration" — the colour plates start offset, then snap into
 * perfect registration (the quality message of an offset press). Hover and they drift again.
 * The visible black text is the only copy exposed to screen readers.
 */
export default function RegisteredText({ children, className = '' }: RegisteredTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const intro = useMotionValue(prefersReducedMotion ? 0 : 1);
  const rawPointerX = useMotionValue(0);
  const rawPointerY = useMotionValue(0);
  const pointerX = useSpring(rawPointerX, { stiffness: 140, damping: 18 });
  const pointerY = useSpring(rawPointerY, { stiffness: 140, damping: 18 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const controls = animate(intro, 0, { duration: 1.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [intro, prefersReducedMotion]);

  const handlePointerMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    if (prefersReducedMotion || !wrapperRef.current) return;
    const bounds = wrapperRef.current.getBoundingClientRect();
    rawPointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
    rawPointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
  };

  const handlePointerLeave = () => {
    rawPointerX.set(0);
    rawPointerY.set(0);
  };

  return (
    <span
      ref={wrapperRef}
      className={`relative block ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {plates.map((plate) => (
        <Plate
          key={plate.color}
          text={children}
          color={plate.color}
          directionX={plate.x}
          directionY={plate.y}
          intro={intro}
          pointerX={pointerX}
          pointerY={pointerY}
        />
      ))}
      <span className="relative block">{children}</span>
    </span>
  );
}
