import { describe, it, before } from 'node:test';
import assert from 'node:assert';
import { execSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = resolve(__dirname, '../../..');
const BUNDLE_PATH = resolve(ROOT_DIR, 'dist/action.js');

function runBundle(args: string): { stdout: string; stderr: string; status: number | null } {
  try {
    const stdout = execSync(`node ${BUNDLE_PATH} ${args}`, {
      encoding: 'utf-8',
      stdio: 'pipe',
      cwd: ROOT_DIR,
    });
    return { stdout, stderr: '', status: 0 };
  } catch (err: unknown) {
    const execError = err as { stdout?: string; stderr?: string; status?: number | null };
    return {
      stdout: execError.stdout ? String(execError.stdout) : '',
      stderr: execError.stderr ? String(execError.stderr) : '',
      status: execError.status ?? null,
    };
  }
}

describe('Standalone Action Bundle', () => {
  before(() => {
    // Ensure bundle exists before testing
    if (!fs.existsSync(BUNDLE_PATH)) {
      execSync('pnpm build:action', { cwd: ROOT_DIR, stdio: 'pipe' });
    }
  });

  it('should print help text when no arguments are passed', () => {
    const res = runBundle('');
    assert.strictEqual(res.status, 0);
    assert.match(res.stdout, /git-hygiene/);
    assert.match(res.stdout, /Usage:/);
  });

  it('should validate branch name', () => {
    const res = runBundle('branch "feat/standalone-action"');
    assert.strictEqual(res.status, 0);
    assert.match(res.stdout, /is valid/);
  });

  it('should validate PR title', () => {
    const res = runBundle('title "feat(action): add standalone bundle"');
    assert.strictEqual(res.status, 0);
    assert.match(res.stdout, /is valid/);
  });

  it('should reject invalid PR title', () => {
    const res = runBundle('title "invalid title without type"');
    assert.strictEqual(res.status, 1);
    assert.match(res.stderr, /Invalid PR title/);
  });

  it('should validate conventional commit message', () => {
    const res = runBundle('commit "feat(action): add standalone bundle"');
    assert.strictEqual(res.status, 0);
    assert.match(res.stdout, /Commit message is valid/);
  });

  it('should reject invalid commit message', () => {
    const res = runBundle('commit "bad commit message"');
    assert.strictEqual(res.status, 1);
    assert.match(res.stderr, /Invalid commit message/);
  });

  it('should compute recommended bump as JSON', () => {
    const res = runBundle('bump --json');
    assert.strictEqual(res.status, 0);
    const parsed = JSON.parse(res.stdout.trim());
    assert.ok(parsed.releaseType);
    assert.ok(parsed.reason);
  });
});
