'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { productCatalog, slugifyTypeName } from '@/data/productCatalog';

interface SearchBoxProps {
  /** `desktop` is the compact pill in the navbar (xl+); `mobile` is the full-width field inside the menu */
  variant?: 'desktop' | 'mobile';
  onNavigate?: () => void;
}

interface SearchResult {
  slug: string;
  name: string;
  typeCount: number;
  /** a matching type, shown when the product name itself did not match */
  matchedType?: string;
}

/** Live product search — matches product names and every type (e.g. "matt" finds Visiting Card). */
export default function SearchBox({ variant = 'desktop', onNavigate }: SearchBoxProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = variant === 'mobile';

  const results = useMemo<SearchResult[]>(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return [];
    const matches: SearchResult[] = [];
    for (const product of productCatalog) {
      const nameMatches = product.name.toLowerCase().includes(term);
      const matchedType = product.types.find((type) => type.name.toLowerCase().includes(term))?.name;
      if (!nameMatches && !matchedType) continue;
      matches.push({
        slug: product.slug,
        name: product.name,
        typeCount: product.types.length,
        matchedType: nameMatches ? undefined : matchedType,
      });
    }
    return matches.slice(0, 6);
  }, [searchTerm]);

  useEffect(() => {
    if (!searchTerm) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setSearchTerm('');
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [searchTerm]);

  const handleResultClick = () => {
    setSearchTerm('');
    onNavigate?.();
  };

  return (
    <div ref={containerRef} className={isMobile ? 'relative block w-full' : 'relative hidden xl:block'}>
      <label className="relative block">
        <span className="sr-only">Search products</span>
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setSearchTerm('');
          }}
          placeholder="Search products…"
          autoComplete="off"
          className={`rounded-full border border-white/15 bg-white/5 py-2 pl-10 pr-9 text-sm text-white placeholder:text-white/40 transition-all focus:border-brand-yellow focus:outline-none ${
            isMobile ? 'w-full py-3' : 'w-48 focus:w-60'
          }`}
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            aria-label="Clear search"
            className="absolute right-2.5 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </label>

      {searchTerm.trim() && (
        <ul
          className={`z-50 max-h-72 overflow-auto rounded-2xl bg-white py-2 text-ink shadow-2xl ring-1 ring-ink/10 ${
            isMobile ? 'mt-2 w-full' : 'absolute right-0 mt-2 w-72'
          }`}
        >
          {results.length > 0 ? (
            results.map((result) => (
              <li key={result.slug}>
                <Link
                  href={result.matchedType ? `/services/${result.slug}#${slugifyTypeName(result.matchedType)}` : `/services/${result.slug}`}
                  onClick={handleResultClick}
                  className="block px-4 py-2.5 transition-colors hover:bg-paper focus-visible:bg-paper focus-visible:outline-none"
                >
                  <span className="block text-sm font-semibold">{result.name}</span>
                  <span className="block text-xs text-muted">
                    {result.matchedType ? `Type: ${result.matchedType}` : `${result.typeCount} types`}
                  </span>
                </Link>
              </li>
            ))
          ) : (
            <li className="px-4 py-3 text-sm text-muted">No product found — try “box” or “card”.</li>
          )}
        </ul>
      )}
    </div>
  );
}
