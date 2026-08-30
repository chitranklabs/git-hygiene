import type { Metadata } from "next"

import { Button } from "@chitrank2050/monoline-ui/button"
import { Card } from "@chitrank2050/monoline-ui/card"
import { CodeBlock } from "@/src/components/ui"
import { Container } from "@chitrank2050/monoline-ui/container"
import { SectionHead } from "@chitrank2050/monoline-ui/section-head"
import { Status } from "@chitrank2050/monoline-ui/status"

import JsonLd, {
	createWebPageJsonLd,
	getPersonJsonLd,
	getSoftwareSourceCodeJsonLd,
	getWebsiteJsonLd,
} from "@/src/components/json-ld"
import { fetchIdentity } from "@/src/lib/identity"
import { createPageMetadata } from "@/src/lib/metadata"
import { getLatestRelease } from "@/src/lib/releases"
import { siteUrl } from "@/src/lib/seo"

import pkg from "@/package.json"

/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */
/* Hallmark · macrostructure: Workbench · genre: modern-minimal · theme: Sea Slate */

const homeTitle = "git-hygiene — Zero-Dependency Metadata Validator for Modern Git"
const homeDescription =
	"Enforce conventional commits, branch naming patterns, and PR titles with native Node.js 24+ type-stripping performance. Zero runtime dependencies."

export const metadata: Metadata = createPageMetadata({
	title: homeTitle,
	description: homeDescription,
	path: "/",
})

const stats = [
	{ value: "0", label: "Runtime Dependencies", note: "Pure native Node.js built-ins" },
	{ value: "<5ms", label: "Cold Startup", note: "Native TypeScript type-stripping" },
	{ value: "Node 24+", label: "Execution Engine", note: "Zero build step required" },
	{ value: "SLSA-3", label: "Security Provenance", note: "SHA-pinned & OpenSSF audited" },
]

const features = [
	{
		title: "Unified Standard Engine",
		description:
			"Define your naming standards once in package.json. Automatically validate local commits, pre-push branch checks, and GitHub Actions PR titles.",
		id: "01",
	},
	{
		title: "Zero Runtime Overhead",
		description:
			"Built without heavy CLI frameworks like commander or yargs. Lean footprint ensures instant execution on every git commit.",
		id: "02",
	},
	{
		title: "Hardened Supply Chain",
		description:
			"100% SHA-pinned workflows, SLSA Level 3 build provenance, Zizmor security audits, and Gitleaks secret protection.",
		id: "03",
	},
	{
		title: "Universal Multi-Registry",
		description:
			"Distributed natively on NPM, JSR (TypeScript-native), GitHub Marketplace Action, and as an importable core library.",
		id: "04",
	},
	{
		title: "Smart CI Omni-Mode",
		description:
			"Context-aware GitHub Action that automatically detects PR events, inspects branch names, and suggests semantic version increments.",
		id: "05",
	},
	{
		title: "Release Bump Analyzer",
		description:
			"Scans commit histories against Conventional Commits specs to recommend patch, minor, or major bumps with machine-readable JSON.",
		id: "06",
	},
]

const distributionPackages = [
	{
		name: "NPM Registry",
		package: "@chitrank2050/git-hygiene",
		href: "https://www.npmjs.com/package/@chitrank2050/git-hygiene",
		description: "Standard CLI runner for Node.js workflows and git hooks.",
		badge: "CLI",
	},
	{
		name: "JSR Registry",
		package: "@chitrank2050/git-hygiene",
		href: "https://jsr.io/@chitrank2050/git-hygiene",
		description: "TypeScript-native distribution for Deno and Node 24+ runtimes.",
		badge: "TypeScript",
	},
	{
		name: "GitHub Action",
		package: "chitranklabs/git-hygiene",
		href: "https://github.com/marketplace/actions/git-hygiene-validator",
		description: "Automated PR metadata validation with context auto-detection.",
		badge: "CI / CD",
	},
	{
		name: "Core Engine",
		package: "@chitrank2050/git-hygiene-core",
		href: "https://www.npmjs.com/package/@chitrank2050/git-hygiene-core",
		description: "Headless validation library for programmatic TypeScript integration.",
		badge: "Library",
	},
]

export default async function HomePage() {
	const [release, identity] = await Promise.all([
		getLatestRelease(),
		fetchIdentity(),
	])

	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": [
			identity ? getPersonJsonLd(identity) : null,
			getWebsiteJsonLd(identity, siteUrl),
			getSoftwareSourceCodeJsonLd(identity, siteUrl, pkg.version),
			createWebPageJsonLd({
				title: homeTitle,
				description: homeDescription,
				path: "/",
			}),
		].filter(Boolean),
	}

	return (
		<Container as="main" id="main-content" tabIndex={-1} className="pt-ml-12 pb-ml-24">
			<JsonLd data={jsonLd} />

			{/* HERO SECTION — Asymmetric Workbench Layout */}
			<section className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-ml-12 pt-ml-6">
				<div>
					<div className="flex flex-wrap items-center gap-2 mb-ml-6">
						<Status variant="accent" size="sm">
							{release.version}
						</Status>
						<span className="font-mono text-2xs font-medium uppercase tracking-wider text-text-muted px-2 py-0.5 rounded-md bg-surface-2 border border-border">
							Node.js 24+ Native
						</span>
					</div>

					<h1 className="font-mono text-text text-[clamp(2.2rem,4.2vw,3.4rem)] font-bold tracking-tight leading-[1.08]">
						Clean Git metadata. <br />
						<span className="text-accent">Zero runtime bloat.</span>
					</h1>

					<p className="mt-ml-5 text-text-secondary text-base font-normal leading-relaxed max-w-130 font-sans">
						Enforce conventional commits, branch naming patterns, and PR
						titles with native Node.js 24+ type-stripping speed. Built with zero external runtime dependencies.
					</p>

					<div className="flex flex-wrap items-center gap-ml-3 mt-ml-8">
						<Button asChild size="md">
							<a
								href="https://www.npmjs.com/package/@chitrank2050/git-hygiene"
								target="_blank"
								rel="noopener noreferrer"
							>
								Get Started
								<Button.Arrow />
							</a>
						</Button>
						<Button asChild variant="secondary" size="md">
							<a
								href="https://github.com/chitranklabs/git-hygiene"
								target="_blank"
								rel="noopener noreferrer"
							>
								Source Code ↗
							</a>
						</Button>
					</div>

					<div className="mt-ml-6 inline-flex items-center gap-2 font-mono text-xs text-text-muted bg-surface-2/70 border border-border px-ml-3.5 py-ml-2 rounded-lg">
						<span className="text-accent font-semibold">$</span>
						<code className="text-text font-mono">pnpm add -D @chitrank2050/git-hygiene</code>
					</div>
				</div>

				{/* HERO QUICK TERMINAL */}
				<div className="relative">
					<CodeBlock
						filename="terminal — quick run"
						code={`# Validate commit message
npx @chitrank2050/git-hygiene commit "feat(core): add type-stripping"

# Validate branch name
npx @chitrank2050/git-hygiene branch "feat/native-runner"

# Recommend next semantic version
npx @chitrank2050/git-hygiene bump --json
# => { "releaseType": "minor", "reason": "feat commit detected" }`}
					/>
				</div>
			</section>

			{/* STATS MATRIX */}
			<section
				className="grid grid-cols-2 md:grid-cols-4 gap-ml-6 mt-ml-16 border-y border-border py-ml-8"
				aria-label="Project stats"
			>
				{stats.map((item) => (
					<div key={item.label}>
						<strong className="block font-mono text-2xl font-bold text-text tracking-tight tabular-nums">
							{item.value}
						</strong>
						<span className="mt-1 block font-mono text-2xs font-semibold uppercase tracking-wider text-accent">
							{item.label}
						</span>
						<span className="block text-3xs text-text-muted mt-0.5 font-sans">
							{item.note}
						</span>
					</div>
				))}
			</section>

			{/* DISTRIBUTION REGISTRIES */}
			<section className="mt-ml-20">
				<SectionHead
					eyebrow="Distribution"
					title="One unified engine. Available across registries."
					size="sm"
					level={2}
				/>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-ml-4 mt-ml-6">
					{distributionPackages.map((pkgItem) => (
						<Card key={pkgItem.name} size="sm" asChild>
							<a
								href={pkgItem.href}
								target="_blank"
								rel="noopener noreferrer"
								className="block h-full no-underline transition-all hover:border-border-strong"
							>
								<Card.Body>
									<div className="flex items-center justify-between mb-ml-2">
										<span className="font-mono text-3xs font-bold text-accent uppercase tracking-wider">
											{pkgItem.badge}
										</span>
										<span className="text-text-muted text-xs">↗</span>
									</div>
									<h3 className="font-mono text-xs font-bold text-text truncate">
										{pkgItem.package}
									</h3>
									<p className="mt-1.5 text-xs text-text-muted leading-normal font-sans">
										{pkgItem.description}
									</p>
								</Card.Body>
							</a>
						</Card>
					))}
				</div>
			</section>

			{/* FEATURES GRID */}
			<section id="features" className="mt-ml-20 pt-ml-8 border-t border-border">
				<SectionHead
					eyebrow="Engine Design"
					title="Engineered for velocity, strictness, and reliability."
					size="sm"
					level={2}
				/>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-ml-4 mt-ml-6">
					{features.map((feat) => (
						<Card key={feat.title} size="md">
							<Card.Body>
								<span className="mb-ml-2 block font-mono text-2xs font-bold text-accent">
									{feat.id}
								</span>
								<h3 className="m-0 mb-1.5 text-sm font-semibold tracking-tight text-text font-sans">
									{feat.title}
								</h3>
								<p className="m-0 text-xs text-text-muted leading-relaxed font-sans">
									{feat.description}
								</p>
							</Card.Body>
						</Card>
					))}
				</div>
			</section>

			{/* WORKFLOW SETUP */}
			<section id="usage" className="mt-ml-20 pt-ml-8 border-t border-border">
				<SectionHead
					eyebrow="Integration"
					title="Drop into local hooks or CI workflows in seconds."
					size="sm"
					level={2}
				/>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-ml-6 mt-ml-6">
					<div>
						<h3 className="text-xs font-mono font-bold text-text mb-ml-2 flex items-center gap-1.5">
							<span className="text-accent">01.</span> Lefthook (Recommended)
						</h3>
						<CodeBlock
							filename="lefthook.yml"
							code={`commit-msg:
  commands:
    hygiene:
      run: npx @chitrank2050/git-hygiene commit {1}

pre-push:
  commands:
    hygiene:
      run: npx @chitrank2050/git-hygiene branch`}
						/>
					</div>

					<div>
						<h3 className="text-xs font-mono font-bold text-text mb-ml-2 flex items-center gap-1.5">
							<span className="text-accent">02.</span> Husky
						</h3>
						<CodeBlock
							filename=".husky/commit-msg"
							code={`# .husky/commit-msg
npx @chitrank2050/git-hygiene commit $1

# .husky/pre-push
npx @chitrank2050/git-hygiene branch`}
						/>
					</div>

					<div>
						<h3 className="text-xs font-mono font-bold text-text mb-ml-2 flex items-center gap-1.5">
							<span className="text-accent">03.</span> GitHub Actions
						</h3>
						<CodeBlock
							filename=".github/workflows/ci.yml"
							code={`- name: Git Hygiene 🌊
  uses: chitranklabs/git-hygiene@v0.4.12
  # Auto-detects PR title & branch
  # outputs next semver bump`}
						/>
					</div>
				</div>
			</section>

			{/* CONFIGURATION SPECIFICATION */}
			<section id="configuration" className="mt-ml-20 pt-ml-8 border-t border-border">
				<SectionHead
					eyebrow="Configuration"
					title="Zero-config defaults. Easily tuned in package.json."
					size="sm"
					level={2}
				/>
				<div className="mt-ml-6 grid grid-cols-1 lg:grid-cols-2 gap-ml-6 items-start">
					<CodeBlock
						filename="package.json"
						code={`{
  "git-hygiene": {
    "extends": ["@commitlint/config-conventional"],
    "types": [
      "feat", "fix", "chore", "docs",
      "style", "refactor", "perf", "test",
      "build", "ci", "revert", "maintenance", "renovate"
    ],
    "ignoreBranches": ["main", "master", "develop"],
    "maxHeaderLength": 100,
    "allowEmptyScope": false,
    "rules": {
      "header-max-length": [2, "always", 100]
    }
  }
}`}
					/>

					<div className="space-y-ml-3">
						<Card size="sm">
							<Card.Body>
								<h4 className="font-mono text-xs font-bold text-text mb-1">
									Commitlint Rule Inheritance
								</h4>
								<p className="text-xs text-text-muted leading-relaxed font-sans">
									Seamlessly extend standard presets like <code>@commitlint/config-conventional</code> with zero extra config. Custom types merge automatically.
								</p>
							</Card.Body>
						</Card>

						<Card size="sm">
							<Card.Body>
								<h4 className="font-mono text-xs font-bold text-text mb-1">
									Native Type-Stripping Performance
								</h4>
								<p className="text-xs text-text-muted leading-relaxed font-sans">
									Executes via Node 24+ native type stripping (<code>node --experimental-strip-types</code>). Instant execution with zero transpile step.
								</p>
							</Card.Body>
						</Card>

						<Card size="sm">
							<Card.Body>
								<h4 className="font-mono text-xs font-bold text-text mb-1">
									Headless TypeScript Library
								</h4>
								<p className="text-xs text-text-muted leading-relaxed font-sans">
									Import <code>validateBranch</code> and <code>resolveConfig</code> directly from <code>@chitrank2050/git-hygiene-core</code> for programmatic scripts.
								</p>
							</Card.Body>
						</Card>
					</div>
				</div>
			</section>

			{/* ARCHITECTURE DIAGRAM */}
			<section id="architecture" className="mt-ml-20 pt-ml-8 border-t border-border">
				<SectionHead
					eyebrow="Architecture"
					title="Designed from the core up for minimal overhead."
					size="sm"
					level={2}
				/>
				<div className="mt-ml-6 p-ml-6 rounded-xl border border-border bg-surface">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-ml-3 text-center font-mono">
						<div className="p-ml-4 rounded-lg border border-border bg-surface-2">
							<span className="text-3xs text-text-muted uppercase tracking-wider block">Trigger</span>
							<strong className="text-xs text-text block mt-1">Lefthook / Husky / CI</strong>
						</div>
						<div className="p-ml-4 rounded-lg border border-border bg-surface-2">
							<span className="text-3xs text-text-muted uppercase tracking-wider block">CLI Entry</span>
							<strong className="text-xs text-text block mt-1">@chitrank2050/git-hygiene</strong>
						</div>
						<div className="p-ml-4 rounded-lg border border-border bg-surface-2">
							<span className="text-3xs text-text-muted uppercase tracking-wider block">Engine</span>
							<strong className="text-xs text-text block mt-1">git-hygiene-core</strong>
						</div>
						<div className="p-ml-4 rounded-lg border border-accent/40 bg-surface-2">
							<span className="text-3xs text-accent uppercase tracking-wider font-bold block">Runtime</span>
							<strong className="text-xs text-text block mt-1">Node 24+ Native</strong>
						</div>
					</div>
				</div>
			</section>
		</Container>
	)
}
