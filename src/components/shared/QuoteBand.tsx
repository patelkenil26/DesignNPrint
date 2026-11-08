import { MessageCircle, Phone } from 'lucide-react';
import LinkButton from '@/components/shared/LinkButton';
import Reveal from '@/components/shared/Reveal';
import { buildWhatsAppLink, siteConfig } from '@/data/siteConfig';

interface QuoteBandProps {
  title?: string;
  description?: string;
  /** what the visitor is asking about — pre-fills the WhatsApp message */
  topic?: string;
}

/** Lightweight dark call-to-action band reused at the end of inner pages. */
export default function QuoteBand({
  title = 'Ready to print something remarkable?',
  description = 'Tell us what you need and we will get back with a quote — usually within the same day.',
  topic,
}: QuoteBandProps) {
  const message = topic
    ? `Hi Design N Print, I would like a quote for ${topic}.`
    : 'Hi Design N Print, I would like a quote.';

  return (
    <section className="bg-studio-dark text-white" aria-label="Request a quote">
      <Reveal className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-10 sm:py-20">
        <span className="cmyk-strip mx-auto block h-1.5 w-20 rounded-full" />
        <h2 className="mt-5 font-display text-3xl font-bold leading-tight sm:text-5xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-white/70">{description}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <LinkButton href={buildWhatsAppLink(message)} isExternal variant="whatsapp">
            <MessageCircle className="h-4 w-4" /> Get a Quote on WhatsApp
          </LinkButton>
          <a
            href={`tel:+${siteConfig.whatsappNumber}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white"
          >
            <Phone className="h-4 w-4" /> {siteConfig.phoneDisplay}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
