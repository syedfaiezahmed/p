"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function ImageContentSection() {
  return (
    <section className="relative py-10 sm:py-12 bg-gradient-to-r from-[#382460cc] to-[#b62166cc] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            className="w-full lg:w-1/2 h-[200px] sm:h-[250px] flex items-center justify-center"
          >
            <div className="relative w-full h-full max-w-[500px]">
              <div className="absolute inset-0 rounded-lg border-4 border-white/20 shadow-lg p-1">
                <div className="w-full h-full rounded-[calc(0.5rem-4px)] overflow-hidden">
                  <Image
                    src="/images/financial success image.jpg"
                    alt="Financial success path"
                    fill
                    className="object-cover"
                    quality={100}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            className="w-full lg:w-1/2 text-white text-center lg:text-left"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Navigate the Path to Financial Success
            </h2>
            <p className="text-lg mb-6 opacity-90 leading-relaxed">
              Innovation transforms possibilities into reality. Our expert team
              will guide you through every step of your financial journey,
              providing tailored solutions for your unique needs.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                href="/services"
                className="inline-block border-2 border-white bg-gradient-to-r from-[#b62166] to-[#382460] hover:from-[#8a1650] hover:to-[#2a1a4a] text-white px-6 py-2 rounded-md font-bold text-base shadow-lg transition-all duration-300 uppercase tracking-wide min-w-[160px] text-center"
              >
                Discover
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
