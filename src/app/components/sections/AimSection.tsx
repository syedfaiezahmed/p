"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AimSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-2 h-2 bg-[#b62166] rounded-full mr-2" />
            <span className="text-[#b62166] font-semibold text-sm uppercase tracking-widest">
              OUR AIM
            </span>
            <div className="w-2 h-2 bg-[#b62166] rounded-full ml-2" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-[#382460] mb-4">
            Financial Innovation <span className="text-[#b62166]">Meeting</span>{" "}
            Strategy
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-600 leading-relaxed">
              Our firm combines innovative strategies with proven methods to
              help you achieve your financial goals. We are dedicated to
              providing insights that empower you to make informed decisions for
              a prosperous future.
            </p>

            <div className="relative p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm border border-gray-100">
              <div className="absolute -top-2 left-6 w-5 h-5 bg-[#b62166] rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
              </div>

              <p className="text-gray-700 leading-relaxed text-base font-light italic pl-4">
                "With a strong foundation in financial expertise, we provide
                tailored consulting services to help you achieve your financial
                goals. Our focus is on delivering strategic advice that not only
                enhances your financial health but also empowers you to make
                informed decisions."
              </p>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#b62166] to-[#382460] rounded-b-xl"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/bookkeeping2.webp"
                alt="Financial Success"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
