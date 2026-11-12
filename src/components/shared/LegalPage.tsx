import Link from 'next/link';
import PageHero from '@/components/shared/PageHero';
import QuoteBand from '@/components/shared/QuoteBand';
import Reveal from '@/components/shared/Reveal';
import { legalLastUpdated, type LegalDocument } from '@/data/legalContent';

interface LegalPageProps {
  document: LegalDocument;
}

/** Shared layout for Privacy Policy and Terms: hero, sticky contents list, numbered sections. */
export default function LegalPage({ document }: LegalPageProps) {
  return (
    <>
      <PageHero
        eyebrow={document.eyebrow}
        title={document.title}
        description={document.intro}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: document.title }]}
      />

      <section className="bg-paper py-14 sm:py-20" aria-label={document.title}>
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-10 lg:grid-cols-[16rem_1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-[calc(var(--nav-height)+1.5rem)] lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">On this page</p>
            <ol className="mt-4 space-y-1 border-l border-ink/15">
              {document.sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-ink/65 transition-colors hover:border-brand-yellow hover:text-ink focus-visible:border-brand-yellow focus-visible:text-ink focus-visible:outline-none"
                  >
                    <span className="mr-2 font-display text-xs font-bold text-muted">{String(index + 1).padStart(2, '0')}</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-xs text-muted">Last updated: {legalLastUpdated}</p>
          </aside>

          <div className="max-w-3xl">
            {document.sections.map((section, index) => (
              <Reveal key={section.id} className="scroll-mt-28 border-b border-ink/10 py-8 first:pt-0 last:border-b-0">
                <article id={section.id} className="scroll-mt-28">
                  <h2 className="flex items-baseline gap-3 font-display text-2xl font-bold text-ink">
                    <span className="text-sm font-bold text-brand-red-text">{String(index + 1).padStart(2, '0')}</span>
                    {section.title}
                  </h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="mt-3 text-base leading-relaxed text-ink/75">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="mt-3 space-y-2">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 text-base leading-relaxed text-ink/75">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" aria-hidden="true" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </Reveal>
            ))}

            <p className="mt-10 text-sm text-muted">
              See also:{' '}
              <Link href="/privacy-policy" className="font-semibold text-ink underline-offset-4 hover:underline">
                Privacy Policy
              </Link>{' '}
              ·{' '}
              <Link href="/terms" className="font-semibold text-ink underline-offset-4 hover:underline">
                Terms &amp; Conditions
              </Link>
            </p>
          </div>
        </div>
      </section>

      <QuoteBand />
    </>
  );
}
