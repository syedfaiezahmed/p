"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HeroCarousel } from "./components/sections/HeroCarousel";
import { StatsSection } from "./components/sections/StatsSection";
import { ImageContentSection } from "./components/sections/ImageContentSection";
import { AimSection } from "./components/sections/AimSection";
import { ServicesSection } from "./components/sections/ServicesSection";
import { FAQSection } from "./components/sections/FAQSection";
import { CTASection } from "./components/sections/CTASection";
import BenefitsSection from "./components/sections/BenefitsSection";
import { ApproachSection } from "./components/sections/ApproachSection";
import { TeamSection } from "./components/sections/TeamSection";
import { Footer } from "./components/ui/footer";
import TestimonialsSection from "./components/sections/TestimonialsSection";
// Main Page Component
export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Data
  const carouselItems = [
    {
      image: "/images/hero image.jpg",
      title: "Accounting Simplified...",
      description:
        "Unlock your full potential and transform with our comprehensive range of services in finance, technology, human resources, and statutory compliance.",
      buttonText: "Get Started",
    },
    {
      image: "/images/hero image2.jpg",
      title: "Financial Guidance",
      description:
        "Experience unparalleled financial guidance with our expert consulting services. Whether you're an individual or a business, our tailored solutions are designed to empower your financial journey.",
      buttonText: "Start your Journey",
    },
    {
      image: "/images/hero image3.jpg",
      title: "Financial Advisory",
      description:
        "Transform your financial future with our expert consulting services, where personalized strategies meet industry insights.",
      buttonText: "Consult Now",
    },
  ];

  const stats = [
    { value: "15+", label: "Years Experience" },
    { value: "500+", label: "Satisfied Clients" },
    { value: "$1B+", label: "Assets Managed" },
    { value: "24/7", label: "Client Support" },
  ];

  const services = [
    {
      title: "Bookkeeping Services",
      description: "",
      image: "/images/Bookkeeping Services.jpg",
    },
    {
      title: "Comprehensive Financial Planning",
      description: "",
      image: "/images/Financial Planning2.jpg",
    },
    {
      title: "Payroll Management",
      description: "",
      image: "/images/Payroll4.jpg",
    },
    {
      title: "Process Optimization",
      description: "",
      image: "/images/Business-process-Optimization.jpg",
    },
  ];

  const benefits = [
    {
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      title: "Complimentary Initial Consultation",
      description: "Free initial consultation to understand your needs",
    },
    {
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      title: "Quick Consultations",
      description: "Schedule your consultation today with our easy booking",
    },
    {
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
      title: "Client Portal",
      description: "Track your financial progress in real-time, anytime",
    },
    {
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z",
      title: "Available 24/7",
      description: "We're here to assist you, day and night",
    },
  ];

  const faqs = [
    {
      question: "What services does your company offer?",
      answer:
        "Our company specializes in bookkeeping services, financial consulting, process improvement, and compliance services. We tailor our services to fit the unique needs of clients across various sectors, helping them grow and succeed in a competitive market.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach our support team by emailing inquire@prosperaksa.com or calling +966 557 147 386. Our dedicated team is available 24/7 to assist with any inquiries or issues.",
    },
    {
      question: "How do you charge for your services?",
      answer:
        "We offer a satisfaction guarantee for all consulting services. Clients must provide feedback within 30 days of engagement. Adjustments or refunds are processed within 5-7 business days of receiving the request.",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <HeroCarousel items={carouselItems} />
      <StatsSection stats={stats} />
      <ImageContentSection />
      <AimSection />
      <ServicesSection services={services} />
      <ApproachSection />
      <BenefitsSection benefits={benefits} />
      <TeamSection />
      <CTASection />
      <TestimonialsSection />
      <FAQSection
        faqs={faqs}
        openIndex={openFaqIndex}
        setOpenIndex={setOpenFaqIndex}
      />
      <Footer />
    </main>
  );
}
