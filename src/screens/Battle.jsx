import Santoni from '../characters/Santoni.jsx';
import Musuh from '../characters/Musuh.jsx';

export default function Battle({ v }) {
  return (
    <div style={{ position: "absolute", inset: "0", backgroundColor: "#1E2622", backgroundImage: "radial-gradient(rgba(255,248,236,.06) 1.2px,transparent 1.5px)", backgroundSize: "10px 10px", color: "#FFF8EC" }}>
      <div style={{ position: "absolute", top: "14px", left: "12px", right: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ padding: "8px 10px", borderRadius: "12px", border: "2px solid #0F1411", background: "#2E3A34", font: "500 10.5px/1 'DM Mono',monospace", letterSpacing: ".08em" }}>GILIRAN {v.bTurn}</div>
        {v.bBoss && (
          <div style={{ padding: "8px 10px", borderRadius: "12px", border: "2px solid #0F1411", background: "#D2532A", font: "500 10.5px/1 'DM Mono',monospace", letterSpacing: ".08em" }}>BOS</div>
        )}
        <div style={{ flex: "1" }} />
        <div style={{ display: "flex", gap: "3px", padding: "3px", borderRadius: "14px", background: "#0F1411" }}>
          {v.speeds.map((sp, i) => (
              <button key={sp.key ?? sp.id ?? i} onClick={sp.set} style={{ width: "40px", height: "30px", padding: "0", border: "0", borderRadius: "10px", background: sp.bg, color: sp.fg, font: "800 13px/1 'Bricolage Grotesque'", cursor: "pointer" }}>×{sp.n}</button>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", top: "66px", left: "12px", right: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ width: "46px", height: "46px", flex: "none", boxSizing: "border-box", display: "grid", placeItems: "center", border: "2.5px solid #0F1411", borderRadius: "14px", background: "#E7D9F5", color: "#2B1E18", font: "27px/1 'Material Symbols Rounded'" }}>{v.eIcon}</div>
        <div style={{ flex: "1", minWidth: "0" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "8px" }}>
            <span style={{ font: "20px/1.1 'Bagel Fat One',system-ui" }}>{v.eName}</span>
            <span style={{ font: "500 10.5px/1 'DM Mono',monospace", color: "#B9C4BE" }}>LV {v.eLvl}</span>
          </div>
          <div style={{ position: "relative", height: "18px", marginTop: "6px", boxSizing: "border-box", border: "2.5px solid #0F1411", borderRadius: "9px", background: "#0F1411", overflow: "hidden" }}>
            <div style={{ height: "100%", width: v.eHpPct, background: "#E0503A", transition: "width .25s" }} />
            <div style={{ position: "absolute", inset: "0", display: "flex", alignItems: "center", justifyContent: "center", font: "800 10.5px/1 'Bricolage Grotesque'", textShadow: "0 1px 0 #0F1411" }}>{v.eHpLabel}</div>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", top: "138px", right: "20px", width: "230px", height: "206px", transform: v.eTf, transition: "transform .09s" }}>
        <div style={{ position: "absolute", left: "14px", right: "14px", bottom: "0", height: "42px", borderRadius: "50%", background: "rgba(255,248,236,.06)", border: "2.5px solid rgba(255,248,236,.16)" }} />
        <div style={{ position: "absolute", left: "0", right: "0", top: "0", bottom: "12px", transform: v.eLunge, transition: "transform .14s ease-out" }}><Musuh kind={v.eKind} still={v.still} flip={true} /></div>
        <div style={{ position: "absolute", inset: "0", pointerEvents: "none" }}>{v.enemyPops}</div>
      </div>
      <div style={{ position: "absolute", left: "0", right: "0", top: "350px", height: "44px", zIndex: "4", pointerEvents: "none" }}>{v.banner}</div>
      <div style={{ position: "absolute", top: "396px", left: "18px", width: "206px", height: "188px", transform: v.hTf, transition: "transform .09s" }}>
        <div style={{ position: "absolute", left: "16px", right: "16px", bottom: "0", height: "40px", borderRadius: "50%", background: "rgba(255,248,236,.06)", border: "2.5px solid rgba(255,248,236,.16)" }} />
        <div style={{ position: "absolute", left: "12px", right: "12px", top: "0", bottom: "10px", transform: v.hLunge, transition: "transform .14s ease-out" }}><Santoni pose={v.heroPose} still={v.still} /></div>
        <div style={{ position: "absolute", inset: "0", pointerEvents: "none" }}>{v.heroPops}</div>
      </div>
      <div style={{ position: "absolute", top: "404px", left: "238px", right: "12px", display: "flex", flexDirection: "column", gap: "9px" }}>
        <div style={{ font: "500 9.5px/1 'DM Mono',monospace", letterSpacing: ".1em", color: "#B9C4BE" }}>SKILL AKTIF</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,40px)", gap: "8px" }}>
          {v.battleSkills.map((k, i) => (
              <div key={k.key ?? k.id ?? i} style={{ position: "relative", width: "40px", height: "40px", boxSizing: "border-box", display: "grid", placeItems: "center", border: `2.5px solid ${k.ring}`, borderRadius: "12px", background: k.bg, color: k.fg, font: "22px/1 'Material Symbols Rounded'", boxShadow: k.glow, transition: "box-shadow .15s,border-color .15s" }}>
                {k.icon}
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
      <div style={{ position: "absolute", left: "12px", right: "12px", bottom: "12px", height: "162px", boxSizing: "border-box", padding: "10px 12px", borderRadius: "18px", border: "2px solid #0F1411", background: "#141A17", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "7px", overflow: "hidden" }}>
        {v.bLog.map((l, i) => (
            <div key={l.key ?? l.id ?? i} style={{ font: "500 11.5px/1.4 'DM Mono',monospace", color: l.color, opacity: l.opacity, textWrap: "pretty" }}>{l.text}</div>
        ))}
      </div>
      {v.bOver && (
        <div style={{ position: "absolute", left: "50%", top: "372px", zIndex: "6", transform: "translate(-50%,-50%) rotate(-6deg)", padding: "10px 26px 12px", border: "3.5px solid #2B1E18", borderRadius: "18px", background: v.bOverColor, color: "#2B1E18", font: "40px/1 'Bagel Fat One',system-ui", boxShadow: "0 6px 0 #2B1E18", pointerEvents: "none" }}>{v.bOverText}</div>
      )}
    </div>
  );
}
