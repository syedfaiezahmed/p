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
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
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
          <div className="flex flex-col md:flex-row justify-center gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex-1 flex flex-col items-center text-center px-4 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#382460] to-[#b62166] rounded-full flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={benefit.icon}
                    />
                  </svg>
                </div>

                <h3 className="text-xl font-bold text-[#382460] mb-3 group-hover:text-[#b62166] transition-colors duration-300">
                  {benefit.title}
                </h3>

                <p className="text-gray-600 text-base leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}