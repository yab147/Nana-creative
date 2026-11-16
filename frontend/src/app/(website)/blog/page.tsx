import type { Metadata } from "next";
import apiClient from "@/services/apiClient";
import BlogGrid from "@/components/blog/BlogGrid";
import { BlogPost } from "@/types/api.types";
import { Sparkles, Newspaper, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog & Editorial Dispatches • Nana Creative",
  description:
    "Explore perspectives on cinema-grade media, market positioning, high-retention storytelling, and full-funnel digital scaling from Nana Creative.",
};

// Revalidate page every 60 seconds (ISR)
export const revalidate = 60;

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  let fetchError: string | null = null;

  try {
    posts = await apiClient.blog.getAllPosts();
  } catch (error) {
    console.error("[BlogPage] Error fetching posts from API:", error);
    fetchError =
      error instanceof Error ? error.message : "Unable to load articles from the backend API.";
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Editorial Header Section */}
      <section className="relative overflow-hidden border-b border-[#E8F3EC] bg-[#F7F9F8] py-16 lg:py-24">
        {/* Subtle grid background pattern */}
        <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#E8F3EC_1px,transparent_1px),linear-gradient(to_bottom,#E8F3EC_1px,transparent_1px)] bg-[size:3rem_3rem]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            {/* Soft Mint Category/Status Pill (#E8F3EC) */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E8F3EC] bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0B3B24] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#8CC63F]" />
              <span>Editorial & Intelligence</span>
            </div>

            {/* Midnight Navy Bold Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1B263B]">
              Dispatches &amp; <span className="text-[#0B3B24]">Creative Strategy.</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#1B263B]/75 font-normal max-w-2xl">
              In-depth playbooks, engineering insights, and field reports on cinema-grade video, high-retention social scaling, and relentless commercial growth.
            </p>

            <div className="mt-8 flex items-center gap-4 text-xs font-mono text-[#0B3B24]">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8CC63F]" />
                Live Swagger API Connected
              </span>
              <span>•</span>
              <span>{posts.length} {posts.length === 1 ? "Article" : "Articles"} Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Blog Content Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {fetchError && posts.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-3xl border border-amber-200 bg-amber-50/50 p-8 text-center text-amber-900">
              <Newspaper className="mx-auto mb-3 h-8 w-8 text-amber-600" />
              <h3 className="text-lg font-bold">Connecting to Backend Dispatch Service...</h3>
              <p className="mt-2 text-sm text-amber-800/80">
                The live API instance is warming up or temporarily unreachable.
              </p>
              <div className="mt-4 font-mono text-xs text-amber-700/60 break-all bg-white/70 p-3 rounded-lg border border-amber-200">
                {fetchError}
              </div>
            </div>
          ) : (
            <BlogGrid posts={posts} />
          )}

          {/* Bottom Editorial Callout */}
          <div className="mt-20 rounded-3xl bg-[#0B3B24] p-8 sm:p-12 text-white relative overflow-hidden">
            <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 rounded-full bg-[#8CC63F]/10 blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#8CC63F]/20 px-3 py-1 text-xs font-bold text-[#8CC63F] mb-4">
                <Sparkles className="h-3 w-3" />
                <span>Partner With Nana Creative</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Have a story or brand ready for cinematic scale?
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#E8F3EC]/80 leading-relaxed">
                Connect with our directors in Dire Dawa and Addis Ababa to architect your next high-retention media campaign.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[#8CC63F] px-6 py-3 text-xs font-bold text-[#082A19] transition-all hover:bg-[#99D12B] hover:-translate-y-0.5"
                >
                  <span>Book Creative Consultation</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
