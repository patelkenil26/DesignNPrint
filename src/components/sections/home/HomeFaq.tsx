import FaqAccordion from '@/components/shared/FaqAccordion';
import Reveal from '@/components/shared/Reveal';
import { homeFaqs } from '@/data/homeData';

/** Home FAQ — the accordion and FAQPage schema live in the shared FaqAccordion. */
export default function HomeFaq() {
  return (
    <section className="bg-paper py-20 sm:py-28" aria-labelledby="faq-heading">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-10 lg:grid-cols-5 lg:gap-16">
        <Reveal className="lg:sticky lg:top-[calc(var(--nav-height)+2rem)] lg:col-span-2 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">Before you order</p>
          <h2 id="faq-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-5xl">
            Questions we hear every day.
          </h2>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-ink/70">
            Can&apos;t find yours? Message us on WhatsApp — a real person replies.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-3">
          <FaqAccordion faqs={homeFaqs} />
        </Reveal>
      </div>
    </section>
  );
}
