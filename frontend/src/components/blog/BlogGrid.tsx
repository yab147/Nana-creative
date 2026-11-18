"use client";

import React, { useState, useMemo } from "react";
import { BlogPost } from "@/types/api.types";
import BlogCard from "@/components/blog/BlogCard";
import { Search, Sparkles, BookOpen } from "lucide-react";

interface BlogGridProps {
  posts: BlogPost[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Derive unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add("All");
    posts.forEach((p) => {
      const lower = `${p.title} ${p.description}`.toLowerCase();
      if (lower.includes("neon") || lower.includes("prisma") || lower.includes("nestjs") || lower.includes("tech")) {
        cats.add("Engineering & Cloud");
      } else if (lower.includes("video") || lower.includes("canon") || lower.includes("production")) {
        cats.add("Cinema Production");
      } else if (lower.includes("tiktok") || lower.includes("viral") || lower.includes("growth")) {
        cats.add("Social Scaling");
      } else {
        cats.add("Creative Insights");
      }
    });
    return Array.from(cats);
  }, [posts]);

  // Filter posts based on search query and category
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;
      if (selectedCategory === "All") return true;

      const lower = `${post.title} ${post.description}`.toLowerCase();
      if (selectedCategory === "Engineering & Cloud") {
        return lower.includes("neon") || lower.includes("prisma") || lower.includes("nestjs") || lower.includes("tech");
      }
      if (selectedCategory === "Cinema Production") {
        return lower.includes("video") || lower.includes("canon") || lower.includes("production");
      }
      if (selectedCategory === "Social Scaling") {
        return lower.includes("tiktok") || lower.includes("viral") || lower.includes("growth");
      }
      return true;
    });
  }, [posts, searchQuery, selectedCategory]);

  if (!posts || posts.length === 0) {
    return (
      <div className="mx-auto my-16 max-w-xl rounded-3xl border border-[#E8F3EC] bg-[#F7F9F8] p-12 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F3EC] text-[#0B3B24]">
          <BookOpen className="h-7 w-7 text-[#0B3B24]" />
        </div>
        <h3 className="text-xl font-bold text-[#1B263B]">No Articles Published Yet</h3>
        <p className="mt-2 text-sm text-[#1B263B]/70">
          Our creative directors and production team are preparing fresh dispatches. Check back shortly.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Search and Category Filter Bar */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? "bg-[#0B3B24] text-white shadow-sm"
                    : "border border-[#E8F3EC] bg-white text-[#1B263B]/80 hover:border-[#8CC63F] hover:bg-[#F7F9F8]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1B263B]/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles & guides..."
            className="w-full rounded-full border border-[#E8F3EC] bg-white py-2.5 pl-10 pr-4 text-xs text-[#1B263B] placeholder-[#1B263B]/40 transition-colors focus:border-[#8CC63F] focus:outline-none focus:ring-1 focus:ring-[#8CC63F]"
          />
        </div>
      </div>

      {/* Grid of Blog Cards */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      ) : (
        <div className="mx-auto my-12 max-w-md rounded-2xl border border-[#E8F3EC] bg-white p-8 text-center">
          <Sparkles className="mx-auto mb-3 h-8 w-8 text-[#8CC63F]" />
          <h4 className="text-base font-bold text-[#1B263B]">No matching articles found</h4>
          <p className="mt-1 text-xs text-[#1B263B]/60">
            Try adjusting your search query or switching categories.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="mt-4 rounded-full bg-[#E8F3EC] px-4 py-1.5 text-xs font-semibold text-[#0B3B24] hover:bg-[#8CC63F]/20"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
