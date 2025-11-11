"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function ApproachSection() {
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
          <h2 className="text-3xl md:text-4xl font-bold text-[#382460]">
            OUR <span className="text-[#b62166]">APPROACH</span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-stretch gap-8 md:gap-12">
          {/* Image Section - Adjusted height to match text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:w-1/2 flex"
          >
            <div className="relative rounded-xl overflow-hidden w-full">
              <Image
                src="/images/approach-image.png"
                alt="Our Team Working"
                width={600}
                height={500}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Text Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 flex items-center"
          >
            <div className="w-full space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <p className="text-[#382460] text-lg leading-[1.8] tracking-wide font-light italic border-l-4 border-[#b62166] pl-6 py-3">
                  Our approach is grounded in expertise and integrity. What
                  began as a small consultancy has transformed into a firm
                  committed to providing tailored financial solutions and
                  nurturing long-term client relationships.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <p className="text-gray-700 text-base leading-[1.7] tracking-normal font-normal">
                  Our journey began with a commitment to financial excellence.
                  From a small team, we've expanded into a consultancy focused
                  on delivering impactful results and fostering enduring client
                  partnerships through innovative strategies and proven
                  methodologies.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
