import { Product, PromoBanner, AiSettingsState } from "@/lib/types/productTypes";
import { Order } from "@/lib/types/orderTypes";

export const CATEGORIES = [
  "Bookkeeping & Accounting",
  "Financial Consulting",
  "Payroll Management",
  "Process Optimization",
  "Tax & Compliance (ZATCA)",
  "Business Valuation",
  "Earbuds & Audio",
  "Smart Watches",
  "Speakers & Sound",
  "Hardware & Accessories",
];

export const DEAL_TAG_OPTIONS = [
  "Corporate Special",
  "Quarterly Audit Promo",
  "Flash Sale",
  "Limited Offer",
  "Best Value",
  "Featured Package",
];

export const initialProducts: Product[] = [
  {
    id: 1,
    name: "Full-Cycle Bookkeeping & General Ledger Package",
    category: "Bookkeeping & Accounting",
    rating: 4.9,
    price: 3499,
    oldPrice: 4200,
    discount: 16,
    image: "/images/Bookkeeping Services.jpg",
    gallery: ["/images/Bookkeeping Services.jpg", "/images/hero image.jpg"],
    description:
      "Comprehensive monthly financial records, ledger maintenance, bank reconciliation, and certified financial reporting compliant with SOCPA & ZATCA regulations.",
    stockCount: 50,
    inStock: true,
    badge: "Most Popular",
    isDeal: true,
    featured: true,
    serviceFeatures: [
      "Daily transaction bookkeeping & categorisation",
      "Monthly Balance Sheet & P&L Statement generation",
      "Bank & Credit reconciliation up to 4 accounts",
      "Dedicated senior bilingual accountant",
    ],
  },
  {
    id: 2,
    name: "Strategic Financial Advisory & CFO-as-a-Service",
    category: "Financial Consulting",
    rating: 5.0,
    price: 7999,
    oldPrice: 9500,
    discount: 15,
    image: "/images/Financial Planning2.jpg",
    gallery: ["/images/Financial Planning2.jpg", "/images/hero image2.jpg"],
    description:
      "Executive level financial planning, quarterly cash flow modeling, budgeting, cost reduction strategies, and board-level financial presentations.",
    stockCount: 20,
    inStock: true,
    badge: "Executive",
    isDeal: true,
    featured: true,
    serviceFeatures: [
      "Dynamic 3-statement financial model",
      "Quarterly executive strategy reviews",
      "Scenario & sensitivity analysis",
      "Working capital optimization roadmap",
    ],
  },
  {
    id: 3,
    name: "Automated Payroll & GOSI Compliance Management",
    category: "Payroll Management",
    rating: 4.8,
    price: 2199,
    oldPrice: 2800,
    discount: 21,
    image: "/images/Payroll4.jpg",
    gallery: ["/images/Payroll4.jpg", "/images/hero image3.jpg"],
    description:
      "End-to-end employee salary processing, WPS file generation, GOSI contributions filing, and automated payslip dispatching.",
    stockCount: 100,
    inStock: true,
    badge: "Compliance",
    isDeal: false,
    featured: true,
    serviceFeatures: [
      "WPS compliant payroll file formatting",
      "GOSI calculation & reconciliation",
      "End of Service Benefit (EOSB) accruals",
      "Direct employee self-service access",
    ],
  },
  {
    id: 4,
    name: "Business Process & ERP Optimization",
    category: "Process Optimization",
    rating: 4.9,
    price: 5499,
    oldPrice: 6800,
    discount: 19,
    image: "/images/Business-Process-Optimization.jpg",
    gallery: ["/images/Business-Process-Optimization.jpg"],
    description:
      "Audit of internal financial workflows, automation of invoice tracking, ERP integrations (SAP/Oracle/Zoho), and operational bottleneck clearance.",
    stockCount: 15,
    inStock: true,
    badge: "Transformation",
    isDeal: true,
    featured: true,
    serviceFeatures: [
      "Workflow bottleneck identification report",
      "Cloud ERP automation configuration",
      "Staff onboarding & operating SOPs",
      "30-day post-implementation monitoring",
    ],
  },
  {
    id: 5,
    name: "Wireless Pro ANC Smart Earbuds",
    category: "Earbuds & Audio",
    rating: 4.8,
    price: 349,
    oldPrice: 449,
    discount: 22,
    image: "/assets/p1.jpg",
    gallery: ["/assets/p1.jpg", "/assets/c1.jpg", "/assets/p8.jpg"],
    description:
      "Active Noise Cancellation, 35-hour playtime with USB-C quick charge case, and high-fidelity spatial audio drivers.",
    stockCount: 75,
    inStock: true,
    badge: "Best Seller",
    isDeal: true,
    dealTag: "Flash Sale",
    featured: false,
  },
  {
    id: 6,
    name: "Ultra AMOLED Smart Watch Series 9",
    category: "Smart Watches",
    rating: 4.9,
    price: 499,
    oldPrice: 650,
    discount: 23,
    image: "/assets/p2.jpg",
    gallery: ["/assets/p2.jpg", "/assets/c2.jpg", "/assets/p7.jpg"],
    description:
      "1.96-inch high refresh AMOLED display, Bluetooth calling with noise reduction mic, sleep and heart health telemetry.",
    stockCount: 40,
    inStock: true,
    badge: "Trending",
    isDeal: true,
    dealTag: "Weekend Special",
    featured: false,
  },
];

export const initialOrders: Order[] = [
  {
    id: "PR-9014",
    orderNumber: "PR-9014",
    customerName: "Sultan Al-Otaibi",
    phone: "+966552194820",
    customerEmail: "sultan.otaibi@riyadhcorp.sa",
    address: "King Fahd Road, Al Olaya District, Floor 14",
    city: "Riyadh",
    notes: "Requires initial kickoff meeting via Zoom before Q3 financial close.",
    serviceType: "Strategic Financial Advisory & CFO-as-a-Service",
    paymentMethod: "Corporate Bank Transfer",
    paymentStatus: "paid",
    paymentDetails: {
      senderName: "Riyadh Commercial Corp",
      senderPhone: "+966552194820",
      accountPaidTo: "Prospera Corporate Account",
      accountTitle: "Prospera KSA Advisory",
      amount: 7999,
      extractedTransactionId: "TRX-SAR-8921049",
      amountMatch: "yes",
      verifiedBy: "Admin Portal",
      verifiedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    },
    items: [
      {
        id: 2,
        name: "Strategic Financial Advisory & CFO-as-a-Service",
        price: 7999,
        qty: 1,
        image: "/images/Financial Planning2.jpg",
        category: "Financial Consulting",
      },
    ],
    subtotal: 7999,
    shipping: 0,
    total: 7999,
    status: "Confirmed",
    adminSeen: true,
    adminSeenAt: new Date().toISOString(),
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: "PR-9015",
    orderNumber: "PR-9015",
    customerName: "Fahad Al-Ghamdi",
    phone: "+966504829103",
    customerEmail: "fahad@ghamditrading.com",
    address: "Prince Sultan Street, Al Rawdah",
    city: "Jeddah",
    notes: "Urgent monthly bookkeeping setup needed for 3 branches.",
    serviceType: "Full-Cycle Bookkeeping & General Ledger Package",
    paymentMethod: "Bank Transfer",
    paymentStatus: "pending_verification",
    paymentDetails: {
      senderName: "Fahad Al-Ghamdi",
      senderPhone: "+966504829103",
      amount: 3499,
      extractedTransactionId: "SNB-99214-JD",
    },
    items: [
      {
        id: 1,
        name: "Full-Cycle Bookkeeping & General Ledger Package",
        price: 3499,
        qty: 1,
        image: "/images/Bookkeeping Services.jpg",
        category: "Bookkeeping & Accounting",
      },
    ],
    subtotal: 3499,
    shipping: 0,
    total: 3499,
    status: "Pending Processing",
    adminSeen: false,
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
  {
    id: "PR-9016",
    orderNumber: "PR-9016",
    customerName: "Noura Al-Shehri",
    phone: "+966549281039",
    customerEmail: "noura.shehri@techvibe.co",
    address: "Al Khobar Corniche, Tower 3",
    city: "Al Khobar",
    notes: "Interested in WPS payroll automated configuration.",
    serviceType: "Automated Payroll & GOSI Compliance Management",
    paymentMethod: "STC Pay",
    paymentStatus: "paid",
    items: [
      {
        id: 3,
        name: "Automated Payroll & GOSI Compliance Management",
        price: 2199,
        qty: 1,
        image: "/images/Payroll4.jpg",
        category: "Payroll Management",
      },
    ],
    subtotal: 2199,
    shipping: 0,
    total: 2199,
    status: "Dispatched",
    adminSeen: true,
    createdAt: new Date(Date.now() - 3600000 * 26).toISOString(),
  },
];

export const initialBanner: PromoBanner = {
  imageUrl: "/assets/banner.webp",
  linkUrl: "/services",
  title: "Special Q3 Corporate Consulting Offer — Up to 25% Off Advisory Packages",
  subtitle: "Empower your enterprise with certified financial controllers and real-time ZATCA compliance.",
  active: true,
  updatedAt: new Date().toISOString(),
};

export const PROMPT_PRESETS = [
  {
    id: "prospera_executive",
    title: "Prospera Chief Corporate Advisor (Recommended)",
    description: "Expert financial consulting, bookkeeping, tax planning, and strategic business guidance for Saudi Arabia & GCC enterprises.",
    prompt: `You are the Official Lead AI Business Consultant & Financial Advisor for "Prospera KSA" (Website: Prospera KSA - Financial & Business Consulting).

YOUR MISSION & EXPERTISE:
1. Provide accurate, professional, and courteous consultations on corporate finance, bookkeeping, payroll management, and process optimization in Saudi Arabia.
2. Explain how Prospera simplifies compliance with SOCPA, ZATCA e-invoicing Phase 2, and GOSI / WPS wage protection systems.
3. Assist visitors in selecting the most suitable consulting tier or booking an initial executive consultation call.
4. If asked about contact info: Official Hotline is +966 557 147 386 and inquiries can be emailed to inquire@prosperaksa.com. Office: Kingdom of Saudi Arabia.

COMMUNICATION STYLE:
- Fluent in English, Arabic, and Roman Urdu.
- Professional, reassuring, high-trust tone tailored for business owners, CFOs, and founders.`,
  },
  {
    id: "support_specialist",
    title: "24/7 Fast-Track Client Support Specialist",
    description: "Rapid responses on consultation schedules, pricing breakdown, deliverables, and service onboarding timelines.",
    prompt: `You are the Fast-Track Client Support Specialist for Prospera KSA.
- Answer onboarding questions, consultation scheduling, pricing tiers, and service turnaround times.
- Hotline: +966 557 147 386 / inquire@prosperaksa.com
- Keep responses concise, clear, and structured with bullet points.`,
  },
  {
    id: "ecommerce_tech_advisor",
    title: "One Solution E-Commerce & Tech Sales Advisor",
    description: "Gadgets, hardware, audio accessories, warranty, and nationwide delivery support.",
    prompt: `You are the Lead Tech Advisor for the Store & E-Commerce catalog.
- Assist customers with specs, battery life, compatibility, and 7-day checking warranty.
- Guide users on placing orders with Cash on Delivery or digital payment.`,
  },
];

export const initialAiSettings: AiSettingsState = {
  aiName: "Prospera AI Corporate Advisor",
  tagline: "24/7 Intelligent Financial & Business Transformation Desk",
  welcomeMessage:
    "**Assalamu Alaikum & Welcome to Prospera Advisory!** 📈\n\nI am your 24/7 AI Business Consultant. How may I assist your organization today?\n\n• 💼 **Bookkeeping & Accounting Packages** (SOCPA & ZATCA ready)\n• 📊 **Fractional CFO & Financial Advisory**\n• 👥 **Payroll & Wage Protection System (WPS)**\n• 📅 **Schedule an Executive Consultation Call**",
  systemInstruction: PROMPT_PRESETS[0].prompt,
  tone: "Executive, Knowledgeable & High-Trust",
  temperature: 0.7,
  modelName: "gemini-1.5-flash",
  maxOutputTokens: 1000,
  customFaqs: [
    {
      id: "faq-1",
      question: "What financial and advisory services does Prospera offer?",
      answer:
        "Prospera provides full-cycle bookkeeping, fractional CFO advisory, financial forecasting, payroll management with GOSI/WPS compliance, and business process automation tailored for enterprises in Saudi Arabia.",
      category: "Services",
      active: true,
    },
    {
      id: "faq-2",
      question: "How do I schedule an initial consultation?",
      answer:
        "You can request a consultation via our website contact form, email inquire@prosperaksa.com, or call our team directly at +966 557 147 386.",
      category: "Consulting",
      active: true,
    },
    {
      id: "faq-3",
      question: "Are your accounting services compliant with ZATCA Phase 2?",
      answer:
        "Yes, our systems and accounting procedures fully comply with ZATCA e-invoicing Phase 2 regulations, VAT filing requirements, and SOCPA accounting standards.",
      category: "Compliance",
      active: true,
    },
  ],
  storePoliciesOverride: "",
  quickReplies: [
    "💼 Bookkeeping Packages",
    "📊 CFO Advisory Services",
    "🛡️ ZATCA Compliance Info",
    "📅 Book Free Consultation",
    "📞 Contact Support",
  ],
  isEnabled: true,
  updatedBy: "Admin",
  updatedAt: new Date().toISOString(),
};

export function formatPrice(amount: number): string {
  if (isNaN(amount)) return "SAR 0";
  return `SAR ${amount.toLocaleString("en-US")}`;
}
