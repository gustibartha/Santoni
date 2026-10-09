import Santoni from '../characters/Santoni.jsx';
import Musuh from '../characters/Musuh.jsx';
import SkillArt from '../characters/SkillArt.jsx';
import ItemArt from '../characters/ItemArt.jsx';
import CountUp from '../components/CountUp.jsx';
import PetArt from '../characters/PetArt.jsx';

const CONFETTI = ['#F2B63C', '#D2532A', '#4FAE72', '#3C78C8', '#C9A8F0', '#FFF8EC'];

// End-of-battle card: key numbers count up, then the player can continue right away.
function BattleSummary({ s, still }) {
  return (
    <div key={s.key} style={{ position: "absolute", left: "12px", right: "12px", bottom: "12px", zIndex: "6", boxSizing: "border-box", padding: "12px 12px 11px", borderRadius: "18px", border: "2.5px solid #0F1411", background: s.win ? "#1F3A2C" : "#3A1F1F", boxShadow: "0 -6px 24px rgba(0,0,0,.45)", animation: still ? "none" : "sumUp .45s .35s cubic-bezier(.2,1.2,.4,1) both" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
        <span style={{ font: "500 10.5px/1 'DM Mono',monospace", letterSpacing: ".08em", color: s.win ? "#8FD6A8" : "#FF9C8A" }}>RINGKASAN BATTLE</span>
        <span style={{ font: "600 11.5px/1.2 'Bricolage Grotesque'", color: "#E8DCCB", textAlign: "right" }}>{s.line}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "6px", marginTop: "9px" }}>
        {s.stats.map((st, i) => (
          <div key={st.label} style={{ padding: "7px 4px 6px", borderRadius: "11px", background: "rgba(0,0,0,.28)", textAlign: "center" }}>
            <div style={{ font: "20px/1 var(--display)", color: st.color }}><CountUp value={st.value} delay={450 + i * 120} still={still} /></div>
            <div style={{ font: "500 9.5px/1.15 'DM Mono',monospace", color: "#C9C2B6", marginTop: "4px" }}>{st.label}</div>
          </div>
        ))}
      </div>
      <button onClick={s.cont} style={{ width: "100%", height: "38px", marginTop: "9px", border: "2.5px solid #0F1411", borderRadius: "12px", background: s.win ? "#F2B63C" : "#FFF8EC", color: "#2B1E18", font: "800 13.5px/1 'Bricolage Grotesque'", cursor: "pointer" }}>Lanjut</button>
    </div>
  );
}

import MusicButton from '../components/MusicButton.jsx';

const OUTLINE = "2px 0 0 #2B1E18,-2px 0 0 #2B1E18,0 2px 0 #2B1E18,0 -2px 0 #2B1E18,1.5px 1.5px 0 #2B1E18,-1.5px 1.5px 0 #2B1E18,1.5px -1.5px 0 #2B1E18,-1.5px -1.5px 0 #2B1E18,0 4px 0 #2B1E18";

function WeaponArt({ id, size }) {
  return id === 'none' ? <SkillArt id="cakar" size={size} /> : <ItemArt id={id} size={size} />;
}

// Full-screen "jurus pamungkas" moment: dark backdrop, spinning rays, the weapon sweeping in, the move's name.
function UltimateCinematic({ u }) {
  return (
    <div key={u.id} style={{ position: "absolute", inset: "0", zIndex: "7", pointerEvents: "none", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: "0", background: "radial-gradient(circle at 50% 42%, rgba(60,30,10,.55), rgba(10,8,6,.92) 70%)", animation: "ultBackdrop 1.5s ease-out both" }} />
      <div style={{ position: "absolute", left: "50%", top: "42%", width: "760px", height: "760px", margin: "-380px 0 0 -380px", borderRadius: "50%", background: "repeating-conic-gradient(rgba(242,182,60,.32) 0deg 6deg, transparent 6deg 18deg)", WebkitMaskImage: "radial-gradient(circle, #000 12%, transparent 62%)", maskImage: "radial-gradient(circle, #000 12%, transparent 62%)", animation: "ultBackdrop 1.5s ease-out both, ultRays 1.5s ease-out both" }} />
      <div style={{ position: "absolute", left: "-10%", right: "-10%", top: "47%", height: "6px", background: "linear-gradient(90deg, transparent, #FFF6B0, #F2B63C, transparent)", transformOrigin: "left center", animation: "ultSlash .7s .35s ease-out both" }} />
      <div style={{ position: "absolute", left: "50%", top: "24%", width: "150px", height: "150px", marginLeft: "-75px", animation: "ultWeapon 1.5s cubic-bezier(.2,.9,.3,1) both", filter: "drop-shadow(0 0 16px rgba(242,182,60,.9))" }}>
        <WeaponArt id={u.weapon} size={150} />
      </div>
      <div style={{ position: "absolute", left: "0", right: "0", top: "50%", textAlign: "center", animation: "ultTitle 1.5s ease-out both" }}>
        <div style={{ font: "500 10px/1 'DM Mono',monospace", letterSpacing: ".3em", color: "#F2B63C" }}>JURUS PAMUNGKAS</div>
        <div style={{ marginTop: "8px", font: "34px/1.05 var(--display)", color: "#FFF8EC", textShadow: OUTLINE }}>{u.name}</div>
        {u.chips.length > 0 && (
          <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "12px" }}>
            {u.chips.map(c => (
              <span key={c.label} style={{ display: "inline-flex", alignItems: "center", gap: "3px", padding: "4px 8px 4px 6px", borderRadius: "9px", border: "2px solid #2B1E18", background: c.color, color: "#FFF8EC", font: "500 10px/1 'DM Mono',monospace", letterSpacing: ".08em" }}>
                <span style={{ font: "14px/1 'Material Symbols Rounded'" }}>{c.icon}</span>{c.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatusChip({ s }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "3px", flex: "none", height: "18px", padding: "0 6px 0 4px", borderRadius: "7px", border: "1.5px solid #0F1411", background: s.bg, color: "#FFF8EC", font: "500 10px/1 'DM Mono',monospace", letterSpacing: ".04em", whiteSpace: "nowrap" }}>
      <span style={{ font: "12px/1 'Material Symbols Rounded'" }}>{s.icon}</span>{s.label}
    </span>
  );
}

// Over-head nameplate: optional status chips, name + level, and an HP bar with a lagging trail.
function Nameplate({ name, lvl, pct, label, color, chips, width }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", width, pointerEvents: "none" }}>
      {chips && chips.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "3px" }}>{chips.map(s => <StatusChip key={s.label} s={s} />)}</div>}
      <div style={{ display: "flex", alignItems: "baseline", gap: "5px", font: "15px/1 var(--display)", color: "#FFF8EC", textShadow: OUTLINE, whiteSpace: "nowrap" }}>
        {name}<span style={{ font: "800 10px/1 'Bricolage Grotesque'", padding: "2px 5px", borderRadius: "6px", background: "#2B1E18", textShadow: "none" }}>Lv {lvl}</span>
      </div>
      <div style={{ position: "relative", width: "100%", height: "14px", boxSizing: "border-box", border: "2.5px solid #2B1E18", borderRadius: "8px", background: "#2B1E18", overflow: "hidden", boxShadow: "0 2px 0 rgba(43,30,24,.4)" }}>
        <div style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: pct, background: "#FFF3C4", transition: "width .7s .3s ease-out" }} />
        <div style={{ position: "relative", height: "100%", width: pct, background: color, transition: "width .22s" }} />
        <div style={{ position: "absolute", inset: "0", display: "flex", alignItems: "center", justifyContent: "center", font: "800 9px/1 'Bricolage Grotesque'", color: "#FFF8EC", textShadow: "0 1px 0 #2B1E18,1px 0 0 #2B1E18,-1px 0 0 #2B1E18" }}>{label}</div>
      </div>
    </div>
  );
}

// White crescent slash drawn over the target when Santoni lands a hit.
function Slash({ big, still, delay }) {
  return (
    <svg viewBox="0 0 120 120" style={{ position: "absolute", left: "50%", top: "46%", width: big ? 190 : 140, height: big ? 190 : 140, margin: big ? "-95px 0 0 -95px" : "-70px 0 0 -70px", overflow: "visible", pointerEvents: "none", animation: still ? "none" : `slashFx .34s ${delay} ease-out both` }}>
      <path d="M14 98Q46 22 112 10Q62 40 30 104Z" fill="#FFFFFF" stroke="#2B1E18" strokeWidth="3" strokeLinejoin="round" />
      <path d="M30 92Q56 40 100 20" fill="none" stroke={big ? "#FFE45C" : "#C9E4FF"} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

// Star-shaped impact burst for hits on Santoni.
function Impact({ still, delay }) {
  return (
    <svg viewBox="-60 -60 120 120" style={{ position: "absolute", left: "52%", top: "48%", width: 110, height: 110, margin: "-55px 0 0 -55px", overflow: "visible", pointerEvents: "none", animation: still ? "none" : `impactFx .32s ${delay} ease-out both` }}>
      <path d="M0-50L12-14L48-18L20 6L36 40L0 20L-36 40L-20 6L-48-18L-12-14Z" fill="#FFF3C4" stroke="#2B1E18" strokeWidth="3" strokeLinejoin="round" />
      <circle r="12" fill="#FF9C8A" stroke="#2B1E18" strokeWidth="2.5" />
    </svg>
  );
}

// Scenic stage behind the fighters, coloured by the chapter theme.
function Stage({ theme, still }) {
  return (
    <svg viewBox="0 0 390 440" preserveAspectRatio="xMidYMax slice" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", display: "block" }} aria-hidden="true">
      <defs>
        <linearGradient id="st-haze" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFFFFF" stopOpacity="0" /><stop offset="1" stopColor="#FFFFFF" stopOpacity=".5" /></linearGradient>
        <linearGradient id="st-lit" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFFFFF" stopOpacity=".3" /><stop offset=".55" stopColor="#FFFFFF" stopOpacity="0" /></linearGradient>
        <linearGradient id="st-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFFFFF" stopOpacity=".22" /><stop offset=".2" stopColor="#FFFFFF" stopOpacity="0" /><stop offset="1" stopColor="#2B1E18" stopOpacity=".2" /></linearGradient>
      </defs>
      <rect width="390" height="440" fill={theme.sky} />
      <rect width="390" height="332" fill="url(#st-haze)" />
      <circle cx="320" cy="96" r="58" fill="url(#g-glow)" />
      <circle cx="320" cy="96" r="21" fill="#FFE27A" stroke="#2B1E18" strokeWidth="2.5" />
      <path d="M309 88q6-6 14-5" fill="none" stroke="rgba(255,255,255,.8)" strokeWidth="3" strokeLinecap="round" />
      <g style={{ animation: still ? "none" : "cloudDrift 70s linear infinite" }}>
        {[0, 390].map(x => (
          <g key={x} transform={`translate(${x} 0)`} fill="rgba(255,255,255,.72)" stroke="#2B1E18" strokeWidth="2.5" strokeLinejoin="round">
            <path d="M30 74q0-14 16-14q6-12 20-8q14-4 18 10q12 0 12 12z" />
            <path d="M226 44q0-11 13-11q5-9 16-6q12 0 12 10q9 0 9 7z" />
            <path d="M150 112q0-8 10-8q4-7 12-5q9 0 9 7q6 0 6 6z" />
          </g>
        ))}
      </g>
      <path d="M0 250Q40 196 92 226Q140 180 196 222Q250 186 300 220Q350 190 390 214V440H0Z" fill={theme.hill} stroke="#2B1E18" strokeWidth="2.5" />
      <path d="M0 250Q40 196 92 226Q140 180 196 222Q250 186 300 220Q350 190 390 214V440H0Z" fill="url(#st-lit)" />
      <path d="M0 290Q60 262 130 282Q210 258 280 280Q340 266 390 276V440H0Z" fill={theme.lHill} opacity=".85" />
      <path d="M0 290Q60 262 130 282Q210 258 280 280Q340 266 390 276V440H0Z" fill="url(#st-lit)" />
      <rect x="0" y="332" width="390" height="108" fill={theme.ground} />
      <rect x="0" y="332" width="390" height="108" fill="url(#st-ground)" />
      <path d="M0 332H390" stroke="#2B1E18" strokeWidth="2.5" />
      <g stroke="rgba(43,30,24,.24)" strokeWidth="2.6" strokeLinecap="round" fill="none">
        <path d="M24 360l4-7 4 7M110 374l3-6 3 6M204 358l4-8 4 8M302 370l3-6 3 6M62 406l4-7 4 7M252 412l4-7 4 7M352 398l3-6 3 6M156 392l3-6 3 6" />
      </g>
      <g fill="rgba(255,255,255,.55)">
        <circle cx="86" cy="384" r="2.6" /><circle cx="236" cy="372" r="2" /><circle cx="330" cy="420" r="2.6" /><circle cx="180" cy="424" r="2" />
      </g>
    </svg>
  );
}

// Light motes drifting up through the stage.
const MOTES = [[30, 300, 7], [92, 380, 9.5], [150, 330, 8], [214, 400, 10.5], [268, 310, 7.5], [330, 370, 9], [360, 260, 11]];
function Motes() {
  return MOTES.map(([x, y, t], i) => (
    <span key={i} style={{ position: "absolute", left: `${x}px`, top: `${y}px`, width: `${i % 3 ? 5 : 7}px`, height: `${i % 3 ? 5 : 7}px`, borderRadius: "50%", background: "rgba(255,252,230,.95)", boxShadow: "0 0 6px rgba(255,240,180,.9)", pointerEvents: "none", '--mx': `${i % 2 ? 26 : -22}px`, animation: `moteDrift ${t}s ${-i * 1.3}s ease-in-out infinite` }} />
  ));
}

// Burst of little sparks flying out from a hit.
function Sparks({ delay, color, big }) {
  const n = big ? 12 : 8, dist = big ? 92 : 66;
  return (
    <div style={{ position: "absolute", left: "50%", top: "46%", width: "0", height: "0", pointerEvents: "none" }}>
      {Array.from({ length: n }, (_, i) => {
        const ang = (i / n) * Math.PI * 2 + 0.35, d = dist * (i % 2 ? 0.68 : 1), sz = i % 3 === 0 ? 11 : 8;
        return <span key={i} style={{ position: "absolute", left: `${-sz / 2}px`, top: `${-sz / 2}px`, width: `${sz}px`, height: `${sz}px`, boxSizing: "border-box", borderRadius: i % 2 ? "50%" : "2px", border: "2px solid #2B1E18", background: i % 3 === 0 ? "#FFFFFF" : color, '--sx': `${Math.round(Math.cos(ang) * d)}px`, '--sy': `${Math.round(Math.sin(ang) * d)}px`, animation: `sparkFly .5s ${delay} ease-out both` }} />;
      })}
    </div>
  );
}

// Coins bursting out of a defeated enemy.
const COIN_X = [-120, -80, -46, -16, 14, 40, 70, 100, -100, 54];
function Coins() {
  return (
    <div style={{ position: "absolute", left: "293px", top: "300px", width: "0", height: "0", zIndex: "5", pointerEvents: "none" }}>
      {COIN_X.map((x, i) => (
        <span key={i} style={{ position: "absolute", left: "-11px", top: "-11px", width: "22px", height: "22px", boxSizing: "border-box", borderRadius: "50%", border: "2.5px solid #2B1E18", background: "radial-gradient(circle at 35% 30%, #FFF3B0 0 22%, #F2B63C 24% 100%)", boxShadow: "inset 0 0 0 3px #C28A16", '--cx': `${x}px`, '--cy': `${-150 - (i % 3) * 40}px`, animation: `coinBurst ${0.9 + (i % 4) * 0.12}s ${0.25 + i * 0.04}s cubic-bezier(.2,.7,.4,1) both` }} />
      ))}
    </div>
  );
}

const ALLY_POS = [
  { left: 4, top: 200, size: 66, run: 222 },
  { left: -2, top: 268, size: 72, run: 220 },
  { left: 50, top: 238, size: 58, run: 186 }
];

export default function Battle({ v }) {
  const enemySize = v.bBoss ? 186 : 166;
  return (
    <div style={{ position: "absolute", inset: "0", backgroundColor: v.battleBg, backgroundImage: "radial-gradient(rgba(255,248,236,.06) 1.2px,transparent 1.5px)", backgroundSize: "10px 10px", color: "#FFF8EC" }}>
      {/* Stage: scenery, fighters, effects */}
      <div style={{ position: "absolute", top: "58px", left: "0", right: "0", height: "440px", overflow: "hidden", borderTop: "2.5px solid #2B1E18", borderBottom: "2.5px solid #2B1E18", animation: [v.quakeAnim !== 'none' ? v.quakeAnim : null, v.critShake && !v.still ? `stageCrit .42s ${v.hitDelay} ease-out` : null].filter(Boolean).join(', ') || "none" }}>
        <Stage theme={v.stageTheme} still={v.still} />
        {!v.still && <Motes />}

        {/* The team waits behind Santoni and runs in on its beat. */}
        {v.allies.map(a => {
          const p = ALLY_POS[a.slot];
          return (
            <div key={a.slot} style={{ position: "absolute", left: `${p.left}px`, top: `${p.top}px`, width: `${p.size}px`, height: `${p.size}px`, pointerEvents: "none", animation: v.still ? "none" : `allyEnter .7s ${0.25 + a.slot * 0.12}s ease-out both` }}>
              <div key={a.t} style={{ position: "absolute", inset: "0", '--run': `${p.run}px`, animation: a.t && !v.still ? `allyDash ${v.allyTime} ${a.delay}s ease-in-out` : "none" }}>
                <Musuh kind={a.kind} still={v.still} />
              </div>
            </div>
          );
        })}

        {/* Santoni */}
        <div style={{ position: "absolute", left: "74px", top: "172px", width: "150px", height: "170px", animation: v.still ? "none" : ["heroEnter .8s ease-out both", v.koHero ? "koHero .9s .15s ease-out forwards" : null].filter(Boolean).join(", ") }}>
          <div key={`hd${v.heroAct}`} style={{ position: "absolute", inset: "0", animation: v.heroAct && !v.still ? `heroDash ${v.dashTime} ease-in-out` : "none" }}>
            <div key={`hk${v.hitKey}`} style={{ position: "absolute", inset: "0", animation: v.heroHit && !v.still ? `knockL .36s ${v.hitDelay} ease-out` : "none" }}>
              {v.hShield && (
                <div style={{ position: "absolute", left: "4px", right: "4px", top: "-2px", bottom: "4px", borderRadius: "50%", border: "3px solid rgba(201,160,110,.9)", background: "radial-gradient(circle, rgba(201,160,110,0) 55%, rgba(201,160,110,.28) 100%)", boxShadow: "0 0 18px rgba(201,160,110,.55)", pointerEvents: "none" }} />
              )}
              {v.twin && (
                <div key={v.twinKey} style={{ position: "absolute", inset: "0", opacity: 0, animation: v.still ? "none" : "pdTwin .5s ease-out", filter: "grayscale(.4) brightness(1.15)", pointerEvents: "none" }}><Santoni side pose="attack" still={true} /></div>
              )}
              <Santoni side pose={v.heroPose} still={v.still} />
              {v.heroHit && <Impact key={v.hitKey} still={v.still} delay={v.hitDelay} />}
              {v.heroHit && !v.still && <Sparks key={`hs${v.hitKey}`} delay={v.hitDelay} color="#FF9C8A" />}
            </div>
          </div>
          <div style={{ position: "absolute", inset: "0", pointerEvents: "none" }}>{v.heroPops}</div>
        </div>
        {v.activePet && (
          <div style={{ position: "absolute", left: "190px", top: "298px", pointerEvents: "none" }}>
            <div key={v.petT} style={{ '--run': "86px", animation: v.petT && !v.still ? `allyDash ${v.allyTime} ${v.petDelay}s ease-in-out` : "none" }}><PetArt id={v.activePet} size={48} still={v.still} /></div>
          </div>
        )}

        {/* Enemy */}
        <div style={{ position: "absolute", right: "14px", top: `${342 - enemySize}px`, width: `${enemySize}px`, height: `${enemySize}px`, animation: v.still ? "none" : ["enemyEnter .85s .1s ease-out both", v.koEnemy ? "koEnemy 1s .15s ease-in forwards" : null].filter(Boolean).join(", ") }}>
          {!v.still && <div style={{ position: "absolute", left: "50%", bottom: "6px", width: "0", height: "0", pointerEvents: "none" }}>{[-70, -40, 40, 70].map((dx, i) => <span key={i} style={{ position: "absolute", left: "-12px", top: "-12px", width: "24px", height: "24px", borderRadius: "50%", background: "rgba(255,248,236,.92)", border: "2px solid rgba(43,30,24,.35)", "--dx": `${dx}px`, animation: `dustPuff .7s ${0.56 + i * 0.03}s ease-out both` }} />)}</div>}
          <div key={`ed${v.enemyAct}`} style={{ position: "absolute", inset: "0", animation: v.enemyAct && !v.still ? `enemyDash ${v.dashTime} ease-in-out` : "none" }}>
            <div key={`ek${v.hitKey}`} style={{ position: "absolute", inset: "0", animation: v.enemyHit && !v.still ? `knockR .38s ${v.hitDelay} ease-out` : "none", filter: v.eFilter, transition: "filter .3s" }}>
              <Musuh kind={v.eKind} still={v.still} flip={true} mood={v.eMood} moodKey={v.eMoodKey} />
            </div>
          </div>
          <div style={{ position: "absolute", inset: "0", pointerEvents: "none" }}>{v.eAura}{v.efx}</div>
          {v.enemyHit && <Slash key={v.hitKey} big={v.critShake} still={v.still} delay={v.hitDelay} />}
          {v.enemyHit && !v.still && <Sparks key={`es${v.hitKey}`} delay={v.hitDelay} color="#FFE45C" big={v.critShake} />}
          <div style={{ position: "absolute", inset: "0", pointerEvents: "none" }}>{v.enemyPops}</div>
          {v.koEnemy && !v.still && <div style={{ position: "absolute", top: "0", left: "50%", transform: "translateX(-50%)", font: "24px/1 'Material Symbols Rounded'", color: "#FFE45C", textShadow: "0 0 8px rgba(255,228,92,.8)", animation: "koStars 1.2s .3s ease-in-out infinite", whiteSpace: "nowrap" }}>star star star</div>}
        </div>

        {/* Nameplates over the fighters */}
        <div style={{ position: "absolute", left: "74px", top: "142px" }}>
          <Nameplate name="Santoni" lvl={v.lvl} pct={v.hpPct} label={v.hpLabel} color="#4FAE72" width="150px" />
        </div>
        <div style={{ position: "absolute", right: "10px", top: `${(342 - enemySize) - 30 - (v.eStatus.length ? 21 : 0)}px` }}>
          <Nameplate name={v.eName} lvl={v.eLvl} pct={v.eHpPct} label={v.eHpLabel} color="#E0503A" chips={v.eStatus} width={`${enemySize}px`} />
        </div>

        {v.comboN >= 2 && !v.still && (
          <div key={v.comboKey} style={{ position: "absolute", left: "50%", top: "112px", zIndex: "4", padding: "6px 14px 8px", border: "3px solid #2B1E18", borderRadius: "14px", background: v.rushOn ? "linear-gradient(180deg,#FFE45C,#F2B63C)" : "linear-gradient(180deg,#FFFFFF,#FFE9B8)", color: "#2B1E18", font: "22px/1 var(--display)", whiteSpace: "nowrap", boxShadow: "0 4px 0 #2B1E18, 0 0 24px rgba(255,214,90,.7)", pointerEvents: "none", animation: "comboStamp 1.1s ease-out both" }}>
            {v.rushOn ? 'SERBU BERSAMA' : 'COMBO'} <span style={{ color: "#D2532A" }}>×{v.comboN}</span>
          </div>
        )}
        {v.lowHp && !v.still && <div style={{ position: "absolute", inset: "0", zIndex: "3", pointerEvents: "none", boxShadow: "inset 0 0 70px 16px rgba(214,40,40,.62)", animation: "lowHp 1.2s ease-in-out infinite" }} />}
        <div style={{ position: "absolute", left: "0", right: "0", top: "70px", height: "44px", zIndex: "4", pointerEvents: "none" }}>{v.banner}</div>
      </div>

      {/* Top bar over the stage */}
      <div style={{ position: "absolute", top: "12px", left: "12px", right: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ padding: "8px 10px", borderRadius: "12px", border: "2px solid #0F1411", background: "#2E3A34", font: "500 10.5px/1 'DM Mono',monospace", letterSpacing: ".08em" }}>GILIRAN {v.bTurn}</div>
        {v.bBoss && <div style={{ padding: "8px 10px", borderRadius: "12px", border: "2px solid #0F1411", background: "#D2532A", font: "500 10.5px/1 'DM Mono',monospace", letterSpacing: ".08em" }}>BOS</div>}
        {v.bFloor > 0 && <div style={{ padding: "8px 10px", borderRadius: "12px", border: "2px solid #0F1411", background: "#7E43B5", font: "500 10.5px/1 'DM Mono',monospace", letterSpacing: ".08em" }}>LANTAI {v.bFloor}</div>}
        <div style={{ flex: "1" }} />
        <button onClick={v.askQuit} aria-label="Kabur dari battle" style={{ width: "36px", height: "36px", flex: "none", display: "grid", placeItems: "center", padding: "0", boxSizing: "border-box", border: "2px solid #0F1411", borderRadius: "10px", background: "#2E3A34", color: "#FF9C8A", font: "19px/1 'Material Symbols Rounded'", cursor: "pointer" }}>logout</button>
        <MusicButton v={v} dark size={36} />
        <div style={{ display: "flex", gap: "3px", padding: "3px", borderRadius: "14px", background: "#0F1411" }}>
          {v.speeds.map((sp, i) => (
            <button key={sp.key ?? sp.id ?? i} onClick={sp.set} style={{ width: "40px", height: "30px", padding: "0", border: "0", borderRadius: "10px", background: sp.bg, color: sp.fg, font: "800 13px/1 'Bricolage Grotesque'", cursor: "pointer" }}>×{sp.n}</button>
          ))}
        </div>
      </div>

      {v.flashKey > 0 && !v.still && <div key={v.flashKey} style={{ position: "absolute", inset: "0", zIndex: "5", background: "#FFF8C8", pointerEvents: "none", animation: "fxFlash .35s ease-out both" }} />}

      {/* Skills, stats and the ultimate gauge under the stage */}
      <div style={{ position: "absolute", top: "508px", left: "12px", right: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ flex: "1", minWidth: "0", display: "flex", gap: "6px", overflowX: "auto", scrollbarWidth: "none", padding: "6px 2px" }}>
          {v.battleSkills.length === 0 && <span style={{ font: "600 11.5px/1.2 'Bricolage Grotesque'", color: "#B9C4BE" }}>Tanpa skill. Hanya tekad.</span>}
          {v.battleSkills.map((k, i) => (
            <div key={k.key ?? k.id ?? i} style={{ position: "relative", width: "34px", height: "34px", flex: "none", boxSizing: "border-box", display: "grid", placeItems: "center", border: `2.5px solid ${k.ring}`, borderRadius: "10px", background: k.bg, boxShadow: k.glow, transition: "box-shadow .15s,border-color .15s" }}>
              <SkillArt id={k.id} size={24} />
              {k.multi && <span style={{ position: "absolute", right: "-6px", bottom: "-6px", minWidth: "15px", height: "15px", padding: "0 3px", boxSizing: "border-box", borderRadius: "8px", background: "#FFF8EC", color: "#2B1E18", font: "800 9px/15px 'Bricolage Grotesque'", textAlign: "center" }}>{k.count}</span>}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "4px 8px 4px 6px", borderRadius: "9px", background: "#2E3A34", font: "800 11.5px/1 'Bricolage Grotesque'" }}><span style={{ font: "13px/1 'Material Symbols Rounded'", color: "#F2B63C" }}>swords</span>{v.atk}</div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "4px 8px 4px 6px", borderRadius: "9px", background: "#2E3A34", font: "800 11.5px/1 'Bricolage Grotesque'" }}><span style={{ font: "13px/1 'Material Symbols Rounded'", color: "#9EC3F0" }}>shield</span>{v.def}</div>
        </div>
      </div>
      <div style={{ position: "absolute", top: "566px", left: "12px", right: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ width: "20px", height: "20px", flex: "none" }}><WeaponArt id={v.ultWeapon} size={20} /></div>
        <div style={{ position: "relative", flex: "1", height: "16px", boxSizing: "border-box", border: "2px solid #0F1411", borderRadius: "8px", background: "#0F1411", overflow: "hidden", animation: v.ultReady && !v.still ? "ultReady 1s ease-in-out infinite" : "none" }}>
          <div style={{ height: "100%", width: v.ultPct, background: v.ultReady ? "linear-gradient(90deg,#F2B63C,#FFE45C,#F2B63C)" : "linear-gradient(90deg,#B0620A,#F2B63C)", transition: "width .3s" }} />
          {v.ultReady && !v.still && <div style={{ position: "absolute", top: "0", bottom: "0", left: "0", width: "38%", background: "linear-gradient(100deg,transparent,rgba(255,255,255,.75),transparent)", animation: "shineSweep 1.6s ease-in-out infinite" }} />}
          <div style={{ position: "absolute", inset: "0", display: "flex", alignItems: "center", justifyContent: "center", font: "500 9.5px/1 'DM Mono',monospace", letterSpacing: ".08em", color: "#FFF8EC", textShadow: "0 1px 0 #0F1411,1px 0 0 #0F1411,-1px 0 0 #0F1411" }}>{v.ultReady ? `SIAP · ${v.ultName.toUpperCase()}` : `PAMUNGKAS · ${v.ultName.toUpperCase()}`}</div>
        </div>
      </div>
      {v.hStatus.length > 0 && (
        <div style={{ position: "absolute", top: "590px", left: "12px", right: "12px", display: "flex", gap: "4px", overflowX: "auto", scrollbarWidth: "none" }}>
          {v.hStatus.map(s => <StatusChip key={s.label} s={s} />)}
        </div>
      )}
      <div style={{ position: "absolute", left: "12px", right: "12px", bottom: "12px", height: "216px", boxSizing: "border-box", padding: "10px 12px", borderRadius: "18px", border: "2px solid #0F1411", background: "#141A17", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "7px", overflow: "hidden" }}>
        {v.bLog.map((l, i) => <div key={l.key ?? l.id ?? i} style={{ font: "500 11.5px/1.4 'DM Mono',monospace", color: l.color, opacity: l.opacity, textWrap: "pretty" }}>{l.text}</div>)}
      </div>

      {v.ultCine && <UltimateCinematic u={v.ultCine} />}
      {v.koEnemy && !v.still && (
        <div style={{ position: "absolute", inset: "0", zIndex: "5", overflow: "hidden", pointerEvents: "none" }}>
          {Array.from({ length: 26 }, (_, i) => (
            <span key={i} style={{ position: "absolute", left: `${(i * 37) % 100}%`, top: "-12px", width: `${6 + (i % 3) * 2}px`, height: `${10 + (i % 4) * 2}px`, borderRadius: "2px", background: CONFETTI[i % CONFETTI.length], animation: `confetti ${1.6 + (i % 5) * 0.25}s ${(i % 7) * 0.08}s ease-in forwards` }} />
          ))}
        </div>
      )}
      {v.koEnemy && !v.still && <Coins />}
      {v.bSummary && <BattleSummary s={v.bSummary} still={v.still} />}
      {v.bOver && (
        <div style={{ position: "absolute", left: "50%", top: "250px", zIndex: "6", transform: "translate(-50%,-50%) rotate(-6deg)", padding: "10px 26px 12px", border: "3.5px solid #2B1E18", borderRadius: "18px", background: v.bOverColor, color: "#2B1E18", font: "40px/1 var(--display)", boxShadow: "var(--lift6)", pointerEvents: "none" }}>{v.bOverText}</div>
      )}
    </div>
  );
}
