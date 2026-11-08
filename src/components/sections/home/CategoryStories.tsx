'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getCategoryHref, productCategories } from '@/data/categories';
import { useScrollTrack } from '@/lib/useScrollTrack';

const CategoryStoriesScene = dynamic(() => import('@/components/three/CategoryStoriesScene'), { ssr: false });

/**
 * Pinned scroll story: one 3D object per main category — a bottle gets its sticker,
 * cards fan out, a brochure unfolds, boxes open, a file reveals documents, a banner rolls up.
 */
export default function CategoryStories() {
  const { trackRef, stickyRef, getProgress } = useScrollTrack();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCategory = productCategories[activeIndex] ?? productCategories[0];

  return (
    <section ref={trackRef} className="relative h-[1000vh]" aria-labelledby="category-stories-heading">
      <div
        className="sticky top-[var(--nav-height)] h-[calc(100svh-var(--nav-height))] w-full overflow-hidden transition-colors duration-700"
        ref={stickyRef}
        style={{ backgroundColor: `color-mix(in srgb, var(--color-brand-${activeCategory.accent}) 16%, var(--color-paper))` }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_65%_50%,rgba(255,255,255,0.8),transparent_70%)]" />

        <CategoryStoriesScene getProgress={getProgress} onActiveChange={setActiveIndex} />

        <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-between px-5 py-8 sm:px-10 lg:justify-center lg:py-0">
          <div className="max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">Explore by category</p>
            <h2
              id="category-stories-heading"
              className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-5xl"
            >
              Six ways we bring your brand to life.
            </h2>
          </div>

          <div className="pointer-events-auto max-w-md rounded-3xl bg-white/85 p-5 shadow-xl backdrop-blur-md lg:mt-8">
            <div key={activeIndex} className="animate-fade-up">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-muted">
              <span>{activeCategory.tagline}</span>
              <span>
                {String(activeIndex + 1).padStart(2, '0')} / {String(productCategories.length).padStart(2, '0')}
              </span>
            </div>
            <h3 className="mt-2 font-display text-xl font-bold text-ink sm:text-2xl">{activeCategory.name}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{activeCategory.blurb}</p>

            <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={`${activeCategory.name} types`}>
              {activeCategory.subCategories.map((subCategory) => (
                <li key={subCategory.name} className="rounded-full border border-ink/15 px-3 py-1 text-xs font-medium text-ink/80">
                  {subCategory.name}
                </li>
              ))}
            </ul>

            <Link
              href={getCategoryHref(activeCategory.slug)}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
            >
              Explore {activeCategory.name} <ArrowRight className="h-4 w-4" />
            </Link>
            </div>
          </div>
        </div>

        <ol className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 sm:flex" aria-label="Categories">
          {productCategories.map((category, index) => (
            <li key={category.id} className="flex items-center justify-end gap-3" title={category.name}>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'h-3 w-3 bg-ink' : 'h-2 w-2 bg-ink/25'
                }`}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
