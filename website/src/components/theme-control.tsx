"use client"

import { Button } from "@chitrank2050/monoline-ui/button"

import { useTheme } from "./theme-provider"

export function ThemeControl() {
	const { theme, toggleTheme } = useTheme()

	return (
		<Button
			variant="secondary"
			size="sm"
			onClick={toggleTheme}
			aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
		>
			<span className="text-xs font-mono">
				{theme === "light" ? "🌙 Dark" : "☀️ Light"}
			</span>
		</Button>
	)
}
