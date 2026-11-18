import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import apiClient from "@/services/apiClient";
import ShareButton from "@/components/blog/ShareButton";
import { formatBlogDate, calculateReadTime, inferCategory } from "@/lib/blogUtils";
import { ArrowLeft, Calendar, Clock, Sparkles, User, Tag, ArrowRight } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const post = await apiClient.blog.getPostById(id);
    const imageUrl = post.signedImageUrl || post.imageUrl;

    return {
      title: `${post.title} • Nana Creative Blog`,
      description: post.description.slice(0, 160),
      openGraph: {
        title: post.title,
        description: post.description.slice(0, 160),
        type: "article",
        publishedTime: post.createdAt,
        images: imageUrl ? [{ url: imageUrl }] : [],
      },
    };
  } catch {
    return {
      title: "Article Not Found • Nana Creative",
      description: "The requested blog dispatch could not be found.",
    };
  }
}

export async function generateStaticParams() {
  try {
    const posts = await apiClient.blog.getAllPosts();
    return posts.map((post) => ({
      id: post.id,
    }));
  } catch {
    return [];
  }
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { id } = await params;

  let post;
  try {
    post = await apiClient.blog.getPostById(id);
  } catch (error) {
    console.error(`[BlogDetailPage] Failed to load post ${id}:`, error);
    notFound();
  }

  if (!post) {
    notFound();
  }

  const category = inferCategory(post.title, post.description);
  const formattedDate = formatBlogDate(post.createdAt);
  const readTime = calculateReadTime(post.description);
  const imageUrl = post.signedImageUrl || post.imageUrl;

  // Split description paragraphs for clean editorial typography
  const paragraphs = post.description
    .split(/\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return (
    <article className="min-h-screen bg-white">
      {/* Top Editorial Breadcrumbs & Back Navigation */}
      <section className="border-b border-[#E8F3EC] bg-[#F7F9F8] py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 rounded-full border border-[#E8F3EC] bg-white px-4 py-2 text-xs font-semibold text-[#0B3B24] transition-all hover:border-[#8CC63F] hover:bg-[#F7F9F8]"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-[#8CC63F] transition-transform group-hover:-translate-x-1" />
              <span>Back to Dispatches</span>
            </Link>

            <ShareButton title={post.title} />
          </div>
        </div>
      </section>

      {/* Editorial Header Section (Center-aligned title) */}
      <header className="pt-12 sm:pt-16 pb-8 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          {/* Soft Mint Category Pill (#E8F3EC) */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#E8F3EC] px-4 py-1.5 text-xs font-bold text-[#0B3B24]">
            <span className="h-2 w-2 rounded-full bg-[#8CC63F]" />
            <span>{category}</span>
          </div>

          {/* Center-aligned bold Midnight Navy (#1B263B) Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#1B263B] leading-[1.15]">
            {post.title}
          </h1>

          {/* Author & Editorial Metadata Row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-[#1B263B]/70 font-medium">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0B3B24] text-white">
                <User className="h-3 w-3 text-[#8CC63F]" />
              </div>
              <span className="font-semibold text-[#0B3B24]">Nana Creative Editorial</span>
            </div>

            <span className="text-[#1B263B]/30">•</span>

            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-[#1B263B]/50" />
              <time dateTime={post.createdAt}>{formattedDate}</time>
            </div>

            <span className="text-[#1B263B]/30">•</span>

            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#1B263B]/50" />
              <span>{readTime} min read</span>
            </div>
          </div>
        </div>

        {/* Large Cover Image with Rounded Corners */}
        <div className="mx-auto mt-10 max-w-5xl px-4 sm:px-6">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-[#E8F3EC] bg-[#F7F9F8] shadow-2xl shadow-[#0B3B24]/5">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#0B3B24] to-[#082A19] p-12 text-center text-white">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
                  <Sparkles className="h-8 w-8 text-[#8CC63F]" />
                </div>
                <h3 className="text-xl font-bold text-white">{post.title}</h3>
                <span className="mt-2 text-xs font-mono uppercase tracking-widest text-[#8CC63F]">
                  Nana Creative Media &amp; Storytelling
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Reading Content Layout (Clean, Readable Typography Scale) */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="prose prose-lg prose-emerald max-w-none space-y-6">
            {paragraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className={
                  idx === 0
                    ? "text-xl sm:text-2xl font-light leading-relaxed text-[#1B263B] border-l-4 border-[#8CC63F] pl-5 py-1"
                    : "text-base sm:text-lg leading-relaxed text-[#1B263B]/85 font-normal"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags & Metadata Footer */}
          <div className="mt-14 pt-8 border-t border-[#E8F3EC] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-[#0B3B24]" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#1B263B]/60">Tags:</span>
              <span className="rounded-full bg-[#F7F9F8] border border-[#E8F3EC] px-3 py-1 text-xs font-semibold text-[#0B3B24]">
                {category}
              </span>
              <span className="rounded-full bg-[#F7F9F8] border border-[#E8F3EC] px-3 py-1 text-xs font-semibold text-[#0B3B24]">
                Nana Creative
              </span>
            </div>

            <ShareButton title={post.title} />
          </div>

          {/* Author Byline Card */}
          <div className="mt-12 rounded-2xl border border-[#E8F3EC] bg-[#F7F9F8] p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-[#0B3B24]/10 shrink-0 bg-[#0B3B24] flex items-center justify-center text-white font-bold text-lg">
              <Image
                src="/images/logo.png"
                alt="Nana Creative"
                width={56}
                height={56}
                className="object-cover"
              />
            </div>
            <div className="text-center sm:text-left flex-1">
              <h4 className="text-base font-bold text-[#1B263B]">Nana Creative Editorial Desk</h4>
              <p className="mt-1 text-xs sm:text-sm text-[#1B263B]/70 leading-relaxed font-light">
                Published by Nana Creative&apos;s directorship. We fuse research, cinema-grade video, and data-driven digital scaling for brands across Dire Dawa and Addis Ababa.
              </p>
            </div>
          </div>

          {/* Bottom Conversion CTA */}
          <div className="mt-16 rounded-3xl bg-[#0B3B24] p-8 sm:p-10 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#8CC63F_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
            <div className="relative z-10 max-w-xl mx-auto">
              <span className="inline-block rounded-full bg-[#8CC63F]/20 px-3 py-1 text-xs font-bold text-[#8CC63F] mb-3">
                Let&apos;s Collaborate
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Ready to build an aggressive growth engine?
              </h3>
              <p className="mt-3 text-sm text-[#E8F3EC]/80 leading-relaxed">
                Connect directly with our creative team to produce high-retention video assets and strategic brand positioning.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[#8CC63F] px-6 py-3 text-xs font-bold text-[#082A19] shadow-lg transition-all hover:bg-[#99D12B] hover:-translate-y-0.5"
                >
                  <span>Start a Conversation</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-xs font-semibold text-white transition-all hover:bg-white/10"
                >
                  <span>Browse More Articles</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
