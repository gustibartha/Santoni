import Santoni from '../characters/Santoni.jsx';
import Musuh from '../characters/Musuh.jsx';

const OUT = "3px 0 0 #2B1E18,-3px 0 0 #2B1E18,0 3px 0 #2B1E18,0 -3px 0 #2B1E18,2px 2px 0 #2B1E18,-2px 2px 0 #2B1E18,2px -2px 0 #2B1E18,-2px -2px 0 #2B1E18,0 8px 0 #2B1E18";
const ABS = { position: "absolute", inset: "0" };
// One animation at a given second of the opening.
const at = (name, dur, delay, ease = 'cubic-bezier(.2,.8,.3,1.1)', fill = 'both') => `${name} ${dur}s ${delay}s ${ease} ${fill}`;
// A shot is visible from `from` to `to` seconds (quick fades at both ends).
const shot = (from, to, extra = []) => [at('cutIn', .25, from, 'ease-out'), at('cutOut', .25, to, 'ease-in', 'forwards'), ...extra].join(', ');

const EMBERS = Array.from({ length: 22 }, (_, i) => [(i * 37) % 100, (i * 53) % 100, 3 + (i % 4), 4 + (i % 5) * 1.3, (i % 7) * 0.5]);
const RIVALS = [
  { kind: 'angsa', name: 'Angsa Pengacara', title: 'BANDING DITOLAK', color: '#3C78C8', t: 4.25 },
  { kind: 'merak', name: 'Merak Selebgram', title: 'BUTUH KONTEN', color: '#7E43B5', t: 4.95 },
  { kind: 'kudanil', name: 'Kuda Nil Mandor', title: 'PROYEK ABADI', color: '#D2532A', t: 5.65 }
];

// Opening cinematic: prologue, a silhouette at dawn, the rivals' roll call, a close-up, and the
// title slam. Tapping anywhere (or "Lewati") starts the game and its music.
export default function IntroScreen({ v }) {
  const i = v.intro;
  return (
    <div onClick={i.start} role="button" aria-label="Ketuk untuk mulai" style={{ ...ABS, zIndex: "70", overflow: "hidden", cursor: "pointer", background: "#0E0A08", animation: i.leaving ? "introOut .45s ease-in both" : "none" }}>

      {/* Shot 1 · prologue in the dark with drifting embers */}
      <div style={{ ...ABS, animation: shot(0, 2.1) }}>
        {EMBERS.map(([x, y, s, d, del], k) => (
          <span key={k} style={{ position: "absolute", left: `${x}%`, top: `${y}%`, width: `${s}px`, height: `${s}px`, borderRadius: "50%", background: "#FFB65C", boxShadow: "0 0 10px 3px rgba(255,150,60,.7)", animation: `emberRise ${d}s ${del}s linear infinite` }} />
        ))}
        <div style={{ position: "absolute", left: "0", right: "0", top: "42%", textAlign: "center", color: "#F3E6D3", font: "italic 600 19px/1.6 'Bricolage Grotesque'", letterSpacing: ".02em" }}>
          <div style={{ animation: at('lineIn', .8, .3, 'ease-out') }}>Di hutan yang terlalu santai,</div>
          <div style={{ animation: at('lineIn', .8, 1.0, 'ease-out') }}>satu panda menolak ambisi.</div>
        </div>
      </div>

      {/* Shot 2 · silhouette on the hill at dawn, slow push-in */}
      <div style={{ ...ABS, overflow: "hidden", animation: shot(2.1, 4.15) }}>
        <div style={{ ...ABS, animation: at('pushIn', 2.3, 2.1, 'linear') }}>
          <div style={{ ...ABS, background: "linear-gradient(180deg,#2A1B3D 0%,#8C3B4F 45%,#F08A3A 72%,#FFD27A 100%)" }} />
          <div style={{ position: "absolute", left: "50%", top: "58%", width: "900px", height: "900px", margin: "-450px 0 0 -450px", background: "repeating-conic-gradient(rgba(255,236,170,.32) 0 7deg, transparent 7deg 18deg)", borderRadius: "50%", maskImage: "radial-gradient(circle, #000 0%, transparent 62%)", WebkitMaskImage: "radial-gradient(circle, #000 0%, transparent 62%)", animation: "raysSpin 18s linear infinite" }} />
          <div style={{ position: "absolute", left: "50%", top: "58%", width: "230px", height: "230px", margin: "-115px 0 0 -115px", borderRadius: "50%", background: "radial-gradient(circle,#FFF8D6 0%,#FFD27A 55%,#F08A3A 100%)", boxShadow: "0 0 90px 40px rgba(255,190,90,.6)", animation: at('sunUp', 1.6, 2.2, 'ease-out') }} />
          <div style={{ position: "absolute", left: "-20%", right: "-20%", bottom: "-6%", height: "40%", borderRadius: "50% 50% 0 0", background: "#140E0C" }} />
          <div style={{ position: "absolute", left: "50%", bottom: "30%", width: "170px", height: "187px", marginLeft: "-85px", filter: "brightness(0)", animation: at('silIn', 1, 2.5, 'ease-out') }}><Santoni pose="idle" /></div>
        </div>
      </div>

      {/* Shot 3 · rival roll call on slanted panels with speed lines */}
      <div style={{ ...ABS, background: "#140E0C", animation: shot(4.15, 6.35) }}>
        <div style={{ ...ABS, background: "repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,248,236,.08) 0 2deg, transparent 2deg 9deg)", animation: "raysSpin 6s linear infinite" }} />
        {RIVALS.map((r, k) => (
          <div key={r.kind} style={{ position: "absolute", left: "-12%", right: "-12%", top: `${8 + k * 30}%`, height: "27%", transform: "skewY(-8deg)", background: `linear-gradient(90deg, ${r.color}, #2B1E18)`, borderTop: "4px solid #FFF8EC", borderBottom: "4px solid #FFF8EC", overflow: "hidden", animation: at(k % 2 ? 'panelR' : 'panelL', .45, r.t, 'cubic-bezier(.2,.9,.3,1.05)') }}>
            <div style={{ position: "absolute", left: k % 2 ? "auto" : "14%", right: k % 2 ? "14%" : "auto", top: "-6%", width: "150px", height: "150px", transform: "skewY(8deg)", animation: at('pushIn', 1.6, r.t, 'linear') }}><Musuh kind={r.kind} still flip={k % 2 === 1} /></div>
            <div style={{ position: "absolute", left: k % 2 ? "16%" : "auto", right: k % 2 ? "auto" : "16%", top: "30%", transform: "skewY(8deg)", textAlign: k % 2 ? "left" : "right", color: "#FFF8EC" }}>
              <div style={{ font: "500 10px/1 'DM Mono',monospace", letterSpacing: ".18em", color: "#FFE45C" }}>{r.title}</div>
              <div style={{ font: "26px/1.05 var(--display)", textShadow: "0 3px 0 #2B1E18", marginTop: "4px" }}>{r.name}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Shot 4 · flash and the stare */}
      <div style={{ ...ABS, background: "#2B1E18", animation: shot(6.35, 7.25) }}>
        <div style={{ ...ABS, background: "repeating-conic-gradient(from 0deg at 50% 40%, rgba(255,255,255,.18) 0 1.5deg, transparent 1.5deg 6deg)" }} />
        <div style={{ position: "absolute", left: "50%", top: "44%", width: "1000px", height: "1100px", margin: "-440px 0 0 -500px", animation: at('stareZoom', .9, 6.35, 'cubic-bezier(.1,.9,.2,1)') }}><Santoni pose="idle" still /></div>
      </div>
      <div style={{ ...ABS, background: "#FFFFFF", pointerEvents: "none", animation: `flashHit .45s 6.3s ease-out both, flashHit .5s 7.25s ease-out both` }} />

      {/* Shot 5 · title slam, line-up, call to action */}
      <div style={{ ...ABS, animation: [at('cutIn', .2, 7.25, 'ease-out'), at('camShake', .5, 7.75, 'linear')].join(', ') }}>
        <div style={{ ...ABS, background: "linear-gradient(180deg,#F7C24A 0%,#F3B49A 55%,#E8A584 100%)" }} />
        <div style={{ position: "absolute", left: "50%", top: "50%", width: "820px", height: "820px", margin: "-410px 0 0 -410px", background: "repeating-conic-gradient(rgba(255,248,214,.45) 0 6deg, transparent 6deg 16deg)", borderRadius: "50%", maskImage: "radial-gradient(circle, #000 0%, transparent 65%)", WebkitMaskImage: "radial-gradient(circle, #000 0%, transparent 65%)", animation: "raysSpin 24s linear infinite" }} />
        <div style={{ position: "absolute", left: "-10%", right: "-10%", bottom: "16%", height: "32%", borderRadius: "50% 50% 0 0", background: "#B5D7C2", border: "4px solid #2B1E18", animation: at('introRise', .7, 7.3) }} />
        <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", height: "19%", background: "#9CCBB0", borderTop: "4px solid #2B1E18", animation: at('introRise', .6, 7.35) }} />
        <div style={{ position: "absolute", left: "50%", top: "21%", width: "40px", height: "40px", margin: "-20px 0 0 -20px", borderRadius: "50%", border: "6px solid #FFF8EC", animation: at('shockwave', .7, 7.75, 'ease-out') }} />
        <div style={{ position: "absolute", left: "0", right: "0", top: "11%", textAlign: "center", pointerEvents: "none" }}>
          <div style={{ font: "44px/1 var(--display)", color: "#F2B63C", textShadow: OUT, animation: at('introDrop', .5, 7.4) }}>Petualangan</div>
          <div style={{ font: "90px/1 var(--display)", color: "#FFF8EC", textShadow: OUT, marginTop: "4px", animation: at('introSlam', .5, 7.6) }}>Santoni</div>
        </div>
        <div style={{ position: "absolute", left: "-4px", bottom: "15%", width: "140px", height: "140px", animation: at('introPeekL', .6, 8.0) }}><Musuh kind="angsa" still /></div>
        <div style={{ position: "absolute", right: "-6px", bottom: "15%", width: "158px", height: "158px", animation: at('introPeekR', .6, 8.1) }}><Musuh kind="kudanil" flip still /></div>
        <div style={{ position: "absolute", left: "50%", bottom: "16.5%", width: "220px", height: "242px", marginLeft: "-110px", animation: at('introHop', .8, 8.2) }}><Santoni pose="idle" /></div>
        <div style={{ position: "absolute", left: "0", right: "0", top: "36%", textAlign: "center", font: "600 15px/1.35 'Bricolage Grotesque'", color: "#2B1E18", animation: at('introFade', .6, 8.7, 'ease-out') }}>Panda merah yang tidak ambisius.<br />Musuh yang terlalu serius.</div>
        <div style={{ position: "absolute", left: "0", right: "0", bottom: "5.5%", display: "grid", placeItems: "center", animation: at('introFade', .5, 9.1, 'ease-out') }}>
          <div style={{ padding: "12px 26px", border: "3px solid #2B1E18", borderRadius: "18px", background: "#D2532A", color: "#FFF8EC", boxShadow: "0 5px 0 #2B1E18", font: "22px/1 var(--display)", textShadow: "0 2px 0 #2B1E18", animation: "introPulse 1.4s 9.6s ease-in-out infinite" }}>Ketuk untuk mulai</div>
        </div>
      </div>

      {/* Letterbox bars for the film part; they slide away for the title. */}
      <div style={{ position: "absolute", left: "0", right: "0", top: "0", height: "9%", background: "#000", zIndex: "2", animation: at('barTop', .5, 7.2, 'ease-in', 'forwards') }} />
      <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", height: "9%", background: "#000", zIndex: "2", animation: at('barBottom', .5, 7.2, 'ease-in', 'forwards') }} />
      <button onClick={e => { e.stopPropagation(); i.start(); }} style={{ position: "absolute", top: "16px", right: "14px", zIndex: "3", height: "32px", padding: "0 12px", border: "2px solid rgba(255,248,236,.6)", borderRadius: "10px", background: "rgba(20,14,12,.55)", color: "#FFF8EC", font: "800 12px/1 'Bricolage Grotesque'", cursor: "pointer" }}>Lewati ›</button>
    </div>
  );
}
