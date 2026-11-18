"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Sparkles } from "lucide-react";
import { BlogPost } from "@/types/api.types";
import { formatBlogDate, calculateReadTime, inferCategory, truncateExcerpt } from "@/lib/blogUtils";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const [imageError, setImageError] = useState(false);
  const category = inferCategory(post.title, post.description);
  const formattedDate = formatBlogDate(post.createdAt);
  const readTime = calculateReadTime(post.description);
  const excerpt = truncateExcerpt(post.description, 140);
  
  // Prefer signedImageUrl if available, otherwise direct imageUrl
  const imageUrl = post.signedImageUrl || post.imageUrl;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#E8F3EC] bg-white shadow-sm transition-all duration-300 hover:border-[#8CC63F]/40 hover:shadow-xl hover:shadow-[#0B3B24]/5"
    >
      {/* Top Image Container */}
      <Link href={`/blog/${post.id}`} className="relative block aspect-[16/10] w-full overflow-hidden bg-[#F7F9F8]">
        {imageUrl && !imageError ? (
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#0B3B24] to-[#082A19] p-6 text-center text-white">
            <div className="relative mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
              <Sparkles className="h-6 w-6 text-[#8CC63F]" />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#8CC63F]">
              Nana Creative Dispatch
            </span>
          </div>
        )}

        {/* Subtle Image Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </Link>

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {/* Soft Mint Category Pill & Metadata */}
        <div className="mb-3.5 flex items-center justify-between gap-2">
          {/* Soft Mint Category Pill (#E8F3EC) */}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F3EC] px-3 py-1 text-xs font-bold text-[#0B3B24] transition-colors group-hover:bg-[#dcf0e3]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8CC63F]" />
            {category}
          </span>

          <div className="flex items-center gap-2 text-[11px] font-medium text-[#1B263B]/60">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3 text-[#1B263B]/40" />
              {formattedDate}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3 text-[#1B263B]/40" />
              {readTime}m read
            </span>
          </div>
        </div>

        {/* Bold Midnight Navy Title (#1B263B) */}
        <h3 className="mb-2.5 text-xl font-extrabold tracking-tight text-[#1B263B] transition-colors duration-200 group-hover:text-[#0B3B24] line-clamp-2">
          <Link href={`/blog/${post.id}`} className="focus:outline-none">
            {post.title}
          </Link>
        </h3>

        {/* Short Excerpt */}
        <p className="mb-6 text-sm leading-relaxed text-[#1B263B]/70 line-clamp-3">
          {excerpt}
        </p>

        {/* High-Contrast Read More CTA with Sprout Lime Arrow */}
        <div className="mt-auto pt-4 border-t border-[#E8F3EC]">
          <Link
            href={`/blog/${post.id}`}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-wide text-[#0B3B24] transition-all duration-200 group-hover:text-[#082A19] group-hover:translate-x-1"
          >
            <span>Read More</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#8CC63F] transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
