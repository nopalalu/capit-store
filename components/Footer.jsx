import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 text-gray-300">
        <div className="w-4/5">
          <p className="mt-6 text-sm">
            Capit Store is a sandal sales website that provides various models of contemporary sandals for men and women. Offering stylish designs, comfortable to wear, and suitable for various activities, Capit Store comes with affordable prices and fast service.
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-50 mb-5">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a className="hover:underline transition text-gray-300" href="/home">Home</a>
              </li>
              <li>
                <a className="hover:underline transition text-gray-300" href="/about-us">About us</a>
              </li>
              <li>
                <a className="hover:underline transition text-gray-300" href="/contact">Contact us</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-50 mb-5">Get in touch</h2>
            <div className="text-sm space-y-2 text-gray-300">
              <p>+62 8123456789</p>
              <p>ndawegstudio@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm text-gray-200">
        Copyright 2025 © NdawegStudio.
      </p>
    </footer>
  );
};

export default Footer;