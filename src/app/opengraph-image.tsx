import { ogImageContentType, ogImageSize, renderOgCard } from '@/lib/ogImage';

export const alt = 'Design N Print — printing and packaging press in Ahmedabad';
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function OpenGraphImage() {
  return renderOgCard({
    eyebrow: 'Designed and printed under one roof',
    title: 'Printing Press in Ahmedabad',
    subtitle: 'Boxes, visiting cards, brochures, stickers, pouches and packaging — since 2008.',
    accent: 'red',
  });
}
