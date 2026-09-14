"use client"

import { useReportWebVitals } from "next/web-vitals"

/**
 * Native Next.js Core Web Vitals Reporter
 * Measures real-user performance (CLS, FCP, FID, INP, LCP, TTFB)
 * without third-party analytics overhead or Vercel Speed Insights quota consumption.
 */
export function WebVitals() {
	useReportWebVitals((metric) => {
		if (process.env.NODE_ENV !== "production") {
			console.log(`[Web Vitals] ${metric.name}:`, {
				value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
				rating: metric.rating,
				delta: metric.delta,
				id: metric.id,
			})
		}
	})

	return null
}
