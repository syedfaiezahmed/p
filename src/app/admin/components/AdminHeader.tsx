"use client";

import { Bell, Search, ExternalLink, ShieldCheck, LogOut, RefreshCw } from "lucide-react";
import Link from "next/link";

interface AdminHeaderProps {
  adminUser: string;
  onLogout: () => void;
  onRefresh: () => void;
  unseenCount: number;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

export default function AdminHeader({
  adminUser,
  onLogout,
  onRefresh,
  unseenCount,
  searchQuery,
  setSearchQuery,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-800 bg-slate-900/95 px-4 py-3 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-3">
        <div className="relative hidden w-64 md:block lg:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search inquiries, clients, companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800/80 py-1.5 pl-9 pr-4 text-xs text-white placeholder-slate-400 transition-colors focus:border-[#8A1650] focus:outline-none focus:ring-1 focus:ring-[#8A1650]"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Public Site Link */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/60 px-2.5 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-slate-600 hover:bg-slate-800 hover:text-white"
        >
          <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
          <span className="hidden sm:inline">View Public Website</span>
        </Link>

        {/* Sync / Refresh */}
        <button
          onClick={onRefresh}
          title="Refresh CRM Data"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 transition-colors hover:border-slate-600 hover:text-white"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300">
            <Bell className="h-4 w-4" />
          </div>
          {unseenCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#8A1650] px-1 text-[10px] font-bold text-white shadow">
              {unseenCount}
            </span>
          )}
        </div>

        <div className="h-4 w-[1px] bg-slate-800" />

        {/* Admin Badge */}
        <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-800/80 px-2.5 py-1">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8A1650]/20 text-[#8A1650]">
            <ShieldCheck className="h-3.5 w-3.5" />
          </div>
          <div className="hidden text-left lg:block">
            <p className="text-xs font-semibold leading-none text-white">{adminUser}</p>
            <p className="text-[10px] text-slate-400">Managing Director</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          title="Sign Out"
          className="flex items-center gap-1.5 rounded-lg border border-rose-900/40 bg-rose-950/20 px-2.5 py-1.5 text-xs font-medium text-rose-300 transition-colors hover:bg-rose-900/40 hover:text-white"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
