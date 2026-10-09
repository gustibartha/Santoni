// Lobby mailbox: read letters, claim their attachments once, tidy up finished ones.
// Mixed into Game.prototype like modes.js. State: mail = { read, claimed, gone } keyed by letter id.
import { MAIL, GIFTS } from './mailData.js';
import { wibDay } from './daily.js';

const hasGifts = m => m.gifts.length > 0;

export const mailMethods = {
  mailState(s = this.state) { return { read: {}, claimed: {}, gone: {}, ...(s.mail || {}) }; },
  // Seasonal letters only show inside their date window (WIB).
  mailList(s = this.state) { const m = this.mailState(s), today = wibDay(); return MAIL.filter(x => !m.gone[x.id] && (!x.when || (today >= x.when[0] && today <= x.when[1]))); },
  // Letters that still want attention: unread, or with gifts not yet taken.
  mailBadge(s = this.state) {
    const m = this.mailState(s);
    return this.mailList(s).filter(x => !m.read[x.id] || (hasGifts(x) && !m.claimed[x.id])).length;
  },

  mailOpen(id) {
    this.setState(st => {
      const m = this.mailState(st);
      return { mailPick: st.mailPick === id ? null : id, mail: { ...m, read: { ...m.read, [id]: 1 } } };
    });
  },
  // Adds gifts to a state patch; returns the labels for the toast.
  mailGive(letters, patch) {
    const s = this.state, fmt = n => n.toLocaleString('id-ID'), sum = {};
    for (const x of letters) for (const gft of x.gifts) sum[gft.k] = (sum[gft.k] || 0) + gft.v;
    for (const [k, v] of Object.entries(sum)) patch[k] = (patch[k] != null ? patch[k] : s[k] || 0) + v;
    return Object.entries(sum).map(([k, v]) => `+${fmt(v)} ${GIFTS[k].label}`);
  },
  mailClaim(id) {
    const m = this.mailState(), x = MAIL.find(y => y.id === id);
    if (!x || !hasGifts(x) || m.claimed[id]) return;
    const patch = { mail: { ...m, read: { ...m.read, [id]: 1 }, claimed: { ...m.claimed, [id]: 1 } } };
    const got = this.mailGive([x], patch);
    this.setState(patch);
    this.toast(`Lampiran diterima: ${got.join(', ')}.`);
  },
  mailClaimAll() {
    const m = this.mailState(), todo = this.mailList().filter(x => hasGifts(x) && !m.claimed[x.id]);
    if (!todo.length) return this.toast('Tidak ada lampiran yang tersisa. Kotak surat sudah bersih.');
    const read = { ...m.read }, claimed = { ...m.claimed };
    for (const x of todo) { read[x.id] = 1; claimed[x.id] = 1; }
    const patch = { mail: { ...m, read, claimed } };
    const got = this.mailGive(todo, patch);
    this.setState(patch);
    this.toast(`${todo.length} lampiran diterima: ${got.join(', ')}.`);
  },
  // Removes letters that are read and have nothing left to claim.
  mailTidy() {
    const m = this.mailState(), done = this.mailList().filter(x => m.read[x.id] && (!hasGifts(x) || m.claimed[x.id]));
    if (!done.length) return this.toast('Belum ada surat yang selesai dibaca.');
    const gone = { ...m.gone };
    for (const x of done) gone[x.id] = 1;
    this.setState({ mail: { ...m, gone }, mailPick: null });
    this.toast(`${done.length} surat dirapikan ke laci. Lacinya penuh, tapi rapi.`);
  },

  mailView(s, { g, fmt }) {
    const m = this.mailState(s), list = this.mailList(s);
    return {
      isSurat: s.screen === 'surat', mailBadge: this.mailBadge(s),
      mailUnclaimed: list.filter(x => hasGifts(x) && !m.claimed[x.id]).length,
      letters: list.map(x => ({
        id: x.id, from: x.from, icon: x.icon, color: x.color, date: x.date, title: x.title, body: x.body,
        unread: !m.read[x.id], open: s.mailPick === x.id, claimed: !!m.claimed[x.id], hasGifts: hasGifts(x),
        gifts: x.gifts.map(gft => ({ ...GIFTS[gft.k], key: gft.k, text: `${fmt(gft.v)} ${GIFTS[gft.k].label}` })),
        toggle: g(() => this.mailOpen(x.id)), claim: g(() => this.mailClaim(x.id))
      })),
      mailClaimAll: g(() => this.mailClaimAll()), mailTidy: g(() => this.mailTidy()), mailBack: g(() => this.go('lobby'))
    };
  }
};
