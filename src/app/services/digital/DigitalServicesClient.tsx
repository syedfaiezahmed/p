"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../../components/ui/footer";
import { ConsultingService } from "@/lib/types/inquiryTypes";
import { getStoredServices, fetchAllServices, EVENT_SERVICES_UPDATED } from "@/lib/stores/servicesStore";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function DigitalServicesClient() {
  const [services, setServices] = useState<ConsultingService[]>(() => {
    return getStoredServices().filter(
      (s) => s.active !== false && (s.categorySlug === "digital" || s.category.includes("Digital") || s.category.includes("Transformation") || s.category.includes("ERP") || s.category.includes("Automation") || s.category.includes("Analytics"))
    );
  });

  useEffect(() => {
    fetchAllServices().then((list) => {
      const filtered = list.filter(
        (s) => s.active !== false && (s.categorySlug === "digital" || s.category.includes("Digital") || s.category.includes("Transformation") || s.category.includes("ERP") || s.category.includes("Automation") || s.category.includes("Analytics"))
      );
      setServices(filtered);
    });

    const handleUpdate = (e: any) => {
      const list = e.detail || getStoredServices();
      const filtered = list.filter(
        (s: any) => s.active !== false && (s.categorySlug === "digital" || s.category.includes("Digital") || s.category.includes("Transformation") || s.category.includes("ERP") || s.category.includes("Automation") || s.category.includes("Analytics"))
      );
      setServices(filtered);
    };

    window.addEventListener(EVENT_SERVICES_UPDATED, handleUpdate);
    return () => window.removeEventListener(EVENT_SERVICES_UPDATED, handleUpdate);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-[#1c1032] via-[#2a1a4a] to-[#8a1650] text-white">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#f0c6d8] backdrop-blur-md mb-3 border border-white/20">
            Technology & Systems Advisory
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-3">
            Digital Transformation & <span className="text-[#f0c6d8]">ERP Solutions</span>
          </h1>
          <div className="w-16 h-1 bg-[#f0c6d8] mx-auto my-3 rounded-full"></div>
          <p className="text-white/85 text-sm sm:text-base max-w-2xl mx-auto">
            Cloud accounting infrastructure, ZATCA Phase 2 API integrations, Power BI executive dashboards, and Robotic Process Automation (RPA).
          </p>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2a1a4a] mb-2">
              Technology & Systems Capabilities
            </h2>
            <p className="text-gray-600 text-sm max-w-xl mx-auto">
              Modernizing Saudi business operations with enterprise cloud architecture and automated financial intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={service.slug || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 6) * 0.08 }}
                whileHover={{ y: -6 }}
                className="flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={service.image || service.heroImage || "/images/Bookkeeping Services.jpg"}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  </div>

                  <div className="p-6">
                    <Link href={`/services/${service.slug}`}>
                      <h3 className="text-lg font-bold text-[#2a1a4a] group-hover:text-[#8a1650] transition-colors leading-snug">
                        {service.title}
                      </h3>
                    </Link>
                    <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                      {service.shortDescription}
                    </p>

                    {service.deliverables && service.deliverables.length > 0 && (
                      <div className="mt-4 space-y-1.5 border-t border-gray-100 pt-3">
                        {service.deliverables.slice(0, 2).map((d, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2 text-xs text-gray-700">
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#8a1650] shrink-0 mt-0.5" />
                            <span className="truncate">{d}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-100 bg-[#fbf9fd] px-6 py-3.5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#8a1650]">
                    {service.pricingTier || "Digital Retainer"}
                  </span>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#2a1a4a] hover:text-[#8a1650] transition-colors"
                  >
                    <span>View Architecture</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
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
