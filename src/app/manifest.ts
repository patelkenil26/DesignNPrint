import type { MetadataRoute } from 'next';
import { siteConfig } from '@/data/siteConfig';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — Printing & Packaging, Ahmedabad`,
    short_name: siteConfig.name,
    description: 'Offset printing and packaging press in Ahmedabad.',
    start_url: '/',
    display: 'browser',
    background_color: '#f4f2ee',
    theme_color: '#101114',
    icons: [{ src: '/favicon.png', sizes: 'any', type: 'image/png' }],
  };
}
