/* ══════════════════════════════════════════════════════════════════
   HypeComm — Communication Skills Practice Tool
   Speak. Get feedback. Improve.
   ══════════════════════════════════════════════════════════════════ */

/* ── Topic Database ────────────────────────────────────────────── */

const TOPICS = {
  impromptu: {
    label: 'Impromptu',
    icon: '💬',
    description: 'Think on your feet — no prep time',
    topics: [
      'The most underrated skill in life',
      'Why boredom is actually good for you',
      'A technology that changed your daily routine',
      'If you could have dinner with anyone, who and why',
      'The biggest lesson you learned from a mistake',
      'Something everyone should try at least once',
      'Why first impressions are overrated',
      'A place that changed how you see the world',
      'The difference between being busy and being productive',
      'Why failure is a better teacher than success',
      'Something you believed as a child that turned out to be wrong',
      'The best advice you ever ignored',
      'A small change that made a big difference in your life',
      'Why people resist change even when it benefits them',
      'The role of luck vs hard work in success',
    ],
  },
  persuasion: {
    label: 'Persuasion',
    icon: '🎯',
    description: 'Make your case — convince the audience',
    topics: [
      'Remote work is better than office work',
      'Schools should teach financial literacy before calculus',
      'Social media does more harm than good',
      'Everyone should learn to code',
      'Physical books are better than e-books',
      'Public speaking should be required in every school',
      'AI will create more jobs than it destroys',
      'Failure should be celebrated, not stigmatized',
      'Voting should be mandatory',
      'The four-day work week should be standard',
      'Handwriting is a dying skill worth saving',
      'Gap years should be encouraged before college',
      'Creativity is more important than knowledge',
      'We should explore space instead of the ocean',
      'Minimum wage should be a living wage',
    ],
  },
  storytelling: {
    label: 'Storytelling',
    icon: '📖',
    description: 'Captivate with a narrative arc',
    topics: [
      'Tell a story about a time you overcame a fear',
      'Describe a moment that completely changed your perspective',
      'Tell the story of your most embarrassing moment',
      'Narrate a time when a stranger made your day',
      'Tell a story about the best decision you ever made',
      'Describe a moment when you felt truly proud of yourself',
      'Tell a story about a time you helped someone unexpectedly',
      'Narrate your experience learning something difficult',
      'Tell the story of a friendship that shaped who you are',
      'Describe a time when things didn\'t go as planned but worked out',
      'Tell a story about a risk that paid off',
      'Narrate a moment when you stood up for something you believed in',
      'Tell the story of your favorite childhood memory',
      'Describe a time you had to make a tough choice quickly',
      'Tell a story about a lesson you learned the hard way',
    ],
  },
  elevator: {
    label: 'Elevator Pitch',
    icon: '🚀',
    description: 'Sell your idea in 30–60 seconds',
    topics: [
      'Pitch an app that helps people manage their time better',
      'Pitch yourself for your dream job in 30 seconds',
      'Pitch a startup that solves a problem you face daily',
      'Sell the idea of learning a new language to a skeptic',
      'Pitch a community project that would improve your neighborhood',
      'Sell the concept of mentorship to a busy executive',
      'Pitch a product that makes cooking easier for beginners',
      'Pitch why someone should read your favorite book',
      'Sell the idea of a digital detox weekend retreat',
      'Pitch a subscription box for learning new skills',
      'Sell the importance of sleep to a workaholic',
      'Pitch a tool that helps introverts network more easily',
    ],
  },
  debate: {
    label: 'Debate',
    icon: '⚔️',
    description: 'Argue both sides — strengthen your logic',
    topics: [
      'Is it better to be a specialist or a generalist?',
      'Should college education be free for everyone?',
      'Is social media connecting or isolating us?',
      'Should companies be allowed to monitor employee activity?',
      'Is it ethical to use AI to write essays and reports?',
      'Should there be limits on free speech online?',
      'Is competition or collaboration more effective?',
      'Should self-driving cars prioritize passengers or pedestrians?',
      'Is privacy more important than security?',
      'Should parents limit children\'s screen time?',
      'Is it better to save money or invest it?',
      'Should art be funded by the government?',
    ],
  },
  explanation: {
    label: 'Explain It',
    icon: '🧠',
    description: 'Break down a complex idea simply',
    topics: [
      'Explain how the internet works to a 10-year-old',
      'Explain why the sky is blue in an engaging way',
      'Explain the concept of inflation to someone who\'s never heard of it',
      'Explain how a search engine decides what to show you',
      'Explain why we dream',
      'Explain how vaccines work without using jargon',
      'Explain the concept of compound interest to a teenager',
      'Explain how electricity reaches your home',
      'Explain why time seems to move faster as you get older',
      'Explain the difference between weather and climate',
      'Explain how a habit forms in your brain',
      'Explain why some songs get stuck in your head',
    ],
  },
};

const PRACTICE_MODES = {
  quick:   { label: 'Quick Fire',    duration: 30,  icon: '⚡' },
  short:   { label: 'Short Talk',    duration: 60,  icon: '💬' },
  medium:  { label: 'Presentation',  duration: 120, icon: '🎤' },
  long:    { label: 'Deep Dive',     duration: 300, icon: '🎯' },
  free:    { label: 'Free Practice', duration: 0,   icon: '♾️' },
};

const FILLER_WORDS = ['um', 'uh', 'uhh', 'umm', 'like', 'you know', 'basically',
  'actually', 'literally', 'so', 'right', 'i mean', 'kind of', 'sort of',
  'you see', 'well', 'okay so', 'honestly'];

const AUDIENCE_NAMES = [
  'NovaKicks', 'SkylineSam', 'PixelChaser', 'GlowEcho', 'CrispQuill',
  'AtlasWave', 'NeonDusk', 'SonicJun', 'EchoRin', 'VelvetArc',
  'CircuitMuse', 'MaruBytes', 'SiaLoops', 'HelixRay', 'LumenFox',
  'MintyRae', 'OrbitBlue', 'FableAsh', 'VioletRue', 'KairoD',
];

const TIMING = {
  COMMENT_BASE_DELAY: 400,
  COMMENT_STAGGER: 500,
  COMMENT_JITTER: 300,
  COMMENT_BURST_MIN: 2,
  COMMENT_BURST_EXTRA: 2,
  ENGAGEMENT_DECAY_INTERVAL: 800,
  ENGAGEMENT_DECAY_RATE: 1.5,
  ENGAGEMENT_PER_COMMENT: 6,
  ENGAGEMENT_MAX: 100,
  TOAST_DURATION: 4000,
  COUNTDOWN_BEEP_START: 5,
};

const ERROR_MESSAGES = {
  PERMISSION_DENIED: 'Camera or mic permission denied. Please allow access and try again.',
  NOT_FOUND: 'No camera or microphone found. Please connect a device.',
  NOT_READABLE: 'Camera or mic is in use by another app.',
  OVERCONSTRAINED: 'Camera does not support the requested settings.',
  GENERIC_MEDIA: 'Could not access camera or microphone.',
  SPEECH_UNAVAILABLE: 'Speech recognition not available in this browser.',
  SPEECH_LOST: 'Speech recognition interrupted — retrying...',
  SPEECH_DENIED: 'Microphone access denied for speech recognition.',
};

/* ── Utilities ─────────────────────────────────────────────────── */

function choose(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

function isoTime() {
  return new Intl.DateTimeFormat([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date());
}

function formatDuration(ms) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(m)}:${pad(sec)}`;
}

function friendlyMediaError(err) {
  if (err.name === 'NotAllowedError') return ERROR_MESSAGES.PERMISSION_DENIED;
  if (err.name === 'NotFoundError') return ERROR_MESSAGES.NOT_FOUND;
  if (err.name === 'NotReadableError') return ERROR_MESSAGES.NOT_READABLE;
  if (err.name === 'OverconstrainedError') return ERROR_MESSAGES.OVERCONSTRAINED;
  return ERROR_MESSAGES.GENERIC_MEDIA;
}

/* ── Speech Analyzer ───────────────────────────────────────────── */

class SpeechAnalyzer {
  constructor() {
    this.reset();
  }

  reset() {
    this.transcripts = [];
    this.wordTimestamps = [];
    this.fillerCounts = {};
    this.totalWords = 0;
    this.startTime = null;
    this.pauseCount = 0;
    this.lastSpeechTime = null;
    this.longestPause = 0;
  }

  start() {
    this.reset();
    this.startTime = performance.now();
    this.lastSpeechTime = this.startTime;
  }

  addTranscript(text) {
    const now = performance.now();
    if (this.lastSpeechTime) {
      const gap = now - this.lastSpeechTime;
      if (gap > 2000) {
        this.pauseCount += 1;
        if (gap > this.longestPause) this.longestPause = gap;
      }
    }
    this.lastSpeechTime = now;
    this.transcripts.push({ text, time: now });

    const words = text.toLowerCase().split(/\s+/).filter(Boolean);
    this.totalWords += words.length;
    this.wordTimestamps.push({ count: words.length, time: now });

    // Count filler words
    const joined = text.toLowerCase();
    for (const filler of FILLER_WORDS) {
      const regex = new RegExp(`\\b${filler}\\b`, 'gi');
      const matches = joined.match(regex);
      if (matches) {
        this.fillerCounts[filler] = (this.fillerCounts[filler] || 0) + matches.length;
      }
    }
  }

  getReport() {
    const elapsed = this.startTime ? (performance.now() - this.startTime) / 1000 : 0;
    const minutes = elapsed / 60;
    const wpm = minutes > 0 ? Math.round(this.totalWords / minutes) : 0;
    const totalFillers = Object.values(this.fillerCounts).reduce((a, b) => a + b, 0);
    const fillerRate = this.totalWords > 0
      ? Math.round((totalFillers / this.totalWords) * 100)
      : 0;

    // Score calculations (0-100 each)
    const paceScore = this._scorePace(wpm);
    const fillerScore = this._scoreFillers(fillerRate);
    const fluencyScore = this._scoreFluency();
    const overallScore = Math.round((paceScore + fillerScore + fluencyScore) / 3);

    // Sort fillers by count descending
    const topFillers = Object.entries(this.fillerCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return {
      duration: Math.round(elapsed),
      totalWords: this.totalWords,
      wpm,
      totalFillers,
      fillerRate,
      topFillers,
      pauseCount: this.pauseCount,
      longestPause: Math.round(this.longestPause / 1000),
      paceScore,
      fillerScore,
      fluencyScore,
      overallScore,
      fullTranscript: this.transcripts.map((t) => t.text).join(' '),
    };
  }

  _scorePace(wpm) {
    // Ideal: 130-160 WPM. Penalize < 100 or > 180
    if (wpm === 0) return 0;
    if (wpm >= 130 && wpm <= 160) return 100;
    if (wpm >= 110 && wpm <= 180) return 80;
    if (wpm >= 90 && wpm <= 200) return 60;
    return 40;
  }

  _scoreFillers(fillerRate) {
    // 0% fillers = 100, >10% = 30
    if (fillerRate === 0) return 100;
    if (fillerRate <= 2) return 90;
    if (fillerRate <= 5) return 70;
    if (fillerRate <= 8) return 50;
    return 30;
  }

  _scoreFluency() {
    // Based on pause frequency — fewer long pauses = better
    if (this.pauseCount === 0) return 100;
    if (this.pauseCount <= 2) return 85;
    if (this.pauseCount <= 5) return 65;
    return 40;
  }
}

/* ── Audience Comment Engine ───────────────────────────────────── */

class AudienceEngine {
  constructor() {
    this.recentTopics = [];
  }

  generate(transcript, category) {
    const topic = transcript.trim();
    if (!topic) return null;

    const templates = this._getTemplates(category);
    const text = choose(templates)(topic);
    const username = choose(AUDIENCE_NAMES);

    this.recentTopics.push(topic);
    if (this.recentTopics.length > 8) this.recentTopics.shift();

    return { username, text };
  }

  _getTemplates(category) {
    const base = {
      engaged: [
        (t) => `Great point about "${t}"!`,
        (t) => `"${t}" — that resonates with me`,
        (t) => `Really interesting take on ${t}`,
        (t) => `I never thought about "${t}" that way`,
        (t) => `"${t}" is such a compelling argument`,
      ],
      curious: [
        (t) => `Can you elaborate on ${t}?`,
        (t) => `How does ${t} connect to the bigger picture?`,
        (t) => `What evidence supports ${t}?`,
        (t) => `Interesting — what about the counterargument to ${t}?`,
        (t) => `Could you give an example of ${t}?`,
      ],
      supportive: [
        (t) => `Love how you explained ${t} — very clear`,
        (t) => `Your passion for ${t} really comes through`,
        (t) => `Great delivery on the "${t}" section`,
        (t) => `You're making ${t} easy to understand`,
        (t) => `The way you structured the ${t} point was spot on`,
      ],
      constructive: [
        (t) => `Maybe slow down a bit on ${t} for emphasis`,
        (t) => `Could you use a concrete example for ${t}?`,
        (t) => `Try pausing after "${t}" to let it land`,
        (t) => `The ${t} point is strong — project your voice more`,
        (t) => `Consider making eye contact when discussing ${t}`,
      ],
    };

    // Category-specific audience templates
    const categorySpecific = {
      persuasion: [
        (t) => `Strong argument! But what about the other side of ${t}?`,
        (t) => `I'm almost convinced about ${t} — need one more example`,
        (t) => `Your evidence for ${t} is compelling`,
      ],
      storytelling: [
        (t) => `I'm hooked — what happened next with ${t}?`,
        (t) => `The way you described "${t}" was so vivid`,
        (t) => `Great tension building around ${t}`,
      ],
      elevator: [
        (t) => `You had me at "${t}" — great hook!`,
        (t) => `Clear value prop with ${t}`,
        (t) => `Would invest based on the ${t} angle`,
      ],
      debate: [
        (t) => `Devil's advocate: what if ${t} isn't true?`,
        (t) => `Strong logic on ${t} — hard to counter`,
        (t) => `Your ${t} rebuttal was razor sharp`,
      ],
      explanation: [
        (t) => `Oh! ${t} finally makes sense now`,
        (t) => `Great analogy for ${t}`,
        (t) => `Even my grandma would understand ${t} after that`,
      ],
    };

    const pool = [...base.engaged, ...base.curious, ...base.supportive, ...base.constructive];
    if (category && categorySpecific[category]) {
      pool.push(...categorySpecific[category]);
    }
    return pool;
  }
}

/* ── Sound Engine ──────────────────────────────────────────────── */

class SoundEngine {
  constructor() { this._ctx = null; }

  _ensureContext() {
    if (!this._ctx) this._ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (this._ctx.state === 'suspended') this._ctx.resume();
    return this._ctx;
  }

  _playTone(freq, dur, type = 'sine', vol = 0.12) {
    try {
      const ctx = this._ensureContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + dur);
    } catch (_) { /* Audio unavailable */ }
  }

  start() { this._playTone(523, 0.15); setTimeout(() => this._playTone(659, 0.12), 100); }
  countdownBeep() { this._playTone(880, 0.08); }
  countdownFinal() { this._playTone(523, 0.3); setTimeout(() => this._playTone(784, 0.2), 150); }
  complete() { this._playTone(523, 0.12); setTimeout(() => this._playTone(659, 0.12), 100); setTimeout(() => this._playTone(784, 0.15), 200); }
  comment() { this._playTone(660, 0.05, 'sine', 0.04); }
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
    } catch (_) { /* Audio context unavailable */ }
  }

  _draw() {
    if (!this.analyser) return;
    this.animFrame = requestAnimationFrame(() => this._draw());
    const { canvas, ctx, analyser, dataArray } = this;
    canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
    canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
    const w = canvas.width, h = canvas.height;
    analyser.getByteFrequencyData(dataArray);
    ctx.clearRect(0, 0, w, h);
    const barCount = dataArray.length;
    const barWidth = w / barCount;
    const gradient = ctx.createLinearGradient(0, h, 0, 0);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.6)');
    gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.6)');
    gradient.addColorStop(1, 'rgba(236, 72, 153, 0.6)');
    for (let i = 0; i < barCount; i++) {
      const barH = (dataArray[i] / 255) * h;
      ctx.fillStyle = gradient;
      ctx.fillRect(i * barWidth, h - barH, barWidth - 1, barH);
    }
  }

  stop() {
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
    this.animFrame = null;
    if (this.canvas) this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.analyser = null;
  }
}

/* ── Toast Notifications ───────────────────────────────────────── */

class ToastManager {
  constructor(container) { this.container = container; }

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

/* ── Progress Store (localStorage) ─────────────────────────────── */

class ProgressStore {
  constructor() {
    this.key = 'hypecomm_progress';
  }

  _load() {
    try {
      return JSON.parse(localStorage.getItem(this.key)) || this._default();
    } catch (_) {
      return this._default();
    }
  }

  _save(data) {
    try { localStorage.setItem(this.key, JSON.stringify(data)); } catch (_) { /* Storage full */ }
  }

  _default() {
    return {
      sessions: [],
      totalSessions: 0,
      currentStreak: 0,
      bestStreak: 0,
      lastPracticeDate: null,
      personalBests: { overallScore: 0, wpm: 0, lowestFillerRate: 100 },
    };
  }

  addSession(report, category, mode) {
    const data = this._load();
    const session = {
      date: new Date().toISOString(),
      category,
      mode,
      duration: report.duration,
      totalWords: report.totalWords,
      wpm: report.wpm,
      fillerRate: report.fillerRate,
      overallScore: report.overallScore,
      paceScore: report.paceScore,
      fillerScore: report.fillerScore,
      fluencyScore: report.fluencyScore,
    };
    data.sessions.push(session);
    if (data.sessions.length > 100) data.sessions = data.sessions.slice(-100);
    data.totalSessions += 1;

    // Streak logic
    const today = new Date().toDateString();
    const lastDate = data.lastPracticeDate;
    if (lastDate) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (lastDate === today) {
        // Same day, streak continues
      } else if (lastDate === yesterday) {
        data.currentStreak += 1;
      } else {
        data.currentStreak = 1;
      }
    } else {
      data.currentStreak = 1;
    }
    data.lastPracticeDate = today;
    if (data.currentStreak > data.bestStreak) data.bestStreak = data.currentStreak;

    // Personal bests
    if (report.overallScore > data.personalBests.overallScore) {
      data.personalBests.overallScore = report.overallScore;
    }
    if (report.wpm > data.personalBests.wpm) {
      data.personalBests.wpm = report.wpm;
    }
    if (report.fillerRate < data.personalBests.lowestFillerRate) {
      data.personalBests.lowestFillerRate = report.fillerRate;
    }

    this._save(data);
    return data;
  }

  getProgress() { return this._load(); }

  getRecentScores(n = 10) {
    const data = this._load();
    return data.sessions.slice(-n).map((s) => s.overallScore);
  }
}

/* ══════════════════════════════════════════════════════════════════
   HypeComm Application
   ══════════════════════════════════════════════════════════════════ */

class HypeComm {
  constructor() {
    this.els = this._queryElements();
    this.state = {
      phase: 'setup', // setup | countdown | speaking | feedback
      stream: null,
      speech: null,
      selectedCategory: null,
      selectedMode: null,
      currentTopic: null,
      timeRemaining: 0,
      timerHandle: null,
      engagementLevel: 0,
      engagementHandle: null,
      commentCount: 0,
      soundEnabled: true,
    };

    this.analyzer = new SpeechAnalyzer();
    this.audience = new AudienceEngine();
    this.sound = new SoundEngine();
    this.toast = new ToastManager(this.els.toastContainer);
    this.progress = new ProgressStore();
    this.visualizer = new AudioVisualizer(this.els.visualizerCanvas);

    this._renderTopicCategories();
    this._renderPracticeModes();
    this._renderProgressDashboard();
    this._bindEvents();
  }

  _queryElements() {
    const ids = [
      'topicGrid', 'modeGrid', 'topicDisplay', 'topicText', 'topicCategory',
      'startBtn', 'stopBtn', 'newTopicBtn', 'timerDisplay', 'timerBar',
      'timerBarFill', 'preview', 'visualizerCanvas', 'commentStream',
      'commentTemplate', 'commentCount', 'engagementFill', 'engagementLabel',
      'speechStatus', 'statusLabel', 'toastContainer', 'soundToggle',
      'feedbackModal', 'feedbackContent', 'feedbackClose', 'feedbackPracticeAgain',
      'progressPanel', 'totalSessions', 'currentStreak', 'bestScore',
      'recentScores', 'setupPhase', 'practicePhase',
    ];
    const els = {};
    ids.forEach((id) => { els[id] = document.getElementById(id); });
    return els;
  }

  /* ── Render Setup ───────────────────────────────────────── */

  _renderTopicCategories() {
    if (!this.els.topicGrid) return;
    this.els.topicGrid.innerHTML = '';
    Object.entries(TOPICS).forEach(([key, cat]) => {
      const btn = document.createElement('button');
      btn.className = 'category-card';
      btn.dataset.category = key;
      btn.innerHTML = `
        <span class="category-icon">${cat.icon}</span>
        <span class="category-label">${cat.label}</span>
        <span class="category-desc">${cat.description}</span>
      `;
      this.els.topicGrid.appendChild(btn);
    });
  }

  _renderPracticeModes() {
    if (!this.els.modeGrid) return;
    this.els.modeGrid.innerHTML = '';
    Object.entries(PRACTICE_MODES).forEach(([key, mode]) => {
      const btn = document.createElement('button');
      btn.className = 'mode-card';
      btn.dataset.mode = key;
      const dur = mode.duration > 0 ? `${mode.duration}s` : 'No limit';
      btn.innerHTML = `
        <span class="mode-icon">${mode.icon}</span>
        <span class="mode-label">${mode.label}</span>
        <span class="mode-dur">${dur}</span>
      `;
      this.els.modeGrid.appendChild(btn);
    });
  }

  _renderProgressDashboard() {
    const data = this.progress.getProgress();
    if (this.els.totalSessions) this.els.totalSessions.textContent = data.totalSessions;
    if (this.els.currentStreak) this.els.currentStreak.textContent = `${data.currentStreak} day${data.currentStreak !== 1 ? 's' : ''}`;
    if (this.els.bestScore) this.els.bestScore.textContent = data.personalBests.overallScore || '—';

    // Recent scores mini chart
    if (this.els.recentScores) {
      const scores = this.progress.getRecentScores(10);
      if (scores.length > 0) {
        this.els.recentScores.innerHTML = scores.map((s) => {
          const height = Math.max(4, s);
          const color = s >= 80 ? 'var(--success)' : s >= 60 ? 'var(--warning)' : 'var(--accent)';
          return `<div class="score-bar" style="height:${height}%;background:${color}" title="${s}%"></div>`;
        }).join('');
      } else {
        this.els.recentScores.innerHTML = '<span class="no-data">No sessions yet</span>';
      }
    }
  }

  /* ── Topic Selection ────────────────────────────────────── */

  _selectCategory(key) {
    this.state.selectedCategory = key;
    this.els.topicGrid.querySelectorAll('.category-card').forEach((c) => {
      c.classList.toggle('selected', c.dataset.category === key);
    });
    this._pickRandomTopic();
    this._updateStartButton();
  }

  _selectMode(key) {
    this.state.selectedMode = key;
    this.els.modeGrid.querySelectorAll('.mode-card').forEach((c) => {
      c.classList.toggle('selected', c.dataset.mode === key);
    });
    this._updateStartButton();
  }

  _pickRandomTopic() {
    const cat = TOPICS[this.state.selectedCategory];
    if (!cat) return;
    this.state.currentTopic = choose(cat.topics);
    if (this.els.topicText) this.els.topicText.textContent = this.state.currentTopic;
    if (this.els.topicCategory) this.els.topicCategory.textContent = `${cat.icon} ${cat.label}`;
    if (this.els.topicDisplay) this.els.topicDisplay.hidden = false;
  }

  _updateStartButton() {
    if (this.els.startBtn) {
      this.els.startBtn.disabled = !(this.state.selectedCategory && this.state.selectedMode);
    }
  }

  /* ── Practice Flow ──────────────────────────────────────── */

  async _startPractice() {
    // Get camera/mic
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      this.state.stream = stream;
      this.els.preview.srcObject = stream;
      this.visualizer.connect(stream);
    } catch (err) {
      this.toast.show(friendlyMediaError(err), 'error');
      return;
    }

    // Switch to practice phase
    this.state.phase = 'countdown';
    if (this.els.setupPhase) this.els.setupPhase.hidden = true;
    if (this.els.practicePhase) this.els.practicePhase.hidden = false;

    // Countdown 3-2-1
    await this._countdown(3);

    // Start speaking phase
    this.state.phase = 'speaking';
    this.analyzer.start();
    this._startSpeech();
    this._startTimer();
    this._startEngagementDecay();

    this.els.stopBtn.disabled = false;
    this.els.statusLabel.textContent = 'Speaking — your audience is listening';
    if (this.state.soundEnabled) this.sound.start();
    this.toast.show('Go! Your audience is listening.', 'success');
  }

  async _countdown(seconds) {
    return new Promise((resolve) => {
      let count = seconds;
      if (this.els.timerDisplay) this.els.timerDisplay.textContent = count;
      if (this.els.statusLabel) this.els.statusLabel.textContent = 'Get ready...';

      const tick = setInterval(() => {
        count -= 1;
        if (this.state.soundEnabled) this.sound.countdownBeep();
        if (count > 0) {
          if (this.els.timerDisplay) this.els.timerDisplay.textContent = count;
        } else {
          clearInterval(tick);
          if (this.els.timerDisplay) this.els.timerDisplay.textContent = '';
          resolve();
        }
      }, 1000);
    });
  }

  _startTimer() {
    const mode = PRACTICE_MODES[this.state.selectedMode];
    if (!mode || mode.duration === 0) {
      // Free practice — count up
      this.state.timeRemaining = 0;
      let elapsed = 0;
      this.state.timerHandle = setInterval(() => {
        elapsed += 1;
        if (this.els.timerDisplay) this.els.timerDisplay.textContent = formatDuration(elapsed * 1000);
      }, 1000);
      return;
    }

    this.state.timeRemaining = mode.duration;
    if (this.els.timerDisplay) this.els.timerDisplay.textContent = formatDuration(mode.duration * 1000);
    if (this.els.timerBarFill) this.els.timerBarFill.style.width = '100%';

    this.state.timerHandle = setInterval(() => {
      this.state.timeRemaining -= 1;
      const remaining = this.state.timeRemaining;
      if (this.els.timerDisplay) this.els.timerDisplay.textContent = formatDuration(remaining * 1000);

      // Progress bar
      if (this.els.timerBarFill) {
        const pct = (remaining / mode.duration) * 100;
        this.els.timerBarFill.style.width = `${pct}%`;
        if (pct < 20) this.els.timerBarFill.classList.add('timer-warning');
      }

      // Countdown beeps in last 5 seconds
      if (remaining <= TIMING.COUNTDOWN_BEEP_START && remaining > 0 && this.state.soundEnabled) {
        this.sound.countdownBeep();
      }

      if (remaining <= 0) {
        if (this.state.soundEnabled) this.sound.complete();
        this._endPractice();
      }
    }, 1000);
  }

  _endPractice() {
    this.state.phase = 'feedback';

    // Stop timer
    clearInterval(this.state.timerHandle);
    this.state.timerHandle = null;

    // Stop speech
    this._stopSpeech();

    // Stop engagement decay
    clearInterval(this.state.engagementHandle);
    this.state.engagementHandle = null;

    // Stop camera
    if (this.state.stream) {
      this.state.stream.getTracks().forEach((t) => t.stop());
      this.state.stream = null;
    }
    this.visualizer.stop();

    // Generate report
    const report = this.analyzer.getReport();

    // Save to progress
    this.progress.addSession(report, this.state.selectedCategory, this.state.selectedMode);

    // Show feedback
    this._showFeedback(report);
    this.els.statusLabel.textContent = 'Practice complete — review your feedback';
    this.els.stopBtn.disabled = true;
  }

  /* ── Feedback Modal ─────────────────────────────────────── */

  _showFeedback(report) {
    if (!this.els.feedbackModal || !this.els.feedbackContent) return;

    const scoreColor = (s) => s >= 80 ? 'var(--success)' : s >= 60 ? 'var(--warning)' : 'var(--accent)';
    const paceLabel = report.wpm === 0 ? 'No speech detected' :
      report.wpm < 100 ? 'Too slow — try to pick up the pace' :
      report.wpm <= 160 ? 'Great pace!' :
      'A bit fast — try slowing down for clarity';

    const fillerList = report.topFillers.length > 0
      ? report.topFillers.map(([word, count]) =>
        `<span class="filler-tag">"${word}" x${count}</span>`).join(' ')
      : '<span class="filler-none">No filler words detected!</span>';

    this.els.feedbackContent.innerHTML = `
      <div class="score-hero">
        <div class="score-circle" style="--score-color:${scoreColor(report.overallScore)}">
          <span class="score-value">${report.overallScore}</span>
          <span class="score-label">Overall</span>
        </div>
      </div>

      <div class="score-breakdown">
        <div class="score-item">
          <span class="score-item-label">Pace</span>
          <div class="score-item-bar"><div class="score-item-fill" style="width:${report.paceScore}%;background:${scoreColor(report.paceScore)}"></div></div>
          <span class="score-item-value">${report.paceScore}</span>
        </div>
        <div class="score-item">
          <span class="score-item-label">Clarity</span>
          <div class="score-item-bar"><div class="score-item-fill" style="width:${report.fillerScore}%;background:${scoreColor(report.fillerScore)}"></div></div>
          <span class="score-item-value">${report.fillerScore}</span>
        </div>
        <div class="score-item">
          <span class="score-item-label">Fluency</span>
          <div class="score-item-bar"><div class="score-item-fill" style="width:${report.fluencyScore}%;background:${scoreColor(report.fluencyScore)}"></div></div>
          <span class="score-item-value">${report.fluencyScore}</span>
        </div>
      </div>

      <div class="feedback-stats">
        <div class="fb-stat"><span class="fb-num">${report.totalWords}</span><span class="fb-label">Words</span></div>
        <div class="fb-stat"><span class="fb-num">${report.wpm}</span><span class="fb-label">WPM</span></div>
        <div class="fb-stat"><span class="fb-num">${formatDuration(report.duration * 1000)}</span><span class="fb-label">Duration</span></div>
        <div class="fb-stat"><span class="fb-num">${report.pauseCount}</span><span class="fb-label">Pauses</span></div>
      </div>

      <div class="feedback-section">
        <h4>Pace</h4>
        <p>${paceLabel}</p>
      </div>

      <div class="feedback-section">
        <h4>Filler Words (${report.totalFillers} total — ${report.fillerRate}% of speech)</h4>
        <div class="filler-tags">${fillerList}</div>
      </div>

      ${report.fullTranscript ? `
      <div class="feedback-section">
        <h4>What You Said</h4>
        <p class="transcript-text">${report.fullTranscript}</p>
      </div>` : ''}
    `;

    this.els.feedbackModal.hidden = false;
    this.els.feedbackModal.classList.add('modal-visible');
  }

  _hideFeedback() {
    if (!this.els.feedbackModal) return;
    this.els.feedbackModal.classList.remove('modal-visible');
    setTimeout(() => { this.els.feedbackModal.hidden = true; }, 300);
  }

  _returnToSetup() {
    this._hideFeedback();
    this.state.phase = 'setup';
    this.state.commentCount = 0;
    this.state.engagementLevel = 0;
    if (this.els.commentStream) this.els.commentStream.innerHTML = '';
    if (this.els.commentCount) this.els.commentCount.textContent = '0';
    if (this.els.engagementFill) this.els.engagementFill.style.width = '0%';
    if (this.els.engagementLabel) this.els.engagementLabel.textContent = 'Waiting 0%';
    if (this.els.timerBarFill) {
      this.els.timerBarFill.style.width = '0%';
      this.els.timerBarFill.classList.remove('timer-warning');
    }
    if (this.els.setupPhase) this.els.setupPhase.hidden = false;
    if (this.els.practicePhase) this.els.practicePhase.hidden = true;
    this._renderProgressDashboard();
    this._pickRandomTopic();
  }

  /* ── Speech Recognition ─────────────────────────────────── */

  _startSpeech() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      if (this.els.speechStatus) this.els.speechStatus.textContent = ERROR_MESSAGES.SPEECH_UNAVAILABLE;
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    this.state.speech = recognition;

    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          const transcript = event.results[i][0].transcript.trim();
          if (transcript) {
            this.analyzer.addTranscript(transcript);
            this._scheduleAudienceComments(transcript);
          }
        }
      }
    };

    recognition.onerror = (event) => {
      if (event.error === 'not-allowed') {
        if (this.els.speechStatus) this.els.speechStatus.textContent = ERROR_MESSAGES.SPEECH_DENIED;
        return;
      }
      if (this.els.speechStatus) this.els.speechStatus.textContent = ERROR_MESSAGES.SPEECH_LOST;
    };

    recognition.onend = () => {
      if (this.state.phase === 'speaking' && this.state.speech) {
        try { recognition.start(); } catch (_) { /* already started */ }
      }
    };

    recognition.start();
    if (this.els.speechStatus) this.els.speechStatus.textContent = 'Listening...';
  }

  _stopSpeech() {
    if (this.state.speech) {
      this.state.speech.onend = null;
      this.state.speech.stop();
      this.state.speech = null;
    }
  }

  /* ── Audience Comments ──────────────────────────────────── */

  _scheduleAudienceComments(transcript) {
    const bursts = TIMING.COMMENT_BURST_MIN + Math.floor(Math.random() * TIMING.COMMENT_BURST_EXTRA);
    const now = performance.now();

    for (let i = 0; i < bursts; i++) {
      const delay = TIMING.COMMENT_BASE_DELAY + i * TIMING.COMMENT_STAGGER + Math.random() * TIMING.COMMENT_JITTER;
      setTimeout(() => {
        if (this.state.phase !== 'speaking') return;
        const entry = this.audience.generate(transcript, this.state.selectedCategory);
        if (!entry) return;
        const latency = Math.max(40, Math.round(performance.now() - now));
        this._appendComment({ ...entry, latency });
      }, delay);
    }
  }

  _appendComment({ username, text, latency }) {
    if (!this.els.commentTemplate) return;
    const node = this.els.commentTemplate.content.cloneNode(true);
    node.querySelector('.username').textContent = username;
    node.querySelector('.timestamp').textContent = `${isoTime()} • ${latency}ms`;
    node.querySelector('.body').textContent = text;

    const colorSeed = username.charCodeAt(0) + username.charCodeAt(username.length - 1);
    const hue = (colorSeed * 13) % 360;
    node.querySelector('.avatar').textContent = username.charAt(0).toUpperCase();
    node.querySelector('.avatar').style.background =
      `linear-gradient(135deg, hsl(${hue} 85% 60%), hsl(${(hue + 60) % 360} 90% 55%))`;

    this.els.commentStream.appendChild(node);
    this.state.commentCount += 1;
    if (this.els.commentCount) this.els.commentCount.textContent = this.state.commentCount;

    // Engagement boost
    this.state.engagementLevel = clamp(
      this.state.engagementLevel + TIMING.ENGAGEMENT_PER_COMMENT, 0, TIMING.ENGAGEMENT_MAX);
    this._updateEngagement();

    if (this.state.soundEnabled) this.sound.comment();

    this.els.commentStream.scrollTop = this.els.commentStream.scrollHeight;
  }

  /* ── Engagement Meter ───────────────────────────────────── */

  _startEngagementDecay() {
    this.state.engagementHandle = setInterval(() => {
      if (this.state.engagementLevel > 0) {
        this.state.engagementLevel = Math.max(0,
          this.state.engagementLevel - TIMING.ENGAGEMENT_DECAY_RATE);
        this._updateEngagement();
      }
    }, TIMING.ENGAGEMENT_DECAY_INTERVAL);
  }

  _updateEngagement() {
    const pct = Math.round(this.state.engagementLevel);
    if (this.els.engagementFill) this.els.engagementFill.style.width = `${pct}%`;
    if (this.els.engagementLabel) {
      let label;
      if (pct < 20) label = 'Quiet';
      else if (pct < 40) label = 'Interested';
      else if (pct < 60) label = 'Engaged';
      else if (pct < 80) label = 'Excited';
      else label = 'Captivated!';
      this.els.engagementLabel.textContent = `${label} ${pct}%`;
    }
  }

  /* ── Event Bindings ─────────────────────────────────────── */

  _bindEvents() {
    // Category selection
    if (this.els.topicGrid) {
      this.els.topicGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.category-card');
        if (card) this._selectCategory(card.dataset.category);
      });
    }

    // Mode selection
    if (this.els.modeGrid) {
      this.els.modeGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.mode-card');
        if (card) this._selectMode(card.dataset.mode);
      });
    }

    // New topic button
    if (this.els.newTopicBtn) {
      this.els.newTopicBtn.addEventListener('click', () => this._pickRandomTopic());
    }

    // Start
    if (this.els.startBtn) {
      this.els.startBtn.addEventListener('click', () => this._startPractice());
    }

    // Stop early
    if (this.els.stopBtn) {
      this.els.stopBtn.addEventListener('click', () => {
        if (this.state.phase === 'speaking') this._endPractice();
      });
    }

    // Feedback modal
    if (this.els.feedbackClose) {
      this.els.feedbackClose.addEventListener('click', () => this._returnToSetup());
    }
    if (this.els.feedbackPracticeAgain) {
      this.els.feedbackPracticeAgain.addEventListener('click', () => this._returnToSetup());
    }
    if (this.els.feedbackModal) {
      this.els.feedbackModal.addEventListener('click', (e) => {
        if (e.target === this.els.feedbackModal) this._returnToSetup();
      });
    }

    // Sound toggle
    if (this.els.soundToggle) {
      this.els.soundToggle.addEventListener('click', () => {
        this.state.soundEnabled = !this.state.soundEnabled;
        this.els.soundToggle.textContent = this.state.soundEnabled ? '🔊' : '🔇';
      });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'Escape') this._returnToSetup();
      if (e.key === 'n' && this.state.phase === 'setup') this._pickRandomTopic();
    });
  }
}

/* ── Boot ──────────────────────────────────────────────────────── */

const app = new HypeComm();
