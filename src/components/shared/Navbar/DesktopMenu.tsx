'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import ServicesMegaMenu from './ServicesMegaMenu';
import type { ProductCardData } from '@/lib/productCards';

const linksBeforeServices = [{ label: 'Home', href: '/' }];
const linksAfterServices = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const linkClasses =
  'group relative inline-block py-2 text-sm font-medium tracking-wide text-white/90 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow';

/** Yellow underline: slides in on hover, and stays on for the page you are on. */
function Underline({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={`absolute -bottom-0.5 left-0 h-[2px] w-full origin-left rounded-full bg-brand-yellow transition-transform duration-500 group-hover:scale-x-100 ${
        isActive ? 'scale-x-100' : 'scale-x-0'
      }`}
    />
  );
}

interface DesktopMenuProps {
  pathname: string;
  products: ProductCardData[];
}

const isCurrentPage = (pathname: string, href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

/** Desktop navigation with a services mega menu listing every product. */
export default function DesktopMenu({ pathname, products }: DesktopMenuProps) {
  const [isMegaOpen, setIsMegaOpen] = useState(false);

  useEffect(() => {
    if (!isMegaOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMegaOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMegaOpen]);

  return (
    <ul className="hidden items-center gap-8 lg:flex">
      {linksBeforeServices.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className={`${linkClasses} ${isCurrentPage(pathname, item.href) ? 'text-white' : ''}`} aria-current={isCurrentPage(pathname, item.href) ? 'page' : undefined}>
            {item.label}
            <Underline isActive={isCurrentPage(pathname, item.href)} />
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
        <Link
          href="/services"
          className={`${linkClasses} inline-flex items-center gap-1 ${isCurrentPage(pathname, '/services') ? 'text-white' : ''}`}
          aria-haspopup="true"
          aria-expanded={isMegaOpen}
          aria-current={pathname === '/services' ? 'page' : undefined}
        >
          Services
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isMegaOpen ? 'rotate-180' : ''}`} />
          <Underline isActive={isCurrentPage(pathname, '/services')} />
        </Link>

        <AnimatePresence>
          {isMegaOpen && <ServicesMegaMenu products={products} pathname={pathname} onNavigate={() => setIsMegaOpen(false)} />}
        </AnimatePresence>
      </li>

      {linksAfterServices.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className={`${linkClasses} ${isCurrentPage(pathname, item.href) ? 'text-white' : ''}`} aria-current={isCurrentPage(pathname, item.href) ? 'page' : undefined}>
            {item.label}
            <Underline isActive={isCurrentPage(pathname, item.href)} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
