"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Bars3Icon,
  XMarkIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  InstagramIcon,
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const openEmail = (
  to = "inquire@prosperaksa.com",
  subject = "Inquiry from Website"
) => {
  try {
    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}`;
    window.location.href = mailto;

    setTimeout(() => {
      if (!document.hidden) {
        const gmail = `https://mail.google.com/mail/?view=cm&to=${to}&su=${encodeURIComponent(
          subject
        )}`;
        window.open(gmail, "_blank", "noopener,noreferrer");
      }
    }, 500);
  } catch (e) {
    window.open(
      `https://mail.google.com/mail/?view=cm&to=${to}`,
      "_blank",
      "noopener,noreferrer"
    );
  }
};

const CONTAINER = "mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [contactHidden, setContactHidden] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    {
      name: "Services",
      href: "/services",
      subItems: [
        { name: "Financial Services", href: "/services/financial" },
        { name: "Digital Services", href: "/services/digital" },
      ],
    },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    {
      icon: <FacebookIcon className="h-4 w-4" aria-hidden="true" />,
      href: "https://facebook.com",
      label: "Facebook",
    },
    {
      icon: <TwitterIcon className="h-4 w-4" aria-hidden="true" />,
      href: "https://twitter.com",
      label: "Twitter",
    },
    {
      icon: <LinkedinIcon className="h-4 w-4" aria-hidden="true" />,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
    {
      icon: <InstagramIcon className="h-4 w-4" aria-hidden="true" />,
      href: "https://instagram.com",
      label: "Instagram",
    },
  ];

  const handleServicesMouseEnter = () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
    setServicesOpen(true);
  };

  const handleServicesMouseLeave = () => {
    const timeout = setTimeout(() => {
      setServicesOpen(false);
    }, 300);
    setHideTimeout(timeout);
  };

  const handleDropdownMouseEnter = () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
  };

  const handleDropdownMouseLeave = () => {
    const timeout = setTimeout(() => {
      setServicesOpen(false);
    }, 200);
    setHideTimeout(timeout);
  };

  useEffect(() => {
    setIsMounted(true);
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      setContactHidden(y > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    const handleRouteChange = () => setIsOpen(false);
    window.addEventListener("routeChangeComplete", handleRouteChange);
    return () => {
      window.removeEventListener("routeChangeComplete", handleRouteChange);
    };
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && navRef.current) {
      const focusableElements = navRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      firstElement?.focus();

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      document.addEventListener("keydown", handleTabKey);
      return () => document.removeEventListener("keydown", handleTabKey);
    }
  }, [isOpen]);

  if (!isMounted) return null;

  return (
    <header
      className={twMerge(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 bg-white",
        scrolled && "shadow-lg"
      )}
      aria-label="Main navigation"
    >
      {/* Top contact bar with gradient */}
      <AnimatePresence>
        {!contactHidden && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-gradient-to-r from-[#b62166] to-[#382460] text-white text-xs sm:text-sm overflow-hidden"
          >
            <div className={CONTAINER}>
              <div className="flex items-center justify-between py-2">
                <motion.div
                  className="flex items-center gap-4 sm:gap-6"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link
                    href="tel:+966557147386"
                    className="flex items-center gap-1 hover:opacity-80 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    aria-label="Call us at +966 557147386"
                  >
                    <PhoneIcon
                      className="h-3 w-3 sm:h-4 sm:w-4"
                      aria-hidden="true"
                    />
                    <span>+966&nbsp;557147386</span>
                  </Link>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      openEmail();
                    }}
                    className="flex items-center gap-1 hover:opacity-80 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    aria-label="Email us at inquire@prosperaksa.com"
                  >
                    <EnvelopeIcon
                      className="h-3 w-3 sm:h-4 sm:w-4"
                      aria-hidden="true"
                    />
                    <span className="whitespace-nowrap hidden sm:inline">
                      inquire@prosperaksa.com
                    </span>
                    <span className="whitespace-nowrap sm:hidden">
                      Email&nbsp;Us
                    </span>
                  </button>
                </motion.div>

                <motion.div
                  className="flex items-center gap-2 sm:gap-4"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="hidden sm:inline-block text-xs font-medium">
                    Follow&nbsp;Us:
                  </span>
                  {socialLinks.map(({ icon, href, label }, i) => (
                    <Link
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-[#b62166] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      aria-label={label}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {icon}
                      </motion.div>
                    </Link>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={CONTAINER}>
        <div className="flex items-center justify-between h-14 sm:h-20 lg:h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Link
              href="/"
              className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#382460]"
              aria-label="Prosperaksa Home"
            >
              <Image
                src="/images/logo.png"
                alt="Prosperaksa logo"
                width={280}
                height={100}
                className="h-12 w-auto sm:h-14"
                priority
              />
            </Link>
          </motion.div>

          <nav
            className="hidden md:flex items-center h-full gap-1"
            aria-label="Main menu"
          >
            {navLinks.map(({ name, href, subItems }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.06 }}
                className="h-full flex items-center relative"
                onMouseEnter={
                  name === "Services" ? handleServicesMouseEnter : undefined
                }
                onMouseLeave={
                  name === "Services" ? handleServicesMouseLeave : undefined
                }
              >
                <Link
                  href={href}
                  className={clsx(
                    "relative px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-1",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#382460]",
                    pathname === href ||
                      (href === "/services" && pathname.startsWith("/services"))
                      ? "text-white bg-[#382460] shadow-md"
                      : "text-[#382460] hover:text-white hover:bg-[#382460]/90"
                  )}
                  onClick={() => setServicesOpen(false)}
                  aria-current={
                    pathname === href ||
                    (href === "/services" && pathname.startsWith("/services"))
                      ? "page"
                      : undefined
                  }
                >
                  {name}
                  {subItems && (
                    <ChevronDownIcon
                      className={`h-4 w-4 transition-transform ${
                        servicesOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  )}
                  {pathname === href && (
                    <motion.span
                      layoutId="navUnderline"
                      className="absolute left-0 -bottom-0.5 h-0.5 w-full bg-white"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 28,
                      }}
                    />
                  )}
                </Link>

                {subItems && servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50"
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                  >
                    {subItems.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={clsx(
                          "block px-4 py-2 text-sm hover:bg-[#382460]/10 transition-colors",
                          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#382460]",
                          pathname === subItem.href
                            ? "text-[#382460] font-medium"
                            : "text-gray-700"
                        )}
                        aria-current={
                          pathname === subItem.href ? "page" : undefined
                        }
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </nav>

          <motion.div
            className="hidden md:flex items-center gap-4"
            whileHover={{ scale: 1.05 }}
          >
            <Link
              href="/contact"
              className="bg-[#382460] text-white px-5 py-2 rounded-md font-semibold text-sm shadow hover:bg-[#382460]/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#382460]"
            >
              Get in Touch
            </Link>
          </motion.div>

          <button
            className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#b62166]"
            onClick={() => setIsOpen((o) => !o)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? (
              <XMarkIcon
                className="h-7 w-7 text-[#382460]"
                aria-hidden="true"
              />
            ) : (
              <Bars3Icon
                className="h-7 w-7 text-[#382460]"
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={navRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden bg-white shadow-lg"
            aria-label="Mobile menu"
          >
            <div className="px-4 pb-4 pt-2 flex flex-col gap-2">
              {navLinks.map(({ name, href, subItems }) => (
                <div key={name}>
                  <Link
                    href={href}
                    className={clsx(
                      "block px-4 py-2 rounded-md text-base font-medium transition-all",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#382460]",
                      pathname === href ||
                        (href === "/services" &&
                          pathname.startsWith("/services"))
                        ? "text-white bg-[#382460]"
                        : "text-[#382460] hover:text-white hover:bg-[#382460]/90"
                    )}
                    onClick={() => {
                      if (!subItems) setIsOpen(false);
                    }}
                    aria-current={
                      pathname === href ||
                      (href === "/services" && pathname.startsWith("/services"))
                        ? "page"
                        : undefined
                    }
                  >
                    <div className="flex justify-between items-center">
                      {name}
                      {subItems && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setServicesOpen(!servicesOpen);
                          }}
                          className="p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#382460]"
                          aria-expanded={servicesOpen}
                          aria-controls={`mobile-submenu-${name.toLowerCase()}`}
                        >
                          <ChevronDownIcon
                            className={`h-5 w-5 transition-transform ${
                              servicesOpen ? "rotate-180" : ""
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      )}
                    </div>
                  </Link>

                  {subItems && servicesOpen && (
                    <div
                      id={`mobile-submenu-${name.toLowerCase()}`}
                      className="pl-4 mt-1 space-y-1"
                    >
                      {subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={clsx(
                            "block px-4 py-2 rounded-md text-sm font-medium transition-all",
                            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#382460]",
                            pathname === subItem.href
                              ? "text-white bg-[#382460]/80"
                              : "text-[#382460] hover:text-white hover:bg-[#382460]/70"
                          )}
                          onClick={() => setIsOpen(false)}
                          aria-current={
                            pathname === subItem.href ? "page" : undefined
                          }
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/contact"
                className="mt-2 bg-[#382460] text-white px-4 py-2 rounded-md font-semibold text-base shadow hover:bg-[#382460]/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#382460]"
                onClick={() => setIsOpen(false)}
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
