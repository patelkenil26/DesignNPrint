import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ContactQuickActions from '@/components/sections/contact/ContactQuickActions';
import DeskCard from '@/components/sections/contact/DeskCard';
import Reveal from '@/components/shared/Reveal';
import WordRise from '@/components/shared/WordRise';

/** Contact hero — a headline that rises word by word, beside the live "desk" card. */
export default function ContactHero() {
  return (
    <section className="bg-studio relative overflow-hidden" aria-labelledby="contact-heading">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="animate-float-slow absolute -left-16 top-10 h-56 w-56 rounded-full bg-brand-blue/15 blur-2xl" />
        <span className="animate-float-slower absolute right-10 top-4 h-64 w-64 rounded-full bg-brand-yellow/25 blur-2xl" />
        <span className="animate-float-slow absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-brand-red/15 blur-2xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:gap-12 sm:px-10 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-1 text-xs font-medium text-muted">
              <li className="flex items-center gap-1">
                <Link href="/" className="transition-colors hover:text-ink">
                  Home
                </Link>
                <ChevronRight className="h-3 w-3" />
              </li>
              <li className="text-ink" aria-current="page">
                Contact
              </li>
            </ol>
          </nav>

          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted">
            <span className="cmyk-strip h-1.5 w-8 rounded-full" />
            We reply the same day
          </p>
          <h1
            id="contact-heading"
            className="mt-4 text-balance font-display text-[clamp(2.5rem,11.5vw,3.4rem)] font-bold leading-[1.02] tracking-tight text-ink sm:text-7xl"
          >
            <WordRise text="Let’s print something great." delay={0.1} />
          </h1>

          <Reveal delay={0.5}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/70 sm:text-lg">
              Tell us the product, the quantity and the deadline. We will come back with a clear quote
              <span className="hidden sm:inline"> — or just drop in at our press in Naroda and see the paper in your hand</span>.
            </p>
            <ContactQuickActions />
            <a
              href="#job-ticket"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-brand-yellow decoration-2 underline-offset-8 transition-colors hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
            >
              Start a job ticket ↓
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.25}>
          <DeskCard />
        </Reveal>
      </div>
    </section>
  );
}
