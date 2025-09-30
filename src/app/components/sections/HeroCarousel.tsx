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
    if (autoPlay) interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [autoPlay, currentSlide]);

  return (
    <section
      className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] min-h-[400px] max-h-[900px] overflow-hidden"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
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

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 sm:h-2 sm:w-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-white w-6" : "bg-white/50 w-2"
            }`}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl px-4"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 text-white">
            {items[currentSlide].title}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl mb-6 text-white/90 max-w-2xl mx-auto leading-relaxed">
            {items[currentSlide].description}
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-20"
          >
            <Link
              href="/contact"
              className="inline-block border-2 border-white bg-gradient-to-r from-[#b62166] to-[#382460] hover:from-[#8a1650] hover:to-[#2a1a4a] text-white px-6 py-3 rounded-md font-bold text-base shadow-lg transition-all duration-300 uppercase tracking-wide min-w-[180px] text-center"
            >
              {items[currentSlide].buttonText}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
