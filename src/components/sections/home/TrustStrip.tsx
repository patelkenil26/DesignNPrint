'use client';

import { motion } from 'framer-motion';
import { FileCheck2, MapPin, Palette, Truck, Zap, type LucideIcon } from 'lucide-react';
import { trustPoints, type TrustIconName } from '@/data/homeData';

const trustIcons: Record<TrustIconName, LucideIcon> = {
  design: Palette,
  proof: FileCheck2,
  express: Zap,
  delivery: Truck,
  location: MapPin,
};

/** Reassurance band under the hero: each promise pops in one after another, with its CMYK underline drawing itself. */
export default function TrustStrip() {
  return (
    <section className="relative bg-ink text-white" aria-label="Why customers choose Design N Print">
      <span className="cmyk-strip absolute inset-x-0 top-0 h-1" />
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-8 px-5 py-9 sm:px-10 lg:grid-cols-5 lg:py-12">
        {trustPoints.map((point, index) => {
          const Icon = trustIcons[point.icon];
          return (
            <motion.li
              key={point.id}
              className="group relative flex items-start gap-3 last:col-span-2 lg:last:col-span-1"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-brand-yellow transition-all duration-300 group-hover:-translate-y-1 group-hover:rotate-6 group-hover:bg-brand-yellow group-hover:text-ink">
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <span>
                <span className="block text-sm font-semibold">{point.title}</span>
                <span className="mt-0.5 block text-xs leading-snug text-white/65">{point.detail}</span>
                <motion.span
                  aria-hidden="true"
                  className="cmyk-strip mt-2 block h-0.5 w-10 origin-left rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.4 + index * 0.09, ease: 'easeOut' }}
                />
              </span>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
