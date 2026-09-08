# Git Hygiene website

This private workspace contains the documentation site and interactive examples. It is not the published CLI or core package and is excluded from Changesets versioning.

## Technical Specification

- Next.js App Router, React, Tailwind CSS, and Monoline UI.
- Node.js 24+ and the pnpm version declared in the root manifest.
- Dependencies are installed from the workspace root using the shared lockfile.

## Development

Run from the repository root:

```bash
pnpm install --frozen-lockfile
pnpm --filter git-hygiene-app dev
```

The development server listens on port 3005.

## Build and preview

```bash
pnpm --filter git-hygiene-app build
pnpm --filter git-hygiene-app start
```

`start` uses Next.js's default port unless overridden; it does not inherit the development port.

## Changelog data

The prebuild and development scripts run [generate-web-changelog.mjs](../scripts/generate-web-changelog.mjs). With git-cliff available, it generates `src/lib/changelog.json` from Git history and the root `cliff.toml`.

> [!IMPORTANT]
> Without git-cliff, the script preserves an existing dataset or writes an empty array. A successful build therefore does not guarantee populated changelog content. Provide git-cliff and relevant history/tags when building a site that needs release history.

Do not edit the generated JSON manually. Package versioning is separate; see [Contributing](../CONTRIBUTING.md).

<p align="center">❤️ Developed by <a href="https://www.chitrankagnihotri.com"><strong>Chitrank Agnihotri</strong></a></p>
