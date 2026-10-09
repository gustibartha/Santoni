// "Pasang ke layar utama": keeps the browser's install prompt so the game can offer it from a
// button, and tells iPhone users how to add it themselves (Safari has no prompt).
let deferred = null;
const subs = new Set();
const notify = () => subs.forEach(f => f());

if (typeof window !== 'undefined') {
  addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferred = e; notify(); });
  addEventListener('appinstalled', () => { deferred = null; notify(); });
}

export const isStandalone = () => typeof window !== 'undefined' && (matchMedia('(display-mode: standalone)').matches || navigator.standalone === true);
export const isIOS = () => typeof navigator !== 'undefined' && /iphone|ipad|ipod/i.test(navigator.userAgent);
export const canPrompt = () => !!deferred;
export function onInstallChange(f) { subs.add(f); return () => subs.delete(f); }

// Resolves to 'accepted', 'dismissed' or 'unavailable'.
export async function promptInstall() {
  if (!deferred) return 'unavailable';
  const e = deferred;
  deferred = null;
  e.prompt();
  const choice = await e.userChoice;
  notify();
  return choice.outcome;
}
