# SEO Indexing Checklist — Design N Print

Site: https://designnprint.in
Code side (sitemap, robots, schema, canonical, llms.txt) is already done — see `docs/SEO.md`.
Is file me wo steps hain jo **tumhe apne accounts se karne hain** taaki Google / Bing / AI index kare.
Har step ke aage `[ ]` hai — kar do to `[x]` kar dena.

---

## 0. Pehle (deploy se pehle)
- [ ] `uat` branch ka SEO kaam `main` me merge karo aur production par deploy karo.
- [ ] Domain `designnprint.in` live hai aur HTTPS chal raha hai (http → https redirect).
- [ ] `www` aur non-`www` me se ek chuno; dusra 301 redirect karo (canonical `https://designnprint.in` hai).
- [ ] Ye URLs browser me khol ke check karo (200 aana chahiye):
  - [ ] https://designnprint.in/robots.txt
  - [ ] https://designnprint.in/sitemap.xml
  - [ ] https://designnprint.in/llms.txt
  - [ ] https://designnprint.in/services/box.md
- [ ] Koi page `noindex` nahi hai (View Source me `<meta name="robots" content="noindex">` nahi hona chahiye).

## 1. Google Search Console
- [ ] https://search.google.com/search-console → **Add property** → *URL prefix* → `https://designnprint.in`
      (ya *Domain* property agar DNS access hai — ye www + non-www + http/https sab cover karta hai).
- [ ] Verification:
  - Domain property → DNS TXT record add karo (domain registrar me).
  - URL prefix → "HTML tag" → `content` value copy karo → hosting me env var `GOOGLE_SITE_VERIFICATION` set karo → redeploy → **Verify**.
- [ ] **Sitemaps** → `sitemap.xml` submit karo. Status "Success" aana chahiye (35+ URLs discovered).
- [ ] **URL Inspection** → in important pages ko ek-ek karke daalo → **Request indexing**:
  - [ ] `/` (home)
  - [ ] `/services`
  - [ ] `/areas`
  - [ ] `/about`, `/contact`
  - [ ] Top products: `/services/visiting-card`, `/services/box`, `/services/brochure`, `/services/sticker`, `/services/pouch`
  - [ ] Top areas: `/areas/naroda-gidc`, `/areas/ahmedabad`
  (Daily limit hai — roz 5–10 URLs karo, baaki Google sitemap se khud utha lega.)
- [ ] 3–7 din baad **Pages** report dekho: "Indexed" vs "Not indexed" — reasons check karo.
- [ ] **Enhancements** section me Breadcrumbs / FAQ / Logo errors check karo (red errors fix karne hain).
- [ ] **Settings → Users** me team member / client ko add karo.

## 2. Bing Webmaster Tools (Bing + ChatGPT search + Copilot + DuckDuckGo ke liye zaroori)
- [ ] https://www.bing.com/webmasters → **Import from Google Search Console** (sabse aasan) ya manually site add karo.
- [ ] Manual verification ho to `BING_SITE_VERIFICATION` env var set karo → redeploy → Verify.
- [ ] **Sitemaps** me `https://designnprint.in/sitemap.xml` submit karo.
- [ ] **URL Submission** se important pages submit karo.
- [ ] (Optional) **IndexNow** enable karo — naye/updated pages Bing ko turant batane ke liye.

## 3. Google Business Profile (local ranking ke liye sabse important)
- [ ] https://business.google.com par profile claim / verify karo ("Design N Prints", Naroda).
- [ ] Website field = `https://designnprint.in` (UTM mat lagao).
- [ ] Primary category: **Commercial printer** / **Printing service**; secondary: Packaging company, Offset printing service, Screen printer (jo lagu ho).
- [ ] Hours site ke saath same: Mon–Sat 10:00–19:00, Sunday closed.
- [ ] Phone, address bilkul site jaisa (NAP same: naam, address, phone).
- [ ] Services / Products add karo (17 products ki list `src/data/productCatalog.ts` me hai).
- [ ] Kam se kam 10–15 real photos: press, machines, finished work, team.
- [ ] Description me "printing press in Naroda GIDC, Ahmedabad since 2008" likho (750 chars tak).
- [ ] Review link customers ko bhejo: `https://search.google.com/local/writereview?placeid=ChIJD_1aL2sKCGwRynL88rkay5s`
- [ ] Har review ka reply do. Target: 20+ real reviews, jisme service ka naam ho ("visiting card", "pharma box").
- [ ] Weekly 1 Google Post (new work / offer) daalo.

## 4. Citations / Directories (NAP bilkul same rakho)
- [ ] JustDial
- [ ] IndiaMART
- [ ] Sulekha
- [ ] TradeIndia
- [ ] Facebook page + Instagram bio me website link
- [ ] LinkedIn company page
- [ ] YouTube channel (press ke short videos) — description me website link
- [ ] Ahmedabad / Gujarat printing-packaging association ya GIDC directory (backlink)
- [ ] Apple Maps (Apple Business Connect) — iPhone users ke liye
- [ ] Bing Places (Bing Webmaster se import ho jata hai)

## 5. Backlinks / Authority (dheere dheere)
- [ ] Client ya supplier websites se "printing partner" mention + link maango.
- [ ] Local news / blogs me "Ahmedabad printing press" story ya guest post.
- [ ] Har naya project ka photo + short case-study blog (hamari site par) — fir social par share.

## 6. Content (index hone ke baad ranking ke liye)
- [ ] Real customer reviews `src/data/homeData.ts` me daalo (placeholder hatao) → phir `aggregateRating` schema add karwao.
- [ ] Har product page par real photos (134 images missing hain — `node scripts/image-manifest.mjs`).
- [ ] 1–2 blog / guide mahine me, jaise: "Tablet carton kaise choose karein", "Visiting card paper GSM guide".
- [ ] Content badle to `siteConfig.contentLastUpdated` (src/data/siteConfig.ts) update karo.

## 7. Tracking
- [ ] Google Analytics 4 property banao → site me add karwao (Measurement ID chahiye).
- [ ] Search Console ko GA4 se link karo.
- [ ] Contact / WhatsApp click ko conversion event banao.
- [ ] Google Business Profile → Performance me calls / direction requests dekho.

## 8. Monthly maintenance
- [ ] Search Console: Pages (indexing errors), Performance (top queries), Core Web Vitals.
- [ ] Lighthouse / PageSpeed Insights chalao (mobile) — 3D scenes ka load check karo.
- [ ] Broken links aur 404 check karo.
- [ ] Naye reviews ka reply, naye photos upload.
- [ ] Rank check: "printing press in Ahmedabad", "visiting card printing Ahmedabad", "box printing Naroda GIDC".

## 9. Common problems
| Problem | Kya karna hai |
|---|---|
| "Discovered – currently not indexed" | Internal links badhao, URL Inspection se request karo, 2–3 hafte ruko |
| "Crawled – currently not indexed" | Page ka content unique/useful banao, real photos add karo |
| "Duplicate, Google chose different canonical" | Canonical URL check karo, www/non-www redirect sahi karo |
| Sitemap "Couldn't fetch" | `/sitemap.xml` browser me khol ke check karo, deploy ho chuka ho |
| Rich result error | Search Console → Enhancements → error page kholo, schema fix karwao |

---
*Last updated: 2026-11-09*
