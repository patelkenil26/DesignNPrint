'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { CoreValue, InkColor } from '@/data/aboutData';

const inkColor: Record<InkColor, string> = {
  blue: 'var(--color-brand-blue)',
  red: 'var(--color-brand-red)',
  yellow: 'var(--color-brand-yellow)',
  ink: 'var(--color-ink)',
};

/** Black ink needs light text once the plate floods the card (hover, keyboard focus, or "centred on a touch screen"). */
const textOnFlood: Record<InkColor, string> = {
  blue: 'group-hover:text-ink group-focus-visible:text-ink group-data-[active=true]:text-ink',
  red: 'group-hover:text-white group-focus-visible:text-white group-data-[active=true]:text-white',
  yellow: 'group-hover:text-ink group-focus-visible:text-ink group-data-[active=true]:text-ink',
  ink: 'group-hover:text-white group-focus-visible:text-white group-data-[active=true]:text-white',
};

interface ValueCardProps {
  /** the value's copy and ink (the icon component itself cannot cross the server → client boundary) */
  value: Pick<CoreValue, 'title' | 'description' | 'ink' | 'plate'>;
  icon: ReactNode;
}

/**
 * One core value, "printed" in its process ink. On desktop the ink floods the card on hover.
 * Phones have no hover, so there the card floods by itself while it sits in the middle of the screen.
 */
export default function ValueCard({ value, icon }: ValueCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [isCentred, setIsCentred] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !window.matchMedia('(hover: none)').matches) return;
    const observer = new IntersectionObserver(([entry]) => setIsCentred(entry.isIntersecting), {
      rootMargin: '-46% 0px -46% 0px',
    });
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      tabIndex={0}
      data-active={isCentred}
      className="group relative flex h-full min-h-[13rem] flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl focus-visible:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue sm:min-h-[18rem] sm:p-7"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100 group-data-[active=true]:scale-y-100"
        style={{ backgroundColor: inkColor[value.ink] }}
      />
      <span
        aria-hidden="true"
        className="absolute right-3 top-0 select-none font-display text-[7rem] font-black leading-none text-ink/[0.06] transition-colors duration-500 group-hover:text-black/10 group-data-[active=true]:text-black/10 sm:text-[9rem]"
      >
        {value.plate}
      </span>

      <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-brand-yellow transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-white group-hover:text-ink group-data-[active=true]:rotate-6 group-data-[active=true]:scale-110 group-data-[active=true]:bg-white group-data-[active=true]:text-ink">
        {icon}
      </span>
      <span
        aria-hidden="true"
        className="relative mt-4 block h-1 w-10 rounded-full transition-all duration-500 group-hover:w-16 group-data-[active=true]:w-16"
        style={{ backgroundColor: inkColor[value.ink] }}
      />
      <h3
        className={`relative mt-auto pt-8 font-display text-xl font-bold text-ink transition-colors duration-500 sm:pt-10 ${textOnFlood[value.ink]}`}
      >
        {value.title}
      </h3>
      <p className={`relative mt-2 text-sm leading-relaxed text-ink/70 transition-colors duration-500 ${textOnFlood[value.ink]}`}>
        {value.description}
      </p>
    </article>
  );
}
