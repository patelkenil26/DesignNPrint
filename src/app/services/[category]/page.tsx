import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, MessageCircle } from 'lucide-react';
import CategoryCard from '@/components/sections/Services/CategoryCard';
import ServiceCard from '@/components/sections/Services/ServiceCard';
import SubCategoryGrid from '@/components/sections/Services/SubCategoryGrid';
import LinkButton from '@/components/shared/LinkButton';
import PageHero from '@/components/shared/PageHero';
import QuoteBand from '@/components/shared/QuoteBand';
import Reveal from '@/components/shared/Reveal';
import SafeImage from '@/components/shared/SafeImage';
import TiltCard from '@/components/shared/TiltCard';
import { findCategory, productCategories } from '@/data/categories';
import { getServicesByCategory } from '@/data/serviceCatalog';
import { buildWhatsAppLink } from '@/data/siteConfig';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return productCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = findCategory(categorySlug);
  if (!category) return { title: 'Category not found | Design N Print' };

  return {
    title: `${category.name} Printing in Ahmedabad | Design N Print`,
    description: `${category.blurb} Types: ${category.subCategories.map((item) => item.name).join(', ')}.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = findCategory(categorySlug);
  if (!category) notFound();

  const services = getServicesByCategory(category.slug);
  const otherCategories = productCategories.filter((item) => item.slug !== category.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={category.tagline}
        title={category.name}
        description={category.blurb}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: category.name },
        ]}
        aside={
          <TiltCard>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-ink/5">
              <SafeImage
                src={category.image}
                alt={category.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <span
                className="absolute inset-x-0 top-0 h-1.5"
                style={{ backgroundColor: `var(--color-brand-${category.accent})` }}
              />
            </div>
          </TiltCard>
        }
      >
        <div className="flex flex-wrap gap-3">
          <LinkButton href={buildWhatsAppLink(`Hi Design N Print, I would like a quote for ${category.name}.`)} isExternal variant="whatsapp">
            <MessageCircle className="h-4 w-4" /> Get a quote
          </LinkButton>
          <LinkButton href="/services/all" variant="outline">
            View all services <ArrowRight className="h-4 w-4" />
          </LinkButton>
        </div>
      </PageHero>

      <section className="bg-paper py-16 sm:py-24" aria-labelledby="types-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">What we make</p>
            <h2 id="types-heading" className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
              {category.name} — all the types
            </h2>
          </Reveal>
          <div className="mt-10">
            <SubCategoryGrid category={category} />
          </div>
        </div>
      </section>

      <section className="bg-paper-deep/60 py-16 sm:py-24" aria-labelledby="services-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">Detailed service pages</p>
            <h2 id="services-heading" className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
              Services in {category.name}
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <li key={service.slug}>
                <Reveal delay={(index % 4) * 0.07} className="h-full">
                  <ServiceCard service={service} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-24" aria-labelledby="other-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <h2 id="other-heading" className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Explore other categories
          </h2>
          <ul className="mt-10 grid gap-7 md:grid-cols-3">
            {otherCategories.map((item) => (
              <li key={item.id}>
                <CategoryCard category={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <QuoteBand topic={category.name} />
    </>
  );
}
