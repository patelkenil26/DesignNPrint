'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Camera, Share2 } from 'lucide-react';
import ContactMapCard from '@/components/sections/contact/ContactMapCard';
import Reveal from '@/components/shared/Reveal';
import { findUsSteps } from '@/data/contactData';
import { siteConfig } from '@/data/siteConfig';

/** How to find the press: three landmarks joined by a route that draws itself as you scroll, plus the map. */
export default function FindUs() {
  const stepsRef = useRef<HTMLOListElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ['start 0.8', 'end 0.6'] });
  const routeProgress = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.4 });

  return (
    <section id="find-us" className="scroll-mt-24 bg-paper py-16 sm:py-24" aria-labelledby="find-us-heading">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">Find us</p>
            <h2 id="find-us-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-5xl">
              Three landmarks to our door.
            </h2>
            <address className="mt-5 max-w-sm text-sm not-italic leading-relaxed text-ink/70">
              {siteConfig.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </Reveal>

          <ol ref={stepsRef} className="relative mt-10 space-y-9 pl-14">
            <span className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-0.5 bg-ink/10" aria-hidden="true" />
            <motion.span
              aria-hidden="true"
              className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-0.5 origin-top"
              style={{
                background: 'repeating-linear-gradient(180deg, var(--color-brand-red) 0 8px, transparent 8px 14px)',
                scaleY: prefersReducedMotion ? 1 : routeProgress,
              }}
            />
            {findUsSteps.map((step, index) => (
              <li key={step.id} className="relative">
                <motion.span
                  className="absolute -left-14 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-ink font-display text-sm font-bold text-brand-yellow shadow-lg"
                  initial={prefersReducedMotion ? false : { scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: '-30% 0px -30% 0px' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                >
                  {index + 1}
                </motion.span>
                <Reveal delay={0.05}>
                  <h3 className="font-display text-lg font-bold text-ink">{step.title}</h3>
                  <p className="mt-1 max-w-xs text-sm leading-relaxed text-ink/65">{step.detail}</p>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal className="mt-10 flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Follow us</span>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Design N Print on Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              <Camera className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Design N Print on Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              <Share2 className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        <ContactMapCard />
      </div>
    </section>
  );
}
