import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import LinkButton from '@/components/shared/LinkButton';
import Reveal from '@/components/shared/Reveal';
import { getCategoryHref, productCategories } from '@/data/categories';
import { buildWhatsAppLink } from '@/data/siteConfig';

/** Colour-plate shadow that makes the big numerals look like a misregistered print. */
const misregisteredShadow =
  '-7px -4px 0 var(--color-brand-blue), 7px -2px 0 var(--color-brand-red), 2px 8px 0 var(--color-brand-yellow)';

/** Branded 404 — shown for any address that does not exist. */
export default function NotFound() {
  return (
    <section className="bg-studio relative overflow-hidden" aria-labelledby="not-found-heading">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="animate-float-slow absolute -left-16 top-10 h-56 w-56 rounded-full bg-brand-blue/15 blur-2xl" />
        <span className="animate-float-slower absolute right-10 top-4 h-64 w-64 rounded-full bg-brand-yellow/25 blur-2xl" />
        <span className="animate-float-slow absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-brand-red/15 blur-2xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-var(--nav-height))] max-w-4xl flex-col items-center justify-center px-5 py-16 text-center sm:px-10">
        <p
          aria-hidden="true"
          className="animate-float-slow select-none font-display text-[7.5rem] font-black leading-none text-ink sm:text-[12rem]"
          style={{ textShadow: misregisteredShadow }}
        >
          404
        </p>

        <Reveal className="mt-8">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted">
            <span className="cmyk-strip h-1.5 w-8 rounded-full" />
            Page not found
          </p>
          <h1 id="not-found-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-5xl">
            This page went off the press.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink/70">
            The address may have changed or the page may have moved. Head back home, or tell us what you were looking for
            and we will point you to it.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <LinkButton href="/" variant="solid">
              Back to home <ArrowRight className="h-4 w-4" />
            </LinkButton>
            <LinkButton href="/services" variant="outline">
              Browse services
            </LinkButton>
            <LinkButton
              href={buildWhatsAppLink('Hi Design N Print, I could not find a page on your website.')}
              isExternal
              variant="whatsapp"
            >
              <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
            </LinkButton>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-12 w-full">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Popular places</p>
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
            {productCategories.map((category) => (
              <li key={category.id}>
                <Link
                  href={getCategoryHref(category.slug)}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-sm ring-1 ring-ink/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                >
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: `var(--color-brand-${category.accent})` }} />
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
