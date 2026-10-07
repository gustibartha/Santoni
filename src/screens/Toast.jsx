export default function Toast({ v }) {
  return (
    <div style={{ position: "absolute", left: "20px", right: "20px", bottom: "104px", zIndex: "40", padding: "11px 14px", border: "2.5px solid #FFF8EC", borderRadius: "16px", background: "#2B1E18", color: "#FFF8EC", font: "600 13px/1.4 'Bricolage Grotesque'", textAlign: "center", textWrap: "pretty", boxShadow: "0 8px 22px rgba(43,30,24,.4)", pointerEvents: "none" }}>{v.toastText}</div>
  );
}
