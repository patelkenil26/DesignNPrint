'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import LinkButton from '@/components/shared/LinkButton';
import { quoteProductChips } from '@/data/homeData';
import { buildWhatsAppLink, siteConfig } from '@/data/siteConfig';

const CtaBoxScene = dynamic(() => import('@/components/three/CtaBoxScene'), { ssr: false });

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

        <div className="relative h-[20rem] sm:h-[28rem] lg:h-[32rem]">
          <CtaBoxScene />
        </div>
      </div>
    </section>
  );
}
