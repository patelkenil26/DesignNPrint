'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Home, MessageCircle, Phone, RotateCw } from 'lucide-react';
import { buildWhatsAppLink, siteConfig } from '@/data/siteConfig';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/** Shown when something breaks while a page is loading — offers a retry and a way to reach us. */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('Page failed to render', error);
  }, [error]);

  return (
    <section className="bg-studio relative overflow-hidden" aria-labelledby="error-heading">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="animate-float-slow absolute -left-16 top-10 h-56 w-56 rounded-full bg-brand-red/15 blur-2xl" />
        <span className="animate-float-slower absolute right-10 top-4 h-64 w-64 rounded-full bg-brand-yellow/25 blur-2xl" />
      </div>

      <div
        className="relative mx-auto flex min-h-[calc(100svh-var(--nav-height))] max-w-3xl flex-col items-center justify-center px-5 py-16 text-center sm:px-10"
        role="alert"
      >
        <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-ink text-brand-yellow shadow-2xl">
          <RotateCw className="h-9 w-9" />
        </span>

        <p className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted">
          <span className="cmyk-strip h-1.5 w-8 rounded-full" />
          Something went wrong
        </p>
        <h1 id="error-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-5xl">
          The press jammed for a moment.
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-ink/70">
          That was on our side, not yours. Try again — and if it keeps happening, message or call us and we will help you
          directly.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-lg active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            <RotateCw className="h-4 w-4" /> Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/25 px-6 py-3.5 text-sm font-semibold tracking-wide text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-white active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            <Home className="h-4 w-4" /> Back to home
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-semibold text-ink">
          <a
            href={buildWhatsAppLink('Hi Design N Print, your website showed me an error.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:underline"
          >
            <MessageCircle className="h-4 w-4 text-whatsapp" /> WhatsApp us
          </a>
          <a href={`tel:+${siteConfig.whatsappNumber}`} className="inline-flex items-center gap-2 hover:underline">
            <Phone className="h-4 w-4" /> {siteConfig.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
