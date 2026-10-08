// Small speaker toggle for screens without the HUD (travel and battle).
export default function MusicButton({ v, dark = false, size = 30 }) {
  return (
    <button
      onClick={v.toggleMusic}
      aria-label={v.musicOn ? 'Matikan musik' : 'Nyalakan musik'}
      style={{ width: `${size}px`, height: `${size}px`, flex: "none", display: "grid", placeItems: "center", padding: "0", boxSizing: "border-box", border: dark ? "2px solid #0F1411" : "2.5px solid #2B1E18", borderRadius: "10px", background: dark ? "#2E3A34" : "#FFF8EC", color: v.musicOn ? (dark ? "#F2B63C" : "#2F7A5C") : (dark ? "#6E7A74" : "#A8998C"), boxShadow: dark ? "none" : "0 2px 0 #2B1E18", font: "18px/1 'Material Symbols Rounded'", cursor: "pointer" }}
    >
      {v.musicOn ? 'volume_up' : 'volume_off'}
    </button>
  );
}
