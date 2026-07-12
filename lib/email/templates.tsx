import * as React from "react"
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import { BUSINESS } from "@/lib/data/services"

const purple = "#5b2d8e"
const muted = "#5c5666"
const soft = "#f6f2fb"

type Line = { name: string; total: string }

type ConfirmProps = {
  reference: string
  customerName: string
  serviceName: string
  date: string
  arrivalWindow: string
  address: string
  estimatedTotal: string
  deposit: string
  depositPaid: boolean
  manageUrl: string
  lineItems: Line[]
}

function Shell({
  preview,
  children,
}: {
  preview: string
  children: React.ReactNode
}) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={{ backgroundColor: soft, fontFamily: "Georgia, serif", margin: 0 }}>
        <Container
          style={{
            maxWidth: 560,
            margin: "32px auto",
            backgroundColor: "#ffffff",
            borderRadius: 16,
            padding: "32px 28px",
            border: "1px solid #e8dff3",
          }}
        >
          <Text
            style={{
              color: purple,
              fontStyle: "italic",
              fontSize: 20,
              margin: "0 0 4px",
            }}
          >
            {BUSINESS.name}
          </Text>
          <Text style={{ color: muted, fontSize: 13, margin: "0 0 24px" }}>
            {BUSINESS.tagline}
          </Text>
          {children}
          <Hr style={{ borderColor: "#eee", margin: "28px 0 16px" }} />
          <Text style={{ color: muted, fontSize: 12, lineHeight: "18px" }}>
            Questions? Reply to this email or write to {BUSINESS.email}.
            A short phone consultation follows every booking.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export function CustomerConfirmationEmail(props: ConfirmProps) {
  return (
    <Shell preview={`We've received your booking ${props.reference}`}>
      <Heading as="h1" style={{ color: purple, fontSize: 24, margin: "0 0 12px" }}>
        You&apos;re booked in, {props.customerName.split(" ")[0]}!
      </Heading>
      <Text style={{ color: muted, fontSize: 15, lineHeight: "24px" }}>
        Thanks for choosing {BUSINESS.name}. Here&apos;s a summary of your
        request. We&apos;ll call within 24 hours for a quick consultation.
      </Text>
      <Section
        style={{
          backgroundColor: soft,
          borderRadius: 12,
          padding: 16,
          margin: "20px 0",
        }}
      >
        <Text style={{ margin: "0 0 6px", color: purple, fontWeight: 700 }}>
          {props.reference}
        </Text>
        <Text style={{ margin: "0 0 4px", color: muted, fontSize: 14 }}>
          {props.serviceName} · {props.date} · {props.arrivalWindow}
        </Text>
        <Text style={{ margin: 0, color: muted, fontSize: 14 }}>
          {props.address}
        </Text>
      </Section>
      {props.lineItems.map((item) => (
        <Text
          key={item.name}
          style={{
            margin: "0 0 4px",
            color: muted,
            fontSize: 14,
            display: "flex",
          }}
        >
          {item.name} — {item.total}
        </Text>
      ))}
      <Text style={{ color: muted, fontSize: 14, marginTop: 12 }}>
        Estimated total: <strong>{props.estimatedTotal}</strong>
        {props.depositPaid
          ? ` · Deposit paid: ${props.deposit}`
          : props.deposit !== "£0"
            ? ` · Deposit requested: ${props.deposit}`
            : " · Pay on the day (cash or bank transfer)"}
      </Text>
      <Text style={{ marginTop: 24 }}>
        <Link
          href={props.manageUrl}
          style={{
            backgroundColor: purple,
            color: "#fff",
            padding: "12px 20px",
            borderRadius: 999,
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Manage your booking
        </Link>
      </Text>
      <Text style={{ color: muted, fontSize: 13, marginTop: 20, lineHeight: "20px" }}>
        Keep this link safe — it lets you change the date, leave a message, or
        cancel (24 hours&apos; notice required).
      </Text>
    </Shell>
  )
}

export function OwnerNotificationEmail(
  props: ConfirmProps & {
    phone: string
    email: string
    message?: string
    bedrooms: number
    bathrooms: number
  }
) {
  return (
    <Shell preview={`New booking ${props.reference}`}>
      <Heading as="h1" style={{ color: purple, fontSize: 22 }}>
        New booking
      </Heading>
      <Text style={{ color: muted, fontSize: 15 }}>
        <strong>{props.customerName}</strong> booked a clean.
      </Text>
      <Text style={{ color: muted, fontSize: 14, lineHeight: "22px" }}>
        Ref: {props.reference}
        <br />
        Service: {props.serviceName}
        <br />
        When: {props.date} · {props.arrivalWindow}
        <br />
        Home: {props.bedrooms} bed · {props.bathrooms} bath
        <br />
        Address: {props.address}
        <br />
        Phone:{" "}
        <Link
          href={`tel:${props.phone.replace(/[^\d+]/g, "")}`}
          style={{ color: purple, fontWeight: 600 }}
        >
          {props.phone}
        </Link>
        <br />
        Email:{" "}
        <Link
          href={`mailto:${props.email}`}
          style={{ color: purple, fontWeight: 600 }}
        >
          {props.email}
        </Link>
        <br />
        Estimate: {props.estimatedTotal}
        {props.depositPaid ? ` · Deposit paid ${props.deposit}` : ""}
      </Text>
      {props.message ? (
        <Text style={{ color: muted, fontSize: 14 }}>
          Message: “{props.message}”
        </Text>
      ) : null}
      <Text style={{ marginTop: 16 }}>
        <Link href={props.manageUrl} style={{ color: purple }}>
          Open booking page
        </Link>
      </Text>
    </Shell>
  )
}

export function BookingUpdatedEmail(props: {
  reference: string
  customerName: string
  date: string
  arrivalWindow: string
  manageUrl: string
  forOwner?: boolean
}) {
  return (
    <Shell preview={`Booking ${props.reference} updated`}>
      <Heading as="h1" style={{ color: purple, fontSize: 22 }}>
        {props.forOwner ? "Customer updated a booking" : "Your booking was updated"}
      </Heading>
      <Text style={{ color: muted, fontSize: 15 }}>
        {props.customerName} · {props.reference}
        <br />
        New schedule: {props.date} · {props.arrivalWindow}
      </Text>
      <Link href={props.manageUrl} style={{ color: purple }}>
        View details
      </Link>
    </Shell>
  )
}

export function BookingCancelledEmail(props: {
  reference: string
  customerName: string
  reason?: string
  manageUrl: string
  forOwner?: boolean
}) {
  return (
    <Shell preview={`Booking ${props.reference} cancelled`}>
      <Heading as="h1" style={{ color: purple, fontSize: 22 }}>
        Booking cancelled
      </Heading>
      <Text style={{ color: muted, fontSize: 15 }}>
        {props.customerName} · {props.reference}
        {props.reason ? (
          <>
            <br />
            Reason: {props.reason}
          </>
        ) : null}
      </Text>
      {!props.forOwner ? (
        <Text style={{ color: muted, fontSize: 14 }}>
          Sorry we won&apos;t see you this time. You can book again any time from
          our website.
        </Text>
      ) : (
        <Link href={props.manageUrl} style={{ color: purple }}>
          View cancelled booking
        </Link>
      )}
    </Shell>
  )
}

export function BusinessMessageEmail(props: {
  reference: string
  customerName: string
  message: string
  manageUrl: string
}) {
  return (
    <Shell preview={`A message about your booking ${props.reference}`}>
      <Heading as="h1" style={{ color: purple, fontSize: 22 }}>
        A message from {BUSINESS.ownerName}
      </Heading>
      <Text style={{ color: muted, fontSize: 15 }}>
        Hi {props.customerName.split(" ")[0]}, about your booking{" "}
        <strong>{props.reference}</strong>:
      </Text>
      <Section
        style={{
          backgroundColor: soft,
          borderRadius: 12,
          padding: 16,
          margin: "16px 0",
        }}
      >
        <Text
          style={{
            margin: 0,
            color: "#3a3342",
            fontSize: 15,
            lineHeight: "24px",
            whiteSpace: "pre-wrap",
          }}
        >
          {props.message}
        </Text>
      </Section>
      <Text style={{ color: muted, fontSize: 14 }}>
        You can reply to this email, or leave a message on your booking page.
      </Text>
      <Text style={{ marginTop: 16 }}>
        <Link
          href={props.manageUrl}
          style={{
            backgroundColor: purple,
            color: "#fff",
            padding: "12px 20px",
            borderRadius: 999,
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          View your booking
        </Link>
      </Text>
    </Shell>
  )
}

export function CustomerMessageEmail(props: {
  reference: string
  customerName: string
  message: string
  adminUrl: string
}) {
  return (
    <Shell preview={`${props.customerName} sent a message about ${props.reference}`}>
      <Heading as="h1" style={{ color: purple, fontSize: 22 }}>
        New message from {props.customerName}
      </Heading>
      <Text style={{ color: muted, fontSize: 15 }}>
        About booking <strong>{props.reference}</strong>:
      </Text>
      <Section
        style={{
          backgroundColor: soft,
          borderRadius: 12,
          padding: 16,
          margin: "16px 0",
        }}
      >
        <Text
          style={{
            margin: 0,
            color: "#3a3342",
            fontSize: 15,
            lineHeight: "24px",
            whiteSpace: "pre-wrap",
          }}
        >
          {props.message}
        </Text>
      </Section>
      <Text style={{ marginTop: 16 }}>
        <Link
          href={props.adminUrl}
          style={{
            backgroundColor: purple,
            color: "#fff",
            padding: "12px 20px",
            borderRadius: 999,
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Reply in the dashboard
        </Link>
      </Text>
    </Shell>
  )
}
