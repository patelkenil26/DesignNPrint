'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { getCategoryHref, productCategories } from '@/data/categories';
import { getServiceHref, getServicesByCategory } from '@/data/serviceCatalog';
import { buildWhatsAppLink } from '@/data/siteConfig';

interface MobileMenuProps {
  isOpen: boolean;
  onNavigate: () => void;
}

const topLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

/** Slide-down mobile menu with an accordion of service categories. */
export default function MobileMenu({ isOpen, onNavigate }: MobileMenuProps) {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden border-t border-white/10 bg-ink-soft lg:hidden"
        >
          <ul className="flex max-h-[calc(100svh-var(--nav-height))] flex-col gap-1 overflow-y-auto px-5 py-5 text-base font-medium">
            {topLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={onNavigate} className="block rounded-xl px-3 py-3 text-white/90 hover:bg-white/5">
                  {item.label}
                </Link>
              </li>
            ))}

            <li>
              <button
                type="button"
                onClick={() => setIsServicesOpen((current) => !current)}
                aria-expanded={isServicesOpen}
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-white/90 hover:bg-white/5"
              >
                Services
                <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-3"
                  >
                    {productCategories.map((category) => {
                      const isCategoryOpen = openCategory === category.slug;
                      return (
                        <li key={category.id}>
                          <div className="flex items-center">
                            <Link
                              href={getCategoryHref(category.slug)}
                              onClick={onNavigate}
                              className="flex-1 rounded-xl px-3 py-2.5 text-sm font-semibold text-white"
                            >
                              <span
                                className="mr-2 inline-block h-2 w-2 rounded-full"
                                style={{ backgroundColor: `var(--color-brand-${category.accent})` }}
                              />
                              {category.name}
                            </Link>
                            <button
                              type="button"
                              aria-label={`Show ${category.name} services`}
                              aria-expanded={isCategoryOpen}
                              onClick={() => setOpenCategory(isCategoryOpen ? null : category.slug)}
                              className="rounded-xl p-2.5 text-white/60 hover:text-white"
                            >
                              <ChevronDown className={`h-4 w-4 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                            </button>
                          </div>
                          {isCategoryOpen && (
                            <ul className="mb-2 ml-5 space-y-1 border-l border-white/10 pl-4">
                              {getServicesByCategory(category.slug).map((service) => (
                                <li key={service.slug}>
                                  <Link
                                    href={getServiceHref(service.slug)}
                                    onClick={onNavigate}
                                    className="block py-1.5 text-sm text-white/65 hover:text-white"
                                  >
                                    {service.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                    <li>
                      <Link href="/services/all" onClick={onNavigate} className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-brand-yellow">
                        View all services →
                      </Link>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            <li className="pt-3">
              <a
                href={buildWhatsAppLink('Hi Design N Print, I would like a quote.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-semibold text-ink"
              >
                <MessageCircle className="h-4 w-4" /> Get a Quote
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
