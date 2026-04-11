# Design System Strategy: Modern Ethereal

## 1. Overview & Creative North Star
The **Creative North Star** for this design system is **"The Pristine Sanctuary."** 

In the high-end 2026 cleaning space, we must bridge the gap between clinical excellence and the "magic" of a transformed home. This design system moves beyond the standard "utilitarian app" look by embracing an editorial, mobile-first aesthetic. We break the rigid grid through intentional asymmetry—using overlapping translucent layers and high-contrast typography scales that feel more like a premium lifestyle magazine than a service directory. 

The goal is to evoke a sense of weightlessness and clarity. By utilizing expansive whitespace and a "vertical flow" hierarchy, we ensure that even on small screens, the user feels a sense of calm and order.

## 2. Colors
Our palette is a sophisticated interplay between the authoritative **Deep Royal Purple** and the transformative **Electric Teal**, grounded by an architectural slate foundation.

### Palette Roles
*   **Primary (`#310065` / `#4A148C`):** Used for deep brand authority and primary actions.
*   **Secondary (`#006B5C` / `#00BFA5`):** The "Magic" color—used for success states, highlights, and active cleaning indicators.
*   **Surface Foundation:** We utilize `surface` (`#F6FAFE`) for the main canvas, providing a crisp, airy environment that feels cleaner than standard white.

### The "No-Line" Rule
Standard 1px borders are strictly prohibited for sectioning. They feel "trapped" and clinical. Boundaries must be defined through **Tonal Transitions**. Use `surface-container-low` to set off a section against the `surface` background. If you need to separate content, use white space (from our Spacing Scale) or a background color shift.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, frosted layers.
*   **Base:** `surface`
*   **Sectioning:** `surface-container-low`
*   **Interaction Cards:** `surface-container-lowest` (pure white) to create a "pop" of cleanliness.
*   **Floating Elements:** Use semi-transparent `surface` with a `backdrop-filter: blur(20px)` to achieve the signature ethereal look.

### The "Glass & Gradient" Rule
To add visual soul, main CTAs and Hero backgrounds should utilize a subtle linear gradient from `primary` to `primary_container`. This creates a sense of depth and luminosity that a flat hex code cannot achieve.

## 3. Typography
We utilize **Plus Jakarta Sans** for its geometric precision and modern, tech-forward character.

*   **Display Scale:** Use `display-lg` (3.5rem) with `-0.02em` letter-spacing for hero headlines. This conveys luxury and editorial confidence.
*   **Headline Scale:** `headline-md` (1.75rem) serves as the primary entry point for content blocks.
*   **Body Scale:** `body-lg` (1rem) is the workhorse. We prioritize line heights of 1.6 to maintain the "airy" feel of the brand.
*   **Hierarchy Note:** Always pair a `display` heading with `body-md` in `on_surface_variant` to create a sophisticated high-low contrast.

## 4. Elevation & Depth
Depth in this system is achieved through **Tonal Layering** rather than heavy shadows.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` background. This creates a soft, natural "lift."
*   **Ambient Shadows:** For floating action buttons or modal sheets, use a shadow with a 24px-32px blur at 6% opacity. The shadow color should be a tint of `primary` (e.g., `#280056`), never pure black.
*   **The "Ghost Border":** If a container requires definition against an identical background, use the `outline_variant` token at **15% opacity**. This creates a "breath" of a line rather than a hard edge.
*   **Glassmorphism:** Navigation bars and sticky headers must use `surface` at 80% opacity with a heavy backdrop blur. This allows the teal and purple elements of the page to "bleed through" as the user scrolls, mimicking the look of water or clean glass.

## 5. Components

### Buttons
*   **Shape:** Always use the `full` (stadium) roundedness scale.
*   **Primary:** `primary_container` background with `on_primary` text. Include a subtle glow-shadow (secondary color) on hover/active.
*   **Tertiary:** Transparent background with `primary` text. Large touch targets (minimum 48dp height).

### Cards
*   **Style:** No borders. Use `md` (1.5rem) corner radius. 
*   **Separation:** Instead of dividers, use `spacing-8` (2.75rem) to let content breathe.

### Input Fields
*   **Style:** `surface-container-high` backgrounds with `none` border. 
*   **Active State:** A 2px "Ghost Border" using `secondary` (Electric Teal) to signal the "magic" of user input.

### Signature Component: The "Sparkle" Progress Tracker
A bespoke component for tracking cleaning progress. Use a blurred teal gradient path with high-contrast `primary` nodes to represent completed tasks, evoking the "magic" of the service.

## 6. Do's and Don'ts

### Do:
*   **Do** embrace asymmetry. Align a headline to the left and a supporting image slightly offset to the right.
*   **Do** use `secondary_fixed` (Teal) sparingly as a "highlight" color to draw eyes to key conversion points.
*   **Do** ensure all touch targets meet the `48x48dp` minimum, following the mobile-first philosophy.

### Don't:
*   **Don't** use 100% opaque black for text. Use `on_surface` (`#171C1F`) to keep the "clinical precision" soft.
*   **Don't** use sharp corners. Everything must feel "liquid" and safe—use a minimum of `DEFAULT` (1rem) radius.
*   **Don't** use standard dividers (`<hr>`). Separate sections with `spacing-12` or background color shifts.