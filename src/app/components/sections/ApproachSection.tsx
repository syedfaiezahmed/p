"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function ApproachSection() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:w-1/2 flex flex-col"
          >
            <div className="relative flex-1 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/approach-image.png"
                alt="Our Team Working"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </motion.div>

          <div className="lg:w-1/2 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex-1 flex flex-col justify-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#382460] mb-3">
                OUR APPROACH
              </h2>
              <div className="w-20 h-1 bg-[#b62166] mb-4"></div>

              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-4 rounded-lg border-l-4 border-[#b62166]"
                >
                  <p className="text-gray-700 leading-relaxed">
                    Our approach is grounded in expertise and integrity. What began as a small consultancy has transformed into a firm committed to providing tailored financial solutions and nurturing long-term client relationships.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-4 rounded-lg border-l-4 border-[#382460]"
                >
                  <p className="text-gray-700 leading-relaxed">
                    Our journey began with a commitment to financial excellence. From a small team, we've expanded into a consultancy focused on delivering impactful results and fostering enduring client partnerships.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}