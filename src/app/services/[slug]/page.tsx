// app/services/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { servicesData, ServiceDetail } from "@/data/servicesData";
import { Footer } from "@/app/components/ui/footer";
import {
  CheckCircleIcon,
  ChevronRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ClockIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { MessageCircle } from "lucide-react";
import { connectToDatabase } from "@/lib/db";
import { Service } from "@/lib/models/Service";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getServiceBySlug(slug: string): Promise<ServiceDetail | null> {
  // 1. Try static dataset
  if (servicesData[slug]) {
    return servicesData[slug];
  }

  // 2. Try MongoDB
  try {
    const db = await connectToDatabase();
    if (db) {
      const doc = await Service.findOne({ slug }).lean();
      if (doc) {
        return {
          slug: doc.slug,
          title: doc.title,
          category: (doc.category as any) || "Financial Services",
          categorySlug: (doc.categorySlug as any) || "financial",
          tagline: doc.tagline || doc.shortDescription || "",
          shortDescription: doc.shortDescription || "",
          fullDescription: Array.isArray(doc.fullDescription)
            ? doc.fullDescription
            : [doc.fullDescription || doc.shortDescription || ""],
          heroImage: doc.heroImage || doc.image || "/images/Bookkeeping Services.jpg",
          keyBenefits: doc.keyBenefits && doc.keyBenefits.length > 0 ? doc.keyBenefits : [
            {
              title: "Expert Professional Advisory",
              description: "Dedicated chartered accountants ensuring complete statutory compliance.",
            },
            {
              title: "Tailored Corporate Strategy",
              description: "Custom delivery timelines aligned with your organizational targets.",
            },
          ],
          coreDeliverables: doc.coreDeliverables && doc.coreDeliverables.length > 0 ? doc.coreDeliverables : doc.deliverables || [
            "Comprehensive scope audit and initial kickoff",
            "Monthly executive reporting & management briefings",
          ],
          methodology: doc.methodology && doc.methodology.length > 0 ? doc.methodology : [
            {
              step: "01",
              title: "Discovery & Planning",
              description: "Scoping requirements and organizational alignment.",
            },
            {
              step: "02",
              title: "Implementation & Execution",
              description: "Deploying certified consultants and structured workflows.",
            },
          ],
          targetAudience: doc.targetAudience && doc.targetAudience.length > 0 ? doc.targetAudience : [
            "Saudi Enterprises & GCC Corporates",
            "Mid-Market Organizations",
          ],
          faqs: doc.faqs && doc.faqs.length > 0 ? doc.faqs : [
            {
              question: "How do we begin our engagement with Prospera?",
              answer: "Submit an inquiry via our contact form or WhatsApp to schedule a 30-minute discovery session with our senior consultant.",
            },
          ],
          relatedSlugs: doc.relatedSlugs || ["bookkeeping-services", "financial-planning"],
        };
      }
    }
  } catch (err) {
    console.warn("MongoDB service lookup error:", err);
  }

  return null;
}

// Generate Static Params for Next.js build performance
export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({ slug }));
}

// Dynamic SEO Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found - Prospera KSA",
    };
  }

  return {
    title: `${service.title} - Prospera Consulting KSA`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} - Prospera Consulting KSA`,
      description: service.shortDescription,
      images: [service.heroImage],
    },
  };
}

export default async function DynamicServicePage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = service.relatedSlugs
    .map((s) => servicesData[s])
    .filter(Boolean) as ServiceDetail[];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb Bar */}
      <div className="bg-[#fbf9fd] border-b border-gray-200 py-3.5">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
            <Link
              href="/"
              className="hover:text-[#382460] font-medium transition-colors"
            >
              Home
            </Link>
            <ChevronRightIcon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <Link
              href="/services"
              className="hover:text-[#382460] font-medium transition-colors"
            >
              Services
            </Link>
            <ChevronRightIcon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <Link
              href={
                service.categorySlug === "financial"
                  ? "/services/financial"
                  : "/services/digital"
              }
              className="hover:text-[#8a1650] font-medium transition-colors"
            >
              {service.category}
            </Link>
            <ChevronRightIcon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span className="text-[#382460] font-bold truncate">
              {service.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2a1a4a] via-[#382460] to-[#8a1650] text-white py-16 md:py-24 overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-900/30 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#f0c6d8] text-xs sm:text-sm font-semibold">
                <SparklesIcon className="w-4 h-4 text-[#f0c6d8]" />
                <span>{service.category}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                {service.title}
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-[#f0c6d8] font-medium leading-snug">
                {service.tagline}
              </p>

              <p className="text-white/85 text-sm sm:text-base leading-relaxed max-w-2xl">
                {service.shortDescription}
              </p>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap gap-4 items-center">
                <Link
                  href={`/contact?service=${service.slug}`}
                  className="bg-white text-[#2a1a4a] hover:bg-pink-50 px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-2"
                >
                  <EnvelopeIcon className="w-5 h-5 text-[#8a1650]" />
                  <span>Request Consultation</span>
                </Link>

                <a
                  href={`https://wa.me/966557147386?text=${encodeURIComponent(
                    `Hello Prospera, I am interested in your ${service.title} service.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 group">
                <Image
                  src={service.heroImage}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2a1a4a]/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-xs uppercase tracking-widest text-[#f0c6d8] font-bold block mb-1">
                    Prospera KSA Advisory
                  </span>
                  <p className="text-base font-bold truncate">{service.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Metadata Quick Bar */}
      <div className="bg-[#f8f6fb] border-b border-gray-200 py-6">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="border-r border-gray-200 pr-4 last:border-0">
              <span className="text-xs text-gray-500 font-medium block">
                Category
              </span>
              <span className="text-sm sm:text-base font-bold text-[#382460]">
                {service.category}
              </span>
            </div>
            <div className="border-r border-gray-200 pr-4 last:border-0">
              <span className="text-xs text-gray-500 font-medium block">
                Regulatory Standards
              </span>
              <span className="text-sm sm:text-base font-bold text-[#382460]">
                ZATCA & SOCPA Compliant
              </span>
            </div>
            <div className="border-r border-gray-200 pr-4 last:border-0">
              <span className="text-xs text-gray-500 font-medium block">
                Region Focus
              </span>
              <span className="text-sm sm:text-base font-bold text-[#382460]">
                Riyadh & GCC Market
              </span>
            </div>
            <div>
              <span className="text-xs text-gray-500 font-medium block">
                Consultation Type
              </span>
              <span className="text-sm sm:text-base font-bold text-[#8a1650]">
                On-Site & Virtual Advisory
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Details Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-14">
            {/* Main Column (8 Cols) */}
            <div className="lg:col-span-8 space-y-12">
              {/* Detailed Overview */}
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f8e1eb] text-[#8a1650] rounded-full text-xs font-bold uppercase tracking-wider">
                  Comprehensive Overview
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2a1a4a]">
                  About {service.title}
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-[#8a1650] to-[#2a1a4a] rounded-full"></div>
                <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed pt-2">
                  {service.fullDescription.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Key Benefits Grid */}
              <div className="space-y-6 pt-4">
                <h3 className="text-2xl font-bold text-[#2a1a4a] flex items-center gap-2">
                  <ShieldCheckIcon className="w-7 h-7 text-[#8a1650]" />
                  <span>Key Value & Benefits</span>
                </h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  {service.keyBenefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#faf8fc] border border-gray-100 hover:border-[#8a1650]/30 hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-white text-[#8a1650] flex items-center justify-center font-bold text-sm shadow-xs mb-3 group-hover:bg-[#8a1650] group-hover:text-white transition-colors">
                        {idx + 1}
                      </div>
                      <h4 className="text-lg font-bold text-[#2a1a4a] mb-2 group-hover:text-[#8a1650] transition-colors">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Deliverables Checklist */}
              <div className="space-y-6 pt-4">
                <h3 className="text-2xl font-bold text-[#2a1a4a] flex items-center gap-2">
                  <CheckCircleIcon className="w-7 h-7 text-[#382460]" />
                  <span>Scope of Deliverables</span>
                </h3>
                <div className="bg-[#fcfaff] p-6 sm:p-8 rounded-2xl border border-[#382460]/10 shadow-xs">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {service.coreDeliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-[#8a1650] flex-shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base font-medium text-gray-800">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Methodology / Implementation Process */}
              <div className="space-y-6 pt-4">
                <h3 className="text-2xl font-bold text-[#2a1a4a] flex items-center gap-2">
                  <ClockIcon className="w-7 h-7 text-[#8a1650]" />
                  <span>Our 4-Step Methodology</span>
                </h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  {service.methodology.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow"
                    >
                      <span className="absolute top-3 right-4 text-3xl font-extrabold text-gray-100 group-hover:text-pink-100 transition-colors">
                        {m.step}
                      </span>
                      <span className="text-xs font-bold text-[#8a1650] uppercase tracking-wider block mb-1">
                        Phase {m.step}
                      </span>
                      <h4 className="text-lg font-bold text-[#2a1a4a] mb-2">
                        {m.title}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {m.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Audience */}
              <div className="space-y-5 pt-4">
                <h3 className="text-xl font-bold text-[#2a1a4a] flex items-center gap-2">
                  <UsersIcon className="w-6 h-6 text-[#382460]" />
                  <span>Who This Service Is Built For</span>
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {service.targetAudience.map((audience, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-[#f6ebf2] text-[#8a1650] text-sm font-semibold rounded-xl border border-[#b62166]/20"
                    >
                      {audience}
                    </span>
                  ))}
                </div>
              </div>

              {/* Service FAQs */}
              {service.faqs && service.faqs.length > 0 && (
                <div className="space-y-6 pt-6">
                  <h3 className="text-2xl font-bold text-[#2a1a4a]">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-4">
                    {service.faqs.map((faq, idx) => (
                      <div
                        key={idx}
                        className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs"
                      >
                        <h4 className="text-base sm:text-lg font-bold text-[#2a1a4a] mb-2">
                          {faq.question}
                        </h4>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar (4 Cols) */}
            <div className="lg:col-span-4 space-y-8">
              {/* Sticky Consultation Box */}
              <div className="sticky top-28 space-y-6">
                <div className="bg-gradient-to-br from-[#2a1a4a] via-[#382460] to-[#8a1650] text-white p-7 sm:p-8 rounded-3xl shadow-xl text-center">
                  <span className="text-xs uppercase tracking-widest text-[#f0c6d8] font-bold block mb-2">
                    Direct Inquiry
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Need {service.title}?
                  </h3>
                  <p className="text-white/80 text-sm mb-6 leading-relaxed">
                    Speak directly with a senior partner to discuss custom
                    timelines, scope, and deliverables for your company.
                  </p>

                  <div className="space-y-3">
                    <Link
                      href={`/contact?service=${service.slug}`}
                      className="w-full bg-white text-[#2a1a4a] hover:bg-pink-50 py-3.5 px-4 rounded-xl font-bold text-sm shadow-md transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <EnvelopeIcon className="w-5 h-5 text-[#8a1650]" />
                      <span>Request Free Proposal</span>
                    </Link>

                    <a
                      href={`https://wa.me/966557147386?text=${encodeURIComponent(
                        `Hi Prospera, I want to book a consultation for ${service.title}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-md transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/20 text-xs text-white/70 space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <PhoneIcon className="w-4 h-4 text-[#f0c6d8]" />
                      <a
                        href="tel:+966557147386"
                        className="hover:text-white font-semibold"
                      >
                        +966 557 147 386
                      </a>
                    </div>
                    <div>Sun – Thu: 9:00 AM – 6:00 PM AST</div>
                  </div>
                </div>

                {/* Related Services Card */}
                {relatedServices.length > 0 && (
                  <div className="bg-[#faf8fc] p-6 rounded-3xl border border-gray-200 shadow-xs space-y-4">
                    <h4 className="text-lg font-bold text-[#2a1a4a] pb-2 border-b border-gray-200">
                      Related Services
                    </h4>
                    <div className="space-y-3">
                      {relatedServices.map((rel) => (
                        <Link
                          key={rel.slug}
                          href={`/services/${rel.slug}`}
                          className="p-3.5 rounded-xl bg-white border border-gray-100 hover:border-[#8a1650]/40 hover:shadow-md transition-all duration-200 flex items-center justify-between group block"
                        >
                          <div>
                            <p className="text-xs font-semibold text-[#8a1650]">
                              {rel.category}
                            </p>
                            <p className="text-sm font-bold text-[#2a1a4a] group-hover:text-[#8a1650] transition-colors">
                              {rel.title}
                            </p>
                          </div>
                          <ArrowRightIcon className="w-4 h-4 text-gray-400 group-hover:text-[#8a1650] group-hover:translate-x-1 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-[#2a1a4a] via-[#382460] to-[#8a1650] text-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl text-center">
          <span className="text-[#f0c6d8] uppercase tracking-widest text-xs font-bold block mb-2">
            Accelerate Your Business Today
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
            Ready to Implement {service.title}?
          </h2>
          <p className="text-white/85 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Connect with Prospera's team of senior partners in Riyadh to structure
            customized financial and strategic solutions for your enterprise.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={`/contact?service=${service.slug}`}
              className="bg-white text-[#2a1a4a] hover:bg-pink-50 px-8 py-4 rounded-xl font-bold text-base shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Book Strategy Session
            </Link>
            <Link
              href="/services"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-300"
            >
              Browse All Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
