/**
 * generate-og.mjs
 * ────────────────────────────────────────────────────────────────────
 * Converts public/og-image.svg → public/og-image.png  (1200 × 630 px)
 *
 * Run once before deploying:
 *   node scripts/generate-og.mjs
 *
 * Requires the `sharp` package:
 *   npm install -D sharp
 *
 * sharp uses libvips under the hood — it handles SVG → PNG natively
 * on all platforms (Windows, macOS, Linux) without needing a browser.
 * ────────────────────────────────────────────────────────────────────
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir  = dirname(fileURLToPath(import.meta.url));
const root   = join(__dir, '..');
const input  = join(root, 'public', 'og-image.svg');
const output = join(root, 'public', 'og-image.png');

// ── Verify input exists ──────────────────────────────────────────────
if (!existsSync(input)) {
  console.error('✗  og-image.svg not found at:', input);
  process.exit(1);
}

// ── Verify sharp is installed ────────────────────────────────────────
let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.error(
    '\n✗  sharp is not installed.\n' +
    '   Run:  npm install -D sharp\n' +
    '   Then re-run this script.\n'
  );
  process.exit(1);
}

// ── Convert ──────────────────────────────────────────────────────────
try {
  const svgBuffer = readFileSync(input);

  await sharp(svgBuffer, { density: 150 })   // density=150 → crisp text in SVG
    .resize(1200, 630, { fit: 'fill' })       // exact OG dimensions
    .png({ compressionLevel: 9, quality: 95 }) // high quality, still small
    .toFile(output);

  const { size } = await import('node:fs').then(m => m.promises.stat(output));
  const kb = (size / 1024).toFixed(1);

  console.log(`✓  og-image.png written  (${kb} KB)`);
  console.log(`   Path: ${output}`);
  console.log('');
  console.log('   Next step: update index.html');
  console.log('   Replace   OG_IMAGE_ABSOLUTE_URL');
  console.log('   With      https://YOURDOMAIN.com/og-image.png');
} catch (err) {
  console.error('✗  Conversion failed:', err.message);
  process.exit(1);
}
