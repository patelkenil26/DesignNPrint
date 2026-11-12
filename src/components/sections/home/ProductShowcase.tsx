'use client';

import { useMemo, useRef, useState } from 'react';
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
import ProductArt from '@/components/shared/ProductArt';
import RegisteredImage from '@/components/shared/RegisteredImage';
import { productCategories } from '@/data/categories';
import type { ProductCardData } from '@/lib/productCards';

/** Scroll distance given to each product, as a share of the viewport height. */
const SCROLL_PER_PRODUCT_VH = 38;
/** Share of a card's turn it simply rests on top before being dealt away. */
const REST_SHARE = 0.4;
/** How many cards are visible stacked behind the front one. */
const VISIBLE_BEHIND = 3;

interface ShowcaseItem {
  product: ProductCardData;
  categoryIndex: number;
}

const formatNumber = (value: number) => String(value).padStart(2, '0');

interface DeckCardProps {
  item: ShowcaseItem;
  cardIndex: number;
  totalCards: number;
  progress: MotionValue<number>;
  isActive: boolean;
  isMotionAllowed: boolean;
}

/** One card in the deck: waits stacked behind, then slides and tilts away when its turn is over. */
function DeckCard({ item, cardIndex, totalCards, progress, isActive, isMotionAllowed }: DeckCardProps) {
  const { product } = item;
  const tiltDirection = cardIndex % 2 === 0 ? 1 : -1;
  /** negative = still waiting behind, 0–1 = front card, past 1 = gone */
  const place = useTransform(progress, (value) => value * totalCards - cardIndex);
  const waitDepth = (value: number) => Math.min(Math.max(-value, 0), VISIBLE_BEHIND);
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
      {product.image ? (
        <RegisteredImage
          src={product.image}
          alt={product.coverAlt}
          sizes="(min-width: 1024px) 28rem, 70vw"
          isRegistered={isActive}
          spread={18}
          priority={cardIndex === 0}
        />
      ) : (
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white shadow-xl">
          <ProductArt accent={product.accent} mark={formatNumber(cardIndex + 1)} caption={product.name} />
        </div>
      )}
      {/* glare that follows the pointer — only on the front card */}
      {isActive && (
        <span
          className="pointer-events-none absolute inset-0 rounded-2xl mix-blend-soft-light"
          style={{
            background:
              'radial-gradient(circle at var(--glare-x, 30%) var(--glare-y, 20%), color-mix(in srgb, white 70%, transparent), transparent 55%)',
          }}
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
}

interface ProductShowcaseProps {
  products: ProductCardData[];
}

/**
 * The whole range in one place: every product appears exactly once, grouped by category.
 * Scroll deals the cards one by one; the category rail shows where you are and jumps to a family.
 */
export default function ProductShowcase({ products }: ProductShowcaseProps) {
  const trackRef = useRef<HTMLElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMotionAllowed = !prefersReducedMotion;
  const [activeIndex, setActiveIndex] = useState(0);

  /** products in category order, each tagged with the family it belongs to */
  const items = useMemo<ShowcaseItem[]>(() => {
    const productBySlug = new Map(products.map((product) => [product.slug, product]));
    return productCategories.flatMap((category, categoryIndex) =>
      category.productSlugs.flatMap((slug) => {
        const product = productBySlug.get(slug);
        return product ? [{ product, categoryIndex }] : [];
      }),
    );
  }, [products]);

  const totalCards = items.length;
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const nextIndex = Math.min(totalCards - 1, Math.max(0, Math.floor(value * totalCards)));
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  const activeItem = items[activeIndex] ?? items[0];
  const activeProduct = activeItem.product;
  const activeCategory = productCategories[activeItem.categoryIndex];

  const categoryStartIndexes = useMemo(
    () => productCategories.map((_, categoryIndex) => items.findIndex((item) => item.categoryIndex === categoryIndex)),
    [items],
  );

  const jumpToCategory = (categoryIndex: number) => {
    const track = trackRef.current;
    const startIndex = categoryStartIndexes[categoryIndex];
    if (!track || startIndex < 0) return;
    const scrollable = track.offsetHeight - window.innerHeight;
    const top = track.getBoundingClientRect().top + window.scrollY + (startIndex / totalCards + 0.002) * scrollable;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const handleDeckPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const deck = deckRef.current;
    if (!deck || !isMotionAllowed) return;
    const bounds = deck.getBoundingClientRect();
    const percentX = ((event.clientX - bounds.left) / bounds.width) * 100;
    const percentY = ((event.clientY - bounds.top) / bounds.height) * 100;
    deck.style.setProperty('--glare-x', `${percentX}%`);
    deck.style.setProperty('--glare-y', `${percentY}%`);
    deck.style.setProperty('--deck-tilt-x', `${(percentY - 50) * -0.12}deg`);
    deck.style.setProperty('--deck-tilt-y', `${(percentX - 50) * 0.12}deg`);
  };

  const resetDeckPointer = () => {
    const deck = deckRef.current;
    deck?.style.removeProperty('--deck-tilt-x');
    deck?.style.removeProperty('--deck-tilt-y');
  };

  const typePreview = activeProduct.typeNames.slice(0, 4);
  const hiddenTypeCount = activeProduct.typeNames.length - typePreview.length;

  return (
    <section
      ref={trackRef}
      id="all-products"
      className="relative"
      style={{ height: `calc(100svh + ${totalCards * SCROLL_PER_PRODUCT_VH}vh)` }}
      aria-labelledby="showcase-heading"
    >
      <div
        className="sticky top-[var(--nav-height)] flex h-[calc(100svh-var(--nav-height))] w-full flex-col overflow-hidden transition-colors duration-700"
        style={{ backgroundColor: `color-mix(in srgb, var(--color-brand-${activeProduct.accent}) 18%, var(--color-paper))` }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_30%_50%,rgba(255,255,255,0.8),transparent_70%)]" />
        <p
          className="text-outline pointer-events-none absolute -right-4 bottom-0 font-display text-[9rem] font-black leading-none opacity-25 sm:text-[16rem] lg:text-[22rem]"
          aria-hidden="true"
        >
          {formatNumber(activeIndex + 1)}
        </p>

        {/* category rail */}
        <nav className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-4 sm:px-10 sm:pt-6" aria-label="Product families">
          <ul className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {productCategories.map((category, categoryIndex) => {
              const isActiveCategory = categoryIndex === activeItem.categoryIndex;
              return (
                <li key={category.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => jumpToCategory(categoryIndex)}
                    aria-current={isActiveCategory}
                    className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
                      isActiveCategory ? 'border-ink bg-ink text-white shadow-lg' : 'border-ink/15 bg-white/60 text-ink/70 hover:border-ink/40'
                    }`}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: `var(--color-brand-${category.accent})` }}
                      aria-hidden="true"
                    />
                    {category.name.split(',')[0]}
                    <span className={isActiveCategory ? 'text-white/70' : 'text-ink/60'}>{category.productSlugs.length}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-4 px-5 sm:px-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 max-w-md lg:order-none lg:col-start-2 lg:row-start-1">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">The full range</p>
            <h2 id="showcase-heading" className="mt-2 font-display text-2xl font-bold leading-tight text-ink sm:text-4xl lg:mt-3 lg:text-5xl">
              {totalCards} products. One studio.
            </h2>

            <div className="mt-4 rounded-3xl bg-white/85 p-4 shadow-xl backdrop-blur-md sm:mt-6 sm:p-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct.slug}
                  initial={isMotionAllowed ? { opacity: 0, y: 16 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  exit={isMotionAllowed ? { opacity: 0, y: -12 } : undefined}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-muted">
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: `var(--color-brand-${activeCategory.accent})` }}
                        aria-hidden="true"
                      />
                      {activeCategory.name}
                    </span>
                    <span>
                      {formatNumber(activeIndex + 1)} / {formatNumber(totalCards)}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-xl font-bold text-ink sm:text-3xl">{activeProduct.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{activeProduct.tagline}</p>
                  <ul className="mt-3 hidden flex-wrap gap-1.5 sm:flex" aria-label={`${activeProduct.name} types`}>
                    {typePreview.map((typeName) => (
                      <li key={typeName} className="rounded-full border border-ink/15 px-2.5 py-1 text-xs font-medium text-ink/75">
                        {typeName}
                      </li>
                    ))}
                    {hiddenTypeCount > 0 && (
                      <li className="rounded-full bg-ink/5 px-2.5 py-1 text-xs font-medium text-ink/65">+{hiddenTypeCount} more</li>
                    )}
                  </ul>
                  <Link
                    href={`/services/${activeProduct.slug}`}
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                  >
                    View {activeProduct.name} <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </AnimatePresence>
              <div className="mt-4 flex gap-0.5" aria-hidden="true">
                {items.map((item, index) => (
                  <span
                    key={item.product.slug}
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${index <= activeIndex ? 'bg-ink' : 'bg-ink/15'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 [perspective:1200px] lg:order-none lg:col-start-1 lg:row-start-1">
            <div
              ref={deckRef}
              onPointerMove={handleDeckPointerMove}
              onPointerLeave={resetDeckPointer}
              className="relative mx-auto aspect-square w-[min(56vw,14.5rem)] transition-transform duration-300 ease-out sm:w-[20rem] lg:w-[min(28rem,60vh)] [transform:rotateX(var(--deck-tilt-x,0deg))_rotateY(var(--deck-tilt-y,0deg))]"
            >
              {items.map((item, index) => (
                <DeckCard
                  key={item.product.slug}
                  item={item}
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
      </div>
    </section>
  );
}
