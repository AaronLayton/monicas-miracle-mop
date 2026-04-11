# Design System Strategy: 2026 Editorial Framework

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Ethereal Efficiency."** We are moving beyond the cluttered, literal interpretations of professional services to a space that feels both surgically clean and enchantingly premium. 

This system rejects the "template" look of traditional service industries. Instead, it utilizes **Bento-box architecture** to group information into hyper-organized, rounded modules. We break the rigidity of the grid through intentional asymmetry—overlapping high-fidelity photography with "floating" glass containers—creating a sense of depth that feels like looking through a series of polished lenses. This is "Elite Magic": the reliability of a high-end concierge combined with a modern, digital wonder.

---

## 2. Colors
Our palette balances the authoritative weight of **Deep Purple** with the energetic, sanitizing spark of **Vibrant Teal**.

### Surface Hierarchy & Nesting
To achieve premium depth, we strictly follow the **"No-Line" Rule**: 1px solid borders are prohibited for sectioning. Boundaries are defined solely by background shifts or tonal transitions.
- **Base Layer:** Use `surface` (#f5f6fc) for the main application background.
- **Sectioning:** Use `surface-container-low` (#eff0f7) to define large content areas.
- **Nesting:** Place `surface-container-lowest` (#ffffff) cards inside a `surface-container-low` section to create a soft, natural lift.

### The Glass & Gradient Rule
- **Glassmorphism:** Use semi-transparent versions of `surface_container_lowest` with a `backdrop-blur` (32px+) for floating navigation or interactive overlays.
- **Signature Textures:** Main CTAs must use a subtle linear gradient from `primary` (#7042b3) to `primary_container` (#b889ff) at a 135-degree angle. This provides a "soul" to the UI that flat hex codes cannot replicate.

---

## 3. Typography
We utilize **Plus Jakarta Sans** as a variable font to create a high-contrast, editorial hierarchy.

- **Display (Large/Med):** Used for "Magic" moments. Set with tighter letter spacing (-0.02em) and Bold weights to anchor the page.
- **Headlines:** The workhorse of the Bento-box. These should be `headline-md` or `lg`, providing a clear, authoritative entry point into each data module.
- **Title & Body:** `title-md` is used for sub-headers within cards, while `body-md` handles the descriptive text. Always ensure `on_surface_variant` (#595b61) is used for secondary body text to maintain a soft, premium contrast.
- **Labels:** `label-sm` should be uppercase with slightly increased tracking (+0.05em) when used for categories or small eyebrow text.

---

## 4. Elevation & Depth
Depth in this system is an atmospheric quality, not a structural one.

- **The Layering Principle:** Stacking surface tiers creates a "physical" feel. An "Elite" feel is achieved when a `surface_container_highest` element sits atop a `surface_dim` background, creating focus without visual noise.
- **Ambient Shadows:** For floating elements, use a "Cloud Shadow":
  - **Blur:** 40px - 60px.
  - **Opacity:** 4% - 6% of the `on_surface` color.
  - **Spread:** -5px to keep the shadow tucked and natural.
- **The "Ghost Border" Fallback:** If accessibility requires a container definition, use `outline_variant` (#abadb3) at **15% opacity**. Never use 100% opaque lines.
- **Inner Borders:** For glass containers, use a 1.5px inner-stroke of `surface_lowest` at 40% opacity to mimic the "catch-light" on the edge of real glass.

---

## 5. Components

### Buttons
- **Primary:** Pill-shaped (`rounded-full`), using the signature Purple gradient.
- **Secondary:** Pill-shaped, `secondary_container` (#68fadd) background with `on_secondary_container` (#005d4f) text.
- **Tertiary:** No background. Text-only with an icon, using the `primary` color.

### Bento Cards
- **Radius:** Always use `lg` (2rem/32px) or `xl` (3rem/48px) corner radii.
- **Content:** No dividers. Separate content using the Spacing Scale (e.g., `spacing-6` between header and body).
- **Interactive State:** On hover, a card should shift from `surface_container_lowest` to a subtle `surface_bright` with a Cloud Shadow.

### Chips & Inputs
- **Chips:** Small pill shapes. Action chips use the `tertiary_container` (#ff85e4) for high-energy "Electric" accents.
- **Inputs:** Soft-filled backgrounds (`surface_container_high`) with `title-sm` typography. The focus state replaces the background with a "Ghost Border" of the `primary` color.

### Advanced "Elite" Components
- **The Glass Dock:** A bottom-anchored navigation bar using thick backdrop blur and `surface_container_low` at 60% opacity.
- **Immersive Hero:** A component where `headline-lg` text overlaps a soft-focus photographic background, using a `surface_tint` overlay at 10% to unify the image with the brand colors.

---

## 6. Do's and Don'ts

### Do
- **Do** use asymmetrical Bento layouts; one large "hero" module balanced by two smaller "stat" modules.
- **Do** lean into white space. If a layout feels "full," increase the spacing token by two steps.
- **Do** use variable font weights to distinguish between a "Action" (Bold) and "Information" (Medium).

### Don'ts
- **Don't** use black (#000000) for text. Use `on_surface` (#2c2f33) to keep the "Elite Magic" vibe soft.
- **Don't** use standard 4px or 8px border radii. This system requires the "oversized" softness of 24px+ to feel modern.
- **Don't** use dividers or horizontal rules. If you need to separate content, use a color-block shift or a spacing increment.
- **Don't** use high-contrast, harsh shadows. If the shadow is clearly visible as a "shape," it is too dark.