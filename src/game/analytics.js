// Tiny anonymous analytics: a random id per device plus an event name and a few numbers, sent to
// the Supabase `events` table (insert-only for the public key). No personal data, nothing in
// previews or dev builds, and nothing at all when the browser asks not to be tracked.
const URL = (import.meta.env.VITE_SUPABASE_URL || 'https://luyxjcckzjsvlndsnvpr.supabase.co') + '/rest/v1/events';
const KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_Uh2g55nhUCXoajFmBfljpQ_nTmEPkh9';
const DEVICE_KEY = 'santoni:device';

const blocked = () => typeof navigator === 'undefined' || navigator.doNotTrack === '1' || window.doNotTrack === '1';

function deviceId() {
  try {
    let id = localStorage.getItem(DEVICE_KEY);
    if (!id) { id = (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2) + Date.now().toString(36)); localStorage.setItem(DEVICE_KEY, id); }
    return id;
  } catch { return null; }
}

export function sendEvent(name, props = {}) {
  if (!import.meta.env.PROD || blocked()) return;
  const device = deviceId();
  if (!device) return;
  try {
    fetch(URL, {
      method: 'POST', keepalive: true,
      headers: { apikey: KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify({ device, name, props })
    }).catch(() => {});
  } catch { /* never let analytics break the game */ }
}
