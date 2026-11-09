import Link from 'next/link';
import { ArrowDown, ChevronRight, MessageCircle } from 'lucide-react';
import LinkButton from '@/components/shared/LinkButton';
import Reveal from '@/components/shared/Reveal';
import ProductFan from '@/components/sections/Services/ProductFan';
import { productCatalog, totalTypeCount } from '@/data/productCatalog';
import { buildWhatsAppLink, siteConfig } from '@/data/siteConfig';
import type { ProductCardData } from '@/lib/productCards';

interface ServicesHeroProps {
  /** five product covers for the fan */
  fanProducts: ProductCardData[];
}

/** /services hero — big count, the intro line, and a hand of covers that fans out. */
export default function ServicesHero({ fanProducts }: ServicesHeroProps) {
  const heroStats = [
    { id: 'products', value: String(productCatalog.length), label: 'products' },
    { id: 'types', value: `${totalTypeCount}+`, label: 'types to choose from' },
    { id: 'express', value: siteConfig.expressDispatch, label: 'express dispatch' },
  ];

  return (
    <section className="bg-studio relative overflow-hidden" aria-labelledby="services-heading">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="animate-float-slow absolute -left-16 top-10 h-56 w-56 rounded-full bg-brand-blue/15 blur-2xl" />
        <span className="animate-float-slower absolute right-10 top-4 h-64 w-64 rounded-full bg-brand-yellow/25 blur-2xl" />
        <span className="animate-float-slow absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-brand-red/15 blur-2xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-5 pb-10 pt-12 sm:px-10 sm:pb-16 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-1 text-xs font-medium text-muted">
              <li className="flex items-center gap-1">
                <Link href="/" className="transition-colors hover:text-ink">
                  Home
                </Link>
                <ChevronRight className="h-3 w-3" />
              </li>
              <li className="text-ink" aria-current="page">
                Services
              </li>
            </ol>
          </nav>

          <Reveal>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted">
              <span className="cmyk-strip h-1.5 w-8 rounded-full" />
              The full range
            </p>
            <h1
              id="services-heading"
              className="mt-3 font-display text-5xl font-bold leading-[1.02] tracking-tight text-ink sm:text-7xl"
            >
              {productCatalog.length} products.
              <br />
              One studio.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink/70 sm:text-lg">
              Whatever your business hands out, ships in or puts on a wall — we design it, print it and finish it. Pick
              a product to see more.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-7">
            <div className="flex flex-wrap gap-3">
              <LinkButton href="#range" variant="solid">
                Browse the range <ArrowDown className="h-4 w-4" />
              </LinkButton>
              <LinkButton href={buildWhatsAppLink('Hi Design N Print, I would like a quote.')} isExternal variant="whatsapp">
                <MessageCircle className="h-4 w-4" /> Get a quote
              </LinkButton>
            </div>

            <dl className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-ink/10 pt-5">
              {heroStats.map((stat) => (
                <div key={stat.id}>
                  <dd className="font-display text-2xl font-bold text-ink sm:text-3xl">{stat.value}</dd>
                  <dt className="text-xs leading-tight text-muted">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <ProductFan products={fanProducts} />
      </div>
    </section>
  );
}
