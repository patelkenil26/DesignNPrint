/**
 * Centralized Next.js Metadata Generator Helper
 * Enforces canonical URLs, OpenGraph, Twitter cards, and Geo-coordinates for local rankings.
 */

import type { Metadata } from "next";
import { siteConfig } from "./siteConfig";

export interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function constructMetadata({
  title,
  description,
  path,
  image = siteConfig.ogImageUrl,
  keywords = [],
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = `${siteConfig.siteUrl}${path}`;
  const fullTitle = path === "/" 
    ? `${siteConfig.siteName} - Commercial Printing & Packaging in Gujarat`
    : `${title} | ${siteConfig.siteName}`;

  const defaultKeywords = [
    "commercial printing ahmedabad",
    "offset printing press naroda",
    "packaging box manufacturers gujarat",
    "pharmaceutical medicine box printing",
    "rigid box manufacturer ahmedabad",
    "catalog brochure printing gujarat",
    "custom sticker label printing",
    "mono carton packaging gidc",
    "uv varnishing foil stamping ahmedabad",
    "design n print naroda",
  ];

  return {
    title: fullTitle,
    description,
    keywords: [...keywords, ...defaultKeywords],
    authors: [{ name: siteConfig.siteName, url: siteConfig.siteUrl }],
    creator: siteConfig.siteName,
    publisher: siteConfig.siteName,
    metadataBase: new URL(siteConfig.siteUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.siteName,
      images: [
        {
          url: image,
          width: 967,
          height: 259,
          alt: `${siteConfig.siteName} Commercial Printing & Packaging`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@designnprint",
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    other: {
      "geo.region": siteConfig.geo.region,
      "geo.placename": siteConfig.geo.placename,
      "geo.position": `${siteConfig.geo.latitude};${siteConfig.geo.longitude}`,
      ICBM: siteConfig.geo.icbm,
      "revisit-after": "7 days",
    },
  };
}
