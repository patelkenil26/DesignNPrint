'use client';

import { useEffect, useState } from 'react';

interface TypeJumpBarProps {
  types: Array<{ slug: string; name: string }>;
}

/** Sticky chip row that jumps to a type card and highlights the one currently in view. */
export default function TypeJumpBar({ types }: TypeJumpBarProps) {
  const [activeSlug, setActiveSlug] = useState<string>(types[0]?.slug ?? '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveSlug(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -55% 0px' },
    );
    types.forEach((type) => {
      const element = document.getElementById(type.slug);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [types]);

  return (
    <div className="sticky top-[var(--nav-height)] z-30 border-b border-ink/10 bg-paper/90 backdrop-blur-md">
      <nav aria-label="Jump to a type" className="mx-auto max-w-7xl px-5 sm:px-10">
        <ul className="no-scrollbar flex gap-2 overflow-x-auto py-3">
          {types.map((type) => {
            const isActive = type.slug === activeSlug;
            return (
              <li key={type.slug} className="shrink-0">
                <a
                  href={`#${type.slug}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`block rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-300 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
                    isActive ? 'bg-ink text-white shadow-md' : 'bg-white text-ink/70 ring-1 ring-ink/10 hover:text-ink hover:ring-ink/30'
                  }`}
                >
                  {type.name}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
