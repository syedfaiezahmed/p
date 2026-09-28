import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Inquiry } from "@/lib/models/Inquiry";

let fallbackInquiries: any[] = [
  {
    inquiryNumber: "INQ-7821",
    firstName: "Sultan",
    lastName: "Al-Otaibi",
    fullName: "Sultan Al-Otaibi",
    email: "sultan.otaibi@riyadhcorp.sa",
    phone: "+966552194820",
    company: "Riyadh Commercial Holding",
    service: "corporate-finance",
    message: "We are expanding our retail divisions in Jeddah & Dammam and require a dedicated fractional CFO team to build financial models and manage bank credit lines.",
    status: "Meeting Scheduled",
    notes: "Follow-up zoom scheduled with managing director on Thursday at 2 PM.",
    adminSeen: true,
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    inquiryNumber: "INQ-7822",
    firstName: "Fahad",
    lastName: "Al-Ghamdi",
    fullName: "Fahad Al-Ghamdi",
    email: "fahad@ghamditrading.com",
    phone: "+966504829103",
    company: "Al-Ghamdi Logistics",
    service: "bookkeeping-accounting",
    message: "Urgent bookkeeping and ZATCA Phase 2 e-invoicing reconciliation required for our 3 logistics hubs before the quarterly VAT filing deadline.",
    status: "New",
    notes: "",
    adminSeen: false,
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
  {
    inquiryNumber: "INQ-7823",
    firstName: "Noura",
    lastName: "Al-Shehri",
    fullName: "Noura Al-Shehri",
    email: "noura.shehri@techvibe.co",
    phone: "+966549281039",
    company: "TechVibe Cloud Solutions",
    service: "payroll-management",
    message: "Looking for an automated WPS and GOSI payroll management solution for our 65 engineers based in Riyadh and Khobar.",
    status: "Proposal Sent",
    notes: "Standard monthly retainer proposal shared via email.",
    adminSeen: true,
    createdAt: new Date(Date.now() - 3600000 * 22).toISOString(),
  },
];

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (db) {
      let dbInquiries = await Inquiry.find().sort({ createdAt: -1 }).lean();
      if (!dbInquiries || dbInquiries.length === 0) {
        await Inquiry.insertMany(fallbackInquiries);
        dbInquiries = await Inquiry.find().sort({ createdAt: -1 }).lean();
      }
      return NextResponse.json({ success: true, inquiries: dbInquiries });
    }
  } catch (err) {
    console.warn("MongoDB fetch inquiries error, fallback active:", err);
  }

  return NextResponse.json({ success: true, inquiries: fallbackInquiries });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const count = fallbackInquiries.length + 1;
    const inquiryNumber = `INQ-${Math.floor(7000 + Math.random() * 2999)}`;

    const newInquiryData = {
      inquiryNumber,
      firstName: body.firstName || "Inquirer",
      lastName: body.lastName || "",
      fullName: `${body.firstName || ""} ${body.lastName || ""}`.trim(),
      email: body.email || "",
      phone: body.phone || "",
      company: body.company || "",
      service: body.service || "General Advisory",
      message: body.message || "",
      status: "New" as const,
      notes: "",
      adminSeen: false,
      createdAt: new Date().toISOString(),
    };

    try {
      const db = await connectToDatabase();
      if (db) {
        const saved = await Inquiry.create(newInquiryData);
        return NextResponse.json({ success: true, inquiry: saved }, { status: 201 });
      }
    } catch (dbErr) {
      console.warn("MongoDB insert inquiry fallback:", dbErr);
    }

    fallbackInquiries.unshift(newInquiryData);
    return NextResponse.json({ success: true, inquiry: newInquiryData }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
