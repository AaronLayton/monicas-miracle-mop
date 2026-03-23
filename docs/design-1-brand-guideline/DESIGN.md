# Design System Strategy: Monica's Miracle Mop

## 1. Overview & Creative North Star
The "Pristine Prism" serves as our Creative North Star. This design system moves away from the cluttered layouts of traditional home service marketing to embrace a high-end, editorial aesthetic. It is defined by **clarity, light, and an ethereal sense of cleanliness.**

To achieve this, the system breaks the "template" look through:
*   **Intentional Asymmetry:** Hero elements and imagery should slightly offset the central axis to create a bespoke, curated feel.
*   **Bespoke Air:** Using significant negative space (white space) to allow the "Deep Purple" and "Soft Teal" accents to act as magical highlights rather than overwhelming blocks of color.
*   **Refractive Depth:** Elements are treated like prisms—overlapping surfaces with glassmorphism effects that suggest a world of sparkling, light-filled spaces.

---

## 2. Colors
Our palette balances the authority of deep purple with the refreshing, airy quality of soft teal.

### Palette Application
*   **Primary (`#511983` / `#6A359C`):** Used exclusively for high-intent actions (Primary CTAs) and authoritative brand moments.
*   **Secondary (`#00687a` / `#5EDFFD`):** The "Cleaning" engine. Used for supportive icons, progress indicators, and illustrative elements.
*   **Surface Hierarchy:** We utilize `surface-container-lowest` (`#ffffff`) to `surface-container-highest` (`#e1e2e7`) to define importance.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning. Boundaries must be defined solely through:
1.  **Background Color Shifts:** Placing a `surface-container-low` section against a `surface` background.
2.  **Tonal Transitions:** Moving from a light teal wash to a crisp white surface.

### The "Glass & Gradient" Rule
To evoke a "magical" quality, use **Glassmorphism** for floating cards (e.g., pricing modules). Apply a semi-transparent `surface` color with a `backdrop-blur` of 12px–20px. 
*   **Signature Textures:** Use subtle linear gradients for large CTAs, transitioning from `primary` (`#511983`) to `primary_container` (`#6A359C`) at a 135-degree angle. This adds "soul" and dimension that flat purple cannot provide.

---

## 3. Typography
We use **Plus Jakarta Sans** as our sole typeface. Its modern, geometric curves offer a professional yet approachable warmth.

*   **Display (lg/md):** Used for "Magical" brand statements. Tracking should be set to `-0.02em` for a tighter, high-fashion editorial look.
*   **Headline (lg/md):** Reserved for service titles (e.g., "Deep Clean"). Use semi-bold weights to establish trust.
*   **Body (lg/md):** Our workhorse for readability. Maintain a generous line-height (1.6x) to preserve the "Pristine Prism" feeling of openness.
*   **Labels:** Always uppercase with `+0.05em` letter spacing when used for metadata or category tags.

---

## 4. Elevation & Depth
In this system, depth is a feeling, not a structure.

*   **Tonal Layering:** Achieve hierarchy by "stacking" surface tiers. Place a `surface-container-lowest` card on a `surface-container-low` section to create a soft, natural lift without a shadow.
*   **Ambient Shadows:** If a "floating" effect is required (e.g., a "Book Now" sticky button), use extra-diffused shadows:
    *   `blur`: 40px, `spread`: -10px, `opacity`: 6% of `on-surface` (`#191C1F`).
*   **The "Ghost Border" Fallback:** If accessibility requires a container edge, use a "Ghost Border": the `outline-variant` token at **15% opacity**. Never use 100% opaque borders.
*   **Refractive Overlap:** Allow imagery (like a sparkling mop head or soap bubbles) to break the container edges, creating a 3D effect that feels integrated into the UI.

---

## 5. Components

### Buttons
*   **Primary:** Deep Purple (`primary_container`) with white text. Radius: `full` (pill-shaped) to echo the fluid curves of water.
*   **Secondary:** Soft Teal (`secondary_container`) with `on_secondary_container` text. Use for secondary actions like "View Gallery."
*   **Interaction:** On hover, primary buttons should apply a subtle glow effect using a shadow tinted with the primary color.

### Cards & Lists
*   **Strict Rule:** No divider lines. Use vertical white space (Spacing `8` or `10`) to separate list items. 
*   **Service Cards:** Use `surface-container-lowest` with a `xl` (1.5rem) corner radius. The lack of a border makes the content feel like it's floating in light.

### Inputs & Fields
*   **Style:** Minimalist. Underline-only or subtle background shift (`surface-container-high`).
*   **Focus State:** A soft Teal (`secondary`) glow around the field, rather than a thick border.

### Signature Component: "The Sparkle Badge"
A specialized chip for "Add-ons" or "Specials." Use a teal-to-purple gradient background with a small star icon from the brand imagery.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical layouts where text is left-aligned and imagery "bleeds" off the right edge.
*   **Do** use the `primary-fixed` (`#f0dbff`) color for large background sections to keep the "purple" brand identity without the weight of the dark primary.
*   **Do** prioritize high-quality, bright photography with high exposure to match the "Pristine Prism" star.

### Don't
*   **Don't** use 1px solid black or dark grey borders. This "kills" the magical, light-filled atmosphere.
*   **Don't** use standard drop shadows. If it looks "pasted on," it's wrong. It should look "submerged" or "floating."
*   **Don't** crowd the interface. If you are unsure, add more spacing from the scale (e.g., move from `8` to `12`).
*   **Don't** use sharp corners. Everything should have a minimum of `md` (0.75rem) roundedness to feel safe and professional.