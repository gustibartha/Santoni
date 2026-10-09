// Companions ("Rekan Petualang") and pets, mixed into Game.prototype.
import * as C from './data.js';
import * as P from './companionsData.js';
import { music } from './music.js';

const compDef = id => P.COMPANIONS.find(x => x.id === id);
const petDef = id => P.PETS.find(x => x.id === id);

function pickWeighted(weights, list, rarOf) {
  const total = list.reduce((a, x) => a + weights[rarOf(x)], 0);
  let r = Math.random() * total;
  for (const x of list) { r -= weights[rarOf(x)]; if (r <= 0) return x; }
  return list[list.length - 1];
}

export const companionMethods = {
  // --- Companions -------------------------------------------------------------------------------
  compState(s = this.state) { return s.comp || { owned: {}, team: [null, null, null] }; },
  compOf(id, s = this.state) { return this.compState(s).owned[id] || null; },
  compUnlocked(id, s = this.state) { const c = this.compOf(id, s); return !!(c && c.lv); },
  compBonus(id, s = this.state) {
    const d = compDef(id), c = this.compOf(id, s);
    if (!d || !c || !c.lv) return 0;
    return Math.round((P.COMP_BASE[d.rar] + 0.3 * (c.lv - 1) + 2 * c.star) * 10) / 10;
  },
  blessValue(id, s = this.state) {
    const d = compDef(id), c = this.compOf(id, s);
    return d.bless.base + d.bless.star * ((c && c.star) || 0);
  },
  team(s = this.state) { return this.compState(s).team.filter(id => id && this.compUnlocked(id, s)); },
  // Aggregated blessing values for the current team, used by the battle engine.
  blessings(s = this.state) {
    const out = {};
    for (const id of this.team(s)) {
      const d = compDef(id), c = this.compOf(id, s);
      out[d.bless.id] = (out[d.bless.id] || 0) + (d.bless.id === 'veto' ? (c.star >= 3 ? 2 : 1) : this.blessValue(id, s));
    }
    for (const tc of this.teamCombos(s)) for (const [k, val] of Object.entries(tc.add)) out[k] = (out[k] || 0) + val;
    return out;
  },
  teamKinds(s = this.state) { return this.team(s).map(id => compDef(id).kind); },
  // Pair synergies active for the current team.
  teamCombos(s = this.state) { const t = this.team(s); return P.TEAM_COMBOS.filter(c => c.pair.every(id => t.includes(id))); },

  // Allies strike: each companion on its own beat (every 3rd hero turn, staggered by slot), the pet
  // every other turn. With `rush` (Serbu Bersama, fired with the ultimate) everyone strikes harder.
  // Returns the damage dealt and who struck: slot numbers and/or 'pet'.
  teamStrike(r, b, fx) {
    const out = { dmg: 0, who: [], lines: [] };
    const B = b.bless || {}, boost = (1 + (B.tim || 0) / 100) * (fx.rush ? 1.5 : 1);
    const strike = (pct, role, label, move, who) => {
      if (b.enemy.hp <= 0) return;
      const times = role === 'ganda' ? 2 : 1;
      let dealt = 0, crit = false;
      for (let k = 0; k < times && b.enemy.hp > 0; k++) {
        crit = role === 'kritis' && Math.random() < 0.35;
        const d = Math.max(1, Math.round(r.atk * pct * boost * (times === 2 ? 0.62 : 1) * (crit ? 2 : 1) * (0.9 + Math.random() * 0.2) - b.enemy.def * 0.25));
        fx.hit(d); dealt += d;
      }
      fx.push('enemy', `${label} ${dealt}`, crit ? 'crit' : 'skill');
      if (role === 'stun' && Math.random() < 0.2 && fx.stunFor()) fx.push('enemy', 'LUMPUH', 'miss');
      if (role === 'koin') { const c = (3 + 2 * (r.chapter || 0)) * (fx.rush ? 2 : 1); r.coins = (r.coins || 0) + c; fx.push('hero', `+${c} KOIN`, 'heal'); }
      if (role === 'perisai') { const sh = Math.round(r.maxHp * 0.06); b.shield = (b.shield || 0) + sh; fx.push('hero', `PERISAI +${sh}`, 'skill'); }
      if (role === 'pulih' && r.hp < r.maxHp) { const h = Math.round(r.maxHp * 0.05); r.hp = Math.min(r.maxHp, r.hp + h); fx.push('hero', `+${h}`, 'heal'); }
      if (role === 'lemah') b.quake = Math.min(3, (b.quake || 0) + 1);
      if (role === 'bakar') fx.burnFor(2);
      out.dmg += dealt; out.who.push(who); out.lines.push(`${move} ${dealt}`);
    };
    this.team().forEach((id, i) => {
      if (!fx.rush && (b.hits + i) % 3 !== 0) return;
      const d = compDef(id), c = this.compOf(id), atk = P.COMP_ATTACK[id] || { role: 'ganda', move: 'Serangan' };
      strike(P.STRIKE_PCT[d.rar] * (1 + 0.012 * (c.lv - 1) + 0.08 * c.star), atk.role, d.name.split(' ')[0].toUpperCase(), atk.move, i);
    });
    const pet = this.petState().active;
    if (pet && (fx.rush || b.hits % 2 === 0)) {
      const pd = petDef(pet), p = this.petState().owned[pet], atk = P.PET_ATTACK[pet] || { role: 'ganda', move: 'Gigitan' };
      const pct = 0.16 + 0.006 * ((p && p.lv) || 1) + 0.04 * ((p && p.star) || 0);
      strike(pct, atk.role, pd.name.split(' ')[0].toUpperCase(), atk.move, 'pet');
    }
    return out;
  },
  // Team % bonuses applied on top of gear in heroBase().
  teamPct(s = this.state) {
    const pct = { ATK: 0, HP: 0, DEF: 0 };
    for (const id of this.team(s)) pct[compDef(id).stat] += this.compBonus(id, s);
    return pct;
  },
  recruit(n) {
    const s = this.state, cost = n === 1 ? P.RECRUIT.one : P.RECRUIT.ten;
    if (s.gems < cost) return this.toast('Permata kurang. Para mantan musuh tidak bekerja gratis.');
    const st = this.compState(s), owned = { ...st.owned }, got = {};
    for (let i = 0; i < n; i++) {
      const d = pickWeighted(P.RECRUIT.weights, P.COMPANIONS, x => x.rar), add = P.RECRUIT.shards[d.rar];
      const cur = owned[d.id] || { lv: 0, star: 0, shards: 0 };
      let next = { ...cur, shards: cur.shards + add };
      if (!next.lv && next.shards >= P.COMP_UNLOCK) next = { ...next, lv: 1, shards: next.shards - P.COMP_UNLOCK };
      owned[d.id] = next; got[d.id] = (got[d.id] || 0) + add;
    }
    const team = st.team.slice();
    // Newly unlocked companions fill empty team slots automatically.
    Object.keys(got).forEach(id => { if (owned[id].lv && !team.includes(id)) { const k = team.indexOf(null); if (k >= 0) team[k] = id; } });
    this.setState({ gems: s.gems - cost, comp: { owned, team } });
    music.sfx(Object.keys(got).some(id => compDef(id).rar === 'Legendaris') ? 'legend' : 'chest');
    this.toast('Rekrut: ' + Object.entries(got).map(([id, k]) => `${compDef(id).name} +${k}`).join(', ') + '.');
  },
  setTeamSlot(slot, id) {
    const st = this.compState(), team = st.team.slice();
    if (id && !this.compUnlocked(id)) return;
    const at = team.indexOf(id);
    if (id && at >= 0) team[at] = team[slot];
    team[slot] = id;
    this.setState({ comp: { ...st, team } });
  },
  toggleTeam(id) {
    const st = this.compState(), at = st.team.indexOf(id);
    if (at >= 0) return this.setTeamSlot(at, null);
    const k = st.team.indexOf(null);
    if (k < 0) return this.toast('Tim penuh. Lepas satu rekan dulu dengan mengetuk slotnya.');
    this.setTeamSlot(k, id);
    this.toast(`${compDef(id).name} bergabung. ${compDef(id).line}`);
  },
  compLevelCost(id) { const c = this.compOf(id); return Math.round(250 * c.lv * { Langka: 1, Epik: 1.5, Legendaris: 2.2 }[compDef(id).rar]); },
  levelComp(id) {
    const s = this.state, c = this.compOf(id); if (!c || !c.lv) return;
    if (c.lv >= P.COMP_MAX_LV) return this.toast('Level maksimal. Rekan ini sudah sangat berpengalaman, katanya.');
    const cost = this.compLevelCost(id);
    if (s.coins < cost) return this.toast('Koin kurang untuk melatih rekan.');
    const st = this.compState(s);
    this.setState({ coins: s.coins - cost, comp: { ...st, owned: { ...st.owned, [id]: { ...c, lv: c.lv + 1 } } } });
  },
  starComp(id) {
    const s = this.state, c = this.compOf(id); if (!c || !c.lv) return;
    if (c.star >= P.COMP_STAR_SHARDS.length) return this.toast('Bintang sudah penuh.');
    const need = P.COMP_STAR_SHARDS[c.star];
    if (c.shards < need) return this.toast(`Butuh ${need} kartu. Rekrut lagi untuk mengumpulkannya.`);
    const st = this.compState(s);
    this.setState({ comp: { ...st, owned: { ...st.owned, [id]: { ...c, star: c.star + 1, shards: c.shards - need } } } });
    music.sfx('levelup');
    this.toast(`${compDef(id).name} naik ke bintang ${c.star + 1}. Berkahnya makin kuat.`);
  },

  // --- Pets ----------------------------------------------------------------------------------
  petState(s = this.state) { return s.pets || { owned: {}, active: null }; },
  petStats(id, s = this.state) {
    const d = petDef(id), p = this.petState(s).owned[id];
    if (!d || !p) return { atk: 0, hp: 0, def: 0 };
    const m = p.lv * (1 + 0.25 * p.star);
    return { atk: Math.round((d.per.atk || 0) * m), hp: Math.round((d.per.hp || 0) * m), def: Math.round((d.per.def || 0) * m) };
  },
  hatch() {
    const s = this.state;
    if ((s.telur || 0) < 1) return this.toast('Tidak ada telur. Serbu Kebun Telur atau beli di bawah.');
    const d = pickWeighted(P.EGG_WEIGHTS, P.PETS, x => x.rar), st = this.petState(s), cur = st.owned[d.id];
    const owned = { ...st.owned, [d.id]: cur ? { ...cur, star: Math.min(P.PET_MAX_STAR, cur.star + 1) } : { lv: 1, xp: 0, star: 0 } };
    this.setState({ telur: s.telur - 1, pets: { owned, active: st.active || d.id }, hatched: { id: d.id, at: Date.now(), dup: !!cur } });
    music.sfx(d.rar === 'Legendaris' || d.rar === 'Epik' ? 'legend' : 'chest');
    this.toast(cur ? `${d.name} lagi! Bintangnya naik.` : `Telur menetas: ${d.name}. ${d.desc}`);
  },
  buyEgg() {
    const s = this.state;
    if (s.gems < P.EGG_PRICE) return this.toast('Permata kurang untuk membeli telur.');
    this.setState({ gems: s.gems - P.EGG_PRICE, telur: (s.telur || 0) + 1 });
  },
  feedPet(id, n = 1) {
    const s = this.state, st = this.petState(s), p = st.owned[id]; if (!p) return;
    if (p.lv >= P.PET_MAX_LV) return this.toast('Sudah level maksimal. Perutnya juga penuh.');
    const use = Math.min(n, s.pakan || 0);
    if (!use) return this.toast('Pakan habis. Cari di Kebun Telur atau Tambang Kerupuk.');
    let { lv, xp } = p; xp += use * P.PAKAN_XP;
    while (lv < P.PET_MAX_LV && xp >= lv * 10) { xp -= lv * 10; lv += 1; }
    if (lv >= P.PET_MAX_LV) xp = 0;
    this.setState({ pakan: s.pakan - use, pets: { ...st, owned: { ...st.owned, [id]: { ...p, lv, xp } } } });
    if (lv > p.lv) { music.sfx('levelup'); this.toast(`${petDef(id).name} naik ke Lv ${lv}. Ia mengunyah dengan bangga.`); }
  },
  setActivePet(id) {
    const st = this.petState();
    this.setState({ pets: { ...st, active: st.active === id ? null : id } });
  },

  // --- View ----------------------------------------------------------------------------------
  companionsView(s, { g, fmt, pct }) {
    const v = {}, st = this.compState(s), team = st.team;
    v.isRekan = s.screen === 'rekan'; v.isPet = s.screen === 'pet';
    v.openRekan = g(() => this.go('rekan')); v.openPet = g(() => this.go('pet')); v.backToHero = g(() => this.go('hero'));
    const pick = s.rekanPick && compDef(s.rekanPick) ? s.rekanPick : null;
    v.team = team.map((id, i) => {
      const d = id && compDef(id);
      return d && this.compUnlocked(id, s)
        ? { slot: i, id, kind: d.kind, name: d.name, bless: d.bless.name, tap: g(() => this.setTeamSlot(i, null)) }
        : { slot: i, id: null, tap: g(() => this.toast('Pilih rekan di bawah, lalu ketuk "Masuk tim".')) };
    });
    v.companions = P.COMPANIONS.map(d => {
      const c = this.compOf(d.id, s) || { lv: 0, star: 0, shards: 0 }, unlocked = !!c.lv, inTeam = team.includes(d.id);
      const need = unlocked ? P.COMP_STAR_SHARDS[c.star] : P.COMP_UNLOCK;
      return { id: d.id, kind: d.kind, name: d.name, rar: d.rar, rarBg: C.RAR[d.rar].bg, rarFg: C.RAR[d.rar].fg, stat: d.stat, unlocked, inTeam, lv: c.lv, star: c.star,
        shards: c.shards, need, shardPct: pct(c.shards, need || 1), bonus: this.compBonus(d.id, s), blessName: d.bless.name,
        blessText: d.blessDesc(this.blessValue(d.id, s), c.star), open: pick === d.id,
        strike: (() => { const a = P.COMP_ATTACK[d.id], ro = a && P.ROLES[a.role]; return ro ? { move: a.move, role: ro.label, icon: ro.icon, desc: ro.desc, pct: Math.round(P.STRIKE_PCT[d.rar] * (1 + 0.012 * Math.max(0, (c.lv || 1) - 1) + 0.08 * c.star) * 100) } : null; })(), select: g(() => this.setState({ rekanPick: pick === d.id ? null : d.id })),
        levelCost: unlocked ? fmt(this.compLevelCost(d.id)) : '', canStar: unlocked && need && c.shards >= need, maxStar: unlocked && !need,
        toggle: g(() => this.toggleTeam(d.id)), level: g(() => this.levelComp(d.id)), starUp: g(() => this.starComp(d.id)) };
    });
    const inTeam = this.team(s);
    v.teamCombos = P.TEAM_COMBOS.map(tc => {
      const have = tc.pair.filter(id => inTeam.includes(id)).length;
      return { id: tc.id, name: tc.name, desc: tc.desc, active: have === 2, have, members: tc.pair.map(id => { const d = compDef(id); return { id, kind: d.kind, name: d.name, inTeam: inTeam.includes(id), owned: this.compUnlocked(id, s) }; }) };
    }).sort((a, b2) => b2.have - a.have);
    v.activeCombos = v.teamCombos.filter(x => x.active).length;
    v.recruit1 = g(() => this.recruit(1)); v.recruit10 = g(() => this.recruit(10));
    v.recruitCost = { one: P.RECRUIT.one, ten: fmt(P.RECRUIT.ten) };
    const tp = this.teamPct(s);
    v.teamBonus = `ATK +${Math.round(tp.ATK)}% · HP +${Math.round(tp.HP)}% · DEF +${Math.round(tp.DEF)}%`;

    const ps = this.petState(s);
    v.pets = P.PETS.map(d => {
      const p = ps.owned[d.id], stats = this.petStats(d.id, s);
      return { id: d.id, name: d.name, rar: d.rar, rarBg: C.RAR[d.rar].bg, rarFg: C.RAR[d.rar].fg, desc: d.desc, owned: !!p, active: ps.active === d.id,
        lv: p ? p.lv : 0, star: p ? p.star : 0, xpPct: p ? pct(p.xp, p.lv * 10) : '0%', xpLabel: p ? `${p.xp}/${p.lv * 10}` : '',
        statLabel: [stats.atk && `ATK +${stats.atk}`, stats.hp && `HP +${stats.hp}`, stats.def && `DEF +${stats.def}`].filter(Boolean).join(' · '),
        strike: (() => { const a = P.PET_ATTACK[d.id], ro = a && P.ROLES[a.role]; return ro ? { move: a.move, role: ro.label, icon: ro.icon, desc: ro.desc } : null; })(),
        feed: g(() => this.feedPet(d.id, 1)), feed5: g(() => this.feedPet(d.id, 5)), activate: g(() => this.setActivePet(d.id)) };
    });
    v.activePet = ps.active;
    v.telur = s.telur || 0; v.pakan = s.pakan || 0; v.eggPrice = P.EGG_PRICE;
    v.hatch = g(() => this.hatch()); v.buyEgg = g(() => this.buyEgg());
    v.hatched = s.hatched && Date.now() - s.hatched.at < 2500 ? s.hatched : null;
    const leader = this.team(s)[0];
    v.leaderKind = leader ? compDef(leader).kind : null;
    v.rekanCount = `${this.team(s).length}/3`;
    return v;
  }
};
