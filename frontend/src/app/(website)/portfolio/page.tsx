"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { successStories } from "@/data/nanaContent";

export default function PortfolioPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#F7F9F8] py-10 sm:py-16 lg:py-20 text-[#1B263B]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header: Active Partnership Success Stories with subtext and VIEW FULL PORTFOLIO INDEX link */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-[#E8F3EC] pb-8">
          <div className="max-w-2xl">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E8F3EC] bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0B3B24] shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-[#8CC63F]" />
              Synced Commercial Network
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-[#0B3B24]">
              Active Partnership Success Stories
            </h1>
            <p className="mt-3 text-base sm:text-lg text-[#1B263B]/75 leading-relaxed font-light">
              Both our portfolio and partnership network share this live verified record of {successStories.length} institutional collaborations.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B3B24] hover:text-[#8CC63F] transition-colors"
          >
            <span>VIEW FULL PORTFOLIO INDEX</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid Layout: CSS Grid, responsive (1 column mobile, up to 4 columns desktop) */}
        <motion.div
          id="portfolio-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {successStories.map((story) => {
            const isHealthcare = story.tier === "Healthcare";

            return (
              <motion.div
                key={story.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`group flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 ${
                  isHealthcare
                    ? "border-[#8CC63F]/30 bg-[#0B3B24] text-white shadow-xl shadow-[#0B3B24]/10 hover:border-[#8CC63F]"
                    : "border-[#E8F3EC] bg-white text-[#1B263B] shadow-sm hover:border-[#8CC63F] hover:shadow-xl hover:shadow-[#0B3B24]/5"
                }`}
              >
                <div>
                  {/* Top Row: Next.js <Image> (Top Left) & Industry Pill (Top Right) */}
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`relative h-12 w-12 overflow-hidden rounded-xl p-1 flex items-center justify-center shrink-0 ${
                        isHealthcare
                          ? "bg-white/10 border border-[#8CC63F]/30"
                          : "bg-[#F7F9F8] border border-[#E8F3EC]"
                      }`}
                    >
                      <Image
                        src={story.logoPath}
                        alt={`${story.name} logo`}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full rounded-lg"
                      />
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        isHealthcare
                          ? "bg-[#8CC63F]/20 text-[#8CC63F] border border-[#8CC63F]/30"
                          : "bg-[#E8F3EC] text-[#0B3B24]"
                      }`}
                    >
                      {story.industry}
                    </span>
                  </div>

                  {/* Middle: Bold Client Name and grey Partner Tier text */}
                  <h3
                    className={`mt-5 text-base font-bold tracking-tight transition-colors ${
                      isHealthcare
                        ? "text-white group-hover:text-[#8CC63F]"
                        : "text-[#1B263B] group-hover:text-[#0B3B24]"
                    }`}
                  >
                    {story.name}
                  </h3>
                  <p
                    className={`mt-1 text-xs ${
                      isHealthcare ? "text-[#E8F3EC]/70" : "text-[#1B263B]/65"
                    }`}
                  >
                    Partner Tier: {story.tier}
                  </p>
                </div>

                {/* Bottom Row: Watch Content hyperlink & right-aligned SYNCED */}
                <div
                  className={`mt-6 pt-3.5 border-t flex items-center justify-between text-xs font-bold ${
                    isHealthcare
                      ? "border-[#8CC63F]/20 text-[#8CC63F]"
                      : "border-[#E8F3EC] text-[#0B3B24]"
                  }`}
                >
                  <a
                    href={story.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:underline transition-colors"
                  >
                    <span>Watch Content</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wider ${
                      isHealthcare ? "text-[#E8F3EC]/50" : "text-[#1B263B]/40"
                    }`}
                  >
                    SYNCED
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
