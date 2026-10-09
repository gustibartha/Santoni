import { Component } from 'react';
import * as C from './data.js';
import { stripEl, sceneryEl, popEl, bannerEl, burstEl, pullCardsEl, elementFx, auraEl } from './effects.jsx';
import GameView from './GameView.jsx';
import { loadSave, writeSave, exportCode, importCode } from './save.js';
import { music } from './music.js';
import { modeMethods } from './modes.js';
import { companionMethods } from './companions.js';
import { accountMethods } from './account.js';
import { mailMethods } from './mail.js';
import { shareMethods } from './sharing.js';
import { isStandalone, isIOS, canPrompt, promptInstall, onInstallChange } from './install.js';
import { sendEvent } from './analytics.js';
import { dailyMethods, wibDay } from './daily.js';
import * as M from './modesData.js';

// Local calendar day, used to reset daily missions at midnight.
const todayKey = () => { const d = new Date(); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; };

// Petualangan Santoni — game state + rules. `buildView()` turns state into the flat
// view model that the screen components in src/screens render.
export default class Game extends Component {
  constructor(props) {
    super(props);
    this._uid = 1000; this._acc = 0;
    this.logRef = el => { this._logEl = el; if (el) this.scrollLog(); };
    this._init = props.screen || 'lobby'; this._initDays = this.days(props);
    this.state = this.initial(this._init, props);
    const saved = props.persist && loadSave(this._initDays);
    if (saved) { this.state = { ...this.state, ...saved.state }; this._uid = saved.uid || this._uid; }
    if (this.state.confirm && this.state.confirm.kind === 'cloud') this.state.confirm = null;
    this.state = { ...this.state, ...this.energyPatch(this.state, Date.now()) };
    if (this.state.best.length < C.CHAPTERS.length) this.state.best = this.state.best.concat(Array(C.CHAPTERS.length - this.state.best.length).fill(0));
    // One-time gift of new gear for saves made before it existed.
    const had = saved ? saved.state.gifts || [] : null;
    const due = had ? C.GEAR_GIFTS.filter(g => !had.includes(g.id)) : [];
    if (due.length) {
      const items = due.flatMap(g => g.items);
      this.state = { ...this.state, bag: this.state.bag.concat(items), gifts: had.concat(due.map(g => g.id)),
        toast: { id: this.uid(), text: `Kiriman datang: ${items.map(id => C.ITEMS[id].name).join(', ')}. Pengirimnya tidak menulis nama.`, until: Date.now() + 5000 } };
    }
  }
  uid() { this._uid = (this._uid || 1000) + 1; return this._uid; }
  days(p) { const d = parseInt((p || this.props || {}).runDays, 10); return d === 10 || d === 30 ? d : 20; }
  marks(days) { return [Math.round(days * 0.35), Math.round(days * 0.7), days]; }
  pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  logEvent(name, props) { if (this.props.persist) sendEvent(name, props); }
  // 0 = brand new … 3 = everything in the lobby. Long-time saves (lots of days) count as unlocked.
  unlockTier(s = this.state) {
    if (!this.props.persist) return 3;
    const st = s.stats || {}, d = st.days || 0;
    return Math.min(3, Math.max(st.runs || 0, d >= 60 ? 3 : d >= 35 ? 2 : d >= 15 ? 1 : 0));
  }
  // Account level (shown on the avatar): chapter progress plus total days travelled.
  acctLevel(s = this.state) { return 1 + Math.floor((s.best || []).reduce((a, x) => a + x, 0) / 5) + Math.floor(((s.stats || {}).days || 0) / 20); }

  // Energy regen: `energyAt` is when the point currently refilling started; null while full.
  energyPatch(s, now) {
    const { max, regenMs } = C.ENERGY;
    if (s.energy >= max) return s.energyAt != null ? { energyAt: null } : null;
    if (s.energyAt == null) return { energyAt: now };
    const gained = Math.floor((now - s.energyAt) / regenMs);
    if (gained <= 0) return null;
    const energy = Math.min(max, s.energy + gained);
    return { energy, energyAt: energy >= max ? null : s.energyAt + gained * regenMs };
  }
  energyWait(s, now) {
    const { max, regenMs } = C.ENERGY;
    if (s.energy >= max || s.energyAt == null) return { next: 0, full: 0 };
    const next = Math.max(0, s.energyAt + regenMs - now);
    return { next, full: next + (max - s.energy - 1) * regenMs };
  }
  fmtWait(ms) {
    const t = Math.ceil(ms / 1000), h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), sec = t % 60;
    return h ? `${h}j ${m}m` : `${m}:${String(sec).padStart(2, '0')}`;
  }
  tapEnergy() {
    const s = this.state, w = this.energyWait(s, Date.now());
    this.go('shop');
    this.toast(s.energy >= C.ENERGY.max
      ? 'Energi penuh. Santoni tidak punya alasan untuk tidak pergi.'
      : `Energi +1 tiap 5 menit, juga saat game ditutup. Penuh dalam ${this.fmtWait(w.full)}.`);
  }
  // --- Missions -------------------------------------------------------------------------
  // Adds to lifetime stats and today's mission counters. `tower` records the highest floor.
  track(delta) {
    this.setState(st => {
      const day = todayKey(), stats = { ...(st.stats || {}) };
      const base = st.misi || { aClaimed: {} };
      const misi = base.date === day ? base : { ...base, date: day, counts: {}, dClaimed: {} };
      const counts = { ...misi.counts };
      for (const [k, v] of Object.entries(delta)) {
        if (!v) continue;
        if (k === 'tower') { stats.tower = Math.max(stats.tower || 0, v); continue; }
        stats[k] = (stats[k] || 0) + v; counts[k] = (counts[k] || 0) + v;
      }
      return { stats, misi: { ...misi, counts } };
    });
  }
  questProgress(q, daily, s = this.state) {
    if (daily) return (s.misi && s.misi.date === todayKey() ? s.misi.counts[q.stat] : 0) || 0;
    if (q.stat === 'chapters') return s.best.filter(x => x >= this.days()).length;
    return (s.stats || {})[q.stat] || 0;
  }
  questClaimed(q, daily, s = this.state) {
    const m = s.misi || {};
    return daily ? m.date === todayKey() && !!(m.dClaimed || {})[q.id] : !!(m.aClaimed || {})[q.id];
  }
  claimQuest(id, daily) {
    const s = this.state, q = (daily ? C.DAILY_QUESTS : C.QUESTS).find(x => x.id === id);
    if (!q || this.questClaimed(q, daily)) return;
    if (this.questProgress(q, daily) < q.target) return this.toast('Belum selesai. Santoni sudah mencoba, sedikit.');
    const day = todayKey(), base = s.misi || {};
    const misi = base.date === day ? { ...base } : { ...base, date: day, counts: {}, dClaimed: {} };
    if (daily) misi.dClaimed = { ...misi.dClaimed, [id]: 1 }; else misi.aClaimed = { ...(misi.aClaimed || {}), [id]: 1 };
    const rw = q.reward, patch = { misi };
    if (rw.coins) patch.coins = s.coins + rw.coins;
    if (rw.gems) patch.gems = s.gems + rw.gems;
    if (rw.energy) patch.energy = s.energy + rw.energy;
    if (rw.item) patch.bag = s.bag.concat(rw.item);
    if (rw.asah) patch.asah = (s.asah || 0) + rw.asah;
    this.setState(patch);
    this.toast(`Misi "${q.title}" selesai: ${this.rewardLabel(rw)}.`);
  }
  rewardLabel(rw) {
    const fmt = n => n.toLocaleString('id-ID');
    return rw.coins ? `+${fmt(rw.coins)} koin` : rw.gems ? `+${rw.gems} permata` : rw.energy ? `+${rw.energy} energi` : rw.asah ? `+${rw.asah} Batu Asah` : C.ITEMS[rw.item].name;
  }

  // --- Festivals ---------------------------------------------------------------------------
  festNow() {
    const tz = new Date().getTimezoneOffset() * 60000, day = Math.floor((Date.now() - tz) / 864e5);
    const block = Math.floor(day / C.FEST_DAYS), fest = C.FESTIVALS[block % C.FESTIVALS.length];
    const next = C.FESTIVALS[(block + 1) % C.FESTIVALS.length];
    // A real-calendar season (Harbolnas, Tahun Baru, Ramadan, Lebaran, 17-an) takes over while it runs.
    const today = wibDay(), se = C.SEASONS.find(x => today >= x.start && today <= x.end);
    if (se) {
      const base = C.FESTIVALS.find(f => f.id === se.base);
      return { ...base, ...se.look, id: base.id, season: se.id, key: `musim-${se.id}`, endsAt: new Date(`${se.end}T00:00:00+07:00`).getTime() + 864e5, next };
    }
    return { ...fest, key: `${fest.id}-${block}`, endsAt: (block + 1) * C.FEST_DAYS * 864e5 + tz, next };
  }
  // The next real-calendar seasons, for the festival screen's calendar.
  upcomingSeasons() { const today = wibDay(); return C.SEASONS.filter(x => x.end >= today).slice(0, 4).map(x => ({ id: x.id, name: x.look.name, icon: x.look.icon, color: x.look.color, live: x.start <= today,
    when: `${new Date(`${x.start}T12:00:00+07:00`).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} – ${new Date(`${x.end}T12:00:00+07:00`).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}` })); }
  festState(s = this.state) {
    const f = this.festNow();
    return s.fest && s.fest.key === f.key ? s.fest : { key: f.key, tokens: 0, bought: {} };
  }
  festGain(n) {
    if (!n) return;
    this.setState(st => { const cur = this.festState(st); return { fest: { ...cur, tokens: cur.tokens + n } }; });
  }
  festBuy(id) {
    const s = this.state, f = this.festNow(), st = this.festState(s), it = f.shop.find(x => x.id === id);
    if (!it || st.bought[id]) return;
    if (st.tokens < it.cost) return this.toast(`${f.token} kurang. Kalahkan musuh selama festival untuk mengumpulkannya.`);
    const gv = it.give, patch = { fest: { ...st, tokens: st.tokens - it.cost, bought: { ...st.bought, [id]: 1 } } };
    if (gv.coins) patch.coins = s.coins + gv.coins;
    if (gv.gems) patch.gems = s.gems + gv.gems;
    if (gv.energy) patch.energy = s.energy + gv.energy;
    if (gv.item) patch.bag = s.bag.concat(gv.item);
    this.setState(patch);
    this.toast(gv.item ? `${C.ITEMS[gv.item].name} didapat. ${C.ITEMS[gv.item].desc}` : `Ditukar: ${this.rewardLabel(gv)}.`);
    if (gv.item) music.sfx('legend');
  }
  offerPrice(of) { return typeof of.price === 'number' && of.cur !== 'ad' && this.festNow().id === 'diskon' ? Math.round(of.price / 2) : of.price; }

  // --- Friends ------------------------------------------------------------------------------
  friendsToday(s = this.state) {
    const day = todayKey(), fr = s.friends || { points: {}, tiers: {} };
    return fr.date === day ? fr : { ...fr, date: day, greeted: {} };
  }
  greetFriend(id) {
    const s = this.state, fd = C.FRIENDS.find(x => x.id === id), fr = this.friendsToday(s);
    if (!fd || fr.greeted[id]) return;
    // Points rise by one per day, so each tier threshold is crossed exactly once.
    const points = { ...(fr.points || {}), [id]: ((fr.points || {})[id] || 0) + 1 };
    const tier = C.FRIEND_TIERS.find(t => t.at === points[id]);
    const patch = { friends: { ...fr, greeted: { ...fr.greeted, [id]: 1 }, points }, energy: s.energy + C.FRIEND_GIFT.energy };
    let msg = `${this.pick(fd.lines)} +${C.FRIEND_GIFT.energy} energi.`;
    if (tier) { patch.gems = s.gems + tier.gems; msg = `${C.ENEMIES[fd.kind].name} kini ${tier.title} Santoni. +${tier.gems} permata.`; music.sfx('levelup'); }
    this.setState(patch);
    this.toast(msg);
  }
  async shareRecord() {
    const s = this.state, done = s.best.filter(x => x >= this.days()).length, tower = (s.tower || {}).best || 0;
    const text = `Santoni sudah menamatkan ${done} dari ${C.CHAPTERS.length} bab dan mencapai lantai ${tower} Menara Tanpa Lift. Ekspresinya tetap sama.`;
    const url = 'https://santoni.vercel.app';
    try {
      if (navigator.share) { await navigator.share({ title: 'Petualangan Santoni', text, url }); return; }
      await navigator.clipboard.writeText(`${text} ${url}`);
      this.toast('Rekor disalin. Tempel di obrolan mana pun. Santoni tidak akan tahu.');
    } catch { /* share sheet dismissed */ }
  }

  // --- Progress backup ---------------------------------------------------------------------
  async copyBackup() {
    const code = exportCode(this.state, this.days(), this._uid);
    try {
      await navigator.clipboard.writeText(code);
      this.toast('Kode progres disalin. Simpan di tempat aman, misalnya catatan atau chat ke diri sendiri.');
    } catch {
      window.prompt('Salin kode progres ini:', code);
    }
  }
  loadBackup() {
    const code = window.prompt('Tempel kode progres (diawali SANTONI1:). Progres di perangkat ini akan diganti.');
    if (code == null) return;
    if (!importCode(code)) return this.toast('Kodenya tidak dikenali. Santoni memeriksa dua kali. Tetap tidak dikenali.');
    this._leaving = true; // keep the pagehide autosave from overwriting the imported save
    location.reload();
  }

  // --- Leaving a run or the tower ---------------------------------------------------------
  askQuit() { if (this.state.run) this.setState({ confirm: { kind: this.state.run.tower ? 'tower' : 'run' } }); }
  closeConfirm() { this.setState({ confirm: null }); }

  // --- Menara Tanpa Lift ------------------------------------------------------------------
  applySkillStats(r, id) {
    const fx = [];
    if (id === 'cakar') { const d = Math.round(r.atk * 0.12); r.atk += d; fx.push({ k: 'atk', v: d }); }
    if (id === 'bulu') { const d = Math.round(r.maxHp * 0.18); r.maxHp += d; r.hp += d; fx.push({ k: 'maxHp', v: d }); }
    if (id === 'kardus') { const d = Math.max(1, Math.round(r.def * 0.15)); r.def += d; fx.push({ k: 'def', v: d }); }
    return fx;
  }
  startTower() {
    const s = this.state, T = C.TOWER, floor = (s.tower || {}).floor || 1;
    if (s.energy < T.cost) return this.toast(`Butuh ${T.cost} energi. Tangganya panjang.`);
    const st = this.heroBase(s.equipped), boss = floor % 5 === 0;
    const key = boss ? T.bosses[(floor / 5 - 1) % T.bosses.length] : this.pick(T.pool);
    const chapter = Math.min(C.CHAPTERS.length - 1, Math.floor((floor - 1) / 2)), lvl = 1 + Math.floor(floor / 2);
    // A tower climb comes with a random kit of skills that grows every 3 floors.
    const skills = this.rollSkills(3 + Math.min(4, Math.floor(floor / 3)));
    const r = { tower: floor, weapon: s.equipped.senjata || 'none', chapter, day: Math.min(30, 4 + floor), maxDay: 20, hp: st.hp, maxHp: st.hp,
      atk: Math.round(st.atk * (1 + 0.05 * lvl)), def: st.def, lvl, xp: 0, xpNext: 100, skills, coins: 0, kills: 0, used: [], auto: true, event: null, queue: null, log: [] };
    skills.forEach(id => this.applySkillStats(r, id));
    const e = C.ENEMIES[key], en = this.makeEnemy(key, r.day, chapter);
    const grow = 1 + floor * 0.05; en.hp = en.maxHp = Math.round(en.maxHp * grow); en.atk = Math.round(en.atk * (1 + floor * 0.03));
    this._acc = 0;
    this.setState({ energy: s.energy - T.cost, screen: 'battle', run: r, offer: null, result: null, pull: null, shake: null,
      battle: { enemy: en, final: true, tower: floor, turn: 1, heroTurn: true, hits: 0, firstDone: false, napUsed: false, over: null, pops: [], proc: null,
        banner: { id: this.uid(), text: `Lantai ${floor}` },
        log: [{ id: this.uid(), text: `Lantai ${floor}. ${e.name} menghadang. ${e.intro}`, tone: 'enemy' }] } });
  }
  finishTower(r, win) {
    const s = this.state, floor = r.tower, boss = floor % 5 === 0, prev = s.tower || { floor: 1, best: 0 };
    if (win) this.track({ tower: floor });
    this.setState({ screen: 'result', battle: null, offer: null, shake: null, confirm: null, run: { ...r, event: null },
      tower: win ? { floor: floor + 1, best: Math.max(prev.best, floor) } : prev,
      result: { tower: floor, win, day: floor, maxDay: floor, kills: win ? 1 : 0, skills: r.skills.length, xp: 0, chapter: r.chapter, record: win && floor > prev.best,
        coins: win ? 250 * floor * (boss ? 2 : 1) : 0, gems: win ? (boss ? 40 + 4 * floor : 5 + floor) : 0, item: win && boss ? this.rollItem(true) : null,
        quote: win ? 'Satu lantai lagi. Tangganya tidak berkurang.' : 'Santoni turun lewat tangga darurat. Pelan-pelan.' } });
  }

  // Number of copies of a skill the current run has learned (stacks scale most effects).
  stacks(r, id) { return r ? r.skills.filter(k => k === id).length : 0; }
  ruleOf(r) { return r && !r.tower ? (C.CHAPTERS[r.chapter].rule || {}).id : null; }
  setStance(id) { if (C.STANCES[id]) { this.setState({ stance: id }); this.toast(`${C.STANCES[id].name}: ${C.STANCES[id].desc}`); } }
  weaponOf(r) { return (r && r.weapon) || this.state.equipped.senjata || 'none'; }
  hasEl(r, el) {
    if (!r) return false;
    const gear = r.els || Object.keys(this.equipEls());
    return gear.includes(el) || r.skills.some(id => (C.SKILLS.find(k => k.id === id) || {}).el === el);
  }
  critBonus(r) { return r && r.crit != null ? r.crit : this.resonance().petir; }
  hasCombo(r, id) { const c = C.COMBOS.find(x => x.id === id); return !!c && c.els.every(el => this.hasEl(r, el)); }
  // Bangun Kesiangan: each copy revives once per run at 50% HP. Mutates `r`.
  tryRevive(r) {
    const n = this.stacks(r, 'kesiangan');
    if (!n || (r.revived || 0) >= n) return false;
    r.revived = (r.revived || 0) + 1; r.hp = Math.round(r.maxHp * 0.5);
    return true;
  }

  seedJournal(days) {
    const E = (id, day, text, fx, tone) => ({ id, day, text, fx: fx || [], tone: tone || 'plain' });
    return [
      { id: 901, chapter: 2, day: Math.round(days * 0.7), maxDay: days, win: false, entries: [
        E(1, 0, 'Santoni berangkat ke Rawa Kerupuk. Tidak ada yang mengantar.'),
        E(2, 2, 'Santoni mendaftar asuransi. Polisnya berlaku sejak kemarin.', [{ k: 'maxHp', v: 160 }]),
        E(3, 4, 'Santoni mempelajari Ekor Kipas. Ekor Santoni bergerak sendiri. Santoni memutuskan tidak bertanya.', [], 'skill'),
        E(4, 7, 'Seekor siput menyalip Santoni. Santoni tidak mengejar.'),
        E(5, 10, 'Lebah Notaris kalah. Ia mengesahkan kekalahannya sendiri. Rapi.', [{ k: 'coins', v: 180 }, { k: 'xp', v: 90 }], 'win'),
        E(6, 12, 'Santoni melihat ke dalam sumur. Isinya lebah. Lebahnya juga kaget.', [{ k: 'hp', v: -160 }], 'bad'),
        E(7, 13, 'Santoni berdiri dengan dua kaki. Bebek Satpam memutuskan punya urusan lain.', [{ k: 'coins', v: 59 }], 'win'),
        E(8, Math.round(days * 0.7), 'Kelinci Penagih menendang terlalu keras. Santoni memutuskan pulang.', [], 'bad')
      ] },
      { id: 902, chapter: 1, day: days, maxDay: days, win: true, entries: [
        E(11, 0, 'Santoni berangkat ke Pasar Subuh. Pasarnya sudah tutup.'),
        E(12, 5, 'Santoni menang lomba diam. Katak masih diam. Mungkin katak juga menang.', [{ k: 'xp', v: 60 }]),
        E(13, 9, 'Santoni makan kerupuk melempem. Melempem, tapi jujur.', [{ k: 'hp', v: 110 }]),
        E(14, days, 'Angsa Pengacara kalah. Ia mengajukan banding. Banding ditolak.', [{ k: 'coins', v: 1500 }], 'win')
      ] }
    ];
  }
  initial(screen, p) {
    const days = this.days(p);
    const s = {
      screen: 'lobby', coins: 12480, gems: 1480, energy: 25, energyAt: null, clock: 0, musicOn: !music.muted, chapter: 2,
      best: [days, days, Math.round(days * 0.7)].concat(Array(C.CHAPTERS.length - 3).fill(0)),
      chests: { '0-0': 1, '0-1': 1, '0-2': 1, '1-0': 1, '1-1': 1, '1-2': 1, '2-0': 1 },
      equipped: { senjata: 'sumpit', topi: 'panci', baju: 'syal', kalung: 'tutup', sabuk: 'rafia', sepatu: 'sandal' },
      bag: ['centong', 'raket', 'helm', 'caping', 'gesper', 'payung', 'pramuka', 'jashujan', 'cincin', 'kaoskaki', 'payung', 'cincin', 'kipasangin', 'bawang'], gifts: C.GEAR_GIFTS.map(g => g.id),
      pity: 2, sold: {}, bubble: 0, speed: 1, daily: false, act: null, heroPoseIdx: 0, openJ: null, tick: 0, journal: this.seedJournal(days),
      run: null, offer: null, battle: null, result: null, pull: null, toast: null, shake: null,
      stats: {}, misi: { date: todayKey(), counts: {}, dClaimed: {}, aClaimed: {} }, misiTab: 'harian', stance: 'santai', tower: { floor: 1, best: 0 }, confirm: null,
      asah: 0, gearLv: {}, gearStar: {}, comp: { owned: { bebek: { lv: 1, star: 0, shards: 0 } }, team: ['bebek', null, null] }, pets: { owned: {}, active: null }, telur: 1, pakan: 10, modeTab: 'tantangan', mine: { floor: 1, tiles: this.mineFloor(1), picks: M.MINE.picks }
    };
    const d = Math.max(6, Math.round(days * 0.75));
    const mkRun = () => ({
      chapter: 2, day: d, maxDay: days, stance: 'santai', forks: [], midDone: true, hp: 868, maxHp: 1310, atk: 172, def: 66, lvl: 5, xp: 70, xpNext: 160,
      weapon: p.weapon && (p.weapon === 'none' || C.ITEMS[p.weapon]) ? p.weapon : undefined,
      skills: p.skills && p.skills.length ? p.skills.filter(id => C.SKILLS.some(k => k.id === id)) : ['kipas', 'cakar', 'bulu', 'kipas'], coins: 340, kills: 5, used: ['sandal', 'katak', 'tombol'], auto: true, event: null, queue: null,
      log: [
        { id: 1, day: d - 5, text: 'Kumbang Galau kalah. Ia terbang, merasa sedikit lebih baik.', fx: [{ k: 'coins', v: 62 }, { k: 'xp', v: 45 }], tone: 'win' },
        { id: 2, day: d - 4, text: 'Santoni memakai sandal kiri. Langkahnya kini asimetris.', fx: [{ k: 'def', v: 10 }], tone: 'plain' },
        { id: 3, day: d - 3, text: 'Seekor siput menyalip Santoni. Santoni tidak mengejar.', fx: [], tone: 'plain' },
        { id: 4, day: d - 2, text: 'Santoni berdiri dengan dua kaki. Bebek Satpam memutuskan punya urusan lain.', fx: [{ k: 'coins', v: 59 }, { k: 'xp', v: 25 }], tone: 'win' },
        { id: 5, day: d - 1, text: 'Santoni tidur siang empat jam. Dunia tidak menunggu.', fx: [{ k: 'hp', v: 90 }], tone: 'plain' }
      ]
    });
    if (screen === 'run' || screen === 'skill' || screen === 'gertak') {
      s.screen = 'run'; s.run = mkRun();
      if (screen === 'run') s.run.event = { kind: 'choice', id: 'tombol' };
      if (screen === 'gertak') s.run.event = { kind: 'enemy', enemy: 'kelinci' };
      if (screen === 'skill') { s.run.day = d - 1; s.offer = { kind: 'lvl', from: 5, to: 6, ids: ['kipas', 'tidur', 'statis'], rerolls: 1 }; }
    } else if (screen === 'battle') {
      s.screen = 'battle'; s.run = mkRun(); s.run.day = days; s.run.hp = 640; s.act = { who: 'hero', t: 0 };
      const en = this.makeEnemy(p.enemy && C.ENEMIES[p.enemy] ? p.enemy : 'angsa', days, 2); en.hp = Math.round(en.maxHp * 0.54);
      s.battle = {
        enemy: en, final: true, turn: 7, heroTurn: true, ult: 80, hits: 6, firstDone: true, napUsed: false, over: null, proc: 'kipas',
        log: [
          { id: 11, text: 'Angsa Pengacara menghadang. Ia mewakili semua angsa yang pernah merasa dirugikan.', tone: 'enemy' },
          { id: 12, text: 'Angsa Pengacara mengajukan keberatan. Dengan paruh. 148.', tone: 'enemy' },
          { id: 13, text: 'Santoni menatap kosong, lalu memukul. Kritis. 412.', tone: 'crit' },
          { id: 14, text: 'Ekor Santoni mengipas. Angsa Pengacara jadi sejuk. 275.', tone: 'skill' }
        ],
        pops: [{ id: 21, t: 0, side: 'enemy', text: 'KRITIS 412', kind: 'crit', dx: -24, dy: 0 }, { id: 22, t: 0, side: 'enemy', text: '−275', kind: 'skill', dx: 46, dy: 40 }],
        banner: { id: 31, text: 'Ekor Kipas!' }
      };
    } else if (screen === 'result') {
      s.screen = 'result';
      s.result = { win: false, day: Math.round(days * 0.8), maxDay: days, kills: 6, skills: 4, coins: 3420, gems: 40, xp: 312, item: 'centong', record: true, chapter: 2, quote: C.QUOTES[0] };
    } else if (screen === 'hero' || screen === 'map' || screen === 'shop') s.screen = screen;
    // Preview helpers: ?team=kucing,merak,bebek&pet=ayam put a ready team into the demo state.
    if (p.team) { const owned = {}; p.team.forEach(id => { owned[id] = { lv: 10, star: 1, shards: 0 }; }); s.comp = { owned, team: [0, 1, 2].map(i => p.team[i] || null) }; }
    if (p.pet) s.pets = { owned: { [p.pet]: { lv: 8, star: 0, xp: 0 } }, active: p.pet };
    if (p.elite && s.run && s.run.event && s.run.event.kind === 'enemy') s.run.event = { ...s.run.event, enemy: p.enemy && C.ENEMIES[p.enemy] ? p.enemy : s.run.event.enemy, elite: true };
    if (p.elite && s.battle) { s.battle = { ...s.battle, elite: true, final: false, enemy: this.makeElite(this.makeEnemy(p.enemy && C.ENEMIES[p.enemy] && !C.ENEMIES[p.enemy].boss ? p.enemy : 'tikus', days, 2)) }; }
    return s;
  }

  componentDidMount() {
    this.syncTimer();
    this.arenaSettle();
    if (!this.props.still) {
      // Audio may only start from a user gesture; any tap or key press unlocks it.
      this._unlock = () => music.unlock();
      this._vis = () => music.setHidden(document.hidden);
      addEventListener('pointerdown', this._unlock);
      addEventListener('keydown', this._unlock);
      document.addEventListener('visibilitychange', this._vis);
      music.setTrack(this.trackFor(this.state));
    }
    if (this.props.persist) {
      this._save = hide => { if (this._leaving) return; writeSave(this.state, this.days(), this._uid); this.cloudTick(hide === true); };
      this._saveIv = setInterval(this._save, 2000);
      this._saveHide = () => this._save(true);
      addEventListener('pagehide', this._saveHide);
      document.addEventListener('visibilitychange', this._saveHide);
      this.initAccount();
      this.logEvent('open', { standalone: isStandalone(), source: new URLSearchParams(location.search).get('source') || '', runs: (this.state.stats || {}).runs || 0, chapter: this.state.chapter });
      this._offInstall = onInstallChange(() => this.setState({ installTick: Date.now() }));
    }
    this.scrollLog();
  }
  componentWillUnmount() {
    clearInterval(this._iv); this._iv = null;
    if (this._unlock) {
      removeEventListener('pointerdown', this._unlock);
      removeEventListener('keydown', this._unlock);
      document.removeEventListener('visibilitychange', this._vis);
    }
    if (this._save) {
      clearInterval(this._saveIv);
      removeEventListener('pagehide', this._saveHide);
      document.removeEventListener('visibilitychange', this._saveHide);
    }
    if (this._unwatch) this._unwatch();
    if (this._offInstall) this._offInstall();
  }
  componentDidUpdate(pp, ps) {
    const p = this.props;
    if ((p.screen || 'lobby') !== this._init || this.days(p) !== this._initDays) {
      this._init = p.screen || 'lobby'; this._initDays = this.days(p);
      this.setState(this.initial(this._init, p));
    }
    if (!!pp.still !== !!p.still) this.syncTimer();
    if (!p.still && ps.screen !== this.state.screen) music.setTrack(this.trackFor(this.state));
    const a = ps.run ? ps.run.log.length : -1, b = this.state.run ? this.state.run.log.length : -1;
    if (a !== b || ps.screen !== this.state.screen || !!ps.offer !== !!this.state.offer) this.scrollLog();
  }
  trackFor(s) { return s.screen === 'battle' ? 'battle' : 'santai'; }
  toggleMusic() {
    const on = !this.state.musicOn;
    music.setMuted(!on);
    this.setState({ musicOn: on });
    this.toast(on ? 'Musik menyala. Santoni mengangguk pelan mengikuti irama.' : 'Musik dimatikan. Santoni bersenandung sendiri.');
  }
  // The whole game runs on one 100 ms tick; `still` freezes it for static previews.
  syncTimer() {
    clearInterval(this._iv); this._iv = null;
    if (!this.props.still) this._iv = setInterval(() => this.loop(), 100);
  }
  scrollLog() { requestAnimationFrame(() => { const el = this._logEl; if (el) el.scrollTop = el.scrollHeight; }); }

  loop() {
    const s = this.state, p = this.props || {};
    if (p.still || s.confirm) return;
    if (s.shake) this.setState({ shake: null });
    if (s.act && Date.now() - s.act.t > 380) this.setState({ act: null });
    if (s.screen === 'lobby') { this._tk = (this._tk || 0) + 1; if (this._tk % 35 === 0) this.setState({ tick: (s.tick || 0) + 1 }); }
    if (s.toast && Date.now() > s.toast.until) this.setState({ toast: null });
    const ep = this.energyPatch(s, Date.now());
    if (ep) this.setState(ep);
    else if (s.energy < C.ENERGY.max && Date.now() - (s.clock || 0) >= 1000) this.setState({ clock: Date.now() });
    const step = 100 * (s.speed || 1);
    if (s.screen === 'run' && s.run && !s.run.event && !s.offer && s.run.auto) {
      this._acc += step;
      if (this._acc >= 1400) { this._acc = 0; this.advanceDay(); }
    } else if (s.screen === 'battle' && s.battle) {
      this._acc += step;
      if (s.battle.over) { if (this._acc >= 3400) { this._acc = 0; this.endBattle(); } }
      else if (this._acc >= 650) { this._acc = 0; this.battleStep(); }
    } else this._acc = 0;
  }

  heroBase(eq) {
    let atk = 100, hp = 800, def = 20;
    const pet = this.petState().active ? this.petStats(this.petState().active) : { atk: 0, hp: 0, def: 0 };
    atk += pet.atk; hp += pet.hp; def += pet.def;
    Object.values(eq).forEach(id => { const it = C.ITEMS[id]; if (!it) return; const val = this.itemVal(id); if (it.stat === 'ATK') atk += val; else if (it.stat === 'HP') hp += val; else def += val; });
    const tp = this.teamPct(), rs = this.resonance(eq);
    return { atk: Math.round(atk * (1 + tp.ATK / 100) * (1 + rs.api / 100)), hp: Math.round(hp * (1 + tp.HP / 100) * (1 + rs.tanah / 100)), def: Math.round(def * (1 + tp.DEF / 100) * (1 + rs.angin / 100)) };
  }
  power(st) { return st.atk * 40 + st.hp * 4 + st.def * 60; }
  itemScore(id) { const it = C.ITEMS[id]; return !it ? 0 : it.stat === 'HP' ? it.val / 6 : it.stat === 'DEF' ? it.val * 1.6 : it.val; }
  // Minibos: a tougher version of a pool enemy, scaled to Santoni so it always pushes back:
  // about 13 of his plain hits to fell, and roughly an eighth of his HP per blow after DEF.
  makeElite(en, r) {
    let hp = Math.round(en.maxHp * 3), atk = Math.round(en.atk * 1.45);
    if (r) { hp = Math.max(hp, Math.round(r.atk * 13)); atk = Math.max(atk, Math.round(r.def * 0.5 + r.maxHp * 0.135)); }
    return { ...en, elite: true, lvl: en.lvl + 3, hp, maxHp: hp, atk, def: Math.round(en.def * 1.35) };
  }
  makeEnemy(key, day, chapter = 0) {
    const e = C.ENEMIES[key], f = (1 + day * 0.06) * (1 + 0.14 * chapter), hp = Math.round(e.hp * f);
    return { key, name: e.name, icon: e.icon, boss: !!e.boss, lvl: Math.max(1, Math.round(day * 1.1) + (e.boss ? 4 : 0) + chapter * 3), hp, maxHp: hp, atk: Math.round(e.atk * f), def: Math.round(e.def * f) };
  }
  rollSkills(n) {
    const pool = C.SKILLS.slice(), out = [];
    while (out.length < n && pool.length) {
      const tot = pool.reduce((a, k) => a + C.RAR[k.rar].w, 0); let x = Math.random() * tot, i = 0;
      for (; i < pool.length; i++) { x -= C.RAR[pool[i].rar].w; if (x <= 0) break; }
      out.push(pool.splice(Math.min(i, pool.length - 1), 1)[0].id);
    }
    return out;
  }
  rollItem(good) {
    const ids = Object.keys(C.ITEMS).filter(id => !C.ITEMS[id].event && (!good || C.ITEMS[id].rar !== 'Biasa'));
    const tot = ids.reduce((a, id) => a + C.RAR[C.ITEMS[id].rar].w, 0); let x = Math.random() * tot;
    for (const id of ids) { x -= C.RAR[C.ITEMS[id].rar].w; if (x <= 0) return id; }
    return ids[ids.length - 1];
  }
  bluffChance(r) { return Math.min(0.9, 0.55 + 0.15 * r.skills.filter(k => k === 'gertak').length); }

  go(key) { this.setState({ screen: key, pull: null }); }
  toast(text) { this.setState({ toast: { id: this.uid(), text, until: Date.now() + 2800 } }); }
  shiftChapter(dir) {
    const days = this.days(), n = this.state.chapter + dir;
    if (n < 0 || n > C.CHAPTERS.length - 1) return;
    if (n > 0 && this.state.best[n - 1] < days) return this.toast('Bab berikutnya masih terkunci. Gemboknya serius.');
    this.setState({ chapter: n });
  }
  selectChapter(i) {
    if (i > 0 && this.state.best[i - 1] < this.days()) return this.toast(`Selesaikan Bab ${i} dulu. Gemboknya serius.`);
    this.setState({ chapter: i });
  }
  tapDaily() {
    if (this.state.daily) return this.toast('Sudah diambil. Kembali besok. Santoni juga.');
    this.setState({ daily: true, gems: this.state.gems + 50 });
    this.toast('Login hari ke-4: +50 permata. Santoni datang lagi besok. Mungkin.');
  }
  claimChest(ci, mi) {
    const s = this.state, m = this.marks(this.days())[mi], key = `${ci}-${mi}`;
    if (s.chests[key]) return this.toast('Peti ini sudah kosong. Santoni sudah memeriksa dua kali.');
    if (s.best[ci] < m) return this.toast(`Capai Hari ${m} untuk membuka. Petinya sabar.`);
    const gems = 30 * (mi + 1);
    this.setState({ chests: Object.assign({}, s.chests, { [key]: 1 }), gems: s.gems + gems });
    this.toast(`Peti dibuka: +${gems} permata.`);
  }

  startRun() {
    const s = this.state;
    const { cost } = C.ENERGY;
    if (s.energy < cost) return this.toast(`Energi habis. Santoni juga. Energi +1 dalam ${this.fmtWait(this.energyWait(s, Date.now()).next)}.`);
    const st = this.heroBase(s.equipped), ch = C.CHAPTERS[s.chapter];
    const days = this.days(), stance = C.STANCES[s.stance] ? s.stance : 'santai';
    const run = { weapon: s.equipped.senjata || 'none', chapter: s.chapter, day: 0, maxDay: days, hp: st.hp, maxHp: st.hp, atk: st.atk, def: st.def, lvl: 1, xp: 0, xpNext: 70, skills: [], coins: 100, kills: 0, used: [], auto: true, event: null, queue: null,
      stance, route: null, forks: [Math.round(days / 3), Math.round(days * 2 / 3)], midDone: false,
      log: [{ id: this.uid(), day: 0, text: `Santoni berangkat ke ${ch.name} dengan gaya ${C.STANCES[stance].name.toLowerCase()}. Tidak ada yang mengantar.`, fx: [], tone: 'plain' }] };
    const rule = (ch.rule || {}).id;
    if (rule === 'ombak') {
      const slots = Object.keys(s.equipped).filter(t => C.ITEMS[s.equipped[t]]);
      if (slots.length) {
        const t = this.pick(slots), it = C.ITEMS[s.equipped[t]];
        const val = this.itemVal(s.equipped[t]);
        if (it.stat === 'ATK') run.atk -= val; else if (it.stat === 'HP') { run.maxHp -= val; run.hp = run.maxHp; } else run.def -= val;
        run.lost = it.name; run.lostSlot = t;
        run.log.push({ id: this.uid(), day: 0, text: `Ombak membawa ${it.name}. Santoni melambaikan tangan. ${it.name} tidak membalas.`, fx: [{ k: it.stat === 'HP' ? 'maxHp' : it.stat.toLowerCase(), v: -val }], tone: 'bad' });
      }
    }
    run.els = Object.keys(this.equipEls(s.equipped, run.lostSlot)); run.crit = this.resonance(s.equipped).petir;
    if (rule === 'manis') run.def = Math.round(run.def * 0.85);
    this._acc = 0;
    this.setState({ energy: s.energy - cost, screen: 'run', run, battle: null, result: null, pull: null, offer: { kind: 'start', ids: this.rollSkills(3), rerolls: 1 } });
    this.logEvent('run_start', { chapter: run.chapter, stance: run.stance });
  }
  toggleAuto() { const r = this.state.run; if (r) this.setState({ run: Object.assign({}, r, { auto: !r.auto }) }); }
  quitRun() {
    const r = this.state.run; if (!r) return;
    this.setState({ confirm: null });
    if (r.tower) this.finishTower({ ...r }, false); else if (r.challenge) this.finishChallenge({ ...r }, false); else this.finishRun({ ...r }, false);
  }
  pickSkill(id) {
    const s = this.state; if (!s.run) return;
    const r = Object.assign({}, s.run, { skills: s.run.skills.concat(id) }), k = C.SKILLS.find(x => x.id === id), fx = [];
    fx.push(...this.applySkillStats(r, id));
    r.log = r.log.concat({ id: this.uid(), day: r.day, text: `Santoni mempelajari ${k.name}. ${k.learn}`, fx, tone: 'skill' });
    const newCombos = C.COMBOS.filter(c => this.hasCombo(r, c.id) && !this.hasCombo(s.run, c.id));
    for (const c of newCombos) r.log = r.log.concat({ id: this.uid(), day: r.day, text: `Kombo elemen terbuka: ${c.name}. ${c.desc}`, fx: [], tone: 'skill' });
    this.track({ skills: 1, combos: newCombos.length });
    if (newCombos.length) this.toast(`Kombo ${newCombos.map(c => c.name).join(' + ')}! ${newCombos[0].desc}`);
    const next = r.queue || null; r.queue = null; this._acc = 0;
    this.setState({ run: r, offer: next });
  }
  reroll() { const o = this.state.offer; if (!o || o.rerolls < 1) return; this.setState({ offer: Object.assign({}, o, { ids: this.rollSkills(3), rerolls: o.rerolls - 1 }) }); }

  advanceDay() {
    const s = this.state; if (!s.run) return;
    const r = Object.assign({}, s.run, { day: s.run.day + 1 });
    this.track({ days: 1 });
    const ch = C.CHAPTERS[r.chapter], rule = this.ruleOf(r), heal = this.healMult(r);
    if (r.stance === 'santai') r.hp = Math.min(r.maxHp, r.hp + Math.round(r.maxHp * 0.03 * heal));
    if (r.route && r.day > r.route.until) r.route = null;
    if (r.day >= r.maxDay) { r.day = r.maxDay; r.event = { kind: 'enemy', enemy: ch.boss, final: true }; return this.setState({ run: r }); }
    if (!r.midDone && r.day >= Math.round(r.maxDay / 2)) { r.midDone = true; r.busy = r.day; r.event = { kind: 'enemy', enemy: ch.mid }; return this.setState({ run: r }); }
    if (r.day % 5 === 0 && !(r.minis || []).includes(r.day)) {
      r.minis = (r.minis || []).concat(r.day); r.busy = r.day; r.event = { kind: 'enemy', enemy: this.pick(ch.pool), elite: true };
      return this.setState({ run: r });
    }
    if ((r.forks || []).includes(r.day)) { r.event = { kind: 'fork' }; return this.setState({ run: r }); }
    const fest = this.festNow();
    if (fest.id === 'lomba' && r.day === 4 && !r.lombaDone) { r.lombaDone = true; r.event = { kind: 'lomba' }; return this.setState({ run: r }); }
    if (fest.id === 'bambu' && r.day % 4 === 0) return this.applyOutcome(r, { hp: Math.round(r.maxHp * 0.08 * heal) }, 'Panitia Festival Bambu membagikan rebung. Santoni mengambil dua.', { tone: 'skill' });
    if (rule === 'bambu' && r.day % 5 === 0) return this.applyOutcome(r, { hp: Math.round(r.maxHp * 0.1 * heal) }, 'Santoni ngemil rebung tetangga. Tetangganya belum tahu.', { tone: 'skill' });
    if (rule === 'durian' && Math.random() < 0.12) return this.applyOutcome(r, { hp: -Math.round(r.maxHp * 0.08), xp: 20 }, 'Sebuah durian jatuh tepat di kepala Santoni. Santoni jadi sedikit lebih bijak.', { tone: 'bad' });
    const route = r.route && r.route.kind;
    const quiet = r.busy === r.day - 1 && route !== 'bahaya';
    const enemyChance = quiet || route === 'aman' ? 0 : route === 'bahaya' ? 1
      : 0.22 + (r.stance === 'nekat' ? 0.1 : r.stance === 'santai' ? -0.07 : 0) + (rule === 'ngetem' ? 0.08 : 0);
    const eventChance = quiet ? 0 : r.stance === 'penasaran' ? 0.55 : 0.4;
    const x = Math.random();
    if (x < enemyChance) { r.busy = r.day; r.event = { kind: 'enemy', enemy: this.pick(ch.pool) }; return this.setState({ run: r }); }
    if (!quiet && x < Math.max(eventChance, enemyChance + 0.2)) {
      const left = C.EVENTS.filter(e => r.used.indexOf(e.id) < 0);
      if (left.length) { const ev = this.pick(left); r.busy = r.day; r.used = r.used.concat(ev.id); r.event = { kind: 'choice', id: ev.id }; return this.setState({ run: r }); }
    }
    const fl = this.pick(C.FLAVOR);
    this.applyOutcome(r, fl, fl.t);
  }
  applyOutcome(r, o, text, opts) {
    opts = opts || {};
    const fx = [], piggy = this.stacks(r, 'celengan'), notes = this.stacks(r, 'catat');
    o = Object.assign({}, o);
    if (piggy && o.coins > 0) o.coins = Math.round(o.coins * (1 + 0.3 * piggy));
    if (notes && o.xp) o.xp = Math.round(o.xp * (1 + 0.3 * notes));
    const rule = this.ruleOf(r), coinTags = [];
    const tagih = this.blessings().tagih;
    if (o.coins > 0 && tagih) { o.coins = Math.round(o.coins * (1 + tagih / 100)); coinTags.push(`tagih +${tagih}%`); }
    if (o.coins > 0 && r.stance === 'nekat') { o.coins = Math.round(o.coins * 1.25); coinTags.push('nekat +25%'); }
    if (o.coins > 0 && opts.danger) { o.coins *= 2; coinTags.push('bahaya ×2'); }
    if (o.coins > 0 && rule === 'diskon') { o.coins *= 2; coinTags.push('harga coret ×2'); }
    if (o.coins > 0 && rule === 'pajak') { o.coins = Math.round(o.coins * 0.85); coinTags.push('pajak −15%'); }
    if (o.xp && r.stance === 'nekat') o.xp = Math.round(o.xp * 1.25);
    if (o.xp && opts.danger) o.xp = Math.round(o.xp * 1.5);
    if (o.xp && rule === 'ngetem') o.xp = Math.round(o.xp * 1.3);
    if (o.hp > 0) o.hp = Math.round(o.hp * this.healMult(r));
    if (o.maxHp) { r.maxHp += o.maxHp; r.hp += o.maxHp; fx.push({ k: 'maxHp', v: o.maxHp }); }
    if (o.hp) { r.hp = Math.max(0, Math.min(r.maxHp, r.hp + o.hp)); fx.push({ k: 'hp', v: o.hp }); }
    if (o.atk) { r.atk += o.atk; fx.push({ k: 'atk', v: o.atk }); }
    if (o.def) { r.def += o.def; fx.push({ k: 'def', v: o.def }); }
    if (o.coins) { r.coins = Math.max(0, r.coins + o.coins); if (piggy && o.coins > 0) coinTags.unshift(`celengan +${30 * piggy}%`); fx.push(coinTags.length ? { k: 'coins', v: o.coins, tag: coinTags.join(', ') } : { k: 'coins', v: o.coins }); }
    if (o.xp) fx.push(notes ? { k: 'xp', v: o.xp, tag: `catatan +${30 * notes}%` } : { k: 'xp', v: o.xp });
    r.xp += (o.xp || 0) + (opts.noDaily ? 0 : Math.round((12 + Math.floor(Math.random() * 10)) * (1 + 0.3 * notes)));
    r.log = r.log.concat({ id: this.uid(), day: r.day, text, fx, tone: opts.tone || ((o.hp || 0) < 0 ? 'bad' : 'plain') });
    r.event = null;
    if (r.hp <= 0 && this.tryRevive(r)) r.log = r.log.concat({ id: this.uid(), day: r.day, text: 'Santoni pingsan. Lalu bangun lagi, mengira masih pagi.', fx: [{ k: 'hp', v: r.hp }], tone: 'skill' });
    if (r.hp <= 0) return this.finishRun(r, false);
    let offer = o.skill ? { kind: o.skill === 'elite' ? 'elite' : 'bonus', ids: this.rollSkills(3), rerolls: o.skill === 'elite' ? 1 : 0 } : null;
    if (r.xp >= r.xpNext) {
      const from = r.lvl; r.xp -= r.xpNext; r.lvl += 1; r.xpNext = Math.round(r.xpNext * 1.3);
      r.atk = Math.round(r.atk * 1.05); r.hp = Math.min(r.maxHp, r.hp + Math.round(r.maxHp * 0.15));
      const lv = { kind: 'lvl', from, to: r.lvl, ids: this.rollSkills(3), rerolls: r.stance === 'penasaran' ? 2 : 1 };
      if (offer) r.queue = lv; else offer = lv;
      music.sfx('levelup');
    }
    this._acc = 0;
    this.setState(offer ? { run: r, offer } : { run: r });
  }
  choose(which) {
    const s = this.state; if (!s.run || !s.run.event) return;
    const r = Object.assign({}, s.run), ev = r.event;
    if (ev.kind === 'fork') return this.pickRoute(r, { a: 'aman', b: 'pintas', c: 'bahaya' }[which]);
    if (ev.kind === 'lomba') {
      if (which === 'b') { this.festGain(3); return this.applyOutcome(r, { xp: 15 }, 'Santoni menonton panjat pinang sambil makan kacang. Ia bersorak sekali. Pelan.', {}); }
      if (Math.random() < 0.55) { this.festGain(10); return this.applyOutcome(r, { coins: 150 + r.day * 10, xp: 30 }, 'Santoni memanjat pinang sampai puncak. Hadiahnya sepeda. Santoni mengambil kupon koinnya saja.', { tone: 'win' }); }
      this.festGain(2);
      return this.applyOutcome(r, { hp: -Math.round(r.maxHp * 0.1) }, 'Santoni merosot dari pinang. Olinya banyak. Penonton bertepuk tangan, entah untuk apa.', { tone: 'bad' });
    }
    if (ev.kind === 'choice') {
      const opt = C.EVENTS.find(e => e.id === ev.id)[which], cost = this.eventCost(r, opt.cost);
      if (cost && r.coins < cost) return this.toast('Koin perjalanan kurang. Tidak ada yang memberi kredit di sini.');
      const o = Object.assign({}, opt.res());
      if (cost) o.coins = (o.coins || 0) - cost;
      return this.applyOutcome(r, o, o.t, { tone: o.skill ? 'skill' : undefined });
    }
    const e = C.ENEMIES[ev.enemy];
    if (which === 'a') return this.startBattle(r, ev.enemy, false, ev.final, ev.elite);
    if (e.boss || ev.elite || (this.props || {}).gertak === false || this.ruleOf(r) === 'pasal') return;
    if (Math.random() < this.bluffChance(r)) { this.track({ bluffs: 1 }); return this.applyOutcome(r, { coins: 20 + r.day * 3, xp: 25 }, `Santoni berdiri dengan dua kaki. ${e.name} memutuskan punya urusan lain.`, { tone: 'win' }); }
    this.startBattle(r, ev.enemy, true, ev.final);
  }
  healMult(r) { return this.ruleOf(r) === 'manis' ? 1.5 : 1; }
  eventCost(r, cost) {
    if (!cost) return 0;
    const rule = this.ruleOf(r);
    return rule === 'tawar' ? Math.round(cost / 2) : rule === 'diskon' ? cost * 2 : cost;
  }
  pickRoute(r, kind) {
    const R = C.ROUTES[kind]; if (!R) return;
    r.event = null;
    if (kind === 'pintas') {
      r.day = Math.min(r.maxDay - 1, r.day + 2);
      r.log = r.log.concat({ id: this.uid(), day: r.day, text: 'Santoni lewat jalan pintas. Dua hari terlewat begitu saja, beserta isinya.', fx: [], tone: 'plain' });
      this._acc = 0;
      return this.setState({ run: r });
    }
    r.route = { kind, until: r.day + R.days };
    if (kind === 'aman') return this.applyOutcome(r, { hp: Math.round(r.maxHp * 0.15) }, 'Santoni memilih jalan setapak. Burung berkicau. Tidak ada yang menghadang.', { tone: 'skill', noDaily: true });
    r.log = r.log.concat({ id: this.uid(), day: r.day, text: 'Santoni memilih jalan berbahaya. Semak-semak bergerak. Santoni juga bergerak, pelan-pelan.', fx: [], tone: 'bad' });
    this._acc = 0;
    this.setState({ run: r });
  }
  startBattle(r, key, offended, final = false, elite = false) {
    const e = C.ENEMIES[key], base = this.makeEnemy(key, r.day, r.chapter), en = elite ? this.makeElite(base, r) : base;
    const log = [{ id: this.uid(), text: elite ? `Minibos ${e.name} menghadang. Lebih besar, lebih galak, sama-sama tidak sopan.` : `${e.name} menghadang. ${e.intro}`, tone: 'enemy' }];
    if (offended) { en.atk = Math.round(en.atk * 1.2); log.push({ id: this.uid(), text: `Santoni berdiri dengan dua kaki. ${e.name} tidak terkesan. ATK musuh +20%.`, tone: 'bad' }); }
    this._acc = 0;
    this.setState({ run: Object.assign({}, r, { event: null }), screen: 'battle', shake: null,
      battle: { enemy: en, final: !!final, elite: !!elite, turn: 1, heroTurn: !offended, hits: 0, firstDone: false, napUsed: false, over: null, log, pops: [], banner: null, proc: null } });
  }
  battleStep() {
    const s = this.state; if (!s.battle || s.battle.over) return;
    const b = Object.assign({}, s.battle, { enemy: Object.assign({}, s.battle.enemy) }), r = Object.assign({}, s.run);
    const e = C.ENEMIES[b.enemy.key], n = id => r.skills.filter(k => k === id).length, now = Date.now();
    const log = b.log.slice(), pops = b.pops.filter(x => now - x.t < 1100);
    const push = (side, text, kind) => pops.push({ id: this.uid(), t: now, side, text, kind, dx: Math.round(Math.random() * 70 - 35), dy: pops.filter(x => x.side === side).length * 30 });
    const say = (text, tone) => log.push({ id: this.uid(), text, tone });
    const hit = d => { b.enemy.hp = Math.max(0, b.enemy.hp - d); };
    let shake = null, banner = b.banner, proc = null, act = null;
    // Show a skill banner unless a bigger one already fired this step.
    const softBanner = text => { if (banner === b.banner) banner = { id: this.uid(), text }; };
    // Elemental visuals queued for this step, rendered by elementFx().
    const efx = [], fxAt = (el, big) => efx.push({ id: this.uid(), el, big: !!big });
    const combo = id => this.hasCombo(r, id), name = b.enemy.name;
    const burnFor = turns => { const fresh = !b.burn; b.burn = Math.max(b.burn || 0, turns); return fresh; };
    // Stuns last one enemy turn; the enemy always gets to act once before it can be stunned again.
    const stunFor = () => { if (b.stunGuard || b.stun) return false; b.stun = 1; return true; };
    if (b.shield == null) {
      b.shield = n('batu') ? Math.round(r.maxHp * 0.2 * n('batu')) : 0;
      if (b.shield) { say(`Kulit Santoni mengeras seperti batu kali. Perisai ${b.shield}.`, 'skill'); fxAt('tanah'); }
    }
    // Companion blessings ("Berkah Sinergi") are read once at the start of each battle.
    if (!b.bless) {
      b.bless = r.daily ? {} : this.blessings(); b.vetoLeft = b.bless.veto || 0;
      if (b.bless.peluit && Math.random() * 100 < b.bless.peluit) {
        b.stun = 1; push('enemy', 'KAGET', 'miss'); softBanner('Peluit Pagi!');
        say(`Bebek Satpam meniup peluit. ${name} mengira ada razia dan membeku.`, 'skill');
      }
      if (b.bless.ronda) {
        const d = Math.round(b.enemy.maxHp * b.bless.ronda / 100); hit(d); push('enemy', `RONDA ${d}`, 'skill');
        say(`Kelelawar Ronda sudah memukul ${name} semalam. ${d}.`, 'skill');
      }
      if (b.bless.mandor) {
        b.shield = (b.shield || 0) + Math.round(r.maxHp * b.bless.mandor / 100);
        say(`Kuda Nil Mandor memakaikan helm proyek. Perisai ${b.shield}.`, 'skill');
      }
    }
    const B = b.bless;
    const charge = amt => { b.ult = Math.min(100, (b.ult || 0) + amt); };
    let ultFired = false, allies = [], rush = false;
    if (b.heroTurn && (b.ult || 0) >= 100) {
      // Jurus pamungkas: the equipped weapon's ultimate, infused with every element the run owns.
      const wid = this.weaponOf(r), W = C.ULTIMATES[wid] || C.ULTIMATES.none;
      const els = Object.keys(C.ELEMENTS).filter(el => this.hasEl(r, el));
      const boost = 1 + 0.1 * els.length + (els.includes('angin') ? 0.3 : 0);
      const strike = (pct, crit) => { const d = Math.max(1, Math.round(r.atk * pct * boost * (crit ? 2 : 1) - b.enemy.def * 0.3)); hit(d); return d; };
      b.ult = 0; b.hits += 1; ultFired = true; act = { who: 'hero', t: now }; shake = 'enemy'; proc = 'ult';
      let total = 0;
      if (wid === 'sumpit') {
        for (let i = 0; i < 4; i++) { const d = strike(0.55); total += d; push('enemy', `−${d}`, 'hit'); }
        const last = strike(0.55, true); total += last; push('enemy', `KRITIS ${last}`, 'crit');
      } else if (wid === 'payung') {
        total = strike(1.8); b.parry = 2; push('enemy', `BADAI ${total}`, 'crit'); push('hero', 'TANGKIS ×2', 'skill');
      } else if (wid === 'centong') {
        total = strike(3.2); const h = Math.round(r.maxHp * 0.3); r.hp = Math.min(r.maxHp, r.hp + h);
        push('enemy', `KENDURI ${total}`, 'crit'); push('hero', `+${h}`, 'heal');
      } else if (wid === 'raket') {
        for (let i = 0; i < 3; i++) { const d = strike(0.75); total += d; push('enemy', `ZAP ${d}`, 'skill'); }
        b.stunGuard = false; stunFor(); fxAt('petir', true);
      } else if (wid === 'sapu') {
        total = strike(2.6); b.quake = Math.min(3, (b.quake || 0) + 2); push('enemy', `SAPU ${total}`, 'crit'); fxAt('angin', true);
      } else if (wid === 'ulekan') {
        for (const p of [0.45, 0.65, 0.85]) { const d = strike(p); total += d; push('enemy', `−${d}`, 'hit'); }
        const last = strike(1.7); total += last; push('enemy', `HALUS ${last}`, 'crit'); fxAt('tanah', true);
      } else if (wid === 'kipasangin') {
        for (let i = 0; i < 3; i++) { const d = strike(0.85); total += d; push('enemy', `WUSH ${d}`, 'skill'); }
        b.quake = Math.min(3, (b.quake || 0) + 1); fxAt('angin', true);
      } else if (wid === 'gitar') {
        total = strike(2.8); const h = Math.round(r.maxHp * 0.2); r.hp = Math.min(r.maxHp, r.hp + h);
        b.stunGuard = false; stunFor(); push('enemy', `KONSER ${total}`, 'crit'); push('enemy', 'TERPESONA', 'miss'); push('hero', `+${h}`, 'heal');
      } else {
        total = strike(2.2); push('enemy', `TAMPAR ${total}`, 'crit');
      }
      if (els.includes('api')) { burnFor(3); fxAt('api', true); }
      if (els.includes('petir')) { b.stunGuard = false; stunFor(); fxAt('petir', true); }
      if (els.includes('tanah')) { b.quake = Math.min(3, (b.quake || 0) + 1); fxAt('tanah', true); }
      if (els.includes('angin')) fxAt('angin', true);
      if (b.enemy.hp > 0 && (this.team().length || this.petState().active)) {
        const ts = this.teamStrike(r, b, { hit, push, stunFor, burnFor, rush: true });
        if (ts.who.length) { total += ts.dmg; allies = ts.who; rush = true; say(`Serbu Bersama! Seluruh tim menyerang sekaligus: ${ts.lines.join(', ')}.`, 'crit'); }
      }
      b.ultFx = { id: this.uid(), weapon: wid, name: W.name, els };
      say(`${W.line} ${W.name}${els.length ? ` · ${els.map(el => C.ELEMENTS[el].label).join(' + ')}` : ''}! ${total}.`, 'crit');
    } else if (b.heroTurn) {
      b.hits += 1; act = { who: 'hero', t: now };
      const crit = Math.random() < 0.08 + 0.15 * n('kritis') + (B.siaran || 0) / 100 + this.critBonus(r) / 100;
      if (crit) b.crits = (b.crits || 0) + 1;
      act.crit = crit;
      const rule = this.ruleOf(r);
      let mult = (0.9 + Math.random() * 0.2) * (crit ? (rule === 'renyah' ? 2.5 : 2) : 1);
      if (B.lembur && b.turn >= 5) mult *= 1 + B.lembur / 100;
      if (B.semangat && r.hp < r.maxHp) { const h = Math.round(r.maxHp * B.semangat / 100); r.hp = Math.min(r.maxHp, r.hp + h); push('hero', `+${h}`, 'heal'); }
      if (!b.firstDone && B.stempel) { mult *= 1 + B.stempel / 100; softBanner('Stempel Sah!'); }
      if (!b.firstDone && n('kerupuk')) { mult *= 1 + 0.6 * n('kerupuk'); banner = { id: this.uid(), text: 'Lempar Kerupuk!' }; proc = 'kerupuk'; }
      b.firstDone = true;
      if (n('sabar') && b.rage) mult *= 1 + 0.07 * n('sabar') * b.rage;
      const mocking = n('sindiran') && b.enemy.hp < b.enemy.maxHp * 0.35;
      if (mocking) {
        mult *= 1 + 0.5 * n('sindiran'); proc = proc || 'sindiran';
        if (!b.mocked) { b.mocked = true; banner = { id: this.uid(), text: 'Sindiran Halus!' }; say(`Santoni berkata pelan, "Oh, masih berdiri?" ${b.enemy.name} tersinggung secara fisik.`, 'skill'); }
      }
      let total = 0;
      // Enemy traits that soften Santoni's basic hit.
      if (b.inked) { mult *= 0.5; b.inked = false; }
      if (e.trait === 'CANGKANG' && b.enemy.hp > b.enemy.maxHp * 0.5) mult *= 0.65;
      if (e.trait === 'GENDUT' && !crit) mult *= 0.75;
      if (b.charmed) { mult *= 0.8; b.charmed -= 1; }
      if (B.seruduk && b.enemy.hp > b.enemy.maxHp * 0.7) mult *= 1 + B.seruduk / 100;
      const posed = e.trait === 'BERPOSE' && Math.random() < 0.2;
      const dozed = !posed && rule === 'kantuk' && Math.random() < 0.1, lagged = !posed && !dozed && rule === 'lag' && Math.random() < 0.15;
      const dmg = posed || dozed || lagged ? 0 : Math.max(1, Math.round(r.atk * mult - b.enemy.def * 0.5)); hit(dmg); total += dmg;
      if (dozed) {
        const h = Math.round(r.maxHp * 0.05 * this.healMult(r)); r.hp = Math.min(r.maxHp, r.hp + h);
        push('hero', `ZZZ +${h}`, 'heal'); act = { who: 'hero', t: now, pose: 'sleep' };
        say('Santoni tertidur di tengah perkelahian. Kasurnya terlalu empuk.', 'skill');
      } else if (lagged) {
        push('enemy', 'BUFFERING', 'miss');
        say('Pukulan Santoni tertahan. Sinyal satu bar. Coba lagi nanti.', 'plain');
      } else if (posed) {
        push('enemy', 'BERPOSE', 'miss');
        say(`${name} berpose untuk kamera. Pukulan Santoni hanya mengenai ring light.`, 'enemy');
      } else {
        push('enemy', crit ? `KRITIS ${dmg}` : `−${dmg}`, crit ? 'crit' : 'hit');
        say(crit ? `Santoni menatap kosong, lalu memukul. Kritis. ${dmg}.` : `Santoni memukul ${b.enemy.name}. ${dmg}.`, crit ? 'crit' : 'plain');
      }
      if (n('kembaran') && Math.random() < Math.min(0.6, 0.3 * n('kembaran')) && b.enemy.hp > 0) {
        const d = Math.round(r.atk * 0.7); hit(d); total += d; push('enemy', `KEMBARAN ${d}`, 'skill'); banner = { id: this.uid(), text: 'Kembaran!' }; proc = 'kembaran'; act.twin = true;
        say(`Panda merah yang mirip Santoni ikut memukul. Ia lalu pergi tanpa pamit. ${d}.`, 'skill');
      }
      if (n('sambal')) {
        const before = b.heat || 0; b.heat = Math.min(5, before + 1); proc = proc || 'sambal';
        if (!before) { softBanner('Sambal Terasi!'); fxAt('api'); say(`Santoni mengoles sambal ke ${b.enemy.name}. Belum terasa. Nanti terasa.`, 'skill'); }
      }
      if (n('kipas') && b.hits % 3 === 0 && b.enemy.hp > 0) { const d = Math.round(r.atk * 0.8 * n('kipas')); hit(d); total += d; push('enemy', `−${d}`, 'skill'); banner = { id: this.uid(), text: 'Ekor Kipas!' }; proc = 'kipas'; fxAt('angin'); say(`Ekor Santoni mengipas. ${b.enemy.name} jadi sejuk. ${d}.`, 'skill'); }
      if (n('statis') && Math.random() < 0.25 && b.enemy.hp > 0) { const d = Math.round(r.atk * 0.7 * n('statis')); hit(d); total += d; push('enemy', `−${d}`, 'skill'); banner = { id: this.uid(), text: 'Bulu Statis!' }; proc = 'statis'; fxAt('petir'); say(`Bulu Santoni menyetrum. ${d}.`, 'skill'); }
      if (n('bara') && b.enemy.hp > 0 && Math.random() < Math.min(0.8, 0.35 * n('bara'))) {
        if (burnFor(3)) { push('enemy', 'TERBAKAR', 'crit'); softBanner('Ekor Membara!'); say(`Ekor Santoni menyentuh ${name}. Sesuatu mulai berbau gosong.`, 'skill'); }
        fxAt('api'); proc = proc || 'bara';
      }
      if (n('naga') && b.hits % 4 === 0 && b.enemy.hp > 0) {
        const d = Math.round(r.atk * 1.5 * n('naga')); hit(d); total += d; burnFor(3); push('enemy', `NAGA ${d}`, 'crit');
        banner = { id: this.uid(), text: 'Napas Naga Kecil!' }; proc = 'naga'; fxAt('api', true);
        say(`Santoni bersendawa api ke arah ${name}. Santoni minta maaf. ${d}.`, 'skill');
      }
      if (n('setrum') && b.enemy.hp > 0 && Math.random() < Math.min(0.6, 0.2 * n('setrum') + (combo('badaipetir') ? 0.1 : 0))) {
        const d = Math.round(r.atk * 0.6); hit(d); total += d; const stunned = stunFor();
        push('enemy', stunned ? `LUMPUH ${d}` : `ZAP ${d}`, 'skill'); softBanner('Colokan Longgar!'); proc = 'setrum'; fxAt('petir');
        say(stunned ? `${name} kesetrum. Rambutnya, kalau ada, berdiri. ${d}.` : `${name} kesetrum sedikit. ${d}.`, 'skill');
      }
      if (n('gempa') && b.hits % 3 === 0 && b.enemy.hp > 0) {
        const d = Math.round(r.atk * 0.9 * n('gempa')); hit(d); total += d; b.quake = Math.min(3, (b.quake || 0) + 1);
        push('enemy', `GEMPA ${d}`, 'skill'); banner = { id: this.uid(), text: 'Hentakan Gempa!' }; proc = 'gempa'; fxAt('tanah', true);
        say(`Santoni menghentakkan kaki. ${name} terhuyung. ${d}.`, 'skill');
        if (combo('magma') && burnFor(3)) { push('enemy', 'MAGMA', 'crit'); fxAt('api'); say('Tanahnya retak dan panas. Kombo Magma.', 'skill'); }
      }
      if (n('tiup') && b.enemy.hp > 0 && Math.random() < Math.min(0.5, 0.15 * n('tiup'))) {
        const d = Math.round(r.atk * 0.6); hit(d); total += d; push('enemy', `TIUPAN ${d}`, 'skill'); softBanner('Tiupan Sepoi!'); proc = proc || 'tiup'; fxAt('angin');
        say(`Angin sepoi ikut menampar ${name}. ${d}.`, 'skill');
      }
      if (n('topan') && b.hits % 5 === 0 && b.enemy.hp > 0) {
        const d = Math.round(r.atk * 2 * n('topan')); hit(d); total += d; stunFor(); push('enemy', `TOPAN ${d}`, 'crit');
        banner = { id: this.uid(), text: 'Topan Kecil!' }; proc = 'topan'; fxAt('angin', true);
        say(`Santoni berputar sampai jadi topan. ${name} terlempar. Santoni pusing. ${d}.`, 'skill');
      }
      if (n('belang') && b.enemy.hp > 0) { const d = Math.round(r.atk * 0.45 * n('belang')); hit(d); total += d; push('enemy', `−${d}`, 'skill'); proc = proc || 'belang'; }
      if (B.antar && b.enemy.hp > 0 && Math.random() * 100 < B.antar) {
        const d = Math.round(r.atk * 0.5); hit(d); total += d; push('enemy', `ANTAR ${d}`, 'skill');
        say(`Kodok Ojek mengantar Santoni ke depan ${name} sekali lagi. ${d}.`, 'skill');
      }
      if (b.enemy.hp > 0) {
        const ts = this.teamStrike(r, b, { hit, push, stunFor, burnFor });
        if (ts.who.length) { total += ts.dmg; allies = ts.who; say(`Tim ikut menyerang: ${ts.lines.join(', ')}.`, 'skill'); }
      }
      if (B.majemuk && r.hp < r.maxHp && total > 0) { const h = Math.round(total * B.majemuk / 100); r.hp = Math.min(r.maxHp, r.hp + h); push('hero', `+${h}`, 'heal'); }
      if (n('ngemil') && r.hp < r.maxHp) { const h = Math.round(total * 0.15 * n('ngemil')); if (h > 0) { r.hp = Math.min(r.maxHp, r.hp + h); push('hero', `+${h}`, 'heal'); proc = proc || 'ngemil'; } }
      charge(18);
      shake = 'enemy';
    } else {
      if (n('badai') && b.enemy.hp > 0) {
        const d = Math.round(r.atk * 0.5 * n('badai')); hit(d); push('enemy', `PETIR ${d}`, 'skill'); fxAt('petir', true); proc = 'badai';
        if (!b.cloudSaid) { b.cloudSaid = true; softBanner('Awan Pribadi!'); say(`Awan kecil di atas Santoni menyambar ${name}. Awannya puas. ${d}.`, 'skill'); }
      }
      if (b.burn && b.enemy.hp > 0) {
        const d = Math.max(1, Math.round(r.atk * 0.1 * Math.max(1, n('bara') + n('naga')) * (combo('kobaran') ? 1.5 : 1)));
        hit(d); b.burn -= 1; push('enemy', `BAKAR ${d}`, 'hurt'); fxAt('api'); proc = proc || 'bara';
        if (combo('kobaran') && !b.kobaranSaid) { b.kobaranSaid = true; banner = { id: this.uid(), text: 'Kombo: Kobaran!' }; say(`Angin meniup api. ${name} membara lebih besar. ${d}.`, 'skill'); }
      }
      let skipped = false;
      const eRule = this.ruleOf(r);
      if (eRule === 'notulen' && b.enemy.hp > 0 && b.enemy.hp < b.enemy.maxHp) {
        const h = Math.round(b.enemy.maxHp * 0.03); b.enemy.hp = Math.min(b.enemy.maxHp, b.enemy.hp + h); push('enemy', `+${h} RAPAT`, 'heal');
      }
      b.eAct = (b.eAct || 0) + 1;
      const sings = (eRule === 'karaoke' && b.eAct % 4 === 0) || (this.festNow().id === 'karaoke' && Math.random() < 0.12), lags = eRule === 'lag' && Math.random() < 0.15;
      if (b.heat) {
        const d = Math.max(1, Math.round(r.atk * 0.06 * n('sambal') * b.heat)); hit(d); push('enemy', `PEDAS ${d}`, 'hurt'); proc = 'sambal';
        if (b.heat >= 5 && !b.heatSaid) { b.heatSaid = true; banner = { id: this.uid(), text: 'Pedas Level 5!' }; say(`${b.enemy.name} kepedasan. Matanya berair. ${d}.`, 'skill'); }
      }
      if (b.enemy.hp <= 0) {
        say(`${b.enemy.name} tumbang sebelum sempat menyerang.`, 'skill');
      } else if (sings || lags) {
        push('enemy', sings ? 'MENYANYI' : 'BUFFERING', 'miss');
        say(sings ? `${name} mengambil mikrofon dan bernyanyi. Lupa sedang berkelahi.` : `Serangan ${name} tertahan. Sinyal hilang.`, 'skill');
      } else if (b.stun) {
        b.stun -= 1; b.stunGuard = true; skipped = true; push('enemy', 'LUMPUH', 'miss'); fxAt('petir');
        say(`${name} masih bergetar. Ia melewatkan giliran.`, 'skill');
      } else if (b.parry) {
        b.parry -= 1; push('hero', 'DITANGKIS', 'miss'); fxAt('angin'); proc = 'ult';
        say(`${name} menyerang. Payung Santoni menangkisnya dengan sopan.`, 'skill');
      } else if (n('gertak') && Math.random() < 0.2 * n('gertak')) {
        push('enemy', 'BINGUNG', 'miss'); proc = 'gertak'; act = { who: 'hero', t: now, seram: true };
        say(`${b.enemy.name} melihat Santoni berdiri dengan dua kaki. ${b.enemy.name} lupa mau apa.`, 'skill');
      } else if (B.pesona && Math.random() * 100 < B.pesona) {
        push('enemy', 'TERPESONA', 'miss'); proc = proc || 'pesona';
        say(`Merak Selebgram mengembangkan ekornya. ${name} berhenti untuk berswafoto.`, 'skill');
      } else if (B.tinta && Math.random() * 100 < B.tinta) {
        push('hero', 'MELESET', 'miss'); proc = proc || 'tinta';
        say(`Cumi DJ menyemprot tinta. ${name} memukul udara kosong.`, 'skill');
      } else if (n('menguap') && Math.random() < Math.min(0.4, 0.12 * n('menguap'))) {
        push('hero', 'MELESET', 'miss'); proc = 'menguap'; act = { who: 'hero', t: now, pose: 'sleep' }; softBanner('Menguap!');
        say(`${b.enemy.name} menyerang. Santoni sedang menguap. Serangannya lewat begitu saja.`, 'skill');
      } else {
        const enemyAtk = b.enemy.atk * (1 - 0.15 * (b.quake || 0)) * (1 - (B.formulir || 0) / 100) * (1 - (B.curhat || 0) / 100);
        let dmg = Math.max(1, Math.round(enemyAtk * (0.9 + Math.random() * 0.2) - r.def * 0.5));
        b.eTurns = (b.eTurns || 0) + 1;
        let traitLine = null;
        if (e.trait === 'ARGUMEN' && b.eTurns % 3 === 0) { dmg = Math.round(dmg * 1.6); traitLine = `${name} mengeluarkan argumen pamungkas. Santoni tidak bisa membantah.`; }
        if (e.trait === 'INJAK' && b.eTurns % 3 === 0) { dmg = Math.round(dmg * 1.8); traitLine = `${name} menginjak dengan wibawa penuh. Tanah ikut rapat.`; fxAt('tanah', true); }
        if (e.trait === 'NGEBUT') { dmg = Math.round(dmg * 1.2); traitLine = `${name} menabrak dua kali. Bintang lima, katanya.`; }
        if (e.trait === 'KENTONGAN' && b.eTurns === 1) { dmg *= 2; traitLine = `${name} memukul kentongan. Satu kampung bangun, Santoni kena dua kali.`; }
        if (e.trait === 'SERUDUK' && b.eTurns > 1) { dmg = Math.round(dmg * Math.min(1.8, 1 + 0.1 * (b.eTurns - 1))); if (b.eTurns % 3 === 0) traitLine = `${name} makin panas. Serudukannya ×${Math.min(1.8, 1 + 0.1 * (b.eTurns - 1)).toFixed(1)}.`; }
        if (e.trait === 'PESONA' && b.eTurns % 3 === 2) { b.charmed = 2; traitLine = `${name} memamerkan bulunya. Santoni terpesona: ATK −20% dua giliran.`; }
        const boxed = n('kardus') && !b.boxUsed;
        if (boxed) { dmg = Math.max(1, Math.round(dmg * 0.5)); b.boxUsed = true; proc = 'kardus'; softBanner('Kardus Bekas!'); push('hero', 'SETENGAH', 'miss'); }
        if (b.vetoLeft > 0) {
          b.vetoLeft -= 1; dmg = 0; push('hero', 'VETO', 'miss'); softBanner('Hak Veto!');
          say(`Gajah Komisaris mengangkat tangan. "Veto." Serangan ${name} batal.`, 'skill');
        }
        let absorbed = 0;
        if (b.shield > 0) {
          absorbed = Math.min(b.shield, dmg); b.shield -= absorbed; dmg -= absorbed; proc = proc || 'batu'; fxAt('tanah');
          push('hero', `PERISAI −${absorbed}`, 'miss');
        }
        r.hp = Math.max(0, r.hp - dmg); if (dmg) push('hero', `−${dmg}`, 'hurt'); shake = 'hero'; act = { who: 'enemy', t: now, hurt: dmg > 0 };
        say(!dmg ? `${name} memukul perisai batu. Tidak tembus. Tangannya sakit sendiri.`
          : absorbed && !b.shield ? `Perisai batu Santoni retak. Sisanya kena Santoni. ${dmg}.`
          : boxed ? `${b.enemy.name} memukul kardus. Kardusnya penyok, Santoni tidak terlalu. ${dmg}.`
          : Math.random() < 0.5 ? `${e.hit} ${dmg}.` : `${b.enemy.name} menyerang. ${dmg}.`, boxed || absorbed ? 'skill' : 'enemy');
        if (traitLine) { say(traitLine, 'enemy'); push('enemy', e.trait, 'crit'); }
        if (e.trait === 'BUNGA' && dmg > 0) {
          const h = Math.round(dmg * 0.25); b.enemy.hp = Math.min(b.enemy.maxHp, b.enemy.hp + h); push('enemy', `+${h} BUNGA`, 'heal');
        }
        if (e.trait === 'PUNGLI' && dmg > 0 && r.coins > 0) {
          const c = Math.min(r.coins, 6 + 2 * (r.chapter || 0)); r.coins -= c; push('hero', `−${c} KOIN`, 'miss');
          say(`${name} memungut ${c} koin. Karcis parkirnya tidak ada.`, 'enemy');
        }
        if (e.trait === 'TINTA' && !b.inked && Math.random() < 0.3) {
          b.inked = true; push('hero', 'TINTA', 'miss'); say(`${name} menyemprot tinta. Pandangan Santoni gelap. Lebih gelap dari biasanya.`, 'enemy');
        }
        if (n('sabar')) {
          b.rage = (b.rage || 0) + 1; proc = proc || 'sabar'; push('hero', `GERAM +${7 * n('sabar') * b.rage}%`, 'skill');
          if (b.rage === 1) { softBanner('Kesabaran Tipis!'); say('Santoni mulai menghitung sampai sepuluh. Ia berhenti di tujuh.', 'skill'); }
        }
        if (B.bantah && dmg > 0 && b.enemy.hp > 0 && Math.random() * 100 < B.bantah) {
          const d = Math.round(r.atk * 0.6); hit(d); push('enemy', `BANTAH ${d}`, 'skill');
          say(`Kambing Debat membantah serangan itu dengan tanduknya. ${d}.`, 'skill');
        }
        if (n('kaktus') && dmg > 0) {
          const d = Math.max(1, Math.round(dmg * 0.3 * n('kaktus'))); hit(d); push('enemy', `DURI ${d}`, 'skill'); proc = 'kaktus'; softBanner('Bantal Kaktus!');
          say(`${b.enemy.name} tertusuk duri kaktus. ${d}.`, 'skill');
        }
      }
      if (n('tidur') && !b.napUsed && r.hp > 0 && r.hp < r.maxHp * 0.3) {
        const h = Math.round(r.maxHp * 0.35); r.hp = Math.min(r.maxHp, r.hp + h); b.napUsed = true;
        push('hero', `+${h}`, 'heal'); banner = { id: this.uid(), text: 'Tidur Ayam!' }; proc = 'tidur';
        say(`Santoni tidur sebentar. ${b.enemy.name} menunggu karena sungkan. +${h} HP.`, 'skill');
      }
      if (!skipped) b.stunGuard = false;
      charge(act && act.hurt ? 14 : 6);
      b.turn += 1;
    }
    b.heroTurn = !b.heroTurn;
    if (r.hp <= 0 && b.enemy.hp > 0 && B.banding && !b.bandingUsed) {
      b.bandingUsed = true; r.hp = Math.max(1, Math.round(r.maxHp * B.banding / 100));
      push('hero', 'BANDING', 'heal'); banner = { id: this.uid(), text: 'Banding Diterima!' };
      say('Angsa Pengacara mengajukan banding atas kekalahan Santoni. Banding diterima.', 'skill');
    }
    if (r.hp <= 0 && b.enemy.hp > 0 && this.tryRevive(r)) {
      push('hero', `+${r.hp}`, 'heal'); banner = { id: this.uid(), text: 'Bangun Kesiangan!' }; proc = 'kesiangan'; act = { who: 'hero', t: now, pose: 'sleep' };
      say(`Santoni terjatuh. Lalu bangun lagi, mengira masih pagi. +${r.hp} HP.`, 'skill');
    }
    if (b.elite && !b.enraged && b.enemy.hp > 0 && b.enemy.hp < b.enemy.maxHp * 0.4) {
      b.enraged = true; b.enemy.atk = Math.round(b.enemy.atk * 1.25); banner = { id: this.uid(), text: 'Minibos Mengamuk!' }; push('enemy', 'MENGAMUK', 'crit');
      say(`${b.enemy.name} mengamuk. Matanya merah, ATK +25%. Santoni mulai menyesal.`, 'bad');
    }
    if (b.enemy.hp <= 0) { b.over = 'win'; say(`${b.enemy.name} kalah. ${e.lose}`, 'win'); }
    else if (r.hp <= 0) { b.over = 'lose'; say('Santoni terjatuh. Santoni memutuskan ini cukup.', 'bad'); }
    const dealt = Math.max(0, s.battle.enemy.hp - b.enemy.hp), taken = Math.max(0, s.run.hp - r.hp);
    b.dealt = (b.dealt || 0) + dealt; b.taken = (b.taken || 0) + taken; b.best = Math.max(b.best || 0, dealt);
    if (b.over) b.overAt = now;
    b.log = log.slice(-5); b.pops = pops.slice(-8); b.banner = banner; b.proc = proc || b.proc; b.efx = efx;
    // What the stage should animate for this step; outlives the short-lived shake/act flags.
    const dashWho = act ? (act.who === 'enemy' || proc === 'menguap' ? 'enemy' : !act.seram && !act.pose ? 'hero' : null) : null;
    if (allies.length) { b.allyT = { ...(b.allyT || {}) }; allies.forEach((w, k) => { b.allyT[w] = now; b.allyT[`${w}d`] = rush ? k * 0.09 : 0.04; }); }
    if (allies.length && dashWho === 'hero') b.comboShow = { n: allies.length + 1, t: now, rush };
    b.fx = act ? { t: act.t, dash: dashWho, hit: shake, crit: !!act.crit || ultFired, allies, rush, combo: allies.length && dashWho === 'hero' ? allies.length + 1 : 0 } : null;
    this.setState({ battle: b, run: r, shake, act });
    // Hold the next turn so the ultimate cinematic (~1.3 s) plays out at any battle speed.
    if (ultFired) { this._acc = -1200 * (s.speed || 1); this.track({ ults: 1 }); music.sfx('ult'); }
  }
  endBattle() {
    const s = this.state, b = s.battle; if (!b) return;
    const r = Object.assign({}, s.run);
    const e = C.ENEMIES[b.enemy.key];
    if (b.over === 'win') { this.track({ kills: 1, bosses: e.boss ? 1 : 0 }); this.festGain(e.boss ? (this.festNow().id === 'bambu' ? 10 : 5) : 1); if (e.boss || b.final) music.sfx('victory'); }
    if (r.tower) return this.finishTower(r, b.over === 'win');
    if (r.challenge) return this.finishChallenge(r, b.over === 'win');
    if (b.over === 'lose') return this.finishRun(r, false, b.enemy.name);
    r.kills += 1;
    if (b.final) return this.finishRun(r, true);
    this.setState({ screen: 'run', battle: null, shake: null });
    if (b.elite) this.track({ elites: 1 });
    if (b.elite) this.logEvent('minibos', { chapter: r.chapter, day: r.day, win: true, turns: b.turn });
    this.applyOutcome(r, { coins: Math.round(((e.boss ? 160 : b.elite ? 120 : 40) + r.day * 4) * (1 + 0.15 * r.chapter)) + (this.blessings().parkir || 0), xp: e.boss ? 90 : b.elite ? 70 + r.day * 2 : 30 + r.day * 2, skill: b.elite ? 'elite' : undefined }, b.elite ? `Minibos ${b.enemy.name} tumbang. ${e.lose} Santoni memungut rampasannya.` : `${b.enemy.name} kalah. ${e.lose}`, { tone: 'win', noDaily: true, danger: !!(r.route && r.route.kind === 'bahaya') });
  }
  finishRun(r, win, killer) {
    const s = this.state;
    // New players get the lobby in stages; announce whatever this run unlocks.
    const tierBefore = this.unlockTier(), tierAfter = this.unlockTier({ ...s, stats: { ...(s.stats || {}), runs: ((s.stats || {}).runs || 0) + 1 } });
    this.track({ runs: 1 });
    this.logEvent('run_end', { chapter: r.chapter, day: r.day, win: !!win, kills: r.kills, lvl: r.lvl, killer: killer || '' });
    if (tierAfter > tierBefore) this.logEvent('unlock', { tier: tierAfter });
    if (tierAfter > tierBefore) setTimeout(() => this.toast(`Fitur baru terbuka: ${C.UNLOCKS[tierAfter - 1]}.`), 900);
    const dailyScore = r.daily ? this.finishDaily(r, win, killer) : null;
    const best = s.best.slice(), record = !r.daily && r.day > best[r.chapter];
    if (!r.daily) best[r.chapter] = Math.max(best[r.chapter], r.day);
    this.setState({ screen: 'result', battle: null, offer: null, shake: null, best, journal: [{ id: this.uid(), chapter: r.chapter, day: r.day, maxDay: r.maxDay, win, entries: r.log }].concat(s.journal || []).slice(0, 8), run: Object.assign({}, r, { event: null }),
      result: { win, day: r.day, maxDay: r.maxDay, kills: r.kills, skills: r.skills.length, coins: Math.round((r.coins + r.day * 90 + r.kills * 60 + (win ? 1500 : 0)) * (1 + 0.15 * r.chapter)), gems: win ? 120 + 20 * r.chapter : Math.floor(r.day / 4) * 10, xp: r.day * 12 + r.kills * 20,
        item: win ? this.rollItem(true) : r.day >= 5 ? this.rollItem(false) : null, record, chapter: r.chapter, quote: this.pick(win ? C.QUOTES_WIN : C.QUOTES), story: this.runStory(r, win, killer), daily: r.daily ? { score: dailyScore } : null } });
  }
  claim(m) {
    const s = this.state, rs = s.result; if (!rs) return;
    const gv = rs.give || {};
    this.setState({ coins: s.coins + (rs.coins + (gv.coins || 0)) * m, gems: s.gems + (rs.gems + (gv.gems || 0)) * m, energy: s.energy + (gv.energy || 0), asah: (s.asah || 0) + (gv.asah || 0) * m, telur: (s.telur || 0) + (gv.telur || 0), pakan: (s.pakan || 0) + (gv.pakan || 0) * m,
      bag: s.bag.concat(rs.item ? [rs.item] : [], gv.items || []), screen: rs.challenge ? 'mode' : 'lobby', result: null, run: null, battle: null, offer: null });
    this.toast(m === 2 ? 'Iklan ditonton. Hadiah ×2. Santoni ikut menonton.' : 'Hadiah masuk. Santoni tidak berkomentar.');
  }

  equip(id) {
    const s = this.state, it = C.ITEMS[id], eq = Object.assign({}, s.equipped), bag = s.bag.slice(), i = bag.indexOf(id);
    if (i < 0) return;
    bag.splice(i, 1);
    if (eq[it.type]) bag.push(eq[it.type]);
    eq[it.type] = id;
    this.setState({ equipped: eq, bag });
    this.toast(`${it.name} dipasang. ${it.desc}`);
  }
  autoEquip() {
    const s = this.state, all = s.bag.concat(Object.values(s.equipped)), eq = {};
    ['senjata', 'topi', 'baju', 'kalung', 'sabuk', 'sepatu'].forEach(t => {
      const c = all.filter(id => C.ITEMS[id].type === t).sort((x, y) => this.itemScore(y) - this.itemScore(x));
      if (c[0]) eq[t] = c[0];
    });
    const bag = all.slice(); Object.values(eq).forEach(id => bag.splice(bag.indexOf(id), 1));
    const changed = Object.keys(eq).some(t => eq[t] !== s.equipped[t]);
    this.setState({ equipped: eq, bag });
    this.toast(changed ? 'Yang terbaik sudah dipasang. Ekspresi Santoni tetap sama.' : 'Sudah yang terbaik. Santoni sudah tahu.');
  }
  pull(n) {
    const s = this.state, cost = Math.round((n === 1 ? 150 : 1350) * (this.festNow().id === 'diskon' ? 0.8 : 1));
    if (s.gems < cost) return this.toast('Permata kurang. Santoni juga kurang tidur.');
    const hiIds = Object.keys(C.ITEMS).filter(k => !C.ITEMS[k].event && (C.ITEMS[k].rar === 'Epik' || C.ITEMS[k].rar === 'Legendaris'));
    const legIds = hiIds.filter(k => C.ITEMS[k].rar === 'Legendaris');
    // Two pity counters: Epik-or-better every 10 opens, Legendaris every LEGEND_PITY opens.
    let pity = s.pity, pityL = s.pityL || 0; const items = [];
    for (let i = 0; i < n; i++) {
      pity += 1; pityL += 1;
      let id = this.rollItem(false);
      if (pityL >= C.LEGEND_PITY && C.ITEMS[id].rar !== 'Legendaris') id = this.pick(legIds);
      else if (pity >= 10 && hiIds.indexOf(id) < 0) id = this.pick(hiIds);
      if (hiIds.indexOf(id) >= 0) pity = 0;
      if (C.ITEMS[id].rar === 'Legendaris') pityL = 0;
      items.push(id);
    }
    this.setState({ gems: s.gems - cost, pity, pityL, bag: s.bag.concat(items), pull: { id: this.uid(), items } });
    this.track({ pulls: 1 });
    music.sfx(items.some(id => C.ITEMS[id].rar === 'Legendaris') ? 'legend' : 'chest');
  }
  buy(id) {
    const s = this.state, of = C.OFFERS.find(x => x.id === id);
    if (!of || s.sold[id]) return;
    const patch = { sold: Object.assign({}, s.sold, { [id]: 1 }) }, price = this.offerPrice(of);
    if (of.cur === 'gem') { if (s.gems < price) return this.toast('Permata kurang. Santoni juga kurang tidur.'); patch.gems = s.gems - price; }
    if (of.cur === 'coin') { if (s.coins < price) return this.toast('Koin kurang. Santoni memeriksa saku. Kosong.'); patch.coins = s.coins - price; }
    const gv = of.give || {};
    if (gv.energy) patch.energy = s.energy + gv.energy;
    if (gv.asah) patch.asah = (s.asah || 0) + gv.asah;
    if (gv.coins) patch.coins = (patch.coins != null ? patch.coins : s.coins) + gv.coins;
    if (gv.gems) patch.gems = (patch.gems != null ? patch.gems : s.gems) + gv.gems;
    let msg = of.msg;
    if (gv.item) { const it = this.rollItem(true); patch.bag = s.bag.concat(it); msg = `Isinya: ${C.ITEMS[it].name}. ${C.ITEMS[it].desc}`; }
    this.setState(patch);
    this.toast(msg);
  }

  buildView() {
    const s = this.state, p = this.props || {}, R = C.RAR;
    const still = !!p.still, days = this.days(p), scr = s.screen;
    const fmt = n => Math.round(n).toLocaleString('id-ID');
    const g = fn => (still ? () => {} : fn);
    const pct = (a, b) => `${Math.max(0, Math.min(1, b ? a / b : 0)) * 100}%`;
    const base = this.heroBase(s.equipped), marks = this.marks(days), ch = C.CHAPTERS[s.chapter];
    const unlocked = i => i === 0 || s.best[i - 1] >= days;
    const r = s.run, b = s.battle, o = s.offer, rs = s.result;
    const counts = {};
    (r ? r.skills : []).forEach(k => { counts[k] = (counts[k] || 0) + 1; });
    const skillTiles = Object.keys(counts).map(id => {
      const k = C.SKILLS.find(x => x.id === id), rr = R[k.rar], on = !!b && b.proc === id;
      return { id, icon: k.icon, bg: rr.bg, fg: rr.fg, count: counts[id], multi: counts[id] > 1, ring: on ? '#F2B63C' : '#2B1E18', glow: on ? '0 0 0 3px #F2B63C' : 'none',
        tap: g(() => this.toast(`${k.name}${counts[id] > 1 ? ` ×${counts[id]}` : ''}: ${k.desc}`)) };
    });
    // Battle skill grid: 3×40px tiles, shrinking to 4 columns of 30px once there are more than 9.
    const bTile = skillTiles.length > 9 ? { cols: 4, size: 30, gap: 6, radius: 9, icon: 17 } : { cols: 3, size: 40, gap: 8, radius: 12, icon: 22 };
    const chestFor = ci => marks.map((m, mi) => {
      const claimed = !!s.chests[`${ci}-${mi}`], ready = !claimed && s.best[ci] >= m;
      return { left: `${(m / days) * 100}%`, label: `H${m}`, icon: claimed ? 'check' : ready ? 'redeem' : 'lock', bg: claimed ? '#CFE6D6' : ready ? '#F2B63C' : '#EADBC5', color: claimed ? '#2F7A5C' : '#2B1E18', claim: g(() => this.claimChest(ci, mi)) };
    });
    const toneLight = { plain: '#6E5A4E', win: '#2F7A5C', bad: '#C2412A', skill: '#7E43B5', enemy: '#C2412A' };
    const toneDark = { plain: '#FFF8EC', crit: '#F2B63C', skill: '#C9A8F0', enemy: '#FF9C8A', win: '#8FD6A8', bad: '#FF9C8A' };
    const FX = { hp: ['favorite', 'HP'], maxHp: ['favorite', 'HP maks'], atk: ['swords', 'ATK'], def: ['shield', 'DEF'], coins: ['toll', 'koin'], xp: ['star', 'XP'] };
    const labels = { harian: 'Tantangan Harian', surat: 'Surat', lobby: 'Lobby', run: 'Petualangan', battle: 'Battle', hero: 'Hero', map: 'Peta', shop: 'Toko', result: 'Hasil', misi: 'Misi', festival: 'Festival', teman: 'Teman', mode: 'Tantangan', tambang: 'Tambang', bengkel: 'Bengkel', rekan: 'Rekan', pet: 'Pet', journal: 'Jurnal' };
    const hudScreens = ['lobby', 'hero', 'map', 'shop', 'journal', 'misi', 'festival', 'teman', 'mode', 'tambang', 'bengkel', 'rekan', 'pet', 'surat', 'harian'];
    const v = {
      screenLabel: o && scr === 'run' ? 'Pilih skill' : labels[scr], screenKey: scr,
      isLobby: scr === 'lobby', isRun: scr === 'run', isBattle: scr === 'battle', isHero: scr === 'hero', isMap: scr === 'map', isShop: scr === 'shop', isResult: scr === 'result',
      showHud: hudScreens.indexOf(scr) >= 0, showNav: hudScreens.indexOf(scr) >= 0,
      energyLabel: `${s.energy}/${C.ENERGY.max}`, tapEnergy: g(() => this.tapEnergy()),
      musicOn: !!s.musicOn, toggleMusic: g(() => this.toggleMusic()),
      energyTimer: s.energy < C.ENERGY.max ? `+1 ${this.fmtWait(this.energyWait(s, Date.now()).next)}` : '', coinsLabel: fmt(s.coins), gemsLabel: fmt(s.gems), goShop: g(() => this.go('shop')),
      power: fmt(this.power(base)),
      chapterNo: s.chapter + 1, chapterName: ch.name, chapterBest: Math.min(s.best[s.chapter], days), daysTotal: days,
      prevOpacity: s.chapter > 0 ? 1 : 0.35, nextOpacity: s.chapter < C.CHAPTERS.length - 1 && unlocked(s.chapter + 1) ? 1 : 0.35,
      prevChapter: g(() => this.shiftChapter(-1)), nextChapter: g(() => this.shiftChapter(1)),
      bubbleText: C.BUBBLES[s.bubble % C.BUBBLES.length], nextBubble: g(() => this.setState({ bubble: s.bubble + 1 })),
      dailyDot: !s.daily, tapDaily: g(() => this.tapDaily()),
      tapMail: g(() => this.go('surat')),
      acctLv: this.acctLevel(s),
      unlock: (t => ({ stance: t >= 1, misi: t >= 1, fest: t >= 2, teman: t >= 2, musim: t >= 2, modes: t >= 3 }))(this.unlockTier(s)),
      unlockHint: [`Selesaikan perjalanan pertama untuk membuka ${C.UNLOCKS[0]}.`, `Satu perjalanan lagi untuk membuka ${C.UNLOCKS[1]}.`, `Satu perjalanan lagi untuk membuka ${C.UNLOCKS[2]}.`, null][this.unlockTier(s)],
      tapFest: g(() => this.go('festival')),
      tapPass: g(() => { const fn = this.festNow(); this.toast(`Jadwal musim: ${fn.name} sekarang, lalu ${fn.next.name}. Tiap festival berlangsung ${C.FEST_DAYS} hari.`); }),
      chests: chestFor(s.chapter), chestPct: pct(s.best[s.chapter], days), goRun: g(() => this.startRun()),
      toggleAuto: g(() => this.toggleAuto()), pauseIcon: 'pause', runChapterNo: 1, runChapterUpper: '', day: 0, maxDay: days, runCoins: '0', dayPct: '0%',
      weatherIcon: 'wb_sunny', weather: '', walkStatus: '', lvl: 1, hpPct: '100%', hpLabel: '', xpPct: '0%', xpLabel: '', atk: '0', def: '0',
      logCount: 0, logRef: this.logRef, log: [], runChips: [], evTrait: null, hasEvent: false, evTagBg: '#2B1E18', evTag: '', evIsEnemy: false, evIcon: 'help', evName: '', evSub: '', evText: '', evChoices: [], hasEvFoot: false, evFoot: '',
      noSkills: skillTiles.length === 0, ownedSkills: skillTiles, cycleSpeed: g(() => this.setState({ speed: (s.speed % 3) + 1 })), speedLabel: `×${s.speed}`, quitRun: g(() => this.askQuit()),
      hasOffer: false, burst: null, offerTitle: '', offerHasLvl: false, offerFrom: 0, offerTo: 0, offerSub: '', offerCards: [], reroll: g(() => this.reroll()), rerollDisabled: true, rerollOpacity: 0.4, rerollLeft: 0,
      bTurn: 1, bBoss: false, speeds: [1, 2, 3].map(n => ({ n, set: g(() => this.setState({ speed: n })), bg: s.speed === n ? '#F2B63C' : 'transparent', fg: s.speed === n ? '#2B1E18' : '#FFF8EC' })),
      eIcon: 'help', eName: '', eLvl: 1, eHpPct: '100%', eHpLabel: '', eTf: 'none', hTf: 'none', eArtId: 'art-musuh', eArtLabel: '', enemyPops: null, heroPops: null, banner: null, battleSkills: skillTiles, bTile,bLog: [], bOver: false, bOverColor: '#F2B63C', bOverText: '',
      slotsL: [], slotsR: [], heroStats: [], autoEquip: g(() => this.autoEquip()), mergeItems: g(() => this.go('bengkel')), bagCount: s.bag.length, bag: [],
      mapSummary: `${s.best.filter(x => x >= days).length} DARI ${C.CHAPTERS.length} SELESAI`, chapters: [],
      pityLeft: Math.max(1, 10 - s.pity), legendLeft: Math.max(1, C.LEGEND_PITY - (s.pityL || 0)), pull1: g(() => this.pull(1)), pull10: g(() => this.pull(10)), offers: [], hasPull: !!s.pull, pullBurst: null, pullSub: '', pullCards: null, closePull: g(() => this.setState({ pull: null })),
      resRibbonBg: '#D2532A', resRibbon: '', resTitle: '', resSub: '', resStats: [], resRecord: false, resRewards: [], resQuote: '', claim1: g(() => this.claim(1)), claim2: g(() => this.claim(2)),
      tabs: [], hasToast: !!s.toast, toastText: s.toast ? s.toast.text : '',
      still, stances: Object.entries(C.STANCES).map(([id, st]) => ({ id, name: st.name, icon: st.icon, on: (s.stance || 'santai') === id, pick: g(() => this.setStance(id)) })),
      chapterRule: ch.rule, chapterTotal: C.CHAPTERS.length, lobbySky: ch.theme.lSky, lobbyHill: ch.theme.lHill, lobbyGround: ch.theme.lGround,
      sceneSky: (r ? C.CHAPTERS[r.chapter] : ch).theme.sky, sceneGround: (r ? C.CHAPTERS[r.chapter] : ch).theme.ground, battleBg: (r ? C.CHAPTERS[r.chapter] : ch).theme.battle,
      chapterUpper: ch.name.toUpperCase(), walkPose: 'idle', sceneEnemy: false, sceneEnemyKind: 'tikus', sceneQuestion: false, farStrip: null, groundStrip: null,
      evKind: 'tikus', eKind: 'tikus', heroPose: 'idle', hLunge: 'none', eLunge: 'none', resPose: rs && rs.win ? 'seram' : 'sleep',
      heroScreenPose: C.POSES[(s.heroPoseIdx || 0) % 6][0], heroScreenPoseLabel: C.POSES[(s.heroPoseIdx || 0) % 6][1].toUpperCase(), cyclePose: g(() => this.setState({ heroPoseIdx: (s.heroPoseIdx || 0) + 1 }))
    };

    if (r) {
      const W = [['wb_sunny', 'Cerah, agak ambigu'], ['cloud', 'Berawan. Awannya diam.'], ['water_drop', 'Gerimis tipis'], ['air', 'Berangin, arah salah']][Math.floor(r.day / 4) % 4];
      Object.assign(v, {
        pauseIcon: r.auto ? 'pause' : 'play_arrow', runChapterNo: r.chapter + 1, runChapterUpper: (r.daily ? 'HARIAN · ' : '') + C.CHAPTERS[r.chapter].name.toUpperCase(),
        day: r.day, maxDay: r.maxDay, runCoins: fmt(r.coins), dayPct: pct(r.day, r.maxDay), miniMarks: Array.from({ length: Math.floor((r.maxDay - 1) / 5) }, (_, i) => (i + 1) * 5).filter(d => d !== Math.round(r.maxDay / 2)).map(d => ({ d, left: pct(d, r.maxDay), done: r.day >= d })), weatherIcon: W[0], weather: W[1],
        walkStatus: r.event ? 'BERHENTI' : o ? 'MENUNGGU' : r.auto ? 'BERJALAN…' : 'JEDA',
        lvl: r.lvl, hpPct: pct(r.hp, r.maxHp), hpLabel: `${fmt(r.hp)} / ${fmt(r.maxHp)}`, xpPct: pct(r.xp, r.xpNext), xpLabel: `${r.xp}/${r.xpNext}`, atk: fmt(r.atk), def: fmt(r.def),
        logCount: r.log.length,
        log: r.log.map(e => ({ id: e.id, text: e.text, stamp: `H${e.day}`, stampColor: toneLight[e.tone] || toneLight.plain, hasFx: e.fx.length > 0,
          fx: e.fx.map(f => ({ icon: FX[f.k][0], label: `${f.v > 0 ? '+' : '−'}${fmt(Math.abs(f.v))} ${FX[f.k][1]}${f.tag ? ` · ${f.tag}` : ''}`, bg: f.v < 0 ? '#F6C9BD' : f.k === 'coins' ? '#FBE6B4' : f.k === 'xp' ? '#E7D9F5' : '#CFE6D6' })) }))
      });
      const walking = r.auto && !r.event && !o && scr === 'run' && !still;
      const rr = C.CHAPTERS[r.chapter].rule, st = C.STANCES[r.stance], rt = r.route && C.ROUTES[r.route.kind];
      v.runChips = [
        rr && !r.tower && { key: 'rule', icon: 'gavel', label: rr.name, bg: '#2B1E18', tap: g(() => this.toast(`Aturan bab — ${rr.name}: ${rr.desc}`)) },
        st && { key: 'stance', icon: st.icon, label: st.name, bg: '#3C78C8', tap: g(() => this.toast(`Gaya jalan — ${st.name}: ${st.desc}`)) },
        rt && { key: 'route', icon: rt.icon, label: `${rt.name} · s/d H${r.route.until}`, bg: r.route.kind === 'bahaya' ? '#D2532A' : '#2F7A5C', tap: g(() => this.toast(rt.desc)) }
      ].filter(Boolean);
      Object.assign(v, { walkPose: r.auto && !r.event && !o ? 'walk' : 'idle', sceneEnemy: !!r.event && r.event.kind === 'enemy', sceneEnemyKind: r.event && r.event.kind === 'enemy' ? r.event.enemy : 'tikus', sceneQuestion: !!r.event && r.event.kind === 'choice', farStrip: stripEl('far', walking, C.CHAPTERS[r.chapter].theme.hill), groundStrip: stripEl('near', walking), cloudStrip: sceneryEl('cloud', walking), treeStrip: sceneryEl('tree', walking, C.CHAPTERS[r.chapter].theme.lHill, C.CHAPTERS[r.chapter].theme.hill) });
      const ev = r.event;
      if (ev && ev.kind === 'choice') {
        const d = C.EVENTS.find(x => x.id === ev.id);
        Object.assign(v, { hasEvent: true, evTag: 'SESUATU TERJADI', evTagBg: '#2B1E18', evText: d.text,
          evChoices: ['a', 'b'].map((w, i) => { const c = d[w], cost = this.eventCost(r, c.cost), poor = !!cost && r.coins < cost; return { label: c.label, icon: c.icon, hint: poor ? 'koin kurang' : cost ? `−${cost} koin` : c.hint, bg: i === 0 ? '#F2B63C' : '#FFF8EC', opacity: poor ? 0.5 : 1, onClick: g(() => this.choose(w)) }; }) });
      } else if (ev && ev.kind === 'fork') {
        Object.assign(v, { hasEvent: true, evTag: 'PERSIMPANGAN', evTagBg: '#7E43B5', evText: C.FORK_TEXT,
          evChoices: [['a', 'aman'], ['b', 'pintas'], ['c', 'bahaya']].map(([w, k], i) => {
            const R = C.ROUTES[k];
            return { label: R.name, icon: R.icon, hint: R.hint, bg: ['#CFE6D6', '#FFF8EC', '#F6C9BD'][i], opacity: 1, onClick: g(() => this.choose(w)) };
          }), hasEvFoot: true, evFoot: 'Aman: tanpa musuh 3 hari. Pintas: lompat 2 hari. Berbahaya: musuh tiap hari, koin ×2 dan XP ×1,5.' });
      } else if (ev && ev.kind === 'lomba') {
        const fl = C.FESTIVALS.find(x => x.id === 'lomba');
        Object.assign(v, { hasEvent: true, evTag: 'LOMBA KAMPUNG', evTagBg: fl.color, evText: 'Sebatang pinang berlumur oli berdiri di tengah lapangan. Di puncaknya: sepeda, ember, dan kupon koin. Penonton menatap Santoni.',
          evChoices: [
            { label: 'Panjat pinang', icon: 'emoji_events', hint: '55% · hadiah besar', bg: '#F2B63C', opacity: 1, onClick: g(() => this.choose('a')) },
            { label: 'Jadi penonton', icon: 'visibility', hint: `+3 ${fl.token}`, bg: '#FFF8EC', opacity: 1, onClick: g(() => this.choose('b')) }
          ], hasEvFoot: true, evFoot: `Berhasil: koin dan +10 ${fl.token}. Gagal: −10% HP dan +2 ${fl.token}.` });
      } else if (ev && ev.kind === 'enemy') {
        const e = C.ENEMIES[ev.enemy], en0 = this.makeEnemy(ev.enemy, r.day, r.chapter), en = ev.elite ? this.makeElite(en0, r) : en0, gOn = p.gertak !== false;
        const choices = [{ label: 'Lawan', icon: 'swords', hint: 'auto-battle', bg: '#F2B63C', opacity: 1, onClick: g(() => this.choose('a')) }];
        const pasal = this.ruleOf(r) === 'pasal';
        if (gOn && pasal) choices.push({ label: 'Pose Seram', icon: 'gavel', hint: 'pasal 47', bg: '#EADBC5', opacity: 0.55, onClick: g(() => this.toast(C.CHAPTERS[r.chapter].rule.desc)) });
        else if (gOn) choices.push(e.boss || ev.elite
          ? { label: 'Pose Seram', icon: 'sports_martial_arts', hint: ev.elite ? 'minibos kebal' : 'bos kebal', bg: '#EADBC5', opacity: 0.55, onClick: g(() => this.toast(ev.elite ? 'Minibos tidak mempan digertak. Ia sudah sering melihat panda berdiri.' : e.immune)) }
          : { label: 'Pose Seram', icon: 'sports_martial_arts', hint: `${Math.round(this.bluffChance(r) * 100)}% kabur`, bg: '#FFF8EC', opacity: 1, onClick: g(() => this.choose('b')) });
        Object.assign(v, { evKind: ev.enemy, evTrait: e.trait ? { tag: e.trait, desc: e.traitDesc } : null, hasEvent: true, evTag: e.boss ? 'BOS MENGHADANG' : ev.elite ? 'MINIBOS MENGHADANG' : 'ADA YANG MENGHADANG', evTagBg: ev.elite ? '#7E43B5' : '#D2532A', evIsEnemy: true, evIcon: e.icon, evName: ev.elite ? `${e.name} · Minibos` : e.name,
          evSub: `LV ${en.lvl} · HP ${fmt(en.maxHp)} · ATK ${fmt(en.atk)}`, evText: e.intro, evChoices: choices, hasEvFoot: gOn,
          evFoot: ev.elite ? 'Minibos: HP ×3, ATK +45%, mengamuk di bawah 40% HP, tidak bisa digertak. Menang: koin besar dan satu jurus pilihan.' : e.boss ? e.immune : 'Pose Seram: Santoni berdiri dengan dua kaki. Kalau gagal, musuh tersinggung — menyerang duluan dengan ATK +20%.' });
      }
    }
    if (o && scr === 'run') {
      const T = { start: ['BEKAL AWAL', 'Pilih satu untuk dibawa. Ransel Santoni kecil.'], bonus: ['SESUATU BERUBAH', 'Tombol merah memberi pilihan. Tombol merah tidak menjelaskan.'], elite: ['RAMPASAN MINIBOS', 'Minibos menjatuhkan gulungan jurus. Pilih satu untuk dipelajari.'], lvl: ['NAIK LEVEL!', 'Pilih satu. Dua lainnya akan baik-baik saja. Mungkin.'] }[o.kind];
      Object.assign(v, { hasOffer: true, burst: burstEl('b1', 120), offerTitle: T[0], offerSub: T[1], offerHasLvl: o.kind === 'lvl', offerFrom: o.from || 0, offerTo: o.to || 0,
        offerCards: o.ids.map(id => { const k = C.SKILLS.find(x => x.id === id), rr = R[k.rar], have = counts[id] || 0;
          return { id, name: k.name, icon: k.icon, desc: k.desc, rarity: rr.label, bg: rr.bg, fg: rr.fg, tag: have ? `LV ${have} → ${have + 1}` : 'BARU', el: k.el ? C.ELEMENTS[k.el] : null, pick: g(() => this.pickSkill(id)) }; }),
        rerollDisabled: o.rerolls < 1, rerollOpacity: o.rerolls > 0 ? 1 : 0.4, rerollLeft: o.rerolls });
    }
    if (b) {
      const en = b.enemy;
      const act = s.act;
      const heroPose = b.over === 'win' ? 'seram' : b.over === 'lose' ? 'sleep' : act && act.pose ? act.pose : act && act.who === 'hero' ? (act.seram ? 'seram' : 'attack') : act && act.who === 'enemy' && act.hurt ? 'hurt' : 'idle';
      Object.assign(v, { eMood: s.shake === 'enemy' ? 'hurt' : act && act.who === 'enemy' ? 'attack' : null, eMoodKey: act ? act.t : 0, eKind: en.key, heroPose, hLunge: act && act.who === 'hero' && !act.seram && !act.pose ? 'translate(28px,-12px)' : 'none', eLunge: act && act.who === 'enemy' ? 'translate(-34px,14px)' : 'none' });
      // Status chips + visual tells for skills whose effects build up over a fight.
      const n = id => this.stacks(r, id), mock = n('sindiran') && en.hp > 0 && en.hp < en.maxHp * 0.35;
      const eStatus = [], hStatus = [];
      const eDef = C.ENEMIES[en.key];
      if (b.elite) eStatus.push({ icon: 'skull', label: 'MINIBOS', bg: '#7E43B5' });
      if (eDef.trait) eStatus.push({ icon: 'info', label: eDef.trait, bg: '#3A3550' });
      if (b.inked) hStatus.push({ icon: 'water_drop', label: 'TERKENA TINTA', bg: '#3A3550' });
      if (b.charmed) hStatus.push({ icon: 'auto_awesome', label: `TERPESONA ${b.charmed}`, bg: '#B04A8E' });
      if (b.heat) eStatus.push({ icon: 'local_fire_department', label: `PEDAS ${b.heat}/5`, bg: '#D2532A' });
      if (mock) eStatus.push({ icon: 'sentiment_dissatisfied', label: 'TERSINDIR +' + 50 * n('sindiran') + '%', bg: '#7E43B5' });
      if (b.rage) hStatus.push({ icon: 'hourglass_bottom', label: `GERAM +${7 * n('sabar') * b.rage}%`, bg: '#B0620A' });
      if (n('kardus') && !b.boxUsed) hStatus.push({ icon: 'inventory_2', label: 'KARDUS SIAP', bg: '#5E6E52' });
      if (n('kesiangan') > (r.revived || 0)) hStatus.push({ icon: 'alarm', label: `NYAWA CADANGAN ${n('kesiangan') - (r.revived || 0)}`, bg: '#B0620A' });
      if (n('menguap')) hStatus.push({ icon: 'snooze', label: `HINDAR ${Math.round(Math.min(0.4, 0.12 * n('menguap')) * 100)}%`, bg: '#3166B0' });
      if (n('kaktus')) hStatus.push({ icon: 'grass', label: `PANTUL ${30 * n('kaktus')}%`, bg: '#2F7A5C' });
      if (b.burn) eStatus.push({ icon: 'whatshot', label: `TERBAKAR ${b.burn}`, bg: '#B0420A' });
      if (b.stun) eStatus.push({ icon: 'electric_bolt', label: 'LUMPUH', bg: '#C28A16' });
      if (b.quake) eStatus.push({ icon: 'landslide', label: `ATK −${15 * b.quake}%`, bg: '#8E5A2B' });
      if (b.shield > 0) hStatus.unshift({ icon: 'shield', label: `PERISAI ${fmt(b.shield)}`, bg: '#6E5A4E' });
      for (const c of C.COMBOS) if (this.hasCombo(r, c.id)) hStatus.unshift({ icon: 'auto_awesome', label: `KOMBO ${c.name.toUpperCase()}`, bg: '#7E43B5' });
      for (const tc of this.teamCombos()) hStatus.push({ icon: 'diversity_3', label: `TIM ${tc.name.toUpperCase()}`, bg: '#2F7A5C' });
      const glow = b.burn ? 'rgba(255,110,30,.9)' : b.heat ? 'rgba(255,96,40,.85)' : b.stun ? 'rgba(255,228,92,.95)' : null;
      Object.assign(v, { eStatus, hStatus,
        eFilter: glow ? `drop-shadow(0 0 ${b.burn || b.stun ? 12 : 4 + b.heat * 3}px ${glow})` : b.elite ? 'drop-shadow(0 0 7px rgba(160,90,235,.95))' : 'none',
        efx: elementFx(b.efx || [], still), eAura: auraEl(b, still), hShield: b.shield > 0,
        flashKey: (b.efx || []).some(x => x.el === 'petir' && x.big) ? b.efx[0].id : 0,
        quakeAnim: !still && (b.efx || []).some(x => x.el === 'tanah' && x.big) ? `fxQuake${b.efx[0].id % 2} .45s ease-out` : 'none',
        twin: !!(act && act.twin), twinKey: act ? act.t : 0, assist: !!(act && act.assist), assistKey: act ? act.t : 0 });
      const fx = b.fx || {}, dash = Math.min(0.46, 0.62 / (s.speed || 1)), struck = fx.allies || [];
      const at = b.allyT || {}, cs = b.comboShow, live = cs && Date.now() - cs.t < 1100;
      v.allies = this.teamKinds().map((kind, i) => ({ slot: i, kind, t: at[i] || 0, delay: at[`${i}d`] || 0 }));
      v.petT = at.pet || 0; v.petDelay = at.petd || 0; v.allyTime = `${Math.min(0.62, 0.95 / (s.speed || 1)).toFixed(2)}s`;
      v.comboN = live ? cs.n : 0; v.comboKey = live ? cs.t : 0; v.rushOn = !!(live && cs.rush);
      v.teamCombosOn = this.teamCombos().map(tc => tc.name);
      Object.assign(v, { heroAct: fx.dash === 'hero' ? fx.t : 0, enemyAct: fx.dash === 'enemy' ? fx.t : 0,
        enemyHit: fx.hit === 'enemy', heroHit: fx.hit === 'hero', hitKey: fx.t || 0, critShake: fx.hit === 'enemy' && !!fx.crit,
        dashTime: `${dash.toFixed(2)}s`, hitDelay: `${(dash * 0.3).toFixed(2)}s`, stageTheme: (r ? C.CHAPTERS[r.chapter] : ch).theme,
        lowHp: !b.over && r.hp > 0 && r.hp < r.maxHp * 0.3 });
      const wid = this.weaponOf(r), ult = C.ULTIMATES[wid] || C.ULTIMATES.none;
      if (b.parry) hStatus.unshift({ icon: 'beach_access', label: `TANGKIS ×${b.parry}`, bg: '#3C78C8' });
      Object.assign(v, { ultWeapon: wid, ultName: ult.name, ultPct: pct(b.ult || 0, 100), ultReady: (b.ult || 0) >= 100,
        ultCine: b.ultFx && !still ? { ...b.ultFx, chips: b.ultFx.els.map(el => C.ELEMENTS[el]) } : null });
      Object.assign(v, { bElite: !!b.elite, bTurn: b.turn, bFloor: b.tower || 0, askQuit: g(() => this.askQuit()), bBoss: en.boss, eIcon: en.icon, eName: en.name, eLvl: en.lvl, eHpPct: pct(en.hp, en.maxHp), eHpLabel: `${fmt(en.hp)} / ${fmt(en.maxHp)}`,
        eTf: s.shake === 'enemy' ? 'translate(10px,-4px) rotate(4deg)' : 'none', hTf: s.shake === 'hero' ? 'translate(-10px,4px) rotate(-4deg)' : 'none',
        eArtId: `art-musuh-${en.key}`, eArtLabel: `Ilustrasi musuh — ${en.name}`,
        enemyPops: b.pops.filter(x => x.side === 'enemy').map(x => popEl(x, still)), heroPops: b.pops.filter(x => x.side === 'hero').map(x => popEl(x, still)),
        banner: b.banner ? bannerEl(b.banner, still) : null,
        bLog: b.log.map((l, i, a) => ({ id: l.id, text: l.text, color: toneDark[l.tone] || toneDark.plain, opacity: i === a.length - 1 ? 1 : 0.5 })),
        koEnemy: b.over === 'win', koHero: b.over === 'lose',
        bSummary: b.over ? {
          win: b.over === 'win', key: b.overAt || 0, cont: g(() => { this._acc = 0; this.endBattle(); }), share: b.over === 'win' && !b.tower ? g(() => { this._acc = -6000; this.shareBattle(); }) : null,
          stats: [
            { label: 'TOTAL KERUSAKAN', value: b.dealt || 0, color: '#F2B63C' },
            { label: 'PUKULAN TERBESAR', value: b.best || 0, color: '#FFF8EC' },
            { label: 'KRITIS', value: b.crits || 0, color: '#FF9C8A' },
            { label: 'DITERIMA', value: b.taken || 0, color: '#9EC3F0' }
          ],
          line: b.over === 'win' ? `${en.name} tumbang di giliran ${b.turn}.` : `Santoni bertahan sampai giliran ${b.turn}. Lalu tidak.`
        } : null,
        bOver: !!b.over, bOverText: b.over === 'win' ? 'MENANG' : 'KALAH', bOverColor: b.over === 'win' ? '#F2B63C' : '#E0503A' });
    }
    if (scr === 'hero') {
      const TL = { senjata: 'SENJATA', topi: 'TOPI', baju: 'BAJU', kalung: 'KALUNG', sabuk: 'SABUK', sepatu: 'SEPATU' };
      const order = { Legendaris: 0, Epik: 1, Langka: 2, Biasa: 3 };
      const slot = t => {
        const it = C.ITEMS[s.equipped[t]];
        if (!it) return { icon: 'add', bg: '#EADBC5', fg: '#6E5A4E', lvl: '—', type: TL[t], tap: g(() => {}) };
        const rr = R[it.rar];
        const star = ((s.gearStar || {})[s.equipped[t]]) || 0;
        return { item: s.equipped[t], icon: it.icon, bg: rr.bg, fg: rr.fg, el: it.el ? C.ELEMENTS[it.el] : null, lvl: `${((s.gearLv || {})[s.equipped[t]]) || 1}${star ? ` ★${star}` : ''}`, type: TL[t], tap: g(() => this.openItem(s.equipped[t], 'slot')) };
      };
      const wid = s.equipped.senjata || 'none', ult = C.ULTIMATES[wid] || C.ULTIMATES.none;
      v.heroUlt = { weapon: wid, name: ult.name, desc: ult.desc };
      Object.assign(v, { slotsL: ['senjata', 'topi', 'baju'].map(slot), slotsR: ['kalung', 'sabuk', 'sepatu'].map(slot),
        heroStats: [{ icon: 'swords', label: 'ATK', value: fmt(base.atk) }, { icon: 'favorite', label: 'HP', value: fmt(base.hp) }, { icon: 'shield', label: 'DEF', value: fmt(base.def) }, { icon: 'bolt', label: 'KRIT', value: `${C.BASE_CRIT + this.resonance(s.equipped).petir}%` }],
        resoChips: (() => { const n = this.equipEls(s.equipped), rs = this.resonance(s.equipped);
          return Object.keys(C.ELEMENTS).filter(el => n[el]).map(el => ({ key: el, ...C.ELEMENTS[el], count: n[el], on: rs[el] > 0,
            bonus: rs[el] > 0 ? `${C.RESONANCE[el].stat} +${rs[el]}%` : 'pasang 1 lagi' })); })(),
        bag: s.bag.map((id, i) => ({ id, i })).sort((x, y) => order[C.ITEMS[x.id].rar] - order[C.ITEMS[y.id].rar]).map(({ id, i }) => {
          const it = C.ITEMS[id], rr = R[it.rar], cur = s.equipped[it.type];
          return { key: `${id}-${i}`, item: id, icon: it.icon, bg: rr.bg, fg: rr.fg, el: it.el ? C.ELEMENTS[it.el] : null, lvl: it.lvl, better: !cur || this.itemScore(id) > this.itemScore(cur), equip: g(() => this.openItem(id, 'bag')) };
        }) });
    }
    if (scr === 'map') {
      v.chapters = C.CHAPTERS.map((c, i) => {
        const un = unlocked(i), done = s.best[i] >= days, cur = i === s.chapter;
        return { no: i + 1, name: c.name, desc: c.desc, icon: c.icon, expanded: cur, compact: !cur,
          nodeBg: cur ? '#D2532A' : done ? '#2F7A5C' : un ? '#FFF8EC' : '#E2D5C3', nodeFg: cur || done ? '#FFF8EC' : un ? '#2B1E18' : '#8A776A',
          status: done ? 'SELESAI · MAIN LAGI?' : 'SEDANG DITEMPUH', theme: c.theme, boss: c.boss,
          best: `REKOR: HARI ${Math.min(s.best[i], days)} / ${days}`,
          line: done ? `Selesai · ${days}/${days} hari` : un ? `Rekor: Hari ${s.best[i]} / ${days}` : `Selesaikan Bab ${i} dulu`,
          endIcon: done ? 'check_circle' : un ? 'chevron_right' : 'lock', endFg: done ? '#2F7A5C' : '#6E5A4E',
          cardBg: un ? '#FFF8EC' : '#EDE2D2', opacity: un ? 1 : 0.62, thumbBg: un ? (done ? '#CFE6D6' : '#FBE6B4') : '#E2D5C3',
          lineup: c.pool.map(k => ({ kind: k, name: C.ENEMIES[k].name, role: '' })).concat([{ kind: c.mid, name: C.ENEMIES[c.mid].name, role: 'TENGAH' }, { kind: c.boss, name: C.ENEMIES[c.boss].name, role: 'BOS' }]),
          rule: c.rule, bossName: C.ENEMIES[c.boss].name, bossTrait: C.ENEMIES[c.boss].traitDesc || C.ENEMIES[c.boss].intro, power: `KEKUATAN MUSUH +${i * 14}%`,
          select: g(() => this.selectChapter(i)), dayPct: pct(s.best[i], days), chests: chestFor(i), cta: done ? 'MAIN LAGI' : 'LANJUTKAN', play: g(() => this.startRun()) };
      });
    }
    if (scr === 'shop') {
      v.offers = C.OFFERS.map(of => {
        const sold = !!s.sold[of.id], rr = R[of.rar];
        return { id: of.id, name: of.name, icon: of.icon, bg: rr.bg, fg: rr.fg, curIcon: of.cur === 'gem' ? 'diamond' : of.cur === 'coin' ? 'toll' : 'smart_display',
          price: sold ? 'Terjual' : typeof of.price === 'number' ? fmt(this.offerPrice(of)) : of.price, btnBg: sold ? '#EADBC5' : of.cur === 'ad' ? '#CFE6D6' : '#F2B63C', opacity: sold ? 0.55 : 1, sold, buy: g(() => this.buy(of.id)) };
      });
    }
    if (s.pull) {
      const items = s.pull.items, hi = items.filter(id => C.ITEMS[id].rar === 'Epik' || C.ITEMS[id].rar === 'Legendaris').length, it0 = C.ITEMS[items[0]];
      Object.assign(v, { pullBurst: burstEl('b2', 300), pullCards: pullCardsEl(s.pull),
        pullSub: items.length === 1 ? `${it0.name}. ${it0.desc}` : hi ? `${hi} item Epik ke atas. Sisanya tetap teman.` : 'Tidak ada yang Epik. Petinya minta maaf.' });
    }
    if (rs) {
      const it = rs.item ? C.ITEMS[rs.item] : null, rr = it ? R[it.rar] : null;
      const tw = rs.tower;
      if (rs.challenge) {
        Object.assign(v, { resRibbonBg: rs.win ? '#2F7A5C' : '#D2532A', resRibbon: rs.ribbon, resTitle: rs.title, resSub: rs.sub, resStats: rs.stats, resRecord: !!rs.record,
          resRewards: this.rewardTiles(rs.give || {}).slice(0, 4), resQuote: rs.quote, resStory: rs.story || null, shareRun: g(() => this.shareRun()), resDaily: rs.daily ? { score: fmt(rs.daily.score), open: g(() => { this.claim(1); this.go('harian'); this.loadBoard(); }) } : null });
      } else
      Object.assign(v, { resRibbonBg: rs.win ? '#2F7A5C' : '#D2532A',
        resRibbon: tw ? (rs.win ? `LANTAI ${tw} DITAKLUKKAN` : 'MENARA MENANG KALI INI') : rs.win ? 'BAB SELESAI' : 'PERJALANAN BERAKHIR',
        resTitle: tw ? (rs.win ? 'SANTONI NAIK.' : 'SANTONI TURUN.') : rs.win ? 'SANTONI MENANG.' : 'SANTONI PULANG.',
        resSub: tw ? `${C.TOWER.name} · Lantai ${tw}` : `${C.CHAPTERS[rs.chapter].name} · Hari ${rs.day} dari ${rs.maxDay}`,
        resStats: tw ? [{ value: tw, label: 'LANTAI' }, { value: (s.tower || {}).best || 0, label: 'REKOR' }, { value: rs.skills, label: 'SKILL' }]
          : [{ value: rs.day, label: 'HARI' }, { value: rs.kills, label: 'MUSUH' }, { value: rs.skills, label: 'SKILL' }], resRecord: rs.record,
        resRewards: [{ icon: 'toll', label: `+${fmt(rs.coins)}`, bg: '#FBE6B4', fg: '#B0620A' }, { icon: 'diamond', label: `+${fmt(rs.gems)}`, bg: '#E7D9F5', fg: '#7E43B5' }, { icon: 'star', label: `+${fmt(rs.xp)} XP`, bg: '#CFE6D6', fg: '#2F7A5C' },
          it ? { item: rs.item, icon: it.icon, label: it.name, bg: rr.bg, fg: rr.fg } : { icon: 'sentiment_neutral', label: 'Tanpa item', bg: '#EADBC5', fg: '#6E5A4E' }],
        resQuote: rs.quote });
    }
    const J = s.journal || [];
    const mapEntry = e => ({ id: e.id, text: e.text, stamp: `H${e.day}`, stampColor: toneLight[e.tone] || toneLight.plain, hasFx: e.fx.length > 0,
      fx: e.fx.map(f => ({ icon: FX[f.k][0], label: `${f.v > 0 ? '+' : '−'}${fmt(Math.abs(f.v))} ${FX[f.k][1]}${f.tag ? ` · ${f.tag}` : ''}`, bg: f.v < 0 ? '#F6C9BD' : f.k === 'coins' ? '#FBE6B4' : f.k === 'xp' ? '#E7D9F5' : '#CFE6D6' })) });
    const lj = J[0], te = lj && lj.entries.length ? lj.entries[(s.tick || 0) % lj.entries.length] : null;
    Object.assign(v, {
      copyBackup: g(() => this.copyBackup()), loadBackup: g(() => this.loadBackup()),
      isJournal: scr === 'journal', journalSummary: `${J.length} PERJALANAN`, openJournal: g(() => this.go('journal')),
      tickerText: te ? `H${te.day} · ${te.text}` : 'Belum ada catatan. Santoni belum ke mana-mana.',
      tapBebek: g(() => this.toast('Bebek Satpam: "KTP-nya, Mas." Santoni tidak punya KTP.')),
      tapKelinci: g(() => this.toast('Kelinci Penagih mengintip. Ia mencatat sesuatu. Santoni pura-pura tidak lihat.')),
      tapLebah: g(() => this.toast('Lebah Notaris lewat. Kunjungan ini sudah dilegalisir.')),
      tapMisi: g(() => this.go('misi')),
      tapTeman: g(() => this.go('teman')),
      journal: J.map(j => { const open = s.openJ === j.id, ents = open ? j.entries : j.entries.slice(-4);
        return { share: g(() => this.shareJournal(j.id)), title: C.CHAPTERS[j.chapter].name, sub: `HARI ${j.day} / ${j.maxDay} · ${j.entries.length} CATATAN`, badge: j.win ? 'MENANG' : 'PULANG', headBg: j.win ? '#CFE6D6' : '#F7D9BF', icon: C.CHAPTERS[j.chapter].icon,
          entries: ents.map(mapEntry), more: j.entries.length > 4, moreLabel: open ? 'Ringkas' : `Lihat semua ${j.entries.length} catatan`, toggle: g(() => this.setState({ openJ: open ? null : j.id })) }; })
    });
    const qv = (q, daily) => {
      const p = Math.min(q.target, this.questProgress(q, daily, s)), done = p >= q.target, claimed = this.questClaimed(q, daily, s), rw = q.reward;
      return { id: q.id, icon: q.icon, title: q.title, desc: q.desc, progress: `${fmt(p)}/${fmt(q.target)}`, pct: pct(p, q.target), done, claimed,
        reward: this.rewardLabel(rw), rewardIcon: rw.coins ? 'toll' : rw.gems ? 'diamond' : rw.energy ? 'bolt' : rw.asah ? 'hardware' : null, rewardItem: rw.item || null,
        claim: g(() => this.claimQuest(q.id, daily)) };
    };
    const dq = C.DAILY_QUESTS.map(q => qv(q, true)), aq = C.QUESTS.map(q => qv(q, false));
    const ready = dq.concat(aq).filter(q => q.done && !q.claimed).length;
    const tab = s.misiTab === 'petualangan' ? 'petualangan' : 'harian';
    Object.assign(v, {
      isMisi: scr === 'misi', misiTab: tab, quests: tab === 'harian' ? dq : aq,
      misiTabs: [['harian', 'Harian', dq], ['petualangan', 'Petualangan', aq]].map(([key, label, list]) => ({ key, label, count: list.filter(q => q.done && !q.claimed).length, on: tab === key, pick: g(() => this.setState({ misiTab: key })) })),
      misiBadge: ready ? `${ready}!` : `${dq.filter(q => q.claimed).length}/${dq.length}`, misiReady: ready > 0,
      misiSummary: `${dq.filter(q => q.done).length} DARI ${dq.length} HARI INI`
    });
    const tw = s.tower || { floor: 1, best: 0 };
    v.tower = { name: C.TOWER.name, desc: C.TOWER.desc, floor: tw.floor, best: tw.best, cost: C.TOWER.cost, bossNext: tw.floor % 5 === 0,
      nextBoss: C.ENEMIES[C.TOWER.bosses[(Math.ceil(tw.floor / 5) - 1) % C.TOWER.bosses.length]].name, bossIn: (5 - (tw.floor % 5)) % 5, play: g(() => this.startTower()) };
    const fn = this.festNow(), fs2 = this.festState(s), left = Math.max(0, fn.endsAt - Date.now());
    const hLeft = Math.floor(left / 3600000), dLeft = Math.floor(hLeft / 24);
    const fRemain = dLeft > 0 ? `${dLeft}H ${hLeft % 24}J` : `${hLeft}J ${Math.floor(left / 60000) % 60}M`;
    const exclusive = fn.shop.find(x => x.give.item);
    const festReady = fn.shop.filter(x => !fs2.bought[x.id] && fs2.tokens >= x.cost).length;
    Object.assign(v, {
      isFestival: scr === 'festival', seasons: this.upcomingSeasons(),
      festName: fn.name, festIcon: fn.icon, festColor: fn.color, festSub: `SISA ${fRemain} · HADIAH: ${C.ITEMS[exclusive.give.item].name.toUpperCase()}`, festReady,
      fest: { name: fn.name, icon: fn.icon, color: fn.color, desc: fn.desc, rule: fn.rule, token: fn.token, tokenIcon: fn.tokenIcon, tokens: fs2.tokens, remain: fRemain, next: fn.next.name,
        shop: fn.shop.map(x => ({ id: x.id, cost: x.cost, bought: !!fs2.bought[x.id], afford: fs2.tokens >= x.cost, item: x.give.item || null,
          label: x.give.item ? C.ITEMS[x.give.item].name : this.rewardLabel(x.give), sub: x.give.item ? `${C.ITEMS[x.give.item].rar} · ${C.ITEMS[x.give.item].stat} +${C.ITEMS[x.give.item].val}` : 'Sekali per festival',
          icon: x.give.coins ? 'toll' : x.give.gems ? 'diamond' : 'bolt', buy: g(() => this.festBuy(x.id)) })) }
    });
    const fr = this.friendsToday(s), tb = (s.tower || {}).best || 0;
    const friends = C.FRIENDS.map(fd => {
      const pts = (fr.points || {})[fd.id] || 0, tier = [...C.FRIEND_TIERS].reverse().find(t => pts >= t.at), next = C.FRIEND_TIERS.find(t => pts < t.at);
      return { id: fd.id, kind: fd.kind, name: C.ENEMIES[fd.kind].name, home: fd.home, pts, title: tier ? tier.title : 'Mantan Musuh',
        progress: next ? `${pts}/${next.at} → ${next.title}` : 'SAHABAT SEJATI', pct: pct(pts, next ? next.at : pts || 1), greeted: !!fr.greeted[fd.id], greet: g(() => this.greetFriend(fd.id)) };
    });
    const board = C.RIVALS.map(x => ({ ...x, me: false })).concat({ name: 'Santoni', kind: 'santoni', floor: tb, me: true }).sort((a, b) => b.floor - a.floor)
      .map((x, i) => ({ ...x, rank: i + 1 }));
    const gifts = friends.filter(x => !x.greeted).length;
    Object.assign(v, { isTeman: scr === 'teman', friends, friendGifts: gifts, board, shareRecord: g(() => this.shareRecord()),
      temanBadge: gifts > 0 ? `${gifts}` : '' });
    v.pullCost1 = fmt(Math.round(150 * (fn.id === 'diskon' ? 0.8 : 1)));
    v.pullCost10 = fmt(Math.round(1350 * (fn.id === 'diskon' ? 0.8 : 1)));
    Object.assign(v, this.modesView(s, { g, fmt }));
    Object.assign(v, this.companionsView(s, { g, fmt, pct }));
    Object.assign(v, this.accountView(s, { g, fmt }));
    v.itemSheet = this.itemSheetView(s, { g, fmt });
    v.theme = s.theme === 'klasik' ? 'klasik' : 'modern';
    v.install = this.props.persist && !isStandalone() && (canPrompt() || isIOS()) ? { prompt: canPrompt(), ios: !canPrompt() && isIOS(),
      go: g(async () => { const r = await promptInstall(); if (r === 'accepted') { this.toast('Santoni pindah ke layar utama. Ia tidak bilang terima kasih, tapi senang.'); if (this.logEvent) this.logEvent('install', {}); } }) } : null;
    v.themes = [['modern', 'Modern', 'Font tegas, kartu berbayang lembut'], ['klasik', 'Klasik', 'Tampilan awal yang bulat dan lucu']].map(([id, label, desc]) => ({ id, label, desc, on: v.theme === id, pick: g(() => this.setState({ theme: id })) }));
    Object.assign(v, this.mailView(s, { g, fmt }));
    Object.assign(v, this.dailyView(s, { g, fmt }));
    const cf = s.confirm;
    v.confirm = cf && cf.kind === 'cloud' ? v.cloudConfirm || null : cf ? {
      title: cf.kind === 'tower' ? 'Menyerah di lantai ini?' : 'Pulang sekarang?',
      text: cf.kind === 'tower' ? 'Lantai ini tidak dihitung. Energi yang dipakai tidak kembali, tapi tangganya tetap ada besok.' : 'Perjalanan berakhir di sini. Hadiah dihitung sampai hari ini, dan rekor tetap dicatat.',
      yesLabel: cf.kind === 'tower' ? 'Menyerah' : 'Pulang', yes: g(() => this.quitRun()), no: g(() => this.closeConfirm())
    } : null;
    v.askQuit = g(() => this.askQuit());
    v.tabs = [['shop', 'Toko', 'storefront'], ['hero', 'Hero', 'pets'], ['lobby', 'Jalan', 'hiking'], ['map', 'Peta', 'map'], ['journal', 'Jurnal', 'menu_book']].map(([key, label, icon]) => {
      const on = scr === key, center = key === 'lobby';
      return { key, label, icon, on, go: g(() => (key === 'misi' ? this.toast('Misi: belum ada. Seperti rencana hidup Santoni.') : this.go(key))),
        size: center ? '58px' : '44px', iconSize: center ? '30px' : '24px', lift: center ? '-16px' : on ? '-6px' : '0px',
        bg: on ? '#F2B63C' : center ? '#D2532A' : 'transparent', border: on || center ? '#FFF8EC' : 'transparent', iconColor: on ? '#2B1E18' : '#FFF8EC',
        color: on ? '#F2B63C' : 'rgba(255,248,236,.72)', shadow: on || center ? '0 4px 0 #120C09' : 'none' };
    });
    return v;
  }

  render() {
    return <GameView v={this.buildView()} />;
  }
}

// Dungeons, arena, mine and workshop live in modes.js.
Object.assign(Game.prototype, modeMethods, companionMethods, accountMethods, mailMethods, shareMethods, dailyMethods);
// Daily challenge runs draw every random roll from the day's seed (see daily.js).
for (const name of ['advanceDay', 'choose', 'battleStep', 'endBattle', 'reroll', 'pickSkill']) {
  const orig = Game.prototype[name];
  Game.prototype[name] = function (...args) { return this.seeded(name, () => orig.apply(this, args)); };
}
