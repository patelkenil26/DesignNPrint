import { getProductNumber, type Product, type ProductAccent, productCatalog } from '@/data/productCatalog';
import { getProductCover } from '@/lib/productImages';

/** Plain, serialisable card data — safe to pass from server pages into client components. */
export interface ProductCardData {
  slug: string;
  name: string;
  tagline: string;
  accent: ProductAccent;
  number: number;
  /** resolved cover photo, or null → a designed graphic panel is shown */
  image: string | null;
  coverAlt: string;
  typeNames: string[];
}

export function toProductCard(product: Product): ProductCardData {
  return {
    slug: product.slug,
    name: product.name,
    tagline: product.tagline,
    accent: product.accent,
    number: getProductNumber(product.slug),
    image: getProductCover(product),
    coverAlt: product.coverAlt,
    typeNames: product.types.map((type) => type.name),
  };
}

export function getAllProductCards(): ProductCardData[] {
  return productCatalog.map(toProductCard);
}
