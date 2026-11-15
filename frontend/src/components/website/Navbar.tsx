"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getBrandProfileSync } from "@/data/brandProfile";
import { Phone, ArrowUpRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const brand = getBrandProfileSync();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E8F3EC] bg-white/90 backdrop-blur-xl transition-all">

      {/* Main Navbar */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3.5">
        {/* Brand Logo & Wordmark */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-[#0B3B24]/10 shadow-sm transition-transform duration-300 group-hover:scale-105">
            <Image
              src={brand.logo.src}
              alt={brand.logo.alt}
              fill
              sizes="44px"
              priority
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight text-[#082A19] group-hover:text-[#0B3B24] transition-colors">
              {brand.name}
              <span className="text-[#8CC63F]">.</span>
            </span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#0B3B24]/60">
              Creative Agency
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-1 lg:flex bg-[#F7F9F8] p-1.5 rounded-full border border-[#E8F3EC]">
          {brand.navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`relative px-4 py-2 text-xs font-semibold tracking-wide rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-[#0B3B24] text-white shadow-sm"
                    : "text-[#082A19]/80 hover:text-[#0B3B24] hover:bg-white"
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

        {/* CTA & Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={`tel:${brand.contact.primaryPhoneTel}`}
            className="group inline-flex items-center gap-2 rounded-full bg-[#0B3B24] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-[#0B3B24]/15 transition-all duration-300 hover:bg-[#082A19] hover:shadow-lg hover:shadow-[#0B3B24]/25 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#8CC63F] focus:ring-offset-2"
          >
            <Phone className="h-3.5 w-3.5 text-[#8CC63F] transition-transform group-hover:rotate-12" />
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[#8CC63F] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8F3EC] bg-white text-[#082A19] transition hover:bg-[#F7F9F8] lg:hidden"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-[#E8F3EC] bg-white px-6 py-6 lg:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            {brand.navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-[#0B3B24] text-white"
                      : "text-[#082A19] hover:bg-[#F7F9F8]"
                  }`}
                >
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="rounded-full bg-[#8CC63F]/20 px-2 py-0.5 text-[10px] font-bold text-[#0B3B24]">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-[#E8F3EC] flex flex-col gap-3">
            <a
              href={`tel:${brand.contact.primaryPhoneTel}`}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#0B3B24] px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-[#0B3B24]/15 hover:bg-[#082A19]"
            >
              <Phone className="h-4 w-4 text-[#8CC63F]" />
              <span>Let&apos;s Talk ({brand.contact.primaryPhone})</span>
              <ArrowUpRight className="h-4 w-4 text-[#8CC63F]" />
            </a>
            <div className="flex items-center justify-between text-xs text-[#082A19]/70 px-1 pt-2">
              <span>{brand.contact.headquarters}</span>
              <a
                href={brand.contact.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#0B3B24] hover:underline"
              >
                TikTok {brand.contact.tiktokHandle}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
