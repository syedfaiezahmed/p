"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AimSection() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* ===== Top Heading Section ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-3 md:space-y-4"
        >
          <span className="text-[#b62166] uppercase tracking-widest text-xs sm:text-sm font-semibold text-center block">
            — Our Aim
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#382460] leading-tight text-center">
            Financial innovation meeting strategy
          </h2>
        </motion.div>

        {/* ===== Bottom Main Section ===== */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mt-8 md:mt-12">
          {/* LEFT: Paragraph ABOVE image */}
          <div className="flex flex-col space-y-6">
            {/* First paragraph */}
            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed text-center lg:text-justify">
              Our firm blends innovative strategies with established best
              practices to support you in achieving your financial objectives.
              We are committed to delivering clear, actionable insights that
              strengthen your decision-making and help you plan confidently for
              a prosperous future. Through the use of advanced analysis,
              industry knowledge, and a client-centered approach, we ensure
              every recommendation is both relevant and effective. This
              combination allows us to provide solutions that promote
              sustainable growth, enhance financial resilience, and build
              long-term confidence in your overall financial direction.
            </p>

            {/* IMAGE */}
            <div className="relative w-full rounded-xl overflow-hidden shadow-lg">
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

          {/* RIGHT: Second paragraph - reduced spacing */}
          <div className="lg:self-start mt-6 md:mt-8 lg:mt-[310px]">
            <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-justify text-center leading-relaxed">
              With a strong foundation in financial expertise, we provide
              tailored consulting services to help you achieve your financial
              goals. Our focus is on delivering strategic advice that not only
              enhances your financial health but also empowers you to make
              informed decisions. Each consultation is designed to meet your
              unique needs while ensuring your financial future is secure. By
              combining industry insights, data-driven analysis, and a
              personalized approach, we guide you through complex financial
              challenges and opportunities, enabling long-term stability,
              sustainable growth, and greater confidence in every decision you
              make.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
