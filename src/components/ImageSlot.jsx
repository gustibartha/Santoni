import { useEffect, useRef, useState } from 'react';

// User-fillable illustration slot: shows a labelled placeholder until an image is
// dropped on it or picked via click. The image is kept in this browser only.
const KEY = id => `santoni:image-slot:${id}`;

function load(id) {
  try { return localStorage.getItem(KEY(id)); } catch { return null; }
}
function save(id, src) {
  try { src ? localStorage.setItem(KEY(id), src) : localStorage.removeItem(KEY(id)); } catch { /* storage unavailable or full */ }
}

export default function ImageSlot({ id, src: initialSrc, placeholder, shape = 'rounded', style }) {
  const [src, setSrc] = useState(() => load(id) || initialSrc || null);
  const [over, setOver] = useState(false);
  const input = useRef(null);

  useEffect(() => { setSrc(load(id) || initialSrc || null); }, [id, initialSrc]);

  const take = file => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => { setSrc(reader.result); save(id, reader.result); };
    reader.readAsDataURL(file);
  };
  const radius = shape === 'circle' ? '50%' : shape === 'pill' ? '999px' : shape === 'rect' ? 0 : '12px';

  return (
    <div
      style={{ ...style, borderRadius: radius, overflow: 'hidden', cursor: 'pointer' }}
      onClick={() => input.current?.click()}
      onDragOver={e => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={e => { e.preventDefault(); setOver(false); take(e.dataTransfer.files[0]); }}
      title={src ? 'Klik atau seret gambar untuk mengganti' : placeholder}
    >
      {src
        ? <img src={src} alt={placeholder || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        : (
          <div style={{ width: '100%', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '0 24px', textAlign: 'center', color: 'currentColor', opacity: over ? 0.95 : 0.55, font: "500 10px/1.35 'DM Mono', monospace", letterSpacing: '.04em', background: over ? 'rgba(242,182,60,.25)' : 'transparent' }}>
            <span style={{ font: "22px/1 'Material Symbols Rounded'" }}>add_photo_alternate</span>
            {placeholder}
          </div>
        )}
      <input ref={input} type="file" accept="image/*" hidden onChange={e => take(e.target.files[0])} />
    </div>
  );
}
