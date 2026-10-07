// Santoni the red panda — SVG character with six poses.
const N = 'none';
const POSES = {
  idle: { tBody: N, armL: 14, armR: -14, tTail: N, tHead: N, aBody: 'pdBreath 2.6s ease-in-out infinite', aTail: 'pdTail 2.8s ease-in-out infinite', aArm: N, aFootL: N, aFootR: N, expr: 'datar' },
  walk: { tBody: N, armL: 10, armR: -10, tTail: 'rotate(-6deg)', tHead: N, aBody: 'pdWalk .52s ease-in-out infinite', aTail: 'pdTail .52s ease-in-out infinite', aArm: 'pdArmA .52s ease-in-out infinite', aFootL: 'pdFootA .52s ease-in-out infinite', aFootR: 'pdFootB .52s ease-in-out infinite', expr: 'datar' },
  attack: { tBody: 'translateX(12px) rotate(8deg)', armL: 34, armR: -104, tTail: 'rotate(-14deg)', tHead: 'rotate(3deg)', aBody: N, aTail: N, aArm: N, aFootL: N, aFootR: N, expr: 'datar' },
  seram: { tBody: 'scale(1.03,1.07)', armL: 140, armR: -140, tTail: 'rotate(-16deg) scale(1.12)', tHead: N, aBody: 'pdShake .3s ease-in-out infinite', aTail: N, aArm: N, aFootL: N, aFootR: N, expr: 'datar' },
  hurt: { tBody: 'translateX(-10px) rotate(-9deg)', armL: 46, armR: -46, tTail: 'rotate(10deg)', tHead: 'rotate(-6deg)', aBody: N, aTail: N, aArm: N, aFootL: N, aFootR: N, expr: 'sakit' },
  sleep: { tBody: 'translateY(8px) scale(1.04,.93)', armL: 4, armR: -4, tTail: 'rotate(18deg)', tHead: 'translateY(10px) rotate(-10deg)', aBody: 'pdBreath 3.6s ease-in-out infinite', aTail: N, aArm: N, aFootL: N, aFootR: N, expr: 'tidur' }
};

/** @param {{ pose?: keyof POSES, expr?: 'auto'|'datar'|'kaget'|'tidur'|'sakit', flip?: boolean, still?: boolean }} props */
export default function Santoni({ pose = 'idle', expr = 'auto', flip = false, still = false }) {
  const c = POSES[pose] || POSES.idle;
  const face = expr && expr !== 'auto' ? expr : c.expr;
  const a = x => (still ? N : x);
  const show = k => (face === k ? 'inline' : N);
  const v = {
    flipTf: flip ? 'scaleX(-1)' : N, tBody: c.tBody, tTail: c.tTail, tHead: c.tHead, armL: c.armL, armR: c.armR,
    aBody: a(c.aBody), aTail: a(c.aTail), aArmL: a(c.aArm), aArmR: a(c.aArm), aFootL: a(c.aFootL), aFootR: a(c.aFootR),
    aBlink: a('pdBlink 4.2s ease-in-out infinite'),
    dDatar: show('datar'), dKaget: show('kaget'), dTidur: show('tidur'), dSakit: show('sakit'),
    dZ: face === 'tidur' ? 'inline' : N, aZ: a('pdZ 2.4s ease-out infinite'), aZ2: a('pdZ 2.4s 1.2s ease-out infinite')
  };
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <svg viewBox="0 0 200 220" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", overflow: "visible", display: "block" }}>
        <ellipse cx="100" cy="211" rx="56" ry="7" style={{ fill: "rgba(43,30,24,.16)" }} />
        <g style={{ transform: v.flipTf, transformOrigin: "100px 110px" }}>
          <g style={{ animation: v.aBody, transformOrigin: "100px 210px" }}>
            <g style={{ transform: v.tBody, transformOrigin: "100px 210px", transition: "transform .16s ease-out" }}>
              <g style={{ stroke: "#2B1E18", strokeWidth: "3.5", strokeLinejoin: "round", strokeLinecap: "round" }}>
                <g style={{ transform: v.tTail, transformOrigin: "128px 184px", transition: "transform .2s ease-out" }}>
                  <g style={{ animation: v.aTail, transformOrigin: "128px 184px" }}>
                    <ellipse cx="172" cy="100" rx="16" ry="14" transform="rotate(-100 172 100)" style={{ fill: "#8E3418" }} />
                    <ellipse cx="175" cy="118" rx="18" ry="15" transform="rotate(-88 175 118)" style={{ fill: "#F0A070" }} />
                    <ellipse cx="172" cy="136" rx="19" ry="16" transform="rotate(-72 172 136)" style={{ fill: "#D2532A" }} />
                    <ellipse cx="165" cy="153" rx="20" ry="16" transform="rotate(-55 165 153)" style={{ fill: "#F0A070" }} />
                    <ellipse cx="153" cy="168" rx="20" ry="16" transform="rotate(-38 153 168)" style={{ fill: "#D2532A" }} />
                    <ellipse cx="138" cy="180" rx="20" ry="15" transform="rotate(-18 138 180)" style={{ fill: "#F0A070" }} />
                  </g>
                </g>
                <g style={{ animation: v.aFootL }}><ellipse cx="83" cy="203" rx="15" ry="9" style={{ fill: "#3A2420" }} /></g>
                <g style={{ animation: v.aFootR }}>
                  <rect x="100" y="205" width="34" height="8" rx="4" style={{ fill: "#F2B63C", strokeWidth: "2.5" }} />
                  <ellipse cx="117" cy="202" rx="15" ry="9" style={{ fill: "#3A2420" }} />
                  <path d="M106 199 Q117 192 128 199" style={{ fill: "none", stroke: "#F2B63C", strokeWidth: "4.5" }} />
                </g>
                <path d="M64 170 Q62 134 100 130 Q138 134 136 170 Q136 202 100 204 Q64 202 64 170 Z" style={{ fill: "#D2532A" }} />
                <path d="M82 172 Q82 152 100 151 Q118 152 118 172 Q118 194 100 196 Q82 194 82 172 Z" style={{ fill: "#5A3226", stroke: "none" }} />
                <g transform="translate(68 148)"><g style={{ transform: `rotate(${v.armL}deg)`, transition: "transform .16s ease-out" }}><g style={{ animation: v.aArmL }}><rect x="-10" y="-6" width="20" height="40" rx="10" style={{ fill: "#3A2420" }} /></g></g></g>
                <g transform="translate(132 148)"><g style={{ transform: `rotate(${v.armR}deg)`, transition: "transform .16s ease-out" }}><g style={{ animation: v.aArmR }}><rect x="-10" y="-6" width="20" height="40" rx="10" style={{ fill: "#3A2420" }} /></g></g></g>
                <g style={{ transform: v.tHead, transformOrigin: "100px 132px", transition: "transform .2s ease-out" }}>
                  <path d="M50 66 Q36 30 58 20 Q78 28 84 52 Z" style={{ fill: "#FFF8EC" }} />
                  <path d="M57 58 Q50 37 60 31 Q72 37 76 52 Z" style={{ fill: "#4A2A20", stroke: "none" }} />
                  <path d="M150 66 Q164 30 142 20 Q122 28 116 52 Z" style={{ fill: "#FFF8EC" }} />
                  <path d="M143 58 Q150 37 140 31 Q128 37 124 52 Z" style={{ fill: "#4A2A20", stroke: "none" }} />
                  <ellipse cx="100" cy="88" rx="60" ry="47" style={{ fill: "#D2532A", stroke: "none" }} />
                  <ellipse cx="62" cy="104" rx="16" ry="12" style={{ fill: "#FFF8EC", stroke: "none" }} />
                  <ellipse cx="138" cy="104" rx="16" ry="12" style={{ fill: "#FFF8EC", stroke: "none" }} />
                  <path d="M74 110 Q76 98 100 98 Q124 98 126 110 Q126 128 100 130 Q74 128 74 110 Z" style={{ fill: "#FFF8EC", stroke: "none" }} />
                  <ellipse cx="80" cy="73" rx="8" ry="5" style={{ fill: "#FFF8EC", stroke: "none" }} />
                  <ellipse cx="120" cy="73" rx="8" ry="5" style={{ fill: "#FFF8EC", stroke: "none" }} />
                  <path d="M74 97 Q70 106 76 116" style={{ fill: "none", stroke: "#8E3418", strokeWidth: "6" }} />
                  <path d="M126 97 Q130 106 124 116" style={{ fill: "none", stroke: "#8E3418", strokeWidth: "6" }} />
                  <ellipse cx="100" cy="88" rx="60" ry="47" style={{ fill: "none" }} />
                  <g style={{ display: v.dDatar }}>
                    <g style={{ animation: v.aBlink, transformOrigin: "100px 89px" }}>
                      <path d="M71 89 L87 89 Q86 98 79 98 Q72 98 71 89 Z" style={{ fill: "#2B1E18", stroke: "none" }} />
                      <path d="M113 89 L129 89 Q128 98 121 98 Q114 98 113 89 Z" style={{ fill: "#2B1E18", stroke: "none" }} />
                      <circle cx="82" cy="93" r="1.8" style={{ fill: "#FFF8EC", stroke: "none" }} />
                      <circle cx="124" cy="93" r="1.8" style={{ fill: "#FFF8EC", stroke: "none" }} />
                    </g>
                    <path d="M69 88.5 L89 88.5 M111 88.5 L131 88.5" style={{ fill: "none", strokeWidth: "3" }} />
                    <path d="M94 121 L106 121" style={{ fill: "none", strokeWidth: "2.8" }} />
                  </g>
                  <g style={{ display: v.dKaget }}>
                    <circle cx="79" cy="92" r="5" style={{ fill: "#2B1E18", stroke: "none" }} />
                    <circle cx="121" cy="92" r="5" style={{ fill: "#2B1E18", stroke: "none" }} />
                    <ellipse cx="100" cy="122" rx="3.5" ry="4.5" style={{ fill: "#2B1E18", stroke: "none" }} />
                  </g>
                  <g style={{ display: v.dTidur }}>
                    <path d="M70 91 Q79 97 88 91 M112 91 Q121 97 130 91" style={{ fill: "none", strokeWidth: "3" }} />
                    <path d="M95 121 L105 121" style={{ fill: "none", strokeWidth: "2.8" }} />
                  </g>
                  <g style={{ display: v.dSakit }}>
                    <path d="M72 86 L84 92 L72 98 M128 86 L116 92 L128 98" style={{ fill: "none", strokeWidth: "3" }} />
                    <path d="M92 122 Q96 119 100 122 Q104 125 108 122" style={{ fill: "none", strokeWidth: "2.6" }} />
                    <path d="M152 50 Q159 61 152 66 Q145 61 152 50 Z" style={{ fill: "#9EC3F0", strokeWidth: "2.5" }} />
                  </g>
                  <path d="M93 106 Q100 102 107 106 Q104 113 100 113 Q96 113 93 106 Z" style={{ fill: "#2B1E18", strokeWidth: "1.5" }} />
                </g>
              </g>
            </g>
          </g>
        </g>
        <g style={{ display: v.dZ }}>
          <text x="146" y="54" style={{ font: "24px 'Bagel Fat One',system-ui", fill: "#FFF8EC", stroke: "#2B1E18", strokeWidth: "4", paintOrder: "stroke", animation: v.aZ, transformOrigin: "150px 48px" }}>z</text>
          <text x="166" y="34" style={{ font: "17px 'Bagel Fat One',system-ui", fill: "#FFF8EC", stroke: "#2B1E18", strokeWidth: "3.5", paintOrder: "stroke", animation: v.aZ2, transformOrigin: "170px 30px" }}>z</text>
        </g>
      </svg>
    </div>
  );
}
