// Creates a gem order for the signed-in player and returns a Midtrans payment page.
// Prices live here on the server; the client only names a package.
// Secrets (Supabase dashboard → Edge Functions → Secrets):
//   MIDTRANS_SERVER_KEY   – from Midtrans (Sandbox key while testing)
//   MIDTRANS_PRODUCTION   – "true" once the merchant account is live
import { createClient } from 'npm:@supabase/supabase-js@2';

export const PACKS: Record<string, { gems: number; amount: number; name: string }> = {
  p60: { gems: 60, amount: 15000, name: '60 Permata' },
  p330: { gems: 330, amount: 75000, name: '330 Permata' },
  p760: { gems: 760, amount: 149000, name: '760 Permata' },
  p1480: { gems: 1480, amount: 279000, name: '1.480 Permata' },
  p3880: { gems: 3880, amount: 699000, name: '3.880 Permata' }
};
const ALLOWED_RETURN = [/^https:\/\/santoni\.vercel\.app(\/|$)/, /^http:\/\/localhost(:\d+)?(\/|$)/];

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

Deno.serve(async req => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  if (req.method !== 'POST') return json({ error: 'method' }, 405);

  const serverKey = Deno.env.get('MIDTRANS_SERVER_KEY');
  if (!serverKey) return json({ error: 'not_configured' }, 503);

  const url = Deno.env.get('SUPABASE_URL')!;
  const asUser = createClient(url, Deno.env.get('SUPABASE_ANON_KEY')!, { global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } } });
  const { data: { user } } = await asUser.auth.getUser();
  if (!user) return json({ error: 'login' }, 401);

  let body: { package?: string; returnUrl?: string } = {};
  try { body = await req.json(); } catch { /* empty body */ }
  const pack = body.package ? PACKS[body.package] : undefined;
  if (!pack) return json({ error: 'package' }, 400);
  const finish = body.returnUrl && ALLOWED_RETURN.some(r => r.test(body.returnUrl!)) ? body.returnUrl : 'https://santoni.vercel.app/';

  const orderId = `SNT-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
  const admin = createClient(url, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  const { error: insertError } = await admin.from('gem_orders').insert({ order_id: orderId, user_id: user.id, package: body.package, gems: pack.gems, amount: pack.amount });
  if (insertError) return json({ error: 'order' }, 500);

  const base = Deno.env.get('MIDTRANS_PRODUCTION') === 'true' ? 'https://app.midtrans.com' : 'https://app.sandbox.midtrans.com';
  const res = await fetch(`${base}/snap/v1/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: 'Basic ' + btoa(serverKey + ':') },
    body: JSON.stringify({
      transaction_details: { order_id: orderId, gross_amount: pack.amount },
      item_details: [{ id: body.package, price: pack.amount, quantity: 1, name: pack.name }],
      customer_details: { email: user.email },
      callbacks: { finish }
    })
  });
  const snap = await res.json().catch(() => ({}));
  if (!res.ok || !snap.redirect_url) {
    await admin.from('gem_orders').update({ status: 'failed' }).eq('order_id', orderId);
    return json({ error: 'gateway', detail: snap.error_messages ?? null }, 502);
  }
  return json({ order_id: orderId, redirect_url: snap.redirect_url, token: snap.token });
});
