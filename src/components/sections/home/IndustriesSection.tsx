import Link from 'next/link';
import {
  ArrowUpRight,
  Building2,
  Megaphone,
  Pill,
  Sparkles,
  Sprout,
  SquareStack,
  MessageCircle,
  type LucideIcon,
} from 'lucide-react';
import Reveal from '@/components/shared/Reveal';
import TiltCard from '@/components/shared/TiltCard';
import { industries, type IndustryIconName } from '@/data/homeData';
import { buildWhatsAppLink } from '@/data/siteConfig';

const industryIcons: Record<IndustryIconName, LucideIcon> = {
  pharma: Pill,
  ceramic: SquareStack,
  cosmetics: Sparkles,
  agro: Sprout,
  corporate: Building2,
  events: Megaphone,
};

/** Text-led on purpose: the product photography already lives in the sections above. */
export default function IndustriesSection() {
  return (
    <section className="bg-studio-dark relative text-white" aria-labelledby="industries-heading">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-10 sm:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-yellow">Built for your industry</p>
          <h2 id="industries-heading" className="mt-3 font-display text-3xl font-bold leading-tight sm:text-5xl">
            We know what your customers expect.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/70">
            Every trade has its own rules — compliance text, shelf appeal, sample handling. We print with them in mind.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => {
            const Icon = industryIcons[industry.icon];
            const accentColor = `var(--color-brand-${industry.accent})`;
            return (
              <Reveal key={industry.id} delay={(index % 3) * 0.08}>
                <TiltCard className="h-full">
                  <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.07]">
                    <span className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundColor: accentColor }} />
                    <span
                      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-ink"
                      style={{ backgroundColor: accentColor }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-bold">{industry.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">{industry.line}</p>

                    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${industry.name} products`}>
                      {industry.products.map((product) => (
                        <li key={product} className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/80">
                          {product}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-sm font-semibold">
                      <Link
                        href={industry.href}
                        className="group inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                      >
                        See products
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Link>
                      <a
                        href={buildWhatsAppLink(`Hi Design N Print, I need a quote for ${industry.name} printing.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-whatsapp transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                      >
                        <MessageCircle className="h-4 w-4" /> Get a quote
                      </a>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
