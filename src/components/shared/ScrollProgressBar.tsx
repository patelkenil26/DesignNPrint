'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin CMYK bar under the navbar that fills as the page is read. */
export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <motion.span
      className="cmyk-strip pointer-events-none fixed inset-x-0 top-[var(--nav-height)] z-40 h-[3px] origin-left"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
