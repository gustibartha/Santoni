import ItemArt from '../characters/ItemArt.jsx';

const ICON = "'Material Symbols Rounded'";

// The current rotating festival: its rule, token balance, and a one-time exchange shop.
export default function FestivalScreen({ v }) {
  const f = v.fest;
  return (
    <div style={{ position: "absolute", top: "66px", left: "0", right: "0", bottom: "84px", overflowY: "auto", scrollbarWidth: "none", padding: "6px 14px 20px" }}>
      <div style={{ position: "relative", overflow: "hidden", padding: "16px 14px 14px", border: "3px solid #2B1E18", borderRadius: "24px", background: f.color, color: "#FFF8EC", boxShadow: "var(--lift5)" }}>
        <span style={{ position: "absolute", right: "-14px", top: "-18px", font: `120px/1 ${ICON}`, color: "rgba(255,248,236,.14)" }}>{f.icon}</span>
        <div style={{ font: "500 10.5px/1 'DM Mono',monospace", letterSpacing: ".08em", color: "#FFE9A8" }}>FESTIVAL · SISA {f.remain}</div>
        <div style={{ position: "relative", font: "26px/1.05 var(--display)", marginTop: "6px" }}>{f.name}</div>
        <div style={{ position: "relative", font: "500 13px/1.4 'Bricolage Grotesque'", marginTop: "6px", textWrap: "pretty" }}>{f.desc}</div>
        <div style={{ position: "relative", display: "flex", gap: "8px", alignItems: "flex-start", marginTop: "10px", padding: "9px 10px", borderRadius: "13px", background: "rgba(0,0,0,.22)", font: "600 12.5px/1.4 'Bricolage Grotesque'" }}>
          <span style={{ font: `18px/1 ${ICON}`, color: "#FFE9A8" }}>gavel</span>
          <span><b>Aturan festival:</b> {f.rule}</span>
        </div>
        <div style={{ position: "relative", font: "500 10.5px/1.3 'DM Mono',monospace", marginTop: "9px", color: "#FFE9A8" }}>BERIKUTNYA: {f.next.toUpperCase()}</div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "18px" }}>
        <span style={{ font: "20px/1 var(--display)" }}>Tukar {f.token}</span>
        <span style={{ display: "flex", alignItems: "center", gap: "5px", height: "30px", padding: "0 11px 0 6px", borderRadius: "15px", background: "#2B1E18", color: "#FFF8EC", font: "800 13px/1 'Bricolage Grotesque'" }}>
          <span style={{ font: `18px/1 ${ICON}`, color: "#F2B63C" }}>{f.tokenIcon}</span>{f.tokens}
        </span>
      </div>
      <div style={{ font: "500 12px/1.4 'Bricolage Grotesque'", color: "#5B4A40", marginTop: "4px" }}>Kalahkan musuh selama festival: +1 {f.token}, bos +5. Token hangus saat festival berganti.</div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "12px" }}>
        {f.shop.map(x => (
          <div key={x.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "11px 12px", border: "2.5px solid #2B1E18", borderRadius: "18px", background: x.item ? "#FBE3B8" : "#FFF8EC", boxShadow: "var(--lift3)", opacity: x.bought ? 0.55 : 1 }}>
            <div style={{ width: "54px", height: "54px", flex: "none", boxSizing: "border-box", display: "grid", placeItems: "center", border: "2px solid #2B1E18", borderRadius: "14px", background: "#FFF8EC" }}>
              {x.item ? <ItemArt id={x.item} size={44} /> : <span style={{ font: `28px/1 ${ICON}`, color: x.icon === 'diamond' ? "#7E43B5" : x.icon === 'bolt' ? "#3C78C8" : "#B0620A" }}>{x.icon}</span>}
            </div>
            <div style={{ flex: "1", minWidth: "0" }}>
              {x.item && <div style={{ font: "500 9.5px/1 'DM Mono',monospace", letterSpacing: ".06em", color: "#B0620A" }}>EKSKLUSIF FESTIVAL</div>}
              <div style={{ font: "800 14px/1.2 'Bricolage Grotesque'", marginTop: x.item ? "3px" : 0 }}>{x.label}</div>
              <div style={{ font: "500 11.5px/1.3 'Bricolage Grotesque'", color: "#5B4A40", marginTop: "2px" }}>{x.sub}</div>
            </div>
            <button onClick={x.buy} disabled={x.bought} style={{ flex: "none", display: "flex", alignItems: "center", gap: "4px", height: "36px", padding: "0 11px 0 8px", border: "2px solid #2B1E18", borderRadius: "12px", background: x.bought ? "#EADBC5" : x.afford ? "#F2B63C" : "#FFF8EC", color: "#2B1E18", font: "800 13px/1 'Bricolage Grotesque'", cursor: x.bought ? "default" : "pointer" }}>
              {x.bought ? 'Ditukar' : <><span style={{ font: `16px/1 ${ICON}` }}>{f.tokenIcon}</span>{x.cost}</>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
