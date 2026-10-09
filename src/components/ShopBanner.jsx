// Illustrated banner for the equipment draw: a mysterious, half-open wooden chest
// glowing from inside, with drifting smoke, scattered coins and twinkling sparkles.
// The chest sits on the right so the title text (bottom-left) stays readable.
import { star } from '../characters/ItemArt.jsx';

const O = '#2B1E18';

export default function ShopBanner({ still = false }) {
  const a = x => (still ? 'none' : x);
  return (
    <svg viewBox="0 0 360 166" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} aria-hidden="true">
      <defs>
        <radialGradient id="bn-bg" cx="74%" cy="62%" r="70%">
          <stop offset="0" stopColor="#6B4426" />
          <stop offset=".45" stopColor="#3A2618" />
          <stop offset="1" stopColor="#21160F" />
        </radialGradient>
        <radialGradient id="bn-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#FFF4C2" stopOpacity="1" />
          <stop offset=".5" stopColor="#F2B63C" stopOpacity=".55" />
          <stop offset="1" stopColor="#F2B63C" stopOpacity="0" />
        </radialGradient>
        <filter id="bn-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" /></filter>
      </defs>
      <rect width="360" height="166" fill="url(#bn-bg)" />
      <g fill="rgba(255,248,236,.06)">{Array.from({ length: 60 }, (_, i) => <circle key={i} cx={(i * 37) % 360} cy={(i * 53) % 166} r="1.2" />)}</g>

      {/* Light spilling out of the chest */}
      <g style={{ animation: a('bnGlow 2.6s ease-in-out infinite'), transformOrigin: '272px 96px' }}>
        <path d="M232 92L176 0H214Z M248 90L236 0H262Z M268 88L282 0H304Z M288 90L330 0H360V10Z M306 92L360 34V60Z" fill="rgba(242,182,60,.16)" />
        <ellipse cx="272" cy="90" rx="62" ry="26" fill="url(#bn-glow)" />
      </g>

      <ellipse cx="272" cy="148" rx="72" ry="10" fill="rgba(0,0,0,.35)" />

      {/* Coins */}
      <g stroke={O} strokeWidth="2">
        {[[198, 146, -10], [214, 150, 15], [330, 146, 8], [344, 150, -18], [318, 152, 0]].map(([x, y, r], i) => (
          <g key={i} transform={`rotate(${r} ${x} ${y})`}>
            <ellipse cx={x} cy={y} rx="8" ry="4" fill="#F2B63C" />
            <ellipse cx={x} cy={y - 0.6} rx="4" ry="1.8" fill="none" stroke="#C28A16" strokeWidth="1.2" />
          </g>
        ))}
      </g>

      {/* Chest */}
      <g stroke={O} strokeWidth="3" strokeLinejoin="round">
        <rect x="222" y="88" width="100" height="56" rx="6" fill="#8E5A2B" />
        <path d="M222 106H322M222 124H322" fill="none" stroke="#6B4020" strokeWidth="2" />
        <rect x="232" y="88" width="10" height="56" fill="#F2B63C" />
        <rect x="302" y="88" width="10" height="56" fill="#F2B63C" />
        <rect x="261" y="100" width="22" height="26" rx="4" fill="#F2B63C" />
        <path d="M272 108a3.5 3.5 0 1 1 0 7l2 6h-4l2-6" fill={O} stroke="none" />
        {/* light leaking from the gap */}
        <ellipse cx="272" cy="86" rx="46" ry="6" fill="#FFF4C2" stroke="none" filter="url(#bn-blur)" style={{ animation: a('bnGlow 1.8s ease-in-out infinite') }} />
        <g style={{ animation: a('bnLid 3.2s ease-in-out infinite'), transformOrigin: '222px 86px' }}>
          <g transform="rotate(-14 222 86)">
            <path d="M222 86Q222 56 272 54Q322 56 322 86Z" fill="#A0693A" />
            <path d="M232 86V60M312 86V60" fill="none" stroke="#F2B63C" strokeWidth="9" />
            <path d="M240 68Q272 60 304 68" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="2.4" />
          </g>
        </g>
        <path d="M228 96q0 18 4 34" fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="3" />
      </g>

      {/* Mystery: question marks and a gem peeking out */}
      <g style={{ animation: a('bnFloat 3s ease-in-out infinite') }}>
        <text x="300" y="40" style={{ font: "26px var(--display)", fill: '#C9A8F0', stroke: O, strokeWidth: 3, paintOrder: 'stroke' }}>?</text>
        <text x="244" y="30" style={{ font: "18px var(--display)", fill: '#C9A8F0', stroke: O, strokeWidth: 3, paintOrder: 'stroke' }}>?</text>
      </g>
      <path d="M266 84l6-10 6 10-6 6Z" fill="#9EC3F0" stroke={O} strokeWidth="2" />

      {/* Smoke drifting up from behind the chest */}
      {[[214, 96, 14, 0], [204, 80, 11, 0.9], [330, 92, 12, 0.5], [340, 74, 9, 1.4]].map(([x, y, r, d], i) => (
        <g key={i} style={{ animation: a(`bnSmoke 3.6s ${d}s ease-out infinite`), transformOrigin: `${x}px ${y}px` }}>
          <circle cx={x} cy={y} r={r} fill="rgba(214,204,232,.32)" />
          <circle cx={x + r * 0.8} cy={y - r * 0.5} r={r * 0.7} fill="rgba(214,204,232,.26)" />
          <circle cx={x - r * 0.7} cy={y - r * 0.4} r={r * 0.6} fill="rgba(214,204,232,.22)" />
        </g>
      ))}

      {/* Sparkles */}
      {[[196, 60, 6, 0], [344, 118, 5, 0.7], [246, 128, 4, 1.3], [326, 56, 4.5, 0.4], [180, 112, 3.5, 1.8]].map(([x, y, r, d], i) => (
        <path key={i} d={star(x, y, r)} fill="#FFE45C" stroke={O} strokeWidth="1.2" style={{ animation: a(`itemTwinkle 2.2s ${d}s ease-in-out infinite`), transformOrigin: `${x}px ${y}px`, transformBox: 'view-box' }} />
      ))}
    </svg>
  );
}
