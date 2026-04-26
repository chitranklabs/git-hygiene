import { describe, it } from 'node:test';
import assert from 'node:assert';
import { validateBranch, validateTitle, validateCommit } from '../src/engine.ts';

describe('Validation Engine', () => {
  describe('validateBranch', () => {
    it('should accept valid branch names', () => {
      assert.strictEqual(validateBranch('feat/login-screen').valid, true);
    });

    it('should accept ignored base branches natively', () => {
      assert.strictEqual(validateBranch('main').valid, true);
      assert.strictEqual(validateBranch('master').valid, true);
      assert.strictEqual(validateBranch('development').valid, true);
    });

    it('should reject invalid branch names', () => {
      assert.strictEqual(validateBranch('wrong-name').valid, false);
      assert.strictEqual(validateBranch('feat-login').valid, false);
      assert.strictEqual(validateBranch('unknown/branch').valid, false);
      assert.strictEqual(validateBranch('feat/').valid, false);
    });
  });

  describe('validateTitle', () => {
    it('should accept valid PR titles', () => {
      assert.strictEqual(validateTitle('feat: add auth').valid, true);
      assert.strictEqual(validateTitle('fix(core): resolve memory leak').valid, true);
    });

    it('should reject invalid PR titles', () => {
      assert.strictEqual(validateTitle('just a title').valid, false);
      assert.strictEqual(validateTitle('feat:missing-space').valid, false);
      assert.strictEqual(validateTitle('unknown: type').valid, false);
      assert.strictEqual(validateTitle('feat(): empty scope').valid, false);
    });
  });

  describe('validateCommit', async () => {
    it('should accept valid commits', async () => {
      const res = await validateCommit('feat: working commit');
      assert.strictEqual(res.valid, true);
    });

    it('should reject invalid types', async () => {
      const res = await validateCommit('unknown: message');
      assert.strictEqual(res.valid, false);
      assert.ok(res.message.includes('type-enum'));
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

    it('should enforce body length rules', async () => {
      const longBody = 'feat: subject\n\n' + 'a'.repeat(1001);
      const res = await validateCommit(longBody);
      assert.strictEqual(res.valid, false);
      assert.ok(res.errors?.some(e => e.name === 'body-max-line-length'));
    });
  });
});
