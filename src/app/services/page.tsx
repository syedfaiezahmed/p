"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../components/ui/footer";
import { ConsultingService } from "@/lib/types/inquiryTypes";
import { getStoredServices, fetchAllServices, EVENT_SERVICES_UPDATED } from "@/lib/stores/servicesStore";
import { Search, ArrowRight, CheckCircle2, Sparkles, Filter } from "lucide-react";

export default function ServicesPage() {
  const [services, setServices] = useState<ConsultingService[]>(getStoredServices);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchAllServices().then((list) => {
      setServices(list);
    });

    const handleUpdate = (e: any) => {
      const list = e.detail || getStoredServices();
      setServices(list);
    };

    window.addEventListener(EVENT_SERVICES_UPDATED, handleUpdate);
    return () => window.removeEventListener(EVENT_SERVICES_UPDATED, handleUpdate);
  }, []);

  const categories = ["all", "Financial Services", "Digital Transformation", "Core Accounting"];

  const filteredServices = services
    .filter((s) => s.active !== false)
    .filter((s) => {
      const matchSearch =
        searchQuery.trim() === "" ||
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === "all" ||
        s.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        (selectedCategory === "Financial Services" && s.categorySlug === "financial") ||
        (selectedCategory === "Digital Transformation" && s.categorySlug === "digital");

      return matchSearch && matchCategory;
    });

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-[#2a1a4a] via-[#382460] to-[#8a1650] text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-6 text-center relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#f0c6d8] backdrop-blur-md mb-4 border border-white/20">
              Corporate & Advisory Catalog
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
              Our Practice <span className="text-[#f0c6d8]">Areas</span>
            </h1>
            <div className="w-20 h-1 bg-[#f0c6d8] mx-auto mb-5 rounded-full"></div>
            <p className="text-white/85 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Explore our full spectrum of SOCPA-certified financial advisory, ZATCA e-invoicing compliance, and digital ERP transformation services tailored for Saudi Arabia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-20 z-30 bg-[#fbf9fd]/95 backdrop-blur-md border-y border-gray-200 py-4">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search practice areas or topics..."
                className="w-full rounded-xl border border-gray-300 bg-white py-2 pl-10 pr-4 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:border-[#8a1650] focus:outline-none focus:ring-1 focus:ring-[#8a1650] shadow-xs"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-[#8a1650] text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {cat === "all" ? "All Practice Areas" : cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Services Catalog Grid */}
      <section className="py-14 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Showing <strong className="text-[#2a1a4a] font-bold">{filteredServices.length}</strong> active consulting practice {filteredServices.length === 1 ? "area" : "areas"}
            </p>
          </div>

          {filteredServices.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-xs">
              <p className="text-gray-500 text-sm">No practice areas match your search filter.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-3 text-xs font-bold text-[#8a1650] hover:underline"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredServices.map((service, idx) => (
                <motion.div
                  key={service.slug || service.id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (idx % 6) * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                      <Image
                        src={service.image || service.heroImage || "/images/Bookkeeping Services.jpg"}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="rounded-md bg-white/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#2a1a4a] shadow-xs">
                          {service.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <Link href={`/services/${service.slug}`}>
                        <h3 className="text-lg font-bold text-[#2a1a4a] group-hover:text-[#8a1650] transition-colors leading-snug">
                          {service.title}
                        </h3>
                      </Link>
                      <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                        {service.shortDescription}
                      </p>

                      {/* Deliverables snippet */}
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

                  {/* Card Footer */}
                  <div className="border-t border-gray-100 bg-[#fbf9fd] px-6 py-3.5 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#8a1650]">
                      {service.pricingTier || "Custom Scope"}
                    </span>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#2a1a4a] hover:text-[#8a1650] transition-colors"
                    >
                      <span>Explore Scope</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#2a1a4a] to-[#8a1650] relative overflow-hidden text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <h2 className="text-3xl font-extrabold mb-3">Require a Custom Advisory Retainer?</h2>
          <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto mb-6">
            Our certified partners in Riyadh structure tailored advisory teams and fractional CFO models for enterprise clients.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-7 py-3 text-xs sm:text-sm font-bold text-[#2a1a4a] hover:bg-pink-50 shadow-lg transition-transform hover:scale-105"
            >
              Request Strategy Session
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
