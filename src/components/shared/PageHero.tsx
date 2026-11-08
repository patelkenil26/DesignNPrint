import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  /** optional visual placed on the right side (image, 3D, etc.) */
  aside?: React.ReactNode;
  children?: React.ReactNode;
}

/** Shared hero for inner pages — same studio look as the home page, with floating print shapes. */
export default function PageHero({ eyebrow, title, description, breadcrumbs, aside, children }: PageHeroProps) {
  return (
    <section className="bg-studio relative overflow-hidden">
      {/* soft floating colour discs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="animate-float-slow absolute -left-16 top-10 h-56 w-56 rounded-full bg-brand-blue/15 blur-2xl" />
        <span className="animate-float-slower absolute right-10 top-4 h-64 w-64 rounded-full bg-brand-yellow/25 blur-2xl" />
        <span className="animate-float-slow absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-brand-red/15 blur-2xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-10 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex flex-wrap items-center gap-1 text-xs font-medium text-muted">
                {breadcrumbs.map((crumb, index) => (
                  <li key={crumb.label} className="flex items-center gap-1">
                    {crumb.href ? (
                      <Link href={crumb.href} className="transition-colors hover:text-ink">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-ink" aria-current="page">
                        {crumb.label}
                      </span>
                    )}
                    {index < breadcrumbs.length - 1 && <ChevronRight className="h-3 w-3" />}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <Reveal>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted">
              <span className="cmyk-strip h-1.5 w-8 rounded-full" />
              {eyebrow}
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              {title}
            </h1>
            {description && <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">{description}</p>}
          </Reveal>
          {children && (
            <Reveal delay={0.15} className="mt-7">
              {children}
            </Reveal>
          )}
        </div>

        {aside && <Reveal delay={0.1}>{aside}</Reveal>}
      </div>
    </section>
  );
}
