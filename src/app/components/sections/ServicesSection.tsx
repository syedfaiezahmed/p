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
    <section className="py-12 sm:py-16 bg-gray-50">
      {" "}
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          {" "}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-[#382460] mb-3"
          >
            Our Financial Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Building strategies that embody lasting success, clear vision, and
            innovative solutions.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {" "}
          {/* Reduced from gap-8 */}
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-lg shadow-md border-t-4 border-[#b62166] hover:shadow-lg transition-all flex flex-col h-full overflow-hidden"
            >
              <div className="relative w-full h-44">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Content with padding */}
              <div className="p-5 flex flex-col flex-grow">
                {" "}
                {/* Reduced from p-6 */}
                <h3 className="text-xl font-bold text-[#382460] mb-2 text-center">
                  {" "}
                  {/* Reduced from mb-3 */}
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-3 text-center flex-grow">
                  {" "}
                  {/* Reduced from mb-4 */}
                  {service.description}
                </p>
                <div className="text-center mt-auto">
                  <Link
                    href="/services"
                    className="inline-block text-[#b62166] font-medium hover:underline flex items-center gap-1 justify-center text-sm"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
