import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SafeImage from '@/components/shared/SafeImage';
import TiltCard from '@/components/shared/TiltCard';
import { ProductCategory, getCategoryHref } from '@/data/categories';
import { getServicesByCategory } from '@/data/serviceCatalog';

interface CategoryCardProps {
  category: ProductCategory;
}

/** Big category tile: cover image, tagline, sub-category chips and a live service count. */
export default function CategoryCard({ category }: CategoryCardProps) {
  const serviceCount = getServicesByCategory(category.slug).length;
  const visibleChips = category.subCategories.slice(0, 4);
  const hiddenCount = category.subCategories.length - visibleChips.length;

  return (
    <TiltCard className="h-full">
      <Link
        href={getCategoryHref(category.slug)}
        className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-ink/5 transition-shadow duration-300 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-paper-deep">
          <SafeImage
            src={category.image}
            alt={category.imageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <span
            className="absolute inset-x-0 top-0 h-1.5"
            style={{ backgroundColor: `var(--color-brand-${category.accent})` }}
          />
          <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur">
            {serviceCount} {serviceCount === 1 ? 'service' : 'services'}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">{category.tagline}</p>
          <h3 className="mt-1.5 font-display text-xl font-bold text-ink">{category.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">{category.blurb}</p>

          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${category.name} types`}>
            {visibleChips.map((subCategory) => (
              <li key={subCategory.name} className="rounded-full border border-ink/15 px-3 py-1 text-xs font-medium text-ink/75">
                {subCategory.name}
              </li>
            ))}
            {hiddenCount > 0 && (
              <li className="rounded-full bg-paper-deep px-3 py-1 text-xs font-semibold text-ink/70">+{hiddenCount} more</li>
            )}
          </ul>

          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-ink">
            Explore {category.name}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </TiltCard>
  );
}
