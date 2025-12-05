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
        className="absolute left-2 sm:left-4 top-1/2 z-20 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 z-20 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full ${currentSlide === index ? "bg-white w-6" : "bg-white/50 w-2"
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
          className={`max-w-3xl w-full px-4 
            ${currentSlide === 1
              ? "mx-auto text-center flex flex-col items-center"
              : "ml-4 sm:ml-8 md:ml-16 text-left"
            }
          `}
        >
          {/* Title */}
          {items[currentSlide].title && (
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-white">
              {items[currentSlide].title}
            </h1>
          )}

          {/* Description */}
          <p
            className={`mb-3 text-white/90 leading-snug 
                ${currentSlide === 1
                ? "text-center mx-auto text-xl sm:text-2xl font-bold max-w-3xl"
                : currentSlide === 2
                  ? "text-xl sm:text-3xl font-bold max-w-2xl text-left"
                  : "text-base sm:text-lg max-w-2xl text-left"
              }
          `}
          >
            {items[currentSlide].description}
          </p>

          {/* Button */}
          <div className={`mt-4 ${currentSlide === 1 ? "flex justify-center" : ""}`}>
            <Link
              href="/contact"
              className="inline-block border-2 border-white bg-gradient-to-r from-[#b62166] to-[#382460] text-white px-6 py-3 rounded-md font-semibold shadow-lg uppercase tracking-wide"
            >
              {items[currentSlide].buttonText}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
