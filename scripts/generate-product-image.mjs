/**
 * Generates one product photo with the Magnific API (GPT Image 2) and saves it where the site expects it:
 *   public/images/products/<product-slug>/<file-name>.jpg
 *
 * Usage:   node scripts/generate-product-image.mjs <product-slug> <file-name> [--quality=high] [--resolution=2k]
 * Example: node scripts/generate-product-image.mjs visiting-card cover
 *
 * The API key is read from .env.local (MAGNIFIC_API_KEY) — never commit it.
 * Prompts live in scripts/product-image-prompts.mjs so the look stays consistent across products.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { productImagePrompts } from './product-image-prompts.mjs';

const apiBase = 'https://api.magnific.com/v1/ai/text-to-image/gpt-image-2';
const projectRoot = path.resolve(import.meta.dirname, '..');

async function loadEnvLocal() {
  try {
    const raw = await readFile(path.join(projectRoot, '.env.local'), 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
    }
  } catch {
    // no .env.local — the key may already be in the environment
  }
}

function readOption(name, fallback) {
  const arg = process.argv.find((value) => value.startsWith(`--${name}=`));
  return arg ? arg.split('=')[1] : fallback;
}

async function fetchWithRetry(url, options, attempts = 4) {
  for (let attempt = 1; ; attempt += 1) {
    try {
      return await fetch(url, options);
    } catch (error) {
      if (attempt >= attempts) throw error;
      console.log(`  network hiccup (${error.cause?.code ?? error.message}), retrying…`);
      await new Promise((resolve) => setTimeout(resolve, 3000 * attempt));
    }
  }
}

async function callMagnific(url, options = {}) {
  const response = await fetchWithRetry(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-magnific-api-key': process.env.MAGNIFIC_API_KEY,
      ...(options.headers ?? {}),
    },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`Magnific API ${response.status}: ${JSON.stringify(body)}`);
  }
  return body;
}

async function waitForTask(taskId) {
  for (let attempt = 1; attempt <= 60; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const { data } = await callMagnific(`${apiBase}/${taskId}`);
    console.log(`  [${attempt}] status: ${data.status}`);
    if (data.status === 'COMPLETED') return data.generated;
    if (data.status === 'FAILED') throw new Error(`Generation failed: ${JSON.stringify(data)}`);
  }
  throw new Error('Timed out waiting for the image (5 minutes).');
}

async function main() {
  await loadEnvLocal();
  const [productSlug, fileName] = process.argv.slice(2).filter((value) => !value.startsWith('--'));
  if (!process.env.MAGNIFIC_API_KEY) throw new Error('MAGNIFIC_API_KEY is missing — add it to .env.local');

  const prompt = productImagePrompts[productSlug]?.[fileName];
  if (!prompt) throw new Error(`No prompt for "${productSlug}/${fileName}" in scripts/product-image-prompts.mjs`);

  const quality = readOption('quality', 'high');
  const resolution = readOption('resolution', '2k');
  console.log(`Generating ${productSlug}/${fileName} (quality ${quality}, ${resolution})…`);

  // --task=<id> resumes a task that was already started (and billed) instead of creating a new one
  const resumeTaskId = readOption('task', '');
  const { data } = resumeTaskId
    ? { data: { task_id: resumeTaskId, generated: [] } }
    : await callMagnific(apiBase, {
    method: 'POST',
    body: JSON.stringify({
      prompt,
      num_images: 1,
      quality,
      resolution,
      aspect_ratio: 'classic_4_3',
      output_format: 'jpeg',
      output_compression: 92,
      background: 'opaque',
    }),
  });
  console.log(`  task ${data.task_id} started`);

  const imageUrls = data.generated?.length ? data.generated : await waitForTask(data.task_id);
  const imageResponse = await fetchWithRetry(imageUrls[0], {});
  if (!imageResponse.ok) throw new Error(`Could not download the image (${imageResponse.status})`);

  const outputDir = path.join(projectRoot, 'public', 'images', 'products', productSlug);
  await mkdir(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, `${fileName}.jpg`);
  await writeFile(outputPath, Buffer.from(await imageResponse.arrayBuffer()));
  console.log(`Saved ${path.relative(projectRoot, outputPath)}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
