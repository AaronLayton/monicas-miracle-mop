import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import { GoogleTagManager } from "@next/third-parties/google"
import { ViewTransitions } from "next-view-transitions"
import "./globals.css"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { BookingProvider } from "@/lib/booking/context"
import { BUSINESS } from "@/lib/data/services"

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: {
    default: `${BUSINESS.name} | Professional House Cleaning`,
    template: `%s | ${BUSINESS.name}`,
  },
  description:
    "Professional house cleaning services with honest GBP pricing. Standard cleans, deep cleans, and move-in/out cleans. Book online in minutes.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ViewTransitions>
      <html
        lang="en-GB"
        data-scroll-behavior="smooth"
        className={`${plusJakarta.variable} h-full antialiased`}
      >
        <GoogleTagManager gtmId="GTM-W4LZJWFQ" />
        <body className="min-h-full flex flex-col font-sans">
          <BookingProvider>
            <Nav />
            {/* No top padding — full-bleed heroes run under the transparent nav */}
            <main className="flex-1">{children}</main>
            <Footer />
          </BookingProvider>
        </body>
      </html>
    </ViewTransitions>
  )
}
