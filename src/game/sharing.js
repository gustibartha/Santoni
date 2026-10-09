// Sharing: turns a run, a won battle or a journal entry into a story card plus a short text with
// a Wordle-style day strip. Mixed into Game.prototype like modes.js.
import * as C from './data.js';
import { shareCard, dayStrip, GAME_URL } from './shareCard.jsx';

const lastLine = entries => { const e = (entries || []).filter(x => x.text).slice(-1)[0]; return e ? e.text : ''; };

export const shareMethods = {
  // The run told in one sentence, e.g. "Santoni bertahan 14 hari di Rawa Kerupuk, membawa
  // Sandal Kiri, kalah oleh Kelinci Penagih."
  runStory(r, win, killer) {
    const ch = C.CHAPTERS[r.chapter].name, gear = C.ITEMS[r.weapon] ? C.ITEMS[r.weapon].name : 'tangan kosong';
    const sentence = win
      ? `Santoni menamatkan ${ch} dalam ${r.maxDay} hari, membawa ${gear}, dan mengalahkan ${r.kills} musuh.`
      : `Santoni bertahan ${r.day} hari di ${ch}, membawa ${gear}, ${killer ? `kalah oleh ${killer}` : 'lalu memutuskan pulang'}.`;
    return { chapter: r.chapter, win, day: r.day, sentence, title: win ? `Tamat: ${ch}` : `${r.day} hari di ${ch}`, line: lastLine(r.log) || sentence, strip: dayStrip(r.log, r.day, win) };
  },

  async doShare(card, text, where) {
    if (this._sharing) return;
    this._sharing = true;
    this.toast('Menyiapkan kartu…');
    try {
      const res = await shareCard(card, text);
      if (res === 'saved') this.toast('Gambar kartu tersimpan dan teksnya disalin. Tempel di Story atau grup WhatsApp.');
      if (res !== 'cancelled') { this.track({ shares: 1 }); if (this.logEvent) this.logEvent('share', { where, res }); }
    } catch {
      this.toast('Kartu gagal dibuat. Coba lagi sebentar.');
    }
    this._sharing = false;
  },

  shareRun() {
    const st = this.state.result && this.state.result.story;
    if (!st) return;
    this.doShare({ kicker: st.win ? 'TAMAT' : 'CATATAN PERJALANAN', title: st.title, line: st.line, strip: st.strip, theme: C.CHAPTERS[st.chapter].theme, pose: st.win ? 'seram' : 'sleep' },
      `${st.sentence}\n${st.strip}\nMain gratis: ${GAME_URL}`, 'result');
  },
  shareBattle() {
    const s = this.state, b = s.battle, r = s.run;
    if (!b || b.over !== 'win' || !r) return;
    const e = C.ENEMIES[b.enemy.key], ch = C.CHAPTERS[r.chapter];
    const line = `${b.enemy.name} kalah. ${e.lose}`;
    this.doShare({ kicker: b.elite ? 'MINIBOS TUMBANG' : e.boss ? 'BOS TUMBANG' : 'MENANG', title: `${b.enemy.name} tumbang`, line, theme: ch.theme, pose: 'seram' },
      `${line} (Petualangan Santoni, ${ch.name})\nMain gratis: ${GAME_URL}`, 'battle');
  },
  shareJournal(id) {
    const j = (this.state.journal || []).find(x => x.id === id);
    if (!j) return;
    const ch = C.CHAPTERS[j.chapter], strip = dayStrip(j.entries, j.day, j.win);
    const title = j.win ? `Tamat: ${ch.name}` : `${j.day} hari di ${ch.name}`;
    this.doShare({ kicker: 'DARI JURNAL', title, line: lastLine(j.entries), strip, theme: ch.theme, pose: j.win ? 'seram' : 'sleep' },
      `${title}. ${lastLine(j.entries)}\n${strip}\nMain gratis: ${GAME_URL}`, 'journal');
  }
};
