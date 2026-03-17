# HypeComm

A communication skills practice tool. Pick a topic, speak on camera, and get real-time AI audience reactions plus a performance scorecard analyzing your pace, filler words, and fluency. Everything runs client-side — no server, no dependencies, no build step.

## How It Works

1. **Choose a topic category** — Impromptu, Persuasion, Storytelling, Elevator Pitch, Debate, or Explain It
2. **Choose a time mode** — Quick Fire (30s), Short Talk (60s), Presentation (2min), Deep Dive (5min), or Free Practice
3. **See your topic** and shuffle for a new one if you want
4. **Start practicing** — the app accesses your camera and mic, counts you down 3-2-1, then you speak
5. **Get live audience reactions** — AI audience members comment on what you're saying in real time
6. **Review your scorecard** — after time's up (or you stop early), see your Overall Score with breakdowns for Pace, Clarity, and Fluency

## Features

### Topic Database
- **6 categories** with 12-15 topics each (~80 total)
- Impromptu, Persuasion, Storytelling, Elevator Pitch, Debate, Explain It
- Shuffle for a random topic within your category

### Speech Analysis
- **Words per minute (WPM)** — ideal range 130-160 WPM
- **Filler word detection** — tracks "um", "uh", "like", "you know", "basically", "actually", and 12+ more
- **Pause detection** — counts long pauses (>2s) and tracks longest pause
- **Full transcript** — see everything you said after the session

### Scoring (0-100)
- **Pace Score** — based on WPM relative to ideal range
- **Clarity Score** — based on filler word percentage
- **Fluency Score** — based on pause frequency
- **Overall Score** — average of all three

### AI Audience
- 20 unique audience members with names and avatars
- **Category-aware reactions** — persuasion gets debate-style comments, storytelling gets narrative reactions, etc.
- Real-time comments that respond to your actual words via speech recognition

### Progress Tracking (localStorage)
- **Session history** — last 100 sessions with scores
- **Daily streak** counter
- **Personal bests** — highest score, best WPM, lowest filler rate
- **Visual chart** — bar chart of last 10 session scores

### Practice UX
- **Countdown timer** with visual progress bar and warning state
- **Audio visualizer** — real-time frequency bars showing your voice
- **Engagement meter** — see how engaged the AI audience is
- **Sound effects** — countdown beeps, start/complete tones
- **Sound toggle** — mute/unmute

## Getting Started

```bash
python3 -m http.server 8000
# Visit http://localhost:8000
```

Or just open `index.html` directly in Chrome/Edge (mic + camera required).

## Architecture

```
index.html          Entry point — setup phase + practice phase layout
style.css           Styling, responsive, reduced-motion support
app.js              Application logic (~600 lines)
app.test.js         Unit tests (~220 lines)
test-runner.html    Browser-based test runner
```

### app.js Components

| Component | Purpose |
|-----------|---------|
| `SpeechAnalyzer` | Tracks transcripts, counts filler words, calculates WPM, generates scorecard |
| `AudienceEngine` | Category-aware AI comment generation |
| `SoundEngine` | Web Audio API tones for countdown, start, complete, comments |
| `AudioVisualizer` | Real-time canvas frequency bars from mic |
| `ToastManager` | Slide-in notifications |
| `ProgressStore` | localStorage persistence for sessions, streaks, personal bests |
| `HypeComm` | Main app — practice flow, speech recognition, UI state machine |

### App State Machine

```
setup → countdown → speaking → feedback → setup
```

## Running Tests

Open `test-runner.html` in a browser. Tests cover:

- Utilities (choose, clamp, formatDuration, friendlyMediaError)
- Topic database validation (categories, counts, structure)
- Practice modes validation
- Filler word list validation
- SpeechAnalyzer (word counting, filler detection, scoring, transcript building)
- AudienceEngine (generation, topic tracking)
- ProgressStore (sessions, personal bests, streaks)
- SoundEngine, AudioVisualizer, ToastManager

## Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| getUserMedia | 53+ | 36+ | 11+ | 12+ |
| Web Speech API | 33+ | — | 14.1+ | 79+ |
| Web Audio API | 35+ | 25+ | 14.1+ | 12+ |
| localStorage | 4+ | 3.5+ | 4+ | 12+ |

> Speech recognition is not available in Firefox. The app will still work but won't generate audience reactions from your speech.

## Privacy

- **Camera & mic** only accessed when you start practice. No data leaves your browser.
- **No analytics, cookies, or tracking.**
- **Speech recognition** uses your browser's built-in engine.
- **Progress data** stored in localStorage on your device only.

## License

MIT
