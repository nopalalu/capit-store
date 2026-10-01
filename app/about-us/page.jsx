"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Target, Lightbulb } from "lucide-react";

const AboutUs = () => {
    const values = [
        {
            icon: Lightbulb,
            title: "Our Vision",
            text: "To be a leading creative studio in providing innovative and impactful digital solutions.",
        },
        {
            icon: Target,
            title: "Our Mission",
            text: "We aim to deliver high-quality designs, web experiences, and branding services that elevate our clients' presence and performance in the digital world.",
        },
        {
            icon: Users,
            title: "Our Team",
            text: "We are a passionate team of designers, developers, and creatives dedicated to helping our clients succeed.",
        },
    ];

    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 pt-14 pb-20 bg-white">
                <div className="text-center mb-14 max-w-2xl mx-auto">
                    <span className="inline-flex items-center rounded-full bg-emerald-700/10 text-emerald-800 text-xs font-semibold px-3 py-1 mb-4">
                        Who we are
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900">
                        About Us
                    </h1>
                    <p className="text-neutral-500 mt-3">
                        Learn more about our vision, mission, and who we are.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
                    {values.map((item, i) => (
                        <div key={i} className="bg-neutral-50 rounded-2xl border border-neutral-200/70 p-7 hover:shadow-md transition">
                            <div className="w-11 h-11 rounded-xl bg-neutral-900 text-white flex items-center justify-center mb-5">
                                <item.icon className="w-5 h-5" />
                            </div>
                            <h3 className="text-base font-bold text-neutral-900 mb-2">{item.title}</h3>
                            <p className="text-sm text-neutral-500 leading-relaxed">{item.text}</p>
                        </div>
                    ))}
                </div>

                <div className="max-w-5xl mx-auto mt-14 bg-neutral-950 rounded-3xl p-10 md:p-14 text-center">
                    <div className="flex items-center justify-center gap-2.5 mb-4">
                        <span className="w-10 h-10 rounded-xl bg-white text-neutral-900 flex items-center justify-center font-bold text-xl">C</span>
                        <span className="text-xl font-bold tracking-tight text-white">
                            Capit <span className="text-emerald-400">Store</span>
                        </span>
                    </div>
                    <p className="text-neutral-400 text-sm max-w-xl mx-auto leading-relaxed">
                        Capit Store is a sandal sales website that provides various models of contemporary sandals for men and women — stylish designs, comfortable to wear, affordable prices and fast service.
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AboutUs;
