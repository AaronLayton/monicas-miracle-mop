# Monica's Miracle Mop

Professional website for Monica's Miracle Mop — domestic house cleaning (UK).

Built with **Next.js 16**, **Tailwind CSS v4**, **shadcn/ui (base-nova)**, **Motion**, **Stripe** (optional deposit), and **Resend + React Email**.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` → `.env.local` and fill keys when you're ready for live email/payments.

## Features

- Cinematic marketing site (home, about, areas, FAQ, contact, terms, privacy)
- Working multi-step booking: **Services → Schedule → Checkout**
- Live pricing from a single editable data file
- Optional **Stripe** deposit (20%, min £20) — mocked in dev without keys
- Confirmation emails via **Resend** (logged to console without keys)
- **Private booking page** per job: `/booking/[token]`
  - Change date / arrival window
  - Leave messages
  - Pay deposit
  - Cancel (24h policy noted)

## Auth decision: magic links (no login)

Each booking gets a long random token URL (32 chars). Anyone with the link can manage that booking — same pattern as Calendly / hotel confirmations.

- No passwords for customers (Kasey is non-technical; customers shouldn't need accounts)
- Keep the link private (also stated on the privacy page)
- Later upgrade path: email OTP if needed

## Edit services & prices (Kasey)

See **[docs/EDITING-SERVICES.md](./docs/EDITING-SERVICES.md)**.

Source of truth today:

```
lib/data/services.ts
```

## Environment variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Absolute site URL for emails & Stripe redirects |
| `STRIPE_SECRET_KEY` | Server Stripe key |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | (Reserved for future Elements) |
| `RESEND_API_KEY` | Transactional email |
| `EMAIL_FROM` | From address (must be verified in Resend) |
| `OWNER_EMAIL` | Kasey's inbox for new booking alerts |

## Project map

```
app/                  # Routes (App Router)
components/           # UI + booking + motion
lib/data/services.ts  # Services & pricing (edit here)
lib/booking/          # Types, store, pricing, client context
lib/email/            # Resend + React Email templates
lib/stripe.ts         # Deposit Checkout Sessions
data/bookings.json    # Local booking store (gitignored)
```

## Production notes

1. **Bookings store** is a JSON file (`data/bookings.json`). Fine for a single Node host / demo. For Vercel serverless, swap `lib/booking/store.ts` to Supabase / Neon / Turso without changing the UI.
2. Point Stripe webhook to `/api/stripe/webhook`.
3. Verify your domain in Resend for production From addresses.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
