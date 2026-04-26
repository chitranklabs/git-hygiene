<div align="center">
  <h1>@chitrank2050/git-hygiene-core 🧠</h1>

**The standalone validation engine behind `git-hygiene`.**

[![NPM Version](https://img.shields.io/npm/v/@chitrank2050/git-hygiene-core?color=blue&label=npm)](https://www.npmjs.com/package/@chitrank2050/git-hygiene-core)
[![JSR Version](https://img.shields.io/jsr/v/@chitrank2050/git-hygiene-core?color=yellow&label=jsr)](https://jsr.io/@chitrank2050/git-hygiene-core)
[![License](https://img.shields.io/github/license/chitranklabs/git-hygiene)](../../LICENSE)

</div>

<br />

`@chitrank2050/git-hygiene-core` provides the core validation logic for modern Git workflows. Built natively for **Node.js 24+**, it offers high-performance validation with zero external dependencies (other than the standard `commitlint` engine).

## Features ✨

- **Conventional Commits**: Full support for standard conventional commit validation.
- **Branch Names**: Powerful regex-based branch name enforcement.
- **PR Titles**: Validates pull request metadata for clean repository history.
- **Context Aware**: Automatically detects rules from your `package.json`.

## 📦 Installation

```bash
# Using pnpm
pnpm add @chitrank2050/git-hygiene-core

# Using npm
npm install @chitrank2050/git-hygiene-core
```

## 🛠️ Usage

```typescript
import { validateBranch, validateTitle, validateCommit } from '@chitrank2050/git-hygiene-core';

// 1. Validate a branch name
const branchResult = validateBranch('feat/add-login');
console.log(branchResult.valid); // true

// 2. Validate a PR title
const titleResult = validateTitle('feat: implement oauth2');
console.log(titleResult.valid); // true

// 3. Validate a commit message (Async)
const commitResult = await validateCommit('fix: resolve memory leak');
console.log(commitResult.valid); // true
```

## ⚙️ Configuration

The core engine automatically looks for a `git-hygiene` block in your root `package.json`.

```json
{
  "git-hygiene": {
    "types": ["feat", "fix", "chore", "docs", "refactor"],
    "ignoreBranches": ["main", "develop"],
    "maxHeaderLength": 72
  }
}
```

## 📜 License

MIT - see [LICENSE](../../LICENSE) for details.
