'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MessageCircle, Search, X } from 'lucide-react';
import { findProduct, slugifyTypeName } from '@/data/productCatalog';
import { buildWhatsAppLink } from '@/data/siteConfig';
import { searchExamples, searchProducts } from '@/lib/productSearch';

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
  /** another name the visitor used, e.g. "dabba" */
  matchedAlias?: string;
}

/**
 * Live product search that forgives: misspellings ("vizeting card"), other names ("dabba", "challan", "hoarding"),
 * half-typed words and whole sentences all find the right product. When nothing fits well it still shows the
 * closest products and a one-tap WhatsApp request, so nobody hits a dead end.
 */
export default function SearchBox({ variant = 'desktop', onNavigate }: SearchBoxProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = variant === 'mobile';
  const trimmedTerm = searchTerm.trim();

  const { results, isApproximate } = useMemo(() => {
    const outcome = searchProducts(searchTerm);
    const mapped = outcome.hits.flatMap<SearchResult>((hit) => {
      const product = findProduct(hit.slug);
      if (!product) return [];
      return [{ slug: product.slug, name: product.name, typeCount: product.types.length, matchedType: hit.matchedType, matchedAlias: hit.matchedAlias }];
    });
    return { results: mapped, isApproximate: outcome.isApproximate };
  }, [searchTerm]);

  useEffect(() => {
    if (!searchTerm) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setSearchTerm('');
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [searchTerm]);

  const hrefFor = (result: SearchResult) =>
    result.matchedType ? `/services/${result.slug}#${slugifyTypeName(result.matchedType)}` : `/services/${result.slug}`;

  const handleResultClick = () => {
    setSearchTerm('');
    onNavigate?.();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') setSearchTerm('');
    if (event.key === 'Enter' && results[0]) {
      event.preventDefault();
      router.push(hrefFor(results[0]));
      handleResultClick();
    }
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
          onKeyDown={handleKeyDown}
          placeholder="Search products…"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="search"
          className={`rounded-full border border-white/15 bg-white/5 py-2 pl-10 pr-9 text-white placeholder:text-white/40 transition-all focus:border-brand-yellow focus:outline-none ${
            isMobile ? 'w-full py-3 text-base' : 'w-48 text-sm focus:w-60'
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

      {trimmedTerm && (
        <div
          className={`z-50 max-h-80 overflow-auto rounded-2xl bg-white py-2 text-ink shadow-2xl ring-1 ring-ink/10 ${
            isMobile ? 'mt-2 w-full' : 'absolute right-0 mt-2 w-80'
          }`}
          aria-live="polite"
        >
          {results.length > 0 ? (
            <>
              {isApproximate && <p className="px-4 pb-1 pt-1.5 text-xs font-semibold text-muted">Closest matches for “{trimmedTerm}”</p>}
              <ul>
                {results.map((result) => (
                  <li key={result.slug}>
                    <Link
                      href={hrefFor(result)}
                      onClick={handleResultClick}
                      className="block px-4 py-2.5 transition-colors hover:bg-paper focus-visible:bg-paper focus-visible:outline-none"
                    >
                      <span className="block text-sm font-semibold">{result.name}</span>
                      <span className="block text-xs text-muted">
                        {result.matchedType
                          ? `Type: ${result.matchedType}`
                          : result.matchedAlias
                            ? `Also called “${result.matchedAlias}” · ${result.typeCount} types`
                            : `${result.typeCount} types`}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="px-4 py-3">
              <p className="text-sm font-semibold">We could not find “{trimmedTerm}” — but we may still make it.</p>
              <p className="mt-1 text-xs text-muted">Try one of these, or tell us what you need.</p>
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {searchExamples.map((example) => (
                  <li key={example}>
                    <button
                      type="button"
                      onClick={() => setSearchTerm(example)}
                      className="rounded-full border border-ink/15 px-3 py-1 text-xs font-medium transition-colors hover:border-ink hover:bg-paper"
                    >
                      {example}
                    </button>
                  </li>
                ))}
              </ul>
              <a
                href={buildWhatsAppLink(`Hi Design N Print, I am looking for: ${trimmedTerm}.`)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleResultClick}
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-xs font-semibold text-ink transition-all hover:-translate-y-0.5 active:scale-95"
              >
                <MessageCircle className="h-3.5 w-3.5" /> Ask us on WhatsApp
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
