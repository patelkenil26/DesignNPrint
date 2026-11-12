'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { jobTicketLines, type JobTicketLine } from '@/data/homeData';
import { siteConfig } from '@/data/siteConfig';

/** How far (px) each pinned ticket sits below the one under it, so the edges of earlier steps stay visible. */
const STACK_OFFSET_PX = 14;
/** same tint as the section background, so the punched holes look see-through */
const TICKET_BACKDROP = 'color-mix(in srgb, var(--color-brand-yellow) 16%, var(--color-paper))';
const accentCycle = ['blue', 'red', 'yellow', 'green'] as const;

const formatNumber = (value: number) => String(value).padStart(2, '0');

interface StackTicketProps {
  line: JobTicketLine;
  ticketIndex: number;
  totalTickets: number;
  progress: MotionValue<number>;
  isMotionAllowed: boolean;
}

/** One step as its own paper ticket. It pins under the header; later tickets slide over it and push it back. */
function StackTicket({ line, ticketIndex, totalTickets, progress, isMotionAllowed }: StackTicketProps) {
  const isLast = ticketIndex === totalTickets - 1;
  const accent = accentCycle[ticketIndex % accentCycle.length];
  /** how many tickets have arrived on top of this one */
  const coveredBy = useTransform(progress, (value) => Math.max(0, value * totalTickets - ticketIndex - 0.5));
  const scale = useTransform(coveredBy, (value) => 1 - Math.min(value, 4) * 0.035);
  const shade = useTransform(coveredBy, (value) => Math.min(value, 1) * 0.35);

  return (
    <li
      className="sticky mb-5 sm:mb-7"
      style={{ top: `calc(var(--nav-height) + 1rem + ${ticketIndex * STACK_OFFSET_PX}px)` }}
    >
      <motion.article
        style={isMotionAllowed ? { scale, transformOrigin: 'top center' } : undefined}
        className="relative overflow-hidden rounded-3xl bg-white shadow-[0_20px_40px_-18px_color-mix(in_srgb,black_45%,transparent)]"
      >
        <span className="absolute inset-y-0 left-0 w-2.5" style={{ backgroundColor: `var(--color-brand-${accent})` }} aria-hidden="true" />
        {/* ticket perforation */}
        <span className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full" style={{ backgroundColor: TICKET_BACKDROP }} aria-hidden="true" />
        <div className="flex items-center gap-4 py-5 pl-7 pr-5 sm:gap-6 sm:py-7 sm:pl-10 sm:pr-8">
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink/50">
              Step {formatNumber(ticketIndex + 1)} / {formatNumber(totalTickets)}
            </p>
            <h3 className="mt-1 font-display text-xl font-bold leading-tight text-ink sm:text-3xl">{line.title}</h3>
            <p className="mt-1.5 text-sm leading-snug text-ink/65 sm:text-base">{line.note}</p>
          </div>
          {line.image ? (
            <span className="relative hidden h-20 w-20 shrink-0 rotate-3 overflow-hidden rounded-xl shadow-lg ring-4 ring-white min-[420px]:block sm:h-28 sm:w-28">
              <Image src={line.image} alt={line.imageAlt ?? ''} fill sizes="7rem" className="object-cover" />
            </span>
          ) : (
            <span className="font-display text-6xl font-black leading-none text-outline opacity-40 sm:text-7xl" aria-hidden="true">
              {formatNumber(ticketIndex + 1)}
            </span>
          )}
        </div>
        {isLast && (
          <motion.span
            className="absolute bottom-3 right-4 -rotate-12 rounded-lg border-4 border-brand-red bg-white/85 px-3 py-1 font-display text-lg font-black uppercase tracking-widest text-brand-red sm:text-2xl"
            initial={isMotionAllowed ? { scale: 2.4, opacity: 0 } : false}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-30%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.25 }}
            aria-hidden="true"
          >
            Dispatched
          </motion.span>
        )}
        {/* darkens a little as newer tickets cover it */}
        <motion.span className="pointer-events-none absolute inset-0 bg-ink" style={{ opacity: isMotionAllowed ? shade : 0 }} aria-hidden="true" />
        <span className="sr-only">
          <Check /> complete
        </span>
      </motion.article>
    </li>
  );
}

/**
 * "How a job moves", version B — no pinned screen. Each step is a paper job ticket that pins under the header while
 * the next one slides over it, so the whole journey piles up as you scroll with plain, natural page scrolling.
 */
export default function JobTicketStack() {
  const stackRef = useRef<HTMLOListElement>(null);
  const isMotionAllowed = !useReducedMotion();
  const totalTickets = jobTicketLines.length;
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start 0.6', 'end 0.85'] });
  const progressBar = useTransform(scrollYProgress, [0, 1], [0.04, 1]);

  return (
    <section
      className="relative"
      style={{ backgroundColor: TICKET_BACKDROP }}
      aria-labelledby="ticket-stack-heading"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-28">
        <div className="lg:sticky lg:top-[calc(var(--nav-height)+2rem)] lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">How a job moves</p>
          <h2 id="ticket-stack-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
            Your job, from brief to doorstep.
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/70 sm:text-base">
            Seven checkpoints. Nothing is printed until you approve the proof.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink/60">{siteConfig.name} · No. DNP-2026</span>
          </div>
          <span className="mt-3 block h-1.5 max-w-sm overflow-hidden rounded-full bg-ink/10" aria-hidden="true">
            <motion.span className="cmyk-strip block h-full origin-left" style={{ scaleX: progressBar }} />
          </span>
          <Link
            href="/contact"
            className="group mt-6 hidden items-center gap-2 text-sm font-semibold text-ink underline-offset-4 hover:underline lg:inline-flex"
          >
            Start your own job ticket <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ol ref={stackRef} className="relative pb-24 sm:pb-32">
          {jobTicketLines.map((line, index) => (
            <StackTicket
              key={line.id}
              line={line}
              ticketIndex={index}
              totalTickets={totalTickets}
              progress={scrollYProgress}
              isMotionAllowed={isMotionAllowed}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
