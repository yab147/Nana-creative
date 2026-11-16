"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  ArrowUpRight,
  Send,
  Camera,
} from "lucide-react";
import { nanaContactContent } from "@/data/nanaContent";

const quickLinks = [
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Partnership", href: "/partnership" },
  { name: "Analytics", href: "/analytics", badge: "TikTok Live" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  const contact = nanaContactContent;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative border-t border-[#8CC63F]/20 bg-[#0B3B24] text-[#F7F9F8]">
      {/* Background Subtle Gradient & Grid Accent */}
      <div className="pointer-events-none absolute inset-0 opacity-5 bg-[radial-gradient(#8CC63F_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Main 4-Column Grid Section */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-12 lg:pt-20 lg:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* ========================================================= */}
          {/* COLUMN 1: BRAND                                            */}
          {/* ========================================================= */}
          <div className="space-y-5">
            {/* Horizontal Brand Logo */}
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-[#8CC63F]/30 bg-[#082A19] shadow-md transition-transform duration-300 group-hover:scale-105">
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
                <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-[#8CC63F] transition-colors">
                  Nana Creative<span className="text-[#8CC63F]">.</span>
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8F3EC]/70">
                  Creative Agency
                </span>
              </div>
            </Link>

            {/* Hook */}
            <p className="text-sm font-medium leading-relaxed text-[#E8F3EC]/85 max-w-sm">
              &ldquo;ready to out-build your competition.&rdquo;
            </p>

            {/* Live Green Dot Status Pill */}
            <div className="pt-1">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[#8CC63F]/30 bg-[#082A19] px-3.5 py-1.5 text-xs font-semibold text-[#8CC63F] shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8CC63F] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8CC63F]" />
                </span>
                <span>Accepting new clients — Dire Dawa &amp; Addis Ababa</span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* COLUMN 2: QUICK LINKS                                      */}
          {/* ========================================================= */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#8CC63F]">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-[#E8F3EC]/80 hover:text-[#8CC63F] transition-colors duration-200"
                  >
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      {link.name}
                    </span>
                    {link.badge && (
                      <span className="ml-1 rounded-full bg-[#8CC63F]/20 px-2 py-0.5 text-[9px] font-bold text-[#8CC63F]">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ========================================================= */}
          {/* COLUMN 3: CONTACT INFO                                     */}
          {/* ========================================================= */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#8CC63F]">
              Contact Info
            </h3>
            <div className="space-y-3.5 text-sm text-[#E8F3EC]/85 font-light leading-relaxed">
              {/* Phone Numbers */}
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-[#8CC63F] shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <a
                    href={`tel:${contact.phoneTel}`}
                    className="font-medium text-[#E8F3EC] hover:text-[#8CC63F] transition-colors duration-200"
                  >
                    {contact.phone}
                  </a>
                  <a
                    href={`tel:${contact.secondaryPhoneTel}`}
                    className="font-medium text-[#E8F3EC] hover:text-[#8CC63F] transition-colors duration-200"
                  >
                    {contact.secondaryPhone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#8CC63F] shrink-0" />
                <a
                  href={`mailto:${contact.email}`}
                  className="font-medium text-[#E8F3EC] hover:text-[#8CC63F] transition-colors duration-200"
                >
                  {contact.email}
                </a>
              </div>

              {/* Physical Locations */}
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#8CC63F] shrink-0 mt-0.5" />
                <span className="font-medium text-[#E8F3EC]">
                  Dire Dawa &amp; Addis Ababa, Ethiopia
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* COLUMN 4: SOCIALS                                          */}
          {/* ========================================================= */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#8CC63F]">
              Socials
            </h3>
            <div className="space-y-2.5 text-sm">
              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@nana_creatives"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 transition-all duration-200 hover:border-[#8CC63F]/40 hover:bg-white/10 hover:text-[#8CC63F]"
              >
                <div className="flex items-center gap-2.5">
                  <svg
                    className="h-4 w-4 text-[#8CC63F] fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.81 4.48 6.3 6.3 0 0 0 1.9-4.47V8.58a8.28 8.28 0 0 0 4.88 1.56V6.69z" />
                  </svg>
                  <span className="font-medium text-[#E8F3EC] group-hover:text-[#8CC63F] transition-colors">
                    TikTok (@nana_creatives)
                  </span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#8CC63F] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/nana_creatives"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 transition-all duration-200 hover:border-[#8CC63F]/40 hover:bg-white/10 hover:text-[#8CC63F]"
              >
                <div className="flex items-center gap-2.5">
                  <Camera className="h-4 w-4 text-[#8CC63F]" />
                  <span className="font-medium text-[#E8F3EC] group-hover:text-[#8CC63F] transition-colors">
                    Instagram (@nana_creatives)
                  </span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#8CC63F] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/nanacreatives"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 transition-all duration-200 hover:border-[#8CC63F]/40 hover:bg-white/10 hover:text-[#8CC63F]"
              >
                <div className="flex items-center gap-2.5">
                  <Send className="h-4 w-4 text-[#8CC63F]" />
                  <span className="font-medium text-[#E8F3EC] group-hover:text-[#8CC63F] transition-colors">
                    Telegram Channel
                  </span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#8CC63F] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* BOTTOM BAR: COPYRIGHT & BACK TO TOP                        */}
        {/* ========================================================= */}
        <div className="mt-14 pt-8 border-t border-[#1B263B]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#E8F3EC]/70">
          <p>© 2026 Nana Creative. All rights reserved.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-[#E8F3EC] transition-all duration-300 hover:border-[#8CC63F] hover:bg-[#8CC63F] hover:text-[#082A19] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#8CC63F]"
            aria-label="Back to top of page"
          >
            <span>Back to Top</span>
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
