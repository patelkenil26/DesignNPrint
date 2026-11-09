import { findServiceArea, serviceAreas } from '@/data/serviceAreas';
import { ogImageContentType, ogImageSize, renderOgCard } from '@/lib/ogImage';

export const alt = 'Design N Print service area share card';
export const size = ogImageSize;
export const contentType = ogImageContentType;

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ area: area.slug }));
}

export default async function AreaOpenGraphImage({ params }: { params: Promise<{ area: string }> }) {
  const { area: areaSlug } = await params;
  const area = findServiceArea(areaSlug);
  return renderOgCard({
    eyebrow: 'Printing & packaging',
    title: area ? `Printing for ${area.name}` : 'Printing & packaging',
    subtitle: area?.intro.split('. ')[0],
    accent: 'blue',
  });
}
