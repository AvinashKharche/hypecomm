const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const downloadBtn = document.getElementById('downloadBtn');
const preview = document.getElementById('preview');
const liveBadge = document.getElementById('liveBadge');
const statusLabel = document.getElementById('statusLabel');
const latencyLabel = document.getElementById('latencyLabel');
const commentCountLabel = document.getElementById('commentCount');
const commentStream = document.getElementById('commentStream');
const template = document.getElementById('commentTemplate');
const speechHint = document.getElementById('speechHint');

let mediaRecorder;
let recordedChunks = [];
let stream;
let speech;
let liveStart;
let commentCount = 0;
let autoscroll = true;

const namePool = [
  'NovaKicks', 'SkylineSam', 'PixelChaser', 'GlowEcho', 'CrispQuill', 'AtlasWave', 'NeonDusk',
  'SonicJun', 'EchoRin', 'VelvetArc', 'CircuitMuse', 'MaruBytes', 'SiaLoops', 'HelixRay', 'LumenFox',
  'MintyRae', 'OrbitBlue', 'FableAsh', 'VioletRue', 'KairoD', 'RheaNova'
];

function isoTime() {
  return new Intl.DateTimeFormat([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date());
}

function choose(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function setLiveUI(isLive) {
  liveBadge.innerHTML = `<span class="pulse"></span>${isLive ? 'LIVE' : 'OFF AIR'}`;
  liveBadge.style.background = isLive ? 'rgba(255, 58, 242, 0.2)' : 'rgba(255,255,255,0.08)';
  statusLabel.textContent = isLive ? 'On air — crowd is listening' : 'Stream ended';
  startBtn.disabled = isLive;
  stopBtn.disabled = !isLive;
}

function appendComment({ username, text, latency }) {
  const node = template.content.cloneNode(true);
  node.querySelector('.username').textContent = username;
  node.querySelector('.timestamp').textContent = `${isoTime()} • ${latency}ms`;
  node.querySelector('.body').textContent = text;

  const colorSeed = username.charCodeAt(0) + username.charCodeAt(username.length - 1);
  const hue = (colorSeed * 13) % 360;
  node.querySelector('.avatar').style.background = `linear-gradient(135deg, hsl(${hue} 85% 60%), hsl(${(hue+60)%360} 90% 55%))`;

  commentStream.appendChild(node);
  commentCount += 1;
  commentCountLabel.textContent = commentCount;

  if (autoscroll) {
    commentStream.scrollTop = commentStream.scrollHeight;
  }
}

function generateGeminiComment(transcript) {
  const lower = transcript.trim();
  if (!lower) return null;
  const questionPrefixes = [
    'Can you dive deeper on',
    'Love that—what inspired',
    'How do you feel about',
    'What would you change about',
    'Any tips for beginners on'
  ];
  const reactions = [
    `That part about "${lower}" hit different!`,
    `🔥 You just mentioned "${lower}" and I’m vibing.`,
    `Saving this take on "${lower}".`,
    `Never heard "${lower}" framed like that before.`
  ];
  const questions = [
    `${choose(questionPrefixes)} ${lower}?`,
    `Curious—why do you think ${lower} matters right now?`,
    `Could you share a quick example of ${lower} in action?`,
    `If someone disagrees about ${lower}, how do you respond?`,
    `Where do you see ${lower} going next?`
  ];
  const followups = [
    `So good. Also, what was the hardest part when you first tried ${lower}?`,
    `Follow-up: how would you explain ${lower} to a friend in 30 seconds?`,
    `${lower} reminds me of a project I tried—any pitfalls to avoid?`,
    `Okay but what's the wildest story you have about ${lower}?`
  ];

  const options = [choose(reactions), choose(questions), choose(followups)];
  const text = choose(options);
  return { username: choose(namePool), text };
}

function scheduleGeminiComments(transcript) {
  const bursts = 3 + Math.floor(Math.random() * 2); // 3-4 comments
  const now = performance.now();
  for (let i = 0; i < bursts; i++) {
    const jitter = 300 + i * 450 + Math.random() * 220; // quick roll-up
    setTimeout(() => {
      const entry = generateGeminiComment(transcript);
      if (!entry) return;
      const latency = Math.max(40, Math.round(performance.now() - now));
      appendComment({ ...entry, latency });
    }, jitter);
  }
}

function setupSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    speechHint.textContent = 'Speech recognition not available in this browser. Comments will riff off sample prompts.';
    return null;
  }
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  return recognition;
}

function startSpeech() {
  speech = setupSpeechRecognition();
  if (!speech) return;
  speech.onresult = (event) => {
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i];
      if (result.isFinal) {
        const transcript = result[0].transcript.trim();
        if (transcript) scheduleGeminiComments(transcript);
      }
    }
  };
  speech.onerror = () => {
    speechHint.textContent = 'Speech recognition lost. Comments will keep flowing using recent context.';
  };
  speech.onend = () => {
    // Restart to keep the stream going unless we've stopped manually
    if (liveStart) speech.start();
  };
  speech.start();
  speechHint.textContent = 'Gemini is listening. Keep talking to feed the crowd.';
}

function stopSpeech() {
  if (speech) {
    speech.onend = null;
    speech.stop();
    speech = null;
  }
}

function getPreferredMimeType() {
  const candidates = [
    'video/mp4;codecs="avc1.42E01E, mp4a.40.2"',
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus'
  ];
  return candidates.find((type) => MediaRecorder.isTypeSupported(type));
}

async function startStream() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    preview.srcObject = stream;

    const mimeType = getPreferredMimeType();
    mediaRecorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
    recordedChunks = [];
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) recordedChunks.push(event.data);
    };
    mediaRecorder.onstop = handleRecordingStop;
    mediaRecorder.start(200);

    liveStart = performance.now();
    setLiveUI(true);
    statusLabel.textContent = 'Live and recording';
    latencyLabel.textContent = 'Low';
    startBtn.blur();
    startSpeech();
  } catch (err) {
    statusLabel.textContent = 'Camera or mic permission denied';
    console.error(err);
  }
}

function handleRecordingStop() {
  const blob = new Blob(recordedChunks, { type: mediaRecorder.mimeType || 'video/webm' });
  const ext = blob.type.includes('mp4') ? 'mp4' : 'webm';
  const url = URL.createObjectURL(blob);
  downloadBtn.href = url;
  downloadBtn.download = `hypecam-${Date.now()}.${ext}`;
  downloadBtn.disabled = false;
  statusLabel.textContent = `Stream saved as .${ext.toUpperCase()}`;
}

function stopStream() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
  }
  if (stream) {
    stream.getTracks().forEach((t) => t.stop());
    stream = null;
  }
  stopSpeech();
  setLiveUI(false);
  latencyLabel.textContent = '—';
  liveStart = null;
}

function bootDemoComments() {
  const starters = [
    'sound design', 'your setup', 'story arc', 'camera confidence', 'favorite glitch effect', 'workflow tricks'
  ];
  let index = 0;
  setInterval(() => {
    if (liveStart) return;
    scheduleGeminiComments(starters[index % starters.length]);
    index += 1;
  }, 4000);
}

startBtn.addEventListener('click', () => {
  commentStream.innerHTML = '';
  commentCount = 0;
  commentCountLabel.textContent = '0';
  downloadBtn.disabled = true;
  startStream();
});

stopBtn.addEventListener('click', stopStream);

commentStream.addEventListener('scroll', () => {
  const nearBottom = commentStream.scrollTop + commentStream.clientHeight >= commentStream.scrollHeight - 50;
  autoscroll = nearBottom;
});

downloadBtn.addEventListener('click', () => {
  setTimeout(() => {
    URL.revokeObjectURL(downloadBtn.href);
  }, 2000);
});

bootDemoComments();
