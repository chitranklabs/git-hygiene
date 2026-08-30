import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@chitrank2050/monoline-ui/button"
import { Card } from "@chitrank2050/monoline-ui/card"
import { Container } from "@chitrank2050/monoline-ui/container"
import { SectionHead } from "@chitrank2050/monoline-ui/section-head"
import { Status } from "@chitrank2050/monoline-ui/status"

import { IntegrationTabs } from "@/src/components/integration-tabs"
import JsonLd, {
	createWebPageJsonLd,
	getPersonJsonLd,
	getSoftwareSourceCodeJsonLd,
	getWebsiteJsonLd,
} from "@/src/components/json-ld"
import { LiveSandbox } from "@/src/components/live-sandbox"
import { CodeBlock } from "@/src/components/ui"
import { fetchIdentity } from "@/src/lib/identity"
import { createPageMetadata } from "@/src/lib/metadata"
import { getLatestRelease } from "@/src/lib/releases"
import { siteUrl } from "@/src/lib/seo"

import pkg from "@/package.json"

const homeTitle = "git-hygiene — Zero-Dependency Metadata Validator for Modern Git"
const homeDescription =
	"Enforce conventional commits, branch naming patterns, and PR titles with native Node.js 24+ type-stripping speed. Zero runtime dependencies."

export const metadata: Metadata = createPageMetadata({
	title: homeTitle,
	description: homeDescription,
	path: "/",
})

const benchmarks = [
	{
		metric: "Cold Startup Time",
		hygiene: "< 5 ms",
		traditional: "~220 ms",
		note: "Native Node.js 24+ type-stripping execution without transpile step.",
	},
	{
		metric: "Runtime Dependencies",
		hygiene: "0",
		traditional: "38+ packages",
		note: "Zero transitive dependencies. Zero install overhead.",
	},
	{
		metric: "Supply Chain Provenance",
		hygiene: "SLSA Level 3",
		traditional: "Unverified",
		note: "100% SHA-pinned workflows with OpenSSF & Zizmor security audits.",
	},
	{
		metric: "Multi-Registry Support",
		hygiene: "NPM + JSR + Action",
		traditional: "NPM only",
		note: "TypeScript-native distribution on JSR and automated GitHub Marketplace Action.",
	},
]

const distributionPackages = [
	{
		name: "NPM Registry",
		package: "@chitrank2050/git-hygiene",
		href: "https://www.npmjs.com/package/@chitrank2050/git-hygiene",
		description: "Standard CLI runner for local git hooks (Lefthook, Husky) and pre-push checks.",
		badge: "CLI",
	},
	{
		name: "JSR Registry",
		package: "@chitrank2050/git-hygiene",
		href: "https://jsr.io/@chitrank2050/git-hygiene",
		description: "TypeScript-native package with zero build artifact for Deno & Node 24+ runtimes.",
		badge: "TypeScript",
	},
	{
		name: "GitHub Action",
		package: "chitranklabs/git-hygiene",
		href: "https://github.com/marketplace/actions/git-hygiene-validator",
		description: "Automated PR title & branch validator with automatic semantic release recommendation.",
		badge: "CI / CD",
	},
	{
		name: "Core Engine",
		package: "@chitrank2050/git-hygiene-core",
		href: "https://www.npmjs.com/package/@chitrank2050/git-hygiene-core",
		description: "Programmatic TypeScript API for custom CI pipelines and internal development tooling.",
		badge: "Library",
	},
]

const keyPillars = [
	{
		number: "01",
		title: "Unified Metadata Engine",
		description:
			"Define your naming rules once in package.json. Simultaneously validate local git commit messages, pre-push branch names, and remote GitHub pull requests.",
	},
	{
		number: "02",
		title: "Instant Native Execution",
		description:
			"Leverages Node.js 24+ type-stripping (node --experimental-strip-types). Microsecond cold starts without heavy CLI frameworks like yargs or commander.",
	},
	{
		number: "03",
		title: "Smart Semantic Bumping",
		description:
			"Inspects commit patterns to automatically recommend semantic version increments (major, minor, patch) with machine-readable JSON outputs for release bots.",
	},
	{
		number: "04",
		title: "Commitlint Compatibility",
		description:
			"Seamlessly extends @commitlint/config-conventional. Reuse your existing team conventions with zero migration friction.",
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
		<div className="relative min-h-screen gh-hero-glow">
			<JsonLd data={jsonLd} />

			<Container as="main" id="main-content" tabIndex={-1} className="pt-ml-12 pb-ml-24">
				{/* ── HERO SECTION ── */}
				<section className="text-center max-w-4xl mx-auto pt-ml-8 pb-ml-12">
					{/* Badge Pill */}
					<div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2/80 px-3.5 py-1 backdrop-blur-md shadow-xs mb-ml-6">
						<Status variant="accent" size="sm">
							{release.version}
						</Status>
						<span className="font-mono text-2xs font-semibold text-text-muted uppercase tracking-wider">
							Node.js 24+ Native · Zero Dependencies
						</span>
					</div>

					{/* High-Conviction Product Headline */}
					<h1 className="font-mono text-text text-[clamp(2.4rem,5vw,3.8rem)] font-bold tracking-tight leading-[1.08]">
						The zero-dependency metadata validator for <span className="text-accent">modern Git</span>.
					</h1>

					{/* Problem & Value Prop Subtitle */}
					<p className="mt-ml-6 text-text-secondary text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto font-sans">
						Enforce conventional commits, branch naming patterns, and PR titles with native Node.js 24+ type-stripping speed. Stop broken branch names and non-standard commits in CI before they happen.
					</p>

					{/* Action Buttons & Install Command */}
					<div className="mt-ml-8 flex flex-wrap items-center justify-center gap-ml-3">
						<Button asChild size="md">
							<a href="#sandbox">
								Try Live Sandbox
								<Button.Arrow />
							</a>
						</Button>
						<Button asChild variant="secondary" size="md">
							<a
								href="https://github.com/chitranklabs/git-hygiene"
								target="_blank"
								rel="noopener noreferrer"
							>
								View on GitHub ↗
							</a>
						</Button>
					</div>

					{/* Quick Install Pill */}
					<div className="mt-ml-6 inline-flex items-center gap-2 font-mono text-xs text-text-muted bg-surface/90 border border-border px-ml-4 py-ml-2 rounded-xl shadow-xs">
						<span className="text-accent font-semibold">$</span>
						<code className="text-text font-mono">pnpm add -D @chitrank2050/git-hygiene</code>
					</div>

					{/* Quick Proof Metrics */}
					<div className="mt-ml-12 grid grid-cols-2 sm:grid-cols-4 gap-ml-4 border-t border-border pt-ml-8 text-center font-mono">
						<div>
							<strong className="block text-xl font-bold text-text tabular-nums">0</strong>
							<span className="text-3xs uppercase tracking-wider text-accent font-semibold">Runtime Deps</span>
						</div>
						<div>
							<strong className="block text-xl font-bold text-text tabular-nums">&lt; 5ms</strong>
							<span className="text-3xs uppercase tracking-wider text-accent font-semibold">Cold Startup</span>
						</div>
						<div>
							<strong className="block text-xl font-bold text-text tabular-nums">SLSA-3</strong>
							<span className="text-3xs uppercase tracking-wider text-accent font-semibold">Provenance</span>
						</div>
						<div>
							<strong className="block text-xl font-bold text-text tabular-nums">Node 24+</strong>
							<span className="text-3xs uppercase tracking-wider text-accent font-semibold">Type Stripping</span>
						</div>
					</div>
				</section>

				{/* ── LIVE INTERACTIVE SANDBOX ── */}
				<section id="sandbox" className="mt-ml-12 scroll-mt-ml-12">
					<SectionHead
						eyebrow="Interactive Demo"
						title="Test your Git metadata rules live in the browser."
						description="Type a commit message or branch name below to inspect validation results and semantic release recommendations in real-time."
						size="sm"
						level={2}
					/>
					<div className="mt-ml-6">
						<LiveSandbox />
					</div>
				</section>

				{/* ── WHY ZERO DEPS / BENCHMARK COMPARISON ── */}
				<section id="benchmark" className="mt-ml-24 pt-ml-8 border-t border-border scroll-mt-ml-12">
					<SectionHead
						eyebrow="Performance & Architecture"
						title="Engineered for microsecond execution and zero bloat."
						description="Why install dozens of transitive packages just to validate a string? git-hygiene is built purely on Node.js built-in APIs."
						size="sm"
						level={2}
					/>

					<div className="mt-ml-8 grid grid-cols-1 md:grid-cols-2 gap-ml-4">
						{benchmarks.map((b) => (
							<Card key={b.metric} size="md">
								<Card.Body>
									<div className="flex items-center justify-between border-b border-border pb-ml-2 mb-ml-3 font-mono">
										<span className="text-xs font-semibold text-text-muted">{b.metric}</span>
										<span className="text-xs font-bold text-accent">{b.hygiene}</span>
									</div>
									<div className="flex items-center justify-between text-2xs font-mono text-text-muted mb-ml-2">
										<span>Traditional Tooling:</span>
										<span className="line-through text-text-muted/70">{b.traditional}</span>
									</div>
									<p className="text-xs text-text-secondary leading-relaxed font-sans mt-ml-2">
										{b.note}
									</p>
								</Card.Body>
							</Card>
						))}
					</div>
				</section>

				{/* ── CORE PILLARS / FEATURES ── */}
				<section id="features" className="mt-ml-24 pt-ml-8 border-t border-border">
					<SectionHead
						eyebrow="Standard Capabilities"
						title="Everything you need for strict, automated Git hygiene."
						size="sm"
						level={2}
					/>

					<div className="mt-ml-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-ml-4">
						{keyPillars.map((pillar) => (
							<Card key={pillar.number} size="md">
								<Card.Body>
									<span className="block font-mono text-2xs font-bold text-accent mb-ml-2">
										{pillar.number}
									</span>
									<h3 className="text-sm font-bold text-text font-mono mb-ml-2">
										{pillar.title}
									</h3>
									<p className="text-xs text-text-secondary leading-relaxed font-sans">
										{pillar.description}
									</p>
								</Card.Body>
							</Card>
						))}
					</div>
				</section>

				{/* ── INTERACTIVE INTEGRATIONS ── */}
				<section id="integrations" className="mt-ml-24 pt-ml-8 border-t border-border scroll-mt-ml-12">
					<SectionHead
						eyebrow="Developer Workflows"
						title="Integrates in seconds into your existing hooks & CI."
						description="Switch between Lefthook, Husky, or GitHub Actions to see the exact drop-in configuration."
						size="sm"
						level={2}
					/>
					<IntegrationTabs />
				</section>

				{/* ── CONFIGURATION SHOWCASE ── */}
				<section id="configuration" className="mt-ml-24 pt-ml-8 border-t border-border">
					<SectionHead
						eyebrow="Configuration"
						title="Zero-config defaults. Easily customized in package.json."
						description="Works out of the box with standard Conventional Commits. Customize allowed types, branch patterns, and scopes directly in your package.json."
						size="sm"
						level={2}
					/>

					<div className="mt-ml-8 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-ml-6 items-start">
						<CodeBlock
							filename="package.json"
							code={`{
  "git-hygiene": {
    "extends": ["@commitlint/config-conventional"],
    "types": [
      "feat", "fix", "chore", "docs",
      "style", "refactor", "perf", "test",
      "build", "ci", "revert"
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

						<div className="space-y-ml-4">
							<Card size="sm">
								<Card.Body>
									<h4 className="font-mono text-xs font-bold text-text mb-1">
										Commitlint Rules Inheritance
									</h4>
									<p className="text-xs text-text-muted leading-relaxed font-sans">
										Seamlessly extends <code>@commitlint/config-conventional</code> with zero extra configuration. Custom types merge automatically.
									</p>
								</Card.Body>
							</Card>

							<Card size="sm">
								<Card.Body>
									<h4 className="font-mono text-xs font-bold text-text mb-1">
										Programmatic Library
									</h4>
									<p className="text-xs text-text-muted leading-relaxed font-sans">
										Import <code>validateCommit</code>, <code>validateBranch</code>, and <code>analyzeBump</code> directly from <code>@chitrank2050/git-hygiene-core</code>.
									</p>
								</Card.Body>
							</Card>

							<Card size="sm">
								<Card.Body>
									<h4 className="font-mono text-xs font-bold text-text mb-1">
										SLSA Level 3 Provenance
									</h4>
									<p className="text-xs text-text-muted leading-relaxed font-sans">
										Every release includes SHA-pinned GitHub workflows, Zizmor security audits, and Gitleaks secret scanning.
									</p>
								</Card.Body>
							</Card>
						</div>
					</div>
				</section>

				{/* ── DISTRIBUTION REGISTRIES ── */}
				<section id="registries" className="mt-ml-24 pt-ml-8 border-t border-border scroll-mt-ml-12">
					<SectionHead
						eyebrow="Multi-Registry Distribution"
						title="Available wherever you write and ship code."
						size="sm"
						level={2}
					/>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-ml-4 mt-ml-8">
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
			</Container>
		</div>
	)
}
