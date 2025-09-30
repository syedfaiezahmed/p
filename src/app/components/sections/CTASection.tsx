"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export function CTASection() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cta-bg-image.jpg" // Replace with your image path
          alt="Financial consultation"
          fill
          className="object-cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#382460cc] to-[#b62166cc]" />
      </div>

      {/* Decorative circles (kept as requested) */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute top-0 left-0 w-24 h-24 bg-white rounded-full mix-blend-overlay"></div>
        <div className="absolute bottom-0 right-0 w-36 h-36 bg-white rounded-full mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold text-white mb-4"
          >
            Ready to transform your financial future?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-white/90 mb-6 max-w-2xl mx-auto"
          >
            Our experts are ready to guide you towards financial success.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center gap-3"
          >
            <Link
              href="/contact"
              className="inline-block bg-white text-[#382460] hover:bg-gray-100 px-6 py-3 rounded-md font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Free Consultation
            </Link>
            <Link
              href="/services"
              className="inline-block border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Our Services
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
