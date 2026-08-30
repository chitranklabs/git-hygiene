import type { Metadata } from "next"

import { Button } from "@chitrank2050/monoline-ui/button"
import { Card } from "@chitrank2050/monoline-ui/card"
import { Container } from "@chitrank2050/monoline-ui/container"
import { SectionHead } from "@chitrank2050/monoline-ui/section-head"
import { Status } from "@chitrank2050/monoline-ui/status"

import { CodeBlock } from "@/src/components/code-block"
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

const homeTitle = "git-hygiene — Zero-Dependency Metadata Validator"
const homeDescription =
	"Enforce conventional commits, branch naming patterns, and PR titles with native Node.js 24+ type-stripping performance. Zero external runtime dependencies."

export const metadata: Metadata = createPageMetadata({
	title: homeTitle,
	description: homeDescription,
	path: "/",
})

const stats = [
	["0", "Runtime Dependencies"],
	["<5ms", "Cold Start (Native TS)"],
	["Node 24+", "Type Stripping"],
	["MIT", "Open Source License"],
]

const features = [
	{
		title: "Unified Metadata Engine",
		description:
			"Define your standards once in package.json or config. Enforce them identically in commit hooks, branch validations, and PR titles.",
	},
	{
		title: "Zero Dependencies",
		description:
			"Constructed strictly with native Node.js APIs. No external CLI parsing, formatting, or color library bloat.",
	},
	{
		title: "Hardened Security",
		description:
			"SHA-pinned workflows, SLSA Level 3 attestations, Zizmor audited, and OpenSSF Scorecard verified supply chain.",
	},
	{
		title: "Universal Distribution",
		description:
			"First-class distribution on NPM, JSR (TypeScript-native), GitHub Actions, and headless core library.",
	},
	{
		title: "Smart CI Omni-Mode",
		description:
			"Automatically detects CI context to validate PR titles, branch names, and output recommended semver bumps.",
	},
	{
		title: "Automated Semver Bumps",
		description:
			"Analyzes commit history against conventional commit rules to output machine-readable release increments.",
	},
]

const registries = [
	{
		name: "NPM Package",
		pkg: "@chitrank2050/git-hygiene",
		href: "https://www.npmjs.com/package/@chitrank2050/git-hygiene",
		desc: "Primary CLI package for Node.js workflows",
	},
	{
		name: "JSR Package",
		pkg: "@chitrank2050/git-hygiene",
		href: "https://jsr.io/@chitrank2050/git-hygiene",
		desc: "TypeScript-native registry for Deno & Node 24+",
	},
	{
		name: "GitHub Action",
		pkg: "chitranklabs/git-hygiene",
		href: "https://github.com/marketplace/actions/git-hygiene-validator",
		desc: "CI validator with Omni-Mode auto detection",
	},
	{
		name: "Core Engine",
		pkg: "@chitrank2050/git-hygiene-core",
		href: "https://www.npmjs.com/package/@chitrank2050/git-hygiene-core",
		desc: "Headless library for programmatic integration",
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
		<Container as="main" id="main-content" tabIndex={-1} className="pt-ml-20 pb-ml-24">
			<JsonLd data={jsonLd} />

			{/* HERO SECTION */}
			<section className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] items-start gap-ml-12">
				<div>
					<div className="flex items-center gap-ml-2.5 mb-ml-6">
						<Status variant="accent" size="sm">
							{release.version}
						</Status>
						<span className="font-mono text-2xs uppercase tracking-wider text-text-muted">
							Node.js 24+ Native
						</span>
					</div>

					<h1 className="text-text font-mono text-[clamp(2.4rem,4.5vw,3.75rem)] font-extrabold tracking-tight leading-[1.02]">
						Zero-dependency metadata validator for modern Git.
					</h1>

					<p className="mt-ml-5 text-text-secondary text-base font-normal leading-relaxed max-w-130">
						Enforce conventional commits, branch naming patterns, and PR titles
						with sub-5ms native type-stripping performance.
					</p>

					<div className="flex flex-wrap items-center gap-ml-3 mt-ml-8">
						<Button asChild>
							<a
								href="https://www.npmjs.com/package/@chitrank2050/git-hygiene"
								target="_blank"
								rel="noopener noreferrer"
							>
								Get Started
								<Button.Arrow />
							</a>
						</Button>
						<Button asChild variant="secondary">
							<a
								href="https://github.com/chitranklabs/git-hygiene"
								target="_blank"
								rel="noopener noreferrer"
							>
								View on GitHub
							</a>
						</Button>
					</div>

					<div className="mt-ml-6 inline-flex items-center gap-ml-2 font-mono text-xs text-text-muted border border-border bg-surface px-ml-3.5 py-ml-2 rounded-md">
						<span className="text-accent font-medium">$</span>
						<code>pnpm add -D @chitrank2050/git-hygiene</code>
					</div>
				</div>

				{/* HERO QUICK USAGE */}
				<div className="mt-ml-2">
					<CodeBlock
						filename="terminal"
						code={`# Validate commit message
npx @chitrank2050/git-hygiene commit "feat: zero-dep validator"

# Validate branch name
npx @chitrank2050/git-hygiene branch "feat/native-ts-stripping"

# Recommend next semver bump
npx @chitrank2050/git-hygiene bump --json
# => { "releaseType": "minor", "reason": "feat commit found" }`}
					/>
				</div>
			</section>

			{/* STATS STRIP */}
			<section
				className="grid grid-cols-2 md:grid-cols-4 gap-ml-6 mt-ml-16 border-y border-border py-ml-6"
				aria-label="Project stats"
			>
				{stats.map(([value, label]) => (
					<div key={label}>
						<strong className="block font-mono text-xl font-bold text-text">
							{value}
						</strong>
						<span className="mt-ml-1 block font-mono text-3xs uppercase tracking-widest text-text-muted">
							{label}
						</span>
					</div>
				))}
			</section>

			{/* DISTRIBUTION REGISTRIES */}
			<section className="mt-ml-20">
				<SectionHead
					eyebrow="Distribution"
					title="One unified engine. Available everywhere."
					size="sm"
					level={2}
				/>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-ml-3 mt-ml-6">
					{registries.map((reg) => (
						<Card key={reg.name} size="sm" asChild>
							<a
								href={reg.href}
								target="_blank"
								rel="noopener noreferrer"
								className="block h-full transition-colors"
							>
								<Card.Body>
									<span className="font-mono text-3xs font-bold text-accent uppercase tracking-wider block mb-ml-1">
										{reg.name}
									</span>
									<h3 className="text-xs font-mono font-bold text-text truncate">
										{reg.pkg}
									</h3>
									<p className="mt-ml-1.5 text-xs text-text-muted leading-normal">
										{reg.desc}
									</p>
								</Card.Body>
							</a>
						</Card>
					))}
				</div>
			</section>

			{/* FEATURES */}
			<section id="features" className="mt-ml-20 pt-ml-8 border-t border-border">
				<SectionHead
					eyebrow="Capabilities"
					title="Purpose-built for speed, strictness, and zero bloat."
					size="sm"
					level={2}
				/>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-ml-4 mt-ml-6">
					{features.map((feat, index) => (
						<Card key={feat.title} size="md">
							<Card.Body>
								<span className="mb-ml-2 block font-mono text-2xs font-bold text-accent">
									0{index + 1}
								</span>
								<h3 className="m-0 mb-ml-1.5 text-sm font-semibold tracking-tight text-text">
									{feat.title}
								</h3>
								<p className="m-0 text-xs text-text-muted leading-relaxed">
									{feat.description}
								</p>
							</Card.Body>
						</Card>
					))}
				</div>
			</section>

			{/* USAGE */}
			<section id="usage" className="mt-ml-20 pt-ml-8 border-t border-border">
				<SectionHead
					eyebrow="Integration"
					title="Set up in seconds across hooks & CI."
					size="sm"
					level={2}
				/>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-ml-6 mt-ml-6">
					<div>
						<h3 className="text-xs font-mono font-bold text-text mb-ml-2">
							1. Lefthook
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
						<h3 className="text-xs font-mono font-bold text-text mb-ml-2">
							2. Husky
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
						<h3 className="text-xs font-mono font-bold text-text mb-ml-2">
							3. GitHub Actions
						</h3>
						<CodeBlock
							filename=".github/workflows/ci.yml"
							code={`- name: Git Hygiene 🌊
  uses: chitranklabs/git-hygiene@8abac926a6afcde68889b34f9ec3d1acefd69538
  # Auto-detects PR context &
  # outputs next semver bump`}
						/>
					</div>
				</div>
			</section>

			{/* CONFIGURATION */}
			<section id="configuration" className="mt-ml-20 pt-ml-8 border-t border-border">
				<SectionHead
					eyebrow="Configuration"
					title="Zero-config defaults. Fully customizable in package.json."
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
									Commitlint Compatibility
								</h4>
								<p className="text-xs text-text-muted leading-normal">
									Inherit <code>@commitlint/config-conventional</code> with zero extra dependencies. Custom types and rules seamlessly merge.
								</p>
							</Card.Body>
						</Card>

						<Card size="sm">
							<Card.Body>
								<h4 className="font-mono text-xs font-bold text-text mb-1">
									Native Type-Stripping
								</h4>
								<p className="text-xs text-text-muted leading-normal">
									Runs natively via Node 24+ type stripping (<code>node --experimental-strip-types</code>). Zero build delay during Git hooks.
								</p>
							</Card.Body>
						</Card>

						<Card size="sm">
							<Card.Body>
								<h4 className="font-mono text-xs font-bold text-text mb-1">
									Headless Library API
								</h4>
								<p className="text-xs text-text-muted leading-normal">
									Import <code>validateBranch</code> and <code>resolveConfig</code> directly from <code>@chitrank2050/git-hygiene-core</code>.
								</p>
							</Card.Body>
						</Card>
					</div>
				</div>
			</section>

			{/* ARCHITECTURE */}
			<section id="architecture" className="mt-ml-20 pt-ml-8 border-t border-border">
				<SectionHead
					eyebrow="Architecture"
					title="Engineered from the ground up for minimal overhead."
					size="sm"
					level={2}
				/>
				<div className="mt-ml-6 p-ml-6 rounded-lg border border-border bg-surface">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-ml-3 text-center font-mono">
						<div className="p-ml-4 rounded-md border border-border bg-surface-2">
							<span className="text-3xs text-text-muted uppercase block">Trigger</span>
							<strong className="text-xs text-text block mt-1">Lefthook / Husky</strong>
						</div>
						<div className="p-ml-4 rounded-md border border-border bg-surface-2">
							<span className="text-3xs text-text-muted uppercase block">Entry</span>
							<strong className="text-xs text-text block mt-1">@chitrank2050/git-hygiene</strong>
						</div>
						<div className="p-ml-4 rounded-md border border-border bg-surface-2">
							<span className="text-3xs text-text-muted uppercase block">Core</span>
							<strong className="text-xs text-text block mt-1">git-hygiene-core</strong>
						</div>
						<div className="p-ml-4 rounded-md border border-border bg-surface-2">
							<span className="text-3xs text-accent uppercase block">Runtime</span>
							<strong className="text-xs text-text block mt-1">Node 24+ Native</strong>
						</div>
					</div>
				</div>
			</section>
		</Container>
	)
}
