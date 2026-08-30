import type { Identity } from "@/src/lib/identity"
import { siteUrl } from "@/src/lib/seo"

interface Props<T> {
	data: T
}

interface PageJsonLdInput {
	title: string
	description: string
	path: `/${string}`
}

function absoluteUrl(path: `/${string}`) {
	return new URL(path, `${siteUrl}/`).toString()
}

export function getPersonJsonLd(identity: Identity) {
	return {
		"@type": "Person",
		"@id": `${identity.websiteUrl}/#person`,
		name: identity.name,
		alternateName: identity.alternateNames,
		image: identity.portraitUrl,
		url: identity.websiteUrl,
		jobTitle: identity.jobTitle,
		worksFor: {
			"@type": "Organization",
			name: identity.company.name,
			url: identity.company.url,
		},
		alumniOf: {
			"@type": "CollegeOrUniversity",
			name: identity.education,
		},
		nationality: identity.nationality,
		knowsAbout: identity.knowsAbout,
		sameAs: [identity.socials.linkedin, identity.socials.github],
		mainEntityOfPage: {
			"@id": `${identity.websiteUrl}/#webpage`,
		},
	}
}

export function getWebsiteJsonLd(identity: Identity | null, siteUrl: string) {
	const jsonLd: Record<string, unknown> = {
		"@type": "WebSite",
		"@id": `${siteUrl}/#website`,
		url: siteUrl,
		name: "git-hygiene",
		description:
			"The ultimate zero-dependency metadata validator for modern Git workflows. Enforce conventional commits, branch naming patterns, and PR titles with native Node.js performance.",
		about: {
			"@id": `${siteUrl}/#software-source-code`,
		},
	}

	if (identity) {
		jsonLd.publisher = {
			"@id": `${identity.websiteUrl}/#person`,
		}
	}

	return jsonLd
}

export function getSoftwareSourceCodeJsonLd(
	identity: Identity | null,
	siteUrl: string,
	version: string
) {
	const jsonLd: Record<string, unknown> = {
		"@type": "SoftwareSourceCode",
		"@id": `${siteUrl}/#software-source-code`,
		name: "git-hygiene",
		alternateName: "@chitrank2050/git-hygiene",
		description:
			"The ultimate zero-dependency metadata validator for modern Git workflows. Built for Node.js 24+ using native TypeScript type-stripping for microsecond startup times.",
		url: siteUrl,
		codeRepository: "https://github.com/chitranklabs/git-hygiene",
		programmingLanguage: ["TypeScript", "JavaScript"],
		runtimePlatform: "Node.js 24+",
		license: "https://github.com/chitranklabs/git-hygiene/blob/main/LICENSE",
		sameAs: [
			"https://github.com/chitranklabs/git-hygiene",
			"https://www.npmjs.com/package/@chitrank2050/git-hygiene",
			"https://jsr.io/@chitrank2050/git-hygiene",
			"https://github.com/marketplace/actions/git-hygiene-validator",
		],
		downloadUrl: "https://www.npmjs.com/package/@chitrank2050/git-hygiene",
		softwareRequirements: "Node.js >=24.0.0",
		keywords: [
			"git metadata validator",
			"conventional commits",
			"branch naming",
			"git hooks",
			"zero dependency",
			"commitlint alternative",
			"github action",
		],
		version,
		isAccessibleForFree: true,
	}

	if (identity) {
		const person = { "@id": `${identity.websiteUrl}/#person` }
		jsonLd.author = person
		jsonLd.creator = person
		jsonLd.maintainer = person
	}

	return jsonLd
}

export function createWebPageJsonLd({
	title,
	description,
	path,
}: PageJsonLdInput) {
	const url = absoluteUrl(path)

	return {
		"@type": "WebPage",
		"@id": `${url}#webpage`,
		url,
		name: title,
		description,
		inLanguage: "en",
		isPartOf: { "@id": `${siteUrl}/#website` },
		about: { "@id": `${siteUrl}/#software-source-code` },
	}
}

function serializeJsonLd<T>(data: T) {
	return JSON.stringify(data).replace(/[<\u2028\u2029]/g, (char) => {
		switch (char) {
			case "<":
				return "\\u003c"
			case "\u2028":
				return "\\u2028"
			case "\u2029":
				return "\\u2029"
			default:
				return char
		}
	})
}

export default function JsonLd<T>({ data }: Props<T>) {
	return (
		<script
			type="application/ld+json"
			// eslint-disable-next-line react/no-danger
			dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
		/>
	)
}
