import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@chitrank2050/monoline-ui/button"
import { Container } from "@chitrank2050/monoline-ui/container"
import { SectionHead } from "@chitrank2050/monoline-ui/section-head"

import { ChangelogTimeline } from "@chitrank2050/monoline-ui/changelog"
import type { GitCliffRelease } from "@chitrank2050/monoline-ui/changelog"

import JsonLd, {
	createBreadcrumbJsonLd,
	createCollectionPageJsonLd,
} from "@/src/components/json-ld"
import changelogJson from "@/src/lib/changelog.json"
import { createPageMetadata } from "@/src/lib/metadata"
import { ChangelogToc } from "./toc"

const changelogTitle = "Release Changelog & Version History - git-hygiene"
const changelogDescription =
	"Read git-hygiene release notes for zero-dependency CLI updates, core parser optimizations, security provenance audits, and conventional commit features."

export const metadata: Metadata = createPageMetadata({
	title: changelogTitle,
	description: changelogDescription,
	path: "/changelog",
})

// Filter out unreleased tags and normalize git-cliff group names (stripping ordering comments like <!-- 0 -->)
const releases = (changelogJson as unknown as GitCliffRelease[])
	.filter((r) => r.version !== null)
	.map((release) => ({
		...release,
		commits: (release.commits ?? []).map((commit) => ({
			...commit,
			group: commit.group
				? commit.group.replace(/<!--.*?-->/g, "").replace(/^[^\w]+/, "").trim() || commit.group
				: "Maintenance",
		})),
	}))

const tocItems = releases.map((release) => {
	const version = release.version ?? "Unreleased"
	return {
		id: `release-${version.replace(/\./g, "-")}`,
		label: version,
	}
})

export default function ChangelogPage() {
	return (
		<div className="relative min-h-screen gh-hero-glow">
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@graph": [
						createCollectionPageJsonLd({
							title: changelogTitle,
							description: changelogDescription,
							path: "/changelog",
							items: releases.map((release) => ({
								name: `git-hygiene ${release.version ?? "Unreleased"}`,
								path: `/changelog#release-${(
									release.version ?? "unreleased"
								).replace(/\./g, "-")}` as const,
							})),
						}),
						createBreadcrumbJsonLd([
							{ name: "Home", path: "/" },
							{ name: "Changelog", path: "/changelog" },
						]),
					],
				}}
			/>

			<Container
				as="main"
				id="main-content"
				tabIndex={-1}
				className="pt-ml-10 pb-ml-24"
			>
				{/* Header Section */}
				<div className="mb-ml-12 border-b border-border pb-ml-8">
					<SectionHead
						eyebrow="Release Notes"
						title="git-hygiene Changelog"
						lede="Every feature, performance optimization, and bug fix shipped across official releases, generated from conventional commits."
						size="md"
						level={1}
					/>
				</div>

				{/* Two-column layout: sticky TOC left, timeline right */}
				<div className="changelog-layout">
					{/* Sticky TOC sidebar */}
					<aside className="changelog-layout__toc">
						<div className="changelog-layout__toc-inner">
							<ChangelogToc items={tocItems} />
						</div>
					</aside>

					{/* Main timeline */}
					<section className="changelog-layout__content">
						<h2 className="sr-only">Release history</h2>
						<ChangelogTimeline
							releases={releases}
							githubOwner="chitranklabs"
							githubRepo="git-hygiene"
							allowedGroups={[
								"Features",
								"Bug Fixes",
								"Refactor",
								"Performance",
								"Documentation",
								"Security",
								"Maintenance",
								"Miscellaneous Tasks",
							]}
						/>
					</section>
				</div>

				{/* Bottom Navigation Pager */}
				<div className="mt-ml-16 pt-ml-8 border-t border-border flex items-center justify-between">
					<Button asChild variant="secondary" size="sm">
						<Link href="/">
							← Return to Homepage
						</Link>
					</Button>
					<Button asChild variant="secondary" size="sm">
						<a
							href="https://github.com/chitranklabs/git-hygiene/releases"
							target="_blank"
							rel="noopener noreferrer"
						>
							GitHub Releases ↗
						</a>
					</Button>
				</div>
			</Container>
		</div>
	)
}
