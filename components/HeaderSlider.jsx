import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const HeaderSlider = () => {
  const router = useRouter();

  const sliderData = [
    {
      id: 1,
      eyebrow: "Best Seller",
      title: "Sandal Crocs Pink Casual",
      description: "The perfect pair for your next adventure — lightweight, comfy, and effortlessly stylish.",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: assets.header_pink_crocs,
      link: "/product/6abe379aea64e4aad3352011",
    },
    {
      id: 2,
      eyebrow: "New Arrival",
      title: "Sandal Flip Flop Biru",
      description: "A casual sandal with a simple design for your everyday moves.",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: assets.header_blue_flop,
      link: "/product/6abe379aea64e4aad3352012",
    },
    {
      id: 3,
      eyebrow: "Classic Pick",
      title: "Sandal Jepit Swallow Pink",
      description: "A durable and comfortable sandal with a timeless classic design.",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: assets.header_pink_swallow,
      link: "/product/6abe379aea64e4aad3352015",
    },
    {
      id: 4,
      eyebrow: "Premium",
      title: "Sandal Lurad Premium",
      description: "A stylish and lightweight sandal with an elegant wood-textured finish.",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: assets.header_lurad_sandal,
      link: "/product/6abe379aea64e4aad3352013",
    },
    {
      id: 5,
      eyebrow: "Limited Edition",
      title: "Sandal Gunung Swallow Ndaweg",
      description: "A special edition sandal featuring handcrafted carvings — built for the trail.",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: assets.header_swallow_ndaweg,
      link: "/product/6abe379aea64e4aad3352014",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const textParent = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const textChild = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="overflow-hidden relative w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => {
          const active = index === currentSlide;
          return (
            <div
              key={slide.id}
              className="grain grid md:grid-cols-2 items-stretch bg-amber-50 mt-6 rounded-3xl min-w-full overflow-hidden border border-amber-200/50"
            >
              <div className="relative flex flex-col justify-center px-6 py-10 md:px-14 md:py-16 order-2 md:order-1 z-[2]">
                <motion.div
                  variants={textParent}
                  initial="hidden"
                  animate={active ? "show" : "hidden"}
                >
                  <motion.span
                    variants={textChild}
                    className="inline-flex w-fit items-center rounded-lg bg-amber-300 text-neutral-900 text-xs font-bold px-3.5 py-1.5 mb-5 -rotate-2 shadow-md border border-neutral-900/10"
                  >
                    ✦ {slide.eyebrow}
                  </motion.span>
                  <motion.h1
                    variants={textChild}
                    className="font-display text-4xl md:text-[52px] md:leading-[56px] font-semibold tracking-tight text-neutral-900"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    variants={textChild}
                    className="mt-4 text-neutral-600 max-w-md text-sm md:text-base leading-relaxed"
                  >
                    {slide.description}
                  </motion.p>
                  <motion.div
                    variants={textChild}
                    className="flex items-center gap-5 mt-7 md:mt-9"
                  >
                    <motion.button
                      whileTap={{ scale: 0.94 }}
                      onClick={() => router.push(slide.link || "/")}
                      className="px-8 md:px-10 py-3 bg-neutral-900 text-white rounded-full text-sm font-semibold hover:bg-emerald-800 transition-colors"
                    >
                      {slide.buttonText1}
                    </motion.button>
                    <button
                      onClick={() => router.push("/all-products")}
                      className="group flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-emerald-800 transition-colors"
                    >
                      {slide.buttonText2}
                      <Image
                        className="group-hover:translate-x-1 transition"
                        src={assets.arrow_icon}
                        alt="arrow_icon"
                      />
                    </button>
                  </motion.div>
                </motion.div>
              </div>
              <div className="relative min-h-64 md:min-h-[400px] order-1 md:order-2 overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  initial={false}
                  animate={active ? { scale: 1 } : { scale: 1.08 }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    className="absolute inset-0 w-full h-full object-cover"
                    src={slide.imgSrc}
                    alt={`Slide ${index + 1}`}
                    fill
                    priority={index === 0}
                  />
                </motion.div>
                <span className="absolute bottom-4 right-4 z-[2] rotate-3 rounded-lg bg-white/95 text-neutral-900 text-[11px] font-bold px-3 py-1.5 shadow-lg border border-neutral-900/10">
                  Koleksi Capit ✦
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2 mt-6">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full cursor-pointer transition-all ${
              currentSlide === index ? "w-8 bg-neutral-900" : "w-2 bg-neutral-300 hover:bg-neutral-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
