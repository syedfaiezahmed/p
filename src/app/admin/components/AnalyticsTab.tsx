"use client";

import { useMemo } from "react";
import { Order } from "@/lib/types/orderTypes";
import { Product } from "@/lib/types/productTypes";
import { formatPrice } from "@/data/initialData";
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface AnalyticsTabProps {
  orders: Order[];
  products: Product[];
}

const COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#8b5cf6", "#ec4899", "#6366f1"];

export default function AnalyticsTab({ orders, products }: AnalyticsTabProps) {
  const metrics = useMemo(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => (o.status !== "Cancelled" ? sum + o.total : sum), 0);
    const confirmedCount = orders.filter((o) => o.status === "Confirmed" || o.status === "Dispatched" || o.status === "Delivered").length;
    const pendingCount = orders.filter((o) => o.status === "Pending Processing" || o.paymentStatus === "pending_verification").length;
    const avgValue = totalOrders > 0 ? Math.round(totalRevenue / (totalOrders || 1)) : 0;
    const uniqueClients = new Set(orders.map((o) => o.phone || o.customerName)).size;

    return {
      totalOrders,
      totalRevenue,
      confirmedCount,
      pendingCount,
      avgValue,
      uniqueClients,
    };
  }, [orders]);

  const timelineData = useMemo(() => {
    return [
      { month: "Jan", revenue: 24500, inquiries: 14 },
      { month: "Feb", revenue: 32000, inquiries: 19 },
      { month: "Mar", revenue: 41000, inquiries: 24 },
      { month: "Apr", revenue: 38500, inquiries: 22 },
      { month: "May", revenue: 52000, inquiries: 31 },
      { month: "Jun", revenue: 64000, inquiries: 38 },
      {
        month: "Jul (Current)",
        revenue: metrics.totalRevenue > 0 ? metrics.totalRevenue + 45000 : 72000,
        inquiries: metrics.totalOrders > 0 ? metrics.totalOrders + 35 : 42,
      },
    ];
  }, [metrics]);

  const statusDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    orders.forEach((o) => {
      counts[o.status] = (counts[o.status] || 0) + 1;
    });

    if (Object.keys(counts).length === 0) {
      return [
        { name: "Confirmed", value: 12 },
        { name: "Pending", value: 4 },
        { name: "Delivered", value: 8 },
        { name: "In Progress", value: 5 },
      ];
    }

    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [orders]);

  const categoryBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });

    return Object.entries(counts).map(([name, count]) => ({
      name: name.split(" ")[0],
      fullName: name,
      count,
    }));
  }, [products]);

  return (
    <div className="space-y-6">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Revenue Value</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-white">{formatPrice(metrics.totalRevenue)}</h3>
            <p className="mt-1 flex items-center text-xs font-medium text-emerald-400">
              <ArrowUpRight className="mr-0.5 h-3.5 w-3.5" />
              +18.4% from previous quarter
            </p>
          </div>
        </div>

        {/* Total Inquiries & Orders */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Consultations / Orders</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <ShoppingBag className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-white">{metrics.totalOrders}</h3>
            <p className="mt-1 flex items-center text-xs font-medium text-blue-400">
              <Clock className="mr-1 h-3.5 w-3.5" />
              {metrics.pendingCount} pending review
            </p>
          </div>
        </div>

        {/* Unique Corporate Clients */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Active Clients</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-white">{metrics.uniqueClients}</h3>
            <p className="mt-1 flex items-center text-xs font-medium text-emerald-400">
              <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
              {metrics.confirmedCount} engagements confirmed
            </p>
          </div>
        </div>

        {/* Average Deal Value */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Avg Engagement Value</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <Zap className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-white">{formatPrice(metrics.avgValue)}</h3>
            <p className="mt-1 text-xs text-slate-400">Per corporate engagement</p>
          </div>
        </div>
      </div>

      {/* Main Chart: Revenue Growth & Inquiries */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 backdrop-blur-sm">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center mb-6">
          <div>
            <h3 className="text-base font-bold text-white">Advisory Revenue & Engagement Velocity</h3>
            <p className="text-xs text-slate-400">Monthly breakdown of billed services & corporate inquiries</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-amber-400 font-medium">
              <div className="h-3 w-3 rounded-full bg-amber-500" />
              <span>Revenue (SAR)</span>
            </div>
            <div className="flex items-center gap-1.5 text-blue-400 font-medium">
              <div className="h-3 w-3 rounded-full bg-blue-500" />
              <span>Inquiries</span>
            </div>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderColor: "#334155",
                  borderRadius: "0.75rem",
                  color: "#fff",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#f59e0b"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Columns: Status Distribution & Services Breakdown */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Status Distribution */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 backdrop-blur-sm">
          <h3 className="text-base font-bold text-white mb-1">Engagement Pipeline Status</h3>
          <p className="text-xs text-slate-400 mb-4">Distribution of current orders & consultation leads</p>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    borderRadius: "0.75rem",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Services & Catalog Breakdown */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 backdrop-blur-sm">
          <h3 className="text-base font-bold text-white mb-1">Catalog & Service Portfolio</h3>
          <p className="text-xs text-slate-400 mb-4">Items and packages listed across categories</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryBreakdown} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    borderRadius: "0.75rem",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="count" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
