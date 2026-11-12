'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { jobTicketLines, type JobTicketLine } from '@/data/homeData';
import { siteConfig } from '@/data/siteConfig';


const formatNumber = (value: number) => String(value).padStart(2, '0');

interface TicketRowProps {
  line: JobTicketLine;
  rowIndex: number;
  totalRows: number;
  progress: MotionValue<number>;
}

/** One line of the ticket: its check mark draws once the print head has passed. */
function TicketRow({ line, rowIndex, totalRows, progress }: TicketRowProps) {
  const passedAt = (rowIndex + 0.6) / (totalRows + 0.4);
  const checkScale = useTransform(progress, (value) => Math.min(1, Math.max(0, (value - passedAt) / 0.04)));
  const rowInk = useTransform(progress, (value) => (value >= passedAt - 0.02 ? 1 : 0.45));

  return (
    <li className="relative flex items-center gap-3 border-b border-dashed border-ink/20 py-1.5 [@media(max-height:700px)]:py-1 sm:gap-4 sm:py-3.5">
      <span className="w-5 shrink-0 font-mono text-[11px] font-bold text-ink/60">{formatNumber(rowIndex + 1)}</span>
      <motion.div className="min-w-0 flex-1" style={{ opacity: rowInk }}>
        <p className="font-mono text-[13px] font-bold uppercase leading-tight tracking-wide text-ink sm:text-sm">{line.title}</p>
        <p className="mt-0.5 hidden text-xs leading-snug text-ink/65 sm:block">{line.note}</p>
      </motion.div>
      {line.image && (
        <span className="relative hidden h-12 w-12 shrink-0 rotate-3 overflow-hidden rounded-md shadow-md ring-2 ring-white sm:block">
          <Image src={line.image} alt={line.imageAlt ?? ''} fill sizes="48px" className="object-cover" />
        </span>
      )}
      <motion.span
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-white"
        style={{ scale: checkScale, opacity: checkScale }}
        aria-hidden="true"
      >
        <Check className="h-3.5 w-3.5" />
      </motion.span>
    </li>
  );
}

/**
 * "Your job, from brief to doorstep" as a job ticket that prints out of a slot while you scroll:
 * the print head moves down the paper, each step is ticked off, and the job is stamped dispatched at the end.
 */
export default function JobTicket() {
  const trackRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMotionAllowed = !prefersReducedMotion;
  const totalRows = jobTicketLines.length;
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const nextIndex = Math.min(totalRows - 1, Math.floor((value * (totalRows + 0.4)) - 0.1));
    setActiveIndex((current) => (current === Math.max(0, nextIndex) ? current : Math.max(0, nextIndex)));
  });

  /** how much of the ticket has been printed, 0 → 1 (the last stretch of scroll is kept for the stamp) */
  const printed = useTransform(scrollYProgress, [0, 0.92], [0, 1], { clamp: true });
  const revealClip = useTransform(printed, (value) => `inset(0 0 ${(1 - value) * 100}% 0)`);
  const headTop = useTransform(printed, (value) => `${value * 100}%`);
  const paperSettle = useTransform(scrollYProgress, (value) => Math.sin(value * 40) * 1.4);
  const stampScale = useTransform(scrollYProgress, [0.9, 0.97], [2.4, 1], { clamp: true });
  const stampOpacity = useTransform(scrollYProgress, [0.9, 0.95], [0, 1], { clamp: true });
  const progressBar = useTransform(scrollYProgress, (value) => Math.min(1, value / 0.92));

  const activeLine = jobTicketLines[activeIndex];

  return (
    <section
      ref={trackRef}
      className="relative h-[calc(100svh+150vh)] sm:h-[calc(100svh+260vh)]"
      aria-labelledby="ticket-heading"
    >
      <div
        className="sticky top-[var(--nav-height)] flex h-[calc(100svh-var(--nav-height))] w-full items-center overflow-hidden"
        style={{ backgroundColor: 'color-mix(in srgb, var(--color-brand-yellow) 16%, var(--color-paper))' }}
      >
        <span className="text-outline pointer-events-none absolute -left-4 bottom-0 font-display text-[9rem] font-black leading-none opacity-20 sm:text-[18rem]" aria-hidden="true">
          {formatNumber(activeIndex + 1)}
        </span>

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-4 px-5 sm:px-10 md:grid-cols-[1fr_0.95fr] md:gap-10 lg:gap-16 max-sm:gap-2">
          <div className="order-2 md:order-1">
            <p className="hidden text-xs font-semibold uppercase tracking-[0.25em] text-muted sm:block">How a job moves</p>
            <h2 id="ticket-heading" className="mt-2 hidden font-display text-2xl font-bold leading-tight text-ink sm:text-4xl sm:block lg:mt-3 lg:text-6xl">
              Your job, from brief to doorstep.
            </h2>

            <div className="mt-2 max-w-md rounded-2xl bg-ink p-3 text-white shadow-xl sm:mt-6 sm:p-5" role="status">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLine.id}
                  initial={isMotionAllowed ? { opacity: 0, y: 14 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  exit={isMotionAllowed ? { opacity: 0, y: -10 } : undefined}
                  transition={{ duration: 0.28 }}
                >
                  <p className="font-mono text-xs font-bold text-brand-yellow">
                    STEP {formatNumber(activeIndex + 1)} / {formatNumber(totalRows)}
                  </p>
                  <p className="mt-1 font-display text-lg font-bold sm:text-2xl">{activeLine.title}</p>
                  <p className="mt-1 hidden text-xs leading-relaxed text-white/70 sm:block sm:text-sm">{activeLine.note}</p>
                </motion.div>
              </AnimatePresence>
              <span className="mt-4 block h-1 overflow-hidden rounded-full bg-white/15" aria-hidden="true">
                <motion.span className="cmyk-strip block h-full origin-left" style={{ scaleX: progressBar }} />
              </span>
            </div>

            <Link
              href="/contact"
              className="group mt-5 hidden items-center gap-2 text-sm font-semibold text-ink underline-offset-4 hover:underline sm:inline-flex"
            >
              Start your own job ticket <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* printer + ticket */}
          <div className="order-1 mx-auto w-full max-w-[26rem] md:order-2">
            <div className="relative z-10 flex h-8 items-center justify-between rounded-t-2xl bg-ink px-4 shadow-xl sm:h-10">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">{siteConfig.name}</span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-whatsapp" />
                <span className="h-2 w-2 rounded-full bg-brand-yellow" />
              </span>
            </div>
            <div className="relative z-10 mx-3 h-1.5 rounded-b-full bg-ink-soft shadow-[0_6px_14px_-4px_color-mix(in_srgb,black_55%,transparent)]" />

            <motion.div className="relative -mt-1 origin-top" style={isMotionAllowed ? { rotate: paperSettle } : undefined}>
              <motion.div
                className="relative bg-white px-4 pb-5 pt-4 [@media(max-height:700px)]:pb-3 [@media(max-height:700px)]:pt-3 shadow-2xl sm:px-6 sm:pb-6 sm:pt-5"
                style={{ clipPath: isMotionAllowed ? revealClip : undefined }}
              >
                <div className="flex items-start justify-between border-b-2 border-ink pb-2 sm:pb-3">
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-ink/65">Job ticket</p>
                    <p className="font-display text-lg font-black text-ink sm:text-2xl">No. DNP-2026</p>
                  </div>
                  <span className="cmyk-strip mt-1 h-5 w-12 rounded sm:h-6 sm:w-14" aria-hidden="true" />
                </div>

                <ol className="mt-1">
                  {jobTicketLines.map((line, index) => (
                    <TicketRow key={line.id} line={line} rowIndex={index} totalRows={totalRows} progress={printed} />
                  ))}
                </ol>

                <div className="mt-3 flex items-end justify-between gap-3 sm:mt-4">
                  <span className="flex h-7 items-stretch gap-[2px] sm:h-9" aria-hidden="true">
                    {[3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 3, 1, 2, 1, 3, 2, 1].map((width, index) => (
                      <span key={index} className="bg-ink" style={{ width }} />
                    ))}
                  </span>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink/65">{siteConfig.location}</p>
                </div>

                <motion.span
                  className="absolute -bottom-1 right-2 scale-90 sm:bottom-10 sm:right-4 sm:scale-100 -rotate-12 rounded-lg border-4 bg-white/80 border-brand-red px-4 py-1.5 font-display text-2xl font-black uppercase tracking-widest text-brand-red-text sm:right-8 sm:text-4xl"
                  style={isMotionAllowed ? { scale: stampScale, opacity: stampOpacity } : undefined}
                  aria-hidden="true"
                >
                  Dispatched
                </motion.span>
              </motion.div>

              {/* the print head: a thin CMYK line riding the edge of the printed area */}
              {isMotionAllowed && (
                <motion.span
                  className="cmyk-strip pointer-events-none absolute inset-x-0 z-10 h-1 shadow-[0_0_18px_var(--color-brand-yellow)]"
                  style={{ top: headTop }}
                  aria-hidden="true"
                />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
