"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  Send,
  ArrowUp,
} from "lucide-react";
import { nanaContactContent } from "@/data/nanaContent";

const coreLinks = [
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Partnership", href: "/partnership" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  const contact = nanaContactContent;
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative border-t border-[#8CC63F]/20 bg-[#0B3B24] text-[#E8F3EC] py-6 sm:py-7">
      {/* Background Subtle Radial Accent */}
      <div className="pointer-events-none absolute inset-0 opacity-5 bg-[radial-gradient(#8CC63F_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Single Sleek Horizontal Flex Row (Stacking on mobile) */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-6 text-center lg:text-left">
          {/* ========================================================= */}
          {/* LEFT SIDE: Small Brand Logo & Green Dot Status Pill       */}
          {/* ========================================================= */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <Link href="/" className="group flex items-center gap-2.5">
              <div className="relative h-7 w-7 overflow-hidden rounded-full ring-1 ring-[#8CC63F]/30 bg-[#082A19] transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="Nana Creative Logo"
                  width={28}
                  height={28}
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-extrabold tracking-tight text-white transition-colors group-hover:text-[#8CC63F]">
                Nana Creative<span className="text-[#8CC63F]">.</span>
              </span>
            </Link>

            {/* Compact Green Dot Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#8CC63F]/25 bg-[#082A19]/80 px-2.5 py-1 text-[11px] font-semibold text-[#8CC63F] shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8CC63F] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8CC63F]" />
              </span>
              <span>Accepting new clients</span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* CENTER: Copyright & Minimalist Core Routes List           */}
          {/* ========================================================= */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-[#E8F3EC]/70">
            <span className="font-mono text-[#E8F3EC]/80">© 2026 Nana Creative.</span>
            <span className="hidden sm:inline text-white/20">•</span>
            <nav className="flex items-center gap-4">
              {coreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#E8F3EC]/75 transition-colors duration-200 hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* ========================================================= */}
          {/* RIGHT SIDE: Icon-Only Socials & Contacts with Tooltips    */}
          {/* ========================================================= */}
          <div className="flex items-center gap-2">
            {/* TikTok Icon */}
            <div className="relative group">
              <a
                href={contact.socialUrl || "https://www.tiktok.com/@nana_creatives"}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setActiveTooltip("tiktok")}
                onMouseLeave={() => setActiveTooltip(null)}
                aria-label="TikTok: @nana_creatives"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#E8F3EC]/80 transition-all duration-200 hover:border-[#8CC63F]/50 hover:bg-[#8CC63F]/15 hover:text-[#8CC63F] hover:scale-105 active:scale-95"
              >
                <svg
                  className="h-3.5 w-3.5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.81 4.48 6.3 6.3 0 0 0 1.9-4.47V8.58a8.28 8.28 0 0 0 4.88 1.56V6.69z" />
                </svg>
              </a>
              <div
                className={`pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 transition-all duration-150 ${
                  activeTooltip === "tiktok"
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-1"
                }`}
              >
                <div className="whitespace-nowrap rounded-lg border border-[#8CC63F]/30 bg-[#082A19] px-2.5 py-1 text-[10px] font-medium text-white shadow-xl">
                  TikTok @nana_creatives
                </div>
              </div>
            </div>

            {/* Instagram Icon */}
            <div className="relative group">
              <a
                href="https://www.instagram.com/nana_creatives"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setActiveTooltip("instagram")}
                onMouseLeave={() => setActiveTooltip(null)}
                aria-label="Instagram: @nana_creatives"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#E8F3EC]/80 transition-all duration-200 hover:border-[#8CC63F]/50 hover:bg-[#8CC63F]/15 hover:text-[#8CC63F] hover:scale-105 active:scale-95"
              >
                <svg
                  className="h-3.5 w-3.5 fill-none stroke-current"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <div
                className={`pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 transition-all duration-150 ${
                  activeTooltip === "instagram"
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-1"
                }`}
              >
                <div className="whitespace-nowrap rounded-lg border border-[#8CC63F]/30 bg-[#082A19] px-2.5 py-1 text-[10px] font-medium text-white shadow-xl">
                  Instagram @nana_creatives
                </div>
              </div>
            </div>

            {/* Telegram Icon */}
            <div className="relative group">
              <a
                href="https://t.me/nanacreatives"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setActiveTooltip("telegram")}
                onMouseLeave={() => setActiveTooltip(null)}
                aria-label="Telegram: @nanacreatives"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#E8F3EC]/80 transition-all duration-200 hover:border-[#8CC63F]/50 hover:bg-[#8CC63F]/15 hover:text-[#8CC63F] hover:scale-105 active:scale-95"
              >
                <Send className="h-3.5 w-3.5" />
              </a>
              <div
                className={`pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 transition-all duration-150 ${
                  activeTooltip === "telegram"
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-1"
                }`}
              >
                <div className="whitespace-nowrap rounded-lg border border-[#8CC63F]/30 bg-[#082A19] px-2.5 py-1 text-[10px] font-medium text-white shadow-xl">
                  Telegram Channel
                </div>
              </div>
            </div>

            {/* Email Icon with Tooltip */}
            <div className="relative group">
              <a
                href={`mailto:${contact.email}`}
                onMouseEnter={() => setActiveTooltip("email")}
                onMouseLeave={() => setActiveTooltip(null)}
                aria-label={`Email: ${contact.email}`}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#E8F3EC]/80 transition-all duration-200 hover:border-[#8CC63F]/50 hover:bg-[#8CC63F]/15 hover:text-[#8CC63F] hover:scale-105 active:scale-95"
              >
                <Mail className="h-3.5 w-3.5" />
              </a>
              <div
                className={`pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 transition-all duration-150 ${
                  activeTooltip === "email"
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-1"
                }`}
              >
                <div className="whitespace-nowrap rounded-lg border border-[#8CC63F]/30 bg-[#082A19] px-2.5 py-1 text-[10px] font-medium text-white shadow-xl">
                  {contact.email}
                </div>
              </div>
            </div>

            {/* Phone Icon with Tooltip */}
            <div className="relative group">
              <a
                href={`tel:${contact.phoneTel}`}
                onMouseEnter={() => setActiveTooltip("phone")}
                onMouseLeave={() => setActiveTooltip(null)}
                aria-label={`Call: ${contact.phone}`}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#E8F3EC]/80 transition-all duration-200 hover:border-[#8CC63F]/50 hover:bg-[#8CC63F]/15 hover:text-[#8CC63F] hover:scale-105 active:scale-95"
              >
                <Phone className="h-3.5 w-3.5" />
              </a>
              <div
                className={`pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 transition-all duration-150 ${
                  activeTooltip === "phone"
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-1"
                }`}
              >
                <div className="whitespace-nowrap rounded-lg border border-[#8CC63F]/30 bg-[#082A19] px-2.5 py-1 text-[10px] font-medium text-white shadow-xl">
                  {contact.phone}
                </div>
              </div>
            </div>

            {/* Back to Top Icon Button */}
            <div className="relative group ml-1 border-l border-white/15 pl-2">
              <button
                type="button"
                onClick={scrollToTop}
                onMouseEnter={() => setActiveTooltip("top")}
                onMouseLeave={() => setActiveTooltip(null)}
                aria-label="Back to Top"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#E8F3EC]/70 transition-all duration-200 hover:border-[#8CC63F] hover:bg-[#8CC63F] hover:text-[#082A19] hover:scale-105 active:scale-95"
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
              <div
                className={`pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 transition-all duration-150 ${
                  activeTooltip === "top"
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-1"
                }`}
              >
                <div className="whitespace-nowrap rounded-lg border border-[#8CC63F]/30 bg-[#082A19] px-2.5 py-1 text-[10px] font-medium text-white shadow-xl">
                  Back to Top
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
