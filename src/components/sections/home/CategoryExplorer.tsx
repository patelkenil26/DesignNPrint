'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SafeImage from '@/components/shared/SafeImage';
import { getCategoryHref, productCategories } from '@/data/categories';

const formatNumber = (index: number) => String(index + 1).padStart(2, '0');

/**
 * "Explore by category" — six panels that behave like a fanned-out swatch book.
 * Desktop: panels sit side by side and the hovered one opens wide. Mobile: they stack and the tapped one unfolds.
 */
export default function CategoryExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-paper py-20 sm:py-28" aria-labelledby="category-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">Explore by category</p>
          <h2 id="category-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-5xl">
            Six ways we bring your brand to life.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-ink/70">
            Hover or tap a swatch to open it. Each family has its own page — and every product inside it is shown one by one just below.
          </p>
        </motion.div>

        <div className="mt-12 flex flex-col gap-3 lg:h-[34rem] lg:flex-row">
          {productCategories.map((category, index) => {
            const isActive = index === activeIndex;
            const accentColor = `var(--color-brand-${category.accent})`;
            return (
              <motion.article
                key={category.id}
                onMouseEnter={() => setActiveIndex(index)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className={`relative overflow-hidden rounded-3xl text-white transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isActive ? 'h-[27rem] lg:h-auto lg:flex-[6]' : 'h-[4.75rem] lg:h-auto lg:flex-1'
                }`}
                style={{ backgroundColor: `color-mix(in srgb, ${accentColor} 55%, var(--color-ink))` }}
              >
                <SafeImage
                  src={category.image}
                  alt={category.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className={`object-cover transition-all duration-700 ${isActive ? 'scale-100 opacity-100' : 'scale-110 opacity-25'}`}
                />
                <span
                  className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-transparent"
                  aria-hidden="true"
                />
                <span className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundColor: accentColor }} aria-hidden="true" />

                {/* header — the only thing visible while a panel is closed */}
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  aria-expanded={isActive}
                  aria-controls={`category-panel-${category.id}`}
                  className="absolute inset-x-0 top-0 flex w-full items-center gap-3 px-5 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-brand-yellow lg:inset-y-0 lg:block lg:px-0 lg:py-0"
                >
                  <span className={`font-display text-sm font-bold text-brand-yellow lg:absolute lg:top-6 lg:transition-all lg:duration-500 ${isActive ? 'lg:left-8 lg:translate-x-0' : 'lg:left-1/2 lg:-translate-x-1/2'}`}>
                    {formatNumber(index)}
                  </span>
                  <span
                    className={`font-display text-lg font-bold leading-tight sm:text-xl lg:absolute lg:left-1/2 lg:top-20 lg:-translate-x-1/2 lg:whitespace-nowrap lg:text-2xl lg:[writing-mode:vertical-rl] lg:rotate-180 ${
                      isActive ? 'lg:opacity-0' : ''
                    } transition-opacity duration-300`}
                  >
                    {category.name}
                  </span>
                </button>

                {/* body — opens when the panel is active */}
                <div
                  id={`category-panel-${category.id}`}
                  className={`absolute inset-x-0 bottom-0 p-6 transition-all duration-700 ease-out sm:p-8 lg:p-10 ${
                    isActive ? 'translate-y-0 opacity-100 delay-200' : 'pointer-events-none translate-y-6 opacity-0'
                  }`}
                  aria-hidden={!isActive}
                >
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-brand-yellow)' }}>
                    {category.tagline}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold leading-tight sm:text-4xl">{category.name}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/80">{category.blurb}</p>
                  <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
                    <span className="font-display text-base font-black text-brand-yellow">{category.productSlugs.length}</span>
                    {category.productSlugs.length === 1 ? 'product' : 'products'} in this family
                  </p>
                  <Link
                    href={getCategoryHref(category.slug)}
                    tabIndex={isActive ? 0 : -1}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
                  >
                    Explore {category.name} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
