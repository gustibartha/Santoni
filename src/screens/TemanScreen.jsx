import Musuh from '../characters/Musuh.jsx';
import Santoni from '../characters/Santoni.jsx';

const ICON = "'Material Symbols Rounded'";

function Face({ kind, size }) {
  return (
    <div style={{ position: "relative", width: size, height: size, flex: "none", boxSizing: "border-box", border: "2px solid #2B1E18", borderRadius: "12px", background: kind === 'santoni' ? "#F7D9BF" : "#FFF8EC", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: kind === 'santoni' ? "-2px -8px -10px -6px" : "2px 2px 0" }}>{kind === 'santoni' ? <Santoni pose="idle" still /> : <Musuh kind={kind} still />}</div>
    </div>
  );
}

// Friends to greet daily, a tower leaderboard against rivals, and sharing your record.
export default function TemanScreen({ v }) {
  return (
    <div style={{ position: "absolute", top: "66px", left: "0", right: "0", bottom: "84px", overflowY: "auto", scrollbarWidth: "none", padding: "6px 14px 20px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "8px" }}>
        <div style={{ font: "28px/1 var(--display)" }}>Teman</div>
        <div style={{ font: "500 10.5px/1 'DM Mono',monospace", letterSpacing: ".06em", color: "#5E4A3F" }}>{v.friendGifts > 0 ? `${v.friendGifts} BELUM DISAPA` : 'SEMUA SUDAH DISAPA'}</div>
      </div>
      <div style={{ font: "500 13px/1.4 'Bricolage Grotesque'", color: "#5B4A40", marginTop: "6px" }}>Mantan musuh yang memutuskan berteman. Sapa sekali sehari: +1 energi, dan keakraban naik.</div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "12px" }}>
        {v.friends.map(fr => (
          <div key={fr.id} style={{ display: "flex", alignItems: "center", gap: "11px", padding: "10px 11px", border: "2.5px solid #2B1E18", borderRadius: "18px", background: "#FFF8EC", boxShadow: "var(--lift3)" }}>
            <Face kind={fr.kind} size="52px" />
            <div style={{ flex: "1", minWidth: "0" }}>
              <div style={{ font: "800 14px/1.15 'Bricolage Grotesque'" }}>{fr.name}</div>
              <div style={{ font: "500 11.5px/1.3 'Bricolage Grotesque'", color: "#5B4A40", marginTop: "2px" }}>{fr.title} · {fr.home}</div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px" }}>
                <div style={{ flex: "1", height: "8px", boxSizing: "border-box", border: "2px solid #2B1E18", borderRadius: "5px", background: "#EADBC5", overflow: "hidden" }}><div style={{ height: "100%", width: fr.pct, background: "#F08CA8" }} /></div>
                <span style={{ font: "500 9.5px/1 'DM Mono',monospace", color: "#5E4A3F", whiteSpace: "nowrap" }}>{fr.progress}</span>
              </div>
            </div>
            <button onClick={fr.greet} disabled={fr.greeted} style={{ flex: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", width: "62px", padding: "6px 0", border: "2px solid #2B1E18", borderRadius: "12px", background: fr.greeted ? "#EADBC5" : "#F2B63C", color: "#2B1E18", font: "800 11.5px/1 'Bricolage Grotesque'", cursor: fr.greeted ? "default" : "pointer" }}>
              <span style={{ font: `18px/1 ${ICON}` }}>{fr.greeted ? 'check' : 'waving_hand'}</span>{fr.greeted ? 'Besok' : 'Sapa'}
            </button>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: "20px" }}>
        <span style={{ font: "20px/1 var(--display)" }}>Papan Menara</span>
        <span style={{ font: "500 10.5px/1 'DM Mono',monospace", color: "#5E4A3F" }}>LANTAI TERTINGGI</span>
      </div>
      <div style={{ marginTop: "10px", border: "2.5px solid #2B1E18", borderRadius: "18px", background: "#FFF8EC", boxShadow: "var(--lift3)", overflow: "hidden" }}>
        {v.board.map((row, i) => (
          <div key={row.name} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "7px 12px", background: row.me ? "#FFF3D6" : "transparent", borderTop: i ? "1.5px dashed rgba(43,30,24,.15)" : "none" }}>
            <span style={{ width: "22px", font: "18px/1 var(--display)", color: row.rank <= 3 ? "#B0620A" : "#5E4A3F" }}>{row.rank}</span>
            <Face kind={row.kind} size="34px" />
            <span style={{ flex: "1", font: `${row.me ? 800 : 600} 13px/1.2 'Bricolage Grotesque'` }}>{row.name}{row.me && ' (kamu)'}</span>
            <span style={{ font: "800 13px/1 'Bricolage Grotesque'" }}>Lt {row.floor}</span>
          </div>
        ))}
      </div>
      <button onClick={v.shareRecord} className="dc-press" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", width: "100%", height: "46px", marginTop: "14px", border: "2.5px solid #2B1E18", borderRadius: "15px", background: "#3C78C8", boxShadow: "var(--lift4)", color: "#FFF8EC", font: "800 14px/1 'Bricolage Grotesque'", cursor: "pointer", '--press-tf': "translateY(3px)", '--press-sh': "0 1px 0 #2B1E18" }}>
        <span style={{ font: `19px/1 ${ICON}` }}>share</span>Bagikan rekor ke teman
      </button>
    </div>
  );
}
