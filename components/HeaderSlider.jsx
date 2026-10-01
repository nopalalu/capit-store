import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
    }, 5000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="grid md:grid-cols-2 items-stretch bg-neutral-100 mt-6 rounded-3xl min-w-full overflow-hidden border border-neutral-200/60"
          >
            <div className="flex flex-col justify-center px-6 py-10 md:px-14 md:py-16 order-2 md:order-1">
              <span className="inline-flex w-fit items-center rounded-full bg-emerald-700/10 text-emerald-800 text-xs font-semibold px-3 py-1 mb-4">
                {slide.eyebrow}
              </span>
              <h1 className="text-3xl md:text-[44px] md:leading-[52px] font-bold tracking-tight text-neutral-900">
                {slide.title}
              </h1>
              <p className="mt-3 text-neutral-500 max-w-md text-sm md:text-base">
                {slide.description}
              </p>
              <div className="flex items-center gap-5 mt-6 md:mt-8">
                <button
                  onClick={() => router.push(slide.link || "/")}
                  className="px-8 md:px-10 py-3 bg-neutral-900 text-white rounded-full text-sm font-semibold hover:bg-emerald-800 transition"
                >
                  {slide.buttonText1}
                </button>
                <button
                  onClick={() => router.push("/all-products")}
                  className="group flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-neutral-900 transition"
                >
                  {slide.buttonText2}
                  <Image
                    className="group-hover:translate-x-1 transition"
                    src={assets.arrow_icon}
                    alt="arrow_icon"
                  />
                </button>
              </div>
            </div>
            <div className="relative min-h-64 md:min-h-[380px] order-1 md:order-2">
              <Image
                className="absolute inset-0 w-full h-full object-cover"
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
                fill
              />
            </div>
          </div>
        ))}
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
