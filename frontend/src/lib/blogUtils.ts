/**
 * Blog utility functions for formatting dates, reading time, and categories
 */

export function formatBlogDate(dateString?: string): string {
  if (!dateString) return "Recent Dispatch";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Recent Dispatch";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  } catch {
    return "Recent Dispatch";
  }
}

export function calculateReadTime(content?: string): number {
  if (!content) return 1;
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function inferCategory(title: string = "", description: string = ""): string {
  const combined = `${title} ${description}`.toLowerCase();
  
  if (combined.includes("neon") || combined.includes("prisma") || combined.includes("nestjs") || combined.includes("backend") || combined.includes("code") || combined.includes("tech")) {
    return "Engineering & Cloud";
  }
  if (combined.includes("video") || combined.includes("camera") || combined.includes("canon") || combined.includes("production") || combined.includes("film")) {
    return "Cinema Production";
  }
  if (combined.includes("tiktok") || combined.includes("viral") || combined.includes("growth") || combined.includes("social") || combined.includes("views")) {
    return "Social Scaling";
  }
  if (combined.includes("healthcare") || combined.includes("clinical") || combined.includes("doctor")) {
    return "Clinical Authority";
  }
  if (combined.includes("brand") || combined.includes("strategy") || combined.includes("market")) {
    return "Creative Strategy";
  }
  return "Creative Insights";
}

export function truncateExcerpt(content: string = "", maxLength: number = 140): string {
  if (!content) return "";
  const cleaned = content.replace(/\s+/g, " ").trim();
  if (cleaned.length <= maxLength) return cleaned;
  return cleaned.slice(0, maxLength).trim() + "...";
}
