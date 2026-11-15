"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import {
  ShieldCheck,
  Building2,
  Zap,
  ArrowUpRight,
  Stethoscope,
  Sparkles,
} from "lucide-react";
import { successStories, type SuccessStoryItem } from "@/data/nanaContent";

interface ClientGridProps {
  showTitle?: boolean;
}

export default function ClientGrid({ showTitle = true }: ClientGridProps) {
  // Shared data source: successStories
  const enterpriseStories = successStories.filter((s) => s.tier === "Enterprise");
  const healthcareStories = successStories.filter((s) => s.isHealthcare);
  const fastGrowingStories = successStories.filter((s) => s.tier === "Fast-Growing");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="portfolio"
      className="relative bg-[#F7F9F8] py-16 lg:py-24 text-[#1B263B]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        {showTitle && (
          <div className="mb-14 max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E8F3EC] bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0B3B24] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#8CC63F]" />
              Client Success Stories
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-[#0B3B24]">
              Brands Impossible to Ignore
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#1B263B]/75 leading-relaxed font-normal">
              Trusted by enterprise leaders, clinical authorities, and high-velocity innovators across Ethiopia.
            </p>
          </div>
        )}

        <div className="space-y-14">
          {/* ========================================================= */}
          {/* 1. MAJOR / ENTERPRISE SUCCESS STORIES                     */}
          {/* ========================================================= */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 border-b border-[#E8F3EC] pb-4">
              <div className="flex items-center gap-3">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B3B24]">
                  Enterprise
                </h3>
                <span className="rounded-full bg-[#E8F3EC] px-3 py-1 text-xs font-semibold text-[#0B3B24]">
                  Commercial Giants
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#1B263B]/60 max-w-xl">
                High-scale commercial enterprises, industrial manufacturers, and established multi-sector brands.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {enterpriseStories.map((story) => (
                <motion.div
                  key={story.id}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="group flex flex-col justify-between rounded-2xl border border-[#E8F3EC] bg-white p-6 shadow-sm hover:border-[#8CC63F] hover:shadow-xl hover:shadow-[#0B3B24]/5 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7F9F8] border border-[#E8F3EC] group-hover:border-[#8CC63F]/40 group-hover:bg-[#E8F3EC] transition-colors">
                        <Building2 className="h-5 w-5 text-[#0B3B24]" />
                      </div>
                      <span className="rounded-full bg-[#E8F3EC] px-2.5 py-0.5 text-[11px] font-semibold text-[#0B3B24]">
                        {story.industry}
                      </span>
                    </div>

                    <h4 className="mt-5 text-lg font-bold tracking-tight text-[#1B263B] group-hover:text-[#0B3B24] transition-colors">
                      {story.name}
                    </h4>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#E8F3EC] flex items-center justify-between text-xs font-bold text-[#0B3B24]">
                    <a
                      href={story.tiktokUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[#0B3B24] hover:text-[#8CC63F] transition-colors group-hover:underline"
                    >
                      <span>Watch Content</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#8CC63F] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                    <span className="font-mono text-[10px] text-[#0B3B24]/40 uppercase">
                      Verified
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ========================================================= */}
          {/* 2. HEALTHCARE & MEDICAL AUTHORITY (Distinct #0B3B24 Dark) */}
          {/* ========================================================= */}
          <div className="relative overflow-hidden rounded-3xl bg-[#0B3B24] p-8 sm:p-12 text-white shadow-2xl shadow-[#0B3B24]/20 border border-[#8CC63F]/25">
            {/* Atmospheric Glow Halos */}
            <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#8CC63F]/15 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#082A19] blur-[80px]" />

            <div className="relative">
              {/* Header with Authority Badge */}
              <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#8CC63F]/30 bg-[#082A19]/80 px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase text-[#8CC63F]">
                    <ShieldCheck className="h-4 w-4 text-[#8CC63F]" />
                    Specialized Authority
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    Healthcare & Medical Authority
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-[#E8F3EC]/80 max-w-2xl font-light">
                    Specialized clinical and aesthetic institutions requiring high-trust credibility, precision compliance, and dedicated medical authority.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-[#8CC63F] bg-[#082A19]/70 border border-[#8CC63F]/20 px-3.5 py-2 rounded-xl">
                  <span className="h-2 w-2 rounded-full bg-[#8CC63F] animate-ping" />
                  <span>HIGH-TRUST POSITIONING ENGINE</span>
                </div>
              </div>

              {/* Healthcare & Medical Cards */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {healthcareStories.map((story) => (
                  <motion.div
                    key={story.id}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="group relative flex flex-col justify-between rounded-2xl border border-[#8CC63F]/25 bg-[#082A19]/85 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-[#8CC63F] hover:bg-[#082A19] hover:shadow-xl hover:shadow-[#8CC63F]/10"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8CC63F]/15 group-hover:bg-[#8CC63F]/25 transition-colors">
                          <Stethoscope className="h-5 w-5 text-[#8CC63F]" />
                        </div>
                        <span className="rounded-full border border-[#8CC63F]/40 bg-[#8CC63F]/10 px-3 py-1 text-xs font-semibold text-[#8CC63F]">
                          {story.badge || story.industry}
                        </span>
                      </div>

                      <h4 className="mt-6 text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#8CC63F] transition-colors">
                        {story.name}
                      </h4>
                      <p className="mt-1.5 text-xs sm:text-sm text-[#E8F3EC]/70">
                        Sector: {story.industry}
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-[#8CC63F]/20 flex items-center justify-between text-xs text-[#E8F3EC]/80 font-semibold">
                      <a
                        href={story.tiktokUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#8CC63F] hover:underline transition-colors"
                      >
                        <span>Watch Content</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                      <span className="font-mono text-[11px] text-[#E8F3EC]/60 uppercase">
                        Verified Authority
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 3. FAST-GROWING BRANDS                                   */}
          {/* ========================================================= */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 border-b border-[#E8F3EC] pb-4">
              <div className="flex items-center gap-3">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B3B24]">
                  Fast-Growing Brands
                </h3>
                <span className="rounded-full bg-[#E8F3EC] px-3 py-1 text-xs font-semibold text-[#0B3B24]">
                  High Velocity
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#1B263B]/60 max-w-xl">
                High-momentum consumer lifestyle, fragrance, beauty, and culinary brands aggressively scaling market share.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {fastGrowingStories.map((story) => (
                <motion.div
                  key={story.id}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="group flex flex-col justify-between rounded-2xl border border-[#E8F3EC] bg-white p-6 shadow-sm hover:border-[#8CC63F] hover:shadow-xl hover:shadow-[#0B3B24]/5 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7F9F8] border border-[#E8F3EC] group-hover:border-[#8CC63F]/40 group-hover:bg-[#E8F3EC] transition-colors">
                        <Zap className="h-5 w-5 text-[#0B3B24]" />
                      </div>
                      <span className="rounded-full bg-[#E8F3EC] px-2.5 py-0.5 text-[11px] font-semibold text-[#0B3B24]">
                        {story.industry}
                      </span>
                    </div>

                    <h4 className="mt-5 text-lg font-bold tracking-tight text-[#1B263B] group-hover:text-[#0B3B24] transition-colors">
                      {story.name}
                    </h4>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#E8F3EC] flex items-center justify-between text-xs font-bold text-[#0B3B24]">
                    <a
                      href={story.tiktokUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[#0B3B24] hover:text-[#8CC63F] transition-colors group-hover:underline"
                    >
                      <span>Watch Content</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#8CC63F] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                    <span className="font-mono text-[10px] text-[#0B3B24]/40 uppercase">
                      Active
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
