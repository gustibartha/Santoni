import { useEffect, useState } from 'react';

// Animates a number from 0 to `value` (ease-out), formatted for Indonesian readers.
// Uses a clock-based timer rather than requestAnimationFrame so it still finishes when
// frames are throttled (background tabs, low-power mode).
export default function CountUp({ value, duration = 900, delay = 0, still = false }) {
  const [shown, setShown] = useState(still ? value : 0);
  useEffect(() => {
    if (still) { setShown(value); return undefined; }
    const start = Date.now() + delay;
    const iv = setInterval(() => {
      const p = Math.min(1, Math.max(0, (Date.now() - start) / duration));
      setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p >= 1) clearInterval(iv);
    }, 33);
    return () => clearInterval(iv);
  }, [value, duration, delay, still]);
  return shown.toLocaleString('id-ID');
}
