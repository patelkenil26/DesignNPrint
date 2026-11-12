import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Clock } from 'lucide-react';
import ProductSwatchCard from '@/components/sections/Services/ProductSwatchCard';
import FaqAccordion from '@/components/shared/FaqAccordion';
import JsonLd from '@/components/shared/JsonLd';
import PageHero from '@/components/shared/PageHero';
import QuoteBand from '@/components/shared/QuoteBand';
import Reveal from '@/components/shared/Reveal';
import { findGuide, getGuideHref, guides } from '@/data/guides';
import { findProduct } from '@/data/productCatalog';
import { toProductCard } from '@/lib/productCards';
import { buildArticleSchema, buildBreadcrumbSchema, buildPageMetadata, buildWebPageSchema } from '@/lib/seo';

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = findGuide(slug);
  if (!guide) return { title: 'Guide not found | Design N Print' };

  return buildPageMetadata({
    title: guide.metaTitle,
    description: guide.description,
    path: getGuideHref(guide.slug),
    image: `${getGuideHref(guide.slug)}/opengraph-image`,
    keywords: guide.keywords,
    type: 'article',
    publishedTime: guide.datePublished,
    modifiedTime: guide.dateModified,
  });
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = findGuide(slug);
  if (!guide) notFound();

  const path = getGuideHref(guide.slug);
  const relatedProducts = guide.productSlugs.flatMap((productSlug) => {
    const product = findProduct(productSlug);
    return product ? [toProductCard(product)] : [];
  });
  const otherGuides = guides.filter((other) => other.slug !== guide.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          buildArticleSchema({
            headline: guide.title,
            description: guide.description,
            path,
            image: `${path}/opengraph-image`,
            datePublished: guide.datePublished,
            dateModified: guide.dateModified,
          }),
          buildWebPageSchema({ name: guide.title, description: guide.description, path }),
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Guides', path: '/guides' },
            { name: guide.title, path },
          ]),
        ]}
      />
      <PageHero
        eyebrow={guide.eyebrow}
        title={guide.title}
        description={guide.description}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Guides', href: '/guides' }, { label: guide.eyebrow }]}
      >
        <p className="inline-flex items-center gap-2 text-xs font-medium text-muted">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {guide.readMinutes} min read · Updated <time dateTime={guide.dateModified}>{guide.dateModified}</time>
        </p>
      </PageHero>

      <article className="bg-paper py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-10">
          <Reveal>
            <div className="rounded-3xl border border-ink/10 bg-white p-6 sm:p-8" data-speakable>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted">
                <span className="cmyk-strip h-1.5 w-8 rounded-full" /> The short answer
              </p>
              <p className="mt-3 text-lg leading-relaxed text-ink sm:text-xl">{guide.quickAnswer}</p>
            </div>
          </Reveal>

          {guide.sections.map((section) => (
            <Reveal key={section.heading} className="mt-12">
              <h2 className="text-balance font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-base leading-relaxed text-ink/80">
                  {paragraph}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-5 space-y-3">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-base leading-relaxed text-ink/80">
                      <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </div>
      </article>

      <section className="bg-paper pb-14 sm:pb-20" aria-labelledby="guide-faq-heading">
        <div className="mx-auto max-w-3xl px-5 sm:px-10">
          <h2 id="guide-faq-heading" className="font-display text-2xl font-bold text-ink sm:text-3xl">
            Quick questions
          </h2>
          <div className="mt-6">
            <FaqAccordion faqs={guide.faqs} />
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="bg-paper pb-14 sm:pb-20" aria-labelledby="guide-products-heading">
          <div className="mx-auto max-w-7xl px-5 sm:px-10">
            <h2 id="guide-products-heading" className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Ready to order? See what we print
            </h2>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {relatedProducts.map((card, index) => (
                <li key={card.slug}>
                  <ProductSwatchCard product={card} revealDelay={index * 0.1} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-paper pb-16 sm:pb-24" aria-labelledby="more-guides-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <h2 id="more-guides-heading" className="font-display text-2xl font-bold text-ink sm:text-3xl">
            More guides
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-5">
            {otherGuides.map((other) => (
              <li key={other.slug}>
                <Link
                  href={getGuideHref(other.slug)}
                  className="group flex h-full items-start justify-between gap-3 rounded-2xl border border-ink/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                >
                  <span className="font-display text-base font-bold leading-snug text-ink">{other.title}</span>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <QuoteBand topic={guide.eyebrow.toLowerCase()} />
    </>
  );
}
