"use client";

import React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Users, MapPin, TrendingUp, Languages, Sparkles } from "lucide-react";
import { nanaAboutContent } from "@/data/nanaContent";

export default function AboutSection() {
  const about = nanaAboutContent;

  const getTagIcon = (iconName?: string) => {
    switch (iconName) {
      case "users":
        return <Users className="h-4 w-4 text-[#8CC63F]" aria-hidden="true" />;
      case "map-pin":
        return <MapPin className="h-4 w-4 text-[#8CC63F]" aria-hidden="true" />;
      case "trending-up":
        return <TrendingUp className="h-4 w-4 text-[#8CC63F]" aria-hidden="true" />;
      case "languages":
        return <Languages className="h-4 w-4 text-[#8CC63F]" aria-hidden="true" />;
      default:
        return <Sparkles className="h-4 w-4 text-[#8CC63F]" aria-hidden="true" />;
    }
  };

  const rightColumnVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.25,
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#0B3B24] py-12 sm:py-18 lg:py-24 text-white selection:bg-[#8CC63F] selection:text-[#082A19]"
    >
      {/* Editorial Atmospheric Halos */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-[#8CC63F]/10 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-[#082A19] blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Co-Founders Photo with Smooth Fade & Slide Up */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="group relative w-full max-w-[480px] overflow-hidden rounded-3xl border border-[#8CC63F]/30 bg-[#082A19] p-2.5 sm:p-3 shadow-2xl shadow-[#082A19]/80 transition-all duration-300 hover:border-[#8CC63F]/60">
              <div className="relative overflow-hidden rounded-2xl bg-[#0B3B24]">
                <Image
                  src={about.image}
                  alt={about.imageAlt}
                  width={800}
                  height={600}
                  priority
                  className="object-cover w-full h-auto transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Subtle Inner Gradient Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#082A19] via-transparent to-transparent opacity-50" />
              </div>

              {/* Bottom Photo Metadata Badge */}
              <div className="mt-3 px-3 py-1.5 flex items-center justify-between text-xs font-mono text-[#E8F3EC]/80">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#8CC63F]" />
                  <span className="uppercase tracking-wider text-[11px]">Co-Founders</span>
                </div>
                <span className="text-[11px] text-[#8CC63F] font-semibold">Dire Dawa • Addis Ababa</span>
              </div>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Headline, Body, and Tags (Staggered Animation) */}
          {/* ========================================================= */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center"
            variants={rightColumnVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Section Badge */}
            <motion.div variants={itemVariants} className="mb-5 flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#8CC63F]/30 bg-[#082A19]/80 px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase text-[#8CC63F] backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8CC63F] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8CC63F]" />
                </span>
                {about.badge || about.sectionBadge}
              </span>
            </motion.div>

            {/* Headline: hi, we're nana. */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white lowercase leading-tight"
            >
              {about.headline}
            </motion.h1>

            {/* Body Paragraph */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-base sm:text-lg lg:text-xl font-light leading-relaxed text-[#E8F3EC]/90"
            >
              {about.body}
            </motion.p>

            {/* Tags / Pills */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-3 pt-6 border-t border-[#8CC63F]/20"
            >
              {about.tags.map((tag) => (
                <div
                  key={tag.id}
                  className="group flex items-center gap-2.5 rounded-full border border-[#8CC63F]/25 bg-[#082A19]/80 px-4 py-2 text-xs sm:text-sm font-medium text-white shadow-xs backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#8CC63F] hover:bg-[#082A19] hover:shadow-md hover:shadow-[#8CC63F]/15"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#8CC63F]/15 transition-transform duration-300 group-hover:scale-110">
                    {getTagIcon(tag.icon)}
                  </div>
                  <span className="tracking-wide text-[#E8F3EC] group-hover:text-white transition-colors">
                    {tag.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
