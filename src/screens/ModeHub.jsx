import Musuh from '../characters/Musuh.jsx';

const ICON = "'Material Symbols Rounded'";
const OUT = "2px 0 0 #2B1E18,-2px 0 0 #2B1E18,0 2px 0 #2B1E18,0 -2px 0 #2B1E18,1.5px 1.5px 0 #2B1E18,-1.5px 1.5px 0 #2B1E18,1.5px -1.5px 0 #2B1E18,-1.5px -1.5px 0 #2B1E18,0 3px 0 #2B1E18";

// A big banner card: title, a pill of info, two stats, art on the right, action buttons.
function ModeCard({ color, title, pill, pillIcon, stats, art, actions, onClick }) {
  return (
    <div onClick={onClick} style={{ position: "relative", flex: "none", overflow: "hidden", minHeight: "118px", border: "3px solid #2B1E18", borderRadius: "20px", background: `linear-gradient(110deg, ${color} 55%, rgba(255,255,255,.18) 55.2%, ${color} 70%)`, boxShadow: "var(--lift5)", color: "#FFF8EC", cursor: onClick ? "pointer" : "default" }}>
      <div style={{ position: "absolute", right: "-6px", bottom: "-8px", width: "128px", height: "128px", pointerEvents: "none" }}>{art}</div>
      <div style={{ position: "relative", padding: "11px 12px 11px", maxWidth: "70%" }}>
        <div style={{ font: "21px/1.05 var(--display)", textShadow: OUT }}>{title}</div>
        {pill && (
          <div style={{ display: "inline-flex", alignItems: "center", gap: "5px", marginTop: "7px", padding: "4px 9px 4px 5px", borderRadius: "10px", background: "rgba(0,0,0,.28)", font: "700 11.5px/1.2 'Bricolage Grotesque'" }}>
            <span style={{ font: `15px/1 ${ICON}`, color: "#FFE9A8" }}>{pillIcon}</span>{pill}
          </div>
        )}
        <div style={{ display: "flex", gap: "14px", marginTop: "8px" }}>
          {stats.map(st => (
            <div key={st.label}>
              <div style={{ font: "500 9.5px/1 'DM Mono',monospace", color: "rgba(255,248,236,.8)" }}>{st.label}</div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "3px", padding: "3px 9px 3px 5px", borderRadius: "9px", background: "rgba(0,0,0,.3)", font: "800 13px/1 'Bricolage Grotesque'" }}>
                <span style={{ font: `14px/1 ${ICON}`, color: st.color || "#F2B63C" }}>{st.icon}</span>{st.value}
              </div>
            </div>
          ))}
        </div>
        {actions && <div style={{ display: "flex", gap: "6px", marginTop: "9px" }}>{actions}</div>}
      </div>
    </div>
  );
}

function Btn({ onClick, children, light, disabled }) {
  return (
    <button onClick={e => { e.stopPropagation(); onClick && onClick(); }} disabled={disabled} style={{ height: "32px", padding: "0 12px", border: "2px solid #2B1E18", borderRadius: "11px", background: disabled ? "#EADBC5" : light ? "#FFF8EC" : "#F2B63C", color: "#2B1E18", boxShadow: disabled ? "none" : "var(--lift2)", font: "800 12px/1 'Bricolage Grotesque'", cursor: disabled ? "default" : "pointer", whiteSpace: "nowrap" }}>{children}</button>
  );
}

const art = kind => <Musuh kind={kind} still flip />;

// "Tantangan" hub: Arena, Tantangan (tower + mine) and Dungeon tabs.
export default function ModeHub({ v }) {
  return (
    <div style={{ position: "absolute", top: "66px", left: "0", right: "0", bottom: "84px", display: "flex", flexDirection: "column", padding: "6px 14px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "6px", padding: "4px", border: "2.5px solid #2B1E18", borderRadius: "16px", background: "#2B1E18" }}>
        {v.modeTabs.map(t => (
          <button key={t.key} onClick={t.pick} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", height: "38px", padding: "0", border: "0", borderRadius: "12px", background: t.on ? "#F2B63C" : "transparent", color: t.on ? "#2B1E18" : "#FFF8EC", font: "800 13.5px/1 'Bricolage Grotesque'", cursor: "pointer" }}>
            <span style={{ font: `18px/1 ${ICON}` }}>{t.icon}</span>{t.label}
          </button>
        ))}
      </div>
      <div style={{ flex: "1", minHeight: "0", overflowY: "auto", scrollbarWidth: "none", margin: "0 -14px", padding: "12px 14px 20px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {v.modeTab === 'arena' && (
          <>
            <ModeCard color="#B0405A" title={v.arena.name} pill={`Musim berakhir dalam ${v.arena.endsIn}`} pillIcon="schedule" art={art('bebek')}
              stats={[{ label: 'PERINGKAT', value: `${v.arena.rank}/${v.arena.total}`, icon: 'leaderboard' }, { label: 'POIN', value: v.arena.points, icon: 'military_tech' }, { label: 'DUEL', value: `${v.arena.triesLeft}/5`, icon: 'swords' }]} />
            <div style={{ font: "500 10.5px/1 'DM Mono',monospace", letterSpacing: ".06em", color: "#5E4A3F" }}>PILIH LAWAN · LAWAN BERGANTI SETELAH TIAP DUEL</div>
            {v.arena.opponents.map(o => (
              <div key={o.name} style={{ display: "flex", alignItems: "center", gap: "11px", padding: "9px 11px", border: "2.5px solid #2B1E18", borderRadius: "16px", background: "#FFF8EC", boxShadow: "var(--lift3)" }}>
                <div style={{ position: "relative", width: "48px", height: "48px", flex: "none", border: "2px solid #2B1E18", borderRadius: "12px", background: "#F3E6D3", overflow: "hidden" }}><div style={{ position: "absolute", inset: "2px 2px 0" }}><Musuh kind={o.kind} still /></div></div>
                <div style={{ flex: "1", minWidth: "0" }}>
                  <div style={{ font: "800 14px/1.15 'Bricolage Grotesque'" }}>{o.name}</div>
                  <div style={{ font: "600 11.5px/1.3 'Bricolage Grotesque'", color: "#5B4A40", marginTop: "2px" }}>Kekuatan {o.powerLabel} · +{o.gain} poin</div>
                </div>
                <Btn onClick={o.fight} disabled={v.arena.triesLeft <= 0}>Duel</Btn>
              </div>
            ))}
            <div style={{ padding: "10px 12px", borderRadius: "14px", background: "#F3E6D3", border: "2px dashed #2B1E18", font: "500 12px/1.45 'Bricolage Grotesque'", color: "#5B4A40" }}>
              <b>Hadiah akhir musim:</b> {v.arena.tiers.map(t => `peringkat ${t.rank === 1 ? '1' : `≤${t.rank}`}: ${t.gems} permata`).join(' · ')}. Kalah mengurangi 8 poin.
            </div>
          </>
        )}

        {v.modeTab === 'tantangan' && (
          <>
            <ModeCard color="#5A3E8A" title="Menara Tanpa Lift" pill={`Lantai berikutnya: ${v.tower.floor}`} pillIcon="stairs" art={art('gajah')}
              stats={[{ label: 'REKOR', value: `Lt ${v.tower.best}`, icon: 'emoji_events' }, { label: 'BIAYA', value: `${v.tower.cost} energi`, icon: 'bolt', color: '#9EC3F0' }]}
              actions={<Btn onClick={v.tower.play}>Naik ke Lantai {v.tower.floor}</Btn>} />
            <ModeCard color="#6B3A2A" title={v.mine.name} pill="Gali petak, temukan tangga ke bawah" pillIcon="hardware" art={art('kodok')} onClick={v.mine.open}
              stats={[{ label: 'LANTAI', value: v.mine.floor, icon: 'layers' }, { label: 'KAPAK', value: `${v.mine.picks}/${v.mine.maxPicks}`, icon: 'hardware', color: '#F0A070' }]}
              actions={<Btn onClick={v.mine.open}>Masuk tambang</Btn>} />
          </>
        )}

        {v.modeTab === 'dungeon' && v.dungeons.map(d => (
          <ModeCard key={d.id} color={d.color} title={d.name} pill={d.reward} pillIcon={d.icon} art={art(d.boss)}
            stats={[{ label: 'KESULITAN', value: d.level, icon: 'local_fire_department', color: '#FF9C8A' }, { label: 'TIKET', value: `${d.left}/3`, icon: 'confirmation_number' }]}
            actions={<>
              <Btn onClick={d.play} disabled={d.left <= 0}>Serbu {d.level}</Btn>
              {d.replay && d.best !== d.level && <Btn light onClick={d.replay} disabled={d.left <= 0}>Ulang {d.best}</Btn>}
            </>} />
        ))}
      </div>
    </div>
  );
}
