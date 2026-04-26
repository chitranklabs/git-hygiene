import { describe, it } from 'node:test';
import assert from 'node:assert';
import { validateBranch, validateTitle, validateCommit } from '../src/engine.ts';

describe('Validation Engine', () => {
  describe('validateBranch', () => {
    it('should accept valid branch names', () => {
      assert.strictEqual(validateBranch('feat/login-screen').valid, true);
    });

    it('should reject invalid branch names', () => {
      assert.strictEqual(validateBranch('wrong-name').valid, false);
    });
  });

  describe('validateTitle', () => {
    it('should accept valid PR titles', () => {
      assert.strictEqual(validateTitle('feat: add auth').valid, true);
    });
  });

  describe('validateCommit', async () => {
    it('should accept valid commits', async () => {
      const res = await validateCommit('feat: working commit');
      assert.strictEqual(res.valid, true);
    });
  });
});
