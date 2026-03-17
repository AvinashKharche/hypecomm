/**
 * HypeCam — Unit & Integration Tests
 *
 * Run with: open test-runner.html in a browser
 * Framework-free minimal test harness.
 */

const results = { passed: 0, failed: 0, errors: [] };

function assert(condition, message) {
  if (condition) { results.passed += 1; }
  else { results.failed += 1; results.errors.push(message); console.error(`  FAIL: ${message}`); }
}

function assertEqual(actual, expected, message) {
  assert(actual === expected, `${message} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

function assertType(value, type, message) {
  assert(typeof value === type, `${message} — expected type ${type}, got ${typeof value}`);
}

function describe(name, fn) { console.log(`\n▸ ${name}`); fn(); }

function it(name, fn) {
  try { fn(); console.log(`  ✓ ${name}`); }
  catch (err) { results.failed += 1; results.errors.push(`${name}: ${err.message}`); console.error(`  ✗ ${name}: ${err.message}`); }
}

/* ── Utility Tests ─────────────────────────────────────────── */

describe('choose()', () => {
  it('returns an element from the array', () => {
    const arr = [1, 2, 3, 4, 5];
    assert(arr.includes(choose(arr)), 'Result not in array');
  });
  it('works with single-element arrays', () => {
    assertEqual(choose([42]), 42, 'choose([42])');
  });
});

describe('isoTime()', () => {
  it('returns a string with colons', () => {
    const time = isoTime();
    assertType(time, 'string', 'return type');
    assert(time.includes(':'), 'should contain colons');
  });
});

describe('formatDuration()', () => {
  it('formats zero', () => assertEqual(formatDuration(0), '00:00', '0ms'));
  it('formats seconds', () => assertEqual(formatDuration(5000), '00:05', '5s'));
  it('formats minutes:seconds', () => assertEqual(formatDuration(125000), '02:05', '2m5s'));
  it('includes hours when >= 1h', () => assertEqual(formatDuration(3661000), '1:01:01', '1h1m1s'));
  it('handles exact hour', () => assertEqual(formatDuration(3600000), '1:00:00', '1h'));
});

describe('clamp()', () => {
  it('clamps below min', () => assertEqual(clamp(-5, 0, 100), 0, 'below min'));
  it('clamps above max', () => assertEqual(clamp(150, 0, 100), 100, 'above max'));
  it('passes through in range', () => assertEqual(clamp(50, 0, 100), 50, 'in range'));
  it('handles equal min/max', () => assertEqual(clamp(5, 10, 10), 10, 'equal bounds'));
});

describe('friendlyMediaError()', () => {
  it('handles NotAllowedError', () => {
    const err = new DOMException('', 'NotAllowedError');
    assert(friendlyMediaError(err).includes('denied'), 'Should mention denied');
  });
  it('handles NotFoundError', () => {
    const err = new DOMException('', 'NotFoundError');
    assert(friendlyMediaError(err).includes('No camera'), 'Should mention no camera');
  });
  it('handles NotReadableError', () => {
    const err = new DOMException('', 'NotReadableError');
    assert(friendlyMediaError(err).includes('already in use'), 'Should mention in use');
  });
  it('handles OverconstrainedError', () => {
    const err = new DOMException('', 'OverconstrainedError');
    assert(friendlyMediaError(err).includes('not support'), 'Should mention not supported');
  });
  it('handles unknown errors gracefully', () => {
    assertType(friendlyMediaError(new Error('Unknown')), 'string', 'Returns string');
  });
});

/* ── Constants Validation ──────────────────────────────────── */

describe('Constants: TIMING', () => {
  it('has all required timing keys', () => {
    const requiredKeys = [
      'COMMENT_BASE_DELAY', 'COMMENT_STAGGER', 'COMMENT_JITTER',
      'DEMO_INTERVAL', 'MIN_LATENCY_DISPLAY', 'COMMENT_BURST_MIN',
      'HYPE_DECAY_INTERVAL', 'HYPE_DECAY_RATE', 'HYPE_PER_COMMENT', 'HYPE_MAX',
      'CONFETTI_COUNT', 'CONFETTI_DURATION', 'TOAST_DURATION',
      'VISUALIZER_FPS', 'SPARKLINE_POINTS', 'SPARKLINE_INTERVAL',
    ];
    requiredKeys.forEach((key) => {
      assert(key in TIMING, `TIMING.${key} should exist`);
      assertType(TIMING[key], 'number', `TIMING.${key}`);
    });
  });
});

describe('Constants: NAME_POOL', () => {
  it('has at least 25 names', () => {
    assert(NAME_POOL.length >= 25, `Has ${NAME_POOL.length} names`);
  });
  it('has no duplicates', () => {
    const unique = new Set(NAME_POOL);
    assertEqual(unique.size, NAME_POOL.length, 'All names unique');
  });
});

describe('Constants: PERSONAS', () => {
  it('every NAME_POOL entry has a persona', () => {
    NAME_POOL.forEach((name) => {
      assert(name in PERSONAS, `${name} should have a persona`);
    });
  });
  it('personas have mood and style', () => {
    Object.entries(PERSONAS).forEach(([name, p]) => {
      assertType(p.mood, 'string', `${name}.mood`);
      assertType(p.style, 'string', `${name}.style`);
    });
  });
});

describe('Constants: VIDEO_FILTERS', () => {
  it('has at least 5 filters', () => {
    assert(Object.keys(VIDEO_FILTERS).length >= 5, 'At least 5 filters');
  });
  it('includes "none" filter', () => {
    assert('none' in VIDEO_FILTERS, 'none filter exists');
    assertEqual(VIDEO_FILTERS.none.css, 'none', 'none filter css');
  });
  it('all filters have label and css', () => {
    Object.entries(VIDEO_FILTERS).forEach(([key, f]) => {
      assertType(f.label, 'string', `${key}.label`);
      assertType(f.css, 'string', `${key}.css`);
    });
  });
});

describe('Constants: MILESTONES', () => {
  it('has milestones in ascending order', () => {
    for (let i = 1; i < MILESTONES.length; i++) {
      assert(MILESTONES[i].count > MILESTONES[i - 1].count,
        `Milestone ${i} should be > milestone ${i - 1}`);
    }
  });
  it('all milestones have count, message, emoji', () => {
    MILESTONES.forEach((ms, i) => {
      assertType(ms.count, 'number', `milestone[${i}].count`);
      assertType(ms.message, 'string', `milestone[${i}].message`);
      assertType(ms.emoji, 'string', `milestone[${i}].emoji`);
    });
  });
});

describe('Constants: EMOJI_REACTIONS & DEMO_TOPICS', () => {
  it('EMOJI_REACTIONS non-empty', () => assert(EMOJI_REACTIONS.length > 0, 'has emojis'));
  it('DEMO_TOPICS non-empty', () => assert(DEMO_TOPICS.length > 0, 'has topics'));
});

/* ── CommentEngine v2 Tests ────────────────────────────────── */

describe('CommentEngine', () => {
  it('returns null for empty transcript', () => {
    const e = new CommentEngine();
    assertEqual(e.generate(''), null, 'empty string');
    assertEqual(e.generate('   '), null, 'whitespace');
  });

  it('returns {username, text} for valid input', () => {
    const e = new CommentEngine();
    const result = e.generate('testing');
    assertType(result, 'object', 'result type');
    assertType(result.username, 'string', 'username type');
    assertType(result.text, 'string', 'text type');
    assert(result.text.length > 0, 'text not empty');
  });

  it('uses names from NAME_POOL', () => {
    const e = new CommentEngine();
    const result = e.generate('sample');
    assert(NAME_POOL.includes(result.username), 'username from pool');
  });

  it('tracks recent topics', () => {
    const e = new CommentEngine();
    e.generate('alpha');
    e.generate('beta');
    assertEqual(e.recentTopics.length, 2, 'two topics tracked');
  });

  it('caps recent topics at 10', () => {
    const e = new CommentEngine();
    for (let i = 0; i < 15; i++) e.generate(`topic ${i}`);
    assertEqual(e.recentTopics.length, 10, 'capped at 10');
  });

  it('tracks conversation threads', () => {
    const e = new CommentEngine();
    e.generate('first');
    e.generate('second');
    assertEqual(e.conversationThreads.length, 2, 'two threads');
    assertType(e.conversationThreads[0].username, 'string', 'thread username');
  });

  it('caps conversation threads at 20', () => {
    const e = new CommentEngine();
    for (let i = 0; i < 25; i++) e.generate(`topic ${i}`);
    assertEqual(e.conversationThreads.length, 20, 'capped at 20');
  });

  it('generates varied output across many calls', () => {
    const e = new CommentEngine();
    const texts = new Set();
    for (let i = 0; i < 30; i++) {
      const result = e.generate('creativity');
      if (result) texts.add(result.text);
    }
    assert(texts.size > 5, `Should have variety — got ${texts.size} unique comments`);
  });
});

/* ── SoundEngine Tests ─────────────────────────────────────── */

describe('SoundEngine', () => {
  it('can be constructed', () => {
    const s = new SoundEngine();
    assertType(s, 'object', 'SoundEngine instance');
  });
  it('has all sound methods', () => {
    const s = new SoundEngine();
    ['comment', 'goLive', 'endStream', 'milestone', 'screenshot', 'emoji'].forEach((method) => {
      assertType(s[method], 'function', `SoundEngine.${method}`);
    });
  });
});

/* ── AudioVisualizer Tests ─────────────────────────────────── */

describe('AudioVisualizer', () => {
  it('can be constructed with canvas element', () => {
    const canvas = document.createElement('canvas');
    const v = new AudioVisualizer(canvas);
    assertType(v, 'object', 'AudioVisualizer instance');
    assertEqual(v.analyser, null, 'analyser starts null');
  });
  it('stop() clears state', () => {
    const canvas = document.createElement('canvas');
    const v = new AudioVisualizer(canvas);
    v.stop();
    assertEqual(v.analyser, null, 'analyser is null after stop');
  });
});

/* ── ConfettiEngine Tests ──────────────────────────────────── */

describe('ConfettiEngine', () => {
  it('can be constructed', () => {
    const container = document.createElement('div');
    const c = new ConfettiEngine(container);
    assertType(c, 'object', 'ConfettiEngine instance');
  });
  it('burst creates confetti elements', () => {
    const container = document.createElement('div');
    const c = new ConfettiEngine(container);
    c.burst();
    assert(container.children.length > 0, 'Should create confetti pieces');
    assert(container.children.length <= TIMING.CONFETTI_COUNT, 'Should not exceed count');
  });
});

/* ── ToastManager Tests ────────────────────────────────────── */

describe('ToastManager', () => {
  it('can be constructed', () => {
    const container = document.createElement('div');
    const t = new ToastManager(container);
    assertType(t, 'object', 'ToastManager instance');
  });
  it('show() creates a toast element', () => {
    const container = document.createElement('div');
    const t = new ToastManager(container);
    t.show('Hello', 'info');
    assertEqual(container.children.length, 1, 'One toast created');
    assert(container.children[0].textContent === 'Hello', 'Toast has correct text');
    assert(container.children[0].classList.contains('toast-info'), 'Has type class');
  });
});

/* ── Sparkline Tests ───────────────────────────────────────── */

describe('Sparkline', () => {
  it('can be constructed', () => {
    const canvas = document.createElement('canvas');
    const s = new Sparkline(canvas);
    assertType(s, 'object', 'Sparkline instance');
    assertEqual(s.points.length, 0, 'Starts empty');
  });
  it('push adds points', () => {
    const canvas = document.createElement('canvas');
    const s = new Sparkline(canvas);
    s.push(10);
    s.push(20);
    assertEqual(s.points.length, 2, 'Two points');
  });
  it('caps points at SPARKLINE_POINTS', () => {
    const canvas = document.createElement('canvas');
    const s = new Sparkline(canvas);
    for (let i = 0; i < TIMING.SPARKLINE_POINTS + 10; i++) s.push(i);
    assertEqual(s.points.length, TIMING.SPARKLINE_POINTS, 'Capped at max');
  });
  it('clear() resets points', () => {
    const canvas = document.createElement('canvas');
    const s = new Sparkline(canvas);
    s.push(1);
    s.push(2);
    s.clear();
    assertEqual(s.points.length, 0, 'Points cleared');
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
