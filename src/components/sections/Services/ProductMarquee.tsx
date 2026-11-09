import { productCatalog } from '@/data/productCatalog';

/** Slow outlined ticker of every product name — decorative, so hidden from screen readers. */
export default function ProductMarquee() {
  const tickerItems = [...productCatalog, ...productCatalog];

  return (
    <div className="overflow-hidden border-y border-ink/10 bg-paper py-5 sm:py-7" aria-hidden="true">
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap sm:gap-12">
        {tickerItems.map((product, index) => (
          <span key={`${product.slug}-${index}`} className="flex items-center gap-8 sm:gap-12">
            <span className="text-outline font-display text-4xl font-black uppercase leading-none sm:text-6xl">
              {product.name}
            </span>
            <span
              className="h-3 w-3 shrink-0 rounded-full sm:h-4 sm:w-4"
              style={{ backgroundColor: `var(--color-brand-${product.accent})` }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
