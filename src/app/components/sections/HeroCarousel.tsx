"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface CarouselItem {
  image: string;
  title: string;
  description: string;
  buttonText: string;
}

export function HeroCarousel({ items }: { items: CarouselItem[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % items.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length);
  const goToSlide = (index: number) => setCurrentSlide(index);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoPlay) {
      interval = setInterval(nextSlide, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoPlay, currentSlide]);

  return (
    <section
      className="relative h-[65vh] w-full overflow-hidden"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSlide === index ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover object-center"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#382460cc] to-[#b62166cc]" />
          </motion.div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 z-20 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 z-20 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-white w-6"
                : "bg-white/50 w-2 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 h-full flex items-center justify-start relative z-10">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left max-w-3xl w-full px-4"
        >
          {/* Title */}
          {items[currentSlide].title && (
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-white leading-tight">
              {items[currentSlide].title}
            </h1>
          )}

          {/* Description (3rd slide BIG only) */}
          <p
            className={`mb-3 text-white/90 max-w-2xl leading-snug ${
              currentSlide === 2
                ? "text-xl sm:text-3xl font-bold"
                : items[currentSlide].title
                ? "text-base sm:text-lg"
                : "text-lg sm:text-xl font-semibold"
            }`}
          >
            {items[currentSlide].description}
          </p>

          {/* Button LEFT aligned */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="mt-4"
          >
            <Link
              href="/contact"
              className="inline-block border-2 border-white bg-gradient-to-r from-[#b62166] to-[#382460] hover:from-[#8a1650] hover:to-[#2a1a4a] text-white px-6 py-3 rounded-md font-semibold text-base shadow-lg transition-all duration-300 uppercase tracking-wide min-w-[160px] text-left"
            >
              {items[currentSlide].buttonText}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
