import Santoni from '../characters/Santoni.jsx';
import Musuh from '../characters/Musuh.jsx';
import SkillArt from '../characters/SkillArt.jsx';
import MusicButton from '../components/MusicButton.jsx';
import PetArt from '../characters/PetArt.jsx';

export default function Run({ v }) {
  return (
    <div style={{ position: "absolute", inset: "0", display: "flex", flexDirection: "column", gap: "10px", padding: "14px 12px 12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: "none" }}>
        <button onClick={v.toggleAuto} style={{ width: "42px", height: "42px", flex: "none", display: "grid", placeItems: "center", padding: "0", border: "2.5px solid #2B1E18", borderRadius: "14px", background: "#FFF8EC", boxShadow: "var(--lift3)", color: "#2B1E18", font: "24px/1 'Material Symbols Rounded'", cursor: "pointer" }}>{v.pauseIcon}</button>
        <div style={{ flex: "1", minWidth: "0" }}>
          <div style={{ font: "500 10px/1.2 'DM Mono',monospace", letterSpacing: ".08em", color: "#A93D1C", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>BAB {v.runChapterNo} · {v.runChapterUpper}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "5px", marginTop: "3px" }}>
            <span style={{ font: "26px/1 var(--display)" }}>Hari {v.day}</span>
            <span style={{ font: "700 14px/1 'Bricolage Grotesque'", color: "#5E4A3F" }}>/ {v.maxDay}</span>
          </div>
        </div>
        <MusicButton v={v} />
        <div style={{ display: "flex", alignItems: "center", gap: "5px", height: "30px", padding: "0 10px 0 5px", borderRadius: "15px", background: "#2B1E18", color: "#FFF8EC", font: "700 13px/1 'Bricolage Grotesque'" }}>
          <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#F2B63C", boxShadow: "inset 0 0 0 2px #C28A16,inset 0 0 0 5px #F2B63C,inset 0 0 0 6.5px #C28A16" }} />
          {v.runCoins}
        </div>
      </div>
      <div style={{ position: "relative", height: "14px", flex: "none", margin: "2px 14px 2px 4px" }}>
        <div style={{ position: "absolute", inset: "0", boxSizing: "border-box", border: "2.5px solid #2B1E18", borderRadius: "8px", background: "#EADBC5", overflow: "hidden" }}><div style={{ height: "100%", width: v.dayPct, background: "#D2532A", transition: "width .4s" }} /></div>
        {(v.miniMarks || []).map(m => (
          <div key={m.d} title={`Minibos hari ${m.d}`} style={{ position: "absolute", left: m.left, top: "50%", transform: "translate(-50%,-50%)", width: "18px", height: "18px", boxSizing: "border-box", display: "grid", placeItems: "center", border: "2px solid #2B1E18", borderRadius: "6px", background: m.done ? "#B9A994" : "#7E43B5", color: "#FFF8EC", font: "12px/1 'Material Symbols Rounded'" }}>skull</div>
        ))}
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "24px", height: "24px", boxSizing: "border-box", display: "grid", placeItems: "center", border: "2.5px solid #2B1E18", borderRadius: "8px", background: "#F2B63C", color: "#2B1E18", font: "14px/1 'Material Symbols Rounded'" }}>swords</div>
        <div style={{ position: "absolute", right: "-12px", top: "50%", transform: "translateY(-50%)", width: "28px", height: "28px", boxSizing: "border-box", display: "grid", placeItems: "center", border: "2.5px solid #2B1E18", borderRadius: "9px", background: "#2B1E18", color: "#F2B63C", font: "17px/1 'Material Symbols Rounded'" }}>local_fire_department</div>
      </div>
      <div style={{ position: "relative", height: "168px", flex: "none", border: "2.5px solid #2B1E18", borderRadius: "22px", overflow: "hidden", backgroundColor: v.sceneSky, backgroundImage: "radial-gradient(rgba(43,30,24,.1) 1.2px,transparent 1.5px)", backgroundSize: "10px 10px", boxShadow: "var(--lift3)" }}>
        <div style={{ position: "absolute", right: "120px", top: "22px", width: "30px", height: "30px", boxSizing: "border-box", borderRadius: "50%", border: "2.5px solid #2B1E18", background: "#F2B63C" }} />
        {v.cloudStrip}
        {v.farStrip}
        {v.treeStrip}
        <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", height: "40px", background: v.sceneGround, borderTop: "2.5px solid #2B1E18" }} />
        {v.groundStrip}
        {v.walkPose === 'walk' && !v.still && (
          <div style={{ position: "absolute", left: "96px", bottom: "12px", width: "0", height: "0", pointerEvents: "none" }}>
            {[0, 1, 2].map(i => <span key={i} style={{ position: "absolute", left: "-8px", top: "-8px", width: "16px", height: "16px", borderRadius: "50%", background: "rgba(255,248,236,.9)", border: "2px solid rgba(43,30,24,.3)", animation: `dustTrail .78s ${i * 0.26}s ease-out infinite` }} />)}
          </div>
        )}
        <div style={{ position: "absolute", left: "52px", bottom: "8px", width: "122px", height: "134px" }}><Santoni side pose={v.walkPose} still={v.still} /></div>
        {v.activePet && <div style={{ position: "absolute", left: "12px", bottom: "10px", pointerEvents: "none" }}><PetArt id={v.activePet} size={46} hop={v.walkPose === 'walk'} still={v.still} /></div>}
        {v.sceneEnemy && (
          <div style={{ position: "absolute", right: "26px", bottom: "12px", width: "112px", height: "112px" }}><Musuh kind={v.sceneEnemyKind} still={v.still} flip={true} /></div>
        )}
        {v.sceneQuestion && (
          <div style={{ position: "absolute", left: "156px", top: "34px", width: "34px", height: "34px", boxSizing: "border-box", display: "grid", placeItems: "center", border: "2.5px solid #2B1E18", borderRadius: "12px", background: "#F2B63C", font: "22px/1 var(--display)", transform: "rotate(8deg)" }}>?</div>
        )}
        <div style={{ position: "absolute", top: "10px", left: "10px", display: "flex", alignItems: "center", gap: "5px", padding: "5px 9px 5px 6px", borderRadius: "11px", border: "2px solid #2B1E18", background: "#FFF8EC", font: "700 11px/1 'Bricolage Grotesque'", pointerEvents: "none" }}>
          <span style={{ font: "15px/1 'Material Symbols Rounded'", color: "#C28A16" }}>{v.weatherIcon}</span>
          {v.weather}
        </div>
        <div style={{ position: "absolute", right: "10px", top: "10px", padding: "5px 9px", borderRadius: "10px", background: "#2B1E18", color: "#FFF8EC", font: "500 10.5px/1 'DM Mono',monospace", letterSpacing: ".06em", pointerEvents: "none" }}>{v.walkStatus}</div>
      </div>
      {v.runChips.length > 0 && (
        <div style={{ display: "flex", gap: "6px", flex: "none", overflowX: "auto", scrollbarWidth: "none" }}>
          {v.runChips.map(c => (
            <button key={c.key} onClick={c.tap} style={{ display: "inline-flex", alignItems: "center", gap: "4px", flex: "none", height: "26px", padding: "0 9px 0 6px", border: "2px solid #2B1E18", borderRadius: "9px", background: c.bg, color: "#FFF8EC", font: "700 11.5px/1 'Bricolage Grotesque'", cursor: "pointer", whiteSpace: "nowrap" }}>
              <span style={{ font: "15px/1 'Material Symbols Rounded'" }}>{c.icon}</span>{c.label}
            </button>
          ))}
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: "none" }}>
        <div style={{ width: "50px", height: "50px", flex: "none", boxSizing: "border-box", display: "grid", placeItems: "center", border: "2.5px solid #2B1E18", borderRadius: "50%", background: "#F2B63C", boxShadow: "var(--lift3)", textAlign: "center" }}>
          <div>
            <div title="Level perjalanan (mulai dari 1 di setiap perjalanan)" style={{ font: "500 7.5px/1.05 'DM Mono',monospace", letterSpacing: ".04em" }}>LV<br />JALAN</div>
            <div style={{ font: "20px/1 var(--display)", marginTop: "1px" }}>{v.lvl}</div>
          </div>
        </div>
        <div style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ position: "relative", height: "20px", boxSizing: "border-box", border: "2.5px solid #2B1E18", borderRadius: "10px", background: "#3A2A22", overflow: "hidden" }}>
            <div style={{ height: "100%", width: v.hpPct, background: "#4FAE72", transition: "width .3s" }} />
            <div style={{ position: "absolute", inset: "0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 8px", color: "#FFF8EC", font: "800 11px/1 'Bricolage Grotesque'", textShadow: "0 1px 0 #2B1E18,1px 0 0 #2B1E18,-1px 0 0 #2B1E18,0 -1px 0 #2B1E18" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                <span style={{ font: "12px/1 'Material Symbols Rounded'" }}>favorite</span>
                HP
              </span>
              <span>{v.hpLabel}</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ flex: "1", height: "9px", boxSizing: "border-box", border: "2px solid #2B1E18", borderRadius: "5px", background: "#EADBC5", overflow: "hidden" }}><div style={{ height: "100%", width: v.xpPct, background: "#F2B63C", transition: "width .3s" }} /></div>
            <span style={{ font: "500 10.5px/1 'DM Mono',monospace", whiteSpace: "nowrap" }}>XP {v.xpLabel}</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px", flex: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", height: "22px", padding: "0 8px 0 6px", border: "2px solid #2B1E18", borderRadius: "8px", background: "#FFF8EC", font: "800 12px/1 'Bricolage Grotesque'" }}>
            <span style={{ font: "13px/1 'Material Symbols Rounded'", color: "#D2532A" }}>swords</span>
            {v.atk}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", height: "22px", padding: "0 8px 0 6px", border: "2px solid #2B1E18", borderRadius: "8px", background: "#FFF8EC", font: "800 12px/1 'Bricolage Grotesque'" }}>
            <span style={{ font: "13px/1 'Material Symbols Rounded'", color: "#3166B0" }}>shield</span>
            {v.def}
          </div>
        </div>
      </div>
      <div style={{ position: "relative", flex: "1", minHeight: "0", border: "2.5px solid #2B1E18", borderRadius: "20px", background: "#FFF8EC", boxShadow: "var(--lift3)", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "0", left: "0", right: "0", zIndex: "1", display: "flex", justifyContent: "space-between", padding: "9px 14px 7px", background: "#FFF8EC", borderBottom: "1.5px dashed rgba(43,30,24,.25)", font: "500 10px/1 'DM Mono',monospace", letterSpacing: ".08em", color: "#5E4A3F" }}>
          <span>CATATAN PERJALANAN</span>
          <span>{v.logCount} ENTRI</span>
        </div>
        <div ref={v.logRef} style={{ position: "absolute", top: "28px", left: "0", right: "0", bottom: "0", overflowY: "auto", padding: "2px 14px 14px", scrollbarWidth: "none", display: "flex", flexDirection: "column-reverse" }}>
          <div>
            {v.log.map((e, i) => (
                <div key={e.key ?? e.id ?? i} style={{ display: "grid", gridTemplateColumns: "38px minmax(0,1fr)", gap: "10px", padding: "10px 0", borderBottom: "1.5px dashed rgba(43,30,24,.14)" }}>
                  <div style={{ alignSelf: "start", padding: "4px 0", textAlign: "center", border: `1.5px solid ${e.stampColor}`, borderRadius: "6px", color: e.stampColor, font: "500 10.5px/1 'DM Mono',monospace", transform: "rotate(-4deg)" }}>{e.stamp}</div>
                  <div style={{ minWidth: "0" }}>
                    <div style={{ font: "500 14px/1.42 'Bricolage Grotesque'", textWrap: "pretty" }}>{e.text}</div>
                    {e.hasFx && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "6px" }}>
                        {e.fx.map((f, i) => (
                            <span key={f.key ?? f.id ?? i} style={{ display: "inline-flex", alignItems: "center", gap: "3px", padding: "3px 7px 3px 5px", borderRadius: "8px", border: "1.5px solid #2B1E18", background: f.bg, color: "#2B1E18", font: "700 11px/1 'Bricolage Grotesque'" }}>
                              <span style={{ font: "12px/1 'Material Symbols Rounded'" }}>{f.icon}</span>
                              {f.label}
                            </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: "none", height: "54px" }}>
        <div style={{ flex: "1", minWidth: "0", height: "100%", boxSizing: "border-box", display: "flex", alignItems: "center", gap: "8px", padding: "0 9px", border: "2.5px solid #2B1E18", borderRadius: "16px", background: "#FFF8EC", boxShadow: "var(--lift3)", overflowX: "auto", overflowY: "hidden", scrollbarWidth: "none" }}>
          {v.noSkills && (
            <span style={{ font: "600 12px/1.25 'Bricolage Grotesque'", color: "#5E4A3F" }}>Belum ada skill. Santoni mengandalkan wajah.</span>
          )}
          {v.ownedSkills.map((k, i) => (
              <div key={k.key ?? k.id ?? i} onClick={k.tap} style={{ cursor: "pointer", position: "relative", width: "34px", height: "34px", flex: "none", boxSizing: "border-box", display: "grid", placeItems: "center", border: "2px solid #2B1E18", borderRadius: "10px", background: k.bg, color: k.fg, font: "19px/1 'Material Symbols Rounded'" }}>
                <SkillArt id={k.id} size={26} />
                {k.multi && (
                  <span style={{ position: "absolute", right: "-5px", bottom: "-5px", minWidth: "16px", height: "16px", padding: "0 3px", boxSizing: "border-box", borderRadius: "8px", background: "#2B1E18", color: "#FFF8EC", font: "800 9px/16px 'Bricolage Grotesque'", textAlign: "center" }}>{k.count}</span>
                )}
              </div>
          ))}
        </div>
        <button onClick={v.cycleSpeed} className="dc-press" style={{ width: "54px", height: "54px", flex: "none", padding: "0", border: "2.5px solid #2B1E18", borderRadius: "16px", background: "#FFF8EC", boxShadow: "var(--lift3)", color: "#2B1E18", font: "18px/1 var(--display)", cursor: "pointer", '--press-tf': "translateY(2px)", '--press-sh': "0 1px 0 #2B1E18" }}>{v.speedLabel}</button>
        <button onClick={v.quitRun} style={{ height: "54px", flex: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "3px", padding: "0 12px", border: "2.5px solid #2B1E18", borderRadius: "16px", background: "#2B1E18", boxShadow: "0 3px 0 #120C09", color: "#FFF8EC", font: "700 11px/1 'Bricolage Grotesque'", cursor: "pointer" }}>
          <span style={{ font: "20px/1 'Material Symbols Rounded'", color: "#F2B63C" }}>home</span>
          Pulang
        </button>
      </div>
      {v.hasEvent && (
        <div style={{ position: "absolute", left: "12px", right: "12px", bottom: "78px", zIndex: "8", animation: v.still ? "none" : "cardUp .32s cubic-bezier(.2,1.1,.4,1) both", padding: "16px 16px 14px", border: "3px solid #2B1E18", borderRadius: "24px", background: "#FFF8EC", boxShadow: "0 6px 0 #2B1E18,0 22px 44px rgba(43,30,24,.38)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
            <span style={{ padding: "5px 8px", borderRadius: "8px", background: v.evTagBg, color: "#FFF8EC", font: "500 10px/1 'DM Mono',monospace", letterSpacing: ".08em" }}>{v.evTag}</span>
            <span style={{ font: "500 10px/1 'DM Mono',monospace", letterSpacing: ".08em", color: "#5E4A3F" }}>HARI {v.day}</span>
          </div>
          {v.evIsEnemy && (
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "12px" }}>
              <div style={{ position: "relative", width: "60px", height: "60px", flex: "none", boxSizing: "border-box", border: "2.5px solid #2B1E18", borderRadius: "16px", background: "#E7D9F5", boxShadow: "var(--lift3)", overflow: "hidden" }}><div style={{ position: "absolute", left: "2px", right: "2px", top: "3px", bottom: "-1px" }}><Musuh kind={v.evKind} still={true} /></div></div>
              <div style={{ minWidth: "0" }}>
                <div style={{ font: "22px/1.1 var(--display)" }}>{v.evName}</div>
                <div style={{ font: "500 10.5px/1.3 'DM Mono',monospace", color: "#5E4A3F", marginTop: "4px" }}>{v.evSub}</div>
              </div>
            </div>
          )}
          <div style={{ marginTop: "11px", font: "500 15px/1.45 'Bricolage Grotesque'", textWrap: "pretty" }}>{v.evText}</div>
          {v.evTrait && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: "7px", marginTop: "9px", padding: "7px 9px", borderRadius: "11px", background: "#EDE6F5", font: "500 12px/1.35 'Bricolage Grotesque'", color: "#3A3550" }}>
              <span style={{ flex: "none", padding: "3px 6px", borderRadius: "6px", background: "#3A3550", color: "#FFF8EC", font: "500 10px/1 'DM Mono',monospace", letterSpacing: ".08em" }}>{v.evTrait.tag}</span>
              <span>{v.evTrait.desc}</span>
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "14px" }}>
            {v.evChoices.map((c, i) => (
                <button key={c.key ?? c.id ?? i} onClick={c.onClick} className="dc-press" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", minHeight: "52px", padding: "8px 10px 8px 14px", border: "2.5px solid #2B1E18", borderRadius: "16px", background: c.bg, boxShadow: "var(--lift4)", color: "#2B1E18", font: "800 15px/1.2 'Bricolage Grotesque'", textAlign: "left", cursor: "pointer", opacity: c.opacity, '--press-tf': "translateY(3px)", '--press-sh': "0 1px 0 #2B1E18" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "21px/1 'Material Symbols Rounded'" }}>{c.icon}</span>
                    {c.label}
                  </span>
                  <span style={{ flex: "none", padding: "5px 8px", borderRadius: "9px", background: "#2B1E18", color: "#FFF8EC", font: "500 10.5px/1 'DM Mono',monospace" }}>{c.hint}</span>
                </button>
            ))}
          </div>
          {v.hasEvFoot && (
            <div style={{ marginTop: "11px", font: "500 11.5px/1.4 'Bricolage Grotesque'", color: "#5E4A3F", textWrap: "pretty" }}>{v.evFoot}</div>
          )}
        </div>
      )}
    </div>
  );
}
