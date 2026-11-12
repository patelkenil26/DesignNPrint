/**
 * Tell Bing, Yandex and other IndexNow engines that pages are new or changed — they re-crawl within hours
 * instead of weeks. Run AFTER the site is deployed:
 *
 *   node scripts/indexnow.mjs                 # submit every URL in the live sitemap
 *   node scripts/indexnow.mjs /guides /about   # submit only these paths
 *
 * The key lives in `siteConfig.indexNowKey` and is served at https://designnprint.in/<key>.txt (public/).
 */
import { readFileSync } from 'node:fs';

const siteConfigSource = readFileSync(new URL('../src/data/siteConfig.ts', import.meta.url), 'utf8');
const siteUrl = siteConfigSource.match(/siteUrl:\s*'([^']+)'/)?.[1];
const indexNowKey = siteConfigSource.match(/indexNowKey:\s*'([^']+)'/)?.[1];

if (!siteUrl || !indexNowKey) {
  console.error('Could not read siteUrl / indexNowKey from src/data/siteConfig.ts');
  process.exit(1);
}

/** every <loc> in the live sitemap */
async function readSitemapUrls() {
  const response = await fetch(`${siteUrl}/sitemap.xml`);
  if (!response.ok) throw new Error(`sitemap.xml returned ${response.status} — is the site deployed?`);
  const xml = await response.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

async function submitToIndexNow() {
  const requestedPaths = process.argv.slice(2);
  const urlList = requestedPaths.length
    ? requestedPaths.map((path) => new URL(path, siteUrl).toString())
    : await readSitemapUrls();

  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: new URL(siteUrl).host,
      key: indexNowKey,
      keyLocation: `${siteUrl}/${indexNowKey}.txt`,
      urlList,
    }),
  });

  // 200 = accepted, 202 = accepted and key validation pending — both are fine
  if (response.status === 200 || response.status === 202) {
    console.log(`IndexNow accepted ${urlList.length} URL(s) (HTTP ${response.status}).`);
    return;
  }
  throw new Error(`IndexNow rejected the request: HTTP ${response.status} ${await response.text()}`);
}

submitToIndexNow().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
