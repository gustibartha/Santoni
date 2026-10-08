// Background music, synthesized with the Web Audio API (no audio files).
// Two looping tracks: "santai" for menus and travel, "battle" for fights.
// Browsers only allow audio after a user gesture, so call unlock() from one.

const KEY = 'santoni:music-muted';
const midi = n => 440 * Math.pow(2, (n - 69) / 12);
const _ = null;

// Eighth-note steps. Each bar is 8 steps; `chords`/`bass` are per bar.
const TRACKS = {
  // Bouncy, sunny C major: bell lead, root–fifth hopping bass, off-beat "ukulele" chords.
  santai: {
    bpm: 116, style: 'happy', leadVol: 0.12,
    melody: [
      72, 76, 79, 76, 84, _, 79, _,
      74, 79, 83, 79, 81, _, 79, _,
      76, 72, 76, 81, 79, _, 76, _,
      77, _, 76, 74, 72, 74, 76, _,
      72, 76, 79, 84, 83, 84, 79, _,
      79, _, 74, 79, 83, _, 81, 79,
      77, 76, 74, 72, 74, _, 79, _,
      84, _, 79, 76, 72, _, _, _
    ],
    chords: [[60, 64, 67], [55, 59, 62], [57, 60, 64], [53, 57, 60], [60, 64, 67], [55, 59, 62], [53, 57, 60], [60, 64, 67]],
    bass: [48, 43, 45, 41, 48, 43, 41, 48]
  },
  // Upbeat heroic I–V–vi–IV with drums, so fights feel fun rather than tense.
  battle: {
    bpm: 148, style: 'battle', lead: 'square', leadVol: 0.065,
    melody: [
      72, 72, 79, 72, 76, 74, 72, 74,
      71, 74, 79, 74, 83, 81, 79, 74,
      72, 76, 81, 76, 84, 83, 81, 79,
      77, 76, 74, 72, 74, _, 79, _
    ],
    chords: [[60, 64, 67], [55, 59, 62], [57, 60, 64], [53, 57, 60]],
    bass: [48, 43, 45, 41]
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
    if (tr.style === 'battle') {
      if (n != null) this.tone(midi(n), t, len * 1.6, tr.lead, tr.leadVol, true);
      // Pulsing octave bass, kick on beats, hats off-beat.
      this.tone(midi(tr.bass[bar] + (pos % 2 ? 12 : 0)), t, len * 0.9, 'square', 0.05);
      if (pos % 2 === 0) this.kick(t, 0.32);
      else this.hat(t, 0.06);
      if (pos === 0) tr.chords[bar].forEach(c => this.tone(midi(c), t, len * 6, 'sawtooth', 0.018));
    } else {
      // Bell: a sine plus a quiet octave for sparkle, with a quick decay.
      if (n != null) {
        this.tone(midi(n), t, len * 2.2, 'sine', tr.leadVol, true);
        this.tone(midi(n + 12), t, len * 1.1, 'sine', tr.leadVol * 0.28);
      }
      const root = tr.bass[bar];
      if (pos % 2 === 0) this.tone(midi(pos % 4 === 0 ? root : root + 7), t, len * 0.9, 'triangle', 0.16);
      else tr.chords[bar].forEach((c, k) => this.tone(midi(c + 12), t + k * 0.008, len * 0.6, 'triangle', 0.03));
      if (pos === 0 || pos === 4) this.kick(t, 0.14);
      if (pos % 2) this.hat(t, 0.025);
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

  kick(t, vol = 0.35) {
    const c = this.ctx, o = c.createOscillator(), g = c.createGain();
    o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(45, t + 0.12);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
    o.connect(g); g.connect(this.master); o.start(t); o.stop(t + 0.2);
  }

  hat(t, vol = 0.06) {
    const c = this.ctx, s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    s.buffer = this.noise; f.type = 'highpass'; f.frequency.value = 7000;
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    s.connect(f); f.connect(g); g.connect(this.master); s.start(t); s.stop(t + 0.06);
  }
}

export const music = new Music();
