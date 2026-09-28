"use client";

import { useState } from "react";
import { InquiryItem, ConsultingService, ConsultingBanner } from "@/lib/types/inquiryTypes";
import { AiSettingsState } from "@/lib/types/productTypes";
import {
  Download,
  Upload,
  Database,
  RotateCcw,
  Check,
  AlertTriangle,
  FileSpreadsheet,
  Server,
} from "lucide-react";
import { initialConsultingInquiries } from "@/lib/stores/inquiryStore";
import { initialConsultingServices } from "@/lib/stores/servicesStore";
import { initialAiSettings } from "@/data/initialData";

interface SystemDataTabProps {
  inquiries: InquiryItem[];
  services: ConsultingService[];
  banner: ConsultingBanner;
  aiSettings: AiSettingsState;
  onRestoreData: (data: {
    inquiries?: InquiryItem[];
    services?: ConsultingService[];
    banner?: ConsultingBanner;
    aiSettings?: AiSettingsState;
  }) => void;
}

export default function SystemDataTab({
  inquiries,
  services,
  banner,
  aiSettings,
  onRestoreData,
}: SystemDataTabProps) {
  const [exportSuccess, setExportSuccess] = useState(false);
  const [restoreSuccess, setRestoreSuccess] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  const handleExportJSON = () => {
    const backupData = {
      version: "3.0.0-consulting",
      type: "prospera-enterprise-crm",
      exportedAt: new Date().toISOString(),
      inquiries,
      services,
      banner,
      aiSettings,
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const a = document.createElement("a");
    a.setAttribute("href", dataStr);
    a.setAttribute("download", `prospera_crm_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(a);
    a.click();
    a.remove();

    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
  };

  const handleExportCSV = () => {
    if (inquiries.length === 0) return;
    const headers = [
      "Inquiry Ref",
      "Date",
      "Client Name",
      "Company",
      "Email",
      "Phone",
      "Practice Area",
      "Lead Status",
      "Message",
      "Internal Notes",
    ];

    const rows = inquiries.map((i) => [
      `"${i.inquiryNumber}"`,
      `"${new Date(i.createdAt).toLocaleDateString()}"`,
      `"${i.fullName.replace(/"/g, '""')}"`,
      `"${(i.company || "").replace(/"/g, '""')}"`,
      `"${i.email}"`,
      `"${i.phone || ""}"`,
      `"${i.service}"`,
      `"${i.status}"`,
      `"${i.message.replace(/"/g, '""')}"`,
      `"${(i.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const uri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", uri);
    link.setAttribute("download", `prospera_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        onRestoreData({
          inquiries: parsed.inquiries,
          services: parsed.services,
          banner: parsed.banner,
          aiSettings: parsed.aiSettings,
        });
        setRestoreSuccess(true);
        setTimeout(() => setRestoreSuccess(false), 3000);
      } catch (err) {
        alert("Invalid Prospera JSON backup file format.");
      }
    };
    reader.readAsText(file);
  };

  const handleResetToDefaults = () => {
    onRestoreData({
      inquiries: initialConsultingInquiries,
      services: initialConsultingServices,
      aiSettings: initialAiSettings,
    });
    setResetConfirm(false);
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8A1650]/15 text-[#8A1650]">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">Database & System Data Integrity</h2>
            <p className="text-xs text-slate-400">
              MongoDB sync architecture, full CRM snapshot exports, and client CSV logs.
            </p>
          </div>
        </div>
      </div>

      {/* MongoDB Status Box */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-100 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <Server className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                Database Engine
              </span>
              <h3 className="font-semibold text-sm text-white">MongoDB Native Adapter & Fallback Cache</h3>
            </div>
          </div>

          <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Backend Ready for URI
          </span>
        </div>

        <p className="mt-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800 pt-3">
          Your backend connector in <code className="text-[#8A1650] font-mono bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">src/lib/db.ts</code> is pre-wired to connect automatically as soon as you provide your <strong className="text-slate-200 font-mono">MONGODB_URI</strong> in <code className="text-[#8A1650] font-mono bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">.env</code>. All inquiries, services, and AI prompts will synchronize with your live cloud database.
        </p>
      </div>

      {/* Export & Restore Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Export Card */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-slate-300">
              <Download className="h-5 w-5 text-[#8A1650]" />
              <h3 className="font-semibold text-white text-sm">Export CRM & Inquiries</h3>
            </div>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Generate full JSON backup snapshots or download clean CSV contact spreadsheets for reporting.
            </p>
          </div>

          <div className="mt-6 space-y-2.5">
            <button
              onClick={handleExportJSON}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#8A1650] hover:bg-[#6e1240] py-2.5 text-xs font-semibold text-white shadow-sm transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export Full CRM Backup (.JSON)</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 py-2.5 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <FileSpreadsheet className="h-4 w-4 text-emerald-400" />
              <span>Download Inquiries Spreadsheet (.CSV)</span>
            </button>

            {exportSuccess && (
              <p className="flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-400 pt-1">
                <Check className="h-4 w-4" />
                Snapshot generated & downloaded!
              </p>
            )}
          </div>
        </div>

        {/* Restore Card */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-slate-300">
              <Upload className="h-5 w-5 text-indigo-400" />
              <h3 className="font-semibold text-white text-sm">Restore from Backup</h3>
            </div>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Upload a previously exported JSON backup file to instantly populate your dashboard and practice areas.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-700 bg-slate-950 py-3 text-xs font-semibold text-slate-300 hover:border-[#8A1650] hover:text-white transition-colors">
              <Upload className="h-4 w-4 text-[#8A1650]" />
              <span>Select Backup JSON File</span>
              <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            </label>

            {restoreSuccess && (
              <p className="flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-400">
                <Check className="h-4 w-4" />
                Data restored successfully!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Reset Default */}
      <div className="rounded-2xl border border-rose-900/30 bg-rose-950/20 p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-rose-400">
              <AlertTriangle className="h-5 w-5" />
              <h3 className="font-semibold text-white text-sm">Reset to Initial Prospera Data</h3>
            </div>
            <p className="mt-1 text-xs text-rose-300/70">
              Restores clean default consultation inquiries, accounting services, and AI training prompts.
            </p>
          </div>

          <button
            onClick={() => setResetConfirm(true)}
            className="rounded-xl border border-rose-800 bg-rose-900/40 px-4 py-2 text-xs font-semibold text-rose-200 hover:bg-rose-900 transition-colors"
          >
            Reset Database
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {resetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center text-slate-100 shadow-2xl">
            <RotateCcw className="mx-auto h-10 w-10 text-rose-400 mb-3" />
            <h3 className="text-base font-semibold text-white">Reset All Data?</h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              This will restore all inquiries and services to clean initial state.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setResetConfirm(false)}
                className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleResetToDefaults}
                className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-500"
              >
                Yes, Reset Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
