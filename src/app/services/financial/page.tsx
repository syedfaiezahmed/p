import { Metadata } from "next";
import { FinancialServicesClient } from "./FinancialServicesClient";
import { BreadcrumbSchema } from "@/app/components/seo/JsonLd";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://prosperaksa.com";

export const metadata: Metadata = {
  title: "Corporate Financial Advisory & Accounting Services in Saudi Arabia",
  description:
    "SOCPA & ZATCA-compliant corporate bookkeeping, fractional CFO consulting, VAT tax filing, and financial modeling designed for enterprises across Saudi Arabia.",
  keywords: [
    "Corporate Financial Advisory Saudi Arabia",
    "SOCPA Accounting KSA",
    "ZATCA Compliant Bookkeeping",
    "Fractional CFO Riyadh Jeddah",
    "Corporate Tax Advisory KSA",
    "WPS Payroll Services Saudi Arabia",
  ],
  alternates: {
    canonical: "/services/financial",
  },
  openGraph: {
    title: "Corporate Financial & Advisory Services | Prospera KSA",
    description:
      "Certified chartered accountants delivering fractional CFO modeling, corporate tax compliance, and general ledger management in Saudi Arabia.",
    url: `${APP_URL}/services/financial`,
    siteName: "Prospera Consulting KSA",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${APP_URL}/images/Financial%20Planning2.jpg`,
        width: 1200,
        height: 630,
        alt: "Prospera Financial Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Financial & Advisory Services | Prospera KSA",
    description:
      "SOCPA & ZATCA-compliant corporate bookkeeping and CFO leadership in Saudi Arabia.",
    images: [`${APP_URL}/images/Financial%20Planning2.jpg`],
    creator: "@prosperaksa",
  },
};

export default function FinancialServicesPage() {
  const breadcrumbs = [
    { name: "Home", url: `${APP_URL}/` },
    { name: "Services", url: `${APP_URL}/services` },
    { name: "Financial Services", url: `${APP_URL}/services/financial` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FinancialServicesClient />
    </>
  );
}
