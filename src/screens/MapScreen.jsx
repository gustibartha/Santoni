import ChapterBanner from '../components/ChapterBanner.jsx';
import Musuh from '../characters/Musuh.jsx';

export default function MapScreen({ v }) {
  return (
    <div style={{ position: "absolute", top: "66px", left: "0", right: "0", bottom: "84px", display: "flex", flexDirection: "column", gap: "10px", padding: "6px 14px 0" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "8px" }}>
        <div style={{ font: "28px/1 var(--display)" }}>Peta</div>
        <div style={{ font: "500 10px/1 'DM Mono',monospace", letterSpacing: ".08em", color: "#5E4A3F" }}>{v.mapSummary}</div>
      </div>
      <div style={{ flex: "1", minHeight: "0", overflowY: "auto", margin: "0 -14px", padding: "6px 14px 22px", scrollbarWidth: "none" }}>
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ position: "absolute", left: "20px", top: "24px", bottom: "24px", borderLeft: "3px dashed rgba(43,30,24,.32)" }} />
          {v.chapters.map((ch, i) => (
              <div key={ch.key ?? ch.id ?? i} style={{ position: "relative", display: "grid", gridTemplateColumns: "44px minmax(0,1fr)", gap: "10px", alignItems: "start" }}>
                <div style={{ position: "relative", zIndex: "1", width: "44px", height: "44px", boxSizing: "border-box", display: "grid", placeItems: "center", marginTop: "10px", border: "2.5px solid #2B1E18", borderRadius: "50%", background: ch.nodeBg, color: ch.nodeFg, font: "18px/1 var(--display)", boxShadow: "var(--lift3)" }}>{ch.no}</div>
                {ch.expanded && (
                  <div style={{ border: "3px solid #2B1E18", borderRadius: "22px", background: "#FFF8EC", boxShadow: "var(--lift5)", overflow: "hidden" }}>
                    <div style={{ position: "relative", height: "124px", borderBottom: "2.5px solid #2B1E18", backgroundColor: "#CFE6D6", backgroundImage: "radial-gradient(rgba(43,30,24,.12) 1.2px,transparent 1.5px)", backgroundSize: "10px 10px" }}>
                      <ChapterBanner theme={ch.theme} boss={ch.boss} still={v.still} />
                      <div style={{ position: "absolute", top: "10px", left: "10px", padding: "5px 8px", borderRadius: "8px", background: "#D2532A", color: "#FFF8EC", font: "500 10.5px/1 'DM Mono',monospace", letterSpacing: ".08em", pointerEvents: "none" }}>{ch.status}</div>
                    </div>
                    <div style={{ padding: "12px 14px 14px" }}>
                      <div style={{ font: "22px/1.1 var(--display)" }}>{ch.name}</div>
                      <div style={{ font: "500 13px/1.4 'Bricolage Grotesque'", color: "#5B4A40", marginTop: "5px", textWrap: "pretty" }}>{ch.desc}</div>
                      <div style={{ marginTop: "10px", padding: "8px 10px 9px", borderRadius: "14px", background: "#F3E6D3" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", font: "500 10px/1 'DM Mono',monospace", letterSpacing: ".08em", color: "#5E4A3F" }}><span>PENGHUNI</span><span>{ch.power}</span></div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "7px" }}>
                          {ch.lineup.map(m => (
                            <div key={m.role + m.kind} title={m.name} style={{ position: "relative", width: "38px", height: "38px", boxSizing: "border-box", border: `2px solid ${m.role === 'BOS' ? '#D2532A' : '#2B1E18'}`, borderRadius: "11px", background: m.role === 'BOS' ? "#FBE3D8" : "#FFF8EC" }}>
                              <div style={{ position: "absolute", inset: "2px 2px 0" }}><Musuh kind={m.kind} still={true} /></div>
                              {m.role && <span style={{ position: "absolute", left: "50%", bottom: "-7px", transform: "translateX(-50%)", padding: "1px 4px", borderRadius: "5px", background: m.role === 'BOS' ? "#D2532A" : "#2B1E18", color: "#FFF8EC", font: "500 7px/1.2 'DM Mono',monospace", letterSpacing: ".04em", whiteSpace: "nowrap" }}>{m.role}</span>}
                            </div>
                          ))}
                        </div>
                        <div style={{ marginTop: "11px", font: "600 11.5px/1.35 'Bricolage Grotesque'", color: "#5B4A40" }}><b>Bos: {ch.bossName}.</b> {ch.bossTrait}</div>
                        {ch.rule && <div style={{ marginTop: "6px", font: "600 11.5px/1.35 'Bricolage Grotesque'", color: "#A93D1C" }}><b>Aturan bab — {ch.rule.name}.</b> {ch.rule.desc}</div>}
                      </div>
                      <div style={{ font: "500 10px/1 'DM Mono',monospace", letterSpacing: ".06em", color: "#5E4A3F", marginTop: "10px" }}>{ch.best}</div>
                      <div style={{ position: "relative", height: "46px", margin: "10px 16px 0 2px" }}>
                        <div style={{ position: "absolute", left: "0", right: "0", top: "11px", height: "10px", boxSizing: "border-box", border: "2px solid #2B1E18", borderRadius: "6px", background: "#EADBC5", overflow: "hidden" }}><div style={{ height: "100%", width: ch.dayPct, background: "#D2532A" }} /></div>
                        {ch.chests.map((c, i) => (
                            <div key={c.key ?? c.id ?? i} onClick={c.claim} style={{ position: "absolute", top: "0", left: c.left, transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", cursor: "pointer" }}>
                              <div style={{ width: "32px", height: "32px", boxSizing: "border-box", display: "grid", placeItems: "center", border: "2.5px solid #2B1E18", borderRadius: "10px", background: c.bg, color: c.color, font: "18px/1 'Material Symbols Rounded'", boxShadow: "var(--lift2)" }}>{c.icon}</div>
                              <div style={{ font: "500 10px/1 'DM Mono',monospace" }}>{c.label}</div>
                            </div>
                        ))}
                      </div>
                      <button onClick={ch.play} className="dc-press" style={{ width: "100%", height: "52px", marginTop: "10px", padding: "0", border: "3px solid #2B1E18", borderRadius: "17px", background: "#D2532A", boxShadow: "var(--lift5)", color: "#FFF8EC", font: "22px/1 var(--display)", textShadow: "2px 0 0 #2B1E18,-2px 0 0 #2B1E18,0 2px 0 #2B1E18,0 -2px 0 #2B1E18,1.5px 1.5px 0 #2B1E18,-1.5px 1.5px 0 #2B1E18,1.5px -1.5px 0 #2B1E18,-1.5px -1.5px 0 #2B1E18,0 3px 0 #2B1E18", cursor: "pointer", '--press-tf': "translateY(3px)", '--press-sh': "var(--lift2)" }}>
                        {ch.cta}
                      </button>
                    </div>
                  </div>
                )}
                {ch.compact && (
                  <div onClick={ch.select} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", border: "2.5px solid #2B1E18", borderRadius: "18px", background: ch.cardBg, boxShadow: "var(--lift3)", opacity: ch.opacity, cursor: "pointer" }}>
                    <div style={{ width: "52px", height: "52px", flex: "none", boxSizing: "border-box", display: "grid", placeItems: "center", border: "2px solid #2B1E18", borderRadius: "14px", background: ch.thumbBg, color: "#2B1E18", font: "26px/1 'Material Symbols Rounded'" }}>{ch.icon}</div>
                    <div style={{ flex: "1", minWidth: "0" }}>
                      <div style={{ font: "17px/1.15 var(--display)" }}>{ch.name}</div>
                      <div style={{ font: "600 12px/1.3 'Bricolage Grotesque'", color: "#5E4A3F", marginTop: "3px" }}>{ch.line}</div>
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
