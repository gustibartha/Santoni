// Midtrans payment notification (set as "Payment Notification URL" in the Midtrans dashboard).
// Trusts nothing in the body until the signature checks out against our server key and the
// amount matches the order; then marks the order paid or failed. Gems are handed over when the
// player's game calls claim_gems().
import { createClient } from 'npm:@supabase/supabase-js@2';

async function sha512(text: string) {
  const buf = await crypto.subtle.digest('SHA-512', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

Deno.serve(async req => {
  if (req.method !== 'POST') return new Response('ok');
  const serverKey = Deno.env.get('MIDTRANS_SERVER_KEY');
  if (!serverKey) return new Response('not configured', { status: 503 });

  let n: Record<string, string> = {};
  try { n = await req.json(); } catch { return new Response('bad request', { status: 400 }); }
  const { order_id, status_code, gross_amount, signature_key, transaction_status, fraud_status } = n;
  if (!order_id || !signature_key) return new Response('bad request', { status: 400 });
  if (await sha512(`${order_id}${status_code}${gross_amount}${serverKey}`) !== signature_key) return new Response('forbidden', { status: 403 });

  const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  const { data: order } = await admin.from('gem_orders').select('amount, status').eq('order_id', order_id).maybeSingle();
  if (!order) return new Response('ok');
  if (Math.round(Number(gross_amount)) !== order.amount) return new Response('amount mismatch', { status: 400 });

  const paid = transaction_status === 'settlement' || (transaction_status === 'capture' && fraud_status === 'accept');
  const failed = ['deny', 'cancel', 'expire', 'failure'].includes(transaction_status);
  if (order.status === 'pending' && (paid || failed)) {
    await admin.from('gem_orders').update(paid ? { status: 'paid', paid_at: new Date().toISOString() } : { status: 'failed' }).eq('order_id', order_id).eq('status', 'pending');
  }
  return new Response('ok');
});
