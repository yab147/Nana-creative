"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { nanaNavigationItems, nanaContactContent } from "@/data/nanaContent";
import { Phone, ArrowUpRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#E8F3EC] bg-white/95 backdrop-blur-xl transition-all">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3.5">
          {/* Brand Logo & Wordmark */}
          <Link href="/" className="group flex items-center gap-3 min-h-[44px]">
            <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-[#0B3B24]/10 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo.png"
                alt="Nana Creative Logo"
                width={44}
                height={44}
                priority
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-[#082A19] group-hover:text-[#0B3B24] transition-colors">
                Nana Creative
                <span className="text-[#8CC63F]">.</span>
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#0B3B24]/60">
                Creative Agency
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Strict order: Home, About, Portfolio, Partnership, Analytics, Blog, Contact) */}
          <div className="hidden items-center gap-1 lg:flex bg-[#F7F9F8] p-1.5 rounded-full border border-[#E8F3EC]">
            {nanaNavigationItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(`${item.href}/`));
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`relative px-4 py-2 text-xs font-semibold tracking-wide rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-[#0B3B24] text-white shadow-sm"
                      : "text-[#1B263B]/80 hover:text-[#0B3B24] hover:bg-white"
                  }`}
                >
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="ml-1.5 inline-flex items-center rounded-full bg-[#8CC63F]/25 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#0B3B24]">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Call Button (Visible on all viewports for direct conversion) */}
            <a
              href={`tel:${nanaContactContent.phoneTel}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#0B3B24] px-3.5 sm:px-5 py-2.5 min-h-[44px] text-xs font-bold text-white shadow-md shadow-[#0B3B24]/15 transition-all duration-300 hover:bg-[#082A19] hover:shadow-lg hover:shadow-[#0B3B24]/25 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#8CC63F]"
              aria-label="Call Nana Creative"
            >
              <Phone className="h-3.5 w-3.5 text-[#8CC63F]" />
              <span className="hidden sm:inline">Let&apos;s Talk</span>
              <ArrowUpRight className="hidden sm:inline h-3.5 w-3.5 text-[#8CC63F]" />
            </a>

            {/* Mobile Hamburger Menu Button (Touch-Friendly min 44px) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[#E8F3EC] bg-white text-[#082A19] shadow-xs transition hover:bg-[#F7F9F8] lg:hidden focus:outline-none focus:ring-2 focus:ring-[#8CC63F]"
              aria-label="Open mobile navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="h-5 w-5 text-[#0B3B24]" />
            </button>
          </div>
        </nav>
      </header>

      {/* Robust Direct-DOM Mobile Slide-Out Drawer (Zero portal race conditions, full touch-event safety) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
            {/* Dimmed Blurred Backdrop (z-0, clicks dismiss the menu) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-0"
              aria-hidden="true"
            />

            {/* Slide-out Drawer Panel (relative z-10, stops propagation so touches never close menu accidentally) */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 flex h-full w-[86vw] max-w-sm flex-col justify-between overflow-y-auto bg-white shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-[#E8F3EC] p-5 bg-white">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3"
                >
                  <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-[#0B3B24]/10">
                    <Image
                      src="/images/logo.png"
                      alt="Nana Creative Logo"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-base font-extrabold tracking-tight text-[#0B3B24]">
                    Nana Creative<span className="text-[#8CC63F]">.</span>
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[#E8F3EC] bg-[#F7F9F8] text-[#0B3B24] hover:bg-[#E8F3EC] transition active:scale-95"
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5 text-[#0B3B24]" />
                </button>
              </div>

              {/* Navigation Links in Strict Order */}
              <div className="flex flex-col gap-1.5 p-5 flex-1">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#0B3B24]/70 mb-2 font-bold">
                  Menu Navigation
                </span>
                {nanaNavigationItems.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/" && pathname?.startsWith(`${item.href}/`));
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3.5 min-h-[48px] text-sm font-bold transition-all ${
                        isActive
                          ? "bg-[#0B3B24] text-white shadow-md shadow-[#0B3B24]/15"
                          : "text-[#1B263B] hover:bg-[#F7F9F8] hover:text-[#0B3B24]"
                      }`}
                    >
                      <span className="text-base">{item.name}</span>
                      {item.badge ? (
                        <span className="rounded-full bg-[#8CC63F]/25 px-2.5 py-0.5 text-[10px] font-bold text-[#0B3B24]">
                          {item.badge}
                        </span>
                      ) : (
                        <ArrowUpRight
                          className={`h-4 w-4 ${
                            isActive ? "text-[#8CC63F]" : "text-[#1B263B]/30"
                          }`}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Drawer Footer & Direct Action */}
              <div className="border-t border-[#E8F3EC] bg-[#F7F9F8] p-5 space-y-4">
                <a
                  href={`tel:${nanaContactContent.phoneTel}`}
                  className="flex items-center justify-center gap-2.5 rounded-2xl bg-[#0B3B24] px-5 py-3.5 min-h-[48px] text-sm font-bold text-white shadow-lg shadow-[#0B3B24]/15 hover:bg-[#082A19] transition active:scale-98"
                >
                  <Phone className="h-4 w-4 text-[#8CC63F]" />
                  <span>Call {nanaContactContent.phone}</span>
                  <ArrowUpRight className="h-4 w-4 text-[#8CC63F]" />
                </a>

                <div className="flex items-center justify-between text-xs text-[#0B3B24]/70 pt-1">
                  <span>{nanaContactContent.headquarters}</span>
                  <a
                    href={nanaContactContent.socialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#0B3B24] hover:text-[#8CC63F] underline"
                  >
                    TikTok {nanaContactContent.social}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}


