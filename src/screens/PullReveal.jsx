export default function PullReveal({ v }) {
  return (
    <div style={{ position: "absolute", inset: "0", zIndex: "30", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", padding: "24px 18px", background: "rgba(32,22,17,.9)", overflow: "hidden" }}>
      {v.pullBurst}
      <div style={{ position: "relative", font: "34px/1 var(--display)", color: "#F2B63C", textShadow: "2px 0 0 #2B1E18,-2px 0 0 #2B1E18,0 2px 0 #2B1E18,0 -2px 0 #2B1E18,1.5px 1.5px 0 #2B1E18,-1.5px 1.5px 0 #2B1E18,1.5px -1.5px 0 #2B1E18,-1.5px -1.5px 0 #2B1E18,0 4px 0 #2B1E18" }}>Peti terbuka.</div>
      <div style={{ position: "relative", maxWidth: "300px", font: "500 14px/1.4 'Bricolage Grotesque'", color: "#FFF8EC", textAlign: "center", textWrap: "pretty" }}>{v.pullSub}</div>
      <div style={{ position: "relative", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", maxWidth: "340px" }}>{v.pullCards}</div>
      <button onClick={v.closePull} className="dc-press" style={{ position: "relative", height: "52px", marginTop: "6px", padding: "0 36px", border: "3px solid #2B1E18", borderRadius: "17px", background: "#F2B63C", boxShadow: "var(--lift5)", color: "#2B1E18", font: "20px/1 var(--display)", cursor: "pointer", '--press-tf': "translateY(3px)", '--press-sh': "var(--lift2)" }}>Oke</button>
    </div>
  );
}
