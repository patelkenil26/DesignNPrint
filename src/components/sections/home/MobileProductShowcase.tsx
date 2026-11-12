'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProductArt from '@/components/shared/ProductArt';
import SafeImage from '@/components/shared/SafeImage';
import LinkButton from '@/components/shared/LinkButton';
import { productCategories } from '@/data/categories';
import type { ProductCardData } from '@/lib/productCards';

/** How many products the phone layout shows before "View all". */
const MOBILE_FEATURED_COUNT = 4;

interface MobileProductShowcaseProps {
  products: ProductCardData[];
}

/**
 * Phone version of "The full range": a few hand-picked products (one from each of the first families)
 * as a tidy 2×2 grid, then a single "View all" button. Keeps the home page short even when the range grows.
 */
export default function MobileProductShowcase({ products }: MobileProductShowcaseProps) {
  const isMotionAllowed = !useReducedMotion();

  const featuredProducts = useMemo(() => {
    const productBySlug = new Map(products.map((product) => [product.slug, product]));
    return productCategories
      .map((category) => productBySlug.get(category.productSlugs[0]))
      .filter((product): product is ProductCardData => Boolean(product))
      .slice(0, MOBILE_FEATURED_COUNT);
  }, [products]);

  return (
    <section className="bg-paper px-5 py-14" aria-labelledby="mobile-showcase-heading">
      <motion.div
        initial={isMotionAllowed ? { opacity: 0, y: 24 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">The full range</p>
        <h2 id="mobile-showcase-heading" className="mt-2 font-display text-3xl font-bold leading-tight text-ink">
          {products.length} products. One studio.
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">A few favourites to start — the rest is one tap away.</p>
      </motion.div>

      <ul className="mt-7 grid grid-cols-2 gap-3.5">
        {featuredProducts.map((product, index) => (
          <motion.li
            key={product.slug}
            initial={isMotionAllowed ? { opacity: 0, y: 36, scale: 0.96 } : false}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={`/services/${product.slug}`}
              className="group block overflow-hidden rounded-2xl p-2.5 shadow-md transition-all duration-300 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              style={{ backgroundColor: `color-mix(in srgb, var(--color-brand-${product.accent}) 16%, white)` }}
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-white">
                {product.image ? (
                  <SafeImage
                    src={product.image}
                    alt={product.coverAlt}
                    fill
                    sizes="45vw"
                    preload={index < 2}
                    className="object-cover transition-transform duration-500 group-active:scale-105"
                  />
                ) : (
                  <ProductArt accent={product.accent} mark={String(index + 1).padStart(2, '0')} caption={product.name} />
                )}
              </div>
              <div className="px-1 pb-1 pt-3">
                <h3 className="font-display text-base font-bold leading-tight text-ink">{product.name}</h3>
                <p className="mt-1 line-clamp-2 text-xs leading-snug text-ink/65">{product.tagline}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-ink">
                  View <ArrowRight className="h-3.5 w-3.5 transition-transform group-active:translate-x-1" />
                </span>
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>

      <motion.div
        className="mt-7 flex justify-center"
        initial={isMotionAllowed ? { opacity: 0, y: 20 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <LinkButton href="/services" variant="solid" className="w-full">
          View all {products.length} products <ArrowRight className="h-4 w-4" />
        </LinkButton>
      </motion.div>
    </section>
  );
}
