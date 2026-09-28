"use client";

import { useState, useEffect, useCallback } from "react";
import AdminLogin from "./components/AdminLogin";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar, { ConsultingTabType } from "./components/AdminSidebar";
import InquiriesTab from "./components/InquiriesTab";
import ConsultingAnalyticsTab from "./components/ConsultingAnalyticsTab";
import ServicesTab from "./components/ServicesTab";
import ConsultingBannerTab from "./components/ConsultingBannerTab";
import TrainAiTab from "./components/TrainAiTab";
import SystemDataTab from "./components/SystemDataTab";

import { InquiryItem, ConsultingService, ConsultingBanner } from "@/lib/types/inquiryTypes";
import { AiSettingsState } from "@/lib/types/productTypes";
import {
  getStoredInquiries,
  saveStoredInquiries,
  fetchAllInquiries,
  markInquiriesSeen,
} from "@/lib/stores/inquiryStore";
import {
  getStoredServices,
  saveStoredServices,
  fetchAllServices,
  createService,
  updateService,
  deleteService,
} from "@/lib/stores/servicesStore";
import { useBanner } from "@/lib/stores/bannerStore";
import { useAiSettings } from "@/lib/stores/aiStore";
import { api } from "@/lib/api";

const AUTH_KEY = "prospera_admin_auth_session";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<string>("Managing Partner");
  const [activeTab, setActiveTab] = useState<ConsultingTabType>("inquiries");
  const [searchQuery, setSearchQuery] = useState("");
  const [inquiries, setInquiries] = useState<InquiryItem[]>(getStoredInquiries);
  const [services, setServices] = useState<ConsultingService[]>(getStoredServices);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { banner, notifyBannerUpdate } = useBanner();
  const { aiSettings, notifyAiUpdate } = useAiSettings();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAuth = localStorage.getItem(AUTH_KEY);
      if (savedAuth) {
        setIsAuthenticated(true);
        setAdminUser(savedAuth);
      }
    }
  }, []);

  const refreshServices = useCallback(async () => {
    const list = await fetchAllServices();
    setServices(list);
  }, []);

  const refreshInquiries = useCallback(async () => {
    const list = await fetchAllInquiries();
    setInquiries(list);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      refreshInquiries();
      refreshServices();
    }
  }, [isAuthenticated, refreshInquiries, refreshServices]);

  const handleLoginSuccess = (user: string) => {
    setIsAuthenticated(true);
    setAdminUser(user);
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_KEY, user);
    }
    showToast(`Welcome back, ${user}!`);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_KEY);
    }
  };

  const handleSaveService = async (service: ConsultingService) => {
    const existing = [...services];
    const idx = existing.findIndex((s) => String(s.id) === String(service.id) || s.slug === service.slug);
    if (idx !== -1) {
      await updateService(service.id || service.slug, service);
    } else {
      await createService(service);
    }
    await refreshServices();
    showToast("Practice area synchronized with cloud database!");
  };

  const handleDeleteService = async (id: string | number) => {
    await deleteService(id);
    await refreshServices();
    showToast("Practice area removed from catalog.");
  };

  const handleSaveBanner = async (newBanner: ConsultingBanner) => {
    notifyBannerUpdate({
      imageUrl: newBanner.imageUrl || "/assets/banner.webp",
      linkUrl: newBanner.linkUrl,
      title: newBanner.title,
      subtitle: newBanner.subtitle,
      active: newBanner.active,
      updatedAt: new Date().toISOString(),
    });
    showToast("Corporate announcement banner published!");
  };

  const handleSaveAiSettings = async (newSettings: AiSettingsState) => {
    notifyAiUpdate(newSettings);
    await api.updateAiSettings(newSettings);
    showToast("AI corporate instructions deployed live!");
  };

  const handleRestoreData = (data: {
    inquiries?: InquiryItem[];
    services?: ConsultingService[];
    banner?: ConsultingBanner;
    aiSettings?: AiSettingsState;
  }) => {
    if (data.inquiries) {
      saveStoredInquiries(data.inquiries);
      setInquiries(data.inquiries);
    }
    if (data.services) {
      saveStoredServices(data.services);
      setServices(data.services);
    }
    if (data.aiSettings) {
      notifyAiUpdate(data.aiSettings);
    }
    showToast("Prospera database successfully restored!");
  };

  const unseenCount = inquiries.filter((i) => !i.adminSeen).length;

  useEffect(() => {
    if (activeTab === "inquiries" && unseenCount > 0) {
      markInquiriesSeen(true);
      setInquiries((prev) => prev.map((i) => ({ ...i, adminSeen: true })));
    }
  }, [activeTab, unseenCount]);

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 font-sans text-slate-100 antialiased">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl border border-slate-700 bg-slate-900/95 px-4 py-3 text-xs font-semibold text-slate-200 shadow-2xl backdrop-blur-md">
          {toastMessage}
        </div>
      )}

      {/* Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unseenInquiriesCount={unseenCount}
        servicesCount={services.length}
      />

      {/* Main Viewport */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <AdminHeader
          adminUser={adminUser}
          onLogout={handleLogout}
          onRefresh={() => {
            refreshInquiries();
            showToast("Inquiries & CRM data refreshed.");
          }}
          unseenCount={unseenCount}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-950">
          {activeTab === "inquiries" && (
            <InquiriesTab
              inquiries={inquiries}
              onRefresh={refreshInquiries}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}

          {activeTab === "analytics" && (
            <ConsultingAnalyticsTab inquiries={inquiries} services={services} />
          )}

          {activeTab === "services" && (
            <ServicesTab
              services={services}
              onSaveService={handleSaveService}
              onDeleteService={handleDeleteService}
            />
          )}

          {activeTab === "banner" && (
            <ConsultingBannerTab
              banner={{
                title: banner.title || "Special Q3 Corporate Advisory Offer",
                subtitle: banner.subtitle || "ZATCA e-invoicing Phase 2 compliance & CFO advisory.",
                linkUrl: banner.linkUrl || "/services",
                imageUrl: banner.imageUrl,
                active: banner.active,
              }}
              onSaveBanner={handleSaveBanner}
            />
          )}

          {activeTab === "ai" && (
            <TrainAiTab
              aiSettings={aiSettings}
              onSaveAiSettings={handleSaveAiSettings}
            />
          )}

          {activeTab === "data" && (
            <SystemDataTab
              inquiries={inquiries}
              services={services}
              banner={{
                title: banner.title || "",
                subtitle: banner.subtitle || "",
                linkUrl: banner.linkUrl || "/services",
                active: banner.active,
              }}
              aiSettings={aiSettings}
              onRestoreData={handleRestoreData}
            />
          )}
        </main>
      </div>
    </div>
  );
}
