"use client"

import { useState } from "react"
import { Button } from "@chitrank2050/monoline-ui/button"

export function CodeBlock({
	code,
	filename,
}: {
	code: string
	filename?: string
}) {
	const [copied, setCopied] = useState(false)

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(code)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch {
			// ignore
		}
	}

	return (
		<div className="rounded-lg border border-border bg-surface overflow-hidden">
			{filename && (
				<div className="flex items-center justify-between border-b border-border bg-surface-2/60 px-ml-4 py-ml-2 font-mono text-3xs text-text-muted">
					<span>{filename}</span>
					<button
						type="button"
						onClick={handleCopy}
						className="hover:text-text cursor-pointer transition-colors"
					>
						{copied ? "copied" : "copy"}
					</button>
				</div>
			)}
			<pre className="p-ml-4 overflow-x-auto font-mono text-xs text-text-secondary leading-relaxed">
				<code>{code}</code>
			</pre>
		</div>
	)
}
