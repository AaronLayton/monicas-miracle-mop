# Design System Strategy: The Pristine Editorial

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Translucent Sanctuary."** 

To move beyond the generic "cleaning company" template, we are adopting a high-end editorial approach. We treat white space not as "empty" space, but as "breathing room" that mimics the feeling of a freshly cleaned home. By utilizing intentional asymmetry, overlapping high-quality photography with ghosted UI elements, and a sophisticated typographic scale, we transform a utility service into a premium lifestyle brand. 

The goal is to move the user from the "stress of mess" to the "calm of clean" through a UI that feels weightless, layered, and impeccably organized.

---

## 2. Colors & Surface Logic
Our palette utilizes deep navy for authority and soft sky blues for freshness, but the secret lies in the *Surface Tiers*.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. Sectioning must be achieved through background shifts using the `surface` tokens.
*   **Example:** A `surface-container-low` (#f2f4f7) hero section should transition directly into a `surface` (#f7f9fc) feature grid. The eye perceives the boundary through the tonal shift, maintaining a "soft" architectural feel.

### Surface Hierarchy & Nesting
Treat the UI as a physical environment. Use the `surface-container` tiers to create depth:
*   **Base:** `surface` (#f7f9fc) for the main canvas.
*   **Sections:** `surface-container-low` (#f2f4f7) for secondary content areas.
*   **Floating Elements:** `surface-container-lowest` (#ffffff) for the highest-priority cards or navigation bars to make them pop against the slightly darker background.

### The "Glass & Gradient" Rule
To elevate the "Fresh" aesthetic, use Glassmorphism for floating UI (like the header or calendar popovers). Use the `on-surface` color at 5% opacity with a `20px` backdrop-blur. 
*   **Signature Texture:** Use a subtle linear gradient for primary CTAs: `primary` (#001a48) to `primary_container` (#002d72). This prevents the deep navy from feeling "flat" or "heavy."

---

## 3. Typography
We use a dual-sans-serif approach to balance professional authority with approachable friendliness.

*   **Display & Headlines (Plus Jakarta Sans):** This is our "Editorial" voice. The generous x-height and modern curves of Plus Jakarta Sans communicate premium quality. Use `display-lg` for hero statements to create a bold, confident first impression.
*   **Body & Labels (Manrope):** Manrope provides exceptional legibility for service descriptions and forms. Its geometric nature feels "clean" and structured, reinforcing the brand's core value.
*   **Hierarchy Note:** Always pair a `headline-lg` in `primary` (#001a48) with a `body-md` in `on-surface-variant` (#444651). The high contrast in weight and subtle shift in color creates an immediate, intuitive information hierarchy.

---

## 4. Elevation & Depth
In this design system, we do not "drop shadows"; we "layer light."

*   **The Layering Principle:** Avoid elevation tokens for static cards. Instead, place a `surface-container-lowest` card on a `surface-container` background. The `0.175rem` (0.5) or `0.35rem` (1) spacing between elements provides the structural clarity.
*   **Ambient Shadows:** For interactive floating elements (modals/dropdowns), use a shadow with a `40px` blur and 6% opacity. The shadow color must be tinted with the `primary` (#001a48) value to maintain a cohesive, cool-toned atmosphere.
*   **The "Ghost Border" Fallback:** If a container requires definition against a white background, use the `outline-variant` token (#c4c6d2) at **15% opacity**. This creates a "suggestion" of a boundary rather than a hard wall.

---

## 5. Components

### Buttons
*   **Primary:** High-contrast `primary` (#001a48) with `on-primary` (#ffffff) text. Use the `lg` (1rem) roundedness.
*   **Secondary:** `secondary_container` (#9ae1ff) with `on-secondary_container` (#09657f). This represents the "Sky Blue" touchpoint—friendly and inviting.
*   **Interaction:** On hover, primary buttons should shift to `on_primary_fixed_variant` (#224489) with a slight `0.35rem` upward translation.

### Service Cards
*   **Logic:** Forbid divider lines. Use `spacing-6` (2rem) of vertical padding to separate the title from the body.
*   **Style:** Background `surface-container-lowest` (#ffffff) with `xl` (1.5rem) rounded corners. If imagery is used, it should be top-aligned with no margin, bleeding into the card edges.

### Intuitive Calendar Widget
*   **Styling:** Use a `surface` background. The selected date should use a `full` (9999px) roundedness with the `secondary` (#0c6780) color. 
*   **Layout:** Use `spacing-3` (1rem) for the grid gap to ensure the widget feels airy and un-cluttered.

### Input Fields
*   **State:** Default state uses `surface-container-high` (#e6e8eb) background with no border. 
*   **Focus State:** Transitions to `outline` (#747782) with a `2px` soft glow in `primary_fixed` (#dae2ff).

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical layouts. For example, a hero image that is offset to the right, overlapping a floating `surface-container-lowest` card on the left.
*   **Do** lean heavily on the `spacing-10` (3.5rem) and `spacing-16` (5.5rem) values between sections to enforce the "Airy" feel.
*   **Do** use "Lifestyle" imagery: Detail shots of sunlight on a clean hardwood floor or a neatly folded towel, rather than generic "person with a mop" photos.

### Don't:
*   **Don't** use 100% black. The darkest point should always be our `primary` (#001a48) or `on-background` (#191c1e).
*   **Don't** use sharp 90-degree corners. Everything must feel approachable and safe—roundedness is mandatory (minimum `md` 0.75rem).
*   **Don't** crowd the UI. If a screen feels busy, increase the spacing tokens rather than adding dividers or borders.