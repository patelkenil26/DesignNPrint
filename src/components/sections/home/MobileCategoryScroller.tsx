'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SafeImage from '@/components/shared/SafeImage';
import { getCategoryHref, productCategories } from '@/data/categories';

/** Height of a closed panel header. */
const CLOSED_PANEL_REM = 3.25;
/** Height of the open panel — tall enough for a photo, never taller than the screen allows. */
const OPEN_PANEL_HEIGHT = 'min(24rem, 62svh)';

const formatNumber = (index: number) => String(index + 1).padStart(2, '0');

/**
 * Phone / tablet version of "Explore by category": a tap-to-open accordion. One family is open at a time;
 * tapping a header opens it and closes the previous one. Nothing moves on its own while you scroll the page.
 */
export default function MobileCategoryScroller() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative bg-paper" aria-labelledby="mobile-category-heading">
      <div className="px-4 pb-8 pt-8 sm:px-8 sm:pb-12 sm:pt-12">
        <div className="shrink-0">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">Explore by category</p>
          <h2 id="mobile-category-heading" className="mt-1.5 font-display text-2xl font-bold leading-tight text-ink sm:text-4xl">
            Six ways we bring your brand to life.
          </h2>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          {productCategories.map((category, index) => {
            const isActive = index === activeIndex;
            const accentColor = `var(--color-brand-${category.accent})`;
            return (
              <article
                key={category.id}
                className="relative overflow-hidden rounded-2xl text-white transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  height: isActive ? OPEN_PANEL_HEIGHT : `${CLOSED_PANEL_REM}rem`,
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
                  onClick={() => setActiveIndex(index)}
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
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-yellow">{category.tagline}</p>
                  <h3 className="mt-1 font-display text-xl font-bold leading-tight sm:text-3xl">{category.name}</h3>
                  <p className="mt-1.5 max-w-md text-sm leading-relaxed text-white/80">{category.blurb}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2.5">
                    <Link
                      href={getCategoryHref(category.slug)}
                      tabIndex={isActive ? 0 : -1}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
                    >
                      Explore {category.name.split(',')[0]} <ArrowRight className="h-4 w-4" />
                    </Link>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur">
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
