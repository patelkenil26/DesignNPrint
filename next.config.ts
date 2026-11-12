import type { NextConfig } from "next";
import { legacyRedirects } from "./src/data/legacyRedirects";

const nextConfig: NextConfig = {
  // no "X-Powered-By: Next.js" banner
  poweredByHeader: false,
  images: {
    // AVIF first, WebP fallback — smaller photos, better LCP
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    return legacyRedirects.map((redirect) => ({ ...redirect, permanent: true }));
  },
  async rewrites() {
    // clean markdown twins of product and area pages for AI crawlers: /services/box.md, /areas/morbi.md
    return {
      beforeFiles: [
        // content negotiation: agents sending "Accept: text/markdown" get the markdown twin of the same URL
        { source: '/services/:product', has: [{ type: 'header', key: 'accept', value: '(.*)text/markdown(.*)' }], destination: '/llm/services/:product' },
        { source: '/areas/:area', has: [{ type: 'header', key: 'accept', value: '(.*)text/markdown(.*)' }], destination: '/llm/areas/:area' },
        { source: '/services/:product.md', destination: '/llm/services/:product' },
        { source: '/areas/:area.md', destination: '/llm/areas/:area' },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "all, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
          },
          {
            key: "Content-Signal",
            value: "search=yes, ai-train=yes",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'; base-uri 'self'; object-src 'none'" },
          // agent discovery (RFC 8288): where the plain-text site summary and the sitemap live
          { key: "Link", value: '</llms.txt>; rel="describedby"; type="text/plain", </sitemap.xml>; rel="sitemap"; type="application/xml"' },
        ],
      },
      {
        source: "/services/:product.md",
        headers: [{ key: "Link", value: '<https://designnprint.in/services/:product>; rel="canonical"' }],
      },
      {
        source: "/areas/:area.md",
        headers: [{ key: "Link", value: '<https://designnprint.in/areas/:area>; rel="canonical"' }],
      },
      {
        source: "/llms.txt",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/llms-full.txt",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
