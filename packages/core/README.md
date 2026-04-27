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
if (!branchResult.valid) {
  console.error(`Invalid branch: ${branchResult.error}`);
}

// 2. Validate a PR title
const titleResult = validateTitle('feat: implement oauth2');
console.log(`Title valid: ${titleResult.valid}`);

// 3. Validate a commit message (Async)
// Returns a detailed report including commitlint warnings/errors
const commitResult = await validateCommit('fix: resolve memory leak');
if (commitResult.valid) {
  console.log('✅ Commit follows standards');
} else {
  console.log('❌ Commit validation failed:');
  commitResult.errors.forEach(err => console.log(`- ${err.message}`));
}

// 4. Suggest a semantic version bump
const bump = await getRecommendedBump();
console.log(`Recommended bump: ${bump.releaseType} (Reason: ${bump.reason})`);
```

## ⚙️ Configuration

`git-hygiene` is designed to be zero-config, but you can easily customize the engine by adding a `git-hygiene` block to your root `package.json`.

| Property          | Description                            | Default                                     | Possible Values                  |
| ----------------- | -------------------------------------- | ------------------------------------------- | -------------------------------- |
| `types`           | Allowed commit types                   | `feat`, `fix`, `chore`, etc.                | `string[]`                       |
| `ignoreBranches`  | Branches to skip validation            | `main`, `master`, `development`, `gh-pages` | `string[]`                       |
| `maxHeaderLength` | Max length of the commit header        | `100`                                       | `number`                         |
| `maxBodyLength`   | Max length of a single body line       | `1000`                                      | `number`                         |
| `minBodyLength`   | Min length of the commit body          | `0`                                         | `number`                         |
| `typeCase`        | Case requirement for types             | `lower-case`                                | `lower-case`, `upper-case`, etc. |
| `scopeCase`       | Case requirement for scopes            | `lower-case`                                | `lower-case`, `upper-case`, etc. |
| `allowEmptyScope` | Whether scope is optional              | `true`                                      | `boolean`                        |
| `subjectFullStop` | Whether subject can end with a period  | `never`                                     | `always`, `never`                |
| `extends`         | Standard configs to extend from        | `[]`                                        | `string[]`                       |
| `rules`           | Raw commitlint rules to merge/override | `{}`                                        | `Record<string, any>`            |

```json
{
  "git-hygiene": {
    "extends": ["@commitlint/config-conventional"],
    "types": ["feat", "fix", "chore", "docs", "refactor", "test", "renovate"],
    "ignoreBranches": ["main", "develop", "release/*"],
    "maxHeaderLength": 100,
    "allowEmptyScope": false,
    "rules": {
      "subject-case": [2, "always", "sentence-case"]
    }
  }
}
```

## 📜 License

MIT - see [LICENSE](../../LICENSE) for details.
