const ICON = "'Material Symbols Rounded'";
const CARD = { marginTop: "12px", padding: "12px 14px", border: "2.5px solid #2B1E18", borderRadius: "18px", background: "#FFF8EC", boxShadow: "var(--lift3)" };
const HEAD = { display: "flex", alignItems: "center", gap: "8px", font: "16px/1.1 var(--display)" };
const NOTE = { font: "500 11.5px/1.4 'Bricolage Grotesque'", color: "#5B4A40", marginTop: "6px" };

function Toggle({ on, onClick, label }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={onClick} style={{ position: "relative", width: "50px", height: "28px", flex: "none", padding: "0", border: "2.5px solid #2B1E18", borderRadius: "14px", background: on ? "#2F7A5C" : "#EADBC5", cursor: "pointer", transition: "background .2s" }}>
      <span style={{ position: "absolute", top: "2px", left: on ? "24px" : "2px", width: "19px", height: "19px", borderRadius: "50%", border: "2px solid #2B1E18", background: "#FFF8EC", transition: "left .2s" }} />
    </button>
  );
}

function Row({ icon, color, title, sub, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
      <span style={{ width: "34px", height: "34px", flex: "none", display: "grid", placeItems: "center", border: "2px solid #2B1E18", borderRadius: "10px", background: color, color: "#FFF8EC", font: `19px/1 ${ICON}` }}>{icon}</span>
      <div style={{ flex: "1", minWidth: "0" }}>
        <div style={{ font: "800 13.5px/1.2 'Bricolage Grotesque'" }}>{title}</div>
        {sub && <div style={{ font: "500 11px/1.3 'Bricolage Grotesque'", color: "#5B4A40", marginTop: "2px" }}>{sub}</div>}
      </div>
      {children}
    </div>
  );
}

function Slider({ value, onChange, disabled, label }) {
  return (
    <input type="range" min="0" max="100" step="5" value={Math.round(value * 100)} onChange={onChange} disabled={disabled} aria-label={label}
      style={{ display: "block", width: "100%", boxSizing: "border-box", margin: "8px 0 0", accentColor: "#D2532A", opacity: disabled ? 0.4 : 1 }} />
  );
}

// Settings: sound, look, performance, account and app install.
export default function SetelanScreen({ v }) {
  const a = v.setelan;
  return (
    <div style={{ position: "absolute", top: "66px", left: "0", right: "0", bottom: "84px", overflowY: "auto", scrollbarWidth: "none", padding: "6px 14px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button onClick={a.back} aria-label="Kembali" style={{ width: "38px", height: "38px", flex: "none", display: "grid", placeItems: "center", padding: "0", border: "2.5px solid #2B1E18", borderRadius: "12px", background: "#FFF8EC", boxShadow: "var(--lift3)", color: "#2B1E18", font: `22px/1 ${ICON}`, cursor: "pointer" }}>chevron_left</button>
        <div style={{ font: "28px/1 var(--display)" }}>Pengaturan</div>
      </div>

      <div style={CARD}>
        <div style={HEAD}><span style={{ font: `21px/1 ${ICON}`, color: "#D2532A" }}>volume_up</span>Suara</div>
        <Row icon="music_note" color="#2F7A5C" title="Musik latar" sub={a.musicOn ? `Volume ${Math.round(a.vol * 100)}%` : 'Mati'}><Toggle on={a.musicOn} onClick={a.toggleMusic} label="Musik latar" /></Row>
        <Slider value={a.vol} onChange={a.setVol} disabled={!a.musicOn} label="Volume musik" />
        <Row icon="graphic_eq" color="#3C78C8" title="Efek suara" sub={a.sfxOn ? `Volume ${Math.round(a.sfxVol * 100)}%` : 'Mati'}><Toggle on={a.sfxOn} onClick={a.toggleSfx} label="Efek suara" /></Row>
        <Slider value={a.sfxVol} onChange={a.setSfxVol} disabled={!a.sfxOn} label="Volume efek suara" />
        <button onClick={a.test} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", width: "100%", boxSizing: "border-box", height: "38px", marginTop: "10px", border: "2.5px solid #2B1E18", borderRadius: "12px", background: "#F2B63C", color: "#2B1E18", boxShadow: "var(--lift2)", font: "800 12.5px/1 'Bricolage Grotesque'", cursor: "pointer" }}><span style={{ font: `18px/1 ${ICON}` }}>play_circle</span>Coba bunyi</button>
        <div style={NOTE}>Tidak terdengar? Naikkan volume HP. Di iPhone, matikan mode senyap (sakelar di samping), karena mode itu juga membisukan game di browser.</div>
      </div>

      <div style={CARD}>
        <div style={HEAD}><span style={{ font: `21px/1 ${ICON}`, color: "#7E43B5" }}>palette</span>Tampilan</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "9px" }}>
          {a.themes.map(t => (
            <button key={t.id} onClick={t.pick} aria-pressed={t.on} style={{ padding: "9px 10px", textAlign: "left", border: `2.5px solid ${t.on ? '#2B1E18' : 'rgba(43,30,24,.2)'}`, borderRadius: "13px", background: t.on ? "#F2B63C" : "#FFF8EC", color: "#2B1E18", cursor: "pointer", boxShadow: t.on ? "var(--lift2)" : "none" }}>
              <span style={{ display: "block", font: `17px/1 ${t.id === 'klasik' ? "'Bagel Fat One',system-ui" : "'Lilita One',system-ui"}` }}>{t.label}</span>
              <span style={{ display: "block", font: "500 10.5px/1.3 'Bricolage Grotesque'", color: "#5B4A40", marginTop: "4px" }}>{t.desc}</span>
            </button>
          ))}
        </div>
        <Row icon="speed" color="#5E6E52" title="Mode Hemat" sub="Untuk HP ringan: tanpa efek cahaya dan partikel hiasan."><Toggle on={a.lite} onClick={a.toggleLite} label="Mode Hemat" /></Row>
      </div>

      <div style={CARD}>
        <div style={HEAD}><span style={{ font: `21px/1 ${ICON}`, color: "#3C78C8" }}>{a.email ? 'cloud_done' : 'cloud'}</span>Akun & data</div>
        <Row icon="person" color="#3C78C8" title={a.email || 'Belum masuk'} sub={a.email ? 'Progres tersimpan online.' : 'Masuk agar progres bisa dibuka di HP lain.'}>
          <button onClick={a.account} style={{ height: "34px", padding: "0 11px", border: "2px solid #2B1E18", borderRadius: "11px", background: "#FFF8EC", color: "#2B1E18", font: "800 12px/1 'Bricolage Grotesque'", cursor: "pointer" }}>{a.email ? 'Kelola' : 'Masuk'}</button>
        </Row>
        {a.install && (
          <Row icon="install_mobile" color="#D2532A" title="Pasang ke layar utama" sub={a.install.ios ? 'Safari: Bagikan → Tambah ke Layar Utama.' : 'Buka seperti aplikasi, bisa offline.'}>
            {a.install.prompt && <button onClick={a.install.go} style={{ height: "34px", padding: "0 11px", border: "2px solid #2B1E18", borderRadius: "11px", background: "#F2B63C", color: "#2B1E18", font: "800 12px/1 'Bricolage Grotesque'", cursor: "pointer" }}>Pasang</button>}
          </Row>
        )}
        <Row icon="share" color="#2F7A5C" title="Ajak teman main" sub="Kirim rekor Santoni dan link game.">
          <button onClick={a.shareGame} style={{ height: "34px", padding: "0 11px", border: "2px solid #2B1E18", borderRadius: "11px", background: "#FFF8EC", color: "#2B1E18", font: "800 12px/1 'Bricolage Grotesque'", cursor: "pointer" }}>Bagikan</button>
        </Row>
      </div>
      <div style={{ ...NOTE, textAlign: "center", marginTop: "14px" }}>Petualangan Santoni · santoni.vercel.app</div>
    </div>
  );
}
