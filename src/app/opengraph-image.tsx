import { ogImageContentType, ogImageSize, renderOgCard } from '@/lib/ogImage';

export const alt = 'Design N Print — printing and packaging press in Ahmedabad';
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpenGraphImage() {
  return renderOgCard({
    eyebrow: 'Printing & packaging press',
    title: 'Designed and printed under one roof.',
    subtitle: 'Visiting cards, brochures, boxes, stickers, pouches and more — Naroda GIDC, Ahmedabad.',
    accent: 'red',
  });
}
