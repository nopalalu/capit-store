'use client'
import React from "react";
import HeaderSlider from "@/components/HeaderSlider";
import HomeProducts from "@/components/HomeProducts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import BackToTop from "@/components/BackToTop";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 overflow-hidden">
        <HeaderSlider />
      </div>
      <Marquee />
      <div className="px-6 md:px-16 lg:px-32">
        <HomeProducts />
        <Stats />
        <Testimonials />
      </div>
      <Footer />
      <BackToTop />
    </>
  );
};

export default Home;
