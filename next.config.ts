import type { NextConfig } from "next";
import { legacyRedirects } from "./src/data/legacyRedirects";

const nextConfig: NextConfig = {
  async redirects() {
    return legacyRedirects.map((redirect) => ({ ...redirect, permanent: true }));
  },
  async rewrites() {
    // clean markdown twins of product and area pages for AI crawlers: /services/box.md, /areas/morbi.md
    return {
      beforeFiles: [
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
