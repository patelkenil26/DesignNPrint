import { findProduct, productCatalog } from '@/data/productCatalog';
import { buildProductMarkdown } from '@/lib/llmsContent';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return productCatalog.map((product) => ({ product: product.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ product: string }> }) {
  const { product: productSlug } = await params;
  const product = findProduct(productSlug);
  if (!product) return new Response('Not found', { status: 404 });

  return new Response(buildProductMarkdown(product), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
