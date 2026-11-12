import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import PrintSheetArt from '@/components/sections/About/PrintSheetArt';
import LinkButton from '@/components/shared/LinkButton';
import RegisteredText from '@/components/shared/RegisteredText';
import Reveal from '@/components/shared/Reveal';
import { productCatalog } from '@/data/productCatalog';
import { proofStatCounts } from '@/data/homeData';
import { getYearsInBusiness, siteConfig } from '@/data/siteConfig';

/** Quick facts under the buttons — the numbers come from the same data as the stats section. */
const heroFacts = [
  { id: 'years', value: `${getYearsInBusiness()}+`, label: 'years' },
  { id: 'products', value: String(productCatalog.length), label: 'products' },
  { id: 'clients', value: `${proofStatCounts.clients}+`, label: 'clients' },
] as const;

/** About hero — a headline that snaps into registration, next to a drawn press sheet. */
export default function AboutHero() {
  return (
    <section className="bg-studio relative overflow-hidden" aria-labelledby="about-heading">
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
            className="mt-4 text-balance font-display text-[clamp(2.5rem,11.5vw,3.4rem)] font-bold leading-[1.02] tracking-tight text-ink sm:text-7xl"
          >
            <RegisteredText>Quick designing. Quality printing.</RegisteredText>
          </h1>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/70 sm:text-lg">
              Design N Print is a leading offset press in Ahmedabad — fine-quality printing and supporting services for
              the commerce and industry of Gujarat.
            </p>
            <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
              <LinkButton href="/contact" variant="solid">
                Get in touch <ArrowRight className="h-4 w-4" />
              </LinkButton>
              <LinkButton href="/services" variant="outline">
                See what we print
              </LinkButton>
            </div>
            <ul className="mt-7 flex flex-wrap gap-2" aria-label="Design N Print at a glance">
              {heroFacts.map((fact) => (
                <li key={fact.id} className="inline-flex items-baseline gap-1.5 rounded-full border border-ink/10 bg-white/70 px-4 py-2 backdrop-blur">
                  <span className="font-display text-lg font-bold text-ink">{fact.value}</span>
                  <span className="text-xs font-medium text-ink/60">{fact.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <PrintSheetArt />
        </Reveal>
      </div>
    </section>
  );
}
