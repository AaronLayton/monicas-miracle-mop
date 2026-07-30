"use client"

import { MotionConfig } from "motion/react"

/**
 * Honours the OS-level "reduce motion" preference for all motion/react
 * animations (Reveal, Stagger, nav pill, hero visual…). The CSS fallback in
 * globals.css only covers CSS animations — motion/react drives styles from JS,
 * so it needs this config to respect the preference too.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
