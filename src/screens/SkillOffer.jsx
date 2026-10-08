import SkillArt from '../characters/SkillArt.jsx';

export default function SkillOffer({ v }) {
  return (
    <div style={{ position: "absolute", inset: "0", zIndex: "20", display: "flex", flexDirection: "column", alignItems: "center", padding: "58px 18px 24px", background: "rgba(32,22,17,.84)", overflow: "hidden" }}>
      {v.burst}
      <div style={{ position: "relative", font: "40px/1 'Bagel Fat One',system-ui", color: "#F2B63C", textAlign: "center", textShadow: "2px 0 0 #2B1E18,-2px 0 0 #2B1E18,0 2px 0 #2B1E18,0 -2px 0 #2B1E18,1.5px 1.5px 0 #2B1E18,-1.5px 1.5px 0 #2B1E18,1.5px -1.5px 0 #2B1E18,-1.5px -1.5px 0 #2B1E18,0 4px 0 #2B1E18" }}>{v.offerTitle}</div>
      {v.offerHasLvl && (
        <div style={{ position: "relative", marginTop: "12px", padding: "6px 12px", border: "2.5px solid #2B1E18", borderRadius: "12px", background: "#FFF8EC", font: "800 13px/1 'Bricolage Grotesque'" }}>Lv {v.offerFrom} → Lv {v.offerTo}</div>
      )}
      <div style={{ position: "relative", marginTop: "12px", maxWidth: "290px", textAlign: "center", color: "#FFF8EC", font: "500 14px/1.4 'Bricolage Grotesque'", textWrap: "pretty" }}>{v.offerSub}</div>
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "14px", width: "100%", marginTop: "22px" }}>
        {v.offerCards.map((o, i) => (
            <div key={o.key ?? o.id ?? i} onClick={o.pick} className="dc-hover dc-press" style={{ display: "flex", gap: "14px", alignItems: "center", padding: "12px 14px 12px 12px", border: "3px solid #2B1E18", borderRadius: "22px", background: "#FFF8EC", boxShadow: "0 5px 0 #2B1E18", cursor: "pointer", transition: "transform .12s", '--hover-tf': "translateY(-3px)", '--press-tf': "translateY(3px)", '--press-sh': "0 2px 0 #2B1E18" }}>
              <div style={{ width: "72px", height: "72px", flex: "none", boxSizing: "border-box", display: "grid", placeItems: "center", border: "2.5px solid #2B1E18", borderRadius: "18px", background: o.bg, color: o.fg, font: "38px/1 'Material Symbols Rounded'" }}><SkillArt id={o.id} size={54} /></div>
              <div style={{ flex: "1", minWidth: "0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ padding: "3px 7px", borderRadius: "7px", background: o.fg, color: "#FFF8EC", font: "500 10.5px/1 'DM Mono',monospace", letterSpacing: ".08em" }}>{o.rarity}</span>
                  {o.el && (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "2px", padding: "2px 6px 2px 4px", borderRadius: "7px", border: `1.5px solid ${o.el.color}`, color: o.el.color, font: "500 10.5px/1 'DM Mono',monospace", letterSpacing: ".08em" }}>
                      <span style={{ font: "12px/1 'Material Symbols Rounded'" }}>{o.el.icon}</span>{o.el.label}
                    </span>
                  )}
                  <span style={{ font: "500 10.5px/1 'DM Mono',monospace", letterSpacing: ".06em", color: "#5E4A3F" }}>{o.tag}</span>
                </div>
                <div style={{ font: "19px/1.1 'Bagel Fat One',system-ui", marginTop: "6px" }}>{o.name}</div>
                <div style={{ font: "500 12.5px/1.35 'Bricolage Grotesque'", color: "#5B4A40", marginTop: "4px", textWrap: "pretty" }}>{o.desc}</div>
              </div>
            </div>
        ))}
      </div>
      <button onClick={v.reroll} disabled={v.rerollDisabled} style={{ position: "relative", marginTop: "22px", display: "flex", alignItems: "center", gap: "8px", height: "46px", padding: "0 18px", border: "2.5px solid #FFF8EC", borderRadius: "16px", background: "transparent", color: "#FFF8EC", font: "700 14px/1 'Bricolage Grotesque'", cursor: "pointer", opacity: v.rerollOpacity }}>
        <span style={{ font: "20px/1 'Material Symbols Rounded'" }}>casino</span>
        Acak ulang · {v.rerollLeft}
      </button>
      <button onClick={v.askQuit} style={{ position: "relative", marginTop: "10px", display: "flex", alignItems: "center", gap: "5px", padding: "6px 10px", border: "0", background: "transparent", color: "rgba(255,248,236,.75)", font: "700 12.5px/1 'Bricolage Grotesque'", textDecoration: "underline", textUnderlineOffset: "3px", cursor: "pointer" }}><span style={{ font: "16px/1 'Material Symbols Rounded'" }}>home</span>Pulang saja</button>
    </div>
  );
}
