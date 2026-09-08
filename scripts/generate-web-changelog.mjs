import { execSync } from 'node:child_process';
import { existsSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const changelogJsonPath = path.join(rootDir, 'app/src/lib/changelog.json');
const cliffConfigPath = path.join(rootDir, 'cliff.toml');

function isGitCliffAvailable() {
  try {
    execSync('git-cliff --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function generateChangelog() {
  if (isGitCliffAvailable() && existsSync(cliffConfigPath)) {
    console.log('📖 Generating web changelog with git-cliff...');
    try {
      execSync(`git-cliff --config "${cliffConfigPath}" --context -o "${changelogJsonPath}"`, {
        cwd: rootDir,
        stdio: 'inherit',
      });
      console.log('✅ Web changelog generated successfully.');
      return;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.warn('⚠️ git-cliff generation encountered an issue:', message);
    }
  }

  if (!existsSync(changelogJsonPath)) {
    console.log('ℹ️ git-cliff not available, generating fallback empty changelog dataset.');
    writeFileSync(changelogJsonPath, '[]\n', 'utf8');
  } else {
    console.log('ℹ️ Preserving existing web changelog dataset.');
  }
}

generateChangelog();
