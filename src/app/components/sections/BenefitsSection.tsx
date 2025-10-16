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
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-block mb-3"
          >
            <span className="px-4 py-2 bg-gradient-to-r from-[#382460] to-[#b62166] text-white text-xs font-semibold rounded-full shadow-md">
              Why Choose Us
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-[#382460] mb-3"
          >
            Unmatched Benefits
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-2xl mx-auto text-sm"
          >
            Experience excellence with our comprehensive suite of advantages
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#382460] to-[#b62166] opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-[1px]">
                <div className="w-full h-full bg-white rounded-xl"></div>
              </div>

              {/* Content */}
              <div className="relative p-6 flex flex-col items-center text-center z-10">
                {/* Icon Container */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-14 h-14 bg-gradient-to-br from-[#382460] to-[#b62166] rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={benefit.icon}
                      />
                    </svg>
                  </div>
                </motion.div>

                {/* Text Content */}
                <h3 className="font-bold text-[#382460] mb-3 text-sm group-hover:text-[#b62166] transition-colors duration-300">
                  {benefit.title}
                </h3>

                <p className="text-gray-600 text-xs leading-relaxed">
                  {benefit.description}
                </p>

                {/* Hover Line */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#382460] to-[#b62166] group-hover:w-12 transition-all duration-300 rounded-full"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
