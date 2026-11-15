"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import {
  Camera,
  Sliders,
  SunMedium,
  Mic,
  Cpu,
  CheckCircle2,
} from "lucide-react";
import { nanaGearContent } from "@/data/nanaContent";

export default function GearShowcase() {
  const gearData = nanaGearContent;

  const getGearIcon = (iconName: string) => {
    switch (iconName) {
      case "camera":
        return <Camera className="h-5 w-5 text-[#0B3B24]" aria-hidden="true" />;
      case "sliders":
        return <Sliders className="h-5 w-5 text-[#0B3B24]" aria-hidden="true" />;
      case "sun-medium":
        return <SunMedium className="h-5 w-5 text-[#0B3B24]" aria-hidden="true" />;
      case "mic":
        return <Mic className="h-5 w-5 text-[#0B3B24]" aria-hidden="true" />;
      default:
        return <Cpu className="h-5 w-5 text-[#0B3B24]" aria-hidden="true" />;
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const rowVariants: Variants = {
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
    <section
      id="gear"
      className="relative bg-white py-20 lg:py-28 text-[#1B263B]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E8F3EC] bg-[#F7F9F8] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0B3B24]">
              <span className="h-2 w-2 rounded-full bg-[#8CC63F]" />
              {gearData.badge || gearData.sectionBadge}
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-[#0B3B24]">
              {gearData.headline}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#1B263B]/75 leading-relaxed font-normal">
              {gearData.subheadline}
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-[#0B3B24]/70 bg-[#F7F9F8] px-4 py-2 rounded-xl border border-[#E8F3EC]">
            <span className="h-2 w-2 rounded-full bg-[#8CC63F] animate-pulse" />
            <span>CALIBRATED FOR 4K CINEMA & HIGH-RETENTION SOCIAL</span>
          </div>
        </div>

        {/* Minimalist Spec-Sheet Table / Ledger */}
        <div className="overflow-hidden rounded-3xl border border-[#E8F3EC] bg-white shadow-xl shadow-[#0B3B24]/5">
          {/* Spec Sheet Table Header (Desktop) */}
          <div className="hidden md:grid grid-cols-12 gap-4 border-b border-[#E8F3EC] bg-[#F7F9F8] px-8 py-4 text-[11px] font-mono uppercase tracking-wider text-[#0B3B24]/70">
            <div className="col-span-2">Category</div>
            <div className="col-span-3">Hardware Model</div>
            <div className="col-span-5">Technical Specification</div>
            <div className="col-span-2 text-right">Production Role</div>
          </div>

          {/* Spec Rows with Staggered Entrance and Hover Effect */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="divide-y divide-[#E8F3EC]"
          >
            {gearData.items.map((item) => (
              <motion.div
                key={item.id}
                variants={rowVariants}
                whileHover={{ y: -2, backgroundColor: "#F7F9F8" }}
                transition={{ duration: 0.2 }}
                className="group grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-6 sm:px-8 py-6 transition-colors duration-200"
              >
                {/* Category Column */}
                <div className="md:col-span-2 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F3EC] group-hover:bg-white group-hover:shadow-sm transition-all duration-200">
                    {getGearIcon(item.icon)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#0B3B24]/60 block md:hidden">
                      Category
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#0B3B24]">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Hardware Name Column */}
                <div className="md:col-span-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#0B3B24]/60 block md:hidden">
                    Equipment
                  </span>
                  <h3 className="text-lg font-bold text-[#1B263B] group-hover:text-[#0B3B24] transition-colors">
                    {item.name}
                  </h3>
                </div>

                {/* Specs Column */}
                <div className="md:col-span-5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#0B3B24]/60 block md:hidden">
                    Specification
                  </span>
                  <p className="text-sm leading-relaxed text-[#1B263B]/75 font-normal">
                    {item.specification}
                  </p>
                </div>

                {/* Role / Badge Column */}
                <div className="md:col-span-2 flex items-center justify-start md:justify-end gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#8CC63F]/30 bg-[#E8F3EC] px-3 py-1 text-xs font-semibold text-[#0B3B24]">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#8CC63F]" />
                    {item.roleBadge}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Spec Footer Bar */}
          <div className="border-t border-[#E8F3EC] bg-[#F7F9F8] px-6 sm:px-8 py-3.5 flex flex-wrap items-center justify-between text-xs text-[#0B3B24]/70">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8CC63F]" />
              <span className="font-mono text-[11px] uppercase tracking-wider">
                Active In-House Inventory • Dire Dawa & Addis Ababa
              </span>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#0B3B24]">
              Zero Third-Party Production Rental Lag
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
