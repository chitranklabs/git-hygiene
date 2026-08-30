import Link from "next/link"

import { Navbar } from "@chitrank2050/monoline-ui/navbar"

import { ThemeControl } from "./theme-control"

export function SiteHeader() {
	return (
		<Navbar layout="extended" sticky glass>
			<div className="flex min-w-0 items-center gap-ml-3">
				<Link
					href="/"
					className="ml-navbar__brand"
					data-text-style="monoline"
				>
					<span className="ml-navbar__brand-label font-mono font-bold tracking-tight">
						git-hygiene
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
					<a href="#configuration">Config</a>
				</Navbar.Link>
				<Navbar.Link asChild>
					<a href="#architecture">Architecture</a>
				</Navbar.Link>
				<Navbar.Link asChild>
					<a
						href="https://github.com/chitranklabs/git-hygiene"
						target="_blank"
						rel="noopener noreferrer"
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
