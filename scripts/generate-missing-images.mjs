/**
 * Generates every product "type" photo that is still missing, a few at a time.
 *
 *   node scripts/generate-missing-images.mjs                 → all missing images
 *   node scripts/generate-missing-images.mjs brochure box    → only these product slugs
 *   node scripts/generate-missing-images.mjs --dry-run       → just list what would be generated
 *   node scripts/generate-missing-images.mjs --concurrency=2
 *
 * Safe to re-run: existing images are skipped, so an interrupted batch simply resumes.
 * Each image is made by scripts/generate-product-image.mjs (Magnific API key from .env.local).
 */
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { productCatalog, slugifyTypeName } from '../src/data/productCatalog.ts';
import { productImagePrompts } from './product-image-prompts.mjs';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const extensions = ['jpg', 'jpeg', 'png', 'webp', 'avif'];
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const concurrencyArg = args.find((value) => value.startsWith('--concurrency='));
const concurrency = concurrencyArg ? Number(concurrencyArg.split('=')[1]) : 3;
const onlySlugs = args.filter((value) => !value.startsWith('--'));

const hasImage = (slug, baseName) =>
  extensions.some((extension) => existsSync(path.join(projectRoot, 'public', 'images', 'products', slug, `${baseName}.${extension}`)));

const jobs = [];
const missingPrompts = [];
for (const product of productCatalog) {
  if (onlySlugs.length && !onlySlugs.includes(product.slug)) continue;
  for (const type of product.types) {
    const fileName = slugifyTypeName(type.name);
    if (hasImage(product.slug, fileName)) continue;
    if (!productImagePrompts[product.slug]?.[fileName]) {
      missingPrompts.push(`${product.slug}/${fileName}`);
      continue;
    }
    jobs.push({ productSlug: product.slug, fileName });
  }
}

console.log(`${jobs.length} image(s) to generate, concurrency ${concurrency}.`);
if (missingPrompts.length) console.log(`No prompt written yet for: ${missingPrompts.join(', ')}`);
if (isDryRun) {
  jobs.forEach((job) => console.log(`  ${job.productSlug}/${job.fileName}`));
  process.exit(0);
}

function runJob({ productSlug, fileName }) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [path.join(projectRoot, 'scripts', 'generate-product-image.mjs'), productSlug, fileName], {
      cwd: projectRoot,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let lastLine = '';
    const remember = (chunk) => {
      const lines = chunk.toString().trim().split(/\r?\n/);
      lastLine = lines[lines.length - 1] ?? lastLine;
    };
    child.stdout.on('data', remember);
    child.stderr.on('data', remember);
    child.on('close', (code) => {
      const ok = code === 0 && hasImage(productSlug, fileName);
      console.log(`${ok ? 'OK    ' : 'FAILED'} ${productSlug}/${fileName}${ok ? '' : ` — ${lastLine}`}`);
      resolve(ok);
    });
  });
}

let nextIndex = 0;
let failedCount = 0;
async function worker() {
  while (nextIndex < jobs.length) {
    const job = jobs[nextIndex];
    nextIndex += 1;
    if (!(await runJob(job))) failedCount += 1;
  }
}

await Promise.all(Array.from({ length: Math.min(concurrency, jobs.length) }, worker));
console.log(`Done. ${jobs.length - failedCount} generated, ${failedCount} failed.`);
process.exitCode = failedCount ? 1 : 0;
