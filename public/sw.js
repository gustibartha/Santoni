// Service worker: makes the game installable and playable offline after the first visit.
// Hashed build assets are cached forever; the page itself is network-first so updates land on the
// next open; fonts are served from cache while refreshing in the background. Server calls
// (Supabase) are never cached.
const CACHE = 'santoni-v1';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});

async function cacheFirst(req) {
  const c = await caches.open(CACHE), hit = await c.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok) c.put(req, res.clone());
  return res;
}
async function networkFirst(req) {
  const c = await caches.open(CACHE);
  try {
    const res = await fetch(req);
    if (res.ok) c.put(req, res.clone());
    return res;
  } catch {
    return (await c.match(req)) || (await c.match('/')) || Response.error();
  }
}
async function staleWhileRevalidate(req) {
  const c = await caches.open(CACHE), hit = await c.match(req);
  const fresh = fetch(req).then(res => { if (res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; }).catch(() => hit);
  return hit || fresh;
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    if (req.mode === 'navigate') return e.respondWith(networkFirst(req));
    if (url.pathname.startsWith('/assets/') || url.pathname.startsWith('/icons/')) return e.respondWith(cacheFirst(req));
    return;
  }
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') e.respondWith(staleWhileRevalidate(req));
});

// The page sends the assets it already loaded, so the very first visit works offline next time.
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'precache' && Array.isArray(e.data.urls)) e.waitUntil(caches.open(CACHE).then(c => c.addAll(e.data.urls)).catch(() => {}));
});
