"use client";

import { motion } from "framer-motion";

interface StatItem {
  value: string;
  label: string;
}

export function StatsSection({ stats }: { stats: StatItem[] }) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center"
            >
              <h3 className="text-4xl font-bold text-[#382460] mb-2">
                {stat.value}
              </h3>
              <div className="w-12 h-1 bg-gradient-to-r from-[#382460] to-purple-400 mb-2" />
              <p className="text-lg text-gray-700 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}