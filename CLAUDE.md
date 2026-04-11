@AGENTS.md

## Project Rules

- This is a UK cleaning business website. All copy must use UK English and GBP pricing.
- Components follow shadcn/ui base-nova patterns. Use `npx shadcn@latest add [component]` to install new primitives.
- Use `@base-ui/react` primitives, NOT `@radix-ui`. Check the existing `components/ui/button.tsx` for the correct pattern.
- Use semantic Tailwind colour classes (`bg-primary`, `text-secondary`). Never hardcode hex values.
- Server Components by default. Only add `"use client"` for components that need `useState`, `useEffect`, or event handlers.
- Use `next/image` for all images. Use `next/link` for all internal navigation.
- Use `gap-*` for spacing, not `space-x-*` or `space-y-*`.
- The `.glass-card`, `.glass-card-nav`, and `.glass-card-sidebar` utility classes are defined in `globals.css`.
- No dark mode — do not add dark mode variants to new components.
- All prices must match Kasey's flyer exactly (GBP, see AGENTS.md pricing table).
