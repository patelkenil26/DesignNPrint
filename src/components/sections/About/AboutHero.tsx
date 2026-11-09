import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import PrintSheetArt from '@/components/sections/About/PrintSheetArt';
import LinkButton from '@/components/shared/LinkButton';
import RegisteredText from '@/components/shared/RegisteredText';
import Reveal from '@/components/shared/Reveal';
import { siteConfig } from '@/data/siteConfig';

/** About hero — a headline that snaps into registration, next to a drawn press sheet. */
export default function AboutHero() {
  return (
    <section className="bg-studio relative overflow-hidden" aria-labelledby="about-heading">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="animate-float-slow absolute -left-16 top-10 h-56 w-56 rounded-full bg-brand-blue/15 blur-2xl" />
        <span className="animate-float-slower absolute right-10 top-4 h-64 w-64 rounded-full bg-brand-yellow/25 blur-2xl" />
        <span className="animate-float-slow absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-brand-red/15 blur-2xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:px-10 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
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
                About Us
              </li>
            </ol>
          </nav>

          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted">
            <span className="cmyk-strip h-1.5 w-8 rounded-full" />
            Since {siteConfig.foundedYear} · {siteConfig.location}
          </p>
          <h1
            id="about-heading"
            className="mt-4 font-display text-5xl font-bold leading-[1.02] tracking-tight text-ink sm:text-7xl"
          >
            <RegisteredText>Quick designing. Quality printing.</RegisteredText>
          </h1>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/70 sm:text-lg">
              Design N Print is a leading offset press in Ahmedabad — fine-quality printing and supporting services for
              the commerce and industry of Gujarat.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/contact" variant="solid">
                Get in touch <ArrowRight className="h-4 w-4" />
              </LinkButton>
              <LinkButton href="/services" variant="outline">
                See what we print
              </LinkButton>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <PrintSheetArt />
        </Reveal>
      </div>
    </section>
  );
}
