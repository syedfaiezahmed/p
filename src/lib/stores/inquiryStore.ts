import { InquiryItem, InquiryStatus } from "@/lib/types/inquiryTypes";

const INQUIRIES_STORAGE_KEY = "prospera_contact_inquiries_v2";
const EVENT_INQUIRIES_UPDATED = "prospera_inquiries_updated";

export const initialConsultingInquiries: InquiryItem[] = [
  {
    inquiryNumber: "INQ-7821",
    firstName: "Sultan",
    lastName: "Al-Otaibi",
    fullName: "Sultan Al-Otaibi",
    email: "sultan.otaibi@riyadhcorp.sa",
    phone: "+966552194820",
    company: "Riyadh Commercial Holding",
    service: "corporate-finance",
    message:
      "We are expanding our retail divisions in Jeddah & Dammam and require a dedicated fractional CFO team to build financial models and manage bank credit lines.",
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
    message:
      "Urgent bookkeeping and ZATCA Phase 2 e-invoicing reconciliation required for our 3 logistics hubs before the quarterly VAT filing deadline.",
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
    message:
      "Looking for an automated WPS and GOSI payroll management solution for our 65 engineers based in Riyadh and Khobar.",
    status: "Proposal Sent",
    notes: "Standard monthly retainer proposal shared via email.",
    adminSeen: true,
    createdAt: new Date(Date.now() - 3600000 * 22).toISOString(),
  },
  {
    inquiryNumber: "INQ-7824",
    firstName: "Tariq",
    lastName: "Al-Zahrani",
    fullName: "Tariq Al-Zahrani",
    email: "tariq@zahranicapital.com",
    phone: "+966567192834",
    company: "Zahrani Capital Partners",
    service: "tax-advisory",
    message:
      "Need comprehensive Zakat & Corporate Tax optimization advisory ahead of our annual audit review.",
    status: "Contacted",
    notes: "Sent introductory corporate deck and rate card.",
    adminSeen: true,
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];

export function getStoredInquiries(): InquiryItem[] {
  if (typeof window === "undefined") return initialConsultingInquiries;
  try {
    const raw = localStorage.getItem(INQUIRIES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(initialConsultingInquiries));
      return initialConsultingInquiries;
    }
    const list = JSON.parse(raw);
    if (!Array.isArray(list) || list.length === 0) {
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(initialConsultingInquiries));
      return initialConsultingInquiries;
    }
    return list;
  } catch {
    return initialConsultingInquiries;
  }
}

export function saveStoredInquiries(list: InquiryItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent(EVENT_INQUIRIES_UPDATED, { detail: list }));
  } catch (e) {
    console.error("Error saving inquiries:", e);
  }
}

export async function fetchAllInquiries(): Promise<InquiryItem[]> {
  try {
    const res = await fetch("/api/inquiries", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.inquiries) && data.inquiries.length > 0) {
        saveStoredInquiries(data.inquiries);
        return data.inquiries;
      }
    }
  } catch (err) {
    console.warn("API inquiries fetch error, using cache:", err);
  }
  return getStoredInquiries();
}

export async function updateInquiryStatus(
  inquiryNumber: string,
  newStatus: InquiryStatus,
  notes?: string
): Promise<{ success: boolean; inquiry?: InquiryItem }> {
  try {
    const res = await fetch(`/api/inquiries/${inquiryNumber}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus, ...(notes !== undefined ? { notes } : {}) }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.inquiry) {
        const all = getStoredInquiries();
        const idx = all.findIndex((i) => i.inquiryNumber === inquiryNumber);
        if (idx !== -1) {
          all[idx] = { ...all[idx], status: newStatus, ...(notes !== undefined ? { notes } : {}) };
          saveStoredInquiries(all);
        }
        return { success: true, inquiry: data.inquiry };
      }
    }
  } catch (err) {
    console.warn("API inquiry status update fallback:", err);
  }

  const all = getStoredInquiries();
  const target = all.find((i) => i.inquiryNumber === inquiryNumber);
  if (target) {
    target.status = newStatus;
    if (notes !== undefined) target.notes = notes;
    saveStoredInquiries(all);
    return { success: true, inquiry: target };
  }

  return { success: false };
}

export async function markInquiriesSeen(allSeen = true): Promise<void> {
  const current = getStoredInquiries();
  current.forEach((i) => {
    i.adminSeen = true;
  });
  saveStoredInquiries(current);
}

export async function deleteInquiry(inquiryNumber: string): Promise<boolean> {
  try {
    await fetch(`/api/inquiries/${inquiryNumber}`, { method: "DELETE" });
  } catch {}
  const filtered = getStoredInquiries().filter((i) => i.inquiryNumber !== inquiryNumber);
  saveStoredInquiries(filtered);
  return true;
}
