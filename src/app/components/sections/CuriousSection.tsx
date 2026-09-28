"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function CuriousSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-[#382460] to-[#b62166]">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-3 leading-tight"
          >
            Curious About Our Offerings?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-white/80 mb-6 text-lg leading-tight"
          >
            Let's explore how we can enhance your financial success
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-white text-[#382460] text-base sm:text-lg font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:scale-105 active:scale-95 inline-block"
            >
              Get Started
            </Link>

            <Link
              href="/services"
              className="px-8 py-3.5 border-2 border-white text-white text-base sm:text-lg font-semibold rounded-lg hover:bg-white/15 transition-all duration-200 shadow-md hover:scale-105 active:scale-95 inline-block"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

