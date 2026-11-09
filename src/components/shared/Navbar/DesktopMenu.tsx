'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { productCatalog } from '@/data/productCatalog';

const plainLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
];

const linkClasses =
  'group relative inline-block py-2 text-sm font-medium tracking-wide text-white/90 transition-colors hover:text-white';

function Underline() {
  return (
    <span className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-brand-yellow transition-transform duration-500 group-hover:scale-x-100" />
  );
}

/** Desktop navigation with a services mega menu listing every product. */
export default function DesktopMenu() {
  const [isMegaOpen, setIsMegaOpen] = useState(false);

  return (
    <ul className="hidden items-center gap-8 lg:flex">
      {plainLinks.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className={linkClasses}>
            {item.label}
            <Underline />
          </Link>
        </li>
      ))}

      <li
        onMouseEnter={() => setIsMegaOpen(true)}
        onMouseLeave={() => setIsMegaOpen(false)}
        onFocus={() => setIsMegaOpen(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsMegaOpen(false);
        }}
      >
        <Link href="/services" className={`${linkClasses} inline-flex items-center gap-1`} aria-haspopup="true" aria-expanded={isMegaOpen}>
          Services
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isMegaOpen ? 'rotate-180' : ''}`} />
          <Underline />
        </Link>

        <AnimatePresence>
          {isMegaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full z-50 px-4 pt-2"
            >
              <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-white text-ink shadow-2xl ring-1 ring-ink/10">
                <ul className="grid gap-x-8 gap-y-1 p-8 lg:grid-cols-3">
                  {productCatalog.map((product) => (
                    <li key={product.slug}>
                      <Link
                        href={`/services/${product.slug}`}
                        className="group/item flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-ink/75 transition-colors hover:bg-paper hover:text-ink"
                      >
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: `var(--color-brand-${product.accent})` }}
                        />
                        {product.name}
                        <ArrowRight className="ml-auto h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover/item:translate-x-0 group-hover/item:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/services"
                  className="flex items-center justify-between bg-paper px-8 py-4 text-sm font-semibold text-ink transition-colors hover:bg-paper-deep"
                >
                  Browse all {productCatalog.length} products
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </li>

      <li>
        <Link href="/contact" className={linkClasses}>
          Contact
          <Underline />
        </Link>
      </li>
    </ul>
  );
}
