import Link from 'next/link';
import { ArrowUpRight, Layers } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';
import { ProductCategory } from '@/data/categories';

interface SubCategoryGridProps {
  category: ProductCategory;
}

/** The sub-categories of one main category (e.g. Boxes → horizontal, vertical, pharma …). */
export default function SubCategoryGrid({ category }: SubCategoryGridProps) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {category.subCategories.map((subCategory, index) => (
        <li key={subCategory.name}>
          <Reveal delay={index * 0.05} className="h-full">
            <Link
              href={`/contact?subject=${encodeURIComponent(`${category.name} — ${subCategory.name}`)}`}
              className="group flex h-full items-start gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-ink"
                style={{ backgroundColor: `color-mix(in srgb, var(--color-brand-${category.accent}) 30%, white)` }}
              >
                <Layers className="h-5 w-5" />
              </span>
              <span className="flex-1">
                <span className="block font-display text-lg font-bold text-ink">{subCategory.name}</span>
                <span className="mt-1 block text-sm leading-relaxed text-ink/70">{subCategory.blurb}</span>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-ink">
                  Ask for a quote
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </span>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
