import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import { GoogleTagManager } from "@next/third-parties/google"
import { ViewTransitions } from "next-view-transitions"
import "./globals.css"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { BookingProvider } from "@/lib/booking/context"
import { BUSINESS } from "@/lib/data/services"
import { getSiteUrl } from "@/lib/site"

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: {
    default: `${BUSINESS.name} | House Cleaning in ${BUSINESS.primaryLocation}`,
    template: `%s | ${BUSINESS.name}`,
  },
  description:
    `Professional house cleaning in ${BUSINESS.primaryLocation} and surrounding ${BUSINESS.region}. ` +
    "Standard cleans, deep cleans, and move-in/out cleans with honest GBP pricing. Book online in minutes.",
  metadataBase: new URL(getSiteUrl()),
  applicationName: BUSINESS.name,
  keywords: [
    "house cleaning",
    "domestic cleaning",
    "cleaner",
    "deep clean",
    "end of tenancy cleaning",
    `cleaner ${BUSINESS.primaryLocation}`,
    `house cleaning ${BUSINESS.primaryLocation}`,
    `cleaning services ${BUSINESS.region}`,
  ],
  authors: [{ name: BUSINESS.ownerName }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: BUSINESS.name,
    title: `${BUSINESS.name} | House Cleaning in ${BUSINESS.primaryLocation}`,
    description: `Trusted domestic house cleaning in ${BUSINESS.primaryLocation} and nearby ${BUSINESS.region}. Book online in minutes.`,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS.name} | House Cleaning in ${BUSINESS.primaryLocation}`,
    description: `Trusted domestic house cleaning in ${BUSINESS.primaryLocation} and nearby ${BUSINESS.region}. Book online in minutes.`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in the environment to have the
  // Search Console verification <meta> tag rendered automatically on deploy.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
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
