'use client';

import { useId, useState } from 'react';
import { Plus } from 'lucide-react';

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FaqEntry[];
}

/** One brand ink per row, so the list reads like a CMYK swatch book. */
const inkClasses = ['bg-brand-red', 'bg-brand-yellow', 'bg-brand-green', 'bg-brand-blue'] as const;

/**
 * Accordion with one-open-at-a-time behaviour and a smooth height animation.
 * Every answer stays in the DOM (collapsed with a CSS grid-row transition), so the text is still in the
 * server-rendered HTML for SEO / AI crawlers, and the FAQPage schema is emitted alongside.
 */
export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const idPrefix = useId();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const handleFaqToggle = (faqId: string) => {
    setOpenFaqId((current) => (current === faqId ? null : faqId));
  };

  return (
    <div className="divide-y divide-ink/15 border-y border-ink/15">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
      />
      {faqs.map((faq, index) => {
        const isOpen = openFaqId === faq.id;
        const buttonId = `${idPrefix}-faq-button-${faq.id}`;
        const panelId = `${idPrefix}-faq-panel-${faq.id}`;

        return (
          <div key={faq.id} className="group relative">
            {/* ink bar that "prints" down the left edge of the open row */}
            <span
              aria-hidden="true"
              className={`absolute left-0 top-0 w-1 origin-top rounded-full transition-all duration-500 ease-out motion-reduce:transition-none ${
                inkClasses[index % inkClasses.length]
              } ${isOpen ? 'h-full opacity-100' : 'h-0 opacity-0'}`}
            />
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => handleFaqToggle(faq.id)}
                className="flex w-full cursor-pointer items-center gap-4 py-5 pl-0 pr-0 text-left transition-[padding] duration-500 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue motion-reduce:transition-none data-[open=true]:pl-5"
                data-open={isOpen}
              >
                <span
                  className={`font-display text-sm font-bold tabular-nums transition-colors duration-300 ${
                    isOpen ? 'text-ink' : 'text-ink/35 group-hover:text-ink/60'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  className={`flex-1 font-display text-lg font-semibold transition-colors duration-300 ${
                    isOpen ? 'text-ink' : 'text-ink/85'
                  }`}
                >
                  {faq.question}
                </span>
                <span
                  className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-out motion-reduce:transition-none group-hover:scale-105 ${
                    isOpen ? 'rotate-[135deg] border-ink bg-ink text-white' : 'rotate-0 border-ink/20 text-ink'
                  }`}
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            </h3>

            {/* grid-rows 0fr → 1fr animates to the answer's natural height without measuring it */}
            <div
              id={panelId}
              role="region"
              aria-hidden={!isOpen}
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p
                  className={`max-w-xl pb-6 pl-5 pr-4 text-base leading-relaxed text-ink/70 transition-transform duration-500 ease-out motion-reduce:transition-none sm:pl-14 ${
                    isOpen ? 'translate-y-0' : '-translate-y-2'
                  }`}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
