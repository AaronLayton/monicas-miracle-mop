import type { ReactElement } from "react"
import { Resend } from "resend"
import type { Booking } from "@/lib/booking/types"
import { BUSINESS, ARRIVAL_WINDOWS, formatPrice, getServiceById } from "@/lib/data/services"
import { bookingToIcsEvent } from "@/lib/calendar/ics"
import { getSiteUrl } from "@/lib/site"
import {
  CustomerConfirmationEmail,
  OwnerNotificationEmail,
  BookingUpdatedEmail,
  BookingCancelledEmail,
  BusinessMessageEmail,
  CustomerMessageEmail,
} from "@/lib/email/templates"

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}

function fromAddress() {
  return (
    process.env.EMAIL_FROM ??
    `${BUSINESS.name} <onboarding@resend.dev>`
  )
}

function bookingManageUrl(token: string) {
  return `${getSiteUrl()}/booking/${token}`
}

/** Kasey's view of the booking — owner emails link here, not the customer page */
function adminBookingUrl(id: string) {
  return `${getSiteUrl()}/admin/bookings/${id}`
}

function windowLabel(id: string) {
  return ARRIVAL_WINDOWS.find((w) => w.id === id)?.label ?? id
}

function serviceName(id: string) {
  return getServiceById(id)?.name ?? id
}

/** ICS calendar attachment; Resend accepts content as a base64 string. */
interface IcsAttachment {
  filename: string
  content: string
}

/** Build a Resend attachment for the booking's calendar event. */
function bookingIcsAttachment(booking: Booking): IcsAttachment {
  return {
    filename: `booking-${booking.reference}.ics`,
    content: Buffer.from(bookingToIcsEvent(booking), "utf8").toString("base64"),
  }
}

async function send(opts: {
  to: string | string[]
  subject: string
  react: ReactElement
  attachments?: IcsAttachment[]
}) {
  const resend = getResend()
  if (!resend) {
    console.info("[email:dev]", opts.subject, "→", opts.to)
    return { id: "dev-mock", skipped: true as const }
  }
  // On the onboarding@resend.dev fallback sender (no verified domain yet),
  // Resend rejects the ENTIRE send with 403 if any recipient — including a
  // BCC — isn't the account owner. Skip BCC until a real domain is in use.
  const bcc =
    fromAddress().includes("resend.dev") ? undefined : process.env.BCC_EMAIL
  const { data, error } = await resend.emails.send({
    from: fromAddress(),
    to: Array.isArray(opts.to) ? opts.to : [opts.to],
    ...(bcc ? { bcc } : {}),
    subject: opts.subject,
    react: opts.react,
    ...(opts.attachments ? { attachments: opts.attachments } : {}),
  })
  if (error) {
    console.error("[email] send failed", error)
    throw new Error(error.message)
  }
  return data
}

/**
 * Run customer + owner sends independently: while the Resend domain is
 * unverified, the customer leg 403s — that must never stop the owner
 * notification (or vice versa). Failures are logged, not thrown.
 */
async function sendAll(jobs: Promise<unknown>[]) {
  const results = await Promise.allSettled(jobs)
  for (const r of results) {
    if (r.status === "rejected") {
      console.error("[email] one send in the batch failed:", r.reason)
    }
  }
}

export async function sendBookingConfirmationEmails(booking: Booking) {
  const manageUrl = bookingManageUrl(booking.token)
  const common = {
    reference: booking.reference,
    customerName: `${booking.contact.firstName} ${booking.contact.lastName}`,
    serviceName: serviceName(booking.primaryServiceId),
    date: booking.date,
    arrivalWindow: windowLabel(booking.arrivalWindowId),
    address: [
      booking.address.line1,
      booking.address.line2,
      booking.address.town,
      booking.address.county,
      booking.address.postcode,
    ]
      .filter(Boolean)
      .join(", "),
    estimatedTotal: formatPrice(booking.estimatedTotalPence),
    deposit: formatPrice(booking.depositPence),
    depositPaid: booking.depositPaidPence > 0,
    manageUrl,
    lineItems: booking.lineItems.map((i) => ({
      name: i.name,
      total: formatPrice(i.totalPence),
    })),
  }

  const ics = [bookingIcsAttachment(booking)]

  await sendAll([
    send({
      to: booking.contact.email,
      subject: `Booking received — ${booking.reference} | ${BUSINESS.name}`,
      react: CustomerConfirmationEmail(common),
      attachments: ics,
    }),
    send({
      to: process.env.OWNER_EMAIL ?? BUSINESS.email,
      subject: `New booking ${booking.reference} — ${common.customerName}`,
      react: OwnerNotificationEmail({
        ...common,
        manageUrl: adminBookingUrl(booking.id),
        phone: booking.contact.phone,
        email: booking.contact.email,
        message: booking.message,
        bedrooms: booking.home.bedrooms,
        bathrooms: booking.home.bathrooms,
      }),
      attachments: ics,
    }),
  ])
}

export async function sendBookingUpdatedEmails(booking: Booking) {
  const manageUrl = bookingManageUrl(booking.token)
  // Same UID as the original event, so the customer's calendar overwrites
  // the existing entry when the date or arrival window changes.
  const ics = [bookingIcsAttachment(booking)]
  await sendAll([
    send({
      to: booking.contact.email,
      subject: `Booking updated — ${booking.reference}`,
      react: BookingUpdatedEmail({
        reference: booking.reference,
        customerName: booking.contact.firstName,
        date: booking.date,
        arrivalWindow: windowLabel(booking.arrivalWindowId),
        manageUrl,
      }),
      attachments: ics,
    }),
    send({
      to: process.env.OWNER_EMAIL ?? BUSINESS.email,
      subject: `Customer updated booking ${booking.reference}`,
      react: BookingUpdatedEmail({
        reference: booking.reference,
        customerName: `${booking.contact.firstName} ${booking.contact.lastName}`,
        date: booking.date,
        arrivalWindow: windowLabel(booking.arrivalWindowId),
        manageUrl: adminBookingUrl(booking.id),
        forOwner: true,
      }),
      attachments: ics,
    }),
  ])
}

/** Customer portal → Kasey: notify her a customer left a message. */
export async function sendCustomerMessageEmail(
  booking: Booking,
  message: string
) {
  await send({
    to: process.env.OWNER_EMAIL ?? BUSINESS.email,
    subject: `Message from ${booking.contact.firstName} ${booking.contact.lastName} — ${booking.reference}`,
    react: CustomerMessageEmail({
      reference: booking.reference,
      customerName: `${booking.contact.firstName} ${booking.contact.lastName}`,
      message,
      adminUrl: adminBookingUrl(booking.id),
    }),
  })
}

/** Admin dashboard → customer: a direct message (consultation arranging etc.) */
export async function sendBusinessMessageEmail(
  booking: Booking,
  message: string
) {
  await send({
    to: booking.contact.email,
    subject: `A message about your booking — ${booking.reference}`,
    react: BusinessMessageEmail({
      reference: booking.reference,
      customerName: `${booking.contact.firstName} ${booking.contact.lastName}`,
      message,
      manageUrl: bookingManageUrl(booking.token),
    }),
  })
}

export async function sendBookingCancelledEmails(booking: Booking) {
  const manageUrl = bookingManageUrl(booking.token)
  await sendAll([
    send({
      to: booking.contact.email,
      subject: `Booking cancelled — ${booking.reference}`,
      react: BookingCancelledEmail({
        reference: booking.reference,
        customerName: booking.contact.firstName,
        reason: booking.cancelReason,
        manageUrl,
      }),
    }),
    send({
      to: process.env.OWNER_EMAIL ?? BUSINESS.email,
      subject: `CANCELLED ${booking.reference}`,
      react: BookingCancelledEmail({
        reference: booking.reference,
        customerName: `${booking.contact.firstName} ${booking.contact.lastName}`,
        reason: booking.cancelReason,
        manageUrl: adminBookingUrl(booking.id),
        forOwner: true,
      }),
    }),
  ])
}
