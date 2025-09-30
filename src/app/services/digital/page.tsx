// app/digital-services/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../../components/ui/footer";

export default function DigitalServicesPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[250px] flex items-center bg-gradient-to-br from-[#2a1a4a] to-[#8a1650]">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Digital <span className="text-[#f0c6d8]">Transformation</span>
          </h1>
          <div className="w-16 h-0.5 bg-[#f0c6d8] mx-auto my-2"></div>
          <p className="text-white/90 text-xs md:text-sm">
            Future-ready solutions for the digital age
          </p>
        </div>
      </section>

      {/* Digital Services Overview */}
      <section className="py-16 bg-white">
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
              className="lg:w-1/2 relative"
            >
              <div className="relative aspect-[5/4] rounded-2xl overflow-hidden shadow-2xl border-[6px] border-white">
                <Image
                  src="/images/digitalone.jpg"
                  alt="Prospera digital transformation team"
                  fill
                  className="object-cover"
                  quality={90}
                  priority
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-28 h-28 border-4 border-[#8a1650] rounded-lg z-[-1]"></div>
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
              className="lg:w-1/2"
            >
              <div className="mb-2 text-sm font-semibold text-[#8a1650] tracking-widest">
                DIGITAL INNOVATION
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2a1a4a] mb-4 leading-tight">
                Accelerating Your Digital Journey
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p className="text-base sm:text-lg">
                  Prospera's digital services bridge the gap between finance and
                  technology, delivering transformative solutions that drive
                  efficiency, insight, and growth.
                </p>
                <p>
                  Our approach combines financial expertise with cutting-edge
                  digital capabilities to future-proof your operations and
                  unlock new opportunities.
                </p>
                <p>
                  From automation to advanced analytics, we help finance
                  functions evolve to meet the demands of the digital economy.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Digital Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-3 text-sm font-semibold text-[#8a1650] tracking-widest">
                OUR DIGITAL SOLUTIONS
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2a1a4a] mb-3">
                Digital Finance Services
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#8a1650] to-[#2a1a4a] mx-auto rounded-full"></div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* ERP Implementation */}
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
                        d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2a1a4a]">
                    ERP Implementation
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  End-to-end implementation of enterprise resource planning
                  systems tailored for finance functions, ensuring seamless
                  integration with your operations.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Oracle NetSuite",
                    "SAP S/4HANA",
                    "Microsoft Dynamics 365",
                    "Workday Financials",
                    "Custom solutions",
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
                    href="/digital-services/erp"
                    className="inline-block text-sm font-medium text-[#8a1650] hover:text-[#6e1240] transition-colors"
                  >
                    Learn more →
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Process Automation */}
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
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2a1a4a]">
                    Process Automation
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Intelligent automation of financial processes to eliminate
                  manual work, reduce errors, and accelerate cycle times across
                  accounting and reporting functions.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "RPA (Robotic Process Automation)",
                    "AI-powered document processing",
                    "Workflow automation",
                    "AP/AR automation",
                    "Bank reconciliation",
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
                    href="/digital-services/automation"
                    className="inline-block text-sm font-medium text-[#2a1a4a] hover:text-[#1e1238] transition-colors"
                  >
                    Learn more →
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Data Analytics */}
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
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2a1a4a]">
                    Advanced Analytics
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Transform financial data into actionable insights with
                  predictive analytics, visualization, and business intelligence
                  solutions tailored for finance leaders.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Financial forecasting",
                    "KPI dashboards",
                    "Cost optimization",
                    "Risk modeling",
                    "Real-time reporting",
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
                    href="/digital-services/analytics"
                    className="inline-block text-sm font-medium text-[#8a1650] hover:text-[#6e1240] transition-colors"
                  >
                    Learn more →
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Digital Finance Transformation */}
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
                    Finance Transformation
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Comprehensive roadmap to modernize your finance function,
                  aligning people, processes, and technology with digital best
                  practices.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Digital finance strategy",
                    "Cloud migration",
                    "Modern accounting",
                    "Close optimization",
                    "Center of Excellence setup",
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
                    href="/digital-services/transformation"
                    className="inline-block text-sm font-medium text-[#2a1a4a] hover:text-[#1e1238] transition-colors"
                  >
                    Learn more →
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Cybersecurity */}
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
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2a1a4a]">
                    Financial Cybersecurity
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Protect your financial data and systems with comprehensive
                  security assessments, controls implementation, and continuous
                  monitoring solutions.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "SOC compliance",
                    "Fraud detection",
                    "Access controls",
                    "Data encryption",
                    "Security training",
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
                    href="/digital-services/cybersecurity"
                    className="inline-block text-sm font-medium text-[#8a1650] hover:text-[#6e1240] transition-colors"
                  >
                    Learn more →
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Blockchain Solutions */}
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
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2a1a4a]">
                    Blockchain Solutions
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Leverage distributed ledger technology for secure, transparent
                  financial transactions, smart contracts, and asset management
                  solutions.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Cryptocurrency accounting",
                    "Smart contract development",
                    "Tokenization advisory",
                    "DLT implementation",
                    "Regulatory compliance",
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
                    href="/digital-services/blockchain"
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
      {/* Digital Transformation Journey */}
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
                OUR APPROACH
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2a1a4a] mb-4 leading-tight">
                Your Digital Transformation Roadmap
              </h2>

              <div className="space-y-6">
                {[
                  {
                    title: "Assessment",
                    description:
                      "Comprehensive evaluation of your current digital maturity and pain points",
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
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        />
                      </svg>
                    ),
                  },
                  {
                    title: "Strategy",
                    description:
                      "Custom digital roadmap aligned with your business objectives",
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
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    ),
                  },
                  {
                    title: "Implementation",
                    description:
                      "Phased deployment with change management and training",
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
                    title: "Optimization",
                    description:
                      "Continuous improvement through analytics and feedback",
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
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    ),
                  },
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="bg-[#f8e1eb] p-2 rounded-lg">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#2a1a4a]">{step.title}</h3>
                      <p className="text-gray-600 text-sm">
                        {step.description}
                      </p>
                    </div>
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
                  src="/images/digital.jpg"
                  alt="Digital transformation roadmap"
                  fill
                  className="object-cover"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-xl mb-2">
                    Case Study: Global Manufacturing Firm
                  </h3>
                  <p className="text-white/90 text-sm">
                    Reduced month-end close from 15 to 5 days through our
                    digital finance transformation program.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Digital Benefits */}
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
                THE DIGITAL ADVANTAGE
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Benefits of Digital Finance
              </h2>
              <div className="w-24 h-1 bg-[#f0c6d8] mx-auto rounded-full"></div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Operational Efficiency",
                description: "50-70% reduction in manual processes",
                icon: (
                  <svg
                    className="w-8 h-8 text-[#f0c6d8]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
              {
                title: "Real-time Insights",
                description: "Immediate access to financial data",
                icon: (
                  <svg
                    className="w-8 h-8 text-[#f0c6d8]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                ),
              },
              {
                title: "Cost Savings",
                description: "30-50% lower processing costs",
                icon: (
                  <svg
                    className="w-8 h-8 text-[#f0c6d8]"
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
                title: "Regulatory Compliance",
                description: "Automated controls and audit trails",
                icon: (
                  <svg
                    className="w-8 h-8 text-[#f0c6d8]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                ),
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-white/80">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
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
              READY TO TRANSFORM?
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2a1a4a] mb-4 leading-tight">
              Begin Your Digital Journey Today
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#8a1650] to-[#2a1a4a] mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-base sm:text-lg">
              Our digital experts will guide you through every step of your
              transformation, from strategy to implementation and beyond.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="inline-block"
            >
              <Link
                href="/contact"
                className="inline-flex items-center bg-gradient-to-r from-[#8a1650] to-[#2a1a4a] hover:from-[#6e1240] hover:to-[#1e1238] text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
                aria-label="Contact Prospera Digital Services"
              >
                Schedule Consultation
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
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </motion.div>
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
