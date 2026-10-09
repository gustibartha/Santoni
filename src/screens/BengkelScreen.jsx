import ItemArt from '../characters/ItemArt.jsx';

const ICON = "'Material Symbols Rounded'";

// Gear workshop: level up equipped items, merge triplicates into stars, dismantle spares.
export default function BengkelScreen({ v }) {
  return (
    <div style={{ position: "absolute", top: "66px", left: "0", right: "0", bottom: "84px", overflowY: "auto", scrollbarWidth: "none", padding: "6px 14px 20px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div style={{ font: "28px/1 var(--display)" }}>Bengkel</div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", height: "28px", padding: "0 10px 0 6px", borderRadius: "10px", background: "#3A3550", color: "#FFF8EC", font: "800 12.5px/1 'Bricolage Grotesque'" }}><span style={{ font: `16px/1 ${ICON}`, color: "#9EC3F0" }}>hardware</span>{v.asah} Batu Asah</span>
      </div>
      <div style={{ font: "500 12.5px/1.4 'Bricolage Grotesque'", color: "#5B4A40", marginTop: "5px" }}>Tingkatkan perlengkapan yang dipakai dengan Batu Asah dan koin. Batu Asah didapat dari Serbu Kuil Kerupuk, Tambang Kerupuk, dan membongkar item.</div>

      <div style={{ display: "flex", flexDirection: "column", gap: "9px", marginTop: "12px" }}>
        {v.workshop.map(w => (
          <div key={w.id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 10px", border: "2.5px solid #2B1E18", borderRadius: "16px", background: "#FFF8EC", boxShadow: "var(--lift3)" }}>
            <div style={{ position: "relative", width: "50px", height: "50px", flex: "none", boxSizing: "border-box", display: "grid", placeItems: "center", border: "2px solid #2B1E18", borderRadius: "13px", background: w.rarBg }}>
              <ItemArt id={w.id} size={40} />
              {w.star > 0 && <span style={{ position: "absolute", bottom: "-7px", left: "50%", transform: "translateX(-50%)", padding: "1px 5px", borderRadius: "6px", background: "#2B1E18", color: "#F2B63C", font: "800 9.5px/1.2 'Bricolage Grotesque'", whiteSpace: "nowrap" }}>{'★'.repeat(w.star)}</span>}
            </div>
            <div style={{ flex: "1", minWidth: "0" }}>
              <div style={{ font: "500 9.5px/1 'DM Mono',monospace", color: w.rarFg }}>{w.type} · LV {w.lv}</div>
              <div style={{ font: "800 13.5px/1.2 'Bricolage Grotesque'", marginTop: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{w.name}</div>
              <div style={{ font: "700 12px/1.2 'Bricolage Grotesque'", color: "#5B4A40", marginTop: "2px" }}>{w.stat} {w.val}{!w.max && <span style={{ color: "#2F7A5C" }}> → {w.next}</span>}</div>
            </div>
            <button onClick={w.upgrade} disabled={w.max} style={{ flex: "none", width: "78px", padding: "5px 0", border: "2px solid #2B1E18", borderRadius: "11px", background: w.max ? "#EADBC5" : w.afford ? "#F2B63C" : "#FFF8EC", color: "#2B1E18", font: "800 11.5px/1.25 'Bricolage Grotesque'", cursor: w.max ? "default" : "pointer" }}>
              {w.max ? 'Maksimal' : <>Tingkatkan<br /><span style={{ font: "600 10px/1.2 'Bricolage Grotesque'" }}>{w.cost.asah} asah · {w.cost.coins.toLocaleString('id-ID')}</span></>}
            </button>
          </div>
        ))}
      </div>

      <div style={{ font: "20px/1 var(--display)", marginTop: "20px" }}>Gabung</div>
      <div style={{ font: "500 12px/1.4 'Bricolage Grotesque'", color: "#5B4A40", marginTop: "4px" }}>Tiga item yang sama (termasuk yang dipakai) jadi satu dengan +1 bintang: statnya naik 30%.</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "10px" }}>
        {v.mergeable.length === 0 && <div style={{ padding: "12px", borderRadius: "14px", border: "2px dashed #2B1E18", font: "600 12.5px/1.4 'Bricolage Grotesque'", color: "#5B4A40", textAlign: "center" }}>Belum ada yang kembar tiga. Buka peti atau serbu Gudang Kelinci.</div>}
        {v.mergeable.map(mg => (
          <div key={mg.id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 10px", border: "2.5px solid #2B1E18", borderRadius: "14px", background: "#FFF8EC" }}>
            <ItemArt id={mg.id} size={34} plain />
            <div style={{ flex: "1", font: "800 13px/1.2 'Bricolage Grotesque'" }}>{mg.name}<div style={{ font: "600 11px/1.2 'Bricolage Grotesque'", color: "#5B4A40" }}>{mg.copies} salinan · bintang {mg.star} → {mg.star + 1}</div></div>
            <button onClick={mg.merge} style={{ height: "32px", padding: "0 12px", border: "2px solid #2B1E18", borderRadius: "11px", background: "#C9A8F0", color: "#2B1E18", font: "800 12px/1 'Bricolage Grotesque'", cursor: "pointer" }}>Gabung</button>
          </div>
        ))}
      </div>

      <div style={{ font: "20px/1 var(--display)", marginTop: "20px" }}>Bongkar</div>
      <div style={{ font: "500 12px/1.4 'Bricolage Grotesque'", color: "#5B4A40", marginTop: "4px" }}>Ubah item di tas (bukan yang dipakai) menjadi Batu Asah.</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "10px" }}>
        {v.dismantle.map(dm => (
          <button key={dm.rar} onClick={dm.go} disabled={!dm.count} style={{ padding: "9px 6px", border: "2.5px solid #2B1E18", borderRadius: "14px", background: dm.count ? "#FFF8EC" : "#EADBC5", boxShadow: dm.count ? "var(--lift3)" : "none", color: "#2B1E18", font: "800 12.5px/1.3 'Bricolage Grotesque'", cursor: dm.count ? "pointer" : "default" }}>
            Bongkar {dm.count} {dm.rar}<br /><span style={{ font: "600 11px/1.2 'Bricolage Grotesque'", color: "#5B4A40" }}>+{dm.count * dm.each} Batu Asah</span>
          </button>
        ))}
      </div>
    </div>
  );
}
