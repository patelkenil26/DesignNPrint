# SEO — what is built and what needs a human

## Built into the site (all generated from `siteConfig`, `productCatalog`, `serviceAreas`)
- Metadata: `metadataBase`, canonical, Open Graph and Twitter on every page (`src/lib/seo.ts`).
- Share cards: generated per page — site (`src/app/opengraph-image.tsx`), product, area (`src/lib/ogImage.tsx`).
- `/robots.txt`, `/sitemap.xml` (home, services, 17 products, areas, about, contact, legal) and `/manifest.webmanifest`.
- JSON-LD: LocalBusiness + WebSite (every page), Service + Breadcrumb (products, areas), FAQPage (via `FaqAccordion`), About/Contact page.
- `/llms.txt` and `/llms-full.txt` — generated from the site data, never edit by hand (`src/lib/llmsContent.ts`).
- `/areas` + 11 area pages (`src/data/serviceAreas.ts`) — add a new area by adding one object.

## One-time setup (owner's accounts — cannot be done from code)
1. **Search Console** — add the property `https://designnprint.in` (URL prefix) → choose "HTML tag" → copy the `content` value
   → set env var `GOOGLE_SITE_VERIFICATION` on the host → redeploy → Verify → Sitemaps → submit `sitemap.xml`.
2. **Bing Webmaster Tools** — add site (or import from Search Console) → set `BING_SITE_VERIFICATION` if using the meta tag → submit `sitemap.xml`.
3. **Google Business Profile** — make sure the website field is `https://designnprint.in`, categories include "Printing service" /
   "Commercial printer", hours match `siteConfig.workingHours`, add product photos. The site already links the profile
   (`siteConfig.googleProfileUrl`) and the review form (`siteConfig.googleReviewUrl`).
4. Ask happy customers for Google reviews via the "Leave a review" button on the home page.

## Do not add until it is real
- `aggregateRating` / review schema — home-page reviews are still placeholders (`customerReviews` in `homeData.ts`).
  Replace them with the client's real Google reviews first, otherwise this breaks Google's structured-data policy.
- Machinery, MOQ, payment-mode or rating claims in `llms-full.txt` — add to the data files only after the client confirms.

## Still open
- Confirm one email address (`siteConfig.email`) — the old llms.txt used a different one.
- Replace placeholder reviews with real ones, then add `aggregateRating` to `buildLocalBusinessSchema`.

## AEO / GEO / LLM (answer engines + AI assistants)
Built in:
- **Answer-first copy:** every product page opens with a "Where can I get X printed in Ahmedabad?" block (one citable paragraph + facts list), marked `data-speakable`.
- **Structured data per page:** WebPage (with `dateModified` + speakable), Service, HowTo (order process), FAQPage, BreadcrumbList, ItemList on `/services`; business entity has `alternateName`, `slogan`, `knowsAbout`, `sameAs`.
- **Markdown twins:** `/services/<slug>.md` and `/areas/<slug>.md` (clean text for AI agents, canonical header set), advertised in `llms.txt` and via `<link rel="alternate" type="text/markdown">`.
- **`/llms.txt`, `/llms-full.txt`:** generated from site data, include FAQs and the update date.
- **robots.txt:** explicit allow for GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended and others. To block one, remove it from `aiCrawlers` in `src/app/robots.ts`.
- **Freshness:** bump `siteConfig.contentLastUpdated` whenever content changes (feeds sitemap, schema, llms files).

Off-site (what AI assistants actually cite — needs the owner):
1. Keep name / address / phone identical everywhere: Google Business Profile, Facebook, Instagram, JustDial, IndiaMART, Sulekha, TradeIndia.
2. Real Google reviews with the service named in them ("visiting cards", "pharma cartons") — the main local-ranking and AI-citation signal.
3. Get listed in 2–3 Ahmedabad / Gujarat printing and packaging directories and the GIDC / industry association pages, linking to designnprint.in.
4. Publish 1–2 genuine how-to or case-study posts a month (e.g. "Choosing a carton for tablets") — answer engines quote specific, useful pages.
