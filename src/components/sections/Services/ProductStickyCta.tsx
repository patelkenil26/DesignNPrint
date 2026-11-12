'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';
import { buildWhatsAppLink, siteConfig } from '@/data/siteConfig';

/** How far (px) the visitor must scroll before the bar shows — past the hero's own quote button. */
const SHOW_AFTER_SCROLL_PX = 520;

interface ProductStickyCtaProps {
  productName: string;
}

/**
 * Phones only: once the hero's buttons have scrolled away, a slim bar keeps "Get a quote" under the thumb for the
 * rest of the page, and tucks away again when the footer arrives. The right edge is left free for the
 * scroll-to-top button.
 */
export default function ProductStickyCta({ productName }: ProductStickyCtaProps) {
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHasScrolledPastHero(window.scrollY > SHOW_AFTER_SCROLL_PX);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => setIsFooterVisible(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const isVisible = hasScrolledPastHero && !isFooterVisible;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-3 left-3 right-[4.75rem] z-40 flex items-center gap-2 rounded-full bg-ink p-1.5 pl-4 text-white shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)] lg:hidden"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        >
          <p className="min-w-0 flex-1 truncate text-xs font-semibold text-white/80">{productName}</p>
          <a
            href={`tel:+${siteConfig.whatsappNumber}`}
            aria-label="Call Design N Print"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 transition-all active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
          >
            <Phone className="h-4 w-4" />
          </a>
          <a
            href={buildWhatsAppLink(`Hi Design N Print, I would like a quote for ${productName}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-whatsapp px-4 text-xs font-bold text-ink transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <MessageCircle className="h-4 w-4" /> Get a quote
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
