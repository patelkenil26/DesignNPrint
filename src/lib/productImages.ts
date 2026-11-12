import 'server-only';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { slugifyTypeName, type Product, type ProductType } from '@/data/productCatalog';

/**
 * Picks real product photos by file-name convention so the client only has to drop files in:
 *   public/images/products/<product-slug>/cover.(jpg|jpeg|png|webp|avif)
 *   public/images/products/<product-slug>/<type-slug>.(jpg|jpeg|png|webp|avif)
 * Anything missing returns `null` and the UI shows a designed graphic panel instead of a broken image.
 */
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'avif'];

function findPublicImage(folder: string, baseName: string): string | null {
  for (const extension of IMAGE_EXTENSIONS) {
    const relativePath = `images/products/${folder}/${baseName}.${extension}`;
    if (existsSync(path.join(process.cwd(), 'public', relativePath))) return `/${relativePath}`;
  }
  return null;
}

export function getProductCover(product: Product): string | null {
  return findPublicImage(product.slug, 'cover');
}

export function getTypeImage(product: Product, type: ProductType): string | null {
  return findPublicImage(product.slug, slugifyTypeName(type.name));
}
