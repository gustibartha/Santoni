import ItemArt from '../characters/ItemArt.jsx';

const ICON = "'Material Symbols Rounded'";
const TINT = { api: "#FBE4DA", petir: "#F8EDCC", tanah: "#F1E4D6", angin: "#DFEAF7" };
const CHIP = { display: "inline-flex", alignItems: "center", gap: "3px", height: "20px", padding: "0 7px", borderRadius: "7px", font: "800 10.5px/1 'Bricolage Grotesque'", whiteSpace: "nowrap" };
const BTN = { height: "44px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", border: "2.5px solid #2B1E18", borderRadius: "14px", boxShadow: "var(--lift3)", color: "#2B1E18", font: "800 13.5px/1 'Bricolage Grotesque'", cursor: "pointer" };

// Detail card for one piece of equipment: stat, element and what it does, resonance, and the
// weapon's ultimate. Opened by tapping a slot or a bag item on the Hero screen.
export default function ItemSheet({ s }) {
  return (
    <div onClick={s.close} style={{ position: "absolute", inset: "0", zIndex: "44", display: "flex", alignItems: "flex-end", background: "rgba(32,22,17,.55)", animation: "fadeIn .18s ease-out both" }}>
      <div onClick={e => e.stopPropagation()} role="dialog" aria-label={s.name} style={{ width: "100%", maxHeight: "86%", overflowY: "auto", scrollbarWidth: "none", boxSizing: "border-box", padding: "16px 16px 20px", borderTop: "3px solid #2B1E18", borderRadius: "26px 26px 0 0", background: "#FFF8EC", boxShadow: "0 -4px 0 rgba(43,30,24,.25)", animation: "sheetUp .3s cubic-bezier(.2,.9,.3,1.1) both" }}>
        <div style={{ width: "44px", height: "5px", margin: "-6px auto 12px", borderRadius: "3px", background: "#D8C7B2" }} />
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div style={{ position: "relative", width: "78px", height: "78px", flex: "none", boxSizing: "border-box", display: "grid", placeItems: "center", border: "2.5px solid #2B1E18", borderRadius: "20px", background: s.rarBg, boxShadow: "var(--lift3)" }}>
            <ItemArt id={s.id} size={56} />
            {s.el && <span style={{ position: "absolute", right: "-7px", top: "-7px", width: "24px", height: "24px", boxSizing: "border-box", display: "grid", placeItems: "center", borderRadius: "50%", border: "2px solid #2B1E18", background: s.el.color, color: "#FFF8EC", font: `14px/1 ${ICON}` }}>{s.el.icon}</span>}
          </div>
          <div style={{ minWidth: "0", flex: "1" }}>
            <div style={{ font: "20px/1.1 var(--display)", textWrap: "pretty" }}>{s.name}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "6px" }}>
              <span style={{ ...CHIP, background: s.rarBg, color: s.rarFg, border: `1.5px solid ${s.rarFg}` }}>{s.rar}</span>
              <span style={{ ...CHIP, background: "#2B1E18", color: "#FFF8EC" }}>{s.type}</span>
              <span style={{ ...CHIP, background: "#EADBC5", color: "#2B1E18" }}>{s.lvl}</span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "14px", padding: "10px 12px", border: "2px solid #2B1E18", borderRadius: "14px", background: "#FFFFFF" }}>
          <span style={{ font: `22px/1 ${ICON}`, color: "#B0620A" }}>{s.stat === 'ATK' ? 'swords' : s.stat === 'HP' ? 'favorite' : 'shield'}</span>
          <div style={{ flex: "1", minWidth: "0" }}>
            <div style={{ font: "500 10px/1 'DM Mono',monospace", letterSpacing: ".08em", color: "#5E4A3F" }}>ATRIBUT</div>
            <div style={{ font: "20px/1.1 var(--display)", marginTop: "3px" }}>{s.stat} +{s.val}</div>
          </div>
          {s.compare && (
            <div style={{ textAlign: "right", font: "600 11px/1.35 'Bricolage Grotesque'", color: "#5B4A40" }}>
              Terpasang: {s.compare.val}
              {s.compare.diff != null && <div style={{ font: "800 13px/1.2 'Bricolage Grotesque'", color: s.compare.diff >= 0 ? "#2F7A5C" : "#C0392B" }}>{s.compare.diff >= 0 ? '▲ +' : '▼ '}{s.compare.diff}</div>}
            </div>
          )}
        </div>

        <div style={{ marginTop: "10px", padding: "10px 12px", border: "2px solid #2B1E18", borderRadius: "14px", background: s.el ? TINT[s.el.key] : "#F3E6D3" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ font: "500 10px/1 'DM Mono',monospace", letterSpacing: ".08em", color: "#5E4A3F" }}>ELEMEN</span>
            {s.el
              ? <span style={{ ...CHIP, background: s.el.color, color: "#FFF8EC", border: "1.5px solid #2B1E18" }}><span style={{ font: `13px/1 ${ICON}` }}>{s.el.icon}</span>{s.el.label}</span>
              : <span style={{ ...CHIP, background: "#FFF8EC", color: "#5E4A3F", border: "1.5px solid #B9A994" }}>NETRAL</span>}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "8px" }}>
            {s.elLines.map((l, i) => (
              <div key={i} style={{ display: "flex", gap: "7px", alignItems: "flex-start", font: "500 12.5px/1.4 'Bricolage Grotesque'", color: "#2B1E18", textWrap: "pretty" }}>
                <span style={{ font: `15px/1.2 ${ICON}`, color: s.el ? s.el.color : "#8A776A", flex: "none" }}>{l.icon}</span>{l.text}
              </div>
            ))}
          </div>
        </div>

        {s.ult && (
          <div style={{ marginTop: "10px", padding: "10px 12px", border: "2px solid #2B1E18", borderRadius: "14px", background: "#2B1E18", color: "#FFF8EC" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
              <span style={{ font: "500 10px/1 'DM Mono',monospace", letterSpacing: ".08em", color: "#F2B63C" }}>PAMUNGKAS</span>
              <span style={{ font: "15px/1.1 var(--display)" }}>{s.ult.name}</span>
            </div>
            <div style={{ font: "500 12px/1.4 'Bricolage Grotesque'", color: "#E8DCCB", marginTop: "4px" }}>{s.ult.desc}</div>
          </div>
        )}

        <div style={{ font: "italic 500 12.5px/1.45 'Bricolage Grotesque'", color: "#5B4A40", marginTop: "10px", textWrap: "pretty" }}>“{s.desc}”</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "14px" }}>
          {s.fromBag
            ? <button onClick={s.equip} style={{ ...BTN, background: "#F2B63C" }}><span style={{ font: `18px/1 ${ICON}` }}>check_circle</span>Pasang</button>
            : <button onClick={s.bengkel} style={{ ...BTN, background: "#F2B63C" }}><span style={{ font: `18px/1 ${ICON}` }}>hardware</span>Ke Bengkel</button>}
          <button onClick={s.close} style={{ ...BTN, background: "#FFF8EC" }}>Tutup</button>
        </div>
      </div>
    </div>
  );
}
