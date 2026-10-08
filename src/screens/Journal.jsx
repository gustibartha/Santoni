export default function Journal({ v }) {
  return (
    <div style={{ position: "absolute", top: "66px", left: "0", right: "0", bottom: "84px", overflowY: "auto", scrollbarWidth: "none", padding: "6px 14px 20px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "8px" }}>
        <div style={{ font: "28px/1 'Bagel Fat One',system-ui" }}>Jurnal</div>
        <div style={{ font: "500 10px/1 'DM Mono',monospace", letterSpacing: ".08em", color: "#5E4A3F" }}>{v.journalSummary}</div>
      </div>
      <div style={{ font: "500 13px/1.4 'Bricolage Grotesque'", color: "#5B4A40", marginTop: "6px" }}>Semua yang terjadi di perjalanan. Santoni tidak pernah membacanya.</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "14px" }}>
        {v.journal.map((j, i) => (
            <div key={j.key ?? j.id ?? i} style={{ border: "2.5px solid #2B1E18", borderRadius: "20px", background: "#FFF8EC", boxShadow: "0 3px 0 #2B1E18", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderBottom: "2px dashed rgba(43,30,24,.2)", background: j.headBg }}>
                <span style={{ width: "34px", height: "34px", flex: "none", boxSizing: "border-box", display: "grid", placeItems: "center", border: "2px solid #2B1E18", borderRadius: "10px", background: "#FFF8EC", font: "19px/1 'Material Symbols Rounded'" }}>{j.icon}</span>
                <div style={{ flex: "1", minWidth: "0" }}>
                  <div style={{ font: "16px/1.1 'Bagel Fat One',system-ui" }}>{j.title}</div>
                  <div style={{ font: "500 10.5px/1.2 'DM Mono',monospace", letterSpacing: ".06em", color: "#5B4A40", marginTop: "3px" }}>{j.sub}</div>
                </div>
                <span style={{ padding: "4px 8px", borderRadius: "8px", background: "#2B1E18", color: "#FFF8EC", font: "500 10.5px/1 'DM Mono',monospace", letterSpacing: ".06em" }}>{j.badge}</span>
              </div>
              <div style={{ padding: "2px 12px 8px" }}>
                {j.entries.map((e, i) => (
                    <div key={e.key ?? e.id ?? i} style={{ display: "grid", gridTemplateColumns: "38px minmax(0,1fr)", gap: "10px", padding: "9px 0", borderBottom: "1.5px dashed rgba(43,30,24,.12)" }}>
                      <div style={{ alignSelf: "start", padding: "4px 0", textAlign: "center", border: `1.5px solid ${e.stampColor}`, borderRadius: "6px", color: e.stampColor, font: "500 10.5px/1 'DM Mono',monospace", transform: "rotate(-4deg)" }}>{e.stamp}</div>
                      <div style={{ minWidth: "0" }}>
                        <div style={{ font: "500 13.5px/1.42 'Bricolage Grotesque'", textWrap: "pretty" }}>{e.text}</div>
                        {e.hasFx && (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "5px" }}>
                            {e.fx.map((f, i) => (
                                <span key={f.key ?? f.id ?? i} style={{ display: "inline-flex", alignItems: "center", gap: "3px", padding: "3px 7px 3px 5px", borderRadius: "8px", border: "1.5px solid #2B1E18", background: f.bg, font: "700 11px/1 'Bricolage Grotesque'" }}>
                                  <span style={{ font: "12px/1 'Material Symbols Rounded'" }}>{f.icon}</span>
                                  {f.label}
                                </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                ))}
                {j.more && (
                  <div onClick={j.toggle} style={{ padding: "10px 0 4px", textAlign: "center", font: "800 12.5px/1 'Bricolage Grotesque'", color: "#A93D1C", cursor: "pointer" }}>{j.moreLabel}</div>
                )}
              </div>
            </div>
        ))}
      </div>
      <div style={{ marginTop: "18px", padding: "12px 14px", border: "2.5px dashed #2B1E18", borderRadius: "18px", background: "#F3E6D3" }}>
        <div style={{ font: "16px/1.1 'Bagel Fat One',system-ui" }}>Cadangan progres</div>
        <div style={{ font: "500 12px/1.4 'Bricolage Grotesque'", color: "#5B4A40", marginTop: "4px" }}>Progres tersimpan di browser ini saja. Salin kodenya untuk pindah perangkat atau berjaga-jaga kalau data browser terhapus.</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "10px" }}>
          <button onClick={v.copyBackup} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", height: "38px", border: "2.5px solid #2B1E18", borderRadius: "12px", background: "#F2B63C", boxShadow: "0 3px 0 #2B1E18", color: "#2B1E18", font: "800 12.5px/1 'Bricolage Grotesque'", cursor: "pointer" }}><span style={{ font: "17px/1 'Material Symbols Rounded'" }}>content_copy</span>Salin kode</button>
          <button onClick={v.loadBackup} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", height: "38px", border: "2.5px solid #2B1E18", borderRadius: "12px", background: "#FFF8EC", boxShadow: "0 3px 0 #2B1E18", color: "#2B1E18", font: "800 12.5px/1 'Bricolage Grotesque'", cursor: "pointer" }}><span style={{ font: "17px/1 'Material Symbols Rounded'" }}>upload</span>Muat kode</button>
        </div>
      </div>
    </div>
  );
}
