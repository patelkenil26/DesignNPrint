import type { Metadata } from 'next';
import JsonLd from '@/components/shared/JsonLd';
import { buildBreadcrumbSchema, buildItemListSchema, buildPageMetadata, buildWebPageSchema } from '@/lib/seo';
import ProductMarquee from '@/components/sections/Services/ProductMarquee';
import ProductMosaic from '@/components/sections/Services/ProductMosaic';
import ServicesHero from '@/components/sections/Services/ServicesHero';
import StartPaths from '@/components/sections/home/StartPaths';
import QuoteBand from '@/components/shared/QuoteBand';
import ScrollProgressBar from '@/components/shared/ScrollProgressBar';
import Reveal from '@/components/shared/Reveal';
import { productCatalog, totalTypeCount } from '@/data/productCatalog';
import { getAllProductCards } from '@/lib/productCards';

export const metadata: Metadata = buildPageMetadata({
  title: 'Printing & Packaging Services in Ahmedabad – All Products | Design N Print',
  description: `All ${productCatalog.length} products Design N Print makes — ${productCatalog
    .slice(0, 8)
    .map((product) => product.name.toLowerCase())
    .join(', ')} and more. Designed and printed under one roof in Ahmedabad since 2008.`,
  path: '/services',
  keywords: [
    'printing services Ahmedabad',
    'packaging printing Ahmedabad',
    'printing and packaging products',
    ...productCatalog.map((product) => `${product.name.toLowerCase()} printing Ahmedabad`),
  ],
});

const fanSlugs = ['visiting-card', 'brochure', 'box', 'sticker', 'pouch'];

export default function ServicesPage() {
  const productCards = getAllProductCards();
  const fanProducts = fanSlugs
    .map((slug) => productCards.find((card) => card.slug === slug))
    .filter((card): card is NonNullable<typeof card> => Boolean(card));

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ]),
          buildWebPageSchema({
            name: 'Printing & packaging services in Ahmedabad',
            description: `All ${productCatalog.length} products Design N Print makes.`,
            path: '/services',
            pageType: 'CollectionPage',
          }),
          buildItemListSchema(
            'Design N Print products',
            productCatalog.map((product) => ({ name: product.name, path: `/services/${product.slug}` })),
          ),
        ]}
      />
      <ScrollProgressBar />
      <ServicesHero fanProducts={fanProducts} />
      <ProductMarquee />

      <section id="range" className="scroll-mt-24 bg-paper py-16 sm:py-24" aria-labelledby="range-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">Choose a product</p>
            <h2 id="range-heading" className="mt-3 text-balance font-display text-3xl font-bold leading-tight text-ink sm:text-5xl">
              Every product. Every type. One click away.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-ink/70">
              {totalTypeCount}+ types across {productCatalog.length} products. Open any card to see every type we make,
              the finishes available and how to order.
            </p>
          </Reveal>

          <div className="mt-10">
            <ProductMosaic products={productCards} />
          </div>
        </div>
      </section>

      <StartPaths />
      <div className="bg-paper pb-16 sm:pb-24" />
      <QuoteBand />
    </>
  );
}
