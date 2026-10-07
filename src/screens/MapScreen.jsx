import ImageSlot from '../components/ImageSlot.jsx';

export default function MapScreen({ v }) {
  return (
    <div style={{ position: "absolute", top: "66px", left: "0", right: "0", bottom: "84px", display: "flex", flexDirection: "column", gap: "10px", padding: "6px 14px 0" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "8px" }}>
        <div style={{ font: "28px/1 'Bagel Fat One',system-ui" }}>Peta</div>
        <div style={{ font: "500 10px/1 'DM Mono',monospace", letterSpacing: ".08em", color: "#6E5A4E" }}>{v.mapSummary}</div>
      </div>
      <div style={{ flex: "1", minHeight: "0", overflowY: "auto", margin: "0 -14px", padding: "6px 14px 22px", scrollbarWidth: "none" }}>
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ position: "absolute", left: "20px", top: "24px", bottom: "24px", borderLeft: "3px dashed rgba(43,30,24,.32)" }} />
          {v.chapters.map((ch, i) => (
              <div key={ch.key ?? ch.id ?? i} style={{ position: "relative", display: "grid", gridTemplateColumns: "44px minmax(0,1fr)", gap: "10px", alignItems: "start" }}>
                <div style={{ position: "relative", zIndex: "1", width: "44px", height: "44px", boxSizing: "border-box", display: "grid", placeItems: "center", marginTop: "10px", border: "2.5px solid #2B1E18", borderRadius: "50%", background: ch.nodeBg, color: ch.nodeFg, font: "18px/1 'Bagel Fat One',system-ui", boxShadow: "0 3px 0 #2B1E18" }}>{ch.no}</div>
                {ch.expanded && (
                  <div style={{ border: "3px solid #2B1E18", borderRadius: "22px", background: "#FFF8EC", boxShadow: "0 5px 0 #2B1E18", overflow: "hidden" }}>
                    <div style={{ position: "relative", height: "124px", borderBottom: "2.5px solid #2B1E18", backgroundColor: "#CFE6D6", backgroundImage: "radial-gradient(rgba(43,30,24,.12) 1.2px,transparent 1.5px)", backgroundSize: "10px 10px" }}>
                      <ImageSlot id={ch.artId} shape={"rect"} placeholder={ch.artLabel} style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }} />
                      <div style={{ position: "absolute", top: "10px", left: "10px", padding: "5px 8px", borderRadius: "8px", background: "#D2532A", color: "#FFF8EC", font: "500 9.5px/1 'DM Mono',monospace", letterSpacing: ".08em", pointerEvents: "none" }}>{ch.status}</div>
                    </div>
                    <div style={{ padding: "12px 14px 14px" }}>
                      <div style={{ font: "22px/1.1 'Bagel Fat One',system-ui" }}>{ch.name}</div>
                      <div style={{ font: "500 13px/1.4 'Bricolage Grotesque'", color: "#5B4A40", marginTop: "5px", textWrap: "pretty" }}>{ch.desc}</div>
                      <div style={{ font: "500 10px/1 'DM Mono',monospace", letterSpacing: ".06em", color: "#6E5A4E", marginTop: "10px" }}>{ch.best}</div>
                      <div style={{ position: "relative", height: "46px", margin: "10px 16px 0 2px" }}>
                        <div style={{ position: "absolute", left: "0", right: "0", top: "11px", height: "10px", boxSizing: "border-box", border: "2px solid #2B1E18", borderRadius: "6px", background: "#EADBC5", overflow: "hidden" }}><div style={{ height: "100%", width: ch.dayPct, background: "#D2532A" }} /></div>
                        {ch.chests.map((c, i) => (
                            <div key={c.key ?? c.id ?? i} onClick={c.claim} style={{ position: "absolute", top: "0", left: c.left, transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", cursor: "pointer" }}>
                              <div style={{ width: "32px", height: "32px", boxSizing: "border-box", display: "grid", placeItems: "center", border: "2.5px solid #2B1E18", borderRadius: "10px", background: c.bg, color: c.color, font: "18px/1 'Material Symbols Rounded'", boxShadow: "0 2px 0 #2B1E18" }}>{c.icon}</div>
                              <div style={{ font: "500 9px/1 'DM Mono',monospace" }}>{c.label}</div>
                            </div>
                        ))}
                      </div>
                      <button onClick={ch.play} className="dc-press" style={{ width: "100%", height: "52px", marginTop: "10px", padding: "0", border: "3px solid #2B1E18", borderRadius: "17px", background: "#D2532A", boxShadow: "0 5px 0 #2B1E18", color: "#FFF8EC", font: "22px/1 'Bagel Fat One',system-ui", textShadow: "2px 0 0 #2B1E18,-2px 0 0 #2B1E18,0 2px 0 #2B1E18,0 -2px 0 #2B1E18,1.5px 1.5px 0 #2B1E18,-1.5px 1.5px 0 #2B1E18,1.5px -1.5px 0 #2B1E18,-1.5px -1.5px 0 #2B1E18,0 3px 0 #2B1E18", cursor: "pointer", '--press-tf': "translateY(3px)", '--press-sh': "0 2px 0 #2B1E18" }}>
                        {ch.cta}
                      </button>
                    </div>
                  </div>
                )}
                {ch.compact && (
                  <div onClick={ch.select} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", border: "2.5px solid #2B1E18", borderRadius: "18px", background: ch.cardBg, boxShadow: "0 3px 0 #2B1E18", opacity: ch.opacity, cursor: "pointer" }}>
                    <div style={{ width: "52px", height: "52px", flex: "none", boxSizing: "border-box", display: "grid", placeItems: "center", border: "2px solid #2B1E18", borderRadius: "14px", background: ch.thumbBg, color: "#2B1E18", font: "26px/1 'Material Symbols Rounded'" }}>{ch.icon}</div>
                    <div style={{ flex: "1", minWidth: "0" }}>
                      <div style={{ font: "17px/1.15 'Bagel Fat One',system-ui" }}>{ch.name}</div>
                      <div style={{ font: "600 12px/1.3 'Bricolage Grotesque'", color: "#6E5A4E", marginTop: "3px" }}>{ch.line}</div>
                    </div>
                    <span style={{ font: "22px/1 'Material Symbols Rounded'", color: ch.endFg }}>{ch.endIcon}</span>
                  </div>
                )}
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}
