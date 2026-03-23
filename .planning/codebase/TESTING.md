# Testing Patterns

**Analysis Date:** 2026-03-23

## Test Framework

**Current Status:** Not configured

**Runner:**
- No test runner configured (Jest, Vitest, etc. not in dependencies)
- No test configuration file found (`jest.config.js`, `vitest.config.ts`, etc.)

**Assertion Library:**
- Not configured - no testing framework present

**Run Commands:**
```bash
npm run lint                # ESLint check only (defined in package.json)
npm run dev                 # Development server
npm run build               # Production build
npm run start               # Start production server
```

## Recommendation for Test Setup

**Recommended Framework:**
- **Vitest** - Recommended for Next.js projects, zero-config with TypeScript, fast
  - Alternative: Jest with `@types/jest` if more comprehensive ecosystem needed

**Recommended Assertion Library:**
- Vitest includes assertions via Vitest API or use `@testing-library/react` for component testing

**Recommended Setup:**
```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

**Config File Location:** `vitest.config.ts` (at project root)

## Test File Organization

**Recommended Location:**
- Co-located with source: `components/ui/__tests__/button.test.tsx` or `components/ui/button.test.tsx`
- Separate folder approach: `__tests__/components/ui/button.test.tsx`

**Current Practice:**
- No test files found in source directories
- All `.test.ts` and `.spec.ts` files are in `node_modules/` (from dependencies)

**Naming Convention:**
- Use `.test.tsx` suffix for component tests: `button.test.tsx`
- Use `.test.ts` suffix for utility tests: `utils.test.ts`

## Test Structure

**Recommended Pattern (Vitest + React Testing Library):**

```typescript
import { render, screen } from "@testing-library/react"
import { Button } from "@/components/ui/button"
import { describe, it, expect } from "vitest"

describe("Button", () => {
  it("renders button with children text", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument()
  })

  it("applies variant class correctly", () => {
    render(<Button variant="outline">Outlined</Button>)
    const button = screen.getByRole("button")
    expect(button).toHaveClass("border-border")
  })

  it("disables button when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole("button")).toBeDisabled()
  })
})
```

**Patterns Observed in Codebase:**
- No test patterns currently exist
- Component structure suggests these would be testable units

## Mocking

**Framework:** Not configured

**When Implemented:**
- Mock `next/font/google` for font imports in layout tests
- Mock `next/image` for Image component tests
- Use `vi.mock()` from Vitest for module mocking

**Example Pattern (Future Implementation):**

```typescript
import { vi } from "vitest"

vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "--font-geist-sans" }),
  Geist_Mono: () => ({ variable: "--font-geist-mono" }),
}))
```

**What to Mock:**
- External APIs and services (when integrated)
- Next.js modules: `next/image`, `next/font`, `next/router`
- Class Variance Authority instances if testing variant logic

**What NOT to Mock:**
- Tailwind utility functions (`cn`, `clsx`, `twMerge`)
- React components unless testing composition
- CSS output - test with actual styles

## Fixtures and Factories

**Test Data:**
- No fixtures currently implemented
- Recommendation: Create factory functions for component props

**Example Pattern (Future Implementation):**

```typescript
// __tests__/fixtures/button.ts
export const createButtonProps = (overrides = {}) => ({
  variant: "default" as const,
  size: "default" as const,
  children: "Click me",
  ...overrides,
})
```

**Location:**
- Recommended: `__tests__/fixtures/` or `__tests__/factories/`
- Collocate with related tests

## Coverage

**Requirements:** Not enforced

**Recommendation:**
- Target: 80% statement coverage minimum
- Implement coverage checks in CI/CD when tests are added

**View Coverage (When Implemented):**
```bash
vitest run --coverage
```

**Coverage Config (Example for vitest.config.ts):**
```typescript
coverage: {
  provider: "v8",
  reporter: ["text", "json", "html"],
  exclude: [
    "node_modules/",
    "dist/",
  ],
}
```

## Test Types

**Unit Tests:**
- Scope: Individual components and utilities
- Approach: Test component props, variants, and state changes
- Example: `button.test.tsx` tests Button component with different variants and sizes

**Integration Tests:**
- Scope: Component interactions and layouts
- Approach: Test multiple components together, page layouts
- Example: Test `RootLayout` with `page.tsx` content
- Recommended location: `__tests__/integration/`

**E2E Tests:**
- Framework: Not configured
- Recommendation: Playwright or Cypress for future end-to-end testing
- Would test user flows through complete application

## Common Patterns

**Async Testing (Future Implementation):**

```typescript
it("loads data asynchronously", async () => {
  render(<Component />)
  const element = await screen.findByText("Loaded")
  expect(element).toBeInTheDocument()
})
```

**Error Testing (Future Implementation):**

```typescript
it("handles error state", () => {
  render(<Button onClick={() => throw new Error("Failed")} />)
  // Test error boundary or error state
  expect(screen.getByRole("alert")).toBeInTheDocument()
})
```

**Component Prop Testing (Future Implementation):**

```typescript
const variants = ["default", "outline", "secondary", "ghost", "destructive", "link"] as const
variants.forEach((variant) => {
  it(`renders ${variant} variant`, () => {
    render(<Button variant={variant}>Button</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })
})
```

## Next Steps for Test Implementation

1. **Install dependencies:**
   ```bash
   npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
   ```

2. **Create `vitest.config.ts`:**
   - Configure test environment (jsdom for React)
   - Set up import aliases to match tsconfig
   - Enable coverage reporting

3. **Add npm scripts to `package.json`:**
   ```json
   "test": "vitest",
   "test:watch": "vitest --watch",
   "test:coverage": "vitest run --coverage"
   ```

4. **Create first test file:**
   - Start with `components/ui/button.test.tsx`
   - Test variants and size props

5. **Add to CI/CD:**
   - Run tests on pull requests
   - Enforce coverage minimums

---

*Testing analysis: 2026-03-23*
