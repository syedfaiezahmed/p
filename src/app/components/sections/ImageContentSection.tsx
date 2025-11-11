"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function ImageContentSection() {
  return (
    <section className="relative py-10 md:py-14 bg-gradient-to-r from-[#382460cc] to-[#b62166cc] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8">
          {/* Image Section - Even Larger */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            className="w-full lg:w-1/2 h-[320px] md:h-[450px] flex items-center justify-center"
          >
            <div className="relative w-full h-full max-w-[550px]">
              <div className="absolute inset-0 rounded-xl border-4 border-white/20 shadow-2xl p-2">
                <div className="w-full h-full rounded-[calc(0.75rem-4px)] overflow-hidden">
                  <Image
                    src="/images/financial success image.jpg"
                    alt="Financial success path"
                    fill
                    className="object-cover"
                    quality={100}
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            className="w-full lg:w-1/2 text-white text-center lg:text-left"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 leading-tight">
              Navigate the Path to Financial Success
            </h2>

            <div className="space-y-4 md:space-y-5 mb-6 md:mb-8">
              <p className="text-base md:text-lg leading-relaxed opacity-90">
                Prospera Consulting empowers our clients to navigate the path to
                financial success by moving beyond conventional methods to solve
                complex governance and profitability challenges.
              </p>

              <p className="text-base md:text-lg leading-relaxed opacity-90">
                We specialize in implementing advanced cost allocation models,
                risk frameworks, and regulatory policies, ensuring that innovation
                transforms possibilities into reality.
              </p>
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap gap-3 md:gap-4 mb-6 md:mb-8 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-white/90 text-sm md:text-base font-medium">Cost Allocation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-white/90 text-sm md:text-base font-medium">Risk Frameworks</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-white/90 text-sm md:text-base font-medium">
                  Regulatory Policy
                </span>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                href="/services"
                className="inline-block border-2 border-white bg-gradient-to-r from-[#b62166] to-[#382460] hover:from-[#8a1650] hover:to-[#2a1a4a] text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-bold text-sm md:text-base shadow-lg transition-all duration-300 uppercase tracking-wider min-w-[140px] text-center"
              >
                Discover More
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}