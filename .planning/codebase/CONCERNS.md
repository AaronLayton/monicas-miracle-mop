# Codebase Concerns

**Analysis Date:** 2026-03-23

## Tech Debt

**Boilerplate Content Not Yet Removed:**
- Issue: The application still contains placeholder/template content from `create-next-app` scaffolding
- Files: `app/page.tsx`, `app/layout.tsx`
- Impact: Misleading metadata, unused demo images, and template UI elements pollute the codebase and may confuse developers about actual functionality
- Fix approach: Replace with real application content, update metadata to reflect project purpose (Monica's Miracle Mop service), remove hardcoded example links

**CSS Theme Variables Missing OKLch Fallbacks:**
- Issue: CSS uses OKLch color space throughout `app/globals.css` which has limited browser support
- Files: `app/globals.css` (lines 51-118)
- Impact: Color rendering may fail or appear incorrect in browsers that don't support OKLch (older versions of Safari, older Firefox)
- Fix approach: Add hex/rgb fallback colors before OKLch values using @supports fallback or duplicate declarations

**Unmaintained Default Font Fallback:**
- Issue: Font fallback chains reference "ui-sans-serif" and "system-ui" which may not be present in all environments
- Files: `app/globals.css` (lines 10-12)
- Impact: Typography inconsistency across platforms if Geist font fails to load
- Fix approach: Ensure fallback font stacks are comprehensive and well-tested across all target platforms

## Configuration Issues

**Incomplete Next.js Configuration:**
- Issue: `next.config.ts` contains only minimal configuration with placeholder comment
- Files: `next.config.ts`
- Impact: Missing critical production settings (image optimization, compression, redirects, rewrites, middleware)
- Fix approach: Audit and populate configuration based on deployment requirements

**Deprecation Warning: Line Ending Handling:**
- Issue: Git reports "LF will be replaced by CRLF" on Windows for `next.config.ts` and `.gitignore`
- Files: `next.config.ts`, `.gitignore`
- Impact: Potential inconsistency between local development (Windows CRLF) and CI/production (LF), leading to false diffs
- Fix approach: Configure `.gitattributes` with `* text=auto` or explicitly set `eol=lf` to enforce consistent line endings

**Redundant .gitignore Entries:**
- Issue: `.vercel` and `.env*.local` are added to `.gitignore` but `.vercel` was already in the committed version
- Files: `.gitignore`
- Impact: Confusing history and potential duplication
- Fix approach: Clean up duplicates and ensure all ignore patterns are intentional

## Secrets Management

**Vercel OIDC Token in .env.local:**
- Issue: `.env.local` file is tracked by git status but contains VERCEL_OIDC_TOKEN with full JWT
- Files: `.env.local`
- Impact: Even though `.env.local` is in `.gitignore`, the file currently exists in the working directory with sensitive credentials
- Fix approach: Ensure `.env.local` is never committed; use Vercel's native environment variable system for production secrets; consider regenerating the OIDC token if it was accidentally exposed

**Missing Environment Variable Documentation:**
- Issue: No `.env.example` or documentation about required environment variables
- Files: Root directory
- Impact: New developers won't know which environment variables must be configured to run the application
- Fix approach: Create `.env.example` documenting all required vars and their purposes

## Test Coverage Gaps

**No Test Infrastructure:**
- Issue: No test files, test configuration, or testing framework set up
- Files: None found
- Risk: Unable to validate functionality, regression testing impossible, high risk of breaking changes
- Priority: High - recommend setting up Jest or Vitest before adding significant features

**No Component Testing:**
- Issue: `components/ui/button.tsx` has no test coverage
- Files: `components/ui/button.tsx`
- Risk: Button component variant behavior and accessibility features untested
- Priority: Medium - UI components are high-risk for regressions

## Missing Critical Features

**No Error Handling Strategy:**
- Issue: No error boundary implementation, error page, or error handling middleware
- Files: `app/`
- Impact: Unhandled errors will crash the application with poor user feedback
- Fix approach: Implement `error.tsx`, `not-found.tsx`, and global error boundary

**No Loading States:**
- Issue: No loading UI or skeleton components for async operations
- Files: `app/`
- Impact: Users won't see feedback during data fetching or long operations
- Fix approach: Implement React Suspense boundaries and loading UI components

**Missing Responsive Design Testing:**
- Issue: Page contains responsive classes (sm:, md:) but no responsive design testing mechanism
- Files: `app/page.tsx`
- Impact: Breakpoint behavior untested; responsive design may fail on actual devices
- Fix approach: Add visual regression testing or manual responsive testing checklist

## Fragile Areas

**Hardcoded Marketing Links:**
- Issue: External URLs with UTM parameters hardcoded throughout page content
- Files: `app/page.tsx` (lines 21-34, 40, 55)
- Why fragile: Changes to marketing domains or campaign strategy require code changes; link rot not detected
- Safe modification: Extract URLs to a constants file or configuration; implement link validation
- Test coverage: None - links are not validated

**Button Component Tight Coupling to Base-UI:**
- Issue: Button component heavily couples to `@base-ui/react` with complex variant logic
- Files: `components/ui/button.tsx` (lines 8-43)
- Why fragile: Changes to Base-UI API or design system requirements could break all buttons
- Safe modification: Document variant patterns; add comprehensive tests before changing
- Test coverage: None

**Implicit Theme Color Dependencies:**
- Issue: CSS uses CSS variables (--primary, --foreground, etc.) that are defined only in globals.css with no type safety
- Files: `app/globals.css`, all component files
- Why fragile: Typos in color variable names go undetected; refactoring variable names is error-prone
- Safe modification: Create TypeScript color token definitions; use CSS-in-JS or token generation
- Test coverage: No validation of color variable availability

## Performance Concerns

**Unused Default SVG Assets:**
- Issue: `public/` contains 5 SVG files (next.svg, vercel.svg, file.svg, globe.svg, window.svg) with unclear usage
- Files: `public/*.svg`
- Impact: Potentially serving unused assets; increases bundle size if not tree-shaken
- Fix approach: Audit which SVGs are actually used; remove unused files; migrate to inline SVGs or icon library

**Multiple Font Imports Without Load Strategy:**
- Issue: Geist Sans and Geist Mono imported without explicit load strategy (preload, swap, auto)
- Files: `app/layout.tsx` (lines 5-13)
- Impact: Potential font loading flash (FOUT) or invisible text flash (FOIT) affecting Core Web Vitals
- Fix approach: Audit font loading performance; consider using `display: swap` or preloading critical weights

**No Image Optimization:**
- Issue: Next Image component used with hardcoded dimensions but no `sizes` prop (lines 7-14 in page.tsx)
- Files: `app/page.tsx`
- Impact: May serve oversized images on mobile; missed optimization opportunities
- Fix approach: Add responsive `sizes` prop; verify srcSet optimization

## Dependencies at Risk

**Outdated or Unvetted Dependencies:**
- Issue: Several dependencies with loose versions or limited guidance:
  - `shadcn` ^4.1.0 - component library with potential breaking changes
  - `@base-ui/react` ^1.3.0 - less mature than Material-UI or Radix
  - `tw-animate-css` ^1.4.0 - animation library with limited documentation
- Impact: Unplanned breaking changes; potential security vulnerabilities; maintenance burden
- Risk level: Medium - consider reviewing each dependency's update strategy
- Fix approach: Pin specific versions; create dependabot config; regular audit schedule

**Lock File Present but Large:**
- Issue: `package-lock.json` is 340KB - unusually large for a minimal Next.js setup
- Files: `package-lock.json`
- Impact: Slow install times; potential git conflicts during parallel development
- Fix approach: Review for unnecessary dependencies; consider using pnpm for better lock file size

## DevTools and Debugging

**Debug Indicator Always Visible:**
- Issue: `next.config.ts` enables dev indicators with fixed position "bottom-right" (lines 6-8)
- Files: `next.config.ts`
- Impact: Dev UI persists across all pages; may be captured in screenshots or demos
- Fix approach: Disable dev indicators for production; make configurable via environment variable

**No Source Maps Configuration:**
- Issue: No explicit source map configuration in `next.config.ts`
- Files: `next.config.ts`
- Impact: Production debugging and error tracking will be difficult; stack traces will reference compiled code
- Fix approach: Configure appropriate source map settings per environment (none for production, inline for staging)

## Browser Compatibility

**CSS Features with Limited Support:**
- Issue: Uses advanced CSS features that may not work in all target browsers:
  - `@custom-variant` (line 5 in globals.css)
  - `@layer` (line 120)
  - `@theme inline` (line 7)
  - Complex selector syntax with `:is()` (line 122)
- Files: `app/globals.css`
- Impact: Styling may fail silently in older browsers; no fallback styles provided
- Fix approach: Test on target browsers; add @supports fallbacks where needed; document browser requirements

## Documentation Gaps

**Minimal Project Documentation:**
- Issue: `README.md` is still default Next.js boilerplate with no project-specific information
- Files: `README.md`
- Impact: New developers have no context about Monica's Miracle Mop service or project goals
- Fix approach: Document: project purpose, local setup steps, feature overview, contribution guidelines

**No Component Documentation:**
- Issue: `components/ui/button.tsx` has no JSDoc or usage examples
- Files: `components/ui/button.tsx`
- Impact: Developers unsure which variants/sizes to use; inconsistent button usage across app
- Fix approach: Add comprehensive JSDoc; create Storybook or similar component documentation

**Missing shadcn Configuration Guide:**
- Issue: `components.json` exists but is not referenced or explained
- Files: `components.json`
- Impact: Developers may not understand shadcn setup or how to add new components
- Fix approach: Document shadcn workflow and configuration

---

*Concerns audit: 2026-03-23*
