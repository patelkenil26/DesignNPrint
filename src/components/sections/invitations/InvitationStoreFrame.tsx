'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface InvitationStoreFrameProps {
  /** the studio's invitation store — its full interface fills everything below the navbar */
  src: string;
}

/**
 * The invitation store's own interface, filling the whole area under our navbar — no hero, no footer.
 * It is a separate app, so it scrolls inside the frame.
 */
export default function InvitationStoreFrame({ src }: InvitationStoreFrameProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative h-[calc(100svh-var(--nav-height))] w-full bg-paper">
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted" role="status">
          <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" />
          <span className="text-sm font-medium">Loading designs…</span>
        </div>
      )}
      <iframe
        src={src}
        title="Design N Print video invitation designs"
        allow="autoplay; fullscreen"
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
        onLoad={() => setIsLoaded(true)}
        className={`h-full w-full border-0 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
