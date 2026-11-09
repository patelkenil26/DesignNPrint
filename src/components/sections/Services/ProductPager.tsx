import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Product } from '@/data/productCatalog';

interface ProductPagerProps {
  previous: Product;
  next: Product;
}

/** Big previous / next links so browsing the 17 products never hits a dead end. */
export default function ProductPager({ previous, next }: ProductPagerProps) {
  const pagerCards = [
    { product: previous, direction: 'Previous', href: `/services/${previous.slug}`, Icon: ArrowLeft, alignEnd: false },
    { product: next, direction: 'Next', href: `/services/${next.slug}`, Icon: ArrowRight, alignEnd: true },
  ];

  return (
    <nav aria-label="More products" className="grid gap-4 sm:grid-cols-2">
      {pagerCards.map(({ product, direction, href, Icon, alignEnd }) => (
        <Link
          key={direction}
          href={href}
          className={`group relative flex flex-col justify-between gap-6 overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue sm:p-8 ${
            alignEnd ? 'sm:items-end sm:text-right' : ''
          }`}
          style={{ backgroundColor: `color-mix(in srgb, var(--color-brand-${product.accent}) 22%, var(--color-paper))` }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/60">{direction} product</span>
          <span className="flex items-center gap-4 font-display text-3xl font-bold text-ink sm:text-4xl">
            {!alignEnd && <Icon className="h-7 w-7 transition-transform duration-300 group-hover:-translate-x-1.5" />}
            {product.name}
            {alignEnd && <Icon className="h-7 w-7 transition-transform duration-300 group-hover:translate-x-1.5" />}
          </span>
        </Link>
      ))}
    </nav>
  );
}
