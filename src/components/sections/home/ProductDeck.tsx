'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import RegisteredImage from '@/components/shared/RegisteredImage';
import { showcaseProducts, type ShowcaseProduct } from '@/data/homeData';

/** Scroll distance given to each product, as a share of the viewport height. */
const SCROLL_PER_PRODUCT_VH = 55;
/** Share of a card's turn it simply rests on top before being dealt away. */
const REST_SHARE = 0.4;
/** How many cards are visible stacked behind the front one. */
const VISIBLE_BEHIND = 3;

interface DeckCardProps {
  product: ShowcaseProduct;
  cardIndex: number;
  totalCards: number;
  progress: MotionValue<number>;
  isActive: boolean;
  isMotionAllowed: boolean;
}

/** One card in the deck: waits stacked behind, then slides and tilts away when its turn is over. */
function DeckCard({ product, cardIndex, totalCards, progress, isActive, isMotionAllowed }: DeckCardProps) {
  const tiltDirection = cardIndex % 2 === 0 ? 1 : -1;
  /** card position in the deck: negative = still waiting behind, 0–1 = front card, past 1 = gone */
  const place = useTransform(progress, (value) => value * totalCards - cardIndex);
  /** how far behind the front the card waits (0 when it is the front card or already leaving) */
  const waitDepth = (value: number) => Math.min(Math.max(-value, 0), VISIBLE_BEHIND);
  /** 0 while the card rests on top, 1 once it has been dealt away (it rests for the first part of its turn) */
  const leaveAmount = (value: number) => Math.min(Math.max((value - REST_SHARE) / (1 - REST_SHARE), 0), 1);

  const x = useTransform(place, (value) => `${leaveAmount(value) * -125}%`);
  const y = useTransform(place, (value) => waitDepth(value) * 18);
  const scale = useTransform(place, (value) => 1 - waitDepth(value) * 0.05);
  const rotate = useTransform(place, (value) => leaveAmount(value) * -22 + tiltDirection * waitDepth(value) * 2.2);
  const opacity = useTransform(place, (value) => {
    if (-value > VISIBLE_BEHIND) return 0;
    return 1 - Math.max(0, leaveAmount(value) - 0.6) * 2.5;
  });

  return (
    <motion.div
      className="absolute inset-0"
      style={isMotionAllowed ? { x, y, scale, rotate, opacity, zIndex: totalCards - cardIndex } : { zIndex: totalCards - cardIndex }}
      aria-hidden={!isActive}
    >
      <RegisteredImage
        src={product.image}
        alt={product.name}
        sizes="(min-width: 1024px) 26rem, 70vw"
        isRegistered={isActive}
        spread={18}
        priority={cardIndex === 0}
      />
    </motion.div>
  );
}

/** "Most requested" — the bestsellers as a deck of proofs; scrolling deals the top card away and prints the next one into register. */
export default function ProductDeck() {
  const trackRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMotionAllowed = !prefersReducedMotion;
  const [activeIndex, setActiveIndex] = useState(0);
  const totalCards = showcaseProducts.length;

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const nextIndex = Math.min(totalCards - 1, Math.max(0, Math.floor(value * totalCards)));
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  const activeProduct = showcaseProducts[activeIndex] ?? showcaseProducts[0];

  return (
    <section
      ref={trackRef}
      className="relative"
      style={{ height: `calc(100svh + ${totalCards * SCROLL_PER_PRODUCT_VH}vh)` }}
      aria-labelledby="showcase-heading"
    >
      <div
        className="sticky top-[var(--nav-height)] flex h-[calc(100svh-var(--nav-height))] w-full flex-col justify-center overflow-hidden transition-colors duration-700"
        style={{ backgroundColor: `color-mix(in srgb, var(--color-brand-${activeProduct.accent}) 20%, var(--color-paper))` }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_30%_50%,rgba(255,255,255,0.8),transparent_70%)]" />

        {/* huge outlined counter behind the deck */}
        <p
          className="text-outline pointer-events-none absolute -right-4 bottom-0 font-display text-[9rem] font-black leading-none opacity-30 sm:text-[16rem] lg:text-[22rem]"
          aria-hidden="true"
        >
          {String(activeIndex + 1).padStart(2, '0')}
        </p>

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-5 px-5 sm:px-10 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-md lg:col-start-2 lg:row-start-1">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">Most requested</p>
            <h2 id="showcase-heading" className="mt-2 font-display text-2xl font-bold leading-tight text-ink sm:text-4xl lg:mt-3 lg:text-5xl">
              Start with what businesses order most.
            </h2>

            <div className="mt-4 rounded-3xl bg-white/80 p-4 shadow-xl backdrop-blur-md sm:mt-6 sm:p-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct.id}
                  initial={isMotionAllowed ? { opacity: 0, y: 16 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  exit={isMotionAllowed ? { opacity: 0, y: -12 } : undefined}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-muted">
                    <span>{activeProduct.category}</span>
                    <span>
                      {String(activeIndex + 1).padStart(2, '0')} / {String(totalCards).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold text-ink sm:text-2xl">{activeProduct.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{activeProduct.blurb}</p>
                  <Link
                    href={activeProduct.href}
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
                  >
                    View service <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </AnimatePresence>
              <div className="mt-4 flex gap-1.5" aria-hidden="true">
                {showcaseProducts.map((product, index) => (
                  <span
                    key={product.id}
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${index <= activeIndex ? 'bg-ink' : 'bg-ink/15'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-[min(52vw,15rem)] sm:w-[20rem] lg:col-start-1 lg:row-start-1 lg:w-[26rem]">
            {showcaseProducts.map((product, index) => (
              <DeckCard
                key={product.id}
                product={product}
                cardIndex={index}
                totalCards={totalCards}
                progress={scrollYProgress}
                isActive={index === activeIndex}
                isMotionAllowed={isMotionAllowed}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
