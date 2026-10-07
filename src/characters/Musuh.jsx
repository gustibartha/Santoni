// Enemy characters ("musuh"): one SVG per kind.
export const KINDS = ['tikus', 'bebek', 'kumbang', 'lele', 'kelinci', 'lebah', 'angsa'];

/** @param {{ kind?: string, flip?: boolean, still?: boolean }} props */
export default function Musuh({ kind = 'tikus', flip = false, still = false }) {
  const v = {
    flipTf: flip ? 'scaleX(-1)' : 'none',
    aBob: still ? 'none' : kind === 'kumbang' ? 'msSag 3.2s ease-in-out infinite' : 'msBob 2.2s ease-in-out infinite',
    aWingL: still ? 'none' : 'msWingL .25s ease-in-out infinite',
    aWingR: still ? 'none' : 'msWingR .25s ease-in-out infinite'
  };
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <svg viewBox="0 0 200 200" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", overflow: "visible", display: "block" }}>
        <ellipse cx="100" cy="193" rx="58" ry="7" style={{ fill: "rgba(43,30,24,.16)" }} />
        <g style={{ transform: v.flipTf, transformOrigin: "100px 100px" }}>
          <g style={{ animation: v.aBob, transformOrigin: "100px 192px" }}>
            <g style={{ stroke: "#2B1E18", strokeWidth: "3.5", strokeLinejoin: "round", strokeLinecap: "round" }}>
              {kind === 'tikus' && (
                <g>
                <path d="M52 170 Q14 176 18 150 Q22 130 38 140" style={{ fill: "none", strokeWidth: "4.5" }} />
                <circle cx="60" cy="76" r="24" style={{ fill: "#A79C93" }} />
                <circle cx="60" cy="76" r="13" style={{ fill: "#F3B49A", stroke: "none" }} />
                <circle cx="140" cy="76" r="24" style={{ fill: "#A79C93" }} />
                <circle cx="140" cy="76" r="13" style={{ fill: "#F3B49A", stroke: "none" }} />
                <ellipse cx="100" cy="134" rx="54" ry="56" style={{ fill: "#A79C93" }} />
                <path d="M74 178 L100 162 L126 178 Q114 189 100 189 Q86 189 74 178 Z" style={{ fill: "#FFF8EC", strokeWidth: "3" }} />
                <path d="M100 164 L92 174 L100 190 L108 174 Z" style={{ fill: "#3C78C8", strokeWidth: "2.5" }} />
                <path d="M70 143 L46 138 M70 149 L46 152 M130 143 L154 138 M130 149 L154 152" style={{ fill: "none", strokeWidth: "2" }} />
                <circle cx="80" cy="118" r="14" style={{ fill: "#E9E4DE", strokeWidth: "3" }} />
                <circle cx="120" cy="118" r="14" style={{ fill: "#E9E4DE", strokeWidth: "3" }} />
                <path d="M94 117 L106 117" style={{ fill: "none", strokeWidth: "3" }} />
                <circle cx="80" cy="120" r="3.6" style={{ fill: "#2B1E18", stroke: "none" }} />
                <circle cx="120" cy="120" r="3.6" style={{ fill: "#2B1E18", stroke: "none" }} />
                <path d="M73 128 Q80 132 87 128 M113 128 Q120 132 127 128" style={{ fill: "none", strokeWidth: "2" }} />
                <ellipse cx="100" cy="141" rx="6" ry="4.5" style={{ fill: "#E58A86", strokeWidth: "2.5" }} />
                <path d="M94 152 L106 152" style={{ fill: "none", strokeWidth: "2.5" }} />
                <g transform="rotate(-12 157 150)">
                  <rect x="136" y="134" width="42" height="32" rx="4" style={{ fill: "#F2B63C" }} />
                  <path d="M136 142 L178 142" style={{ fill: "none", strokeWidth: "2" }} />
                </g>
                <ellipse cx="144" cy="160" rx="10" ry="8" style={{ fill: "#A79C93" }} />
              </g>
              )}
              {kind === 'bebek' && (
                <g>
                <path d="M76 184 L64 194 L92 194 Z" style={{ fill: "#E8833A", strokeWidth: "3" }} />
                <path d="M124 184 L108 194 L136 194 Z" style={{ fill: "#E8833A", strokeWidth: "3" }} />
                <ellipse cx="50" cy="142" rx="12" ry="24" transform="rotate(16 50 142)" style={{ fill: "#E3A32C" }} />
                <ellipse cx="150" cy="142" rx="12" ry="24" transform="rotate(-16 150 142)" style={{ fill: "#E3A32C" }} />
                <ellipse cx="100" cy="130" rx="54" ry="60" style={{ fill: "#F2B63C" }} />
                <path d="M56 94 Q58 52 100 50 Q142 52 144 94 Z" style={{ fill: "#2B1E18" }} />
                <path d="M50 94 Q100 104 150 94 Q150 103 100 110 Q50 103 50 94 Z" style={{ fill: "#2B1E18" }} />
                <path d="M100 60 L104 68 L113 69 L106 75 L108 84 L100 79 L92 84 L94 75 L87 69 L96 68 Z" style={{ fill: "#F2B63C", strokeWidth: "2" }} />
                <path d="M71 116 L91 121 M129 116 L109 121" style={{ fill: "none", strokeWidth: "3.5" }} />
                <circle cx="83" cy="127" r="5" style={{ fill: "#2B1E18", stroke: "none" }} />
                <circle cx="117" cy="127" r="5" style={{ fill: "#2B1E18", stroke: "none" }} />
                <ellipse cx="100" cy="146" rx="26" ry="10" style={{ fill: "#E8833A" }} />
                <path d="M76 146 Q100 152 124 146" style={{ fill: "none", strokeWidth: "2.5" }} />
                <path d="M118 152 Q130 166 126 174" style={{ fill: "none", strokeWidth: "2" }} />
                <rect x="118" y="172" width="17" height="9" rx="3" style={{ fill: "#B9C4BE", strokeWidth: "2.5" }} />
              </g>
              )}
              {kind === 'kumbang' && (
                <g>
                <path d="M62 150 L40 160 M60 168 L38 182 M68 182 L54 196 M138 150 L160 160 M140 168 L162 182 M132 182 L146 196" style={{ fill: "none", strokeWidth: "4" }} />
                <ellipse cx="100" cy="146" rx="50" ry="46" style={{ fill: "#2E5E5A" }} />
                <path d="M100 106 L100 190" style={{ fill: "none", strokeWidth: "3" }} />
                <ellipse cx="78" cy="134" rx="8" ry="15" transform="rotate(20 78 134)" style={{ fill: "rgba(255,248,236,.22)", stroke: "none" }} />
                <path d="M86 78 Q72 52 52 62 Q44 68 48 80" style={{ fill: "none", strokeWidth: "3.5" }} />
                <path d="M114 78 Q128 52 148 62 Q156 68 152 80" style={{ fill: "none", strokeWidth: "3.5" }} />
                <ellipse cx="100" cy="98" rx="34" ry="26" style={{ fill: "#2B1E18" }} />
                <ellipse cx="88" cy="98" rx="10" ry="11" style={{ fill: "#FFF8EC", strokeWidth: "2.5" }} />
                <ellipse cx="112" cy="98" rx="10" ry="11" style={{ fill: "#FFF8EC", strokeWidth: "2.5" }} />
                <circle cx="88" cy="103" r="4.5" style={{ fill: "#2B1E18", stroke: "none" }} />
                <circle cx="112" cy="103" r="4.5" style={{ fill: "#2B1E18", stroke: "none" }} />
                <path d="M78 85 L94 80 M122 85 L106 80" style={{ fill: "none", stroke: "#FFF8EC", strokeWidth: "3" }} />
                <path d="M94 117 Q100 113 106 117" style={{ fill: "none", stroke: "#FFF8EC", strokeWidth: "2.5" }} />
                <path d="M79 110 Q84 120 79 125 Q74 120 79 110 Z" style={{ fill: "#9EC3F0", strokeWidth: "2" }} />
              </g>
              )}
              {kind === 'lele' && (
                <g>
                <path d="M42 128 L12 102 L16 154 Z" style={{ fill: "#7A6A5C" }} />
                <path d="M86 94 Q106 70 128 94 Z" style={{ fill: "#7A6A5C" }} />
                <ellipse cx="104" cy="130" rx="70" ry="40" style={{ fill: "#8C7B6B" }} />
                <path d="M52 142 Q104 176 160 142 Q140 166 104 168 Q68 166 52 142 Z" style={{ fill: "#D9CFC4", stroke: "none" }} />
                <ellipse cx="104" cy="130" rx="70" ry="40" style={{ fill: "none" }} />
                <path d="M94 146 Q108 166 124 150 Z" style={{ fill: "#7A6A5C", strokeWidth: "3" }} />
                <circle cx="146" cy="116" r="8" style={{ fill: "#FFF8EC", strokeWidth: "2.5" }} />
                <circle cx="148" cy="116" r="3.8" style={{ fill: "#2B1E18", stroke: "none" }} />
                <path d="M135 103 Q146 96 157 103" style={{ fill: "none", strokeWidth: "3" }} />
                <path d="M148 140 Q162 148 172 134" style={{ fill: "none", strokeWidth: "3.5" }} />
                <path d="M168 136 Q188 140 192 162 M166 141 Q178 156 174 178 M162 128 Q184 118 196 126 M160 123 Q174 106 188 104" style={{ fill: "none", strokeWidth: "2.5" }} />
                <path d="M126 100 Q142 80 162 96" style={{ fill: "none", strokeWidth: "3.5" }} />
                <path d="M162 96 Q172 112 166 132" style={{ fill: "none", strokeWidth: "2.5" }} />
                <circle cx="165" cy="133" r="4" style={{ fill: "#2B1E18", stroke: "none" }} />
              </g>
              )}
              {kind === 'kelinci' && (
                <g>
                <ellipse cx="80" cy="188" rx="16" ry="7" style={{ fill: "#FFF8EC" }} />
                <ellipse cx="120" cy="188" rx="16" ry="7" style={{ fill: "#FFF8EC" }} />
                <path d="M74 88 Q60 22 78 14 Q96 22 92 88 Z" style={{ fill: "#FFF8EC" }} />
                <path d="M79 80 Q71 32 79 25 Q87 32 87 80 Z" style={{ fill: "#F3B49A", stroke: "none" }} />
                <path d="M108 88 Q110 42 124 34 Q150 28 160 46 Q140 44 128 54 Q124 70 126 88 Z" style={{ fill: "#FFF8EC" }} />
                <ellipse cx="100" cy="138" rx="52" ry="52" style={{ fill: "#FFF8EC" }} />
                <circle cx="70" cy="144" r="6" style={{ fill: "#F6C9BD", stroke: "none" }} />
                <circle cx="130" cy="144" r="6" style={{ fill: "#F6C9BD", stroke: "none" }} />
                <rect x="64" y="110" width="31" height="18" rx="7" style={{ fill: "#2B1E18" }} />
                <rect x="105" y="110" width="31" height="18" rx="7" style={{ fill: "#2B1E18" }} />
                <path d="M95 116 L105 116" style={{ fill: "none", strokeWidth: "3" }} />
                <path d="M70 115 L79 115 M111 115 L120 115" style={{ fill: "none", stroke: "#FFF8EC", strokeWidth: "2" }} />
                <path d="M95 137 L105 137 L100 143 Z" style={{ fill: "#E58A86", strokeWidth: "2" }} />
                <path d="M100 143 L100 148 M92 150 L108 150" style={{ fill: "none", strokeWidth: "2.5" }} />
                <rect x="96" y="150" width="8" height="7" rx="1.5" style={{ fill: "#FFF8EC", strokeWidth: "2" }} />
                <g transform="rotate(8 150 162)">
                  <rect x="132" y="138" width="36" height="46" rx="4" style={{ fill: "#C28A16" }} />
                  <rect x="137" y="147" width="26" height="32" rx="2" style={{ fill: "#FFF8EC", strokeWidth: "2" }} />
                  <path d="M141 155 L159 155 M141 162 L159 162 M141 169 L153 169" style={{ fill: "none", strokeWidth: "2" }} />
                  <rect x="143" y="134" width="14" height="7" rx="2" style={{ fill: "#B9C4BE", strokeWidth: "2" }} />
                </g>
                <ellipse cx="134" cy="170" rx="9" ry="8" style={{ fill: "#FFF8EC" }} />
              </g>
              )}
              {kind === 'lebah' && (
                <g>
                <g style={{ animation: v.aWingL, transformOrigin: "86px 92px" }}><ellipse cx="62" cy="78" rx="27" ry="18" transform="rotate(-30 62 78)" style={{ fill: "#DCE8F7" }} /></g>
                <g style={{ animation: v.aWingR, transformOrigin: "114px 92px" }}><ellipse cx="138" cy="78" rx="27" ry="18" transform="rotate(30 138 78)" style={{ fill: "#DCE8F7" }} /></g>
                <path d="M100 194 L91 178 L109 178 Z" style={{ fill: "#2B1E18" }} />
                <path d="M86 78 Q80 56 70 50 M114 78 Q120 56 130 50" style={{ fill: "none", strokeWidth: "3.5" }} />
                <circle cx="70" cy="50" r="5" style={{ fill: "#2B1E18", stroke: "none" }} />
                <circle cx="130" cy="50" r="5" style={{ fill: "#2B1E18", stroke: "none" }} />
                <circle cx="100" cy="128" r="54" style={{ fill: "#F2B63C" }} />
                <path d="M47 120 Q100 136 153 120 L153 134 Q100 150 47 134 Z" style={{ fill: "#2B1E18", stroke: "none" }} />
                <path d="M54 152 Q100 166 146 152 L136 168 Q100 180 64 168 Z" style={{ fill: "#2B1E18", stroke: "none" }} />
                <circle cx="100" cy="128" r="54" style={{ fill: "none" }} />
                <path d="M71 86 L93 89 M129 86 L107 89" style={{ fill: "none", strokeWidth: "3" }} />
                <circle cx="83" cy="100" r="3.6" style={{ fill: "#2B1E18", stroke: "none" }} />
                <circle cx="117" cy="100" r="3.6" style={{ fill: "#2B1E18", stroke: "none" }} />
                <path d="M71 97 L95 97 Q94 108 83 108 Q72 108 71 97 Z M105 97 L129 97 Q128 108 117 108 Q106 108 105 97 Z" style={{ fill: "rgba(255,248,236,.45)", strokeWidth: "2.5" }} />
                <path d="M94 114 L106 114" style={{ fill: "none", strokeWidth: "2.5" }} />
                <ellipse cx="150" cy="150" rx="8" ry="7" style={{ fill: "#2B1E18" }} />
                <g transform="rotate(-14 160 150)">
                  <rect x="152" y="118" width="16" height="26" rx="6" style={{ fill: "#D2532A" }} />
                  <rect x="144" y="142" width="32" height="12" rx="3" style={{ fill: "#2B1E18" }} />
                  <rect x="142" y="153" width="36" height="5" rx="2" style={{ fill: "#D2532A", strokeWidth: "2" }} />
                </g>
              </g>
              )}
              {kind === 'angsa' && (
                <g>
                <path d="M150 122 L180 104 L172 128 Z" style={{ fill: "#FFF8EC" }} />
                <path d="M82 184 L70 195 L98 195 Z" style={{ fill: "#E8833A", strokeWidth: "3" }} />
                <path d="M120 184 L108 195 L136 195 Z" style={{ fill: "#E8833A", strokeWidth: "3" }} />
                <path d="M94 112 Q84 82 96 62 Q104 48 102 36" style={{ fill: "none", stroke: "#2B1E18", strokeWidth: "24" }} />
                <path d="M94 112 Q84 82 96 62 Q104 48 102 36" style={{ fill: "none", stroke: "#FFF8EC", strokeWidth: "17" }} />
                <path d="M44 152 Q40 112 84 106 L120 106 Q164 110 162 152 Q160 188 104 190 Q46 188 44 152 Z" style={{ fill: "#FFF8EC" }} />
                <path d="M70 136 Q100 126 132 142 Q120 168 86 164 Q68 158 70 136 Z" style={{ fill: "#E9E2D6", strokeWidth: "3" }} />
                <path d="M84 106 L118 106" style={{ fill: "none", strokeWidth: "3" }} />
                <path d="M92 107 L101 126 L110 107 Z" style={{ fill: "#2B1E18", strokeWidth: "2.5" }} />
                <ellipse cx="104" cy="34" rx="22" ry="18" style={{ fill: "#FFF8EC" }} />
                <path d="M121 28 L148 35 L121 43 Z" style={{ fill: "#E8833A" }} />
                <circle cx="121" cy="27" r="5" style={{ fill: "#2B1E18", stroke: "none" }} />
                <circle cx="108" cy="31" r="3.6" style={{ fill: "#2B1E18", stroke: "none" }} />
                <path d="M97 21 L115 27" style={{ fill: "none", strokeWidth: "3.5" }} />
                <g transform="rotate(-30 150 160)">
                  <rect x="146" y="138" width="8" height="44" rx="3" style={{ fill: "#8E5A2B" }} />
                  <rect x="132" y="126" width="36" height="16" rx="4" style={{ fill: "#8E5A2B" }} />
                  <path d="M140 126 L140 142 M160 126 L160 142" style={{ fill: "none", strokeWidth: "2.5" }} />
                </g>
                <ellipse cx="142" cy="164" rx="10" ry="8" style={{ fill: "#FFF8EC" }} />
              </g>
              )}
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
