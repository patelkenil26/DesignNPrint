'use client';

import { useEffect } from 'react';
import { findProduct, productCatalog } from '@/data/productCatalog';
import { buildWhatsAppLink, siteConfig } from '@/data/siteConfig';
import { searchProducts } from '@/lib/productSearch';

/** Minimal shape of the WebMCP browser API (`navigator.modelContext`) — only present in agent-capable browsers. */
interface WebMcpTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: Record<string, unknown>) => Promise<{ content: Array<{ type: 'text'; text: string }> }>;
}

interface ModelContextApi {
  registerTool?: (tool: WebMcpTool) => void;
  unregisterTool?: (name: string) => void;
}

const toTextResult = (data: unknown) => ({ content: [{ type: 'text' as const, text: JSON.stringify(data) }] });

const webMcpTools: WebMcpTool[] = [
  {
    name: 'search_products',
    description: 'Find Design N Print products (visiting cards, boxes, stickers, brochures…) by name, alias or Hindi/Gujarati word.',
    inputSchema: { type: 'object', properties: { query: { type: 'string', description: 'What the customer wants printed' } }, required: ['query'] },
    execute: async (input) => {
      const { hits, isApproximate } = searchProducts(String(input.query ?? ''), 6);
      const results = hits.flatMap((hit) => {
        const product = findProduct(hit.slug);
        return product ? [{ name: product.name, summary: product.tagline, url: `${siteConfig.siteUrl}/services/${product.slug}` }] : [];
      });
      return toTextResult({ results, isApproximate });
    },
  },
  {
    name: 'list_products',
    description: 'List every product family Design N Print prints, with its page URL.',
    inputSchema: { type: 'object', properties: {} },
    execute: async () =>
      toTextResult(productCatalog.map((product) => ({ name: product.name, url: `${siteConfig.siteUrl}/services/${product.slug}` }))),
  },
  {
    name: 'get_contact_details',
    description: 'Address, phone / WhatsApp numbers, email and opening hours of the press in Ahmedabad.',
    inputSchema: { type: 'object', properties: {} },
    execute: async () =>
      toTextResult({
        name: siteConfig.name,
        address: siteConfig.addressLines.join(' '),
        phone: [siteConfig.phoneDisplay, siteConfig.secondaryPhoneDisplay],
        email: siteConfig.email,
        hours: siteConfig.workingHours,
        contactPage: `${siteConfig.siteUrl}/contact`,
      }),
  },
  {
    name: 'get_quote_link',
    description: 'Build a WhatsApp link that opens a pre-written quote request. The customer must open it and press send themselves.',
    inputSchema: {
      type: 'object',
      properties: { product: { type: 'string' }, quantity: { type: 'string' }, notes: { type: 'string' } },
      required: ['product'],
    },
    execute: async (input) => {
      const message = `Hi Design N Print, I would like a quote for ${String(input.product ?? 'printing')}${
        input.quantity ? `, quantity ${String(input.quantity)}` : ''
      }${input.notes ? `. ${String(input.notes)}` : '.'}`;
      return toTextResult({ whatsappUrl: buildWhatsAppLink(message) });
    },
  },
];

/**
 * Exposes read-only site tools to AI browsers through WebMCP (`navigator.modelContext`).
 * Renders nothing and does nothing in browsers without the API.
 */
export default function WebMcpTools() {
  useEffect(() => {
    const modelContext = (navigator as Navigator & { modelContext?: ModelContextApi }).modelContext;
    if (!modelContext?.registerTool) return;

    const registeredNames: string[] = [];
    try {
      for (const tool of webMcpTools) {
        modelContext.registerTool(tool);
        registeredNames.push(tool.name);
      }
    } catch (error) {
      console.warn('WebMCP tool registration failed', error);
    }

    return () => {
      registeredNames.forEach((name) => modelContext.unregisterTool?.(name));
    };
  }, []);

  return null;
}
