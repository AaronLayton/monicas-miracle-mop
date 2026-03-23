# Coding Conventions

**Analysis Date:** 2026-03-23

## Naming Patterns

**Files:**
- Lowercase with hyphens for multi-word names: `button.tsx`, `globals.css`, `utils.ts`
- Page components: `page.tsx`, `layout.tsx` (Next.js App Router convention)
- Component files match component name: `button.tsx` exports `Button`

**Functions:**
- PascalCase for React components: `Home()`, `Button()`, `RootLayout()`
- camelCase for utility functions: `cn()` (defined in `lib/utils.ts`)
- Exported as default for pages/layouts: `export default function Home()`

**Variables:**
- camelCase for constants and variables: `geistSans`, `geistMono`, `buttonVariants`, `nextConfig`
- Const declarations for immutable values: `const geistSans = ...`, `const buttonVariants = cva(...)`

**Types:**
- PascalCase for types and interfaces: `Metadata`, `Props`, `VariantProps`
- Type imports use explicit `type` keyword: `import type { Metadata } from "next"`
- Generic type parameters inline with components: `ButtonPrimitive.Props & VariantProps<typeof buttonVariants>`

## Code Style

**Formatting:**
- No explicit prettier config found; Next.js defaults apply
- 2-space indentation (observed in all source files)
- Trailing commas in multi-line structures
- Single quotes in JSX/TSX attributes when needed, double quotes for imports

**Linting:**
- ESLint v9 with flat config format (`eslint.config.mjs`)
- Extends Next.js core web vitals and TypeScript configs: `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Ignores: `.next/**`, `out/**`, `build/**`, `next-env.d.ts`
- Config file: `/f/Projects/Git/monicas-miracle-mop/eslint.config.mjs`

## Import Organization

**Order:**
1. Next.js and React imports: `import type { Metadata } from "next"`, `import Image from "next/image"`
2. Third-party libraries: `import { Button as ButtonPrimitive } from "@base-ui/react/button"`
3. Local utilities and components: `import { cn } from "@/lib/utils"`
4. CSS and other assets: `import "./globals.css"`
5. Type-only imports use explicit `type` keyword: `import type { ClassValue } from "clsx"`

**Path Aliases:**
- `@/*` maps to project root (`./*`) - defined in `tsconfig.json`
- Example: `@/lib/utils` resolves to `lib/utils.ts`
- Example: `@/components/ui` resolves to `components/ui/`

## Error Handling

**Patterns:**
- Minimal explicit error handling in observed files
- React component props use TypeScript for validation (`Props & VariantProps`)
- No try-catch blocks observed; relies on React error boundaries and Next.js error handling
- Type safety preferred over runtime error checking

## Logging

**Framework:** `console` (no specialized logging framework observed)

**Patterns:**
- No logging observed in current source files
- Future logging should use standard `console.log()`, `console.error()`, `console.warn()` if needed
- Client components marked with `"use client"` directive when needed

## Comments

**When to Comment:**
- Minimal comments observed in codebase
- Code is written to be self-documenting through clear naming
- Comments not present in current files; focus on readable code over comments

**JSDoc/TSDoc:**
- No JSDoc comments observed in current source files
- TypeScript type annotations provide documentation
- Future additions should follow standard JSDoc format if documentation is needed

## Function Design

**Size:**
- Small, focused functions preferred
- `cn()` utility in `lib/utils.ts` is single-purpose: combines clsx and twMerge
- React components typically handle single responsibility

**Parameters:**
- Destructured props with TypeScript types: `{ children }` in layout, `{ className, variant, size, ...props }` in Button
- Use `Readonly<>` wrapper for props to enforce immutability: `Readonly<{ children: React.ReactNode }>`
- Rest parameters used sparingly: `...props` in Button component

**Return Values:**
- React components return JSX.Element or implicit types
- Utilities return typed values: `cn()` returns `string`
- Metadata exported as constants: `export const metadata: Metadata = {...}`

## Module Design

**Exports:**
- Named exports for utilities: `export function cn(...)`, `export { Button, buttonVariants }`
- Default exports for pages/layouts: `export default function Home()`, `export default function RootLayout()`
- Type exports use explicit `type` keyword: `import type { Metadata }`

**Barrel Files:**
- Not used in current codebase
- Component exports explicit: `components/ui/button.tsx` exports `Button` and `buttonVariants`

## Class Variance Authority (CVA) Pattern

**Usage:**
- CVA used for component variants: `buttonVariants = cva(...)`
- Variants defined as object with variant names and style strings
- Size and style variants combined with `defaultVariants`
- Variants composed with `cn()` utility: `className={cn(buttonVariants({ variant, size, className }))}`

## Next.js Specific Conventions

**App Router:**
- File-based routing: `app/page.tsx` is home, `app/layout.tsx` is root layout
- Server components by default (no `"use client"` unless interaction needed)
- `"use client"` directive used for interactive components: `components/ui/button.tsx` starts with `"use client"`

**Metadata:**
- Exported as constant in layouts: `export const metadata: Metadata = {...}`
- Type imported from `next`: `import type { Metadata } from "next"`

**Font Loading:**
- Fonts imported from `next/font/google`: `import { Geist, Geist_Mono } from "next/font/google"`
- Font config stored in constants with proper typing
- CSS variables applied to HTML element: `className={`${geistSans.variable} ${geistMono.variable}`}`

## Tailwind CSS Conventions

**Class Usage:**
- Utility-first approach with Tailwind v4
- @theme inline variant definitions in CSS
- @custom-variant for dark mode support
- OkLCH color space for CSS variables
- Responsive modifiers: `sm:`, `md:` prefixes observed in `page.tsx`
- Dark mode support via `.dark` class

**CSS Variables:**
- Design tokens defined as CSS custom properties in `app/globals.css`
- Color palette: primary, secondary, muted, accent, destructive, border, input, ring
- Radius scale: sm, md, lg, xl, 2xl, 3xl, 4xl
- Sidebar-specific tokens: sidebar, sidebar-foreground, sidebar-primary, sidebar-accent, sidebar-border, sidebar-ring
- Chart colors: chart-1 through chart-5
- Variables mapped in @theme section

---

*Convention analysis: 2026-03-23*
