"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ServiceItem {
  title: string;
  description: string;
  image: string;
}

export function ServicesSection({ services }: { services: ServiceItem[] }) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#382460] mb-6"
          >
            New Services Available
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#382460] to-[#b62166] bg-clip-text text-transparent max-w-4xl mx-auto leading-tight"
          >
            Transform Your Business With Expert Solutions
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 flex flex-col h-full overflow-hidden border border-gray-100"
            >
              <div className="relative w-full h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                <div className="absolute top-4 left-4 z-20">
                  <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-[#382460] font-bold text-sm">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-[#382460] mb-3 group-hover:text-[#b62166] transition-colors duration-300 line-clamp-2">
                  {service.title}
                </h3>

                <p className="text-gray-600 text-base mb-4 flex-grow leading-relaxed line-clamp-3">
                  {service.description}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-100">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-[#b62166] font-semibold hover:text-[#382460] transition-all duration-300 group/link text-base"
                  >
                    <span className="relative">
                      Learn More
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#b62166] group-hover/link:w-full transition-all duration-300"></span>
                    </span>
                    <span className="group-hover/link:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </Link>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#382460] to-[#b62166] group-hover:w-full transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}