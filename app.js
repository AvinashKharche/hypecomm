/* ── Constants ─────────────────────────────────────────────────── */

const TIMING = {
  COMMENT_BASE_DELAY: 300,
  COMMENT_STAGGER: 450,
  COMMENT_JITTER: 220,
  DEMO_INTERVAL: 4000,
  MIN_LATENCY_DISPLAY: 40,
  COMMENT_BURST_MIN: 3,
  COMMENT_BURST_EXTRA: 2,
  TIMER_INTERVAL: 1000,
  VIEWER_UPDATE_INTERVAL: 3000,
  VIEWER_BASE: 12,
  VIEWER_RANGE: 30,
  VIEWER_DRIFT: 5,
  TYPING_INDICATOR_DURATION: 1800,
  URL_REVOKE_DELAY: 2000,
  AUTOSCROLL_THRESHOLD: 50,
  MEDIA_RECORDER_TIMESLICE: 200,
};

const NAME_POOL = [
  'NovaKicks', 'SkylineSam', 'PixelChaser', 'GlowEcho', 'CrispQuill',
  'AtlasWave', 'NeonDusk', 'SonicJun', 'EchoRin', 'VelvetArc',
  'CircuitMuse', 'MaruBytes', 'SiaLoops', 'HelixRay', 'LumenFox',
  'MintyRae', 'OrbitBlue', 'FableAsh', 'VioletRue', 'KairoD',
  'RheaNova', 'ByteBloom', 'ZenithRay', 'CosmicLu', 'DriftSol',
];

const EMOJI_REACTIONS = ['🔥', '💜', '👏', '✨', '💯', '🎯', '⚡', '🚀'];

const DEMO_TOPICS = [
  'sound design', 'your setup', 'story arc', 'camera confidence',
  'favorite glitch effect', 'workflow tricks', 'color grading',
  'audio mixing', 'live performance tips',
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

/* ── Comment Engine ────────────────────────────────────────────── */

class CommentEngine {
  constructor() {
    this.recentTopics = [];
    this.sentimentPool = this._buildSentimentPool();
  }

  _buildSentimentPool() {
    return {
      hype: [
        (t) => `That part about "${t}" hit different!`,
        (t) => `🔥 "${t}" — I'm vibing with this.`,
        (t) => `Saving this take on "${t}".`,
        (t) => `Never heard "${t}" framed like that before.`,
        (t) => `"${t}" is the energy we needed today!`,
        (t) => `Replaying the part about "${t}" in my head.`,
        (t) => `OK "${t}" just made my day.`,
      ],
      question: [
        (t) => `Can you dive deeper on ${t}?`,
        (t) => `Love that — what inspired ${t}?`,
        (t) => `How do you feel about ${t}?`,
        (t) => `What would you change about ${t}?`,
        (t) => `Any tips for beginners on ${t}?`,
        (t) => `Curious — why does ${t} matter right now?`,
        (t) => `Could you share a quick example of ${t} in action?`,
        (t) => `Where do you see ${t} going next?`,
      ],
      followup: [
        (t) => `What was the hardest part when you first tried ${t}?`,
        (t) => `How would you explain ${t} to a friend in 30 seconds?`,
        (t) => `"${t}" reminds me of a project I tried — any pitfalls to avoid?`,
        (t) => `What's the wildest story you have about ${t}?`,
        (t) => `Does ${t} ever clash with other parts of your workflow?`,
        (t) => `What surprised you most when learning ${t}?`,
      ],
      callback: [
        (t, prev) => `Going back to "${prev}" — how does that connect with ${t}?`,
        (t, prev) => `Wait, is ${t} related to what you said about "${prev}"?`,
        (t, prev) => `I loved the "${prev}" bit — and now ${t}? This stream is golden.`,
      ],
    };
  }

  generate(transcript) {
    const topic = transcript.trim();
    if (!topic) return null;

    const categories = ['hype', 'question', 'followup'];
    const prevTopic = this.recentTopics.length > 0 ? this.recentTopics[this.recentTopics.length - 1] : null;

    // Occasionally reference a previous topic for conversational depth
    if (prevTopic && prevTopic !== topic && Math.random() < 0.25) {
      categories.push('callback');
    }

    const category = choose(categories);
    const pool = this.sentimentPool[category];
    const fn = choose(pool);
    const text = category === 'callback' ? fn(topic, prevTopic) : fn(topic);

    this.recentTopics.push(topic);
    if (this.recentTopics.length > 10) this.recentTopics.shift();

    return { username: choose(NAME_POOL), text };
  }
}

/* ── HypeCam Application ──────────────────────────────────────── */

class HypeCam {
  constructor() {
    this.els = {
      startBtn: document.getElementById('startBtn'),
      stopBtn: document.getElementById('stopBtn'),
      downloadBtn: document.getElementById('downloadBtn'),
      preview: document.getElementById('preview'),
      liveBadge: document.getElementById('liveBadge'),
      statusLabel: document.getElementById('statusLabel'),
      latencyLabel: document.getElementById('latencyLabel'),
      commentCountLabel: document.getElementById('commentCount'),
      commentStream: document.getElementById('commentStream'),
      template: document.getElementById('commentTemplate'),
      speechHint: document.getElementById('speechHint'),
      streamTimer: document.getElementById('streamTimer'),
      viewerCount: document.getElementById('viewerCount'),
      typingIndicator: document.getElementById('typingIndicator'),
      emojiBar: document.getElementById('emojiBar'),
    };

    this.state = {
      mediaRecorder: null,
      recordedChunks: [],
      stream: null,
      speech: null,
      liveStart: null,
      commentCount: 0,
      autoscroll: true,
      viewerCount: 0,
      timerHandle: null,
      viewerHandle: null,
      demoHandle: null,
      speechRetries: 0,
    };

    this.commentEngine = new CommentEngine();
    this._bindEvents();
    this._bootDemoComments();
  }

  /* ── UI Helpers ──────────────────────────────────────────── */

  _setLiveUI(isLive) {
    const { liveBadge, statusLabel, startBtn, stopBtn } = this.els;
    liveBadge.innerHTML = `<span class="pulse"></span>${isLive ? 'LIVE' : 'OFF AIR'}`;
    liveBadge.classList.toggle('is-live', isLive);
    statusLabel.textContent = isLive ? 'On air — crowd is listening' : 'Stream ended';
    startBtn.disabled = isLive;
    stopBtn.disabled = !isLive;
  }

  _appendComment({ username, text, latency }) {
    const node = this.els.template.content.cloneNode(true);
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
    this.els.commentCountLabel.textContent = this.state.commentCount;

    if (this.state.autoscroll) {
      this.els.commentStream.scrollTop = this.els.commentStream.scrollHeight;
    }
  }

  _showTypingIndicator() {
    if (!this.els.typingIndicator) return;
    const name = choose(NAME_POOL);
    this.els.typingIndicator.textContent = `${name} is typing...`;
    this.els.typingIndicator.hidden = false;
    setTimeout(() => {
      this.els.typingIndicator.hidden = true;
    }, TIMING.TYPING_INDICATOR_DURATION);
  }

  _updateTimer() {
    if (!this.state.liveStart || !this.els.streamTimer) return;
    this.els.streamTimer.textContent = formatDuration(performance.now() - this.state.liveStart);
  }

  _startViewerSim() {
    this.state.viewerCount = TIMING.VIEWER_BASE + Math.floor(Math.random() * TIMING.VIEWER_RANGE);
    this._updateViewerDisplay();
    this.state.viewerHandle = setInterval(() => {
      const drift = Math.floor(Math.random() * TIMING.VIEWER_DRIFT * 2) - TIMING.VIEWER_DRIFT;
      this.state.viewerCount = Math.max(1, this.state.viewerCount + drift);
      this._updateViewerDisplay();
    }, TIMING.VIEWER_UPDATE_INTERVAL);
  }

  _stopViewerSim() {
    clearInterval(this.state.viewerHandle);
    this.state.viewerHandle = null;
    this.state.viewerCount = 0;
    this._updateViewerDisplay();
  }

  _updateViewerDisplay() {
    if (this.els.viewerCount) {
      this.els.viewerCount.textContent = this.state.viewerCount || '—';
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

      // Start timer
      this.state.timerHandle = setInterval(() => this._updateTimer(), TIMING.TIMER_INTERVAL);
      this._updateTimer();

      this._startViewerSim();
      this._startSpeech();
    } catch (err) {
      this.els.statusLabel.textContent = friendlyMediaError(err);
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
    this.state.liveStart = null;

    clearInterval(this.state.timerHandle);
    this.state.timerHandle = null;
    if (this.els.streamTimer) this.els.streamTimer.textContent = '00:00';

    this._stopViewerSim();
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
    const floater = document.createElement('span');
    floater.className = 'emoji-float';
    floater.textContent = emoji;
    floater.style.left = `${30 + Math.random() * 40}%`;
    this.els.commentStream.appendChild(floater);
    floater.addEventListener('animationend', () => floater.remove());
  }

  /* ── Event Bindings ─────────────────────────────────────── */

  _bindEvents() {
    this.els.startBtn.addEventListener('click', () => {
      this.els.commentStream.innerHTML = '';
      this.state.commentCount = 0;
      this.els.commentCountLabel.textContent = '0';
      this.els.downloadBtn.disabled = true;
      this.commentEngine.recentTopics = [];
      this._startStream();
    });

    this.els.stopBtn.addEventListener('click', () => this._stopStream());

    this.els.commentStream.addEventListener('scroll', () => {
      const el = this.els.commentStream;
      this.state.autoscroll = el.scrollTop + el.clientHeight >= el.scrollHeight - TIMING.AUTOSCROLL_THRESHOLD;
    });

    this.els.downloadBtn.addEventListener('click', () => {
      setTimeout(() => {
        URL.revokeObjectURL(this.els.downloadBtn.href);
      }, TIMING.URL_REVOKE_DELAY);
    });

    // Emoji bar reactions
    if (this.els.emojiBar) {
      this.els.emojiBar.addEventListener('click', (e) => {
        if (e.target.classList.contains('emoji-btn')) {
          this._handleEmojiReaction(e.target.textContent);
        }
      });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 's' && !e.metaKey && !e.ctrlKey) {
        if (!this.els.startBtn.disabled) this.els.startBtn.click();
      }
      if (e.key === 'e' && !e.metaKey && !e.ctrlKey) {
        if (!this.els.stopBtn.disabled) this.els.stopBtn.click();
      }
    });
  }
}

/* ── Boot ──────────────────────────────────────────────────────── */

const app = new HypeCam();
