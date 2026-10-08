// Builds a self-hosted Material Symbols Rounded font containing only the icons the game uses.
// Run after adding a new icon name anywhere in src/:  npm run icons
// Output: src/assets/fonts/material-symbols-rounded.woff2 (+ the icon list). Vite fingerprints it,
// so browsers fetch the new file after every change instead of a stale cached one.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'src', 'assets', 'fonts');
const CODEPOINTS = 'https://raw.githubusercontent.com/google/material-design-icons/master/variablefont/MaterialSymbolsRounded%5BFILL%2CGRAD%2Copsz%2Cwght%5D.codepoints';
const CSS = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,600,1,0&display=block&icon_names=';
// A modern browser UA makes Google serve woff2.
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(d => (d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)]));
}

const words = new Set();
for (const file of walk(path.join(ROOT, 'src')).filter(f => /\.(jsx?|css)$/.test(f))) {
  for (const m of fs.readFileSync(file, 'utf8').matchAll(/[a-z][a-z0-9_]{2,}/g)) words.add(m[0]);
}
const known = new Set((await (await fetch(CODEPOINTS)).text()).split('\n').map(l => l.split(' ')[0]).filter(Boolean));
const icons = [...words].filter(w => known.has(w)).sort();

const css = await (await fetch(CSS + icons.join(','), { headers: { 'User-Agent': UA } })).text();
const url = (css.match(/src:\s*url\(([^)]+)\)/) || [])[1];
if (!url) throw new Error(`Google Fonts did not return a font URL:\n${css.slice(0, 400)}`);
const font = Buffer.from(await (await fetch(url)).arrayBuffer());

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, 'material-symbols-rounded.woff2'), font);
fs.writeFileSync(path.join(OUT_DIR, 'material-symbols-icons.txt'), icons.join('\n') + '\n');
console.log(`${icons.length} icons, ${(font.length / 1024).toFixed(1)} KB -> src/assets/fonts/material-symbols-rounded.woff2`);
