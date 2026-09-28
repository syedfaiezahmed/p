"use client";

import { useState } from "react";
import { PromoBanner } from "@/lib/types/productTypes";
import {
  Image as ImageIcon,
  UploadCloud,
  Check,
  Sparkles,
  Link as LinkIcon,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { optimizeImageFile } from "@/lib/stores/productsStore";

interface BannerTabProps {
  banner: PromoBanner;
  onSaveBanner: (banner: PromoBanner) => void;
}

export default function BannerTab({ banner, onSaveBanner }: BannerTabProps) {
  const [formData, setFormData] = useState<PromoBanner>({ ...banner });
  const [isUploading, setIsUploading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const optimized = await optimizeImageFile(file, 1600, 0.85);
      setFormData((prev) => ({ ...prev, imageUrl: optimized }));
    } catch (err) {
      console.error("Banner optimize error:", err);
    } finally {
      setIsUploading(false);
    }
  };

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
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              <ImageIcon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Top Promotional Campaign Banner</h2>
              <p className="text-xs text-slate-400">
                Display strategic announcements and special promos across the public portal header.
              </p>
            </div>
          </div>

          <button
            onClick={() => setFormData((prev) => ({ ...prev, active: !prev.active }))}
            className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              formData.active
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                : "bg-slate-800 text-slate-400 border border-slate-700"
            }`}
          >
            {formData.active ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
            <span>{formData.active ? "Banner Active" : "Disabled"}</span>
          </button>
        </div>
      </div>

      {/* Preview Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 backdrop-blur-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Live Header Preview
        </h3>

        <div className="relative overflow-hidden rounded-xl border border-slate-700 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 p-4 text-white shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <span className="inline-block rounded bg-black/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-200">
                Announcement
              </span>
              <h4 className="font-bold text-sm sm:text-base mt-1">
                {formData.title || "Special Q3 Corporate Advisory Offer"}
              </h4>
              <p className="text-xs text-amber-100/90 mt-0.5">
                {formData.subtitle || "Unlock high-impact financial clarity with certified controllers."}
              </p>
            </div>

            <button className="rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-slate-950 shadow hover:bg-amber-100">
              Explore Offer
            </button>
          </div>
        </div>
      </div>

      {/* Editor Form */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 backdrop-blur-sm space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-300 mb-1">Headline Text</label>
          <input
            type="text"
            value={formData.title || ""}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Special Q3 Corporate Consulting Offer — Up to 25% Off"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-300 mb-1">Supporting Subtitle / Details</label>
          <input
            type="text"
            value={formData.subtitle || ""}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            placeholder="e.g. Complimentary audit review with your first engagement."
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-300 mb-1">Target Action Link</label>
          <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={formData.linkUrl || ""}
              onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
              placeholder="/services or /contact"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2 pl-9 pr-4 text-white focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Banner Graphic upload */}
        <div>
          <label className="block font-semibold text-slate-300 mb-1">Banner Background Graphic</label>
          <div className="flex items-center gap-4">
            {formData.imageUrl && (
              <img
                src={formData.imageUrl}
                alt="Banner Graphic"
                className="h-16 w-32 rounded-xl object-cover border border-slate-700"
              />
            )}
            <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-slate-600 bg-slate-800/60 px-4 py-3 hover:border-amber-500">
              <UploadCloud className="h-4 w-4 text-amber-400" />
              <span className="text-slate-300">
                {isUploading ? "Processing..." : "Upload New High-Res Banner"}
              </span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          {savedSuccess && (
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
              <Check className="h-4 w-4" />
              Banner settings updated successfully!
            </span>
          )}
          <div className="ml-auto">
            <button
              onClick={handleSave}
              className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-2.5 text-xs font-bold text-slate-950 shadow-md shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500"
            >
              Publish Banner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
