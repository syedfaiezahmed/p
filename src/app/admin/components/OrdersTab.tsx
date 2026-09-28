"use client";

import { useState } from "react";
import { Order } from "@/lib/types/orderTypes";
import { formatPrice } from "@/data/initialData";
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  AlertCircle,
  Phone,
  MessageCircle,
  Eye,
  Edit,
  ExternalLink,
  ChevronDown,
  ShieldCheck,
  X,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  Send,
  FileText,
} from "lucide-react";
import {
  clientUpdateOrderStatus,
  clientVerifyPayment,
  clientRejectPayment,
  clientUpdateCourierTracking,
} from "@/lib/stores/orderClient";

interface OrdersTabProps {
  orders: Order[];
  onRefresh: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const ORDER_STATUSES = [
  "Pending Processing",
  "Confirmed",
  "Dispatched",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

export default function OrdersTab({
  orders,
  onRefresh,
  searchQuery,
  setSearchQuery,
}: OrdersTabProps) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Tracking modal
  const [trackingModalOrder, setTrackingModalOrder] = useState<Order | null>(null);
  const [courierName, setCourierName] = useState("SMSA Express");
  const [courierTrackingId, setCourierTrackingId] = useState("");
  const [courierTrackingUrl, setCourierTrackingUrl] = useState("");

  // Reject modal
  const [rejectModalOrder, setRejectModalOrder] = useState<Order | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  // Filtered orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.includes(searchQuery) ||
      (order.customerEmail && order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())) ||
      order.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesPayment = paymentFilter === "all" || order.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const handleStatusChange = async (orderNumber: string, newStatus: string) => {
    await clientUpdateOrderStatus(orderNumber, newStatus);
    onRefresh();
  };

  const handleVerifyPayment = async (orderNumber: string) => {
    await clientVerifyPayment(orderNumber, "Master Admin");
    onRefresh();
    if (selectedOrder && selectedOrder.orderNumber === orderNumber) {
      setSelectedOrder({ ...selectedOrder, paymentStatus: "paid", status: "Confirmed" });
    }
  };

  const handleRejectPayment = async () => {
    if (!rejectModalOrder) return;
    await clientRejectPayment(rejectModalOrder.orderNumber, rejectReason || "Payment screenshot not matching or unverified.");
    setRejectModalOrder(null);
    setRejectReason("");
    onRefresh();
  };

  const handleSaveTracking = async () => {
    if (!trackingModalOrder) return;
    await clientUpdateCourierTracking(
      trackingModalOrder.orderNumber,
      courierName,
      courierTrackingId,
      courierTrackingUrl
    );
    setTrackingModalOrder(null);
    setCourierTrackingId("");
    setCourierTrackingUrl("");
    onRefresh();
  };

  const openWhatsApp = (order: Order) => {
    const cleanNum = order.phone.replace(/[^0-9]/g, "");
    const msg = encodeURIComponent(
      `Assalamu Alaikum ${order.customerName},\n\nThis is Prospera KSA Advisory regarding your inquiry/order #${order.orderNumber}.\n\nStatus: ${order.status}\nService/Item: ${order.items[0]?.name || "Corporate Advisory"}\nTotal: ${formatPrice(order.total)}\n\nHow can we best support you today?`
    );
    window.open(`https://wa.me/${cleanNum}?text=${msg}`, "_blank");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Pending Processing":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Dispatched":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Out for Delivery":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
      case "Delivered":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "Cancelled":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-4 sm:flex-row sm:items-center sm:justify-between backdrop-blur-sm">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by ID, client name, phone, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800/90 py-2 pl-9 pr-4 text-xs text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 focus:border-amber-500 focus:outline-none"
          >
            <option value="all">All Engagement Statuses</option>
            {ORDER_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Payment Status Filter */}
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 focus:border-amber-500 focus:outline-none"
          >
            <option value="all">All Payment Statuses</option>
            <option value="paid">Verified Paid</option>
            <option value="pending_verification">Pending Verification</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 bg-slate-950/60 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-4 py-3.5">ID / Ref</th>
                <th className="px-4 py-3.5">Client & Contact</th>
                <th className="px-4 py-3.5">Service / Scope</th>
                <th className="px-4 py-3.5">Amount & Payment</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No matching inquiries or orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order.orderNumber}
                    className="transition-colors hover:bg-slate-800/40"
                  >
                    <td className="px-4 py-3.5 font-mono font-medium text-white">
                      <div className="flex items-center gap-1.5">
                        {!order.adminSeen && (
                          <span className="h-2 w-2 rounded-full bg-amber-400" />
                        )}
                        <span>{order.orderNumber}</span>
                      </div>
                      <span className="text-[10px] text-slate-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-slate-200">{order.customerName}</div>
                      <div className="text-[11px] text-slate-400">{order.phone}</div>
                      <div className="text-[10px] text-slate-500">{order.city}</div>
                    </td>

                    <td className="px-4 py-3.5 max-w-[220px]">
                      <div className="truncate font-medium text-slate-300">
                        {order.items[0]?.name || order.serviceType || "Consulting Package"}
                      </div>
                      {order.items.length > 1 && (
                        <span className="text-[10px] text-amber-400">
                          +{order.items.length - 1} more items
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="font-bold text-white">{formatPrice(order.total)}</div>
                      <div className="mt-0.5">
                        {order.paymentStatus === "paid" ? (
                          <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                            <CheckCircle2 className="h-2.5 w-2.5" />
                            Paid
                          </span>
                        ) : order.paymentStatus === "pending_verification" ? (
                          <span className="inline-flex items-center gap-1 rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-amber-400">
                            <Clock className="h-2.5 w-2.5" />
                            Verify Pay
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded bg-slate-500/10 px-1.5 py-0.5 text-[10px] text-slate-400">
                            {order.paymentMethod}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.orderNumber, e.target.value)}
                        className={`rounded-lg border px-2.5 py-1 text-xs font-semibold focus:outline-none ${getStatusBadge(
                          order.status
                        )}`}
                      >
                        {ORDER_STATUSES.map((s) => (
                          <option key={s} value={s} className="bg-slate-900 text-white">
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* WhatsApp button */}
                        <button
                          onClick={() => openWhatsApp(order)}
                          title="Open WhatsApp Client Chat"
                          className="flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-900/50 bg-emerald-950/40 text-emerald-400 transition-colors hover:bg-emerald-900/60"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                        </button>

                        {/* View details */}
                        <button
                          onClick={() => setSelectedOrder(order)}
                          title="View Full Engagement Dossier"
                          className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 transition-colors hover:border-amber-500/50 hover:text-white"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>

                        {/* Assign courier/tracking */}
                        <button
                          onClick={() => {
                            setTrackingModalOrder(order);
                            setCourierName(order.courierName || "SMSA Express");
                            setCourierTrackingId(order.courierTrackingId || "");
                            setCourierTrackingUrl(order.courierTrackingUrl || "");
                          }}
                          title="Assign Logistics / Tracking"
                          className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-blue-400 transition-colors hover:border-blue-500/50"
                        >
                          <Truck className="h-3.5 w-3.5" />
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

      {/* Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
              <FileText className="h-5 w-5 text-amber-400" />
              <div>
                <h3 className="text-base font-bold text-white">
                  Engagement Ref #{selectedOrder.orderNumber}
                </h3>
                <p className="text-xs text-slate-400">
                  Logged on {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Client Profile */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                  Client Profile & Contact
                </h4>
                <div className="space-y-2 text-xs">
                  <p className="font-semibold text-white">{selectedOrder.customerName}</p>
                  <p className="flex items-center gap-1.5 text-slate-300">
                    <Phone className="h-3.5 w-3.5 text-slate-400" />
                    {selectedOrder.phone}
                  </p>
                  {selectedOrder.customerEmail && (
                    <p className="flex items-center gap-1.5 text-slate-300">
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      {selectedOrder.customerEmail}
                    </p>
                  )}
                  <p className="flex items-center gap-1.5 text-slate-300">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    {selectedOrder.address}, {selectedOrder.city}
                  </p>
                </div>
              </div>

              {/* Payment & Financial Info */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                  Billing & Settlement
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Payment Method:</span>
                    <span className="font-semibold text-white">{selectedOrder.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Payment Status:</span>
                    <span className="font-bold text-amber-400 uppercase">
                      {selectedOrder.paymentStatus || "Pending"}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-slate-800 pt-2">
                    <span className="text-slate-300 font-bold">Total Invoiced:</span>
                    <span className="font-bold text-emerald-400 text-sm">
                      {formatPrice(selectedOrder.total)}
                    </span>
                  </div>

                  {selectedOrder.paymentStatus === "pending_verification" && (
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => handleVerifyPayment(selectedOrder.orderNumber)}
                        className="flex-1 rounded-lg bg-emerald-600 py-1.5 text-xs font-bold text-white hover:bg-emerald-500"
                      >
                        Approve Payment
                      </button>
                      <button
                        onClick={() => {
                          setRejectModalOrder(selectedOrder);
                        }}
                        className="rounded-lg bg-rose-900/60 px-3 py-1.5 text-xs font-bold text-rose-300 hover:bg-rose-900"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Engagement Items */}
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Contracted Services & Deliverables
              </h4>
              <div className="divide-y divide-slate-800 rounded-xl border border-slate-800 bg-slate-950/50">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 text-xs">
                    <div>
                      <p className="font-semibold text-white">{item.name}</p>
                      <p className="text-[11px] text-slate-400">Qty: {item.qty}</p>
                    </div>
                    <p className="font-bold text-white">{formatPrice(item.price * item.qty)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            {selectedOrder.notes && (
              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/50 p-3 text-xs text-slate-300">
                <span className="font-semibold text-amber-400">Client Scope / Request Notes: </span>
                {selectedOrder.notes}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Courier / Tracking Assignment Modal */}
      {trackingModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-1">
              Assign Courier & Tracking #{trackingModalOrder.orderNumber}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Enter courier partner details for customer live tracking timeline.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Logistics Courier Partner
                </label>
                <select
                  value={courierName}
                  onChange={(e) => setCourierName(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="SMSA Express">SMSA Express (Saudi Arabia)</option>
                  <option value="DHL Express">DHL Express GCC</option>
                  <option value="Aramex">Aramex Corporate</option>
                  <option value="Trax Logistics">Trax Express Logistics</option>
                  <option value="TCS Express">TCS Express</option>
                  <option value="Leopards Courier">Leopards Courier</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Airway Bill / Tracking ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. SMSA-992140294"
                  value={courierTrackingId}
                  onChange={(e) => setCourierTrackingId(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Custom Tracking URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://smsaexpress.com/track/..."
                  value={courierTrackingUrl}
                  onChange={(e) => setCourierTrackingUrl(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="mt-6 flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setTrackingModalOrder(null)}
                  className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveTracking}
                  className="rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400"
                >
                  Save Tracking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Payment Modal */}
      {rejectModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <h3 className="text-base font-bold text-rose-400 mb-1">
              Reject Settlement for #{rejectModalOrder.orderNumber}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Specify reason for audit logs and client notification.
            </p>

            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g. Bank reference not recognized or transaction mismatch..."
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-xs text-white focus:border-rose-500 focus:outline-none"
            />

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setRejectModalOrder(null)}
                className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectPayment}
                className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-500"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
