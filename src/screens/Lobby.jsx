import Santoni from '../characters/Santoni.jsx';
import Musuh from '../characters/Musuh.jsx';
import PetArt from '../characters/PetArt.jsx';

export default function Lobby({ v }) {
  return (
    <div style={{ position: "absolute", top: "66px", left: "0", right: "0", bottom: "84px", display: "flex", flexDirection: "column", gap: "12px", padding: "6px 14px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button onClick={v.prevChapter} style={{ flex: "none", width: "40px", height: "40px", display: "grid", placeItems: "center", padding: "0", border: "2.5px solid #2B1E18", borderRadius: "14px", background: "#FFF8EC", boxShadow: "0 3px 0 #2B1E18", color: "#2B1E18", font: "26px/1 'Material Symbols Rounded'", cursor: "pointer", opacity: v.prevOpacity }}>chevron_left</button>
        <div style={{ flex: "1", minWidth: "0", textAlign: "center", padding: "7px 10px 8px", border: "2.5px solid #2B1E18", borderRadius: "16px", background: "#FFF8EC", boxShadow: "0 3px 0 #2B1E18" }}>
          <div style={{ font: "500 10px/1.2 'DM Mono',monospace", letterSpacing: ".07em", color: "#A93D1C" }}>BAB {v.chapterNo} DARI {v.chapterTotal}</div>
          <div style={{ font: "21px/1.15 'Bagel Fat One',system-ui", marginTop: "3px" }}>{v.chapterName}</div>
          <div style={{ font: "600 12px/1.3 'Bricolage Grotesque'", color: "#5E4A3F", marginTop: "2px" }}>Rekor: Hari {v.chapterBest} / {v.daysTotal}</div>
          {v.chapterRule && <div style={{ font: "700 11px/1.3 'Bricolage Grotesque'", color: "#A93D1C", marginTop: "2px" }}>Aturan: {v.chapterRule.name}</div>}
        </div>
        <button onClick={v.nextChapter} style={{ flex: "none", width: "40px", height: "40px", display: "grid", placeItems: "center", padding: "0", border: "2.5px solid #2B1E18", borderRadius: "14px", background: "#FFF8EC", boxShadow: "0 3px 0 #2B1E18", color: "#2B1E18", font: "26px/1 'Material Symbols Rounded'", cursor: "pointer", opacity: v.nextOpacity }}>chevron_right</button>
      </div>
      <div onClick={v.tapFest} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "7px 10px 7px 8px", border: "2.5px solid #2B1E18", borderRadius: "16px", background: v.festColor, color: "#FFF8EC", boxShadow: "0 3px 0 #2B1E18", cursor: "pointer" }}>
        <span style={{ width: "32px", height: "32px", flex: "none", boxSizing: "border-box", display: "grid", placeItems: "center", border: "2px solid #2B1E18", borderRadius: "10px", background: "#F2B63C", color: "#2B1E18", font: "19px/1 'Material Symbols Rounded'" }}>{v.festIcon}</span>
        <div style={{ flex: "1", minWidth: "0" }}>
          <div style={{ font: "800 13px/1.15 'Bricolage Grotesque'" }}>{v.festName}</div>
          <div style={{ font: "500 10.5px/1.2 'DM Mono',monospace", letterSpacing: ".06em" }}>{v.festSub}</div>
        </div>
        <span style={{ padding: "6px 9px", borderRadius: "9px", background: "#FFF8EC", color: "#2B1E18", font: "800 11px/1 'Bricolage Grotesque'" }}>Lihat</span>
      </div>
      <div style={{ position: "relative", flex: "1", minHeight: "0", border: "2.5px solid #2B1E18", borderRadius: "26px", overflow: "hidden", backgroundColor: v.lobbySky, transition: "background-color .4s", backgroundImage: "radial-gradient(rgba(43,30,24,.13) 1.2px,transparent 1.5px)", backgroundSize: "10px 10px", boxShadow: "0 4px 0 #2B1E18" }}>
        <div style={{ position: "absolute", left: "-30%", right: "-30%", bottom: "-130px", height: "310px", borderRadius: "50%", background: v.lobbyHill, border: "2.5px solid #2B1E18" }} />
        <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", height: "74px", background: v.lobbyGround, borderTop: "2.5px solid #2B1E18" }} />
        <div style={{ position: "absolute", right: "30px", bottom: "52px", width: "8px", height: "52px", border: "2.5px solid #2B1E18", borderRadius: "4px", background: "#8E5A2B" }} />
        <div style={{ position: "absolute", right: "10px", bottom: "96px", padding: "6px 9px", border: "2.5px solid #2B1E18", borderRadius: "8px", background: "#FFF8EC", font: "500 10px/1.15 'DM Mono',monospace", letterSpacing: ".06em", transform: "rotate(-5deg)", boxShadow: "0 2px 0 #2B1E18" }}>{v.chapterUpper} →</div>
        <div style={{ position: "absolute", left: "26px", top: "100px", width: "62px", height: "20px", boxSizing: "border-box", borderRadius: "12px", background: "#FFF8EC", border: "2.5px solid #2B1E18" }} />
        <div style={{ position: "absolute", left: "calc(50% - 150px)", bottom: "46px", width: "200px", height: "220px" }}><Santoni pose={"idle"} still={v.still} /></div>
        {v.activePet && <div style={{ position: "absolute", left: "calc(50% - 22px)", bottom: "44px", pointerEvents: "none" }}><PetArt id={v.activePet} size={52} still={v.still} /></div>}
        <div onClick={v.tapKelinci} style={{ position: "absolute", left: "4px", bottom: "52px", width: "58px", height: "58px", cursor: "pointer" }}><Musuh kind={"kelinci"} still={v.still} /></div>
        <div onClick={v.tapBebek} style={{ position: "absolute", right: "56px", bottom: "46px", width: "70px", height: "70px", cursor: "pointer" }}><Musuh kind={"bebek"} still={v.still} flip={true} /></div>
        <div style={{ position: "absolute", right: "112px", bottom: "108px", width: "24px", height: "24px", boxSizing: "border-box", display: "grid", placeItems: "center", border: "2.5px solid #2B1E18", borderRadius: "8px", background: "#F2B63C", font: "15px/1 'Bagel Fat One',system-ui", transform: "rotate(-8deg)", pointerEvents: "none" }}>!</div>
        <div onClick={v.tapLebah} style={{ position: "absolute", left: "196px", top: "92px", width: "44px", height: "44px", cursor: "pointer" }}><Musuh kind={"lebah"} still={v.still} flip={true} /></div>
        <div onClick={v.nextBubble} style={{ position: "absolute", top: "14px", left: "14px", maxWidth: "164px", padding: "10px 12px", border: "2.5px solid #2B1E18", borderRadius: "16px 16px 16px 4px", background: "#FFF8EC", boxShadow: "0 3px 0 #2B1E18", font: "600 13px/1.35 'Bricolage Grotesque'", textWrap: "pretty", cursor: "pointer" }}>{v.bubbleText}</div>
        <div style={{ position: "absolute", top: "14px", right: "12px", display: "grid", gridTemplateColumns: "repeat(2,54px)", gap: "12px 8px" }}>
          <div onClick={v.tapDaily} style={{ position: "relative", width: "54px", height: "58px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px", border: "2.5px solid #2B1E18", borderRadius: "16px", background: "#FFF8EC", boxShadow: "0 3px 0 #2B1E18", cursor: "pointer" }}>
            <span style={{ font: "24px/1 'Material Symbols Rounded'", color: "#D2532A" }}>calendar_month</span>
            <span style={{ font: "700 10px/1 'Bricolage Grotesque'" }}>7 Hari</span>
            {v.dailyDot && (
              <span style={{ position: "absolute", top: "-6px", right: "-6px", width: "16px", height: "16px", boxSizing: "border-box", borderRadius: "50%", border: "2px solid #2B1E18", background: "#D2532A" }} />
            )}
          </div>
          <div onClick={v.tapMail} style={{ position: "relative", width: "54px", height: "58px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px", border: "2.5px solid #2B1E18", borderRadius: "16px", background: "#FFF8EC", boxShadow: "0 3px 0 #2B1E18", cursor: "pointer" }}>
            <span style={{ font: "24px/1 'Material Symbols Rounded'", color: "#3166B0" }}>mail</span>
            <span style={{ font: "700 10px/1 'Bricolage Grotesque'" }}>Surat</span>
            <span style={{ position: "absolute", top: "-7px", right: "-7px", minWidth: "18px", height: "18px", boxSizing: "border-box", padding: "0 4px", borderRadius: "9px", border: "2px solid #2B1E18", background: "#D2532A", color: "#FFF8EC", font: "800 10px/14px 'Bricolage Grotesque'", textAlign: "center" }}>2</span>
          </div>
          <div onClick={v.tapFest} style={{ position: "relative", width: "54px", height: "58px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px", border: "2.5px solid #2B1E18", borderRadius: "16px", background: "#FFF8EC", boxShadow: "0 3px 0 #2B1E18", cursor: "pointer" }}>
            <span style={{ font: "24px/1 'Material Symbols Rounded'", color: "#2F7A5C" }}>celebration</span>
            <span style={{ font: "700 10px/1 'Bricolage Grotesque'" }}>Festival</span>
            {v.festReady > 0 && <span style={{ position: "absolute", top: "-6px", right: "-6px", width: "16px", height: "16px", boxSizing: "border-box", borderRadius: "50%", border: "2px solid #2B1E18", background: "#D2532A" }} />}
          </div>
          <div onClick={v.tapPass} style={{ position: "relative", width: "54px", height: "58px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px", border: "2.5px solid #2B1E18", borderRadius: "16px", background: "#FFF8EC", boxShadow: "0 3px 0 #2B1E18", cursor: "pointer" }}>
            <span style={{ font: "24px/1 'Material Symbols Rounded'", color: "#B0620A" }}>workspace_premium</span>
            <span style={{ font: "700 10px/1 'Bricolage Grotesque'" }}>Musim</span>
          </div>
          <div onClick={v.tapMisi} style={{ position: "relative", width: "54px", height: "58px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px", border: "2.5px solid #2B1E18", borderRadius: "16px", background: "#FFF8EC", boxShadow: "0 3px 0 #2B1E18", cursor: "pointer" }}>
            <span style={{ font: "24px/1 'Material Symbols Rounded'", color: "#7E43B5" }}>task_alt</span>
            <span style={{ font: "700 10px/1 'Bricolage Grotesque'" }}>Misi</span>
            <span style={{ position: "absolute", top: "-7px", right: "-9px", height: "18px", boxSizing: "border-box", padding: "0 5px", borderRadius: "9px", border: "2px solid #2B1E18", background: v.misiReady ? "#D2532A" : "#F2B63C", color: v.misiReady ? "#FFF8EC" : "#2B1E18", font: "800 9.5px/14px 'Bricolage Grotesque'" }}>{v.misiBadge}</span>
          </div>
          <div onClick={v.tapTeman} style={{ position: "relative", width: "54px", height: "58px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px", border: "2.5px solid #2B1E18", borderRadius: "16px", background: "#FFF8EC", boxShadow: "0 3px 0 #2B1E18", cursor: "pointer" }}>
            <span style={{ font: "24px/1 'Material Symbols Rounded'", color: "#2F7A5C" }}>group</span>
            <span style={{ font: "700 10px/1 'Bricolage Grotesque'" }}>Teman</span>
            {v.friendGifts > 0 && <span style={{ position: "absolute", top: "-6px", right: "-6px", width: "16px", height: "16px", boxSizing: "border-box", borderRadius: "50%", border: "2px solid #2B1E18", background: "#D2532A" }} />}
          </div>
        </div>
        <div onClick={v.openJournal} style={{ position: "absolute", left: "10px", right: "10px", bottom: "10px", display: "flex", alignItems: "center", gap: "8px", height: "34px", boxSizing: "border-box", padding: "0 8px 0 5px", border: "2.5px solid #2B1E18", borderRadius: "12px", background: "#2B1E18", color: "#FFF8EC", cursor: "pointer" }}>
          <span style={{ width: "24px", height: "24px", flex: "none", display: "grid", placeItems: "center", borderRadius: "7px", background: "#F2B63C", color: "#2B1E18", font: "15px/1 'Material Symbols Rounded'" }}>menu_book</span>
          <span style={{ flex: "1", minWidth: "0", font: "600 12px/1 'Bricolage Grotesque'", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.tickerText}</span>
          <span style={{ font: "18px/1 'Material Symbols Rounded'", color: "#F2B63C" }}>chevron_right</span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "8px 14px 8px 12px", border: "2.5px solid #2B1E18", borderRadius: "16px", background: "#FFF8EC", boxShadow: "0 3px 0 #2B1E18" }}>
        <div style={{ flex: "none" }}>
          <div style={{ font: "800 12px/1.1 'Bricolage Grotesque'" }}>Peti bab</div>
          <div style={{ font: "500 10.5px/1.2 'DM Mono',monospace", color: "#5E4A3F", marginTop: "3px" }}>REKOR H{v.chapterBest}</div>
        </div>
        <div style={{ position: "relative", flex: "1", height: "46px", marginRight: "14px" }}>
          <div style={{ position: "absolute", left: "0", right: "0", top: "11px", height: "10px", boxSizing: "border-box", border: "2px solid #2B1E18", borderRadius: "6px", background: "#EADBC5", overflow: "hidden" }}><div style={{ height: "100%", width: v.chestPct, background: "#F2B63C" }} /></div>
          {v.chests.map((c, i) => (
              <div key={c.key ?? c.id ?? i} onClick={c.claim} style={{ position: "absolute", top: "0", left: c.left, transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", cursor: "pointer" }}>
                <div style={{ width: "32px", height: "32px", boxSizing: "border-box", display: "grid", placeItems: "center", border: "2.5px solid #2B1E18", borderRadius: "10px", background: c.bg, color: c.color, font: "18px/1 'Material Symbols Rounded'", boxShadow: "0 2px 0 #2B1E18" }}>{c.icon}</div>
                <div style={{ font: "500 10px/1 'DM Mono',monospace" }}>{c.label}</div>
              </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{ flex: "none", font: "600 11px/1.1 'Bricolage Grotesque'", color: "#5B4A40", width: "44px" }}>Gaya jalan</span>
        {v.stances.map(st => (
          <button key={st.id} onClick={st.pick} aria-pressed={st.on} style={{ flex: "1", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", height: "34px", padding: "0", border: "2.5px solid #2B1E18", borderRadius: "12px", background: st.on ? "#2B1E18" : "#FFF8EC", color: st.on ? "#F2B63C" : "#2B1E18", boxShadow: st.on ? "none" : "0 2px 0 #2B1E18", font: "800 12.5px/1 'Bricolage Grotesque'", cursor: "pointer" }}>
            <span style={{ font: "17px/1 'Material Symbols Rounded'" }}>{st.icon}</span>{st.name}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", gap: "10px", flex: "none" }}>
        <button onClick={v.openModes} aria-label="Tantangan" style={{ position: "relative", width: "72px", height: "68px", flex: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "3px", padding: "0", border: "3px solid #2B1E18", borderRadius: "20px", background: "#5A3E8A", boxShadow: "0 6px 0 #2B1E18", color: "#FFF8EC", font: "800 11px/1 'Bricolage Grotesque'", cursor: "pointer" }}>
          <span style={{ font: "28px/1 'Material Symbols Rounded'", color: "#F2B63C" }}>swords</span>Tantangan
          {v.hubBadge && <span style={{ position: "absolute", top: "-6px", right: "-6px", width: "16px", height: "16px", boxSizing: "border-box", borderRadius: "50%", border: "2px solid #2B1E18", background: "#D2532A" }} />}
        </button>
        <button onClick={v.goRun} className="dc-press" style={{ flex: "1", height: "68px", margin: "0", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", padding: "0", border: "3px solid #2B1E18", borderRadius: "22px", background: "#D2532A", boxShadow: "0 6px 0 #2B1E18", color: "#FFF8EC", font: "30px/1 'Bagel Fat One',system-ui", textShadow: "2px 0 0 #2B1E18,-2px 0 0 #2B1E18,0 2px 0 #2B1E18,0 -2px 0 #2B1E18,1.5px 1.5px 0 #2B1E18,-1.5px 1.5px 0 #2B1E18,1.5px -1.5px 0 #2B1E18,-1.5px -1.5px 0 #2B1E18,0 4px 0 #2B1E18", cursor: "pointer", '--press-tf': "translateY(4px)", '--press-sh': "0 2px 0 #2B1E18" }}>
        PERGI
        <span style={{ display: "flex", alignItems: "center", gap: "2px", padding: "5px 9px 5px 6px", borderRadius: "12px", background: "#2B1E18", color: "#FFF8EC", font: "800 14px/1 'Bricolage Grotesque'", textShadow: "none" }}>
          <span style={{ font: "17px/1 'Material Symbols Rounded'", color: "#F2B63C" }}>bolt</span>
          5
        </span>
      </button>
      </div>
    </div>
  );
}
