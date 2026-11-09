'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Search, X } from 'lucide-react';
import ProductSwatchCard from '@/components/sections/Services/ProductSwatchCard';
import { buildWhatsAppLink } from '@/data/siteConfig';
import type { ProductCardData } from '@/lib/productCards';

interface ProductMosaicProps {
  products: ProductCardData[];
}

/** All products in one grid with instant search across product names and their types. */
export default function ProductMosaic({ products }: ProductMosaicProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const visibleProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return products;
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.tagline.toLowerCase().includes(term) ||
        product.typeNames.some((typeName) => typeName.toLowerCase().includes(term)),
    );
  }, [products, searchTerm]);

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
            placeholder="Search products or types…"
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
          Showing <span className="font-semibold text-ink">{visibleProducts.length}</span> of {products.length} products
        </p>
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
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
                {hasNoResults ? 'Nothing matches that search.' : 'Don’t see what you need?'}
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
