// Small animated pieces the game injects into screens: parallax strips, damage
// pop-ups, skill banners, the rotating burst behind reveals, and pulled item cards.
import { ITEMS, RAR, OUT } from './data.js';
import ItemArt from '../characters/ItemArt.jsx';

export function stripEl(kind, on, hill = '#B5D7C2') {
  const far = kind === 'far', playState = on ? 'running' : 'paused';
  const style = far
    ? { position: 'absolute', left: 0, right: 0, bottom: '40px', height: '56px', backgroundImage: `radial-gradient(circle at 50px 64px, ${hill} 0 42px, #2B1E18 42px 44.5px, transparent 45px)`, backgroundSize: '180px 56px', backgroundRepeat: 'repeat-x', animation: 'pdScrollFar 7s linear infinite', animationPlayState: playState, pointerEvents: 'none' }
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

// One-shot elemental bursts drawn over the enemy (coordinates are inside its 230×206 box).
const ICON = "'Material Symbols Rounded'";
const FLAME_X = [40, 150, 95, 70, 175, 20, 125];
const ROCK_X = [60, 150, 105, 30, 180, 85];

function fireFx(x, still) {
  const count = x.big ? 7 : 4;
  return Array.from({ length: count }, (_, i) => {
    const size = (x.big ? 44 : 30) + (i % 3) * 8;
    return (
      <span key={`${x.id}-${i}`} style={{ position: 'absolute', left: `${FLAME_X[i]}px`, bottom: `${18 + (i % 3) * 16}px`, font: `${size}px/1 ${ICON}`, color: i % 2 ? '#FFC23C' : '#FF7A2F', textShadow: '0 0 14px rgba(255,120,30,.95)', opacity: 0, animation: still ? 'none' : `fxFlame .75s ${i * 0.05}s ease-out both` }}>local_fire_department</span>
    );
  });
}
function boltFx(x, still) {
  const bolts = x.big ? [{ dx: -10, size: 150 }, { dx: 50, size: 90 }] : [{ dx: 0, size: 110 }];
  return bolts.map((t, i) => (
    <span key={`${x.id}-${i}`} style={{ position: 'absolute', left: `calc(50% + ${t.dx}px)`, top: '-40px', transform: 'translateX(-50%)', font: `${t.size}px/1 ${ICON}`, color: '#FFE45C', textShadow: '0 0 18px #FFF6B0, 0 0 36px rgba(255,228,92,.9)', opacity: 0, animation: still ? 'none' : `fxBolt .5s ${i * 0.08}s ease-out both` }}>bolt</span>
  ));
}
function rockFx(x, still) {
  const count = x.big ? 6 : 3;
  const rocks = Array.from({ length: count }, (_, i) => {
    const size = 16 + (i % 3) * 7;
    return <div key={`${x.id}-${i}`} style={{ position: 'absolute', left: `${ROCK_X[i]}px`, top: '-10px', width: `${size}px`, height: `${size}px`, boxSizing: 'border-box', border: '2.5px solid #2B1E18', borderRadius: '35% 45% 30% 50%', background: i % 2 ? '#A97A4A' : '#8E5A2B', opacity: 0, animation: still ? 'none' : `fxRock .65s ${i * 0.06}s cubic-bezier(.5,0,.8,.6) both` }} />;
  });
  rocks.push(<div key={`${x.id}-dust`} style={{ position: 'absolute', left: '50%', bottom: '6px', width: '160px', height: '36px', marginLeft: '-80px', borderRadius: '50%', background: 'rgba(169,122,74,.45)', opacity: 0, animation: still ? 'none' : 'fxDust .7s .25s ease-out both' }} />);
  return rocks;
}
function windFx(x, still) {
  const gusts = [40, 95, 150].map((y, i) => (
    <span key={`${x.id}-${i}`} style={{ position: 'absolute', left: '-40px', top: `${y}px`, font: `56px/1 ${ICON}`, color: '#DDF3FF', textShadow: '0 0 10px rgba(158,195,240,.9)', opacity: 0, animation: still ? 'none' : `fxGust .55s ${i * 0.07}s ease-out both` }}>air</span>
  ));
  if (x.big) gusts.push(<span key={`${x.id}-t`} style={{ position: 'absolute', left: '50%', top: '30px', marginLeft: '-65px', font: `130px/1 ${ICON}`, color: '#C9E4FF', textShadow: '0 0 20px rgba(158,195,240,.9)', opacity: 0, animation: still ? 'none' : 'fxSpin .8s ease-out both' }}>cyclone</span>);
  return gusts;
}
const FX_BY_EL = { api: fireFx, petir: boltFx, tanah: rockFx, angin: windFx };

export function elementFx(list, still) {
  return list.flatMap(x => FX_BY_EL[x.el](x, still));
}

// Lingering status visuals on the enemy: flames while burning, sparks while stunned.
export function auraEl(b, still) {
  const out = [];
  if (b.burn) [55, 110, 165].forEach((x, i) => out.push(
    <span key={`burn-${i}`} style={{ position: 'absolute', left: `${x}px`, bottom: '14px', font: `${26 - i * 2}px/1 ${ICON}`, color: '#FF8A3D', textShadow: '0 0 10px rgba(255,120,30,.9)', transformOrigin: 'bottom center', animation: still ? 'none' : `fxFlicker .45s ${i * 0.12}s ease-in-out infinite alternate` }}>local_fire_department</span>
  ));
  if (b.stun) [70, 115, 160].forEach((x, i) => out.push(
    <span key={`stun-${i}`} style={{ position: 'absolute', left: `${x}px`, top: '6px', font: `22px/1 ${ICON}`, color: '#FFE45C', textShadow: '0 0 8px rgba(255,228,92,.9)', animation: still ? 'none' : `fxBuzz .35s ${i * 0.1}s ease-in-out infinite alternate` }}>electric_bolt</span>
  ));
  return out;
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
        <ItemArt id={id} size={one ? 104 : 38} />
        {one && <span style={{ font: "18px/1.1 'Bagel Fat One', system-ui", color: '#2B1E18', textAlign: 'center', padding: '0 10px' }}>{it.name}</span>}
        <span style={{ padding: '2px 5px', borderRadius: '6px', background: rr.fg, color: '#FFF8EC', font: `500 ${one ? 10 : 7}px/1.2 'DM Mono', monospace`, letterSpacing: '.04em' }}>{one ? rr.label : rr.label.slice(0, 4)}</span>
      </div>
    );
  });
}
