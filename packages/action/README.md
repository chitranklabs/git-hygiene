<div align="center">
  <h1>@chitrank2050/git-hygiene-action 🌊</h1>

**GitHub Action wrapper for `git-hygiene`. Zero-dependency and hyper-optimized for CI.**

[![CI Status](https://github.com/chitranklabs/git-hygiene/actions/workflows/ci.yml/badge.svg)](https://github.com/chitranklabs/git-hygiene/actions/workflows/ci.yml)
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/chitranklabs/git-hygiene/badge)](https://scorecard.dev/viewer/?uri=github.com/chitranklabs/git-hygiene)
[![License](https://img.shields.io/github/license/chitranklabs/git-hygiene)](../../LICENSE)

</div>

<br />

`git-hygiene-action` allows you to enforce perfect metadata across your entire Git lifecycle directly within your GitHub Actions pipeline. Built natively for **Node.js 24+**, it validates Conventional Commits, branch naming patterns, and PR titles with microsecond startup times.

## 🚀 Usage

Add this to your `.github/workflows/hygiene.yml`:

```yaml
name: Git Hygiene 🌊

on:
  pull_request:
    types: [opened, edited, synchronize]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - name: Validate PR Title 🏷️
        uses: chitranklabs/git-hygiene/packages/action@main # We recommend pinning to a SHA
        with:
          command: 'title'
          value: '${{ github.event.pull_request.title }}'

      - name: Validate Branch Name 🌿
        uses: chitranklabs/git-hygiene/packages/action@main
        with:
          command: 'branch'
          value: '${{ github.head_ref }}'
```

## ⚙️ Inputs

| Input     | Description                                                 | Required |
| --------- | ----------------------------------------------------------- | -------- |
| `command` | The validation command to run (`branch`, `title`, `commit`) | **Yes**  |
| `value`   | The value to validate (required for `title` and `commit`)   | No       |

## 📜 License

MIT - see [LICENSE](../../LICENSE) for details.
