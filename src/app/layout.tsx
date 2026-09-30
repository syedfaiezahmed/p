import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import AppLayoutWrapper from "./components/ui/AppLayoutWrapper";
import { OrganizationSchema, WebSiteSchema } from "./components/seo/JsonLd";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://prosperaksa.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2a1a4a",
};

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "Prospera KSA | Financial & Strategic Business Consulting in Saudi Arabia",
    template: "%s | Prospera KSA",
  },
  description:
    "Premier Saudi corporate advisory specializing in ZATCA Phase 2 e-invoicing, SOCPA bookkeeping, fractional CFO consulting, VAT tax strategy, and WPS payroll compliance across Saudi Arabia.",
  keywords: [
    "Saudi Arabia Financial Consulting",
    "Bookkeeping Services Saudi Arabia",
    "ZATCA Phase 2 E-Invoicing KSA",
    "SOCPA Certified Accounting",
    "Fractional CFO Saudi Arabia",
    "WPS Payroll Compliance KSA",
    "GOSI & Mudad Compliance",
    "Corporate Financial Restructuring",
    "Power BI Financial Dashboards",
    "ERP Implementation Saudi Arabia",
    "VAT Advisory & GAZT Tax Strategy",
    "Business Valuation Saudi Arabia",
    "Prospera Consulting KSA",
  ],
  authors: [{ name: "Prospera Consulting KSA", url: APP_URL }],
  creator: "Prospera Consulting",
  publisher: "Prospera Consulting KSA",
  category: "Financial Services",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": `${APP_URL}/`,
      "ar-SA": `${APP_URL}/`,
    },
  },
  openGraph: {
    title: "Prospera KSA | Financial & Strategic Business Consulting in Saudi Arabia",
    description:
      "Expert corporate financial advisory, bookkeeping, ZATCA e-invoicing Phase 2, and strategic CFO services empowering enterprises across Saudi Arabia.",
    url: APP_URL,
    siteName: "Prospera Consulting KSA",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${APP_URL}/images/hero%20image.jpg`,
        width: 1200,
        height: 630,
        alt: "Prospera Consulting KSA - Financial and Strategic Advisory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prospera KSA | Financial & Strategic Advisory in Saudi Arabia",
    description:
      "Certified ZATCA compliance, SOCPA bookkeeping, and fractional CFO advisory in Saudi Arabia.",
    images: [`${APP_URL}/images/hero%20image.jpg`],
    creator: "@prosperaksa",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "SA",
    "geo.placename": "Kingdom of Saudi Arabia",
    "geo.position": "24.7136;46.6753",
    ICBM: "24.7136, 46.6753",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <OrganizationSchema url={APP_URL} />
        <WebSiteSchema url={APP_URL} />
      </head>
      <body className={inter.className}>
        <AppLayoutWrapper>{children}</AppLayoutWrapper>
      </body>
    </html>
  );
}