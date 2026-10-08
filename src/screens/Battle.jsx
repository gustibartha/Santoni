import Santoni from '../characters/Santoni.jsx';
import Musuh from '../characters/Musuh.jsx';
import SkillArt from '../characters/SkillArt.jsx';
import ItemArt from '../characters/ItemArt.jsx';
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
    <span style={{ display: "inline-flex", alignItems: "center", gap: "3px", flex: "none", height: "18px", padding: "0 6px 0 4px", borderRadius: "7px", border: "1.5px solid #0F1411", background: s.bg, color: "#FFF8EC", font: "500 9px/1 'DM Mono',monospace", letterSpacing: ".04em", whiteSpace: "nowrap" }}>
      <span style={{ font: "12px/1 'Material Symbols Rounded'" }}>{s.icon}</span>{s.label}
    </span>
  );
}

export default function Battle({ v }) {
  return (
    <div style={{ position: "absolute", inset: "0", animation: v.quakeAnim, backgroundColor: v.battleBg, backgroundImage: "radial-gradient(rgba(255,248,236,.06) 1.2px,transparent 1.5px)", backgroundSize: "10px 10px", color: "#FFF8EC" }}>
      <div style={{ position: "absolute", top: "14px", left: "12px", right: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ padding: "8px 10px", borderRadius: "12px", border: "2px solid #0F1411", background: "#2E3A34", font: "500 10.5px/1 'DM Mono',monospace", letterSpacing: ".08em" }}>GILIRAN {v.bTurn}</div>
        {v.bBoss && (
          <div style={{ padding: "8px 10px", borderRadius: "12px", border: "2px solid #0F1411", background: "#D2532A", font: "500 10.5px/1 'DM Mono',monospace", letterSpacing: ".08em" }}>BOS</div>
        )}
        {v.bFloor > 0 && (
          <div style={{ padding: "8px 10px", borderRadius: "12px", border: "2px solid #0F1411", background: "#7E43B5", font: "500 10.5px/1 'DM Mono',monospace", letterSpacing: ".08em" }}>LANTAI {v.bFloor}</div>
        )}
        <div style={{ flex: "1" }} />
        <button onClick={v.askQuit} aria-label="Kabur dari battle" style={{ width: "36px", height: "36px", flex: "none", display: "grid", placeItems: "center", padding: "0", boxSizing: "border-box", border: "2px solid #0F1411", borderRadius: "10px", background: "#2E3A34", color: "#FF9C8A", font: "19px/1 'Material Symbols Rounded'", cursor: "pointer" }}>logout</button>
        <MusicButton v={v} dark size={36} />
        <div style={{ display: "flex", gap: "3px", padding: "3px", borderRadius: "14px", background: "#0F1411" }}>
          {v.speeds.map((sp, i) => (
              <button key={sp.key ?? sp.id ?? i} onClick={sp.set} style={{ width: "40px", height: "30px", padding: "0", border: "0", borderRadius: "10px", background: sp.bg, color: sp.fg, font: "800 13px/1 'Bricolage Grotesque'", cursor: "pointer" }}>×{sp.n}</button>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", top: "66px", left: "12px", right: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ width: "46px", height: "46px", flex: "none", boxSizing: "border-box", display: "grid", placeItems: "center", border: "2.5px solid #0F1411", borderRadius: "14px", background: "#E7D9F5", color: "#2B1E18", font: "27px/1 'Material Symbols Rounded'" }}>{v.eIcon}</div>
        <div style={{ position: "relative", flex: "1", minWidth: "0" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "8px" }}>
            <span style={{ font: "20px/1.1 'Bagel Fat One',system-ui" }}>{v.eName}</span>
            <span style={{ font: "500 10.5px/1 'DM Mono',monospace", color: "#B9C4BE" }}>LV {v.eLvl}</span>
          </div>
          <div style={{ position: "relative", height: "18px", marginTop: "6px", boxSizing: "border-box", border: "2.5px solid #0F1411", borderRadius: "9px", background: "#0F1411", overflow: "hidden" }}>
            <div style={{ height: "100%", width: v.eHpPct, background: "#E0503A", transition: "width .25s" }} />
            <div style={{ position: "absolute", inset: "0", display: "flex", alignItems: "center", justifyContent: "center", font: "800 10.5px/1 'Bricolage Grotesque'", textShadow: "0 1px 0 #0F1411" }}>{v.eHpLabel}</div>
          </div>
          {v.eStatus.length > 0 && (
            <div style={{ position: "absolute", top: "100%", marginTop: "6px", display: "flex", gap: "4px" }}>
              {v.eStatus.map(s => <StatusChip key={s.label} s={s} />)}
            </div>
          )}
        </div>
      </div>
      <div style={{ position: "absolute", top: "138px", right: "20px", width: "230px", height: "206px", transform: v.eTf, transition: "transform .09s" }}>
        <div style={{ position: "absolute", left: "14px", right: "14px", bottom: "0", height: "42px", borderRadius: "50%", background: "rgba(255,248,236,.06)", border: "2.5px solid rgba(255,248,236,.16)" }} />
        <div style={{ position: "absolute", left: "0", right: "0", top: "0", bottom: "12px", transform: v.eLunge, transition: "transform .14s ease-out, filter .3s", filter: v.eFilter }}><Musuh kind={v.eKind} still={v.still} flip={true} /></div>
        <div style={{ position: "absolute", inset: "0", pointerEvents: "none" }}>{v.eAura}{v.efx}</div>
        <div style={{ position: "absolute", inset: "0", pointerEvents: "none" }}>{v.enemyPops}</div>
      </div>
      <div style={{ position: "absolute", left: "0", right: "0", top: "350px", height: "44px", zIndex: "4", pointerEvents: "none" }}>{v.banner}</div>
      {v.flashKey > 0 && !v.still && (
        <div key={v.flashKey} style={{ position: "absolute", inset: "0", zIndex: "5", background: "#FFF8C8", pointerEvents: "none", animation: "fxFlash .35s ease-out both" }} />
      )}
      <div style={{ position: "absolute", top: "396px", left: "18px", width: "206px", height: "188px", transform: v.hTf, transition: "transform .09s" }}>
        <div style={{ position: "absolute", left: "16px", right: "16px", bottom: "0", height: "40px", borderRadius: "50%", background: "rgba(255,248,236,.06)", border: "2.5px solid rgba(255,248,236,.16)" }} />
        {v.hShield && (
          <div style={{ position: "absolute", left: "6px", right: "6px", top: "-4px", bottom: "6px", borderRadius: "50%", border: "3px solid rgba(201,160,110,.9)", background: "radial-gradient(circle, rgba(201,160,110,0) 55%, rgba(201,160,110,.28) 100%)", boxShadow: "0 0 18px rgba(201,160,110,.55)", pointerEvents: "none" }} />
        )}
        {v.twin && (
          <div key={v.twinKey} style={{ position: "absolute", left: "12px", right: "12px", top: "0", bottom: "10px", opacity: 0, animation: v.still ? "none" : "pdTwin .5s ease-out", filter: "grayscale(.4) brightness(1.15)", pointerEvents: "none" }}><Santoni side pose="attack" still={true} /></div>
        )}
        <div style={{ position: "absolute", left: "12px", right: "12px", top: "0", bottom: "10px", transform: v.hLunge, transition: "transform .14s ease-out" }}><Santoni side pose={v.heroPose} still={v.still} /></div>
        <div style={{ position: "absolute", inset: "0", pointerEvents: "none" }}>{v.heroPops}</div>
      </div>
      <div style={{ position: "absolute", top: "404px", left: "238px", right: "12px", display: "flex", flexDirection: "column", gap: "9px" }}>
        <div style={{ font: "500 9.5px/1 'DM Mono',monospace", letterSpacing: ".1em", color: "#B9C4BE" }}>SKILL AKTIF</div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${v.bTile.cols},${v.bTile.size}px)`, gap: `${v.bTile.gap}px` }}>
          {v.battleSkills.map((k, i) => (
              <div key={k.key ?? k.id ?? i} style={{ position: "relative", width: `${v.bTile.size}px`, height: `${v.bTile.size}px`, boxSizing: "border-box", display: "grid", placeItems: "center", border: `2.5px solid ${k.ring}`, borderRadius: `${v.bTile.radius}px`, background: k.bg, color: k.fg, font: `${v.bTile.icon}px/1 'Material Symbols Rounded'`, boxShadow: k.glow, transition: "box-shadow .15s,border-color .15s" }}>
                <SkillArt id={k.id} size={Math.round(v.bTile.size * 0.72)} />
                {k.multi && (
                  <span style={{ position: "absolute", right: "-6px", bottom: "-6px", minWidth: "16px", height: "16px", padding: "0 3px", boxSizing: "border-box", borderRadius: "8px", background: "#FFF8EC", color: "#2B1E18", font: "800 9px/16px 'Bricolage Grotesque'", textAlign: "center" }}>{k.count}</span>
                )}
              </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "5px 8px 5px 6px", borderRadius: "10px", background: "#2E3A34", font: "800 12px/1 'Bricolage Grotesque'" }}>
            <span style={{ font: "14px/1 'Material Symbols Rounded'", color: "#F2B63C" }}>swords</span>
            {v.atk}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "5px 8px 5px 6px", borderRadius: "10px", background: "#2E3A34", font: "800 12px/1 'Bricolage Grotesque'" }}>
            <span style={{ font: "14px/1 'Material Symbols Rounded'", color: "#9EC3F0" }}>shield</span>
            {v.def}
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", top: "600px", left: "12px", right: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ flex: "none" }}>
          <div style={{ font: "18px/1 'Bagel Fat One',system-ui" }}>Santoni</div>
          <div style={{ font: "500 10px/1 'DM Mono',monospace", color: "#B9C4BE", marginTop: "4px" }}>LV {v.lvl}</div>
        </div>
        <div style={{ position: "relative", flex: "1", height: "22px", boxSizing: "border-box", border: "2.5px solid #0F1411", borderRadius: "11px", background: "#0F1411", overflow: "hidden" }}>
          <div style={{ height: "100%", width: v.hpPct, background: "#4FAE72", transition: "width .25s" }} />
          <div style={{ position: "absolute", inset: "0", display: "flex", alignItems: "center", justifyContent: "center", font: "800 11px/1 'Bricolage Grotesque'", textShadow: "0 1px 0 #0F1411,1px 0 0 #0F1411,-1px 0 0 #0F1411" }}>{v.hpLabel}</div>
        </div>
      </div>
      <div style={{ position: "absolute", top: "633px", left: "12px", right: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ width: "18px", height: "18px", flex: "none" }}><WeaponArt id={v.ultWeapon} size={18} /></div>
        <div style={{ position: "relative", flex: "1", height: "15px", boxSizing: "border-box", border: "2px solid #0F1411", borderRadius: "8px", background: "#0F1411", overflow: "hidden", animation: v.ultReady && !v.still ? "ultReady 1s ease-in-out infinite" : "none" }}>
          <div style={{ height: "100%", width: v.ultPct, background: v.ultReady ? "linear-gradient(90deg,#F2B63C,#FFE45C,#F2B63C)" : "linear-gradient(90deg,#B0620A,#F2B63C)", transition: "width .3s" }} />
          <div style={{ position: "absolute", inset: "0", display: "flex", alignItems: "center", justifyContent: "center", font: "500 8.5px/1 'DM Mono',monospace", letterSpacing: ".08em", color: "#FFF8EC", textShadow: "0 1px 0 #0F1411,1px 0 0 #0F1411,-1px 0 0 #0F1411" }}>{v.ultReady ? `SIAP · ${v.ultName.toUpperCase()}` : `PAMUNGKAS · ${v.ultName.toUpperCase()}`}</div>
        </div>
      </div>
      {v.hStatus.length > 0 && (
        <div style={{ position: "absolute", top: "652px", left: "12px", right: "12px", display: "flex", gap: "4px", overflowX: "auto", scrollbarWidth: "none" }}>
          {v.hStatus.map(s => <StatusChip key={s.label} s={s} />)}
        </div>
      )}
      <div style={{ position: "absolute", left: "12px", right: "12px", bottom: "12px", height: "162px", boxSizing: "border-box", padding: "10px 12px", borderRadius: "18px", border: "2px solid #0F1411", background: "#141A17", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "7px", overflow: "hidden" }}>
        {v.bLog.map((l, i) => (
            <div key={l.key ?? l.id ?? i} style={{ font: "500 11.5px/1.4 'DM Mono',monospace", color: l.color, opacity: l.opacity, textWrap: "pretty" }}>{l.text}</div>
        ))}
      </div>
      {v.ultCine && <UltimateCinematic u={v.ultCine} />}
      {v.bOver && (
        <div style={{ position: "absolute", left: "50%", top: "372px", zIndex: "6", transform: "translate(-50%,-50%) rotate(-6deg)", padding: "10px 26px 12px", border: "3.5px solid #2B1E18", borderRadius: "18px", background: v.bOverColor, color: "#2B1E18", font: "40px/1 'Bagel Fat One',system-ui", boxShadow: "0 6px 0 #2B1E18", pointerEvents: "none" }}>{v.bOverText}</div>
      )}
    </div>
  );
}
