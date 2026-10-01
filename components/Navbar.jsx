"use client";
import React, { useState } from "react";
import { assets, BagIcon, BoxIcon, CartIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user, isSeller, router, getCartCount } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = getCartCount();

  const links = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/all-products" },
    { label: "About Us", href: "/about-us" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-neutral-200">
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 h-16">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2.5 shrink-0"
          aria-label="Capit Store home"
        >
          <span className="w-9 h-9 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold text-lg">
            C
          </span>
          <span className="text-lg font-bold tracking-tight text-neutral-900">
            Capit <span className="text-emerald-700">Store</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition"
            >
              {link.label}
            </Link>
          ))}
          {isSeller && (
            <button
              onClick={() => router.push("/seller")}
              className="text-xs font-medium border border-neutral-300 px-4 py-1.5 rounded-full text-neutral-700 hover:border-neutral-900 hover:text-neutral-900 transition"
            >
              Seller Dashboard
            </button>
          )}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => router.push("/cart")}
            className="relative p-2.5 rounded-full hover:bg-neutral-100 transition"
            aria-label="Cart"
          >
            <CartIcon />
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 min-w-5 h-5 px-1 rounded-full bg-emerald-700 text-white text-[11px] font-semibold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          {user ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Cart"
                  labelIcon={<CartIcon />}
                  onClick={() => router.push("/cart")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Orders"
                  labelIcon={<BagIcon />}
                  onClick={() => router.push("/my-orders")}
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button
              onClick={openSignIn}
              className="flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 transition px-3 py-2"
            >
              <Image src={assets.user_icon} alt="user icon" className="w-5 h-5" />
              Account
            </button>
          )}
        </div>

        <div className="flex md:hidden items-center gap-1">
          {isSeller && (
            <button
              onClick={() => router.push("/seller")}
              className="text-xs font-medium border border-neutral-300 px-3 py-1.5 rounded-full text-neutral-700"
            >
              Seller
            </button>
          )}
          <button
            onClick={() => router.push("/cart")}
            className="relative p-2.5 rounded-full hover:bg-neutral-100 transition"
            aria-label="Cart"
          >
            <CartIcon />
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 min-w-5 h-5 px-1 rounded-full bg-emerald-700 text-white text-[11px] font-semibold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          {user ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Products"
                  labelIcon={<BoxIcon />}
                  onClick={() => router.push("/all-products")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Cart"
                  labelIcon={<CartIcon />}
                  onClick={() => router.push("/cart")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Orders"
                  labelIcon={<BagIcon />}
                  onClick={() => router.push("/my-orders")}
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button
              onClick={openSignIn}
              className="flex items-center gap-1.5 text-sm font-medium text-neutral-700 px-2 py-2"
            >
              <Image src={assets.user_icon} alt="user icon" className="w-5 h-5" />
              Account
            </button>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2.5 rounded-full hover:bg-neutral-100 transition"
            aria-label="Menu"
          >
            <svg
              className="w-5 h-5 text-neutral-800"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-6 py-3 flex flex-col">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 text-sm font-medium text-neutral-700 border-b border-neutral-100 last:border-0"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
