// Gem store with real payments (Midtrans). The server sets prices and confirms payment; the game
// only names a package, sends the player to Midtrans, and later claims whatever was paid.
// Mixed into Game.prototype like modes.js.
import * as cloud from './cloud.js';

// Display copy only; the amounts the player is charged come from the create-order function.
export const GEM_PACKS = [
  { id: 'p60', gems: 60, bonus: 0, price: 15000 },
  { id: 'p330', gems: 300, bonus: 30, price: 75000, tag: 'Populer' },
  { id: 'p760', gems: 680, bonus: 80, price: 149000 },
  { id: 'p1480', gems: 1280, bonus: 200, price: 279000, tag: 'Hemat' },
  { id: 'p3880', gems: 3280, bonus: 600, price: 699000, tag: 'Terbaik' }
];
const rupiah = n => 'Rp' + n.toLocaleString('id-ID');

export const storeMethods = {
  async buyGems(id) {
    const a = this.state.acct;
    if (!a || !a.user) { this.go('journal'); return this.toast('Masuk ke akun dulu supaya permata yang dibeli aman tersimpan.'); }
    if (this._buying) return;
    this._buying = true;
    this.toast('Membuka pembayaran…');
    try {
      const res = await cloud.createOrder(id, location.origin + '/?bayar=1');
      this.setState({ pendingPay: { order: res.order_id, at: Date.now() } });
      this.logEvent('purchase_start', { pack: id });
      location.href = res.redirect_url;
    } catch (e) {
      const code = e && e.message;
      this.toast(code === 'not_configured' ? 'Pembayaran belum aktif. Toko permata segera dibuka.' : code === 'login' ? 'Sesi habis. Masuk lagi ke akun, lalu coba beli lagi.' : 'Pembayaran gagal dibuka. Periksa internet, lalu coba lagi.');
    }
    this._buying = false;
  },
  // Adds every paid-but-unclaimed order to the gem balance (safe to call often).
  async claimPaid() {
    const a = this.state.acct;
    if (!a || !a.user || this._claiming) return;
    this._claiming = true;
    try {
      const gems = await cloud.claimGems();
      if (gems > 0) {
        this.setState(st => ({ gems: st.gems + gems, pendingPay: null }));
        this.toast(`+${gems.toLocaleString('id-ID')} permata masuk. Terima kasih sudah mendukung Santoni!`);
        this.logEvent('purchase', { gems });
        if (this._cloudReady) this.cloudPush('manual');
      }
    } catch { /* try again on the next check */ }
    this._claiming = false;
  },
  storeView(s, { g }) {
    return {
      gemPacks: GEM_PACKS.map(p => ({ ...p, total: (p.gems + p.bonus).toLocaleString('id-ID'), priceLabel: rupiah(p.price), buy: g(() => this.buyGems(p.id)) })),
      payPending: !!(s.pendingPay && Date.now() - s.pendingPay.at < 30 * 60e3),
      loggedIn: !!(s.acct && s.acct.user)
    };
  }
};
