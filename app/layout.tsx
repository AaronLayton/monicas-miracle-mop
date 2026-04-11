import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Monica's Miracle Mop | Professional Cleaning Services",
  description:
    "Professional house cleaning services. Standard cleans, deep cleans, and move-in/out cleans across the local area.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
