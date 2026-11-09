import { findServiceArea, serviceAreas } from '@/data/serviceAreas';
import { buildAreaMarkdown } from '@/lib/llmsContent';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ area: area.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ area: string }> }) {
  const { area: areaSlug } = await params;
  const area = findServiceArea(areaSlug);
  if (!area) return new Response('Not found', { status: 404 });

  return new Response(buildAreaMarkdown(area), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
