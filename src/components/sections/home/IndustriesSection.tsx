'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  Building2,
  Megaphone,
  MessageCircle,
  Pill,
  Sparkles,
  Sprout,
  SquareStack,
  type LucideIcon,
} from 'lucide-react';
import { industries, type IndustryIconName, type IndustryItem } from '@/data/homeData';
import { buildWhatsAppLink } from '@/data/siteConfig';

const industryIcons: Record<IndustryIconName, LucideIcon> = {
  pharma: Pill,
  ceramic: SquareStack,
  cosmetics: Sparkles,
  agro: Sprout,
  corporate: Building2,
  events: Megaphone,
};

interface IndustryCardProps {
  industry: IndustryItem;
  cardIndex: number;
  isLast: boolean;
}

/** One card in the stack: it pins under the heading and is covered, one at a time, by the next one. */
function IndustryCard({ industry, cardIndex, isLast }: IndustryCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.92]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, isLast ? 0 : 0.35]);

  const Icon = industryIcons[industry.icon];
  const accentColor = `var(--color-brand-${industry.accent})`;

  return (
    <div
      ref={wrapperRef}
      className="sticky mb-6 sm:mb-10"
      style={{ top: `calc(var(--nav-height) + ${1 + cardIndex * 0.8}rem)` }}
    >
      <motion.article
        style={prefersReducedMotion ? undefined : { scale }}
        className="relative grid origin-top gap-6 overflow-hidden rounded-[2rem] p-6 lg:min-h-[21rem] text-ink shadow-2xl sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:p-12"
        aria-labelledby={`industry-${industry.id}`}
      >
        <span className="absolute inset-0" style={{ backgroundColor: `color-mix(in srgb, ${accentColor} 26%, white)` }} aria-hidden="true" />
        <span
          className="text-outline pointer-events-none absolute -right-2 -top-6 font-display text-[8rem] font-black leading-none opacity-40 sm:text-[12rem]"
          aria-hidden="true"
        >
          {String(cardIndex + 1).padStart(2, '0')}
        </span>

        <div className="relative">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-ink" style={{ backgroundColor: accentColor }}>
            <Icon className="h-5 w-5" />
          </span>
          <h3 id={`industry-${industry.id}`} className="mt-5 font-display text-2xl font-bold leading-tight sm:text-4xl">
            {industry.name}
          </h3>
          <p className="mt-3 max-w-md text-base leading-relaxed text-ink/75">{industry.line}</p>
        </div>

        <div className="relative flex flex-col justify-end">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink/65">What we usually print</p>
          <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${industry.name} products`}>
            {industry.products.map((product) => (
              <li key={product} className="rounded-full bg-white/80 px-3.5 py-1.5 text-sm font-medium shadow-sm">
                {product}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href={industry.href}
              className="group inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              See products
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <a
              href={buildWhatsAppLink(`Hi Design N Print, I need a quote for ${industry.name} printing.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/25 px-5 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:bg-white active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              <MessageCircle className="h-4 w-4" /> Get a quote
            </a>
          </div>
        </div>

        {/* darkens a little as the next card slides over it */}
        <motion.span className="pointer-events-none absolute inset-0 bg-ink" style={{ opacity: dim }} aria-hidden="true" />
      </motion.article>
    </div>
  );
}

/** Industries: a stack of cards that pile up as you scroll. */
export default function IndustriesSection() {
  return (
    <section className="bg-studio-dark relative text-white" aria-labelledby="industries-heading">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-10 sm:py-28">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-yellow">Built for your industry</p>
          <h2 id="industries-heading" className="mt-3 font-display text-3xl font-bold leading-tight sm:text-5xl">
            We know what your customers expect.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/70">
            Every trade has its own rules — compliance text, shelf appeal, sample handling. We print with them in mind.
          </p>
        </div>

        <div className="mt-12">
          {industries.map((industry, index) => (
            <IndustryCard key={industry.id} industry={industry} cardIndex={index} isLast={index === industries.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
