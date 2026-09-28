import { ConsultingService } from "@/lib/types/inquiryTypes";
import { servicesData } from "@/data/servicesData";

const SERVICES_STORAGE_KEY = "prospera_consulting_services_v2";
export const EVENT_SERVICES_UPDATED = "prospera_services_updated";

// Convert all 16 services from servicesData into initial seed list
export const initialConsultingServices: ConsultingService[] = Object.values(servicesData).map(
  (s, index) => ({
    id: `serv-${index + 1}`,
    serviceId: s.slug,
    slug: s.slug,
    title: s.title,
    category: s.category,
    categorySlug: s.categorySlug,
    tagline: s.tagline,
    shortDescription: s.shortDescription,
    fullDescription: Array.isArray(s.fullDescription)
      ? s.fullDescription.join("\n\n")
      : s.fullDescription,
    deliverables: s.coreDeliverables || [],
    coreDeliverables: s.coreDeliverables || [],
    keyBenefits: s.keyBenefits || [],
    methodology: s.methodology || [],
    targetAudience: s.targetAudience || [],
    faqs: s.faqs || [],
    relatedSlugs: s.relatedSlugs || [],
    engagementDuration: "Monthly Retainer",
    pricingTier: "Custom Advisory",
    featured: true,
    active: true,
    image: s.heroImage || "/images/Bookkeeping Services.jpg",
    heroImage: s.heroImage || "/images/Bookkeeping Services.jpg",
  })
);

export function getStoredServices(): ConsultingService[] {
  if (typeof window === "undefined") return initialConsultingServices;
  try {
    const raw = localStorage.getItem(SERVICES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(initialConsultingServices));
      return initialConsultingServices;
    }
    const list = JSON.parse(raw);
    if (!Array.isArray(list) || list.length === 0) {
      localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(initialConsultingServices));
      return initialConsultingServices;
    }
    return list;
  } catch {
    return initialConsultingServices;
  }
}

export function saveStoredServices(list: ConsultingService[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent(EVENT_SERVICES_UPDATED, { detail: list }));
  } catch (e) {
    console.error("Error saving services:", e);
  }
}

export async function fetchAllServices(): Promise<ConsultingService[]> {
  try {
    const res = await fetch("/api/services", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.services) && data.services.length > 0) {
        saveStoredServices(data.services);
        return data.services;
      }
    }
  } catch (err) {
    console.warn("Could not fetch remote services, using local store:", err);
  }
  return getStoredServices();
}

export async function createService(service: ConsultingService): Promise<ConsultingService> {
  try {
    const res = await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(service),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.service) {
        const current = getStoredServices();
        const updated = [data.service, ...current.filter((s) => s.slug !== data.service.slug)];
        saveStoredServices(updated);
        return data.service;
      }
    }
  } catch (e) {
    console.warn("API createService failed, saving locally:", e);
  }

  const current = getStoredServices();
  const updated = [service, ...current];
  saveStoredServices(updated);
  return service;
}

export async function updateService(
  id: string | number,
  updates: Partial<ConsultingService>
): Promise<ConsultingService | null> {
  try {
    const res = await fetch(`/api/services/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.service) {
        const current = getStoredServices();
        const updated = current.map((s) =>
          String(s.id) === String(id) || s.slug === String(id) ? { ...s, ...data.service } : s
        );
        saveStoredServices(updated);
        return data.service;
      }
    }
  } catch (e) {
    console.warn("API updateService failed, saving locally:", e);
  }

  const current = getStoredServices();
  const updated = current.map((s) =>
    String(s.id) === String(id) || s.slug === String(id) ? { ...s, ...updates } : s
  );
  saveStoredServices(updated);
  return updated.find((s) => String(s.id) === String(id) || s.slug === String(id)) || null;
}

export async function deleteService(id: string | number): Promise<boolean> {
  try {
    await fetch(`/api/services/${id}`, { method: "DELETE" });
  } catch (e) {
    console.warn("API deleteService failed:", e);
  }

  const current = getStoredServices();
  const filtered = current.filter((s) => String(s.id) !== String(id) && s.slug !== String(id));
  saveStoredServices(filtered);
  return true;
}
