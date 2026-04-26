<div align="center">
  <img src="./assets/hero-banner.png" alt="Git Hygiene Hero Banner" width="100%" />

# git-hygiene 🌊

**The ultimate zero-dependency metadata validator for modern Git workflows.**

[![CI](https://github.com/chitranklabs/git-hygiene/actions/workflows/ci.yml/badge.svg)](https://github.com/chitranklabs/git-hygiene/actions/workflows/ci.yml)
[![Scorecard](https://github.com/chitranklabs/git-hygiene/actions/workflows/scorecard.yml/badge.svg)](https://github.com/chitranklabs/git-hygiene/actions/workflows/scorecard.yml)
[![NPM Version](https://img.shields.io/npm/v/@chitrank2050/git-hygiene?color=blue&label=npm)](https://www.npmjs.com/package/@chitrank2050/git-hygiene)
[![JSR Version](https://img.shields.io/jsr/v/@chitrank2050/git-hygiene?color=yellow&label=jsr)](https://jsr.io/@chitrank2050/git-hygiene)
[![License](https://img.shields.io/github/license/chitranklabs/git-hygiene)](./LICENSE)

[Features](#features) • [Installation](#installation) • [Usage](#usage) • [Architecture](#architecture) • [Contributing](#contributing)

</div>

<br />

`git-hygiene` is a high-performance, **zero-dependency** engine designed to enforce perfect metadata across your entire Git lifecycle. Built natively for **Node.js 24+**, it validates Conventional Commits, branch naming patterns, and Pull Request titles with microsecond startup times.

---

## Features <a id="features"></a> ✨

| Feature | Description                |
| ------- | -------------------------- | --------------------------------------------------------------------------- |
| 🧼      | **Unified Engine**         | Define your standards once. Enforce them in commits, branches, and PRs.     |
| ⚡      | **Zero Dependencies**      | Built using native Node.js APIs. No `commander`, `yargs`, or `chalk` bloat. |
| 🛡️      | **Hardened Security**      | 100% SHA-pinned workflows and OpenSSF Scorecard verified.                   |
| 📦      | **Universal Distribution** | Native support for **NPM**, **JSR**, and **GitHub Actions**.                |
| 🧠      | **Context Aware**          | Automatically detects `.git` environment and CI context.                    |

---

## Installation <a id="installation"></a> 📦

```bash
# Using pnpm (Recommended)
pnpm add -D @chitrank2050/git-hygiene

# Using npm
npm install --save-dev @chitrank2050/git-hygiene
```

---

## Usage <a id="usage"></a> 🛠️

### 1. Local Hooks (Lefthook)

The recommended way to use `git-hygiene` locally.

```yaml
# lefthook.yml
commit-msg:
  commands:
    hygiene:
      run: npx @chitrank2050/git-hygiene commit {1}

pre-push:
  commands:
    hygiene:
      run: npx @chitrank2050/git-hygiene branch
```

### 2. Local Hooks (Husky)

For projects using Husky 9+.

```bash
# .husky/commit-msg
npx @chitrank2050/git-hygiene commit $1

# .husky/pre-push
npx @chitrank2050/git-hygiene branch
```

### 3. GitHub Actions (CI)

Validate PR metadata natively. We recommend pinning to a specific SHA.

```yaml
# Validate PR Title
- name: Validate PR Title 🏷️
  uses: chitranklabs/git-hygiene/packages/action@<SHA>
  with:
    command: 'title'
    value: '${{ github.event.pull_request.title }}'

# Validate Branch Name
- name: Validate Branch Name 🌿
  uses: chitranklabs/git-hygiene/packages/action@<SHA>
  with:
    command: 'branch'
    value: '${{ github.head_ref }}'
```

### 4. Manual / Script Usage

Run any check manually from the terminal.

```bash
# Check a specific commit message
npx @chitrank2050/git-hygiene commit "feat: add super speed"

# Check a branch name string
npx @chitrank2050/git-hygiene branch "feature/cool-stuff"

# Check a PR title
npx @chitrank2050/git-hygiene title "fix(core): resolve memory leak"
```

### 5. Programmatic Usage (Library)

Import the engine directly into your TypeScript project.

```typescript
import { validateBranch } from '@chitrank2050/git-hygiene-core';

const { valid, error } = validateBranch('feat/new-ui');
```

---

## ⚙️ Configuration

Configure your rules in the root `package.json`.

```json
{
  "git-hygiene": {
    "types": ["feat", "fix", "chore", "docs", "refactor", "test"],
    "ignoreBranches": ["main", "develop"],
    "maxHeaderLength": 72
  }
}
```

---

## Architecture <a id="architecture"></a> 🏛️

```mermaid
graph TD
    A[Consumer Project] -->|CLI| B(@chitrank2050/git-hygiene)
    A -->|Action| C(@chitrank2050/git-hygiene-action)
    B --> D(@chitrank2050/git-hygiene-core)
    C --> D
    D -->|Engine| E(Conventional Commits & Regex)
```

---

## 🙏 Credits

`git-hygiene` stands on the shoulders of giants. Special thanks to:

- **[commitlint](https://commitlint.js.org/)**: For the industry-standard commit validation logic we use under the hood.

---

## 📜 License

MIT - see [LICENSE](LICENSE) for details.

If you use `git-hygiene` in your project, a star or credit is appreciated. ✨

---

## Contributing <a id="contributing"></a> 🤝

We ❤️ contributions! Whether you're fixing a bug, adding a feature, or improving documentation:

1. **Fork** the repository.
2. **Create** a branch (`feat/amazing-feature`).
3. **Commit** your changes (using Conventional Commits!).
4. **Push** to the branch.
5. **Open** a Pull Request.

Please see our [SECURITY.md](./SECURITY.md) for reporting vulnerabilities.

---

<div align="center">
  ❤️ Developed by [Chitrank Agnihotri](https://www.chitrankagnihotri.com)
</div>
