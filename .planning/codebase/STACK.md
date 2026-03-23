# Technology Stack

**Analysis Date:** 2026-03-23

## Languages

**Primary:**
- TypeScript 5.x - All application code, configuration files, and components

**Secondary:**
- JavaScript (ESM) - PostCSS and ESLint configuration files

## Runtime

**Environment:**
- Node.js 22.20.0 (current environment)
- No `.nvmrc` file present - version not explicitly pinned in repository

**Package Manager:**
- npm 10.9.3
- Lockfile: `package-lock.json` (present, lockfileVersion 3)

## Frameworks

**Core:**
- Next.js 16.2.1 - Full-stack React framework with App Router
  - Features enabled: `typedRoutes: true`, component caching
  - Dev indicator position: bottom-right

**UI & Styling:**
- React 19.2.4 - Component library and JSX rendering
- React DOM 19.2.4 - DOM rendering
- Tailwind CSS 4.x - Utility-first CSS framework via `@tailwindcss/postcss`
- shadcn 4.1.0 - Component library and CLI (base-nova style, RSC enabled)
- @base-ui/react 1.3.0 - Headless component primitives (Button, form elements)

**Icons & Utilities:**
- lucide-react 0.577.0 - Icon library (24px icons)
- class-variance-authority 0.7.1 - Type-safe CSS variant system
- clsx 2.1.1 - Conditional class name utility
- tailwind-merge 3.5.0 - Tailwind class merging without conflicts
- tw-animate-css 1.4.0 - Animation utilities

**Font Management:**
- next/font - Google Fonts integration
- Geist font family (sans-serif and monospace variants) - Loaded from `next/font/google`

## Key Dependencies

**Critical:**
- @base-ui/react (1.3.0) - Provides unstyled, accessible component primitives for shadcn integration
- class-variance-authority (0.7.1) - CVA pattern for composable, type-safe component variants
- tailwind-merge (3.5.0) - Essential for safe Tailwind utility merging in component prop systems

**Development:**
- @types/node 20.x - Node.js type definitions
- @types/react 19.x - React type definitions
- @types/react-dom 19.x - React DOM type definitions

## Build & Development Tools

**Linting:**
- ESLint 9.x - JavaScript/TypeScript linting
- eslint-config-next 16.2.1 - Next.js ESLint configuration
- Config location: `eslint.config.mjs` (flat config format)

**Styling:**
- PostCSS 4.x (via @tailwindcss/postcss) - CSS processing pipeline
- Config location: `postcss.config.mjs`

**Type Checking:**
- TypeScript 5.x - Strict mode enabled
  - Target: ES2017
  - Module: esnext
  - JSX mode: react-jsx
  - Path aliases configured: `@/*` maps to project root

## Configuration

**Environment:**
- Development environment configured via `.env.local` (exists, contains Vercel OIDC token)
- Vercel integration active: VERCEL_OIDC_TOKEN present for Vercel CI/CD
- No additional external service credentials detected in codebase

**Build Configuration:**
- `next.config.ts` - Typed Next.js configuration
  - typedRoutes enabled for end-to-end type safety
  - cacheComponents enabled for performance
  - devIndicators positioned bottom-right

**Component Configuration:**
- `components.json` - shadcn configuration
  - Style: base-nova
  - Icon library: lucide
  - RSC mode: enabled
  - TSX output: enabled
  - Tailwind CSS variables: enabled
  - Aliases configured for: components, utils, ui, lib, hooks

## Platform Requirements

**Development:**
- Node.js 22.x (or compatible with npm 10.9.x)
- Package manager: npm 10.9.3+
- TypeScript 5.x for IDE support

**Production:**
- Vercel platform (detected via `.vercel/` directory and VERCEL_OIDC_TOKEN)
- Deployment method: Vercel CLI / Git push
- No explicit Node.js version pinning - will use Vercel defaults

**Browser Support:**
- Modern browsers supporting ES2017+
- CSS custom properties (CSS variables)
- CSS Grid and Flexbox
- Dynamic imports and ESM modules

---

*Stack analysis: 2026-03-23*
