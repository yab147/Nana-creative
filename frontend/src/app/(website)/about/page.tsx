import type { Metadata } from "next";
import AboutSection from "@/components/website/AboutSection";
import ServicesBento from "@/components/website/ServicesBento";
import GearShowcase from "@/components/website/GearShowcase";
import { nanaAboutContent } from "@/data/nanaContent";

export const metadata: Metadata = {
  title: "About Us • Nana Creative | High-Impact Creative Agency",
  description: nanaAboutContent.body,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. About Hero Section with rich Deep Forest Emerald #0B3B24 background */}
      <AboutSection />

      {/* 2. Nested Services Bento Component (01 to 04) on Editorial Alabaster #F7F9F8 */}
      <ServicesBento />

      {/* 3. Nested Production Gear Spec-Sheet Component */}
      <GearShowcase />
    </div>
  );
}
