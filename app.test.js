/**
 * HypeComm — Unit Tests
 * Open test-runner.html in a browser to run.
 */

const results = { passed: 0, failed: 0, errors: [] };

function assert(condition, message) {
  if (condition) results.passed += 1;
  else { results.failed += 1; results.errors.push(message); console.error(`  FAIL: ${message}`); }
}
function assertEqual(actual, expected, message) {
  assert(actual === expected, `${message} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}
function assertType(value, type, message) {
  assert(typeof value === type, `${message} — expected ${type}, got ${typeof value}`);
}
function describe(name, fn) { console.log(`\n▸ ${name}`); fn(); }
function it(name, fn) {
  try { fn(); console.log(`  ✓ ${name}`); }
  catch (err) { results.failed += 1; results.errors.push(`${name}: ${err.message}`); console.error(`  ✗ ${name}: ${err.message}`); }
}

/* ── Utilities ─────────────────────────────────────────────── */

describe('choose()', () => {
  it('returns element from array', () => {
    assert([1, 2, 3].includes(choose([1, 2, 3])), 'not in array');
  });
  it('handles single element', () => assertEqual(choose([42]), 42, 'single'));
});

describe('clamp()', () => {
  it('clamps below min', () => assertEqual(clamp(-5, 0, 100), 0, 'below'));
  it('clamps above max', () => assertEqual(clamp(150, 0, 100), 100, 'above'));
  it('passes through', () => assertEqual(clamp(50, 0, 100), 50, 'in range'));
});

describe('formatDuration()', () => {
  it('formats zero', () => assertEqual(formatDuration(0), '00:00', '0'));
  it('formats seconds', () => assertEqual(formatDuration(5000), '00:05', '5s'));
  it('formats minutes', () => assertEqual(formatDuration(125000), '02:05', '2m5s'));
});

describe('friendlyMediaError()', () => {
  it('NotAllowedError', () => assert(friendlyMediaError(new DOMException('', 'NotAllowedError')).includes('denied'), 'denied'));
  it('NotFoundError', () => assert(friendlyMediaError(new DOMException('', 'NotFoundError')).includes('No camera'), 'not found'));
  it('unknown', () => assertType(friendlyMediaError(new Error('x')), 'string', 'string'));
});

/* ── Topic Database ────────────────────────────────────────── */

describe('TOPICS', () => {
  it('has at least 5 categories', () => {
    assert(Object.keys(TOPICS).length >= 5, `Has ${Object.keys(TOPICS).length} categories`);
  });
  it('each category has label, icon, topics array', () => {
    Object.entries(TOPICS).forEach(([key, cat]) => {
      assertType(cat.label, 'string', `${key}.label`);
      assertType(cat.icon, 'string', `${key}.icon`);
      assert(Array.isArray(cat.topics), `${key}.topics is array`);
      assert(cat.topics.length >= 10, `${key} has ${cat.topics.length} topics (need ≥10)`);
    });
  });
});

describe('PRACTICE_MODES', () => {
  it('has at least 4 modes', () => {
    assert(Object.keys(PRACTICE_MODES).length >= 4, 'modes count');
  });
  it('each mode has label and duration', () => {
    Object.entries(PRACTICE_MODES).forEach(([key, mode]) => {
      assertType(mode.label, 'string', `${key}.label`);
      assertType(mode.duration, 'number', `${key}.duration`);
    });
  });
  it('free mode has 0 duration', () => {
    assertEqual(PRACTICE_MODES.free.duration, 0, 'free duration');
  });
});

describe('FILLER_WORDS', () => {
  it('has common fillers', () => {
    assert(FILLER_WORDS.includes('um'), 'um');
    assert(FILLER_WORDS.includes('uh'), 'uh');
    assert(FILLER_WORDS.includes('like'), 'like');
    assert(FILLER_WORDS.includes('you know'), 'you know');
  });
  it('has at least 15 entries', () => {
    assert(FILLER_WORDS.length >= 15, `${FILLER_WORDS.length} fillers`);
  });
});

/* ── SpeechAnalyzer ────────────────────────────────────────── */

describe('SpeechAnalyzer', () => {
  it('starts with zero state', () => {
    const a = new SpeechAnalyzer();
    assertEqual(a.totalWords, 0, 'totalWords');
    assertEqual(a.pauseCount, 0, 'pauseCount');
    assertEqual(Object.keys(a.fillerCounts).length, 0, 'fillerCounts');
  });

  it('counts words correctly', () => {
    const a = new SpeechAnalyzer();
    a.start();
    a.addTranscript('hello world this is a test');
    assertEqual(a.totalWords, 6, '6 words');
  });

  it('detects filler words', () => {
    const a = new SpeechAnalyzer();
    a.start();
    a.addTranscript('um I think um this is like really um important');
    assert(a.fillerCounts['um'] === 3, `um count: ${a.fillerCounts['um']}`);
    assert(a.fillerCounts['like'] === 1, `like count: ${a.fillerCounts['like']}`);
  });

  it('generates a report', () => {
    const a = new SpeechAnalyzer();
    a.start();
    a.addTranscript('This is a test sentence with several words');
    const report = a.getReport();
    assertType(report.totalWords, 'number', 'totalWords');
    assertType(report.wpm, 'number', 'wpm');
    assertType(report.overallScore, 'number', 'overallScore');
    assertType(report.paceScore, 'number', 'paceScore');
    assertType(report.fillerScore, 'number', 'fillerScore');
    assertType(report.fluencyScore, 'number', 'fluencyScore');
    assert(report.overallScore >= 0 && report.overallScore <= 100, 'score in range');
  });

  it('gives 100 filler score when no fillers', () => {
    const a = new SpeechAnalyzer();
    a.start();
    a.addTranscript('The quick brown fox jumps over the lazy dog');
    const report = a.getReport();
    assertEqual(report.fillerScore, 100, 'no fillers = 100');
    assertEqual(report.totalFillers, 0, 'zero fillers');
  });

  it('reset clears all state', () => {
    const a = new SpeechAnalyzer();
    a.start();
    a.addTranscript('um hello um world');
    a.reset();
    assertEqual(a.totalWords, 0, 'words reset');
    assertEqual(Object.keys(a.fillerCounts).length, 0, 'fillers reset');
  });

  it('builds full transcript', () => {
    const a = new SpeechAnalyzer();
    a.start();
    a.addTranscript('first part');
    a.addTranscript('second part');
    const report = a.getReport();
    assertEqual(report.fullTranscript, 'first part second part', 'transcript concatenated');
  });
});

/* ── AudienceEngine ────────────────────────────────────────── */

describe('AudienceEngine', () => {
  it('returns null for empty input', () => {
    const e = new AudienceEngine();
    assertEqual(e.generate('', 'impromptu'), null, 'empty');
    assertEqual(e.generate('   ', 'debate'), null, 'whitespace');
  });

  it('returns username and text', () => {
    const e = new AudienceEngine();
    const result = e.generate('test topic', 'persuasion');
    assertType(result.username, 'string', 'username');
    assertType(result.text, 'string', 'text');
    assert(result.text.length > 0, 'text not empty');
  });

  it('uses names from AUDIENCE_NAMES', () => {
    const e = new AudienceEngine();
    const result = e.generate('topic', 'impromptu');
    assert(AUDIENCE_NAMES.includes(result.username), 'name from pool');
  });

  it('tracks recent topics', () => {
    const e = new AudienceEngine();
    e.generate('alpha', 'debate');
    e.generate('beta', 'debate');
    assertEqual(e.recentTopics.length, 2, 'tracked');
  });

  it('caps recent topics at 8', () => {
    const e = new AudienceEngine();
    for (let i = 0; i < 12; i++) e.generate(`topic ${i}`, 'impromptu');
    assertEqual(e.recentTopics.length, 8, 'capped');
  });
});

/* ── SoundEngine ───────────────────────────────────────────── */

describe('SoundEngine', () => {
  it('has all methods', () => {
    const s = new SoundEngine();
    ['start', 'countdownBeep', 'countdownFinal', 'complete', 'comment'].forEach((m) => {
      assertType(s[m], 'function', m);
    });
  });
});

/* ── ProgressStore ─────────────────────────────────────────── */

describe('ProgressStore', () => {
  it('returns default progress', () => {
    const store = new ProgressStore();
    // Use a unique key to avoid conflicts
    store.key = 'hypecomm_test_' + Date.now();
    const data = store.getProgress();
    assertEqual(data.totalSessions, 0, 'zero sessions');
    assertEqual(data.currentStreak, 0, 'zero streak');
  });

  it('addSession increments totalSessions', () => {
    const store = new ProgressStore();
    store.key = 'hypecomm_test_' + Date.now();
    const report = { duration: 60, totalWords: 100, wpm: 120, fillerRate: 3, overallScore: 75, paceScore: 80, fillerScore: 70, fluencyScore: 75 };
    const data = store.addSession(report, 'impromptu', 'short');
    assertEqual(data.totalSessions, 1, 'one session');
    assert(data.sessions.length === 1, 'session saved');
    // Cleanup
    localStorage.removeItem(store.key);
  });

  it('tracks personal bests', () => {
    const store = new ProgressStore();
    store.key = 'hypecomm_test_' + Date.now();
    store.addSession({ duration: 60, totalWords: 100, wpm: 120, fillerRate: 5, overallScore: 70, paceScore: 80, fillerScore: 60, fluencyScore: 70 }, 'debate', 'medium');
    store.addSession({ duration: 60, totalWords: 150, wpm: 150, fillerRate: 2, overallScore: 90, paceScore: 95, fillerScore: 90, fluencyScore: 85 }, 'debate', 'medium');
    const data = store.getProgress();
    assertEqual(data.personalBests.overallScore, 90, 'best score');
    assertEqual(data.personalBests.wpm, 150, 'best wpm');
    assertEqual(data.personalBests.lowestFillerRate, 2, 'best filler rate');
    localStorage.removeItem(store.key);
  });
});

/* ── ToastManager ──────────────────────────────────────────── */

describe('ToastManager', () => {
  it('creates toast element', () => {
    const container = document.createElement('div');
    const t = new ToastManager(container);
    t.show('Test', 'success');
    assertEqual(container.children.length, 1, 'one toast');
    assert(container.children[0].classList.contains('toast-success'), 'success class');
  });
});

/* ── AudioVisualizer ───────────────────────────────────────── */

describe('AudioVisualizer', () => {
  it('constructs with null analyser', () => {
    const v = new AudioVisualizer(document.createElement('canvas'));
    assertEqual(v.analyser, null, 'null');
  });
  it('stop clears state', () => {
    const v = new AudioVisualizer(document.createElement('canvas'));
    v.stop();
    assertEqual(v.analyser, null, 'null after stop');
  });
});

/* ── Summary ──────────────────────────────────────────────── */

console.log('\n' + '═'.repeat(50));
console.log(`Results: ${results.passed} passed, ${results.failed} failed`);
if (results.errors.length > 0) {
  console.log('\nFailures:');
  results.errors.forEach((e) => console.log(`  • ${e}`));
}
console.log('═'.repeat(50));
