import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppLayoutWrapper from "./components/ui/AppLayoutWrapper";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://prosperaksa.com"),
  title: {
    default: "Prospera KSA - Financial & Strategic Business Consulting",
    template: "%s | Prospera KSA",
  },
  description:
    "Expert corporate financial advisory, bookkeeping, ZATCA e-invoicing Phase 2, and strategic CFO services empowering companies across Saudi Arabia.",
  keywords: [
    "Saudi Arabia Financial Consulting",
    "Riyadh Bookkeeping Services",
    "ZATCA Phase 2 E-Invoicing",
    "SOCPA Accounting KSA",
    "Fractional CFO Riyadh",
    "Payroll WPS Compliance",
  ],
  openGraph: {
    title: "Prospera KSA - Financial & Strategic Business Consulting",
    description:
      "Expert corporate financial advisory, bookkeeping, ZATCA e-invoicing Phase 2, and strategic CFO services empowering companies across Saudi Arabia.",
    url: "https://prosperaksa.com",
    siteName: "Prospera Consulting KSA",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prospera KSA - Financial & Business Consulting",
    description:
      "Expert financial advisory, bookkeeping, and ZATCA compliance in Saudi Arabia.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppLayoutWrapper>{children}</AppLayoutWrapper>
      </body>
    </html>
  );
}

