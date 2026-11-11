'use client';

import SafeImage from '@/components/shared/SafeImage';

interface RegisteredImageProps {
  src: string;
  alt: string;
  sizes: string;
  /** true = the three ink plates sit exactly under the image ("in register"); false = they are knocked out of line */
  isRegistered: boolean;
  /** how far (px) the plates drift apart when out of register */
  spread?: number;
  /** `cover` fills the frame (photos); `contain` keeps a cut-out PNG whole */
  fit?: 'cover' | 'contain';
  priority?: boolean;
  className?: string;
}

/** Cyan, red (magenta) and yellow plates — each drifts in a different direction while "printing". */
const inkPlates = [
  { color: 'var(--color-brand-blue)', direction: [-1, -0.6] },
  { color: 'var(--color-brand-red)', direction: [1, -0.4] },
  { color: 'var(--color-brand-yellow)', direction: [0.2, 1] },
] as const;

/**
 * A product image drawn like an offset print job: three coloured ink plates (cut to the shape of the image)
 * sit behind it, drift apart, and snap into register. Works with the client's transparent PNGs — the plates
 * follow the cut-out — and with plain photos, where they show up as a coloured misregistration edge.
 */
export default function RegisteredImage({
  src,
  alt,
  sizes,
  isRegistered,
  spread = 14,
  fit = 'cover',
  priority = false,
  className = '',
}: RegisteredImageProps) {
  return (
    <div className={`group relative isolate h-full w-full ${className}`}>
      {inkPlates.map(({ color, direction }) => {
        const [directionX, directionY] = direction;
        return (
          <span
            key={color}
            aria-hidden="true"
            className="absolute inset-0 rounded-2xl mix-blend-multiply transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
            style={{
              backgroundColor: color,
              maskImage: `url(${src})`,
              WebkitMaskImage: `url(${src})`,
              maskSize: fit,
              WebkitMaskSize: fit,
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskPosition: 'center',
              opacity: isRegistered ? 0.9 : 0.75,
              transform: isRegistered
                ? 'translate3d(0,0,0)'
                : `translate3d(${directionX * spread}px, ${directionY * spread}px, 0)`,
            }}
          />
        );
      })}
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white shadow-xl">
        <SafeImage src={src} alt={alt} fill sizes={sizes} priority={priority} className={fit === 'cover' ? 'object-cover' : 'object-contain'} />
      </div>
    </div>
  );
}
