'use client';

import { MessageCircle, Phone } from 'lucide-react';
import LinkButton from '@/components/shared/LinkButton';
import { buildWhatsAppLink, siteConfig } from '@/data/siteConfig';
import { useBusinessStatus } from '@/lib/useBusinessStatus';

/**
 * Thumb-reach actions for phones, right under the headline: the lowest-effort ways to reach us come first, before
 * anyone has to read or scroll. Shows the live open / closed state so the visitor knows what to expect.
 */
export default function ContactQuickActions() {
  const status = useBusinessStatus();

  return (
    <div className="mt-7 lg:hidden">
      <p
        className="mb-3 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-ink/80 backdrop-blur"
        role="status"
      >
        <span className="relative flex h-2 w-2" aria-hidden="true">
          {status?.isOpen && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-whatsapp opacity-70" />}
          <span className={`relative inline-flex h-2 w-2 rounded-full ${status?.isOpen ? 'bg-whatsapp' : 'bg-ink/30'}`} />
        </span>
        {status ? status.statusText : 'Checking the desk…'}
      </p>
      <div className="flex flex-col gap-3 min-[420px]:flex-row">
        <LinkButton
          href={buildWhatsAppLink('Hi Design N Print, I would like a quote.')}
          isExternal
          variant="whatsapp"
          className="animate-ring-pulse flex-1"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp us
        </LinkButton>
        <LinkButton href={`tel:+${siteConfig.whatsappNumber}`} variant="outline" className="flex-1">
          <Phone className="h-4 w-4" /> Call now
        </LinkButton>
      </div>
    </div>
  );
}
