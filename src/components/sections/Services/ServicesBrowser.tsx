'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';
import ServiceCard from '@/components/sections/Services/ServiceCard';
import { productCategories } from '@/data/categories';
import { serviceCatalog } from '@/data/serviceCatalog';

const ALL_TAB = 'all';

/** "View all" — every service in one filterable grid with live counts. */
export default function ServicesBrowser() {
  const [activeTab, setActiveTab] = useState<string>(ALL_TAB);
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = useMemo(
    () => [
      { slug: ALL_TAB, name: 'All', count: serviceCatalog.length },
      ...productCategories.map((category) => ({
        slug: category.slug,
        name: category.name,
        count: serviceCatalog.filter((service) => service.categorySlug === category.slug).length,
      })),
    ],
    [],
  );

  const visibleServices = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return serviceCatalog.filter((service) => {
      const matchesTab = activeTab === ALL_TAB || service.categorySlug === activeTab;
      const matchesSearch =
        term.length === 0 ||
        service.title.toLowerCase().includes(term) ||
        service.types.some((type) => type.toLowerCase().includes(term));
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchTerm]);

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="tablist" aria-label="Filter services by category" className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const isActive = tab.slug === activeTab;
            return (
              <button
                key={tab.slug}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.slug)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
                  isActive ? 'bg-ink text-white shadow-lg' : 'bg-white text-ink/70 ring-1 ring-ink/10 hover:text-ink hover:ring-ink/30'
                }`}
              >
                {tab.name} <span className={isActive ? 'text-brand-yellow' : 'text-muted'}>({tab.count})</span>
              </button>
            );
          })}
        </div>

        <label className="relative block lg:w-72">
          <span className="sr-only">Search services</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search services…"
            className="w-full rounded-full bg-white py-2.5 pl-11 pr-4 text-sm text-ink ring-1 ring-ink/10 transition focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
        </label>
      </div>

      <motion.ul layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {visibleServices.map((service) => (
            <motion.li
              key={service.slug}
              layout
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ServiceCard service={service} showCategory />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {visibleServices.length === 0 && (
        <p className="mt-12 text-center text-base text-muted">
          No service matches “{searchTerm}”. Try another word — or message us, we print almost anything.
        </p>
      )}
    </div>
  );
}
