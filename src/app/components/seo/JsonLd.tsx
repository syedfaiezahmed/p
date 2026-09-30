import React from "react";

interface OrganizationSchemaProps {
  url?: string;
}

export function OrganizationSchema({ url = "https://prosperaksa.com" }: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["AccountingService", "FinancialService", "Corporation"],
    "@id": `${url}#organization`,
    name: "Prospera",
    legalName: "Prospera Consulting KSA",
    alternateName: [
      "Prospera KSA",
      "Prospera Consulting",
      "Prospera Financial Consulting",
      "Prospera Saudi Arabia",
      "Prospera Advisory",
      "بروسبيرا",
      "بروسبيرا السعودية",
      "شركة بروسبيرا للاستشارات",
    ],
    url: url,
    logo: {
      "@type": "ImageObject",
      url: `${url}/images/hero%20image.jpg`,
      caption: "Prospera Consulting KSA Logo",
    },
    image: `${url}/images/hero%20image.jpg`,
    description:
      "Prospera is a premier corporate financial advisory firm in Saudi Arabia specializing in ZATCA e-invoicing Phase 2, SOCPA-compliant bookkeeping, fractional CFO consulting, VAT tax strategy, and ERP digital transformation.",
    telephone: "+966557147386",
    email: "inquire@prosperaksa.com",
    priceRange: "$$",
    currenciesAccepted: "SAR, USD",
    paymentAccepted: "Bank Transfer, Credit Card, Corporate Retainer",
    address: {
      "@type": "PostalAddress",
      addressCountry: "SA",
      addressRegion: "Kingdom of Saudi Arabia",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "24.7136",
      longitude: "46.6753",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    brand: {
      "@type": "Brand",
      name: "Prospera",
      alternateName: ["Prospera KSA", "Prospera Consulting", "بروسبيرا"],
      logo: `${url}/images/hero%20image.jpg`,
    },
    founder: [
      {
        "@type": "Person",
        name: "Siraj Ahmed Ansari",
        jobTitle: "Managing Partner",
        sameAs: "https://www.linkedin.com/in/siraj-ahmed-ansari-68056b17",
      },
      {
        "@type": "Person",
        name: "Saeed A. Siddiqui",
        jobTitle: "Managing Partner",
        sameAs: "https://www.linkedin.com/in/saeed-a-siddiqui-bba09827",
      },
      {
        "@type": "Person",
        name: "Salman Ahmed",
        jobTitle: "Director",
        sameAs: "https://www.linkedin.com/in/salman-ahmed-511237233",
      },
      {
        "@type": "Person",
        name: "Mohammed Ali",
        jobTitle: "Director",
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/prospera-ksa",
      "https://twitter.com/prosperaksa",
    ],
    areaServed: {
      "@type": "Country",
      name: "Saudi Arabia",
    },
    knowsAbout: [
      "ZATCA Phase 2 E-Invoicing Integration",
      "SOCPA Bookkeeping & General Ledger",
      "Fractional CFO & Capital Structuring",
      "WPS Payroll & Saudi Labor Law Compliance",
      "VAT Strategy & GAZT Filing",
      "Power BI Financial Dashboards",
      "Odoo, SAP & Oracle ERP Implementation",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema({ url = "https://prosperaksa.com" }: { url?: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}#website`,
    url: url,
    name: "Prospera",
    alternateName: [
      "Prospera KSA",
      "Prospera Consulting",
      "Prospera Financial Consulting",
      "بروسبيرا",
    ],
    description:
      "Official website of Prospera - Premier corporate financial advisory, bookkeeping, and ZATCA compliance in Saudi Arabia.",
    publisher: {
      "@id": `${url}#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/services?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: ["en-US", "ar-SA"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema({
  title,
  description,
  url,
  image,
  category,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  category?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: category || "Financial Advisory",
    name: title,
    description: description,
    provider: {
      "@type": "AccountingService",
      name: "Prospera KSA",
      url: "https://prosperaksa.com",
      telephone: "+966557147386",
      address: {
        "@type": "PostalAddress",
        addressCountry: "SA",
        addressRegion: "Kingdom of Saudi Arabia",
      },
    },
    areaServed: {
      "@type": "Country",
      name: "Saudi Arabia",
    },
    url: url,
    image: image ? `https://prosperaksa.com${image}` : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
