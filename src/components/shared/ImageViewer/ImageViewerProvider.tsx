'use client';

import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ImageViewerDialog from '@/components/shared/ImageViewer/ImageViewerDialog';
import { ImageViewerContext, type ViewerItem, type ViewerOrigin } from '@/components/shared/ImageViewer/ImageViewerContext';

interface ImageViewerProviderProps {
  items: ViewerItem[];
  children: React.ReactNode;
}

interface OpenState {
  startIndex: number;
  origin: ViewerOrigin | null;
}

/** Wrap a page (or part of it): any <ViewerTrigger> inside can open the full-screen viewer on its picture. */
export default function ImageViewerProvider({ items, children }: ImageViewerProviderProps) {
  const [openState, setOpenState] = useState<OpenState | null>(null);

  const openViewer = useCallback(
    (itemId: string, originElement: HTMLElement | null) => {
      const startIndex = items.findIndex((item) => item.id === itemId);
      if (startIndex < 0) return;
      const bounds = originElement?.getBoundingClientRect();
      setOpenState({
        startIndex,
        origin: bounds
          ? { centerX: bounds.left + bounds.width / 2, centerY: bounds.top + bounds.height / 2, width: bounds.width }
          : null,
      });
    },
    [items],
  );

  const contextValue = useMemo(() => ({ openViewer }), [openViewer]);

  return (
    <ImageViewerContext.Provider value={contextValue}>
      {children}
      <AnimatePresence>
        {openState && (
          <ImageViewerDialog
            key="image-viewer"
            items={items}
            startIndex={openState.startIndex}
            origin={openState.origin}
            onClose={() => setOpenState(null)}
          />
        )}
      </AnimatePresence>
    </ImageViewerContext.Provider>
  );
}
