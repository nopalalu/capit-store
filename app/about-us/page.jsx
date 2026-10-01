"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { Users, Target, Lightbulb } from "lucide-react";

const AboutUs = () => {
    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 pt-14 pb-20">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-semibold text-gray-50">
                        About <span className="text-sky-600">Us</span>
                    </h1>
                    <p className="text-gray-300 mt-2">
                        Learn more about our vision, mission, and who we are.
                    </p>
                    <div className="w-24 h-0.5 bg-sky-600 mx-auto mt-2"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <Lightbulb className="text-sky-400 mt-1" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-50">Our Vision</h3>
                                <p className="text-gray-300">
                                    To be a leading creative studio in providing innovative and impactful digital
                                    solutions.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Target className="text-sky-400 mt-1" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-50">Our Mission</h3>
                                <p className="text-gray-300">
                                    We aim to deliver high-quality designs, web experiences, and branding services
                                    that elevate our clients' presence and performance in the digital world.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Users className="text-sky-400 mt-1" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-50">Our Team</h3>
                                <p className="text-gray-300">
                                    We are a passionate team of designers, developers, and creatives dedicated to
                                    helping our clients succeed.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center md:justify-center">
                        <div className="border border-gray-300 rounded-xl shadow-md p-4 h-full flex items-center justify-center">
                            <Image
                                src={assets.logo}
                                alt="Company Logo"
                                width={2000}
                                height={220}
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AboutUs;
