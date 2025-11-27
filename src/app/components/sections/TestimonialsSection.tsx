"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const TestimonialCarousel = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CFO, TechFlow Solutions",
      content:
        "We're thrilled to observe the increased efficiency and streamlined resulting from their valuable contributions!",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Finance Director, Global Manufacturing Inc.",
      content: "Their team is knowledgeable and incredibly helpful!",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "CEO, Innovate Labs",
      content:
        "They've become a seamless extension of our business, handling the financial side so efficiently, freeing up valuable time and resources.",
      rating: 5,
    },
    {
      id: 4,
      name: "David Wilson",
      position: "Operations Manager, Retail Chain Co.",
      content:
        "It's such a relief knowing our finances are in expert hands, without the need for a full-time finance department.",
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex gap-1 justify-center mb-2">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className="py-12 bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#382460] mb-3 leading-snug"
          >
            Client Testimonials
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-snug"
          >
            Trusted by industry leaders who have experienced our exceptional
            financial services
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white rounded-lg shadow-md border-t-4 border-[#b62166] hover:shadow-lg transition-all flex flex-col h-full"
              >
                <div className="p-6 flex flex-col flex-grow">
                  <StarRating rating={testimonials[currentIndex].rating} />
                  <blockquote className="text-gray-600 mb-4 flex-grow text-center italic text-lg md:text-xl leading-snug">
                    "{testimonials[currentIndex].content}"
                  </blockquote>
                  <div className="text-center mt-auto">
                    <div className="font-bold text-[#382460] text-xl md:text-2xl leading-tight">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-gray-600 text-base md:text-lg mt-1 leading-tight">
                      {testimonials[currentIndex].position}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-[#b62166]" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentIndex(
                (prev) => (prev - 1 + testimonials.length) % testimonials.length
              )
            }
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-3 sm:-translate-x-5 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all"
            aria-label="Previous testimonial"
          >
            <svg
              className="w-5 h-5 text-[#382460]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev + 1) % testimonials.length)
            }
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-3 sm:translate-x-5 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all"
            aria-label="Next testimonial"
          >
            <svg
              className="w-5 h-5 text-[#382460]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
