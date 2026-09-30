import { Metadata } from "next";
import { ServicesClient } from "./ServicesClient";
import { BreadcrumbSchema } from "../components/seo/JsonLd";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://prosperaksa.com";

export const metadata: Metadata = {
  title: "Financial & Strategic Consulting Practice Areas in Saudi Arabia",
  description:
    "Explore Prospera's comprehensive suite of corporate finance, SOCPA-compliant bookkeeping, ZATCA Phase 2 e-invoicing, fractional CFO, and digital ERP transformation services in Saudi Arabia.",
  keywords: [
    "Saudi Arabia Financial Services Catalog",
    "Bookkeeping Services KSA",
    "Corporate Financial Advisory",
    "ZATCA E-Invoicing Phase 2",
    "Fractional CFO Advisory Saudi Arabia",
    "Power BI Financial Dashboards KSA",
    "Payroll & WPS Compliance",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Financial & Strategic Consulting Practice Areas | Prospera KSA",
    description:
      "Explore comprehensive corporate accounting, tax strategy, and CFO retainers tailored for Saudi enterprises and GCC organizations.",
    url: `${APP_URL}/services`,
    siteName: "Prospera Consulting KSA",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${APP_URL}/images/Bookkeeping%20Services.jpg`,
        width: 1200,
        height: 630,
        alt: "Prospera Consulting Practice Areas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Financial & Strategic Practice Areas | Prospera KSA",
    description:
      "Full spectrum of corporate finance, tax advisory, bookkeeping, and digital ERP services in Saudi Arabia.",
    images: [`${APP_URL}/images/Bookkeeping%20Services.jpg`],
    creator: "@prosperaksa",
  },
};

export default function ServicesPage() {
  const breadcrumbs = [
    { name: "Home", url: `${APP_URL}/` },
    { name: "Services", url: `${APP_URL}/services` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ServicesClient />
    </>
  );
}
