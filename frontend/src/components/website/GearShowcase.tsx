"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { nanaGearContent } from "@/data/nanaContent";

export default function GearShowcase() {
  const gearData = nanaGearContent;

  return (
    <section
      id="gear"
      className="relative bg-white py-20 lg:py-28 text-[#1B263B]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
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

        {/* Responsive CSS Grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {gearData.items.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#E8F3EC] bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              {/* Card Image: Top half light grey image container rendering Next.js <Image /> */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F7F9F8]">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={600}
                  height={450}
                  className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Floating Tag: Absolutely positioned over the top-left inside a white pill with dark green text */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0B3B24] shadow-sm border border-[#E8F3EC]">
                    {item.tag}
                  </span>
                </div>
              </div>

              {/* Card Body: Bottom half with bold name, grey description, and Sprout Lime Green arrow button */}
              <div className="flex flex-col flex-1 justify-between p-6">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-[#1B263B] group-hover:text-[#0B3B24] transition-colors">
                    {item.name}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#1B263B]/70 font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Circular Sprout Lime Green (#8CC63F) arrow button at the bottom left */}
                <div className="mt-6 flex items-center justify-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8CC63F] text-[#0B3B24] shadow-xs transition-transform duration-200 group-hover:scale-110">
                    <ArrowUpRight className="h-5 w-5 stroke-[2.5]" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
