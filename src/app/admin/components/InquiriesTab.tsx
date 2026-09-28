"use client";

import { useState } from "react";
import { InquiryItem, InquiryStatus } from "@/lib/types/inquiryTypes";
import {
  Search,
  CheckCircle2,
  Clock,
  MessageCircle,
  Eye,
  Mail,
  Phone,
  Building2,
  Calendar,
  X,
  FileText,
  Trash2,
  User,
  Tag,
} from "lucide-react";
import { updateInquiryStatus, deleteInquiry } from "@/lib/stores/inquiryStore";

interface InquiriesTabProps {
  inquiries: InquiryItem[];
  onRefresh: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const INQUIRY_STATUSES: InquiryStatus[] = [
  "New",
  "Contacted",
  "Meeting Scheduled",
  "Proposal Sent",
  "Active Client",
  "Archived",
];

const SERVICE_LABELS: Record<string, string> = {
  "corporate-finance": "Corporate Finance & M&A",
  "tax-advisory": "Tax Advisory & Zakat Compliance",
  "treasury-risk": "Treasury & Risk Management",
  "bookkeeping-accounting": "Bookkeeping & Reporting",
  "payroll-management": "Payroll & Statutory Compliance",
  "process-optimization": "Process Optimization & ERP",
  "digital-transformation": "Digital Finance Transformation",
  "data-analytics": "Data Analytics & Power BI",
  "general": "General Corporate Advisory",
};

export default function InquiriesTab({
  inquiries,
  onRefresh,
  searchQuery,
  setSearchQuery,
}: InquiriesTabProps) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      inq.inquiryNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.company && inq.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (inq.email && inq.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (inq.phone && inq.phone.includes(searchQuery)) ||
      inq.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || inq.status === statusFilter;
    const matchesService = serviceFilter === "all" || inq.service === serviceFilter;

    return matchesSearch && matchesStatus && matchesService;
  });

  const handleStatusChange = async (inquiryNumber: string, newStatus: InquiryStatus) => {
    await updateInquiryStatus(inquiryNumber, newStatus);
    onRefresh();
    if (selectedInquiry && selectedInquiry.inquiryNumber === inquiryNumber) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    await updateInquiryStatus(selectedInquiry.inquiryNumber, selectedInquiry.status, editNotes);
    setSelectedInquiry({ ...selectedInquiry, notes: editNotes });
    onRefresh();
  };

  const handleDelete = async (inquiryNumber: string) => {
    await deleteInquiry(inquiryNumber);
    setDeleteConfirmId(null);
    setSelectedInquiry(null);
    onRefresh();
  };

  const openWhatsApp = (inquiry: InquiryItem) => {
    const cleanNum = (inquiry.phone || "+966557147386").replace(/[^0-9]/g, "");
    const serviceName = SERVICE_LABELS[inquiry.service] || inquiry.service;
    const msg = encodeURIComponent(
      `Assalamu Alaikum ${inquiry.fullName},\n\nThis is Prospera Corporate Advisory regarding your consultation inquiry (#${inquiry.inquiryNumber}) for ${serviceName}.\n\nWe would be pleased to schedule an introductory strategy session with our senior consultant. When would be a convenient time this week?`
    );
    window.open(`https://wa.me/${cleanNum}?text=${msg}`, "_blank");
  };

  const openEmail = (inquiry: InquiryItem) => {
    const serviceName = SERVICE_LABELS[inquiry.service] || inquiry.service;
    const subject = encodeURIComponent(`Prospera KSA Advisory — Consultation Follow-Up (#${inquiry.inquiryNumber})`);
    const body = encodeURIComponent(
      `Dear ${inquiry.fullName},\n\nThank you for reaching out to Prospera regarding ${serviceName}.\n\nOur advisory team has reviewed your request: "${inquiry.message}".\n\nWe would like to propose a 30-minute discovery call to discuss your objectives in detail.\n\nBest regards,\nProspera Advisory Team\nRiyadh, Saudi Arabia\n+966 557 147 386`
    );
    window.location.href = `mailto:${inquiry.email}?subject=${subject}&body=${body}`;
  };

  const getStatusBadgeStyle = (status: InquiryStatus) => {
    switch (status) {
      case "New":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Contacted":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Meeting Scheduled":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "Proposal Sent":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
      case "Active Client":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Archived":
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
      default:
        return "bg-slate-500/10 text-slate-300 border-slate-500/20";
    }
  };

  return (
    <div className="space-y-5">
      {/* Search & Filters */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search inquiries by client, company, email, or message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800/80 py-2 pl-9 pr-4 text-xs text-white placeholder-slate-400 focus:border-[#8A1650] focus:outline-none focus:ring-1 focus:ring-[#8A1650]"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 focus:border-[#8A1650] focus:outline-none"
          >
            <option value="all">All Lead Statuses</option>
            {INQUIRY_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Service Filter */}
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 focus:border-[#8A1650] focus:outline-none"
          >
            <option value="all">All Practice Areas</option>
            {Object.entries(SERVICE_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 bg-slate-950/80 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-4 py-3.5">Ref / Date</th>
                <th className="px-4 py-3.5">Client & Company</th>
                <th className="px-4 py-3.5">Practice Area</th>
                <th className="px-4 py-3.5">Message Excerpt</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No matching contact inquiries found.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => (
                  <tr
                    key={inq.inquiryNumber}
                    className="transition-colors hover:bg-slate-800/50 cursor-pointer"
                    onClick={() => {
                      setSelectedInquiry(inq);
                      setEditNotes(inq.notes || "");
                    }}
                  >
                    <td className="px-4 py-3.5 font-mono">
                      <div className="flex items-center gap-1.5">
                        {!inq.adminSeen && (
                          <span className="h-2 w-2 rounded-full bg-[#8A1650]" />
                        )}
                        <span className="font-semibold text-white">{inq.inquiryNumber}</span>
                      </div>
                      <span className="text-[10px] text-slate-500">
                        {new Date(inq.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-white">{inq.fullName}</div>
                      {inq.company && (
                        <div className="flex items-center gap-1 text-[11px] text-slate-300">
                          <Building2 className="h-3 w-3 text-slate-400" />
                          <span>{inq.company}</span>
                        </div>
                      )}
                      <div className="text-[10px] text-slate-400">{inq.email}</div>
                    </td>

                    <td className="px-4 py-3.5 max-w-[200px]">
                      <span className="inline-block rounded-md bg-slate-800 border border-slate-700 px-2 py-0.5 text-[11px] font-medium text-slate-300">
                        {SERVICE_LABELS[inq.service] || inq.service || "General Advisory"}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 max-w-[260px]">
                      <p className="line-clamp-2 text-xs text-slate-300 leading-relaxed">
                        {inq.message}
                      </p>
                    </td>

                    <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={inq.status}
                        onChange={(e) =>
                          handleStatusChange(inq.inquiryNumber, e.target.value as InquiryStatus)
                        }
                        className={`rounded-lg border px-2.5 py-1 text-xs font-semibold focus:outline-none ${getStatusBadgeStyle(
                          inq.status
                        )}`}
                      >
                        {INQUIRY_STATUSES.map((s) => (
                          <option key={s} value={s} className="bg-slate-900 text-white">
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-4 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        {/* WhatsApp */}
                        <button
                          onClick={() => openWhatsApp(inq)}
                          title="Instant WhatsApp Consultation"
                          className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-950/40 border border-emerald-900/50 text-emerald-400 hover:bg-emerald-900/60 transition-colors"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                        </button>

                        {/* Email */}
                        <button
                          onClick={() => openEmail(inq)}
                          title="Reply via Email"
                          className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-950/40 border border-blue-900/50 text-blue-300 hover:bg-blue-900/60 transition-colors"
                        >
                          <Mail className="h-3.5 w-3.5" />
                        </button>

                        {/* View Dossier */}
                        <button
                          onClick={() => {
                            setSelectedInquiry(inq);
                            setEditNotes(inq.notes || "");
                          }}
                          title="View Details"
                          className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500 hover:text-white transition-colors"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-7 shadow-2xl text-slate-100">
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8A1650] text-white">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Consultation Request Dossier
                </span>
                <h3 className="text-base font-bold text-white">
                  Ref #{selectedInquiry.inquiryNumber} — {selectedInquiry.fullName}
                </h3>
                <p className="text-xs text-slate-400">
                  Received on {new Date(selectedInquiry.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Client Profile */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2 text-xs">
                <h4 className="font-semibold uppercase tracking-wider text-slate-400 text-[11px] mb-2 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-[#8A1650]" />
                  <span>Client Contact Profile</span>
                </h4>
                <p className="font-bold text-white text-sm">{selectedInquiry.fullName}</p>
                {selectedInquiry.company && (
                  <p className="flex items-center gap-1.5 text-slate-300">
                    <Building2 className="h-3.5 w-3.5 text-slate-400" />
                    <span>Company: <strong className="text-white">{selectedInquiry.company}</strong></span>
                  </p>
                )}
                <p className="flex items-center gap-1.5 text-slate-300">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  <span>Email: {selectedInquiry.email}</span>
                </p>
                {selectedInquiry.phone && (
                  <p className="flex items-center gap-1.5 text-slate-300">
                    <Phone className="h-3.5 w-3.5 text-slate-400" />
                    <span>Phone: {selectedInquiry.phone}</span>
                  </p>
                )}
              </div>

              {/* Practice Area & Lead Status */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-3 text-xs">
                <h4 className="font-semibold uppercase tracking-wider text-slate-400 text-[11px] flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5 text-[#8A1650]" />
                  <span>Engagement Scope</span>
                </h4>

                <div>
                  <span className="text-slate-400 block text-[10px]">Practice Area:</span>
                  <span className="font-semibold text-white text-xs">
                    {SERVICE_LABELS[selectedInquiry.service] || selectedInquiry.service}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] mb-1">Lead Stage:</span>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) =>
                      handleStatusChange(
                        selectedInquiry.inquiryNumber,
                        e.target.value as InquiryStatus
                      )
                    }
                    className={`w-full rounded-lg border px-3 py-1.5 text-xs font-semibold focus:outline-none ${getStatusBadgeStyle(
                      selectedInquiry.status
                    )}`}
                  >
                    {INQUIRY_STATUSES.map((s) => (
                      <option key={s} value={s} className="bg-slate-900 text-white">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <h4 className="font-semibold uppercase tracking-wider text-slate-400 text-[11px] mb-1.5">
                Client Stated Requirements
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                {selectedInquiry.message}
              </p>
            </div>

            {/* Internal Notes */}
            <div className="mt-4 space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Internal Consultant Notes
              </label>
              <textarea
                rows={3}
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                placeholder="Add meeting takeaways or follow-up notes..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-white placeholder-slate-500 focus:border-[#8A1650] focus:outline-none"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSaveNotes}
                  className="rounded-lg bg-[#8A1650] hover:bg-[#6e1240] px-3.5 py-1.5 text-xs font-semibold text-white shadow"
                >
                  Save Notes
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4">
              <button
                onClick={() => setDeleteConfirmId(selectedInquiry.inquiryNumber)}
                className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete Inquiry</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openWhatsApp(selectedInquiry)}
                  className="flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp Lead</span>
                </button>

                <button
                  onClick={() => openEmail(selectedInquiry)}
                  className="flex items-center gap-1.5 rounded-lg bg-[#8A1650] hover:bg-[#6e1240] px-3.5 py-1.5 text-xs font-semibold text-white shadow"
                >
                  <Mail className="h-4 w-4" />
                  <span>Send Email</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center text-white">
            <Trash2 className="mx-auto h-8 w-8 text-rose-400 mb-2" />
            <h3 className="text-sm font-bold">Remove Consultation Inquiry?</h3>
            <p className="text-xs text-slate-400 mt-1 mb-5">
              This action will permanently delete this client submission.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="rounded-lg border border-slate-700 px-3.5 py-1.5 text-xs font-medium text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="rounded-lg bg-rose-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-rose-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
