import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { tmpdir } from 'node:os';

const root = resolve(import.meta.dirname, '..');
const output = resolve(process.env.RELEASE_ARTIFACTS || join(root, 'release-artifacts'));
/** @param {string} file */
const read = file => JSON.parse(readFileSync(join(root, file), 'utf8'));
const packages = ['core', 'cli'].map(dir => ({ dir, ...read(`packages/${dir}/package.json`) }));
/**
 * @param {string} cmd
 * @param {string[]} args
 * @param {string} [cwd]
 */
const run = (cmd, args, cwd = root) => execFileSync(cmd, args, { cwd, stdio: 'inherit' });
/**
 * @param {string} cmd
 * @param {string[]} args
 * @param {string} [cwd]
 */
const capture = (cmd, args, cwd = root) =>
  execFileSync(cmd, args, { cwd, encoding: 'utf8' }).trim();
const version = packages[0].version;
assert.match(version, /^\d+\.\d+\.\d+$/u, 'Only stable releases are supported by this workflow');
for (const pkg of packages) {
  const jsr = read(`packages/${pkg.dir}/jsr.json`);
  assert.equal(pkg.version, version, 'Package versions must agree');
  assert.equal(jsr.version, version, 'JSR and npm versions must agree');
  for (const [name, range] of Object.entries(pkg.dependencies)) {
    const expected = range.startsWith('workspace:')
      ? `jsr:${name}@^${version}`
      : `npm:${name}@${range}`;
    assert.equal(jsr.imports[name], expected, `JSR dependency mismatch: ${name}`);
  }
}
assert.equal(read('package.json').version, version, 'Root version must agree');
if (process.env.RELEASE_TAG)
  assert.equal(process.env.RELEASE_TAG, `v${version}`, 'Tag must match manifests');

if (process.argv[2] === 'check') {
  const refs = capture('git', ['tag', '--list', `v${version}`]);
  if (refs)
    assert.equal(
      capture('git', ['rev-list', '-n', '1', `v${version}`]),
      capture('git', ['rev-parse', 'HEAD']),
      'Existing tag points at another commit',
    );
  console.log(`Validated v${version}`);
} else if (process.argv[2] === 'pack') {
  mkdirSync(output, { recursive: true });
  assert.equal(readdirSync(output).length, 0, 'Use a fresh artifact directory');
  for (const pkg of packages)
    run('pnpm', ['pack', '--pack-destination', output], join(root, 'packages', pkg.dir));
  const tarballs = readdirSync(output)
    .filter(file => file.endsWith('.tgz'))
    .map(file => join(output, file));
  assert.equal(tarballs.length, 2);
  for (const file of tarballs) {
    const entries = capture('tar', ['-tzf', file]).split('\n');
    for (const name of ['README.md', 'LICENSE', 'package.json'])
      assert(entries.includes(`package/${name}`), `Missing ${name}`);
    assert(
      entries.some(name => name.startsWith('package/dist/')),
      'Missing build output',
    );
    assert(
      !entries.some(name => /package\/(src|tests|node_modules)\//u.test(name)),
      'Unexpected package contents',
    );
    const manifest = JSON.parse(capture('tar', ['-xOf', file, 'package/package.json']));
    assert.equal(manifest.version, version);
    assert(
      !JSON.stringify(manifest.dependencies).includes('workspace:'),
      'Unresolved workspace dependency',
    );
  }
  const consumer = mkdtempSync(join(tmpdir(), 'hygiene-release-consumer-'));
  try {
    run(
      'npm',
      [
        'install',
        '--ignore-scripts',
        '--no-audit',
        '--no-fund',
        '--package-lock=false',
        ...tarballs,
      ],
      consumer,
    );
    run(
      process.execPath,
      [
        '--input-type=module',
        '-e',
        `
      import assert from 'node:assert/strict';
      import { validateCommit, validateBranch } from '@chitrank2050/git-hygiene-core';
      assert.equal((await validateCommit('feat: example')).valid, true);
      assert.equal((await validateCommit('invalid')).valid, false);
      assert.equal((await validateBranch('feat/example')).valid, true);
    `,
      ],
      consumer,
    );
    run(
      process.execPath,
      [
        join(consumer, 'node_modules/@chitrank2050/git-hygiene/dist/cli.js'),
        'title',
        'feat: example',
      ],
      consumer,
    );
  } finally {
    rmSync(consumer, { recursive: true, force: true });
  }
} else if (process.argv[2] === 'publish-npm') {
  assert(process.env.NODE_AUTH_TOKEN, 'Missing npm publishing credentials');
  for (const pkg of packages) {
    const filename = `${pkg.name.replace('@', '').replace('/', '-')}-${version}.tgz`;
    const file = join(output, filename);
    const integrity = `sha512-${createHash('sha512').update(readFileSync(file)).digest('base64')}`;
    const url = `https://registry.npmjs.org/${encodeURIComponent(pkg.name)}/${version}`;
    const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (response.ok) {
      const data = /** @type {{ dist: { integrity: string } }} */ (await response.json());
      assert.equal(
        data.dist.integrity,
        integrity,
        `Published artifact differs: ${pkg.name}. Refusing to overwrite or skip.`,
      );
      console.log(`Verified existing artifact: ${pkg.name}@${version}`);
    } else {
      assert.equal(response.status, 404, `Registry lookup failed: ${response.status}`);
      run('npm', ['publish', file, '--access', 'public', '--provenance', '--ignore-scripts']);
    }
  }
} else {
  throw new Error('Expected check, pack, or publish-npm');
}
