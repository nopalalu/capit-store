import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-neutral-400 mt-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 px-6 md:px-16 lg:px-32 py-14">
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
      <div className="border-t border-white/10">
        <p className="py-5 text-center text-xs text-neutral-500">
          Copyright 2025 © NdawegStudio.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
