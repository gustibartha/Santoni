// Background music, synthesized with the Web Audio API (no audio files).
// Two looping tracks: "santai" for menus and travel, "battle" for fights.
// Browsers only allow audio after a user gesture, so call unlock() from one.

const KEY = 'santoni:music-muted';
const midi = n => 440 * Math.pow(2, (n - 69) / 12);
const _ = null;

// Sixteenth-note grid: each bar is 16 steps. `lead` holds one 16-step row per bar (MIDI notes,
// `_` = rest); a note rings until the next one (capped). `bass` is [step, interval above root].
const TRACKS = {
  // Laid-back funky city pop, Fmaj7–E7–Am7–Gm7 ("Just the Two of Us" changes), with swing,
  // a bouncing bass, electric-piano stabs and a hook that answers itself on the second pass.
  santai: {
    bpm: 100, swing: 0.16, master: 0.5,
    chords: [[53, 57, 60, 64], [52, 56, 59, 62], [55, 57, 60, 64], [53, 58, 62, 65], [53, 57, 60, 64], [52, 56, 59, 62], [55, 57, 60, 64], [52, 55, 58, 60]],
    roots: [41, 40, 45, 43, 41, 40, 45, 36],
    lead: [
      [69, _, _, 72, _, _, 76, _, 74, _, 72, _, 69, _, _, _],
      [71, _, _, 68, _, _, 71, _, 76, _, _, 74, _, _, _, _],
      [72, _, 76, _, 79, _, _, 76, _, _, 81, _, 79, _, 76, _],
      [77, _, _, 74, _, _, 70, _, 69, _, 67, _, _, _, _, _],
      [69, _, 72, _, 76, _, 79, _, 76, _, 74, _, 72, _, 69, _],
      [68, _, 71, _, 74, _, 76, _, _, _, 74, _, 71, _, 68, _],
      [69, _, _, 72, _, _, 76, _, 81, _, _, _, _, _, 79, _],
      [79, _, _, 76, _, _, 72, _, 70, _, 67, _, 64, _, _, _]
    ],
    bass: [[0, 0], [3, 12], [6, 0], [8, 7], [10, 12], [11, 10], [14, 0]],
    stabs: [2, 6, 10, 13],
    kick: [0, 3, 8, 10], snare: [4, 12], ghost: [7, 15]
  },
  // Driving funk-rock for fights: Am–F–C–G, palm-muted eighths, a heroic hook, busy drums.
  battle: {
    bpm: 138, swing: 0, master: 0.5, rock: true,
    chords: [[57, 64, 69], [53, 60, 65], [48, 55, 60], [55, 62, 67]],
    roots: [45, 41, 36, 43],
    lead: [
      [76, _, 76, _, 79, _, 81, _, 79, _, 76, _, 74, _, 72, _],
      [72, _, 72, _, 74, _, 76, _, 77, _, 76, _, 72, _, _, _],
      [72, _, 76, _, 79, _, 84, _, 83, _, 79, _, 76, _, 79, _],
      [79, _, 81, _, 83, _, 86, _, 83, _, _, _, 79, _, _, _]
    ],
    bass: [[0, 0], [2, 0], [3, 12], [4, 0], [6, 0], [8, 0], [10, 7], [11, 12], [12, 0], [14, 10]],
    stabs: [0, 6, 8, 14],
    kick: [0, 6, 8, 11], snare: [4, 12], ghost: [14]
  }
};
// Rest the lead on alternate passes of the santai loop so it breathes; battle always plays.
for (const tr of Object.values(TRACKS)) {
  tr.bars = tr.chords.length;
  // Precompute how long each lead note rings (until the next note, at most 4 steps).
  tr.lens = tr.lead.map(row => row.map((n, i) => { if (n == null) return 0; let k = i + 1; while (k < 16 && row[k] == null && k - i < 4) k++; return k - i; }));
}

function loadMuted() {
  try { return localStorage.getItem(KEY) === '1'; } catch { return false; }
}

class Music {
  constructor() {
    this.ctx = null;
    this.muted = loadMuted();
    this.want = 'santai';
    this.track = null;
    this.step = 0;
    this.nextTime = 0;
    this.timer = null;
  }

  // Creates/resumes the audio context. Must run inside a user gesture handler.
  unlock() {
    if (this.muted) return;
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.build();
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
    if (!this.timer) this.start();
  }

  build() {
    const c = this.ctx;
    this.master = c.createGain();
    this.master.gain.value = this.muted ? 0 : 0.5;
    // Gentle bus compression glues the mix together.
    const comp = c.createDynamicsCompressor();
    comp.threshold.value = -18; comp.ratio.value = 3; comp.attack.value = 0.01; comp.release.value = 0.2;
    this.master.connect(comp); comp.connect(c.destination);
    // Soft echo for the lead and EP.
    this.echo = c.createDelay(1);
    this.echo.delayTime.value = 0.3;
    const fb = c.createGain(); fb.gain.value = 0.28;
    const tone = c.createBiquadFilter(); tone.type = 'lowpass'; tone.frequency.value = 1700;
    this.echo.connect(tone); tone.connect(fb); fb.connect(this.echo); tone.connect(this.master);
    // Short white-noise buffer for hats and snares.
    this.noise = c.createBuffer(1, c.sampleRate * 0.3, c.sampleRate);
    const d = this.noise.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }

  start() {
    this.track = this.want; this.step = 0; this.nextTime = this.ctx.currentTime + 0.08;
    this.timer = setInterval(() => this.schedule(), 25);
  }
  stop() { clearInterval(this.timer); this.timer = null; }

  setTrack(name) {
    if (!TRACKS[name] || name === this.want) return;
    this.want = name;
    if (!this.ctx || !this.timer) return;
    // Quick dip so the switch doesn't click, then restart from the top.
    const t = this.ctx.currentTime, g = this.master.gain;
    g.cancelScheduledValues(t); g.setValueAtTime(g.value, t); g.linearRampToValueAtTime(0, t + 0.12);
    if (!this.muted) g.linearRampToValueAtTime(0.5, t + 0.5);
    this.track = name; this.step = 0; this.nextTime = t + 0.15;
  }

  setMuted(muted) {
    this.muted = muted;
    try { localStorage.setItem(KEY, muted ? '1' : '0'); } catch { /* storage unavailable */ }
    if (!muted) this.unlock();
    if (!this.ctx) return;
    const t = this.ctx.currentTime, g = this.master.gain;
    g.cancelScheduledValues(t); g.setValueAtTime(g.value, t); g.linearRampToValueAtTime(muted ? 0 : 0.5, t + 0.25);
    if (muted) setTimeout(() => { if (this.muted) this.stop(); }, 300);
  }

  // Pause while the tab is hidden; resume when it comes back.
  setHidden(hidden) {
    if (!this.ctx) return;
    if (hidden) { this.ctx.suspend(); this.stop(); }
    else if (!this.muted) { this.ctx.resume(); if (!this.timer) this.start(); }
  }

  schedule() {
    const tr = TRACKS[this.track], stepDur = 60 / tr.bpm / 4;
    while (this.nextTime < this.ctx.currentTime + 0.15) {
      // Swing pushes every off-sixteenth a little late.
      const t = this.nextTime + (this.step % 2 ? tr.swing * stepDur : 0);
      this.playStep(tr, this.step, t, stepDur);
      this.step = (this.step + 1) % (tr.bars * 16 * 2);
      this.nextTime += stepDur;
    }
  }

  playStep(tr, i, t, len) {
    const bar = Math.floor(i / 16) % tr.bars, pos = i % 16, pass = Math.floor(i / (tr.bars * 16)) % 2;
    const root = tr.roots[bar], chord = tr.chords[bar];
    // Drums.
    if (tr.kick.includes(pos)) this.kick(t, tr.rock ? 0.42 : 0.34);
    if (tr.snare.includes(pos)) this.snare(t, tr.rock ? 0.2 : 0.15);
    if (tr.ghost.includes(pos)) this.snare(t, 0.04);
    if (tr.rock) { if (pos % 2 === 0) this.hat(t, pos % 4 === 0 ? 0.07 : 0.045); }
    else this.hat(t, pos % 4 === 2 ? 0.055 : pos % 2 ? 0.018 : 0.035, pos === 14 ? 0.18 : 0.04);
    // Bass: a plucked saw through a low filter.
    const b = tr.bass.find(x => x[0] === pos);
    if (b) this.tone(midi(root + b[1]), t, len * (tr.rock ? 1.6 : 1.8), 'sawtooth', tr.rock ? 0.09 : 0.11, false, tr.rock ? 900 : 650);
    // Chords: electric-piano stabs (santai) or crunchy power stabs (battle).
    if (tr.stabs.includes(pos)) {
      if (tr.rock) chord.forEach(n => this.tone(midi(n), t, len * 1.6, 'sawtooth', 0.022, false, 1800));
      else chord.forEach((n, k) => { this.tone(midi(n), t + k * 0.006, len * 2.6, 'sine', 0.045, true); this.tone(midi(n + 12), t + k * 0.006, len * 1.2, 'triangle', 0.012); });
    }
    if (!tr.rock && pos === 0) chord.forEach(n => this.tone(midi(n - 12), t, len * 15, 'triangle', 0.012, false, 900));
    // Lead: santai rests its hook on the second pass and lets the EP noodle an octave down.
    const n = tr.lead[bar][pos];
    if (n != null) {
      const dur = len * tr.lens[bar][pos] * 1.05;
      if (tr.rock) { this.tone(midi(n), t, dur, 'square', 0.05, true, 2200); this.tone(midi(n + 12), t, dur * 0.7, 'sine', 0.02); }
      else if (pass === 0) { this.tone(midi(n), t, dur * 1.3, 'square', 0.034, true, 1500); this.tone(midi(n), t, dur * 1.4, 'sine', 0.06, true); }
      else if (pos % 4 === 0) this.tone(midi(n - 12), t, dur * 1.2, 'sine', 0.05, true);
    }
  }

  tone(freq, t, dur, type, vol, echo = false, cutoff) {
    const c = this.ctx, o = c.createOscillator(), g = c.createGain(), f = c.createBiquadFilter();
    o.type = type; o.frequency.value = freq;
    f.type = 'lowpass'; f.frequency.value = cutoff || (type === 'sine' ? 4000 : 2600);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(f); f.connect(g); g.connect(this.master);
    if (echo) g.connect(this.echo);
    o.start(t); o.stop(t + dur + 0.05);
  }

  // Short one-shot sound effects layered over the music. Silent when muted or before unlock.
  sfx(name) {
    if (this.muted || !this.ctx || this.ctx.state !== 'running') return;
    const t = this.ctx.currentTime + 0.01;
    const arp = (notes, step, type, vol, len) => notes.forEach((n, i) => {
      this.tone(midi(n), t + i * step, len, type, vol, true);
      this.tone(midi(n + 12), t + i * step, len * 0.6, 'sine', vol * 0.3);
    });
    if (name === 'chest') arp([72, 76, 79, 84], 0.07, 'sine', 0.16, 0.35);
    else if (name === 'legend') { arp([72, 76, 79, 84, 88, 91], 0.07, 'sine', 0.18, 0.5); this.tone(midi(96), t + 0.45, 1.2, 'sine', 0.08, true); }
    else if (name === 'levelup') arp([67, 72, 79], 0.09, 'triangle', 0.16, 0.3);
    else if (name === 'victory') {
      arp([72, 76, 79], 0.11, 'square', 0.06, 0.25);
      [72, 76, 79, 84].forEach(n => this.tone(midi(n), t + 0.38, 0.9, 'triangle', 0.07));
      this.kick(t + 0.38, 0.3);
    } else if (name === 'ult') {
      const c = this.ctx, s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
      s.buffer = this.noise; s.loop = true; f.type = 'bandpass'; f.Q.value = 1.2;
      f.frequency.setValueAtTime(300, t); f.frequency.exponentialRampToValueAtTime(4000, t + 0.5);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.18, t + 0.3); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
      s.connect(f); f.connect(g); g.connect(this.master); s.start(t); s.stop(t + 0.65);
      this.kick(t + 0.5, 0.45);
      arp([60, 67, 72], 0.05, 'sawtooth', 0.04, 0.5);
    }
  }

  kick(t, vol = 0.35) {
    const c = this.ctx, o = c.createOscillator(), g = c.createGain();
    o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.12);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
    o.connect(g); g.connect(this.master); o.start(t); o.stop(t + 0.22);
  }

  // Noise crack plus a short body tone.
  snare(t, vol = 0.15) {
    const c = this.ctx, s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    s.buffer = this.noise; f.type = 'bandpass'; f.frequency.value = 1900; f.Q.value = 0.8;
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
    s.connect(f); f.connect(g); g.connect(this.master); s.start(t); s.stop(t + 0.16);
    const o = c.createOscillator(), og = c.createGain();
    o.frequency.setValueAtTime(210, t); o.frequency.exponentialRampToValueAtTime(140, t + 0.06);
    og.gain.setValueAtTime(vol * 0.6, t); og.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
    o.connect(og); og.connect(this.master); o.start(t); o.stop(t + 0.1);
  }

  hat(t, vol = 0.06, decay = 0.04) {
    const c = this.ctx, s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    s.buffer = this.noise; f.type = 'highpass'; f.frequency.value = 7500;
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + decay);
    s.connect(f); f.connect(g); g.connect(this.master); s.start(t); s.stop(t + decay + 0.02);
  }
}

export const music = new Music();
