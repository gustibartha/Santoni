import ItemArt from '../characters/ItemArt.jsx';

const ICON = "'Material Symbols Rounded'";
const LOOT = {
  kosong: { icon: 'blur_on', color: '#8C7B6B', label: '' },
  koin: { icon: 'toll', color: '#B0620A' },
  asah: { icon: 'hardware', color: '#2F7A5C' },
  permata: { icon: 'diamond', color: '#7E43B5' },
  pakan: { icon: 'nutrition', color: '#5E6E52' },
  tangga: { icon: 'stairs', color: '#2B1E18', label: 'TANGGA' }
};

// Cracker mine: tap a tile to spend a pickaxe and see what is underneath.
export default function TambangScreen({ v }) {
  const m = v.mine;
  return (
    <div style={{ position: "absolute", top: "66px", left: "0", right: "0", bottom: "84px", overflowY: "auto", scrollbarWidth: "none", padding: "6px 14px 20px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div style={{ font: "28px/1 var(--display)" }}>{m.name}</div>
        <button onClick={v.openModes} style={{ display: "flex", alignItems: "center", gap: "3px", border: "0", background: "transparent", font: "800 12.5px/1 'Bricolage Grotesque'", color: "#A93D1C", cursor: "pointer" }}><span style={{ font: `16px/1 ${ICON}` }}>arrow_back</span>Tantangan</button>
      </div>
      <div style={{ font: "500 12.5px/1.4 'Bricolage Grotesque'", color: "#5B4A40", marginTop: "5px" }}>Satu kapak untuk satu petak. Tiap lantai punya satu tangga ke bawah. Makin dalam, makin berharga kerupuknya.</div>
      <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
        {[['layers', `Lantai ${m.floor}`, '#6B3A2A'], ['hardware', `${m.picks}/${m.maxPicks} kapak`, '#2F7A5C'], ['hardware', `${v.asah} Batu Asah`, '#3A3550']].map(([ic, t, bg], i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "4px", height: "28px", padding: "0 10px 0 6px", borderRadius: "10px", background: bg, color: "#FFF8EC", font: "800 12px/1 'Bricolage Grotesque'" }}><span style={{ font: `15px/1 ${ICON}` }}>{ic}</span>{t}</span>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${m.cols},1fr)`, gap: "6px", marginTop: "12px", padding: "8px", border: "3px solid #2B1E18", borderRadius: "18px", background: "#4A2E22", boxShadow: "var(--lift4)" }}>
        {m.tiles.map(t => {
          const L = LOOT[t.t] || LOOT.kosong;
          return (
            <button key={t.i} onClick={t.dig} disabled={t.open} aria-label={t.open ? t.t : 'Gali petak'} style={{ aspectRatio: "1", display: "grid", placeItems: "center", padding: "0", border: "2px solid #2B1E18", borderRadius: "10px",
              background: t.open ? (t.t === 'tangga' ? "#F2B63C" : "#E8D5B5") : "radial-gradient(circle at 30% 30%, #A97A4A, #7A5232)", boxShadow: t.open ? "inset 0 2px 0 rgba(0,0,0,.15)" : "var(--lift3)", cursor: t.open ? "default" : "pointer" }}>
              {t.open && (t.t === 'peti' && t.item
                ? <ItemArt id={t.item} size={30} plain />
                : <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1px" }}>
                    <span style={{ font: `22px/1 ${ICON}`, color: L.color }}>{L.icon}</span>
                    {(t.label || L.label) && <span style={{ font: "800 9.5px/1 'Bricolage Grotesque'", color: "#2B1E18" }}>{t.label || L.label}</span>}
                  </span>)}
            </button>
          );
        })}
      </div>
      <button onClick={m.descend} disabled={!m.stairs} className={m.stairs ? 'dc-press' : undefined} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", width: "100%", height: "48px", marginTop: "14px", border: "3px solid #2B1E18", borderRadius: "16px", background: m.stairs ? "#F2B63C" : "#EADBC5", color: "#2B1E18", boxShadow: m.stairs ? "var(--lift4)" : "none", font: "18px/1 var(--display)", cursor: m.stairs ? "pointer" : "default", '--press-tf': "translateY(3px)", '--press-sh': "0 1px 0 #2B1E18" }}>
        <span style={{ font: `20px/1 ${ICON}` }}>stairs</span>{m.stairs ? `Turun ke lantai ${m.floor + 1}` : 'Cari tangga dulu'}
      </button>
      <div style={{ font: "500 11.5px/1.4 'Bricolage Grotesque'", color: "#5B4A40", textAlign: "center", marginTop: "8px" }}>Kapak diisi ulang jadi {m.maxPicks} setiap hari.</div>
    </div>
  );
}
