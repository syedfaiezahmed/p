import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectToDatabase } from "@/lib/db";
import { AiSettings } from "@/lib/models/AiSettings";
import { initialAiSettings } from "@/data/initialData";
import { servicesData } from "@/data/servicesData";

// Comprehensive Corporate Knowledge Base embedded into AI Context
const PROSPERA_SYSTEM_KNOWLEDGE = `
YOU ARE THE OFFICIAL AI LEAD CORPORATE ADVISOR FOR "PROSPERA KSA" (Prospera Financial & Strategic Business Consulting).
Website: https://prosperaksa.com
Location: Kingdom of Saudi Arabia
Official Hotline / WhatsApp: +966 557 147 386
Official Inquiries Email: inquire@prosperaksa.com
Operating Hours: Sunday – Thursday: 9:00 AM – 6:00 PM AST

CORE IDENTITY & TONE:
- You represent a prestigious Saudi financial consulting firm founded in 2017.
- Tone: Executive, articulate, authoritative yet welcoming, polite, and consultative.
- Languages: Fluent in English, Arabic (العربية), and Roman Urdu. Respond in the language used by the client.
- When formatting, use clean markdown, bullet points, and emojis tastefully.

ABOUT PROSPERA KSA:
- Founded: 2017 in Saudi Arabia.
- Executive Leadership:
  1. Saeed A. Siddiqui — Managing Partner (30+ Years experience, former CFO for 15 years in GCC)
  2. Siraj Ahmed Ansari — Managing Partner (20+ Years experience in tax, corporate accounting & ERP)
  3. Salman Ahmed — Director (14+ Years experience in business analytics & Power BI)

KEY PRACTICE AREAS & PACKAGES:
1. Bookkeeping & Accounting Services (SOCPA & ZATCA Compliant):
   - Daily ledger recording, AP/AR, bank & VAT reconciliations, monthly P&L/Balance Sheet.
   - Retainers start from SAR 3,499/month.
2. Fractional CFO & Strategic Financial Planning:
   - Dynamic 3-statement financial forecasting, rolling 12-month cash flows, working capital optimization, board decks.
   - Starting from SAR 7,999/month.
3. Payroll & Statutory Compliance (WPS / GOSI):
   - Saudi Labor Law compliance, Mudad / WPS SIF files, GOSI contributions, EOSB (End of Service Benefits).
   - Starting from SAR 2,199/month.
4. Tax Advisory & Zakat Compliance:
   - ZATCA Phase 2 (FATOORA) e-invoicing compliance, quarterly VAT filings, Zakat base calculations, Transfer Pricing, audit defense.
5. Process Optimization & ERP Integration:
   - Odoo, SAP, Oracle, Zoho Books, Microsoft Dynamics integration, month-end close acceleration.
   - Starting from SAR 5,499/month.
6. Corporate Finance & M&A Advisory:
   - DCF / IVSC certified business valuations, financial due diligence (FDD), Quality of Earnings (QoE), transaction structuring.
7. Treasury & Risk Management:
   - Foreign exchange (FX) hedging, liquidity pooling, bank facility negotiations.
8. Digital Finance Transformation & Power BI Analytics:
   - Real-time executive dashboards, automated invoice tracking.

CLIENT NEXT STEPS / CALL TO ACTION:
- Always encourage interested clients to request a free 30-minute introductory strategy session via the Contact Form (/contact) or message directly on WhatsApp (+966 557 147 386).
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history = [] } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "A message prompt is required." },
        { status: 400 }
      );
    }

    const userQuery = message.trim();

    // 1. Fetch Dynamic AI Settings from MongoDB or Local Config
    let settings = { ...initialAiSettings };
    try {
      const db = await connectToDatabase();
      if (db) {
        const found = await AiSettings.findOne().sort({ updatedAt: -1 }).lean();
        if (found) {
          settings = { ...settings, ...(found as any) };
        }
      }
    } catch (e) {
      console.warn("MongoDB AI settings fetch error:", e);
    }

    // 2. Check if AI is enabled in Admin settings
    if (settings.isEnabled === false) {
      return NextResponse.json({
        success: true,
        reply: "Our AI advisory desk is currently offline for scheduled maintenance. Please reach out directly to our team via WhatsApp at +966 557 147 386 or email inquire@prosperaksa.com.",
        source: "system",
        timestamp: new Date().toISOString(),
      });
    }

    // 3. Format dynamic FAQs context from Admin
    const customFaqsContext =
      settings.customFaqs && settings.customFaqs.length > 0
        ? "\n\nCUSTOM TRAINED FAQS:\n" +
          settings.customFaqs
            .filter((f) => f.active !== false)
            .map((f) => `Q: ${f.question}\nA: ${f.answer}`)
            .join("\n\n")
        : "";

    // 4. Try Google Gemini AI if API key is provided
    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (apiKey && apiKey.trim().length > 10) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey.trim());
        const modelName = settings.modelName || "gemini-1.5-flash";

        const systemInstruction = `
${PROSPERA_SYSTEM_KNOWLEDGE}

ADMIN SYSTEM INSTRUCTION:
${settings.systemInstruction || "Provide expert financial consulting for Saudi Arabia."}

PREFERRED TONE: ${settings.tone || "Executive, Knowledgeable & High-Trust"}
${customFaqsContext}
`;

        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction,
          generationConfig: {
            temperature: settings.temperature ?? 0.7,
            maxOutputTokens: settings.maxOutputTokens ?? 1000,
          },
        });

        // Construct Chat History
        const formattedHistory = (history || [])
          .slice(-8)
          .map((h: { sender: string; text: string }) => ({
            role: h.sender === "user" ? "user" : "model",
            parts: [{ text: h.text }],
          }));

        const chat = model.startChat({
          history: formattedHistory,
        });

        const result = await chat.sendMessage(userQuery);
        const responseText = result.response.text();

        if (responseText) {
          return NextResponse.json({
            success: true,
            reply: responseText,
            source: "gemini",
            model: modelName,
            timestamp: new Date().toISOString(),
          });
        }
      } catch (geminiError: any) {
        console.warn("Gemini API call failed, activating smart fallback:", geminiError?.message);
      }
    }

    // 5. Intelligent Fallback Engine (when API Key is pending or in offline mode)
    const reply = generateSmartFallbackReply(userQuery, settings);

    return NextResponse.json({
      success: true,
      reply,
      source: "smart_fallback",
      isLiveKeyConfigured: Boolean(apiKey),
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process chat message." },
      { status: 500 }
    );
  }
}

function generateSmartFallbackReply(qRaw: string, settings: any): string {
  const q = qRaw.toLowerCase();

  // Check Custom FAQs first
  if (settings.customFaqs && settings.customFaqs.length > 0) {
    for (const faq of settings.customFaqs) {
      if (faq.active !== false && faq.question) {
        const words = faq.question.toLowerCase().split(/\s+/).filter((w: string) => w.length > 3);
        const matchCount = words.filter((w: string) => q.includes(w)).length;
        if (matchCount >= 2 || q.includes(faq.question.toLowerCase())) {
          return `${faq.answer}\n\n*Would you like to schedule an introductory call with our senior consultants?*`;
        }
      }
    }
  }

  // Heuristic Topic Matching
  if (q.includes("bookkeeping") || q.includes("accounting") || q.includes("ledger") || q.includes("hisab") || q.includes("hisaab")) {
    return `📊 **Prospera Full-Cycle Bookkeeping & Accounting:**\n\nWe provide Saudi enterprises with complete, SOCPA & ZATCA-compliant accounting:\n• **Daily Ledger Recording:** Transaction entry, categorization, & reconciliations.\n• **Financial Statements:** Monthly Balance Sheets, P&L, and cash flow reports.\n• **Multi-Account Reconciliation:** Bank accounts, POS, and supplier credit lines.\n• **Dedicated Team:** Senior bilingual chartered accountant.\n\n💼 *Packages start from SAR 3,499/month.*\n👉 [Click here to book a consultation](/contact?service=bookkeeping-services) or WhatsApp us at **+966 557 147 386**.`;
  }

  if (q.includes("cfo") || q.includes("advisory") || q.includes("strategic") || q.includes("consult")) {
    return `💼 **Fractional CFO & Strategic Advisory:**\n\nAccess executive-level financial leadership for your enterprise:\n• **Dynamic 3-Statement Financial Models:** Multi-year revenue and expense forecasts.\n• **Cash Flow & Liquidity Management:** Rolling 13-week and 12-month projections.\n• **M&A Due Diligence & Valuations:** Certified IVSC valuation and capital restructuring.\n• **Board & Investor Presentations:** Executive packs and KPI tracking.\n\n📈 *Retainers start from SAR 7,999/month.*\n👉 [Schedule an Executive Strategy Session](/contact?service=financial-planning)`;
  }

  if (q.includes("zatca") || q.includes("e-invoicing") || q.includes("fatoora") || q.includes("tax") || q.includes("vat") || q.includes("zakat")) {
    return `🛡️ **ZATCA Phase 2 & Zakat / Tax Compliance:**\n\nWe ensure 100% statutory compliance across Saudi Arabia:\n• **ZATCA Phase 2 (FATOORA):** Integration of cryptographic stamps and XML e-invoices.\n• **VAT & Withholding Tax:** Quarterly return filings, input VAT optimization, and WHT advisory.\n• **Zakat Base Modeling:** Lawful optimization of Zakat liability.\n• **Audit Defense:** Official representation before ZATCA assessors.\n\n👉 [Speak with our Tax Specialist](/contact?service=tax-advisory)`;
  }

  if (q.includes("payroll") || q.includes("wps") || q.includes("mudad") || q.includes("gosi") || q.includes("eosb") || q.includes("salary")) {
    return `👥 **Payroll & Statutory Compliance (WPS / GOSI):**\n\nComprehensive workforce payroll under Saudi Labor Law:\n• **Mudad / WPS:** Automated SIF file generation and banking dispatches.\n• **GOSI Management:** Monthly registration, calculations, and contribution reconciliations.\n• **End of Service (EOSB):** Article 84/85 gratuity provisions and final settlement calculations.\n• **Secure Digital Payslips:** Automated distribution directly to staff.\n\n🏷️ *Starting from SAR 2,199/month.*\n👉 [Request Payroll Consultation](/contact?service=payroll-management)`;
  }

  if (q.includes("price") || q.includes("cost") || q.includes("rate") || q.includes("fee") || q.includes("package") || q.includes("kitn")) {
    return `🏷️ **Prospera Transparent Corporate Advisory Tiers:**\n\n• **Core Bookkeeping & General Ledger:** Starting SAR 3,499/mo\n• **Strategic CFO & Financial Planning:** Starting SAR 7,999/mo\n• **Payroll & WPS Compliance:** Starting SAR 2,199/mo\n• **Process Optimization & ERP:** Starting SAR 5,499/mo\n• **Corporate Finance & Valuations:** Custom Scoped\n\n*All packages include a dedicated senior consultant and monthly executive reviews.*\n👉 [Request a Customized Quote](/contact)`;
  }

  if (q.includes("contact") || q.includes("phone") || q.includes("call") || q.includes("email") || q.includes("location") || q.includes("office") || q.includes("address") || q.includes("whatsapp")) {
    return `📞 **Official Prospera KSA Contact Information:**\n\n• **Phone / WhatsApp:** [+966 557 147 386](https://wa.me/966557147386)\n• **Official Email:** [inquire@prosperaksa.com](mailto:inquire@prosperaksa.com)\n• **Headquarters:** Kingdom of Saudi Arabia\n• **Business Hours:** Sunday – Thursday: 9:00 AM – 6:00 PM AST\n\nWe guarantee a consultation response within 24 business hours.`;
  }

  if (q.includes("team") || q.includes("partner") || q.includes("who are you") || q.includes("about") || q.includes("experience")) {
    return `🏛️ **About Prospera Consulting KSA:**\n\nFounded in 2017, Prospera is led by seasoned partners with decades of regional expertise:\n• **Siraj Ahmed Ansari** (Managing Partner) — 20+ Years in corporate tax & ERP.\n• **Saeed A. Siddiqui** (Managing Partner) — 30+ Years experience, 15 years as CFO.\n• **Salman Ahmed** (Director) — 14+ Years in business analytics & Power BI.\n\n👉 [Read Our Full Corporate Story](/about)`;
  }

  // Default Consultation Welcome
  return `Assalamu Alaikum! Welcome to **Prospera Consulting KSA**.\n\nI am your 24/7 AI Business Advisor. I can assist you with:\n• 📊 **Bookkeeping & Accounting** (ZATCA & SOCPA Compliant)\n• 💼 **Fractional CFO & Capital Structuring**\n• 🛡️ **ZATCA Phase 2 & Tax Strategy**\n• 👥 **Automated WPS Payroll & GOSI**\n• 🏷️ **Pricing Tiers & Engagement Retainers**\n\nHow can our advisory team support your enterprise today? You can also message us directly on WhatsApp at **+966 557 147 386**.`;
}
