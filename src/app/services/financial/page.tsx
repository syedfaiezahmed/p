// app/services/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../../components/ui/footer";

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[250px] flex items-center bg-gradient-to-br from-[#2a1a4a] to-[#8a1650]">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Financial <span className="text-[#f0c6d8]">Services</span>
          </h1>
          <div className="w-16 h-0.5 bg-[#f0c6d8] mx-auto my-2"></div>
          <p className="text-white/90 text-xs md:text-sm">
            Comprehensive solutions for your financial needs
          </p>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-3 text-sm font-semibold text-[#8a1650] tracking-widest">
                OUR OFFERINGS
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2a1a4a] mb-3">
                Core Financial Services
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#8a1650] to-[#2a1a4a] mx-auto rounded-full"></div>
              <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-base sm:text-lg">
                Tailored solutions designed to address your unique financial
                challenges and opportunities
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Corporate Finance */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{
                duration: 0.6,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-[#8a1650] overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-[#f8e1eb] p-3 rounded-xl mr-4">
                    <svg
                      className="w-7 h-7 text-[#8a1650]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2a1a4a]">
                    Corporate Finance
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Strategic financial planning and capital structure
                  optimization to maximize shareholder value and support
                  business growth objectives.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Capital raising & structuring",
                    "M&A advisory",
                    "Financial modeling",
                    "Valuation services",
                    "Investor relations",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-4 h-4 text-[#8a1650] mt-0.5 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href="/services/corporate-finance"
                    className="inline-block text-sm font-medium text-[#8a1650] hover:text-[#6e1240] transition-colors"
                  >
                    Learn more →
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Tax Advisory */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-[#2a1a4a] overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-[#ece6f5] p-3 rounded-xl mr-4">
                    <svg
                      className="w-7 h-7 text-[#2a1a4a]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2a1a4a]">
                    Tax Advisory
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Comprehensive tax planning and compliance services to optimize
                  your tax position while ensuring full regulatory compliance
                  across jurisdictions.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Corporate tax planning",
                    "VAT & indirect tax advisory",
                    "Transfer pricing",
                    "Tax compliance & reporting",
                    "Tax dispute resolution",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-4 h-4 text-[#2a1a4a] mt-0.5 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href="/services/tax-advisory"
                    className="inline-block text-sm font-medium text-[#2a1a4a] hover:text-[#1e1238] transition-colors"
                  >
                    Learn more →
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Treasury & Risk */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-[#8a1650] overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-[#f8e1eb] p-3 rounded-xl mr-4">
                    <svg
                      className="w-7 h-7 text-[#8a1650]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2a1a4a]">
                    Treasury & Risk Management
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Comprehensive treasury solutions and risk mitigation
                  strategies to protect your assets and optimize liquidity
                  across global operations.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Cash flow forecasting",
                    "FX & interest rate risk",
                    "Liquidity management",
                    "Debt & investment strategies",
                    "Insurance advisory",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-4 h-4 text-[#8a1650] mt-0.5 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href="/services/treasury-risk"
                    className="inline-block text-sm font-medium text-[#8a1650] hover:text-[#6e1240] transition-colors"
                  >
                    Learn more →
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Financial Transformation */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-[#2a1a4a] overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-[#ece6f5] p-3 rounded-xl mr-4">
                    <svg
                      className="w-7 h-7 text-[#2a1a4a]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2a1a4a]">
                    Financial Transformation
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Digital transformation of finance functions to enhance
                  efficiency, reporting accuracy, and decision-making
                  capabilities through technology.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "ERP implementation",
                    "Process automation",
                    "Digital finance strategy",
                    "Advanced analytics",
                    "Finance function optimization",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-4 h-4 text-[#2a1a4a] mt-0.5 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href="/services/financial-transformation"
                    className="inline-block text-sm font-medium text-[#2a1a4a] hover:text-[#1e1238] transition-colors"
                  >
                    Learn more →
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Compliance & Reporting */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-[#8a1650] overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-[#f8e1eb] p-3 rounded-xl mr-4">
                    <svg
                      className="w-7 h-7 text-[#8a1650]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2a1a4a]">
                    Compliance & Reporting
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Ensuring regulatory compliance and delivering transparent,
                  accurate financial reporting that meets international
                  standards and stakeholder expectations.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "IFRS implementation",
                    "Financial statement preparation",
                    "Regulatory filings",
                    "Internal controls",
                    "Audit support",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-4 h-4 text-[#8a1650] mt-0.5 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href="/services/compliance-reporting"
                    className="inline-block text-sm font-medium text-[#8a1650] hover:text-[#6e1240] transition-colors"
                  >
                    Learn more →
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Business Advisory */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{
                duration: 0.6,
                delay: 0.5,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-[#2a1a4a] overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-[#ece6f5] p-3 rounded-xl mr-4">
                    <svg
                      className="w-7 h-7 text-[#2a1a4a]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2a1a4a]">
                    Business Advisory
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Strategic guidance to navigate complex business challenges,
                  optimize operations, and capitalize on growth opportunities in
                  dynamic markets.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Business planning",
                    "Performance improvement",
                    "Market entry strategies",
                    "Organizational restructuring",
                    "Succession planning",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-4 h-4 text-[#2a1a4a] mt-0.5 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href="/services/business-advisory"
                    className="inline-block text-sm font-medium text-[#2a1a4a] hover:text-[#1e1238] transition-colors"
                  >
                    Learn more →
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industry Expertise Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                type: "spring",
                stiffness: 60,
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="lg:w-1/2"
            >
              <div className="mb-2 text-sm font-semibold text-[#8a1650] tracking-widest">
                INDUSTRY FOCUS
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2a1a4a] mb-4 leading-tight">
                Sector-Specific Financial Expertise
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p className="text-base sm:text-lg">
                  Our consultants bring deep industry knowledge to address the
                  unique financial challenges and opportunities in your sector.
                </p>
                <p>
                  We combine financial acumen with sector-specific insights to
                  deliver solutions that drive measurable impact.
                </p>
              </div>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Banking & Financial Services",
                    icon: (
                      <svg
                        className="w-6 h-6 text-[#8a1650]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    ),
                  },
                  {
                    title: "Energy & Utilities",
                    icon: (
                      <svg
                        className="w-6 h-6 text-[#8a1650]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    ),
                  },
                  {
                    title: "Real Estate & Construction",
                    icon: (
                      <svg
                        className="w-6 h-6 text-[#8a1650]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    ),
                  },
                  {
                    title: "Healthcare & Pharma",
                    icon: (
                      <svg
                        className="w-6 h-6 text-[#8a1650]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                        />
                      </svg>
                    ),
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -3 }}
                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-start"
                  >
                    <div className="bg-[#f8e1eb] p-2 rounded-lg mr-3">
                      {item.icon}
                    </div>
                    <h3 className="font-medium text-[#2a1a4a]">{item.title}</h3>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                type: "spring",
                stiffness: 60,
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="lg:w-1/2 relative"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-[6px] border-white">
                <Image
                  src="/images/fin-ser.jpg  "
                  alt="Prospera consulting team analyzing industry data"
                  fill
                  className="object-cover"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-28 h-28 border-4 border-[#8a1650] rounded-lg z-[-1]"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Approach Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-3 text-sm font-semibold text-[#8a1650] tracking-widest">
                OUR METHODOLOGY
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2a1a4a] mb-3">
                The Prospera Service Approach
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#8a1650] to-[#2a1a4a] mx-auto rounded-full"></div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Discovery",
                description:
                  "In-depth analysis of your financial landscape to identify key challenges and opportunities",
                icon: (
                  <svg
                    className="w-8 h-8 text-[#8a1650]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                ),
              },
              {
                title: "Strategy",
                description:
                  "Customized financial strategies aligned with your business objectives and market dynamics",
                icon: (
                  <svg
                    className="w-8 h-8 text-[#8a1650]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                ),
              },
              {
                title: "Execution",
                description:
                  "Precision implementation with rigorous project management and quality control",
                icon: (
                  <svg
                    className="w-8 h-8 text-[#8a1650]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-b-4 border-[#8a1650]"
              >
                <div className="bg-[#f8e1eb] w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#2a1a4a] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Results Section */}
      <section className="py-16 bg-gradient-to-br from-[#2a1a4a] to-[#8a1650] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/about/dot-pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-3 text-sm font-semibold text-[#f0c6d8] tracking-widest">
                CLIENT IMPACT
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Measurable Financial Results
              </h2>
              <div className="w-24 h-1 bg-[#f0c6d8] mx-auto rounded-full"></div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                value: "45%",
                description:
                  "Average improvement in financial reporting efficiency for clients",
              },
              {
                value: "$120M+",
                description:
                  "Capital raised for clients through our advisory services",
              },
              {
                value: "30%",
                description:
                  "Average reduction in tax liabilities for corporate clients",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  {item.value}
                </div>
                <p className="text-white/90">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-1/3">
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  <Image
                    src="/images/client-testimonial.jpg"
                    alt="Client testimonial"
                    fill
                    className="object-cover"
                    quality={90}
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <blockquote className="text-white text-lg italic mb-4">
                  "Prospera's financial restructuring expertise transformed our
                  balance sheet and positioned us for sustainable growth. Their
                  team delivered actionable insights and implemented solutions
                  that improved our cash flow by 35% within the first year."
                </blockquote>
                <div className="text-white font-medium">Khalid Al-Mansoori</div>
                <div className="text-[#f0c6d8] text-sm">
                  CEO, Al-Mansoori Holdings
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-3 text-sm font-semibold text-[#8a1650] tracking-widest">
              READY TO BEGIN?
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2a1a4a] mb-4 leading-tight">
              Transform Your Financial Operations
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#8a1650] to-[#2a1a4a] mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-base sm:text-lg">
              Partner with Prospera to implement financial strategies that drive
              growth, efficiency, and compliance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-gradient-to-r from-[#8a1650] to-[#2a1a4a] hover:from-[#6e1240] hover:to-[#1e1238] text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
                  aria-label="Contact Prospera Consulting"
                >
                  Get in Touch
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href="/case-studies"
                  className="inline-flex items-center bg-white text-[#2a1a4a] border border-[#2a1a4a] hover:bg-gray-50 px-8 py-3 rounded-xl font-semibold shadow-sm transition-all duration-300"
                  aria-label="View Prospera case studies"
                >
                  View Case Studies
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        a:focus-visible,
        button:focus-visible {
          outline: 2px solid #8a1650;
          outline-offset: 4px;
          border-radius: 0.25rem;
        }
      `}</style>
    </div>
  );
}
