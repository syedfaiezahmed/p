import { Metadata } from "next";
import { AboutClient } from "./AboutClient";
import { BreadcrumbSchema } from "../components/seo/JsonLd";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://prosperaksa.com";

export const metadata: Metadata = {
  title: "About Us | Premier Corporate Financial Advisory in Saudi Arabia",
  description:
    "Founded in 2017, Prospera Consulting is led by seasoned finance partners with decades of GCC experience in corporate restructuring, ZATCA e-invoicing, and fractional CFO leadership.",
  keywords: [
    "About Prospera KSA",
    "Saudi Arabia Financial Advisors",
    "Siraj Ahmed Ansari Managing Partner",
    "Saeed A. Siddiqui Managing Partner",
    "Corporate Accounting Leadership KSA",
    "Financial Consulting Firm Saudi Arabia",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Prospera KSA | Premier Financial & Strategic Advisory",
    description:
      "Meet the distinguished professionals driving Prospera's success across Saudi Arabia with decades of CFO and corporate finance expertise.",
    url: `${APP_URL}/about`,
    siteName: "Prospera Consulting KSA",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${APP_URL}/images/About1.jpg`,
        width: 1200,
        height: 630,
        alt: "About Prospera Consulting KSA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Prospera KSA | Financial Advisory Leadership",
    description:
      "Decades of regional expertise in corporate finance, taxation, and CFO advisory across Saudi Arabia.",
    images: [`${APP_URL}/images/About1.jpg`],
    creator: "@prosperaksa",
  },
};

export default function AboutPage() {
  const breadcrumbs = [
    { name: "Home", url: `${APP_URL}/` },
    { name: "About Us", url: `${APP_URL}/about` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <AboutClient />
    </>
  );
}
