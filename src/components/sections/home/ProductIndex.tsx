'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';
import { getProductIndexLink, productIndex, type IndexedProduct } from '@/data/productIndex';

const accentTint = (product: IndexedProduct, percent: number) =>
  `color-mix(in srgb, var(--color-brand-${product.accent}) ${percent}%, var(--color-paper))`;

const formatNumber = (index: number) => String(index + 1).padStart(2, '0');

/**
 * The full range: all 17 products as one editorial index.
 * Desktop — hover/focus a row and the preview panel on the right swaps to that product.
 * Mobile — each row carries its own thumbnail and links straight through.
 */
export default function ProductIndex() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = productIndex[activeIndex] ?? productIndex[0];
  const activeLink = getProductIndexLink(activeProduct);

  return (
    <section id="all-products" className="bg-paper py-20 sm:py-28" aria-labelledby="product-index-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">The full range</p>
          <h2 id="product-index-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-5xl">
            {productIndex.length} products. One studio.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-ink/70">
            Whatever your business hands out, ships in or puts on a wall — we design it, print it and finish it.
            Pick a product to see more.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <ol className="border-t border-ink/15">
            {productIndex.map((product, index) => {
              const { href, isExternal } = getProductIndexLink(product);
              const isActive = index === activeIndex;
              const rowClasses =
                'group relative flex items-center gap-4 overflow-hidden border-b border-ink/15 py-4 pr-2 transition-colors sm:gap-6 sm:py-5 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-blue';
              const rowContent = (
                <>
                  <span
                    aria-hidden="true"
                    className={`absolute inset-y-0 left-0 -z-0 w-full origin-left transition-transform duration-500 ease-out ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                    style={{ backgroundColor: accentTint(product, 22) }}
                  />
                  <span className="relative w-7 shrink-0 font-display text-sm font-semibold text-muted sm:w-9">
                    {formatNumber(index)}
                  </span>

                  <span
                    aria-hidden="true"
                    className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl lg:hidden"
                    style={{ backgroundColor: accentTint(product, 35) }}
                  >
                    {product.image && (
                      <Image src={product.image} alt="" fill sizes="56px" className="object-cover" />
                    )}
                  </span>

                  <span className="relative min-w-0 flex-1">
                    <span
                      className={`block font-display text-xl font-bold leading-tight text-ink transition-transform duration-300 sm:text-3xl ${
                        isActive ? 'lg:translate-x-2' : ''
                      }`}
                    >
                      {product.name}
                    </span>
                    <span className="mt-0.5 block text-sm leading-snug text-ink/60 lg:hidden">{product.line}</span>
                  </span>

                  <span
                    className={`relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink transition-all duration-300 group-hover:bg-ink group-hover:text-white ${
                      isActive ? 'bg-ink text-white' : ''
                    }`}
                  >
                    {isExternal ? <MessageCircle className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                    <span className="sr-only">{isExternal ? `Get a quote for ${product.name}` : `View ${product.name}`}</span>
                  </span>
                </>
              );

              return (
                <li key={product.id} onMouseEnter={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)}>
                  {isExternal ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className={rowClasses}>
                      {rowContent}
                    </a>
                  ) : (
                    <Link href={href} className={rowClasses}>
                      {rowContent}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>

          {/* preview panel — desktop only */}
          <div className="relative hidden lg:block">
            <div className="sticky top-[calc(var(--nav-height)+2rem)]">
              <div
                className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl transition-colors duration-500"
                style={{ backgroundColor: accentTint(activeProduct, 40) }}
              >
                {productIndex.map((product, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <div
                      key={product.id}
                      aria-hidden={!isActive}
                      className={`absolute inset-0 transition-all duration-500 ease-out ${
                        isActive ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                      }`}
                    >
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.imageAlt ?? product.name}
                          fill
                          sizes="(min-width: 1024px) 40vw, 0px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full flex-col justify-between p-8">
                          <span className="font-display text-8xl font-black leading-none text-ink/15">
                            {formatNumber(index)}
                          </span>
                          <span className="font-display text-3xl font-bold leading-tight text-ink">
                            {product.name}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
                <span className="cmyk-strip absolute inset-x-0 bottom-0 h-1.5" />
              </div>

              <div className="mt-5 flex items-start justify-between gap-6">
                <div key={activeProduct.id} className="animate-fade-up">
                  <h3 className="font-display text-xl font-bold text-ink">{activeProduct.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">{activeProduct.line}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-muted">
                    {activeLink.isExternal ? 'Quote on WhatsApp' : 'View product page'}
                  </p>
                </div>
                <span className="shrink-0 font-display text-sm font-semibold text-muted">
                  {formatNumber(activeIndex)} / {productIndex.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
