// Hand-drawn skill illustrations (64×64), matching ItemArt's outline style.
import { O, SHINE, star, Sparkles, Rope } from './ItemArt.jsx';

// Merged blob from overlapping circles: outlines first, fills on top, so only the silhouette is stroked.
function Blob({ circles, fill }) {
  return (
    <>
      {circles.map(([x, y, r], i) => <circle key={`o${i}`} cx={x} cy={y} r={r} fill={fill} strokeWidth="5.2" />)}
      {circles.map(([x, y, r], i) => <circle key={`f${i}`} cx={x} cy={y} r={r} fill={fill} stroke="none" />)}
    </>
  );
}
// Ring of alternating radii, for crinkly crackers and spiky fur.
const crimp = (cx, cy, r1, r2, n) => Array.from({ length: n * 2 }, (_, i) => {
  const a = (i / (n * 2)) * Math.PI * 2, r = i % 2 ? r2 : r1;
  return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
}).join(' ');
const Z = ({ x, y, s = 1 }) => <path d={`M${x} ${y}h${7 * s}l${-7 * s} ${7 * s}h${7 * s}`} fill="none" stroke={O} strokeWidth={2.4} />;
const bolt = (x, y, s = 1) => `M${x + 4 * s} ${y}L${x - 5 * s} ${y + 13 * s}H${x + 1 * s}L${x - 3 * s} ${y + 24 * s}L${x + 9 * s} ${y + 9 * s}H${x + 2 * s}L${x + 7 * s} ${y}Z`;

const ART = {
  cakar: () => (
    <>
      <ellipse cx="32" cy="42" rx="14" ry="12" fill="#D2532A" />
      {[[16, 28], [25, 19], [39, 19], [48, 28]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="6" fill="#D2532A" />)}
      {[[16, 21], [25, 12], [39, 12], [48, 21]].map(([x, y], i) => <path key={i} d={`M${x - 2.5} ${y + 2}L${x} ${y - 4}L${x + 2.5} ${y + 2}Z`} fill="#FFF8EC" strokeWidth="1.8" />)}
      <ellipse cx="32" cy="43" rx="7" ry="5.5" fill="#F3B49A" stroke="none" />
      <path d="M23 36q3-4 8-5" fill="none" stroke={SHINE} strokeWidth="2" />
    </>
  ),
  bulu: () => (
    <>
      <Blob fill="#F0A070" circles={[[22, 26, 11], [36, 20, 12], [46, 32, 11], [38, 44, 12], [22, 42, 11], [32, 32, 14]]} />
      <path d="M32 44C22 37 24 28 29 28c2 0 3 1 3 3c0-2 1-3 3-3c5 0 7 9-3 16Z" fill="#D2532A" strokeWidth="2.2" />
    </>
  ),
  kerupuk: () => (
    <>
      <path d="M6 28h7M4 36h8M7 44h6" fill="none" strokeWidth="2.2" />
      <polygon points={crimp(36, 34, 22, 19.5, 14)} fill="#F7D9B5" />
      {[[30, 27, 3], [42, 30, 2.4], [36, 41, 3.2], [27, 38, 2], [45, 41, 2]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill="#EDBE8C" stroke="none" />)}
      <path d="M24 24q4-5 10-6" fill="none" stroke={SHINE} strokeWidth="2.2" />
    </>
  ),
  kipas: () => (
    <>
      <path d="M50 44q7 1 10 6M54 32q6 0 8 4" fill="none" stroke="#3C78C8" strokeWidth="2.4" />
      {Array.from({ length: 6 }, (_, i) => {
        const a0 = (-95 + i * 15) * Math.PI / 180, a1 = (-80 + i * 15) * Math.PI / 180, R0 = 44, cx = 12, cy = 54;
        return <path key={i} d={`M${cx} ${cy}L${(cx + R0 * Math.cos(a0)).toFixed(1)} ${(cy + R0 * Math.sin(a0)).toFixed(1)}A${R0} ${R0} 0 0 1 ${(cx + R0 * Math.cos(a1)).toFixed(1)} ${(cy + R0 * Math.sin(a1)).toFixed(1)}Z`} fill={i % 2 ? '#D2532A' : '#F0A070'} />;
      })}
      <circle cx="12" cy="54" r="6" fill="#8E3418" />
    </>
  ),
  gertak: () => (
    <>
      <rect x="9" y="12" width="8" height="22" rx="4" transform="rotate(-24 13 30)" fill="#3A2420" />
      <rect x="47" y="12" width="8" height="22" rx="4" transform="rotate(24 51 30)" fill="#3A2420" />
      <ellipse cx="32" cy="46" rx="13" ry="14" fill="#D2532A" />
      <path d="M21 16l-1-10 9 6zM43 16l1-10-9 6z" fill="#FFF8EC" />
      <circle cx="32" cy="24" r="12" fill="#D2532A" />
      <ellipse cx="25" cy="28" rx="4" ry="3" fill="#FFF8EC" stroke="none" />
      <ellipse cx="39" cy="28" rx="4" ry="3" fill="#FFF8EC" stroke="none" />
      <path d="M25 22h5M34 22h5M30 31h4" fill="none" strokeWidth="2.4" />
      <path d="M32 40v10" fill="none" stroke="#5A3226" strokeWidth="6" />
    </>
  ),
  kritis: () => (
    <>
      <path d="M32 4v8M32 52v8M4 32h8M52 32h8" fill="none" stroke="#D2532A" strokeWidth="3" />
      <circle cx="32" cy="32" r="21" fill="none" stroke="#D2532A" strokeWidth="2.4" strokeDasharray="5 5" />
      <path d="M12 33Q32 14 52 33Q32 50 12 33Z" fill="#FFF8EC" />
      <circle cx="32" cy="33" r="6" fill={O} stroke="none" />
      <path d="M12 33Q32 14 52 33Q32 30 12 33Z" fill="#D2532A" />
      <circle cx="34" cy="35" r="1.6" fill="#FFF8EC" stroke="none" />
    </>
  ),
  ngemil: () => (
    <>
      <path d="M24 14q-3-4 0-8M33 12q-3-4 0-8" fill="none" stroke="#A8B4AE" strokeWidth="2.2" />
      <Rope d="M38 30L56 8M44 31L60 14" color="#E8C07A" w={2.6} />
      <path d="M17 31q4-6 8 0t8 0t8 0t8 0" fill="none" stroke="#F2B63C" strokeWidth="3.4" />
      <path d="M8 31h48q0 24-24 24T8 31Z" fill="#D2532A" />
      <path d="M8 31h48" fill="none" strokeWidth="2.6" />
      <path d="M14 39q3 8 12 10" fill="none" stroke={SHINE} strokeWidth="2.4" />
    </>
  ),
  tidur: () => (
    <>
      <path d="M38 10A22 22 0 1 0 54 44A18 18 0 1 1 38 10Z" fill="#F2B63C" />
      <path d="M24 22q-3 6-1 13" fill="none" stroke={SHINE} strokeWidth="2.2" />
      <Z x={44} y={10} /><Z x={53} y={20} s={0.7} />
      <path d={star(14, 52, 4)} fill="#FFF8EC" strokeWidth="1.6" />
    </>
  ),
  statis: () => (
    <>
      <polygon points={crimp(32, 34, 22, 15, 13)} fill="#F0A070" />
      <circle cx="32" cy="34" r="12" fill="#D2532A" stroke="none" />
      <path d={bolt(32, 18, 1.15)} fill="#FFE45C" />
    </>
  ),
  belang: () => (
    <>
      <circle cx="32" cy="32" r="28" fill="rgba(255,228,92,.45)" stroke="none" />
      <path d="M14 52Q6 30 22 16Q38 4 52 18" fill="none" stroke={O} strokeWidth="17" strokeLinecap="round" />
      <path d="M14 52Q6 30 22 16Q38 4 52 18" fill="none" stroke="#F0A070" strokeWidth="11" strokeLinecap="round" />
      <path d="M14 52Q6 30 22 16Q38 4 52 18" fill="none" stroke="#D2532A" strokeWidth="11" strokeDasharray="7 8" />
      <circle cx="52" cy="18" r="6" fill="#8E3418" />
      <Sparkles color="#FFE45C" at={[[40, 38, 7], [54, 48, 4], [28, 32, 3.5]]} />
    </>
  ),
  menguap: () => (
    <>
      <path d="M17 13l-2-9 9 4zM47 13l2-9-9 4z" fill="#FFF8EC" />
      <circle cx="32" cy="32" r="21" fill="#D2532A" />
      <ellipse cx="20" cy="36" rx="6" ry="4.5" fill="#FFF8EC" stroke="none" />
      <ellipse cx="44" cy="36" rx="6" ry="4.5" fill="#FFF8EC" stroke="none" />
      <path d="M19 27q4 3 8 0M37 27q4 3 8 0" fill="none" strokeWidth="2.4" />
      <ellipse cx="32" cy="41" rx="6" ry="8" fill="#5A2018" />
      <path d="M46 24q4 4 1 7q-4-2-1-7Z" fill="#9EC3F0" strokeWidth="1.8" />
      <Z x={50} y={4} s={0.8} />
    </>
  ),
  celengan: () => (
    <>
      <circle cx="44" cy="8" r="5" fill="#F2B63C" />
      <path d="M41 8h6" fill="none" strokeWidth="1.6" />
      <path d="M27 16q-2-7 3-8q2 4 4 0q5 1 2 8z" fill="#D2532A" />
      <path d="M8 34q-3-6 3-9" fill="none" />
      <ellipse cx="32" cy="36" rx="22" ry="18" fill="#F2B63C" />
      <path d="M51 32l9 4-9 4z" fill="#E8833A" />
      <circle cx="44" cy="30" r="2.6" fill={O} stroke="none" />
      <rect x="26" y="19" width="12" height="3.4" rx="1.7" fill={O} />
      <path d="M22 48l-2 8M38 49l1 7" fill="none" strokeWidth="3" />
      <path d="M17 31q3-8 11-9" fill="none" stroke={SHINE} strokeWidth="2.4" />
      <path d="M20 38q6 6 14 2" fill="none" stroke="#C28A16" strokeWidth="2.2" />
    </>
  ),
  kardus: () => (
    <>
      <path d="M10 26l22-8 22 8-22 8z" fill="#E0AA62" />
      <path d="M10 26v24l22 8V34z" fill="#C98F45" />
      <path d="M54 26v24l-22 8V34z" fill="#B47A35" />
      <path d="M21 22l22 8v8" fill="none" stroke="#F2D48A" strokeWidth="4" />
      <path d="M16 40l4-3 4 3M16 46l4-3 4 3" fill="none" strokeWidth="1.8" />
      <path d="M40 44h8M40 49h6" fill="none" stroke="#7A4A20" strokeWidth="1.8" />
    </>
  ),
  catat: () => (
    <>
      <rect x="12" y="8" width="32" height="44" rx="4" fill="#3C78C8" />
      <rect x="18" y="12" width="22" height="36" rx="2" fill="#FFF8EC" strokeWidth="2" />
      <path d="M22 20h14M22 26h14M22 32h9" fill="none" stroke="#9EC3F0" strokeWidth="2" />
      {[14, 22, 30, 38, 46].map(y => <circle key={y} cx="12" cy={y} r="2.2" fill="#B9C4BE" strokeWidth="1.6" />)}
      <g transform="rotate(35 46 40)">
        <rect x="42" y="18" width="8" height="34" rx="1.5" fill="#F2B63C" />
        <rect x="42" y="14" width="8" height="6" rx="2" fill="#F08CA8" />
        <path d="M42 52l4 8 4-8z" fill="#F7D9BF" />
      </g>
    </>
  ),
  sabar: () => (
    <>
      <rect x="12" y="5" width="40" height="7" rx="3" fill="#8E5A2B" />
      <rect x="12" y="52" width="40" height="7" rx="3" fill="#8E5A2B" />
      <path d="M17 12h30q0 12-11 18v4q11 6 11 18H17q0-12 11-18v-4Q17 24 17 12Z" fill="#FFF8EC" />
      <path d="M22 18h20q-2 7-10 10q-8-3-10-10Z" fill="#F2B63C" strokeWidth="1.8" />
      <path d="M21 51q2-9 11-11q9 2 11 11Z" fill="#F2B63C" strokeWidth="1.8" />
      <path d="M32 30v10" fill="none" stroke="#F2B63C" strokeWidth="2" />
    </>
  ),
  kaktus: () => (
    <>
      <path d="M13 40Q8 40 8 32V26Q8 22 12 22T16 26V33h4" fill="#4FAE72" />
      <path d="M50 34Q56 34 56 26V20Q56 16 52 16T48 20V28h-4" fill="#4FAE72" />
      <rect x="20" y="8" width="24" height="40" rx="12" fill="#4FAE72" />
      <path d="M28 16v24M36 16v24" fill="none" stroke="#2F7A5C" strokeWidth="2" />
      <circle cx="32" cy="9" r="4" fill="#F08CA8" />
      <path d="M14 46h36l-4 14H18z" fill="#D2783A" />
      <path d="M12 46h40" fill="none" strokeWidth="3" />
      <path d="M23 14v10" fill="none" stroke={SHINE} strokeWidth="2.4" />
    </>
  ),
  sambal: () => (
    <>
      <path d="M42 14Q46 6 54 6" fill="none" stroke="#2F7A5C" strokeWidth="4" />
      <path d="M36 14Q48 12 48 24Q48 44 22 56Q12 60 10 54Q26 46 30 30Q32 16 36 14Z" fill="#D2532A" />
      <path d="M36 12q6-3 10 2l-4 4z" fill="#4FAE72" />
      <path d="M38 22q2 10-6 22" fill="none" stroke={SHINE} strokeWidth="2.6" />
      <path d="M12 22q-3 4 0 6q3-2 0-6ZM20 12q-3 4 0 6q3-2 0-6Z" fill="#FF7A2F" strokeWidth="1.6" />
    </>
  ),
  kembaran: () => (
    <>
      <g opacity=".5">
        <path d="M33 16l2-9 7 7zM53 16l-2-9-7 7z" fill="#FFF8EC" />
        <circle cx="43" cy="28" r="15" fill="#F0A070" />
      </g>
      <path d="M11 30l2-10 8 7zM35 30l-2-10-8 7z" fill="#FFF8EC" />
      <circle cx="23" cy="40" r="16" fill="#D2532A" />
      <ellipse cx="15" cy="44" rx="5" ry="4" fill="#FFF8EC" stroke="none" />
      <ellipse cx="31" cy="44" rx="5" ry="4" fill="#FFF8EC" stroke="none" />
      <path d="M14 37h5M27 37h5M21 48h4" fill="none" strokeWidth="2.4" />
    </>
  ),
  sindiran: () => (
    <>
      <path d="M8 14q0-6 6-6h36q6 0 6 6v22q0 6-6 6H26l-12 10 2-10h-2q-6 0-6-6Z" fill="#FFF8EC" />
      {[22, 32, 42].map(x => <circle key={x} cx={x} cy="25" r="3.2" fill={O} stroke="none" />)}
      <path d="M50 46q5 6 1 9q-5-2-1-9Z" fill="#9EC3F0" strokeWidth="1.8" />
      <path d="M14 14q2-3 6-3" fill="none" stroke="#E7D9F5" strokeWidth="2.4" />
    </>
  ),
  kesiangan: () => (
    <>
      <path d="M17 52l-5 7M47 52l5 7" fill="none" strokeWidth="3.4" />
      <circle cx="16" cy="15" r="7" fill="#F2B63C" />
      <circle cx="48" cy="15" r="7" fill="#F2B63C" />
      <circle cx="32" cy="35" r="21" fill="#D2532A" />
      <circle cx="32" cy="35" r="15" fill="#FFF8EC" />
      <path d="M32 35V25M32 35l7 4" fill="none" strokeWidth="3" />
      <path d="M4 26l-2-4M60 26l2-4M6 34H2M58 34h4" fill="none" strokeWidth="2.2" />
      <Sparkles color="#FFE45C" at={[[54, 54, 5]]} />
    </>
  ),
  bara: () => (
    <>
      <path d="M32 4Q48 22 46 38Q45 56 32 58Q19 56 18 40Q18 30 25 22Q26 32 31 33Q28 16 32 4Z" fill="#FF7A2F" />
      <path d="M32 26Q40 36 39 44Q38 52 32 52Q26 52 25 45Q25 38 30 34Q32 30 32 26Z" fill="#FFC23C" strokeWidth="2" />
      <circle cx="50" cy="16" r="2.6" fill="#FFC23C" strokeWidth="1.6" />
      <circle cx="13" cy="24" r="2" fill="#FF7A2F" strokeWidth="1.6" />
    </>
  ),
  naga: () => (
    <>
      <path d="M40 26Q56 20 62 30Q56 40 40 34Z" fill="#FF7A2F" />
      <path d="M40 28Q52 26 55 30Q52 34 40 32Z" fill="#FFC23C" strokeWidth="1.8" />
      <path d="M14 14l2-10 6 8zM24 12l5-9 3 10z" fill="#FFF8EC" />
      <path d="M6 34Q6 12 26 12Q42 12 42 24V36Q42 46 30 48H16Q6 46 6 34Z" fill="#4FAE72" />
      <circle cx="24" cy="24" r="4" fill="#FFF8EC" />
      <circle cx="25" cy="24" r="2" fill={O} stroke="none" />
      <circle cx="37" cy="27" r="1.6" fill={O} stroke="none" />
      <path d="M12 52q6 6 14 2M8 40q6 4 14 2" fill="none" stroke="#2F7A5C" strokeWidth="2.2" />
    </>
  ),
  setrum: () => (
    <>
      <Rope d="M20 42Q12 50 18 54Q24 58 16 62" color="#B9C4BE" w={3} />
      <path d="M22 14h6v-8M34 14h6v-8" fill="none" stroke="#A8B4AE" strokeWidth="4" />
      <rect x="14" y="14" width="34" height="26" rx="7" fill="#FFF8EC" />
      <path d="M20 22h22" fill="none" stroke="#DCE8F7" strokeWidth="3" />
      <path d={bolt(48, 26, 1.1)} fill="#FFE45C" />
    </>
  ),
  badai: () => (
    <>
      <path d={bolt(30, 34, 1.1)} fill="#FFE45C" />
      <path d="M14 46l-3 7M50 46l-3 7" fill="none" stroke="#3C78C8" strokeWidth="2.6" />
      <Blob fill="#B9C4BE" circles={[[18, 30, 10], [30, 22, 13], [44, 26, 11], [50, 34, 8], [32, 34, 10]]} />
      <path d="M22 20q4-6 11-6" fill="none" stroke={SHINE} strokeWidth="2.4" />
      <Sparkles color="#FFE45C" at={[[54, 12, 4.5]]} />
    </>
  ),
  batu: () => (
    <>
      <path d="M10 42L16 20L32 10L50 16L56 38L44 54H22Z" fill="#A79C93" />
      <path d="M16 20L32 10L50 16L36 26Z" fill="#C7BDB4" strokeWidth="2" />
      <path d="M36 26L44 54M36 26L10 42" fill="none" stroke="#7E746C" strokeWidth="2" />
      <path d="M44 34l-4 6 4 4" fill="none" stroke="#5E554F" strokeWidth="2" />
      <path d="M22 22l8-5" fill="none" stroke={SHINE} strokeWidth="2.6" />
      <path d="M46 6q6 2 6 8q-6 0-6-8Z" fill="#4FAE72" strokeWidth="1.8" />
    </>
  ),
  gempa: () => (
    <>
      <path d="M4 38L32 30L60 38V56H4Z" fill="#A97A4A" />
      <path d="M4 38L32 30L60 38" fill="none" />
      <path d="M32 31L28 39L35 45L29 56" fill="none" strokeWidth="3" />
      <path d="M4 46h10M48 47h12" fill="none" stroke="#8E5A2B" strokeWidth="2" />
      <rect x="16" y="12" width="8" height="8" rx="2" transform="rotate(20 20 16)" fill="#8E5A2B" />
      <rect x="40" y="8" width="10" height="9" rx="2" transform="rotate(-15 45 12)" fill="#A97A4A" />
      <path d="M12 26l-4-4M52 24l5-4M32 22v-6" fill="none" strokeWidth="2.2" />
    </>
  ),
  tiup: () => (
    <>
      <Rope d="M6 22H40Q50 22 50 14Q50 8 44 8Q38 8 40 15" color="#DCE8F7" w={3.6} />
      <Rope d="M6 34H50Q58 34 58 42Q58 48 52 48Q46 48 48 42" color="#9EC3F0" w={3.6} />
      <Rope d="M12 46H30Q36 46 36 52Q36 57 31 57" color="#DCE8F7" w={3} />
    </>
  ),
  topan: () => (
    <>
      {[[32, 12, 24, 7], [32, 24, 19, 6], [33, 35, 14, 5], [35, 45, 9, 4], [37, 54, 5, 3]].map(([x, y, rx, ry], i) => (
        <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill={i % 2 ? '#9EC3F0' : '#DCE8F7'} />
      ))}
      <rect x="6" y="40" width="7" height="6" rx="1.5" transform="rotate(-20 9 43)" fill="#A97A4A" />
      <path d="M52 30l6-2M50 42l5 1" fill="none" strokeWidth="2.2" />
      <path d="M14 10q6-4 14-3" fill="none" stroke={SHINE} strokeWidth="2.2" />
    </>
  )
};

/** Skill illustration for a skill id from SKILLS; falls back to nothing for unknown ids. */
export default function SkillArt({ id, size = 32 }) {
  const Art = ART[id];
  if (!Art) return null;
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} style={{ display: 'block', overflow: 'visible' }} aria-hidden="true">
      <g stroke={O} strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round"><Art /></g>
    </svg>
  );
}
