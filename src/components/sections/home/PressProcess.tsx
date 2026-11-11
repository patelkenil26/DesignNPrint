'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { CheckCheck, Truck } from 'lucide-react';
import { pressSheetArtwork, pressSteps } from '@/data/homeData';

/** Scroll length of the section, in viewport heights, on top of the pinned screen itself. */
const SCROLL_LENGTH_VH = 320;

/** The four ink units — each one lays its colour on the sheet during its own slice of the scroll. */
const inkPhases = [
  { id: 'cyan', label: 'C', colorVar: 'var(--color-brand-blue)', start: 0.18, end: 0.31 },
  { id: 'magenta', label: 'M', colorVar: 'var(--color-brand-red)', start: 0.31, end: 0.45 },
  { id: 'yellow', label: 'Y', colorVar: 'var(--color-brand-yellow)', start: 0.45, end: 0.58 },
  { id: 'black', label: 'K', colorVar: 'var(--color-ink)', start: 0.58, end: 0.72 },
] as const;

const FINISH_START = 0.72;
const FINISH_END = 0.9;

/** 0 → 1 while `value` travels from `start` to `end`. */
const stageAmount = (value: number, start: number, end: number): number =>
  Math.min(1, Math.max(0, (value - start) / (end - start)));

function usePhase(progress: MotionValue<number>, start: number, end: number): MotionValue<number> {
  return useTransform(progress, (value) => stageAmount(value, start, end));
}

/** Pinned scroll story: the sheet builds up colour by colour, gets finished (die-cut + gloss), then is packed. */
export default function PressProcess() {
  const trackRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeInkIndex, setActiveInkIndex] = useState(-1);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    let nextStep = 0;
    pressSteps.forEach((step, index) => {
      if (value >= step.start) nextStep = index;
    });
    setActiveIndex((current) => (current === nextStep ? current : nextStep));
    const nextInk = inkPhases.findIndex((phase) => value >= phase.start && value < phase.end);
    setActiveInkIndex((current) => (current === nextInk ? current : nextInk));
  });

  const cyan = usePhase(scrollYProgress, inkPhases[0].start, inkPhases[0].end);
  const magenta = usePhase(scrollYProgress, inkPhases[1].start, inkPhases[1].end);
  const yellow = usePhase(scrollYProgress, inkPhases[2].start, inkPhases[2].end);
  const black = usePhase(scrollYProgress, inkPhases[3].start, inkPhases[3].end);
  const finish = usePhase(scrollYProgress, FINISH_START, FINISH_END);
  const packed = usePhase(scrollYProgress, FINISH_END, 1);

  const inkAmounts = [cyan, magenta, yellow, black];

  const greyArtOpacity = useTransform(cyan, (value) => 0.18 + 0.82 * value);
  const cyanOverlay = useTransform([cyan, black], ([c, k]: number[]) => 0.6 * c * (1 - k));
  const magentaOverlay = useTransform([magenta, black], ([m, k]: number[]) => 0.5 * m * (1 - k));
  const yellowOverlay = useTransform([yellow, black], ([y, k]: number[]) => 0.45 * y * (1 - k));
  const proofMarksOpacity = useTransform(cyan, (value) => 1 - value);

  /** the roller bar sweeps across the sheet once per ink unit */
  const rollerLeft = useTransform(scrollYProgress, (value) => {
    const phaseIndex = inkPhases.findIndex((phase) => value >= phase.start && value < phase.end);
    if (phaseIndex < 0) return '-10%';
    const phase = inkPhases[phaseIndex];
    return `${stageAmount(value, phase.start, phase.end) * 100}%`;
  });
  const rollerOpacity = useTransform(scrollYProgress, (value) =>
    value > inkPhases[0].start && value < inkPhases[3].end ? 1 : 0,
  );

  const glossX = useTransform(finish, (value) => `${-60 + value * 180}%`);
  const sheetScale = useTransform(packed, (value) => 1 - value * 0.12);
  const stampOpacity = useTransform(packed, (value) => Math.min(1, value * 3));
  const stampScale = useTransform(packed, (value) => 1.8 - Math.min(1, value * 3) * 0.8);

  const activeStep = pressSteps[activeIndex] ?? pressSteps[0];
  const activeInk = activeInkIndex >= 0 ? inkPhases[activeInkIndex] : null;
  const sheetSizes = '(min-width: 1024px) 36rem, 90vw';

  return (
    <section
      ref={trackRef}
      className="relative"
      style={{ height: `calc(100svh + ${SCROLL_LENGTH_VH}vh)` }}
      aria-labelledby="press-heading"
    >
      <div className="bg-studio sticky top-[var(--nav-height)] flex h-[calc(100svh-var(--nav-height))] w-full items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-5 px-5 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">Inside the press</p>
            <h2 id="press-heading" className="mt-2 font-display text-2xl font-bold leading-tight text-ink sm:text-4xl lg:mt-3 lg:text-5xl">
              From blank sheet to brilliant print.
            </h2>

            <ol className="mt-5 hidden gap-2 lg:grid">
              {pressSteps.map((step, index) => {
                const isActive = index === activeIndex;
                return (
                  <li
                    key={step.id}
                    aria-current={isActive ? 'step' : undefined}
                    className={`rounded-2xl border px-5 py-3.5 transition-all duration-500 ${
                      isActive ? 'border-ink bg-ink text-white shadow-xl' : 'border-ink/10 bg-white/50 text-ink/55'
                    }`}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className={`font-display text-sm font-bold ${isActive ? 'text-brand-yellow' : 'text-ink/35'}`}>{step.number}</span>
                      <h3 className="text-sm font-semibold">{step.title}</h3>
                    </div>
                    <p
                      className={`overflow-hidden pl-8 text-xs leading-relaxed transition-all duration-500 ${
                        isActive ? 'mt-1 max-h-24 opacity-80' : 'max-h-0 opacity-0'
                      }`}
                    >
                      {step.body}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>

          <div>
            {/* the sheet */}
            <motion.div
              className="relative mx-auto aspect-[3/2] w-full max-w-[36rem] rounded-xl bg-white p-3 shadow-2xl sm:p-5"
              style={prefersReducedMotion ? undefined : { scale: sheetScale }}
            >
              <div className="relative h-full w-full overflow-hidden bg-paper">
                {/* faint proof of the artwork, then the black-and-white image grows in as cyan lands */}
                <Image
                  src={pressSheetArtwork.image}
                  alt={pressSheetArtwork.alt}
                  fill
                  sizes={sheetSizes}
                  className="object-cover opacity-[0.18] grayscale"
                />
                <motion.div className="absolute inset-0" style={{ opacity: greyArtOpacity }}>
                  <Image src={pressSheetArtwork.image} alt="" fill sizes={sheetSizes} className="object-cover brightness-125 contrast-110 grayscale" />
                </motion.div>

                {/* ink units laid on one after another */}
                <motion.span className="absolute inset-0 mix-blend-multiply" style={{ backgroundColor: inkPhases[0].colorVar, opacity: cyanOverlay }} aria-hidden="true" />
                <motion.span className="absolute inset-0 mix-blend-multiply" style={{ backgroundColor: inkPhases[1].colorVar, opacity: magentaOverlay }} aria-hidden="true" />
                <motion.span className="absolute inset-0 mix-blend-multiply" style={{ backgroundColor: inkPhases[2].colorVar, opacity: yellowOverlay }} aria-hidden="true" />
                <motion.div className="absolute inset-0" style={{ opacity: black }}>
                  <Image src={pressSheetArtwork.image} alt="" fill sizes={sheetSizes} className="object-cover" />
                </motion.div>

                {/* roller */}
                <motion.span
                  className="absolute inset-y-0 w-1.5 -translate-x-1/2 rounded-full shadow-lg"
                  style={{
                    left: rollerLeft,
                    opacity: rollerOpacity,
                    backgroundColor: activeInk ? activeInk.colorVar : 'transparent',
                  }}
                  aria-hidden="true"
                />

                {/* PROOF stamp, gone once ink hits the sheet */}
                <motion.div className="pointer-events-none absolute inset-0" style={{ opacity: proofMarksOpacity }} aria-hidden="true">
                  <span className="absolute right-3 top-3 -rotate-6 rounded border-2 border-brand-red px-2 py-0.5 font-display text-xs font-black uppercase tracking-widest text-brand-red sm:text-sm">
                    Proof
                  </span>
                </motion.div>

                {/* finishing: die-cut outline draws itself, gloss sweeps across */}
                <svg className="pointer-events-none absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <motion.rect
                    x="1"
                    y="1"
                    width="98"
                    height="98"
                    rx="6"
                    fill="none"
                    stroke="var(--color-ink)"
                    strokeWidth="1.2"
                    strokeDasharray="3 2"
                    vectorEffect="non-scaling-stroke"
                    style={{ opacity: finish }}
                  />
                </svg>
                <motion.span
                  className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent"
                  style={{ left: glossX }}
                  aria-hidden="true"
                />

                {/* packed & dispatched */}
                <motion.div className="absolute inset-0 flex items-center justify-center bg-ink/55" style={{ opacity: stampOpacity }} aria-hidden="true">
                  <motion.span
                    className="flex items-center gap-2 rounded-xl border-4 border-white px-5 py-2 font-display text-xl font-black uppercase tracking-widest text-white sm:text-3xl"
                    style={{ scale: stampScale, rotate: -6 }}
                  >
                    <CheckCheck className="h-6 w-6 sm:h-8 sm:w-8" /> Dispatched
                    <Truck className="h-6 w-6 sm:h-8 sm:w-8" />
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>

            {/* the four ink units */}
            <div className="mx-auto mt-5 grid max-w-[36rem] grid-cols-4 gap-2 sm:gap-3" aria-hidden="true">
              {inkPhases.map((phase, index) => (
                <div key={phase.id} className="rounded-xl bg-white/70 p-2 sm:p-2.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex h-6 w-6 items-center justify-center rounded-full font-display text-[11px] font-bold"
                      style={{ backgroundColor: phase.colorVar, color: phase.id === 'yellow' ? 'var(--color-ink)' : 'white' }}
                    >
                      {phase.label}
                    </span>
                    <span className="hidden text-[11px] font-semibold uppercase tracking-wider text-ink/60 sm:inline">{phase.id}</span>
                  </div>
                  <span className="mt-2 block h-1 overflow-hidden rounded-full bg-ink/10">
                    <motion.span className="block h-full origin-left rounded-full" style={{ scaleX: inkAmounts[index], backgroundColor: phase.colorVar }} />
                  </span>
                </div>
              ))}
            </div>

            {/* mobile: only the current step is spelled out */}
            <div className="mx-auto mt-4 max-w-[36rem] rounded-2xl bg-ink p-4 text-white lg:hidden" role="status">
              <p className="text-xs font-bold text-brand-yellow">
                {activeStep.number} / {String(pressSteps.length).padStart(2, '0')}
              </p>
              <h3 className="mt-0.5 text-sm font-semibold">{activeStep.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-white/75">{activeStep.body}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
