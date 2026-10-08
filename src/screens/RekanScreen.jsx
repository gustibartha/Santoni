import Musuh from '../characters/Musuh.jsx';

const ICON = "'Material Symbols Rounded'";

function Portrait({ kind, size, dim }) {
  return (
    <div style={{ position: "relative", width: size, height: size, flex: "none", boxSizing: "border-box", border: "2px solid #2B1E18", borderRadius: "14px", background: "#F3E6D3", overflow: "hidden", filter: dim ? "grayscale(1) brightness(.85)" : "none" }}>
      <div style={{ position: "absolute", inset: "3px 3px 0" }}><Musuh kind={kind} still /></div>
    </div>
  );
}

// Companions: a 3-slot team whose blessings work in battle, a roster, and recruiting.
export default function RekanScreen({ v }) {
  return (
    <div style={{ position: "absolute", top: "66px", left: "0", right: "0", bottom: "84px", overflowY: "auto", scrollbarWidth: "none", padding: "6px 14px 20px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div style={{ font: "28px/1 'Bagel Fat One',system-ui" }}>Rekan Petualang</div>
        <button onClick={v.backToHero} style={{ display: "flex", alignItems: "center", gap: "3px", border: "0", background: "transparent", font: "800 12.5px/1 'Bricolage Grotesque'", color: "#A93D1C", cursor: "pointer" }}><span style={{ font: `16px/1 ${ICON}` }}>arrow_back</span>Hero</button>
      </div>
      <div style={{ font: "500 12.5px/1.4 'Bricolage Grotesque'", color: "#5B4A40", marginTop: "5px" }}>Mantan musuh yang kini ikut berpetualang. Tiga rekan di tim memberi bonus stat dan Berkah Sinergi di setiap battle. Rekan pertama ikut membantu menyerang.</div>

      <div style={{ marginTop: "12px", padding: "11px", border: "3px solid #2B1E18", borderRadius: "20px", background: "#B0405A", color: "#FFF8EC", boxShadow: "0 4px 0 #2B1E18" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ font: "18px/1 'Bagel Fat One',system-ui" }}>Berkah Sinergi</span>
          <span style={{ font: "500 10px/1 'DM Mono',monospace", color: "#FFE9A8" }}>{v.teamBonus}</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px", marginTop: "9px" }}>
          {v.team.map(t => (
            <button key={t.slot} onClick={t.tap} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", padding: "7px 4px", border: "2px solid #2B1E18", borderRadius: "14px", background: t.id ? "#FFF8EC" : "rgba(255,248,236,.25)", color: "#2B1E18", cursor: "pointer" }}>
              {t.id ? <Portrait kind={t.kind} size="54px" /> : <span style={{ width: "54px", height: "54px", display: "grid", placeItems: "center", font: `28px/1 ${ICON}`, color: "#FFF8EC" }}>add</span>}
              <span style={{ font: "800 10.5px/1.15 'Bricolage Grotesque'", textAlign: "center", color: t.id ? "#2B1E18" : "#FFF8EC" }}>{t.id ? t.bless : `Slot ${t.slot + 1}`}</span>
              {t.slot === 0 && <span style={{ font: "500 8.5px/1 'DM Mono',monospace", color: t.id ? "#A93D1C" : "#FFE9A8" }}>PEMIMPIN</span>}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "10px", marginTop: "14px" }}>
        <button onClick={v.recruit1} className="dc-press" style={{ height: "52px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px", border: "2.5px solid #2B1E18", borderRadius: "15px", background: "#FFF8EC", boxShadow: "0 4px 0 #2B1E18", color: "#2B1E18", cursor: "pointer", '--press-tf': "translateY(3px)", '--press-sh': "0 1px 0 #2B1E18" }}>
          <span style={{ font: "16px/1 'Bagel Fat One',system-ui" }}>Rekrut 1×</span>
          <span style={{ display: "flex", alignItems: "center", gap: "3px", font: "800 11.5px/1 'Bricolage Grotesque'" }}><span style={{ font: `14px/1 ${ICON}`, color: "#7E43B5" }}>diamond</span>{v.recruitCost.one}</span>
        </button>
        <button onClick={v.recruit10} className="dc-press" style={{ height: "52px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px", border: "2.5px solid #2B1E18", borderRadius: "15px", background: "#F2B63C", boxShadow: "0 4px 0 #2B1E18", color: "#2B1E18", cursor: "pointer", '--press-tf': "translateY(3px)", '--press-sh': "0 1px 0 #2B1E18" }}>
          <span style={{ font: "16px/1 'Bagel Fat One',system-ui" }}>Rekrut 10×</span>
          <span style={{ display: "flex", alignItems: "center", gap: "3px", font: "800 11.5px/1 'Bricolage Grotesque'" }}><span style={{ font: `14px/1 ${ICON}`, color: "#7E43B5" }}>diamond</span>{v.recruitCost.ten}</span>
        </button>
      </div>
      <div style={{ font: "500 11.5px/1.4 'Bricolage Grotesque'", color: "#5B4A40", textAlign: "center", marginTop: "6px" }}>Rekrut memberi Kartu Rekan. 10 kartu membuka rekan, kartu berikutnya menaikkan bintang.</div>

      <div style={{ display: "flex", flexDirection: "column", gap: "9px", marginTop: "14px" }}>
        {v.companions.map(c => (
          <div key={c.id} style={{ border: "2.5px solid #2B1E18", borderRadius: "17px", background: c.inTeam ? "#FFF3D6" : "#FFF8EC", boxShadow: "0 3px 0 #2B1E18", overflow: "hidden" }}>
            <div onClick={c.select} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 10px", cursor: "pointer" }}>
              <Portrait kind={c.kind} size="50px" dim={!c.unlocked} />
              <div style={{ flex: "1", minWidth: "0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <span style={{ padding: "2px 6px", borderRadius: "6px", background: c.rarFg, color: "#FFF8EC", font: "500 9px/1.2 'DM Mono',monospace" }}>{c.rar.toUpperCase()}</span>
                  {c.unlocked && <span style={{ font: "800 11px/1 'Bricolage Grotesque'", color: "#B0620A" }}>{'★'.repeat(c.star)}{'☆'.repeat(5 - c.star)}</span>}
                  {c.inTeam && <span style={{ font: "500 9px/1 'DM Mono',monospace", color: "#2F7A5C" }}>DI TIM</span>}
                </div>
                <div style={{ font: "800 14px/1.2 'Bricolage Grotesque'", marginTop: "3px" }}>{c.name}</div>
                <div style={{ font: "600 11.5px/1.3 'Bricolage Grotesque'", color: "#5B4A40" }}>{c.unlocked ? `Lv ${c.lv} · ${c.stat} +${c.bonus}% · ${c.blessName}` : `${c.shards}/${c.need} kartu untuk membuka`}</div>
                <div style={{ height: "6px", marginTop: "5px", borderRadius: "3px", background: "#EADBC5", overflow: "hidden" }}><div style={{ height: "100%", width: c.maxStar ? "100%" : c.shardPct, background: c.unlocked ? "#C9A8F0" : "#F2B63C" }} /></div>
              </div>
              <span style={{ font: `20px/1 ${ICON}`, color: "#5E4A3F" }}>{c.open ? 'expand_less' : 'expand_more'}</span>
            </div>
            {c.open && (
              <div style={{ padding: "0 10px 10px" }}>
                <div style={{ padding: "8px 10px", borderRadius: "12px", background: "#EDE6F5", font: "600 12px/1.4 'Bricolage Grotesque'", color: "#3A3550" }}><b>{c.blessName}:</b> {c.blessText}</div>
                {c.unlocked ? (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "6px", marginTop: "8px" }}>
                    <button onClick={c.toggle} style={{ height: "40px", border: "2px solid #2B1E18", borderRadius: "11px", background: c.inTeam ? "#EADBC5" : "#4FAE72", color: c.inTeam ? "#2B1E18" : "#FFF8EC", font: "800 11.5px/1.15 'Bricolage Grotesque'", cursor: "pointer" }}>{c.inTeam ? 'Keluarkan' : 'Masuk tim'}</button>
                    <button onClick={c.level} style={{ height: "40px", border: "2px solid #2B1E18", borderRadius: "11px", background: "#F2B63C", color: "#2B1E18", font: "800 11.5px/1.15 'Bricolage Grotesque'", cursor: "pointer" }}>Latih<br /><span style={{ font: "600 10px/1 'Bricolage Grotesque'" }}>{c.levelCost} koin</span></button>
                    <button onClick={c.starUp} disabled={!c.canStar} style={{ height: "40px", border: "2px solid #2B1E18", borderRadius: "11px", background: c.canStar ? "#C9A8F0" : "#EADBC5", color: "#2B1E18", font: "800 11.5px/1.15 'Bricolage Grotesque'", cursor: c.canStar ? "pointer" : "default" }}>{c.maxStar ? 'Bintang penuh' : <>Bintang<br /><span style={{ font: "600 10px/1 'Bricolage Grotesque'" }}>{c.shards}/{c.need} kartu</span></>}</button>
                  </div>
                ) : <div style={{ font: "600 11.5px/1.4 'Bricolage Grotesque'", color: "#5B4A40", marginTop: "8px", textAlign: "center" }}>Belum bergabung. Kumpulkan {c.need} kartu lewat Rekrut.</div>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
