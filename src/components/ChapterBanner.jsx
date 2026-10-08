// Banner for a dungeon card on the map: its themed landscape, the chapter's boss waiting
// on the right, and Santoni walking in from the left.
import Santoni from '../characters/Santoni.jsx';
import Musuh from '../characters/Musuh.jsx';

const O = '#2B1E18';

export default function ChapterBanner({ theme, boss, still = false }) {
  const dark = /^#[0-6]/.test(theme.sky);
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 300 124" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} aria-hidden="true">
        <rect width="300" height="124" fill={theme.sky} />
        <g fill="rgba(43,30,24,.08)">{Array.from({ length: 40 }, (_, i) => <circle key={i} cx={(i * 41) % 300} cy={(i * 29) % 90} r="1.1" />)}</g>
        <circle cx="236" cy="28" r="14" fill={dark ? '#E9E4FF' : '#F2B63C'} stroke={O} strokeWidth="2.5" />
        {!dark && (
          <g fill="#FFF8EC" stroke={O} strokeWidth="2">
            <path d="M40 30q0-10 12-10q4-8 14-5q10-2 12 8q8 0 8 7z" />
            <path d="M150 20q0-8 9-8q4-6 11-3q8 0 8 7q6 0 6 4z" />
          </g>
        )}
        <path d="M0 84Q30 52 64 72Q96 44 132 70Q170 46 206 68Q246 40 300 70V124H0Z" fill={theme.hill} stroke={O} strokeWidth="2.5" />
        <path d="M0 98Q50 86 100 96Q160 84 220 96Q262 88 300 96V124H0Z" fill={theme.lHill || theme.hill} opacity=".7" />
        <rect x="0" y="104" width="300" height="20" fill={theme.ground} />
        <path d="M0 104H300" stroke={O} strokeWidth="2.5" />
        <path d="M14 114h20M60 116h14M120 113h22M190 116h16M250 114h20" stroke="rgba(43,30,24,.25)" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <div style={{ position: 'absolute', left: '8%', bottom: '4px', width: '74px', height: '82px' }}><Santoni pose="walk" still={still} /></div>
      <div style={{ position: 'absolute', right: '6%', bottom: '2px', width: '96px', height: '96px' }}><Musuh kind={boss} flip still={still} /></div>
    </div>
  );
}
