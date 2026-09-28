"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ChartBarIcon,
  ShieldCheckIcon,
  ArrowTrendingUpIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export function AimSection() {
  const features = [
    {
      icon: <ChartBarIcon className="w-5 h-5 text-[#b62166]" />,
      title: "Actionable Insights",
      desc: "Clear data-driven financial intelligence for decisive leadership.",
    },
    {
      icon: <ArrowTrendingUpIcon className="w-5 h-5 text-[#382460]" />,
      title: "Sustainable Growth",
      desc: "Long-term financial models engineered for resilience and expansion.",
    },
    {
      icon: <ShieldCheckIcon className="w-5 h-5 text-[#b62166]" />,
      title: "Client-Centered Focus",
      desc: "Tailored strategies aligned with your unique business goals.",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-[#faf8fc] via-white to-[#fcfaff] overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#b62166]/8 to-[#382460]/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#b62166]/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* ===== LEFT COLUMN: Content & Value Props ===== */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f6ebf2] border border-[#b62166]/20">
              <SparklesIcon className="w-4 h-4 text-[#b62166]" />
              <span className="text-[#b62166] uppercase tracking-wider text-xs font-bold">
                Our Aim & Core Vision
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#382460] leading-tight tracking-tight">
              Financial Innovation <br />
              <span className="bg-gradient-to-r from-[#b62166] to-[#792460] bg-clip-text text-transparent">
                Meeting Strategy
              </span>
            </h2>

            {/* Paragraph 1 */}
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-normal">
              Our firm blends innovative strategies with established best
              practices to support you in achieving your financial objectives.
              We are committed to delivering clear, actionable insights that
              strengthen your decision-making and help you plan confidently for a
              prosperous future.
            </p>

            {/* Paragraph 2 */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Through the use of advanced analysis, industry knowledge, and a
              client-centered approach, we ensure every recommendation is both
              relevant and effective. This combination allows us to provide
              solutions that promote sustainable growth, enhance financial
              resilience, and build long-term confidence in your overall
              financial direction.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid sm:grid-cols-3 gap-4 pt-4">
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-xl shadow-xs border border-gray-100 hover:shadow-md hover:border-[#b62166]/20 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#faf5f8] group-hover:bg-[#f8e1eb] flex items-center justify-center mb-3 transition-colors">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-[#382460] text-sm mb-1 group-hover:text-[#b62166] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-normal">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Link */}
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-[#382460] hover:bg-[#b62166] text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Learn More About Our Methodology</span>
                <span className="text-lg">→</span>
              </Link>
            </div>
          </motion.div>

          {/* ===== RIGHT COLUMN: Showcase Card & Visuals ===== */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative"
          >
            {/* Outer Glow Wrapper */}
            <div className="relative mx-auto max-w-[480px]">
              
              {/* Main Image Frame with Layered Shadow */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-[6px] border-white bg-white group">
                <div className="relative h-[380px] sm:h-[440px] w-full overflow-hidden">
                  <Image
                    src="/images/bookkeeping2.webp"
                    alt="Financial Strategy & Advisory"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#382460]/70 via-transparent to-transparent" />
                  
                  {/* Inside bottom caption */}
                  <div className="absolute bottom-4 left-5 right-5 text-white z-10">
                    <span className="text-xs uppercase tracking-widest text-[#f0c6d8] font-semibold block mb-1">
                      Strategic Execution
                    </span>
                    <h3 className="text-lg font-bold">
                      Financial Strategy & Precision Advisory
                    </h3>
                  </div>
                </div>
              </div>

              {/* Floating Glassmorphism Badge Top Right */}
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute -top-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#382460] to-[#b62166] text-white flex items-center justify-center font-bold text-sm shadow">
                  100%
                </div>
                <div>
                  <p className="text-xs font-bold text-[#382460]">Client Focused</p>
                  <p className="text-[11px] text-gray-500">Tailored Guidance</p>
                </div>
              </motion.div>

              {/* Floating Stats Badge Bottom Left */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-6 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md px-5 py-3.5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3.5 z-20"
              >
                <div className="p-2.5 rounded-xl bg-[#f8e1eb] text-[#b62166]">
                  <ArrowTrendingUpIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#382460]">Proactive Growth</p>
                  <p className="text-[11px] text-gray-500">Measurable Impact</p>
                </div>
              </motion.div>

              {/* Decorative Accent Background Box */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#b62166]/20 rounded-3xl -z-10 hidden sm:block" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
