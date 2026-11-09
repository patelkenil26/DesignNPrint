import type { ProductAccent } from '@/data/productCatalog';

interface ProductArtProps {
  accent: ProductAccent;
  /** big numeral or short code shown in the panel */
  mark: string;
  /** small caption, usually the product or type name */
  caption: string;
  className?: string;
}

/**
 * Designed stand-in shown wherever a real photo has not been added yet:
 * accent colour wash + halftone dots + a large outlined numeral. Looks intentional, never broken.
 */
export default function ProductArt({ accent, mark, caption, className = '' }: ProductArtProps) {
  const accentColor = `var(--color-brand-${accent})`;
  return (
    <div
      role="img"
      aria-label={caption}
      className={`relative flex h-full w-full flex-col justify-end gap-1 overflow-hidden p-5 ${className}`}
      style={{
        ['--art-accent' as string]: accentColor,
        backgroundColor: `color-mix(in srgb, ${accentColor} 24%, var(--color-paper))`,
      }}
    >
      <span className="bg-halftone absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_80%_80%_at_85%_15%,black,transparent_70%)]" />
      <span
        className="absolute -right-6 -top-6 h-32 w-32 rounded-full opacity-60 blur-2xl"
        style={{ backgroundColor: accentColor }}
      />
      <span className="relative font-display text-sm font-bold leading-tight text-ink/80">{caption}</span>
      <span className="text-outline relative font-display text-6xl font-black leading-none sm:text-7xl">{mark}</span>
    </div>
  );
}
