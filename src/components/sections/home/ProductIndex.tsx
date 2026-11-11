import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';
import type { ProductCardData } from '@/lib/productCards';

const formatNumber = (index: number) => String(index + 1).padStart(2, '0');

interface ProductIndexProps {
  products: ProductCardData[];
}

/** One product pill: number, thumbnail, name. Lifts and fills with its accent colour on hover. */
function ProductPill({ product, index, isDecorativeCopy }: { product: ProductCardData; index: number; isDecorativeCopy: boolean }) {
  return (
    <li aria-hidden={isDecorativeCopy || undefined}>
      <Link
        href={`/services/${product.slug}`}
        tabIndex={isDecorativeCopy ? -1 : undefined}
        className="group inline-flex items-center gap-3 rounded-full border border-ink/15 bg-white py-2 pl-2 pr-5 min-h-[3.25rem] transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        style={{ ['--pill-accent' as string]: `var(--color-brand-${product.accent})` }}
      >
        {product.image && (
          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-paper-deep">
            <Image src={product.image} alt="" fill sizes="44px" className="object-cover" />
          </span>
        )}
        <span className="font-display text-xs font-bold text-muted">{formatNumber(index)}</span>
        <span className="whitespace-nowrap font-display text-lg font-bold text-ink">{product.name}</span>
        <ArrowUpRight className="h-4 w-4 text-ink/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--pill-accent)]" />
      </Link>
    </li>
  );
}

/**
 * The full range: all products on two belts that travel in opposite directions (pause on hover).
 * Every pill is a real link, so each product page stays one click away from the home page.
 */
export default function ProductIndex({ products: productIndex }: ProductIndexProps) {
  const half = Math.ceil(productIndex.length / 2);
  const beltOne = productIndex.slice(0, half);
  const beltTwo = productIndex.slice(half);

  const renderBelt = (belt: ProductCardData[], startIndex: number, animationClass: string, label: string) => (
    <div className="overflow-hidden py-2" aria-label={label}>
      <ul className={`${animationClass} flex w-max gap-4 px-2 hover:[animation-play-state:paused]`}>
        {[0, 1].map((copy) =>
          belt.map((product, index) => (
            <ProductPill
              key={`${product.slug}-${copy}`}
              product={product}
              index={startIndex + index}
              isDecorativeCopy={copy === 1}
            />
          )),
        )}
      </ul>
    </div>
  );

  return (
    <section id="all-products" className="overflow-hidden bg-paper-deep/60 py-20 sm:py-24" aria-labelledby="product-index-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">The full range</p>
          <h2 id="product-index-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-5xl">
            {productIndex.length} products. One studio.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-ink/70">
            Whatever your business hands out, ships in or puts on a wall — we design it, print it and finish it.
          </p>
        </Reveal>
      </div>

      <div className="mt-10 space-y-3 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        {renderBelt(beltOne, 0, 'animate-marquee', 'Products, part one')}
        {renderBelt(beltTwo, half, 'animate-marquee-reverse', 'Products, part two')}
      </div>
    </section>
  );
}
