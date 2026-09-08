# Contributing to git-hygiene 🌊🏗️

First off, thank you for considering contributing to `git-hygiene`! It's people like you that make it a great tool for everyone.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Getting Started

### Prerequisites

- **Node.js**: v24 (Stable) or higher
- **pnpm**: use the exact `packageManager` version in the root `package.json` (currently 11.25.0).

### Repository Structure

This is a monorepo managed with **pnpm workspaces** and **Turborepo**:

- `packages/core`: 🧠 The validation engine, including configuration and Git-history access. See its [README](packages/core/README.md).
- `packages/cli`: 🌊 The command-line interface. Built on top of core.
- `app`: 🌐 Next.js documentation and interactive web application.

### Local Setup

1. **Clone the repo**:

   ```bash
   git clone https://github.com/chitranklabs/git-hygiene.git
   cd git-hygiene
   ```

2. **Install dependencies**:

   ```bash
   pnpm install --frozen-lockfile
   ```

3. **Build the project**:

   ```bash
   pnpm build
   ```

## Development Workflow

### Package-specific work

Run commands from the repository root:

```bash
pnpm --filter @chitrank2050/git-hygiene-core test
pnpm --filter @chitrank2050/git-hygiene test
pnpm --filter git-hygiene-app dev
```

Build first when testing the CLI so workspace dependencies and the action bundle exist. Do not launch separate `pnpm build` and `pnpm test:cov` processes concurrently in the same checkout; both can write build outputs.

### Action bundle maintenance

`action.yml` runs the tracked `dist/action.js`, not an npm download. After CLI/core source or runtime dependency changes, run `pnpm build` and include the resulting bundle changes. `pnpm build:action` alone assumes the core build is already current.

Run the CLI tests after regeneration. Review generated changes alongside their source; a source-only fix does not update the bundle consumed by a pinned action.

### 🌿 Branch Naming

We enforce strict branch naming via CI. Please use the following format:
`type/description` (e.g., `feat/add-new-validator`)

Allowed types: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `revert`, `maintenance`.

### 🧪 Testing, Linting & Maintenance

Before pushing, please ensure your changes pass our quality checks:

```bash
# Run tests across all workspace packages
pnpm test

# Run tests with coverage reports
pnpm test:cov

# Run code style and static analysis
pnpm lint
pnpm format:check

# Clean all build outputs and caches across packages
pnpm clean
```

### 💬 Commit Messages & Changesets

- **Conventional Commits**: Format your commit messages as:
  `type(scope): description`
- **Changesets (for library changes)**:
  If your PR introduces consumer-facing fixes, features, or breaking changes to `@chitrank2050/git-hygiene` or `@chitrank2050/git-hygiene-core`, please include a changeset:

  ```bash
  pnpm changeset
  ```

  Follow the interactive CLI to choose the bump type (`patch`, `minor`, `major`) and add a concise summary. Changes solely affecting the website (`app/`), internal CI, or documentation do not need a changeset (or can use `pnpm changeset --empty`).

## Pull Request Process

1. **Link an Issue**: Every PR should ideally address an existing issue.
2. **Keep it Focused**: Small, surgical PRs are much easier to review and merge.
3. **Automated Feedback**: Our CI jobs will automatically validate your branch name, PR title, and commit history.
4. **Approval**: Once the CI passes, a maintainer will review your code.

## Release Process 🚀

We use an automated monorepo release flow powered by **Changesets** and **git-cliff**:

1. **Preparation**: Trigger the **Release 1 - Prepare PR** action on `main`. It consumes pending `.changeset/*.md` files, synchronizes package and JSR versions, and updates `CHANGELOG.md`.
2. **Review**: Review the generated release PR (`chore/release-vX.Y.Z`).
3. **Finalization**: Merging a qualifying release PR triggers **Release 2 - Finalize**. The workflow tags, builds, publishes to npm and JSR, and creates build-provenance attestations. Consult the workflow before running a release; a build passing locally does not verify registry credentials or publication.

CLI and core form a fixed version group in `.changeset/config.json`; `app` is private and ignored. Each published package keeps its own README. The root README introduces the repository and action; the app README covers website development.

## Need Help?

If you have questions, feel free to open a **GitHub Discussion**!

Happy coding! 🚀✨
