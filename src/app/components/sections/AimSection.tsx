"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AimSection() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* ===== Top Center Section ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto space-y-6"
        >
          <span className="text-[#b62166] uppercase tracking-widest text-sm font-semibold">
            — Our Aim
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-[#382460] leading-tight">
            Financial innovation <br />
            <span className="block">meeting strategy</span>
          </h2>

          <p className="text-gray-600 text-base leading-relaxed">
            Our firm combines innovative strategies with proven methods to help
            you achieve your financial goals. We are dedicated to providing
            insights that empower you to make informed decisions for a
            prosperous future.
          </p>
        </motion.div>

        {/* ===== Bottom Section (Image Left, Text Right) ===== */}
        <div className="grid lg:grid-cols-2 gap-16 mt-20 items-center">
          {/* Left: Image - Larger Size */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/bookkeeping2.webp"
                alt="Financial Strategy"
                width={800}
                height={600}
                className="object-cover w-full h-auto"
              />
            </div>
          </motion.div>

          {/* Right: Second Paragraph aligned with image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 text-base leading-relaxed font-medium">
              With a strong foundation in financial expertise, we provide
              tailored consulting services to help you achieve your financial
              goals. Our focus is on delivering strategic advice that not only
              enhances your financial health but also empowers you to make
              informed decisions. Each consultation is designed to meet your
              unique needs while ensuring your financial future is secure.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
