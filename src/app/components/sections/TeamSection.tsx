"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function TeamSection() {
  const teamMembers = [
    {
      name: "Saeed A. Siddiqui",
      position: "Managing Partner",
      image: "/images/team/Saeed.jpg",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "#",
      },
    },
    {
      name: "Siraj Ahmed Ansari",
      position: "Partner",
      image: "/images/team/Siraj.jpg",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "#",
      },
    },
    {
      name: "Salman Ahmed",
      position: "Director",
      image: "/images/team/Salman Ahmed.jpg",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "#",
      },
    },
    {
      name: "Asif Ahmed",
      position: "Director",
      image: "/images/team/Asif.jpg",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "#",
      },
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="px-6 py-3 bg-gradient-to-r from-[#382460] to-[#b62166] text-white text-sm font-semibold rounded-full shadow-lg">
              Leadership Team
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#382460] to-[#b62166] bg-clip-text text-transparent mb-4"
          >
            Meet Our Visionaries
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Guided by exceptional leaders with decades of combined expertise,
            driving innovation and excellence forward
          </motion.p>
        </div>

        {/* Executive Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {teamMembers.map((member, index) => (
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
                y: -12,
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
              className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col h-full overflow-hidden border border-gray-100"
            >
              {/* Image Container */}
              <div className="relative w-full h-72 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const fallback = document.createElement("div");
                    fallback.className =
                      "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#382460] to-[#6d5b93]";
                    fallback.innerHTML = `<span class="text-white text-4xl font-bold">${member.name.charAt(
                      0
                    )}</span>`;
                    target.parentNode?.appendChild(fallback);
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-[#382460] mb-2 text-center group-hover:text-[#b62166] transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-gray-500 text-center text-sm font-medium mb-4">
                  {member.position}
                </p>

                {/* Social Links - Always Visible */}
                <div className="flex justify-center space-x-3 mt-2">
                  <motion.a
                    href={member.social.linkedin}
                    whileHover={{ scale: 1.2, y: -2 }}
                    className="w-10 h-10 bg-gray-100 hover:bg-[#0077b5] rounded-full flex items-center justify-center transition-all duration-300 group/social"
                  >
                    <span className="text-gray-500 group-hover/social:text-white text-sm font-bold">
                      in
                    </span>
                  </motion.a>

                  <motion.a
                    href={member.social.twitter}
                    whileHover={{ scale: 1.2, y: -2 }}
                    className="w-10 h-10 bg-gray-100 hover:bg-black rounded-full flex items-center justify-center transition-all duration-300 group/social"
                  >
                    <span className="text-gray-500 group-hover/social:text-white text-sm">
                      𝕏
                    </span>
                  </motion.a>

                  <motion.a
                    href={`mailto:${member.social.email}`}
                    whileHover={{ scale: 1.2, y: -2 }}
                    className="w-10 h-10 bg-gray-100 hover:bg-[#b62166] rounded-full flex items-center justify-center transition-all duration-300 group/social"
                  >
                    <span className="text-gray-500 group-hover/social:text-white text-sm">
                      ✉
                    </span>
                  </motion.a>
                </div>
              </div>

              {/* Gradient Border Bottom */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#382460] to-[#b62166] group-hover:w-full transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>

        {/* Core Team Members Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <div className="text-center mb-10">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-[#382460] mb-4"
            >
              Our Core Team
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-20 h-1 bg-gradient-to-r from-[#b62166] to-[#382460] mx-auto rounded-full"
            ></motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "Salman Jafri",
                role: "Director",
                social: { linkedin: "#", email: "#" },
              },
              {
                name: "Jawad Yaqoob",
                role: "Team Lead",
                social: { linkedin: "#", email: "#" },
              },
              {
                name: "Nauman Afzal",
                role: "Senior Member",
                social: { linkedin: "#", email: "#" },
              },
              {
                name: "Mohammed Usman",
                role: "Senior Member",
                social: { linkedin: "#", email: "#" },
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center group cursor-pointer"
              >
                <div className="relative mb-4 mx-auto w-20 h-20">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#382460] to-[#b62166] rounded-full transform group-hover:scale-110 transition-transform duration-300"></div>
                  <div className="absolute inset-0 bg-white rounded-full m-1 flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
                    <span className="text-[#382460] font-bold text-lg group-hover:text-white transition-colors duration-300">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                </div>
                <h4 className="font-bold text-[#382460] text-sm mb-1 group-hover:text-[#b62166] transition-colors duration-300">
                  {member.name}
                </h4>
                <p className="text-gray-500 text-xs font-medium mb-3">
                  {member.role}
                </p>

                {/* Core Team Social Links */}
                <div className="flex justify-center space-x-2">
                  <motion.a
                    href={member.social.linkedin}
                    whileHover={{ scale: 1.3 }}
                    className="w-6 h-6 bg-gray-100 hover:bg-[#0077b5] rounded-full flex items-center justify-center transition-all duration-300"
                  >
                    <span className="text-gray-500 hover:text-white text-xs font-bold">
                      in
                    </span>
                  </motion.a>
                  <motion.a
                    href={`mailto:${member.social.email}`}
                    whileHover={{ scale: 1.3 }}
                    className="w-6 h-6 bg-gray-100 hover:bg-[#b62166] rounded-full flex items-center justify-center transition-all duration-300"
                  >
                    <span className="text-gray-500 hover:text-white text-xs">
                      ✉
                    </span>
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
