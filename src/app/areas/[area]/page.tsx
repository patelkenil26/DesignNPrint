import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, MessageCircle } from 'lucide-react';
import ProductSwatchCard from '@/components/sections/Services/ProductSwatchCard';
import FaqAccordion from '@/components/shared/FaqAccordion';
import JsonLd from '@/components/shared/JsonLd';
import LinkButton from '@/components/shared/LinkButton';
import PageHero from '@/components/shared/PageHero';
import QuoteBand from '@/components/shared/QuoteBand';
import Reveal from '@/components/shared/Reveal';
import { findServiceArea, getAreaHref, serviceAreas } from '@/data/serviceAreas';
import { buildWhatsAppLink, siteConfig } from '@/data/siteConfig';
import { buildAreaFaqs, getAreaIndustries, getAreaProducts } from '@/lib/areaContent';
import { toProductCard } from '@/lib/productCards';
import { absoluteUrl, buildBreadcrumbSchema, buildPageMetadata, buildWebPageSchema } from '@/lib/seo';

interface AreaPageProps {
  params: Promise<{ area: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ area: area.slug }));
}

export async function generateMetadata({ params }: AreaPageProps): Promise<Metadata> {
  const { area: areaSlug } = await params;
  const area = findServiceArea(areaSlug);
  if (!area) return { title: 'Area not found | Design N Print' };

  const pageMetadata = buildPageMetadata({
    title: `${area.headline} | Design N Print`,
    description: area.intro,
    path: getAreaHref(area.slug),
    image: `${getAreaHref(area.slug)}/opengraph-image`,
  });
  return {
    ...pageMetadata,
    alternates: { ...pageMetadata.alternates, types: { 'text/markdown': `${getAreaHref(area.slug)}.md` } },
  };
}

export default async function AreaPage({ params }: AreaPageProps) {
  const { area: areaSlug } = await params;
  const area = findServiceArea(areaSlug);
  if (!area) notFound();

  const products = getAreaProducts(area).map(toProductCard);
  const areaIndustries = getAreaIndustries(area);
  const faqs = buildAreaFaqs(area);
  const otherAreas = serviceAreas.filter((other) => other.slug !== area.slug);
  const [weekdayHours] = siteConfig.workingHours;

  const areaSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Printing and packaging for ${area.name}`,
    serviceType: 'Offset printing and packaging',
    description: area.intro,
    areaServed: { '@type': 'Place', name: area.name },
    provider: { '@id': absoluteUrl('/#business') },
    url: absoluteUrl(getAreaHref(area.slug)),
  };

  return (
    <>
      <JsonLd
        data={[
          areaSchema,
          buildWebPageSchema({ name: area.headline, description: area.intro, path: getAreaHref(area.slug) }),
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Areas we serve', path: '/areas' },
            { name: area.name, path: getAreaHref(area.slug) },
          ]),
        ]}
      />

      <PageHero
        eyebrow={area.kind === 'home' ? 'Our home press' : `Serving ${area.name}`}
        title={area.headline}
        description={area.intro}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Areas we serve', href: '/areas' },
          { label: area.name },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <LinkButton
            href={buildWhatsAppLink(`Hi Design N Print, I am from ${area.name} and would like a printing quote.`)}
            isExternal
            variant="whatsapp"
          >
            <MessageCircle className="h-4 w-4" /> Get a quote on WhatsApp
          </LinkButton>
        </div>
      </PageHero>

      <section className="bg-paper py-16 sm:py-24" aria-labelledby="area-how-heading">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-10 lg:grid-cols-5 lg:gap-16">
          <Reveal className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">How it works for {area.name}</p>
            <h2 id="area-how-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
              Design, proof, print — handled for you.
            </h2>
            <p data-speakable className="mt-5 max-w-2xl text-base leading-relaxed text-ink/70 sm:text-lg">
              {area.localAngle}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-2">
            <address className="rounded-3xl bg-ink p-6 not-italic text-white sm:p-8">
              <MapPin className="h-5 w-5 text-brand-yellow" aria-hidden="true" />
              <p className="mt-3 font-display text-xl font-bold">{siteConfig.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{siteConfig.addressLines.join(' ')}</p>
              <p className="mt-3 text-sm text-white/70">
                {weekdayHours.label}: {weekdayHours.value}
              </p>
              <a
                href={siteConfig.googleProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-semibold text-brand-yellow underline-offset-4 hover:underline"
              >
                View on Google Maps
              </a>
            </address>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper pb-16 sm:pb-24" aria-labelledby="area-products-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">Most requested in {area.name}</p>
            <h2 id="area-products-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
              What {area.name} orders from us.
            </h2>
          </Reveal>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {products.map((product, index) => (
              <li key={product.slug}>
                <ProductSwatchCard product={product} revealDelay={(index % 3) * 0.1} />
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-ink/70">
            Need something else? See{' '}
            <Link href="/services" className="font-semibold text-ink underline underline-offset-4">
              all {siteConfig.name} products
            </Link>
            .
          </p>
        </div>
      </section>

      {areaIndustries.length > 0 && (
        <section className="bg-paper-deep/60 py-16 sm:py-24" aria-labelledby="area-industries-heading">
          <div className="mx-auto max-w-7xl px-5 sm:px-10">
            <h2 id="area-industries-heading" className="font-display text-3xl font-bold text-ink sm:text-4xl">
              Industries we print for in {area.name}
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {areaIndustries.map((industry) => (
                <li key={industry.id} className="rounded-2xl border border-ink/10 bg-white p-5">
                  <h3 className="font-display text-lg font-bold text-ink">{industry.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{industry.line}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-paper py-16 sm:py-24" aria-labelledby="area-faq-heading">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-10 lg:grid-cols-5 lg:gap-16">
          <Reveal className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">Before you order</p>
            <h2 id="area-faq-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
              Printing in {area.name} — your questions.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-3">
            <FaqAccordion faqs={faqs} />
          </Reveal>
        </div>
      </section>

      <section className="bg-paper pb-16 sm:pb-24" aria-labelledby="other-areas-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <h2 id="other-areas-heading" className="font-display text-2xl font-bold text-ink sm:text-3xl">
            Other places we print for
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {otherAreas.map((other) => (
              <li key={other.slug}>
                <Link
                  href={getAreaHref(other.slug)}
                  className="inline-block rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-white active:scale-95"
                >
                  {other.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <QuoteBand topic={`printing in ${area.name}`} />
    </>
  );
}
