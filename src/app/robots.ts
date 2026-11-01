import { MetadataRoute } from "next";
import { siteConfig } from "@/seo/siteConfig";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Search Engine Core Bots
      {
        userAgent: [
          "Googlebot",
          "Googlebot-Image",
          "Bingbot",
          "Slurp",
          "DuckDuckBot",
          "Baiduspider",
          "YandexBot",
        ],
        allow: "/",
      },
      // Dedicated AI Search & Citation Bots (AEO / GEO)
      // OAI-SearchBot, Claude-SearchBot, PerplexityBot directly govern citability in ChatGPT, Claude, and Perplexity
      {
        userAgent: [
          "OAI-SearchBot",
          "ChatGPT-User",
          "Claude-SearchBot",
          "Claude-User",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Applebot",
          "Applebot-Extended",
          "Meta-ExternalAgent",
          "GPTBot",
          "ClaudeBot",
          "Amazonbot",
        ],
        allow: "/",
      },
    ],
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}
