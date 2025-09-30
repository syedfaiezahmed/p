"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FAQItem } from "../ui/FAQItem";

interface FAQItemType {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItemType[];
  openIndex: number | null;
  setOpenIndex: (index: number | null) => void;
}

export const FAQSection = ({
  faqs,
  openIndex,
  setOpenIndex,
}: FAQSectionProps) => {
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 bg-gray-50"> {/* Reduced from py-16 */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 items-start"> {/* Reduced gap from gap-12 */}
          {/* Left Column - Simplified Text Content */}
          <div className="lg:w-1/2 flex flex-col h-full">
            <div className="lg:pr-12 w-full">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl pt-8 sm:text-4xl font-bold text-[#382460] mb-4"
              >
                Frequently Asked Questions
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-gray-600 mb-6"
              >
                Find quick answers to frequently asked questions about our
                services, pricing, processes, support, timelines, payment
                methods, and everything else you need to know instantly.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              />
            </div>
          </div>

          {/* Right Column - FAQ Items */}
          <div className="lg:w-1/2 space-y-3"> {/* Reduced space-y-4 to space-y-3 */}
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onClick={() => toggleFaq(index)}
              />
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-6"
            >
              <Link
                href="/contact"
                className="inline-block bg-gradient-to-r from-[#b62166] to-[#382460] hover:from-[#8a1650] hover:to-[#2a1a4a] text-white px-6 py-2 rounded-md font-medium shadow-md transition-all duration-300"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};