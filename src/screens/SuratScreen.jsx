const ICON = "'Material Symbols Rounded'";
const BTN = { display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", height: "38px", boxSizing: "border-box", padding: "0 12px", border: "2.5px solid #2B1E18", borderRadius: "12px", boxShadow: "var(--lift3)", color: "#2B1E18", font: "800 12.5px/1 'Bricolage Grotesque'", cursor: "pointer" };

// Lobby mailbox: letters fold open on tap; attachments are claimed one by one or all at once.
export default function SuratScreen({ v }) {
  return (
    <div style={{ position: "absolute", top: "66px", left: "0", right: "0", bottom: "84px", overflowY: "auto", scrollbarWidth: "none", padding: "6px 14px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button onClick={v.mailBack} aria-label="Kembali" style={{ width: "38px", height: "38px", flex: "none", display: "grid", placeItems: "center", padding: "0", border: "2.5px solid #2B1E18", borderRadius: "12px", background: "#FFF8EC", boxShadow: "var(--lift3)", color: "#2B1E18", font: `22px/1 ${ICON}`, cursor: "pointer" }}>chevron_left</button>
        <div style={{ flex: "1", font: "28px/1 var(--display)" }}>Surat</div>
        <div style={{ font: "500 10.5px/1 'DM Mono',monospace", letterSpacing: ".06em", color: "#5E4A3F" }}>{v.letters.length} SURAT</div>
      </div>
      <div style={{ font: "500 13px/1.4 'Bricolage Grotesque'", color: "#5B4A40", marginTop: "6px" }}>Kiriman untuk Santoni. Sebagian berisi hadiah, sebagian berisi bebek.</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "12px" }}>
        <button onClick={v.mailClaimAll} style={{ ...BTN, background: v.mailUnclaimed ? "#F2B63C" : "#EADBC5", color: v.mailUnclaimed ? "#2B1E18" : "#6E5A4E" }}><span style={{ font: `17px/1 ${ICON}` }}>redeem</span>Ambil semua{v.mailUnclaimed ? ` (${v.mailUnclaimed})` : ''}</button>
        <button onClick={v.mailTidy} style={{ ...BTN, background: "#FFF8EC" }}><span style={{ font: `17px/1 ${ICON}` }}>inventory_2</span>Rapikan</button>
      </div>

      {v.letters.length === 0 && (
        <div style={{ marginTop: "30px", textAlign: "center", font: "600 13px/1.45 'Bricolage Grotesque'", color: "#5B4A40" }}>
          <div style={{ font: `44px/1 ${ICON}`, color: "#B9A994" }}>drafts</div>
          Kotak surat kosong. Bahkan Bebek Asuransi sedang libur.
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "14px" }}>
        {v.letters.map((l, i) => (
          <div key={l.id} style={{ border: "2.5px solid #2B1E18", borderRadius: "18px", background: l.unread ? "#FFFFFF" : "#FFF8EC", boxShadow: "var(--lift3)", overflow: "hidden", animation: v.still ? "none" : `cardUp .32s ${i * 0.05}s ease-out both` }}>
            <div onClick={l.toggle} role="button" aria-expanded={l.open} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", cursor: "pointer" }}>
              <span style={{ position: "relative", width: "40px", height: "40px", flex: "none", boxSizing: "border-box", display: "grid", placeItems: "center", border: "2px solid #2B1E18", borderRadius: "12px", background: l.color, color: "#FFF8EC", font: `21px/1 ${ICON}` }}>
                {l.icon}
                {l.unread && <span style={{ position: "absolute", top: "-5px", right: "-5px", width: "13px", height: "13px", boxSizing: "border-box", borderRadius: "50%", border: "2px solid #2B1E18", background: "#D2532A" }} />}
              </span>
              <div style={{ flex: "1", minWidth: "0" }}>
                <div style={{ font: `${l.unread ? 800 : 600} 13.5px/1.2 'Bricolage Grotesque'`, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: l.open ? "normal" : "nowrap" }}>{l.title}</div>
                <div style={{ font: "500 10.5px/1.2 'DM Mono',monospace", letterSpacing: ".04em", color: "#5E4A3F", marginTop: "3px" }}>{l.from.toUpperCase()} · {l.date}</div>
              </div>
              {l.hasGifts && <span style={{ font: `19px/1 ${ICON}`, color: l.claimed ? "#B9A994" : "#B0620A" }}>{l.claimed ? 'task_alt' : 'redeem'}</span>}
              <span style={{ font: `20px/1 ${ICON}`, color: "#5E4A3F", transform: l.open ? "rotate(180deg)" : "none", transition: "transform .2s" }}>expand_more</span>
            </div>
            {l.open && (
              <div style={{ padding: "2px 12px 12px", borderTop: "2px dashed rgba(43,30,24,.18)", animation: v.still ? "none" : "fadeIn .2s ease-out both" }}>
                <div style={{ font: "500 13px/1.5 'Bricolage Grotesque'", color: "#2B1E18", marginTop: "10px", textWrap: "pretty" }}>{l.body}</div>
                {l.hasGifts && (
                  <>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "10px" }}>
                      {l.gifts.map(gf => (
                        <span key={gf.key} style={{ display: "inline-flex", alignItems: "center", gap: "4px", height: "28px", padding: "0 9px 0 6px", boxSizing: "border-box", border: "2px solid #2B1E18", borderRadius: "10px", background: gf.bg, font: "800 12px/1 'Bricolage Grotesque'", opacity: l.claimed ? 0.55 : 1 }}>
                          <span style={{ font: `16px/1 ${ICON}` }}>{gf.icon}</span>{gf.text}
                        </span>
                      ))}
                    </div>
                    <button onClick={l.claim} disabled={l.claimed} style={{ ...BTN, width: "100%", marginTop: "10px", background: l.claimed ? "#EADBC5" : "#F2B63C", color: l.claimed ? "#6E5A4E" : "#2B1E18", cursor: l.claimed ? "default" : "pointer" }}>
                      <span style={{ font: `17px/1 ${ICON}` }}>{l.claimed ? 'task_alt' : 'redeem'}</span>{l.claimed ? 'Lampiran sudah diambil' : 'Ambil lampiran'}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
