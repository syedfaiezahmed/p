import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, settings } = await req.json();
    const q = (message || "").toLowerCase();

    let reply = "Assalamu Alaikum! Prospera KSA is a premier financial consulting and corporate advisory firm. We offer full bookkeeping, ZATCA e-invoicing Phase 2 support, and CFO strategic advisory. How can we assist your business today?";

    if (q.includes("bookkeeping") || q.includes("accounting") || q.includes("hisab")) {
      reply = "📊 **Prospera Bookkeeping Packages:**\n• Daily transaction recording & classification\n• ZATCA & SOCPA compliant monthly financial statements\n• Bank & ledger reconciliations\n• Dedicated bilingual senior accountant\n\nPackages start from SAR 3,499/mo. Would you like to schedule an introductory call?";
    } else if (q.includes("cfo") || q.includes("advisory") || q.includes("consult")) {
      reply = "💼 **Strategic CFO Advisory:**\n• Dynamic 3-statement financial forecasting\n• Cash flow modeling & working capital optimization\n• Executive board presentations\n\nStarting at SAR 7,999/mo.";
    } else if (q.includes("zatca") || q.includes("tax") || q.includes("vat") || q.includes("gosi")) {
      reply = "🛡️ **ZATCA & Statutory Compliance:**\nWe ensure full compliance with ZATCA Phase 2 e-invoicing, quarterly VAT returns, GOSI contributions, and WPS (Wage Protection System).";
    } else if (q.includes("contact") || q.includes("phone") || q.includes("call") || q.includes("email") || q.includes("office")) {
      reply = "📞 **Official Contact Info:**\n• Phone / WhatsApp: +966 557 147 386\n• Email: inquire@prosperaksa.com\n• Offices: Riyadh & Jeddah, Saudi Arabia";
    } else if (q.includes("price") || q.includes("cost") || q.includes("rate") || q.includes("fees")) {
      reply = "🏷️ **Transparent Consulting & Service Tiers:**\n• Bookkeeping & GL: SAR 3,499/mo\n• CFO Advisory: SAR 7,999/mo\n• Payroll & WPS: SAR 2,199/mo\n• Process Optimization: SAR 5,499/mo\n\nWe also offer tailored quotes for custom corporate needs.";
    }

    return NextResponse.json({
      success: true,
      reply,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
