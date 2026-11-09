import Link from 'next/link';
import { ArrowDown, ChevronRight, Layers, MessageCircle, Sparkles } from 'lucide-react';
import InkReveal from '@/components/shared/InkReveal';
import LinkButton from '@/components/shared/LinkButton';
import ProductArt from '@/components/shared/ProductArt';
import Reveal from '@/components/shared/Reveal';
import SafeImage from '@/components/shared/SafeImage';
import TiltCard from '@/components/shared/TiltCard';
import { productCatalog, type Product } from '@/data/productCatalog';
import { buildWhatsAppLink } from '@/data/siteConfig';

interface ProductHeroProps {
  product: Product;
  number: number;
  coverImage: string | null;
}

const formatNumber = (value: number) => String(value).padStart(2, '0');

/** Product page hero — accent-tinted, with the cover framed like a printed proof. */
export default function ProductHero({ product, number, coverImage }: ProductHeroProps) {
  const accentColor = `var(--color-brand-${product.accent})`;

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: `color-mix(in srgb, ${accentColor} 18%, var(--color-paper))` }}
      aria-labelledby="product-heading"
    >
      <div className="bg-halftone pointer-events-none absolute inset-0 opacity-40 [--art-accent:var(--color-ink)] [mask-image:radial-gradient(ellipse_50%_70%_at_95%_20%,black,transparent_70%)]" />
      <span
        aria-hidden="true"
        className="text-outline pointer-events-none absolute -bottom-10 right-4 select-none font-display text-[14rem] font-black leading-none opacity-[0.12] sm:text-[22rem]"
      >
        {formatNumber(number)}
      </span>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-10 sm:py-20 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1 text-xs font-medium text-ink/60">
              <li className="flex items-center gap-1">
                <Link href="/" className="transition-colors hover:text-ink">
                  Home
                </Link>
                <ChevronRight className="h-3 w-3" />
              </li>
              <li className="flex items-center gap-1">
                <Link href="/services" className="transition-colors hover:text-ink">
                  Services
                </Link>
                <ChevronRight className="h-3 w-3" />
              </li>
              <li className="text-ink" aria-current="page">
                {product.name}
              </li>
            </ol>
          </nav>

          <Reveal>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-ink/60">
              <span className="font-display text-ink">
                {formatNumber(number)} / {formatNumber(productCatalog.length)}
              </span>
              <span className="h-px w-8 bg-ink/30" />
              {product.tagline}
            </p>
            <h1
              id="product-heading"
              className="mt-3 font-display text-5xl font-bold leading-[1.02] tracking-tight text-ink sm:text-7xl"
            >
              {product.name}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/75 sm:text-lg">{product.intro}</p>
          </Reveal>

          <Reveal delay={0.15} className="mt-7">
            <div className="flex flex-wrap gap-3">
              <LinkButton
                href={buildWhatsAppLink(`Hi Design N Print, I would like a quote for ${product.name}.`)}
                isExternal
                variant="whatsapp"
              >
                <MessageCircle className="h-4 w-4" /> Get a quote
              </LinkButton>
              <LinkButton href="#types" variant="outline">
                See all {product.types.length} types <ArrowDown className="h-4 w-4" />
              </LinkButton>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <TiltCard>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-ink/10">
                <InkReveal className="h-full w-full" delay={0.2}>
                  {coverImage ? (
                    <SafeImage
                      src={coverImage}
                      alt={product.coverAlt}
                      fill
                      priority
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <ProductArt accent={product.accent} mark={formatNumber(number)} caption={product.name} />
                  )}
                </InkReveal>
                <span className="crop-marks crop-marks-always absolute inset-0" aria-hidden="true" />
                <span className="absolute inset-x-0 top-0 z-10 h-1.5" style={{ backgroundColor: accentColor }} />
              </div>

              <span className="animate-float-slow absolute -left-3 bottom-8 z-10 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink shadow-xl sm:-left-6">
                <Layers className="h-3.5 w-3.5" style={{ color: accentColor }} />
                {product.types.length} types
              </span>
              <span className="animate-float-slower absolute -right-2 top-8 z-10 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white shadow-xl sm:-right-5">
                <Sparkles className="h-3.5 w-3.5 text-brand-yellow" />
                Design + print
              </span>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
