"use client";

import { useState } from "react";
import { Order } from "@/lib/types/orderTypes";
import { Product, PromoBanner, AiSettingsState } from "@/lib/types/productTypes";
import {
  Download,
  Upload,
  Database,
  RotateCcw,
  Check,
  AlertTriangle,
  FileSpreadsheet,
  HardDrive,
} from "lucide-react";
import { initialOrders, initialProducts, initialBanner, initialAiSettings } from "@/data/initialData";

interface DataBackupTabProps {
  orders: Order[];
  products: Product[];
  banner: PromoBanner;
  aiSettings: AiSettingsState;
  onRestoreData: (data: {
    orders?: Order[];
    products?: Product[];
    banner?: PromoBanner;
    aiSettings?: AiSettingsState;
  }) => void;
}

export default function DataBackupTab({
  orders,
  products,
  banner,
  aiSettings,
  onRestoreData,
}: DataBackupTabProps) {
  const [exportSuccess, setExportSuccess] = useState(false);
  const [restoreSuccess, setRestoreSuccess] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  const handleExportJSON = () => {
    const fullBackup = {
      version: "2.4.0",
      exportedAt: new Date().toISOString(),
      orders,
      products,
      banner,
      aiSettings,
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `prospera_backup_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
  };

  const handleExportCSV = () => {
    if (orders.length === 0) return;
    const headers = [
      "Order Number",
      "Date",
      "Customer Name",
      "Phone",
      "Email",
      "City",
      "Status",
      "Payment Method",
      "Payment Status",
      "Total (SAR)",
      "Service / Item",
    ];

    const rows = orders.map((o) => [
      `"${o.orderNumber}"`,
      `"${new Date(o.createdAt).toLocaleDateString()}"`,
      `"${o.customerName.replace(/"/g, '""')}"`,
      `"${o.phone}"`,
      `"${o.customerEmail || ""}"`,
      `"${o.city}"`,
      `"${o.status}"`,
      `"${o.paymentMethod}"`,
      `"${o.paymentStatus || ""}"`,
      `"${o.total}"`,
      `"${(o.items[0]?.name || o.serviceType || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `prospera_orders_${new Date().toISOString().slice(0, 10)}.csv`
    );
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
          orders: parsed.orders,
          products: parsed.products,
          banner: parsed.banner,
          aiSettings: parsed.aiSettings,
        });
        setRestoreSuccess(true);
        setTimeout(() => setRestoreSuccess(false), 3000);
      } catch (err) {
        alert("Invalid JSON backup file format.");
      }
    };
    reader.readAsText(file);
  };

  const handleResetToFactory = () => {
    onRestoreData({
      orders: initialOrders,
      products: initialProducts,
      banner: initialBanner,
      aiSettings: initialAiSettings,
    });
    setResetConfirm(false);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">System Data, Backup & Integrity</h2>
            <p className="text-xs text-slate-400">
              Export complete CRM and catalog backups, download CSV logs, or restore previous versions.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Export Card */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/90 p-6 backdrop-blur-sm">
          <div>
            <div className="flex items-center gap-2 text-amber-400">
              <Download className="h-5 w-5" />
              <h3 className="font-bold text-white text-sm">Export Data & Reports</h3>
            </div>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Download your full database snapshot including inquiries, orders, service catalog, promotional banners, and AI model configurations.
            </p>
          </div>

          <div className="mt-6 space-y-2.5">
            <button
              onClick={handleExportJSON}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-2.5 text-xs font-bold text-slate-950 shadow-md shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500"
            >
              <Download className="h-4 w-4" />
              <span>Export Full System Backup (.JSON)</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 py-2.5 text-xs font-semibold text-slate-200 hover:border-amber-500/50 hover:bg-slate-700"
            >
              <FileSpreadsheet className="h-4 w-4 text-emerald-400" />
              <span>Download Inquiries & Orders (.CSV)</span>
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
        <div className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/90 p-6 backdrop-blur-sm">
          <div>
            <div className="flex items-center gap-2 text-blue-400">
              <Upload className="h-5 w-5" />
              <h3 className="font-bold text-white text-sm">Restore from Backup</h3>
            </div>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Upload a previously downloaded JSON backup file to instantly restore all portfolio packages, orders, and configuration.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-600 bg-slate-800/80 py-3 text-xs font-bold text-slate-200 hover:border-amber-500 hover:text-white">
              <Upload className="h-4 w-4 text-amber-400" />
              <span>Choose & Upload Backup JSON File</span>
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

      {/* Danger Zone: Factory Reset */}
      <div className="rounded-2xl border border-rose-900/40 bg-rose-950/20 p-6 backdrop-blur-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-rose-400">
              <AlertTriangle className="h-5 w-5" />
              <h3 className="font-bold text-white text-sm">Reset to Initial Seed Portfolio</h3>
            </div>
            <p className="mt-1 text-xs text-rose-200/70">
              Replaces current browser database with clean Prospera starter packages, demo orders, and default AI prompts.
            </p>
          </div>

          <button
            onClick={() => setResetConfirm(true)}
            className="rounded-xl border border-rose-800 bg-rose-900/60 px-4 py-2 text-xs font-bold text-rose-200 hover:bg-rose-900 hover:text-white"
          >
            Reset Database
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {resetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-rose-900/60 bg-slate-900 p-6 shadow-2xl text-center">
            <RotateCcw className="mx-auto h-10 w-10 text-rose-400 mb-3" />
            <h3 className="text-base font-bold text-white">Reset All Data?</h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              This will restore all inquiries, services, and settings to their default state.
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setResetConfirm(false)}
                className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleResetToFactory}
                className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-500"
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
