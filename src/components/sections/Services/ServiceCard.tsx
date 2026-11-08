import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SafeImage from '@/components/shared/SafeImage';
import { findCategory } from '@/data/categories';
import { ServiceItem, getServiceHref } from '@/data/serviceCatalog';

interface ServiceCardProps {
  service: ServiceItem;
  showCategory?: boolean;
}

export default function ServiceCard({ service, showCategory = false }: ServiceCardProps) {
  const category = findCategory(service.categorySlug);

  return (
    <Link
      href={getServiceHref(service.slug)}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-paper-deep">
        <SafeImage
          src={service.images[0]}
          alt={`${service.title} — sample print`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {category && (
          <span
            className="absolute inset-x-0 top-0 h-1"
            style={{ backgroundColor: `var(--color-brand-${category.accent})` }}
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        {showCategory && category && (
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">{category.name}</p>
        )}
        <h3 className="mt-1 font-display text-lg font-bold leading-snug text-ink">{service.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/70">{service.summary}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-ink">
          View details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
