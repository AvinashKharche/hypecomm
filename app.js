/* ══════════════════════════════════════════════════════════════════
   HypeCam — State-of-the-Art Glitch-Pop Live Studio
   ══════════════════════════════════════════════════════════════════ */

/* ── Constants ─────────────────────────────────────────────────── */

const TIMING = {
  COMMENT_BASE_DELAY: 300,
  COMMENT_STAGGER: 400,
  COMMENT_JITTER: 200,
  DEMO_INTERVAL: 3500,
  MIN_LATENCY_DISPLAY: 40,
  COMMENT_BURST_MIN: 3,
  COMMENT_BURST_EXTRA: 3,
  TIMER_INTERVAL: 1000,
  VIEWER_UPDATE_INTERVAL: 3000,
  VIEWER_BASE: 42,
  VIEWER_RANGE: 80,
  VIEWER_DRIFT: 8,
  TYPING_INDICATOR_DURATION: 1800,
  URL_REVOKE_DELAY: 2000,
  AUTOSCROLL_THRESHOLD: 50,
  MEDIA_RECORDER_TIMESLICE: 200,
  HYPE_DECAY_INTERVAL: 500,
  HYPE_DECAY_RATE: 2,
  HYPE_PER_COMMENT: 8,
  HYPE_MAX: 100,
  MILESTONE_CHECK_INTERVAL: 1000,
  CONFETTI_COUNT: 60,
  CONFETTI_DURATION: 3000,
  TOAST_DURATION: 4000,
  VISUALIZER_FPS: 30,
  SOUND_VOLUME: 0.15,
  SPARKLINE_POINTS: 20,
  SPARKLINE_INTERVAL: 2000,
};

const NAME_POOL = [
  'NovaKicks', 'SkylineSam', 'PixelChaser', 'GlowEcho', 'CrispQuill',
  'AtlasWave', 'NeonDusk', 'SonicJun', 'EchoRin', 'VelvetArc',
  'CircuitMuse', 'MaruBytes', 'SiaLoops', 'HelixRay', 'LumenFox',
  'MintyRae', 'OrbitBlue', 'FableAsh', 'VioletRue', 'KairoD',
  'RheaNova', 'ByteBloom', 'ZenithRay', 'CosmicLu', 'DriftSol',
  'PrismJay', 'AuroraKai', 'CypherEv', 'QuantaRose', 'VoxelMint',
];

const PERSONAS = {
  NovaKicks: { mood: 'hype', style: 'exclamation' },
  SkylineSam: { mood: 'chill', style: 'thoughtful' },
  PixelChaser: { mood: 'curious', style: 'question' },
  GlowEcho: { mood: 'hype', style: 'emoji-heavy' },
  CrispQuill: { mood: 'analytical', style: 'detailed' },
  AtlasWave: { mood: 'supportive', style: 'encouraging' },
  NeonDusk: { mood: 'hype', style: 'slang' },
  SonicJun: { mood: 'curious', style: 'technical' },
  EchoRin: { mood: 'chill', style: 'poetic' },
  VelvetArc: { mood: 'supportive', style: 'warm' },
  CircuitMuse: { mood: 'analytical', style: 'technical' },
  MaruBytes: { mood: 'hype', style: 'meme' },
  SiaLoops: { mood: 'chill', style: 'musical' },
  HelixRay: { mood: 'curious', style: 'scientific' },
  LumenFox: { mood: 'hype', style: 'exclamation' },
  MintyRae: { mood: 'supportive', style: 'warm' },
  OrbitBlue: { mood: 'analytical', style: 'thoughtful' },
  FableAsh: { mood: 'chill', style: 'poetic' },
  VioletRue: { mood: 'curious', style: 'question' },
  KairoD: { mood: 'hype', style: 'slang' },
  RheaNova: { mood: 'supportive', style: 'encouraging' },
  ByteBloom: { mood: 'analytical', style: 'technical' },
  ZenithRay: { mood: 'hype', style: 'exclamation' },
  CosmicLu: { mood: 'chill', style: 'musical' },
  DriftSol: { mood: 'curious', style: 'thoughtful' },
  PrismJay: { mood: 'hype', style: 'emoji-heavy' },
  AuroraKai: { mood: 'supportive', style: 'warm' },
  CypherEv: { mood: 'analytical', style: 'technical' },
  QuantaRose: { mood: 'curious', style: 'scientific' },
  VoxelMint: { mood: 'chill', style: 'poetic' },
};

const EMOJI_REACTIONS = ['🔥', '💜', '👏', '✨', '💯', '🎯', '⚡', '🚀'];

const DEMO_TOPICS = [
  'sound design', 'your setup', 'story arc', 'camera confidence',
  'favorite glitch effect', 'workflow tricks', 'color grading',
  'audio mixing', 'live performance tips', 'visual storytelling',
];

const VIDEO_FILTERS = {
  none: { label: 'Normal', css: 'none' },
  glitch: { label: 'Glitch', css: 'hue-rotate(90deg) saturate(2) contrast(1.4)' },
  vhs: { label: 'VHS', css: 'sepia(0.3) contrast(1.1) brightness(0.9) saturate(1.3)' },
  neon: { label: 'Neon', css: 'saturate(3) contrast(1.2) brightness(1.1)' },
  noir: { label: 'Noir', css: 'grayscale(1) contrast(1.4) brightness(0.8)' },
  thermal: { label: 'Thermal', css: 'hue-rotate(180deg) saturate(4) contrast(1.6)' },
};

const MILESTONES = [
  { count: 10, message: '10 comments! The crowd is warming up', emoji: '🎉' },
  { count: 25, message: '25 comments! Energy is rising', emoji: '⚡' },
  { count: 50, message: '50 comments! This stream is on fire', emoji: '🔥' },
  { count: 100, message: '100 comments! Legendary stream', emoji: '🏆' },
  { count: 200, message: '200 comments! Hall of fame moment', emoji: '👑' },
  { count: 500, message: '500 comments! Unprecedented hype', emoji: '💎' },
];

const ERROR_MESSAGES = {
  PERMISSION_DENIED: 'Camera or mic permission was denied. Please allow access and try again.',
  NOT_FOUND: 'No camera or microphone found. Please connect a device and try again.',
  NOT_READABLE: 'Camera or mic is already in use by another app. Close it and retry.',
  OVERCONSTRAINED: 'Your camera does not support the requested settings.',
  GENERIC_MEDIA: 'Could not access camera or microphone. Check your browser settings.',
  SPEECH_UNAVAILABLE: 'Speech recognition not available in this browser. Comments will riff off sample prompts.',
  SPEECH_LOST: 'Speech recognition lost — retrying automatically...',
  SPEECH_DENIED: 'Microphone access denied for speech recognition. Comments will use sample prompts.',
};

/* ── Utilities ─────────────────────────────────────────────────── */

function choose(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function isoTime() {
  return new Intl.DateTimeFormat([], {
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  }).format(new Date());
}

function formatDuration(ms) {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return h > 0 ? `${h}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
}

function friendlyMediaError(err) {
  if (err.name === 'NotAllowedError') return ERROR_MESSAGES.PERMISSION_DENIED;
  if (err.name === 'NotFoundError') return ERROR_MESSAGES.NOT_FOUND;
  if (err.name === 'NotReadableError') return ERROR_MESSAGES.NOT_READABLE;
  if (err.name === 'OverconstrainedError') return ERROR_MESSAGES.OVERCONSTRAINED;
  return ERROR_MESSAGES.GENERIC_MEDIA;
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

/* ── Sound Engine (Web Audio API) ──────────────────────────────── */

class SoundEngine {
  constructor() {
    this._ctx = null;
  }

  _ensureContext() {
    if (!this._ctx) {
      this._ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this._ctx.state === 'suspended') this._ctx.resume();
    return this._ctx;
  }

  _playTone(freq, duration, type = 'sine', volume = TIMING.SOUND_VOLUME) {
    try {
      const ctx = this._ensureContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (_) { /* Audio not available */ }
  }

  comment() { this._playTone(880, 0.08, 'sine', 0.06); }
  goLive() { this._playTone(523, 0.15); this._playTone(659, 0.15); }
  endStream() { this._playTone(440, 0.3, 'triangle', 0.1); }
  milestone() { this._playTone(784, 0.12); setTimeout(() => this._playTone(1047, 0.15), 120); }
  screenshot() { this._playTone(1200, 0.06, 'square', 0.08); }
  emoji() { this._playTone(660, 0.05, 'sine', 0.04); }
}

/* ── Audio Visualizer ──────────────────────────────────────────── */

class AudioVisualizer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.analyser = null;
    this.animFrame = null;
    this.dataArray = null;
  }

  connect(stream) {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioCtx.createMediaStreamSource(stream);
      this.analyser = audioCtx.createAnalyser();
      this.analyser.fftSize = 128;
      this.analyser.smoothingTimeConstant = 0.8;
      source.connect(this.analyser);
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      this._draw();
    } catch (_) { /* Audio context not available */ }
  }

  _draw() {
    if (!this.analyser) return;
    this.animFrame = requestAnimationFrame(() => this._draw());

    const { canvas, ctx, analyser, dataArray } = this;
    canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
    canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
    const w = canvas.width;
    const h = canvas.height;

    analyser.getByteFrequencyData(dataArray);
    ctx.clearRect(0, 0, w, h);

    const barCount = dataArray.length;
    const barWidth = w / barCount;
    const gradient = ctx.createLinearGradient(0, h, 0, 0);
    gradient.addColorStop(0, 'rgba(122, 255, 207, 0.8)');
    gradient.addColorStop(0.5, 'rgba(83, 167, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 58, 242, 0.8)');

    for (let i = 0; i < barCount; i++) {
      const barHeight = (dataArray[i] / 255) * h;
      ctx.fillStyle = gradient;
      ctx.fillRect(i * barWidth, h - barHeight, barWidth - 1, barHeight);
    }
  }

  stop() {
    if (this.animFrame) {
      cancelAnimationFrame(this.animFrame);
      this.animFrame = null;
    }
    if (this.canvas) {
      const ctx = this.canvas.getContext('2d');
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.analyser = null;
  }
}

/* ── Confetti Engine ───────────────────────────────────────────── */

class ConfettiEngine {
  constructor(container) {
    this.container = container;
  }

  burst() {
    const colors = ['#ff3af2', '#7affcf', '#53a7ff', '#ffcf3a', '#ff4d6a', '#a78bfa'];
    for (let i = 0; i < TIMING.CONFETTI_COUNT; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.setProperty('--x', `${(Math.random() - 0.5) * 600}px`);
      piece.style.setProperty('--r', `${Math.random() * 720 - 360}deg`);
      piece.style.left = `${40 + Math.random() * 20}%`;
      piece.style.top = `${20 + Math.random() * 10}%`;
      piece.style.background = choose(colors);
      piece.style.animationDelay = `${Math.random() * 0.3}s`;
      piece.style.animationDuration = `${1.5 + Math.random() * 1.5}s`;
      this.container.appendChild(piece);
    }
    setTimeout(() => {
      this.container.querySelectorAll('.confetti-piece').forEach((p) => p.remove());
    }, TIMING.CONFETTI_DURATION);
  }
}

/* ── Toast Notifications ───────────────────────────────────────── */

class ToastManager {
  constructor(container) {
    this.container = container;
  }

  show(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    this.container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('toast-visible'));
    setTimeout(() => {
      toast.classList.remove('toast-visible');
      toast.addEventListener('transitionend', () => toast.remove());
    }, TIMING.TOAST_DURATION);
  }
}

/* ── Sparkline (mini viewer chart) ─────────────────────────────── */

class Sparkline {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.points = [];
  }

  push(value) {
    this.points.push(value);
    if (this.points.length > TIMING.SPARKLINE_POINTS) this.points.shift();
    this._draw();
  }

  _draw() {
    const { canvas, ctx, points } = this;
    if (points.length < 2) return;
    canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
    canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
    const w = canvas.width;
    const h = canvas.height;
    const max = Math.max(...points, 1);
    const step = w / (TIMING.SPARKLINE_POINTS - 1);

    ctx.clearRect(0, 0, w, h);
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(122, 255, 207, 0.7)';
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';

    points.forEach((val, i) => {
      const x = i * step;
      const y = h - (val / max) * h * 0.85 - 2;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Fill under the line
    ctx.lineTo((points.length - 1) * step, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fillStyle = 'rgba(122, 255, 207, 0.08)';
    ctx.fill();
  }

  clear() {
    this.points = [];
    if (this.canvas) {
      const ctx = this.canvas.getContext('2d');
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

/* ── Comment Engine v2 (with personas) ─────────────────────────── */

class CommentEngine {
  constructor() {
    this.recentTopics = [];
    this.conversationThreads = [];
    this.templates = this._buildTemplates();
  }

  _buildTemplates() {
    return {
      hype: {
        exclamation: [
          (t) => `YOOO "${t}" is incredible!!`,
          (t) => `"${t}" just blew my mind!`,
          (t) => `THIS. "${t}" is what we came for!`,
          (t) => `"${t}" is the energy we needed today!`,
        ],
        'emoji-heavy': [
          (t) => `🔥🔥🔥 "${t}" 🔥🔥🔥`,
          (t) => `✨ "${t}" ✨ absolutely unreal`,
          (t) => `"${t}" 💯💯 no cap`,
          (t) => `⚡ ${t} ⚡ giving me goosebumps`,
        ],
        slang: [
          (t) => `"${t}" is lowkey fire rn`,
          (t) => `ngl "${t}" hits different`,
          (t) => `"${t}" is bussin fr`,
          (t) => `deadass, "${t}" is the vibe`,
        ],
        meme: [
          (t) => `me when "${t}": 🤯🤯🤯`,
          (t) => `"${t}" — inject this into my veins`,
          (t) => `W take on "${t}" honestly`,
          (t) => `"${t}" goes crazy hard tbh`,
        ],
      },
      curious: {
        question: [
          (t) => `Wait, can you dive deeper on ${t}?`,
          (t) => `How do you feel about ${t} vs the alternatives?`,
          (t) => `What would you change about ${t}?`,
          (t) => `Where do you see ${t} going next?`,
        ],
        scientific: [
          (t) => `What's the data behind ${t}? Super curious`,
          (t) => `Has anyone measured the impact of ${t}?`,
          (t) => `Is ${t} reproducible in other contexts?`,
          (t) => `Interesting — what's the mechanism behind ${t}?`,
        ],
        thoughtful: [
          (t) => `I wonder how ${t} connects to the bigger picture...`,
          (t) => `${t} raises an interesting question about methodology`,
          (t) => `There's a nuance to ${t} that people miss`,
          (t) => `What's the counterargument to ${t} though?`,
        ],
      },
      supportive: {
        encouraging: [
          (t) => `You're explaining ${t} so well — keep going!`,
          (t) => `Love how you break down ${t}. More people need to hear this`,
          (t) => `${t} — great point, really resonates with me`,
          (t) => `Thanks for sharing about ${t}. This is helpful`,
        ],
        warm: [
          (t) => `This stream and "${t}" is exactly what I needed today`,
          (t) => `"${t}" — honestly so glad I tuned in for this`,
          (t) => `Your passion for ${t} really comes through`,
          (t) => `"${t}" — you make this look effortless`,
        ],
      },
      chill: {
        poetic: [
          (t) => `"${t}" — there's something meditative about that`,
          (t) => `${t} has this quiet power to it`,
          (t) => `the way you describe "${t}" paints a picture`,
          (t) => `"${t}" — like a breath of fresh air`,
        ],
        musical: [
          (t) => `"${t}" has a rhythm to it, you know?`,
          (t) => `${t} — that's like a whole genre in itself`,
          (t) => `the cadence of "${t}" is everything`,
          (t) => `"${t}" — could be a song title tbh`,
        ],
      },
      analytical: {
        detailed: [
          (t) => `Interesting — ${t} has 3 distinct aspects worth unpacking`,
          (t) => `If you break down ${t}, the core principle is what matters`,
          (t) => `${t} — I'd love to see the before/after comparison`,
          (t) => `Worth noting: ${t} works differently in practice vs theory`,
        ],
        technical: [
          (t) => `From a technical POV, ${t} has fascinating constraints`,
          (t) => `The implementation of ${t} is trickier than it sounds`,
          (t) => `${t} — what framework or tooling are you using?`,
          (t) => `Has anyone benchmarked ${t} at scale?`,
        ],
      },
      callback: [
        (t, prev) => `Going back to "${prev}" — how does that connect with ${t}?`,
        (t, prev) => `Wait, is ${t} related to what you said about "${prev}"?`,
        (t, prev) => `"${prev}" + "${t}" — this stream is building on itself, love it`,
        (t, prev) => `The thread from "${prev}" to ${t} — chef's kiss`,
      ],
      thread: [
        (t, user) => `@${user} great point! And ${t} adds another layer`,
        (t, user) => `Building on what @${user} said — ${t} is key`,
        (t, user) => `@${user} YES and ${t} is exactly why`,
      ],
    };
  }

  generate(transcript) {
    const topic = transcript.trim();
    if (!topic) return null;

    const username = choose(NAME_POOL);
    const persona = PERSONAS[username] || { mood: 'hype', style: 'exclamation' };
    const prevTopic = this.recentTopics.length > 0
      ? this.recentTopics[this.recentTopics.length - 1] : null;

    let text;

    // 20% chance: reply to a previous commenter (thread)
    if (this.conversationThreads.length > 0 && Math.random() < 0.2) {
      const prev = choose(this.conversationThreads);
      const fn = choose(this.templates.thread);
      text = fn(topic, prev.username);
    }
    // 20% chance: reference a previous topic (callback)
    else if (prevTopic && prevTopic !== topic && Math.random() < 0.2) {
      const fn = choose(this.templates.callback);
      text = fn(topic, prevTopic);
    }
    // Default: use persona-matched template
    else {
      const moodPool = this.templates[persona.mood];
      const stylePool = moodPool ? moodPool[persona.style] : null;
      const pool = stylePool || this.templates.hype.exclamation;
      text = choose(pool)(topic);
    }

    this.recentTopics.push(topic);
    if (this.recentTopics.length > 10) this.recentTopics.shift();

    const entry = { username, text };
    this.conversationThreads.push(entry);
    if (this.conversationThreads.length > 20) this.conversationThreads.shift();

    return entry;
  }
}

/* ══════════════════════════════════════════════════════════════════
   HypeCam Application
   ══════════════════════════════════════════════════════════════════ */

class HypeCam {
  constructor() {
    this.els = this._queryElements();
    this.state = {
      mediaRecorder: null,
      recordedChunks: [],
      stream: null,
      speech: null,
      liveStart: null,
      commentCount: 0,
      autoscroll: true,
      viewerCount: 0,
      hypeLevel: 0,
      currentFilter: 'none',
      highlights: [],
      lastMilestone: 0,
      isPiP: false,
      soundEnabled: true,
      timerHandle: null,
      viewerHandle: null,
      demoHandle: null,
      hypeDecayHandle: null,
      sparklineHandle: null,
      speechRetries: 0,
    };

    this.commentEngine = new CommentEngine();
    this.sound = new SoundEngine();
    this.toast = new ToastManager(this.els.toastContainer);
    this.confetti = new ConfettiEngine(this.els.confettiLayer);
    this.visualizer = new AudioVisualizer(this.els.visualizerCanvas);
    this.sparkline = new Sparkline(this.els.sparklineCanvas);

    this._buildFilterButtons();
    this._bindEvents();
    this._bootDemoComments();
  }

  _queryElements() {
    const ids = [
      'startBtn', 'stopBtn', 'downloadBtn', 'preview', 'liveBadge',
      'statusLabel', 'latencyLabel', 'commentCount', 'commentStream',
      'commentTemplate', 'speechHint', 'streamTimer', 'viewerCount',
      'typingIndicator', 'emojiBar', 'visualizerCanvas', 'hypeMeter',
      'hypeFill', 'hypeLabel', 'filterBar', 'highlightBtn', 'highlightsList',
      'chatInput', 'chatSendBtn', 'moodIndicator', 'moodLabel', 'moodIcon',
      'pipBtn', 'fullscreenBtn', 'screenshotBtn', 'soundToggle',
      'toastContainer', 'confettiLayer', 'recapModal', 'recapContent',
      'recapClose', 'sparklineCanvas', 'videoOverlay',
    ];
    const els = {};
    ids.forEach((id) => { els[id] = document.getElementById(id); });
    // Template uses different getter
    els.template = els.commentTemplate;
    return els;
  }

  /* ── UI Helpers ──────────────────────────────────────────── */

  _setLiveUI(isLive) {
    const { liveBadge, statusLabel, startBtn, stopBtn, highlightBtn,
      pipBtn, fullscreenBtn, screenshotBtn, videoOverlay } = this.els;
    liveBadge.innerHTML = `<span class="pulse"></span>${isLive ? 'LIVE' : 'OFF AIR'}`;
    liveBadge.classList.toggle('is-live', isLive);
    statusLabel.textContent = isLive ? 'On air — crowd is listening' : 'Stream ended';
    startBtn.disabled = isLive;
    stopBtn.disabled = !isLive;
    if (highlightBtn) highlightBtn.disabled = !isLive;
    if (pipBtn) pipBtn.disabled = !isLive;
    if (fullscreenBtn) fullscreenBtn.disabled = !isLive;
    if (screenshotBtn) screenshotBtn.disabled = !isLive;
    if (videoOverlay) videoOverlay.classList.toggle('is-live', isLive);
    document.body.classList.toggle('is-streaming', isLive);
  }

  _appendComment({ username, text, latency, isUser }) {
    const node = this.els.template.content.cloneNode(true);
    node.querySelector('.username').textContent = username;
    node.querySelector('.timestamp').textContent = `${isoTime()} • ${latency}ms`;
    node.querySelector('.body').textContent = text;

    const article = node.querySelector('.comment');
    if (isUser) article.classList.add('comment-user');

    const colorSeed = username.charCodeAt(0) + username.charCodeAt(username.length - 1);
    const hue = (colorSeed * 13) % 360;
    node.querySelector('.avatar').textContent = username.charAt(0).toUpperCase();
    node.querySelector('.avatar').style.background =
      `linear-gradient(135deg, hsl(${hue} 85% 60%), hsl(${(hue + 60) % 360} 90% 55%))`;

    this.els.commentStream.appendChild(node);
    this.state.commentCount += 1;
    this.els.commentCount.textContent = this.state.commentCount;

    // Hype boost
    this.state.hypeLevel = clamp(this.state.hypeLevel + TIMING.HYPE_PER_COMMENT, 0, TIMING.HYPE_MAX);
    this._updateHypeMeter();
    this._updateMood();

    // Sound
    if (this.state.soundEnabled) this.sound.comment();

    // Milestone check
    this._checkMilestone();

    if (this.state.autoscroll) {
      this.els.commentStream.scrollTop = this.els.commentStream.scrollHeight;
    }
  }

  _showTypingIndicator() {
    if (!this.els.typingIndicator) return;
    const names = [];
    for (let i = 0; i < 1 + Math.floor(Math.random() * 2); i++) {
      names.push(choose(NAME_POOL));
    }
    const text = names.length === 1
      ? `${names[0]} is typing...`
      : `${names[0]} and ${names[1]} are typing...`;
    this.els.typingIndicator.textContent = text;
    this.els.typingIndicator.hidden = false;
    setTimeout(() => {
      this.els.typingIndicator.hidden = true;
    }, TIMING.TYPING_INDICATOR_DURATION);
  }

  _updateTimer() {
    if (!this.state.liveStart || !this.els.streamTimer) return;
    this.els.streamTimer.textContent = formatDuration(performance.now() - this.state.liveStart);
  }

  /* ── Viewer Simulation ──────────────────────────────────── */

  _startViewerSim() {
    this.state.viewerCount = TIMING.VIEWER_BASE + Math.floor(Math.random() * TIMING.VIEWER_RANGE);
    this._updateViewerDisplay();
    this.state.viewerHandle = setInterval(() => {
      const hypeBoost = Math.floor(this.state.hypeLevel / 20);
      const drift = Math.floor(Math.random() * (TIMING.VIEWER_DRIFT + hypeBoost) * 2) - TIMING.VIEWER_DRIFT;
      this.state.viewerCount = Math.max(1, this.state.viewerCount + drift);
      this._updateViewerDisplay();
    }, TIMING.VIEWER_UPDATE_INTERVAL);

    // Sparkline
    this.state.sparklineHandle = setInterval(() => {
      this.sparkline.push(this.state.viewerCount);
    }, TIMING.SPARKLINE_INTERVAL);
  }

  _stopViewerSim() {
    clearInterval(this.state.viewerHandle);
    clearInterval(this.state.sparklineHandle);
    this.state.viewerHandle = null;
    this.state.sparklineHandle = null;
    this.state.viewerCount = 0;
    this._updateViewerDisplay();
  }

  _updateViewerDisplay() {
    if (this.els.viewerCount) {
      this.els.viewerCount.textContent = this.state.viewerCount || '—';
    }
  }

  /* ── Hype Meter ─────────────────────────────────────────── */

  _startHypeDecay() {
    this.state.hypeDecayHandle = setInterval(() => {
      if (this.state.hypeLevel > 0) {
        this.state.hypeLevel = Math.max(0, this.state.hypeLevel - TIMING.HYPE_DECAY_RATE);
        this._updateHypeMeter();
        this._updateMood();
      }
    }, TIMING.HYPE_DECAY_INTERVAL);
  }

  _stopHypeDecay() {
    clearInterval(this.state.hypeDecayHandle);
    this.state.hypeDecayHandle = null;
    this.state.hypeLevel = 0;
    this._updateHypeMeter();
  }

  _updateHypeMeter() {
    if (!this.els.hypeFill || !this.els.hypeLabel) return;
    const pct = this.state.hypeLevel;
    this.els.hypeFill.style.width = `${pct}%`;
    // Color shift from blue → green → magenta → gold
    let label, color;
    if (pct < 25) { label = 'Chill'; color = 'var(--accent-2)'; }
    else if (pct < 50) { label = 'Warming Up'; color = 'var(--primary)'; }
    else if (pct < 75) { label = 'On Fire'; color = 'var(--accent)'; }
    else { label = 'MAXIMUM HYPE'; color = '#ffcf3a'; }
    this.els.hypeFill.style.background = `linear-gradient(90deg, ${color}, ${color}dd)`;
    this.els.hypeLabel.textContent = `${label} ${pct}%`;
  }

  /* ── Mood Indicator ─────────────────────────────────────── */

  _updateMood() {
    if (!this.els.moodIcon || !this.els.moodLabel) return;
    const h = this.state.hypeLevel;
    let icon, text;
    if (h < 15) { icon = '😌'; text = 'Chill vibes'; }
    else if (h < 35) { icon = '😊'; text = 'Good energy'; }
    else if (h < 55) { icon = '😄'; text = 'Excited'; }
    else if (h < 75) { icon = '🤩'; text = 'Hyped up'; }
    else { icon = '🔥'; text = 'Erupting!'; }
    this.els.moodIcon.textContent = icon;
    this.els.moodLabel.textContent = text;
  }

  /* ── Milestones ─────────────────────────────────────────── */

  _checkMilestone() {
    for (const ms of MILESTONES) {
      if (this.state.commentCount >= ms.count && this.state.lastMilestone < ms.count) {
        this.state.lastMilestone = ms.count;
        this.toast.show(`${ms.emoji} ${ms.message}!`, 'milestone');
        this.confetti.burst();
        if (this.state.soundEnabled) this.sound.milestone();
        break;
      }
    }
  }

  /* ── Comment Scheduling ─────────────────────────────────── */

  _scheduleComments(transcript) {
    const bursts = TIMING.COMMENT_BURST_MIN + Math.floor(Math.random() * TIMING.COMMENT_BURST_EXTRA);
    const now = performance.now();

    this._showTypingIndicator();

    for (let i = 0; i < bursts; i++) {
      const jitter = TIMING.COMMENT_BASE_DELAY + i * TIMING.COMMENT_STAGGER + Math.random() * TIMING.COMMENT_JITTER;
      setTimeout(() => {
        const entry = this.commentEngine.generate(transcript);
        if (!entry) return;
        const latency = Math.max(TIMING.MIN_LATENCY_DISPLAY, Math.round(performance.now() - now));
        this._appendComment({ ...entry, latency });
      }, jitter);
    }
  }

  /* ── User Chat Input ────────────────────────────────────── */

  _handleUserChat() {
    const input = this.els.chatInput;
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    input.value = '';

    this._appendComment({ username: 'You', text, latency: 0, isUser: true });

    // AI crowd responds to user chat
    setTimeout(() => this._scheduleComments(text), 600);
  }

  /* ── Video Filters ──────────────────────────────────────── */

  _buildFilterButtons() {
    if (!this.els.filterBar) return;
    Object.entries(VIDEO_FILTERS).forEach(([key, filter]) => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn';
      btn.textContent = filter.label;
      btn.dataset.filter = key;
      if (key === 'none') btn.classList.add('active');
      this.els.filterBar.appendChild(btn);
    });
  }

  _applyFilter(filterKey) {
    const filter = VIDEO_FILTERS[filterKey];
    if (!filter) return;
    this.state.currentFilter = filterKey;
    this.els.preview.style.filter = filter.css;

    // Update active button
    this.els.filterBar.querySelectorAll('.filter-btn').forEach((b) => {
      b.classList.toggle('active', b.dataset.filter === filterKey);
    });
  }

  /* ── Stream Highlights ──────────────────────────────────── */

  _addHighlight() {
    if (!this.state.liveStart) return;
    const elapsed = performance.now() - this.state.liveStart;
    const highlight = {
      time: formatDuration(elapsed),
      rawMs: elapsed,
      comments: this.state.commentCount,
      hype: this.state.hypeLevel,
    };
    this.state.highlights.push(highlight);

    if (this.els.highlightsList) {
      const item = document.createElement('div');
      item.className = 'highlight-item';
      item.innerHTML = `<span class="highlight-time">${highlight.time}</span>
        <span class="highlight-hype">${highlight.hype}% hype</span>`;
      this.els.highlightsList.appendChild(item);
    }

    this.toast.show(`Highlight saved at ${highlight.time}`, 'info');
    if (this.state.soundEnabled) this.sound.screenshot();
  }

  /* ── Picture-in-Picture ─────────────────────────────────── */

  async _togglePiP() {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        this.state.isPiP = false;
      } else if (this.els.preview.requestPictureInPicture) {
        await this.els.preview.requestPictureInPicture();
        this.state.isPiP = true;
      }
    } catch (err) {
      this.toast.show('Picture-in-Picture not supported', 'error');
    }
  }

  /* ── Fullscreen ─────────────────────────────────────────── */

  _toggleFullscreen() {
    const el = this.els.preview;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (el.requestFullscreen) {
      el.requestFullscreen();
    }
  }

  /* ── Screenshot ─────────────────────────────────────────── */

  _takeScreenshot() {
    const video = this.els.preview;
    if (!video.srcObject) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');

    // Apply current filter to screenshot
    if (this.state.currentFilter !== 'none') {
      ctx.filter = VIDEO_FILTERS[this.state.currentFilter].css;
    }
    ctx.drawImage(video, 0, 0);

    // Add overlay watermark
    ctx.filter = 'none';
    ctx.font = 'bold 16px Space Grotesk, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillText(`HypeCam • ${isoTime()}`, 16, canvas.height - 16);

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hypecam-screenshot-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    });

    if (this.state.soundEnabled) this.sound.screenshot();
    this.toast.show('Screenshot saved!', 'info');
  }

  /* ── Stream Recap ───────────────────────────────────────── */

  _showRecap() {
    if (!this.els.recapModal || !this.els.recapContent) return;
    const duration = this.state.liveStart
      ? formatDuration(performance.now() - this.state.liveStart)
      : '00:00';
    const peakViewers = Math.max(TIMING.VIEWER_BASE, this.state.viewerCount + 15);
    const highlights = this.state.highlights;

    let highlightsHtml = '';
    if (highlights.length > 0) {
      highlightsHtml = `<div class="recap-section">
        <h4>Highlights</h4>
        ${highlights.map((h) => `<div class="recap-highlight">${h.time} — ${h.hype}% hype</div>`).join('')}
      </div>`;
    }

    this.els.recapContent.innerHTML = `
      <div class="recap-grid">
        <div class="recap-stat">
          <span class="recap-number">${this.state.commentCount}</span>
          <span class="recap-label">Comments</span>
        </div>
        <div class="recap-stat">
          <span class="recap-number">${duration}</span>
          <span class="recap-label">Duration</span>
        </div>
        <div class="recap-stat">
          <span class="recap-number">${peakViewers}</span>
          <span class="recap-label">Peak Viewers</span>
        </div>
        <div class="recap-stat">
          <span class="recap-number">${highlights.length}</span>
          <span class="recap-label">Highlights</span>
        </div>
      </div>
      ${highlightsHtml}
    `;
    this.els.recapModal.hidden = false;
    this.els.recapModal.classList.add('recap-visible');
  }

  _hideRecap() {
    if (!this.els.recapModal) return;
    this.els.recapModal.classList.remove('recap-visible');
    setTimeout(() => { this.els.recapModal.hidden = true; }, 300);
  }

  /* ── Speech Recognition ─────────────────────────────────── */

  _setupSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      this.els.speechHint.textContent = ERROR_MESSAGES.SPEECH_UNAVAILABLE;
      return null;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    return recognition;
  }

  _startSpeech() {
    const speech = this._setupSpeechRecognition();
    if (!speech) return;
    this.state.speech = speech;
    this.state.speechRetries = 0;

    speech.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          const transcript = event.results[i][0].transcript.trim();
          if (transcript) this._scheduleComments(transcript);
        }
      }
    };

    speech.onerror = (event) => {
      if (event.error === 'not-allowed') {
        this.els.speechHint.textContent = ERROR_MESSAGES.SPEECH_DENIED;
        return;
      }
      this.els.speechHint.textContent = ERROR_MESSAGES.SPEECH_LOST;
      this.state.speechRetries += 1;
    };

    speech.onend = () => {
      if (this.state.liveStart && this.state.speech) {
        try { speech.start(); } catch (_) { /* already started */ }
      }
    };

    speech.start();
    this.els.speechHint.textContent = 'Listening — keep talking to feed the crowd.';
  }

  _stopSpeech() {
    if (this.state.speech) {
      this.state.speech.onend = null;
      this.state.speech.stop();
      this.state.speech = null;
    }
  }

  /* ── Media / Recording ──────────────────────────────────── */

  _getPreferredMimeType() {
    const candidates = [
      'video/mp4;codecs="avc1.42E01E, mp4a.40.2"',
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
    ];
    return candidates.find((type) => MediaRecorder.isTypeSupported(type));
  }

  async _startStream() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      this.state.stream = stream;
      this.els.preview.srcObject = stream;

      const mimeType = this._getPreferredMimeType();
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      this.state.mediaRecorder = recorder;
      this.state.recordedChunks = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) this.state.recordedChunks.push(event.data);
      };
      recorder.onstop = () => this._handleRecordingStop();
      recorder.start(TIMING.MEDIA_RECORDER_TIMESLICE);

      this.state.liveStart = performance.now();
      this._setLiveUI(true);
      this.els.statusLabel.textContent = 'Live and recording';
      this.els.latencyLabel.textContent = 'Low';
      this.els.startBtn.blur();

      // Start systems
      this.state.timerHandle = setInterval(() => this._updateTimer(), TIMING.TIMER_INTERVAL);
      this._updateTimer();
      this._startViewerSim();
      this._startHypeDecay();
      this._startSpeech();
      this.visualizer.connect(stream);

      if (this.state.soundEnabled) this.sound.goLive();
      this.toast.show('You are now live!', 'success');
    } catch (err) {
      this.els.statusLabel.textContent = friendlyMediaError(err);
      this.toast.show(friendlyMediaError(err), 'error');
      console.error('[HypeCam]', err);
    }
  }

  _handleRecordingStop() {
    const { mediaRecorder, recordedChunks } = this.state;
    const blob = new Blob(recordedChunks, { type: mediaRecorder.mimeType || 'video/webm' });
    const ext = blob.type.includes('mp4') ? 'mp4' : 'webm';
    const url = URL.createObjectURL(blob);
    this.els.downloadBtn.href = url;
    this.els.downloadBtn.download = `hypecam-${Date.now()}.${ext}`;
    this.els.downloadBtn.disabled = false;
    this.els.downloadBtn.setAttribute('aria-disabled', 'false');
    this.els.statusLabel.textContent = `Stream saved as .${ext.toUpperCase()} — ready to download`;
  }

  _stopStream() {
    const { mediaRecorder, stream } = this.state;
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      this.state.stream = null;
    }
    this._stopSpeech();
    this._setLiveUI(false);
    this.els.latencyLabel.textContent = '—';

    clearInterval(this.state.timerHandle);
    this.state.timerHandle = null;
    if (this.els.streamTimer) this.els.streamTimer.textContent = '00:00';

    this._stopViewerSim();
    this._stopHypeDecay();
    this.visualizer.stop();
    this.sparkline.clear();

    // Reset filter
    this._applyFilter('none');

    // Show recap
    if (this.state.commentCount > 0) {
      if (this.state.soundEnabled) this.sound.endStream();
      this._showRecap();
    }

    this.state.liveStart = null;
  }

  /* ── Demo Mode ──────────────────────────────────────────── */

  _bootDemoComments() {
    let index = 0;
    this.state.demoHandle = setInterval(() => {
      if (this.state.liveStart) return;
      this._scheduleComments(DEMO_TOPICS[index % DEMO_TOPICS.length]);
      index += 1;
    }, TIMING.DEMO_INTERVAL);
  }

  /* ── Emoji Reactions ────────────────────────────────────── */

  _handleEmojiReaction(emoji) {
    // Float multiple emojis for a burst effect
    const count = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const floater = document.createElement('span');
        floater.className = 'emoji-float';
        floater.textContent = emoji;
        floater.style.left = `${25 + Math.random() * 50}%`;
        floater.style.animationDuration = `${1.2 + Math.random() * 1}s`;
        this.els.commentStream.appendChild(floater);
        floater.addEventListener('animationend', () => floater.remove());
      }, i * 80);
    }
    if (this.state.soundEnabled) this.sound.emoji();

    // Boost hype
    this.state.hypeLevel = clamp(this.state.hypeLevel + 3, 0, TIMING.HYPE_MAX);
    this._updateHypeMeter();
  }

  /* ── Event Bindings ─────────────────────────────────────── */

  _bindEvents() {
    // Core stream controls
    this.els.startBtn.addEventListener('click', () => {
      this.els.commentStream.innerHTML = '';
      this.state.commentCount = 0;
      this.els.commentCount.textContent = '0';
      this.els.downloadBtn.disabled = true;
      this.state.highlights = [];
      this.state.lastMilestone = 0;
      if (this.els.highlightsList) this.els.highlightsList.innerHTML = '';
      this.commentEngine.recentTopics = [];
      this.commentEngine.conversationThreads = [];
      this._startStream();
    });

    this.els.stopBtn.addEventListener('click', () => this._stopStream());

    // Autoscroll detection
    this.els.commentStream.addEventListener('scroll', () => {
      const el = this.els.commentStream;
      this.state.autoscroll = el.scrollTop + el.clientHeight >= el.scrollHeight - TIMING.AUTOSCROLL_THRESHOLD;
    });

    // Download cleanup
    this.els.downloadBtn.addEventListener('click', () => {
      setTimeout(() => URL.revokeObjectURL(this.els.downloadBtn.href), TIMING.URL_REVOKE_DELAY);
    });

    // Emoji bar
    if (this.els.emojiBar) {
      this.els.emojiBar.addEventListener('click', (e) => {
        if (e.target.classList.contains('emoji-btn')) {
          this._handleEmojiReaction(e.target.textContent);
        }
      });
    }

    // Video filters
    if (this.els.filterBar) {
      this.els.filterBar.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
          this._applyFilter(e.target.dataset.filter);
        }
      });
    }

    // Highlights
    if (this.els.highlightBtn) {
      this.els.highlightBtn.addEventListener('click', () => this._addHighlight());
    }

    // Chat input
    if (this.els.chatSendBtn) {
      this.els.chatSendBtn.addEventListener('click', () => this._handleUserChat());
    }
    if (this.els.chatInput) {
      this.els.chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this._handleUserChat();
        }
      });
    }

    // Picture-in-Picture
    if (this.els.pipBtn) {
      this.els.pipBtn.addEventListener('click', () => this._togglePiP());
    }

    // Fullscreen
    if (this.els.fullscreenBtn) {
      this.els.fullscreenBtn.addEventListener('click', () => this._toggleFullscreen());
    }

    // Screenshot
    if (this.els.screenshotBtn) {
      this.els.screenshotBtn.addEventListener('click', () => this._takeScreenshot());
    }

    // Sound toggle
    if (this.els.soundToggle) {
      this.els.soundToggle.addEventListener('click', () => {
        this.state.soundEnabled = !this.state.soundEnabled;
        this.els.soundToggle.textContent = this.state.soundEnabled ? '🔊' : '🔇';
        this.els.soundToggle.setAttribute('aria-label',
          this.state.soundEnabled ? 'Mute sound effects' : 'Unmute sound effects');
      });
    }

    // Recap modal close
    if (this.els.recapClose) {
      this.els.recapClose.addEventListener('click', () => this._hideRecap());
    }
    if (this.els.recapModal) {
      this.els.recapModal.addEventListener('click', (e) => {
        if (e.target === this.els.recapModal) this._hideRecap();
      });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const noMod = !e.metaKey && !e.ctrlKey;
      if (e.key === 's' && noMod) {
        if (!this.els.startBtn.disabled) this.els.startBtn.click();
      }
      if (e.key === 'e' && noMod) {
        if (!this.els.stopBtn.disabled) this.els.stopBtn.click();
      }
      if (e.key === 'h' && noMod && this.state.liveStart) {
        this._addHighlight();
      }
      if (e.key === 'p' && noMod && this.state.liveStart) {
        this._togglePiP();
      }
      if (e.key === 'f' && noMod && this.state.liveStart) {
        this._toggleFullscreen();
      }
      if (e.key === 'c' && noMod && this.state.liveStart) {
        this._takeScreenshot();
      }
      if (e.key === 'm' && noMod) {
        if (this.els.soundToggle) this.els.soundToggle.click();
      }
      if (e.key === 'Escape') {
        this._hideRecap();
      }
    });
  }
}

/* ── Boot ──────────────────────────────────────────────────────── */

const app = new HypeCam();
