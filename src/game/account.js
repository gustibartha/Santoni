// Online account: sign in with email + password and keep a copy of the save on the server,
// so progress follows the player to another phone. Mixed into Game.prototype like modes.js.
import * as cloud from './cloud.js';
import { snapshot, storeSave } from './save.js';

const ACCT0 = { user: null, email: '', password: '', mode: 'masuk', busy: false, checking: false, status: '', note: '' };
const PUSH_EVERY = 30000;
const hhmm = () => new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

export const accountMethods = {
  setAcct(patch) { this.setState(s => ({ acct: { ...ACCT0, ...s.acct, ...patch } })); },

  // Restores a signed-in session on start (also picks up the email-confirmation redirect).
  async initAccount() {
    if (!this.props.persist) return;
    this.setAcct({ checking: true });
    try {
      this._unwatch = await cloud.watchAuth((event, user) => {
        if (event === 'SIGNED_OUT') { this._cloudReady = false; this.setAcct({ user: null, status: '' }); }
      });
      const user = await cloud.currentUser();
      this.setAcct({ checking: false, user });
      if (user) await this.cloudReconcile(user);
    } catch {
      this.setAcct({ checking: false, status: 'Server akun tidak terjangkau. Progres tetap tersimpan di perangkat ini.' });
    }
  },

  async acctSubmit() {
    const a = { ...ACCT0, ...this.state.acct }, email = a.email.trim();
    if (a.busy) return;
    if (!/^\S+@\S+\.\S+$/.test(email)) return this.setAcct({ note: 'Tulis email yang lengkap, misalnya nama@gmail.com.' });
    if (a.password.length < 6) return this.setAcct({ note: 'Sandi minimal 6 karakter.' });
    this.setAcct({ busy: true, note: '' });
    try {
      if (a.mode === 'daftar') {
        const { user, confirmed } = await cloud.signUp(email, a.password);
        if (!confirmed) {
          return this.setAcct({ busy: false, mode: 'masuk', password: '', note: `Akun dibuat. Buka email ${email}, ketuk tautan konfirmasinya, lalu Masuk di sini.` });
        }
        await this.afterLogin(user);
      } else {
        await this.afterLogin(await cloud.signIn(email, a.password));
      }
    } catch (e) {
      this.setAcct({ busy: false, note: cloud.authMessage(e) });
    }
  },
  async afterLogin(user) {
    this.setAcct({ busy: false, password: '', note: '', user });
    this.toast(`Masuk sebagai ${user.email}.`);
    await this.cloudReconcile(user);
  },

  // After signing in, decide between the server copy and this device's progress.
  async cloudReconcile(user) {
    this._cloudReady = false;
    let row;
    try { row = await cloud.fetchSave(); } catch {
      return this.setAcct({ status: 'Server tidak terjangkau. Progres tetap tersimpan di perangkat ini.' });
    }
    const mark = cloud.syncMark();
    // No server copy yet, or this device wrote the newest one: carry on and upload.
    if (!row || (mark && mark.user === user.id && mark.at >= Date.parse(row.saved_at))) return this.cloudPush();
    this._cloudPending = row;
    this.setState({ confirm: { kind: 'cloud' } });
  },
  cloudUseServer() {
    const row = this._cloudPending, a = this.state.acct;
    if (!row || !a || !a.user) return this.setState({ confirm: null });
    this._leaving = true;
    storeSave(row.data);
    cloud.setSyncMark(a.user.id, row.saved_at);
    location.reload();
  },
  cloudUseLocal() {
    this._cloudPending = null;
    this.setState({ confirm: null });
    this.cloudPush('manual');
  },

  async cloudPush(manual) {
    const a = this.state.acct;
    if (!a || !a.user || this._pushing || this._leaving) return;
    const snap = snapshot(this.state, this.days(), this._uid);
    const body = JSON.stringify(snap.state);
    if (!manual && this._cloudReady && body === this._lastBody) return;
    this._pushing = true;
    try {
      const at = await cloud.pushSave(a.user.id, snap);
      cloud.setSyncMark(a.user.id, at);
      this._cloudReady = true; this._lastBody = body; this._lastPush = Date.now();
      this.setAcct({ status: `Tersimpan online · ${hhmm()}` });
      if (manual) this.toast('Progres tersimpan di server.');
    } catch {
      this.setAcct({ status: 'Gagal menyimpan online. Dicoba lagi nanti.' });
      if (manual) this.toast('Gagal menyimpan ke server. Periksa internet.');
    }
    this._pushing = false;
  },
  // Called by the local autosave; uploads at most every 30 s, and right away when the tab hides.
  cloudTick(now) {
    if (!this._cloudReady || this.state.confirm) return;
    if (now || Date.now() - (this._lastPush || 0) >= PUSH_EVERY) this.cloudPush();
  },

  async acctLogout() {
    if (this._cloudReady) await this.cloudPush();
    try { await cloud.signOut(); } catch { /* already signed out */ }
    cloud.clearSyncMark();
    this._cloudReady = false; this._lastBody = null;
    this.setAcct({ user: null, status: '', note: '' });
    this.toast('Keluar dari akun. Progres tetap ada di perangkat ini.');
  },

  accountView(s, { g, fmt }) {
    const a = { ...ACCT0, ...s.acct };
    const v = {
      acct: {
        checking: a.checking, user: a.user, mode: a.mode, busy: a.busy, email: a.email, password: a.password, note: a.note,
        status: a.status || (a.user ? 'Menyambungkan…' : ''), online: !!this.props.persist,
        setEmail: g(e => this.setAcct({ email: e.target.value, note: '' })),
        setPassword: g(e => this.setAcct({ password: e.target.value, note: '' })),
        setMode: g(mode => this.setAcct({ mode, note: '' })),
        submit: g(e => { if (e && e.preventDefault) e.preventDefault(); this.acctSubmit(); }),
        // If the first sync never finished (offline), check the server copy before overwriting it.
        saveNow: g(() => (this._cloudReady ? this.cloudPush('manual') : a.user && this.cloudReconcile(a.user))),
        logout: g(() => this.acctLogout())
      }
    };
    if (s.confirm && s.confirm.kind === 'cloud') {
      const row = this._cloudPending, st = row ? row.data.state : null;
      v.cloudConfirm = st ? {
        title: 'Ada progres di server',
        text: `Akun ini sudah punya progres: bab ${(st.chapter || 0) + 1}, ${fmt(st.coins || 0)} koin, disimpan ${new Date(row.saved_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}. Progres yang tidak dipilih akan ditimpa.`,
        yesLabel: 'Pakai server', noLabel: 'Perangkat ini',
        yes: g(() => this.cloudUseServer()), no: g(() => this.cloudUseLocal())
      } : null;
    }
    return v;
  }
};
