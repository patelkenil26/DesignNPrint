import type { MetadataRoute } from 'next';
import { siteConfig } from '@/data/siteConfig';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: `${siteConfig.name} — Printing & Packaging, Ahmedabad`,
    short_name: siteConfig.name,
    description: 'Offset printing and packaging press in Ahmedabad.',
    lang: 'en-IN',
    start_url: '/',
    scope: '/',
    display: 'browser',
    categories: ['business', 'shopping'],
    background_color: '#f4f2ee',
    theme_color: '#101114',
    icons: [
      { src: '/icon.png', sizes: '256x256', type: 'image/png', purpose: 'any' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png', purpose: 'any' },
    ],
    shortcuts: [
      { name: 'Get a quote', short_name: 'Quote', url: '/contact' },
      { name: 'All products', short_name: 'Products', url: '/services' },
    ],
  };
}
