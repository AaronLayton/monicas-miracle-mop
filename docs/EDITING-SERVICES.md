# How Kasey can edit services & pricing

## Right now (Phase 1)

Open this file in the project (or ask Aaron / the developer):

```
lib/data/services.ts
```

Everything customers see on the site and in booking totals comes from the
`SERVICES` array and `BUSINESS` object in that file.

### Change a price

Amounts are in **pence** (pence, not pounds):

| You want | Write |
|----------|--------|
| £20      | `2000` |
| £20.50   | `2050` |
| £150     | `15000` |

Example — Standard Clean hourly rate:

```ts
pricePence: 2000, // £20/hr
```

### Add or hide a service

- Set `active: false` to hide something without deleting it.
- Copy an existing object, give it a new `id`, and set `sortOrder`.
- `isPrimary: true` = main service customers pick first.
- Add-ons use `category: "addon"` or `"busy-parent"`.

### Visit hours (`durationHours`)

Every service has a `durationHours` value:

- **Main cleans** — baseline time for a typical 2-bed / 1-bath home. Extra bedrooms, bathrooms and kitchens add more time automatically.
- **Add-ons** — how much each extra adds to the visit (shown as “+0.75h visit” on cards).

Hours auto-update when the customer picks services. They can override manually.

### Bundle (multi-service) discounts

Edit tiers in `BUNDLE_DISCOUNTS`:

```ts
export const BUNDLE_DISCOUNTS = [
  { minItems: 2, percent: 5, label: "2+ services" },
  { minItems: 3, percent: 8, label: "3+ services" },
  { minItems: 5, percent: 12, label: "5+ services" },
]
```

Item count = 1 main service + each selected add-on.

### Deposit %

```ts
export const DEPOSIT_PERCENT = 0.2 // 20%
export const DEPOSIT_MIN_PENCE = 2000 // £20 minimum
```

---

## Recommended next step (non-technical editing)

Once the site is live and changing prices often, pick **one** of these:

| Option | Effort | Best for |
|--------|--------|----------|
| **Google Sheet → site** | Low | Kasey edits a shared sheet; site pulls on deploy or via API |
| **Sanity / Payload CMS** | Medium | Nice UI, images, free tier |
| **Baserow / Airtable** | Low–medium | Spreadsheet-like, API |

Keep the same TypeScript shapes (`Service`, etc.) so the booking flow never
needs a rewrite — only the data source changes.

---

## Bookings storage note

Bookings are saved to `data/bookings.json` on the server.

- Fine for a **single always-on Node server** or local demos.
- On **Vercel serverless**, use Supabase / Turso / Neon next — same API layer
  (`lib/booking/store.ts`) can be swapped without redesigning the UI.
