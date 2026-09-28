"use client";

import {
  MessageSquare,
  TrendingUp,
  Briefcase,
  Megaphone,
  Bot,
  Database,
  Shield,
  Layers,
  ChevronRight,
} from "lucide-react";

export type ConsultingTabType =
  | "inquiries"
  | "analytics"
  | "services"
  | "banner"
  | "ai"
  | "data";

interface AdminSidebarProps {
  activeTab: ConsultingTabType;
  setActiveTab: (tab: ConsultingTabType) => void;
  unseenInquiriesCount: number;
  servicesCount: number;
}

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  unseenInquiriesCount,
  servicesCount,
}: AdminSidebarProps) {
  const navItems: Array<{
    id: ConsultingTabType;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number | string;
    badgeColor?: string;
  }> = [
    {
      id: "inquiries",
      label: "Client Inquiries",
      icon: MessageSquare,
      badge: unseenInquiriesCount > 0 ? `${unseenInquiriesCount} New` : undefined,
      badgeColor: "bg-rose-500/20 text-rose-400 border border-rose-500/30",
    },
    {
      id: "analytics",
      label: "Advisory Analytics",
      icon: TrendingUp,
    },
    {
      id: "services",
      label: "Practice Areas",
      icon: Briefcase,
      badge: servicesCount,
      badgeColor: "bg-slate-800 text-slate-400 border border-slate-700",
    },
    {
      id: "banner",
      label: "Announcements",
      icon: Megaphone,
    },
    {
      id: "ai",
      label: "AI Advisor Settings",
      icon: Bot,
      badge: "Gemini",
      badgeColor: "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30",
    },
    {
      id: "data",
      label: "Data & Backups",
      icon: Database,
    },
  ];

  return (
    <aside className="flex w-64 flex-col justify-between border-r border-slate-800 bg-slate-900 px-4 py-6 text-slate-200">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8A1650] text-white shadow-md">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
              PROSPERA
              <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-semibold text-slate-300 border border-slate-700">
                ADMIN
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">Corporate Portal</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-[#8A1650] text-white shadow-sm font-semibold"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`h-4 w-4 transition-colors ${
                      isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] ${
                      isActive ? "bg-black/20 text-white font-bold" : item.badgeColor
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* System Status Footer */}
      <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-left">
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
          <span className="flex items-center gap-1.5 font-medium text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            System Live
          </span>
          <span className="text-[10px] text-slate-500 font-mono">v3.0.0</span>
        </div>
        <p className="text-[10px] text-slate-400">
          Prospera Advisory Central Engine
        </p>
      </div>
    </aside>
  );
}
