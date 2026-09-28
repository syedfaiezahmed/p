"use client";

import { useBanner } from "@/lib/stores/bannerStore";
import Link from "next/link";
import { Sparkles, ArrowRight, X } from "lucide-react";
import { useState } from "react";

export default function AnnouncementBanner() {
  const { banner } = useBanner();
  const [dismissed, setDismissed] = useState(false);

  if (!banner.active || dismissed || !banner.title) {
    return null;
  }

  return (
    <div className="relative z-40 bg-gradient-to-r from-[#2a1a4a] via-[#4d1f42] to-[#8a1650] px-4 py-2.5 text-white shadow-md">
      <div className="container mx-auto flex max-w-7xl items-center justify-between text-xs">
        <div className="flex flex-1 items-center justify-center gap-2 text-center sm:gap-3">
          <span className="hidden rounded-md bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-pink-200 sm:inline-block">
            Announcement
          </span>
          <p className="font-medium">
            <strong className="font-bold text-white">{banner.title}</strong>
            {banner.subtitle && (
              <span className="hidden text-pink-100/90 sm:inline"> — {banner.subtitle}</span>
            )}
          </p>
          {banner.linkUrl && (
            <Link
              href={banner.linkUrl}
              className="inline-flex items-center gap-1 rounded-full bg-white/20 hover:bg-white/30 px-2.5 py-0.5 font-semibold text-white transition-colors"
            >
              <span>Learn more</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="rounded-lg p-1 text-white/70 hover:bg-white/10 hover:text-white"
          aria-label="Dismiss banner"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
