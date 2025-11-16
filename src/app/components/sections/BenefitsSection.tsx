"use client";

import { motion } from "framer-motion";

interface BenefitItem {
  icon: string;
  title: string;
  description: string;
}

export default function BenefitsSection({
  benefits,
}: {
  benefits: BenefitItem[];
}) {
  const iconComponents = [
    // Complimentary Initial Consultation - Handshake icon (modern, clean)
    <svg
      key="0"
      className="h-8 w-8 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l-2 2m0-2l2-2m6 0l2 2m0-2l-2 2M12 14l-2 2m0-2l2-2m0 0l2-2m0 2l-2 2"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 12v6h12v-6M6 12l6-6 6 6"
      />
    </svg>,

    // Quick Consultations - Zap/lightning
    <svg
      key="1"
      className="h-8 w-8 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>,

    // Client Portal - Shield with user (professional & secure)
    <svg
      key="2"
      className="h-8 w-8 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 2l8 4v6c0 5-3.58 9-8 10-4.42-1-8-5-8-10V6l8-4z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 11a2 2 0 100-4 2 2 0 000 4zm0 1v3"
      />
    </svg>,

    // Available 24/7 - Clock with sun/moon (modern & clear)
    <svg
      key="3"
      className="h-8 w-8 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        strokeWidth={2}
        stroke="currentColor"
        fill="none"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 7v5l3 3"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 2a10 10 0 0110 10 10 10 0 01-10 10"
      />
    </svg>,
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-[#b62166] font-semibold text-sm uppercase tracking-wider block mb-3"
          >
            Client Benefits
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#382460] mb-4"
          >
            Enjoy These Added Benefits
            <span className="text-[#b62166]"> With Every Consultation</span>
          </motion.h2>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center px-4 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#382460] to-[#b62166] rounded-full flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                  {iconComponents[index]}
                </div>

                <h3 className="text-xl font-bold text-[#382460] mb-3 group-hover:text-[#b62166] transition-colors duration-300">
                  {benefit.title}
                </h3>

                <p className="text-gray-600 text-base leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
