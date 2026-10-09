const FIELD = { width: "100%", height: "40px", boxSizing: "border-box", padding: "0 12px", border: "2.5px solid #2B1E18", borderRadius: "12px", background: "#FFFFFF", color: "#2B1E18", font: "600 14px/1 'Bricolage Grotesque'", outline: "none" };
const BTN = { display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", height: "40px", boxSizing: "border-box", border: "2.5px solid #2B1E18", borderRadius: "12px", boxShadow: "var(--lift3)", color: "#2B1E18", font: "800 13px/1 'Bricolage Grotesque'", cursor: "pointer" };

const ICON = { font: "17px/1 'Material Symbols Rounded'" };
const NOTE = { font: "600 12px/1.4 'Bricolage Grotesque'", color: "#A93D1C", marginTop: "8px", textWrap: "pretty" };
const TEXT = { font: "500 12px/1.4 'Bricolage Grotesque'", color: "#5B4A40" };
const LINK = { display: "block", margin: "10px auto 0", padding: "4px 8px", border: "0", background: "none", color: "#A93D1C", font: "800 12.5px/1 'Bricolage Grotesque'", cursor: "pointer" };

function Submit({ a, icon, label }) {
  return (
    <button type="submit" disabled={a.busy} style={{ ...BTN, width: "100%", marginTop: "10px", background: a.busy ? "#EADBC5" : "#3C78C8", color: a.busy ? "#6E5A4E" : "#FFF8EC", cursor: a.busy ? "default" : "pointer" }}>
      <span style={ICON}>{icon}</span>{a.busy ? 'Sebentar…' : label}
    </button>
  );
}

// Sign-in card for the online save. Signed in, it shows the account and the last upload;
// opened from a reset email, it asks for a new password first.
function AccountCard({ a }) {
  const reset = a.user && a.mode === 'reset';
  return (
    <div style={{ marginTop: "14px", padding: "12px 14px 14px", border: "2.5px solid #2B1E18", borderRadius: "18px", background: "#FFF8EC", boxShadow: "var(--lift3)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ font: "22px/1 'Material Symbols Rounded'", color: "#3C78C8" }}>{reset ? 'key' : a.user ? 'cloud_done' : 'cloud'}</span>
        <div style={{ font: "16px/1.1 var(--display)" }}>{reset ? 'Buat sandi baru' : a.mode === 'lupa' && !a.user ? 'Lupa sandi' : 'Akun online'}</div>
      </div>
      {a.checking && !a.user && <div style={{ ...TEXT, marginTop: "6px" }}>Memeriksa akun…</div>}
      {reset ? (
        <form onSubmit={a.submit} style={{ marginTop: "6px" }}>
          <div style={TEXT}>Untuk akun <b style={{ color: "#2B1E18", wordBreak: "break-all" }}>{a.user.email}</b>. Ketik sandi baru dua kali.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "10px" }}>
            <input type="password" name="new-password" autoComplete="new-password" placeholder="Sandi baru (min. 6 karakter)" value={a.password} onChange={a.setPassword} style={FIELD} />
            <input type="password" name="confirm-password" autoComplete="new-password" placeholder="Ulangi sandi baru" value={a.password2} onChange={a.setPassword2} style={FIELD} />
          </div>
          {a.note && <div role="status" style={NOTE}>{a.note}</div>}
          <Submit a={a} icon="lock_reset" label="Simpan sandi baru" />
        </form>
      ) : a.user ? (
        <>
          <div style={{ ...TEXT, marginTop: "6px" }}>Masuk sebagai <b style={{ color: "#2B1E18", wordBreak: "break-all" }}>{a.user.email}</b>. Progres disimpan ke server otomatis, jadi bisa dilanjutkan di HP lain.</div>
          <div style={{ font: "500 10.5px/1.2 'DM Mono',monospace", letterSpacing: ".04em", color: "#2F7A5C", marginTop: "6px" }}>{a.status}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "10px" }}>
            <button onClick={a.saveNow} style={{ ...BTN, background: "#F2B63C" }}><span style={ICON}>cloud_upload</span>Simpan sekarang</button>
            <button onClick={a.logout} style={{ ...BTN, background: "#FFF8EC" }}><span style={ICON}>logout</span>Keluar</button>
          </div>
        </>
      ) : !a.checking && a.mode === 'lupa' ? (
        <form onSubmit={a.submit} style={{ marginTop: "6px" }}>
          <div style={TEXT}>Tulis email akunmu. Kami kirim tautan untuk membuat sandi baru.</div>
          <input type="email" name="email" autoComplete="email" inputMode="email" placeholder="Email" value={a.email} onChange={a.setEmail} style={{ ...FIELD, marginTop: "10px" }} />
          {a.note && <div role="status" style={NOTE}>{a.note}</div>}
          <Submit a={a} icon="mail" label="Kirim tautan reset" />
          <button type="button" onClick={() => a.setMode('masuk')} style={LINK}>Kembali ke Masuk</button>
        </form>
      ) : !a.checking && (
        <form onSubmit={a.submit} style={{ marginTop: "8px" }}>
          <div style={TEXT}>Masuk supaya progres tersimpan di server dan bisa dibuka dari perangkat lain.</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px", padding: "3px", marginTop: "10px", borderRadius: "12px", background: "#2B1E18" }}>
            {[['masuk', 'Masuk'], ['daftar', 'Daftar baru']].map(([k, label]) => (
              <button key={k} type="button" onClick={() => a.setMode(k)} style={{ height: "32px", border: "0", borderRadius: "9px", background: a.mode === k ? "#F2B63C" : "transparent", color: a.mode === k ? "#2B1E18" : "#FFF8EC", font: "800 12.5px/1 'Bricolage Grotesque'", cursor: "pointer", transition: "background .2s" }}>{label}</button>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "10px" }}>
            <input type="email" name="email" autoComplete="email" inputMode="email" placeholder="Email" value={a.email} onChange={a.setEmail} style={FIELD} />
            <input type="password" name="password" autoComplete={a.mode === 'daftar' ? 'new-password' : 'current-password'} placeholder={a.mode === 'daftar' ? 'Buat sandi (min. 6 karakter)' : 'Sandi'} value={a.password} onChange={a.setPassword} style={FIELD} />
          </div>
          {a.note && <div role="status" style={NOTE}>{a.note}</div>}
          <Submit a={a} icon={a.mode === 'daftar' ? 'person_add' : 'login'} label={a.mode === 'daftar' ? 'Buat akun' : 'Masuk'} />
          {a.mode === 'masuk' && <button type="button" onClick={() => a.setMode('lupa')} style={LINK}>Lupa sandi?</button>}
          {a.status && <div style={{ ...TEXT, font: "500 11px/1.4 'Bricolage Grotesque'", marginTop: "8px" }}>{a.status}</div>}
        </form>
      )}
    </div>
  );
}

export default function Journal({ v }) {
  return (
    <div style={{ position: "absolute", top: "66px", left: "0", right: "0", bottom: "84px", overflowY: "auto", scrollbarWidth: "none", padding: "6px 14px 20px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "8px" }}>
        <div style={{ font: "28px/1 var(--display)" }}>Jurnal</div>
        <div style={{ font: "500 10px/1 'DM Mono',monospace", letterSpacing: ".08em", color: "#5E4A3F" }}>{v.journalSummary}</div>
      </div>
      <div style={{ font: "500 13px/1.4 'Bricolage Grotesque'", color: "#5B4A40", marginTop: "6px" }}>Semua yang terjadi di perjalanan. Santoni tidak pernah membacanya.</div>
      {v.acct.online && <AccountCard a={v.acct} />}
      {v.install && (
        <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "11px", padding: "11px 12px", border: "2.5px solid #2B1E18", borderRadius: "18px", background: "linear-gradient(90deg,#FBE3B8,#FFF8EC)", boxShadow: "var(--lift3)" }}>
          <img src="/icons/icon-192.png" alt="" width="44" height="44" style={{ flex: "none", borderRadius: "12px", border: "2px solid #2B1E18" }} />
          <div style={{ flex: "1", minWidth: "0" }}>
            <div style={{ font: "16px/1.1 var(--display)" }}>Pasang ke layar utama</div>
            <div style={{ font: "500 11.5px/1.35 'Bricolage Grotesque'", color: "#5B4A40", marginTop: "3px" }}>{v.install.ios ? 'Di Safari: ketuk tombol Bagikan, lalu "Tambah ke Layar Utama".' : 'Buka seperti aplikasi, tanpa bilah browser. Bisa dimainkan offline.'}</div>
          </div>
          {v.install.prompt && <button onClick={v.install.go} style={{ flex: "none", height: "38px", padding: "0 12px", border: "2.5px solid #2B1E18", borderRadius: "12px", background: "#F2B63C", color: "#2B1E18", boxShadow: "var(--lift2)", font: "800 12.5px/1 'Bricolage Grotesque'", cursor: "pointer" }}>Pasang</button>}
        </div>
      )}
      <div style={{ marginTop: "12px", padding: "11px 14px 13px", border: "2.5px solid #2B1E18", borderRadius: "18px", background: "#FFF8EC", boxShadow: "var(--lift3)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ font: "21px/1 'Material Symbols Rounded'", color: "#7E43B5" }}>palette</span>
          <div style={{ font: "16px/1.1 var(--display)" }}>Tampilan</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "9px" }}>
          {v.themes.map(t => (
            <button key={t.id} onClick={t.pick} aria-pressed={t.on} style={{ padding: "9px 10px", textAlign: "left", border: `2.5px solid ${t.on ? '#2B1E18' : 'rgba(43,30,24,.2)'}`, borderRadius: "13px", background: t.on ? "#F2B63C" : "#FFF8EC", color: "#2B1E18", cursor: "pointer", boxShadow: t.on ? "var(--lift2)" : "none" }}>
              <span style={{ display: "block", font: `17px/1 ${t.id === 'klasik' ? "'Bagel Fat One',system-ui" : "'Lilita One',system-ui"}` }}>{t.label}</span>
              <span style={{ display: "block", font: "500 10.5px/1.3 'Bricolage Grotesque'", color: "#5B4A40", marginTop: "4px" }}>{t.desc}</span>
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "14px" }}>
        {v.journal.map((j, i) => (
            <div key={j.key ?? j.id ?? i} style={{ border: "2.5px solid #2B1E18", borderRadius: "20px", background: "#FFF8EC", boxShadow: "var(--lift3)", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderBottom: "2px dashed rgba(43,30,24,.2)", background: j.headBg }}>
                <span style={{ width: "34px", height: "34px", flex: "none", boxSizing: "border-box", display: "grid", placeItems: "center", border: "2px solid #2B1E18", borderRadius: "10px", background: "#FFF8EC", font: "19px/1 'Material Symbols Rounded'" }}>{j.icon}</span>
                <div style={{ flex: "1", minWidth: "0" }}>
                  <div style={{ font: "16px/1.1 var(--display)" }}>{j.title}</div>
                  <div style={{ font: "500 10.5px/1.2 'DM Mono',monospace", letterSpacing: ".06em", color: "#5B4A40", marginTop: "3px" }}>{j.sub}</div>
                </div>
                <span style={{ padding: "4px 8px", borderRadius: "8px", background: "#2B1E18", color: "#FFF8EC", font: "500 10.5px/1 'DM Mono',monospace", letterSpacing: ".06em" }}>{j.badge}</span>
                <button onClick={j.share} aria-label="Bagikan catatan ini" style={{ width: "32px", height: "32px", flex: "none", display: "grid", placeItems: "center", padding: "0", border: "2px solid #2B1E18", borderRadius: "10px", background: "#3C78C8", color: "#FFF8EC", font: "17px/1 'Material Symbols Rounded'", cursor: "pointer" }}>share</button>
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
        <div style={{ font: "16px/1.1 var(--display)" }}>Cadangan progres</div>
        <div style={{ font: "500 12px/1.4 'Bricolage Grotesque'", color: "#5B4A40", marginTop: "4px" }}>Tanpa akun, progres hanya tersimpan di browser ini. Kode ini bisa dipakai untuk pindah perangkat tanpa login.</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "10px" }}>
          <button onClick={v.copyBackup} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", height: "38px", border: "2.5px solid #2B1E18", borderRadius: "12px", background: "#F2B63C", boxShadow: "var(--lift3)", color: "#2B1E18", font: "800 12.5px/1 'Bricolage Grotesque'", cursor: "pointer" }}><span style={{ font: "17px/1 'Material Symbols Rounded'" }}>content_copy</span>Salin kode</button>
          <button onClick={v.loadBackup} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", height: "38px", border: "2.5px solid #2B1E18", borderRadius: "12px", background: "#FFF8EC", boxShadow: "var(--lift3)", color: "#2B1E18", font: "800 12.5px/1 'Bricolage Grotesque'", cursor: "pointer" }}><span style={{ font: "17px/1 'Material Symbols Rounded'" }}>upload</span>Muat kode</button>
        </div>
      </div>
    </div>
  );
}
