import { productCatalog, type Product } from '@/data/productCatalog';
import { productSearchAliases, searchStopWords } from '@/data/searchAliases';

/**
 * Forgiving product search. It finds products when the visitor
 *  - misspells a word        ("vizeting card", "brochur", "stiker", "labal")
 *  - uses another name       ("dabba", "challan book", "hoarding", "thaili") — see `searchAliases.ts`
 *  - types only a bit of it  ("visi", "pamp")
 *  - joins or splits words   ("billbook", "letter head")
 *  - writes a whole sentence ("mujhe 500 visiting card chahiye")
 *  - types in Hindi or Gujarati for the common products.
 * Results are ranked; if nothing matches well it still returns the closest products (flagged approximate).
 */

export interface SearchHit {
  slug: string;
  /** 0–1, higher is a better match */
  score: number;
  /** set when the match came from one of the product's types rather than its name */
  matchedType?: string;
  /** set when the match came from another name for the product, e.g. "dabba" */
  matchedAlias?: string;
}

export interface SearchOutcome {
  hits: SearchHit[];
  /** true when nothing matched well and these are only the closest guesses */
  isApproximate: boolean;
}

/** A few words that work well — shown as "try" suggestions. */
export const searchExamples = ['visiting card', 'dabba', 'challan book', 'sticker', 'banner', 'thaili'] as const;

/** Words below this similarity do not count as a match. */
const MIN_TOKEN_SIMILARITY = 0.55;
const MIN_PRODUCT_SCORE = 0.25;
const MIN_APPROXIMATE_SCORE = 0.1;
/** A result must reach this share of the best result's score, so weak echoes do not trail a clear winner. */
const RELATIVE_SCORE_CUTOFF = 0.45;

interface Token {
  /** normalised, singular form */
  text: string;
  /** sound-alike form, so "kard" ≈ "card" and "stiker" ≈ "sticker" */
  sound: string;
  /** first letter + consonants only — a last-resort comparison */
  skeleton: string;
}

type TermKind = 'name' | 'alias' | 'type' | 'finish' | 'text';

interface Term {
  kind: TermKind;
  /** the phrase as written (type name or alias) */
  label: string;
  tokens: Token[];
  /** all tokens glued together, for "billbook" vs "bill book" */
  joined: Token;
  weight: number;
}

interface ProductIndex {
  product: Product;
  terms: Term[];
}

const termWeights: Record<TermKind, number> = { name: 1, alias: 0.9, type: 0.7, finish: 0.35, text: 0.2 };

const normalizeText = (text: string): string =>
  text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/\p{M}+/gu, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();

const toSingular = (word: string): string => {
  if (word.length > 4 && word.endsWith('ies')) return `${word.slice(0, -3)}y`;
  if (word.length > 4 && word.endsWith('es') && /(x|ch|sh|ss)es$/.test(word)) return word.slice(0, -2);
  if (word.length > 3 && word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1);
  return word;
};

const isLatin = (word: string): boolean => /^[a-z0-9]+$/.test(word);

function toSound(word: string): string {
  if (!isLatin(word)) return word;
  return word
    .replace(/ph/g, 'f')
    .replace(/ck/g, 'k')
    .replace(/q/g, 'k')
    .replace(/x/g, 'ks')
    .replace(/w/g, 'v')
    .replace(/z/g, 's')
    .replace(/c(?=[eiy])/g, 's')
    .replace(/c/g, 'k')
    .replace(/(.)\1+/g, '$1')
    .replace(/ee|ea|ie/g, 'i')
    .replace(/oo|ou|ew/g, 'u')
    .replace(/y$/, 'i');
}

const toSkeleton = (sound: string): string => (sound ? sound[0] + sound.slice(1).replace(/[aeiou]/g, '') : '');

function makeToken(word: string): Token {
  const text = toSingular(word);
  const sound = toSound(text);
  return { text, sound, skeleton: toSkeleton(sound) };
}

const tokenize = (phrase: string): string[] => normalizeText(phrase).split(' ').filter(Boolean);

function makeTerm(kind: TermKind, label: string): Term | null {
  const words = tokenize(label);
  if (words.length === 0) return null;
  return {
    kind,
    label,
    tokens: words.map(makeToken),
    joined: makeToken(words.join('')),
    weight: termWeights[kind],
  };
}

/** Edit distance that counts a swapped pair of letters ("barcode" / "bracode") as one mistake. */
function editDistance(first: string, second: string, limit: number): number {
  if (Math.abs(first.length - second.length) > limit) return limit + 1;
  const rows = first.length + 1;
  const columns = second.length + 1;
  const grid: number[][] = Array.from({ length: rows }, (_, row) => Array.from({ length: columns }, (_, column) => (row === 0 ? column : column === 0 ? row : 0)));
  for (let row = 1; row < rows; row += 1) {
    for (let column = 1; column < columns; column += 1) {
      const cost = first[row - 1] === second[column - 1] ? 0 : 1;
      grid[row][column] = Math.min(grid[row - 1][column] + 1, grid[row][column - 1] + 1, grid[row - 1][column - 1] + cost);
      if (row > 1 && column > 1 && first[row - 1] === second[column - 2] && first[row - 2] === second[column - 1]) {
        grid[row][column] = Math.min(grid[row][column], grid[row - 2][column - 2] + 1);
      }
    }
  }
  return grid[rows - 1][columns - 1];
}

/** How alike two words are, 0 (not at all) to 1 (same). */
function tokenSimilarity(query: Token, target: Token): number {
  if (query.text === target.text) return 1;
  if (query.sound === target.sound) return 0.95;
  if (query.text.length >= 2 && target.text.startsWith(query.text)) return 0.8 + 0.1 * (query.text.length / target.text.length);
  if (query.text.length >= 3 && target.text.includes(query.text)) return 0.6;
  // short words must be spelled right ("card" is not "carry"); longer words may slip by a letter or two
  if (query.sound.length >= 5) {
    const allowed = query.sound.length >= 8 ? 2 : 1;
    const distance = editDistance(query.sound, target.sound, allowed);
    if (distance <= allowed) return 0.85 - 0.15 * distance;
    // half-typed word with a slip: compare against the same-length start of the target
    if (target.sound.length > query.sound.length && editDistance(query.sound, target.sound.slice(0, query.sound.length), 1) <= 1) return 0.65;
  }
  // four-letter words: one wrong letter is fine when the start agrees ("cart" for "card")
  if (
    query.sound.length === 4 &&
    target.sound.length === 4 &&
    query.sound.slice(0, 2) === target.sound.slice(0, 2) &&
    editDistance(query.sound, target.sound, 1) <= 1
  ) {
    return 0.65;
  }
  if (query.skeleton.length >= 3 && query.skeleton === target.skeleton) return 0.6;
  return 0;
}

let cachedIndex: ProductIndex[] | null = null;

function getIndex(): ProductIndex[] {
  if (cachedIndex) return cachedIndex;
  cachedIndex = productCatalog.map((product) => {
    const terms: Term[] = [];
    const add = (kind: TermKind, label: string) => {
      const term = makeTerm(kind, label);
      if (term) terms.push(term);
    };
    add('name', product.name);
    (productSearchAliases[product.slug] ?? []).forEach((alias) => add('alias', alias));
    product.types.forEach((type) => add('type', type.name));
    product.finishes.forEach((finish) => add('finish', finish));
    tokenize(`${product.tagline} ${product.intro}`).forEach((word) => {
      if (word.length > 3 && !searchStopWords.has(word)) add('text', word);
    });
    return { product, terms };
  });
  return cachedIndex;
}

function scoreProduct(entry: ProductIndex, queryTokens: Token[], queryJoined: Token | null): SearchHit | null {
  let total = 0;
  let strongest = 0;
  let strongestTerm: Term | null = null;
  let nameStrength = 0;

  for (const queryToken of queryTokens) {
    let best = 0;
    let bestTerm: Term | null = null;
    for (const term of entry.terms) {
      for (const termToken of term.tokens) {
        const similarity = tokenSimilarity(queryToken, termToken);
        if (similarity < MIN_TOKEN_SIMILARITY) continue;
        const value = similarity * term.weight;
        if (value > best) {
          best = value;
          bestTerm = term;
        }
        if (term.kind === 'name') nameStrength = Math.max(nameStrength, value);
      }
    }
    total += best;
    if (best > strongest && bestTerm) {
      strongest = best;
      strongestTerm = bestTerm;
    }
  }

  let score = queryTokens.length > 0 ? total / queryTokens.length : 0;

  // "billbook" / "letter head": compare the whole query, glued, with each whole phrase, glued
  if (queryJoined && queryJoined.text.length >= 4) {
    for (const term of entry.terms) {
      if (term.kind === 'text' || term.kind === 'finish') continue;
      const similarity = tokenSimilarity(queryJoined, term.joined);
      if (similarity >= 0.75 && similarity * term.weight > score) {
        score = similarity * term.weight;
        strongestTerm = term;
        if (term.kind === 'name') nameStrength = Math.max(nameStrength, score);
      }
    }
  }

  if (score <= 0) return null;
  const hit: SearchHit = { slug: entry.product.slug, score };
  if (strongestTerm) {
    if (strongestTerm.kind === 'type' && nameStrength < score) hit.matchedType = strongestTerm.label;
    if (strongestTerm.kind === 'alias' && nameStrength < score) hit.matchedAlias = strongestTerm.label;
  }
  return hit;
}

/** Ranks the products for whatever the visitor typed. Never throws; an empty query returns no hits. */
export function searchProducts(query: string, limit = 6): SearchOutcome {
  const words = tokenize(query).filter((word) => word.length >= 2 || !isLatin(word));
  const meaningful = words.filter((word) => !searchStopWords.has(word) && !/^\d+$/.test(word));
  const queryWords = meaningful.length > 0 ? meaningful : words;
  if (queryWords.length === 0) return { hits: [], isApproximate: false };

  const queryTokens = queryWords.map(makeToken);
  const queryJoined = queryTokens.length > 1 || queryTokens[0].text.length >= 6 ? makeToken(queryWords.join('')) : null;

  const scored = getIndex()
    .map((entry) => scoreProduct(entry, queryTokens, queryJoined))
    .filter((hit): hit is SearchHit => hit !== null);
  const catalogOrder = (slug: string) => productCatalog.findIndex((product) => product.slug === slug);
  scored.sort((first, second) => second.score - first.score || catalogOrder(first.slug) - catalogOrder(second.slug));

  const good = scored.filter((hit) => hit.score >= MIN_PRODUCT_SCORE);
  if (good.length > 0) {
    const cutoff = good[0].score * RELATIVE_SCORE_CUTOFF;
    return { hits: good.filter((hit) => hit.score >= cutoff).slice(0, limit), isApproximate: false };
  }
  return { hits: scored.filter((hit) => hit.score >= MIN_APPROXIMATE_SCORE).slice(0, 3), isApproximate: true };
}
