"use client"

import { useState, useMemo } from "react"

const DEFAULT_TYPES = [
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
	"maintenance",
	"renovate",
]

const PRESETS = [
	{
		label: "Valid Feature",
		commit: "feat(core): add native Node 24 type-stripping",
		branch: "feat/native-type-stripping",
	},
	{
		label: "Custom Type (maintenance)",
		commit: "maintenance(deps): bump renovate dependencies",
		branch: "maintenance/upgrade-node-types",
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
	const [showConfig, setShowConfig] = useState(false)
	const [commitInput, setCommitInput] = useState(
		"feat(core): add native Node 24 type-stripping"
	)
	const [branchInput, setBranchInput] = useState("feat/native-type-stripping")
	const [copied, setCopied] = useState(false)
	const [configCopied, setConfigCopied] = useState(false)

	// Live Config State (mimicking package.json "git-hygiene" block)
	const [customTypes, setCustomTypes] = useState(DEFAULT_TYPES.join(", "))
	const [maxHeaderLength, setMaxHeaderLength] = useState(100)
	const [ignoreBranches, setIgnoreBranches] = useState("main, master, develop")
	const [allowEmptyScope, setAllowEmptyScope] = useState(true)

	// Parsed Allowed Types Array
	const activeTypes = useMemo(() => {
		return customTypes
			.split(",")
			.map((t) => t.trim().toLowerCase())
			.filter(Boolean)
	}, [customTypes])

	// Parsed Base Branches Array
	const activeIgnoredBranches = useMemo(() => {
		return ignoreBranches
			.split(",")
			.map((b) => b.trim())
			.filter(Boolean)
	}, [ignoreBranches])

	// Validate Commit in Real-Time with Active Config
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

		// Conventional commit regex
		const match = trimmed.match(
			/^([a-z0-9_-]+)(?:\(([a-z0-9_-]+)\))?(!)?:\s+(.+)$/i
		)

		if (!match) {
			return {
				valid: false,
				errors: [
					"Must follow Conventional Commits format: <type>(<scope>): <subject>",
					`Header must start with one of the configured types: ${activeTypes.slice(0, 5).join(", ")}...`,
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

		if (!activeTypes.includes(type)) {
			errors.push(
				`Type "${type}" is not allowed by active config. Allowed: ${activeTypes.join(", ")}`
			)
		}

		if (!allowEmptyScope && !scope) {
			errors.push("Scope is required when allowEmptyScope is false.")
		}

		if (trimmed.length > maxHeaderLength) {
			errors.push(
				`Header length (${trimmed.length}) exceeds configured limit of ${maxHeaderLength} characters.`
			)
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

	// Validate Branch in Real-Time with Active Config
	function validateBranch(branch: string) {
		const trimmed = branch.trim()
		if (!trimmed) {
			return {
				valid: false,
				errors: ["Branch name cannot be empty"],
				type: null,
				description: null,
				isIgnoredBase: false,
			}
		}

		if (activeIgnoredBranches.includes(trimmed)) {
			return {
				valid: true,
				errors: [],
				type: "base-branch",
				description: trimmed,
				isIgnoredBase: true,
			}
		}

		const match = trimmed.match(/^([a-z0-9_-]+)\/([a-z0-9_-]+)$/)
		if (!match) {
			return {
				valid: false,
				errors: [
					"Branch should follow pattern: <type>/<description-with-dashes>",
					`Or match one of ignored base branches: ${activeIgnoredBranches.join(", ")}`,
				],
				type: null,
				description: null,
				isIgnoredBase: false,
			}
		}

		const [, rawType, description] = match
		const type = rawType.toLowerCase()
		const errors: string[] = []

		if (!activeTypes.includes(type)) {
			errors.push(
				`Branch prefix "${type}/" does not match configured types. Allowed: ${activeTypes.slice(0, 6).join(", ")}`
			)
		}

		return {
			valid: errors.length === 0,
			errors,
			type,
			description,
			isIgnoredBase: false,
		}
	}

	const commitResult = validateCommit(commitInput)
	const branchResult = validateBranch(branchInput)

	// Generated package.json config preview
	const generatedConfig = useMemo(() => {
		return JSON.stringify(
			{
				"git-hygiene": {
					extends: ["@commitlint/config-conventional"],
					types: activeTypes,
					ignoreBranches: activeIgnoredBranches,
					maxHeaderLength,
					allowEmptyScope,
				},
			},
			null,
			2
		)
	}, [activeTypes, activeIgnoredBranches, maxHeaderLength, allowEmptyScope])

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

	const copyConfig = async () => {
		try {
			await navigator.clipboard.writeText(generatedConfig)
			setConfigCopied(true)
			setTimeout(() => setConfigCopied(false), 2000)
		} catch {
			// ignore
		}
	}

	return (
		<div className="rounded-2xl border border-border bg-surface p-4 sm:p-6 md:p-8 shadow-md backdrop-blur-md">
			{/* Inspector Header */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4 sm:pb-5">
				<div>
					<div className="flex items-center gap-2">
						<span className="flex size-2.5 rounded-full bg-accent animate-pulse" />
						<h3 className="font-mono text-sm font-bold text-text tracking-tight">
							Live Metadata Inspector
						</h3>
					</div>
					<p className="mt-1 text-xs text-text-muted font-sans">
						Test commit messages, branch rules, and live <code>package.json</code> configurations in real-time.
					</p>
				</div>

				<div className="flex flex-wrap items-center gap-2 justify-end">
					{/* Config Toggle Button */}
					<button
						type="button"
						onClick={() => setShowConfig(!showConfig)}
						className={`cursor-pointer inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 font-mono text-xs font-semibold transition-all ${
							showConfig
								? "border-accent bg-accent-soft text-accent"
								: "border-border bg-surface-2 text-text-secondary hover:text-text"
						}`}
					>
						<span>⚙️</span>
						<span>{showConfig ? "Hide Config" : "Edit Config"}</span>
					</button>

					{/* Mode Tabs */}
					<div className="inline-flex rounded-xl border border-border bg-surface-2 p-1 font-mono text-xs shadow-xs">
						<button
							type="button"
							onClick={() => setMode("commit")}
							className={`rounded-lg px-2.5 sm:px-3.5 py-1.5 font-medium transition-all cursor-pointer ${
								mode === "commit"
									? "bg-accent text-accent-foreground font-semibold shadow-xs"
									: "text-text-muted hover:text-text"
							}`}
						>
							Commit
						</button>
						<button
							type="button"
							onClick={() => setMode("branch")}
							className={`rounded-lg px-2.5 sm:px-3.5 py-1.5 font-medium transition-all cursor-pointer ${
								mode === "branch"
									? "bg-accent text-accent-foreground font-semibold shadow-xs"
									: "text-text-muted hover:text-text"
							}`}
						>
							Branch
						</button>
					</div>
				</div>
			</div>

			{/* Presets Bar */}
			<div className="mt-4 sm:mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
				<div className="flex items-center gap-2 overflow-x-auto pb-1.5 max-w-full">
					<span className="font-mono text-2xs text-text-muted uppercase tracking-wider font-semibold shrink-0">
						Presets:
					</span>
					{PRESETS.map((p) => (
						<button
							key={p.label}
							type="button"
							onClick={() => {
								setCommitInput(p.commit)
								setBranchInput(p.branch)
							}}
							className="shrink-0 cursor-pointer rounded-lg border border-border bg-surface-2/60 px-2.5 py-1 font-mono text-2xs text-text-secondary transition-all hover:border-accent hover:text-text active:scale-98"
						>
							{p.label}
						</button>
					))}
				</div>

				<span className="font-mono text-3xs text-text-muted shrink-0">
					{activeTypes.length} types · Max {maxHeaderLength} chars
				</span>
			</div>

			{/* LIVE CONFIGURATION DRAWER (package.json simulator) */}
			{showConfig && (
				<div className="mt-5 rounded-xl border border-accent/30 bg-surface-2/70 p-4 sm:p-5 animate-in fade-in duration-200">
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3 mb-4">
						<div className="flex items-center gap-2">
							<span className="font-mono text-xs font-bold text-text">
								package.json &quot;git-hygiene&quot; Config Editor
							</span>
							<span className="rounded bg-accent-soft px-2 py-0.5 font-mono text-3xs font-bold text-accent">
								Live Synced
							</span>
						</div>
						<button
							type="button"
							onClick={copyConfig}
							className="self-start sm:self-auto font-mono text-2xs text-accent hover:underline cursor-pointer"
						>
							{configCopied ? "✓ Copied JSON" : "Copy package.json block"}
						</button>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						{/* Allowed Types Input */}
						<div className="lg:col-span-2">
							<label htmlFor="cfg-types" className="block font-mono text-2xs font-semibold text-text-muted uppercase tracking-wider mb-1">
								Allowed Types (comma-separated):
							</label>
							<input
								id="cfg-types"
								type="text"
								value={customTypes}
								onChange={(e) => setCustomTypes(e.target.value)}
								className="w-full rounded-lg border border-border bg-surface px-3 py-1.5 font-mono text-xs text-text focus:border-accent focus:outline-none"
							/>
						</div>

						{/* Max Header Length */}
						<div>
							<label htmlFor="cfg-max-len" className="block font-mono text-2xs font-semibold text-text-muted uppercase tracking-wider mb-1">
								Max Header Length:
							</label>
							<input
								id="cfg-max-len"
								type="number"
								min={30}
								max={200}
								value={maxHeaderLength}
								onChange={(e) => setMaxHeaderLength(Number(e.target.value) || 100)}
								className="w-full rounded-lg border border-border bg-surface px-3 py-1.5 font-mono text-xs text-text focus:border-accent focus:outline-none"
							/>
						</div>

						{/* Base Branches */}
						<div>
							<label htmlFor="cfg-ignore-branches" className="block font-mono text-2xs font-semibold text-text-muted uppercase tracking-wider mb-1">
								Ignored Base Branches:
							</label>
							<input
								id="cfg-ignore-branches"
								type="text"
								value={ignoreBranches}
								onChange={(e) => setIgnoreBranches(e.target.value)}
								className="w-full rounded-lg border border-border bg-surface px-3 py-1.5 font-mono text-xs text-text focus:border-accent focus:outline-none"
							/>
						</div>
					</div>

					{/* Allow Empty Scope Toggle */}
					<div className="mt-4 pt-3 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
						<label className="flex items-center gap-2 cursor-pointer text-text-secondary">
							<input
								type="checkbox"
								checked={allowEmptyScope}
								onChange={(e) => setAllowEmptyScope(e.target.checked)}
								className="rounded border-border accent-accent size-4"
							/>
							<span>Allow empty scope (e.g. <code>feat: description</code>)</span>
						</label>
						<button
							type="button"
							onClick={() => {
								setCustomTypes(DEFAULT_TYPES.join(", "))
								setMaxHeaderLength(100)
								setIgnoreBranches("main, master, develop")
								setAllowEmptyScope(true)
							}}
							className="self-start sm:self-auto text-2xs text-text-muted hover:text-text underline cursor-pointer"
						>
							Reset Defaults
						</button>
					</div>
				</div>
			)}

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
								<span className={commitInput.length > maxHeaderLength ? "text-red-500 font-bold" : ""}>
									{commitInput.length} / {maxHeaderLength} chars
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
								Format: <code>type/description-slug</code> or base branch (<code>{activeIgnoredBranches.join(", ")}</code>)
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
									<span className="text-text-muted">Type:</span>
									<span className="text-text font-bold">
										{branchResult.isIgnoredBase ? "Base Branch (Protected)" : (branchResult.type || "—")}
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
						<span>Engine: @chitrank2050/git-hygiene-core</span>
						<span>Cold Start: &lt;5ms</span>
					</div>
				</div>
			</div>
		</div>
	)
}
