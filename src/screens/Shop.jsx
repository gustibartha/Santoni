import ShopBanner from '../components/ShopBanner.jsx';

export default function Shop({ v }) {
  return (
    <div style={{ position: "absolute", top: "66px", left: "0", right: "0", bottom: "84px", overflowY: "auto", padding: "6px 14px 20px", scrollbarWidth: "none" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "8px" }}>
        <div style={{ font: "28px/1 'Bagel Fat One',system-ui" }}>Toko</div>
        <div style={{ font: "500 10px/1 'DM Mono',monospace", letterSpacing: ".08em", color: "#5E4A3F" }}>PERMATA DAN PENYESALAN</div>
      </div>
      <div style={{ marginTop: "12px", border: "3px solid #2B1E18", borderRadius: "24px", background: "#FFF8EC", boxShadow: "0 5px 0 #2B1E18", overflow: "hidden" }}>
        <div style={{ position: "relative", height: "166px", borderBottom: "2.5px solid #2B1E18", backgroundColor: "#2B1E18", backgroundImage: "radial-gradient(rgba(255,248,236,.1) 1.2px,transparent 1.5px)", backgroundSize: "10px 10px", color: "#FFF8EC" }}>
          <ShopBanner still={v.still} />
          <div style={{ position: "absolute", left: "14px", bottom: "12px", pointerEvents: "none" }}>
            <div style={{ font: "500 10.5px/1 'DM Mono',monospace", letterSpacing: ".07em", color: "#F2B63C" }}>UNDIAN EQUIPMENT</div>
            <div style={{ font: "25px/1.05 'Bagel Fat One',system-ui", marginTop: "5px", textShadow: "2px 0 0 #2B1E18,-2px 0 0 #2B1E18,0 2px 0 #2B1E18,0 -2px 0 #2B1E18,1.5px 1.5px 0 #2B1E18,-1.5px 1.5px 0 #2B1E18,1.5px -1.5px 0 #2B1E18,-1.5px -1.5px 0 #2B1E18,0 3px 0 #2B1E18" }}>Peti Kayu Misterius</div>
          </div>
          <div style={{ position: "absolute", top: "12px", right: "12px", padding: "6px 9px", borderRadius: "10px", border: "2px solid #2B1E18", background: "#F2B63C", color: "#2B1E18", font: "800 11px/1.2 'Bricolage Grotesque'", textAlign: "right", pointerEvents: "none" }}>
            Epik dijamin dalam {v.pityLeft}×
            <div style={{ marginTop: "3px", paddingTop: "3px", borderTop: "1.5px dashed rgba(43,30,24,.4)", color: "#8A4A06" }}>Legenda dalam {v.legendLeft}×</div>
          </div>
        </div>
        <div style={{ padding: "12px 14px 14px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "6px" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", padding: "6px 2px", borderRadius: "10px", background: "#E1E7D6" }}>
              <span style={{ font: "500 9.5px/1 'DM Mono',monospace", letterSpacing: ".06em", color: "#5E6E52" }}>BIASA</span>
              <span style={{ font: "800 13px/1 'Bricolage Grotesque'" }}>52%</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", padding: "6px 2px", borderRadius: "10px", background: "#D5E3F6" }}>
              <span style={{ font: "500 9.5px/1 'DM Mono',monospace", letterSpacing: ".06em", color: "#3166B0" }}>LANGKA</span>
              <span style={{ font: "800 13px/1 'Bricolage Grotesque'" }}>30%</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", padding: "6px 2px", borderRadius: "10px", background: "#E7D9F5" }}>
              <span style={{ font: "500 9.5px/1 'DM Mono',monospace", letterSpacing: ".06em", color: "#7E43B5" }}>EPIK</span>
              <span style={{ font: "800 13px/1 'Bricolage Grotesque'" }}>14%</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", padding: "6px 2px", borderRadius: "10px", background: "#FBE3B8" }}>
              <span style={{ font: "500 9.5px/1 'DM Mono',monospace", letterSpacing: ".06em", color: "#B0620A" }}>LEGENDA</span>
              <span style={{ font: "800 13px/1 'Bricolage Grotesque'" }}>4%</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "10px", marginTop: "12px" }}>
            <button onClick={v.pull1} className="dc-press" style={{ height: "60px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "5px", padding: "0", border: "2.5px solid #2B1E18", borderRadius: "16px", background: "#FFF8EC", boxShadow: "0 4px 0 #2B1E18", color: "#2B1E18", cursor: "pointer", '--press-tf': "translateY(3px)", '--press-sh': "0 1px 0 #2B1E18" }}>
              <span style={{ font: "18px/1 'Bagel Fat One',system-ui" }}>Buka 1×</span>
              <span style={{ display: "flex", alignItems: "center", gap: "3px", font: "800 12px/1 'Bricolage Grotesque'" }}>
                <span style={{ font: "14px/1 'Material Symbols Rounded'", color: "#7E43B5" }}>diamond</span>
                {v.pullCost1}
              </span>
            </button>
            <button onClick={v.pull10} className="dc-press" style={{ position: "relative", height: "60px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "5px", padding: "0", border: "2.5px solid #2B1E18", borderRadius: "16px", background: "#F2B63C", boxShadow: "0 4px 0 #2B1E18", color: "#2B1E18", cursor: "pointer", '--press-tf': "translateY(3px)", '--press-sh': "0 1px 0 #2B1E18" }}>
              <span style={{ font: "18px/1 'Bagel Fat One',system-ui" }}>Buka 10×</span>
              <span style={{ display: "flex", alignItems: "center", gap: "3px", font: "800 12px/1 'Bricolage Grotesque'" }}>
                <span style={{ font: "14px/1 'Material Symbols Rounded'", color: "#7E43B5" }}>diamond</span>
                {v.pullCost10}
              </span>
              <span style={{ position: "absolute", top: "-11px", right: "-6px", padding: "3px 7px", borderRadius: "8px", border: "2px solid #2B1E18", background: "#D2532A", color: "#FFF8EC", font: "800 10px/1 'Bricolage Grotesque'", transform: "rotate(4deg)" }}>Hemat 10%</span>
            </button>
          </div>
          <div style={{ marginTop: "11px", textAlign: "center", font: "500 11.5px/1.3 'Bricolage Grotesque'", color: "#5E4A3F" }}>Tidak ada jaminan kebahagiaan. Hanya peti.</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "8px", marginTop: "20px" }}>
        <span style={{ font: "20px/1 'Bagel Fat One',system-ui" }}>Toko Harian</span>
        <span style={{ display: "flex", alignItems: "center", gap: "4px", font: "500 10px/1 'DM Mono',monospace", letterSpacing: ".06em", color: "#5E4A3F" }}>
          <span style={{ font: "13px/1 'Material Symbols Rounded'" }}>schedule</span>
          GANTI 05:42:10
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "10px", marginTop: "10px" }}>
        {v.offers.map((of, i) => (
            <div key={of.key ?? of.id ?? i} style={{ display: "flex", flexDirection: "column", border: "2.5px solid #2B1E18", borderRadius: "18px", background: "#FFF8EC", boxShadow: "0 3px 0 #2B1E18", overflow: "hidden", opacity: of.opacity }}>
              <div style={{ height: "70px", display: "grid", placeItems: "center", background: of.bg, borderBottom: "2px solid #2B1E18" }}><span style={{ font: "34px/1 'Material Symbols Rounded'", color: of.fg }}>{of.icon}</span></div>
              <div style={{ display: "flex", flexDirection: "column", gap: "7px", padding: "7px 7px 8px" }}>
                <div style={{ minHeight: "29px", display: "grid", placeItems: "center", textAlign: "center", font: "800 11.5px/1.2 'Bricolage Grotesque'" }}>{of.name}</div>
                <button onClick={of.buy} disabled={of.sold} style={{ height: "30px", display: "flex", alignItems: "center", justifyContent: "center", gap: "3px", padding: "0", border: "2px solid #2B1E18", borderRadius: "10px", background: of.btnBg, color: "#2B1E18", font: "800 12px/1 'Bricolage Grotesque'", cursor: "pointer" }}>
                  <span style={{ font: "14px/1 'Material Symbols Rounded'" }}>{of.curIcon}</span>
                  {of.price}
                </button>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}
