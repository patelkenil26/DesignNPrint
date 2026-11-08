import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';
import TiltCard from '@/components/shared/TiltCard';
import { industries } from '@/data/homeData';

export default function IndustriesSection() {
  return (
    <section className="bg-paper py-20 sm:py-28" aria-labelledby="industries-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">Built for your industry</p>
          <h2 id="industries-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-5xl">
            We know what your customers expect.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry, index) => (
            <Reveal key={industry.id} delay={index * 0.08}>
              <TiltCard className="h-full">
                <Link
                  href={industry.href}
                  className="group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-3xl bg-ink shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                >
                  <Image
                    src={industry.image}
                    alt={industry.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-transparent" />
                  <span
                    className="absolute left-0 top-0 h-1.5 w-full"
                    style={{ backgroundColor: `var(--color-brand-${industry.accent})` }}
                  />
                  <div className="relative p-6 text-white">
                    <h3 className="font-display text-xl font-bold">{industry.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">{industry.line}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                      Explore <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
