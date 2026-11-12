'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Search, X } from 'lucide-react';
import ProductSwatchCard from '@/components/sections/Services/ProductSwatchCard';
import { productCategories } from '@/data/categories';
import { buildWhatsAppLink } from '@/data/siteConfig';
import type { ProductCardData } from '@/lib/productCards';
import { searchExamples, searchProducts } from '@/lib/productSearch';

interface ProductMosaicProps {
  products: ProductCardData[];
}

/** All products in one grid with instant search across product names and their types. */
export default function ProductMosaic({ products }: ProductMosaicProps) {
  const [searchTerm, setSearchTerm] = useState('');
  /** 'all' or the id of a product family */
  const [activeCategoryId, setActiveCategoryId] = useState('all');

  const trimmedTerm = searchTerm.trim();

  /** Search looks across every product (a typo should never hide behind a family filter); otherwise the chosen family. */
  const { visibleProducts, isApproximate } = useMemo(() => {
    if (trimmedTerm) {
      const outcome = searchProducts(trimmedTerm, products.length);
      const bySlug = new Map(products.map((product) => [product.slug, product]));
      const ranked = outcome.hits.flatMap((hit) => {
        const product = bySlug.get(hit.slug);
        return product ? [product] : [];
      });
      return { visibleProducts: ranked, isApproximate: outcome.isApproximate };
    }
    const activeCategory = productCategories.find((category) => category.id === activeCategoryId);
    const inFamily = activeCategory ? products.filter((product) => activeCategory.productSlugs.includes(product.slug)) : products;
    return { visibleProducts: inFamily, isApproximate: false };
  }, [products, trimmedTerm, activeCategoryId]);

  const hasNoResults = visibleProducts.length === 0;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full sm:max-w-md">
          <span className="sr-only">Search products and types</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search — e.g. visiting card, dabba, challan…"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="search"
            className="w-full rounded-full border border-ink/15 bg-white py-3 pl-11 pr-11 text-base text-ink sm:text-sm placeholder:text-muted transition-colors focus:border-ink focus:outline-none"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted transition-colors hover:bg-paper-deep hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </label>
        <p className="text-sm font-medium text-muted" aria-live="polite">
          {trimmedTerm && visibleProducts.length === 0 ? (
            <>No match for “{trimmedTerm}”</>
          ) : isApproximate ? (
            <>Closest matches for “{trimmedTerm}”</>
          ) : (
            <>
              Showing <span className="font-semibold text-ink">{visibleProducts.length}</span> of {products.length} products
            </>
          )}
        </p>
      </div>

      {!trimmedTerm && (
        <p className="mt-3 text-xs text-muted">
          Spelling does not have to be perfect — try {searchExamples.slice(0, 4).map((example) => `“${example}”`).join(', ')}.
        </p>
      )}

      {/* product families — a one-tap shortcut so nobody has to scan all seventeen cards */}
      <nav
        aria-label="Filter by product family"
        className="sticky top-[var(--nav-height)] z-20 -mx-5 mt-5 border-y border-ink/10 bg-paper/90 backdrop-blur-md sm:-mx-10"
      >
        <ul className="no-scrollbar flex gap-2 overflow-x-auto px-5 py-2.5 sm:px-10 sm:py-3">
          {[{ id: 'all', name: 'All', accent: 'yellow', count: products.length }, ...productCategories.map((category) => ({ id: category.id, name: category.name.split(',')[0], accent: category.accent, count: category.productSlugs.length }))].map((chip) => {
            const isActive = chip.id === activeCategoryId;
            return (
              <li key={chip.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveCategoryId(chip.id)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
                    isActive ? 'bg-ink text-white shadow-md' : 'bg-white text-ink/70 ring-1 ring-ink/10 hover:text-ink hover:ring-ink/30'
                  }`}
                >
                  {chip.id !== 'all' && <span className="h-2 w-2 rounded-full" style={{ backgroundColor: `var(--color-brand-${chip.accent})` }} aria-hidden="true" />}
                  {chip.name}
                  <span className={isActive ? 'text-white/70' : 'text-ink/60'}>{chip.count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-5 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visibleProducts.map((product, index) => (
            <motion.li
              key={product.slug}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductSwatchCard product={product} revealDelay={(index % 3) * 0.12} />
            </motion.li>
          ))}
        </AnimatePresence>

        <motion.li layout className={hasNoResults ? 'col-span-2 lg:col-span-3' : ''}>
          <div className="flex h-full min-h-[14rem] flex-col justify-between rounded-3xl bg-ink p-4 text-white sm:p-7">
            <span className="cmyk-strip block h-1.5 w-14 rounded-full" />
            <div className="mt-6">
              <h3 className="font-display text-xl font-bold leading-tight sm:text-2xl">
                {hasNoResults ? 'We could not find that — but we may still make it.' : 'Don’t see what you need?'}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {hasNoResults
                  ? 'Tell us what you are looking for — if it can be printed, we will find a way.'
                  : 'If it can be printed, we can make it. Tell us what you have in mind.'}
              </p>
              <a
                href={buildWhatsAppLink(
                  searchTerm.trim()
                    ? `Hi Design N Print, I am looking for: ${searchTerm.trim()}.`
                    : 'Hi Design N Print, I need something that is not on your website.',
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-whatsapp px-4 py-2.5 text-sm font-semibold text-ink sm:px-5 transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              >
                <MessageCircle className="h-4 w-4 shrink-0" /> <span className="sm:hidden">WhatsApp</span><span className="hidden sm:inline">Ask on WhatsApp</span>
              </a>
            </div>
          </div>
        </motion.li>
      </ul>
    </div>
  );
}
