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
					<span className="font-mono text-sm font-bold tracking-tight text-text">
						🌊 git-hygiene
					</span>
				</Link>
			</div>

			<Navbar.Nav>
				<Navbar.Link asChild>
					<a href="#features">Features</a>
				</Navbar.Link>
				<Navbar.Link asChild>
					<a href="#usage">Usage</a>
				</Navbar.Link>
				<Navbar.Link asChild>
					<a href="#configuration">Configuration</a>
				</Navbar.Link>
				<Navbar.Link asChild>
					<a href="#architecture">Architecture</a>
				</Navbar.Link>
				<Navbar.Link asChild>
					<a
						href="https://github.com/chitranklabs/git-hygiene"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1"
					>
						GitHub
						<span className="text-text-muted text-xs">↗</span>
					</a>
				</Navbar.Link>
			</Navbar.Nav>

			<Navbar.Actions>
				<ThemeControl />
			</Navbar.Actions>
		</Navbar>
	)
}
