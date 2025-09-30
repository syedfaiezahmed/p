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
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-[#382460] mb-8"
        >
          Why Choose Us
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow border-t-4 border-[#b62166]"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[#382460]/10 to-[#b62166]/10 rounded-full flex items-center justify-center mb-3 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gradient-to-r from-[#382460] to-[#b62166]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <linearGradient
                    id="icon-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#382460" />
                    <stop offset="100%" stopColor="#b62166" />
                  </linearGradient>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={benefit.icon}
                    stroke="url(#icon-gradient)"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#382460] mb-2 text-center">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-center text-sm">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
