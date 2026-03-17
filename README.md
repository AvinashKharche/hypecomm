# HypeCam

A state-of-the-art glitch-pop live streaming studio where your camera feed meets AI-powered crowd reactions. Everything runs entirely client-side — no server, no dependencies, no build step.

## Features

### Core Streaming
- **Live video capture** via `getUserMedia` + `MediaRecorder` with MP4/WebM auto-negotiation
- **Speech recognition** converts your words into crowd comments in real time
- **Downloadable recordings** saved as MP4 (or WebM fallback)

### AI Crowd System
- **30 unique personas** — each AI commenter has a consistent mood (hype, chill, curious, supportive, analytical) and style (exclamation, poetic, technical, meme, etc.)
- **Threaded conversations** — AI commenters reply to each other with @mentions
- **Cross-topic callbacks** — the crowd references earlier topics for conversational depth
- **Sentiment-matched templates** — comments match each persona's personality

### Audio & Visuals
- **Real-time audio visualizer** — canvas-based frequency bar display synced to your microphone
- **6 video filters** — Normal, Glitch, VHS, Neon, Noir, Thermal (applied live + to screenshots)
- **Scanline overlay** — subtle CRT-style scanlines when live
- **Sound effects** — Web Audio API tones for go-live, comments, milestones, screenshots, emoji

### Engagement Features
- **Hype meter** — real-time energy gauge (0–100%) that rises with comments and decays over time
- **Crowd mood indicator** — emoji-based mood that shifts from Chill to Erupting
- **Emoji reactions** — 8 emoji buttons with burst floating animations
- **Milestone system** — confetti + toast at 10, 25, 50, 100, 200, 500 comments
- **Simulated viewer count** with sparkline trend chart
- **User chat input** — type messages that the AI crowd responds to

### Pro Tools
- **Stream highlights** — bookmark moments with timestamps during your stream
- **Screenshot capture** — save a still with watermark + active filter applied
- **Picture-in-Picture** — pop out the video while multitasking
- **Fullscreen mode** — immersive full-screen video
- **Stream recap modal** — end-of-stream stats (duration, comments, peak viewers, highlights)

### Accessibility & UX
- **9 keyboard shortcuts** (see table below)
- **ARIA roles** — `role="log"`, `role="meter"`, `role="dialog"`, `aria-live` throughout
- **Skip navigation** link for keyboard users
- **`prefers-reduced-motion`** support — all animations disabled
- **Focus-visible styles** — clear focus ring for keyboard navigation
- **Sound toggle** — mute/unmute all audio feedback

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `S` | Start stream |
| `E` | End stream |
| `H` | Add highlight |
| `P` | Toggle Picture-in-Picture |
| `F` | Toggle fullscreen |
| `C` | Take screenshot |
| `M` | Toggle sound |
| `Esc` | Close recap modal |
| `Enter` | Send chat message (when input focused) |

## Getting Started

Open `index.html` in a modern browser with camera/mic access:

```bash
python3 -m http.server 8000
# Visit http://localhost:8000
```

## Architecture

```
index.html          Entry point — semantic HTML, ARIA, all UI elements
style.css           Styling, animations, responsive layout, reduced-motion
app.js              Application logic (class-based, ~600 lines)
app.test.js         Unit tests (framework-free, ~250 lines)
test-runner.html    Browser-based test runner
```

### app.js Components

| Component | Purpose |
|-----------|---------|
| `SoundEngine` | Web Audio API tone synthesis for all events |
| `AudioVisualizer` | Real-time canvas frequency bars from mic input |
| `ConfettiEngine` | Particle burst system for milestones |
| `ToastManager` | Slide-in notification system |
| `Sparkline` | Mini canvas chart for viewer count trend |
| `CommentEngine` | Persona-based AI comment generation with threads |
| `HypeCam` | Main app class — state, media, speech, all UI |

### State Management

All mutable state lives in `HypeCam.state`. No globals beyond the single `HypeCam` instance and DOM references.

## Running Tests

Open `test-runner.html` in a browser. Tests cover:

- Utilities (`choose`, `isoTime`, `formatDuration`, `clamp`, `friendlyMediaError`)
- All constants validation (TIMING, NAME_POOL, PERSONAS, VIDEO_FILTERS, MILESTONES)
- `CommentEngine` — generation, persona matching, threads, topic tracking
- `SoundEngine`, `AudioVisualizer`, `ConfettiEngine`, `ToastManager`, `Sparkline`

## Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| getUserMedia | 53+ | 36+ | 11+ | 12+ |
| MediaRecorder | 49+ | 25+ | 14.1+ | 79+ |
| Web Speech API | 33+ | — | 14.1+ | 79+ |
| Web Audio API | 35+ | 25+ | 14.1+ | 12+ |
| Picture-in-Picture | 70+ | — | 14+ | 79+ |
| Fullscreen API | 71+ | 64+ | 16.4+ | 79+ |
| CSS backdrop-filter | 76+ | 103+ | 9+ | 17+ |

> Speech recognition and PiP are not available in Firefox. The app degrades gracefully.

## Privacy

- **Camera & microphone** are only accessed when you click Start Stream. No data leaves your browser.
- **No analytics, cookies, or tracking** of any kind.
- **Speech recognition** uses your browser's built-in engine.
- **Recordings and screenshots** are stored in memory and only saved to disk on your action.
- **Sound effects** are synthesized locally via Web Audio API — no audio files loaded.

## License

MIT
