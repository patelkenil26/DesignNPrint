import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { Suspense } from 'react';
import ContactChannels from '@/components/sections/contact/ContactChannels';
import ContactHero from '@/components/sections/contact/ContactHero';
import FindUs from '@/components/sections/contact/FindUs';
import JobTicketForm from '@/components/sections/contact/JobTicketForm';
import QuoteChecklist from '@/components/sections/contact/QuoteChecklist';
import Reveal from '@/components/shared/Reveal';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact Design N Print | Naroda, Ahmedabad',
  description:
    'Get a quote or visit our press in Naroda, Ahmedabad. Call, WhatsApp or fill a job ticket — we reply the same day.',
  path: '/contact',
});

/**
 * Contact — "the studio desk":
 * hero with live open/closed desk → four channels → job-ticket form with a live printed ticket →
 * what to have ready → how to find us.
 */
export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactChannels />

      <section id="job-ticket" className="scroll-mt-24 bg-paper-deep/60 py-16 sm:py-24" aria-labelledby="ticket-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">Start a job ticket</p>
            <h2 id="ticket-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-5xl">
              Fill it in. Watch it print.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-ink/70">
              Four quick steps. Your answers appear on the ticket as you go — then it opens in WhatsApp, ready to send.
            </p>
          </Reveal>

          <div className="mt-12">
            <Suspense fallback={<p className="text-sm text-muted">Loading the ticket…</p>}>
              <JobTicketForm />
            </Suspense>
          </div>
        </div>
      </section>

      <QuoteChecklist />
      <FindUs />
    </>
  );
}
