"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import {
  Share2,
  Video,
  Target,
  Compass,
  ArrowUpRight,
  Layers,
} from "lucide-react";
import { nanaServicesContent } from "@/data/nanaContent";

export default function ServicesBento() {
  const servicesData = nanaServicesContent;

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "share-2":
        return <Share2 className="h-6 w-6 text-[#0B3B24] group-hover:text-[#8CC63F] transition-colors" aria-hidden="true" />;
      case "video":
        return <Video className="h-6 w-6 text-[#0B3B24] group-hover:text-[#8CC63F] transition-colors" aria-hidden="true" />;
      case "target":
        return <Target className="h-6 w-6 text-[#0B3B24] group-hover:text-[#8CC63F] transition-colors" aria-hidden="true" />;
      case "compass":
        return <Compass className="h-6 w-6 text-[#0B3B24] group-hover:text-[#8CC63F] transition-colors" aria-hidden="true" />;
      default:
        return <Layers className="h-6 w-6 text-[#0B3B24] group-hover:text-[#8CC63F] transition-colors" aria-hidden="true" />;
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
      id="services"
      className="relative bg-[#F7F9F8] py-14 sm:py-20 lg:py-28 text-[#1B263B]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-14 max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E8F3EC] bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0B3B24] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#8CC63F]" />
            {servicesData.badge || servicesData.sectionBadge}
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-[#0B3B24]">
            {servicesData.headline}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#1B263B]/75 leading-relaxed font-normal">
            {servicesData.subheadline}
          </p>
        </div>

        {/* Bento Grid with Staggered Entrance & Tactile Hover Lift */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {servicesData.services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#E8F3EC] bg-white p-6 sm:p-8 lg:p-10 shadow-sm hover:border-[#8CC63F] hover:shadow-xl hover:shadow-[#0B3B24]/5 transition-all duration-300"
            >
              {/* Card Header: Number & Icon */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B3B24]/20 group-hover:text-[#0B3B24] transition-colors">
                    {service.number}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F3EC] transition-all duration-300 group-hover:bg-[#0B3B24] group-hover:scale-105">
                    {getServiceIcon(service.icon)}
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="mt-6 text-2xl font-bold tracking-tight text-[#0B3B24] group-hover:text-[#0B3B24] transition-colors">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="mt-3 text-base leading-relaxed text-[#1B263B]/80 font-normal">
                  {service.description}
                </p>
              </div>

              {/* Bottom: Deliverables / Focus Areas */}
              {service.deliverables && service.deliverables.length > 0 && (
                <div className="mt-8 pt-6 border-t border-[#E8F3EC]">
                  <div className="flex flex-wrap gap-2">
                    {service.deliverables.map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center rounded-lg bg-[#E8F3EC] px-2.5 py-1 text-xs font-semibold text-[#0B3B24] transition-colors group-hover:bg-[#E8F3EC]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs font-bold text-[#0B3B24]">
                    <span className="uppercase tracking-wider text-[11px] text-[#0B3B24]/60">
                      Discipline {service.number}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[#0B3B24] opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5">
                      Explore Framework
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#8CC63F]" />
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
