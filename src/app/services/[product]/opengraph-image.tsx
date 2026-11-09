import { findProduct, productCatalog } from '@/data/productCatalog';
import { ogImageContentType, ogImageSize, renderOgCard } from '@/lib/ogImage';

export const alt = 'Design N Print product share card';
export const size = ogImageSize;
export const contentType = ogImageContentType;

export function generateStaticParams() {
  return productCatalog.map((product) => ({ product: product.slug }));
}

export default async function ProductOpenGraphImage({ params }: { params: Promise<{ product: string }> }) {
  const { product: productSlug } = await params;
  const product = findProduct(productSlug);
  return renderOgCard({
    eyebrow: 'Printing in Ahmedabad',
    title: product ? product.name : 'Printing & packaging',
    subtitle: product ? `${product.tagline} ${product.types.length} types, designed and printed under one roof.` : undefined,
    accent: product?.accent ?? 'red',
  });
}
