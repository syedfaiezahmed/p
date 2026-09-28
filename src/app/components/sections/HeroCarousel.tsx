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
    return () => interval && clearInterval(interval);
  }, [autoPlay, currentSlide]);

  return (
    <section
      className="relative h-[65vh] w-full overflow-hidden"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      {/* Background */}
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

      {/* Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-2 sm:left-4 top-1/2 z-20 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-xs hover:scale-110"
      >
        <ChevronLeftIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-2 sm:right-4 top-1/2 z-20 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-xs hover:scale-110"
      >
        <ChevronRightIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-white w-8 shadow-md" : "bg-white/50 w-2.5 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl w-full px-4 ml-2 sm:ml-6 md:ml-12 text-left"
        >
          {/* Title */}
          {items[currentSlide].title && (
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-white leading-tight drop-shadow-md">
              {items[currentSlide].title}
            </h1>
          )}

          {/* Description */}
          <p className="mb-6 text-white/90 text-base sm:text-lg md:text-xl font-normal max-w-2xl leading-relaxed drop-shadow-sm">
            {items[currentSlide].description}
          </p>

          {/* Button */}
          <div>
            <Link
              href="/contact"
              className="inline-block border-2 border-white bg-gradient-to-r from-[#b62166] to-[#382460] hover:from-[#9c1854] hover:to-[#2b1b4b] text-white px-7 py-3 rounded-lg font-semibold shadow-xl uppercase tracking-wider text-sm sm:text-base transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {items[currentSlide].buttonText}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

