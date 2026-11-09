'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { productCatalog } from '@/data/productCatalog';

/** Live service search shown in the desktop navbar. */
export default function SearchBox() {
  const [searchTerm, setSearchTerm] = useState('');

  const results = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return [];
    return productCatalog
      .filter(
        (product) =>
          product.name.toLowerCase().includes(term) || product.types.some((type) => type.name.toLowerCase().includes(term)),
      )
      .slice(0, 6);
  }, [searchTerm]);

  return (
    <div className="relative hidden xl:block">
      <label className="relative block">
        <span className="sr-only">Search products</span>
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search products…"
          className="w-48 rounded-full border border-white/15 bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder:text-white/40 transition-all focus:w-60 focus:border-brand-yellow focus:outline-none"
        />
      </label>

      {searchTerm.trim() && (
        <ul className="absolute right-0 mt-2 max-h-72 w-72 overflow-auto rounded-2xl bg-white py-2 text-ink shadow-2xl ring-1 ring-ink/10">
          {results.length > 0 ? (
            results.map((product) => (
              <li key={product.slug}>
                <Link
                  href={`/services/${product.slug}`}
                  onClick={() => setSearchTerm('')}
                  className="block px-4 py-2.5 transition-colors hover:bg-paper"
                >
                  <span className="block text-sm font-semibold">{product.name}</span>
                  <span className="block text-xs text-muted">{product.types.length} types</span>
                </Link>
              </li>
            ))
          ) : (
            <li className="px-4 py-3 text-sm text-muted">No product found</li>
          )}
        </ul>
      )}
    </div>
  );
}
