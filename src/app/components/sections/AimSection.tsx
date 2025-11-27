"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AimSection() {
  return (
    <section className="relative bg-white py-16 md:py-24 overflow-hidden">

      {/* ✅ WHITE HR 3px AT SECTION START */}
      <hr className="absolute top-0 left-0 w-full border-t-[3px] border-white z-20" />

      {/* ✅ PINK RECTANGLE — 50% HEIGHT OVER WHITE BG */}
      <div className="absolute top-0 left-0 w-full h-[70%] bg-gradient-to-br from-[#382460] to-[#b62166] z-0" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">

        {/* ===== Top Heading ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl space-y-3 md:space-y-4"
        >
          <span className="text-white uppercase tracking-widest text-xs sm:text-sm font-semibold">
            — Our Aim
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Financial innovation <br /> meeting strategy
          </h2>
        </motion.div>

        {/* ===== Main Content Grid ===== */}
        <div className="grid lg:grid-cols-2 gap-12 mt-12 items-start">

          {/* ===== LEFT CONTENT ===== */}
          <div className="space-y-8">

            <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
              Our firm blends innovative strategies with established best
              practices to support you in achieving your financial objectives.
              We are committed to delivering clear, actionable insights that
              strengthen your decision-making and help you plan confidently for
              a prosperous future.
            </p>

            {/* IMAGE */}
            <div className="relative w-full max-w-xl rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/bookkeeping2.webp"
                alt="Financial Strategy"
                width={800}
                height={600}
                className="object-cover w-full h-auto"
                priority
              />
            </div>
          </div>

          {/* ===== RIGHT CONTENT (UPPER) ===== */}
          <div className="lg:pt-10">
            <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
              With a strong foundation in financial expertise, we provide
              tailored consulting services to help you achieve your financial
              goals. Our focus is on delivering strategic advice that not only
              enhances your financial health but also empowers you to make
              informed decisions. Each consultation is designed to meet your
              unique needs while ensuring your financial future is secure.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
