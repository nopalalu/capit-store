"use client"
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin } from "lucide-react";
import emailjs from "@emailjs/browser";
import Reveal from "@/components/Reveal";
import Faq from "@/components/Faq";
import BackToTop from "@/components/BackToTop";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
            {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
                reply_to: formData.email
            },
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        )
            .then(() => {
                setSubmitted(true);
            })
            .catch((error) => {
                // error handling
            });

    };

    const inputCls = "w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 transition";

    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 pt-14 pb-20 bg-white">
                <Reveal>
                    <div className="mb-14 max-w-2xl">
                        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-800 mb-3 flex items-center gap-2.5">
                            <span className="inline-block w-7 h-[2px] bg-emerald-800 rounded-full" />
                            Hubungi kami
                        </p>
                        <h1 className="font-display text-4xl md:text-[52px] leading-[1.05] font-semibold tracking-tight text-neutral-900">Ada yang bisa <em className="text-emerald-800">kami bantu?</em></h1>
                        <p className="text-neutral-500 mt-4">Tanya stok, ukuran, atau pesananmu — kami balas secepatnya.</p>
                    </div>
                </Reveal>

                <Reveal>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                    <form onSubmit={handleSubmit} className="bg-neutral-50 rounded-2xl border border-neutral-200/70 p-7 space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Your name"
                                className={inputCls}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="you@example.com"
                                className={inputCls}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                placeholder="How can we help?"
                                className={`${inputCls} resize-none`}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-neutral-900 text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-emerald-800 transition"
                        >
                            Send Message
                        </button>
                        {submitted && <p className="text-emerald-700 text-sm font-medium">Thank you for contacting us!</p>}
                    </form>

                    <div className="flex flex-col justify-center space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-11 h-11 rounded-xl bg-neutral-900 text-white flex items-center justify-center shrink-0">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-neutral-900">Address</h3>
                                <p className="text-sm text-neutral-500 mt-1">Universitas Amikom Purwokerto, Jl. Letjend Pol. Soemarto No.126, Watumas</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-11 h-11 rounded-xl bg-neutral-900 text-white flex items-center justify-center shrink-0">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-neutral-900">Email</h3>
                                <p className="text-sm text-neutral-500 mt-1">ndawegstudio@gmail.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-11 h-11 rounded-xl bg-neutral-900 text-white flex items-center justify-center shrink-0">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-neutral-900">Phone</h3>
                                <p className="text-sm text-neutral-500 mt-1">+62 8123456789</p>
                            </div>
                        </div>
                        <div className="rounded-2xl overflow-hidden border border-neutral-200 mt-2">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63318.50335656835!2d109.20171703250966!3d-7.426621297351276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e65416ee4eb1f5d%3A0x70d56f6a963ec202!2sUniversitas%20Amikom%20Purwokerto!5e0!3m2!1sen!2sid!4v1715889140595!5m2!1sen!2sid"
                                width="100%"
                                height="260"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
                </Reveal>

                <div className="max-w-5xl mx-auto mt-16">
                    <Faq />
                </div>
            </div>
            <Footer />
            <BackToTop />
        </>
    );
};

export default ContactUs;
