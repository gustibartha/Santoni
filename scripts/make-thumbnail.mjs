// Builds promo thumbnails from the game's own art: link preview (1200×630), square (1080) and
// landscape video thumbnail (1920×1080). Titles are drawn as vector outlines from Lilita One
// (scripts/fonts, OFL licence) so they render the same everywhere.
// Run:  npm run thumbnail   → public/og-image.png, public/thumbnail-1080.png, public/thumbnail-1920.png
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import sharp from 'sharp';
import opentype from 'opentype.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const font = opentype.loadSync(path.join(ROOT, 'scripts/fonts/LilitaOne-Regular.ttf'));

const entry = `
  import { renderToStaticMarkup } from 'react-dom/server';
  import Santoni from './src/characters/Santoni.jsx';
  import Musuh from './src/characters/Musuh.jsx';
  import SvgDefs from './src/components/SvgDefs.jsx';
  export const hero = renderToStaticMarkup(<Santoni pose="idle" still />);
  export const angsa = renderToStaticMarkup(<Musuh kind="angsa" still />);
  export const kudanil = renderToStaticMarkup(<Musuh kind="kudanil" still />);
  export const merak = renderToStaticMarkup(<Musuh kind="merak" still />);
  export const defs = renderToStaticMarkup(<SvgDefs />);
`;
const tmp = path.join(os.tmpdir(), 'santoni-thumb-art.cjs');
await build({ stdin: { contents: entry, loader: 'jsx', resolveDir: ROOT }, bundle: true, outfile: tmp, format: 'cjs', platform: 'node', jsx: 'automatic', logLevel: 'silent' });
const art = createRequire(import.meta.url)(tmp);
fs.rmSync(tmp, { force: true });
const inner = html => html.match(/<svg[^>]*>([\s\S]*)<\/svg>/)[1];
const defs = (art.defs.match(/<defs>[\s\S]*<\/defs>/) || [''])[0];
// Places a drawing at (x, y) with width w; flip mirrors it to face left.
const place = (html, x, y, w, vb, flip) => { const h = w * vb[3] / vb[2], svg = `<svg x="0" y="0" width="${w}" height="${h}" viewBox="${vb.join(' ')}" overflow="visible">${inner(html)}</svg>`; return flip ? `<g transform="translate(${x + w} ${y}) scale(-1 1)">${svg}</g>` : `<g transform="translate(${x} ${y})">${svg}</g>`; };

// Outlined game-style title: dark stroke under a cream fill, centred on cx.
function title(text, cx, baseline, size, fill = '#FFF8EC') {
  const p = font.getPath(text, 0, 0, size), bb = p.getBoundingBox(), d = font.getPath(text, cx - (bb.x2 - bb.x1) / 2 - bb.x1, baseline, size).toPathData(2);
  const w = Math.max(6, size * 0.11);
  return `<path d="${d}" fill="#2B1E18" stroke="#2B1E18" stroke-width="${w * 2}" stroke-linejoin="round" transform="translate(0 ${size * 0.06})"/>
  <path d="${d}" fill="none" stroke="#2B1E18" stroke-width="${w * 2}" stroke-linejoin="round"/>
  <path d="${d}" fill="${fill}"/>`;
}

function scene(W, H, { titleSize, titleY, subY, hero, foes }) {
  const ground = Math.round(H * 0.8);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  ${defs}
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F7C24A"/><stop offset=".55" stop-color="#F3B49A"/><stop offset="1" stop-color="#E8A584"/></linearGradient>
    <radialGradient id="sun"><stop offset="0" stop-color="#FFF6C8"/><stop offset=".45" stop-color="#FFE9A0" stop-opacity=".55"/><stop offset="1" stop-color="#FFE9A0" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  <circle cx="${W * 0.5}" cy="${H * 0.62}" r="${H * 0.55}" fill="url(#sun)"/>
  <path d="M0 ${ground - H * 0.12} Q${W * 0.2} ${ground - H * 0.3} ${W * 0.45} ${ground - H * 0.14} Q${W * 0.7} ${ground - H * 0.32} ${W} ${ground - H * 0.16} V${H} H0Z" fill="#B5D7C2" stroke="#2B1E18" stroke-width="5"/>
  <rect x="0" y="${ground}" width="${W}" height="${H - ground}" fill="#9CCBB0"/>
  <path d="M0 ${ground}H${W}" stroke="#2B1E18" stroke-width="5"/>
  ${foes.map(f => place(art[f.kind], f.x, f.y, f.w, [0, 0, 200, 200], f.flip)).join('\n  ')}
  ${place(art.hero, hero.x, hero.y, hero.w, [-10, 0, 220, 230])}
  ${title('Petualangan', W / 2, titleY, titleSize * 0.62, '#F2B63C')}
  ${title('Santoni', W / 2, titleY + titleSize * 0.92, titleSize)}
  ${subY ? `<rect x="${W / 2 - 230}" y="${subY - 40}" width="460" height="60" rx="18" fill="#2B1E18"/>${title('Main gratis di browser', W / 2, subY + 2, 34, '#FFF8EC').replace(/stroke-width="[^"]+"/g, 'stroke-width="0"')}` : ''}
</svg>`;
}

const jobs = [
  ['og-image.png', 1200, 630, { titleSize: 150, titleY: 140, subY: 0, hero: { x: 440, y: 290, w: 320 }, foes: [{ kind: 'angsa', x: 860, y: 300, w: 290, flip: true }, { kind: 'merak', x: 60, y: 310, w: 270 }] }],
  ['thumbnail-1080.png', 1080, 1080, { titleSize: 200, titleY: 200, subY: 1020, hero: { x: 320, y: 470, w: 440 }, foes: [{ kind: 'kudanil', x: 690, y: 560, w: 380, flip: true }, { kind: 'merak', x: 10, y: 590, w: 330 }] }],
  ['thumbnail-1920.png', 1920, 1080, { titleSize: 230, titleY: 230, subY: 1020, hero: { x: 730, y: 500, w: 460 }, foes: [{ kind: 'kudanil', x: 1290, y: 470, w: 520, flip: true }, { kind: 'angsa', x: 140, y: 500, w: 470 }] }]
];
for (const [name, W, H, opts] of jobs) {
  await sharp(Buffer.from(scene(W, H, opts))).png({ compressionLevel: 9 }).toFile(path.join(ROOT, 'public', name));
  console.log('wrote', name);
}
