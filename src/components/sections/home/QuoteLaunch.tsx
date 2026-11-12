'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, Mail, MessageCircle, Phone } from 'lucide-react';
import SlideToConfirm from '@/components/shared/SlideToConfirm';
import { quoteCollage, quoteProducts } from '@/data/homeData';
import { buildWhatsAppLink, siteConfig } from '@/data/siteConfig';

/** Lets the knob finish its slide before the WhatsApp tab opens. */
const OPEN_DELAY_MS = 450;

/**
 * Closing call-to-action: pick what you need, then slide to send. The slide opens WhatsApp with a message that
 * already lists the chosen products. A plain link sits underneath for anyone who prefers tapping.
 */
export default function QuoteLaunch() {
  const isMotionAllowed = !useReducedMotion();
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const openTimer = useRef<number | undefined>(undefined);

  const toggleProduct = (label: string) =>
    setSelectedLabels((current) => (current.includes(label) ? current.filter((item) => item !== label) : [...current, label]));

  const quoteMessage =
    selectedLabels.length > 0
      ? `Hi Design N Print, I need a quote for: ${selectedLabels.join(', ')}.`
      : 'Hi Design N Print, I would like a quote.';
  const quoteLink = buildWhatsAppLink(quoteMessage);

  const handleSlideConfirm = () => {
    window.clearTimeout(openTimer.current);
    openTimer.current = window.setTimeout(() => window.open(quoteLink, '_blank', 'noopener,noreferrer'), OPEN_DELAY_MS);
  };
  useEffect(() => () => window.clearTimeout(openTimer.current), []);

  return (
    <section className="bg-studio-dark relative overflow-hidden text-white" aria-labelledby="quote-heading">
      <span className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-whatsapp/15 blur-[120px]" aria-hidden="true" />
      <span className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-brand-blue/15 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:py-28">
        {/* printed pieces fanning out — on top on phones, beside the copy on desktop */}
        <div className="relative mx-auto h-60 w-full max-w-sm sm:h-72 lg:order-2 lg:h-[28rem] lg:max-w-lg">
          {quoteCollage.map((piece, index) => (
            <motion.div
              key={piece.image}
              className={`absolute ${piece.className}`}
              initial={isMotionAllowed ? { opacity: 0, y: 60, rotate: piece.rotate * 3 } : false}
              whileInView={{ opacity: 1, y: 0, rotate: piece.rotate }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="animate-float-slow" style={{ animationDelay: `${index * 1.4}s` }}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-4 border-white shadow-2xl">
                  <Image src={piece.image} alt={piece.alt} fill sizes="(min-width: 1024px) 18rem, 48vw" className="object-cover" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:order-1">
          <span className="cmyk-strip block h-1.5 w-20 rounded-full" />
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3.5 py-1.5 text-xs font-semibold text-white/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-whatsapp opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-whatsapp" />
            </span>
            We reply the same day
          </p>
          <h2 id="quote-heading" className="mt-4 font-display text-4xl font-bold leading-[1.05] sm:text-6xl">
            Got an idea?
            <br />
            <span className="text-brand-yellow">Let’s put it on paper.</span>
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">Tap what you need, then slide to send. We’ll take it from there.</p>

          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Choose the products you need">
            {quoteProducts.map((product) => {
              const isSelected = selectedLabels.includes(product.label);
              return (
                <li key={product.label}>
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => toggleProduct(product.label)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow ${
                      isSelected ? 'border-brand-yellow bg-brand-yellow text-ink' : 'border-white/20 bg-white/[0.05] text-white/85 hover:border-white/50'
                    }`}
                  >
                    <AnimatePresence initial={false}>
                      {isSelected && (
                        <motion.span initial={{ width: 0, opacity: 0 }} animate={{ width: 14, opacity: 1 }} exit={{ width: 0, opacity: 0 }} className="overflow-hidden">
                          <Check className="h-3.5 w-3.5" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {product.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <p className="mt-5 rounded-2xl border border-dashed border-white/20 bg-black/20 px-4 py-3 font-mono text-xs leading-relaxed text-white/70" aria-live="polite">
            <span className="text-whatsapp">&gt;</span> {quoteMessage}
          </p>

          <SlideToConfirm label="Slide to send on WhatsApp" doneLabel="Opening WhatsApp…" onConfirm={handleSlideConfirm} className="mt-5 max-w-md" />

          <a
            href={quoteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            <MessageCircle className="h-4 w-4" /> Or just tap to open WhatsApp
          </a>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-5">
            <a href={`tel:+${siteConfig.whatsappNumber}`} className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white">
              <Phone className="h-4 w-4" /> {siteConfig.phoneDisplay}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white">
              <Mail className="h-4 w-4" /> {siteConfig.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
