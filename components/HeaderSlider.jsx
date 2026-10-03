import React, { useState, useEffect } from "react";
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
      imgSrc: "/products/crocs-pink.jpg",
      link: "/product/6abe379aea64e4aad3352011",
    },
    {
      id: 2,
      eyebrow: "New Arrival",
      title: "Sandal Flip Flop Biru",
      description: "A casual sandal with a simple design for your everyday moves.",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: "/products/flipflop-blue.jpg",
      link: "/product/6abe379aea64e4aad3352012",
    },
    {
      id: 3,
      eyebrow: "Classic Pick",
      title: "Sandal Jepit Swallow Pink",
      description: "A durable and comfortable sandal with a timeless classic design.",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: "/products/swallow-pink.jpg",
      link: "/product/6abe379aea64e4aad3352015",
    },
    {
      id: 4,
      eyebrow: "Premium",
      title: "Sandal Lurad Premium",
      description: "A stylish and lightweight sandal with an elegant wood-textured finish.",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: "/products/lurad-premium.jpg",
      link: "/product/6abe379aea64e4aad3352013",
    },
    {
      id: 5,
      eyebrow: "Limited Edition",
      title: "Sandal Gunung Swallow Ndaweg",
      description: "A special edition sandal featuring handcrafted carvings — built for the trail.",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: "/products/gunung-ndaweg.jpg",
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

  const textParent = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
  };
  const textChild = {
    hidden: { opacity: 0, y: 34 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const renderTitle = (title) => {
    const words = title.split(" ");
    const last = words.pop();
    return (
      <>
        {words.join(" ")}{" "}
        <em className="text-emerald-800">{last}</em>
      </>
    );
  };

  return (
    <section className="grain relative w-full overflow-hidden bg-[#FAF6EC] border-b-2 border-neutral-900">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {sliderData.map((slide, index) => {
            const active = index === currentSlide;
            return (
              <div
                key={slide.id}
                className="min-w-full px-6 md:px-16 lg:px-32 py-12 md:py-20"
              >
                <div className="grid md:grid-cols-12 gap-10 md:gap-8 items-center max-w-7xl mx-auto">
                  {/* Copy */}
                  <div className="md:col-span-7 relative z-[2]">
                    <motion.div
                      variants={textParent}
                      initial="hidden"
                      animate={active ? "show" : "hidden"}
                    >
                      <motion.p
                        variants={textChild}
                        className="inline-flex items-center gap-2 rounded-full border-2 border-neutral-900 bg-white text-neutral-900 text-[11px] font-bold uppercase tracking-[0.18em] px-4 py-1.5 mb-6"
                      >
                        <span className="text-emerald-700">✦</span> {slide.eyebrow}
                      </motion.p>
                      <motion.h1
                        variants={textChild}
                        className="font-display font-semibold tracking-tight text-neutral-900 text-[clamp(2.6rem,6vw,4.9rem)] leading-[1.02]"
                      >
                        {renderTitle(slide.title)}
                      </motion.h1>
                      <motion.p
                        variants={textChild}
                        className="mt-5 text-neutral-600 max-w-md text-sm md:text-lg leading-relaxed"
                      >
                        {slide.description}
                      </motion.p>
                      <motion.div
                        variants={textChild}
                        className="flex flex-wrap items-center gap-x-7 gap-y-4 mt-8 md:mt-10"
                      >
                        <motion.button
                          whileTap={{ scale: 0.94 }}
                          onClick={() => router.push(slide.link || "/")}
                          className="group inline-flex items-center gap-2.5 px-8 md:px-10 py-3.5 bg-neutral-900 text-white rounded-full text-sm font-semibold border-2 border-neutral-900 shadow-[4px_4px_0_rgba(28,25,23,0.9)] hover:shadow-[6px_6px_0_rgba(28,25,23,0.9)] hover:-translate-y-0.5 transition-all"
                        >
                          {slide.buttonText1}
                          <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                        </motion.button>
                        <button
                          onClick={() => router.push("/all-products")}
                          className="group flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-emerald-800 transition-colors"
                        >
                          <span className="underline decoration-2 underline-offset-8 decoration-neutral-300 group-hover:decoration-emerald-700 transition-colors">
                            {slide.buttonText2}
                          </span>
                        </button>
                      </motion.div>
                      {/* Slide index + autoplay progress */}
                      <motion.div
                        variants={textChild}
                        className="mt-10 md:mt-12 flex items-center gap-4"
                        aria-hidden="true"
                      >
                        <span className="font-display text-sm font-semibold tracking-[0.2em] text-neutral-900 tabular-nums">
                          {String(currentSlide + 1).padStart(2, "0")}
                          <span className="text-neutral-400"> / {String(sliderData.length).padStart(2, "0")}</span>
                        </span>
                        <div className="h-[2px] w-40 md:w-56 bg-neutral-900/10 overflow-hidden rounded-full">
                          <div key={currentSlide} className="h-full w-full bg-neutral-900 origin-left slide-progress" />
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                  {/* Visual */}
                  <div className="md:col-span-5 relative">
                    <div className="relative mx-auto w-full max-w-[340px] md:max-w-[420px] px-6 py-10">
                      {/* kartu belakang buat depth — lebih besar + miring biar ngintip */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-3 top-7 bottom-7 rounded-[32px] bg-emerald-800 border-2 border-neutral-900 rotate-[4deg]"
                      />
                      {/* kartu foto utama */}
                      <div className="relative rounded-[28px] border-2 border-neutral-900 bg-white shadow-[10px_10px_0_#1c1917] -rotate-2 overflow-hidden">
                        <motion.div
                          className="relative aspect-square"
                          initial={false}
                          animate={active ? { scale: 1 } : { scale: 1.08 }}
                          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <Image
                            className="object-cover"
                            src={slide.imgSrc}
                            alt={slide.title}
                            fill
                            priority={index === 0}
                            sizes="(max-width: 768px) 80vw, 420px"
                          />
                        </motion.div>
                      </div>
                      <span className="absolute bottom-5 left-9 -rotate-6 whitespace-nowrap rounded-full bg-amber-300 text-neutral-900 text-[11px] font-bold uppercase tracking-[0.14em] px-4 py-2 shadow-md border-2 border-neutral-900">
                        Koleksi Capit ✦
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeaderSlider;
