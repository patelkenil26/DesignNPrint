import type { MetadataRoute } from 'next';
import { siteConfig } from '@/data/siteConfig';

/**
 * Search engines and AI assistants are all welcome — being quoted in AI answers is a goal for a local
 * business. Each bot is listed explicitly so the intent is unambiguous (and easy to change one by one).
 */
const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Meta-ExternalAgent',
  'Amazonbot',
  'DuckAssistBot',
  'cohere-ai',
  'CCBot',
  'MistralAI-User',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/preview/'] },
      { userAgent: aiCrawlers, allow: '/', disallow: ['/api/', '/preview/'] },
    ],
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
    host: siteConfig.siteUrl,
  };
}
