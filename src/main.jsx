import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Game from './game/Game.jsx';
import { clearSave } from './game/save.js';
import './index.css';

// Optional URL params mirror the design's prototype controls:
//   ?screen=lobby|run|skill|battle|hero|map|shop|result|gertak  start on a given screen
//   ?days=10|20|30   run length        ?gertak=0   disable the "Pose Seram" bluff
//   ?still=1         freeze all animation and timers
//   ?reset=1         wipe saved progress and start fresh
//   ?skills=a,b,c    skill ids for the run/battle previews, e.g. ?screen=battle&skills=sambal,kembaran
//   ?weapon=id       weapon for those previews (sumpit, payung, centong, none)
//   ?enemy=id        enemy for the battle preview, e.g. ?screen=battle&enemy=gajah
// Progress is saved in this browser during normal play; ?screen= previews never save.
const q = new URLSearchParams(location.search);
if (q.get('reset') === '1') {
  clearSave();
  q.delete('reset');
  history.replaceState(null, '', location.pathname + (q.size ? `?${q}` : ''));
}
const props = {
  screen: q.get('screen') || 'lobby',
  runDays: q.get('days') || '20',
  gertak: q.get('gertak') !== '0',
  still: q.get('still') === '1',
  skills: q.get('skills') ? q.get('skills').split(',') : null,
  weapon: q.get('weapon'),
  enemy: q.get('enemy'),
  team: q.get('team') ? q.get('team').split(',').slice(0, 3) : null,
  pet: q.get('pet'),
  elite: q.get('elite') === '1',
  persist: !q.has('screen') && q.get('still') !== '1'
};

// Offline play and "add to home screen" (production builds only).
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(() => navigator.serviceWorker.ready).then(reg => {
      const urls = performance.getEntriesByType('resource').map(e => e.name).filter(u => u.startsWith(location.origin + '/assets/'));
      if (reg.active) reg.active.postMessage({ type: 'precache', urls: ['/', ...urls] });
    }).catch(() => {});
  });
}

const W = 390, H = 844, MARGIN = 24, MIN_H = 720, MAX_H = 1100;
// Phones (portrait / narrow screens): fill the whole screen. The game keeps its 390-unit width
// and the height follows the screen's shape. Desktops keep the framed phone, up to 1.5×.
function layout() {
  const vw = innerWidth, vh = innerHeight;
  if (vw <= 600 || vh > vw) {
    let scale = vw / W, h = vh / scale;
    if (h < MIN_H) { scale = vh / MIN_H; h = MIN_H; }
    return { full: true, scale, h: Math.min(MAX_H, h) };
  }
  return { full: false, scale: Math.min(1.5, (vw - MARGIN) / W, (vh - MARGIN) / H), h: H };
}

function Stage({ children }) {
  const [box, setBox] = useState(layout);
  useEffect(() => {
    const onResize = () => setBox(layout());
    addEventListener('resize', onResize);
    addEventListener('orientationchange', onResize);
    return () => { removeEventListener('resize', onResize); removeEventListener('orientationchange', onResize); };
  }, []);
  return (
    <div className={box.full ? 'stage stage-full' : 'stage'}>
      <div className="stage-scaler" style={{ '--phone-h': `${Math.round(box.h)}px`, transform: `translate(-50%, -50%) scale(${box.scale})` }}>{children}</div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Stage><Game {...props} /></Stage>
  </StrictMode>
);
