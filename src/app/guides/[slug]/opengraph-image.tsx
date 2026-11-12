import { findGuide, guides } from '@/data/guides';
import { ogImageContentType, ogImageSize, renderOgCard } from '@/lib/ogImage';

export const alt = 'Design N Print printing guide share card';
export const size = ogImageSize;
export const contentType = ogImageContentType;

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export default async function GuideOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = findGuide(slug);
  return renderOgCard({
    eyebrow: guide ? `Guide · ${guide.eyebrow}` : 'Printing guide',
    // the <title> keyword phrase without the brand suffix — short enough to read in a chat preview
    title: guide ? guide.metaTitle.split(' | ')[0] : 'Printing & packaging guides',
    subtitle: guide?.summary,
    accent: 'blue',
  });
}
