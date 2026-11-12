'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bike, Bus, Car, Check, Copy, Hand, MapPin, MessageCircle, Navigation, Phone, type LucideIcon } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';
import { useBusinessStatus } from '@/lib/useBusinessStatus';
import { buildWhatsAppLink, siteConfig } from '@/data/siteConfig';

interface TravelMode {
  id: string;
  label: string;
  icon: LucideIcon;
  /** value for Google Maps' `travelmode` parameter */
  param: string;
}

const travelModes: TravelMode[] = [
  { id: 'drive', label: 'Drive', icon: Car, param: 'driving' },
  { id: 'two-wheeler', label: 'Bike', icon: Bike, param: 'two-wheeler' },
  { id: 'transit', label: 'Bus', icon: Bus, param: 'transit' },
];

/** How long the "Copied" confirmation stays visible. */
const COPIED_FEEDBACK_MS = 2000;

/**
 * The press on the map, dressed up: the Google map sits in the brand's greyscale until you wake it up (so a thumb
 * scrolling the page never gets trapped inside it), a floating "address ticket" holds the details, and the next step
 * — directions by drive / bike / bus, call, WhatsApp, copy address — is one tap away.
 */
export default function ContactMapCard() {
  const status = useBusinessStatus();
  const [isMapActive, setIsMapActive] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const copiedTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(copiedTimer.current), []);

  const fullAddress = siteConfig.addressLines.join(' ');

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(fullAddress);
      setHasCopied(true);
      window.clearTimeout(copiedTimer.current);
      copiedTimer.current = window.setTimeout(() => setHasCopied(false), COPIED_FEEDBACK_MS);
    } catch (error) {
      console.error('Could not copy the address', error);
    }
  };

  return (
    <Reveal>
      <div className="group relative overflow-hidden rounded-[2rem] bg-ink p-2 shadow-2xl ring-1 ring-ink/10 sm:p-3">
        <span className="cmyk-strip absolute inset-x-0 top-0 z-30 h-1.5" aria-hidden="true" />

        {/* the map */}
        <div
          className="relative h-80 overflow-hidden rounded-[1.5rem] bg-paper-deep sm:h-[32rem]"
          onMouseLeave={() => setIsMapActive(false)}
        >
          <iframe
            src={siteConfig.mapsEmbedUrl}
            className={`h-full w-full border-0 transition-[filter] duration-700 sm:absolute sm:inset-y-0 sm:left-[-2%] sm:w-[140%] ${
              isMapActive ? '' : '[filter:grayscale(1)_contrast(1.08)_brightness(0.96)] group-hover:[filter:grayscale(0.35)_contrast(1.05)]'
            }`}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Design N Print location on Google Maps"
          />

          {/* wakes the map; keeps page scrolling smooth until then */}
          <AnimatePresence>
            {!isMapActive && (
              <motion.button
                type="button"
                onClick={() => setIsMapActive(true)}
                aria-label="Tap to explore the map"
                className="absolute inset-0 z-10 flex cursor-pointer items-end justify-center pb-16 sm:justify-end sm:pb-5 sm:pr-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-ink/85 px-4 py-2.5 text-xs font-semibold text-white shadow-xl backdrop-blur transition-transform group-hover:scale-105">
                  <Hand className="h-4 w-4 text-brand-yellow" /> Tap to explore the map
                </span>
              </motion.button>
            )}
          </AnimatePresence>
          {isMapActive && (
            <button
              type="button"
              onClick={() => setIsMapActive(false)}
              className="absolute bottom-16 right-5 z-10 rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink shadow-xl transition-transform active:scale-95 sm:hidden"
            >
              Done
            </button>
          )}
        </div>

        {/* address ticket — floats over the map on desktop, overlaps its edge on phones */}
        <motion.div
          className="relative z-20 -mt-12 mx-2 rounded-2xl bg-white p-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] sm:absolute sm:left-7 sm:top-7 sm:mx-0 sm:mt-0 sm:w-80 sm:p-5"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-start gap-3">
            <span className="relative mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-brand-yellow">
              <span className="absolute inset-0 animate-pulse bg-white/30" aria-hidden="true" />
              <MapPin className="relative h-5 w-5 text-ink" />
            </span>
            <div className="min-w-0">
              <p className="font-display text-lg font-bold leading-tight text-ink">Design N Prints</p>
              <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-ink/70" role="status">
                <span className={`h-2 w-2 shrink-0 rounded-full ${status?.isOpen ? 'bg-whatsapp' : 'bg-ink/30'}`} aria-hidden="true" />
                {status ? status.statusText : 'Checking hours…'}
              </p>
            </div>
          </div>

          <address className="mt-3 text-sm not-italic leading-relaxed text-ink/70">
            {siteConfig.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>

          <a
            href={siteConfig.mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            <Navigation className="h-4 w-4" /> Get directions
          </a>

          <ul className="mt-2 grid grid-cols-3 gap-2" aria-label="Directions by travel mode">
            {travelModes.map((mode) => (
              <li key={mode.id}>
                <a
                  href={`${siteConfig.mapsDirectionsUrl}&travelmode=${mode.param}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-full border border-ink/15 px-2 py-2 text-xs font-semibold text-ink transition-all hover:border-ink hover:bg-paper active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                >
                  <mode.icon className="h-3.5 w-3.5" /> {mode.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-3 flex items-center justify-between gap-2 border-t border-dashed border-ink/20 pt-3">
            <div className="flex items-center gap-2">
              <a
                href={`tel:+${siteConfig.whatsappNumber}`}
                aria-label="Call Design N Print"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-paper text-ink transition-all hover:-translate-y-0.5 hover:bg-ink hover:text-white active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href={buildWhatsAppLink('Hi Design N Print, I am on my way to your press.')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message Design N Print on WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-whatsapp text-ink transition-all hover:-translate-y-0.5 active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
            <button
              type="button"
              onClick={handleCopyAddress}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-ink transition-colors hover:bg-paper active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              aria-live="polite"
            >
              {hasCopied ? <Check className="h-3.5 w-3.5 text-whatsapp" /> : <Copy className="h-3.5 w-3.5" />}
              {hasCopied ? 'Address copied' : 'Copy address'}
            </button>
          </div>
        </motion.div>
      </div>
    </Reveal>
  );
}
