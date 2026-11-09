import { FileCheck2, MapPin, Palette, Truck, Zap, type LucideIcon } from 'lucide-react';
import { trustPoints, type TrustIconName } from '@/data/homeData';

const trustIcons: Record<TrustIconName, LucideIcon> = {
  design: Palette,
  proof: FileCheck2,
  express: Zap,
  delivery: Truck,
  location: MapPin,
};

/** Thin reassurance band right under the hero — answers "can I trust them?" before the product story starts. */
export default function TrustStrip() {
  return (
    <section className="relative bg-ink text-white" aria-label="Why customers choose Design N Print">
      <span className="cmyk-strip absolute inset-x-0 top-0 h-1" />
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-6 px-5 py-8 sm:px-10 lg:grid-cols-5 lg:py-10">
        {trustPoints.map((point) => {
          const Icon = trustIcons[point.icon];
          return (
            <li
              key={point.id}
              className="flex items-start gap-3 last:col-span-2 lg:last:col-span-1"
            >
              <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-brand-yellow">
                <Icon className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-sm font-semibold">{point.title}</span>
                <span className="mt-0.5 block text-xs leading-snug text-white/65">{point.detail}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
