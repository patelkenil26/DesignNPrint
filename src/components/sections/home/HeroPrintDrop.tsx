'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { ArrowRight, ChevronDown, MessageCircle } from 'lucide-react';
import LinkButton from '@/components/shared/LinkButton';
import RegisteredImage from '@/components/shared/RegisteredImage';
import WordRise from '@/components/shared/WordRise';
import { heroCopy, heroProofs, showcaseProducts, type HeroProofLayout } from '@/data/homeData';
import { productCatalog } from '@/data/productCatalog';
import { buildWhatsAppLink, getYearsInBusiness, siteConfig } from '@/data/siteConfig';

interface HeroProofProps {
  layout: HeroProofLayout;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  isMotionAllowed: boolean;
}

/** One printed proof: drops in, snaps into register, then floats and leans toward the pointer. */
function HeroProof({ layout, pointerX, pointerY, isMotionAllowed }: HeroProofProps) {
  const [isRegistered, setIsRegistered] = useState(!isMotionAllowed);
  const product = showcaseProducts.find((item) => item.id === layout.productId);
  const offsetX = useTransform(pointerX, (value) => value * layout.depth);
  const offsetY = useTransform(pointerY, (value) => value * layout.depth);

  useEffect(() => {
    if (!isMotionAllowed) return;
    const registerTimer = window.setTimeout(() => setIsRegistered(true), (layout.delay + 0.9) * 1000);
    return () => window.clearTimeout(registerTimer);
  }, [isMotionAllowed, layout.delay]);

  if (!product) return null;

  return (
    <motion.div className={`absolute ${layout.className}`} style={{ x: offsetX, y: offsetY }}>
      <motion.div
        initial={isMotionAllowed ? { opacity: 0, y: 70, scale: 0.9, rotate: layout.rotate * 3 } : false}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: layout.rotate }}
        transition={{ duration: 1, delay: layout.delay, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="animate-float-slow" style={{ animationDelay: `${layout.delay * 2}s` }}>
          <div className="aspect-[4/5]">
            <RegisteredImage
              src={product.image}
              alt={product.name}
              sizes="(min-width: 1024px) 22vw, 45vw"
              isRegistered={isRegistered}
              priority={layout.delay < 0.5}
            />
          </div>
          <p className="mt-2 inline-block rounded-full bg-ink px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
            {product.category}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Home hero — product proofs "print in" as three ink plates snap into register, with pointer parallax. */
export default function HeroPrintDrop() {
  const prefersReducedMotion = useReducedMotion();
  const isMotionAllowed = !prefersReducedMotion;
  const rawPointerX = useMotionValue(0);
  const rawPointerY = useMotionValue(0);
  const pointerX = useSpring(rawPointerX, { stiffness: 70, damping: 18 });
  const pointerY = useSpring(rawPointerY, { stiffness: 70, damping: 18 });

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!isMotionAllowed) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    rawPointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    rawPointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  return (
    <section
      className="bg-studio relative overflow-hidden"
      aria-label="Design N Print — printing and packaging in Ahmedabad"
      onPointerMove={handlePointerMove}
    >
      {/* registration target slowly turning behind everything */}
      <svg
        viewBox="0 0 200 200"
        className="animate-spin-slow pointer-events-none absolute -right-24 top-10 h-[28rem] w-[28rem] text-ink/10 sm:h-[40rem] sm:w-[40rem]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        aria-hidden="true"
      >
        <circle cx="100" cy="100" r="60" />
        <circle cx="100" cy="100" r="36" />
        <path d="M100 6v188M6 100h188" />
      </svg>

      <div className="relative mx-auto grid min-h-[calc(100svh-var(--nav-height))] max-w-7xl items-center gap-6 px-5 pb-16 pt-6 sm:px-10 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:py-12">
        <div className="relative z-10 max-w-xl">
          <p className="mb-4 hidden items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink backdrop-blur sm:inline-flex">
            <span className="cmyk-strip h-2 w-8 rounded-full" />
            Since {siteConfig.foundedYear} · {siteConfig.location}
          </p>
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            <WordRise text={heroCopy.title} delay={0.1} />
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink/70 sm:text-lg">{heroCopy.body}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <LinkButton href={buildWhatsAppLink('Hi Design N Print, I would like a quote.')} isExternal variant="whatsapp">
              <MessageCircle className="h-4 w-4" /> Get a Quote on WhatsApp
            </LinkButton>
            <LinkButton href="/services" variant="outline">
              Explore Services <ArrowRight className="h-4 w-4" />
            </LinkButton>
          </div>

          <dl className="mt-8 hidden max-w-md grid-cols-3 sm:grid gap-4 border-t border-ink/10 pt-5">
            <div>
              <dt className="text-xs text-muted">In business</dt>
              <dd className="font-display text-2xl font-bold text-ink">{getYearsInBusiness()}+ yrs</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Products</dt>
              <dd className="font-display text-2xl font-bold text-ink">{productCatalog.length}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Express dispatch</dt>
              <dd className="font-display text-2xl font-bold text-ink">{siteConfig.expressDispatch}</dd>
            </div>
          </dl>
          <Link
            href="/services"
            className="mt-5 hidden items-center gap-2 text-sm font-semibold text-ink underline-offset-4 hover:underline sm:inline-flex"
          >
            See what we can print <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative h-[27rem] w-full sm:h-[34rem] lg:h-[38rem]">
          {heroProofs.map((layout) => (
            <HeroProof
              key={layout.productId}
              layout={layout}
              pointerX={pointerX}
              pointerY={pointerY}
              isMotionAllowed={isMotionAllowed}
            />
          ))}
        </div>
      </div>

      <span className="cmyk-strip absolute inset-x-0 bottom-0 h-1.5" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-muted lg:flex">
        Scroll
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  );
}
