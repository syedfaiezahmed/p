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
    default: "Prospera | Corporate Financial Advisory, Bookkeeping & CFO Services in Saudi Arabia",
    template: "%s | Prospera",
  },
  description:
    "Prospera is the leading corporate financial advisory in Saudi Arabia. Specializing in ZATCA Phase 2 e-invoicing, SOCPA bookkeeping, fractional CFO leadership, VAT strategy, and WPS payroll compliance.",
  keywords: [
    "Prospera",
    "Prospera KSA",
    "Prospera Consulting",
    "Prospera Financial Consulting",
    "Prospera Saudi Arabia",
    "Prospera Accounting",
    "بروسبيرا",
    "شركة بروسبيرا",
    "بروسبيرا للاستشارات",
    "Saudi Arabia Financial Consulting",
    "Bookkeeping Services Saudi Arabia",
    "ZATCA Phase 2 E-Invoicing KSA",
    "SOCPA Certified Accounting",
    "Fractional CFO Saudi Arabia",
    "WPS Payroll Compliance KSA",
    "Corporate Financial Restructuring",
    "Power BI Financial Dashboards",
    "ERP Implementation Saudi Arabia",
  ],
  authors: [{ name: "Prospera", url: APP_URL }],
  creator: "Prospera",
  publisher: "Prospera",
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
    title: "Prospera | Corporate Financial Advisory & Bookkeeping in Saudi Arabia",
    description:
      "Prospera delivers premier financial advisory, SOCPA bookkeeping, ZATCA e-invoicing Phase 2, and fractional CFO services across Saudi Arabia.",
    url: APP_URL,
    siteName: "Prospera",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${APP_URL}/images/hero%20image.jpg`,
        width: 1200,
        height: 630,
        alt: "Prospera Corporate Financial Advisory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prospera | Financial & Strategic Advisory in Saudi Arabia",
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