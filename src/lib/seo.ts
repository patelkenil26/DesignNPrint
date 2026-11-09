import type { Metadata } from 'next';
import { siteConfig } from '@/data/siteConfig';

export const defaultOgImage = '/images/HeroImage/slide1.jpg';

/** Absolute URL for a site path — used in sitemap, canonical and JSON-LD. */
export function absoluteUrl(path = '/'): string {
  return new URL(path, siteConfig.siteUrl).toString();
}

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
}

/** Page metadata with canonical + Open Graph + Twitter filled in consistently. */
export function buildPageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: 'website',
      siteName: siteConfig.name,
      locale: 'en_IN',
      images: [{ url: defaultOgImage, alt: `${siteConfig.name} — printing press in Ahmedabad` }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [defaultOgImage] },
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

/** The business itself — one canonical entity, referenced from every page via @id. */
export function buildLocalBusinessSchema() {
  const [streetLineOne, streetLineTwo] = siteConfig.addressLines;
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': absoluteUrl('/#business'),
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    description:
      'Offset printing and packaging press in Naroda GIDC, Ahmedabad — visiting cards, brochures, boxes, stickers, pouches and more, designed and printed under one roof since 2008.',
    foundingDate: String(siteConfig.foundedYear),
    telephone: `+${siteConfig.whatsappNumber}`,
    email: siteConfig.email,
    image: absoluteUrl('/favicon.png'),
    logo: absoluteUrl('/favicon.png'),
    priceRange: '₹₹',
    hasMap: siteConfig.mapsDirectionsUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${streetLineOne} ${streetLineTwo}`,
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      postalCode: '382330',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '19:00',
      },
    ],
    areaServed: { '@type': 'State', name: 'Gujarat' },
    sameAs: [siteConfig.facebookUrl, siteConfig.instagramUrl],
  };
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': absoluteUrl('/#website'),
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    publisher: { '@id': absoluteUrl('/#business') },
    inLanguage: 'en-IN',
  };
}
