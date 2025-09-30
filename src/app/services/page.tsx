// app/services/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Footer } from "../components/ui/footer";

export default function ServicesPage() {
  const router = useRouter();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[250px] flex items-center bg-gradient-to-br from-[#2a1a4a] to-[#8a1650]">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Our <span className="text-[#f0c6d8]">Services</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-16 h-0.5 bg-[#f0c6d8] mx-auto mb-4"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white/90 text-sm md:text-base max-w-2xl mx-auto"
          >
            Comprehensive financial and digital solutions to drive your business
            growth
          </motion.p>
        </div>
      </section>

      {/* Services Navigation Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2a1a4a] mb-4">
                Our Service Offerings
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#8a1650] to-[#2a1a4a] mx-auto rounded-full mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our comprehensive range of financial and digital
                services designed to address your business needs
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Financial Services Card */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <div className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-[#f8e1eb] rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
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
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 01118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#2a1a4a] mb-4">
                  Financial Services
                </h3>
                <p className="text-gray-600 mb-6">
                  Traditional financial expertise with modern strategic insights
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="bg-[#f8e1eb] text-[#8a1650] text-sm px-3 py-1.5 rounded-full">
                    Corporate Finance
                  </span>
                  <span className="bg-[#f8e1eb] text-[#8a1650] text-sm px-3 py-1.5 rounded-full">
                    Tax Advisory
                  </span>
                  <span className="bg-[#f8e1eb] text-[#8a1650] text-sm px-3 py-1.5 rounded-full">
                    Compliance
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/services/financial")}
                  className="w-full bg-gradient-to-r from-[#8a1650] to-[#6e1240] hover:from-[#6e1240] hover:to-[#4a0d2a] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center"
                >
                  Explore Financial Services
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
                </motion.button>
              </div>
            </motion.div>

            {/* Digital Services Card */}
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
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <div className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-[#ece6f5] rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-[#2a1a4a]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#2a1a4a] mb-4">
                  Digital Services
                </h3>
                <p className="text-gray-600 mb-6">
                  Technology-driven solutions for the modern finance function
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="bg-[#ece6f5] text-[#2a1a4a] text-sm px-3 py-1.5 rounded-full">
                    Automation
                  </span>
                  <span className="bg-[#ece6f5] text-[#2a1a4a] text-sm px-3 py-1.5 rounded-full">
                    Analytics
                  </span>
                  <span className="bg-[#ece6f5] text-[#2a1a4a] text-sm px-3 py-1.5 rounded-full">
                    Transformation
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/services/digital")}
                  className="w-full bg-gradient-to-r from-[#2a1a4a] to-[#1e1238] hover:from-[#1e1238] hover:to-[#120824] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center"
                >
                  Explore Digital Services
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
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integrated Approach Section */}
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
                  src="/images/services-integrated.jpg"
                  alt="Prospera integrated services approach"
                  fill
                  className="object-cover"
                  quality={90}
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
                INTEGRATED APPROACH
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2a1a4a] mb-4 leading-tight">
                Where Finance Meets Technology
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p className="text-base sm:text-lg">
                  At Prospera, we believe the most powerful solutions come from
                  integrating financial expertise with digital innovation. Our
                  cross-functional teams work together to deliver comprehensive
                  solutions that address both immediate challenges and long-term
                  strategic goals.
                </p>
                <p>
                  Whether you need traditional financial advisory or
                  cutting-edge digital transformation, our integrated approach
                  ensures seamless implementation and maximum value for your
                  organization.
                </p>
              </div>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Holistic Solutions",
                    icon: (
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
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    ),
                  },
                  {
                    title: "Seamless Integration",
                    icon: (
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
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                        />
                      </svg>
                    ),
                  },
                  {
                    title: "Future-Proofing",
                    icon: (
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
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    ),
                  },
                  {
                    title: "Cross-Functional Teams",
                    icon: (
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
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    ),
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -3 }}
                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-[#8a1650] flex items-start"
                  >
                    <div className="bg-[#f8e1eb] p-2 rounded-lg mr-3">
                      {item.icon}
                    </div>
                    <h3 className="font-medium text-[#2a1a4a]">{item.title}</h3>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#2a1a4a] to-[#8a1650] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/about/dot-pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-3 text-sm font-semibold text-[#f0c6d8] tracking-widest">
              NOT SURE WHERE TO START?
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
              Talk to Our Experts
            </h2>
            <div className="w-24 h-1 bg-[#f0c6d8] mx-auto mb-6 rounded-full"></div>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto text-base sm:text-lg">
              Our consultants will help you identify the right solutions for
              your specific business needs and challenges.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-white text-[#8a1650] hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
                >
                  Contact Us
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
                  className="inline-flex items-center bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-xl font-semibold transition-all duration-300"
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
