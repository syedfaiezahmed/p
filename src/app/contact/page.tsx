// app/contact/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Footer } from "../components/ui/footer";

export default function ContactPage() {
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
            Get in <span className="text-[#f0c6d8]">Touch</span>
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
            Our financial experts are ready to help you achieve your business
            goals
          </motion.p>
        </div>
      </section>

      {/* Contact Content */}
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
                CONNECT WITH US
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2a1a4a] mb-3">
                Let's Start a Conversation
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#8a1650] to-[#2a1a4a] mx-auto rounded-full"></div>
              <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-base sm:text-lg">
                Have questions about our financial services or ready to discuss
                your business needs? Reach out through any of these channels.
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:w-2/5"
            >
              <div className="space-y-8">
                {/* Contact Methods */}
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100,
                  }}
                  viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                  className="bg-white rounded-xl shadow-lg border-t-4 border-[#8a1650] overflow-hidden p-6"
                >
                  <h3 className="text-xl font-bold text-[#2a1a4a] mb-6 pb-4 border-b border-gray-200">
                    Contact Methods
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-5">
                      <div className="bg-[#f8e1eb] p-3 rounded-xl text-[#8a1650] flex-shrink-0">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                          Phone
                        </h4>
                        <p className="text-lg text-[#2a1a4a] font-medium">
                          +966 557147386
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Monday - Friday: 8AM - 6PM EST
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-5">
                      <div className="bg-[#f8e1eb] p-3 rounded-xl text-[#8a1650] flex-shrink-0">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                          Email
                        </h4>
                        <p className="text-lg text-[#2a1a4a] font-medium">
                          inquire@prospera.com
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Response within 24 hours
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-5">
                      <div className="bg-[#f8e1eb] p-3 rounded-xl text-[#8a1650] flex-shrink-0">
                        <svg
                          className="w-6 h-6"
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
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                          Live Chat
                        </h4>
                        <p className="text-lg text-[#2a1a4a] font-medium">
                          Start Chat
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Available 9AM-5PM EST
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Virtual Consultation */}
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
                  className="bg-white rounded-xl shadow-lg border-t-4 border-[#2a1a4a] overflow-hidden p-6"
                >
                  <h3 className="text-xl font-bold text-[#2a1a4a] mb-6 pb-4 border-b border-gray-200">
                    Virtual Consultation
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-5">
                      <div className="bg-[#ece6f5] p-3 rounded-xl text-[#2a1a4a] flex-shrink-0">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-[#2a1a4a] mb-1">
                          Video Meeting
                        </h4>
                        <p className="text-gray-600">
                          Schedule a virtual consultation with our financial
                          experts
                        </p>
                        <button className="text-[#8a1650] font-medium text-sm mt-3 flex items-center">
                          Schedule Now
                          <svg
                            className="w-4 h-4 ml-1"
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
                        </button>
                      </div>
                    </div>

                    <div className="flex items-start gap-5">
                      <div className="bg-[#ece6f5] p-3 rounded-xl text-[#2a1a4a] flex-shrink-0">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-[#2a1a4a] mb-1">
                          Schedule a Call
                        </h4>
                        <p className="text-gray-600">
                          Book a time for a personalized phone consultation
                        </p>
                        <button className="text-[#8a1650] font-medium text-sm mt-3 flex items-center">
                          Book Appointment
                          <svg
                            className="w-4 h-4 ml-1"
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
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Social Media */}
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2,
                    type: "spring",
                    stiffness: 100,
                  }}
                  viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                  className="bg-white rounded-xl shadow-lg border-t-4 border-[#8a1650] overflow-hidden p-6"
                >
                  <h3 className="text-xl font-bold text-[#2a1a4a] mb-6 pb-4 border-b border-gray-200">
                    Follow Us
                  </h3>
                  <div className="flex gap-4">
                    {[
                      {
                        name: "LinkedIn",
                        icon: (
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        ),
                        url: "#",
                      },
                      {
                        name: "Twitter",
                        icon: (
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                          </svg>
                        ),
                        url: "#",
                      },
                      {
                        name: "Instagram",
                        icon: (
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                        ),
                        url: "#",
                      },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        whileHover={{ y: -3 }}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-50 p-4 rounded-xl hover:bg-[#f0c6d8]/20 transition-all duration-300 text-[#8a1650] hover:text-[#6e1240] border border-gray-200"
                        aria-label={social.name}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:w-3/5"
            >
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="mb-2 text-sm font-semibold text-[#8a1650] tracking-widest">
                  SEND US A MESSAGE
                </div>
                <h2 className="text-3xl font-bold text-[#2a1a4a] mb-6">
                  Contact Form
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and our team will get back to you
                  within 24 hours.
                </p>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="first-name"
                        name="first-name"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8a1650]/50 focus:border-[#8a1650] transition-all duration-300 text-gray-700"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="last-name"
                        name="last-name"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8a1650]/50 focus:border-[#8a1650] transition-all duration-300 text-gray-700"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8a1650]/50 focus:border-[#8a1650] transition-all duration-300 text-gray-700"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8a1650]/50 focus:border-[#8a1650] transition-all duration-300 text-gray-700"
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8a1650]/50 focus:border-[#8a1650] transition-all duration-300 text-gray-700"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Service Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8a1650]/50 focus:border-[#8a1650] transition-all duration-300 appearance-none bg-[url('/chevron-down.svg')] bg-no-repeat bg-[center_right_1rem] text-gray-700"
                    >
                      <option value="">Select a service</option>
                      <option value="corporate-finance">
                        Corporate Finance
                      </option>
                      <option value="tax-advisory">Tax Advisory</option>
                      <option value="treasury-risk">Treasury & Risk</option>
                      <option value="digital-transformation">
                        Digital Transformation
                      </option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8a1650]/50 focus:border-[#8a1650] transition-all duration-300 text-gray-700"
                      placeholder="Tell us about your financial needs or inquiry..."
                    ></textarea>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="privacy-policy"
                      name="privacy-policy"
                      type="checkbox"
                      className="h-4 w-4 text-[#8a1650] focus:ring-[#8a1650] border-gray-300 rounded"
                      required
                    />
                    <label
                      htmlFor="privacy-policy"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      I agree to the{" "}
                      <a href="#" className="text-[#8a1650] hover:underline">
                        privacy policy
                      </a>
                    </label>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#8a1650] to-[#2a1a4a] hover:from-[#6e1240] hover:to-[#1e1238] text-white px-6 py-4 rounded-lg font-semibold shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Send Message
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
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
              Start Your Financial Transformation Today
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#8a1650] to-[#2a1a4a] mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-base sm:text-lg">
              Connect with our experts to discuss how our financial services can
              drive growth, efficiency, and compliance for your business.
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
                >
                  Schedule a Consultation
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
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
                  href="/services"
                  className="inline-flex items-center bg-white text-[#2a1a4a] border border-[#2a1a4a] hover:bg-gray-50 px-8 py-3 rounded-xl font-semibold shadow-sm transition-all duration-300"
                >
                  Explore Our Services
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
                      d="M9 5l7 7-7 7"
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
        button:focus-visible,
        input:focus-visible,
        textarea:focus-visible,
        select:focus-visible {
          outline: 2px solid #8a1650;
          outline-offset: 2px;
          border-radius: 0.375rem;
        }
      `}</style>
    </div>
  );
}
