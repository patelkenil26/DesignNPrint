'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

/** CSS-3D tilt that follows the pointer (pure transform — no WebGL cost). */
export default function TiltCard({ children, className = '' }: TiltCardProps) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springConfig = { stiffness: 180, damping: 18 };
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-9, 9]), springConfig);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [9, -9]), springConfig);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div style={{ perspective: 900 }} className={className}>
      <motion.div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
