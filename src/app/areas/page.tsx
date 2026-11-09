import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import JsonLd from '@/components/shared/JsonLd';
import PageHero from '@/components/shared/PageHero';
import QuoteBand from '@/components/shared/QuoteBand';
import Reveal from '@/components/shared/Reveal';
import { getAreaHref, serviceAreas, type ServiceAreaKind } from '@/data/serviceAreas';
import { buildBreadcrumbSchema, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Areas We Serve — Printing in Ahmedabad & Gujarat | Design N Print',
  description:
    'Design N Print prints and delivers across Naroda GIDC, Ahmedabad, Odhav, Vatva, Sanand, Gandhinagar, Morbi, Surat, Vadodara and Rajkot.',
  path: '/areas',
});

const areaGroups: Array<{ kinds: ServiceAreaKind[]; title: string; blurb: string }> = [
  { kinds: ['home'], title: 'Our press', blurb: 'Walk in, check colour on paper and collect your job.' },
  {
    kinds: ['ahmedabad'],
    title: 'Ahmedabad & nearby',
    blurb: 'Quick proofs and easy visits for the city and its industrial estates.',
  },
  {
    kinds: ['gujarat'],
    title: 'Across Gujarat',
    blurb: 'Brief and approve online; we dispatch the finished job to you.',
  },
];

export default function AreasPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Areas we serve', path: '/areas' },
        ])}
      />
      <PageHero
        eyebrow="Areas we serve"
        title="Printing for Ahmedabad and all of Gujarat."
        description="One press in Naroda GIDC, delivering offset printing and packaging to businesses across the city and the state."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Areas we serve' }]}
      />

      <section className="bg-paper py-16 sm:py-24" aria-label="Service areas">
        <div className="mx-auto max-w-7xl space-y-14 px-5 sm:px-10">
          {areaGroups.map((group) => {
            const groupAreas = serviceAreas.filter((area) => group.kinds.includes(area.kind));
            return (
              <Reveal key={group.title}>
                <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{group.title}</h2>
                <p className="mt-2 text-base text-ink/70">{group.blurb}</p>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {groupAreas.map((area) => (
                    <li key={area.slug}>
                      <Link
                        href={getAreaHref(area.slug)}
                        className="group flex h-full flex-col justify-between rounded-2xl border border-ink/10 bg-white p-5 transition-transform duration-300 hover:-translate-y-1 active:scale-[0.99]"
                      >
                        <span>
                          <span className="font-display text-xl font-bold text-ink">{area.name}</span>
                          <span className="mt-2 block text-sm leading-relaxed text-ink/70">{area.headline}</span>
                        </span>
                        <ArrowUpRight
                          className="mt-4 h-5 w-5 text-ink/50 transition-colors group-hover:text-ink"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </section>

      <QuoteBand topic="printing" />
    </>
  );
}
