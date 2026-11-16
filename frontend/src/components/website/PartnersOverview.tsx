"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { successStories } from "@/data/nanaContent";

export default function PartnersOverview() {
  const partners = successStories;
  // Duplicate 3x for a mathematically seamless, continuous infinite loop
  const marqueeItems = [...partners, ...partners, ...partners];

  return (
    <section className="relative overflow-hidden border-b border-[#E8F3EC] bg-[#F7F9F8] py-16 sm:py-20 lg:py-24">
      {/* Header Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          {/* Mint Status Pill */}
          <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-[#E8F3EC] bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0B3B24] shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-[#8CC63F]" />
            <span>Client Partnerships</span>
          </div>

          {/* Section Header */}
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-[#0B3B24]">
            Trusted by industry leaders across Ethiopia.
          </h2>

          <p className="mt-3 text-base sm:text-lg text-[#1B263B]/70 font-light leading-relaxed">
            Powering enterprise conglomerates, specialized healthcare authorities, and high-velocity commercial brands with cinema-grade media and social scaling.
          </p>
        </motion.div>
      </div>

      {/* Continuous Motion Marquee Track (Hardware Accelerated Dual-Track Infinite Loop) */}
      <div className="relative w-full overflow-hidden flex select-none py-2">
        {/* Left & Right Edge Gradient Fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-36 bg-gradient-to-r from-[#F7F9F8] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-36 bg-gradient-to-l from-[#F7F9F8] to-transparent" />

        {/* Track 1: First complete set */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0 py-2 animate-marquee will-change-transform pr-4 sm:pr-6">
          {partners.map((partner, index) => (
            <Link
              key={`track1-${partner.id}-${index}`}
              href="/partnership"
              className="group flex items-center gap-3.5 shrink-0 rounded-2xl border border-[#E8F3EC] bg-white px-5 py-3.5 min-h-[56px] shadow-xs transition-all duration-300 hover:border-[#8CC63F] hover:shadow-lg hover:shadow-[#0B3B24]/5 hover:-translate-y-1"
            >
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-[#E8F3EC] bg-[#F7F9F8] p-1.5 transition-colors group-hover:border-[#8CC63F]/50 group-hover:bg-[#E8F3EC]/50">
                <Image
                  src={partner.logoPath}
                  alt={`${partner.name} logo`}
                  fill
                  sizes="44px"
                  className="object-contain p-1 filter grayscale contrast-90 opacity-75 transition-all duration-300 group-hover:grayscale-0 group-hover:contrast-100 group-hover:opacity-100"
                />
              </div>

              <div className="flex flex-col text-left">
                <span className="text-sm font-bold tracking-tight text-[#0B3B24] transition-colors whitespace-nowrap">
                  {partner.name}
                </span>
                <span className="text-[11px] font-medium text-[#1B263B]/65 group-hover:text-[#0B3B24] transition-colors whitespace-nowrap">
                  {partner.industry}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Track 2: Identical twin set for seamless continuous infinite motion */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0 py-2 animate-marquee will-change-transform pr-4 sm:pr-6" aria-hidden="true">
          {partners.map((partner, index) => (
            <Link
              key={`track2-${partner.id}-${index}`}
              href="/partnership"
              tabIndex={-1}
              className="group flex items-center gap-3.5 shrink-0 rounded-2xl border border-[#E8F3EC] bg-white px-5 py-3.5 min-h-[56px] shadow-xs transition-all duration-300 hover:border-[#8CC63F] hover:shadow-lg hover:shadow-[#0B3B24]/5 hover:-translate-y-1"
            >
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-[#E8F3EC] bg-[#F7F9F8] p-1.5 transition-colors group-hover:border-[#8CC63F]/50 group-hover:bg-[#E8F3EC]/50">
                <Image
                  src={partner.logoPath}
                  alt={`${partner.name} logo`}
                  fill
                  sizes="44px"
                  className="object-contain p-1 filter grayscale contrast-90 opacity-75 transition-all duration-300 group-hover:grayscale-0 group-hover:contrast-100 group-hover:opacity-100"
                />
              </div>

              <div className="flex flex-col text-left">
                <span className="text-sm font-bold tracking-tight text-[#0B3B24] transition-colors whitespace-nowrap">
                  {partner.name}
                </span>
                <span className="text-[11px] font-medium text-[#1B263B]/65 group-hover:text-[#0B3B24] transition-colors whitespace-nowrap">
                  {partner.industry}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Subtle Link to Full Roster */}
      <div className="mt-10 text-center">
        <Link
          href="/portfolio"
          className="group inline-flex items-center gap-2 text-xs font-bold text-[#0B3B24] hover:text-[#8CC63F] transition-colors min-h-[44px]"
        >
          <span>Explore complete client index and verified case studies</span>
          <ArrowUpRight className="h-3.5 w-3.5 text-[#8CC63F] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </section>
  );
}
