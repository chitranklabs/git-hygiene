# @chitrank2050/git-hygiene-core 🧠

The standalone validation engine behind `git-hygiene`.

This package provides the core logic for validating:

- **Conventional Commits** (via `@commitlint/lint`)
- **Branch Names** (via configurable regex)
- **PR Titles** (via configurable regex)

## 📦 Installation

```bash
pnpm add @chitrank2050/git-hygiene-core
```

## 🛠️ Usage

```typescript
import { validateBranch, validateTitle, validateCommit } from '@chitrank2050/git-hygiene-core';

// Validate a branch name
const branchResult = validateBranch('feat/add-login');
console.log(branchResult.valid); // true

// Validate a PR title
const titleResult = validateTitle('feat: implement oauth2');
console.log(titleResult.valid); // true

// Validate a commit message (Async)
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

MIT
