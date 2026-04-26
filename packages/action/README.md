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
| :-------- | :---------------------------------------------------------- | :------- |
| `command` | The validation command to run (`branch`, `title`, `commit`) | **Yes**  |
| `value`   | The value to validate (required for `title` and `commit`)   | No       |

## ⚙️ Configuration

`git-hygiene` is designed to be zero-config, but you can easily customize the rules by adding a `git-hygiene` block to your root `package.json`.

| Property          | Description                           | Default                                     | Possible Values                  |
| ----------------- | ------------------------------------- | ------------------------------------------- | -------------------------------- |
| `types`           | Allowed commit types                  | `feat`, `fix`, `chore`, etc.                | `string[]`                       |
| `ignoreBranches`  | Branches to skip validation           | `main`, `master`, `development`, `gh-pages` | `string[]`                       |
| `maxHeaderLength` | Max length of the commit header       | `72`                                        | `number`                         |
| `maxBodyLength`   | Max length of a single body line      | `1000`                                      | `number`                         |
| `minBodyLength`   | Min length of the commit body         | `0`                                         | `number`                         |
| `typeCase`        | Case requirement for types            | `lower-case`                                | `lower-case`, `upper-case`, etc. |
| `scopeCase`       | Case requirement for scopes           | `lower-case`                                | `lower-case`, `upper-case`, etc. |
| `allowEmptyScope` | Whether scope is optional             | `true`                                      | `boolean`                        |
| `subjectFullStop` | Whether subject can end with a period | `never`                                     | `always`, `never`                |

```json
{
  "git-hygiene": {
    "types": ["feat", "fix", "chore", "docs", "refactor", "test"],
    "ignoreBranches": ["main", "develop", "release/*"],
    "maxHeaderLength": 100,
    "allowEmptyScope": false
  }
}
```

## 📜 License

MIT - see [LICENSE](../../LICENSE) for details.
