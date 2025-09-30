"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function TeamSection() {
  const teamMembers = [
    {
      name: "Saeed A. Siddiqui",
      position: "Managing Partner",
      image: "/images/team/Saeed.jpg",
    },
    {
      name: "Siraj Ahmed Ansari",
      position: "Partner",
      image: "/images/team/Siraj.jpg",
    },
    {
      name: "Salman Ahmed",
      position: "Director",
      image: "/images/team/Salman Ahmed.jpg",
    },
    {
      name: "Asif Ahmed",
      position: "Director",
      image: "/images/team/Asif.jpg",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-[#382460] mb-3"
          >
            Meet Our Executive Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Dedicated professionals driving our success with decades of combined expertise
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-lg shadow-md border-t-4 border-[#b62166] hover:shadow-lg transition-all flex flex-col h-full overflow-hidden"
            >
              {/* Image container */}
              <div className="relative w-full h-60">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const fallback = document.createElement("div");
                    fallback.className =
                      "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#382460] to-[#6d5b93]";
                    fallback.innerHTML = `<span class="text-white text-4xl font-bold">${member.name.charAt(0)}</span>`;
                    target.parentNode?.appendChild(fallback);
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-[#382460] mb-2 text-center">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-center">
                  {member.position}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional team members section */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[#382460] mb-3">
              Core Team Members
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-[#b62166] to-[#382460] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { name: "Salman Jafri", role: "Director" },
              { name: "Jawad Yaqoob", role: "Team Lead" },
              { name: "Nauman Afzal", role: "Team Member" },
              { name: "Mohammed Usman", role: "Team Member" }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-4"
              >
                <div className="bg-gradient-to-br from-[#382460] to-[#b62166] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h4 className="font-semibold text-[#382460] text-sm">
                  {member.name}
                </h4>
                <p className="text-gray-600 text-xs">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}