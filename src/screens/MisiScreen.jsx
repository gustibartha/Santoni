import ItemArt from '../characters/ItemArt.jsx';

const ICON = "'Material Symbols Rounded'";

function QuestCard({ q }) {
  const state = q.claimed ? 'claimed' : q.done ? 'ready' : 'progress';
  return (
    <div style={{ display: "flex", gap: "11px", alignItems: "center", padding: "11px 12px", border: "2.5px solid #2B1E18", borderRadius: "18px", background: state === 'ready' ? "#FFF3D6" : "#FFF8EC", boxShadow: "0 3px 0 #2B1E18", opacity: state === 'claimed' ? 0.6 : 1 }}>
      <div style={{ width: "44px", height: "44px", flex: "none", boxSizing: "border-box", display: "grid", placeItems: "center", border: "2px solid #2B1E18", borderRadius: "13px", background: state === 'progress' ? "#EADBC5" : "#F2B63C", color: "#2B1E18", font: `24px/1 ${ICON}` }}>{q.icon}</div>
      <div style={{ flex: "1", minWidth: "0" }}>
        <div style={{ font: "800 14px/1.15 'Bricolage Grotesque'" }}>{q.title}</div>
        <div style={{ font: "500 11.5px/1.35 'Bricolage Grotesque'", color: "#5B4A40", marginTop: "3px", textWrap: "pretty" }}>{q.desc}</div>
        <div style={{ display: "flex", alignItems: "center", gap: "7px", marginTop: "7px" }}>
          <div style={{ flex: "1", height: "9px", boxSizing: "border-box", border: "2px solid #2B1E18", borderRadius: "5px", background: "#EADBC5", overflow: "hidden" }}>
            <div style={{ height: "100%", width: q.pct, background: q.done ? "#4FAE72" : "#F2B63C", transition: "width .3s" }} />
          </div>
          <span style={{ font: "500 9.5px/1 'DM Mono',monospace", color: "#6E5A4E", whiteSpace: "nowrap" }}>{q.progress}</span>
        </div>
      </div>
      <div style={{ width: "74px", flex: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "3px", font: "800 11px/1.1 'Bricolage Grotesque'", textAlign: "center" }}>
          {q.rewardItem ? <ItemArt id={q.rewardItem} size={22} plain /> : <span style={{ font: `14px/1 ${ICON}`, color: q.rewardIcon === 'diamond' ? "#7E43B5" : q.rewardIcon === 'bolt' ? "#3C78C8" : "#B0620A" }}>{q.rewardIcon}</span>}
          <span>{q.reward}</span>
        </div>
        <button onClick={q.claim} disabled={state !== 'ready'} className={state === 'ready' ? 'dc-press' : undefined}
          style={{ width: "100%", height: "30px", padding: "0", border: "2px solid #2B1E18", borderRadius: "10px", background: state === 'ready' ? "#4FAE72" : "#EADBC5", color: state === 'ready' ? "#FFF8EC" : "#6E5A4E", boxShadow: state === 'ready' ? "0 3px 0 #2B1E18" : "none", font: "800 12px/1 'Bricolage Grotesque'", cursor: state === 'ready' ? "pointer" : "default", '--press-tf': "translateY(2px)", '--press-sh': "0 1px 0 #2B1E18" }}>
          {state === 'claimed' ? 'Diklaim' : state === 'ready' ? 'Klaim' : 'Belum'}
        </button>
      </div>
    </div>
  );
}

// Daily and long-term missions with claimable rewards.
export default function MisiScreen({ v }) {
  return (
    <div style={{ position: "absolute", top: "66px", left: "0", right: "0", bottom: "84px", overflowY: "auto", scrollbarWidth: "none", padding: "6px 14px 20px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "8px" }}>
        <div style={{ font: "28px/1 'Bagel Fat One',system-ui" }}>Misi</div>
        <div style={{ font: "500 10px/1 'DM Mono',monospace", letterSpacing: ".08em", color: "#6E5A4E" }}>{v.misiSummary}</div>
      </div>
      <div style={{ font: "500 13px/1.4 'Bricolage Grotesque'", color: "#5B4A40", marginTop: "6px" }}>Misi harian berganti tiap tengah malam. Misi petualangan menunggu dengan sabar.</div>
      <div style={{ display: "flex", gap: "4px", marginTop: "12px", padding: "4px", border: "2.5px solid #2B1E18", borderRadius: "16px", background: "#EADBC5" }}>
        {v.misiTabs.map(t => (
          <button key={t.key} onClick={t.pick} style={{ position: "relative", flex: "1", height: "36px", padding: "0", border: t.on ? "2px solid #2B1E18" : "2px solid transparent", borderRadius: "11px", background: t.on ? "#FFF8EC" : "transparent", color: "#2B1E18", font: "800 13px/1 'Bricolage Grotesque'", cursor: "pointer" }}>
            {t.label}
            {t.count > 0 && <span style={{ position: "absolute", top: "-7px", right: "8px", minWidth: "18px", height: "18px", boxSizing: "border-box", padding: "0 4px", borderRadius: "9px", border: "2px solid #2B1E18", background: "#D2532A", color: "#FFF8EC", font: "800 10px/14px 'Bricolage Grotesque'" }}>{t.count}</span>}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "11px", marginTop: "14px" }}>
        {v.quests.map(q => <QuestCard key={q.id} q={q} />)}
      </div>
    </div>
  );
}
