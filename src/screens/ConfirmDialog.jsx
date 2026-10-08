// Modal asking before leaving a run or giving up a tower floor. The game clock pauses while open.
export default function ConfirmDialog({ c }) {
  return (
    <div style={{ position: "absolute", inset: "0", zIndex: "45", display: "grid", placeItems: "center", padding: "0 24px", background: "rgba(32,22,17,.62)" }}>
      <div style={{ width: "100%", boxSizing: "border-box", padding: "18px 18px 16px", border: "3px solid #2B1E18", borderRadius: "24px", background: "#FFF8EC", boxShadow: "0 6px 0 #2B1E18", textAlign: "center" }}>
        <div style={{ font: "22px/1.1 'Bagel Fat One',system-ui" }}>{c.title}</div>
        <div style={{ font: "500 13.5px/1.45 'Bricolage Grotesque'", color: "#5B4A40", marginTop: "8px", textWrap: "pretty" }}>{c.text}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "16px" }}>
          <button onClick={c.no} className="dc-press" style={{ height: "46px", border: "2.5px solid #2B1E18", borderRadius: "15px", background: "#F2B63C", boxShadow: "0 4px 0 #2B1E18", color: "#2B1E18", font: "800 14px/1 'Bricolage Grotesque'", cursor: "pointer", '--press-tf': "translateY(3px)", '--press-sh': "0 1px 0 #2B1E18" }}>{c.noLabel || 'Lanjut'}</button>
          <button onClick={c.yes} className="dc-press" style={{ height: "46px", border: "2.5px solid #2B1E18", borderRadius: "15px", background: "#2B1E18", boxShadow: "0 4px 0 #120C09", color: "#FFF8EC", font: "800 14px/1 'Bricolage Grotesque'", cursor: "pointer", '--press-tf': "translateY(3px)", '--press-sh': "0 1px 0 #120C09" }}>{c.yesLabel}</button>
        </div>
      </div>
    </div>
  );
}
