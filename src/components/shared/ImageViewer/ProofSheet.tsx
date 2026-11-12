'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import type { ViewerItem } from '@/components/shared/ImageViewer/ImageViewerContext';

/** How many times the loupe magnifies the print. */
const LOUPE_ZOOM = 2.6;
/** Loupe diameter in px: smaller on phones. */
const LOUPE_SIZE_DESKTOP = 190;
const LOUPE_SIZE_PHONE = 140;
/** On touch the lens floats above the finger so the finger never hides what is being inspected. */
const TOUCH_LIFT_PX = 96;

interface LensState {
  x: number;
  y: number;
  isTouch: boolean;
}

interface ProofSheetProps {
  item: ViewerItem;
  /** "03 / 09" style label printed in the colour bar */
  proofLabel: string;
  /** width ÷ height of the picture; the sheet hugs it so there are no empty borders */
  aspectRatio: number;
  onAspectRatio: (itemId: string, ratio: number) => void;
  isLoupeOn: boolean;
  /** first picture of a session gets the priority hint */
  isPriority?: boolean;
}

/** The little squares and ramp every press sheet carries along its edge. */
function ColourBar({ label }: { label: string }) {
  return (
    <div className="mt-2 flex items-center gap-2 sm:mt-3" aria-hidden="true">
      <span className="flex gap-[2px]">
        {['var(--color-brand-blue)', 'var(--color-brand-red)', 'var(--color-brand-yellow)', 'var(--color-ink)'].map((color) => (
          <span key={color} className="block h-3 w-3 sm:h-4 sm:w-4" style={{ backgroundColor: color }} />
        ))}
      </span>
      <span className="h-2 flex-1 rounded-sm bg-gradient-to-r from-ink/5 via-ink/40 to-ink/90 sm:h-2.5" />
      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-ink/60 sm:text-[10px]">{label}</span>
    </div>
  );
}

/** Crop marks and a registration target in the corners, like the edge of a real press proof. */
function PressMarks() {
  const corners = [
    'left-0 top-0 -translate-x-full -translate-y-full border-b border-r',
    'right-0 top-0 translate-x-full -translate-y-full border-b border-l',
    'bottom-0 left-0 -translate-x-full translate-y-full border-r border-t',
    'bottom-0 right-0 translate-x-full translate-y-full border-l border-t',
  ];
  return (
    <>
      {corners.map((corner) => (
        <span key={corner} className={`pointer-events-none absolute h-3 w-3 border-white/80 sm:h-4 sm:w-4 ${corner}`} aria-hidden="true" />
      ))}
      <span
        className="pointer-events-none absolute -right-7 top-1/2 hidden h-4 w-4 -translate-y-1/2 rounded-full border border-white/70 sm:block"
        aria-hidden="true"
      >
        <span className="absolute left-1/2 top-[-4px] h-6 w-px -translate-x-1/2 bg-white/70" />
        <span className="absolute left-[-4px] top-1/2 h-px w-6 -translate-y-1/2 bg-white/70" />
      </span>
    </>
  );
}

/**
 * One picture, presented as a printed proof sheet: white paper margin, crop marks, a colour bar underneath —
 * and a printer's loupe. Move the mouse (or drag a finger) over the print and a round lens magnifies it, its
 * rim made of the four ink colours.
 */
export default function ProofSheet({ item, proofLabel, aspectRatio, onAspectRatio, isLoupeOn, isPriority = false }: ProofSheetProps) {
  const pictureRef = useRef<HTMLDivElement>(null);
  const [lens, setLens] = useState<LensState | null>(null);
  const [pictureSize, setPictureSize] = useState({ width: 0, height: 0 });
  const [hasUsedLoupe, setHasUsedLoupe] = useState(false);

  const updateLens = (event: React.PointerEvent<HTMLDivElement>) => {
    const picture = pictureRef.current;
    if (!picture) return;
    const bounds = picture.getBoundingClientRect();
    setPictureSize({ width: bounds.width, height: bounds.height });
    setLens({
      x: Math.min(bounds.width, Math.max(0, event.clientX - bounds.left)),
      y: Math.min(bounds.height, Math.max(0, event.clientY - bounds.top)),
      isTouch: event.pointerType !== 'mouse',
    });
    setHasUsedLoupe(true);
  };

  const hideLens = () => setLens(null);

  const lensSize = lens?.isTouch ? LOUPE_SIZE_PHONE : LOUPE_SIZE_DESKTOP;
  const lensTop = lens ? lens.y - lensSize / 2 - (lens.isTouch ? TOUCH_LIFT_PX : 0) : 0;

  return (
    <div className="rounded-md bg-white p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)] sm:p-3">
      <div className="relative">
        <PressMarks />
        <div
          ref={pictureRef}
          className={`relative w-full bg-paper-deep ${isLoupeOn ? 'cursor-none touch-none' : ''}`}
          style={{ aspectRatio }}
          onPointerEnter={isLoupeOn ? updateLens : undefined}
          onPointerDown={isLoupeOn ? updateLens : undefined}
          onPointerMove={isLoupeOn ? updateLens : undefined}
          onPointerUp={isLoupeOn ? (event) => event.pointerType !== 'mouse' && hideLens() : undefined}
          onPointerCancel={isLoupeOn ? hideLens : undefined}
          onPointerLeave={isLoupeOn ? hideLens : undefined}
        >
          <span className="absolute inset-0 overflow-hidden">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(min-width: 1024px) 60vw, 92vw"
            priority={isPriority}
            draggable={false}
            onLoad={(event) => {
              const { naturalWidth, naturalHeight } = event.currentTarget;
              if (naturalWidth && naturalHeight) onAspectRatio(item.id, naturalWidth / naturalHeight);
            }}
            className="pointer-events-none select-none object-cover"
          />
          </span>

          {isLoupeOn && lens && (
            <span
              className="pointer-events-none absolute z-10 rounded-full p-[4px] shadow-[0_12px_30px_rgba(0,0,0,0.45)]"
              style={{
                width: lensSize,
                height: lensSize,
                left: lens.x - lensSize / 2,
                top: lensTop,
                background:
                  'conic-gradient(var(--color-brand-blue), var(--color-brand-red), var(--color-brand-yellow), var(--color-ink), var(--color-brand-blue))',
              }}
              aria-hidden="true"
            >
              <span
                className="block h-full w-full rounded-full bg-white bg-no-repeat"
                style={{
                  backgroundImage: `url(${item.src})`,
                  backgroundSize: `${pictureSize.width * LOUPE_ZOOM}px ${pictureSize.height * LOUPE_ZOOM}px`,
                  backgroundPosition: `${-(lens.x * LOUPE_ZOOM - (lensSize - 8) / 2)}px ${-(
                    (lens.y - (lens.isTouch ? TOUCH_LIFT_PX : 0)) * LOUPE_ZOOM -
                    (lensSize - 8) / 2
                  )}px`,
                }}
              />
            </span>
          )}

          {isLoupeOn && !hasUsedLoupe && (
            <span className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center" aria-hidden="true">
              <span className="animate-pulse rounded-full bg-ink/80 px-3.5 py-1.5 text-[11px] font-semibold text-white backdrop-blur">
                Drag over the print to look closer
              </span>
            </span>
          )}
        </div>
      </div>
      <ColourBar label={`Proof ${proofLabel}`} />
    </div>
  );
}
