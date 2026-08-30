import Link from "next/link"

import { Navbar } from "@chitrank2050/monoline-ui/navbar"

import { ThemeControl } from "./theme-control"

export function SiteHeader() {
	return (
		<Navbar layout="extended" sticky glass>
			<div className="flex min-w-0 items-center gap-ml-3">
				<Link
					href="/"
					className="group inline-flex items-center gap-2.5 text-text no-underline"
				>
					<span className="flex size-7 items-center justify-center rounded-lg bg-surface-2 border border-border text-sm font-mono shadow-xs transition-colors group-hover:border-accent">
						🌊
					</span>
					<span className="font-mono text-sm font-bold tracking-tight text-text">
						git-hygiene
					</span>
				</Link>
			</div>

			<Navbar.Nav>
				<Navbar.Link asChild>
					<a href="#sandbox">Sandbox</a>
				</Navbar.Link>
				<Navbar.Link asChild>
					<a href="#benchmark">Why Zero Deps</a>
				</Navbar.Link>
				<Navbar.Link asChild>
					<a href="#integrations">Integrations</a>
				</Navbar.Link>
				<Navbar.Link asChild>
					<a href="#registries">Registries</a>
				</Navbar.Link>
				<Navbar.Link asChild>
					<a
						href="https://github.com/chitranklabs/git-hygiene"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1 font-semibold"
					>
						GitHub ↗
					</a>
				</Navbar.Link>
			</Navbar.Nav>

			<Navbar.Actions>
				<ThemeControl />
			</Navbar.Actions>
		</Navbar>
	)
}
