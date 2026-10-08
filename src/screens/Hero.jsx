import Santoni from '../characters/Santoni.jsx';
import ItemArt from '../characters/ItemArt.jsx';

export default function Hero({ v }) {
  return (
    <div style={{ position: "absolute", top: "66px", left: "0", right: "0", bottom: "84px", display: "flex", flexDirection: "column", gap: "12px", padding: "6px 14px 12px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "10px" }}>
        <div>
          <div style={{ font: "28px/1 'Bagel Fat One',system-ui" }}>Santoni</div>
          <div style={{ font: "600 12px/1.3 'Bricolage Grotesque'", color: "#5E4A3F", marginTop: "4px" }}>Panda merah · tidak ambisius</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", height: "36px", padding: "0 12px 0 9px", borderRadius: "18px", background: "#2B1E18", color: "#FFF8EC" }}>
          <span style={{ font: "19px/1 'Material Symbols Rounded'", color: "#F2B63C" }}>military_tech</span>
          <span style={{ font: "18px/1 'Bagel Fat One',system-ui" }}>{v.power}</span>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "74px minmax(0,1fr) 74px", gap: "10px", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {v.slotsL.map((q, i) => (
              <div key={q.key ?? q.id ?? i} onClick={q.tap} style={{ position: "relative", height: "74px", boxSizing: "border-box", display: "grid", placeItems: "center", border: "2.5px solid #2B1E18", borderRadius: "18px", background: q.bg, boxShadow: "0 3px 0 #2B1E18", cursor: "pointer" }}>
                {q.item ? <div style={{ marginTop: "6px" }}><ItemArt id={q.item} size={44} /></div> : <span style={{ font: "34px/1 'Material Symbols Rounded'", color: q.fg }}>{q.icon}</span>}
                <span style={{ position: "absolute", left: "6px", top: "5px", font: "500 9px/1 'DM Mono',monospace", letterSpacing: ".04em", color: q.fg }}>{q.type}</span>
                <span style={{ position: "absolute", bottom: "-8px", left: "50%", transform: "translateX(-50%)", padding: "2px 6px", borderRadius: "7px", background: "#2B1E18", color: "#FFF8EC", font: "700 10px/1.2 'Bricolage Grotesque'", whiteSpace: "nowrap" }}>Lv {q.lvl}</span>
              </div>
          ))}
        </div>
        <div style={{ position: "relative", height: "258px", border: "2.5px solid #2B1E18", borderRadius: "24px", overflow: "hidden", backgroundColor: "#F3B49A", backgroundImage: "radial-gradient(rgba(43,30,24,.13) 1.2px,transparent 1.5px)", backgroundSize: "10px 10px", boxShadow: "0 3px 0 #2B1E18" }}>
          <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", height: "54px", background: "#E8A584", borderTop: "2.5px solid #2B1E18" }} />
          <div onClick={v.cyclePose} style={{ position: "absolute", left: "2px", right: "2px", top: "30px", bottom: "12px", cursor: "pointer" }}><Santoni pose={v.heroScreenPose} still={v.still} /></div>
          <div style={{ position: "absolute", top: "9px", left: "0", right: "0", textAlign: "center", font: "500 10px/1 'DM Mono',monospace", letterSpacing: ".08em", color: "#5B4A40", pointerEvents: "none" }}>KETUK · {v.heroScreenPoseLabel}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {v.slotsR.map((q, i) => (
              <div key={q.key ?? q.id ?? i} onClick={q.tap} style={{ position: "relative", height: "74px", boxSizing: "border-box", display: "grid", placeItems: "center", border: "2.5px solid #2B1E18", borderRadius: "18px", background: q.bg, boxShadow: "0 3px 0 #2B1E18", cursor: "pointer" }}>
                {q.item ? <div style={{ marginTop: "6px" }}><ItemArt id={q.item} size={44} /></div> : <span style={{ font: "34px/1 'Material Symbols Rounded'", color: q.fg }}>{q.icon}</span>}
                <span style={{ position: "absolute", left: "6px", top: "5px", font: "500 9px/1 'DM Mono',monospace", letterSpacing: ".04em", color: q.fg }}>{q.type}</span>
                <span style={{ position: "absolute", bottom: "-8px", left: "50%", transform: "translateX(-50%)", padding: "2px 6px", borderRadius: "7px", background: "#2B1E18", color: "#FFF8EC", font: "700 10px/1.2 'Bricolage Grotesque'", whiteSpace: "nowrap" }}>Lv {q.lvl}</span>
              </div>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "2px", marginTop: "4px", border: "2.5px solid #2B1E18", borderRadius: "16px", background: "#2B1E18", boxShadow: "0 3px 0 #2B1E18", overflow: "hidden" }}>
        {v.heroStats.map((st, i) => (
            <div key={st.key ?? st.id ?? i} style={{ padding: "8px 4px 9px", background: "#FFF8EC", textAlign: "center" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "3px", font: "500 10.5px/1 'DM Mono',monospace", letterSpacing: ".06em", color: "#5E4A3F" }}>
                <span style={{ font: "13px/1 'Material Symbols Rounded'" }}>{st.icon}</span>
                {st.label}
              </div>
              <div style={{ font: "18px/1 'Bagel Fat One',system-ui", marginTop: "6px" }}>{st.value}</div>
            </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "7px 10px", border: "2.5px solid #2B1E18", borderRadius: "16px", background: "#2B1E18", color: "#FFF8EC", boxShadow: "0 3px 0 #120C09" }}>
        <div style={{ width: "34px", height: "34px", flex: "none", display: "grid", placeItems: "center" }}>
          {v.heroUlt.weapon !== 'none' && <ItemArt id={v.heroUlt.weapon} size={32} still={v.still} />}
        </div>
        <div style={{ minWidth: "0" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span style={{ font: "500 9.5px/1 'DM Mono',monospace", letterSpacing: ".07em", color: "#F2B63C" }}>PAMUNGKAS</span>
            <span style={{ font: "15px/1 'Bagel Fat One',system-ui" }}>{v.heroUlt.name}</span>
          </div>
          <div style={{ font: "500 10.5px/1.3 'Bricolage Grotesque'", color: "#E8DCCB", marginTop: "3px" }}>{v.heroUlt.desc}</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        <button onClick={v.autoEquip} className="dc-press" style={{ height: "46px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "0", border: "2.5px solid #2B1E18", borderRadius: "15px", background: "#F2B63C", boxShadow: "0 4px 0 #2B1E18", color: "#2B1E18", font: "800 14px/1 'Bricolage Grotesque'", cursor: "pointer", '--press-tf': "translateY(3px)", '--press-sh': "0 1px 0 #2B1E18" }}>
          <span style={{ font: "19px/1 'Material Symbols Rounded'" }}>auto_fix_high</span>
          Pasang terbaik
        </button>
        <button onClick={v.mergeItems} className="dc-press" style={{ height: "46px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "0", border: "2.5px solid #2B1E18", borderRadius: "15px", background: "#FFF8EC", boxShadow: "0 4px 0 #2B1E18", color: "#2B1E18", font: "800 14px/1 'Bricolage Grotesque'", cursor: "pointer", '--press-tf': "translateY(3px)", '--press-sh': "0 1px 0 #2B1E18" }}>
          <span style={{ font: "19px/1 'Material Symbols Rounded'" }}>merge_type</span>
          Gabung item
        </button>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "8px" }}>
        <span style={{ font: "18px/1 'Bagel Fat One',system-ui" }}>Tas</span>
        <span style={{ font: "500 10.5px/1 'DM Mono',monospace", letterSpacing: ".06em", color: "#5E4A3F" }}>{v.bagCount}/60 · KETUK UNTUK PASANG</span>
      </div>
      <div style={{ flex: "1", minHeight: "0", overflowY: "auto", margin: "-4px -6px 0", padding: "4px 6px 8px", scrollbarWidth: "none" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,minmax(0,1fr))", gap: "9px" }}>
          {v.bag.map((it, i) => (
              <div key={it.key ?? it.id ?? i} onClick={it.equip} className="dc-press" style={{ position: "relative", aspectRatio: "1", boxSizing: "border-box", display: "grid", placeItems: "center", border: "2.5px solid #2B1E18", borderRadius: "14px", background: it.bg, boxShadow: "0 3px 0 #2B1E18", cursor: "pointer", '--press-tf': "translateY(2px)", '--press-sh': "0 1px 0 #2B1E18" }}>
                <ItemArt id={it.item} size={38} />
                <span style={{ position: "absolute", right: "5px", bottom: "4px", font: "500 10px/1 'DM Mono',monospace", color: it.fg }}>{it.lvl}</span>
                {it.better && (
                  <span style={{ position: "absolute", top: "-6px", right: "-6px", width: "19px", height: "19px", boxSizing: "border-box", display: "grid", placeItems: "center", borderRadius: "50%", border: "2px solid #2B1E18", background: "#4FAE72", color: "#FFF8EC", font: "13px/1 'Material Symbols Rounded'" }}>arrow_upward</span>
                )}
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}
