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
            <div style={{ font: "20px/1 'Bagel Fat One',system-ui", color: st.color }}><CountUp value={st.value} delay={450 + i * 120} still={still} /></div>
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
        <div style={{ marginTop: "8px", font: "34px/1.05 'Bagel Fat One',system-ui", color: "#FFF8EC", textShadow: OUTLINE }}>{u.name}</div>
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
      <div style={{ display: "flex", alignItems: "baseline", gap: "5px", font: "15px/1 'Bagel Fat One',system-ui", color: "#FFF8EC", textShadow: OUTLINE, whiteSpace: "nowrap" }}>
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
function Stage({ theme }) {
  return (
    <svg viewBox="0 0 390 440" preserveAspectRatio="xMidYMax slice" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", display: "block" }} aria-hidden="true">
      <rect width="390" height="440" fill={theme.sky} />
      <g fill="rgba(255,255,255,.55)" stroke="#2B1E18" strokeWidth="2.5">
        <path d="M30 70q0-14 16-14q6-12 20-8q14-4 18 10q12 0 12 12z" />
        <path d="M250 44q0-11 13-11q5-9 16-6q12 0 12 10q9 0 9 7z" />
      </g>
      <path d="M0 250Q40 196 92 226Q140 180 196 222Q250 186 300 220Q350 190 390 214V440H0Z" fill={theme.hill} stroke="#2B1E18" strokeWidth="2.5" />
      <path d="M0 290Q60 262 130 282Q210 258 280 280Q340 266 390 276V440H0Z" fill={theme.lHill} opacity=".8" />
      <rect x="0" y="332" width="390" height="108" fill={theme.ground} />
      <path d="M0 332H390" stroke="#2B1E18" strokeWidth="2.5" />
      <g stroke="rgba(43,30,24,.22)" strokeWidth="3" strokeLinecap="round">
        <path d="M24 360h22M110 372h16M200 358h26M300 368h18M60 404h20M250 410h24M350 396h16" />
      </g>
    </svg>
  );
}

export default function Battle({ v }) {
  const enemySize = v.bBoss ? 186 : 166;
  return (
    <div style={{ position: "absolute", inset: "0", backgroundColor: v.battleBg, backgroundImage: "radial-gradient(rgba(255,248,236,.06) 1.2px,transparent 1.5px)", backgroundSize: "10px 10px", color: "#FFF8EC" }}>
      {/* Stage: scenery, fighters, effects */}
      <div style={{ position: "absolute", top: "58px", left: "0", right: "0", height: "440px", overflow: "hidden", borderTop: "2.5px solid #2B1E18", borderBottom: "2.5px solid #2B1E18", animation: [v.quakeAnim !== 'none' ? v.quakeAnim : null, v.critShake && !v.still ? `stageShake .34s ${v.hitDelay} ease-out` : null].filter(Boolean).join(', ') || "none" }}>
        <Stage theme={v.stageTheme} />

        {v.leaderKind && (
          <div key={v.assist ? v.assistKey : 'leader'} style={{ position: "absolute", left: "2px", top: "262px", width: "84px", height: "84px", pointerEvents: "none", animation: v.assist && !v.still ? "assistRun .5s ease-in-out" : "none" }}>
            <Musuh kind={v.leaderKind} still={v.still} />
          </div>
        )}

        {/* Santoni */}
        <div style={{ position: "absolute", left: "26px", top: "172px", width: "150px", height: "170px", animation: v.koHero && !v.still ? "koHero .9s .15s ease-out forwards" : "none" }}>
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
            </div>
          </div>
          <div style={{ position: "absolute", inset: "0", pointerEvents: "none" }}>{v.heroPops}</div>
        </div>
        {v.activePet && <div style={{ position: "absolute", left: "150px", top: "292px", pointerEvents: "none" }}><PetArt id={v.activePet} size={50} still={v.still} /></div>}

        {/* Enemy */}
        <div style={{ position: "absolute", right: "14px", top: `${342 - enemySize}px`, width: `${enemySize}px`, height: `${enemySize}px`, animation: v.koEnemy && !v.still ? "koEnemy 1s .15s ease-in forwards" : "none" }}>
          <div key={`ed${v.enemyAct}`} style={{ position: "absolute", inset: "0", animation: v.enemyAct && !v.still ? `enemyDash ${v.dashTime} ease-in-out` : "none" }}>
            <div key={`ek${v.hitKey}`} style={{ position: "absolute", inset: "0", animation: v.enemyHit && !v.still ? `knockR .38s ${v.hitDelay} ease-out` : "none", filter: v.eFilter, transition: "filter .3s" }}>
              <Musuh kind={v.eKind} still={v.still} flip={true} mood={v.eMood} moodKey={v.eMoodKey} />
            </div>
          </div>
          <div style={{ position: "absolute", inset: "0", pointerEvents: "none" }}>{v.eAura}{v.efx}</div>
          {v.enemyHit && <Slash key={v.hitKey} big={v.critShake} still={v.still} delay={v.hitDelay} />}
          <div style={{ position: "absolute", inset: "0", pointerEvents: "none" }}>{v.enemyPops}</div>
          {v.koEnemy && !v.still && <div style={{ position: "absolute", top: "0", left: "50%", transform: "translateX(-50%)", font: "24px/1 'Material Symbols Rounded'", color: "#FFE45C", textShadow: "0 0 8px rgba(255,228,92,.8)", animation: "koStars 1.2s .3s ease-in-out infinite", whiteSpace: "nowrap" }}>star star star</div>}
        </div>

        {/* Nameplates over the fighters */}
        <div style={{ position: "absolute", left: "26px", top: "142px" }}>
          <Nameplate name="Santoni" lvl={v.lvl} pct={v.hpPct} label={v.hpLabel} color="#4FAE72" width="150px" />
        </div>
        <div style={{ position: "absolute", right: "10px", top: `${(342 - enemySize) - 30 - (v.eStatus.length ? 21 : 0)}px` }}>
          <Nameplate name={v.eName} lvl={v.eLvl} pct={v.eHpPct} label={v.eHpLabel} color="#E0503A" chips={v.eStatus} width={`${enemySize}px`} />
        </div>

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
      {v.bSummary && <BattleSummary s={v.bSummary} still={v.still} />}
      {v.bOver && (
        <div style={{ position: "absolute", left: "50%", top: "250px", zIndex: "6", transform: "translate(-50%,-50%) rotate(-6deg)", padding: "10px 26px 12px", border: "3.5px solid #2B1E18", borderRadius: "18px", background: v.bOverColor, color: "#2B1E18", font: "40px/1 'Bagel Fat One',system-ui", boxShadow: "0 6px 0 #2B1E18", pointerEvents: "none" }}>{v.bOverText}</div>
      )}
    </div>
  );
}
