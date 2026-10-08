// Extra game modes, mixed into Game.prototype: daily dungeons, the village arena, the cracker
// mine and the gear workshop. `this` is the Game component; state lives in this.state.
import * as C from './data.js';
import * as M from './modesData.js';
import { music } from './music.js';

const dayNumber = () => Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 864e5);
const todayKey = () => String(dayNumber());
// Small deterministic PRNG so arena opponents and NPC standings stay stable within a day.
const seeded = seed => () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };

export const modeMethods = {
  // --- Gear workshop --------------------------------------------------------------------------
  gearLv(id) { return ((this.state.gearLv || {})[id]) || 1; },
  gearStar(id) { return ((this.state.gearStar || {})[id]) || 0; },
  // Effective stat of an item after workshop levels and merge stars.
  itemVal(id, s = this.state) {
    const it = C.ITEMS[id]; if (!it) return 0;
    const lv = ((s.gearLv || {})[id]) || 1, star = ((s.gearStar || {})[id]) || 0;
    return Math.round(it.val * (1 + 0.1 * (lv - 1)) * (1 + 0.3 * star));
  },
  upgradeCost(id) {
    const lv = this.gearLv(id), mult = M.RAR_MULT[C.ITEMS[id].rar];
    return { asah: Math.round((2 + lv * 2) * mult), coins: Math.round(300 * lv * mult) };
  },
  upgradeGear(id) {
    const s = this.state, lv = this.gearLv(id);
    if (lv >= M.GEAR_MAX_LV) return this.toast('Sudah level maksimal. Bengkelnya angkat tangan.');
    const cost = this.upgradeCost(id);
    if ((s.asah || 0) < cost.asah) return this.toast('Batu Asah kurang. Coba Serbu Kuil Kerupuk atau Tambang Kerupuk.');
    if (s.coins < cost.coins) return this.toast('Koin kurang. Bengkel tidak menerima utang. Kelinci Penagih sudah pernah mencoba.');
    this.setState({ asah: s.asah - cost.asah, coins: s.coins - cost.coins, gearLv: { ...(s.gearLv || {}), [id]: lv + 1 } });
    music.sfx('levelup');
    this.toast(`${C.ITEMS[id].name} naik ke Lv ${lv + 1}. Kilaunya bertambah sedikit.`);
  },
  // Three copies of an item (equipped counts as one) merge into one with +1 star.
  copiesOf(id, s = this.state) { return s.bag.filter(x => x === id).length + (Object.values(s.equipped).includes(id) ? 1 : 0); },
  mergeGear(id) {
    const s = this.state, star = this.gearStar(id);
    if (star >= M.GEAR_MAX_STAR) return this.toast('Sudah bintang maksimal. Bintangnya tidak muat lagi.');
    if (this.copiesOf(id) < 3) return this.toast('Butuh tiga yang sama. Santoni menghitung dua kali.');
    const bag = s.bag.slice();
    for (let k = 0; k < 2; k++) bag.splice(bag.indexOf(id), 1);
    this.setState({ bag, gearStar: { ...(s.gearStar || {}), [id]: star + 1 } });
    music.sfx('legend');
    this.toast(`${C.ITEMS[id].name} digabung: bintang ${star + 1}. Dua salinannya ikhlas.`);
  },
  dismantle(rar) {
    const s = this.state, keep = [], gone = [];
    s.bag.forEach(id => (C.ITEMS[id].rar === rar ? gone : keep).push(id));
    if (!gone.length) return this.toast(`Tidak ada item ${rar} di tas.`);
    const asah = gone.length * M.DISMANTLE_ASAH[rar];
    this.setState({ bag: keep, asah: (s.asah || 0) + asah });
    this.toast(`${gone.length} item ${rar} dibongkar jadi ${asah} Batu Asah. Mereka berjasa.`);
  },

  // --- Shared: a single challenge battle with the player's gear and a random skill kit ---------
  startChallenge(c) {
    const s = this.state, st = this.heroBase(s.equipped), lvl = 1 + Math.floor(c.level / 2);
    const skills = this.rollSkills(3 + Math.min(4, Math.floor(c.level / 3)));
    const r = { challenge: c, weapon: s.equipped.senjata || 'none', chapter: c.chapter, day: c.day, maxDay: 20, hp: st.hp, maxHp: st.hp,
      atk: Math.round(st.atk * (1 + 0.05 * lvl)), def: st.def, lvl, xp: 0, xpNext: 100, skills, coins: 0, kills: 0, used: [], auto: true, event: null, queue: null, log: [] };
    skills.forEach(id => this.applySkillStats(r, id));
    const e = C.ENEMIES[c.enemy], en = { ...this.makeEnemy(c.enemy, c.day, c.chapter), ...(c.stats || {}) };
    if (c.hpMul) en.hp = en.maxHp = Math.round(en.maxHp * c.hpMul);
    if (c.name) en.name = c.name;
    en.hp = en.maxHp;
    this._acc = 0;
    this.setState({ screen: 'battle', run: r, offer: null, result: null, pull: null, shake: null,
      battle: { enemy: en, final: true, challenge: c.mode, turn: 1, heroTurn: true, hits: 0, firstDone: false, napUsed: false, over: null, pops: [], proc: null,
        banner: { id: this.uid(), text: c.title },
        log: [{ id: this.uid(), text: `${c.title}. ${en.name} menghadang. ${c.intro || e.intro}`, tone: 'enemy' }] } });
  },
  finishChallenge(r, win) {
    const c = r.challenge;
    const res = c.mode === 'dungeon' ? this.dungeonResult(c, win) : this.arenaResult(c, win);
    this.setState({ screen: 'result', battle: null, offer: null, shake: null, confirm: null, run: { ...r, event: null },
      result: { challenge: c.mode, win, chapter: r.chapter, skills: r.skills.length, coins: 0, gems: 0, xp: 0, item: null, ...res } });
  },
  rewardTiles(give) {
    const t = [];
    if (give.coins) t.push({ icon: 'toll', label: `+${give.coins.toLocaleString('id-ID')}`, bg: '#FBE6B4', fg: '#B0620A' });
    if (give.gems) t.push({ icon: 'diamond', label: `+${give.gems}`, bg: '#E7D9F5', fg: '#7E43B5' });
    if (give.energy) t.push({ icon: 'bolt', label: `+${give.energy} energi`, bg: '#D5E3F6', fg: '#3166B0' });
    if (give.asah) t.push({ icon: 'hardware', label: `+${give.asah} Batu Asah`, bg: '#CFE6D6', fg: '#2F7A5C' });
    if (give.telur) t.push({ icon: 'egg', label: `+${give.telur} telur`, bg: '#FBE3B8', fg: '#B0620A' });
    if (give.pakan) t.push({ icon: 'nutrition', label: `+${give.pakan} pakan`, bg: '#E1E7D6', fg: '#5E6E52' });
    (give.items || []).forEach(id => t.push({ item: id, label: C.ITEMS[id].name, bg: C.RAR[C.ITEMS[id].rar].bg, fg: C.RAR[C.ITEMS[id].rar].fg }));
    if (give.points) t.push({ icon: 'military_tech', label: `${give.points > 0 ? '+' : ''}${give.points} poin`, bg: '#FBE3B8', fg: '#B0620A' });
    if (!t.length) t.push({ icon: 'sentiment_neutral', label: 'Tanpa hadiah', bg: '#EADBC5', fg: '#6E5A4E' });
    return t;
  },

  // --- Daily dungeons ---------------------------------------------------------------------------
  dungeonState(s = this.state) {
    const d = s.dungeons || { best: {} };
    return d.date === todayKey() ? d : { ...d, date: todayKey(), used: {} };
  },
  startDungeon(id, level) {
    const D = M.DUNGEONS.find(x => x.id === id), st = this.dungeonState();
    if (!D) return;
    if ((st.used[id] || 0) >= M.DUNGEON_TICKETS) return this.toast('Tiket hari ini habis. Dungeon tutup, penjaganya pulang.');
    const best = (st.best || {})[id] || 0;
    if (level > best + 1) return this.toast(`Selesaikan kesulitan ${best + 1} dulu.`);
    this.startChallenge({ mode: 'dungeon', id, level, enemy: D.boss, title: `${D.name} · ${level}`, day: Math.round(4 + level * 1.6),
      chapter: Math.min(C.CHAPTERS.length - 1, Math.floor(level / 2)), hpMul: 1 + level * 0.05, intro: D.desc });
  },
  dungeonResult(c, win) {
    const D = M.DUNGEONS.find(x => x.id === c.id), st = this.dungeonState();
    if (!win) return { ribbon: 'SERBUAN GAGAL', title: 'SANTONI MUNDUR.', sub: `${D.name} · Kesulitan ${c.level}`, give: {},
      stats: [{ value: c.level, label: 'KESULITAN' }, { value: M.DUNGEON_TICKETS - (st.used[c.id] || 0), label: 'TIKET' }, { value: 0, label: 'MENANG' }],
      quote: 'Tiket tidak terpakai. Dungeonnya menunggu dengan sabar.' };
    const raw = D.give(c.level), give = { ...raw };
    if (raw.items) { give.items = Array.from({ length: raw.items }, () => this.rollItem(!!raw.good)); delete give.good; }
    const best = Math.max((st.best || {})[c.id] || 0, c.level);
    this.setState({ dungeons: { ...st, used: { ...st.used, [c.id]: (st.used[c.id] || 0) + 1 }, best: { ...(st.best || {}), [c.id]: best } } });
    this.track({ dungeons: 1 });
    return { ribbon: 'DUNGEON DITAKLUKKAN', title: 'SANTONI MENANG.', sub: `${D.name} · Kesulitan ${c.level}`, give, record: c.level > ((st.best || {})[c.id] || 0),
      stats: [{ value: c.level, label: 'KESULITAN' }, { value: M.DUNGEON_TICKETS - (st.used[c.id] || 0) - 1, label: 'TIKET SISA' }, { value: best, label: 'REKOR' }],
      quote: 'Jarahan dibawa pulang. Penjaganya pura-pura tidak melihat.' };
  },

  // --- Village arena ----------------------------------------------------------------------------
  arenaSeason() { return Math.floor(dayNumber() / M.ARENA.seasonDays); },
  arenaState(s = this.state) {
    const a = s.arena || {}, season = this.arenaSeason();
    const base = a.season === season ? a : { season, points: M.ARENA.startPoints, wins: 0, fights: 0, prev: a.season != null ? { season: a.season, points: a.points } : a.prev };
    return base.date === todayKey() ? base : { ...base, date: todayKey(), tries: 0 };
  },
  // NPC ladder: 60 fictional adventurers whose points drift upward through the season.
  arenaLadder(season, points) {
    const rnd = seeded(season * 7919 + 13), into = (dayNumber() % M.ARENA.seasonDays) + 1;
    const npcs = Array.from({ length: 60 }, () => Math.round(M.ARENA.startPoints + (rnd() * 520 - 180) * (0.5 + into / 6)));
    return { rank: npcs.filter(p => p > points).length + 1, total: npcs.length + 1 };
  },
  arenaOpponents(s = this.state) {
    const a = this.arenaState(s), rnd = seeded(dayNumber() * 31 + a.tries * 977 + a.season);
    const pool = M.ARENA.rivals.slice(), mults = [0.85, 1.0, 1.2];
    return mults.map((mult, i) => {
      const r = pool.splice(Math.floor(rnd() * pool.length), 1)[0];
      return { ...r, mult, slot: i, gain: Math.round(14 + (mult - 0.85) * 60), power: Math.round(this.power(this.heroBase(s.equipped)) * mult * (0.95 + rnd() * 0.1)) };
    });
  },
  startArena(slot) {
    const a = this.arenaState();
    if (a.tries >= M.ARENA.tries) return this.toast('Jatah duel hari ini habis. Arena dipakai senam pagi.');
    const o = this.arenaOpponents()[slot]; if (!o) return;
    this.setState({ arena: { ...a, tries: a.tries + 1 } });
    // Opponents mirror Santoni's own build, scaled by their strength.
    const st = this.heroBase(this.state.equipped);
    this.startChallenge({ mode: 'arena', level: 6, enemy: o.kind, name: o.name, gain: o.gain, title: `Arena · ${o.name}`, day: 8, chapter: 2,
      stats: { maxHp: Math.round(st.hp * 2.2 * o.mult), atk: Math.round(st.atk * 0.55 * o.mult), def: Math.round(st.def * 0.6 * o.mult), boss: false, lvl: 20 },
      intro: 'Penonton bersorak. Untuk siapa, belum jelas.' });
  },
  arenaResult(c, win) {
    const a = this.arenaState(), delta = win ? c.gain : -8, points = Math.max(0, a.points + delta);
    this.setState({ arena: { ...a, points, wins: a.wins + (win ? 1 : 0), fights: a.fights + 1 } });
    this.track({ arena: 1 });
    const { rank } = this.arenaLadder(a.season, points);
    return { ribbon: win ? 'DUEL DIMENANGKAN' : 'DUEL KALAH', title: win ? 'SANTONI MENANG.' : 'SANTONI KALAH.', sub: `${M.ARENA.name} · melawan ${c.name}`,
      give: { points: delta, coins: win ? 300 : 0 }, stats: [{ value: points, label: 'POIN' }, { value: rank, label: 'PERINGKAT' }, { value: M.ARENA.tries - a.tries, label: 'SISA DUEL' }],
      quote: win ? 'Lawan menjabat tangan Santoni. Santoni menjabat balik, datar.' : 'Santoni kalah dengan ekspresi yang sama seperti saat menang.' };
  },
  // Pays out the previous season once, then starts the new one.
  arenaSettle() {
    const a = this.arenaState();
    if (!a.prev || a.prevPaid === a.prev.season) return;
    const { rank } = this.arenaLadder(a.prev.season, a.prev.points);
    const tier = M.ARENA.tiers.find(t => rank <= t.rank);
    this.setState(st => ({ arena: { ...this.arenaState(st), prevPaid: a.prev.season }, gems: st.gems + (tier ? tier.gems : 0) }));
    if (tier) this.toast(`Musim arena selesai: peringkat ${rank} (${tier.title}). +${tier.gems} permata.`);
  },

  // --- Cracker mine ----------------------------------------------------------------------------
  mineFloor(floor) {
    const n = M.MINE.cols * M.MINE.rows, stairs = Math.floor(Math.random() * n);
    const total = M.MINE.loot.reduce((x, [, w]) => x + w, 0);
    return Array.from({ length: n }, (_, i) => {
      if (i === stairs) return { t: 'tangga', open: false };
      let x = Math.random() * total;
      for (const [t, w] of M.MINE.loot) { x -= w; if (x <= 0) return { t, open: false }; }
      return { t: 'kosong', open: false };
    });
  },
  mineState(s = this.state) {
    const m = s.mine || { floor: 1, tiles: this.mineFloor(1), picks: M.MINE.picks };
    return m.date === todayKey() ? m : { ...m, date: todayKey(), picks: Math.max(m.picks, M.MINE.picks) };
  },
  dig(i) {
    const s = this.state, m = this.mineState(s), tile = m.tiles[i];
    if (!tile || tile.open) return;
    if (m.picks <= 0) return this.toast('Kapak habis. Kapak baru datang besok, diantar Kodok Ojek.');
    const tiles = m.tiles.slice(); tiles[i] = { ...tile, open: true };
    const depth = m.floor, patch = { mine: { ...m, tiles, picks: m.picks - 1 } };
    let msg = null;
    if (tile.t === 'koin') { const v = 60 + depth * 25; patch.coins = s.coins + v; tiles[i].label = `+${v}`; }
    if (tile.t === 'asah') { const v = 1 + Math.floor(depth / 4); patch.asah = (s.asah || 0) + v; tiles[i].label = `+${v}`; }
    if (tile.t === 'pakan') { const v = 2 + Math.floor(depth / 3); patch.pakan = (s.pakan || 0) + v; tiles[i].label = `+${v}`; }
    if (tile.t === 'permata') { const v = 5 + Math.floor(depth / 2); patch.gems = s.gems + v; tiles[i].label = `+${v}`; }
    if (tile.t === 'peti') { const id = this.rollItem(depth >= 10); patch.bag = s.bag.concat(id); tiles[i].item = id; msg = `Peti tua berisi ${C.ITEMS[id].name}.`; music.sfx('chest'); }
    if (tile.t === 'tangga') { patch.mine.stairs = true; msg = 'Tangga ke bawah ditemukan. Udaranya makin renyah.'; }
    this.track({ digs: 1 });
    this.setState(patch);
    if (msg) this.toast(msg);
  },
  descend() {
    const m = this.mineState(); if (!m.stairs) return;
    this.setState({ mine: { ...m, floor: m.floor + 1, stairs: false, tiles: this.mineFloor(m.floor + 1) } });
    this.toast(`Lantai tambang ${m.floor + 1}. Kerupuknya makin tua dan makin berharga.`);
  },

  // --- View model ------------------------------------------------------------------------------
  modesView(s, { g, fmt }) {
    const v = {};
    const tab = ['arena', 'tantangan', 'dungeon'].includes(s.modeTab) ? s.modeTab : 'tantangan';
    v.isMode = s.screen === 'mode'; v.modeTab = tab;
    v.modeTabs = [['arena', 'Arena', 'swords'], ['tantangan', 'Tantangan', 'shield'], ['dungeon', 'Dungeon', 'fort']].map(([key, label, icon]) => ({ key, label, icon, on: tab === key, pick: g(() => this.setState({ modeTab: key })) }));
    v.openModes = g(() => this.go('mode'));
    v.backFromModes = g(() => this.go('lobby'));

    const ds = this.dungeonState(s);
    v.dungeons = M.DUNGEONS.map(D => {
      const best = (ds.best || {})[D.id] || 0, left = M.DUNGEON_TICKETS - (ds.used[D.id] || 0), level = Math.min(M.DUNGEON_MAX, best + 1);
      return { id: D.id, name: D.name, boss: D.boss, color: D.color, icon: D.icon, reward: D.reward, level, best, left,
        play: g(() => this.startDungeon(D.id, level)), replay: best ? g(() => this.startDungeon(D.id, best)) : null };
    });

    const a = this.arenaState(s), ladder = this.arenaLadder(a.season, a.points);
    const endsIn = (this.arenaSeason() + 1) * M.ARENA.seasonDays - dayNumber();
    v.arena = { name: M.ARENA.name, points: a.points, rank: ladder.rank, total: ladder.total, triesLeft: M.ARENA.tries - a.tries, endsIn: `${endsIn} hari`,
      opponents: this.arenaOpponents(s).map(o => ({ ...o, powerLabel: fmt(o.power), fight: g(() => this.startArena(o.slot)) })),
      tiers: M.ARENA.tiers };

    const m = this.mineState(s);
    v.mine = { name: M.MINE.name, floor: m.floor, picks: m.picks, maxPicks: M.MINE.picks, stairs: !!m.stairs, cols: M.MINE.cols,
      tiles: m.tiles.map((t, i) => ({ ...t, i, dig: g(() => this.dig(i)) })), descend: g(() => this.descend()), open: g(() => this.go('tambang')) };
    v.isTambang = s.screen === 'tambang';

    const tw = s.tower || { floor: 1, best: 0 };
    v.towerCard = { floor: tw.floor, best: tw.best };

    // Workshop
    v.isBengkel = s.screen === 'bengkel';
    v.openBengkel = g(() => this.go('bengkel'));
    v.asah = s.asah || 0;
    const TL = { senjata: 'SENJATA', topi: 'TOPI', baju: 'BAJU', kalung: 'KALUNG', sabuk: 'SABUK', sepatu: 'SEPATU' };
    v.workshop = Object.keys(TL).filter(t => C.ITEMS[s.equipped[t]]).map(t => {
      const id = s.equipped[t], it = C.ITEMS[id], lv = ((s.gearLv || {})[id]) || 1, star = ((s.gearStar || {})[id]) || 0, cost = this.upgradeCost(id);
      return { id, type: TL[t], name: it.name, rar: it.rar, rarBg: C.RAR[it.rar].bg, rarFg: C.RAR[it.rar].fg, stat: it.stat, val: this.itemVal(id, s), next: Math.round(it.val * (1 + 0.1 * lv) * (1 + 0.3 * star)),
        lv, star, max: lv >= M.GEAR_MAX_LV, cost, afford: (s.asah || 0) >= cost.asah && s.coins >= cost.coins, upgrade: g(() => this.upgradeGear(id)) };
    });
    const ids = [...new Set(s.bag.concat(Object.values(s.equipped)).filter(id => C.ITEMS[id]))];
    v.mergeable = ids.filter(id => this.copiesOf(id, s) >= 3 && (((s.gearStar || {})[id]) || 0) < M.GEAR_MAX_STAR)
      .map(id => ({ id, name: C.ITEMS[id].name, copies: this.copiesOf(id, s), star: ((s.gearStar || {})[id]) || 0, merge: g(() => this.mergeGear(id)) }));
    v.dismantle = ['Biasa', 'Langka'].map(rar => ({ rar, count: s.bag.filter(id => C.ITEMS[id].rar === rar).length, each: M.DISMANTLE_ASAH[rar], go: g(() => this.dismantle(rar)) }));
    v.hubBadge = M.DUNGEONS.some(D => (ds.used[D.id] || 0) < M.DUNGEON_TICKETS) || a.tries < M.ARENA.tries || m.picks > 0;
    return v;
  }
};
