import { MessageCircle } from 'lucide-react';
import InkReveal from '@/components/shared/InkReveal';
import ViewerTrigger from '@/components/shared/ImageViewer/ViewerTrigger';
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
      className={`group relative flex h-full scroll-mt-40 flex-col overflow-hidden rounded-2xl bg-white p-2 shadow-sm sm:rounded-3xl ring-1 ring-ink/5 transition-all duration-500 target:ring-2 target:ring-ink hover:-translate-y-1.5 hover:shadow-2xl active:scale-[0.99] sm:p-3 ${
        type.image ? '' : 'max-sm:flex-row max-sm:items-start max-sm:gap-3 max-sm:p-3.5'
      }`}
    >
      {/* no photo yet: on phones a numbered accent tile replaces the big art panel, so the list stays dense and readable */}
      {!type.image && (
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-display text-lg font-black text-ink sm:hidden"
          style={{ backgroundColor: `color-mix(in srgb, ${accentColor} 35%, var(--color-paper))` }}
          aria-hidden="true"
        >
          {formatNumber(type.number)}
        </span>
      )}
      <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-paper-deep ${type.image ? '' : 'max-sm:hidden'}`}>
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
        {type.image && <ViewerTrigger itemId={type.slug} label={type.name} />}
        <span className="absolute left-2 top-2 z-10 rounded-full bg-white/90 px-2 py-0.5 font-display text-[11px] font-bold sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 text-ink shadow-sm backdrop-blur">
          {formatNumber(type.number)}
        </span>
      </div>

      <div className={`flex flex-1 flex-col px-1 pb-1.5 pt-3 sm:px-2 sm:pb-2 sm:pt-4 ${type.image ? '' : 'max-sm:pt-0'}`}>
        <h3 className="font-display text-sm font-bold leading-tight text-ink sm:text-lg">{type.name}</h3>
        <p className="mt-1 line-clamp-3 text-xs leading-snug text-ink/65 sm:mt-1.5 sm:line-clamp-none sm:text-sm sm:leading-relaxed">{type.line}</p>
        <a
          href={buildWhatsAppLink(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex w-fit items-center gap-1.5 pt-3 text-xs font-semibold sm:pt-4 sm:text-sm text-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        >
          <MessageCircle className="h-3.5 w-3.5 shrink-0 text-whatsapp sm:h-4 sm:w-4" /> <span className="sm:hidden">Ask for this</span><span className="hidden sm:inline">Ask for this type</span>
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
