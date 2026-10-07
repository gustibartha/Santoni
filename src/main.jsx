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
  persist: !q.has('screen') && q.get('still') !== '1'
};

const W = 390, H = 844, MARGIN = 24;
const fit = () => Math.min(1, (innerWidth - MARGIN) / W, (innerHeight - MARGIN) / H);

function Stage({ children }) {
  const [scale, setScale] = useState(fit);
  useEffect(() => {
    const onResize = () => setScale(fit());
    addEventListener('resize', onResize);
    return () => removeEventListener('resize', onResize);
  }, []);
  return (
    <div className="stage">
      <div className="stage-scaler" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>{children}</div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Stage><Game {...props} /></Stage>
  </StrictMode>
);
