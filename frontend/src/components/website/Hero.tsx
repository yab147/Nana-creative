"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import dynamic from "next/dynamic";
import { getBrandProfileSync } from "@/data/brandProfile";

const NanaInteractiveLogo3D = dynamic(
  () => import("@/modules/three/components/NanaInteractiveLogo3D"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[500px] md:h-[620px] w-full items-center justify-center rounded-3xl border border-[#2A3A54] bg-[#1B263B] p-6 text-center shadow-2xl shadow-black/40">
        <div className="flex flex-col items-center gap-3">
          <span className="relative flex h-10 w-10">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8CC63F] opacity-75" />
            <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0B1626] text-sm text-[#8CC63F]">
              🌱
            </span>
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-[#E8F3EC]/70">
            Loading 3D Nana Creative Identity...
          </span>
        </div>
      </div>
    ),
  }
);
import {
  ArrowUpRight,
  Play,
  Sparkles,
  Sprout,
  MapPin,
  Layers,
} from "lucide-react";

export default function Hero() {
  const brand = getBrandProfileSync();
  const heroRef = useRef<HTMLElement>(null);

  // Icon mapping for metrics
  const getMetricIcon = (iconName?: string) => {
    switch (iconName) {
      case "sprout":
        return <Sprout className="h-5 w-5 text-[#8CC63F]" />;
      case "map-pin":
        return <MapPin className="h-5 w-5 text-[#8CC63F]" />;
      case "layers":
        return <Layers className="h-5 w-5 text-[#8CC63F]" />;
      default:
        return <Sparkles className="h-5 w-5 text-[#8CC63F]" />;
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[calc(100svh-120px)] overflow-hidden bg-radial from-[#F7F9F8] via-[#FFFFFF] to-[#F7F9F8] py-8 lg:py-14"
    >
      {/* Editorial Decorative Background Halos */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[640px] w-[640px] rounded-full bg-[#8CC63F]/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 left-[-10%] h-[500px] w-[500px] rounded-full bg-[#E8F3EC]/70 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Editorial Copy, Signature Hook, Dual CTAs & Stats */}
          {/* ========================================================= */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* 1. Live Status Pill */}
            <motion.div variants={itemVariants} className="mb-5 flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[#0B3B24]/15 bg-[#E8F3EC] px-4 py-1.5 shadow-xs">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8CC63F] opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#8CC63F]" />
                </span>
                <span className="text-xs font-bold text-[#0B3B24]">
                  {brand.hero.statusBadge}
                </span>
              </div>
            </motion.div>

            {/* 2. Signature Hook Callout Banner */}
            <motion.div variants={itemVariants} className="mb-4 inline-block">
              <span className="text-xs font-mono tracking-wider uppercase text-[#0B3B24] bg-[#E8F3EC] px-3.5 py-1.5 rounded-full border border-[#8CC63F]/25 font-semibold shadow-xs">
                {brand.signatureHook}
              </span>
            </motion.div>

            {/* 3. Editorial H1 Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl font-extrabold tracking-tight text-[#082A19] sm:text-6xl lg:text-7xl leading-[1.08]"
            >
              {brand.hero.headlineLine1} <br />
              {brand.hero.headlineLine2}{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#0B3B24]">{brand.hero.headlineHighlight}</span>
                <span
                  aria-hidden="true"
                  className="absolute bottom-1 left-0 -z-0 h-3 w-full rounded-full bg-[#8CC63F]/35 sm:bottom-1.5 sm:h-4.5"
                />
              </span>
            </motion.h1>

            {/* 4. Editorial Subhead Description */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl text-base leading-relaxed text-[#1B263B]/80 sm:text-lg sm:leading-8 font-normal"
            >
              {brand.hero.description}
            </motion.p>

            {/* 5. Dual CTAs */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5"
            >
              <Link
                href={brand.hero.primaryCta.href}
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-[#0B3B24] px-7 py-4 text-sm font-bold text-white shadow-xl shadow-[#0B3B24]/20 transition-all duration-300 hover:bg-[#082A19] hover:shadow-2xl hover:shadow-[#0B3B24]/30 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#8CC63F]"
              >
                <span>{brand.hero.primaryCta.label}</span>
                <ArrowUpRight className="h-4 w-4 text-[#8CC63F] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>

              <a
                href="https://www.tiktok.com/@nana_creatives"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-2xl border-2 border-[#0B3B24]/15 bg-white px-6 py-4 text-sm font-bold text-[#0B3B24] shadow-sm transition-all duration-300 hover:border-[#8CC63F] hover:bg-[#E8F3EC]/40 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#8CC63F]"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E8F3EC] text-[#0B3B24] transition-colors group-hover:bg-[#8CC63F] group-hover:text-[#082A19]">
                  <Play className="h-3 w-3 fill-current ml-0.5" />
                </div>
                <span>Watch Showreel</span>
              </a>
            </motion.div>

            {/* 6. The 3 Metric Counters (Zero hardcoded, mapped from BrandProfile) */}
            <motion.div
              variants={itemVariants}
              className="mt-10 sm:mt-12 grid grid-cols-3 gap-2.5 sm:gap-6 rounded-3xl border border-[#E8F3EC] bg-white/80 p-4 sm:p-6 shadow-lg shadow-[#0B3B24]/5 backdrop-blur-md"
            >
              {brand.hero.metrics.map((metric, index) => (
                <div
                  key={metric.id}
                  className={`flex flex-col ${index < brand.hero.metrics.length - 1
                      ? "border-r border-[#E8F3EC] pr-2.5 sm:pr-6"
                      : ""
                    }`}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {getMetricIcon(metric.icon)}
                    <span className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0B3B24]">
                      {metric.value}
                    </span>
                  </div>
                  <span className="mt-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#0B3B24]/80">
                    {metric.label}
                  </span>
                  {metric.sublabel && (
                    <span className="mt-0.5 text-[11px] text-[#1B263B]/60 hidden sm:block">
                      {metric.sublabel}
                    </span>
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: 3D Mouse-Sprout Stage (SproutEngine3D)     */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Glowing Backdrop Ring */}
            <div className="pointer-events-none absolute inset-0 -m-4 rounded-full bg-radial from-[#8CC63F]/20 via-[#E8F3EC]/40 to-transparent blur-2xl" />

            {/* Interactive 3D Nana Creative Logo Hero Centerpiece */}
            <NanaInteractiveLogo3D />
          </div>
        </div>
      </div>

    </section>
  );
}
