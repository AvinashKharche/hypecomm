# HypeCam

A glitch-pop inspired live streaming studio where your camera feed meets AI-style crowd reactions. Everything runs entirely client-side — no server, no dependencies, no build step.

## Features

- **Live video capture** via `getUserMedia` + `MediaRecorder` with MP4/WebM auto-negotiation
- **Speech recognition** converts your words into crowd comments in real time
- **AI-style comment engine** generates hype reactions, questions, follow-ups, and cross-topic callbacks
- **Simulated viewer count** and live stream duration timer
- **Emoji reactions** with floating animation effects
- **Keyboard shortcuts** — press `S` to start, `E` to end
- **Downloadable recordings** saved as MP4 (or WebM fallback)
- **Accessible** — ARIA roles, skip navigation, `prefers-reduced-motion` support, keyboard focus styles

## Getting Started

Open `index.html` in a modern browser with camera/mic access:

```
# Or use any local server:
python3 -m http.server 8000
# Then visit http://localhost:8000
```

Click **Start Stream** to begin recording. The comment stream will react to your speech. Click **End Stream** to stop, then **Download MP4** to save the recording.

## Architecture

```
index.html          Entry point — semantic HTML with ARIA attributes
style.css           Styling, animations, responsive layout, reduced-motion support
app.js              Application logic (class-based)
app.test.js         Unit tests (framework-free)
test-runner.html    Browser-based test runner
```

### app.js Structure

| Component        | Purpose                                                    |
| ---------------- | ---------------------------------------------------------- |
| `TIMING`         | Named constants for all timing/magic numbers               |
| `CommentEngine`  | Generates contextual comments with topic memory            |
| `HypeCam`        | Main application class — state, media, speech, UI          |
| `friendlyMediaError()` | Maps `getUserMedia` errors to human-readable messages |

### State Management

All mutable state lives in `HypeCam.state` — a single plain object. No globals beyond DOM element references and the `HypeCam` instance.

## Running Tests

Open `test-runner.html` in a browser. Tests cover:

- Utility functions (`choose`, `isoTime`, `formatDuration`, `friendlyMediaError`)
- `CommentEngine` — generation, topic tracking, edge cases
- Constants validation

## Browser Compatibility

| Feature              | Chrome | Firefox | Safari | Edge |
| -------------------- | ------ | ------- | ------ | ---- |
| getUserMedia         | 53+    | 36+     | 11+    | 12+  |
| MediaRecorder        | 49+    | 25+     | 14.1+  | 79+  |
| Web Speech API       | 33+    | —       | 14.1+  | 79+  |
| CSS backdrop-filter  | 76+    | 103+    | 9+     | 17+  |

> Speech recognition is not available in Firefox. The app degrades gracefully — demo comments will play automatically when speech is unavailable.

## Privacy

- **Camera & microphone** are only accessed when you click Start Stream. No data leaves your browser.
- **No analytics, cookies, or tracking** of any kind.
- **Speech recognition** uses your browser's built-in engine (typically processes locally on Chrome; may send audio to Google for processing in some configurations).
- **Recordings** are stored in memory and only saved to disk when you click Download.

## License

MIT
