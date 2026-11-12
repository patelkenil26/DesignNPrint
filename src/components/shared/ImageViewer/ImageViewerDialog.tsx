'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  type PanInfo,
} from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageCircle, Minus, Plus, X } from 'lucide-react';
import type { ViewerItem, ViewerOrigin } from '@/components/shared/ImageViewer/ImageViewerContext';
import { buildWhatsAppLink } from '@/data/siteConfig';

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
/** Zoom level a double-tap / double-click jumps to. */
const DOUBLE_TAP_ZOOM = 2.5;
const ZOOM_BUTTON_STEP = 0.75;
/** Two taps closer together than this (ms) count as a double-tap. */
const DOUBLE_TAP_WINDOW_MS = 300;
/** Swipe distance (px) or speed (px/s) that counts as "next / previous". */
const SWIPE_DISTANCE_PX = 70;
const SWIPE_SPEED_PX_PER_S = 500;
/** Downward drag (px) that closes the viewer. */
const SWIPE_DOWN_CLOSE_PX = 110;

const formatNumber = (value: number) => String(value).padStart(2, '0');
const clampZoom = (value: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));
const springTransition = { type: 'spring', stiffness: 260, damping: 28 } as const;

/** The big picture, with a soft placeholder shimmer until it has loaded. */
function ViewerPicture({ item }: { item: ViewerItem }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <>
      {!isLoaded && <span className="absolute inset-6 animate-pulse rounded-2xl bg-white/5" aria-hidden="true" />}
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="100vw"
        priority
        draggable={false}
        onLoad={() => setIsLoaded(true)}
        className="pointer-events-none object-contain drop-shadow-2xl"
      />
    </>
  );
}

interface ImageViewerDialogProps {
  items: ViewerItem[];
  startIndex: number;
  /** the thumbnail the viewer grows out of (null → plain fade) */
  origin: ViewerOrigin | null;
  onClose: () => void;
}

/**
 * Full-screen picture viewer: grows out of the clicked picture, swipe / arrows / thumbnails to move between pictures,
 * pinch, wheel or double-tap to zoom, drag to pan, swipe down (or Esc) to close, and a WhatsApp button for the
 * picture on screen.
 */
export default function ImageViewerDialog({ items, startIndex, origin, onClose }: ImageViewerDialogProps) {
  const isMotionAllowed = !useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(startIndex);
  const [hasNavigated, setHasNavigated] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isPinching, setIsPinching] = useState(false);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });

  const stageRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinchStart = useRef<{ distance: number; scale: number } | null>(null);
  const lastTapAt = useRef(0);

  const zoomScale = useMotionValue(1);
  const panX = useMotionValue(0);
  const panY = useMotionValue(0);
  useMotionValueEvent(zoomScale, 'change', (value) => setIsZoomed(value > 1.02));

  const activeItem = items[activeIndex];
  const total = items.length;

  const resetZoom = useCallback(() => {
    animate(zoomScale, 1, springTransition);
    animate(panX, 0, springTransition);
    animate(panY, 0, springTransition);
  }, [panX, panY, zoomScale]);

  const goTo = useCallback(
    (step: 1 | -1) => {
      setDirection(step);
      setHasNavigated(true);
      setActiveIndex((current) => (current + step + total) % total);
      if (zoomScale.get() > 1.02) {
        zoomScale.set(1);
        panX.set(0);
        panY.set(0);
      }
    },
    [panX, panY, total, zoomScale],
  );

  const jumpTo = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setHasNavigated(true);
    setActiveIndex(index);
    zoomScale.set(1);
    panX.set(0);
    panY.set(0);
  };

  const zoomBy = useCallback(
    (delta: number) => {
      const nextScale = clampZoom(zoomScale.get() + delta);
      animate(zoomScale, nextScale, springTransition);
      if (nextScale <= 1.02) {
        animate(panX, 0, springTransition);
        animate(panY, 0, springTransition);
      }
    },
    [panX, panY, zoomScale],
  );

  /* keyboard, scroll lock, focus */
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      else if (event.key === 'ArrowRight') goTo(1);
      else if (event.key === 'ArrowLeft') goTo(-1);
      else if (event.key === '+' || event.key === '=') zoomBy(ZOOM_BUTTON_STEP);
      else if (event.key === '-') zoomBy(-ZOOM_BUTTON_STEP);
      else if (event.key === '0') resetZoom();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [goTo, onClose, resetZoom, zoomBy]);

  /* measure the stage (limits how far a zoomed picture can be panned) */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(([entry]) =>
      setStageSize({ width: entry.contentRect.width, height: entry.contentRect.height }),
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  /* keep the active thumbnail in view */
  useEffect(() => {
    thumbnailRefs.current[activeIndex]?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  }, [activeIndex]);

  /* two-finger pinch */
  const handlePointerDown = (event: React.PointerEvent) => {
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.current.size === 2) {
      const [first, second] = [...pointers.current.values()];
      pinchStart.current = { distance: Math.hypot(first.x - second.x, first.y - second.y), scale: zoomScale.get() };
      setIsPinching(true);
    }
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.current.size !== 2 || !pinchStart.current) return;
    const [first, second] = [...pointers.current.values()];
    const distance = Math.hypot(first.x - second.x, first.y - second.y);
    zoomScale.set(clampZoom(pinchStart.current.scale * (distance / pinchStart.current.distance)));
  };

  const handlePointerEnd = (event: React.PointerEvent) => {
    pointers.current.delete(event.pointerId);
    if (pointers.current.size < 2) {
      pinchStart.current = null;
      if (isPinching) setIsPinching(false);
      if (zoomScale.get() < 1.05) resetZoom();
    }
  };

  const handleWheel = (event: React.WheelEvent) => {
    zoomScale.set(clampZoom(zoomScale.get() * (1 - event.deltaY * 0.0025)));
    if (zoomScale.get() <= 1.02) {
      panX.set(0);
      panY.set(0);
    }
  };

  const handleImageTap = () => {
    const now = Date.now();
    if (now - lastTapAt.current < DOUBLE_TAP_WINDOW_MS) {
      if (zoomScale.get() > 1.02) resetZoom();
      else animate(zoomScale, DOUBLE_TAP_ZOOM, springTransition);
      lastTapAt.current = 0;
    } else {
      lastTapAt.current = now;
    }
  };

  const handleDragEnd = (_event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    if (isZoomed) return;
    const { offset, velocity } = info;
    if (offset.y > SWIPE_DOWN_CLOSE_PX && Math.abs(offset.y) > Math.abs(offset.x)) {
      onClose();
    } else if (Math.abs(offset.x) > SWIPE_DISTANCE_PX || Math.abs(velocity.x) > SWIPE_SPEED_PX_PER_S) {
      goTo(offset.x < 0 ? 1 : -1);
    }
  };

  const panLimitX = (stageSize.width * (zoomScale.get() - 1)) / 2;
  const panLimitY = (stageSize.height * (zoomScale.get() - 1)) / 2;

  /* where the picture starts / returns to, so it seems to grow out of the thumbnail */
  const originTransform =
    origin && isMotionAllowed && typeof window !== 'undefined'
      ? {
          opacity: 0.2,
          x: origin.centerX - window.innerWidth / 2,
          y: origin.centerY - window.innerHeight / 2,
          scale: Math.min(0.9, Math.max(0.15, origin.width / (window.innerWidth * 0.9))),
        }
      : { opacity: 0, scale: 0.92 };
  const shouldGrowFromOrigin = !hasNavigated;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${activeItem.title} — enlarged view`}
      className="fixed inset-0 z-[100] flex flex-col bg-ink/95 text-white backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <span className="cmyk-strip absolute inset-x-0 top-0 z-10 h-1" aria-hidden="true" />

      <header className="relative z-10 flex items-center justify-between gap-3 px-4 pb-2 pt-4 sm:px-6">
        <p className="font-mono text-xs font-bold tracking-[0.2em]" aria-live="polite">
          <span className="text-brand-yellow">PROOF</span> {formatNumber(activeIndex + 1)} / {formatNumber(total)}
        </p>
        <div className="flex items-center gap-2">
          {[
            { label: 'Zoom out', icon: <Minus className="h-4 w-4" />, onClick: () => zoomBy(-ZOOM_BUTTON_STEP), hiddenOnPhones: true },
            { label: 'Zoom in', icon: <Plus className="h-4 w-4" />, onClick: () => zoomBy(ZOOM_BUTTON_STEP), hiddenOnPhones: true },
          ].map((control) => (
            <button
              key={control.label}
              type="button"
              onClick={control.onClick}
              aria-label={control.label}
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all hover:bg-white hover:text-ink active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow sm:flex"
            >
              {control.icon}
            </button>
          ))}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close enlarged view"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink transition-all hover:scale-105 active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* stage */}
      <div
        ref={stageRef}
        className="relative min-h-0 flex-1 touch-none select-none overflow-hidden"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onWheel={handleWheel}
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <motion.div
          key={activeItem.id}
          className="absolute inset-0 p-3 sm:p-10"
          initial={
            shouldGrowFromOrigin
              ? originTransform
              : isMotionAllowed
                ? { opacity: 0, x: direction * 70, scale: 0.97 }
                : { opacity: 0 }
          }
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={activeIndex === startIndex ? originTransform : { opacity: 0 }}
          transition={isMotionAllowed ? springTransition : { duration: 0.15 }}
          style={{ pointerEvents: 'none' }}
        >
          <motion.div
            className="relative h-full w-full cursor-grab active:cursor-grabbing"
            style={{ x: panX, y: panY, scale: zoomScale, pointerEvents: 'auto' }}
            drag={!isPinching}
            dragDirectionLock={!isZoomed}
            dragSnapToOrigin={!isZoomed}
            dragElastic={isZoomed ? 0.05 : 0.5}
            dragMomentum={false}
            dragConstraints={
              isZoomed ? { left: -panLimitX, right: panLimitX, top: -panLimitY, bottom: panLimitY } : undefined
            }
            onDragEnd={handleDragEnd}
            onTap={handleImageTap}
          >
            <ViewerPicture item={activeItem} />
          </motion.div>
        </motion.div>

        {[-1, 1].map((step) => (
          <button
            key={step}
            type="button"
            onClick={() => goTo(step as 1 | -1)}
            aria-label={step === 1 ? 'Next picture' : 'Previous picture'}
            className={`absolute top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-ink/60 backdrop-blur transition-all hover:bg-white hover:text-ink active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow sm:flex ${
              step === 1 ? 'right-4' : 'left-4'
            }`}
          >
            {step === 1 ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
          </button>
        ))}
      </div>

      {/* caption + thumbnails */}
      <footer className="relative z-10 px-4 pb-4 pt-3 sm:px-6 sm:pb-6">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate font-display text-lg font-bold leading-tight sm:text-2xl">{activeItem.title}</p>
            {activeItem.line && <p className="mt-0.5 line-clamp-1 text-xs text-white/65 sm:line-clamp-2 sm:text-sm">{activeItem.line}</p>}
          </div>
          <a
            href={buildWhatsAppLink(activeItem.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="sm:hidden">Ask</span>
            <span className="hidden sm:inline">Ask for this</span>
          </a>
        </div>

        {total > 1 && (
          <ul className="no-scrollbar mx-auto mt-3 flex max-w-4xl gap-2 overflow-x-auto py-1" aria-label="All pictures">
            {items.map((item, index) => (
              <li key={item.id} className="shrink-0">
                <button
                  ref={(element) => {
                    thumbnailRefs.current[index] = element;
                  }}
                  type="button"
                  onClick={() => jumpTo(index)}
                  aria-label={`Show ${item.title}`}
                  aria-current={index === activeIndex}
                  className={`relative block h-12 w-16 overflow-hidden rounded-lg transition-all duration-300 active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow sm:h-14 sm:w-20 ${
                    index === activeIndex ? 'opacity-100 ring-2 ring-brand-yellow' : 'opacity-50 hover:opacity-90'
                  }`}
                >
                  <Image src={item.src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </footer>
    </motion.div>
  );
}
