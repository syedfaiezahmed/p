"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../../components/ui/footer";
import { ConsultingService } from "@/lib/types/inquiryTypes";
import { getStoredServices, fetchAllServices, EVENT_SERVICES_UPDATED } from "@/lib/stores/servicesStore";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

export default function FinancialServicesPage() {
  const [services, setServices] = useState<ConsultingService[]>(() => {
    return getStoredServices().filter(
      (s) => s.active !== false && (s.categorySlug === "financial" || s.category.includes("Financial") || s.category.includes("Accounting") || s.category.includes("Advisory") || s.category.includes("Tax") || s.category.includes("Payroll"))
    );
  });

  useEffect(() => {
    fetchAllServices().then((list) => {
      const filtered = list.filter(
        (s) => s.active !== false && (s.categorySlug === "financial" || s.category.includes("Financial") || s.category.includes("Accounting") || s.category.includes("Advisory") || s.category.includes("Tax") || s.category.includes("Payroll"))
      );
      setServices(filtered);
    });

    const handleUpdate = (e: any) => {
      const list = e.detail || getStoredServices();
      const filtered = list.filter(
        (s: any) => s.active !== false && (s.categorySlug === "financial" || s.category.includes("Financial") || s.category.includes("Accounting") || s.category.includes("Advisory") || s.category.includes("Tax") || s.category.includes("Payroll"))
      );
      setServices(filtered);
    };

    window.addEventListener(EVENT_SERVICES_UPDATED, handleUpdate);
    return () => window.removeEventListener(EVENT_SERVICES_UPDATED, handleUpdate);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-[#2a1a4a] via-[#382460] to-[#8a1650] text-white">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#f0c6d8] backdrop-blur-md mb-3 border border-white/20">
            Certified Consulting Practice
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-3">
            Financial & <span className="text-[#f0c6d8]">Advisory Services</span>
          </h1>
          <div className="w-16 h-1 bg-[#f0c6d8] mx-auto my-3 rounded-full"></div>
          <p className="text-white/85 text-sm sm:text-base max-w-2xl mx-auto">
            SOCPA & ZATCA compliant financial accounting, fractional CFO modeling, corporate tax compliance, and M&A advisory.
          </p>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-[#2a1a4a] mb-2">
              Financial Practice Areas
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#8a1650] to-[#2a1a4a] mx-auto rounded-full mb-3"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Tailored corporate finance solutions designed to accelerate compliance, solvency, and shareholder valuation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={service.slug || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 6) * 0.08 }}
                whileHover={{ y: -6 }}
                className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 border-t-4 border-t-[#8a1650]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="rounded-md bg-[#f8e1eb] px-2.5 py-1 text-[10px] font-bold text-[#8a1650] uppercase tracking-wider">
                      {service.category}
                    </span>
                    <span className="text-xs font-semibold text-gray-500">
                      {service.pricingTier || "Custom"}
                    </span>
                  </div>

                  <Link href={`/services/${service.slug}`}>
                    <h3 className="text-lg font-bold text-[#2a1a4a] hover:text-[#8a1650] transition-colors mb-2">
                      {service.title}
                    </h3>
                  </Link>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                    {service.shortDescription}
                  </p>

                  {service.deliverables && service.deliverables.length > 0 && (
                    <ul className="space-y-1.5 mb-6 border-t border-gray-100 pt-3">
                      {service.deliverables.slice(0, 3).map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start text-xs text-gray-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#8a1650] mt-0.5 mr-2 shrink-0" />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8a1650] hover:text-[#2a1a4a] transition-colors"
                  >
                    <span>View Service Scope</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
