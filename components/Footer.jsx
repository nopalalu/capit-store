"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 mt-16">
      <div className="px-6 md:px-16 lg:px-32 py-14">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <p className="font-display text-2xl text-white font-semibold">
              Kabar <em className="text-emerald-400">promo</em>, langsung ke email.
            </p>
            <p className="text-sm mt-1.5">Diskon dan koleksi baru — tanpa spam, janji.</p>
          </div>
          {subscribed ? (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm font-semibold text-emerald-400"
            >
              <span className="w-6 h-6 rounded-full bg-emerald-400 text-neutral-950 flex items-center justify-center text-xs font-bold">✓</span>
              Siap! Cek email kamu ya.
            </motion.p>
          ) : (
            <form onSubmit={subscribe} className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@kamu.com"
                className="flex-1 md:w-64 px-4 py-2.5 rounded-full bg-white/10 border border-white/15 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-emerald-400 transition"
              />
              <motion.button
                whileTap={{ scale: 0.94 }}
                type="submit"
                className="px-6 py-2.5 rounded-full bg-emerald-500 text-neutral-950 text-sm font-bold hover:bg-emerald-400 transition-colors"
              >
                Ikut
              </motion.button>
            </form>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pt-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-9 h-9 rounded-xl bg-white text-neutral-900 flex items-center justify-center font-bold text-lg">
                C
              </span>
              <span className="text-lg font-bold tracking-tight text-white">
                Capit <span className="text-emerald-400">Store</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              Capit Store is a sandal sales website that provides various models of contemporary sandals for men and women. Offering stylish designs, comfortable to wear, and suitable for various activities, Capit Store comes with affordable prices and fast service.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-white mb-5 text-sm uppercase tracking-wide">Company</h2>
            <ul className="text-sm space-y-3">
              <li>
                <Link className="hover:text-white transition" href="/">Home</Link>
              </li>
              <li>
                <Link className="hover:text-white transition" href="/about-us">About us</Link>
              </li>
              <li>
                <Link className="hover:text-white transition" href="/contact">Contact us</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-white mb-5 text-sm uppercase tracking-wide">Get in touch</h2>
            <div className="text-sm space-y-3">
              <p>+62 8123456789</p>
              <p>ndawegstudio@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="py-5 text-center text-xs text-neutral-500">
          Copyright 2025 © NdawegStudio.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
