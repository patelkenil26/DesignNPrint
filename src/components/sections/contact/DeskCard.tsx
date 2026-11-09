'use client';

import { MessageCircle, Phone } from 'lucide-react';
import LinkButton from '@/components/shared/LinkButton';
import { buildWhatsAppLink, siteConfig } from '@/data/siteConfig';
import { useBusinessStatus } from '@/lib/useBusinessStatus';

/** "The desk" — live Ahmedabad time, whether the press is open, and the two fastest ways to reach us. */
export default function DeskCard() {
  const status = useBusinessStatus();

  return (
    <div className="animate-float-slow relative mx-auto w-full max-w-md">
      <div className="absolute -inset-3 -z-10 rounded-[2.2rem] bg-gradient-to-br from-brand-yellow/40 via-brand-red/20 to-brand-blue/30 blur-2xl" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-[2rem] bg-ink p-7 text-white shadow-2xl sm:p-8">
        <span className="cmyk-strip absolute inset-x-0 top-0 h-1.5" aria-hidden="true" />

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/50">The desk · {siteConfig.location}</p>
            <p className="mt-3 font-display text-5xl font-bold tabular-nums leading-none sm:text-6xl" aria-live="off">
              {status ? status.clockText : '— : —'}
            </p>
          </div>
          <span className="relative mt-1 flex h-3.5 w-3.5 shrink-0" aria-hidden="true">
            {status?.isOpen && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-whatsapp opacity-70" />}
            <span
              className={`relative inline-flex h-3.5 w-3.5 rounded-full ${status?.isOpen ? 'bg-whatsapp' : 'bg-white/30'}`}
            />
          </span>
        </div>

        <p className="mt-4 min-h-6 text-sm font-medium text-white/80" role="status">
          {status ? status.statusText : 'Checking the desk…'}
        </p>

        <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-5">
          <div>
            <dt className="text-xs text-white/50">We reply</dt>
            <dd className="font-display text-lg font-bold">Same day</dd>
          </div>
          <div>
            <dt className="text-xs text-white/50">Express dispatch</dt>
            <dd className="font-display text-lg font-bold">{siteConfig.expressDispatch}</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap gap-3">
          <LinkButton href={buildWhatsAppLink('Hi Design N Print, I would like a quote.')} isExternal variant="whatsapp">
            <MessageCircle className="h-4 w-4" /> WhatsApp us
          </LinkButton>
          <a
            href={`tel:+${siteConfig.whatsappNumber}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-ink active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            <Phone className="h-4 w-4" /> Call now
          </a>
        </div>
      </div>
    </div>
  );
}
