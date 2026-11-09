import { Plus } from 'lucide-react';

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FaqEntry[];
}

/** Native <details> accordion: works without JS, and the answers stay in the HTML for SEO. */
export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <div className="divide-y divide-ink/15 border-y border-ink/15">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {faqs.map((faq) => (
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
  );
}
