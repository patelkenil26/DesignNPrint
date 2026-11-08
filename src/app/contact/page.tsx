import type { Metadata } from 'next';
import { Suspense } from 'react';
import ContactInfoCards from '@/components/sections/contact/ContactInfoCards';
import ContactMapCard from '@/components/sections/contact/ContactMapCard';
import EnquiryForm from '@/components/sections/contact/EnquiryForm';
import PageHero from '@/components/shared/PageHero';
import Reveal from '@/components/shared/Reveal';

export const metadata: Metadata = {
  title: 'Contact Design N Print | Naroda, Ahmedabad',
  description:
    'Get a quote or visit our press in Naroda, Ahmedabad. Call, WhatsApp or send an enquiry — we reply the same day.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="We reply the same day"
        title="Let’s print something great."
        description="Call us, message us on WhatsApp or drop in at our press in Naroda. Tell us what you need and we’ll take it from there."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <section className="bg-paper py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <ContactInfoCards />
        </div>
      </section>

      <section className="bg-paper-deep/60 py-14 sm:py-20" aria-labelledby="enquiry-heading">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">Send an enquiry</p>
            <h2 id="enquiry-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
              Tell us what you need.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink/70">
              Share the product, quantity and deadline. Your enquiry opens in WhatsApp, ready to send — the fastest way to
              get a quote.
            </p>
            <span className="cmyk-strip mt-8 block h-1.5 w-24 rounded-full" />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-paper p-6 shadow-xl ring-1 ring-ink/5 sm:p-8">
              <Suspense fallback={<p className="text-sm text-muted">Loading form…</p>}>
                <EnquiryForm />
              </Suspense>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-14 sm:py-20" aria-label="Map">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <ContactMapCard />
        </div>
      </section>
    </>
  );
}
