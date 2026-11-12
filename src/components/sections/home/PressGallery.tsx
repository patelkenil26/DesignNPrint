'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import SafeImage from '@/components/shared/SafeImage';
import { pressGalleryWorks } from '@/data/homeData';
import type { ProductCardData } from '@/lib/productCards';

interface GalleryWork {
  product: ProductCardData;
  tag: string;
}

const formatNumber = (value: number) => String(value).padStart(2, '0');

interface GalleryCardProps {
  work: GalleryWork;
  workIndex: number;
  scrollerRef: React.RefObject<HTMLUListElement | null>;
  isMotionAllowed: boolean;
}

/** One card: leans, grows and slides its photo as it travels through the centre of the scroller. */
function GalleryCard({ work, workIndex, scrollerRef, isMotionAllowed }: GalleryCardProps) {
  const cardRef = useRef<HTMLLIElement>(null);
  const { product, tag } = work;
  const { scrollXProgress } = useScroll({ target: cardRef, container: scrollerRef, axis: 'x', offset: ['start end', 'end start'] });
  /** 0 → 1 while the card crosses the scroller; 0.5 = dead centre */
  const scale = useTransform(scrollXProgress, [0, 0.5, 1], [0.86, 1, 0.86]);
  const rotate = useTransform(scrollXProgress, [0, 0.5, 1], [5, 0, -5]);
  const photoShift = useTransform(scrollXProgress, [0, 1], ['-9%', '9%']);
  const dim = useTransform(scrollXProgress, [0, 0.5, 1], [0.55, 1, 0.55]);

  return (
    <li ref={cardRef} className="w-[74vw] max-w-[22rem] shrink-0 snap-center sm:w-[19rem] lg:w-[22rem]">
      <motion.div style={isMotionAllowed ? { scale, rotate, opacity: dim } : undefined} className="will-change-transform">
        <Link
          href={`/services/${product.slug}`}
          className="group relative block aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-ink-soft shadow-[0_30px_60px_-25px_color-mix(in_srgb,black_80%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow"
        >
          <motion.div className="absolute -inset-x-[12%] inset-y-0" style={isMotionAllowed ? { x: photoShift } : undefined}>
            {product.image ? (
              <SafeImage
                src={product.image}
                alt={product.coverAlt}
                fill
                sizes="(min-width: 1024px) 22rem, 74vw"
                preload={workIndex === 0}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <span className="absolute inset-0 bg-ink-soft" />
            )}
          </motion.div>
          <span className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/35 to-transparent" aria-hidden="true" />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-mono text-[11px] font-bold text-ink backdrop-blur">
            {formatNumber(workIndex + 1)}
          </span>
          <span
            className="absolute right-4 top-4 h-3 w-3 rounded-full ring-4 ring-white/25"
            style={{ backgroundColor: `var(--color-brand-${product.accent})` }}
            aria-hidden="true"
          />
          <span className="absolute inset-x-0 bottom-0 p-5 text-white">
            <span className="block font-display text-2xl font-bold leading-tight">{product.name}</span>
            <span className="mt-1 flex items-end justify-between gap-3">
              <span className="text-sm leading-snug text-white/75">{tag}</span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:rotate-45 group-active:scale-90">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </span>
          </span>
        </Link>
      </motion.div>
    </li>
  );
}

interface PressGalleryProps {
  products: ProductCardData[];
}

/**
 * "Fresh off the press": a swipeable rail of real work. Cards ease into the centre as you swipe, with a counter
 * and arrow buttons for desktop. Native scroll-snap keeps it smooth on every phone.
 */
export default function PressGallery({ products }: PressGalleryProps) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const isMotionAllowed = !useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const works = useMemo<GalleryWork[]>(() => {
    const productBySlug = new Map(products.map((product) => [product.slug, product]));
    return pressGalleryWorks.flatMap(({ slug, tag }) => {
      const product = productBySlug.get(slug);
      return product ? [{ product, tag }] : [];
    });
  }, [products]);

  const { scrollXProgress } = useScroll({ container: scrollerRef, axis: 'x' });
  useMotionValueEvent(scrollXProgress, 'change', (value) => {
    const nextIndex = Math.round(value * (works.length - 1));
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });
  const barScale = useTransform(scrollXProgress, [0, 1], [1 / works.length, 1]);

  const scrollByCard = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const cardWidth = scroller.firstElementChild?.getBoundingClientRect().width ?? 300;
    scroller.scrollBy({ left: direction * (cardWidth + 16), behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-ink py-16 text-white sm:py-24" aria-labelledby="gallery-heading">
      <span className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-brand-blue/20 blur-[110px]" aria-hidden="true" />
      <span className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-brand-red/20 blur-[110px]" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-7xl items-end justify-between gap-6 px-5 sm:px-10">
        <motion.div
          initial={isMotionAllowed ? { opacity: 0, y: 28 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-yellow">Fresh off the press</p>
          <h2 id="gallery-heading" className="mt-3 max-w-xl font-display text-3xl font-bold leading-tight sm:text-5xl">
            Real work. Swipe through it.
          </h2>
        </motion.div>
        <div className="hidden shrink-0 gap-2 sm:flex">
          {[-1, 1].map((direction) => (
            <button
              key={direction}
              type="button"
              onClick={() => scrollByCard(direction as 1 | -1)}
              aria-label={direction === 1 ? 'Next work' : 'Previous work'}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 transition-all hover:bg-white hover:text-ink active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
            >
              {direction === 1 ? <ArrowRight className="h-5 w-5" /> : <ArrowLeft className="h-5 w-5" />}
            </button>
          ))}
        </div>
      </div>

      <ul
        ref={scrollerRef}
        className="no-scrollbar relative mt-10 flex snap-x snap-mandatory items-center gap-4 overflow-x-auto px-[13vw] py-6 sm:px-10 lg:px-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]"
        aria-label="Examples of our printed work"
      >
        {works.map((work, workIndex) => (
          <GalleryCard key={work.product.slug} work={work} workIndex={workIndex} scrollerRef={scrollerRef} isMotionAllowed={isMotionAllowed} />
        ))}
      </ul>

      <div className="relative mx-auto mt-6 flex max-w-7xl items-center gap-4 px-5 sm:px-10">
        <span className="font-mono text-xs font-bold tabular-nums text-white/70">
          {formatNumber(activeIndex + 1)} / {formatNumber(works.length)}
        </span>
        <span className="block h-1 flex-1 overflow-hidden rounded-full bg-white/15" aria-hidden="true">
          <motion.span className="cmyk-strip block h-full origin-left" style={{ scaleX: barScale }} />
        </span>
        <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-brand-yellow">
          All products <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
