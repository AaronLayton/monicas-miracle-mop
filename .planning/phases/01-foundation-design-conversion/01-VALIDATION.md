---
phase: 1
slug: foundation-design-conversion
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-11
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Next.js build + ESLint (no test framework yet — Phase 1 is visual conversion) |
| **Config file** | `eslint.config.mjs`, `next.config.ts` |
| **Quick run command** | `npx next lint` |
| **Full suite command** | `npx next build` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx next lint`
- **After every plan wave:** Run `npx next build`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | DSGN-01 | — | N/A | build | `npx next build` | — | ⬜ pending |
| 01-01-02 | 01 | 1 | DSGN-02 | — | N/A | build | `npx next build` | — | ⬜ pending |
| 01-01-03 | 01 | 1 | DSGN-03 | — | N/A | build | `npx next build` | — | ⬜ pending |
| 01-02-01 | 02 | 2 | DSGN-04 | — | N/A | build+visual | `npx next build` | — | ⬜ pending |
| 01-02-02 | 02 | 2 | DSGN-05 | — | N/A | build+visual | `npx next build` | — | ⬜ pending |
| 01-03-01 | 03 | 2 | DSGN-06 | — | N/A | build+visual | `npx next build` | — | ⬜ pending |
| 01-04-01 | 04 | 2 | DSGN-07 | — | N/A | build+visual | `npx next build` | — | ⬜ pending |
| 01-05-01 | 05 | 1 | DSGN-08, DSGN-09 | — | N/A | build | `npx next build` | — | ⬜ pending |
| 01-06-01 | 06 | 3 | UK-01, UK-02, UK-03, UK-04 | — | N/A | build+grep | `npx next build` | — | ⬜ pending |
| 01-07-01 | 07 | 3 | DOCS-01, DOCS-02 | — | N/A | file-exists | `test -f AGENTS.md && test -f CLAUDE.md` | — | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements. No test framework install needed — Phase 1 is visual conversion verified by build success and visual comparison.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Visual match to design-3 screenshots | DSGN-10 | Pixel comparison requires human eye or browser screenshot diff | Open each page in Chrome, compare side-by-side with design-3 screenshots |
| UK English spelling throughout | UK-02 | Spelling check requires reading rendered copy | Review all visible text on each page for UK English |
| GBP pricing accuracy | UK-01 | Verify actual amounts match flyer | Compare displayed prices with docs/kasey-generated-flyers/flyer.png |

*All other behaviors have automated verification via build success.*

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
