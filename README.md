# git-hygiene 🌊

The ultimate zero-dependency metadata validator for modern Git workflows. Enforce conventional commits, branch naming patterns, and PR titles with blazing-fast native Node.js performance.

## 🚀 Features

- **Zero Runtime Dependencies**: Built with native Node.js APIs (`util.parseArgs`, native test runner).
- **Fast**: Microsecond startup time via ESM bundling.
- **2027 Ready**: Optimized for Node.js 23+ Type Stripping.
- **Unified Logic**: One standard for Commits, Branches, and PR Titles.
- **Hybrid Distribution**: Published to both **NPM** and **JSR**.

## 📦 Installation

```bash
pnpm add -D git-hygiene
# or
npx git-hygiene --help
```

## 🛠️ Usage

### Local Hooks (Lefthook / Husky)

```yml
# lefthook.yml
commit-msg:
  commands:
    lint:
      run: npx git-hygiene commit {1}

pre-push:
  commands:
    branch:
      run: npx git-hygiene branch
```

### GitHub Actions

```yml
- uses: chitrank2050/git-hygiene@v1
  with:
    title: ${{ github.event.pull_request.title }}
```

## 📜 License

MIT
