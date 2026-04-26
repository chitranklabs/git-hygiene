<div align="center">
  <h1>@chitrank2050/git-hygiene 🌊</h1>

**The ultimate zero-dependency metadata validator for modern Git workflows.**

[![NPM Version](https://img.shields.io/npm/v/@chitrank2050/git-hygiene?color=blue&label=npm)](https://www.npmjs.com/package/@chitrank2050/git-hygiene)
[![JSR Version](https://img.shields.io/jsr/v/@chitrank2050/git-hygiene?color=yellow&label=jsr)](https://jsr.io/@chitrank2050/git-hygiene)
[![License](https://img.shields.io/github/license/chitranklabs/git-hygiene)](../../LICENSE)

</div>

<br />

`git-hygiene` is a high-performance CLI tool that enforces **Conventional Commits**, **branch naming patterns**, and **PR titles** using a single, unified engine. Built with native Node.js APIs for blazing-fast microsecond startup times.

## 📦 Installation

```bash
# Recommended: Install as a dev dependency
pnpm add -D @chitrank2050/git-hygiene

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

## ⚓ Git Hook Integration (Lefthook)

Add this to your `lefthook.yml` for automatic enforcement:

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

## 📜 License

MIT - see [LICENSE](../../LICENSE) for details.
