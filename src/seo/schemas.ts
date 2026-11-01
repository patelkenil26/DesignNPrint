/**
 * Centralized Schema.org Structured Data Generators
 * Validated against Schema.org 2026 specs & Google Rich Results guidelines.
 * Optimized for Generative Engine Optimization (GEO) & AI answer engines (ChatGPT, Perplexity, Gemini).
 */

import { siteConfig } from "./siteConfig";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ServiceSchemaData {
  name: string;
  description: string;
  url: string;
  image?: string;
  types?: string[];
  advantages?: string[];
}

/**
 * Root Graph Schema containing Organization + LocalBusiness + WebSite
 * Applied at the root layout level with unified @id references.
 */
export function getRootGraphSchema() {
  const orgId = `${siteConfig.siteUrl}/#organization`;
  const websiteId = `${siteConfig.siteUrl}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      // 1. Core Organization & Local Print Shop Entity
      {
        "@type": ["LocalBusiness", "PrintShop", "ProfessionalService"],
        "@id": orgId,
        name: siteConfig.siteName,
        legalName: siteConfig.legalName,
        url: siteConfig.siteUrl,
        logo: {
          "@type": "ImageObject",
          url: siteConfig.logoUrl,
          width: 967,
          height: 259,
        },
        image: siteConfig.ogImageUrl,
        telephone: siteConfig.telephone,
        email: siteConfig.email,
        priceRange: siteConfig.priceRange,
        currenciesAccepted: siteConfig.currenciesAccepted,
        paymentAccepted: siteConfig.paymentAccepted,
        foundingDate: "2008",
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address.streetAddress,
          addressLocality: siteConfig.address.addressLocality,
          addressRegion: siteConfig.address.addressRegion,
          postalCode: siteConfig.address.postalCode,
          addressCountry: siteConfig.address.addressCountry,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: siteConfig.geo.latitude,
          longitude: siteConfig.geo.longitude,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "10:00",
            closes: "19:00",
          },
        ],
        areaServed: siteConfig.areaServed.map((area) => ({
          "@type": "AdministrativeArea",
          name: area,
        })),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Commercial Printing and Packaging Services",
          itemListElement: siteConfig.capabilities.map((cap, i) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: cap,
            },
            position: i + 1,
          })),
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: siteConfig.rating.ratingValue,
          reviewCount: siteConfig.rating.reviewCount,
          bestRating: siteConfig.rating.bestRating,
          worstRating: siteConfig.rating.worstRating,
        },
        sameAs: Object.values(siteConfig.socialProfiles),
      },

      // 2. WebSite Entity with Potential Action Search
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.siteUrl,
        name: siteConfig.siteName,
        publisher: {
          "@id": orgId,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteConfig.siteUrl}/services?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
        inLanguage: "en-IN",
      },
    ],
  };
}

/**
 * BreadcrumbList Schema generator for navigational depth
 */
export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${siteConfig.siteUrl}${item.url}`,
    })),
  };
}

/**
 * Service / Product schema generator for dedicated product pages
 */
export function getServiceSchema(data: ServiceSchemaData) {
  const orgId = `${siteConfig.siteUrl}/#organization`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${data.url.startsWith("http") ? data.url : `${siteConfig.siteUrl}${data.url}`}#service`,
    name: data.name,
    description: data.description,
    url: data.url.startsWith("http") ? data.url : `${siteConfig.siteUrl}${data.url}`,
    image: data.image
      ? (data.image.startsWith("http") ? data.image : `${siteConfig.siteUrl}${data.image}`)
      : siteConfig.ogImageUrl,
    provider: {
      "@id": orgId,
    },
    areaServed: siteConfig.areaServed.slice(0, 5).map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
    serviceType: "Offset & Digital Commercial Printing",
    category: "Commercial Printing & Packaging",
    hasOfferCatalog: data.types && data.types.length > 0
      ? {
          "@type": "OfferCatalog",
          name: `${data.name} Variants & Finishes`,
          itemListElement: data.types.map((type, idx) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: type,
            },
            position: idx + 1,
          })),
        }
      : undefined,
  };
}

/**
 * FAQPage Schema generator for Q&A rich results & AI Overview citations
 */
export function getFaqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
