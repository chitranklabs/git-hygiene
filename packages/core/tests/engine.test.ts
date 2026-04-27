import { describe, it, afterEach } from 'node:test';
import assert from 'node:assert';
import { validateBranch, validateTitle, validateCommit } from '../src/engine.ts';
import { clearConfigCache } from '../src/config.ts';

describe('Validation Engine', () => {
  afterEach(() => {
    clearConfigCache();
  });

  describe('validateBranch', () => {
    it('should accept valid branch names', async () => {
      assert.strictEqual((await validateBranch('feat/login-screen')).valid, true);
    });

    it('should accept ignored base branches natively', async () => {
      assert.strictEqual((await validateBranch('main')).valid, true);
      assert.strictEqual((await validateBranch('master')).valid, true);
      assert.strictEqual((await validateBranch('development')).valid, true);
    });

    it('should reject invalid branch names', async () => {
      assert.strictEqual((await validateBranch('wrong-name')).valid, false);
      assert.strictEqual((await validateBranch('feat-login')).valid, false);
      assert.strictEqual((await validateBranch('unknown/branch')).valid, false);
      assert.strictEqual((await validateBranch('feat/')).valid, false);
    });
  });

  describe('validateTitle', () => {
    it('should accept valid PR titles', async () => {
      assert.strictEqual((await validateTitle('feat: add auth')).valid, true);
      assert.strictEqual((await validateTitle('fix(core): resolve memory leak')).valid, true);
    });

    it('should reject invalid PR titles', async () => {
      assert.strictEqual((await validateTitle('just a title')).valid, false);
      assert.strictEqual((await validateTitle('feat:missing-space')).valid, false);
      assert.strictEqual((await validateTitle('unknown: type')).valid, false);
    });

    it('should respect allowEmptyScope setting in title pattern', async () => {
      assert.strictEqual((await validateTitle('feat: title')).valid, true);
      assert.strictEqual((await validateTitle('feat(scope): title')).valid, true);
    });

    it('should reject titles with invalid casing', async () => {
      assert.strictEqual((await validateTitle('FEAT: title')).valid, false);
      assert.strictEqual((await validateTitle('feat(Scope): title')).valid, false);
    });
  });

  describe('validateCommit', async () => {
    it('should accept valid commits', async () => {
      const res = await validateCommit('feat: working commit');
      assert.strictEqual(res.valid, true);
    });

    it('should accept commits with scopes', async () => {
      const res = await validateCommit('feat(ui): add button');
      assert.strictEqual(res.valid, true);
    });

    it('should accept multi-line bodies', async () => {
      const message = 'feat: subject\n\nFirst line of body\nSecond line of body';
      const res = await validateCommit(message);
      assert.strictEqual(res.valid, true);
    });

    it('should accept footers', async () => {
      const message = 'feat: subject\n\nbody\n\nBREAKING CHANGE: this is breaking';
      const res = await validateCommit(message);
      assert.strictEqual(res.valid, true);
    });

    it('should reject invalid types', async () => {
      const res = await validateCommit('unknown: message');
      assert.strictEqual(res.valid, false);
      assert.ok(res.errors?.some(e => e.name === 'type-enum'));
    });

    it('should reject too long headers', async () => {
      const longHeader = 'feat: ' + 'a'.repeat(100);
      const res = await validateCommit(longHeader);
      assert.strictEqual(res.valid, false);
      assert.ok(res.errors?.some(e => e.name === 'header-max-length'));
    });

    it('should enforce subject rules', async () => {
      const res = await validateCommit('feat: Subject with period.');
      assert.strictEqual(res.valid, false);
      assert.ok(res.errors?.some(e => e.name === 'subject-full-stop'));
    });

    it('should enforce body line length rules', async () => {
      // body-max-line-length is 1000 by default
      const longLine = 'a'.repeat(1001);
      const message = `feat: subject\n\n${longLine}`;
      const res = await validateCommit(message);
      assert.strictEqual(res.valid, false);
      assert.ok(res.errors?.some(e => e.name === 'body-max-line-length'));
    });
  });
});
