'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, CheckCheck, Mail, MessageCircle, Phone, Receipt, Send } from 'lucide-react';
import SafeImage from '@/components/shared/SafeImage';
import { quoteProducts } from '@/data/homeData';
import { buildWhatsAppLink, siteConfig } from '@/data/siteConfig';

/** How long the "typing…" dots show after the selection changes. */
const TYPING_DELAY_MS = 650;

/**
 * Quote section as a live WhatsApp preview: pick products on the left and the message writes itself in the phone
 * on the right — the send button opens WhatsApp with exactly that text.
 */
export default function QuoteCta() {
  const prefersReducedMotion = useReducedMotion();
  const isMotionAllowed = !prefersReducedMotion;
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimer = useRef<number | undefined>(undefined);

  const toggleProduct = (label: string) => {
    setSelectedLabels((current) => (current.includes(label) ? current.filter((item) => item !== label) : [...current, label]));
    setIsTyping(true);
    window.clearTimeout(typingTimer.current);
    typingTimer.current = window.setTimeout(() => setIsTyping(false), TYPING_DELAY_MS);
  };

  useEffect(() => () => window.clearTimeout(typingTimer.current), []);

  const hasSelection = selectedLabels.length > 0;
  const quoteMessage = hasSelection
    ? `Hi Design N Print, I need a quote for: ${selectedLabels.join(', ')}.`
    : 'Hi Design N Print, I would like a quote.';

  return (
    <section className="bg-studio-dark relative overflow-hidden text-white" aria-labelledby="quote-heading">
      <svg
        viewBox="0 0 200 200"
        className="animate-spin-slow pointer-events-none absolute -left-40 top-1/2 h-[40rem] w-[40rem] -translate-y-1/2 text-white/[0.05]"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        aria-hidden="true"
      >
        <circle cx="100" cy="100" r="70" />
        <circle cx="100" cy="100" r="42" />
        <path d="M100 4v192M4 100h192" />
      </svg>
      <span className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-whatsapp/15 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-28">
        <div>
          <span className="cmyk-strip block h-1.5 w-20 rounded-full" />
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3.5 py-1.5 text-xs font-semibold text-white/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-whatsapp opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-whatsapp" />
            </span>
            We reply the same day
          </p>
          <h2 id="quote-heading" className="mt-4 font-display text-3xl font-bold leading-tight sm:text-5xl">
            Ready to print something remarkable?
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
            Pick what you need. Your message writes itself — one tap and it opens on WhatsApp, ready to send.
          </p>

          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Choose the products you need">
            {quoteProducts.map((product, index) => {
              const isSelected = selectedLabels.includes(product.label);
              return (
                <motion.li
                  key={product.label}
                  initial={isMotionAllowed ? { opacity: 0, y: 24 } : false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => toggleProduct(product.label)}
                    className={`group relative block w-full overflow-hidden rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow ${
                      isSelected ? 'border-brand-yellow shadow-[0_0_0_1px_var(--color-brand-yellow)]' : 'border-white/10 hover:border-white/40'
                    }`}
                  >
                    <span className="relative block aspect-[4/3] overflow-hidden bg-white/[0.06]">
                      {product.image ? (
                        <SafeImage
                          src={product.image}
                          alt=""
                          fill
                          sizes="(min-width: 640px) 12vw, 45vw"
                          className={`object-cover transition-all duration-500 group-hover:scale-110 ${isSelected ? '' : 'saturate-[0.6] brightness-75'}`}
                        />
                      ) : (
                        <span className="flex h-full items-center justify-center text-white/50">
                          <Receipt className="h-8 w-8" />
                        </span>
                      )}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.span
                            className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-yellow text-ink shadow-lg"
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                          >
                            <Check className="h-3.5 w-3.5" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                    <span className={`block px-2.5 py-2 text-xs font-semibold leading-tight transition-colors ${isSelected ? 'bg-brand-yellow text-ink' : 'bg-white/[0.04] text-white/80'}`}>
                      {product.label}
                    </span>
                  </button>
                </motion.li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
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

        {/* live WhatsApp preview */}
        <motion.div
          className="mx-auto w-full max-w-[19rem] sm:max-w-[21rem]"
          initial={isMotionAllowed ? { opacity: 0, y: 60, rotate: 4 } : false}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="animate-float-slow relative rounded-[2.6rem] border border-white/15 bg-ink-soft p-2.5 shadow-[0_40px_90px_-20px_color-mix(in_srgb,black_80%,transparent)]">
            <span className="absolute left-1/2 top-4 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-ink" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2.1rem] bg-[color-mix(in_srgb,var(--color-ink)_92%,var(--color-whatsapp))]">
              {/* chat header */}
              <div className="flex items-center gap-3 bg-[color-mix(in_srgb,var(--color-whatsapp)_28%,var(--color-ink))] px-4 pb-3 pt-9">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white font-display text-[11px] font-black text-ink">DNP</span>
                <span>
                  <span className="block text-sm font-semibold leading-tight">{siteConfig.name}</span>
                  <span className="block text-[11px] text-white/65">online · replies same day</span>
                </span>
              </div>

              {/* conversation */}
              <div className="min-h-[19rem] space-y-2.5 px-3 py-4 sm:min-h-[21rem]" aria-live="polite">
                <motion.p
                  className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/10 px-3.5 py-2 text-[13px] leading-snug text-white/90"
                  initial={isMotionAllowed ? { opacity: 0, y: 10 } : false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  Namaste! 👋 What would you like us to print today?
                </motion.p>

                <div className="flex justify-end">
                  <AnimatePresence mode="wait">
                    {isTyping ? (
                      <motion.span
                        key="typing"
                        className="flex gap-1 rounded-2xl rounded-tr-sm bg-whatsapp/80 px-4 py-3"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        aria-label="Writing your message"
                      >
                        {[0, 1, 2].map((dot) => (
                          <span key={dot} className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/70" style={{ animationDelay: `${dot * 0.15}s` }} />
                        ))}
                      </motion.span>
                    ) : (
                      <motion.div
                        key={quoteMessage}
                        className="max-w-[88%] rounded-2xl rounded-tr-sm bg-whatsapp px-3.5 py-2.5 text-[13px] leading-snug text-ink shadow-lg"
                        initial={{ opacity: 0, scale: 0.85, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                      >
                        {hasSelection ? (
                          <>
                            Hi Design N Print, I need a quote for:
                            <span className="mt-1.5 flex flex-wrap gap-1">
                              {selectedLabels.map((label) => (
                                <span key={label} className="rounded-full bg-ink/15 px-2 py-0.5 text-[11px] font-semibold">
                                  {label}
                                </span>
                              ))}
                            </span>
                          </>
                        ) : (
                          quoteMessage
                        )}
                        <span className="mt-1 flex items-center justify-end gap-1 text-[10px] font-medium text-ink/60">
                          now <CheckCheck className="h-3 w-3" />
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* input bar = the real send button */}
              <div className="flex items-center gap-2 bg-ink/60 px-3 pb-4 pt-2">
                <span className="flex-1 truncate rounded-full bg-white/10 px-4 py-2.5 text-xs text-white/50">
                  {hasSelection ? `${selectedLabels.length} selected` : 'Type a message'}
                </span>
                <a
                  href={buildWhatsAppLink(quoteMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Send this quote request on WhatsApp"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-whatsapp text-ink shadow-lg transition-all hover:scale-110 active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
                >
                  <Send className="h-[18px] w-[18px]" />
                </a>
              </div>
            </div>
          </div>

          <a
            href={buildWhatsAppLink(quoteMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
          >
            <MessageCircle className="h-4 w-4" /> Get my quote on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
