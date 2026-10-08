// Shared SVG gradients referenced by id from every character drawing: a soft gloss, a gentle
// shade toward the bottom of a shape, and a feathered ground shadow. Rendered once per page;
// zero-size rather than display:none, which would stop the gradients from painting.
export default function SvgDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
      <defs>
        <radialGradient id="g-sheen" cx=".34" cy=".24" r=".62">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity=".55" />
          <stop offset=".4" stopColor="#FFFFFF" stopOpacity=".16" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="g-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset=".42" stopColor="#2B1E18" stopOpacity="0" />
          <stop offset="1" stopColor="#2B1E18" stopOpacity=".2" />
        </linearGradient>
        <radialGradient id="g-shadow">
          <stop offset="0" stopColor="#2B1E18" stopOpacity=".34" />
          <stop offset=".55" stopColor="#2B1E18" stopOpacity=".18" />
          <stop offset="1" stopColor="#2B1E18" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="g-glow">
          <stop offset="0" stopColor="#FFF6C8" stopOpacity=".95" />
          <stop offset=".5" stopColor="#FFE9A0" stopOpacity=".35" />
          <stop offset="1" stopColor="#FFE9A0" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
