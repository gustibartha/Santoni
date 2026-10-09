import ItemArt from '../characters/ItemArt.jsx';

const ICON = "'Material Symbols Rounded'";
const CARD = { border: "2.5px solid #2B1E18", borderRadius: "18px", background: "#FFF8EC", boxShadow: "var(--lift3)" };
const MONO = { font: "500 10px/1 'DM Mono',monospace", letterSpacing: ".08em", color: "#5E4A3F" };

// Daily challenge: today's seeded map, the player's result, and the public board.
export default function HarianScreen({ v }) {
  const h = v.harian, b = h.board;
  return (
    <div style={{ position: "absolute", top: "66px", left: "0", right: "0", bottom: "84px", overflowY: "auto", scrollbarWidth: "none", padding: "6px 14px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button onClick={h.back} aria-label="Kembali" style={{ width: "38px", height: "38px", flex: "none", display: "grid", placeItems: "center", padding: "0", border: "2.5px solid #2B1E18", borderRadius: "12px", background: "#FFF8EC", boxShadow: "var(--lift3)", color: "#2B1E18", font: `22px/1 ${ICON}`, cursor: "pointer" }}>chevron_left</button>
        <div style={{ flex: "1", minWidth: "0" }}>
          <div style={{ font: "26px/1 var(--display)" }}>Tantangan Harian</div>
          <div style={{ ...MONO, marginTop: "4px" }}>{h.date.toUpperCase()}</div>
        </div>
      </div>

      <div style={{ ...CARD, marginTop: "12px", padding: "12px", background: "linear-gradient(180deg,#FFF8EC,#FBE9C8)" }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div style={{ width: "64px", height: "64px", flex: "none", display: "grid", placeItems: "center", border: "2.5px solid #2B1E18", borderRadius: "16px", background: "#FFF8EC" }}><ItemArt id={h.weapon} size={46} /></div>
          <div style={{ flex: "1", minWidth: "0" }}>
            <div style={MONO}>PETA HARI INI · SAMA UNTUK SEMUA</div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "4px", font: "19px/1.1 var(--display)" }}><span style={{ font: `20px/1 ${ICON}`, color: "#D2532A" }}>{h.chapterIcon}</span>{h.chapter}</div>
            <div style={{ font: "600 12px/1.3 'Bricolage Grotesque'", color: "#5B4A40", marginTop: "3px" }}>Senjata: {h.weaponName}{h.rule ? ` · Aturan: ${h.rule}` : ''}</div>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "10px" }}>
          {[`${h.days} hari`, `ATK ${h.stats.atk} · HP ${h.stats.hp}`, 'Tanpa rekan & pet', 'Sekali sehari'].map(t => (
            <span key={t} style={{ padding: "4px 8px", borderRadius: "8px", border: "1.5px solid #2B1E18", background: "#FFF8EC", font: "700 11px/1 'Bricolage Grotesque'" }}>{t}</span>
          ))}
        </div>
        <div style={{ font: "500 11.5px/1.4 'Bricolage Grotesque'", color: "#5B4A40", marginTop: "8px" }}>Bekal awal, kejadian, dan musuh sama untuk semua pemain. Skor: hari × 100, musuh × 30, bonus tamat dan sisa HP.</div>
        {h.done ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "11px", padding: "10px 12px", border: "2.5px solid #2B1E18", borderRadius: "14px", background: "#2B1E18", color: "#FFF8EC" }}>
            <span style={{ font: `26px/1 ${ICON}`, color: "#F2B63C" }}>{h.win ? 'emoji_events' : 'flag'}</span>
            <div style={{ flex: "1" }}>
              <div style={{ ...MONO, color: "#F2B63C" }}>SKOR HARI INI</div>
              <div style={{ font: "24px/1.05 var(--display)", marginTop: "3px" }}>{h.score}</div>
              <div style={{ font: "500 11px/1.3 'Bricolage Grotesque'", color: "#E8DCCB" }}>{h.win ? 'Tamat' : `Sampai hari ${h.reached}`} · peta baru dalam {h.resetIn}</div>
            </div>
          </div>
        ) : h.playing ? (
          <button onClick={h.resume} className="dc-press" style={{ boxSizing: "border-box", width: "100%", height: "52px", marginTop: "11px", border: "3px solid #2B1E18", borderRadius: "16px", background: "#3C78C8", color: "#FFF8EC", boxShadow: "var(--lift4)", font: "20px/1 var(--display)", cursor: "pointer", '--press-tf': "translateY(3px)", '--press-sh': "var(--lift2)" }}>Lanjutkan perjalanan</button>
        ) : (
          <button onClick={h.start} className="dc-press" style={{ boxSizing: "border-box", width: "100%", height: "56px", marginTop: "11px", border: "3px solid #2B1E18", borderRadius: "16px", background: "#D2532A", color: "#FFF8EC", boxShadow: "var(--lift5)", font: "24px/1 var(--display)", cursor: "pointer", '--press-tf': "translateY(4px)", '--press-sh': "var(--lift2)" }}>MULAI · GRATIS</button>
        )}
      </div>

      {h.done && !h.submitted && (
        <div style={{ ...CARD, marginTop: "10px", padding: "10px 12px", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ font: `22px/1 ${ICON}`, color: "#3C78C8" }}>cloud_upload</span>
          <div style={{ flex: "1", font: "600 12px/1.35 'Bricolage Grotesque'", color: "#5B4A40" }}>{h.loggedIn ? 'Skor belum terkirim ke papan peringkat.' : 'Masuk ke akun supaya skor ini tampil di papan peringkat.'}</div>
          <button onClick={h.loggedIn ? h.submit : h.login} style={{ height: "36px", padding: "0 12px", border: "2.5px solid #2B1E18", borderRadius: "12px", background: "#F2B63C", color: "#2B1E18", font: "800 12px/1 'Bricolage Grotesque'", cursor: "pointer" }}>{h.loggedIn ? 'Kirim' : 'Masuk'}</button>
        </div>
      )}

      {h.loggedIn && (
        <label style={{ ...CARD, marginTop: "10px", padding: "9px 12px", display: "flex", alignItems: "center", gap: "8px", boxShadow: "none" }}>
          <span style={{ ...MONO, flex: "none" }}>NAMA DI PAPAN</span>
          <input value={h.nick} onChange={h.setNick} maxLength={20} disabled={h.submitted} aria-label="Nama di papan peringkat" style={{ flex: "1", minWidth: "0", height: "32px", boxSizing: "border-box", padding: "0 10px", border: "2px solid #2B1E18", borderRadius: "10px", background: h.submitted ? "#EADBC5" : "#FFFFFF", color: "#2B1E18", font: "700 13px/1 'Bricolage Grotesque'", outline: "none" }} />
        </label>
      )}

      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: "16px" }}>
        <div style={{ font: "19px/1 var(--display)" }}>Papan peringkat</div>
        <button onClick={h.refresh} style={{ display: "flex", alignItems: "center", gap: "3px", border: "0", background: "none", color: "#A93D1C", font: "800 12px/1 'Bricolage Grotesque'", cursor: "pointer" }}><span style={{ font: `16px/1 ${ICON}` }}>refresh</span>Muat ulang</button>
      </div>
      {b && b.rank && <div style={{ ...MONO, marginTop: "6px", color: "#2F7A5C" }}>PERINGKATMU: #{b.rank} DARI {b.total}</div>}
      <div style={{ ...CARD, marginTop: "8px", overflow: "hidden" }}>
        {!b || b.loading && !b.rows.length ? <div style={{ padding: "16px", textAlign: "center", font: "600 12.5px/1.4 'Bricolage Grotesque'", color: "#5B4A40" }}>Memuat papan…</div>
          : b.error ? <div style={{ padding: "16px", textAlign: "center", font: "600 12.5px/1.4 'Bricolage Grotesque'", color: "#A93D1C" }}>Papan tidak bisa dimuat. Periksa internet.</div>
          : b.rows.length === 0 ? <div style={{ padding: "16px", textAlign: "center", font: "600 12.5px/1.4 'Bricolage Grotesque'", color: "#5B4A40" }}>Belum ada skor hari ini. Jadilah yang pertama.</div>
          : b.rows.map(row => (
            <div key={row.rank} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 12px", borderTop: row.rank > 1 ? "1.5px dashed rgba(43,30,24,.15)" : "none", background: row.mine ? "#FBE9C8" : "transparent" }}>
              <span style={{ width: "28px", flex: "none", textAlign: "center", font: "17px/1 var(--display)", color: row.rank <= 3 ? ['#B0620A', '#6E7C85', '#8E5A2B'][row.rank - 1] : "#5E4A3F" }}>{row.rank}</span>
              <span style={{ flex: "1", minWidth: "0", font: "700 13px/1.2 'Bricolage Grotesque'", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.name}{row.mine ? ' (kamu)' : ''}</span>
              <span style={{ ...MONO }}>{row.win ? 'TAMAT' : row.reached ? `H${row.reached}` : ''}</span>
              <span style={{ font: "16px/1 var(--display)" }}>{row.score}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
