'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

interface CountUpProps {
  target: number;
  suffix?: string;
}

/** Counts up from 0 when scrolled into view. */
export default function CountUp({ target, suffix = '' }: CountUpProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(elementRef, { once: true, margin: '-60px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (value) => setDisplayValue(Math.round(value)),
    });
    return () => controls.stop();
  }, [isInView, target]);

  return (
    <span ref={elementRef}>
      {displayValue}
      {suffix}
    </span>
  );
}
