'use client';

import React, { useRef } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  /** colour of the light that follows the pointer */
  spotColor?: string;
}

/** A card with a soft light that follows the pointer (set via CSS variables — no re-renders). */
export default function SpotlightCard({ children, className = '', spotColor = 'rgba(255,255,255,0.35)' }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    card.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`);
    card.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`);
  };

  return (
    <div ref={cardRef} onPointerMove={handlePointerMove} className={`group relative overflow-hidden ${className}`}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(340px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${spotColor}, transparent 65%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
