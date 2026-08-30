"use client"

import { useState } from "react"
import { CodeBlock } from "@/src/components/ui"

const INTEGRATIONS = [
	{
		id: "lefthook",
		title: "Lefthook",
		badge: "Recommended",
		filename: "lefthook.yml",
		description: "Fast parallel git hooks with native pre-commit and pre-push validation.",
		code: `# lefthook.yml
commit-msg:
  commands:
    hygiene:
      run: npx @chitrank2050/git-hygiene commit {1}

pre-push:
  commands:
    hygiene:
      run: npx @chitrank2050/git-hygiene branch`,
	},
	{
		id: "husky",
		title: "Husky",
		badge: "Classic",
		filename: ".husky/commit-msg",
		description: "Zero-dependency git hook scripts for modern NPM/PNPM workspaces.",
		code: `# .husky/commit-msg
npx @chitrank2050/git-hygiene commit $1

# .husky/pre-push
npx @chitrank2050/git-hygiene branch`,
	},
	{
		id: "github-action",
		title: "GitHub Actions",
		badge: "CI / CD",
		filename: ".github/workflows/hygiene.yml",
		description: "Automated PR title inspection, branch rules, and semantic version calculation.",
		code: `name: Git Hygiene CI

on:
  pull_request:
    types: [opened, edited, synchronize]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Validate Metadata 🌊
        uses: chitranklabs/git-hygiene@v0.4.12
        with:
          github-token: \${{ secrets.GITHUB_TOKEN }}`,
	},
]

export function IntegrationTabs() {
	const [activeId, setActiveId] = useState("lefthook")
	const active = INTEGRATIONS.find((i) => i.id === activeId) || INTEGRATIONS[0]

	return (
		<div className="mt-ml-8 rounded-2xl border border-border bg-surface/60 p-ml-6 md:p-ml-8 shadow-md">
			{/* Tab Selector */}
			<div className="flex flex-wrap items-center gap-2 border-b border-border pb-ml-4">
				{INTEGRATIONS.map((tab) => (
					<button
						key={tab.id}
						type="button"
						onClick={() => setActiveId(tab.id)}
						className={`cursor-pointer inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 font-mono text-xs font-semibold transition-all ${
							activeId === tab.id
								? "border-accent bg-surface-2 text-text shadow-xs"
								: "border-transparent bg-transparent text-text-muted hover:bg-surface-2/60 hover:text-text"
						}`}
					>
						<span>{tab.title}</span>
						<span
							className={`rounded px-1.5 py-0.5 text-3xs uppercase tracking-wider ${
								activeId === tab.id
									? "bg-accent-soft text-accent"
									: "bg-surface-2 text-text-muted"
							}`}
						>
							{tab.badge}
						</span>
					</button>
				))}
			</div>

			{/* Tab Content */}
			<div className="mt-ml-6 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-ml-8 items-start">
				<div>
					<h3 className="font-mono text-base font-bold text-text">
						{active.title} Integration
					</h3>
					<p className="mt-2 text-sm text-text-secondary leading-relaxed font-sans">
						{active.description}
					</p>

					<div className="mt-ml-6 space-y-3 font-mono text-xs text-text-muted border-t border-border pt-ml-4">
						<div className="flex items-center gap-2">
							<span className="text-accent">✓</span>
							<span>Validates standard Conventional Commits</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-accent">✓</span>
							<span>Enforces type/description branch patterns</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-accent">✓</span>
							<span>Inherits <code>package.json</code> custom settings</span>
						</div>
					</div>
				</div>

				<div>
					<CodeBlock filename={active.filename} code={active.code} />
				</div>
			</div>
		</div>
	)
}
