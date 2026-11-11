'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import LinkButton from '@/components/shared/LinkButton';
import { quoteCubeFaces, quoteProductChips } from '@/data/homeData';
import { buildWhatsAppLink, siteConfig } from '@/data/siteConfig';

/** Faces of the CSS cube: four sides carry product photos, top and bottom stay plain. */
const cubeFaceTransforms = [
  'rotateY(0deg)',
  'rotateY(90deg)',
  'rotateY(180deg)',
  'rotateY(270deg)',
] as const;

/** A lightweight CSS-only cube (no WebGL) that slowly turns, showing the products people ask a quote for. */
function ProductCube() {
  return (
    <div
      className="relative mx-auto flex h-[18rem] items-center justify-center [--cube:11rem] [perspective:1100px] sm:h-[26rem] sm:[--cube:16rem] lg:h-[30rem] lg:[--cube:18rem]"
      role="img"
      aria-label="A turning cube showing printed packaging, stationery, labels and brochures"
    >
      <span className="absolute -inset-6 rounded-full bg-brand-yellow/15 blur-3xl" aria-hidden="true" />
      <div className="animate-cube-spin relative h-[var(--cube)] w-[var(--cube)] [transform-style:preserve-3d]">
        {quoteCubeFaces.map((face, index) => (
          <div
            key={face.image}
            className="absolute inset-0 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-xl [backface-visibility:hidden]"
            style={{ transform: `${cubeFaceTransforms[index]} translateZ(calc(var(--cube) / 2))` }}
          >
            <Image src={face.image} alt="" fill sizes="18rem" className="object-cover" />
            <span className="absolute inset-x-0 bottom-0 bg-ink/70 px-3 py-1.5 text-center text-[11px] font-semibold uppercase tracking-widest text-white">
              {face.label}
            </span>
          </div>
        ))}
      </div>
      {/* shadow on the "floor" */}
      <span className="absolute bottom-2 h-5 w-[calc(var(--cube)*0.8)] rounded-full bg-black/40 blur-xl sm:bottom-6" aria-hidden="true" />
    </div>
  );
}

export default function QuoteCta() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const toggleProduct = (product: string) => {
    setSelectedProducts((current) =>
      current.includes(product) ? current.filter((item) => item !== product) : [...current, product],
    );
  };

  const quoteMessage =
    selectedProducts.length > 0
      ? `Hi Design N Print, I need a quote for: ${selectedProducts.join(', ')}.`
      : 'Hi Design N Print, I would like a quote.';

  return (
    <section className="bg-studio-dark relative overflow-hidden text-white" aria-labelledby="quote-heading">
      <div className="mx-auto grid max-w-7xl items-center gap-6 px-5 py-20 sm:px-10 lg:min-h-[40rem] lg:grid-cols-2 lg:py-28">
        <div>
          <span className="cmyk-strip block h-1.5 w-20 rounded-full" />
          <h2 id="quote-heading" className="mt-5 font-display text-3xl font-bold leading-tight sm:text-5xl">
            Ready to print something remarkable?
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
            Tell us what you need — pick a product and we&apos;ll open WhatsApp with your request ready to send.
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5" role="group" aria-label="Choose the products you need">
            {quoteProductChips.map((product) => {
              const isSelected = selectedProducts.includes(product);
              return (
                <button
                  key={product}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => toggleProduct(product)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
                    isSelected
                      ? 'border-brand-yellow bg-brand-yellow text-ink'
                      : 'border-white/20 text-white/80 hover:border-white/50'
                  }`}
                >
                  {product}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <LinkButton href={buildWhatsAppLink(quoteMessage)} isExternal variant="whatsapp">
              <MessageCircle className="h-4 w-4" /> Get my quote on WhatsApp
            </LinkButton>
            <a
              href={`tel:+${siteConfig.whatsappNumber}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4" /> {siteConfig.phoneDisplay}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4" /> {siteConfig.email}
            </a>
          </div>
        </div>

        <ProductCube />
      </div>
    </section>
  );
}
