// Tantangan Harian: one seeded run per day, the same for every player (chapter, starting skills,
// events and enemies follow the WIB date), with standard stats and no team, pet or gear bonuses,
// so only the player's choices differ. Scores go to a public daily board. Mixed into Game.prototype.
import * as C from './data.js';
import * as cloud from './cloud.js';

export const wibDay = (t = Date.now()) => new Date(t + 7 * 3600e3).toISOString().slice(0, 10);
const hash = str => { let h = 2166136261; for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619); return h >>> 0; };
const mulberry = seed => () => {
  seed = (seed + 0x6D2B79F5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const NICK_KEY = 'santoni:device';

export const dailyMethods = {
  dailyToday() {
    const day = wibDay(), h = hash(day);
    return { day, chapter: C.DAILY.chapters[h % C.DAILY.chapters.length], weapon: C.DAILY.weapons[(h >>> 8) % C.DAILY.weapons.length] };
  },
  harianState(s = this.state) {
    const d = this.dailyToday(), hs = s.harian || {};
    return hs.day === d.day ? hs : { day: d.day, done: false };
  },
  nick(s = this.state) {
    if (s.nick) return s.nick;
    let tail = 'XXXX';
    try { tail = (localStorage.getItem(NICK_KEY) || '').replace(/[^a-z0-9]/gi, '').slice(-4).toUpperCase() || tail; } catch { /* storage blocked */ }
    return `Panda-${tail}`;
  },

  // Runs `fn` with Math.random replaced by a generator seeded from the daily run, so the same day
  // gives every player the same rolls. Battles keep one stream per fight; other actions reseed by
  // day (and by reroll count, so rerolls still change the offer).
  seeded(name, fn) {
    const r = this.state.run;
    if (!r || !r.daily) return fn();
    let rng;
    if (name === 'battleStep') {
      const b = this.state.battle, key = `${r.daily}|b|${r.day}|${b ? b.enemy.key : ''}`;
      if (!this._dRng || this._dRng.key !== key) this._dRng = { key, rng: mulberry(hash(key)) };
      rng = this._dRng.rng;
    } else {
      const o = this.state.offer;
      rng = mulberry(hash(`${r.daily}|${name}|${r.day}|${o ? o.rerolls : ''}`));
    }
    return this.withRng(rng, fn);
  },
  withRng(rng, fn) {
    const orig = Math.random;
    Math.random = rng;
    try { return fn(); } finally { Math.random = orig; }
  },

  startDaily() {
    const s = this.state, d = this.dailyToday(), hs = this.harianState();
    if (hs.done) return this.toast('Tantangan hari ini sudah dimainkan. Peta baru muncul besok pukul 00.00 WIB.');
    if (s.run) return this.toast('Selesaikan perjalanan yang sedang berjalan dulu.');
    const st = C.DAILY.stats, ch = C.CHAPTERS[d.chapter], days = C.DAILY.days;
    const run = { daily: d.day, weapon: d.weapon, chapter: d.chapter, day: 0, maxDay: days, hp: st.hp, maxHp: st.hp, atk: st.atk, def: st.def,
      lvl: 1, xp: 0, xpNext: 70, skills: [], coins: 100, kills: 0, used: [], auto: true, event: null, queue: null, stance: 'santai', route: null,
      forks: [Math.round(days / 3), Math.round(days * 2 / 3)], midDone: false, els: [], crit: 0,
      log: [{ id: this.uid(), day: 0, text: `Tantangan Harian: Santoni berangkat ke ${ch.name} membawa ${C.ITEMS[d.weapon].name}. Semua pemain mendapat jalan yang sama hari ini.`, fx: [], tone: 'plain' }] };
    const offer = this.withRng(mulberry(hash(`${d.day}|start`)), () => ({ kind: 'start', ids: this.rollSkills(3), rerolls: 1 }));
    this._acc = 0; this._dRng = null;
    this.setState({ screen: 'run', run, battle: null, result: null, pull: null, offer, harian: { ...hs, started: true } });
    this.logEvent('daily_start', { day: d.day, chapter: d.chapter });
  },

  dailyScore(r, win) {
    const hpPct = r.maxHp ? Math.max(0, r.hp) / r.maxHp : 0;
    return Math.min(3000, r.day * 100 + r.kills * 30 + (win ? 500 + Math.round(hpPct * 300) : 0));
  },
  finishDaily(r, win, killer) {
    const score = this.dailyScore(r, win);
    const entry = { day: r.daily, done: true, score, reached: r.day, win: !!win, killer: killer || '', submitted: false };
    this.setState({ harian: entry });
    this.logEvent('daily_end', { score, day: r.day, win: !!win });
    this.submitDaily(entry);
    return score;
  },
  async submitDaily(entry = this.state.harian) {
    const a = this.state.acct;
    if (!entry || !entry.done || entry.submitted) return;
    if (!a || !a.user) return;
    try {
      await cloud.submitDaily({ day: entry.day, name: this.nick(), score: entry.score, detail: { reached: entry.reached, win: entry.win } });
      this.setState(st => ({ harian: { ...st.harian, submitted: true } }));
      this.loadBoard();
    } catch {
      this.toast('Skor belum terkirim. Coba lagi dari layar Tantangan Harian.');
    }
  },
  async loadBoard() {
    const d = this.dailyToday(), hs = this.harianState();
    this.setState({ board: { day: d.day, loading: true, rows: (this.state.board || {}).rows || [] } });
    try {
      const res = await cloud.fetchBoard(d.day, hs.done && hs.submitted ? hs.score : null);
      this.setState({ board: { day: d.day, ...res, loading: false } });
    } catch {
      this.setState({ board: { day: d.day, rows: [], loading: false, error: true } });
    }
  },
  setNick(value) {
    const clean = String(value).replace(/[^\p{L}\p{N} _.-]/gu, '').slice(0, 20);
    this.setState({ nick: clean });
  },

  dailyView(s, { g, fmt }) {
    const d = this.dailyToday(), hs = this.harianState(s), ch = C.CHAPTERS[d.chapter], it = C.ITEMS[d.weapon];
    const b = s.board && s.board.day === d.day ? s.board : null;
    const msLeft = new Date(`${d.day}T00:00:00+07:00`).getTime() + 86400e3 - Date.now();
    const hLeft = Math.floor(msLeft / 3600e3), mLeft = Math.floor((msLeft % 3600e3) / 60e3);
    const loggedIn = !!(s.acct && s.acct.user), nick = this.nick(s);
    return {
      isHarian: s.screen === 'harian', openHarian: g(() => { this.go('harian'); this.loadBoard(); }),
      harianDot: !hs.done,
      harian: {
        date: new Date(`${d.day}T12:00:00+07:00`).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' }),
        chapter: ch.name, chapterIcon: ch.icon, rule: ch.rule ? ch.rule.name : '', ruleDesc: ch.rule ? ch.rule.desc : '',
        weapon: d.weapon, weaponName: it.name, days: C.DAILY.days, stats: C.DAILY.stats,
        done: !!hs.done, playing: !!(s.run && s.run.daily === d.day), score: hs.done ? fmt(hs.score) : '', reached: hs.reached, win: hs.win,
        submitted: !!hs.submitted, loggedIn, nick, resetIn: `${hLeft} jam ${mLeft} menit`,
        start: g(() => this.startDaily()), resume: g(() => this.go('run')), submit: g(() => this.submitDaily()),
        login: g(() => this.go('journal')), back: g(() => this.go('lobby')), refresh: g(() => this.loadBoard()),
        setNick: g(e => this.setNick(e.target.value)),
        board: b ? { loading: b.loading, error: b.error, total: b.total || 0, rank: b.rank,
          rows: (b.rows || []).map((row, i) => ({ rank: i + 1, name: row.name, score: fmt(row.score), mine: hs.submitted && row.name === nick && row.score === hs.score, win: row.detail && row.detail.win, reached: row.detail && row.detail.reached })) } : null
      }
    };
  }
};
