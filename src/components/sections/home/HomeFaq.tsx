import { Plus } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';
import { homeFaqs } from '@/data/homeData';

/** Native <details> accordion: works without JS, and the answers stay in the HTML for SEO. */
export default function HomeFaq() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <section className="bg-paper py-20 sm:py-28" aria-labelledby="faq-heading">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-10 lg:grid-cols-5 lg:gap-16">
        <Reveal className="lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">Before you order</p>
          <h2 id="faq-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-5xl">
            Questions we hear every day.
          </h2>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-ink/70">
            Can&apos;t find yours? Message us on WhatsApp — a real person replies.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-3">
          <div className="divide-y divide-ink/15 border-y border-ink/15">
            {homeFaqs.map((faq) => (
              <details key={faq.id} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-lg font-semibold text-ink marker:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/20 transition-transform duration-300 group-open:rotate-45">
                    <Plus className="h-4 w-4" />
                  </span>
                </summary>
                <p className="max-w-xl pb-5 text-base leading-relaxed text-ink/70">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
