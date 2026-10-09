// Hand-drawn equipment illustrations (64×64), in the same thick-outline style as the characters.
import { TOP_WEAPON } from '../game/data.js';

export const O = '#2B1E18';
export const SHINE = 'rgba(255,255,255,.6)';

// Four-point sparkle used on Epik/Legendaris items.
export const star = (x, y, r) => `M${x} ${y - r}Q${x} ${y} ${x + r} ${y}Q${x} ${y} ${x} ${y + r}Q${x} ${y} ${x - r} ${y}Q${x} ${y} ${x} ${y - r}Z`;
export function Sparkles({ color, at }) {
  return <g style={{ stroke: O, strokeWidth: 1.6 }}>{at.map(([x, y, r], i) => <path key={i} d={star(x, y, r)} fill={color} />)}</g>;
}
// A stroke drawn twice (dark outline under a colored core), for ropes and handles.
export function Rope({ d, color, w = 3.5 }) {
  return (
    <>
      <path d={d} fill="none" stroke={O} strokeWidth={w + 3} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

function Chopstick() {
  return (
    <>
      <path d="M28.5 4h7l-2 55h-3z" fill="#E8C07A" />
      <path d="M28.7 9h6.6v6h-6.6z" fill="#D2532A" />
      <path d="M29.5 27h5M30.2 43h3.8" fill="none" strokeWidth="2" />
      <path d="M31 19v22" fill="none" stroke={SHINE} strokeWidth="1.6" />
    </>
  );
}

const ART = {
  sumpit: () => (
    <>
      <g transform="rotate(24 32 34) translate(-6 0)"><Chopstick /></g>
      <g transform="rotate(40 32 34) translate(5 1)"><Chopstick /></g>
    </>
  ),
  payung: () => (
    <>
      <Rope d="M32 30v20q0 8-7 8q-5 0-5-5" color="#8E5A2B" w={3.4} />
      <path d="M7 31Q12 6 32 7Q52 6 57 31Q51 26 44.5 31Q38 26 32 31Q26 26 19.5 31Q13 26 7 31Z" fill="#D2532A" />
      <path d="M32 7Q22 14 19.5 31Q26 26 32 31Z" fill="#FFF8EC" />
      <path d="M32 7Q50 9 57 31Q51 26 44.5 31Q42 16 32 7Z" fill="#FFF8EC" />
      <circle cx="32" cy="6" r="2.6" fill="#F2B63C" />
      <path d="M13 22Q17 13 25 10" fill="none" stroke={SHINE} strokeWidth="2" />
    </>
  ),
  centong: () => (
    <>
      <g transform="rotate(-32 32 32)">
        <rect x="28" y="33" width="8" height="27" rx="4" fill="#C98F45" />
        <ellipse cx="32" cy="21" rx="14" ry="16" fill="#E8BC78" />
        <g style={{ strokeWidth: 1.4 }} fill="#FFF8EC">
          <ellipse cx="27" cy="16" rx="2.6" ry="1.6" transform="rotate(-20 27 16)" />
          <ellipse cx="35" cy="13" rx="2.6" ry="1.6" transform="rotate(25 35 13)" />
          <ellipse cx="33" cy="22" rx="2.6" ry="1.6" transform="rotate(-10 33 22)" />
          <ellipse cx="26" cy="25" rx="2.6" ry="1.6" transform="rotate(30 26 25)" />
        </g>
        <path d="M22 12Q24 7 29 6" fill="none" stroke={SHINE} strokeWidth="2" />
      </g>
      <Sparkles color="#C9A8F0" at={[[50, 12, 6], [55, 27, 3.5], [12, 50, 4]]} />
    </>
  ),
  panci: () => (
    <>
      <path d="M24 16q-3-4 0-8M32 15q-3-4 0-8M40 16q-3-4 0-8" fill="none" stroke="#A8B4AE" strokeWidth="2.4" />
      <path d="M11 33q-6 0-6 5t6 5M53 33q6 0 6 5t-6 5" fill="#D2783A" />
      <path d="M12 26h40v20q0 10-10 10H22q-10 0-10-10z" fill="#D2783A" />
      <rect x="8" y="22" width="48" height="8" rx="4" fill="#F0A070" />
      <path d="M12 40h40" fill="none" strokeWidth="2" />
      <path d="M17 34v12" fill="none" stroke={SHINE} strokeWidth="2.4" />
      <Sparkles color="#C9A8F0" at={[[53, 12, 5.5], [9, 12, 3.5]]} />
    </>
  ),
  pramuka: () => (
    <>
      <ellipse cx="32" cy="43" rx="27" ry="9" fill="#A0764A" />
      <path d="M17 43Q16 18 32 16Q48 18 47 43Z" fill="#C49460" />
      <path d="M24 21Q28 29 32 30Q36 29 40 21M32 17v13" fill="none" strokeWidth="2" />
      <path d="M17.2 37Q32 42 46.8 37L47 43Q32 48 17 43Z" fill="#2F7A5C" />
      <circle cx="32" cy="42" r="3.6" fill="#F2B63C" />
      <path d="M21 33Q20 24 25 20" fill="none" stroke={SHINE} strokeWidth="2" />
    </>
  ),
  helm: () => (
    <>
      <path d="M11 41Q10 15 32 14Q54 15 53 41Z" fill="#F2B63C" />
      <path d="M27 15h10v26H27z" fill="#F8CF6A" />
      <path d="M5 41Q32 34 59 41Q59 48 32 48Q5 48 5 41Z" fill="#E3A32C" />
      <circle cx="44" cy="29" r="4.5" fill="#4FAE72" />
      <path d="M42.4 29l1.3 1.4 2.4-2.6" fill="none" stroke="#FFF8EC" strokeWidth="1.6" />
      <path d="M16 33Q16 22 23 18" fill="none" stroke={SHINE} strokeWidth="2.4" />
    </>
  ),
  syal: () => (
    <>
      <path d="M38 27l12 2-4 25-12-2z" fill="#D2532A" />
      <path d="M36.9 34l12 2M35.8 41l12 2" fill="none" stroke="#FFF8EC" strokeWidth="3" />
      <path d="M35 52l-1 6M39 53l-1 6M43 53.5l-1 6M47 54l-1 6" fill="none" strokeWidth="2.2" />
      <path d="M6 18Q19 10 32 17Q45 24 58 16V30Q45 38 32 31Q19 24 6 32Z" fill="#D2532A" />
      <path d="M6 25Q19 17 32 24Q45 31 58 23" fill="none" stroke="#FFF8EC" strokeWidth="3.4" />
      <path d="M13 20l2 2 2-2M23 18l2 2 2-2M41 27l2 2 2-2M50 24l2 2 2-2" fill="none" stroke="#8E3418" strokeWidth="1.4" />
    </>
  ),
  jashujan: () => (
    <>
      <path d="M21 21Q32 13 43 21L52 55Q32 60 12 55Z" fill="#9EC3F0" />
      <path d="M21 23Q19 7 32 7Q45 7 43 23Q32 28 21 23Z" fill="#9EC3F0" />
      <ellipse cx="32" cy="18" rx="7" ry="5.5" fill="#5E8FCF" />
      <path d="M32 26v31" fill="none" strokeWidth="2" />
      <g fill="#FFF8EC" style={{ strokeWidth: 1.6 }}><circle cx="36" cy="33" r="2" /><circle cx="36" cy="41" r="2" /><circle cx="36" cy="49" r="2" /></g>
      <path d="M20 30L17 50M24 13q2-3 5-4" fill="none" stroke={SHINE} strokeWidth="2.4" />
    </>
  ),
  tutup: () => {
    const pts = Array.from({ length: 24 }, (_, i) => {
      const a = (i / 24) * Math.PI * 2, r = i % 2 ? 12 : 14.5;
      return `${(32 + r * Math.cos(a)).toFixed(1)},${(43 + r * Math.sin(a)).toFixed(1)}`;
    }).join(' ');
    return (
      <>
        <Rope d="M9 6Q14 26 28 29M55 6Q50 26 36 29" color="#C49460" w={2.2} />
        <polygon points={pts} fill="#D2532A" />
        <circle cx="32" cy="43" r="8.5" fill="#E8704A" />
        <path d={star(32, 43, 5)} fill="#FFF8EC" style={{ strokeWidth: 1.4 }} />
        <circle cx="32" cy="28.5" r="3" fill="#F2B63C" />
        <path d="M22 37q3-4 7-5" fill="none" stroke={SHINE} strokeWidth="2" />
      </>
    );
  },
  cincin: () => (
    <>
      <path fillRule="evenodd" d="M11 35a21 16 0 1 0 42 0a21 16 0 1 0-42 0ZM20 35a12 7.5 0 1 0 24 0a12 7.5 0 1 0-24 0Z" fill="#F08CA8" />
      <g fill="#FFF8EC" style={{ strokeWidth: 1.4 }}>
        <ellipse cx="47" cy="23" rx="3" ry="1.8" transform="rotate(30 47 23)" />
        <ellipse cx="18" cy="47" rx="3" ry="1.8" transform="rotate(-20 18 47)" />
      </g>
      <path d="M16 30q4-6 12-8" fill="none" stroke={SHINE} strokeWidth="2.2" />
    </>
  ),
  rafia: () => (
    <>
      <Rope d="M50 40Q61 46 55 58" color="#F49AC1" w={3.6} />
      <ellipse cx="31" cy="37" rx="23" ry="15" fill="#F49AC1" />
      <ellipse cx="31" cy="35" rx="15" ry="9" fill="#E978A9" />
      <ellipse cx="31" cy="34" rx="7" ry="4" fill="#C2507F" />
      <path d="M12 41q19 9 38 0M16 47q15 6 30 0" fill="none" stroke="#C2507F" strokeWidth="1.6" />
      <path d="M14 31q5-7 14-8" fill="none" stroke={SHINE} strokeWidth="2.2" />
    </>
  ),
  gesper: () => (
    <>
      <rect x="2" y="27" width="60" height="14" rx="3" fill="#8E5A2B" />
      <g fill={O} stroke="none"><circle cx="8" cy="34" r="1.6" /><circle cx="56" cy="34" r="1.6" /></g>
      <rect x="15" y="15" width="34" height="37" rx="9" fill="#F2B63C" />
      <rect x="22" y="22" width="20" height="23" rx="4" fill="#8E5A2B" />
      <rect x="30" y="20" width="4" height="27" rx="2" fill="#E3A32C" />
      <path d="M19 24q0-5 5-6" fill="none" stroke={SHINE} strokeWidth="2.2" />
      <Sparkles color="#C9A8F0" at={[[54, 12, 5.5], [10, 52, 4]]} />
    </>
  ),
  sandal: () => (
    <>
      <path d="M33 5Q47 6 47 25Q47 41 42 51Q37 61 29 59Q19 57 19 44Q19 32 20 22Q20 6 33 5Z" fill="#F2B63C" />
      <path d="M33 10Q42 11 42 25Q42 38 38 47Q35 54 30 53Q24 52 24 44Q24 32 25 22Q25 10 33 10Z" fill="#F8D37A" style={{ strokeWidth: 1.6 }} />
      <Rope d="M31 17L21 31M31 17L45 30" color="#D2532A" w={3.6} />
      <circle cx="31" cy="17" r="3" fill="#D2532A" />
      <path d="M27 44q0 6 3 7" fill="none" stroke={SHINE} strokeWidth="2" />
      <Sparkles color="#FFE45C" at={[[54, 10, 6], [56, 44, 4], [10, 14, 4.5], [9, 50, 3.5]]} />
    </>
  ),
  raket: () => (
    <>
      <g transform="rotate(-35 32 32)">
        <ellipse cx="32" cy="21" rx="15" ry="17" fill="#EEF4FB" />
        <path d="M24 6v30M32 4v34M40 6v30M18 14h28M17 22h30M18 30h28" fill="none" stroke="#9EC3F0" strokeWidth="1.2" />
        <ellipse cx="32" cy="21" rx="15" ry="17" fill="none" stroke={O} strokeWidth="8" />
        <ellipse cx="32" cy="21" rx="15" ry="17" fill="none" stroke="#3C78C8" strokeWidth="4" />
        <rect x="30" y="38" width="4" height="7" fill="#3C78C8" />
        <rect x="27" y="44" width="10" height="19" rx="4" fill="#F2B63C" />
        <circle cx="32" cy="50" r="2.4" fill="#D2532A" strokeWidth="1.6" />
      </g>
      <path d="M50 8l-4 6h4l-3 6M58 22l-4 3 3 1-3 4" fill="none" stroke="#C28A16" strokeWidth="2.2" />
    </>
  ),
  sapu: () => (
    <g transform="rotate(-18 32 32)">
      <path d="M29 4h6v24h-6z" fill="#E2C07A" />
      <path d="M31 6v20M33 6v20" fill="none" stroke="#B48A45" strokeWidth="1.2" />
      <path d="M27 31L10 60H54L37 31Z" fill="#D9B26A" />
      <path d="M30 33L19 59M32 33V59M34 33L45 59M28 33L14 59M36 33L50 59" fill="none" stroke="#A9803F" strokeWidth="1.4" />
      <rect x="25" y="26" width="14" height="7" rx="2" fill="#D2532A" />
      <path d="M25 29.5h14" fill="none" stroke="#FFF8EC" strokeWidth="1.6" />
      <Sparkles color="#C9A8F0" at={[[52, 18, 5.5], [10, 26, 3.5]]} />
    </g>
  ),
  ulekan: () => (
    <>
      <path d="M6 40Q32 30 58 40Q56 56 32 58Q8 56 6 40Z" fill="#8C8580" />
      <ellipse cx="32" cy="40" rx="24" ry="6" fill="#D2532A" />
      <path d="M18 39q6-3 12 0" fill="none" stroke="#F07A50" strokeWidth="2" />
      <g transform="rotate(38 38 26)">
        <rect x="32" y="4" width="12" height="34" rx="6" fill="#A79C93" />
        <path d="M35 10v20" fill="none" stroke={SHINE} strokeWidth="2.2" />
      </g>
      <path d="M12 47q8 6 18 6" fill="none" stroke="#6E6862" strokeWidth="2" />
      <Sparkles color="#C9A8F0" at={[[10, 16, 5.5], [20, 6, 3]]} />
    </>
  ),
  gitar: () => (
    <>
      <g transform="rotate(-38 32 34)">
        <rect x="29.5" y="2" width="5" height="26" fill="#8E5A2B" />
        <rect x="27.5" y="-4" width="9" height="9" rx="2.5" fill="#6B4020" />
        <g fill="#F2B63C" style={{ strokeWidth: 1.4 }}><circle cx="26" cy="-1" r="1.8" /><circle cx="38" cy="-1" r="1.8" /><circle cx="26" cy="3" r="1.8" /><circle cx="38" cy="3" r="1.8" /></g>
        {[[32, 47, 15], [32, 30, 11]].map(([x, y, r], i) => <circle key={`o${i}`} cx={x} cy={y} r={r} fill="#E0A35A" strokeWidth="5.2" />)}
        {[[32, 47, 15], [32, 30, 11]].map(([x, y, r], i) => <circle key={`f${i}`} cx={x} cy={y} r={r} fill="#E0A35A" stroke="none" />)}
        <circle cx="32" cy="38" r="5" fill={O} />
        <circle cx="32" cy="38" r="7.5" fill="none" stroke="#F2B63C" strokeWidth="1.6" />
        <rect x="26.5" y="49" width="11" height="3.4" rx="1.2" fill="#6B4020" strokeWidth="1.6" />
        <path d="M30.6 2v48M33.4 2v48" fill="none" stroke="#FFF8EC" strokeWidth=".9" />
        <path d="M22 44q0-8 5-11" fill="none" stroke={SHINE} strokeWidth="2.2" />
      </g>
      <path d="M52 40v-12l7-2v11" fill="none" strokeWidth="2.2" />
      <ellipse cx="50" cy="40.5" rx="3.2" ry="2.4" fill={O} />
      <ellipse cx="57" cy="37.5" rx="3.2" ry="2.4" fill={O} />
      <Sparkles color="#FFE45C" at={[[10, 10, 5.5], [8, 48, 4], [56, 10, 4]]} />
    </>
  ),
  caping: () => (
    <>
      <path d="M14 46q18 16 36 0" fill="none" stroke="#D2532A" strokeWidth="2.4" />
      <path d="M3 42Q24 8 32 7Q40 8 61 42Q32 52 3 42Z" fill="#E8C07A" />
      <path d="M32 8L12 42M32 8L22 46M32 8V48M32 8L42 46M32 8L52 42" fill="none" stroke="#B48A45" strokeWidth="1.4" />
      <path d="M9 34Q32 44 55 34" fill="none" stroke="#B48A45" strokeWidth="1.4" />
      <path d="M3 42Q32 52 61 42" fill="none" strokeWidth="3" />
      <path d="M22 20q4-6 8-8" fill="none" stroke={SHINE} strokeWidth="2.4" />
    </>
  ),
  blangkon: () => (
    <>
      <ellipse cx="11" cy="40" rx="7" ry="9" fill="#5A3226" />
      <path d="M9 45Q7 17 32 15Q57 17 55 45Q32 52 9 45Z" fill="#6B4020" />
      <path d="M10 36Q32 44 54 36" fill="none" stroke="#F2B63C" strokeWidth="2.2" />
      <path d="M16 26q4 4 8 0t8 0t8 0t8 0" fill="none" stroke="#F2B63C" strokeWidth="1.8" />
      <g fill="#E8C07A" stroke="none"><circle cx="20" cy="31" r="1.5" /><circle cx="32" cy="32" r="1.5" /><circle cx="44" cy="31" r="1.5" /><circle cx="26" cy="21" r="1.3" /><circle cx="38" cy="21" r="1.3" /></g>
      <path d="M18 20q5-4 10-4" fill="none" stroke={SHINE} strokeWidth="2.2" />
      <Sparkles color="#C9A8F0" at={[[55, 10, 5.5], [8, 12, 3.5]]} />
    </>
  ),
  batik: () => {
    const shirt = 'M20 9L28 7Q32 12 36 7L44 9L57 20L50 31L44 27V57H20V27L14 31L7 20Z';
    return (
      <>
        <clipPath id="item-batik-clip"><path d={shirt} /></clipPath>
        <path d={shirt} fill="#9A5B2E" />
        <g clipPath="url(#item-batik-clip)" fill="none" stroke="#F2D48A" strokeWidth="2.2">
          {[-10, 2, 14, 26, 38, 50].map(x => <path key={x} d={`M${x} 60Q${x + 6} 48 ${x + 12} 44T${x + 24} 28T${x + 36} 12`} />)}
        </g>
        <path d={shirt} fill="none" />
        <path d="M28 7L32 16L36 7" fill="#FFF8EC" strokeWidth="2.2" />
        <path d="M32 17V56" fill="none" strokeWidth="1.8" />
        <Sparkles color="#C9A8F0" at={[[56, 50, 5]]} />
      </>
    );
  },
  sarung: () => (
    <>
      <clipPath id="item-sarung-clip"><path d="M10 14H54V50Q43 56 32 50Q21 44 10 50Z" /></clipPath>
      <path d="M10 14H54V50Q43 56 32 50Q21 44 10 50Z" fill="#3C78C8" />
      <g clipPath="url(#item-sarung-clip)" fill="none">
        <path d="M10 24H54M10 36H54M10 46H54" stroke="#9EC3F0" strokeWidth="4" />
        <path d="M20 14V56M34 14V56M46 14V56" stroke="#9EC3F0" strokeWidth="4" />
        <path d="M10 30H54M27 14V56M40 14V56" stroke="#D2532A" strokeWidth="1.4" />
      </g>
      <path d="M10 14H54V50Q43 56 32 50Q21 44 10 50Z" fill="none" />
      <path d="M8 14H56V20H8Z" fill="#2E5E9E" />
    </>
  ),
  peluit: () => (
    <>
      <Rope d="M10 4Q16 24 30 30M54 4Q48 22 38 28" color="#D2532A" w={2.4} />
      <circle cx="34" cy="30" r="3.5" fill="#B9C4BE" strokeWidth="2" />
      <path d="M16 40Q16 30 28 30H46V40Q46 54 31 54Q16 54 16 40Z" fill="#B9C4BE" />
      <rect x="44" y="30" width="14" height="9" rx="2" fill="#B9C4BE" />
      <circle cx="30" cy="42" r="4.5" fill={O} />
      <path d="M21 36q2-3 6-3" fill="none" stroke={SHINE} strokeWidth="2.4" />
    </>
  ),
  kunci: () => (
    <>
      <circle cx="20" cy="16" r="9" fill="none" stroke={O} strokeWidth="6" />
      <circle cx="20" cy="16" r="9" fill="none" stroke="#B9C4BE" strokeWidth="2.6" />
      <g transform="rotate(40 26 24)">
        <circle cx="26" cy="26" r="7" fill="#F2B63C" />
        <circle cx="26" cy="26" r="2.4" fill="#FFF8EC" strokeWidth="1.6" />
        <path d="M23.5 33h5v22h-5z" fill="#F2B63C" />
        <path d="M28.5 44h4M28.5 50h5" fill="none" strokeWidth="3" />
      </g>
      <Rope d="M24 22Q34 24 38 32" color="#D2532A" w={2} />
      <path d="M40 52C29 45 31 34 37 34c2.5 0 3 1.5 3 3.5c0-2 .5-3.5 3-3.5c6 0 8 11-3 18Z" fill="#F08CA8" strokeWidth="2.2" />
      <Sparkles color="#C9A8F0" at={[[56, 12, 5], [10, 52, 3.5]]} />
    </>
  ),
  pinggang: () => (
    <>
      <rect x="2" y="26" width="60" height="9" rx="3" fill="#2B1E18" />
      <path d="M12 30Q12 20 32 20Q52 20 52 30V42Q52 52 32 52Q12 52 12 42Z" fill="#2E8C86" />
      <path d="M14 32Q32 28 50 32" fill="none" stroke="#F2B63C" strokeWidth="2.4" />
      <rect x="22" y="36" width="20" height="11" rx="4" fill="#4FB0A8" strokeWidth="2.2" />
      <circle cx="46" cy="31" r="2" fill="#F2B63C" strokeWidth="1.4" />
      <path d="M16 26q4-4 10-4" fill="none" stroke={SHINE} strokeWidth="2.2" />
      <path d={star(28, 41.5, 3)} fill="#F2B63C" style={{ strokeWidth: 1.2 }} />
    </>
  ),
  bakiak: () => (
    <>
      <path d="M18 4H46Q54 4 54 14V50Q54 60 44 60H20Q10 60 10 50V14Q10 4 18 4Z" fill="#C98F45" />
      <path d="M18 12q2 20 0 40M30 10q2 22 0 44M42 12q-2 20 0 40" fill="none" stroke="#A97A3F" strokeWidth="1.4" />
      <path d="M6 20H58V32H6Z" fill="#2B1E18" />
      <path d="M10 26H54" fill="none" stroke="#5A3A30" strokeWidth="1.6" />
      <path d="M14 42v10" fill="none" stroke={SHINE} strokeWidth="2.4" />
      <Sparkles color="#C9A8F0" at={[[58, 48, 5], [6, 50, 3.5]]} />
    </>
  ),
  kipasangin: () => (
    <>
      <ellipse cx="32" cy="58" rx="15" ry="4.5" fill="#B9C4BE" />
      <g fill="#D2532A" stroke="none"><circle cx="26" cy="58" r="1.6" /></g>
      <g fill="#4FAE72" stroke="none"><circle cx="32" cy="58.5" r="1.6" /></g>
      <g fill="#F2B63C" stroke="none"><circle cx="38" cy="58" r="1.6" /></g>
      <rect x="29.5" y="38" width="5" height="20" fill="#B9C4BE" />
      <circle cx="32" cy="24" r="19" fill="#EEF4FB" />
      {[0, 120, 240].map(a => <ellipse key={a} cx="32" cy="14" rx="6" ry="9.5" transform={`rotate(${a} 32 24)`} fill="#3C78C8" strokeWidth="2" />)}
      <circle cx="32" cy="24" r="19" fill="none" />
      <path d="M13 24h38M32 5v38M19 11l26 26M45 11L19 37" fill="none" stroke="#9EC3F0" strokeWidth="1" />
      <circle cx="32" cy="24" r="4.5" fill="#F2B63C" />
      <path d="M54 14q6 4 6 10M56 30q5 3 5 8" fill="none" stroke="#9EC3F0" strokeWidth="2.4" />
      <Sparkles color="#C9A8F0" at={[[8, 48, 4.5], [8, 10, 3.5]]} />
    </>
  ),
  peci: () => (
    <>
      <path d="M8 44Q8 20 32 18Q56 20 56 44Q32 50 8 44Z" fill="#3A3550" />
      <ellipse cx="32" cy="21" rx="16" ry="4" fill="#4A4568" strokeWidth="2" />
      <path d="M9 39Q32 46 55 39" fill="none" stroke="#F2B63C" strokeWidth="1.8" />
      <path d="M16 36Q14 26 22 22M24 32q0-6 4-8" fill="none" stroke="rgba(255,255,255,.75)" strokeWidth="2.6" />
    </>
  ),
  mahkota: () => (
    <>
      <path d="M7 52V20L18 33L26 13L32 28L38 13L46 33L57 20V52Z" fill="#C98F45" />
      <path d="M7 44H57" fill="none" />
      <rect x="20" y="40" width="24" height="7" fill="#E8C990" strokeWidth="1.8" />
      <circle cx="18" cy="38" r="3.4" fill="#D2532A" strokeWidth="1.8" />
      <circle cx="32" cy="35" r="3.8" fill="#3C78C8" strokeWidth="1.8" />
      <circle cx="46" cy="38" r="3.4" fill="#4FAE72" strokeWidth="1.8" />
      <path d="M12 48q4-2 8 0t8 0" fill="none" stroke="#8E5A2B" strokeWidth="1.4" />
      <Sparkles color="#FFE45C" at={[[26, 6, 4], [56, 10, 5], [6, 10, 4]]} />
    </>
  ),
  jaketojek: () => (
    <>
      <path d="M20 9L27 6Q32 12 37 6L44 9L57 21L50 32L44 28V57H20V28L14 32L7 21Z" fill="#2F9E5A" />
      <path d="M20 40H44" fill="none" stroke="#C9F27A" strokeWidth="3.4" />
      <path d="M32 12V57" fill="none" strokeWidth="2" />
      <path d="M27 6L32 14L37 6" fill="#237A45" strokeWidth="2.2" />
      <rect x="35" y="45" width="7" height="6" rx="1.5" fill="#FFF8EC" strokeWidth="1.6" />
      <path d="M22 18v12" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="2.4" />
    </>
  ),
  jubah: () => (
    <>
      <path d="M20 8L28 6L32 14L36 6L44 8L57 22L50 32L45 28V58H19V28L14 32L7 22Z" fill="#FFF8EC" />
      <path d="M28 6L36 40L44 30M36 6L24 34" fill="none" strokeWidth="2.2" />
      <path d="M19 36H45" fill="none" stroke="#E8DCCB" strokeWidth="4" />
      <path d="M32 36q-6 6-4 14M32 36q6 6 4 12" fill="none" stroke="#C9B9A2" strokeWidth="2.4" />
      <g fill="#E8DCCB" stroke="none">{[[24, 46], [40, 48], [26, 54], [38, 54], [22, 22]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.3" />)}</g>
      <text x="40" y="24" textAnchor="middle" style={{ font: "700 7px var(--display)", fill: '#C28A16', stroke: 'none' }}>H</text>
      <Sparkles color="#C9A8F0" at={[[56, 48, 5]]} />
    </>
  ),
  bawang: () => (
    <>
      <path d="M8 6Q32 40 56 6" fill="none" stroke={O} strokeWidth="4.6" />
      <path d="M8 6Q32 40 56 6" fill="none" stroke="#C49460" strokeWidth="2" />
      {[[18, 30, -18], [32, 40, 0], [46, 30, 18]].map(([x, y, r]) => (
        <g key={x} transform={`translate(${x} ${y}) rotate(${r})`}>
          <path d="M0 11Q-10 11 -10 2Q-10 -6 0 -11Q10 -6 10 2Q10 11 0 11Z" fill="#FFF8EC" />
          <path d="M0 -10V10M-5 -6Q-6 4 -3 10M5 -6Q6 4 3 10" fill="none" stroke="#E2D2BE" strokeWidth="1.4" />
          <path d="M0 -11v-4" fill="none" stroke="#7FB77A" strokeWidth="2.4" />
        </g>
      ))}
    </>
  ),
  karate: () => (
    <>
      <rect x="3" y="20" width="58" height="11" rx="3" fill="#3A3550" />
      <path d="M26 30L18 58L26 60L32 36L38 60L46 58L38 30Z" fill="#3A3550" />
      <path d="M19 53l7 2M46 53l-7 2" fill="none" stroke="#F2B63C" strokeWidth="3" />
      <rect x="25" y="17" width="14" height="17" rx="4" fill="#4A4568" />
      <path d="M10 24h10M44 24h10" fill="none" stroke="#5A5478" strokeWidth="1.6" />
      <Sparkles color="#C9A8F0" at={[[54, 8, 5], [8, 50, 3.5]]} />
    </>
  ),
  sepaturoda: () => (
    <>
      <path d="M16 6H34V30Q46 30 52 36Q56 40 54 46H10V12Q10 6 16 6Z" fill="#F08CA8" />
      <path d="M10 38H54" fill="none" strokeWidth="2.2" />
      <path d="M18 12h12M18 18h12M18 24h12" fill="none" stroke="#FFF8EC" strokeWidth="2.4" />
      <rect x="8" y="46" width="48" height="5" rx="2.5" fill="#B9C4BE" />
      <circle cx="16" cy="55" r="5" fill="#F2B63C" /><circle cx="28" cy="55" r="5" fill="#F2B63C" />
      <circle cx="40" cy="55" r="5" fill="#A8B4AE" /><circle cx="52" cy="55" r="5" fill="#F2B63C" />
      <path d="M54 42q5 0 6 5" fill="none" stroke="#8E3418" strokeWidth="3" />
      <path d="M14 14v14" fill="none" stroke={SHINE} strokeWidth="2.2" />
    </>
  ),
  topibambu: () => (
    <>
      <ellipse cx="32" cy="44" rx="27" ry="9" fill="#C9A35A" />
      <path d="M15 44Q14 20 32 18Q50 20 49 44Z" fill="#A7C66A" />
      <path d="M18 26h28M16 33h32M15 40h34" fill="none" stroke="#7FA04A" strokeWidth="1.8" />
      <path d="M24 19v24M32 18v26M40 19v24" fill="none" stroke="#8FB55A" strokeWidth="1.4" />
      <path d="M15.6 38Q32 44 48.4 38L49 44Q32 50 15 44Z" fill="#D2532A" />
      <path d="M48 36q8-6 10-14q-8 2-10 14Z" fill="#7FB77A" strokeWidth="1.8" />
      <path d="M20 30q0-8 5-10" fill="none" stroke={SHINE} strokeWidth="2.2" />
      <Sparkles color="#C9A8F0" at={[[8, 14, 5]]} />
    </>
  ),
  kartumember: () => (
    <>
      <Rope d="M14 4Q20 16 22 22M50 4Q44 16 42 22" color="#D2532A" w={2.4} />
      <rect x="8" y="22" width="48" height="32" rx="5" fill="#F2B63C" />
      <rect x="14" y="30" width="10" height="8" rx="2" fill="#E8D9A0" strokeWidth="1.8" />
      <path d="M14 46h18M36 46h10" fill="none" stroke="#B0620A" strokeWidth="2.4" />
      <path d={star(44, 32, 5)} fill="#FFF8EC" strokeWidth="1.4" />
      <path d="M12 26l40 24" fill="none" stroke="rgba(255,255,255,.45)" strokeWidth="4" />
      <Sparkles color="#C9A8F0" at={[[58, 18, 4.5], [6, 58, 3.5]]} />
    </>
  ),
  sabukdisko: () => (
    <>
      <rect x="2" y="28" width="60" height="11" rx="3" fill="#7E43B5" />
      <g fill="#C9A8F0" stroke="none">{[8, 14, 50, 56].map(x => <circle key={x} cx={x} cy="33.5" r="1.6" />)}</g>
      <circle cx="32" cy="33" r="15" fill="#DCE8F7" />
      <path d="M17.5 30h29M18 37h28M32 18v30M24 20v26M40 20v26" fill="none" stroke="#9EC3F0" strokeWidth="1.4" />
      <g fill="#FFF8EC" stroke="none"><rect x="25" y="23" width="6" height="5" /><rect x="36" y="31" width="5" height="5" /><rect x="27" y="38" width="5" height="4" /></g>
      <circle cx="32" cy="33" r="15" fill="none" />
      <path d="M8 10l4 6M56 10l-4 6M32 4v6" fill="none" stroke="#F2B63C" strokeWidth="2.6" />
      <Sparkles color="#F2B63C" at={[[10, 52, 4], [54, 52, 4.5]]} />
    </>
  ),
  karung: () => (
    <>
      <path d="M14 10H42L46 50Q46 58 36 58H16Q10 58 10 50Z" fill="#C9A35A" />
      <path d="M14 10Q28 16 42 10" fill="none" />
      <path d="M12 22q16 4 32 0M11 36q17 4 34 0" fill="none" stroke="#A8823F" strokeWidth="1.6" />
      <path d="M16 46l6 6M22 46l-6 6M30 46l6 6M36 46l-6 6" fill="none" stroke="#A8823F" strokeWidth="1.4" />
      <rect x="18" y="24" width="20" height="13" rx="2" fill="#FFF8EC" strokeWidth="2" />
      <text x="28" y="34" textAnchor="middle" style={{ font: "700 10px 'DM Mono',monospace", fill: '#D2532A', stroke: 'none' }}>17</text>
      <path d="M44 14q8 2 10 8" fill="none" stroke="#D2532A" strokeWidth="3" />
      <Sparkles color="#C9A8F0" at={[[56, 40, 5]]} />
    </>
  ),
  kaoskaki: () => (
    <g transform="rotate(-8 32 32)">
      <path d="M22 5h20v29q0 6 6 10q11 6 6 13q-5 6-15 1L27 51q-7-4-5-13z" fill="#FFF8EC" />
      <path d="M22 5h20v9H22z" fill="#3C78C8" />
      <path d="M22 9.5h20" fill="none" stroke="#FFF8EC" strokeWidth="2" />
      <path d="M45 46q9 4 9 10l-1 2q-5 5-14 0z" fill="#F2B63C" style={{ strokeWidth: 2 }} />
      <path d="M22.4 40q0 8 6 11l3-6q-5-2-5-8z" fill="#7E43B5" style={{ strokeWidth: 2 }} />
      <g fill="#7E43B5" stroke="none"><circle cx="28" cy="22" r="1.6" /><circle cx="36" cy="28" r="1.3" /><circle cx="33" cy="19" r="1" /></g>
      <path d={star(36, 38, 3.4)} fill="#F2B63C" style={{ strokeWidth: 1.2 }} />
    </g>
  )
};

/**
 * Equipment illustration for an item id from ITEMS; `size` is the rendered px size.
 * The strongest weapon (TOP_WEAPON) floats in a slow golden halo unless `plain` is set.
 */
export default function ItemArt({ id, size = 40, plain = false, still = false }) {
  const Art = ART[id];
  if (!Art) return null;
  const svg = (
    <svg viewBox="0 0 64 64" width={size} height={size} style={{ display: 'block', overflow: 'visible' }} aria-hidden="true">
      <g stroke={O} strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round">
        <Art />
      </g>
    </svg>
  );
  if (plain || id !== TOP_WEAPON) return svg;
  const a = name => (still ? 'none' : name);
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <div style={{ position: 'absolute', inset: '-22%', borderRadius: '50%', background: 'repeating-conic-gradient(rgba(242,182,60,.38) 0deg 10deg, transparent 10deg 30deg)', WebkitMaskImage: 'radial-gradient(circle, #000 30%, transparent 68%)', maskImage: 'radial-gradient(circle, #000 30%, transparent 68%)', animation: a('itemHalo 9s linear infinite') }} />
      <div style={{ position: 'absolute', inset: 0, animation: a('itemFloat 2.8s ease-in-out infinite'), filter: 'drop-shadow(0 0 5px rgba(242,182,60,.85))' }}>{svg}</div>
      {[[-6, 18, 0], [86, 6, 0.7], [80, 82, 1.4]].map(([x, y, d], i) => (
        <svg key={i} viewBox="-6 -6 12 12" width={size * 0.2} height={size * 0.2} style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, overflow: 'visible', animation: a(`itemTwinkle 2.1s ${d}s ease-in-out infinite`) }}>
          <path d={star(0, 0, 5.5)} fill="#FFE45C" stroke={O} strokeWidth="1.2" />
        </svg>
      ))}
    </div>
  );
}
