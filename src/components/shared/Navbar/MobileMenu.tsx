'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { productCatalog } from '@/data/productCatalog';
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

/** Slide-down mobile menu with an accordion of every product. */
export default function MobileMenu({ isOpen, onNavigate }: MobileMenuProps) {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

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
                    {productCatalog.map((product) => (
                      <li key={product.slug}>
                        <Link
                          href={`/services/${product.slug}`}
                          onClick={onNavigate}
                          className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-white/85 hover:text-white"
                        >
                          <span
                            className="inline-block h-2 w-2 rounded-full"
                            style={{ backgroundColor: `var(--color-brand-${product.accent})` }}
                          />
                          {product.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link href="/services" onClick={onNavigate} className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-brand-yellow">
                        Browse the full range →
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
