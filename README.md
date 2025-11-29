# HypeCam

A glitch-pop inspired live streaming mock where your camera feed meets AI-style crowd reactions. The page runs entirely client-side: it records via `getUserMedia` + `MediaRecorder`, uses speech recognition to capture what you say, and spins up Gemini-flavored comments with low-latency roll-up.

## Running
Open `index.html` in a modern Chromium-based browser with camera/mic access. Click **Start Stream** to begin recording, **End Stream** to stop, and **Download MP4** to save the session (falls back to WebM if the browser does not support MP4 capture).
