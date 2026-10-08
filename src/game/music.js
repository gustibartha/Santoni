// Background music, synthesized with the Web Audio API (no audio files).
// Two looping tracks: "santai" for menus and travel, "battle" for fights.
// Browsers only allow audio after a user gesture, so call unlock() from one.

const KEY = 'santoni:music-muted';
const midi = n => 440 * Math.pow(2, (n - 69) / 12);
const _ = null;

// Eighth-note steps. Each bar is 8 steps; `chords`/`bass` are per bar.
const TRACKS = {
  santai: {
    bpm: 96, lead: 'triangle', leadVol: 0.16, drums: false,
    melody: [
      76, _, 79, 76, 74, 72, 74, _,
      72, _, 69, 72, 76, _, 74, _,
      72, _, 74, 76, 79, _, 76, _,
      74, _, 72, 74, 67, _, _, _,
      76, 79, 81, 79, 76, _, 74, 76,
      79, _, 76, _, 74, 76, 74, _,
      72, 74, 76, _, 81, _, 79, _,
      76, 74, 72, _, 72, _, _, _
    ],
    chords: [[60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62], [60, 64, 67], [52, 55, 59], [53, 57, 60], [55, 59, 62]],
    bass: [48, 45, 41, 43, 48, 40, 41, 43]
  },
  battle: {
    bpm: 140, lead: 'square', leadVol: 0.07, drums: true,
    melody: [
      69, 72, 76, 72, 74, 72, 71, 72,
      69, _, 72, 74, 76, _, 74, 72,
      71, 74, 79, 74, 76, 74, 71, 67,
      68, 71, 76, _, 74, _, 71, _
    ],
    chords: [[57, 60, 64], [53, 57, 60], [55, 59, 62], [52, 56, 59]],
    bass: [45, 41, 43, 40]
  }
};

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
    this.master.connect(c.destination);
    // Soft echo on the lead line.
    this.echo = c.createDelay(1);
    this.echo.delayTime.value = 0.28;
    const fb = c.createGain(); fb.gain.value = 0.25;
    const tone = c.createBiquadFilter(); tone.type = 'lowpass'; tone.frequency.value = 1800;
    this.echo.connect(tone); tone.connect(fb); fb.connect(this.echo); tone.connect(this.master);
    // Short white-noise buffer for hi-hats.
    this.noise = c.createBuffer(1, c.sampleRate * 0.1, c.sampleRate);
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
    const tr = TRACKS[this.track], stepDur = 60 / tr.bpm / 2;
    while (this.nextTime < this.ctx.currentTime + 0.15) {
      this.playStep(tr, this.step, this.nextTime, stepDur);
      this.step = (this.step + 1) % tr.melody.length;
      this.nextTime += stepDur;
    }
  }

  playStep(tr, i, t, len) {
    const bar = Math.floor(i / 8) % tr.chords.length, pos = i % 8;
    const n = tr.melody[i];
    if (n != null) this.tone(midi(n), t, len * 1.6, tr.lead, tr.leadVol, true);
    if (tr.drums) {
      // Pulsing octave bass, kick on beats, hats off-beat.
      this.tone(midi(tr.bass[bar] + (pos % 2 ? 12 : 0)), t, len * 0.9, 'square', 0.05);
      if (pos % 2 === 0) this.kick(t);
      else this.hat(t);
      if (pos === 0) tr.chords[bar].forEach(c => this.tone(midi(c), t, len * 6, 'sawtooth', 0.018));
    } else {
      if (pos === 0 || pos === 4) this.tone(midi(tr.bass[bar]), t, len * 3, 'sine', 0.22);
      if (pos === 2 || pos === 6) tr.chords[bar].forEach((c, k) => this.tone(midi(c), t + k * 0.012, len * 1.5, 'sine', 0.05));
    }
  }

  tone(freq, t, dur, type, vol, echo = false) {
    const c = this.ctx, o = c.createOscillator(), g = c.createGain(), f = c.createBiquadFilter();
    o.type = type; o.frequency.value = freq;
    f.type = 'lowpass'; f.frequency.value = type === 'sine' ? 4000 : 2600;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(f); f.connect(g); g.connect(this.master);
    if (echo) g.connect(this.echo);
    o.start(t); o.stop(t + dur + 0.05);
  }

  kick(t) {
    const c = this.ctx, o = c.createOscillator(), g = c.createGain();
    o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(45, t + 0.12);
    g.gain.setValueAtTime(0.35, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
    o.connect(g); g.connect(this.master); o.start(t); o.stop(t + 0.2);
  }

  hat(t) {
    const c = this.ctx, s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    s.buffer = this.noise; f.type = 'highpass'; f.frequency.value = 7000;
    g.gain.setValueAtTime(0.06, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    s.connect(f); f.connect(g); g.connect(this.master); s.start(t); s.stop(t + 0.06);
  }
}

export const music = new Music();
