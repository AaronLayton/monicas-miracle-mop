# Design System Document

## 1. Overview & Creative North Star: "The Pristine Prism"
This design system is built upon the Creative North Star of **"The Pristine Prism."** We are not just creating a cleaning service interface; we are crafting a digital environment that feels as refreshed and energized as a home after a professional deep clean.

To move beyond the "template" look common in service industries, this system rejects rigid, boxy grids in favor of **Organic Fluidity**. By utilizing high-contrast typography scales, intentional asymmetry inspired by the "swoosh" of a mop, and overlapping "sparkle" motifs, we create a signature editorial experience. The interface should feel light, airy, and "sparkling," using depth and translucency to suggest the clarity of polished glass.

## 2. Colors
Our palette balances the authoritative depth of royal purple with the energetic freshness of bright teal and soft, watery blues.

*   **Primary (`#511983`):** Used for core branding and high-emphasis elements. It provides the "trust" and "quality" anchor for the system.
*   **Secondary (`#006878`):** The "Miracle Mop" teal. Used for action-oriented components and to signify cleanliness.
*   **Tertiary (`#003e52`):** A deep aquatic tone used for grounding elements and sophisticated tonal depth.
*   **Neutral/Background (`#f6fafd`):** A crisp, cool-tinted white that maintains the "sparkling clean" aesthetic across all surfaces.

### The "No-Line" Rule
Standard 1px borders are strictly prohibited for sectioning. Structural boundaries must be defined exclusively through background color shifts. For instance, a `surface-container-low` section should sit directly against a `surface` background to create a sophisticated, borderless transition.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the `surface-container` tiers (Lowest to Highest) to create "nested" depth. 
*   **Base:** `surface` (`#f6fafd`)
*   **Floating Cards:** `surface-container-lowest` (`#ffffff`)
*   **Sectional Insets:** `surface-container-low` (`#f0f4f7`)
This nesting creates a soft, tactile feel that feels custom-built rather than assembled from a kit.

### The "Glass & Gradient" Rule
To elevate the "sparkling" brand promise, use **Glassmorphism** for floating elements (e.g., navigation bars or tooltips). Utilize `surface` colors at 70-80% opacity with a `backdrop-blur` of 12px-20px. 
**Signature Texture:** Apply a subtle linear gradient from `primary` (`#511983`) to `primary_container` (`#6a359c`) at a 135-degree angle for main CTAs to provide a "jewel-toned" depth.

## 3. Typography
The typography strategy plays on the contrast between "Playful Care" and "Modern Precision."

*   **Display & Headlines (Plus Jakarta Sans):** A clean, geometric sans-serif that feels modern and approachable. Use `display-lg` (3.5rem) with tight letter-spacing for a bold, editorial impact.
*   **Script Accents (Custom Branding):** While the UI uses Plus Jakarta, the "Monica’s" script style should be used sparingly as high-level decorative accents or "hand-signed" elements to reinforce the friendly, personal touch.
*   **Title & Body (Work Sans):** Chosen for its exceptional readability. The slight friendliness of Work Sans complements the "sparkling" motifs without sacrificing professionalism.
*   **Labels (Plus Jakarta Sans):** Used at smaller scales (`label-md`, `label-sm`) to maintain a crisp, organized appearance for functional metadata.

## 4. Elevation & Depth
We define hierarchy through **Tonal Layering** and ambient light, moving away from heavy shadows and structural lines.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section. This creates a natural, soft lift that mimics fine paper or clean linen.
*   **Ambient Shadows:** For elements that must float (like a "Book Now" FAB), use extra-diffused shadows. 
    *   *Shadow Color:* A tinted version of `on-surface` (approx 6% opacity).
    *   *Blur:* 24px - 40px. Avoid harsh "drop shadows" at all costs.
*   **The "Ghost Border" Fallback:** If a container requires further definition for accessibility, use a "Ghost Border": the `outline-variant` (`#cec3d3`) set to 15% opacity. 100% opaque borders are forbidden.
*   **Sparkle Accents:** Integrate the star/sparkle motifs from the logo as "elevated" decorative elements that slightly overlap container boundaries, breaking the "box" and adding a sense of magic.

## 5. Components

*   **Buttons:** 
    *   *Primary:* `primary` background with `on-primary` text. Radius: `full`.
    *   *Secondary:* `secondary_container` background. Radius: `full`.
    *   *Interaction:* On hover, apply the Signature Gradient shift.
*   **Cards:** Use `surface-container-lowest` with a `lg` (2rem) corner radius. Forbid divider lines within cards; use `spacing-6` (2rem) to separate internal content.
*   **Inputs:** Use `surface-container-highest` for the field background. The focus state should utilize a `secondary` (Teal) "Ghost Border" at 40% opacity.
*   **Chips:** Selection chips should use the `secondary_fixed` (`#a6eeff`) background to evoke a "water/clean" feel. Use `full` roundedness.
*   **Progress Indicators:** Use the "Mop Swoosh" shape as a custom loading state or as a background motif for "Success" screens.

## 6. Do's and Don'ts

### Do
*   **Use Asymmetry:** Overlap a "sparkle" motif over the corner of a card to break the grid.
*   **Leverage White Space:** Use the `20` (7rem) spacing token for major section breathing room to reinforce the "clean" brand.
*   **Color Transitions:** Use the `tertiary_container` for background washes to separate "Deep Clean" service tiers from "Standard" tiers.

### Don't
*   **Don't use black:** For text, use `on_background` (`#171c1f`) or `on_surface_variant` (`#4c4451`) to keep the palette soft and premium.
*   **Don't use sharp corners:** Avoid the `none` or `sm` roundedness scales. The brand is "friendly"; everything should be `md` (1.5rem) or higher.
*   **Don't use separators:** Never use a 1px line to separate list items. Use a background tint shift (e.g., alternating between `surface` and `surface-container-low`).