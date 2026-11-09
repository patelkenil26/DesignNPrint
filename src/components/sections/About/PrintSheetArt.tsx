import TiltCard from '@/components/shared/TiltCard';
import { siteConfig } from '@/data/siteConfig';

/** Colour-control bar swatches printed along the bottom of every press sheet. */
const controlBarSwatches = [
  'var(--color-brand-blue)',
  'var(--color-brand-red)',
  'var(--color-brand-yellow)',
  'var(--color-ink)',
  'color-mix(in srgb, var(--color-brand-blue) 50%, white)',
  'color-mix(in srgb, var(--color-brand-red) 50%, white)',
  'color-mix(in srgb, var(--color-brand-yellow) 50%, white)',
  'color-mix(in srgb, var(--color-ink) 50%, white)',
];

function RegistrationMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={`h-9 w-9 text-ink ${className}`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="20" cy="20" r="9" />
      <path d="M20 2v36M2 20h36" />
    </svg>
  );
}

/**
 * A press sheet drawn in CSS/SVG: crop marks, registration targets and the colour-control bar,
 * with "Since 2008" printed on it. Pure artwork — no photo needed.
 */
export default function PrintSheetArt() {
  return (
    <TiltCard>
      <div className="animate-float-slow relative mx-auto aspect-[3/4] w-full max-w-sm">
        <div className="absolute inset-3 rounded-sm bg-white shadow-2xl ring-1 ring-ink/10" />
        <span className="crop-marks crop-marks-always absolute inset-0" aria-hidden="true" />

        <RegistrationMark className="animate-spin-slow absolute left-1/2 top-0 -translate-x-1/2" />
        <RegistrationMark className="animate-spin-slow absolute bottom-[3.4rem] left-1/2 -translate-x-1/2 opacity-60" />

        <div className="absolute inset-x-10 top-16 bottom-24 flex flex-col items-center justify-center text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-muted">Since</p>
          <p className="text-outline font-display text-7xl font-black leading-none sm:text-8xl">{siteConfig.foundedYear}</p>
          <span className="cmyk-strip mt-5 block h-1.5 w-20 rounded-full" />
          <p className="mt-4 font-display text-sm font-bold text-ink">{siteConfig.name}</p>
          <p className="mt-1 text-xs text-muted">{siteConfig.location}</p>
        </div>

        <ul className="absolute inset-x-10 bottom-8 flex h-5 gap-1" aria-hidden="true">
          {controlBarSwatches.map((swatch, index) => (
            <li
              key={swatch}
              className="animate-bar-in flex-1 rounded-[2px]"
              style={{ backgroundColor: swatch, animationDelay: `${0.5 + index * 0.08}s` }}
            />
          ))}
        </ul>
      </div>
    </TiltCard>
  );
}
