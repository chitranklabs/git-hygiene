# git-hygiene 🌊

> The ultimate zero-dependency metadata validator for modern Git workflows.

`git-hygiene` enforces Conventional Commits, branch naming patterns, and PR titles using a single, unified engine. Built with native Node.js APIs for blazing-fast microsecond startup times.

## ✨ Why `git-hygiene`?

Historically, enforcing Git standards required stringing together multiple tools: `commitlint` for messages, a custom shell script for branches, and a GitHub Action for PR titles. 

`git-hygiene` solves this by providing a **Unified Metadata Engine**:
- **One Standard**: Define your types (`feat`, `fix`, `chore`, etc.) once. They apply everywhere.
- **Zero Dependencies**: The CLI uses Node 24+ native `util.parseArgs` to start instantly. No `commander` or `yargs` overhead.
- **Universal**: Run it locally via Lefthook/Husky or in CI via our provided GitHub Action.

## 📦 Installation

Available on both **NPM** and **JSR**.

```bash
# via NPM
pnpm add -D git-hygiene

# via JSR
npx jsr add @chitranklabs/git-hygiene-cli
```

## 🛠️ Usage

### 1. Local Hooks (Lefthook / Husky)

Validate branch names before pushing and commit messages before saving.

```yaml
# lefthook.yml
commit-msg:
  commands:
    hygiene:
      run: npx git-hygiene commit {1}

pre-push:
  commands:
    hygiene:
      run: npx git-hygiene branch
```

### 2. GitHub Actions

Validate PR titles natively in your CI pipeline.

```yaml
# .github/workflows/pr-title.yml
name: PR Title Validation

on:
  pull_request:
    types: [opened, edited, synchronize]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - name: Validate PR Title 🌊
        uses: chitranklabs/git-hygiene/packages/action@main
        with:
          command: title
          value: ${{ github.event.pull_request.title }}
```

## 🏛️ Monorepo Architecture

This project is built as a high-performance monorepo using Turborepo:

- **`@git-hygiene/core`**: The standalone validation engine. Published to NPM and JSR.
- **`git-hygiene`**: The zero-dependency CLI tool.
- **`@git-hygiene/action`**: The GitHub Composite Action wrapper.

## 🤝 Contributing

We use `pnpm` and `turbo`.

```bash
pnpm install
pnpm dev    # Uses Node --experimental-strip-types
pnpm test   # Uses Node native test runner
pnpm build  # Bundles via tsup
```

## 📜 License

MIT © Chitrank Agnihotri
