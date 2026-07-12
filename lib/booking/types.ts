import { z } from "zod"

export const bookingStatusSchema = z.enum([
  "pending_payment",
  "confirmed",
  "deposit_paid",
  "completed",
  "cancelled",
  "pending_review",
])

export type BookingStatus = z.infer<typeof bookingStatusSchema>

export const selectedAddonSchema = z.object({
  serviceId: z.string(),
  quantity: z.number().int().min(1).default(1),
  /** Optional hours for hourly add-ons */
  hours: z.number().min(0).optional(),
})

export const homeDetailsSchema = z.object({
  bedrooms: z.number().int().min(0).max(20).default(2),
  bathrooms: z.number().int().min(0).max(20).default(1),
  kitchens: z.number().int().min(0).max(10).default(1),
  notes: z.string().max(2000).optional(),
})

export const addressSchema = z.object({
  line1: z.string().min(1, "Address is required").max(120),
  line2: z.string().max(120).optional(),
  town: z.string().min(1, "Town/city is required").max(80),
  county: z.string().max(80).optional(),
  postcode: z
    .string()
    .min(5, "Enter a valid UK postcode")
    .max(10)
    .regex(/^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i, "Enter a valid UK postcode"),
})

export const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(60),
  lastName: z.string().min(1, "Last name is required").max(60),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .min(10, "Enter a valid UK phone number")
    .max(20)
    .regex(/^[\d\s+()-]{10,20}$/, "Enter a valid UK phone number"),
})

export const createBookingSchema = z.object({
  primaryServiceId: z.string().min(1),
  addons: z.array(selectedAddonSchema).default([]),
  home: homeDetailsSchema,
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date"),
  arrivalWindowId: z.string().min(1),
  contact: contactSchema,
  address: addressSchema,
  message: z.string().max(2000).optional(),
  /** Client wants to pay deposit online */
  payDeposit: z.boolean().default(true),
  estimatedHours: z.number().min(1).max(16).optional(),
})

export type CreateBookingInput = z.infer<typeof createBookingSchema>

export const updateBookingSchema = z.object({
  primaryServiceId: z.string().optional(),
  addons: z.array(selectedAddonSchema).optional(),
  home: homeDetailsSchema.partial().optional(),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  arrivalWindowId: z.string().optional(),
  message: z.string().max(2000).optional(),
  customerNote: z.string().max(2000).optional(),
})

export type UpdateBookingInput = z.infer<typeof updateBookingSchema>

export interface BookingMessage {
  id: string
  from: "customer" | "business"
  body: string
  createdAt: string
}

export interface BookingLineItem {
  serviceId: string
  name: string
  quantity: number
  unitPence: number
  totalPence: number
  hours?: number
}

export interface Booking {
  id: string
  /** Public magic token — used in /booking/[token] URLs */
  token: string
  reference: string
  status: BookingStatus
  primaryServiceId: string
  addons: z.infer<typeof selectedAddonSchema>[]
  home: z.infer<typeof homeDetailsSchema>
  date: string
  arrivalWindowId: string
  contact: z.infer<typeof contactSchema>
  address: z.infer<typeof addressSchema>
  message?: string
  lineItems: BookingLineItem[]
  estimatedTotalPence: number
  depositPence: number
  depositPaidPence: number
  stripeSessionId?: string
  stripePaymentIntentId?: string
  /** Google Calendar event id (Kasey's calendar) — set once synced */
  googleEventId?: string
  messages: BookingMessage[]
  createdAt: string
  updatedAt: string
  cancelledAt?: string
  cancelReason?: string
}
