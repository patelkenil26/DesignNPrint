'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { showcaseProducts } from '@/data/homeData';
import { useScrollTrack } from '@/lib/useScrollTrack';

const ProductRingScene = dynamic(() => import('@/components/three/ProductRingScene'), { ssr: false });

export default function ProductShowcase() {
  const { trackRef, stickyRef, getProgress } = useScrollTrack();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = showcaseProducts[activeIndex] ?? showcaseProducts[0];

  return (
    <section ref={trackRef} className="relative h-[900vh]" aria-labelledby="showcase-heading">
      <div
        ref={stickyRef}
        className="sticky top-[var(--nav-height)] h-[calc(100svh-var(--nav-height))] w-full overflow-hidden transition-colors duration-700"
        style={{ backgroundColor: `color-mix(in srgb, var(--color-brand-${activeProduct.accent}) 20%, var(--color-paper))` }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_60%_45%,rgba(255,255,255,0.75),transparent_70%)]" />

        <ProductRingScene products={showcaseProducts} getProgress={getProgress} onActiveChange={setActiveIndex} />

        <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-between px-5 py-8 sm:px-10 lg:justify-center lg:py-0">
          <div className="max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">What we print</p>
            <h2 id="showcase-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-5xl">
              Everything your brand needs on paper.
            </h2>
          </div>

          <div className="pointer-events-auto max-w-md rounded-3xl bg-white/80 p-5 shadow-xl backdrop-blur-md lg:mt-10">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-muted">
              <span>{activeProduct.category}</span>
              <span>
                {String(activeIndex + 1).padStart(2, '0')} / {String(showcaseProducts.length).padStart(2, '0')}
              </span>
            </div>
            <h3 className="mt-2 font-display text-xl font-bold text-ink sm:text-2xl">{activeProduct.name}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{activeProduct.blurb}</p>
            <Link
              href={activeProduct.href}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
            >
              View service <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
