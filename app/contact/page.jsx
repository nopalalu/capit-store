"use client"
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin } from "lucide-react";
import emailjs from "@emailjs/browser";

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
                // success logic
            })
            .catch((error) => {
                // error handling
            });

    };


    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 pt-14 pb-20">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-semibold text-gray-50">Contact <span className="text-sky-400">Us</span></h1>
                    <p className="text-gray-100 mt-2">We'd love to hear from you. Please reach out with any questions or feedback.</p>
                    <div className="w-24 h-0.5 bg-sky-400 mx-auto mt-2"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-100 mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-100 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-100 mb-1">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-sky-500 text-white px-6 py-2 rounded-md hover:bg-gray-50 hover:text-slate-950 transition"
                        >
                            Send Message
                        </button>
                        {submitted && <p className="text-green-600 mt-2">Thank you for contacting us!</p>}
                    </form>

                    <div className="flex flex-col justify-center text-gray-700 space-y-6">
                        <div className="flex items-start gap-4">
                            <MapPin className="text-sky-400 mt-1" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-200">Address</h3>
                                <p className="text-gray-300">Universitas Amikom Purwokerto, Jl. Letjend Pol. Soemarto No.126, Watumas</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Mail className="text-sky-400 mt-1" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-200">Email</h3>
                                <p className="text-gray-300">ndawegstudio@gmail.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Phone className="text-sky-400 mt-1" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-200">Phone</h3>
                                <p className="text-gray-300">+62 8123456789</p>
                            </div>
                        </div>
                        <div className="mt-8">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63318.50335656835!2d109.20171703250966!3d-7.426621297351276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e65416ee4eb1f5d%3A0x70d56f6a963ec202!2sUniversitas%20Amikom%20Purwokerto!5e0!3m2!1sen!2sid!4v1715889140595!5m2!1sen!2sid"
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ContactUs;