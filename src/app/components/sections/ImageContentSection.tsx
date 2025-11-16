"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function ImageContentSection() {
  return (
    <section className="relative py-8 md:py-10 bg-gradient-to-r from-[#382460cc] to-[#b62166cc] overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Centered Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 leading-tight text-center text-white"
        >
          Navigate the Path to Financial Success
        </motion.h2>

        <div className="flex flex-col lg:flex-row items-center gap-4 md:gap-6">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 h-[250px] md:h-[280px] flex items-center justify-center"
          >
            <div className="relative w-full h-full max-w-[500px]">
              <div className="absolute inset-0 rounded-xl border-4 border-white/20 shadow-xl p-2">
                <div className="w-full h-full rounded-[calc(0.75rem-4px)] overflow-hidden">
                  <Image
                    src="/images/financial success image.jpg"
                    alt="Financial success path"
                    fill
                    className="object-cover"
                    quality={95}
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
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 text-white"
          >
            <div className="mb-4 md:mb-6">
              <p className="text-base md:text-lg leading-normal opacity-90">
                Prospera Consulting empowers our clients to navigate the path to
                financial success by moving beyond conventional methods to solve
                complex governance and profitability challenges. We specialize
                in implementing advanced cost allocation models, risk
                frameworks, and regulatory policies, ensuring that innovation
                transforms possibilities into reality. Our strategic advice
                guarantees measurable results, driving operational efficiency,
                de-risking crucial investments, and optimizing margins to secure
                a sustained competitive advantage.
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                href="/services"
                className="inline-block border-2 border-white bg-gradient-to-r from-[#b62166] to-[#382460] hover:from-[#8a1650] hover:to-[#2a1a4a] text-white px-5 py-2 md:px-6 md:py-3 rounded-lg font-bold text-sm shadow-lg transition-all duration-300 uppercase tracking-wider min-w-[140px] text-center"
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
