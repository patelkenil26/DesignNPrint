'use client';

import { createContext, useContext } from 'react';

/** One picture the viewer can show. Plain data, so a server page can pass it straight in. */
export interface ViewerItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  /** one-line description shown under the title */
  line?: string;
  /** pre-filled WhatsApp text for the "ask for this" button */
  whatsappMessage: string;
}

/** Where the picture was clicked — the viewer grows out of this box. */
export interface ViewerOrigin {
  centerX: number;
  centerY: number;
  width: number;
}

interface ImageViewerContextValue {
  openViewer: (itemId: string, originElement: HTMLElement | null) => void;
}

export const ImageViewerContext = createContext<ImageViewerContextValue | null>(null);

/** Hook for the small client pieces (triggers) that open the viewer. */
export function useImageViewer(): ImageViewerContextValue {
  const context = useContext(ImageViewerContext);
  if (!context) throw new Error('useImageViewer must be used inside <ImageViewerProvider>');
  return context;
}
