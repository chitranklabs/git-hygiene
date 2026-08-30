"use client"

import { useState } from "react"

export function InstallCommand({ command = "pnpm add -D @chitrank2050/git-hygiene" }: { command?: string }) {
	const [copied, setCopied] = useState(false)

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(command)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch {
			// ignore
		}
	}

	return (
		<button
			type="button"
			onClick={copy}
			title="Click to copy install command"
			className="group inline-flex items-center gap-3 rounded-xl border border-border bg-surface/90 px-4 py-2 font-mono text-xs text-text shadow-xs backdrop-blur-md transition-all hover:border-accent hover:shadow-md cursor-pointer"
		>
			<span className="text-accent font-semibold">$</span>
			<code className="text-text font-mono font-medium">{command}</code>
			<span className="ml-1 rounded bg-surface-2 px-1.5 py-0.5 text-3xs font-semibold uppercase tracking-wider text-text-muted transition-colors group-hover:text-accent">
				{copied ? "✓ Copied" : "Copy"}
			</span>
		</button>
	)
}
