'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, type PanInfo } from 'framer-motion';
import { ArrowRight, MessageCircle, Search, X } from 'lucide-react';
import ProofSheet from '@/components/shared/ImageViewer/ProofSheet';
import type { ViewerItem, ViewerOrigin } from '@/components/shared/ImageViewer/ImageViewerContext';
import { buildWhatsAppLink } from '@/data/siteConfig';

/** Space (rem) kept free around the sheet for the caption and buttons when sizing it to the screen height. */
const CHROME_HEIGHT_REM = 15;
const DEFAULT_ASPECT_RATIO = 4 / 3;
/** Drag distance (px) / speed (px/s) that tosses the sheet away and brings the next one. */
const TOSS_DISTANCE_PX = 110;
const TOSS_SPEED_PX_PER_S = 600;
const SWIPE_DOWN_CLOSE_PX = 130;
/** Each sheet rests at its own slight angle, like proofs dealt onto a table. */
const restingAngles = [-1.4, 1.1, -0.7, 1.5] as const;

const formatNumber = (value: number) => String(value).padStart(2, '0');
const settleSpring = { type: 'spring', stiffness: 220, damping: 18 } as const;

interface TossedSheet {
  key: number;
  item: ViewerItem;
  index: number;
  direction: 1 | -1;
}

interface ImageViewerDialogProps {
  items: ViewerItem[];
  startIndex: number;
  /** the thumbnail the sheet grows out of (null → plain fade) */
  origin: ViewerOrigin | null;
  onClose: () => void;
}

/**
 * Opens a single picture as a printed proof sheet floating over a softly blurred page (no black screen).
 * A printer's loupe magnifies whatever you drag over; "View other" tosses this sheet aside and deals the next one.
 */
export default function ImageViewerDialog({ items, startIndex, origin, onClose }: ImageViewerDialogProps) {
  const isMotionAllowed = !useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(startIndex);
  const [hasNavigated, setHasNavigated] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isLoupeOn, setIsLoupeOn] = useState(false);
  const [aspectRatios, setAspectRatios] = useState<Record<string, number>>({});
  const [tossedSheet, setTossedSheet] = useState<TossedSheet | null>(null);
  const tossCounter = useRef(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const total = items.length;
  const activeItem = items[activeIndex];
  const aspectRatio = aspectRatios[activeItem.id] ?? DEFAULT_ASPECT_RATIO;

  const handleAspectRatio = useCallback((itemId: string, ratio: number) => {
    setAspectRatios((current) => (current[itemId] === ratio ? current : { ...current, [itemId]: ratio }));
  }, []);

  const showOther = useCallback(
    (step: 1 | -1) => {
      if (total < 2) return;
      tossCounter.current += 1;
      setTossedSheet({ key: tossCounter.current, item: items[activeIndex], index: activeIndex, direction: step });
      setDirection(step);
      setHasNavigated(true);
      setActiveIndex((current) => (current + step + total) % total);
    },
    [activeIndex, items, total],
  );

  /* keyboard, scroll lock, focus */
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    // keeps Tab / Shift+Tab cycling inside the dialog so keyboard users never end up behind it (WCAG 2.4.3)
    const trapFocus = (event: KeyboardEvent) => {
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      else if (event.key === 'Tab') trapFocus(event);
      else if (event.key === 'ArrowRight') showOther(1);
      else if (event.key === 'ArrowLeft') showOther(-1);
      else if (event.key.toLowerCase() === 'l' && !event.ctrlKey && !event.metaKey && !event.altKey) setIsLoupeOn((current) => !current);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose, showOther]);

  const handleDragEnd = (_event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    if (offset.y > SWIPE_DOWN_CLOSE_PX && Math.abs(offset.y) > Math.abs(offset.x)) onClose();
    else if (Math.abs(offset.x) > TOSS_DISTANCE_PX || Math.abs(velocity.x) > TOSS_SPEED_PX_PER_S) showOther(offset.x < 0 ? 1 : -1);
  };

  /* the sheet grows out of (and returns to) the thumbnail that was clicked */
  const originTransform =
    origin && isMotionAllowed && typeof window !== 'undefined'
      ? {
          opacity: 0.3,
          x: origin.centerX - window.innerWidth / 2,
          y: origin.centerY - window.innerHeight / 2,
          scale: Math.min(0.9, Math.max(0.15, origin.width / (window.innerWidth * 0.9))),
          rotate: 0,
        }
      : { opacity: 0, scale: 0.92 };

  const sheetWidth = `min(92vw, calc((100svh - ${CHROME_HEIGHT_REM}rem) * ${aspectRatio}))`;
  const restingAngle = restingAngles[activeIndex % restingAngles.length];

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${activeItem.title} — enlarged view`}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-ink/45 px-4 py-5 backdrop-blur-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Close enlarged view"
        className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-xl transition-all hover:rotate-90 active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
      >
        <X className="h-5 w-5" />
      </button>

      {/* the sheet(s) */}
      <div className="relative w-full" style={{ maxWidth: sheetWidth }}>
        {tossedSheet && (
          <motion.div
            key={tossedSheet.key}
            className="pointer-events-none absolute inset-x-0 top-0 z-10"
            initial={{ x: 0, y: 0, rotate: restingAngles[tossedSheet.index % restingAngles.length], opacity: 1 }}
            animate={{ x: tossedSheet.direction * -120 + '%', y: -30, rotate: tossedSheet.direction * -22, opacity: 0 }}
            transition={{ duration: isMotionAllowed ? 0.55 : 0.1, ease: [0.5, 0, 0.75, 0] }}
            onAnimationComplete={() => setTossedSheet(null)}
            aria-hidden="true"
          >
            <ProofSheet
              item={tossedSheet.item}
              proofLabel={`${formatNumber(tossedSheet.index + 1)} / ${formatNumber(total)}`}
              aspectRatio={aspectRatios[tossedSheet.item.id] ?? DEFAULT_ASPECT_RATIO}
              onAspectRatio={handleAspectRatio}
              isLoupeOn={false}
            />
          </motion.div>
        )}

        <motion.div
          key={activeItem.id}
          className="relative z-20"
          initial={
            hasNavigated
              ? isMotionAllowed
                ? { opacity: 0, y: 70, scale: 0.9, rotate: direction * 6 }
                : { opacity: 0 }
              : originTransform
          }
          animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: isMotionAllowed ? restingAngle : 0 }}
          exit={activeIndex === startIndex ? originTransform : { opacity: 0 }}
          transition={isMotionAllowed ? settleSpring : { duration: 0.15 }}
          drag={!isLoupeOn}
          dragSnapToOrigin
          dragElastic={0.6}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
        >
          <ProofSheet
            item={activeItem}
            proofLabel={`${formatNumber(activeIndex + 1)} / ${formatNumber(total)}`}
            aspectRatio={aspectRatio}
            onAspectRatio={handleAspectRatio}
            isLoupeOn={isLoupeOn}
            isPriority
          />
        </motion.div>
      </div>

      {/* caption + actions */}
      <div className="relative z-30 flex w-full max-w-xl flex-col items-center gap-3 text-center text-white">
        <div className="min-w-0 max-w-full">
          <p className="truncate font-display text-xl font-bold leading-tight sm:text-2xl">{activeItem.title}</p>
          {activeItem.line && <p className="mt-0.5 line-clamp-1 text-xs text-white/75 sm:line-clamp-2 sm:text-sm">{activeItem.line}</p>}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {total > 1 && (
            <button
              type="button"
              onClick={() => showOther(1)}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink shadow-xl transition-all hover:-translate-y-0.5 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
            >
              View other
              <span className="rounded-full bg-ink px-2 py-0.5 font-mono text-[10px] font-bold text-white">
                {formatNumber(activeIndex + 1)}/{formatNumber(total)}
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsLoupeOn((current) => !current)}
            aria-pressed={isLoupeOn}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow ${
              isLoupeOn ? 'border-brand-yellow bg-brand-yellow/15 text-brand-yellow' : 'border-white/30 text-white/80 hover:border-white'
            }`}
          >
            <Search className="h-4 w-4" /> Loupe {isLoupeOn ? 'on' : 'off'}
          </button>
          <a
            href={buildWhatsAppLink(activeItem.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-sm font-semibold text-ink shadow-xl transition-all hover:-translate-y-0.5 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <MessageCircle className="h-4 w-4" /> Ask for this
          </a>
        </div>
      </div>
    </motion.div>
  );
}
