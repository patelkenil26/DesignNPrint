import Reveal from '@/components/shared/Reveal';
import { priceDrivers, type Product } from '@/data/productCatalog';

interface ProductSpecsProps {
  product: Product;
}

/** Dark band: finishes you can add, and the four things that decide the price. */
export default function ProductSpecs({ product }: ProductSpecsProps) {
  return (
    <section className="bg-studio-dark text-white" aria-labelledby="specs-heading">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-10 sm:py-24 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-yellow">Make it yours</p>
          <h2 id="specs-heading" className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
            Finishes &amp; add-ons for {product.name.toLowerCase()}.
          </h2>
          <ul className="mt-7 flex flex-wrap gap-2.5">
            {product.finishes.map((finish) => (
              <li
                key={finish}
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-yellow hover:text-brand-yellow"
              >
                {finish}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/60">
            Not sure which finish suits your brand? Tell us where it will be used and we will recommend one.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-yellow">Clear pricing logic</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">What decides the price.</h2>
          <dl className="mt-7 divide-y divide-white/15 border-y border-white/15">
            {priceDrivers.map((driver, index) => (
              <div key={driver.id} className="flex items-baseline gap-5 py-4">
                <span className="font-display text-sm font-bold text-brand-yellow">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <dt className="font-display text-lg font-semibold">{driver.title}</dt>
                  <dd className="mt-0.5 text-sm text-white/65">{driver.detail}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
