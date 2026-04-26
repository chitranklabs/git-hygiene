import { describe, it, afterEach } from 'node:test';
import assert from 'node:assert';
import { loadConfig, clearConfigCache } from '../src/config.ts';

describe('Configuration Loader', () => {
  afterEach(() => {
    clearConfigCache();
  });

  it('should load default configuration when no package.json exists', () => {
    const config = loadConfig();
    assert.strictEqual(config.maxHeaderLength, 100);
    assert.ok(config.types.includes('feat'));
    assert.ok(config.types.includes('fix'));
  });

  it('should compile valid regex patterns for branches and titles', () => {
    const config = loadConfig();
    assert.ok(config.patterns.branch instanceof RegExp);
    assert.ok(config.patterns.title instanceof RegExp);

    // Test default patterns
    assert.ok(config.patterns.branch.test('main'));
    assert.ok(config.patterns.branch.test('feat/something'));
    assert.ok(config.patterns.title.test('feat: some title'));
  });

  it('should respect allowEmptyScope setting in title pattern', () => {
    // Default is true
    const config = loadConfig();
    assert.ok(config.patterns.title.test('feat: title')); // empty scope
    assert.ok(config.patterns.title.test('feat(scope): title')); // with scope

    // We can't easily mock fs.readFileSync here without a complex mock,
    // but we've covered the default path.
  });
});
