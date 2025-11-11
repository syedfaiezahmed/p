// app/about/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../components/ui/footer";

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Ultra Compact Hero */}
      <section className="relative h-[30vh] min-h-[250px] flex items-center bg-gradient-to-br from-[#2a1a4a] to-[#8a1650]">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            About <span className="text-[#f0c6d8]">Prospera</span>
          </h1>
          <div className="w-16 h-0.5 bg-[#f0c6d8] mx-auto my-2"></div>
          <p className="text-white/90 text-xs md:text-sm">
            Empowering businesses since 2017
          </p>
        </div>
      </section>

      {/* Our Story Section */}
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
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-[6px] border-white">
                <Image
                  src="/images/about1.jpg"
                  alt="Prospera consulting team working together"
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
                OUR STORY
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2a1a4a] mb-4 leading-tight">
                Building Trust Through Excellence
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p className="text-base sm:text-lg">
                  Prospera Consulting is a dynamic firm offering a comprehensive
                  range of services in finance, technology, human resources, and
                  statutory compliance. Our team of seasoned professionals
                  boasts decades of experience in the Kingdom of Saudi Arabia
                  and the Middle East.
                </p>
                <p>
                  Established in 2017, Prospera Consulting has a proven track
                  record of delivering high-quality services with unwavering
                  integrity. We are committed to upholding the highest
                  professional standards while remaining competitively priced.
                </p>
                <p>
                  Unlike larger firms, we prioritize direct client engagement,
                  fostering strong relationships built on trust and
                  transparency. Our extensive network of reputable local and
                  international partners enables us to provide a comprehensive
                  suite of services.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
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
                OUR PHILOSOPHY
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2a1a4a] mb-3">
                Guiding Principles
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#8a1650] to-[#2a1a4a] mx-auto rounded-full"></div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-[6px] border-[#8a1650] relative overflow-hidden"
            >
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#f8e1eb] rounded-full opacity-30"></div>
              <div className="flex items-start mb-4">
                <div className="bg-[#f8e1eb] p-3 rounded-xl mr-4">
                  <svg
                    className="w-7 h-7 text-[#8a1650]"
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
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#2a1a4a] mb-2">
                    Our Mission
                  </h3>
                  <div className="w-12 h-1 bg-[#8a1650] mb-3 rounded-full"></div>
                </div>
              </div>
              <p className="text-gray-600 pl-16 text-base sm:text-lg leading-relaxed">
                To deliver exceptional value to our clients by providing
                innovative solutions that drive growth, efficiency, and
                financial well-being. We are committed to fostering long-term
                partnerships built on trust, integrity, and expertise.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-[6px] border-[#2a1a4a] relative overflow-hidden"
            >
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#ece6f5] rounded-full opacity-30"></div>
              <div className="flex items-start mb-4">
                <div className="bg-[#ece6f5] p-3 rounded-xl mr-4">
                  <svg
                    className="w-7 h-7 text-[#2a1a4a]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#2a1a4a] mb-2">
                    Our Vision
                  </h3>
                  <div className="w-12 h-1 bg-[#2a1a4a] mb-3 rounded-full"></div>
                </div>
              </div>
              <p className="text-gray-600 pl-16 text-base sm:text-lg leading-relaxed">
                To build an effective team that is competent to empower people
                and businesses alike through the provision of optimally tailored
                solutions for their business needs while upholding our values.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
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
                OUR VALUES
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2a1a4a] mb-3">
                Core Values
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#8a1650] to-[#2a1a4a] mx-auto rounded-full"></div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Accountability",
                description:
                  "We are committed to transparency and continuous improvement. Our timely reporting and process analysis enable us to optimize our operations and foster a culture of learning and growth.",
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
              },
              {
                title: "Trust",
                description:
                  "Integrity and respect form the foundation of our relationships. Our culture has instilled in us a deep appreciation for trust, openness, and ethical conduct.",
                icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
              },
              {
                title: "Customer Success",
                description:
                  "Our ultimate goal is to contribute to the growth and prosperity of our clients. Witnessing the positive impact of our services on their success is immensely rewarding.",
                icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <div className="bg-gradient-to-br from-[#8a1650] to-[#2a1a4a] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={value.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#2a1a4a] mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnering Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#f9f5fd] to-[#f8e1eb] p-10 rounded-3xl shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8a1650] via-[#b62166] to-[#2a1a4a]"></div>

            <div className="relative z-10">
              <div className="mb-3 text-sm font-semibold text-[#8a1650] tracking-widest">
                PARTNERING FOR SUCCESS
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2a1a4a] mb-4 leading-tight">
                Our Commitment to You
              </h2>

              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">
                    We prioritize our clients' interests above all else,
                    striving to exceed expectations and build long-lasting
                    partnerships. Our flexible approach allows us to tailor our
                    services to meet the unique needs of each client.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Client-centric service delivery",
                      "Flexible and tailored approaches",
                      "Direct partner engagement",
                      "Long-term relationship building",
                      "Focus on measurable results",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-[#8a1650] mt-0.5 mr-2 flex-shrink-0"
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
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border-4 border-white shadow-lg">
                  <Image
                    src="/images/about2.jpg"
                    alt="Prospera team in a strategic partnership meeting"
                    fill
                    className="object-cover"
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-medium text-sm sm:text-base">
                      Building partnerships since{" "}
                      <span className="font-bold">2017</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Executive Team */}
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
                LEADERSHIP
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2a1a4a] mb-3">
                Executive Team
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#8a1650] to-[#2a1a4a] mx-auto rounded-full"></div>
              <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-base sm:text-lg">
                Meet the distinguished professionals driving Prospera's success
                with decades of regional expertise
              </p>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Managing Partner */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src="/images/team/saeed.jpg"
                  alt="Saeed A. Siddiqui - Managing Partner at Prospera Consulting"
                  fill
                  className="object-cover object-top"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Saeed A. Siddiqui
                  </h3>
                  <p className="text-[#f0c6d8] text-sm">Managing Partner</p>
                </div>
                <div className="absolute top-4 right-4 bg-white text-[#8a1650] px-3 py-0.5 rounded-full text-xs font-bold shadow-sm">
                  30+ Years
                </div>
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <p className="text-gray-600 mb-3 text-sm sm:text-base flex-grow">
                  Seasoned finance professional with over 30 years of
                  experience, including a distinguished 15-year tenure as CFO
                  for diverse organizations.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-[#2a1a4a] text-sm sm:text-base">
                    Expertise
                  </h4>
                  {[
                    "Corporate Restructuring",
                    "Business Automation",
                    "Financial Modeling",
                    "Strategic Consulting",
                  ].map((skill, i) => (
                    <div key={i} className="flex items-center">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-[#8a1650] mr-1 sm:mr-2"
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
                      <span className="text-xs sm:text-sm text-gray-700">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Partner */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{
                duration: 0.5,
                delay: 0.1,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src="/images/team/siraj.jpg"
                  alt="Siraj Ahmed Ansari - Partner at Prospera Consulting"
                  fill
                  className="object-cover object-top"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Siraj Ahmed Ansari
                  </h3>
                  <p className="text-[#f0c6d8] text-sm">Partner</p>
                </div>
                <div className="absolute top-4 right-4 bg-white text-[#8a1650] px-3 py-0.5 rounded-full text-xs font-bold shadow-sm">
                  20+ Years
                </div>
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <p className="text-gray-600 mb-3 text-sm sm:text-base flex-grow">
                  Results-driven finance professional with extensive experience
                  in strategic financial analysis, taxation, and executive-level
                  financial management.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-[#2a1a4a] text-sm sm:text-base">
                    Expertise
                  </h4>
                  {[
                    "Strategic Financial Analysis",
                    "Taxation",
                    "ERP Implementation",
                    "Regulatory Compliance",
                  ].map((skill, i) => (
                    <div key={i} className="flex items-center">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-[#8a1650] mr-1 sm:mr-2"
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
                      <span className="text-xs sm:text-sm text-gray-700">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Director - Salman Ahmed */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src="/images/team/salman Ahmed.jpg"
                  alt="Salman Ahmed - Director at Prospera Consulting"
                  fill
                  className="object-cover object-top"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Salman Ahmed
                  </h3>
                  <p className="text-[#f0c6d8] text-sm">Director</p>
                </div>
                <div className="absolute top-4 right-4 bg-white text-[#8a1650] px-3 py-0.5 rounded-full text-xs font-bold shadow-sm">
                  14+ Years
                </div>
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <p className="text-gray-600 mb-3 text-sm sm:text-base flex-grow">
                  Seasoned finance professional with expertise in financial
                  management and business analytics. Currently serving as
                  Finance Manager & Analyst at TransEmirates and Global Brands.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-[#2a1a4a] text-sm sm:text-base">
                    Expertise
                  </h4>
                  {[
                    "Financial Management",
                    "Business Analytics",
                    "Power BI Training",
                    "Corporate Training",
                  ].map((skill, i) => (
                    <div key={i} className="flex items-center">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-[#8a1650] mr-1 sm:mr-2"
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
                      <span className="text-xs sm:text-sm text-gray-700">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Director */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{
                duration: 0.5,
                delay: 0.3,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src="/images/team/asif.jpg"
                  alt="Asif Ahmed - Director at Prospera Consulting"
                  fill
                  className="object-cover object-top"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Asif Ahmed
                  </h3>
                  <p className="text-[#f0c6d8] text-sm">Director</p>
                </div>
                <div className="absolute top-4 right-4 bg-white text-[#8a1650] px-3 py-0.5 rounded-full text-xs font-bold shadow-sm">
                  20+ Years
                </div>
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <p className="text-gray-600 mb-3 text-sm sm:text-base flex-grow">
                  Highly experienced finance professional with over 20 years of
                  expertise in tax, accounting, auditing and financial
                  management.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-[#2a1a4a] text-sm sm:text-base">
                    Expertise
                  </h4>
                  {[
                    "Tax Strategy",
                    "Accounting",
                    "Auditing",
                    "Financial Management",
                  ].map((skill, i) => (
                    <div key={i} className="flex items-center">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-[#8a1650] mr-1 sm:mr-2"
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
                      <span className="text-xs sm:text-sm text-gray-700">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Prospera Section */}
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
                WHY PROSPERA
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                The Prospera Advantage
              </h2>
              <div className="w-24 h-1 bg-[#f0c6d8] mx-auto rounded-full"></div>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Experienced Leadership",
                description:
                  "Our core team possesses extensive expertise and a proven track record of success in diverse industries.",
              },
              {
                title: "Comprehensive Service Delivery",
                description:
                  "We offer a fully integrated approach, ensuring effective engagement with management and seamless coordination.",
              },
              {
                title: "Collaborative Culture",
                description:
                  "Our team is characterized by a strong sense of teamwork, confidence, and ability to work in unison.",
              },
              {
                title: "Proven Methodology",
                description:
                  "Our tailored methodology is designed to facilitate efficient implementation and deliver optimal results.",
              },
              {
                title: "Strategic Partnerships",
                description:
                  "We leverage our extensive network within both public and private sectors to provide added value.",
              },
              {
                title: "Client-Centric Focus",
                description:
                  "We prioritize direct client engagement, fostering strong relationships built on trust and transparency.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start mb-3">
                  <div className="bg-[#f0c6d8] p-2 rounded-lg mr-4">
                    <svg
                      className="w-5 h-5 text-[#8a1650]"
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
                  </div>
                  <h3 className="text-lg font-semibold text-white pt-1">
                    {item.title}
                  </h3>
                </div>
                <p className="text-white/80 pl-12">{item.description}</p>
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
              READY TO GROW STRONGER?
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2a1a4a] mb-4 leading-tight">
              Partner with Prospera Today
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#8a1650] to-[#2a1a4a] mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-base sm:text-lg">
              As we continue to evolve, Prospera Consulting remains committed to
              fulfilling client needs and driving sustainable growth.
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
              >
                Contact Us Today
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
    </div>
  );
}
