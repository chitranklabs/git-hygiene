"use client"

import { useState } from "react"

const VALID_TYPES = [
	"feat",
	"fix",
	"chore",
	"docs",
	"style",
	"refactor",
	"perf",
	"test",
	"build",
	"ci",
	"revert",
]

const PRESETS = [
	{
		label: "Valid Feature",
		commit: "feat(core): add native Node 24 type-stripping",
		branch: "feat/native-type-stripping",
	},
	{
		label: "Valid Bugfix",
		commit: "fix(rules): prevent false-positive branch warnings",
		branch: "fix/branch-parser-regex",
	},
	{
		label: "Breaking Change",
		commit: "feat(cli)!: drop legacy commonjs wrapper",
		branch: "feat/esm-native-only",
	},
	{
		label: "Invalid Format",
		commit: "fixed some stuff and updated tests",
		branch: "my-custom-branch",
	},
]

export function LiveSandbox() {
	const [mode, setMode] = useState<"commit" | "branch">("commit")
	const [commitInput, setCommitInput] = useState(
		"feat(core): add native Node 24 type-stripping"
	)
	const [branchInput, setBranchInput] = useState("feat/native-type-stripping")
	const [copied, setCopied] = useState(false)

	// Validate Commit in Real-Time
	function validateCommit(msg: string) {
		const trimmed = msg.trim()
		if (!trimmed) {
			return {
				valid: false,
				errors: ["Commit message cannot be empty"],
				type: null,
				scope: null,
				subject: null,
				isBreaking: false,
				bump: null,
			}
		}

		const match = trimmed.match(
			/^([a-z]+)(?:\(([a-z0-9-_]+)\))?(!)?:\s+(.+)$/i
		)

		if (!match) {
			return {
				valid: false,
				errors: [
					"Must follow Conventional Commits format: <type>(<scope>): <subject>",
					"Header should start with a valid type (feat, fix, chore, docs, etc.)",
				],
				type: null,
				scope: null,
				subject: null,
				isBreaking: false,
				bump: null,
			}
		}

		const [, rawType, scope, breakingExclamation, subject] = match
		const type = rawType.toLowerCase()
		const isBreaking = Boolean(breakingExclamation) || msg.includes("BREAKING CHANGE:")
		const errors: string[] = []

		if (!VALID_TYPES.includes(type)) {
			errors.push(
				`Unknown commit type "${type}". Allowed: ${VALID_TYPES.slice(0, 6).join(", ")}...`
			)
		}

		if (trimmed.length > 100) {
			errors.push(`Header length (${trimmed.length}) exceeds 100 characters limit.`)
		}

		let bump: "patch" | "minor" | "major" = "patch"
		if (isBreaking) {
			bump = "major"
		} else if (type === "feat") {
			bump = "minor"
		}

		return {
			valid: errors.length === 0,
			errors,
			type,
			scope: scope || null,
			subject,
			isBreaking,
			bump,
		}
	}

	// Validate Branch in Real-Time
	function validateBranch(branch: string) {
		const trimmed = branch.trim()
		if (!trimmed) {
			return {
				valid: false,
				errors: ["Branch name cannot be empty"],
				type: null,
				description: null,
			}
		}

		const match = trimmed.match(/^([a-z]+)\/([a-z0-9-_]+)$/)
		if (!match) {
			return {
				valid: false,
				errors: [
					"Branch should follow pattern: <type>/<description-with-dashes>",
					"e.g. feat/add-oauth or fix/null-pointer",
				],
				type: null,
				description: null,
			}
		}

		const [, rawType, description] = match
		const type = rawType.toLowerCase()
		const errors: string[] = []

		if (!VALID_TYPES.includes(type)) {
			errors.push(`Prefix "${type}/" is not a standard type. Allowed: ${VALID_TYPES.slice(0, 6).join(", ")}`)
		}

		return {
			valid: errors.length === 0,
			errors,
			type,
			description,
		}
	}

	const commitResult = validateCommit(commitInput)
	const branchResult = validateBranch(branchInput)

	const copyCommand = async () => {
		const cmd =
			mode === "commit"
				? `git commit -m "${commitInput.replace(/"/g, '\\"')}"`
				: `git checkout -b ${branchInput}`
		try {
			await navigator.clipboard.writeText(cmd)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch {
			// ignore
		}
	}

	return (
		<div className="rounded-2xl border border-border bg-surface p-ml-6 md:p-ml-8 shadow-md backdrop-blur-md">
			<div className="flex flex-wrap items-center justify-between gap-ml-4 border-b border-border pb-ml-5">
				<div>
					<div className="flex items-center gap-2">
						<span className="flex size-2.5 rounded-full bg-accent animate-pulse" />
						<h3 className="font-mono text-sm font-bold text-text tracking-tight">
							Live Metadata Inspector
						</h3>
					</div>
					<p className="mt-1 text-xs text-text-muted font-sans">
						Test your commit messages and branch naming rules in real-time.
					</p>
				</div>

				{/* Mode Tabs */}
				<div className="inline-flex rounded-xl border border-border bg-surface-2 p-1 font-mono text-xs shadow-xs">
					<button
						type="button"
						onClick={() => setMode("commit")}
						className={`rounded-lg px-3.5 py-1.5 font-medium transition-all cursor-pointer ${
							mode === "commit"
								? "bg-accent text-accent-foreground font-semibold shadow-xs"
								: "text-text-muted hover:text-text"
						}`}
					>
						Commit Message
					</button>
					<button
						type="button"
						onClick={() => setMode("branch")}
						className={`rounded-lg px-3.5 py-1.5 font-medium transition-all cursor-pointer ${
							mode === "branch"
								? "bg-accent text-accent-foreground font-semibold shadow-xs"
								: "text-text-muted hover:text-text"
						}`}
					>
						Branch Name
					</button>
				</div>
			</div>

			{/* Presets Bar */}
			<div className="mt-ml-5 flex flex-wrap items-center gap-2">
				<span className="font-mono text-2xs text-text-muted uppercase tracking-wider font-semibold">
					Try Presets:
				</span>
				{PRESETS.map((p) => (
					<button
						key={p.label}
						type="button"
						onClick={() => {
							setCommitInput(p.commit)
							setBranchInput(p.branch)
						}}
						className="cursor-pointer rounded-lg border border-border bg-surface-2/60 px-3 py-1 font-mono text-2xs text-text-secondary transition-all hover:border-accent hover:text-text active:scale-98"
					>
						{p.label}
					</button>
				))}
			</div>

			{/* Interactive Input & Live Result Layout */}
			<div className="mt-ml-6 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-ml-6">
				{/* Input Column */}
				<div className="flex flex-col gap-ml-3">
					<div className="flex items-center justify-between">
						<label htmlFor="inspector-input" className="font-mono text-2xs font-semibold text-text-muted uppercase tracking-wider">
							{mode === "commit" ? "Input Commit Message" : "Input Git Branch"}
						</label>
						{(mode === "commit" ? commitResult.valid : branchResult.valid) && (
							<button
								type="button"
								onClick={copyCommand}
								className="font-mono text-2xs text-accent hover:underline cursor-pointer flex items-center gap-1"
							>
								{copied ? "✓ Copied Command" : "Copy Git Command"}
							</button>
						)}
					</div>

					{mode === "commit" ? (
						<div className="relative">
							<textarea
								id="inspector-input"
								rows={3}
								value={commitInput}
								onChange={(e) => setCommitInput(e.target.value)}
								placeholder="e.g. feat(auth): add google oauth provider"
								className="w-full rounded-xl border border-border bg-surface-2/40 p-ml-4 font-mono text-sm text-text focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all leading-relaxed"
							/>
							<div className="mt-1.5 flex items-center justify-between text-2xs text-text-muted font-mono">
								<span>Format: <code>type(scope): subject</code></span>
								<span className={commitInput.length > 100 ? "text-red-500 font-bold" : ""}>
									{commitInput.length} / 100 chars
								</span>
							</div>
						</div>
					) : (
						<div className="relative">
							<input
								id="inspector-input"
								type="text"
								value={branchInput}
								onChange={(e) => setBranchInput(e.target.value)}
								placeholder="e.g. feat/user-authentication"
								className="w-full rounded-xl border border-border bg-surface-2/40 px-ml-4 py-ml-3 font-mono text-sm text-text focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
							/>
							<p className="mt-1.5 text-2xs text-text-muted font-mono">
								Format: <code>type/description-slug</code>
							</p>
						</div>
					)}
				</div>

				{/* Live Inspection Result Box */}
				<div className="rounded-xl border border-border bg-surface-2/60 p-ml-5 flex flex-col justify-between shadow-xs">
					<div>
						<div className="flex items-center justify-between border-b border-border pb-ml-3">
							<span className="font-mono text-2xs font-semibold uppercase tracking-wider text-text-muted">
								Engine Analysis
							</span>
							{(mode === "commit" ? commitResult.valid : branchResult.valid) ? (
								<span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-2xs font-bold text-accent border border-accent/40">
									✓ VALID
								</span>
							) : (
								<span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-0.5 font-mono text-2xs font-bold text-red-500 border border-red-500/30">
									✕ INVALID
								</span>
							)}
						</div>

						{/* Breakdown Properties */}
						{mode === "commit" ? (
							<div className="mt-ml-4 space-y-2.5 font-mono text-xs">
								<div className="flex items-center justify-between">
									<span className="text-text-muted">Type:</span>
									<span className="text-text font-bold">
										{commitResult.type || "—"}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-text-muted">Scope:</span>
									<span className="text-text">
										{commitResult.scope || "(none)"}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-text-muted">Semver Release:</span>
									<span className="font-bold text-accent">
										{commitResult.bump ? `+${commitResult.bump}` : "—"}
									</span>
								</div>
								{commitResult.isBreaking && (
									<div className="flex items-center justify-between text-amber-500 font-bold">
										<span>Breaking Change:</span>
										<span>YES (Major Bump)</span>
									</div>
								)}
							</div>
						) : (
							<div className="mt-ml-4 space-y-2.5 font-mono text-xs">
								<div className="flex items-center justify-between">
									<span className="text-text-muted">Prefix Type:</span>
									<span className="text-text font-bold">
										{branchResult.type || "—"}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-text-muted">Slug:</span>
									<span className="text-text">
										{branchResult.description || "—"}
									</span>
								</div>
							</div>
						)}

						{/* Error Details */}
						{((mode === "commit" ? commitResult.errors : branchResult.errors).length > 0) && (
							<div className="mt-ml-4 rounded-lg bg-red-500/10 border border-red-500/20 p-2.5 font-mono text-2xs text-red-500 space-y-1">
								{(mode === "commit" ? commitResult.errors : branchResult.errors).map((err, idx) => (
									<p key={idx} className="flex items-start gap-1">
										<span>•</span>
										<span>{err}</span>
									</p>
								))}
							</div>
						)}
					</div>

					<div className="mt-ml-4 border-t border-border pt-ml-3 flex items-center justify-between font-mono text-3xs text-text-muted">
						<span>Runtime: Node.js 24+ Native</span>
						<span>Cold Start: &lt;5ms</span>
					</div>
				</div>
			</div>
		</div>
	)
}
