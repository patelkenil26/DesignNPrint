'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SafeImage from '@/components/shared/SafeImage';
import { getCategoryHref, productCategories } from '@/data/categories';

/** Scroll distance given to each family, as a share of the viewport height. */
const SCROLL_PER_CATEGORY_VH = 34;
/** Height of a closed panel header. */
const CLOSED_PANEL_REM = 2.75;

const formatNumber = (index: number) => String(index + 1).padStart(2, '0');

/**
 * Phone / tablet version of "Explore by category". The section pins to the screen and, as you scroll, the open
 * panel closes into a header while the next family unfolds — so every family gets its moment without any tapping.
 * Tapping a header still jumps straight to that family.
 */
export default function MobileCategoryScroller() {
  const trackRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalCategories = productCategories.length;

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const nextIndex = Math.min(totalCategories - 1, Math.max(0, Math.floor(value * totalCategories)));
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  const jumpToCategory = (categoryIndex: number) => {
    const track = trackRef.current;
    if (!track) return;
    const scrollable = track.offsetHeight - window.innerHeight;
    const top = track.getBoundingClientRect().top + window.scrollY + ((categoryIndex + 0.15) / totalCategories) * scrollable;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <section
      ref={trackRef}
      className="relative bg-paper"
      style={{ height: `calc(100svh + ${totalCategories * SCROLL_PER_CATEGORY_VH}vh)` }}
      aria-labelledby="mobile-category-heading"
    >
      <div className="sticky top-[var(--nav-height)] flex h-[calc(100svh-var(--nav-height))] flex-col overflow-hidden px-4 pb-3 pt-4 sm:px-8">
        <div className="shrink-0">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">Explore by category</p>
          <h2 id="mobile-category-heading" className="mt-1.5 font-display [@media(max-height:700px)]:text-xl text-2xl font-bold leading-tight text-ink sm:text-4xl">
            Six ways we bring your brand to life.
          </h2>
        </div>

        <div className="mt-3 flex min-h-0 flex-1 flex-col gap-1.5">
          {productCategories.map((category, index) => {
            const isActive = index === activeIndex;
            const accentColor = `var(--color-brand-${category.accent})`;
            return (
              <article
                key={category.id}
                className="relative min-h-0 overflow-hidden rounded-2xl text-white transition-[flex] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  flex: isActive ? '1 1 0%' : `0 0 ${CLOSED_PANEL_REM}rem`,
                  backgroundColor: `color-mix(in srgb, ${accentColor} 55%, var(--color-ink))`,
                }}
              >
                <SafeImage
                  src={category.image}
                  alt={category.imageAlt}
                  fill
                  sizes="(min-width: 640px) 90vw, 100vw"
                  className={`object-cover transition-all duration-700 ${isActive ? 'scale-100 opacity-100' : 'scale-110 opacity-25'}`}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/55 to-ink/10" aria-hidden="true" />
                <span className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundColor: accentColor }} aria-hidden="true" />

                <button
                  type="button"
                  onClick={() => jumpToCategory(index)}
                  aria-expanded={isActive}
                  aria-controls={`mobile-category-panel-${category.id}`}
                  className="absolute inset-x-0 top-0 flex w-full items-center gap-3 px-4 text-left focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-brand-yellow"
                  style={{ height: `${CLOSED_PANEL_REM}rem` }}
                >
                  <span className="font-display text-sm font-bold text-brand-yellow">{formatNumber(index)}</span>
                  <span className={`font-display text-base font-bold leading-tight transition-opacity duration-300 ${isActive ? 'opacity-0' : ''}`}>
                    {category.name}
                  </span>
                </button>

                <div
                  id={`mobile-category-panel-${category.id}`}
                  className={`absolute inset-x-0 bottom-0 p-4 transition-all duration-700 ease-out sm:p-6 ${
                    isActive ? 'translate-y-0 opacity-100 delay-300' : 'pointer-events-none translate-y-6 opacity-0'
                  }`}
                  aria-hidden={!isActive}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-yellow [@media(max-height:700px)]:hidden">{category.tagline}</p>
                  <h3 className="mt-1 font-display text-xl font-bold leading-tight sm:text-3xl">{category.name}</h3>
                  <p className="mt-1.5 max-w-md text-sm leading-relaxed text-white/80 [@media(max-height:720px)]:hidden">{category.blurb}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2.5">
                    <Link
                      href={getCategoryHref(category.slug)}
                      tabIndex={isActive ? 0 : -1}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
                    >
                      Explore {category.name.split(',')[0]} <ArrowRight className="h-4 w-4" />
                    </Link>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur [@media(max-height:700px)]:hidden">
                      <span className="font-display text-sm font-black text-brand-yellow">{category.productSlugs.length}</span>
                      {category.productSlugs.length === 1 ? 'product' : 'products'}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
