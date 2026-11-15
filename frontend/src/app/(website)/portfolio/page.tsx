import type { Metadata } from "next";
import ClientGrid from "@/components/website/ClientGrid";
import { successStories } from "@/data/nanaContent";

export const metadata: Metadata = {
  title: "Client Portfolio & Success Stories • Nana Creative",
  description:
    "Explore Nana Creative's synced client portfolio and success stories across Enterprise, Healthcare Authority, and Fast-Growing consumer disruptors.",
};

export default function PortfolioPage() {
  const totalStories = successStories.length;
  const healthcareCount = successStories.filter((s) => s.isHealthcare).length;

  return (
    <div className="min-h-screen bg-[#F7F9F8]">
      {/* Editorial Page Header */}
      <section className="border-b border-[#E8F3EC] bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E8F3EC] bg-[#F7F9F8] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0B3B24]">
              <span className="h-2 w-2 rounded-full bg-[#8CC63F]" />
              Client Success Stories ({totalStories} Active Partners)
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-[#0B3B24]">
              Brands Impossible to Ignore
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-[#1B263B]/75 leading-relaxed font-light">
              Collaborating with commercial enterprises, specialized clinical leaders, and rapid-growth innovators across Ethiopia.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-mono text-[#0B3B24]">
              <span className="rounded-full bg-[#E8F3EC] px-3 py-1 font-semibold">
                {totalStories} Case Studies
              </span>
              <span className="rounded-full bg-[#E8F3EC] px-3 py-1 font-semibold">
                {healthcareCount} Specialized Clinical Authorities
              </span>
              <span className="rounded-full bg-[#E8F3EC] px-3 py-1 font-semibold">
                Dire Dawa & Addis Ababa
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Client Grid with specialized Healthcare & Medical container */}
      <ClientGrid showTitle={false} />
    </div>
  );
}
