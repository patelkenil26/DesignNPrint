import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import CategoryCard from '@/components/sections/Services/CategoryCard';
import LinkButton from '@/components/shared/LinkButton';
import PageHero from '@/components/shared/PageHero';
import QuoteBand from '@/components/shared/QuoteBand';
import Reveal from '@/components/shared/Reveal';
import { productCategories } from '@/data/categories';
import { serviceCatalog } from '@/data/serviceCatalog';

export const metadata: Metadata = {
  title: 'Printing & Packaging Services in Ahmedabad | Design N Print',
  description:
    'Explore everything Design N Print prints — stickers & labels, visiting cards, brochures & flyers, boxes & packaging, files & folders, pouches & display. Ahmedabad’s trusted offset press since 2008.',
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Design N Print · Ahmedabad"
        title="Everything we print, neatly organised."
        description={`Six main categories, ${serviceCatalog.length}+ services. Pick a category to explore its types — or see the full list in one place.`}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
      >
        <LinkButton href="/services/all" variant="solid">
          View all services <ArrowRight className="h-4 w-4" />
        </LinkButton>
      </PageHero>

      <section className="bg-paper py-16 sm:py-24" aria-labelledby="categories-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">Main categories</p>
            <h2 id="categories-heading" className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
              Start with what you need.
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {productCategories.map((category, index) => (
              <li key={category.id}>
                <Reveal delay={(index % 3) * 0.08} className="h-full">
                  <CategoryCard category={category} />
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal className="mt-14 flex flex-col items-center gap-4 rounded-3xl bg-ink px-6 py-10 text-center text-white">
            <h3 className="font-display text-2xl font-bold sm:text-3xl">Want to see it all at once?</h3>
            <p className="max-w-md text-sm text-white/70">
              Browse every service with category filters, live counts and search.
            </p>
            <LinkButton href="/services/all" variant="light">
              View all services <ArrowRight className="h-4 w-4" />
            </LinkButton>
          </Reveal>
        </div>
      </section>

      <QuoteBand />
    </>
  );
}
