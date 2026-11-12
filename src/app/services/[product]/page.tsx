import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, BookOpen, MessageCircle } from 'lucide-react';
import ProductHero from '@/components/sections/Services/ProductHero';
import ProductPager from '@/components/sections/Services/ProductPager';
import ProductQuickAnswer from '@/components/sections/Services/ProductQuickAnswer';
import ProductStickyCta from '@/components/sections/Services/ProductStickyCta';
import ScrollProgressBar from '@/components/shared/ScrollProgressBar';
import ProductProcess from '@/components/sections/Services/ProductProcess';
import ProductSpecs from '@/components/sections/Services/ProductSpecs';
import ProductSwatchCard from '@/components/sections/Services/ProductSwatchCard';
import TypeCard from '@/components/sections/Services/TypeCard';
import TypeJumpBar from '@/components/sections/Services/TypeJumpBar';
import ImageViewerProvider from '@/components/shared/ImageViewer/ImageViewerProvider';
import type { ViewerItem } from '@/components/shared/ImageViewer/ImageViewerContext';
import JsonLd from '@/components/shared/JsonLd';
import FaqAccordion from '@/components/shared/FaqAccordion';
import LinkButton from '@/components/shared/LinkButton';
import QuoteBand from '@/components/shared/QuoteBand';
import Reveal from '@/components/shared/Reveal';
import {
  buildProductFaqs,
  findProduct,
  getAdjacentProducts,
  getProductNumber,
  productCatalog,
  slugifyTypeName,
} from '@/data/productCatalog';
import { getGuideHref, getGuidesForProduct } from '@/data/guides';
import { pressSteps } from '@/data/homeData';
import { buildWhatsAppLink } from '@/data/siteConfig';
import { toProductCard } from '@/lib/productCards';
import {
  absoluteUrl,
  buildBreadcrumbSchema,
  buildHowToSchema,
  buildPageMetadata,
  buildProductKeywords,
  buildWebPageSchema,
} from '@/lib/seo';
import { getProductCover, getTypeImage } from '@/lib/productImages';

interface ProductPageProps {
  params: Promise<{ product: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return productCatalog.map((product) => ({ product: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { product: productSlug } = await params;
  const product = findProduct(productSlug);
  if (!product) return { title: 'Product not found | Design N Print' };

  const typeNames = product.types.map((type) => type.name).join(', ');
  const pageMetadata = buildPageMetadata({
    title: `${product.name} Printing in Ahmedabad – ${product.types.length} Types | Design N Print`,
    description: `${product.intro} Types: ${typeNames}. Free proof, delivery across Gujarat.`,
    path: `/services/${product.slug}`,
    keywords: buildProductKeywords(product),
    image: `/services/${product.slug}/opengraph-image`,
  });
  return {
    ...pageMetadata,
    // clean markdown twin for AI crawlers
    alternates: { ...pageMetadata.alternates, types: { 'text/markdown': `/services/${product.slug}.md` } },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { product: productSlug } = await params;
  const product = findProduct(productSlug);
  if (!product) notFound();

  const number = getProductNumber(product.slug);
  const coverImage = getProductCover(product);
  const { previous, next } = getAdjacentProducts(product.slug);
  const faqs = buildProductFaqs(product);
  const relatedGuides = getGuidesForProduct(product.slug);

  const typeCards = product.types.map((type, index) => ({
    slug: slugifyTypeName(type.name),
    name: type.name,
    line: type.line,
    number: index + 1,
    image: getTypeImage(product, type),
  }));

  /** every real photo on this page, in reading order — the cover first, then each type */
  const viewerItems: ViewerItem[] = [
    ...(coverImage
      ? [
          {
            id: 'cover',
            src: coverImage,
            alt: product.coverAlt,
            title: product.name,
            line: product.tagline,
            whatsappMessage: `Hi Design N Print, I would like a quote for ${product.name}.`,
          },
        ]
      : []),
    ...typeCards.flatMap((type) =>
      type.image
        ? [
            {
              id: type.slug,
              src: type.image,
              alt: `${type.name} — ${product.name.toLowerCase()} sample`,
              title: type.name,
              line: type.line,
              whatsappMessage: `Hi Design N Print, I would like a quote for ${product.name} — ${type.name}.`,
            },
          ]
        : [],
    ),
  ];

  const keepExploring = [1, 2, 3, 4]
    .map((offset) => productCatalog[(number - 1 + offset) % productCatalog.length])
    .map(toProductCard);

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${product.name} printing`,
    description: product.intro,
    serviceType: `${product.name} printing`,
    category: 'Printing and packaging',
    keywords: buildProductKeywords(product).join(', '),
    image: coverImage ? absoluteUrl(coverImage) : absoluteUrl(`/services/${product.slug}/opengraph-image`),
    url: absoluteUrl(`/services/${product.slug}`),
    areaServed: [
      { '@type': 'City', name: 'Ahmedabad' },
      { '@type': 'State', name: 'Gujarat' },
    ],
    provider: { '@id': absoluteUrl('/#business') },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${product.name} types`,
      itemListElement: product.types.map((type) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: type.name, description: type.line },
      })),
    },
  };

  return (
    <>
      <JsonLd
        data={[
          productSchema,
          buildWebPageSchema({
            name: `${product.name} printing in Ahmedabad`,
            description: product.intro,
            path: `/services/${product.slug}`,
          }),
          buildHowToSchema(
            `How to order ${product.name.toLowerCase()} from Design N Print`,
            pressSteps.map((step) => ({ title: step.title, body: step.body })),
          ),
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: product.name, path: `/services/${product.slug}` },
          ]),
        ]}
      />
      <ScrollProgressBar />
      <ProductStickyCta productName={product.name} />
      <ImageViewerProvider items={viewerItems}>
      <ProductHero product={product} number={number} coverImage={coverImage} />
      <ProductQuickAnswer product={product} />
      {/* wrapper keeps the sticky jump bar inside the types section only */}
      <div>
      {typeCards.length > 4 && <TypeJumpBar types={typeCards.map(({ slug, name }) => ({ slug, name }))} />}

      <section id="types" className="scroll-mt-32 bg-paper py-16 sm:py-24" aria-labelledby="types-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">Everything we make</p>
            <h2 id="types-heading" className="mt-3 text-balance font-display text-3xl font-bold leading-tight text-ink sm:text-5xl">
              All {typeCards.length} types of {product.name.toLowerCase()}.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-ink/70">
              Tap “Ask for this type” on any card and WhatsApp opens with your request ready to send.
            </p>
          </Reveal>

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
            {typeCards.map((type, index) => (
              <li key={type.slug} className={type.image ? '' : 'col-span-2 sm:col-span-1'}>
                <TypeCard type={type} productName={product.name} accent={product.accent} revealDelay={(index % 3) * 0.12} />
              </li>
            ))}
            <li className="col-span-2 lg:col-span-1">
              <div className="flex h-full min-h-[12rem] flex-col justify-between rounded-3xl bg-ink p-6 text-white sm:min-h-[16rem] sm:p-8">
                <span className="cmyk-strip block h-1.5 w-14 rounded-full" />
                <div className="mt-8">
                  <h3 className="font-display text-2xl font-bold leading-tight">Not sure which type?</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    Tell us where you will use it and your budget — we will suggest the right one.
                  </p>
                  <div className="mt-5">
                    <LinkButton
                      href={buildWhatsAppLink(`Hi Design N Print, please help me choose the right ${product.name}.`)}
                      isExternal
                      variant="whatsapp"
                    >
                      <MessageCircle className="h-4 w-4" /> Help me choose
                    </LinkButton>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
      </div>

      </ImageViewerProvider>

      <ProductSpecs product={product} />
      <ProductProcess />

      <section className="bg-paper py-16 sm:py-24" aria-labelledby="product-faq-heading">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-10 lg:grid-cols-5 lg:gap-16">
          <Reveal className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">Before you order</p>
            <h2 id="product-faq-heading" className="mt-3 text-balance font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {product.name} — your questions.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-3">
            <FaqAccordion faqs={faqs} />
          </Reveal>
        </div>
      </section>

      {relatedGuides.length > 0 && (
        <section className="bg-paper pb-12 sm:pb-16" aria-labelledby="related-guides-heading">
          <div className="mx-auto max-w-7xl px-5 sm:px-10">
            <h2 id="related-guides-heading" className="flex items-center gap-2 font-display text-2xl font-bold text-ink sm:text-3xl">
              <BookOpen className="h-6 w-6" aria-hidden="true" /> Buying guide
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-5">
              {relatedGuides.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={getGuideHref(guide.slug)}
                    className="group flex h-full items-start justify-between gap-3 rounded-2xl border border-ink/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                  >
                    <span>
                      <span className="block font-display text-base font-bold leading-snug text-ink">{guide.title}</span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-ink/70">{guide.summary}</span>
                    </span>
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-paper pb-16 sm:pb-24" aria-labelledby="keep-exploring-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <ProductPager previous={previous} next={next} />

          <h2 id="keep-exploring-heading" className="mt-16 font-display text-3xl font-bold text-ink sm:text-4xl">
            Keep exploring
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {keepExploring.map((card, index) => (
              <li key={card.slug}>
                <ProductSwatchCard product={card} revealDelay={index * 0.1} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <QuoteBand topic={product.name} />
    </>
  );
}
