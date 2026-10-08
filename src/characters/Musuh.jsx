// Enemy characters ("musuh"): one SVG per kind, drawn in a soft outlined style
// with a shaded underside, glossy eyes and blush.
export const KINDS = ['tikus', 'bebek', 'kumbang', 'lele', 'kelinci', 'lebah', 'angsa'];

const O = '#2B1E18';
const BLUSH = 'rgba(240,110,130,.42)';
const SHINE = 'rgba(255,255,255,.7)';

function Eye({ x, y, r = 6.5 }) {
  return (
    <g stroke="none">
      <circle cx={x} cy={y} r={r} fill={O} />
      <circle cx={x + r * 0.32} cy={y - r * 0.38} r={r * 0.36} fill="#FFF" />
      <circle cx={x - r * 0.4} cy={y + r * 0.35} r={r * 0.16} fill="#FFF" />
    </g>
  );
}
const Blush = ({ at }) => <g stroke="none" fill={BLUSH}>{at.map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="9" ry="5.5" />)}</g>;
// Fills `d` and adds a darker crescent along its bottom for volume.
function Shaded({ id, d, fill, shade = 'rgba(43,30,24,.14)', cy = 200, rx = 80, ry = 40 }) {
  return (
    <>
      <clipPath id={id}><path d={d} /></clipPath>
      <path d={d} fill={fill} />
      <ellipse cx="100" cy={cy} rx={rx} ry={ry} fill={shade} stroke="none" clipPath={`url(#${id})`} />
      <path d={d} fill="none" />
    </>
  );
}
function Line({ d, color, w = 3.5 }) {
  return (
    <>
      <path d={d} fill="none" stroke={O} strokeWidth={w + 3.5} />
      <path d={d} fill="none" stroke={color} strokeWidth={w} />
    </>
  );
}

const ART = {
  tikus: () => (
    <>
      <Line d="M58 172Q20 180 18 154Q16 132 36 134" color="#E9A9B8" w={4} />
      <circle cx="60" cy="64" r="26" fill="#B8AFC6" />
      <circle cx="60" cy="64" r="15" fill="#F3B4C0" stroke="none" />
      <circle cx="140" cy="64" r="26" fill="#B8AFC6" />
      <circle cx="140" cy="64" r="15" fill="#F3B4C0" stroke="none" />
      <ellipse cx="82" cy="186" rx="13" ry="7" fill="#F3B4C0" />
      <ellipse cx="118" cy="186" rx="13" ry="7" fill="#F3B4C0" />
      <Shaded id="ms-tikus" d="M100 70Q152 72 153 128Q155 182 100 184Q45 182 47 128Q48 72 100 70Z" fill="#B8AFC6" shade="rgba(70,50,110,.2)" cy={196} />
      <ellipse cx="100" cy="158" rx="28" ry="22" fill="#E9E2F0" stroke="none" />
      <path d="M80 128L100 140L120 128L118 137L100 149L82 137Z" fill="#FFF8EC" strokeWidth="2.6" />
      <path d="M100 140L93 148L100 176L107 148Z" fill="#3C78C8" strokeWidth="2.6" />
      <path d="M96 154l8 4M95 163l9 4" fill="none" stroke="#9EC3F0" strokeWidth="2" />
      <Blush at={[[70, 116], [130, 116]]} />
      <path d="M76 111Q84 115 92 111M108 111Q116 115 124 111" fill="none" stroke="#8A7FA0" strokeWidth="1.8" />
      <Eye x={84} y={101} r={6} /><Eye x={116} y={101} r={6} />
      <circle cx="84" cy="101" r="14" fill="rgba(220,232,247,.3)" strokeWidth="3" />
      <circle cx="116" cy="101" r="14" fill="rgba(220,232,247,.3)" strokeWidth="3" />
      <path d="M98 100h4" fill="none" strokeWidth="3" />
      <path d="M76 95l6-5" fill="none" stroke={SHINE} strokeWidth="2" />
      <ellipse cx="100" cy="118" rx="5.5" ry="4" fill="#E58A9A" strokeWidth="2.2" />
      <path d="M93 125Q96.5 128 100 125Q103.5 128 107 125" fill="none" strokeWidth="2.2" />
      <path d="M76 120L54 116M76 125L54 128M124 120L146 116M124 125L146 128" fill="none" strokeWidth="1.6" />
      <path d="M100 70q-4-10 4-14" fill="none" strokeWidth="2.4" />
      <g transform="rotate(-10 150 150)">
        <rect x="128" y="128" width="38" height="30" rx="3" fill="#FFF8EC" strokeWidth="2.4" />
        <rect x="132" y="124" width="34" height="30" rx="3" fill="#FFF8EC" strokeWidth="2.4" />
        <rect x="126" y="134" width="44" height="34" rx="4" fill="#F2B63C" />
        <path d="M126 142h44" fill="none" strokeWidth="2.2" />
      </g>
      <ellipse cx="140" cy="162" rx="10" ry="8" fill="#B8AFC6" />
    </>
  ),
  bebek: () => (
    <>
      <path d="M74 182L60 194H94Z" fill="#F08A3A" strokeWidth="3" />
      <path d="M126 182L106 194H140Z" fill="#F08A3A" strokeWidth="3" />
      <ellipse cx="48" cy="138" rx="12" ry="26" transform="rotate(18 48 138)" fill="#E8B23A" />
      <ellipse cx="152" cy="138" rx="12" ry="26" transform="rotate(-18 152 138)" fill="#E8B23A" />
      <Shaded id="ms-bebek" d="M100 70Q156 70 156 130Q156 188 100 188Q44 188 44 130Q44 70 100 70Z" fill="#F7C948" shade="rgba(180,110,20,.2)" cy={198} />
      <ellipse cx="100" cy="158" rx="32" ry="24" fill="#FFE6A0" stroke="none" />
      <path d="M56 92Q58 46 100 44Q142 46 144 92Z" fill="#2E3A5C" />
      <path d="M58 82Q100 90 142 82" fill="none" stroke="#4A5A85" strokeWidth="5" />
      <path d="M50 92Q100 102 150 92Q150 101 100 108Q50 101 50 92Z" fill="#1F2842" />
      <path d="M100 54l4.5 9 10 1.4-7.3 7 1.8 10L100 77l-9 4.4 1.8-10-7.3-7 10-1.4Z" fill="#F2B63C" strokeWidth="2" />
      <path d="M72 112L92 118M128 112L108 118" fill="none" strokeWidth="4" />
      <Eye x={84} y={124} r={6} /><Eye x={116} y={124} r={6} />
      <Blush at={[[68, 136], [132, 136]]} />
      <ellipse cx="100" cy="142" rx="22" ry="9" fill="#F08A3A" />
      <path d="M78 142Q100 148 122 142" fill="none" strokeWidth="2.4" />
      <path d="M86 138q6-3 12-2" fill="none" stroke={SHINE} strokeWidth="2" />
      <Line d="M84 152Q100 172 124 166" color="#D2532A" w={2.4} />
      <path d="M124 158h18v12h-12a6 6 0 0 1-6-6Z" fill="#C9D2CE" strokeWidth="2.6" />
      <circle cx="132" cy="164" r="2.6" fill={O} stroke="none" />
    </>
  ),
  kumbang: () => (
    <>
      <path d="M64 150L40 160L34 170M60 168L36 184L30 194M68 182L56 196M136 150L160 160L166 170M140 168L164 184L170 194M132 182L144 196" fill="none" strokeWidth="4" />
      <Shaded id="ms-kumbang" d="M100 96Q152 98 152 144Q152 190 100 190Q48 190 48 144Q48 98 100 96Z" fill="#2E8C86" shade="rgba(10,40,40,.3)" cy={200} />
      <path d="M100 100V190" fill="none" strokeWidth="3" />
      <ellipse cx="76" cy="150" rx="9" ry="12" fill="#3FA69F" stroke="none" />
      <ellipse cx="126" cy="160" rx="8" ry="10" fill="#3FA69F" stroke="none" />
      <path d="M62 128Q66 110 84 106M138 128Q134 112 120 107" fill="none" stroke={SHINE} strokeWidth="3" />
      <path d="M86 74Q76 46 56 50Q46 54 50 66" fill="none" strokeWidth="3.4" />
      <path d="M114 74Q124 46 144 50Q154 54 150 66" fill="none" strokeWidth="3.4" />
      <circle cx="50" cy="66" r="5" fill="#C9A8F0" />
      <circle cx="150" cy="66" r="5" fill="#C9A8F0" />
      <ellipse cx="100" cy="96" rx="36" ry="27" fill="#24304A" />
      <path d="M74 80L92 86M126 80L108 86" fill="none" stroke="#C9D2E6" strokeWidth="3" />
      <ellipse cx="86" cy="96" rx="10.5" ry="11.5" fill="#FFF8EC" strokeWidth="2.6" />
      <ellipse cx="114" cy="96" rx="10.5" ry="11.5" fill="#FFF8EC" strokeWidth="2.6" />
      <Eye x={86} y={100} r={5.5} /><Eye x={114} y={100} r={5.5} />
      <path d="M78 106Q72 122 80 132Q88 122 82 106Z" fill="#9EC3F0" strokeWidth="2" />
      <path d="M93 116Q100 111 107 116" fill="none" stroke="#C9D2E6" strokeWidth="2.6" />
      <Blush at={[[72, 108], [128, 108]]} />
      <path d="M156 30Q156 22 163 22Q168 22 168 28L164 34L168 38L160 46L150 36Q146 30 156 30Z" fill="#F08CA8" strokeWidth="2.2" />
      <path d="M174 36Q178 30 184 34Q188 40 176 50L170 44L174 40Z" fill="#F08CA8" strokeWidth="2.2" />
    </>
  ),
  lele: () => (
    <>
      <path d="M44 132Q20 104 8 110Q16 134 8 160Q22 164 44 140Z" fill="#5D7689" />
      <path d="M78 88Q96 60 124 80L120 92Z" fill="#5D7689" />
      <Shaded id="ms-lele" d="M36 134Q36 82 112 82Q178 82 178 134Q178 182 112 182Q36 182 36 134Z" fill="#7C96AA" shade="rgba(30,50,70,.18)" cy={196} />
      <clipPath id="ms-lele-belly"><path d="M36 134Q36 82 112 82Q178 82 178 134Q178 182 112 182Q36 182 36 134Z" /></clipPath>
      <ellipse cx="116" cy="178" rx="62" ry="28" fill="#DCE8EE" stroke="none" clipPath="url(#ms-lele-belly)" />
      <path d="M36 134Q36 82 112 82Q178 82 178 134Q178 182 112 182Q36 182 36 134Z" fill="none" />
      <g fill="#5D7689" stroke="none"><circle cx="66" cy="114" r="4.5" /><circle cx="82" cy="102" r="3.4" /><circle cx="58" cy="132" r="3.2" /><circle cx="76" cy="124" r="2.6" /></g>
      <path d="M58 106q14-14 34-16" fill="none" stroke={SHINE} strokeWidth="3" />
      <path d="M120 88Q150 80 172 98" fill="none" stroke={O} strokeWidth="15" />
      <path d="M120 88Q150 80 172 98" fill="none" stroke="#D2532A" strokeWidth="9" />
      <path d="M124 88Q148 82 168 96" fill="none" stroke="#FFF8EC" strokeWidth="1.8" strokeDasharray="4 4" />
      <path d="M122 90Q104 74 92 80Q104 84 110 94ZM120 92Q108 98 98 112Q114 106 124 96Z" fill="#D2532A" strokeWidth="2.6" />
      <path d="M140 108Q148 102 158 106" fill="none" strokeWidth="3.4" />
      <Eye x={150} y={118} r={8} />
      <Blush at={[[142, 138], [170, 128]]} />
      <path d="M144 148Q162 162 178 140Q160 150 144 148Z" fill="#8E3418" strokeWidth="3" />
      <path d="M150 150Q160 156 170 148" fill="none" stroke="#F08CA8" strokeWidth="3.4" />
      <path d="M144 148Q160 152 178 140" fill="none" strokeWidth="3" />
      <Line d="M174 140Q192 142 196 162M172 146Q182 160 176 180M172 128Q190 118 198 124M168 120Q178 104 192 100" color="#DCE8EE" w={1.8} />
      <path d="M96 156Q92 130 108 120Q120 128 112 150Z" fill="#5D7689" />
      <path d="M102 132l6 10" fill="none" stroke="#9FB4C4" strokeWidth="2" />
      <path d="M100 52l3 7.5 8 .6-6 5.2 2 7.8-7-4.2-7 4.2 2-7.8-6-5.2 8-.6Z" fill="#F2B63C" strokeWidth="2" />
      <path d="M126 58l2 4.5 5 .5-3.8 3.2 1.2 5-4.4-2.7-4.4 2.7 1.2-5-3.8-3.2 5-.5Z" fill="#F2B63C" strokeWidth="1.6" />
    </>
  ),
  kelinci: () => (
    <>
      <ellipse cx="80" cy="188" rx="16" ry="7" fill="#FFF8EC" />
      <ellipse cx="120" cy="188" rx="16" ry="7" fill="#FFF8EC" />
      <path d="M74 90Q60 22 80 14Q98 22 92 90Z" fill="#FFF8EC" />
      <path d="M79 82Q71 34 80 26Q88 34 87 82Z" fill="#F3B4C0" stroke="none" />
      <path d="M108 90Q110 42 126 34Q152 30 162 48Q140 46 128 56Q124 72 126 90Z" fill="#FFF8EC" />
      <path d="M114 84Q116 50 128 44Q146 40 152 46Q136 48 124 58Q120 70 121 84Z" fill="#F3B4C0" stroke="none" />
      <Shaded id="ms-kelinci" d="M100 86Q152 86 152 138Q152 190 100 190Q48 190 48 138Q48 86 100 86Z" fill="#FFF8EC" shade="rgba(120,110,150,.16)" cy={200} />
      <clipPath id="ms-kelinci-vest"><path d="M100 86Q152 86 152 138Q152 190 100 190Q48 190 48 138Q48 86 100 86Z" /></clipPath>
      <path d="M40 160L80 150L100 172L120 150L160 160V200H40Z" fill="#3A3550" clipPath="url(#ms-kelinci-vest)" />
      <path d="M100 86Q152 86 152 138Q152 190 100 190Q48 190 48 138Q48 86 100 86Z" fill="none" />
      <g fill="#F2B63C" strokeWidth="1.6"><circle cx="100" cy="178" r="2.6" /></g>
      <Blush at={[[68, 140], [132, 140]]} />
      <rect x="62" y="110" width="33" height="20" rx="8" fill={O} />
      <rect x="105" y="110" width="33" height="20" rx="8" fill={O} />
      <path d="M95 117h10" fill="none" strokeWidth="3" />
      <path d="M68 116l9 0M111 116l9 0" fill="none" stroke="#7E86A8" strokeWidth="2.4" />
      <path d="M95 137H105L100 143Z" fill="#E58A86" strokeWidth="2" />
      <path d="M100 143V147M90 148Q100 154 112 146" fill="none" strokeWidth="2.4" />
      <rect x="96" y="148" width="8" height="7" rx="1.5" fill="#FFF8EC" strokeWidth="1.8" />
      <g transform="rotate(8 150 160)">
        <rect x="132" y="134" width="38" height="50" rx="5" fill="#C98F45" />
        <rect x="137" y="144" width="28" height="35" rx="2" fill="#FFF8EC" strokeWidth="2" />
        <path d="M141 152h18M141 160h18M141 168h12" fill="none" stroke="#B9C4BE" strokeWidth="2" />
        <path d="M156 166l3 3 6-7" fill="none" stroke="#D2532A" strokeWidth="2.4" />
        <rect x="143" y="129" width="16" height="8" rx="2" fill="#B9C4BE" strokeWidth="2" />
      </g>
      <ellipse cx="136" cy="168" rx="9" ry="8" fill="#FFF8EC" />
      <path d="M66 98q6-6 14-7" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="2.6" />
    </>
  ),
  lebah: (a) => (
    <>
      <g style={{ animation: a.wingL, transformOrigin: '86px 94px' }}>
        <ellipse cx="60" cy="78" rx="28" ry="19" transform="rotate(-30 60 78)" fill="rgba(220,232,247,.85)" />
        <path d="M80 88Q64 78 46 70" fill="none" stroke="#9EC3F0" strokeWidth="1.8" />
      </g>
      <g style={{ animation: a.wingR, transformOrigin: '114px 94px' }}>
        <ellipse cx="140" cy="78" rx="28" ry="19" transform="rotate(30 140 78)" fill="rgba(220,232,247,.85)" />
        <path d="M120 88Q136 78 154 70" fill="none" stroke="#9EC3F0" strokeWidth="1.8" />
      </g>
      <path d="M100 196L91 180H109Z" fill={O} />
      <path d="M86 80Q80 56 66 52M114 80Q120 56 134 52" fill="none" strokeWidth="3.4" />
      <circle cx="64" cy="51" r="5.5" fill={O} />
      <circle cx="136" cy="51" r="5.5" fill={O} />
      <clipPath id="ms-lebah-body"><circle cx="100" cy="130" r="54" /></clipPath>
      <circle cx="100" cy="130" r="54" fill="#F7C948" />
      <g clipPath="url(#ms-lebah-body)" stroke="none">
        <path d="M40 140Q100 156 160 140V156Q100 172 40 156Z" fill={O} />
        <path d="M40 168Q100 184 160 168V190H40Z" fill={O} />
        <ellipse cx="100" cy="200" rx="80" ry="34" fill="rgba(160,90,10,.22)" />
      </g>
      <circle cx="100" cy="130" r="54" fill="none" />
      <path d="M58 116q4-20 22-28" fill="none" stroke={SHINE} strokeWidth="3" />
      <Eye x={84} y={108} r={6} /><Eye x={116} y={108} r={6} />
      <path d="M72 114H96Q95 124 84 124Q73 124 72 114ZM104 114H128Q127 124 116 124Q105 124 104 114Z" fill="rgba(255,248,236,.35)" stroke="#C28A16" strokeWidth="2.6" />
      <path d="M96 116h8" fill="none" stroke="#C28A16" strokeWidth="2.6" />
      <Blush at={[[70, 128], [130, 128]]} />
      <path d="M94 132Q100 135 106 132" fill="none" strokeWidth="2.4" />
      <ellipse cx="150" cy="152" rx="9" ry="8" fill="#F7C948" />
      <g transform="rotate(-14 160 152)">
        <rect x="152" y="118" width="16" height="26" rx="6" fill="#8E5A2B" />
        <rect x="144" y="142" width="32" height="12" rx="3" fill={O} />
        <rect x="142" y="153" width="36" height="6" rx="2" fill="#D2532A" strokeWidth="2" />
      </g>
    </>
  ),
  angsa: () => (
    <>
      <path d="M82 184L70 195H98Z" fill="#F08A3A" strokeWidth="3" />
      <path d="M120 184L108 195H136Z" fill="#F08A3A" strokeWidth="3" />
      <path d="M150 120L182 104L172 132Z" fill="#FFF8EC" />
      <path d="M96 114Q84 82 96 62Q104 48 102 36" fill="none" stroke={O} strokeWidth="25" />
      <path d="M96 114Q84 82 96 62Q104 48 102 36" fill="none" stroke="#FFF8EC" strokeWidth="18" />
      <Shaded id="ms-angsa" d="M44 152Q40 112 84 106L120 106Q166 110 162 152Q160 190 104 190Q46 190 44 152Z" fill="#FFF8EC" shade="rgba(120,110,150,.16)" cy={200} />
      <path d="M68 136Q100 124 134 142Q122 170 86 166Q66 158 68 136Z" fill="#ECE5DA" strokeWidth="3" />
      <path d="M82 146Q100 140 120 148M80 156Q98 152 114 158" fill="none" stroke="#CFC6B8" strokeWidth="2" />
      <path d="M80 104Q100 98 122 104L118 116Q100 110 84 116Z" fill={O} />
      <path d="M95 110L100 128L105 110Z" fill="#FFF8EC" strokeWidth="2" />
      <path d="M92 110L96 126L100 110" fill="#FFF8EC" strokeWidth="2" />
      <g fill="#DAD3CA">
        <circle cx="94" cy="22" r="9" /><circle cx="106" cy="18" r="9" /><circle cx="86" cy="32" r="8" /><circle cx="88" cy="44" r="7" />
      </g>
      <ellipse cx="106" cy="36" rx="20" ry="16" fill="#FFF8EC" />
      <g fill="#DAD3CA"><circle cx="100" cy="22" r="8" /><circle cx="112" cy="21" r="7" /></g>
      <path d="M123 30L150 37L123 45Z" fill="#F08A3A" />
      <path d="M123 37.5H142" fill="none" strokeWidth="2" />
      <Eye x={114} y={34} r={4.5} />
      <path d="M106 26L121 29" fill="none" strokeWidth="3.4" />
      <Blush at={[[108, 44]]} />
      <path d="M58 132q2-14 16-20" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="3" />
      <g transform="rotate(-30 150 160)">
        <rect x="146" y="138" width="8" height="44" rx="3" fill="#8E5A2B" />
        <rect x="132" y="124" width="36" height="17" rx="5" fill="#A0693A" />
        <path d="M140 124V141M160 124V141" fill="none" stroke="#F2B63C" strokeWidth="3" />
      </g>
      <ellipse cx="142" cy="164" rx="10" ry="8" fill="#FFF8EC" />
    </>
  )
};

/** @param {{ kind?: string, flip?: boolean, still?: boolean }} props */
export default function Musuh({ kind = 'tikus', flip = false, still = false }) {
  const Art = ART[kind] || ART.tikus;
  const anim = {
    bob: still ? 'none' : kind === 'kumbang' ? 'msSag 3.2s ease-in-out infinite' : 'msBob 2.2s ease-in-out infinite',
    wingL: still ? 'none' : 'msWingL .25s ease-in-out infinite',
    wingR: still ? 'none' : 'msWingR .25s ease-in-out infinite'
  };
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <svg viewBox="0 0 200 200" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', display: 'block' }}>
        <ellipse cx="100" cy="194" rx="58" ry="7" style={{ fill: 'rgba(43,30,24,.16)' }} />
        <g style={{ transform: flip ? 'scaleX(-1)' : 'none', transformOrigin: '100px 100px' }}>
          <g style={{ animation: anim.bob, transformOrigin: '100px 192px' }}>
            <g stroke={O} strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round">
              <Art {...anim} />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
