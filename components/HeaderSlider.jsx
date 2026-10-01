import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HeaderSlider = () => {
  const router = useRouter();

  const sliderData = [
    {
      id: 1,
      title: "Pink Crocs - The Perfect Pair for Your Next Adventure",
      offer: "Buy Now!!",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: assets.header_pink_crocs,
      link: "/product/6828c37d7637f1c37ded36ac", 
    },
    {
      id: 2,
      title: "Blue Flop - Blue Flop is a casual sandal with a simple design",
      offer: "Hurry up!",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: assets.header_blue_flop,
      link: "/product/682c2ce78da73f37929755b7",
    },
    {
      id: 3,
      title: "Pink Swallow is a durable and comfortable sandal with a classic design",
      offer: "Exclusive",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: assets.header_pink_swallow,
      link: "/product/6828c3d07637f1c37ded36b0",
    },
    {
      id: 4,
      title: "Lurad Sandal is a stylish and lightweight sandal with a wood-textured finish",
      offer: "Exclusive With a Wood Texture",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: assets.header_lurad_sandal,
      link: "/product/6828c4287637f1c37ded36b4",
    },
    {
      id: 5,
      title: "Swallow x Ndaweg Studio is a special edition sandal featuring handcrafted carvings",
      offer: "Limited Edition!",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: assets.header_swallow_ndaweg,
      link: "/product/6828c4a87637f1c37ded36b8",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
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
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-slate-800 py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full"
          >
            <div className="md:pl-8 mt-10 md:mt-0">
              <p className="md:text-base text-slate-300 pb-1">{slide.offer}</p>
              <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-gray-50 font-semibold">
                {slide.title}
              </h1>
              <div className="flex items-center mt-4 md:mt-6 ">
                <button
                  onClick={() => router.push(slide.link || "/")}  
                  className="md:px-10 px-7 md:py-2.5 py-2 bg-sky-600 text-white rounded-full font-medium hover:bg-white hover:text-black transition"
                >
                  {slide.buttonText1}
                </button>
                <button className="group flex items-center gap-2 px-6 py-2.5 font-medium text-gray-500">
                  {slide.buttonText2}
                  <Image
                    className="group-hover:translate-x-1 transition"
                    src={assets.arrow_icon}
                    alt="arrow_icon"
                  />
                </button>
              </div>
            </div>
            <div className="flex items-center flex-1 justify-center">
              <Image
                className="md:w-72 w-48"
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentSlide === index ? "bg-gray-50" : "bg-gray-500/30"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
