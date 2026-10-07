// Small animated pieces the game injects into screens: parallax strips, damage
// pop-ups, skill banners, the rotating burst behind reveals, and pulled item cards.
import { ITEMS, RAR, OUT } from './data.js';

export function stripEl(kind, on) {
  const far = kind === 'far', playState = on ? 'running' : 'paused';
  const style = far
    ? { position: 'absolute', left: 0, right: 0, bottom: '40px', height: '56px', backgroundImage: 'radial-gradient(circle at 50px 64px, #B5D7C2 0 42px, #2B1E18 42px 44.5px, transparent 45px)', backgroundSize: '180px 56px', backgroundRepeat: 'repeat-x', animation: 'pdScrollFar 7s linear infinite', animationPlayState: playState, pointerEvents: 'none' }
    : { position: 'absolute', left: 0, right: 0, bottom: '16px', height: '5px', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,30,24,.3) 0 18px, transparent 18px 40px)', backgroundSize: '80px 5px', animation: 'pdScrollNear .9s linear infinite', animationPlayState: playState, pointerEvents: 'none' };
  return <div key={kind} style={style} />;
}

const POP_COLORS = { hit: '#FFF8EC', crit: '#F2B63C', skill: '#C9A8F0', heal: '#8FD6A8', hurt: '#FF9C8A', miss: '#B9C4BE' };

export function popEl(x, still) {
  return (
    <div key={x.id} style={{ position: 'absolute', left: `calc(50% + ${x.dx}px)`, top: `${34 + x.dy}px`, transform: 'translate(-50%,0)', font: `${x.kind === 'crit' ? 32 : 25}px/1 'Bagel Fat One', system-ui`, color: POP_COLORS[x.kind] || '#FFF8EC', textShadow: OUT, whiteSpace: 'nowrap', pointerEvents: 'none', animation: still ? 'none' : 'panduPop 1.05s ease-out forwards' }}>
      {x.text}
    </div>
  );
}

export function bannerEl(bn, still) {
  return (
    <div key={bn.id} style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%) rotate(-3deg)', padding: '10px 22px 12px', border: '3px solid #2B1E18', borderRadius: '16px', background: '#F2B63C', color: '#2B1E18', font: "24px/1 'Bagel Fat One', system-ui", whiteSpace: 'nowrap', boxShadow: '0 5px 0 #2B1E18', pointerEvents: 'none', animation: still ? 'none' : 'panduBanner 1.2s ease-out forwards' }}>
      {bn.text}
    </div>
  );
}

export function burstEl(key, top) {
  const mask = 'radial-gradient(circle, #000 18%, transparent 60%)';
  return <div key={key} style={{ position: 'absolute', left: '50%', top: `${top}px`, width: '640px', height: '640px', marginLeft: '-320px', marginTop: '-320px', borderRadius: '50%', background: 'repeating-conic-gradient(rgba(242,182,60,.2) 0deg 9deg, transparent 9deg 18deg)', WebkitMaskImage: mask, maskImage: mask, animation: 'panduSpin 30s linear infinite', pointerEvents: 'none' }} />;
}

export function pullCardsEl(pull) {
  const one = pull.items.length === 1;
  return pull.items.map((id, i) => {
    const it = ITEMS[id], rr = RAR[it.rar];
    return (
      <div key={`${pull.id}-${i}`} style={{ width: one ? '170px' : '58px', height: one ? '208px' : '76px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: one ? '10px' : '4px', border: '3px solid #2B1E18', borderRadius: one ? '22px' : '14px', background: rr.bg, boxShadow: '0 4px 0 #2B1E18', animation: `panduFlip .45s ${i * 0.09}s both cubic-bezier(.2,1.4,.4,1)` }}>
        <span style={{ font: `${one ? 64 : 28}px/1 'Material Symbols Rounded'`, color: rr.fg }}>{it.icon}</span>
        {one && <span style={{ font: "18px/1.1 'Bagel Fat One', system-ui", color: '#2B1E18', textAlign: 'center', padding: '0 10px' }}>{it.name}</span>}
        <span style={{ padding: '2px 5px', borderRadius: '6px', background: rr.fg, color: '#FFF8EC', font: `500 ${one ? 10 : 7}px/1.2 'DM Mono', monospace`, letterSpacing: '.04em' }}>{one ? rr.label : rr.label.slice(0, 4)}</span>
      </div>
    );
  });
}
