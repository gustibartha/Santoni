// Builds the PWA / home-screen icons from the game's own Santoni drawing.
// Run after changing the character art:  npm run app-icons
// Output: public/icons/*.png (any + maskable sizes, apple-touch-icon).
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public', 'icons');
fs.mkdirSync(OUT, { recursive: true });

// Render Santoni (front, stern pose) and the shared gradients to static SVG markup.
const entry = `
  import { renderToStaticMarkup } from 'react-dom/server';
  import Santoni from './src/characters/Santoni.jsx';
  import SvgDefs from './src/components/SvgDefs.jsx';
  export const art = renderToStaticMarkup(<Santoni pose="idle" still />);
  export const defs = renderToStaticMarkup(<SvgDefs />);
`;
const tmp = path.join(os.tmpdir(), 'santoni-icon-art.cjs');
await build({ stdin: { contents: entry, loader: 'jsx', resolveDir: ROOT }, bundle: true, outfile: tmp, format: 'cjs', platform: 'node', jsx: 'automatic', logLevel: 'silent' });
const mod = createRequire(import.meta.url)(tmp);
fs.rmSync(tmp, { force: true });
const inner = mod.art.match(/<svg[^>]*>([\s\S]*)<\/svg>/)[1];
const defs = (mod.defs.match(/<defs>[\s\S]*<\/defs>/) || [''])[0];

// Santoni (tail included) on a warm full-bleed tile, head centred so maskable crops keep the face.
const icon = (size, pad) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F7C24A"/><stop offset="1" stop-color="#D2532A"/></linearGradient></defs>
  <rect width="512" height="512" fill="url(#bg)"/>
  <circle cx="256" cy="226" r="190" fill="rgba(255,248,236,.22)"/>
  <svg x="${pad}" y="${Math.round(256 - 79 * (512 - pad * 2) / 216)}" width="${512 - pad * 2}" height="${512 - pad * 2}" viewBox="-4 4 216 216">${defs}${inner}</svg>
</svg>`;

const out = [
  ['icon-192.png', 192, 30], ['icon-512.png', 512, 30],
  ['maskable-512.png', 512, 70], ['apple-touch-icon.png', 180, 40]
];
for (const [name, size, pad] of out) {
  await sharp(Buffer.from(icon(size, pad))).resize(size, size).png().toFile(path.join(OUT, name));
  console.log('wrote', name);
}
