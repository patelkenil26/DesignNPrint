'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

/** Width of the draggable knob, in px (matches the `h-14 w-14` classes below). */
const KNOB_SIZE = 56;
/** Gap between the knob and the track edge, in px. */
const TRACK_PADDING = 4;
/** How far (0–1) the knob must travel before releasing counts as a confirmation. */
const CONFIRM_THRESHOLD = 0.82;
/** How long the "done" state shows before the knob slides back. */
const RESET_DELAY_MS = 2200;

interface SlideToConfirmProps {
  label: string;
  doneLabel: string;
  onConfirm: () => void;
  className?: string;
}

/**
 * "Slide to send" control. Drag the knob across — or press Enter / Space on it — to confirm.
 * The knob always snaps back afterwards so the action can be repeated.
 */
export default function SlideToConfirm({ label, doneLabel, onConfirm, className = '' }: SlideToConfirmProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const resetTimer = useRef<number | undefined>(undefined);
  const [travel, setTravel] = useState(200);
  const [isDone, setIsDone] = useState(false);
  const knobX = useMotionValue(0);
  const fillWidth = useTransform(knobX, (value) => value + KNOB_SIZE + TRACK_PADDING * 2);
  const labelOpacity = useTransform(knobX, [0, travel * 0.55], [1, 0]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(([entry]) => setTravel(Math.max(0, entry.contentRect.width - KNOB_SIZE - TRACK_PADDING * 2)));
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const confirm = () => {
    if (isDone) return;
    setIsDone(true);
    animate(knobX, travel, { type: 'spring', stiffness: 300, damping: 30 });
    onConfirm();
    resetTimer.current = window.setTimeout(() => {
      setIsDone(false);
      animate(knobX, 0, { type: 'spring', stiffness: 220, damping: 26 });
    }, RESET_DELAY_MS);
  };

  const handleDragEnd = () => {
    if (knobX.get() >= travel * CONFIRM_THRESHOLD) confirm();
    else animate(knobX, 0, { type: 'spring', stiffness: 400, damping: 30 });
  };

  return (
    <div
      ref={trackRef}
      className={`relative h-16 select-none overflow-hidden rounded-full border border-white/15 bg-white/10 p-1 ${className}`}
    >
      <motion.span className="cmyk-strip absolute inset-y-0 left-0 rounded-full opacity-90" style={{ width: fillWidth }} aria-hidden="true" />
      <motion.span
        className="pointer-events-none absolute inset-0 flex items-center justify-center pl-12 text-sm font-semibold tracking-wide text-white"
        style={{ opacity: isDone ? 1 : labelOpacity }}
      >
        {isDone ? doneLabel : label}
      </motion.span>
      <motion.button
        type="button"
        drag="x"
        dragConstraints={{ left: 0, right: travel }}
        dragElastic={0}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        onClick={(event) => {
          /* keyboard activation arrives as a click with no pointer movement */
          if (event.detail === 0) confirm();
        }}
        style={{ x: knobX }}
        whileTap={{ scale: 0.94 }}
        aria-label={`${label} — activate to confirm`}
        className="relative z-10 flex h-14 w-14 cursor-grab items-center justify-center rounded-full bg-white text-ink shadow-xl active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
      >
        {isDone ? <Check className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
      </motion.button>
    </div>
  );
}
