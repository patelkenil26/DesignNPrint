import React from "react";

interface JsonLdProps {
  data: Record<string, any>;
}

/**
 * SSR Structured Data Injector
 * Injects Schema.org JSON-LD directly into HTML for search bots and AI crawlers.
 */
export default function JsonLd({ data }: JsonLdProps) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
