import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/website/Hero";
import { ArrowUpRight, Sparkles, Layers, Briefcase, Handshake, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Nana Creative • We Grow Ideas That Grow Businesses",
  description:
    "Nana Creative is an industry-leading agency in Dire Dawa and Addis Ababa, fusing market research, cinema-grade video production, and social scaling.",
};

const pageModules = [
  {
    title: "About Nana & Capabilities",
    badge: "Who We Are",
    description:
      "Explore our story, core disciplines, and in-house cinema-grade production equipment.",
    href: "/about",
    icon: Layers,
    cta: "Explore Agency & Gear",
  },
  {
    title: "Client Portfolio",
    badge: "Verified Work",
    description:
      "Review our track record across Enterprise, Specialized Healthcare Authority, and Fast-Growing brands.",
    href: "/portfolio",
    icon: Briefcase,
    cta: "View Client Roster",
  },
  {
    title: "Strategic Partnerships",
    badge: "Network",
    description:
      "Discover how we collaborate with regional hubs and enterprises across Ethiopia.",
    href: "/partnership",
    icon: Handshake,
    cta: "Explore Network",
  },
  {
    title: "Direct Consultation",
    badge: "Get In Touch",
    description:
      "Connect directly with our creative directors in Dire Dawa and Addis Ababa.",
    href: "/contact",
    icon: Phone,
    cta: "Schedule Discovery",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-white">
      {/* 1. 3D Hero Section (Pure 3D interactive center, zero overlay clutter) */}
      <Hero />

      {/* 2. Editorial Gateway: Modular Multi-Page Navigation Hub */}
      <section className="border-t border-[#E8F3EC] bg-[#F7F9F8] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E8F3EC] bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0B3B24]">
                <Sparkles className="h-3.5 w-3.5 text-[#8CC63F]" />
                Explore The Agency
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-[#0B3B24]">
                Architecture for Modern Brands
              </h2>
              <p className="mt-2 text-base text-[#1B263B]/70">
                Navigate directly to our dedicated agency modules.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[#0B3B24]/70 bg-white px-4 py-2 rounded-full border border-[#E8F3EC]">
              <span className="h-2 w-2 rounded-full bg-[#8CC63F] animate-pulse" />
              <span>Multi-Page Modular Routing</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pageModules.map((module) => {
              const Icon = module.icon;
              return (
                <Link
                  key={module.href}
                  href={module.href}
                  className="group flex flex-col justify-between rounded-3xl border border-[#E8F3EC] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#8CC63F] hover:shadow-xl hover:shadow-[#0B3B24]/5"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8F3EC] group-hover:bg-[#0B3B24] transition-colors">
                        <Icon className="h-5 w-5 text-[#0B3B24] group-hover:text-[#8CC63F] transition-colors" />
                      </div>
                      <span className="rounded-full bg-[#E8F3EC]/70 px-2.5 py-0.5 text-[11px] font-semibold text-[#0B3B24]">
                        {module.badge}
                      </span>
                    </div>

                    <h3 className="mt-5 text-xl font-bold tracking-tight text-[#0B3B24] group-hover:text-[#0B3B24] transition-colors">
                      {module.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#1B263B]/70">
                      {module.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E8F3EC] flex items-center justify-between text-xs font-bold text-[#0B3B24]">
                    <span>{module.cta}</span>
                    <ArrowUpRight className="h-4 w-4 text-[#8CC63F] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}