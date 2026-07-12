/**
 * Shared view-transition-name tokens.
 * Only one element per name may be in the document at a time.
 */
export const VT = {
  // Site chrome (layout)
  nav: "site-nav",
  footer: "site-footer",
  pageMain: "page-main",
  // Booking flow
  sidebar: "booking-sidebar",
  title: "booking-title",
  subtitle: "booking-subtitle",
  steps: "booking-steps",
} as const
