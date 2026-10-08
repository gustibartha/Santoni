// Progress persistence in localStorage. Saves everything except short-lived UI
// state (toasts, hit shakes, animations), so a reload resumes mid-run or mid-battle.
const KEY = 'santoni:save:v1';
const TRANSIENT = ['toast', 'shake', 'act', 'pull', 'tick', 'bubble', 'clock', 'musicOn', 'acct'];

// The persisted shape shared by local saves, backup codes and the cloud copy.
export function snapshot(state, days, uid) {
  const keep = {};
  for (const k of Object.keys(state)) if (!TRANSIENT.includes(k)) keep[k] = state[k];
  if (keep.confirm && keep.confirm.kind === 'cloud') keep.confirm = null;
  return { days, uid, savedAt: Date.now(), state: keep };
}

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
  try { localStorage.setItem(KEY, JSON.stringify(snapshot(state, days, uid))); } catch { /* storage full or blocked */ }
}
// Replaces the local save with a snapshot from elsewhere (the cloud copy).
export function storeSave(data) {
  try { localStorage.setItem(KEY, JSON.stringify(data)); return true; } catch { return false; }
}

// Portable backup code: the save serialized as base64 (UTF-8 safe), prefixed for recognition.
const PREFIX = 'SANTONI1:';
export function exportCode(state, days, uid) {
  const json = JSON.stringify(snapshot(state, days, uid));
  return PREFIX + btoa(unescape(encodeURIComponent(json)));
}
// Returns true when the code was valid and has been stored as the current save.
export function importCode(code) {
  try {
    const raw = String(code || '').trim();
    if (!raw.startsWith(PREFIX)) return false;
    const data = JSON.parse(decodeURIComponent(escape(atob(raw.slice(PREFIX.length)))));
    if (!data || !data.state || !Array.isArray(data.state.bag)) return false;
    localStorage.setItem(KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function clearSave() {
  try { localStorage.removeItem(KEY); } catch { /* storage blocked */ }
}
