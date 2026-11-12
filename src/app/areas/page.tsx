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
    'Design N Print prints and delivers across Ahmedabad, Odhav, Vatva, Sanand, Gandhinagar, Morbi, Surat, Vadodara and Rajkot.',
  path: '/areas',
  keywords: ['printing press Ahmedabad', 'printing delivery Gujarat', 'printing services Surat Vadodara Rajkot', 'printing press Naroda'],
});

const accentCycle = ['red', 'yellow', 'green', 'blue'] as const;

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
        description="One press in Ahmedabad, delivering offset printing and packaging to businesses across the city and the state."
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
                  {groupAreas.map((area, index) => {
                    const accentColor = `var(--color-brand-${accentCycle[serviceAreas.indexOf(area) % accentCycle.length]})`;
                    return (
                      <li key={area.slug}>
                        <Reveal delay={(index % 3) * 0.08} className="h-full">
                          <Link
                            href={getAreaHref(area.slug)}
                            className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-ink/10 bg-white p-5 pt-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-x-0 top-0 h-1.5 origin-left scale-x-[0.18] transition-transform duration-500 ease-out group-hover:scale-x-100"
                              style={{ backgroundColor: accentColor }}
                            />
                            <span
                              aria-hidden="true"
                              className="text-outline pointer-events-none absolute -right-1 -top-3 select-none font-display text-7xl font-black leading-none opacity-60 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110"
                            >
                              {String(serviceAreas.indexOf(area) + 1).padStart(2, '0')}
                            </span>
                            <span className="relative">
                              <span className="font-display text-xl font-bold text-ink">{area.name}</span>
                              <span className="mt-2 block max-w-[16rem] text-sm leading-relaxed text-ink/70">{area.headline}</span>
                            </span>
                            <span
                              className="mt-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-500 group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-white"
                            >
                              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                            </span>
                          </Link>
                        </Reveal>
                      </li>
                    );
                  })}
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
