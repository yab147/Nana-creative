"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import PartnersMap from "@/components/website/PartnersMap";
import {
  nanaPartnershipContent,
  successStories,
} from "@/data/nanaContent";
import {
  ArrowUpRight,
  Sparkles,
  Handshake,
  Building2,
  Stethoscope,
  Zap,
} from "lucide-react";

export default function PartnershipPage() {
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
    hidden: { opacity: 0, y: 18 },
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
    <div className="min-h-screen bg-white">
      {/* 1. Partnership Hero */}
      <section className="border-b border-[#E8F3EC] bg-[#F7F9F8] py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E8F3EC] bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0B3B24]">
              <Handshake className="h-4 w-4 text-[#8CC63F]" />
              {nanaPartnershipContent.badge}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-[#0B3B24]">
              {nanaPartnershipContent.headline}
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-[#1B263B]/75 leading-relaxed font-light">
              {nanaPartnershipContent.subheadline}
            </p>

            {/* Partnership Stats */}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              {nanaPartnershipContent.stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-2xl border border-[#E8F3EC] bg-white px-5 py-3 shadow-xs"
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
      </section>

      {/* 2. Interactive 3D Orbiting Partners Map */}
      <PartnersMap />

      {/* 3. Shared Success Stories (Synced directly with Portfolio via successStories) */}
      <section className="border-t border-[#E8F3EC] bg-[#F7F9F8] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E8F3EC] bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0B3B24]">
                <Sparkles className="h-3.5 w-3.5 text-[#8CC63F]" />
                Synced Commercial Network
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-[#0B3B24]">
                Active Partnership Success Stories
              </h2>
              <p className="mt-2 text-base text-[#1B263B]/70 font-light">
                Both our portfolio and partnership network share this live verified record of {successStories.length} institutional collaborations.
              </p>
            </div>

            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B3B24] hover:text-[#8CC63F] transition-colors"
            >
              <span>View Full Portfolio Index</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Staggered Animated Grid of Synced Success Stories */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {successStories.map((story) => (
              <motion.div
                key={story.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`group flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 ${
                  story.isHealthcare
                    ? "border-[#8CC63F]/30 bg-[#0B3B24] text-white shadow-xl shadow-[#0B3B24]/10 hover:border-[#8CC63F]"
                    : "border-[#E8F3EC] bg-white text-[#1B263B] shadow-sm hover:border-[#8CC63F] hover:shadow-xl hover:shadow-[#0B3B24]/5"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                        story.isHealthcare
                          ? "bg-[#8CC63F]/20 text-[#8CC63F]"
                          : "bg-[#F7F9F8] border border-[#E8F3EC] text-[#0B3B24] group-hover:bg-[#E8F3EC]"
                      }`}
                    >
                      {story.isHealthcare ? (
                        <Stethoscope className="h-5 w-5" />
                      ) : story.tier === "Enterprise" ? (
                        <Building2 className="h-5 w-5" />
                      ) : (
                        <Zap className="h-5 w-5" />
                      )}
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                        story.isHealthcare
                          ? "bg-[#8CC63F]/20 text-[#8CC63F] border border-[#8CC63F]/30"
                          : "bg-[#E8F3EC] text-[#0B3B24]"
                      }`}
                    >
                      {story.industry}
                    </span>
                  </div>

                  <h4
                    className={`mt-5 text-base font-bold tracking-tight transition-colors ${
                      story.isHealthcare
                        ? "text-white group-hover:text-[#8CC63F]"
                        : "text-[#1B263B] group-hover:text-[#0B3B24]"
                    }`}
                  >
                    {story.name}
                  </h4>
                  <p
                    className={`mt-1 text-xs ${
                      story.isHealthcare ? "text-[#E8F3EC]/70" : "text-[#1B263B]/60"
                    }`}
                  >
                    Partner Tier: {story.tier}
                  </p>
                </div>

                <div
                  className={`mt-6 pt-3 border-t flex items-center justify-between text-xs font-bold ${
                    story.isHealthcare
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
                  <span className="font-mono text-[10px] opacity-60 uppercase">
                    Synced
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
