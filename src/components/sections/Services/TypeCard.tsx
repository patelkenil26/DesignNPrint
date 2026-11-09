import { MessageCircle } from 'lucide-react';
import InkReveal from '@/components/shared/InkReveal';
import ProductArt from '@/components/shared/ProductArt';
import SafeImage from '@/components/shared/SafeImage';
import type { ProductAccent } from '@/data/productCatalog';
import { buildWhatsAppLink } from '@/data/siteConfig';

export interface TypeCardData {
  slug: string;
  name: string;
  line: string;
  number: number;
  /** resolved photo, or null → graphic panel */
  image: string | null;
}

interface TypeCardProps {
  type: TypeCardData;
  productName: string;
  accent: ProductAccent;
  revealDelay?: number;
}

const formatNumber = (value: number) => String(value).padStart(2, '0');

/** One type of a product — photo (or graphic), what makes it different, and a one-tap WhatsApp request. */
export default function TypeCard({ type, productName, accent, revealDelay = 0 }: TypeCardProps) {
  const accentColor = `var(--color-brand-${accent})`;
  const whatsappMessage = `Hi Design N Print, I would like a quote for ${productName} — ${type.name}.`;

  return (
    <article
      id={type.slug}
      className="group relative flex h-full scroll-mt-40 flex-col overflow-hidden rounded-3xl bg-white p-2.5 shadow-sm ring-1 ring-ink/5 transition-all duration-500 target:ring-2 target:ring-ink hover:-translate-y-1.5 hover:shadow-2xl sm:p-3"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-paper-deep">
        <InkReveal delay={revealDelay} className="h-full w-full">
          {type.image ? (
            <SafeImage
              src={type.image}
              alt={`${type.name} — ${productName.toLowerCase()} sample`}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <ProductArt accent={accent} mark={formatNumber(type.number)} caption={type.name} />
          )}
        </InkReveal>
        <span className="crop-marks absolute inset-0" aria-hidden="true" />
        <span className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-2.5 py-1 font-display text-[11px] font-bold text-ink shadow-sm backdrop-blur">
          {formatNumber(type.number)}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <h3 className="font-display text-lg font-bold leading-tight text-ink">{type.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{type.line}</p>
        <a
          href={buildWhatsAppLink(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex w-fit items-center gap-1.5 pt-4 text-sm font-semibold text-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        >
          <MessageCircle className="h-4 w-4 text-whatsapp" /> Ask for this type
        </a>
      </div>

      <span
        aria-hidden="true"
        className="absolute inset-x-6 bottom-0 h-1 origin-left scale-x-0 rounded-t-full transition-transform duration-500 group-hover:scale-x-100"
        style={{ backgroundColor: accentColor }}
      />
    </article>
  );
}
