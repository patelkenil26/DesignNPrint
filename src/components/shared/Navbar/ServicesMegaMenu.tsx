'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import SafeImage from '@/components/shared/SafeImage';
import { productCategories } from '@/data/categories';
import type { ProductCardData } from '@/lib/productCards';

interface ServicesMegaMenuProps {
  products: ProductCardData[];
  pathname: string;
  onNavigate: () => void;
}

const MAX_TYPE_CHIPS = 4;
const easeOutExpo = [0.22, 1, 0.36, 1] as const;

/** Products grouped by category; anything not listed in a category still gets a place under "More". */
function groupProductsByCategory(products: ProductCardData[]) {
  const bySlug = new Map(products.map((product) => [product.slug, product]));
  const groups = productCategories.map((category) => ({
    id: category.id,
    name: category.name,
    accent: category.accent,
    items: category.productSlugs.flatMap((slug) => bySlug.get(slug) ?? []).sort((a, b) => a.name.localeCompare(b.name, "en")),
  }));
  const grouped = new Set(groups.flatMap((group) => group.items.map((item) => item.slug)));
  const leftovers = products.filter((product) => !grouped.has(product.slug));
  return leftovers.length ? [...groups, { id: 'more', name: 'More', accent: 'yellow' as const, items: leftovers }] : groups;
}

/**
 * The panel under "Services": products grouped by category on the left, and a live preview card on the right
 * that follows whichever product you hover or focus.
 */
export default function ServicesMegaMenu({ products, pathname, onNavigate }: ServicesMegaMenuProps) {
  const isMotionAllowed = !useReducedMotion();
  const groups = groupProductsByCategory(products);
  const currentSlug = pathname.startsWith('/services/') ? pathname.split('/')[2] : undefined;
  const [previewSlug, setPreviewSlug] = useState<string>(currentSlug ?? products[0]?.slug ?? '');
  const preview = products.find((product) => product.slug === previewSlug) ?? products[0];
  if (!preview) return null;

  return (
    <motion.div
      initial={isMotionAllowed ? { opacity: 0, y: -10, clipPath: 'inset(0 0 100% 0 round 24px)' } : { opacity: 0 }}
      animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0 round 24px)' }}
      exit={isMotionAllowed ? { opacity: 0, y: -8, clipPath: 'inset(0 0 40% 0 round 24px)' } : { opacity: 0 }}
      transition={{ duration: 0.38, ease: easeOutExpo }}
      className="absolute inset-x-0 top-full z-50 px-4 pt-2"
    >
      <div onClick={onNavigate} className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-white text-ink shadow-2xl ring-1 ring-ink/10">
        <div className="cmyk-strip h-1" aria-hidden="true" />
        <div className="grid lg:grid-cols-[1fr_21rem]">
          <div className="grid grid-cols-3 gap-x-6 gap-y-7 p-7">
            {groups.map((group, groupIndex) => (
              <motion.div
                key={group.id}
                initial={isMotionAllowed ? { opacity: 0, y: 12 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + groupIndex * 0.05, duration: 0.4, ease: easeOutExpo }}
              >
                <p className="mb-2 flex min-h-8 items-start gap-2 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
                  <span className="mt-1 h-1.5 w-5 shrink-0 rounded-full" style={{ backgroundColor: `var(--color-brand-${group.accent})` }} aria-hidden="true" />
                  {group.name}
                </p>
                <ul>
                  {group.items.map((product) => {
                    const isCurrent = currentSlug === product.slug;
                    return (
                      <li key={product.slug}>
                        <Link
                          href={`/services/${product.slug}`}
                          aria-current={isCurrent ? 'page' : undefined}
                          onMouseEnter={() => setPreviewSlug(product.slug)}
                          onFocus={() => setPreviewSlug(product.slug)}
                          className={`group/item relative flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 hover:translate-x-1 hover:bg-paper focus-visible:bg-paper focus-visible:outline-none ${
                            isCurrent || previewSlug === product.slug ? 'bg-paper text-ink' : 'text-ink/75'
                          }`}
                        >
                          <span
                            className="h-2.5 w-2.5 shrink-0 rounded-full transition-transform duration-200 group-hover/item:scale-125"
                            style={{ backgroundColor: `var(--color-brand-${product.accent})` }}
                            aria-hidden="true"
                          />
                          {product.name}
                          <ArrowRight className="ml-auto h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover/item:translate-x-0 group-hover/item:opacity-100 group-focus-visible/item:translate-x-0 group-focus-visible/item:opacity-100" aria-hidden="true" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* live preview of the hovered product */}
          <aside className="relative hidden overflow-hidden bg-ink p-5 text-white lg:block" aria-label="Product preview">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={preview.slug}
                initial={isMotionAllowed ? { opacity: 0, x: 16 } : false}
                animate={{ opacity: 1, x: 0 }}
                exit={isMotionAllowed ? { opacity: 0, x: -10 } : { opacity: 0 }}
                transition={{ duration: 0.24, ease: easeOutExpo }}
                className="flex h-full flex-col"
              >
                <div
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl"
                  style={{ backgroundColor: `color-mix(in srgb, var(--color-brand-${preview.accent}) 28%, var(--color-ink-soft))` }}
                >
                  {preview.image ? (
                    <SafeImage src={preview.image} alt={preview.coverAlt} fill sizes="336px" className="object-cover" />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center font-display text-7xl font-black text-white/25" aria-hidden="true">
                      {String(preview.number).padStart(2, '0')}
                    </span>
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 font-mono text-[11px] font-bold tracking-widest text-white backdrop-blur">
                    № {String(preview.number).padStart(2, '0')}
                  </span>
                </div>
                <p className="mt-4 font-display text-xl font-bold leading-tight">{preview.name}</p>
                <p className="mt-1 text-sm text-white/75">{preview.tagline}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {preview.typeNames.slice(0, MAX_TYPE_CHIPS).map((typeName) => (
                    <li key={typeName} className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/85">
                      {typeName}
                    </li>
                  ))}
                  {preview.typeNames.length > MAX_TYPE_CHIPS && (
                    <li className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/85">
                      +{preview.typeNames.length - MAX_TYPE_CHIPS} more
                    </li>
                  )}
                </ul>
                <Link
                  href={`/services/${preview.slug}`}
                  className="group/cta mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-brand-yellow px-4 py-2.5 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 active:scale-95"
                >
                  Explore {preview.name}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" aria-hidden="true" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </aside>
        </div>

        <Link href="/services" className="group/all flex items-center justify-between bg-paper px-8 py-4 text-sm font-semibold text-ink transition-colors hover:bg-paper-deep">
          Browse all {products.length} products
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/all:translate-x-1.5" aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  );
}
