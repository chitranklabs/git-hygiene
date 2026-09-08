// @ts-nocheck
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, copyFileSync, writeFileSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync, spawnSync } from 'node:child_process';

function fixture(t) {
  const dir = mkdtempSync(join(tmpdir(), 'hygiene-release-check-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  mkdirSync(join(dir, 'scripts'));
  copyFileSync(
    resolve(import.meta.dirname, '../release-artifacts.mjs'),
    join(dir, 'scripts/release-artifacts.mjs'),
  );
  const json = (file, data) => writeFileSync(join(dir, file), JSON.stringify(data));
  json('package.json', { version: '0.5.0' });
  for (const name of ['core', 'cli']) {
    mkdirSync(join(dir, 'packages', name), { recursive: true });
    json(`packages/${name}/package.json`, { name, version: '0.5.0', dependencies: {} });
    json(`packages/${name}/jsr.json`, { name, version: '0.5.0', imports: {} });
  }
  const git = (...args) =>
    execFileSync('git', args, {
      cwd: dir,
      stdio: 'pipe',
      env: {
        ...process.env,
        GIT_CONFIG_NOSYSTEM: '1',
        GIT_CONFIG_GLOBAL: '/dev/null',
        GIT_AUTHOR_NAME: 'Test',
        GIT_AUTHOR_EMAIL: 'test@example.com',
        GIT_COMMITTER_NAME: 'Test',
        GIT_COMMITTER_EMAIL: 'test@example.com',
      },
    });
  git('init', '--quiet');
  git('commit', '--allow-empty', '-m', 'chore: initial');
  const check = (tag = 'v0.5.0') =>
    spawnSync(process.execPath, ['scripts/release-artifacts.mjs', 'check'], {
      cwd: dir,
      encoding: 'utf8',
      env: { ...process.env, RELEASE_TAG: tag },
    });
  return { json, git, check };
}

test('accepts matching versions and a new release tag', t => {
  const { check } = fixture(t);
  const result = check();
  assert.equal(result.status, 0, result.stderr);
});
test('accepts an existing tag only at the checked-out commit', t => {
  const { git, check } = fixture(t);
  git('tag', 'v0.5.0');
  assert.equal(check().status, 0);
  git('commit', '--allow-empty', '-m', 'fix: next commit');
  const result = check();
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Existing tag points at another commit/);
});
test('rejects a tag that does not match the package version', t => {
  const { check } = fixture(t);
  const result = check('v0.6.0');
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Tag must match manifests/);
});
test('rejects JSR version drift', t => {
  const { json, check } = fixture(t);
  json('packages/core/jsr.json', { version: '0.4.12', imports: {} });
  const result = check();
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /JSR and npm versions must agree/);
});
test('rejects JSR dependency drift', t => {
  const { json, check } = fixture(t);
  json('packages/core/package.json', { version: '0.5.0', dependencies: { example: '^2.0.0' } });
  json('packages/core/jsr.json', { version: '0.5.0', imports: { example: 'npm:example@^1.0.0' } });
  const result = check();
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /JSR dependency mismatch/);
});
