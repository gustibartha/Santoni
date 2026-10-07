// Progress persistence in localStorage. Saves everything except short-lived UI
// state (toasts, hit shakes, animations), so a reload resumes mid-run or mid-battle.
const KEY = 'santoni:save:v1';
const TRANSIENT = ['toast', 'shake', 'act', 'pull', 'tick', 'bubble'];

export function loadSave(days) {
  try {
    const data = JSON.parse(localStorage.getItem(KEY));
    if (!data || data.days !== days || !data.state) return null;
    return data;
  } catch {
    return null;
  }
}

export function writeSave(state, days, uid) {
  const keep = {};
  for (const k of Object.keys(state)) if (!TRANSIENT.includes(k)) keep[k] = state[k];
  try { localStorage.setItem(KEY, JSON.stringify({ days, uid, savedAt: Date.now(), state: keep })); } catch { /* storage full or blocked */ }
}

export function clearSave() {
  try { localStorage.removeItem(KEY); } catch { /* storage blocked */ }
}
