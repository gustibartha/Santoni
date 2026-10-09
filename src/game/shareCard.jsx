// Shareable image cards (1080×1920, the size of an Instagram/WhatsApp story): Santoni, the run's
// funniest line, a Wordle-style day strip and the game link. Drawn on a canvas; React and the
// character art are rendered to static SVG on demand, so none of this loads until someone shares.
import Santoni from '../characters/Santoni.jsx';
import SvgDefs from '../components/SvgDefs.jsx';

export const GAME_URL = 'https://santoni.vercel.app';
const W = 1080, H = 1920, INK = '#2B1E18', PAPER = '#FFF8EC';

// One square per day: a won fight, a bad day, a skill or a calm day; then how it ended.
export function dayStrip(entries, days, win) {
  const tone = {};
  for (const e of entries || []) {
    const rank = { win: 3, bad: 2, skill: 1 }[e.tone] || 0;
    if (e.day > 0 && (tone[e.day] == null || rank > tone[e.day])) tone[e.day] = rank;
  }
  let out = '';
  for (let d = 1; d <= days; d++) out += ['🟩', '🟪', '🟥', '🟨'][tone[d] || 0];
  return out + (win ? '🏆' : '💀');
}

async function santoniImage(pose) {
  const { renderToStaticMarkup } = await import('react-dom/server');
  const art = renderToStaticMarkup(<Santoni pose={pose} still />);
  const defs = (renderToStaticMarkup(<SvgDefs />).match(/<defs>[\s\S]*<\/defs>/) || [''])[0];
  const svg = art.match(/<svg[\s\S]*<\/svg>/)[0]
    .replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg" width="860" height="880"').replace('viewBox="0 0 200 220"', 'viewBox="-20 -12 240 246"')
    .replace(/(<svg[^>]*>)/, `$1${defs}`);
  const img = new Image();
  img.src = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
  await img.decode();
  return img;
}

function wrap(ctx, text, maxW) {
  const lines = [];
  let cur = '';
  for (const word of String(text).split(/\s+/)) {
    const next = cur ? `${cur} ${word}` : word;
    if (ctx.measureText(next).width > maxW && cur) { lines.push(cur); cur = word; } else cur = next;
  }
  if (cur) lines.push(cur);
  return lines;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}

/** @param {{ kicker: string, title: string, line: string, strip?: string, theme: object, pose?: string }} c */
export async function makeCard(c) {
  await Promise.all(["80px 'Lilita One'", "700 48px 'Bricolage Grotesque'", "500 30px 'DM Mono'"].map(f => document.fonts.load(f).catch(() => null)));
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  const t = c.theme;

  // Scenery: sky, glow, hills, ground.
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, t.sky); sky.addColorStop(0.62, '#FFF6E6'); sky.addColorStop(1, t.lHill);
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  const glow = ctx.createRadialGradient(890, 520, 10, 890, 520, 240);
  glow.addColorStop(0, 'rgba(255,240,180,.95)'); glow.addColorStop(1, 'rgba(255,240,180,0)');
  ctx.fillStyle = glow; ctx.fillRect(600, 260, 480, 520);
  ctx.lineWidth = 7; ctx.strokeStyle = INK;
  ctx.fillStyle = '#FFE27A'; ctx.beginPath(); ctx.arc(890, 520, 64, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.fillStyle = t.hill; ctx.beginPath(); ctx.moveTo(0, 1180);
  ctx.quadraticCurveTo(240, 1020, 520, 1130); ctx.quadraticCurveTo(800, 1020, 1080, 1120);
  ctx.lineTo(1080, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = t.ground; ctx.fillRect(0, 1300, W, H - 1300);
  ctx.beginPath(); ctx.moveTo(0, 1300); ctx.lineTo(W, 1300); ctx.stroke();

  // Header.
  ctx.fillStyle = INK; ctx.textAlign = 'center';
  ctx.font = "500 32px 'DM Mono', monospace";
  ctx.fillText('PETUALANGAN SANTONI', W / 2, 150);
  ctx.font = "92px 'Lilita One', system-ui";
  for (const [i, l] of wrap(ctx, c.title, 940).slice(0, 2).entries()) ctx.fillText(l, W / 2, 268 + i * 100);

  // Santoni.
  try { const img = await santoniImage(c.pose || 'seram'); ctx.drawImage(img, 110, 430, 860, 880); } catch { /* art is a bonus */ }

  // Quote card.
  ctx.font = "700 50px 'Bricolage Grotesque', system-ui";
  const lines = wrap(ctx, c.line, 820).slice(0, 4);
  const boxH = 120 + lines.length * 66, boxY = 1330;
  ctx.fillStyle = INK; roundRect(ctx, 80, boxY + 14, 920, boxH, 44); ctx.fill();
  ctx.fillStyle = PAPER; roundRect(ctx, 80, boxY, 920, boxH, 44); ctx.fill(); ctx.stroke();
  ctx.font = "500 30px 'DM Mono', monospace";
  const tagW = ctx.measureText(c.kicker).width + 56;
  ctx.fillStyle = '#D2532A'; roundRect(ctx, 130, boxY - 30, tagW, 64, 20); ctx.fill(); ctx.stroke();
  ctx.fillStyle = PAPER; ctx.fillText(c.kicker, 130 + tagW / 2, boxY + 13);
  ctx.fillStyle = INK; ctx.font = "700 50px 'Bricolage Grotesque', system-ui";
  lines.forEach((l, i) => ctx.fillText(l, W / 2, boxY + 104 + i * 66));

  // Day strip and link.
  if (c.strip) {
    ctx.font = "46px 'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif";
    const rows = [...c.strip].reduce((a, ch, i) => { (a[Math.floor(i / 12)] ||= []).push(ch); return a; }, []);
    rows.slice(0, 2).forEach((r, i) => ctx.fillText(r.join(''), W / 2, boxY + boxH + 92 + i * 58));
  }
  ctx.fillStyle = INK; ctx.font = "56px 'Lilita One', system-ui";
  ctx.fillText('santoni.vercel.app', W / 2, H - 52);

  return new Promise(res => canvas.toBlob(res, 'image/png'));
}

// Opens the share sheet with the card; where files can't be shared, saves the image and copies
// the text instead. Resolves to 'shared', 'saved' or 'cancelled'.
export async function shareCard(card, text) {
  const blob = await makeCard(card);
  const file = new File([blob], 'santoni.png', { type: 'image/png' });
  try {
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], text, title: 'Petualangan Santoni' });
      return 'shared';
    }
  } catch (e) {
    if (e && e.name === 'AbortError') return 'cancelled';
  }
  const url = URL.createObjectURL(blob), a = document.createElement('a');
  a.href = url; a.download = 'santoni.png'; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
  try { await navigator.clipboard.writeText(text); } catch { /* clipboard blocked */ }
  return 'saved';
}
