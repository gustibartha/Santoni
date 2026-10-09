// Pet illustrations (100×100), outlined like the rest of the cast. `hop` makes the pet bounce
// along (used while Santoni walks); otherwise it bobs gently.
const O = '#2B1E18';
const SHINE = 'rgba(255,255,255,.7)';

function Eye({ x, y, r = 4.5 }) {
  const d = x <= 50 ? 1 : -1;
  return (
    <g stroke="none">
      <path d={`M${x - d * r * 1.05} ${y - r * 0.5}L${x + d * r} ${y + r * 0.05}Q${x + d * r * 0.1} ${y + r * 1.3} ${x - d * r * 1.05} ${y - r * 0.5}Z`} fill={O} />
      <circle cx={x + d * r * 0.12} cy={y + r * 0.2} r={r * 0.27} fill="#FFF" />
      <path d={`M${x - d * r * 1.35} ${y - r * 1.1}L${x + d * r * 1.15} ${y - r * 0.38}`} fill="none" stroke={O} strokeWidth={r * 0.62} strokeLinecap="round" />
    </g>
  );
}
const Blush = () => null;

const ART = {
  ayam: () => (
    <>
      <path d="M40 86v8M60 86v8M36 94h8M56 94h8" fill="none" stroke="#E8833A" strokeWidth="3.4" />
      <path d="M48 26q-2-10 6-12q-1 6 4 6q-6 2-10 6Z" fill="#F2B63C" strokeWidth="2.4" />
      <ellipse cx="50" cy="58" rx="30" ry="29" fill="#F7D44A" />
      <path d="M22 60q-8 6-2 14q8-2 10-10Z" fill="#EFC23A" strokeWidth="2.6" />
      <path d="M78 60q8 6 2 14q-8-2-10-10Z" fill="#EFC23A" strokeWidth="2.6" />
      <Eye x={40} y={52} /><Eye x={60} y={52} />
      <path d="M45 61l5 7 5-7Z" fill="#E8833A" strokeWidth="2.4" />
      <Blush at={[[33, 63], [67, 63]]} />
      <path d="M32 40q6-8 14-9" fill="none" stroke={SHINE} strokeWidth="3" />
    </>
  ),
  siput: () => (
    <>
      <path d="M8 84Q8 72 22 72H70Q90 72 92 84Q88 90 70 90H20Q8 90 8 84Z" fill="#B9D98A" />
      <path d="M22 72V54M32 72V58" fill="none" strokeWidth="3" />
      <circle cx="22" cy="51" r="4.5" fill="#B9D98A" strokeWidth="2.4" />
      <circle cx="32" cy="55" r="4.5" fill="#B9D98A" strokeWidth="2.4" />
      <g stroke="none"><circle cx="23" cy="51" r="2" fill={O} /><circle cx="33" cy="55" r="2" fill={O} /></g>
      <circle cx="60" cy="52" r="26" fill="#D2783A" />
      <path d="M60 52m-3 0a3 3 0 1 1 6 0a8 8 0 1 1-14 0a13 13 0 1 1 24 0a18 18 0 1 1-34 0" fill="none" stroke="#8E4A1E" strokeWidth="3" />
      <path d="M40 40q6-10 16-12" fill="none" stroke={SHINE} strokeWidth="3" />
      <path d="M14 82q4 3 8 0" fill="none" strokeWidth="2.2" />
      <Blush at={[[18, 78]]} />
    </>
  ),
  kepiting: () => (
    <>
      <path d="M26 70l-12 8M26 76l-10 12M74 70l12 8M74 76l10 12" fill="none" strokeWidth="3.4" />
      <path d="M22 50Q6 40 12 26Q24 24 28 38" fill="#E0503A" />
      <path d="M12 26l6 8" fill="none" strokeWidth="2.6" />
      <path d="M78 50Q94 40 88 26Q76 24 72 38" fill="#E0503A" />
      <path d="M88 26l-6 8" fill="none" strokeWidth="2.6" />
      <ellipse cx="50" cy="66" rx="30" ry="20" fill="#E0503A" />
      <path d="M40 46v-8M60 46v-8" fill="none" strokeWidth="3" />
      <circle cx="40" cy="36" r="6" fill="#FFF8EC" strokeWidth="2.4" />
      <circle cx="60" cy="36" r="6" fill="#FFF8EC" strokeWidth="2.4" />
      <g stroke="none"><circle cx="41" cy="37" r="2.6" fill={O} /><circle cx="61" cy="37" r="2.6" fill={O} /></g>
      <path d="M44 74q6 4 12 0" fill="none" strokeWidth="2.6" />
      <path d="M50 78l-4 6 4 8 4-8Z" fill="#3C78C8" strokeWidth="2" />
      <Blush at={[[34, 70], [66, 70]]} />
      <path d="M30 58q6-6 14-6" fill="none" stroke={SHINE} strokeWidth="3" />
    </>
  ),
  hantu: () => (
    <>
      <path d="M30 28L26 12L40 22ZM70 28L74 12L60 22Z" fill="#8E6A4E" />
      <path d="M50 18Q80 20 80 56Q80 90 50 90Q20 90 20 56Q20 20 50 18Z" fill="#8E6A4E" />
      <path d="M28 52Q22 72 30 82Q40 76 38 58Z" fill="#7A5A40" strokeWidth="2.6" />
      <path d="M72 52Q78 72 70 82Q60 76 62 58Z" fill="#7A5A40" strokeWidth="2.6" />
      <ellipse cx="50" cy="66" rx="16" ry="18" fill="#E9D5B8" stroke="none" />
      <circle cx="38" cy="44" r="11" fill="#FFF8EC" />
      <circle cx="62" cy="44" r="11" fill="#FFF8EC" />
      <Eye x={38} y={45} r={5} /><Eye x={62} y={45} r={5} />
      <path d="M30 55q8 4 16 0M54 55q8 4 16 0" fill="none" stroke="#5A3A28" strokeWidth="2" />
      <path d="M46 52l4 7 4-7Z" fill="#F2B63C" strokeWidth="2.2" />
      <path d="M42 70l3 3M50 72l3 3M58 70l-3 3" fill="none" stroke="#B89A78" strokeWidth="1.8" />
    </>
  ),
  bebekkaret: () => (
    <>
      <path d="M14 70Q14 56 32 56H70Q90 56 88 72Q86 88 52 88Q14 88 14 70Z" fill="#F7D44A" />
      <path d="M70 58Q82 50 86 60Q80 64 72 62Z" fill="#F7D44A" strokeWidth="2.6" />
      <circle cx="38" cy="40" r="20" fill="#F7D44A" />
      <path d="M14 40Q4 42 6 48Q14 50 20 46Z" fill="#F08A3A" />
      <Eye x={34} y={36} r={4} />
      <path d="M40 66q10 8 22 2" fill="none" stroke="#E3B32A" strokeWidth="2.6" />
      <Blush at={[[44, 46]]} />
      <path d="M28 26q6-6 14-5M24 62q8-4 16-4" fill="none" stroke={SHINE} strokeWidth="3" />
    </>
  ),
  kucingoren: () => (
    <>
      <path d="M72 80Q94 78 90 58Q86 52 80 58" fill="none" stroke={O} strokeWidth="9" />
      <path d="M72 80Q94 78 90 58Q86 52 80 58" fill="none" stroke="#F0A050" strokeWidth="5" />
      <ellipse cx="50" cy="74" rx="24" ry="17" fill="#F0A050" />
      <path d="M26 34L24 12L42 24ZM74 34L76 12L58 24Z" fill="#F0A050" />
      <path d="M29 28L28 18L37 24ZM71 28L72 18L63 24Z" fill="#F3B4C0" stroke="none" />
      <circle cx="50" cy="42" r="25" fill="#F0A050" />
      <path d="M44 20l2 7M50 18v8M56 20l-2 7M26 42h7M67 42h7" fill="none" stroke="#C9762E" strokeWidth="2.6" />
      <ellipse cx="50" cy="52" rx="11" ry="8" fill="#FFF3E2" stroke="none" />
      <Eye x={40} y={42} r={4.6} /><Eye x={60} y={42} r={4.6} />
      <path d="M47 49h6l-3 3Z" fill="#E58A9A" strokeWidth="1.8" />
      <path d="M45 55q2.5 3 5 0q2.5 3 5 0" fill="none" strokeWidth="2" />
      <Blush at={[[32, 50], [68, 50]]} />
    </>
  ),
  cupang: () => (
    <>
      <path d="M18 34H82L78 80Q76 92 50 92Q24 92 22 80Z" fill="rgba(158,195,240,.45)" />
      <path d="M20 46H80L77 80Q75 90 50 90Q25 90 23 80Z" fill="rgba(110,160,220,.45)" stroke="none" />
      <path d="M18 34H82" fill="none" strokeWidth="3.4" />
      <path d="M62 64Q80 50 82 66Q80 82 62 70Z" fill="#7E43B5" strokeWidth="2.4" />
      <path d="M44 56Q38 44 50 46M44 74Q36 86 50 82" fill="#9B5CD0" strokeWidth="2.2" />
      <ellipse cx="48" cy="66" rx="16" ry="10" fill="#D2532A" />
      <Eye x={40} y={64} r={3} />
      <circle cx="30" cy="54" r="2.6" fill="none" stroke="#FFF8EC" strokeWidth="1.6" />
      <circle cx="34" cy="46" r="1.8" fill="none" stroke="#FFF8EC" strokeWidth="1.4" />
      <path d="M26 40q4 18 2 36" fill="none" stroke={SHINE} strokeWidth="3" />
    </>
  ),
  naga: () => (
    <>
      <path d="M74 74Q94 72 92 56Q88 66 76 64Z" fill="#F2B63C" />
      <path d="M30 40Q14 26 12 44Q22 40 30 50ZM70 40Q86 26 88 44Q78 40 70 50Z" fill="#F7D9A8" />
      <ellipse cx="50" cy="66" rx="26" ry="24" fill="#F2B63C" />
      <ellipse cx="50" cy="72" rx="15" ry="14" fill="#FBE6B4" stroke="none" />
      <path d="M38 28L34 16L44 24ZM62 28L66 16L56 24Z" fill="#FFF8EC" />
      <ellipse cx="50" cy="40" rx="22" ry="18" fill="#F2B63C" />
      <g fill="#D99A2A" stroke="none"><circle cx="34" cy="64" r="2.4" /><circle cx="66" cy="60" r="2" /><circle cx="60" cy="80" r="2.4" /><circle cx="40" cy="82" r="1.8" /></g>
      <Eye x={42} y={40} r={4.6} /><Eye x={58} y={40} r={4.6} />
      <path d="M44 50q6 4 12 0" fill="none" strokeWidth="2.4" />
      <Blush at={[[34, 47], [66, 47]]} />
      <g fill="#FBE6B4" strokeWidth="1.6"><circle cx="78" cy="40" r="3.4" /><circle cx="86" cy="34" r="2.6" /><circle cx="84" cy="44" r="2" /></g>
      <path d="M32 30q6-8 14-8" fill="none" stroke={SHINE} strokeWidth="3" />
    </>
  )
};

export default function PetArt({ id, size = 48, hop = false, still = false }) {
  const Art = ART[id];
  if (!Art) return null;
  const anim = still ? 'none' : hop ? 'petHop .52s ease-in-out infinite' : 'petBob 1.8s ease-in-out infinite';
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ display: 'block', overflow: 'visible' }} aria-hidden="true">
      <ellipse cx="50" cy="95" rx="32" ry="6" fill="url(#g-shadow)" />
      <g style={{ animation: anim, transformOrigin: '50px 95px' }}>
        <g stroke={O} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round"><Art /></g>
      </g>
    </svg>
  );
}
