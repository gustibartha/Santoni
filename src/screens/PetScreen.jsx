import PetArt from '../characters/PetArt.jsx';

const ICON = "'Material Symbols Rounded'";

// Pets: hatch eggs, feed with Pakan, pick one to follow Santoni.
export default function PetScreen({ v }) {
  const active = v.pets.find(p => p.active);
  return (
    <div style={{ position: "absolute", top: "66px", left: "0", right: "0", bottom: "84px", overflowY: "auto", scrollbarWidth: "none", padding: "6px 14px 20px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div style={{ font: "28px/1 'Bagel Fat One',system-ui" }}>Pet</div>
        <button onClick={v.backToHero} style={{ display: "flex", alignItems: "center", gap: "3px", border: "0", background: "transparent", font: "800 12.5px/1 'Bricolage Grotesque'", color: "#A93D1C", cursor: "pointer" }}><span style={{ font: `16px/1 ${ICON}` }}>arrow_back</span>Hero</button>
      </div>

      <div style={{ position: "relative", marginTop: "10px", height: "150px", border: "3px solid #2B1E18", borderRadius: "22px", overflow: "hidden", background: "#CFE6B8", boxShadow: "0 4px 0 #2B1E18" }}>
        <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", height: "40px", background: "#A8D49A", borderTop: "2.5px solid #2B1E18" }} />
        <div style={{ position: "absolute", left: "50%", bottom: "14px", marginLeft: "-55px", animation: v.hatched ? "hatchPop .6s ease-out" : "none" }} key={v.hatched ? v.hatched.at : 'pet'}>
          {active ? <PetArt id={active.id} size={110} /> : <span style={{ display: "grid", placeItems: "center", width: "110px", height: "110px", font: `64px/1 ${ICON}`, color: "#8FB55A" }}>egg</span>}
        </div>
        <div style={{ position: "absolute", top: "9px", left: "11px", font: "500 10px/1.3 'DM Mono',monospace", color: "#2F5A2A" }}>{active ? `PET AKTIF · ${active.name.toUpperCase()}` : 'BELUM ADA PET AKTIF'}</div>
        {active && <div style={{ position: "absolute", top: "26px", left: "11px", font: "800 12px/1.2 'Bricolage Grotesque'", color: "#2B1E18" }}>Lv {active.lv} · {active.statLabel}</div>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "12px" }}>
        <button onClick={v.hatch} className="dc-press" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", height: "48px", border: "2.5px solid #2B1E18", borderRadius: "15px", background: "#F2B63C", boxShadow: "0 4px 0 #2B1E18", color: "#2B1E18", font: "800 13.5px/1 'Bricolage Grotesque'", cursor: "pointer", '--press-tf': "translateY(3px)", '--press-sh': "0 1px 0 #2B1E18" }}>
          <span style={{ font: `20px/1 ${ICON}` }}>egg</span>Tetaskan ({v.telur})
        </button>
        <button onClick={v.buyEgg} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", height: "48px", border: "2.5px solid #2B1E18", borderRadius: "15px", background: "#FFF8EC", boxShadow: "0 4px 0 #2B1E18", color: "#2B1E18", font: "800 13px/1 'Bricolage Grotesque'", cursor: "pointer" }}>
          Beli telur <span style={{ font: `15px/1 ${ICON}`, color: "#7E43B5" }}>diamond</span>{v.eggPrice}
        </button>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", marginTop: "8px", font: "700 12px/1.3 'Bricolage Grotesque'", color: "#5B4A40" }}>
        <span style={{ font: `16px/1 ${ICON}`, color: "#5E6E52" }}>nutrition</span>{v.pakan} pakan · didapat dari Serbu Kebun Telur dan Tambang Kerupuk
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "9px", marginTop: "14px" }}>
        {v.pets.map(p => (
          <div key={p.id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 10px", border: "2.5px solid #2B1E18", borderRadius: "17px", background: p.active ? "#FFF3D6" : "#FFF8EC", boxShadow: "0 3px 0 #2B1E18", opacity: p.owned ? 1 : 0.55 }}>
            <div style={{ width: "56px", height: "56px", flex: "none", boxSizing: "border-box", display: "grid", placeItems: "center", border: "2px solid #2B1E18", borderRadius: "14px", background: p.rarBg, filter: p.owned ? "none" : "grayscale(1)" }}><PetArt id={p.id} size={46} still={!p.owned} /></div>
            <div style={{ flex: "1", minWidth: "0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ padding: "2px 6px", borderRadius: "6px", background: p.rarFg, color: "#FFF8EC", font: "500 9px/1.2 'DM Mono',monospace" }}>{p.rar.toUpperCase()}</span>
                {p.owned && <span style={{ font: "800 11px/1 'Bricolage Grotesque'", color: "#B0620A" }}>{'★'.repeat(p.star)}</span>}
              </div>
              <div style={{ font: "800 13.5px/1.2 'Bricolage Grotesque'", marginTop: "3px" }}>{p.name}</div>
              <div style={{ font: "600 11px/1.3 'Bricolage Grotesque'", color: "#5B4A40" }}>{p.owned ? `Lv ${p.lv} · ${p.statLabel}` : p.desc}</div>
              {p.owned && <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "4px" }}><div style={{ flex: "1", height: "6px", borderRadius: "3px", background: "#EADBC5", overflow: "hidden" }}><div style={{ height: "100%", width: p.xpPct, background: "#8FB55A" }} /></div><span style={{ font: "500 9px/1 'DM Mono',monospace", color: "#5E4A3F" }}>{p.xpLabel}</span></div>}
            </div>
            {p.owned && (
              <div style={{ display: "flex", flexDirection: "column", gap: "5px", flex: "none" }}>
                <button onClick={p.activate} style={{ width: "70px", height: "28px", border: "2px solid #2B1E18", borderRadius: "9px", background: p.active ? "#EADBC5" : "#4FAE72", color: p.active ? "#2B1E18" : "#FFF8EC", font: "800 11px/1 'Bricolage Grotesque'", cursor: "pointer" }}>{p.active ? 'Istirahat' : 'Bawa'}</button>
                <button onClick={p.feed5} style={{ width: "70px", height: "28px", border: "2px solid #2B1E18", borderRadius: "9px", background: "#F2B63C", color: "#2B1E18", font: "800 11px/1 'Bricolage Grotesque'", cursor: "pointer" }}>Makan ×5</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
