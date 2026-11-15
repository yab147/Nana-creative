import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  nanaContactContent,
  nanaNavigationItems,
} from "@/data/nanaContent";
import { Phone, MapPin, Mail, ArrowUpRight, Sparkles } from "lucide-react";

export default function Footer() {
  const contact = nanaContactContent;

  return (
    <footer className="border-t border-[#8CC63F]/20 bg-[#0B3B24] text-[#F7F9F8]">
      {/* Top Pre-Footer / Hook Banner */}
      <div className="border-b border-[#8CC63F]/15 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              {/* Live Status Pill */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#8CC63F]/30 bg-[#082A19] px-4 py-1.5 text-xs font-semibold text-[#8CC63F] shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8CC63F] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8CC63F]" />
                </span>
                <span>{contact.availability}</span>
              </div>

              {/* Hook */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white lowercase">
                &ldquo;{contact.hook}&rdquo;
              </h2>
              <p className="mt-3 text-base text-[#E8F3EC]/80 font-light max-w-xl">
                {contact.subhook}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#8CC63F] px-7 py-4 text-sm font-bold text-[#082A19] shadow-xl shadow-[#8CC63F]/20 transition-all hover:bg-[#99D12B] hover:-translate-y-0.5"
              >
                <span>Let&apos;s Build Together</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Col 1: Brand Info & Logo */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-[#8CC63F]/30 bg-[#1B263B] shadow-md transition-transform group-hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="Nana Creative Logo"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white group-hover:text-[#8CC63F] transition-colors">
                  Nana Creative<span className="text-[#8CC63F]">.</span>
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8F3EC]/70">
                  Relentless Growth Engine
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-[#E8F3EC]/75 font-light max-w-md pt-2">
              Nana Creative fuses market research, cinema-grade video production, high-retention post-production, and data-driven social media scaling into one growth engine.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#8CC63F]">
              Site Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {nanaNavigationItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-[#E8F3EC]/80 hover:text-white hover:translate-x-0.5 transition-all"
                  >
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="rounded-full bg-[#8CC63F]/20 px-2 py-0.5 text-[9px] font-bold text-[#8CC63F]">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact & Locations */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#8CC63F]">
              Direct Contact & Hubs
            </h3>

            <div className="space-y-3 text-sm text-[#E8F3EC]/85 font-light">
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-[#8CC63F] shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`tel:${contact.phoneTel}`}
                    className="hover:text-[#8CC63F] transition-colors font-medium block"
                  >
                    {contact.phone}
                  </a>
                  <a
                    href={`tel:${contact.secondaryPhoneTel}`}
                    className="hover:text-[#8CC63F] transition-colors font-medium block mt-0.5"
                  >
                    {contact.secondaryPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <MapPin className="h-4 w-4 text-[#8CC63F] shrink-0 mt-0.5" />
                <span>{contact.locations}</span>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <Mail className="h-4 w-4 text-[#8CC63F] shrink-0 mt-0.5" />
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-[#8CC63F] transition-colors"
                >
                  {contact.email}
                </a>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <Sparkles className="h-4 w-4 text-[#8CC63F] shrink-0 mt-0.5" />
                <a
                  href={contact.socialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#8CC63F] transition-colors underline decoration-[#8CC63F]/40"
                >
                  TikTok {contact.social}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-[#8CC63F]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#E8F3EC]/60">
          <p>© {new Date().getFullYear()} Nana Creative®. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Dire Dawa & Addis Ababa</span>
            <span>•</span>
            <span className="text-[#8CC63F]">Cinema-Grade Media & Scaling</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
