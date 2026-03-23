# Architecture

**Analysis Date:** 2026-03-23

## Pattern Overview

**Overall:** Next.js 16 App Router with component-based UI architecture

**Key Characteristics:**
- Server-side rendering with React Server Components as default
- Client-side interactive components via `"use client"` directive
- Component-driven design using shadcn/ui + Base UI primitives
- Utility-first styling with Tailwind CSS v4 and CSS-in-JS via Tailwind Merge
- Type-safe routing with TypeScript and `typedRoutes` configuration

## Layers

**Presentation Layer:**
- Purpose: Render UI components and handle user interactions
- Location: `app/`, `components/`
- Contains: Page components (RSC by default), interactive client components, UI primitives
- Depends on: Styling system, utility functions, React/Next.js
- Used by: Browser client, Next.js rendering engine

**Layout Layer:**
- Purpose: Define page structure and global configuration
- Location: `app/layout.tsx`
- Contains: Root HTML structure, font loading, global metadata, CSS imports
- Depends on: Next.js metadata API, fonts (Geist), global styles
- Used by: All pages in the app

**UI Component Library:**
- Purpose: Provide reusable, styled UI primitives
- Location: `components/ui/`
- Contains: Base UI wrapped components with Tailwind styling (Button, etc.)
- Depends on: @base-ui/react, Tailwind CSS, class-variance-authority
- Used by: Page components, other components

**Utilities Layer:**
- Purpose: Provide shared helper functions
- Location: `lib/utils.ts`
- Contains: `cn()` function for className merging
- Depends on: clsx, tailwind-merge
- Used by: UI components, styling logic

**Styling System:**
- Purpose: Define design tokens and visual consistency
- Location: `app/globals.css`
- Contains: CSS custom properties (colors, typography, spacing, radius), dark mode variants, Tailwind theme overrides
- Depends on: Tailwind CSS v4, tw-animate-css, shadcn color system
- Used by: All components via CSS class application

## Data Flow

**Page Rendering Flow:**

1. Browser requests route (e.g., `/`)
2. Next.js routes to corresponding page file in `app/` (e.g., `app/page.tsx`)
3. Page component renders as Server Component by default
4. RSC can embed `"use client"` components which become interactive
5. `app/layout.tsx` wraps all pages with root HTML and global styles
6. Styles from `app/globals.css` and component-level Tailwind classes apply via class merging
7. Browser receives fully rendered HTML + client-side JavaScript for interactive components

**State Management:**
- No centralized state management library detected (Redux, Zustand, etc.)
- Local component state via React hooks on client components
- Props-based data flow from parent to child components
- Expected pattern: Minimal state, server-side data fetching where possible

## Key Abstractions

**Button Component:**
- Purpose: Reusable, styled button with multiple variants and sizes
- Examples: `components/ui/button.tsx`
- Pattern: Compound component using Base UI primitives + CVA (class-variance-authority) for styling variants
  - Uses `@base-ui/react/button` as unstyled primitive
  - Defines variants via CVA: `default`, `outline`, `secondary`, `ghost`, `destructive`, `link`
  - Defines sizes via CVA: `default`, `xs`, `sm`, `lg`, `icon`, `icon-xs`, `icon-sm`, `icon-lg`
  - Merges className with `cn()` utility using Tailwind + class merging

**Utility Functions:**
- Purpose: Helper for className composition
- Examples: `lib/utils.ts`
- Pattern: Function that combines clsx and tailwind-merge for safe Tailwind override handling
  - `cn()` accepts ClassValue array
  - Uses clsx to normalize class strings
  - Uses tailwind-merge to deduplicate Tailwind classes safely

## Entry Points

**App Root:**
- Location: `app/layout.tsx`
- Triggers: All page navigation
- Responsibilities: Load fonts (Geist Sans/Mono), set global metadata, provide HTML structure, import global styles, set dark mode support

**Home Page:**
- Location: `app/page.tsx`
- Triggers: Request to `/`
- Responsibilities: Render home page content, demonstrate boilerplate with Next.js/Vercel links

**API Routes:**
- Not detected in current structure

## Error Handling

**Strategy:** Not explicitly configured

**Patterns:**
- No custom error boundaries or error handling middleware detected
- Relies on Next.js default error handling
- Layout provides base structure for error pages if added

## Cross-Cutting Concerns

**Logging:** Not configured - no observability framework detected

**Validation:** Not configured - no validation library imported

**Authentication:** Not configured - no auth solution detected

**Styling Approach:** Tailwind CSS v4 with:
- CSS custom properties for theming (colors, spacing, radii)
- Dark mode via `.dark` class selector
- CSS-in-JS composition via class merging (cn utility)
- Component-level styling via className props

---

*Architecture analysis: 2026-03-23*
