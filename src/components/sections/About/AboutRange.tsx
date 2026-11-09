import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';
import LinkButton from '@/components/shared/LinkButton';
import { productCatalog } from '@/data/productCatalog';

/** What we make — every product as a link, so visitors (and search engines) can jump straight in. */
export default function AboutRange() {
  return (
    <section className="bg-paper py-16 sm:py-24" aria-labelledby="about-range-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">What we do</p>
            <h2 id="about-range-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-5xl">
              {productCatalog.length} products, one reliable press.
            </h2>
          </div>
          <LinkButton href="/services" variant="outline">
            Browse the full range <ArrowRight className="h-4 w-4" />
          </LinkButton>
        </Reveal>

        <ul className="mt-10 flex flex-wrap gap-3">
          {productCatalog.map((product, index) => (
            <li key={product.slug}>
              <Reveal delay={(index % 6) * 0.04}>
                <Link
                  href={`/services/${product.slug}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink shadow-sm ring-1 ring-ink/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:text-white hover:shadow-lg active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                >
                  <span
                    className="h-2 w-2 rounded-full transition-transform duration-300 group-hover:scale-150"
                    style={{ backgroundColor: `var(--color-brand-${product.accent})` }}
                  />
                  {product.name}
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
