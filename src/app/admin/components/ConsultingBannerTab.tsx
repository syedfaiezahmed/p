"use client";

import { useState } from "react";
import { ConsultingBanner } from "@/lib/types/inquiryTypes";
import {
  Megaphone,
  Check,
  Link as LinkIcon,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

interface ConsultingBannerTabProps {
  banner: ConsultingBanner;
  onSaveBanner: (banner: ConsultingBanner) => void;
}

export default function ConsultingBannerTab({
  banner,
  onSaveBanner,
}: ConsultingBannerTabProps) {
  const [formData, setFormData] = useState<ConsultingBanner>({ ...banner });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    onSaveBanner({
      ...formData,
      updatedAt: new Date().toISOString(),
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      {/* Overview Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8A1650]/15 text-[#8A1650]">
              <Megaphone className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">
                Top Corporate Announcement & Advisory Bar
              </h2>
              <p className="text-xs text-slate-400">
                Display critical statutory compliance notices (e.g. ZATCA e-invoicing updates) or strategic consulting offers.
              </p>
            </div>
          </div>

          <button
            onClick={() => setFormData((prev) => ({ ...prev, active: !prev.active }))}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              formData.active
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                : "bg-slate-800 text-slate-400 border border-slate-700"
            }`}
          >
            {formData.active ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
            <span>{formData.active ? "Notice Active" : "Disabled"}</span>
          </button>
        </div>
      </div>

      {/* Live Preview */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
          Live Public Header Preview
        </h3>

        <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950 p-5 text-white shadow-inner">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <span className="inline-block rounded-md bg-[#8A1650]/20 border border-[#8A1650]/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#d44d85]">
                Official Notice
              </span>
              <h4 className="font-semibold text-sm sm:text-base text-slate-100 mt-1">
                {formData.title || "Special Q3 Corporate Consulting Offer — Up to 25% Off Advisory Packages"}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {formData.subtitle || "Empower your enterprise with certified financial controllers and real-time ZATCA compliance."}
              </p>
            </div>

            <button className="rounded-xl bg-[#8A1650] hover:bg-[#6e1240] text-white px-4 py-2 text-xs font-semibold shadow-sm shrink-0">
              Explore Advisory
            </button>
          </div>
        </div>
      </div>

      {/* Editor Form */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4 text-xs text-slate-200 shadow-sm">
        <div>
          <label className="block font-medium text-slate-300 mb-1">Headline Text</label>
          <input
            type="text"
            value={formData.title || ""}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. ZATCA Phase 2 E-Invoicing Compliance Review — Free Initial Assessment"
            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:border-[#8A1650] focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-medium text-slate-300 mb-1">Supporting Subtitle / Details</label>
          <input
            type="text"
            value={formData.subtitle || ""}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            placeholder="e.g. Schedule a 30-minute discovery call with our bilingual chartered accountants."
            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:border-[#8A1650] focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-medium text-slate-300 mb-1">Action Link URL</label>
          <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={formData.linkUrl || ""}
              onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
              placeholder="/contact or /services"
              className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-9 pr-4 text-slate-100 placeholder-slate-500 focus:border-[#8A1650] focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          {savedSuccess && (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
              <Check className="h-4 w-4" />
              Corporate banner published successfully!
            </span>
          )}
          <div className="ml-auto">
            <button
              onClick={handleSave}
              className="rounded-xl bg-[#8A1650] hover:bg-[#6e1240] px-6 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors"
            >
              Save & Publish Banner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
