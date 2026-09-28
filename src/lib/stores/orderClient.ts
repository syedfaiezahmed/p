import { Order, OrderItem, TrackingStep } from "@/lib/types/orderTypes";
import { initialOrders } from "@/data/initialData";

const ORDERS_STORAGE_KEY = "prospera_admin_orders_v1";
const SEEN_ORDERS_STORAGE_KEY = "prospera_seen_orders_v1";
const EVENT_ORDERS_UPDATED = "prospera_orders_updated";

export function cleanPhone(phone: string): string {
  return phone.replace(/[\s\-\(\)\+]/g, "").trim();
}

function parseNumericPrice(val: any): number {
  if (typeof val === "number") return val;
  if (!val) return 0;
  const cleaned = String(val).replace(/[^0-9.]/g, "");
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : Math.round(num);
}

export function generateClientTracking({
  status,
  createdAt,
}: {
  status: string;
  createdAt: string;
}): TrackingStep[] {
  const dateStr = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return [
    {
      title: "Consultation / Order Received",
      description: "Inquiry or order logged in Prospera Central CRM.",
      time: dateStr,
      completed: true,
      current: status === "Pending Processing" || status === "Pending Verification",
    },
    {
      title: "Verification & Review",
      description: "Requirements verified & consultant assigned.",
      completed:
        status === "Confirmed" ||
        status === "Dispatched" ||
        status === "Out for Delivery" ||
        status === "Delivered",
      current: status === "Confirmed",
    },
    {
      title: "Proposal / Execution Prep",
      description: "Statement of Work or service pack prepared.",
      completed:
        status === "Dispatched" ||
        status === "Out for Delivery" ||
        status === "Delivered",
      current: status === "Dispatched",
    },
    {
      title: "Active Consultation / In Progress",
      description: "Deliverables in progress / items in transit.",
      completed: status === "Out for Delivery" || status === "Delivered",
      current: status === "Out for Delivery",
    },
    {
      title: "Completed / Delivered",
      description: "Consulting engagement concluded or order delivered successfully.",
      completed: status === "Delivered",
      current: status === "Delivered",
    },
  ];
}

export function normalizeOrder(raw: any): Order {
  const subtotal = parseNumericPrice(raw.subtotal || raw.price);
  const shipping = raw.shipping !== undefined ? parseNumericPrice(raw.shipping) : 0;
  const total = raw.total !== undefined ? parseNumericPrice(raw.total) : subtotal + shipping;

  let items: OrderItem[] = [];
  if (Array.isArray(raw.items) && raw.items.length > 0) {
    items = raw.items.map((i: any) => ({
      id: i.id ? String(i.id) : undefined,
      name: String(i.name || "Consulting Service / Item"),
      price: parseNumericPrice(i.price),
      qty: Number(i.qty) || 1,
      image: i.image,
      category: i.category,
    }));
  } else if (raw.serviceType || raw.product) {
    items = [
      {
        name: String(raw.serviceType || raw.product),
        price: subtotal || total,
        qty: 1,
      },
    ];
  }

  const orderNumber = String(raw.orderNumber || raw.id || `PR-${Math.floor(1000 + Math.random() * 9000)}`);
  const status = String(raw.status || "Pending Processing");
  const paymentMethod = String(raw.paymentMethod || "Corporate Bank Transfer");

  let paymentStatus = raw.paymentStatus;
  if (!paymentStatus) {
    if (paymentMethod.toLowerCase().includes("bank") || paymentMethod.toLowerCase().includes("transfer") || paymentMethod.toLowerCase().includes("stc")) {
      paymentStatus = "pending_verification";
    } else {
      paymentStatus = "paid";
    }
  }

  return {
    id: orderNumber,
    orderNumber,
    customerName: String(raw.customerName || raw.name || "Client"),
    phone: String(raw.phone || "+966500000000"),
    customerEmail: raw.customerEmail || raw.email || "",
    address: String(raw.address || "Riyadh, Saudi Arabia"),
    city: String(raw.city || "Riyadh"),
    notes: raw.notes || "",
    serviceType: raw.serviceType || items[0]?.name || "",
    paymentMethod,
    paymentStatus,
    paymentDetails: raw.paymentDetails || null,
    courierName: raw.courierName || "",
    courierTrackingId: raw.courierTrackingId || "",
    courierTrackingUrl: raw.courierTrackingUrl || "",
    items,
    subtotal: subtotal || total,
    shipping,
    total: total || subtotal,
    status: status as any,
    trackingSteps: raw.trackingSteps || generateClientTracking({ status, createdAt: raw.createdAt || new Date().toISOString() }),
    adminSeen: Boolean(raw.adminSeen),
    adminSeenAt: raw.adminSeenAt || null,
    createdAt: String(raw.createdAt || new Date().toISOString()),
  };
}

export function getLocalOrders(): Order[] {
  if (typeof window === "undefined") return initialOrders;
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(initialOrders));
      return initialOrders;
    }
    const list = JSON.parse(raw);
    if (!Array.isArray(list) || list.length === 0) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(initialOrders));
      return initialOrders;
    }
    return list.map(normalizeOrder);
  } catch (e) {
    console.error("Error reading local orders", e);
    return initialOrders;
  }
}

export function saveLocalOrders(orders: Order[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    window.dispatchEvent(new CustomEvent(EVENT_ORDERS_UPDATED, { detail: orders }));
  } catch (e) {
    console.error("Error saving local orders", e);
  }
}

export function saveLocalOrder(order: Order): void {
  const current = getLocalOrders();
  const normalized = normalizeOrder(order);
  const filtered = current.filter((o) => o.orderNumber !== normalized.orderNumber);
  filtered.unshift(normalized);
  saveLocalOrders(filtered);
}

export async function clientListAllOrders(): Promise<Order[]> {
  try {
    const res = await fetch("/api/orders", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.orders) && data.orders.length > 0) {
        const mapped = data.orders.map(normalizeOrder);
        saveLocalOrders(mapped);
        return mapped;
      }
    }
  } catch (e) {
    console.warn("API list orders fallback to local storage:", e);
  }
  return getLocalOrders();
}

export async function clientUpdateOrderStatus(
  orderNumber: string,
  newStatus: string
): Promise<{ success: boolean; order?: Order; error?: string }> {
  try {
    const res = await fetch(`/api/orders/${orderNumber}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.order) {
        const normalized = normalizeOrder(data.order);
        saveLocalOrder(normalized);
        return { success: true, order: normalized };
      }
    }
  } catch (e) {
    console.warn("API update order fallback:", e);
  }

  const all = getLocalOrders();
  const target = all.find((o) => o.orderNumber === orderNumber);
  if (target) {
    target.status = newStatus as any;
    target.trackingSteps = generateClientTracking({ ...target, status: newStatus });
    saveLocalOrder(target);
    return { success: true, order: target };
  }

  return { success: false, error: `Inquiry #${orderNumber} not found.` };
}

export async function clientVerifyPayment(
  orderNumber: string,
  verifiedBy = "Admin Portal"
): Promise<{ success: boolean; order?: Order; message?: string; error?: string }> {
  const all = getLocalOrders();
  const target = all.find((o) => o.orderNumber === orderNumber);
  if (target) {
    target.paymentStatus = "paid";
    target.status = "Confirmed";
    target.paymentDetails = {
      ...(target.paymentDetails || {}),
      verifiedBy,
      verifiedAt: new Date().toISOString(),
      rejectionReason: null,
    };
    target.trackingSteps = generateClientTracking({ ...target, status: "Confirmed" });
    saveLocalOrder(target);
    return { success: true, order: target, message: `Payment verified for Order #${orderNumber}` };
  }

  return { success: false, error: `Order #${orderNumber} not found.` };
}

export async function clientRejectPayment(
  orderNumber: string,
  reason: string
): Promise<{ success: boolean; order?: Order; message?: string; error?: string }> {
  const all = getLocalOrders();
  const target = all.find((o) => o.orderNumber === orderNumber);
  if (target) {
    target.paymentStatus = "rejected";
    target.status = "Cancelled";
    target.paymentDetails = {
      ...(target.paymentDetails || {}),
      rejectionReason: reason,
    };
    target.trackingSteps = generateClientTracking({ ...target, status: "Cancelled" });
    saveLocalOrder(target);
    return { success: true, order: target, message: `Payment rejected for Order #${orderNumber}` };
  }

  return { success: false, error: `Order #${orderNumber} not found.` };
}

export async function clientUpdateCourierTracking(
  orderNumber: string,
  courierName: string,
  courierTrackingId: string,
  courierTrackingUrl?: string
): Promise<{ success: boolean; order?: Order; message?: string; error?: string }> {
  const all = getLocalOrders();
  const target = all.find((o) => o.orderNumber === orderNumber);
  if (target) {
    target.courierName = courierName;
    target.courierTrackingId = courierTrackingId;
    target.courierTrackingUrl = courierTrackingUrl || "";
    saveLocalOrder(target);
    return { success: true, order: target, message: `Tracking updated for #${orderNumber}` };
  }

  return { success: false, error: `Order #${orderNumber} not found.` };
}

export async function clientMarkOrdersSeen(
  orderNumbers?: string[],
  all?: boolean
): Promise<{ success: boolean }> {
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(SEEN_ORDERS_STORAGE_KEY) || "[]";
      let seenIds: string[] = JSON.parse(raw);
      const local = getLocalOrders();

      if (all) {
        local.forEach((o) => {
          o.adminSeen = true;
          o.adminSeenAt = new Date().toISOString();
          if (!seenIds.includes(o.orderNumber)) seenIds.push(o.orderNumber);
        });
      } else if (Array.isArray(orderNumbers)) {
        local.forEach((o) => {
          if (orderNumbers.includes(o.orderNumber)) {
            o.adminSeen = true;
            o.adminSeenAt = new Date().toISOString();
            if (!seenIds.includes(o.orderNumber)) seenIds.push(o.orderNumber);
          }
        });
      }
      localStorage.setItem(SEEN_ORDERS_STORAGE_KEY, JSON.stringify(seenIds));
      saveLocalOrders(local);
    } catch {}
  }
  return { success: true };
}
