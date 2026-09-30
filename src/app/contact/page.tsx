import { Metadata } from "next";
import { ContactClient } from "./ContactClient";
import { BreadcrumbSchema } from "../components/seo/JsonLd";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://prosperaksa.com";

export const metadata: Metadata = {
  title: "Contact Prospera | Book Executive Financial Consultation in Saudi Arabia",
  description:
    "Schedule a confidential 30-minute consultation with Prospera's managing partners. Inquire about ZATCA e-invoicing, bookkeeping, payroll, and fractional CFO advisory across Saudi Arabia.",
  keywords: [
    "Contact Prospera",
    "Prospera Contact",
    "Prospera KSA",
    "Financial Advisory Consultation Saudi Arabia",
    "Bookkeeping Consultation KSA",
    "Fractional CFO Meeting",
    "ZATCA Compliance Inquiry",
    "Prospera Phone WhatsApp",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Prospera | Financial Advisory Consultation",
    description:
      "Connect directly with senior financial partners for corporate accounting, tax strategy, and CFO retainers in Saudi Arabia.",
    url: `${APP_URL}/contact`,
    siteName: "Prospera Consulting KSA",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${APP_URL}/images/hero%20image.jpg`,
        width: 1200,
        height: 630,
        alt: "Contact Prospera Consulting KSA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Prospera KSA | Schedule Corporate Consultation",
    description:
      "Direct consultation with certified Saudi chartered accountants and senior CFO advisors.",
    images: [`${APP_URL}/images/hero%20image.jpg`],
    creator: "@prosperaksa",
  },
};

export default function ContactPage() {
  const breadcrumbs = [
    { name: "Home", url: `${APP_URL}/` },
    { name: "Contact Us", url: `${APP_URL}/contact` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ContactClient />
    </>
  );
}
