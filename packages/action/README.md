# Git Hygiene Action 🌊

GitHub Action wrapper for the `git-hygiene` metadata validator.

## Usage

### Validate PR Title

```yaml
- uses: chitrank2050/git-hygiene/packages/action@main
  with:
    command: title
    value: ${{ github.event.pull_request.title }}
```

### Validate Branch Name

```yaml
- uses: chitrank2050/git-hygiene/packages/action@main
  with:
    command: branch
    value: ${{ github.head_ref }}
```
