import Santoni from '../characters/Santoni.jsx';

export default function Hud({ v }) {
  return (
    <div style={{ position: "absolute", top: "0", left: "0", right: "0", zIndex: "5", display: "flex", alignItems: "center", gap: "8px", padding: "14px 12px 8px" }}>
      <div onClick={v.openAccount} role="button" aria-label={v.acctOnline ? 'Akun online' : 'Masuk ke akun'} style={{ position: "relative", width: "42px", height: "42px", flex: "none", display: "grid", placeItems: "center", border: "2.5px solid #2B1E18", borderRadius: "50%", background: "#F7D9BF", boxShadow: "var(--lift2)", boxSizing: "border-box", cursor: "pointer" }}>
        <div style={{ position: "absolute", inset: "0", borderRadius: "50%", overflow: "hidden" }}><div style={{ position: "absolute", left: "-13px", top: "-2px", width: "62px", height: "68px" }}><Santoni pose={"idle"} still={true} /></div></div>
        {v.acctBadge && <span style={{ position: "absolute", right: "-8px", top: "-6px", width: "20px", height: "20px", boxSizing: "border-box", display: "grid", placeItems: "center", borderRadius: "50%", border: "2px solid #2B1E18", background: v.acctOnline ? "#3C78C8" : "#D2532A", color: "#FFF8EC", font: "12px/1 'Material Symbols Rounded'" }}>{v.acctOnline ? 'cloud_done' : 'cloud_off'}</span>}
        <span style={{ position: "absolute", right: "-7px", bottom: "-5px", padding: "2px 5px", borderRadius: "7px", border: "2px solid #2B1E18", background: "#F2B63C", color: "#2B1E18", font: "800 9px/1 'Bricolage Grotesque'" }}>23</span>
      </div>
      <div style={{ minWidth: "0" }}>
        <div style={{ font: "800 14px/1.1 'Bricolage Grotesque'" }}>Santoni</div>
        <div onClick={v.toggleMusic} role="button" aria-label={v.musicOn ? 'Matikan musik' : 'Nyalakan musik'} style={{ display: "inline-flex", alignItems: "center", gap: "2px", marginTop: "3px", padding: "2px 6px 2px 3px", borderRadius: "7px", background: v.musicOn ? "#2F7A5C" : "#EADBC5", color: v.musicOn ? "#FFF8EC" : "#5E4A3F", font: "500 9.5px/1 'DM Mono',monospace", letterSpacing: ".06em", cursor: "pointer", whiteSpace: "nowrap" }}>
          <span style={{ font: "12px/1 'Material Symbols Rounded'" }}>{v.musicOn ? 'music_note' : 'music_off'}</span>{v.musicOn ? 'MUSIK' : 'SUNYI'}
        </div>
      </div>
      <div style={{ flex: "1" }} />
      <div onClick={v.tapEnergy} style={{ position: "relative", display: "flex", alignItems: "center", gap: "5px", height: "28px", padding: "0 9px 0 3px", borderRadius: "14px", background: "#2B1E18", color: "#FFF8EC", font: "700 12.5px/1 'Bricolage Grotesque'", cursor: "pointer" }}>
        <span style={{ width: "22px", height: "22px", display: "grid", placeItems: "center", borderRadius: "50%", background: "#3C78C8", color: "#FFF8EC", font: "15px/1 'Material Symbols Rounded'" }}>bolt</span>
        {v.energyLabel}
        {v.energyTimer && (
          <span style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: "3px", padding: "2px 5px", borderRadius: "6px", background: "#3C78C8", color: "#FFF8EC", font: "500 9.5px/1 'DM Mono',monospace", letterSpacing: ".02em", whiteSpace: "nowrap", pointerEvents: "none" }}>{v.energyTimer}</span>
        )}
      </div>
      <div onClick={v.goShop} style={{ display: "flex", alignItems: "center", gap: "5px", height: "28px", padding: "0 9px 0 4px", borderRadius: "14px", background: "#2B1E18", color: "#FFF8EC", font: "700 12.5px/1 'Bricolage Grotesque'", cursor: "pointer" }}>
        <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#F2B63C", boxShadow: "inset 0 0 0 2px #C28A16,inset 0 0 0 5px #F2B63C,inset 0 0 0 6.5px #C28A16" }} />
        {v.coinsLabel}
      </div>
      <div onClick={v.goShop} style={{ display: "flex", alignItems: "center", gap: "5px", height: "28px", padding: "0 9px 0 3px", borderRadius: "14px", background: "#2B1E18", color: "#FFF8EC", font: "700 12.5px/1 'Bricolage Grotesque'", cursor: "pointer" }}>
        <span style={{ width: "22px", height: "22px", display: "grid", placeItems: "center", borderRadius: "50%", background: "#7E43B5", color: "#FFF8EC", font: "14px/1 'Material Symbols Rounded'" }}>diamond</span>
        {v.gemsLabel}
      </div>
    </div>
  );
}
