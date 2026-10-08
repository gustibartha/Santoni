// Online account and cloud save on Supabase. The client library is loaded on demand so the
// game starts without waiting for it. The publishable key is meant to ship in client code;
// row-level security on `saves` keeps each player to their own row.
const URL = import.meta.env.VITE_SUPABASE_URL || 'https://luyxjcckzjsvlndsnvpr.supabase.co';
const KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_Uh2g55nhUCXoajFmBfljpQ_nTmEPkh9';
// Remembers which account and which server copy this device last matched.
const SYNC_KEY = 'santoni:sync:v1';

let clientP = null;
function client() {
  if (!clientP) {
    clientP = import('@supabase/supabase-js').then(m => m.createClient(URL, KEY, {
      auth: { storageKey: 'santoni:auth', persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    }));
  }
  return clientP;
}

const who = user => (user ? { id: user.id, email: user.email } : null);

export async function currentUser() {
  const sb = await client();
  const { data } = await sb.auth.getSession();
  return who(data.session && data.session.user);
}
export async function watchAuth(cb) {
  const sb = await client();
  const { data } = sb.auth.onAuthStateChange((event, session) => cb(event, who(session && session.user)));
  return () => data.subscription.unsubscribe();
}
export async function signIn(email, password) {
  const sb = await client();
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return who(data.user);
}
// `confirmed` is false when the project requires the player to click the email link first.
export async function signUp(email, password) {
  const sb = await client();
  const { data, error } = await sb.auth.signUp({ email, password, options: { emailRedirectTo: location.origin } });
  if (error) throw error;
  return { user: who(data.user), confirmed: !!data.session };
}
export async function signOut() {
  const sb = await client();
  await sb.auth.signOut();
}

export async function fetchSave() {
  const sb = await client();
  const { data, error } = await sb.from('saves').select('data, days, saved_at').maybeSingle();
  if (error) throw error;
  return data;
}
// Returns the server timestamp of the new copy.
export async function pushSave(userId, snap) {
  const sb = await client();
  const savedAt = new Date().toISOString();
  const { error } = await sb.from('saves').upsert({ user_id: userId, data: snap, days: snap.days, saved_at: savedAt });
  if (error) throw error;
  return savedAt;
}

export function syncMark() {
  try { return JSON.parse(localStorage.getItem(SYNC_KEY)); } catch { return null; }
}
export function setSyncMark(userId, at) {
  try { localStorage.setItem(SYNC_KEY, JSON.stringify({ user: userId, at: Date.parse(at) })); } catch { /* storage blocked */ }
}
export function clearSyncMark() {
  try { localStorage.removeItem(SYNC_KEY); } catch { /* storage blocked */ }
}

// Player-facing wording for the auth errors people actually hit.
export function authMessage(err) {
  const m = String((err && err.message) || err || '').toLowerCase();
  if (m.includes('invalid login')) return 'Email atau sandi salah.';
  if (m.includes('not confirmed')) return 'Email belum dikonfirmasi. Ketuk tautan di email dari Supabase dulu (cek juga folder spam).';
  if (m.includes('already registered') || m.includes('already been registered')) return 'Email ini sudah terdaftar. Pilih Masuk.';
  if (m.includes('at least 6') || m.includes('password should')) return 'Sandi minimal 6 karakter.';
  if (m.includes('rate limit') || m.includes('too many')) return 'Terlalu banyak percobaan. Tunggu sebentar, lalu coba lagi.';
  if (m.includes('fetch') || m.includes('network')) return 'Tidak bisa terhubung ke server. Periksa internet.';
  return 'Gagal: ' + ((err && err.message) || 'kesalahan tidak dikenal') + '.';
}
