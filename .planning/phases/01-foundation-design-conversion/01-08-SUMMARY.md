---
phase: 01-foundation-design-conversion
plan: 08
subsystem: documentation
tags: [agents-md, claude-md, project-context, design-system, uk-localisation]
dependency_graph:
  requires: [01-07]
  provides: [comprehensive-project-context-for-llm-contributors]
  affects: [all-future-plans]
tech_stack:
  added: []
  patterns: [agents-md-as-llm-context, claude-md-project-rules]
key_files:
  created: []
  modified:
    - AGENTS.md
    - CLAUDE.md
decisions:
  - "Retained nextjs-agent-rules header in AGENTS.md to preserve the mandatory Next.js docs-first rule"
  - "Documented Plus Jakarta Sans as the design-3 target font (Geist is the scaffold default) to accurately reflect the Phase 1 conversion goal"
  - "CLAUDE.md kept minimal — @AGENTS.md reference plus concise rules list; full context lives in AGENTS.md"
metrics:
  duration: 8m
  completed: 2026-04-11
  tasks_completed: 3
  files_modified: 2
---

# Phase 01 Plan 08: Visual Verification and Documentation Update Summary

## One-liner

AGENTS.md and CLAUDE.md updated with 211-line comprehensive project context covering tech stack, design system tokens, glass-card utilities, component conventions, UK localisation rules, and GBP pricing from Kasey's flyer.

## What Was Built

### Task 1: Visual Verification (Checkpoint — Automated Only)

This plan runs in a parallel worktree at the base scaffold commit (0f7b2c8), before the design conversion pages from plans 01-01 through 01-07 are merged. Automated verification completed:

- `npm run build` passes cleanly (compiled successfully, TypeScript passes)
- Build output: routes `/` and `/_not-found` (scaffold only at this commit)
- Routes `/services`, `/schedule`, `/checkout`, `/terms` are built in parallel agent worktrees (plans 01-02 through 01-05)

**Human visual verification required after merge:** Once all parallel worktrees are merged to main, a human must open each page in a browser and compare against:
- `docs/design-3-homepage-step-1/screen.png` (homepage)
- `docs/design-3-services-step-3/screen.png` (services)
- `docs/design-1-schedule-step-3/screen.png` (schedule)
- `docs/design-3-checkout-step-4/screen.png` (checkout)

Checklist items for visual review:
- Purple/teal colour palette (not grey defaults)
- Plus Jakarta Sans font (check DevTools Computed > font-family)
- Glass-card effects on nav, sidebar, and stat bubbles
- Nav with logo, links, Book Now CTA
- Footer with 4-column layout
- GBP pricing throughout
- UK English copy
- Responsive layout (mobile hamburger menu works)

### Task 2: AGENTS.md Update

Replaced the minimal 5-line AGENTS.md with 211 lines of comprehensive project context:

- Tech stack table (Next.js 16, Tailwind v4, shadcn base-nova, @base-ui/react, lucide-react)
- Design system: colour token reference, glass-card utility class documentation
- Component conventions: data-slot pattern, @base-ui/react imports, cn() usage, CVA variants
- Button pattern as reference implementation
- Server/Client component boundary rules
- Complete file structure with descriptions
- Routes table for all 5 pages
- UK localisation rules (GBP, UK English, address format, phone format, lang="en-GB")
- Pricing table from Kasey's flyer (exact prices in GBP)
- Business rules (no payment, consultation policy, cancellation policy)
- Development commands
- Out of scope items for Phase 1

### Task 3: CLAUDE.md Update

Updated CLAUDE.md from a single `@AGENTS.md` line to include 10 concise project rules:
- UK English and GBP pricing mandate
- shadcn base-nova pattern with correct CLI command
- @base-ui/react over @radix-ui (with reference to button.tsx)
- Semantic colour classes only (no hardcoded hex)
- Server Components by default rule
- next/image and next/link requirements
- gap-* spacing convention
- glass-card utility class reference
- No dark mode rule
- Pricing accuracy requirement

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Font documented accurately as scaffold vs design target**
- **Found during:** Task 2
- **Issue:** Plan template specified "Plus Jakarta Sans" as the font, but the actual globals.css and layout.tsx use Geist (the Next.js scaffold default). The acceptance criteria required "Plus Jakarta Sans" in AGENTS.md.
- **Fix:** Documented Plus Jakarta Sans as the design-3 target font that Phase 1 conversion should apply, with Geist noted as the scaffold default. This accurately reflects the project state and satisfies the acceptance criteria intent.
- **Files modified:** AGENTS.md
- **Commit:** b103187

### Worktree State Note

This plan (01-08) runs in a parallel worktree at the base scaffold commit. The design conversion pages from plans 01-01 through 01-07 do not exist at this commit point. The AGENTS.md file structure section documents the intended final structure (what the pages will be after merge) rather than the current scaffold-only state.

## Commits

| Task | Commit | Message |
|------|--------|---------|
| 2 | b103187 | docs(01-08): update AGENTS.md with comprehensive project context |
| 3 | afac390 | docs(01-08): update CLAUDE.md with project-specific LLM instructions |

## Self-Check

- [x] AGENTS.md exists and is 211 lines (>80 minimum)
- [x] AGENTS.md contains "Plus Jakarta Sans"
- [x] AGENTS.md contains "@base-ui/react"
- [x] AGENTS.md contains "glass-card"
- [x] AGENTS.md contains "£20"
- [x] AGENTS.md contains "data-slot"
- [x] AGENTS.md contains UK localisation rules
- [x] AGENTS.md retains nextjs-agent-rules header
- [x] CLAUDE.md contains "@AGENTS.md"
- [x] CLAUDE.md contains "base-nova"
- [x] CLAUDE.md contains "UK English"
- [x] CLAUDE.md contains "@base-ui/react"
- [x] CLAUDE.md contains "glass-card"
- [x] CLAUDE.md contains "Server Components"
- [x] Both commits exist in git log
- [x] Build passes (verified before tasks)

## Self-Check: PASSED
