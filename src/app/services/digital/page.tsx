import { Metadata } from "next";
import { DigitalServicesClient } from "./DigitalServicesClient";
import { BreadcrumbSchema } from "@/app/components/seo/JsonLd";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://prosperaksa.com";

export const metadata: Metadata = {
  title: "Digital Finance Transformation & ERP Solutions in Saudi Arabia",
  description:
    "Enterprise ERP implementations, ZATCA Phase 2 electronic invoicing integrations, Power BI financial analytics, and process automation in Saudi Arabia.",
  keywords: [
    "Digital Finance Transformation Saudi Arabia",
    "ERP Implementation KSA",
    "ZATCA Phase 2 API Integration",
    "Power BI Financial Reporting KSA",
    "Accounting Automation Saudi Arabia",
    "Odoo SAP QuickBooks KSA",
  ],
  alternates: {
    canonical: "/services/digital",
  },
  openGraph: {
    title: "Digital Finance Transformation & ERP | Prospera KSA",
    description:
      "Modernize your finance operations with cloud accounting, ZATCA integration, and Power BI dashboards in Saudi Arabia.",
    url: `${APP_URL}/services/digital`,
    siteName: "Prospera Consulting KSA",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${APP_URL}/images/ERP%20Implementation.jpg`,
        width: 1200,
        height: 630,
        alt: "Prospera Digital Finance & ERP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Transformation & ERP | Prospera KSA",
    description:
      "Enterprise ERP implementation and automated financial intelligence in Saudi Arabia.",
    images: [`${APP_URL}/images/ERP%20Implementation.jpg`],
    creator: "@prosperaksa",
  },
};

export default function DigitalServicesPage() {
  const breadcrumbs = [
    { name: "Home", url: `${APP_URL}/` },
    { name: "Services", url: `${APP_URL}/services` },
    { name: "Digital Transformation", url: `${APP_URL}/services/digital` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <DigitalServicesClient />
    </>
  );
}
