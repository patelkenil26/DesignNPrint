'use client';

import { Maximize2 } from 'lucide-react';
import { useImageViewer } from '@/components/shared/ImageViewer/ImageViewerContext';

interface ViewerTriggerProps {
  /** id of the matching item given to the provider */
  itemId: string;
  /** what the picture shows — used for the button's accessible name */
  label: string;
}

/**
 * Drop this inside any `relative` image box: it covers the box with an invisible button and shows a small
 * "enlarge" badge in the corner, so a tap (or click) anywhere on the picture opens the full-screen viewer.
 */
export default function ViewerTrigger({ itemId, label }: ViewerTriggerProps) {
  const { openViewer } = useImageViewer();

  return (
    <>
      <button
        type="button"
        onClick={(event) => openViewer(itemId, event.currentTarget.parentElement)}
        aria-label={`View ${label} larger`}
        aria-haspopup="dialog"
        className="absolute inset-0 z-20 cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-brand-blue"
      />
      <span
        className="pointer-events-none absolute bottom-2 right-2 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-ink/80 text-white shadow-lg backdrop-blur transition-transform duration-300 group-hover:scale-110 sm:bottom-3 sm:right-3"
        aria-hidden="true"
      >
        <Maximize2 className="h-3.5 w-3.5" />
      </span>
    </>
  );
}
