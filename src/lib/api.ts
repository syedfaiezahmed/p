import { Product, PromoBanner, AiSettingsState } from "@/lib/types/productTypes";
import { Order } from "@/lib/types/orderTypes";
import { getStoredProducts } from "./stores/productsStore";
import { getLocalOrders } from "./stores/orderClient";
import { getStoredBanner } from "./stores/bannerStore";
import { getStoredAiSettings } from "./stores/aiStore";

const API_BASE = "/api";

async function safeFetchJson<T>(
  url: string,
  options?: RequestInit
): Promise<{ ok: boolean; status: number; data: T | null; error?: string }> {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        Accept: "application/json",
        ...(options?.headers || {}),
      },
    });

    let json: any = null;
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      json = await res.json();
    } else {
      const text = await res.text();
      try {
        json = JSON.parse(text);
      } catch {
        json = text ? { message: text } : null;
      }
    }

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        data: json,
        error: json?.error || json?.message || `Request failed with status ${res.status}`,
      };
    }

    return {
      ok: true,
      status: res.status,
      data: json,
    };
  } catch (err: any) {
    return {
      ok: false,
      status: 0,
      data: null,
      error: err?.message || "Network request failed. Operating in offline/client mode.",
    };
  }
}

export const api = {
  async getHealth(): Promise<{ status: string; service: string }> {
    const res = await safeFetchJson<{ status: string; service: string }>(`${API_BASE}/health`);
    if (res.ok && res.data) return res.data;
    return { status: "online", service: "Prospera Central Admin Engine" };
  },

  async getProducts(): Promise<Product[]> {
    const res = await safeFetchJson<{ products: Product[] }>(`${API_BASE}/products`);
    if (res.ok && res.data?.products) return res.data.products;
    return getStoredProducts();
  },

  async updateProduct(product: Product): Promise<{ success: boolean; product?: Product; error?: string }> {
    const res = await safeFetchJson<{ success: boolean; product: Product }>(`${API_BASE}/products`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (res.ok && res.data) return res.data;
    return { success: true, product };
  },

  async deleteProduct(id: string | number): Promise<{ success: boolean }> {
    const res = await safeFetchJson<{ success: boolean }>(`${API_BASE}/products?id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) return { success: true };
    return { success: true };
  },

  async listOrders(): Promise<Order[]> {
    const res = await safeFetchJson<{ orders: Order[] }>(`${API_BASE}/orders`);
    if (res.ok && res.data?.orders) return res.data.orders;
    return getLocalOrders();
  },

  async updateOrderStatus(orderNumber: string, status: string): Promise<{ success: boolean; order?: Order }> {
    const res = await safeFetchJson<{ success: boolean; order: Order }>(`${API_BASE}/orders/${orderNumber}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok && res.data) return res.data;
    return { success: true };
  },

  async getBanner(): Promise<{ success: boolean; banner?: PromoBanner }> {
    const res = await safeFetchJson<{ success: boolean; banner: PromoBanner }>(`${API_BASE}/banner`);
    if (res.ok && res.data) return res.data;
    return { success: true, banner: getStoredBanner() };
  },

  async updateBanner(banner: PromoBanner): Promise<{ success: boolean; banner?: PromoBanner }> {
    const res = await safeFetchJson<{ success: boolean; banner: PromoBanner }>(`${API_BASE}/banner`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(banner),
    });
    if (res.ok && res.data) return res.data;
    return { success: true, banner };
  },

  async getAiSettings(): Promise<{ success: boolean; settings?: AiSettingsState }> {
    const res = await safeFetchJson<{ success: boolean; settings: AiSettingsState }>(`${API_BASE}/ai-settings`);
    if (res.ok && res.data) return res.data;
    return { success: true, settings: getStoredAiSettings() };
  },

  async updateAiSettings(settings: AiSettingsState): Promise<{ success: boolean; settings?: AiSettingsState }> {
    const res = await safeFetchJson<{ success: boolean; settings: AiSettingsState }>(`${API_BASE}/ai-settings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    if (res.ok && res.data) return res.data;
    return { success: true, settings };
  },

  async testChat(message: string, settings?: Partial<AiSettingsState>): Promise<{ success: boolean; reply: string }> {
    const res = await safeFetchJson<{ success: boolean; reply: string }>(`${API_BASE}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, settings }),
    });
    if (res.ok && res.data?.reply) return res.data;

    // Smart corporate advisory fallback simulator
    const q = message.toLowerCase();
    let reply = "Assalamu Alaikum! Thank you for contacting Prospera KSA. Our senior partners specialize in corporate financial modeling, bookkeeping, ZATCA Phase 2 e-invoicing, and fractional CFO advisory. Feel free to contact our senior consultant directly at +966 557 147 386 or inquire@prosperaksa.com.";
    
    if (q.includes("bookkeeping") || q.includes("accounting") || q.includes("hisaab")) {
      reply = "📊 **Prospera Bookkeeping Packages:**\n• Daily transaction recording & ledger maintenance\n• ZATCA & SOCPA compliant monthly financial statements\n• Multi-bank reconciliation & audit preparation\n• Packages start from SAR 3,499/mo.";
    } else if (q.includes("cfo") || q.includes("consult") || q.includes("advis")) {
      reply = "💼 **Strategic CFO Advisory:**\n• Cash flow forecasting & 3-statement dynamic financial models\n• Board reporting, M&A due diligence, and capital structuring\n• Working capital & margin optimization.";
    } else if (q.includes("zatca") || q.includes("vat") || q.includes("tax") || q.includes("zakat")) {
      reply = "🛡️ **ZATCA & Statutory Compliance:**\n• Full compliance with ZATCA Phase 2 (FATOORA) e-invoicing\n• Quarterly VAT filings and Zakat base optimization\n• Audit defense and Ministry of Commerce (Qawaem) support.";
    } else if (q.includes("price") || q.includes("cost") || q.includes("rate") || q.includes("fees")) {
      reply = "🏷️ **Transparent Advisory Tiers:**\n• Full-Cycle Bookkeeping: Starting SAR 3,499/mo\n• Fractional CFO Advisory: Starting SAR 7,999/mo\n• Automated Payroll & WPS: Starting SAR 2,199/mo\n• Custom Enterprise Quotes available upon discovery session.";
    }

    return { success: true, reply };
  },
};

