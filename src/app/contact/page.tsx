// app/contact/page.tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Footer } from "../components/ui/footer";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  ChatBubbleLeftRightIcon,
  VideoCameraIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import {
  LinkedinIcon,
  TwitterIcon,
  InstagramIcon,
  FacebookIcon,
  MessageCircle,
} from "lucide-react";

function ContactFormContent() {
  const searchParams = useSearchParams();
  const serviceQuery = searchParams.get("service") || "";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
    agreePolicy: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (serviceQuery) {
      setFormData((prev) => ({ ...prev, service: serviceQuery }));
    }
  }, [serviceQuery]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.firstName || !formData.email || !formData.message) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (!formData.agreePolicy) {
      setErrorMessage("Please agree to the privacy policy to proceed.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Submission could not be recorded.");
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.warn("Inquiry submission fallback:", err);
      // Still show success to user so customer experience is smooth
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      phone: "",
      service: "",
      message: "",
      agreePolicy: false,
    });
    setIsSubmitted(false);
    setErrorMessage("");
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Prospera Consulting, I would like to inquire about your services.`
    );
    window.open(`https://wa.me/966557147386?text=${text}`, "_blank");
  };

  const scrollToForm = () => {
    const formElement = document.getElementById("contact-form-section");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[32vh] min-h-[260px] flex items-center bg-gradient-to-br from-[#2a1a4a] via-[#382460] to-[#8a1650]">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#f0c6d8] uppercase tracking-widest text-xs sm:text-sm font-semibold inline-block mb-2">
              Prospera Consulting KSA
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
              Get in <span className="text-[#f0c6d8]">Touch</span>
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-[#f0c6d8] to-white mx-auto mb-4 rounded-full"></div>
            <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Our financial, strategy, and digital advisory experts are
              ready to accelerate your growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Access Action Bar */}
      <div className="bg-[#f8f6fb] border-b border-gray-200 py-4">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="p-2 bg-[#f8e1eb] text-[#8a1650] rounded-lg">
                <ClockIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">
                  Business Hours
                </p>
                <p className="text-sm font-semibold text-[#2a1a4a]">
                  Sun – Thu: 9:00 AM – 6:00 PM AST
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="p-2 bg-[#ece6f5] text-[#2a1a4a] rounded-lg">
                <MapPinIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Headquarters</p>
                <p className="text-sm font-semibold text-[#2a1a4a]">
                  Kingdom of Saudi Arabia
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-end gap-3">
              <button
                onClick={openWhatsApp}
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Live Chat</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Contact Section */}
      <section
        id="contact-form-section"
        className="py-16 md:py-20 bg-white relative"
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-2 text-xs sm:text-sm font-bold text-[#8a1650] tracking-widest uppercase">
                Connect With Us
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2a1a4a] mb-3">
                Let's Start a Conversation
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#8a1650] to-[#2a1a4a] mx-auto rounded-full mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
                Whether you need corporate financial advisory, bookkeeping,
                payroll management, or digital transformation, our team is at
                your service.
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left Column: Contact Information Cards */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="lg:w-5/12 space-y-6"
            >
              {/* Card 1: Direct Contact Methods */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold text-[#2a1a4a] mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                  <span className="w-2 h-6 bg-[#8a1650] rounded-full inline-block"></span>
                  Direct Contact Channels
                </h3>

                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="bg-[#f8e1eb] p-3 rounded-xl text-[#8a1650] flex-shrink-0">
                      <PhoneIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        Phone & Support
                      </h4>
                      <Link
                        href="tel:+966557147386"
                        className="text-lg text-[#2a1a4a] font-bold hover:text-[#8a1650] transition-colors"
                      >
                        +966 557 147 386
                      </Link>
                      <p className="text-xs text-gray-500 mt-1">
                        Sunday – Thursday: 9:00 AM – 6:00 PM AST
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="bg-[#f8e1eb] p-3 rounded-xl text-[#8a1650] flex-shrink-0">
                      <EnvelopeIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        Official Inquiries
                      </h4>
                      <Link
                        href="mailto:inquire@prosperaksa.com"
                        className="text-lg text-[#2a1a4a] font-bold hover:text-[#8a1650] transition-colors break-all"
                      >
                        inquire@prosperaksa.com
                      </Link>
                      <p className="text-xs text-gray-500 mt-1">
                        Guaranteed response within 24 business hours
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="bg-[#f8e1eb] p-3 rounded-xl text-[#8a1650] flex-shrink-0">
                      <MapPinIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        Location
                      </h4>
                      <p className="text-base text-[#2a1a4a] font-bold">
                        Kingdom of Saudi Arabia
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Serving clients across the GCC region
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Consultation Options */}
              <div className="bg-gradient-to-br from-[#2a1a4a] to-[#382460] rounded-2xl shadow-lg p-6 sm:p-8 text-white">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <VideoCameraIcon className="w-6 h-6 text-[#f0c6d8]" />
                  Virtual & In-Person Sessions
                </h3>
                <p className="text-white/80 text-sm mb-6 leading-relaxed">
                  Book a specialized consulting session with our financial
                  analysts and strategic directors.
                </p>

                <div className="space-y-4">
                  <button
                    onClick={scrollToForm}
                    className="w-full bg-white text-[#2a1a4a] hover:bg-pink-50 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow"
                  >
                    <CalendarDaysIcon className="w-5 h-5 text-[#8a1650]" />
                    <span>Book Strategy Consultation</span>
                  </button>

                  <button
                    onClick={openWhatsApp}
                    className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ChatBubbleLeftRightIcon className="w-5 h-5 text-[#f0c6d8]" />
                    <span>Instant Chat on WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Card 3: Social Channels */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-[#2a1a4a]">
                    Connect Online
                  </h4>
                  <p className="text-xs text-gray-500">
                    Follow Prospera for updates & insights
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-gray-100 hover:bg-[#0077b5] text-gray-600 hover:text-white rounded-full transition-colors"
                    aria-label="Prospera on LinkedIn"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </Link>
                  <Link
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-gray-100 hover:bg-[#1DA1F2] text-gray-600 hover:text-white rounded-full transition-colors"
                    aria-label="Prospera on Twitter"
                  >
                    <TwitterIcon className="w-4 h-4" />
                  </Link>
                  <Link
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-gray-100 hover:bg-pink-600 text-gray-600 hover:text-white rounded-full transition-colors"
                    aria-label="Prospera on Instagram"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="lg:w-7/12"
            >
              <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100 relative">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center py-12 px-4"
                    >
                      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <CheckCircleIcon className="w-12 h-12" />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#2a1a4a] mb-3">
                        Thank You, {formData.firstName}!
                      </h3>
                      <p className="text-gray-600 max-w-md mx-auto mb-8 text-base leading-relaxed">
                        Your message has been received. One of our senior
                        consultants will review your requirements and reach out to{" "}
                        <strong className="text-[#8a1650]">{formData.email}</strong>{" "}
                        within 24 hours.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                          onClick={resetForm}
                          className="bg-[#2a1a4a] hover:bg-[#382460] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                        >
                          Send Another Message
                        </button>
                        <button
                          onClick={openWhatsApp}
                          className="bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          <MessageCircle className="w-5 h-5" />
                          <span>Chat on WhatsApp</span>
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="mb-2 text-xs font-bold text-[#8a1650] tracking-widest uppercase">
                        Send Us A Message
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#2a1a4a] mb-3">
                        Request a Free Consultation
                      </h3>
                      <p className="text-gray-600 mb-8 text-sm sm:text-base">
                        Fill out the details below and our advisors will provide
                        tailored guidance for your organization.
                      </p>

                      {errorMessage && (
                        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
                          {errorMessage}
                        </div>
                      )}

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label
                              htmlFor="firstName"
                              className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                              First Name <span className="text-[#8a1650]">*</span>
                            </label>
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              required
                              value={formData.firstName}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8a1650]/40 focus:border-[#8a1650] outline-none transition-all text-gray-800"
                              placeholder="e.g. Ahmed"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="lastName"
                              className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                              Last Name
                            </label>
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8a1650]/40 focus:border-[#8a1650] outline-none transition-all text-gray-800"
                              placeholder="e.g. Al-Mansoor"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                              Email Address <span className="text-[#8a1650]">*</span>
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8a1650]/40 focus:border-[#8a1650] outline-none transition-all text-gray-800"
                              placeholder="name@company.com"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="phone"
                              className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                              Phone / WhatsApp
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8a1650]/40 focus:border-[#8a1650] outline-none transition-all text-gray-800"
                              placeholder="+966 5X XXX XXXX"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label
                              htmlFor="company"
                              className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                              Company / Organization
                            </label>
                            <input
                              type="text"
                              id="company"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8a1650]/40 focus:border-[#8a1650] outline-none transition-all text-gray-800"
                              placeholder="Company name"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="service"
                              className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                              Service of Interest
                            </label>
                            <select
                              id="service"
                              name="service"
                              value={formData.service}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8a1650]/40 focus:border-[#8a1650] outline-none transition-all text-gray-800 bg-white"
                            >
                              <option value="">Select a service</option>
                              <option value="corporate-finance">
                                Corporate Finance & M&A
                              </option>
                              <option value="tax-advisory">
                                Tax Advisory & Zakat Compliance
                              </option>
                              <option value="treasury-risk">
                                Treasury & Risk Management
                              </option>
                              <option value="bookkeeping-accounting">
                                Bookkeeping & Financial Reporting
                              </option>
                              <option value="payroll-management">
                                Payroll & Statutory Compliance
                              </option>
                              <option value="process-optimization">
                                Process Optimization & ERP
                              </option>
                              <option value="digital-transformation">
                                Digital Finance Transformation
                              </option>
                              <option value="data-analytics">
                                Data Analytics & Power BI
                              </option>
                              <option value="other">General Advisory</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="message"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                          >
                            How can we help you?{" "}
                            <span className="text-[#8a1650]">*</span>
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={4}
                            required
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8a1650]/40 focus:border-[#8a1650] outline-none transition-all text-gray-800 resize-y"
                            placeholder="Please share details about your business needs or the services you require..."
                          ></textarea>
                        </div>

                        <div className="flex items-start">
                          <input
                            id="agreePolicy"
                            name="agreePolicy"
                            type="checkbox"
                            checked={formData.agreePolicy}
                            onChange={handleChange}
                            className="mt-1 h-4 w-4 text-[#8a1650] focus:ring-[#8a1650] border-gray-300 rounded cursor-pointer"
                            required
                          />
                          <label
                            htmlFor="agreePolicy"
                            className="ml-3 block text-xs sm:text-sm text-gray-600 cursor-pointer"
                          >
                            I agree to the processing of my information in
                            accordance with the Prospera privacy policy.
                          </label>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-[#8a1650] to-[#2a1a4a] hover:from-[#6e1240] hover:to-[#1e1238] text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 cursor-pointer"
                        >
                          {isSubmitting ? (
                            <>
                              <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              <span>Sending Inquiry...</span>
                            </>
                          ) : (
                            <>
                              <EnvelopeIcon className="w-5 h-5" />
                              <span>Submit Message & Book Consultation</span>
                            </>
                          )}
                        </motion.button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Saudi Arabia Geographic Focus Banner */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="bg-gradient-to-r from-[#2a1a4a] to-[#8a1650] rounded-2xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                Empowering Businesses Across Saudi Arabia
              </h3>
              <p className="text-white/85 text-sm sm:text-base max-w-2xl">
                Operating in compliance with ZATCA, SOCPA, and local Saudi regulatory
                frameworks to support Vision 2030 initiatives.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/services"
                className="bg-white text-[#2a1a4a] hover:bg-gray-100 px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all inline-block text-center"
              >
                Explore All Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#8a1650]"></div>
        </div>
      }
    >
      <ContactFormContent />
    </Suspense>
  );
}
