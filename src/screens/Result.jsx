import Santoni from '../characters/Santoni.jsx';
import ItemArt from '../characters/ItemArt.jsx';

export default function Result({ v }) {
  return (
    <div style={{ position: "absolute", inset: "0", display: "flex", flexDirection: "column", alignItems: "center", padding: "30px 18px 20px", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: "50%", top: "250px", width: "980px", height: "980px", marginLeft: "-490px", marginTop: "-490px", borderRadius: "50%", background: "repeating-conic-gradient(rgba(210,83,42,.1) 0deg 8deg,transparent 8deg 16deg)", pointerEvents: "none" }} />
      <div style={{ position: "relative", padding: "7px 16px", border: "2.5px solid #2B1E18", borderRadius: "12px", background: v.resRibbonBg, color: "#FFF8EC", font: "500 10.5px/1 'DM Mono',monospace", letterSpacing: ".08em", transform: "rotate(-2deg)", boxShadow: "var(--lift3)" }}>{v.resRibbon}</div>
      <div style={{ position: "relative", marginTop: "14px", font: "40px/1 var(--display)", textAlign: "center" }}>{v.resTitle}</div>
      <div style={{ position: "relative", marginTop: "8px", font: "600 14px/1.3 'Bricolage Grotesque'", color: "#5B4A40", textAlign: "center" }}>{v.resSub}</div>
      <div style={{ position: "relative", width: "300px", height: "172px", marginTop: "16px", border: "2.5px solid #2B1E18", borderRadius: "26px", overflow: "hidden", backgroundColor: "#F3B49A", backgroundImage: "radial-gradient(rgba(43,30,24,.13) 1.2px,transparent 1.5px)", backgroundSize: "10px 10px", boxShadow: "var(--lift4)" }}>
        <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", height: "42px", background: "#CFE6D6", borderTop: "2.5px solid #2B1E18" }} />
        <div style={{ position: "absolute", left: "50%", bottom: "8px", width: "146px", height: "160px", marginLeft: "-73px" }}><Santoni pose={v.resPose} still={v.still} /></div>
      </div>
      <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "2px", width: "100%", marginTop: "16px", border: "2.5px solid #2B1E18", borderRadius: "16px", background: "#2B1E18", overflow: "hidden", boxShadow: "var(--lift3)" }}>
        {v.resStats.map((rs, i) => (
            <div key={rs.key ?? rs.id ?? i} style={{ padding: "9px 6px 10px", background: "#FFF8EC", textAlign: "center" }}>
              <div style={{ font: "22px/1 var(--display)" }}>{rs.value}</div>
              <div style={{ font: "500 10.5px/1 'DM Mono',monospace", letterSpacing: ".08em", color: "#5E4A3F", marginTop: "5px" }}>{rs.label}</div>
            </div>
        ))}
      </div>
      <div style={{ position: "relative", alignSelf: "stretch", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "16px" }}>
        <span style={{ font: "18px/1 var(--display)" }}>Hadiah</span>
        {v.resRecord && (
          <span style={{ padding: "4px 8px", borderRadius: "8px", background: "#F2B63C", border: "2px solid #2B1E18", font: "500 10.5px/1 'DM Mono',monospace", letterSpacing: ".08em" }}>REKOR BARU</span>
        )}
      </div>
      <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "10px", width: "100%", marginTop: "10px" }}>
        {v.resRewards.map((rw, i) => (
            <div key={rw.key ?? rw.id ?? i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", minWidth: "0" }}>
              <div style={{ width: "100%", aspectRatio: "1", boxSizing: "border-box", display: "grid", placeItems: "center", border: "2.5px solid #2B1E18", borderRadius: "16px", background: rw.bg, boxShadow: "var(--lift3)" }}>{rw.item ? <ItemArt id={rw.item} size={48} /> : <span style={{ font: "32px/1 'Material Symbols Rounded'", color: rw.fg }}>{rw.icon}</span>}</div>
              <div style={{ font: "800 11.5px/1.2 'Bricolage Grotesque'", textAlign: "center" }}>{rw.label}</div>
            </div>
        ))}
      </div>
      <div style={{ position: "relative", marginTop: "12px", padding: "0 10px", font: "italic 500 13px/1.4 'Bricolage Grotesque'", color: "#5B4A40", textAlign: "center", textWrap: "pretty" }}>“{v.resQuote}”</div>
      {v.resDaily && (
        <button onClick={v.resDaily.open} style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", border: "2.5px solid #2B1E18", borderRadius: "16px", background: "#2B1E18", color: "#FFF8EC", boxShadow: "var(--lift3)", cursor: "pointer", textAlign: "left" }}>
          <span style={{ font: "26px/1 'Material Symbols Rounded'", color: "#F2B63C" }}>emoji_events</span>
          <span style={{ flex: "1" }}><span style={{ display: "block", font: "500 10px/1 'DM Mono',monospace", letterSpacing: ".08em", color: "#F2B63C" }}>SKOR TANTANGAN HARIAN</span><span style={{ display: "block", font: "22px/1.1 var(--display)", marginTop: "3px" }}>{v.resDaily.score}</span></span>
          <span style={{ font: "800 12px/1 'Bricolage Grotesque'" }}>Papan peringkat ›</span>
        </button>
      )}
      {v.resStory && (
        <div style={{ marginTop: "12px", padding: "10px 12px", border: "2.5px solid #2B1E18", borderRadius: "16px", background: "#FFF8EC", boxShadow: "var(--lift3)" }}>
          <div style={{ font: "600 12.5px/1.4 'Bricolage Grotesque'", textWrap: "pretty" }}>{v.resStory.sentence}</div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "7px" }}>
            <div style={{ flex: "1", minWidth: "0", font: "14px/1.25 system-ui", letterSpacing: "1px", wordBreak: "break-all" }}>{v.resStory.strip}</div>
            <button onClick={v.shareRun} style={{ flex: "none", display: "flex", alignItems: "center", gap: "5px", height: "36px", padding: "0 12px", border: "2.5px solid #2B1E18", borderRadius: "12px", background: "#3C78C8", color: "#FFF8EC", boxShadow: "var(--lift2)", font: "800 12.5px/1 'Bricolage Grotesque'", cursor: "pointer" }}><span style={{ font: "17px/1 'Material Symbols Rounded'" }}>share</span>Bagikan</button>
          </div>
        </div>
      )}
      <div style={{ flex: "1" }} />
      <button onClick={v.claim2} className="dc-press" style={{ position: "relative", width: "100%", height: "60px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", padding: "0", border: "3px solid #2B1E18", borderRadius: "20px", background: "#F2B63C", boxShadow: "var(--lift6)", color: "#2B1E18", font: "24px/1 var(--display)", cursor: "pointer", '--press-tf': "translateY(4px)", '--press-sh': "var(--lift2)" }}>
        <span style={{ font: "24px/1 'Material Symbols Rounded'" }}>smart_display</span>
        Klaim ×2
      </button>
      <button onClick={v.claim1} style={{ position: "relative", height: "38px", marginTop: "8px", padding: "0 20px", border: "0", background: "transparent", color: "#5B4A40", font: "700 14px/1 'Bricolage Grotesque'", textDecoration: "underline", textUnderlineOffset: "3px", cursor: "pointer" }}>Klaim biasa</button>
    </div>
  );
}
