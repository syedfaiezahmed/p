"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function AimSection() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      {" "}
      {/* Reduced from py-16 sm:py-20 */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          {" "}
          {/* Reduced from mb-12 */}
          <div className="inline-flex items-center justify-center mb-4">
            {" "}
            {/* Reduced from mb-6 */}
            <hr className="w-16 border-t-2 border-[#b62166]" />
            <span className="mx-4 text-[#382460] font-bold text-lg uppercase tracking-wider">
              OUR AIM
            </span>
            <hr className="w-16 border-t-2 border-[#b62166]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#382460] mb-6">
            {" "}
            {/* Reduced from mb-8 */}
            Financial innovation <span className="text-[#b62166]">
              meeting
            </span>{" "}
            strategy
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">
          {" "}
          {/* Reduced gap-12 to gap-10 */}
          <div className="text-center md:text-left">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {" "}
              {/* Reduced from mb-8 */}
              Our firm combines innovative strategies with proven methods to
              help you achieve your financial goals. We are dedicated to
              providing insights and personalized solutions that empower you to
              make informed decisions for a secure, stable, and prosperous
              future built on trust, integrity, and long-term success.
            </p>
            <div className="flex justify-center md:justify-start">
              <Link
                href="/about"
                className="inline-block bg-gradient-to-r from-[#b62166] to-[#382460] hover:from-[#8a1650] hover:to-[#2a1a4a] text-white px-6 py-2 rounded-md font-medium shadow-md transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="bg-gray-100 p-6 md:p-7 rounded-xl border-l-4 border-[#b62166] text-gray-700">
            {" "}
            {/* Reduced md:p-8 to md:p-7 */}
            <p className="leading-relaxed">
              "With a strong foundation in financial expertise, we provide
              tailored consulting services to help you achieve your financial
              goals. Our focus is on delivering strategic advice that not only
              enhances your financial health but also empowers you to make
              informed decisions. Each consultation is designed to meet your
              unique needs while ensuring your financial future is secure."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
