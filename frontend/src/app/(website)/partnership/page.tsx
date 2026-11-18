"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import PartnersMap from "@/components/website/PartnersMap";
import { nanaPartnershipContent } from "@/data/nanaContent";
import { Handshake, ArrowUpRight, Sparkles } from "lucide-react";

export default function PartnershipPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Partnership Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="border-b border-[#E8F3EC] bg-[#F7F9F8] py-12 sm:py-18 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E8F3EC] bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0B3B24] shadow-xs">
              <Handshake className="h-4 w-4 text-[#8CC63F]" />
              <span>{nanaPartnershipContent.badge}</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-[#0B3B24]">
              {nanaPartnershipContent.headline}
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-[#1B263B]/75 leading-relaxed font-light">
              {nanaPartnershipContent.subheadline}
            </p>

            {/* Partnership Stats */}
            <div className="mt-8 flex flex-wrap items-center gap-5 sm:gap-6">
              {nanaPartnershipContent.stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-2xl border border-[#E8F3EC] bg-white px-5 py-3.5 shadow-xs"
                >
                  <span className="text-2xl font-black text-[#0B3B24]">
                    {stat.value}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1B263B]/60">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 2. Interactive Ethiopia Network Orbit Component */}
      <PartnersMap />

      {/* 3. Direct Link to Master Client Portfolio (Consolidation) */}
      <section className="border-t border-[#E8F3EC] bg-[#F7F9F8] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 rounded-3xl border border-[#E8F3EC] bg-white p-6 sm:p-8 lg:p-12 shadow-sm">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F3EC] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0B3B24] mb-3">
                <Sparkles className="h-3.5 w-3.5 text-[#8CC63F]" />
                Master Client Index
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B3B24]">
                Looking for our complete verified client record?
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#1B263B]/70 font-light leading-relaxed">
                Explore our full showcase of Enterprise leaders, specialized Clinical Authorities, and rapid-growth innovators.
              </p>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#0B3B24] px-7 py-4 text-sm font-bold text-white shadow-xl shadow-[#0B3B24]/15 transition-all hover:bg-[#082A19] hover:-translate-y-0.5"
            >
              <span>View Full Portfolio Index</span>
              <ArrowUpRight className="h-4 w-4 text-[#8CC63F]" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
