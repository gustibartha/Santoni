import Santoni from '../characters/Santoni.jsx';
import Musuh from '../characters/Musuh.jsx';

const OUT = "3px 0 0 #2B1E18,-3px 0 0 #2B1E18,0 3px 0 #2B1E18,0 -3px 0 #2B1E18,2px 2px 0 #2B1E18,-2px 2px 0 #2B1E18,2px -2px 0 #2B1E18,-2px -2px 0 #2B1E18,0 7px 0 #2B1E18";
const at = (name, dur, delay, ease = 'cubic-bezier(.2,.8,.3,1.1)') => `${name} ${dur}s ${delay}s ${ease} both`;

// Opening cinematic shown when the game opens: sunrise, rivals peeking in, the title slamming
// down and Santoni hopping on stage. Tapping anywhere starts the game (and its music).
export default function IntroScreen({ v }) {
  const i = v.intro;
  return (
    <div onClick={i.start} role="button" aria-label="Ketuk untuk mulai" style={{ position: "absolute", inset: "0", zIndex: "70", overflow: "hidden", cursor: "pointer", background: "#2B1E18", animation: i.leaving ? "introOut .45s ease-in both" : "none" }}>
      <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg,#F7C24A 0%,#F3B49A 55%,#E8A584 100%)", animation: at('introFade', .9, 0, 'ease-out') }} />
      <div style={{ position: "absolute", left: "50%", top: "52%", width: "760px", height: "760px", marginLeft: "-380px", marginTop: "-380px", borderRadius: "50%", background: "radial-gradient(circle, #FFF6C8 0%, rgba(255,233,160,.55) 38%, rgba(255,233,160,0) 70%)", animation: at('introSun', 1.6, .1, 'ease-out') }} />
      <div style={{ position: "absolute", left: "-10%", right: "-10%", bottom: "16%", height: "34%", borderRadius: "50% 50% 0 0", background: "#B5D7C2", border: "4px solid #2B1E18", animation: at('introRise', .9, .35) }} />
      <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", height: "19%", background: "#9CCBB0", borderTop: "4px solid #2B1E18", animation: at('introRise', .8, .45) }} />

      <div style={{ position: "absolute", left: "-6px", bottom: "15%", width: "150px", height: "150px", animation: at('introPeekL', .8, 1.0) }}><Musuh kind="angsa" still /></div>
      <div style={{ position: "absolute", right: "-8px", bottom: "15%", width: "164px", height: "164px", animation: at('introPeekR', .8, 1.15) }}><Musuh kind="kudanil" flip still /></div>

      <div style={{ position: "absolute", left: "0", right: "0", top: "13%", textAlign: "center", pointerEvents: "none" }}>
        <div style={{ font: "46px/1 var(--display)", color: "#F2B63C", textShadow: OUT, animation: at('introDrop', .6, 1.5) }}>Petualangan</div>
        <div style={{ font: "88px/1 var(--display)", color: "#FFF8EC", textShadow: OUT, marginTop: "4px", animation: at('introSlam', .55, 1.9) }}>Santoni</div>
      </div>

      <div style={{ position: "absolute", left: "50%", bottom: "17%", width: "220px", height: "242px", marginLeft: "-110px", animation: at('introHop', .9, 2.3) }}><Santoni pose="idle" /></div>

      <div style={{ position: "absolute", left: "0", right: "0", top: "36%", textAlign: "center", font: "600 15px/1.3 'Bricolage Grotesque'", color: "#2B1E18", animation: at('introFade', .6, 3.0, 'ease-out') }}>Panda merah yang tidak ambisius.<br />Musuh yang terlalu serius.</div>

      <div style={{ position: "absolute", left: "0", right: "0", bottom: "5.5%", display: "grid", placeItems: "center", animation: at('introFade', .5, 3.5, 'ease-out') }}>
        <div style={{ padding: "12px 26px", border: "3px solid #2B1E18", borderRadius: "18px", background: "#D2532A", color: "#FFF8EC", boxShadow: "0 5px 0 #2B1E18", font: "22px/1 var(--display)", textShadow: "0 2px 0 #2B1E18", animation: "introPulse 1.4s 4s ease-in-out infinite" }}>Ketuk untuk mulai</div>
      </div>
      <button onClick={e => { e.stopPropagation(); i.start(); }} style={{ position: "absolute", top: "16px", right: "14px", height: "32px", padding: "0 12px", border: "2px solid #2B1E18", borderRadius: "10px", background: "rgba(255,248,236,.85)", color: "#2B1E18", font: "800 12px/1 'Bricolage Grotesque'", cursor: "pointer" }}>Lewati ›</button>
    </div>
  );
}
