<div align="center">
  <h1>@chitrank2050/git-hygiene 🌊</h1>

**The ultimate zero-dependency metadata validator for modern Git workflows.**

[![NPM Version](https://img.shields.io/npm/v/@chitrank2050/git-hygiene?color=blue&label=npm)](https://www.npmjs.com/package/@chitrank2050/git-hygiene)
[![JSR Version](https://jsr.io/badges/@chitrank2050/git-hygiene)](https://jsr.io/@chitrank2050/git-hygiene)
[![License](https://img.shields.io/github/license/chitranklabs/git-hygiene)](../../LICENSE)

</div>

<br />

`git-hygiene` is a high-performance, **zero-dependency** CLI tool that enforces **Conventional Commits**, **branch naming patterns**, and **PR titles** using a single, unified engine. Built natively for **Node.js 24 (Stable)** with microsecond startup times.

## 📦 Installation

```bash
# Recommended: Install as a dev dependency
pnpm add -D @chitrank2050/git-hygiene

# Or using JSR
npx jsr add @chitrank2050/git-hygiene

# Or run instantly via npx
npx @chitrank2050/git-hygiene --help
```

## 🛠️ Commands

### `branch` 🌿

Validates the current checked-out branch name against your project rules. Perfect for `pre-push` hooks.

```bash
npx @chitrank2050/git-hygiene branch
```

### `commit <text|file>` 📜

Validates a commit message string or a file (like `.git/COMMIT_EDITMSG`). Perfect for `commit-msg` hooks.

```bash
npx @chitrank2050/git-hygiene commit "feat: add super speed"
# OR
npx @chitrank2050/git-hygiene commit .git/COMMIT_EDITMSG
```

### `title <text>` 🏷️

Validates a Pull Request title string.

```bash
npx @chitrank2050/git-hygiene title "feat(cli): add colors"
```

### `bump` 🚀

Suggests the next semantic version number (patch, minor, or major) based on your commit history since the last tag.

```bash
npx @chitrank2050/git-hygiene bump
```

### `--json` 🤖

Output results as machine-readable JSON. Perfect for CI/CD pipelines.

```bash
npx @chitrank2050/git-hygiene bump --json
npx @chitrank2050/git-hygiene title "feat: test" --json
```

## ⚙️ Configuration

`git-hygiene` is designed to be zero-config, but you can easily customize the rules by adding a `git-hygiene` block to your root `package.json`.

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
| `rules`           | Raw commitlint rules to merge/override | `{}`                                        | `Record<string, unknown>`        |

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

## ⚓ Git Hook Integration

### Lefthook (Recommended)

Add this to your `lefthook.yml` for blazing-fast enforcement:

```yaml
commit-msg:
  commands:
    hygiene:
      run: npx @chitrank2050/git-hygiene commit {1}

pre-push:
  commands:
    hygiene:
      run: npx @chitrank2050/git-hygiene branch
```

### Husky

For projects using Husky 9+:

```bash
# .husky/commit-msg
npx @chitrank2050/git-hygiene commit $1

# .husky/pre-push
npx @chitrank2050/git-hygiene branch
```

## 📜 License

MIT - see [LICENSE](../../LICENSE) for details.
