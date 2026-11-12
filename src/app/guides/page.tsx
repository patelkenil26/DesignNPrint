import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import JsonLd from '@/components/shared/JsonLd';
import PageHero from '@/components/shared/PageHero';
import QuoteBand from '@/components/shared/QuoteBand';
import Reveal from '@/components/shared/Reveal';
import { getGuideHref, guides } from '@/data/guides';
import { buildBreadcrumbSchema, buildItemListSchema, buildPageMetadata, buildWebPageSchema } from '@/lib/seo';

const guidesTitle = 'Printing & Packaging Guides – Paper, Boxes, Stickers, Files | Design N Print';
const guidesDescription =
  'Plain-language buying guides from a printing press in Ahmedabad: visiting card GSM, mono carton vs rigid box, sticker materials, print-ready files, offset vs digital and brochure folds.';

export const metadata: Metadata = buildPageMetadata({
  title: guidesTitle,
  description: guidesDescription,
  path: '/guides',
  keywords: [
    'printing guide',
    'packaging guide',
    'how to choose visiting card paper',
    'printing tips Ahmedabad',
    'printing press Ahmedabad blog',
  ],
});

const accentCycle = ['red', 'yellow', 'green', 'blue'] as const;

export default function GuidesPage() {
  return (
    <>
      <JsonLd
        data={[
          buildWebPageSchema({
            name: 'Printing and packaging guides',
            description: guidesDescription,
            path: '/guides',
            pageType: 'CollectionPage',
          }),
          buildItemListSchema(
            'Printing and packaging guides',
            guides.map((guide) => ({ name: guide.title, path: getGuideHref(guide.slug) })),
          ),
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Guides', path: '/guides' },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Guides"
        title="Print smarter. Pick the right paper, box and finish."
        description="Short, honest guides from our press in Ahmedabad — so you know what to ask for before you ask for a quote."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Guides' }]}
      />

      <section className="bg-paper py-16 sm:py-24" aria-label="All guides">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {guides.map((guide, index) => {
              const accentColor = `var(--color-brand-${accentCycle[index % accentCycle.length]})`;
              return (
                <li key={guide.slug}>
                  <Reveal delay={(index % 3) * 0.08} className="h-full">
                    <Link
                      href={getGuideHref(guide.slug)}
                      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-ink/10 bg-white p-6 pt-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-1.5 origin-left scale-x-[0.18] transition-transform duration-500 ease-out group-hover:scale-x-100"
                        style={{ backgroundColor: accentColor }}
                      />
                      <span>
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{guide.eyebrow}</span>
                        <h2 className="mt-3 text-balance font-display text-xl font-bold leading-snug text-ink">{guide.title}</h2>
                        <p className="mt-3 text-sm leading-relaxed text-ink/70">{guide.summary}</p>
                      </span>
                      <span className="mt-6 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
                          <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {guide.readMinutes} min read
                        </span>
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-500 group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </span>
                      </span>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <QuoteBand topic="printing" />
    </>
  );
}
