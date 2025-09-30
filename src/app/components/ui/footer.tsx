"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerData = {
    contact: {
      title: "Contact Us",
      items: [
        {
          icon: <FaMapMarkerAlt className="text-[#b62166]" />,
          text: "123 Financial District, Riyadh, Saudi Arabia",
        },
        {
          icon: <FaPhoneAlt className="text-[#b62166]" />,
          text: "+966 557 147 386",
          href: "tel:+966557147386",
        },
        {
          icon: <FaEnvelope className="text-[#b62166]" />,
          text: "info@prospera.com",
          href: "mailto:info@prospera.com",
        },
      ],
    },
    company: {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Our Team", href: "/team" },
        { name: "Careers", href: "/careers" },
        { name: "Blog", href: "/blog" },
      ],
    },
    services: {
      title: "Services",
      links: [
        { name: "Financial Planning", href: "/services/financial-planning" },
        { name: "Tax Consulting", href: "/services/tax-consulting" },
        { name: "Wealth Management", href: "/services/wealth-management" },
        { name: "Business Strategy", href: "/services/business-strategy" },
      ],
    },
    social: [
      {
        icon: <FaLinkedinIn className="w-4 h-4" />,
        color: "hover:bg-[#0077b5]",
        label: "LinkedIn",
      },
      {
        icon: <FaTwitter className="w-4 h-4" />,
        color: "hover:bg-[#1DA1F2]",
        label: "Twitter",
      },
      {
        icon: <FaInstagram className="w-4 h-4" />,
        color: "hover:bg-gradient-to-tr from-yellow-400 to-pink-600",
        label: "Instagram",
      },
    ],
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#382460] to-[#1a103a]">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-15 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#b62166] rounded-full filter blur-[90px]"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-[#382460] rounded-full filter blur-[100px]"></div>
      </div>

      <div className="relative z-10 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold bg-[#b62166] bg-clip-text text-transparent">
                Prospera
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Empowering your financial journey with innovative solutions and
                expert guidance.
              </p>
              <div className="flex space-x-4">
                {footerData.social.map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ y: -3, scale: 1.1 }}
                    className={`text-gray-300 hover:text-white transition-all p-3 bg-[#382460]/70 backdrop-blur-sm rounded-full border border-[#b62166]/30 ${social.color}`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Company Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-white">
                {footerData.company.title}
              </h3>
              <ul className="space-y-3">
                {footerData.company.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors flex items-start group"
                    >
                      <span className="w-2 h-2 mt-2.5 mr-2 bg-[#b62166] rounded-full flex-shrink-0 group-hover:w-3 transition-all"></span>
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Services Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-white">
                {footerData.services.title}
              </h3>
              <ul className="space-y-3">
                {footerData.services.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors flex items-start group"
                    >
                      <span className="w-2 h-2 mt-2.5 mr-2 bg-[#b62166] rounded-full flex-shrink-0 group-hover:w-3 transition-all"></span>
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-white">
                {footerData.contact.title}
              </h3>
              <address className="not-italic space-y-4 text-gray-300">
                {footerData.contact.items.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 3 }}
                    className="flex items-start"
                  >
                    <span className="mt-0.5 mr-3">{item.icon}</span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="hover:text-white transition-colors"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </motion.div>
                ))}
              </address>
            </motion.div>
          </div>

          {/* Copyright Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="border-t border-[#b62166]/30 pt-8 text-center"
          >
            <p className="text-gray-400 text-sm">
              © {currentYear} Prospera Financial Consultants. All rights
              reserved.
              {/* <span className="mx-2">|</span>
              <Link
                href="https://digisparkify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#b62166] hover:underline"
              >
                Developed by Digisparkify
              </Link> */}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
