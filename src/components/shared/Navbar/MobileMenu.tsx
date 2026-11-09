'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, MessageCircle, Phone } from 'lucide-react';
import SearchBox from '@/components/shared/Navbar/SearchBox';
import { productCatalog } from '@/data/productCatalog';
import { buildWhatsAppLink, siteConfig } from '@/data/siteConfig';

interface MobileMenuProps {
  isOpen: boolean;
  pathname: string;
  onNavigate: () => void;
}

const linkBaseClasses = 'block rounded-xl px-3 py-3 transition-colors hover:bg-white/5';

/** Slide-down mobile menu: search, the main pages, and an accordion of every product. */
export default function MobileMenu({ isOpen, pathname, onNavigate }: MobileMenuProps) {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const isCurrent = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const linkClasses = (href: string) =>
    `${linkBaseClasses} ${isCurrent(href) ? 'bg-white/10 text-brand-yellow' : 'text-white/90'}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-menu"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden border-t border-white/10 bg-ink-soft lg:hidden"
        >
          <ul className="flex max-h-[calc(100svh-var(--nav-height))] flex-col gap-1 overflow-y-auto overscroll-contain px-5 py-5 text-base font-medium">
            <li className="pb-3">
              <SearchBox variant="mobile" onNavigate={onNavigate} />
            </li>

            <li>
              <Link href="/" onClick={onNavigate} aria-current={pathname === '/' ? 'page' : undefined} className={linkClasses('/')}>
                Home
              </Link>
            </li>

            <li>
              <div className="flex items-stretch">
                <Link
                  href="/services"
                  onClick={onNavigate}
                  aria-current={pathname === '/services' ? 'page' : undefined}
                  className={`${linkClasses('/services')} flex-1`}
                >
                  Services
                </Link>
                <button
                  type="button"
                  onClick={() => setIsServicesOpen((current) => !current)}
                  aria-expanded={isServicesOpen}
                  aria-label={isServicesOpen ? 'Hide all products' : 'Show all products'}
                  className="rounded-xl px-4 text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-3"
                  >
                    {productCatalog.map((product) => (
                      <li key={product.slug}>
                        <Link
                          href={`/services/${product.slug}`}
                          onClick={onNavigate}
                          aria-current={pathname === `/services/${product.slug}` ? 'page' : undefined}
                          className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium hover:text-white ${
                            pathname === `/services/${product.slug}` ? 'text-brand-yellow' : 'text-white/85'
                          }`}
                        >
                          <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: `var(--color-brand-${product.accent})` }} />
                          {product.name}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            <li>
              <Link href="/about" onClick={onNavigate} aria-current={pathname === '/about' ? 'page' : undefined} className={linkClasses('/about')}>
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={onNavigate} aria-current={pathname === '/contact' ? 'page' : undefined} className={linkClasses('/contact')}>
                Contact
              </Link>
            </li>

            <li className="grid gap-3 pt-3 sm:grid-cols-2">
              <a
                href={buildWhatsAppLink('Hi Design N Print, I would like a quote.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-semibold text-ink transition-all active:scale-95"
              >
                <MessageCircle className="h-4 w-4" /> Get a Quote
              </a>
              <a
                href={`tel:+${siteConfig.whatsappNumber}`}
                className="flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-all active:scale-95"
              >
                <Phone className="h-4 w-4" /> Call us
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
