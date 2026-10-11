// Builds promo thumbnails from the game's own art: link preview (1200×630), square (1080) and
// landscape video thumbnail (1920×1080). Titles are drawn as vector outlines from Lilita One
// (scripts/fonts, OFL licence) so they render the same everywhere.
// Run:  npm run thumbnail   → public/og-image.png, thumbnail-1080/1920.png, play-feature-graphic.png (Play Store)
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

// Outlined title: dark outline and drop, filled with a gradient (or flat colour).
function title(text, cx, baseline, size, fill = 'url(#gold)') {
  const p = font.getPath(text, 0, 0, size), bb = p.getBoundingBox();
  const d = font.getPath(text, cx - (bb.x2 - bb.x1) / 2 - bb.x1, baseline, size).toPathData(2), w = Math.max(5, size * 0.1);
  return `<path d="${d}" fill="#140E0C" stroke="#140E0C" stroke-width="${w * 2}" stroke-linejoin="round" transform="translate(0 ${size * 0.07})" opacity=".85"/>
  <path d="${d}" fill="none" stroke="#2B1E18" stroke-width="${w * 2}" stroke-linejoin="round"/>
  <path d="${d}" fill="${fill}"/>`;
}
const rays = (cx, cy, r, n) => Array.from({ length: n }, (_, i) => {
  const a1 = (i / n) * Math.PI * 2, a2 = a1 + Math.PI / n * 0.55;
  return `<path d="M${cx} ${cy}L${cx + Math.cos(a1) * r} ${cy + Math.sin(a1) * r}L${cx + Math.cos(a2) * r} ${cy + Math.sin(a2) * r}Z"/>`;
}).join('');
const embers = (W, H, n) => Array.from({ length: n }, (_, i) => `<circle cx="${(i * 977) % W}" cy="${(i * 613) % H}" r="${2 + (i % 4) * 1.6}" fill="#FFC56B" opacity="${0.35 + (i % 5) * 0.12}" filter="url(#glow)"/>`).join('');

// Cinematic poster: dusk sky, sun and rays, rim-lit hero facing a looming boss, VS, title.
function scene(W, H, o) {
  const ground = Math.round(H * 0.82), sunX = W * 0.5, sunY = H * 0.6;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  ${defs}
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1E1530"/><stop offset=".45" stop-color="#7A2E4A"/><stop offset=".75" stop-color="#E5743A"/><stop offset="1" stop-color="#FFC96B"/></linearGradient>
    <radialGradient id="sunG"><stop offset="0" stop-color="#FFF6D0"/><stop offset=".35" stop-color="#FFD27A"/><stop offset=".7" stop-color="#FF9A48" stop-opacity=".55"/><stop offset="1" stop-color="#FF9A48" stop-opacity="0"/></radialGradient>
    <radialGradient id="vig" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".62"/></radialGradient>
    <radialGradient id="bossGlow"><stop offset="0" stop-color="#FF3B2F" stop-opacity=".75"/><stop offset="1" stop-color="#FF3B2F" stop-opacity="0"/></radialGradient>
    <radialGradient id="heroGlow"><stop offset="0" stop-color="#FFE7A0" stop-opacity=".85"/><stop offset="1" stop-color="#FFE7A0" stop-opacity="0"/></radialGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF6C8"/><stop offset=".55" stop-color="#FFD65A"/><stop offset="1" stop-color="#F08A2A"/></linearGradient>
    <linearGradient id="cream" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#FFE6C2"/></linearGradient>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter>
    <filter id="soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="22"/></filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  <g fill="#FFE2A0" opacity=".16">${rays(sunX, sunY, Math.max(W, H), 28)}</g>
  <circle cx="${sunX}" cy="${sunY}" r="${H * 0.42}" fill="url(#sunG)"/>
  <path d="M0 ${ground - H * 0.2} L${W * 0.12} ${ground - H * 0.34} L${W * 0.24} ${ground - H * 0.22} L${W * 0.38} ${ground - H * 0.4} L${W * 0.55} ${ground - H * 0.24} L${W * 0.72} ${ground - H * 0.38} L${W * 0.86} ${ground - H * 0.2} L${W} ${ground - H * 0.3} V${H} H0Z" fill="#3A1F35" opacity=".85"/>
  <path d="M0 ${ground - H * 0.06} Q${W * 0.3} ${ground - H * 0.16} ${W * 0.55} ${ground - H * 0.07} T${W} ${ground - H * 0.09} V${H} H0Z" fill="#24131F"/>
  <rect x="0" y="${ground}" width="${W}" height="${H - ground}" fill="#160C12"/>
  <ellipse cx="${o.boss.x + o.boss.w / 2}" cy="${o.boss.y + o.boss.w * 0.55}" rx="${o.boss.w * 0.62}" ry="${o.boss.w * 0.6}" fill="url(#bossGlow)"/>
  ${place(art.kudanil, o.boss.x, o.boss.y, o.boss.w, [0, 0, 200, 200], true)}
  ${o.side ? place(art[o.side.kind], o.side.x, o.side.y, o.side.w, [0, 0, 200, 200], o.side.flip) : ''}
  <ellipse cx="${o.hero.x + o.hero.w / 2}" cy="${o.hero.y + o.hero.w * 0.55}" rx="${o.hero.w * 0.6}" ry="${o.hero.w * 0.62}" fill="url(#heroGlow)" filter="url(#soft)"/>
  ${place(art.hero, o.hero.x, o.hero.y, o.hero.w, [-10, 0, 220, 230])}
  ${title('VS', o.vs.x, o.vs.y, o.vs.size, '#FF5A3A')}
  ${embers(W, H, Math.round(W / 40))}
  <rect width="${W}" height="${H}" fill="url(#vig)"/>
  ${title('Petualangan', W / 2, o.titleY, o.titleSize * 0.6)}
  ${title('Santoni', W / 2, o.titleY + o.titleSize * 0.92, o.titleSize, 'url(#cream)')}
  ${o.subY ? `<rect x="${W / 2 - 250}" y="${o.subY - 44}" width="500" height="64" rx="20" fill="#D2532A" stroke="#2B1E18" stroke-width="5"/>${title('MAIN GRATIS SEKARANG', W / 2, o.subY + 4, 36, '#FFF8EC')}` : ''}
</svg>`;
}

const jobs = [
  ['play-feature-graphic.png', 1024, 500, { titleSize: 118, titleY: 100, hero: { x: 200, y: 190, w: 280 }, boss: { x: 560, y: 120, w: 400 }, vs: { x: 512, y: 380, size: 92 } }],
  ['og-image.png', 1200, 630, { titleSize: 140, titleY: 120, hero: { x: 250, y: 250, w: 330 }, boss: { x: 640, y: 170, w: 470 }, vs: { x: 600, y: 470, size: 110 } }],
  ['thumbnail-1080.png', 1080, 1080, { titleSize: 190, titleY: 180, subY: 1015, hero: { x: 110, y: 470, w: 470 }, boss: { x: 520, y: 360, w: 580 }, vs: { x: 560, y: 760, size: 140 }, side: { kind: 'merak', x: -40, y: 690, w: 260 } }],
  ['thumbnail-1920.png', 1920, 1080, { titleSize: 220, titleY: 210, subY: 1015, hero: { x: 470, y: 450, w: 500 }, boss: { x: 1020, y: 300, w: 680 }, vs: { x: 1000, y: 780, size: 170 }, side: { kind: 'angsa', x: 40, y: 600, w: 380 } }]
];
for (const [name, W, H, opts] of jobs) {
  await sharp(Buffer.from(scene(W, H, opts))).png({ compressionLevel: 9 }).toFile(path.join(ROOT, 'public', name));
  console.log('wrote', name);
}
