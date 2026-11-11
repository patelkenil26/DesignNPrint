'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import CountUp from '@/components/shared/CountUp';
import Reveal from '@/components/shared/Reveal';
import { customerReviews, proofStatCounts } from '@/data/homeData';
import { getYearsInBusiness, siteConfig } from '@/data/siteConfig';

const stats = [
  { id: 'years', value: getYearsInBusiness(), suffix: '+', label: 'Years of experience' },
  { id: 'team', value: proofStatCounts.team, suffix: '+', label: 'Team members' },
  { id: 'products', value: proofStatCounts.products, suffix: '+', label: 'Products delivered' },
  { id: 'clients', value: proofStatCounts.clients, suffix: '+', label: 'Happy clients' },
];

const REVIEW_INTERVAL_MS = 6500;

const reviewerInitials = (name: string): string =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

/** One big review at a time, changing on its own (pauses on hover) — with the other reviewers as tappable tabs. */
function ReviewSpotlight() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const review = customerReviews[activeIndex];

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setTimeout(
      () => setActiveIndex((current) => (current + 1) % customerReviews.length),
      REVIEW_INTERVAL_MS,
    );
    return () => window.clearTimeout(timer);
  }, [activeIndex, isPaused]);

  const goBy = (step: number) =>
    setActiveIndex((current) => (current + step + customerReviews.length) % customerReviews.length);

  return (
    <div
      className="relative overflow-hidden rounded-[2rem] bg-ink p-7 text-white shadow-2xl sm:p-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <span className="cmyk-strip absolute inset-x-0 top-0 h-1.5" aria-hidden="true" />
      <span className="pointer-events-none absolute -left-2 -top-10 font-display text-[12rem] font-black leading-none text-white/[0.06]" aria-hidden="true">
        &ldquo;
      </span>

      <div className="relative min-h-[15rem] sm:min-h-[14rem]" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.figure
            key={review.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex gap-0.5 text-brand-yellow" aria-label={`${review.rating} out of 5 stars`}>
              {Array.from({ length: 5 }, (_, starIndex) => (
                <Star key={starIndex} className={`h-5 w-5 ${starIndex < review.rating ? 'fill-current' : 'text-white/20'}`} />
              ))}
            </div>
            <blockquote className="mt-5 font-display text-xl font-semibold leading-snug sm:text-3xl">{review.text}</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-yellow font-display text-sm font-bold text-ink">
                {reviewerInitials(review.reviewerName)}
              </span>
              <span>
                <span className="block text-sm font-semibold">{review.reviewerName}</span>
                <span className="block text-xs text-white/55">{review.time} · Google review</span>
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="relative mt-8 flex items-center justify-between gap-4">
        <div className="flex gap-2" role="tablist" aria-label="Choose a review">
          {customerReviews.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Review from ${item.reviewerName}`}
              onClick={() => setActiveIndex(index)}
              className="relative h-1.5 w-10 overflow-hidden rounded-full bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow sm:w-14"
            >
              {index === activeIndex && (
                <motion.span
                  key={`${item.id}-${isPaused}`}
                  className="absolute inset-0 origin-left bg-brand-yellow"
                  initial={{ scaleX: isPaused ? 1 : 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: isPaused ? 0 : REVIEW_INTERVAL_MS / 1000, ease: 'linear' }}
                />
              )}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => goBy(-1)}
            aria-label="Previous review"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 transition-all hover:bg-white hover:text-ink active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => goBy(1)}
            aria-label="Next review"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 transition-all hover:bg-white hover:text-ink active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/** Trust proof: oversized counting numbers, then one real-voice review at a time. */
export default function ProofSection() {
  return (
    <section className="bg-paper-deep/60 py-20 sm:py-28" aria-labelledby="proof-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">Trusted since {siteConfig.foundedYear}</p>
          <h2 id="proof-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-5xl">
            Numbers and words from people who print with us.
          </h2>
        </Reveal>

        <dl className="mt-12 grid grid-cols-2 border-y border-ink/15 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.id} delay={index * 0.07} className={`py-8 pl-0 lg:px-8 ${index % 2 === 1 ? 'pl-6 border-l border-ink/15' : ''} ${index >= 2 ? 'border-t border-ink/15 lg:border-t-0' : ''} ${index > 0 ? 'lg:border-l lg:border-ink/15' : ''}`}>
              <dd className="font-display text-5xl font-black leading-none text-ink sm:text-7xl">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </dd>
              <dt className="mt-3 text-sm text-muted">{stat.label}</dt>
              <span className="cmyk-strip mt-4 block h-1 w-12 rounded-full" />
            </Reveal>
          ))}
        </dl>

        <div className="mt-14">
          <ReviewSpotlight />
          <p className="mt-6 text-center">
            <a
              href={siteConfig.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-ink underline underline-offset-4 hover:text-brand-blue"
            >
              Loved your print? Write us a Google review
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
