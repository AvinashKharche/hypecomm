/**
 * HypeCam — Unit & Integration Tests
 *
 * Run with: open test-runner.html in a browser, or use Node with jsdom.
 * These tests are framework-free and use a minimal assertion helper.
 */

/* ── Minimal Test Harness ─────────────────────────────────────── */

const results = { passed: 0, failed: 0, errors: [] };

function assert(condition, message) {
  if (condition) {
    results.passed += 1;
  } else {
    results.failed += 1;
    results.errors.push(message);
    console.error(`  FAIL: ${message}`);
  }
}

function assertEqual(actual, expected, message) {
  assert(
    actual === expected,
    `${message} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`
  );
}

function assertType(value, type, message) {
  assert(typeof value === type, `${message} — expected type ${type}, got ${typeof value}`);
}

function describe(name, fn) {
  console.log(`\n▸ ${name}`);
  fn();
}

function it(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
  } catch (err) {
    results.failed += 1;
    results.errors.push(`${name}: ${err.message}`);
    console.error(`  ✗ ${name}: ${err.message}`);
  }
}

/* ── Tests ─────────────────────────────────────────────────────── */

describe('Utility: choose()', () => {
  it('should return an element from the array', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = choose(arr);
    assert(arr.includes(result), 'choose() returned an element not in the array');
  });

  it('should work with single-element arrays', () => {
    assertEqual(choose([42]), 42, 'choose([42])');
  });
});

describe('Utility: isoTime()', () => {
  it('should return a string with colons', () => {
    const time = isoTime();
    assertType(time, 'string', 'isoTime() return type');
    assert(time.includes(':'), 'isoTime() should contain colons');
  });
});

describe('Utility: formatDuration()', () => {
  it('should format zero milliseconds', () => {
    assertEqual(formatDuration(0), '00:00', 'formatDuration(0)');
  });

  it('should format seconds correctly', () => {
    assertEqual(formatDuration(5000), '00:05', 'formatDuration(5s)');
  });

  it('should format minutes and seconds', () => {
    assertEqual(formatDuration(125000), '02:05', 'formatDuration(2m5s)');
  });

  it('should include hours when >= 1 hour', () => {
    assertEqual(formatDuration(3661000), '1:01:01', 'formatDuration(1h1m1s)');
  });
});

describe('Utility: friendlyMediaError()', () => {
  it('should return permission denied message for NotAllowedError', () => {
    const err = new DOMException('', 'NotAllowedError');
    assert(
      friendlyMediaError(err).includes('denied'),
      'Should mention denied for NotAllowedError'
    );
  });

  it('should return not found message for NotFoundError', () => {
    const err = new DOMException('', 'NotFoundError');
    assert(
      friendlyMediaError(err).includes('No camera'),
      'Should mention no camera for NotFoundError'
    );
  });

  it('should return generic message for unknown errors', () => {
    const err = new Error('Unknown');
    assertType(friendlyMediaError(err), 'string', 'Should return a string');
  });
});

describe('CommentEngine', () => {
  const engine = new CommentEngine();

  it('should return null for empty transcript', () => {
    assertEqual(engine.generate(''), null, 'Empty string');
    assertEqual(engine.generate('   '), null, 'Whitespace only');
  });

  it('should return an object with username and text', () => {
    const result = engine.generate('testing stuff');
    assertType(result, 'object', 'Result type');
    assertType(result.username, 'string', 'username type');
    assertType(result.text, 'string', 'text type');
    assert(result.text.length > 0, 'text should not be empty');
  });

  it('should use names from NAME_POOL', () => {
    const result = engine.generate('sample input');
    assert(NAME_POOL.includes(result.username), 'Username should be from NAME_POOL');
  });

  it('should track recent topics', () => {
    const e = new CommentEngine();
    e.generate('topic A');
    e.generate('topic B');
    assertEqual(e.recentTopics.length, 2, 'Should have 2 recent topics');
    assertEqual(e.recentTopics[0], 'topic A', 'First topic');
    assertEqual(e.recentTopics[1], 'topic B', 'Second topic');
  });

  it('should cap recent topics at 10', () => {
    const e = new CommentEngine();
    for (let i = 0; i < 15; i++) {
      e.generate(`topic ${i}`);
    }
    assertEqual(e.recentTopics.length, 10, 'Should cap at 10 topics');
  });
});

describe('Constants', () => {
  it('TIMING should have all required keys', () => {
    const keys = [
      'COMMENT_BASE_DELAY', 'COMMENT_STAGGER', 'COMMENT_JITTER',
      'DEMO_INTERVAL', 'MIN_LATENCY_DISPLAY', 'COMMENT_BURST_MIN',
    ];
    keys.forEach((key) => {
      assert(key in TIMING, `TIMING.${key} should exist`);
      assertType(TIMING[key], 'number', `TIMING.${key} type`);
    });
  });

  it('NAME_POOL should have at least 20 names', () => {
    assert(NAME_POOL.length >= 20, `NAME_POOL has ${NAME_POOL.length} names`);
  });

  it('EMOJI_REACTIONS should be non-empty', () => {
    assert(EMOJI_REACTIONS.length > 0, 'EMOJI_REACTIONS should not be empty');
  });

  it('DEMO_TOPICS should be non-empty', () => {
    assert(DEMO_TOPICS.length > 0, 'DEMO_TOPICS should not be empty');
  });
});

/* ── Summary ──────────────────────────────────────────────────── */

console.log('\n' + '═'.repeat(50));
console.log(`Results: ${results.passed} passed, ${results.failed} failed`);
if (results.errors.length > 0) {
  console.log('\nFailures:');
  results.errors.forEach((e) => console.log(`  • ${e}`));
}
console.log('═'.repeat(50));
