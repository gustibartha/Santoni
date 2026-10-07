export default function NavBar({ v }) {
  return (
    <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", zIndex: "6", height: "84px", boxSizing: "border-box", display: "grid", gridTemplateColumns: "repeat(5,minmax(0,1fr))", alignItems: "end", padding: "0 6px 13px", background: "#2B1E18" }}>
      {v.tabs.map((t, i) => (
          <div key={t.key ?? t.id ?? i} onClick={t.go} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", cursor: "pointer", transform: `translateY(${t.lift})`, transition: "transform .15s" }}>
            <div style={{ width: t.size, height: t.size, boxSizing: "border-box", display: "grid", placeItems: "center", border: `2.5px solid ${t.border}`, borderRadius: "16px", background: t.bg, color: t.iconColor, font: `${t.iconSize}/1 'Material Symbols Rounded'`, boxShadow: t.shadow }}>{t.icon}</div>
            <div style={{ font: "700 11px/1 'Bricolage Grotesque'", color: t.color }}>{t.label}</div>
          </div>
      ))}
    </div>
  );
}
