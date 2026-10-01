"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import Stats from "@/components/Stats";
import Faq from "@/components/Faq";
import { Users, Target, Lightbulb } from "lucide-react";

const AboutUs = () => {
    const values = [
        {
            icon: Lightbulb,
            title: "Visi Kami",
            text: "Menjadi toko sandal lokal pilihan utama — kualitas terjaga, harga bersahabat, pelayanan cepat.",
        },
        {
            icon: Target,
            title: "Misi Kami",
            text: "Menghadirkan sandal original yang nyaman dipakai harian, dengan pengalaman belanja online yang mudah dan aman.",
        },
        {
            icon: Users,
            title: "Tim Kami",
            text: "Tim kecil yang passionate soal alas kaki lokal — dari kurasi produk sampai pengemasan yang rapi.",
        },
    ];

    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 pt-14 pb-20 bg-white">
                <Reveal>
                    <div className="max-w-3xl mb-14">
                        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-800 mb-3 flex items-center gap-2.5">
                            <span className="inline-block w-7 h-[2px] bg-emerald-800 rounded-full" />
                            Siapa kami
                        </p>
                        <h1 className="font-display text-4xl md:text-[56px] leading-[1.05] font-semibold tracking-tight text-neutral-900">
                            Sandal lokal, <em className="text-emerald-800">dirawat serius.</em>
                        </h1>
                        <p className="text-neutral-500 mt-4 leading-relaxed max-w-xl">
                            Capit Store lahir dari kecintaan pada sandal Indonesia — alas kaki paling jujur yang pernah ada.
                            Kami mengkurasi setiap pasang yang kami jual: jahitan, sol, dan kenyamanan harus lolos standar kami dulu.
                        </p>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl">
                    {values.map((item, i) => (
                        <Reveal key={i} delay={i * 0.08}>
                            <div className="bg-neutral-50 rounded-2xl border border-neutral-200/70 p-7 hover:shadow-[0_16px_36px_-16px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-300 h-full">
                                <div className="w-11 h-11 rounded-xl bg-neutral-900 text-amber-300 flex items-center justify-center mb-5">
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <h3 className="text-base font-bold text-neutral-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-neutral-500 leading-relaxed">{item.text}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <div className="max-w-5xl">
                    <Stats />
                </div>

                <div className="max-w-5xl mt-6">
                    <Faq title="Sering ditanyakan" />
                </div>

                <Reveal className="max-w-5xl">
                    <div className="grain mt-14 bg-neutral-950 rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
                        <div className="relative z-[2]">
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
                </Reveal>
            </div>
            <Footer />
            <BackToTop />
        </>
    );
};

export default AboutUs;
