// Enemy characters ("musuh"): one SVG per kind, drawn in a soft outlined style
// with a shaded underside, glossy eyes and blush.
export const KINDS = ['tikus', 'bebek', 'kumbang', 'lele', 'kelinci', 'lebah', 'angsa'];

const O = '#2B1E18';
const BLUSH = 'rgba(240,110,130,.42)';
const SHINE = 'rgba(255,255,255,.7)';

// Eyes blink on a slow loop (paused by the .ms-still class on still renders).
function Eye({ x, y, r = 6.5 }) {
  return (
    <g stroke="none" className="ms-blink" style={{ transformOrigin: `${x}px ${y}px`, animationDelay: `${(x * 37 + y * 13) % 30 / 10}s` }}>
      <circle cx={x} cy={y} r={r} fill={O} />
      <circle cx={x + r * 0.32} cy={y - r * 0.38} r={r * 0.36} fill="#FFF" />
      <circle cx={x - r * 0.4} cy={y + r * 0.35} r={r * 0.16} fill="#FFF" />
    </g>
  );
}
const Blush = ({ at }) => <g stroke="none" fill={BLUSH}>{at.map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="9" ry="5.5" />)}</g>;
// Fills `d`, then layers a feathered shade along its bottom, a soft vertical falloff and a
// gloss highlight (shared gradients from SvgDefs) before redrawing the outline on top.
function Shaded({ id, d, fill, shade = 'rgba(43,30,24,.14)', cy = 200, rx = 80, ry = 40 }) {
  return (
    <>
      <clipPath id={id}><path d={d} /></clipPath>
      <radialGradient id={`${id}-f`}>
        <stop offset=".62" stopColor={shade} />
        <stop offset="1" stopColor={shade} stopOpacity="0" />
      </radialGradient>
      <path d={d} fill={fill} />
      <ellipse cx="100" cy={cy} rx={rx * 1.08} ry={ry * 1.25} fill={`url(#${id}-f)`} stroke="none" clipPath={`url(#${id})`} />
      <path d={d} fill="url(#g-shade)" stroke="none" />
      <path d={d} fill="url(#g-sheen)" stroke="none" />
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

// Third-wave enemies and the two new bosses.
Object.assign(ART, {
  kucing: () => (
    <>
      <Line d="M136 178Q178 180 174 148Q172 130 156 132" color="#F3C9A0" w={9} />
      <ellipse cx="84" cy="188" rx="14" ry="7" fill="#F3C9A0" />
      <ellipse cx="116" cy="188" rx="14" ry="7" fill="#F3C9A0" />
      <Shaded id="ms-kucing" d="M100 126Q140 126 140 160Q140 190 100 190Q60 190 60 160Q60 126 100 126Z" fill="#F3C9A0" shade="rgba(160,90,30,.18)" cy={200} />
      <ellipse cx="100" cy="166" rx="20" ry="18" fill="#FFF3E2" stroke="none" />
      <path d="M60 72L54 28L90 52Z" fill="#F3C9A0" />
      <path d="M64 63L60 40L80 54Z" fill="#F3B4C0" stroke="none" />
      <path d="M140 72L146 28L110 52Z" fill="#F3C9A0" />
      <path d="M136 63L140 40L120 54Z" fill="#F3B4C0" stroke="none" />
      <Shaded id="ms-kucing-h" d="M100 46Q148 46 148 92Q148 134 100 134Q52 134 52 92Q52 46 100 46Z" fill="#F3C9A0" shade="rgba(160,90,30,.14)" cy={150} rx={70} ry={30} />
      <path d="M92 50l2 12M100 48v14M108 50l-2 12M54 90h10M55 99h9M146 90h-10M145 99h-9" fill="none" stroke="#D9955E" strokeWidth="3" />
      <ellipse cx="100" cy="108" rx="18" ry="13" fill="#FFF3E2" stroke="none" />
      <Eye x={82} y={90} r={7} /><Eye x={118} y={90} r={7} />
      <path d="M74 84l-5-4M126 84l5-4" fill="none" strokeWidth="2.4" />
      <path d="M96 103h8l-4 5z" fill="#E58A9A" strokeWidth="2" />
      <path d="M92 112q4 4 8 0q4 4 8 0" fill="none" strokeWidth="2.2" />
      <path d="M72 108L48 104M72 114L48 118M128 108L152 104M128 114L152 118" fill="none" strokeWidth="1.6" />
      <Blush at={[[72, 104], [128, 104]]} />
      <Line d="M134 158L162 96" color="#B9C4BE" w={3} />
      <circle cx="166" cy="80" r="21" fill="none" stroke={O} strokeWidth="9" />
      <circle cx="166" cy="80" r="21" fill="none" stroke="#FFF6D0" strokeWidth="4.5" />
      <rect x="157" y="67" width="18" height="27" rx="4" fill={O} />
      <rect x="160" y="71" width="12" height="17" rx="2" fill="#9EC3F0" stroke="none" />
      <ellipse cx="134" cy="160" rx="10" ry="8" fill="#F3C9A0" />
      <rect x="18" y="36" width="38" height="17" rx="6" fill="#D2532A" />
      <text x="37" y="48.5" textAnchor="middle" style={{ font: "700 10px 'DM Mono',monospace", fill: '#FFF8EC', stroke: 'none' }}>LIVE</text>
    </>
  ),
  kura: () => (
    <>
      <ellipse cx="66" cy="186" rx="15" ry="8" fill="#A9C98A" />
      <ellipse cx="134" cy="186" rx="15" ry="8" fill="#A9C98A" />
      <ellipse cx="44" cy="140" rx="12" ry="19" transform="rotate(22 44 140)" fill="#A9C98A" />
      <Shaded id="ms-kura" d="M100 96Q164 98 166 146Q166 188 100 190Q34 188 34 146Q36 98 100 96Z" fill="#6E9E5A" shade="rgba(20,50,20,.22)" cy={200} />
      <g fill="#86B470" strokeWidth="2.2">
        <path d="M46 124l12-7 12 7v13l-12 7-12-7z" /><path d="M130 124l12-7 12 7v13l-12 7-12-7z" /><path d="M88 104l12-6 12 6v10l-12 6-12-6z" />
      </g>
      <ellipse cx="100" cy="156" rx="37" ry="31" fill="#E8D9A0" />
      <path d="M66 148h68M68 164h64M100 126v60" fill="none" stroke="#C9B77A" strokeWidth="2.2" />
      <rect x="16" y="124" width="36" height="28" rx="3" fill="#FFF8EC" strokeWidth="2.6" />
      <rect x="20" y="118" width="36" height="28" rx="3" fill="#FFF8EC" strokeWidth="2.6" />
      <path d="M25 126h26M25 133h26M25 140h18" fill="none" stroke="#B9C4BE" strokeWidth="2" />
      <ellipse cx="100" cy="82" rx="29" ry="26" fill="#A9C98A" />
      <Eye x={89} y={82} r={5} /><Eye x={111} y={82} r={5} />
      <rect x="77" y="74" width="23" height="16" rx="4" fill="rgba(220,232,247,.35)" strokeWidth="2.6" />
      <rect x="100" y="74" width="23" height="16" rx="4" fill="rgba(220,232,247,.35)" strokeWidth="2.6" />
      <path d="M93 98h14" fill="none" strokeWidth="2.4" />
      <Blush at={[[78, 94], [122, 94]]} />
      <path d="M84 62q6-4 12-4" fill="none" stroke={SHINE} strokeWidth="2.4" />
      <ellipse cx="150" cy="146" rx="11" ry="9" fill="#A9C98A" />
      <rect x="146" y="106" width="13" height="24" rx="5" fill="#8E5A2B" />
      <rect x="138" y="128" width="29" height="11" rx="3" fill="#D2532A" />
    </>
  ),
  kambing: () => (
    <>
      <rect x="76" y="176" width="15" height="14" rx="3" fill="#5A4A40" />
      <rect x="109" y="176" width="15" height="14" rx="3" fill="#5A4A40" />
      <Shaded id="ms-kambing" d="M100 118Q142 118 142 154Q142 186 100 186Q58 186 58 154Q58 118 100 118Z" fill="#F2EEE6" shade="rgba(120,110,100,.2)" cy={198} />
      <Line d="M80 52Q60 28 46 42Q40 58 58 62" color="#A0764A" w={7} />
      <Line d="M120 52Q140 28 154 42Q160 58 142 62" color="#A0764A" w={7} />
      <ellipse cx="54" cy="80" rx="17" ry="7" transform="rotate(-18 54 80)" fill="#F2EEE6" />
      <ellipse cx="146" cy="80" rx="17" ry="7" transform="rotate(18 146 80)" fill="#F2EEE6" />
      <ellipse cx="54" cy="80" rx="10" ry="3" transform="rotate(-18 54 80)" fill="#F3B4C0" stroke="none" />
      <ellipse cx="146" cy="80" rx="10" ry="3" transform="rotate(18 146 80)" fill="#F3B4C0" stroke="none" />
      <path d="M92 124L100 152L108 124Z" fill="#E6D9CC" />
      <path d="M100 44Q132 46 132 84Q132 118 100 128Q68 118 68 84Q68 46 100 44Z" fill="#F2EEE6" />
      <ellipse cx="100" cy="110" rx="18" ry="12" fill="#E6D9CC" stroke="none" />
      <g fill={O} stroke="none"><ellipse cx="94" cy="108" rx="2" ry="3" /><ellipse cx="106" cy="108" rx="2" ry="3" /></g>
      <Eye x={86} y={80} r={5.5} /><Eye x={114} y={80} r={5.5} />
      <path d="M76 68Q84 60 93 66M108 70Q116 68 124 70" fill="none" strokeWidth="3" />
      <path d="M92 120Q100 115 108 120" fill="none" strokeWidth="2.4" />
      <Blush at={[[76, 96], [124, 96]]} />
      <path d="M118 46q8 2 12 10" fill="none" stroke={SHINE} strokeWidth="2.4" />
      <ellipse cx="138" cy="144" rx="10" ry="8" fill="#F2EEE6" />
      <rect x="136" y="114" width="8" height="26" rx="3" transform="rotate(20 140 127)" fill="#3A3550" />
      <circle cx="148" cy="110" r="10" fill="#6E7A74" />
      <path d="M142 106h12M141 111h14M143 116h10" fill="none" stroke="#A8B4AE" strokeWidth="1.4" />
      <path d="M160 92l8-6M162 102h10M158 82l4-8" fill="none" strokeWidth="2.4" />
    </>
  ),
  cumi: () => (
    <>
      {[64, 78, 92, 108, 122, 136].map((x, i) => (
        <Line key={i} d={`M${x} 148Q${x - 9} 166 ${x} 178Q${x + 9} 190 ${x - 2} 196`} color={i % 2 ? '#F7B8D3' : '#F49AC1'} w={7} />
      ))}
      <path d="M74 62L48 54L66 86Z" fill="#F49AC1" />
      <path d="M126 62L152 54L134 86Z" fill="#F49AC1" />
      <Shaded id="ms-cumi" d="M100 22Q142 68 140 120Q138 160 100 162Q62 160 60 120Q58 68 100 22Z" fill="#F49AC1" shade="rgba(160,40,90,.18)" cy={176} rx={70} ry={30} />
      <g fill="#F7C2DA" stroke="none"><circle cx="90" cy="60" r="5" /><circle cx="110" cy="74" r="4" /><circle cx="96" cy="84" r="3" /></g>
      <path d="M82 50q6-12 14-18" fill="none" stroke={SHINE} strokeWidth="3" />
      <Line d="M58 108Q58 66 100 64Q142 66 142 108" color="#3A3550" w={5} />
      <rect x="48" y="98" width="17" height="30" rx="7" fill="#4FB0A8" />
      <rect x="135" y="98" width="17" height="30" rx="7" fill="#4FB0A8" />
      <Eye x={86} y={118} r={8} /><Eye x={114} y={118} r={8} />
      <path d="M90 138Q100 146 110 138" fill="none" strokeWidth="2.6" />
      <Blush at={[[78, 132], [122, 132]]} />
      <circle cx="34" cy="150" r="17" fill={O} />
      <circle cx="34" cy="150" r="11" fill="none" stroke="#5A5470" strokeWidth="1.4" />
      <circle cx="34" cy="150" r="5" fill="#D2532A" strokeWidth="1.6" />
      <path d="M160 40v-14l9-3v13" fill="none" strokeWidth="2.6" />
      <ellipse cx="157" cy="40" rx="4" ry="3" fill={O} />
      <ellipse cx="166" cy="36" rx="4" ry="3" fill={O} />
    </>
  ),
  kodok: () => (
    <>
      <ellipse cx="62" cy="182" rx="23" ry="10" fill="#6DB35A" />
      <ellipse cx="138" cy="182" rx="23" ry="10" fill="#6DB35A" />
      <Shaded id="ms-kodok" d="M100 104Q150 106 150 148Q150 186 100 188Q50 186 50 148Q50 106 100 104Z" fill="#7CC46A" shade="rgba(30,80,20,.2)" cy={198} />
      <ellipse cx="100" cy="160" rx="30" ry="22" fill="#DDF0C8" stroke="none" />
      <path d="M68 110L100 128L132 110L130 124L100 142L70 124Z" fill="#2F7A5C" />
      <path d="M84 120l16 9 16-9" fill="none" stroke="#C9F27A" strokeWidth="2.4" />
      <ellipse cx="100" cy="94" rx="47" ry="30" fill="#7CC46A" />
      <path d="M56 86Q58 46 100 44Q142 46 144 86Z" fill="#2F7A5C" />
      <path d="M100 45v40" fill="none" stroke="#F2B63C" strokeWidth="5" />
      <path d="M54 86Q100 95 146 86" fill="none" strokeWidth="4" />
      <circle cx="72" cy="66" r="15" fill="#7CC46A" />
      <circle cx="128" cy="66" r="15" fill="#7CC46A" />
      <Eye x={72} y={66} r={7.5} /><Eye x={128} y={66} r={7.5} />
      <path d="M72 104Q100 124 128 104" fill="none" strokeWidth="3" />
      <path d="M94 113q6 5 12 0" fill="#F08CA8" strokeWidth="2" />
      <Blush at={[[66, 102], [134, 102]]} />
      <ellipse cx="142" cy="150" rx="10" ry="8" fill="#7CC46A" />
      <rect x="140" y="128" width="20" height="30" rx="4" fill={O} />
      <rect x="143" y="132" width="14" height="20" rx="2" fill="#9EC3F0" stroke="none" />
      <path d="M150 136l1.6 3.4 3.6.4-2.7 2.4.8 3.6-3.3-1.9-3.3 1.9.8-3.6-2.7-2.4 3.6-.4Z" fill="#F2B63C" strokeWidth="1" />
    </>
  ),
  buaya: () => (
    <>
      <path d="M58 172Q16 182 8 152Q26 164 48 152Z" fill="#5E8C4A" />
      <ellipse cx="74" cy="188" rx="16" ry="7" fill="#5E8C4A" />
      <ellipse cx="126" cy="188" rx="16" ry="7" fill="#5E8C4A" />
      <Shaded id="ms-buaya" d="M100 110Q152 112 154 152Q154 190 100 190Q46 190 46 152Q48 112 100 110Z" fill="#5E8C4A" shade="rgba(20,40,10,.25)" cy={200} />
      <ellipse cx="100" cy="162" rx="30" ry="25" fill="#C9D99A" />
      <path d="M74 152h52M72 164h56M76 176h48" fill="none" stroke="#A6B878" strokeWidth="2" />
      <Line d="M68 122Q100 148 132 122" color="#F2B63C" w={4} />
      <circle cx="100" cy="137" r="8" fill="#F2B63C" />
      <path d="M100 132v10M97 134h5a2 2 0 0 1 0 4h-4a2 2 0 0 0 0 4h5" fill="none" strokeWidth="1.4" />
      <path d="M58 96Q58 56 100 54Q142 56 142 96Q142 112 100 114Q58 112 58 96Z" fill="#5E8C4A" />
      <path d="M76 96Q76 80 100 80Q124 80 124 96V128Q124 142 100 142Q76 142 76 128Z" fill="#6E9C58" />
      <path d="M78 112l4 5 4-5 4 5 4-5M106 112l4 5 4-5 4 5 4-5" fill="#FFF8EC" strokeWidth="1.8" />
      <g fill={O} stroke="none"><ellipse cx="94" cy="133" rx="2.4" ry="3.4" /><ellipse cx="106" cy="133" rx="2.4" ry="3.4" /></g>
      <circle cx="78" cy="58" r="14" fill="#5E8C4A" />
      <circle cx="122" cy="58" r="14" fill="#5E8C4A" />
      <Eye x={78} y={60} r={6} /><Eye x={122} y={60} r={6} />
      <path d="M66 46L88 52M134 46L112 52" fill="none" strokeWidth="3.4" />
      <path d="M86 86q6-4 14-3" fill="none" stroke={SHINE} strokeWidth="2.4" />
      <ellipse cx="150" cy="150" rx="11" ry="9" fill="#5E8C4A" />
      {[-24, -8, 8].map((r, i) => <rect key={i} x="146" y="112" width="22" height="34" rx="2" transform={`rotate(${r} 156 146)`} fill={i === 1 ? '#8FD6A8' : '#6FC48E'} strokeWidth="2.4" />)}
      <path d="M160 6l3 7 7 .6-5.4 4.6 1.7 7-6.3-3.8-6.3 3.8 1.7-7-5.4-4.6 7-.6Z" fill="#F2B63C" strokeWidth="1.8" />
    </>
  ),
  gajah: () => (
    <>
      <ellipse cx="46" cy="92" rx="30" ry="38" fill="#9AA3B5" />
      <ellipse cx="46" cy="92" rx="19" ry="27" fill="#E6B8C8" stroke="none" />
      <ellipse cx="154" cy="92" rx="30" ry="38" fill="#9AA3B5" />
      <ellipse cx="154" cy="92" rx="19" ry="27" fill="#E6B8C8" stroke="none" />
      <rect x="70" y="168" width="23" height="24" rx="7" fill="#8A93A6" />
      <rect x="107" y="168" width="23" height="24" rx="7" fill="#8A93A6" />
      <Shaded id="ms-gajah" d="M100 112Q148 114 148 156Q148 188 100 188Q52 188 52 156Q52 114 100 112Z" fill="#2E3A5C" shade="rgba(0,0,0,.22)" cy={198} />
      <path d="M82 114L100 148L118 114Z" fill="#FFF8EC" />
      <path d="M100 124L93 133L100 164L107 133Z" fill="#D2532A" strokeWidth="2.4" />
      <path d="M70 124L88 146M130 124L112 146" fill="none" stroke="#4A5A85" strokeWidth="2.4" />
      <ellipse cx="100" cy="80" rx="39" ry="37" fill="#9AA3B5" />
      <path d="M92 44q-2-8 4-10M100 43q0-8 6-9" fill="none" strokeWidth="2.4" />
      <Line d="M84 106Q76 122 86 130" color="#FFF8EC" w={5} />
      <Line d="M116 106Q124 122 114 130" color="#FFF8EC" w={5} />
      <Line d="M100 96Q100 140 118 148Q130 150 128 138" color="#9AA3B5" w={13} />
      <path d="M96 116h8M96 126h8" fill="none" stroke="#7A8398" strokeWidth="1.8" />
      <Eye x={86} y={76} r={5.5} /><Eye x={114} y={76} r={5.5} />
      <circle cx="114" cy="76" r="10" fill="rgba(255,255,255,.25)" stroke="#F2B63C" strokeWidth="2.6" />
      <path d="M124 80Q130 96 126 110" fill="none" stroke="#F2B63C" strokeWidth="1.6" />
      <path d="M76 64L94 68M106 68L124 64" fill="none" strokeWidth="3" />
      <Blush at={[[74, 92], [126, 92]]} />
      <path d="M74 58q6-10 16-12" fill="none" stroke={SHINE} strokeWidth="2.6" />
      <path d="M118 128h18v6q0 7-9 7t-9-7Z" fill="#FFF8EC" strokeWidth="2.4" />
      <ellipse cx="127" cy="142" rx="13" ry="3" fill="#FFF8EC" strokeWidth="2.2" />
      <path d="M124 122q-2-4 0-8M130 122q-2-4 0-8" fill="none" stroke="#A8B4AE" strokeWidth="1.8" />
    </>
  )
});
KINDS.push('kucing', 'kura', 'kambing', 'cumi', 'kodok', 'buaya', 'gajah');

// Fourth wave: parking monkey, influencer peacock, night-watch bat, enforcer boar and the foreman hippo boss.
Object.assign(ART, {
  monyet: () => (
    <>
      <Line d="M136 172Q180 172 178 138Q176 114 156 122" color="#9A6A42" w={7} />
      <ellipse cx="84" cy="188" rx="13" ry="7" fill="#E8C29A" />
      <ellipse cx="116" cy="188" rx="13" ry="7" fill="#E8C29A" />
      <Shaded id="ms-monyet" d="M100 118Q140 118 142 154Q144 190 100 190Q56 190 58 154Q60 118 100 118Z" fill="#9A6A42" shade="rgba(70,40,10,.22)" cy={202} />
      <path d="M66 134Q100 124 134 134L138 180Q100 192 62 180Z" fill="#F08A3A" />
      <path d="M64 158H136" fill="none" stroke="#FFF3C4" strokeWidth="5" />
      <path d="M100 128V186" fill="none" strokeWidth="2.6" />
      <Line d="M66 142Q46 130 42 104" color="#9A6A42" w={9} />
      <g transform="rotate(-14 40 76)">
        <rect x="34" y="50" width="12" height="44" rx="6" fill="#F7D44A" />
        <path d="M34 64h12M34 78h12" fill="none" stroke="#D2532A" strokeWidth="4" />
      </g>
      <circle cx="42" cy="100" r="9" fill="#E8C29A" />
      <ellipse cx="140" cy="164" rx="10" ry="9" fill="#E8C29A" />
      <circle cx="52" cy="84" r="16" fill="#9A6A42" />
      <circle cx="52" cy="84" r="9" fill="#E8C29A" stroke="none" />
      <circle cx="148" cy="84" r="16" fill="#9A6A42" />
      <circle cx="148" cy="84" r="9" fill="#E8C29A" stroke="none" />
      <Shaded id="ms-monyet-h" d="M100 42Q146 42 148 86Q150 128 100 130Q50 128 52 86Q54 42 100 42Z" fill="#9A6A42" shade="rgba(70,40,10,.18)" cy={146} rx={70} ry={30} />
      <path d="M100 66Q118 54 128 72Q138 94 120 114Q100 126 80 114Q62 94 72 72Q82 54 100 66Z" fill="#E8C29A" stroke="none" />
      <Eye x={86} y={86} r={6.5} /><Eye x={114} y={86} r={6.5} />
      <path d="M92 106q8 6 16 0" fill="none" strokeWidth="2.6" />
      <rect x="106" y="101" width="18" height="10" rx="4" fill="#B9C4BE" strokeWidth="2.6" />
      <path d="M124 106q12 6 18 22" fill="none" stroke="#D2532A" strokeWidth="2" />
      <Blush at={[[74, 102], [126, 102]]} />
      <path d="M64 62Q68 30 100 30Q132 30 136 62Z" fill="#F08A3A" />
      <path d="M128 60Q152 56 158 66Q142 72 128 68Z" fill="#D9702A" />
      <path d="M78 44q8-8 18-8" fill="none" stroke={SHINE} strokeWidth="2.6" />
    </>
  ),
  merak: () => (
    <>
      <path d="M100 152Q18 144 16 86Q22 28 100 20Q178 28 184 86Q182 144 100 152Z" fill="#3FA48A" />
      <path d="M100 150L38 84M100 150L60 48M100 150V36M100 150L140 48M100 150L162 84M100 150L44 120M100 150L156 120" fill="none" stroke="#2E7A66" strokeWidth="2.2" />
      <g strokeWidth="2.2">
        {[[38, 84], [60, 48], [100, 36], [140, 48], [162, 84], [44, 120], [156, 120]].map(([x, y], i) => (
          <g key={i}><ellipse cx={x} cy={y} rx="11" ry="12" fill="#F2B63C" /><ellipse cx={x} cy={y + 1} rx="6" ry="7" fill="#3C78C8" /><circle cx={x} cy={y + 2} r="2.6" fill={O} stroke="none" /></g>
        ))}
      </g>
      <ellipse cx="88" cy="188" rx="11" ry="6" fill="#E8A35A" />
      <ellipse cx="112" cy="188" rx="11" ry="6" fill="#E8A35A" />
      <Shaded id="ms-merak" d="M100 98Q134 100 136 142Q138 188 100 188Q62 188 64 142Q66 100 100 98Z" fill="#3C78C8" shade="rgba(20,40,110,.24)" cy={200} />
      <ellipse cx="100" cy="154" rx="20" ry="24" fill="#6FA3E0" stroke="none" />
      <path d="M90 140q10 6 20 0M88 154q12 6 24 0M90 168q10 6 20 0" fill="none" stroke="#4E88D0" strokeWidth="2" />
      <path d="M92 56L84 30M100 54V26M108 56L116 30" fill="none" strokeWidth="2.4" />
      <circle cx="84" cy="28" r="4.5" fill="#3FA48A" strokeWidth="2.2" />
      <circle cx="100" cy="24" r="4.5" fill="#3FA48A" strokeWidth="2.2" />
      <circle cx="116" cy="28" r="4.5" fill="#3FA48A" strokeWidth="2.2" />
      <Shaded id="ms-merak-h" d="M100 52Q130 52 130 82Q130 110 100 110Q70 110 70 82Q70 52 100 52Z" fill="#3C78C8" shade="rgba(20,40,110,.18)" cy={122} rx={50} ry={22} />
      <path d="M78 72q8-6 16 0M106 72q8-6 16 0" fill="none" stroke="#FFF8EC" strokeWidth="4" />
      <Eye x={88} y={80} r={6} /><Eye x={112} y={80} r={6} />
      <path d="M80 74l-6-3M120 74l6-3" fill="none" strokeWidth="2.2" />
      <path d="M94 90L100 100L106 90Z" fill="#F2B63C" strokeWidth="2.4" />
      <Blush at={[[80, 96], [120, 96]]} />
      <Line d="M128 142L158 102" color="#B9C4BE" w={3} />
      <rect x="148" y="78" width="20" height="30" rx="4" fill={O} />
      <rect x="151" y="82" width="14" height="20" rx="2" fill="#FFC2D1" stroke="none" />
      <ellipse cx="130" cy="142" rx="10" ry="13" fill="#2E62A8" />
      <path d="M30 34l3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" fill="#FFF3C4" strokeWidth="2" />
      <path d="M84 62q6-6 14-6" fill="none" stroke={SHINE} strokeWidth="2.4" />
    </>
  ),
  kelelawar: (a) => (
    <>
      <g style={{ animation: a.wingL === 'none' ? 'none' : 'msWingL .7s ease-in-out infinite', transformOrigin: '70px 118px' }}>
        <path d="M70 114Q40 80 10 94Q20 106 16 120Q30 114 36 128Q46 120 54 136Q62 126 72 142Z" fill="#5E4E86" />
        <path d="M70 116L22 98M70 122L36 124M70 130L54 134" fill="none" stroke="#3E3060" strokeWidth="2" />
      </g>
      <g style={{ animation: a.wingR === 'none' ? 'none' : 'msWingR .7s ease-in-out infinite', transformOrigin: '130px 118px' }}>
        <path d="M130 114Q160 80 190 94Q180 106 184 120Q170 114 164 128Q154 120 146 136Q138 126 128 142Z" fill="#5E4E86" />
        <path d="M130 116L178 98M130 122L164 124M130 130L146 134" fill="none" stroke="#3E3060" strokeWidth="2" />
      </g>
      <ellipse cx="90" cy="186" rx="9" ry="6" fill="#5E4E86" />
      <ellipse cx="110" cy="186" rx="9" ry="6" fill="#5E4E86" />
      <Shaded id="ms-kelelawar" d="M100 98Q136 100 136 140Q136 182 100 182Q64 182 64 140Q64 100 100 98Z" fill="#7A6A9E" shade="rgba(40,20,80,.24)" cy={194} />
      <path d="M66 116L134 160L128 172L62 128Z" fill="#3FA48A" strokeWidth="2.6" />
      <path d="M80 126L74 138M96 136L90 148M112 146L106 158" fill="none" stroke="#2E7A66" strokeWidth="2.4" />
      <path d="M70 72L60 28L92 56Z" fill="#7A6A9E" />
      <path d="M72 62L66 38L84 54Z" fill="#F3B4C0" stroke="none" />
      <path d="M130 72L140 28L108 56Z" fill="#7A6A9E" />
      <path d="M128 62L134 38L116 54Z" fill="#F3B4C0" stroke="none" />
      <Shaded id="ms-kelelawar-h" d="M100 48Q140 48 140 84Q140 118 100 118Q60 118 60 84Q60 48 100 48Z" fill="#7A6A9E" shade="rgba(40,20,80,.18)" cy={132} rx={60} ry={24} />
      <ellipse cx="100" cy="94" rx="24" ry="18" fill="#B9AED6" stroke="none" />
      <Eye x={86} y={82} r={7} /><Eye x={114} y={82} r={7} />
      <path d="M78 93q8 4 16 0M106 93q8 4 16 0" fill="none" stroke="#5E4E86" strokeWidth="2" />
      <path d="M92 102q8 6 16 0" fill="none" strokeWidth="2.4" />
      <path d="M95 104l2 6 2-5ZM103 105l2 5 2-6Z" fill="#FFF8EC" strokeWidth="1.6" />
      <Blush at={[[74, 100], [126, 100]]} />
      <rect x="138" y="124" width="16" height="48" rx="6" fill="#E3B04A" />
      <path d="M146 134V162" fill="none" strokeWidth="3" />
      <path d="M138 134h16M138 162h16" fill="none" stroke="#B0842A" strokeWidth="2" />
      <ellipse cx="138" cy="150" rx="9" ry="8" fill="#7A6A9E" />
      <path d="M78 58q6-6 14-6" fill="none" stroke={SHINE} strokeWidth="2.4" />
    </>
  ),
  babi: () => (
    <>
      <Line d="M52 160Q34 164 32 150Q30 140 40 142" color="#8E6A4E" w={4} />
      <ellipse cx="80" cy="188" rx="14" ry="7" fill="#5A3A28" />
      <ellipse cx="120" cy="188" rx="14" ry="7" fill="#5A3A28" />
      <Shaded id="ms-babi" d="M100 112Q150 112 152 152Q154 190 100 190Q46 190 48 152Q50 112 100 112Z" fill="#8E6A4E" shade="rgba(60,30,10,.24)" cy={202} />
      <path d="M58 130Q100 118 142 130L146 176Q100 190 54 176Z" fill="#C9B77A" />
      <path d="M100 124V184" fill="none" strokeWidth="2.4" />
      <g fill="#F2B63C" strokeWidth="2"><circle cx="100" cy="140" r="3" /><circle cx="100" cy="156" r="3" /><circle cx="100" cy="172" r="3" /></g>
      <path d="M118 136l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z" fill="#F2B63C" strokeWidth="1.8" />
      <rect x="66" y="140" width="20" height="14" rx="3" fill="#B5A266" strokeWidth="2.2" />
      <Line d="M146 160L172 116" color="#3E4A2C" w={7} />
      <ellipse cx="146" cy="160" rx="11" ry="10" fill="#8E6A4E" />
      <path d="M58 64L44 38L76 50Z" fill="#8E6A4E" />
      <path d="M142 64L156 38L124 50Z" fill="#8E6A4E" />
      <Shaded id="ms-babi-h" d="M100 42Q150 42 150 86Q150 128 100 128Q50 128 50 86Q50 42 100 42Z" fill="#8E6A4E" shade="rgba(60,30,10,.18)" cy={144} rx={70} ry={30} />
      <path d="M72 66L90 72M128 66L110 72" fill="none" strokeWidth="3.4" />
      <Eye x={84} y={80} r={6} /><Eye x={116} y={80} r={6} />
      <ellipse cx="100" cy="102" rx="21" ry="15" fill="#C99A7A" />
      <ellipse cx="93" cy="102" rx="3.2" ry="4.6" fill={O} stroke="none" />
      <ellipse cx="107" cy="102" rx="3.2" ry="4.6" fill={O} stroke="none" />
      <path d="M80 114Q70 104 74 90L82 102Z" fill="#FFF8EC" strokeWidth="2.4" />
      <path d="M120 114Q130 104 126 90L118 102Z" fill="#FFF8EC" strokeWidth="2.4" />
      <Blush at={[[70, 98], [130, 98]]} />
      <path d="M62 54Q64 26 100 24Q136 26 138 54Z" fill="#4E5A3A" />
      <path d="M58 52Q100 62 142 52L140 60Q100 70 60 60Z" fill="#3E4A2C" />
      <circle cx="100" cy="40" r="7" fill="#F2B63C" strokeWidth="2.4" />
      <path d="M76 40q6-8 14-9" fill="none" stroke={SHINE} strokeWidth="2.4" />
    </>
  ),
  kudanil: () => (
    <>
      <ellipse cx="68" cy="188" rx="19" ry="8" fill="#9A8AB0" />
      <ellipse cx="132" cy="188" rx="19" ry="8" fill="#9A8AB0" />
      <Shaded id="ms-kudanil" d="M100 104Q170 104 172 150Q174 192 100 192Q26 192 28 150Q30 104 100 104Z" fill="#9A8AB0" shade="rgba(50,30,90,.24)" cy={206} rx={90} />
      <ellipse cx="100" cy="160" rx="40" ry="26" fill="#C9BEDA" stroke="none" />
      <path d="M40 124Q60 112 78 112L80 186Q52 186 34 172Z" fill="#F08A3A" />
      <path d="M160 124Q140 112 122 112L120 186Q148 186 166 172Z" fill="#F08A3A" />
      <path d="M37 150H80M120 150H163" fill="none" stroke="#FFF3C4" strokeWidth="5" />
      <ellipse cx="32" cy="152" rx="13" ry="11" fill="#9A8AB0" />
      <g transform="rotate(20 166 132)">
        <rect x="158" y="104" width="16" height="56" rx="7" fill="#9EC3F0" />
        <path d="M162 116h8M162 128h8M162 140h8" fill="none" stroke="#3C78C8" strokeWidth="2" />
      </g>
      <ellipse cx="166" cy="152" rx="13" ry="11" fill="#9A8AB0" />
      <ellipse cx="52" cy="46" rx="9" ry="11" fill="#9A8AB0" />
      <ellipse cx="148" cy="46" rx="9" ry="11" fill="#9A8AB0" />
      <Shaded id="ms-kudanil-h" d="M100 36Q154 36 156 74Q158 112 100 114Q42 112 44 74Q46 36 100 36Z" fill="#9A8AB0" shade="rgba(50,30,90,.16)" cy={128} rx={80} ry={28} />
      <path d="M100 74Q148 74 148 98Q148 124 100 124Q52 124 52 98Q52 74 100 74Z" fill="#B5A8CA" />
      <ellipse cx="84" cy="90" rx="4.4" ry="3.2" fill={O} stroke="none" />
      <ellipse cx="116" cy="90" rx="4.4" ry="3.2" fill={O} stroke="none" />
      <path d="M78 108Q100 118 122 108" fill="none" strokeWidth="2.6" />
      <rect x="86" y="109" width="8" height="8" rx="2" fill="#FFF8EC" strokeWidth="2" />
      <rect x="106" y="109" width="8" height="8" rx="2" fill="#FFF8EC" strokeWidth="2" />
      <Eye x={78} y={60} r={6.5} /><Eye x={122} y={60} r={6.5} />
      <Blush at={[[64, 82], [136, 82]]} />
      <path d="M74 122Q100 140 126 122" fill="none" stroke="#D2532A" strokeWidth="2.2" />
      <rect x="93" y="130" width="15" height="9" rx="3.5" fill="#B9C4BE" strokeWidth="2.4" />
      <path d="M64 46Q64 12 100 12Q136 12 136 46Z" fill="#F7D44A" />
      <path d="M93 14h14v30h-14Z" fill="#E3B32A" strokeWidth="2.4" />
      <rect x="54" y="42" width="92" height="10" rx="5" fill="#E3B32A" />
      <path d="M74 32q4-12 16-16" fill="none" stroke={SHINE} strokeWidth="2.6" />
    </>
  )
});
KINDS.push('monyet', 'merak', 'kelelawar', 'babi', 'kudanil');

/** @param {{ kind?: string, flip?: boolean, still?: boolean }} props */
/**
 * @param {{ kind?: string, flip?: boolean, still?: boolean, mood?: 'hurt'|'attack'|null, moodKey?: any }} props
 * `mood` plays a short reaction: a red flash with a squash when hit, a lean when attacking.
 */
export default function Musuh({ kind = 'tikus', flip = false, still = false, mood = null, moodKey = 0 }) {
  const Art = ART[kind] || ART.tikus;
  const anim = {
    bob: still ? 'none' : kind === 'kumbang' ? 'msSag 3.2s ease-in-out infinite' : 'msBob 2.2s ease-in-out infinite',
    wingL: still ? 'none' : 'msWingL .25s ease-in-out infinite',
    wingR: still ? 'none' : 'msWingR .25s ease-in-out infinite'
  };
  return (
    <div className={still ? 'ms-still' : undefined} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <svg viewBox="0 0 200 200" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', display: 'block' }}>
        <ellipse cx="100" cy="194" rx="70" ry="10" style={{ fill: 'url(#g-shadow)' }} />
        <g style={{ transform: flip ? 'scaleX(-1)' : 'none', transformOrigin: '100px 100px' }}>
          <g style={{ animation: anim.bob, transformOrigin: '100px 192px' }}>
            <g key={mood ? `${mood}-${moodKey}` : 'calm'} style={{ animation: still || !mood ? 'none' : mood === 'hurt' ? 'msHurt .34s ease-out' : 'msAttack .38s ease-out', transformOrigin: '100px 192px' }}>
              <g stroke={O} strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round">
                <Art {...anim} />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
