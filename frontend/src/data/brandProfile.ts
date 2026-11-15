import { BrandProfile } from "@/types/brand";

export const brandProfileSeed: BrandProfile = {
  name: "Nana Creative",
  legalName: "Nana Creative®",
  domain: "nanacreatives.et",
  tagline: "We grow ideas that grow businesses.",
  signatureHook: "Your competitors believe in God too.",
  logo: {
    src: "/images/logo.png",
    alt: "Nana Creative® Official Badge Logo",
    width: 140,
    height: 140,
    badgeColor: "#1B263B",
    stemColor: "#8CC63F",
  },
  palette: {
    canvasSurface: "#FFFFFF",
    canvasEditorial: "#F7F9F8",
    primaryDark: "#0B3B24",
    primaryDarkDeep: "#082A19",
    logoSlate: "#1B263B",
    primaryAccent: "#8CC63F",
    accentGlow: "#99D12B",
    secondaryPill: "#E8F3EC",
  },
  status: {
    acceptingNewClients: true,
    label: "Accepting new clients — Dire Dawa & Addis Ababa",
    badgeText: "Live in Dire Dawa & Addis",
    cities: "Dire Dawa & Addis Ababa",
  },
  contact: {
    primaryPhone: "0947982260",
    secondaryPhone: "0938158972",
    primaryPhoneTel: "+251947982260",
    secondaryPhoneTel: "+251938158972",
    email: "hello@nanacreatives.et",
    tiktokHandle: "@nana_creatives",
    tiktokUrl: "https://www.tiktok.com/@nana_creatives",
    cities: ["Dire Dawa", "Addis Ababa"],
    headquarters: "Dire Dawa & Addis Ababa, Ethiopia",
    websiteUrl: "https://nanacreatives.et",
  },
  navigation: [
    { id: "nav-home", name: "Home", href: "/" },
    { id: "nav-about", name: "About", href: "/about" },
    { id: "nav-services", name: "Services", href: "/services" },
    { id: "nav-partnerships", name: "Partnerships", href: "/partnerships" },
    {
      id: "nav-analytics",
      name: "Analytics",
      href: "/analytics",
      badge: "TikTok Live",
    },
    { id: "nav-blog", name: "Blog", href: "/blog" },
    { id: "nav-contact", name: "Contact", href: "/contact" },
  ],
  hero: {
    statusBadge: "Accepting new clients — Dire Dawa & Addis Ababa",
    headlineLine1: "We grow ideas",
    headlineLine2: "that grow",
    headlineHighlight: "businesses.",
    signatureHook: "Your competitors believe in God too.",
    description:
      "Nana Creative blends high-impact brand strategy, cinematic media production, and digital growth systems to scale modern businesses across Ethiopia.",
    primaryCta: {
      label: "Let's Work Together",
      href: "/contact",
    },
    secondaryCta: {
      label: "Watch Showreel",
      href: "#showreel",
    },
    metrics: [
      {
        id: "metric-clients",
        value: "20+",
        label: "Clients Served",
        sublabel: "Across private & enterprise sectors",
        icon: "sprout",
      },
      {
        id: "metric-cities",
        value: "02",
        label: "Ethiopian Hubs",
        sublabel: "Dire Dawa & Addis Ababa",
        icon: "map-pin",
      },
      {
        id: "metric-services",
        value: "04",
        label: "Core Disciplines",
        sublabel: "Strategy, Production, Tech & Ads",
        icon: "layers",
      },
    ],
  },
};

/**
 * Service getter ready to connect to CMS (Sanity, Strapi, Supabase, or Contentful)
 * Falls back to local seed data.
 */
export async function getBrandProfile(): Promise<BrandProfile> {
  // In future steps, replace with CMS client: await cmsClient.fetch(...)
  return brandProfileSeed;
}

/**
 * Synchronous accessor for client components or initial state
 */
export function getBrandProfileSync(): BrandProfile {
  return brandProfileSeed;
}
