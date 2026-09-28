"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AimSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#382460] to-[#b62166] py-16 md:py-24 overflow-hidden text-white">
      {/* Subtle decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* ===== Top Heading ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl space-y-3 md:space-y-4 mb-12"
        >
          <span className="text-pink-200 uppercase tracking-widest text-xs sm:text-sm font-semibold inline-block px-3 py-1 bg-white/10 rounded-full">
            Our Aim
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Financial Innovation <br />
            <span className="text-pink-200">Meeting Strategy</span>
          </h2>
        </motion.div>

        {/* ===== Main Content Grid ===== */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* ===== LEFT CONTENT ===== */}
          <div className="space-y-6">
            <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed">
              Our firm blends innovative strategies with established best practices to support you in achieving your financial objectives. We are committed to delivering clear, actionable insights that strengthen your decision-making and help you plan confidently for a prosperous future.
            </p>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Through the use of advanced analysis, industry knowledge, and a client-centered approach, we ensure every recommendation is both relevant and effective. This combination allows us to provide solutions that promote sustainable growth, enhance financial resilience, and build long-term confidence in your overall financial direction.
            </p>
          </div>

          {/* IMAGE */}
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 group">
            <Image
              src="/images/bookkeeping2.webp"
              alt="Financial Strategy"
              width={800}
              height={550}
              className="object-cover w-full h-[320px] sm:h-[380px] group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

