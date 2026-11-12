import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import InkReveal from '@/components/shared/InkReveal';
import ProductArt from '@/components/shared/ProductArt';
import SafeImage from '@/components/shared/SafeImage';
import type { ProductCardData } from '@/lib/productCards';

interface ProductSwatchCardProps {
  product: ProductCardData;
  /** stagger the ink reveal by column so a row "prints" left to right */
  revealDelay?: number;
}

const formatNumber = (value: number) => String(value).padStart(2, '0');

/**
 * One product, styled like a printed proof: the cover "prints" in with an ink wipe,
 * crop marks appear on hover, and a panel slides up to peek at the types inside.
 */
export default function ProductSwatchCard({ product, revealDelay = 0 }: ProductSwatchCardProps) {
  const accentColor = `var(--color-brand-${product.accent})`;
  const visibleTypes = product.typeNames.slice(0, 4);
  const hiddenTypeCount = product.typeNames.length - visibleTypes.length;

  return (
    <Link
      href={`/services/${product.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white p-2 shadow-sm ring-1 ring-ink/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue sm:p-3"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-paper-deep">
        <InkReveal delay={revealDelay} className="h-full w-full">
          {product.image ? (
            <SafeImage
              src={product.image}
              alt={product.coverAlt}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <ProductArt accent={product.accent} mark={formatNumber(product.number)} caption={product.name} />
          )}
        </InkReveal>

        <span className="crop-marks absolute inset-0" aria-hidden="true" />

        <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-white/90 px-2.5 py-1 font-display text-[11px] font-bold text-ink shadow-sm backdrop-blur sm:left-3 sm:top-3">
          {formatNumber(product.number)}
        </span>
        <span className="absolute right-2.5 top-2.5 z-10 rounded-full bg-ink/85 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur sm:right-3 sm:top-3">
          {product.typeNames.length} types
        </span>

        {/* peek at what is inside — desktop hover / keyboard focus only */}
        <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full bg-ink/92 p-3 text-white transition-transform duration-500 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0 max-md:hidden">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-yellow">Inside</p>
          <ul className="mt-1.5 flex flex-wrap gap-1.5">
            {visibleTypes.map((typeName) => (
              <li key={typeName} className="rounded-full border border-white/25 px-2.5 py-0.5 text-[11px]">
                {typeName}
              </li>
            ))}
            {hiddenTypeCount > 0 && (
              <li className="rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-semibold">+{hiddenTypeCount} more</li>
            )}
          </ul>
        </div>
      </div>

      <div className="flex flex-1 items-end justify-between gap-3 px-1.5 pb-2 pt-3 sm:px-2 sm:pt-4">
        <div className="min-w-0">
          <h3 className="font-display text-base font-bold leading-tight text-ink sm:text-xl">{product.name}</h3>
          <p className="mt-1 hidden text-sm leading-snug text-ink/60 sm:block">{product.tagline}</p>
          <p className="mt-1 line-clamp-1 text-[11px] leading-snug text-ink/65 md:hidden">
            {product.typeNames.slice(0, 2).join(" · ")}
            {product.typeNames.length > 2 ? ` +${product.typeNames.length - 2}` : ""}
          </p>
        </div>
        <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink transition-all duration-300 group-hover:rotate-0 group-hover:bg-ink group-hover:text-white sm:inline-flex sm:-rotate-45">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <span
        aria-hidden="true"
        className="absolute inset-x-6 bottom-0 h-1 origin-left scale-x-0 rounded-t-full transition-transform duration-500 group-hover:scale-x-100"
        style={{ backgroundColor: accentColor }}
      />
    </Link>
  );
}
