# @chitrank2050/git-hygiene-action 🌊

GitHub Action wrapper for `git-hygiene`. Zero-dependency and hyper-optimized for CI.

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
        uses: chitranklabs/git-hygiene/packages/action@<SHA> # v0.1.0
        with:
          command: 'title'
          value: '${{ github.event.pull_request.title }}'
```

## ⚙️ Inputs

| Input     | Description                                                 | Required |
| --------- | ----------------------------------------------------------- | -------- |
| `command` | The validation command to run (`branch`, `title`, `commit`) | **Yes**  |
| `value`   | The value to validate (required for `title` and `commit`)   | No       |

## 📜 License

MIT
