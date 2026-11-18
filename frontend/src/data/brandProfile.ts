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
    { id: "nav-portfolio", name: "Portfolio", href: "/portfolio" },
    { id: "nav-partnership", name: "Partnership", href: "/partnership" },
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
  about: {
    sectionBadge: "Who We Are",
    headline: "hi, we're nana.",
    body: "Nana Creative is a dynamic, industry-leading agency built to make brands impossible to ignore. Driven by three visionary co-founders and a dedicated production team, we fuse market research, cinema-grade video production, high-retention post-production and data-driven social media scaling into one relentless growth engine - headquartered in Dire Dawa, expanding into Addis Ababa.",
    tags: [
      {
        id: "tag-founders",
        label: "Three co-founders",
        icon: "users",
      },
      {
        id: "tag-diredawa",
        label: "Dire Dawa, Ethiopia",
        icon: "map-pin",
      },
      {
        id: "tag-addis",
        label: "Expanding into Addis Ababa",
        icon: "trending-up",
      },
      {
        id: "tag-languages",
        label: "Languages: English, Amharic, Afaan Oromoo",
        icon: "languages",
      },
    ],
  },
  services: {
    sectionBadge: "Core Disciplines",
    headline: "01 to 04 Capabilities",
    subheadline:
      "End-to-end creative, production, and paid growth systems engineered for commercial momentum.",
    services: [
      {
        id: "srv-01",
        number: "01",
        title: "Digital Marketing",
        description:
          "Strategy, content calendars, full page management and community growth.",
        icon: "share-2",
        focusAreas: [
          "Strategy",
          "Content calendars",
          "Full page management",
          "Community growth",
        ],
      },
      {
        id: "srv-02",
        number: "02",
        title: "Commercial Video Production",
        description:
          "Short-form viral hooks, brand commercials, scriptwriting, talent setup, and set direction.",
        icon: "video",
        focusAreas: [
          "Short-form viral hooks",
          "Brand commercials",
          "Scriptwriting",
          "Talent setup & set direction",
        ],
      },
      {
        id: "srv-03",
        number: "03",
        title: "Performance Paid Advertising",
        description:
          "Targeted Meta and TikTok ad campaigns built for ROI and lead generation.",
        icon: "target",
        focusAreas: [
          "Targeted Meta ad campaigns",
          "TikTok ad campaigns",
          "Built for ROI",
          "Lead generation funnels",
        ],
      },
      {
        id: "srv-04",
        number: "04",
        title: "Creative Strategy & Market Research",
        description:
          "Competitor analysis, audience profiling and conversion-focused frameworks.",
        icon: "compass",
        focusAreas: [
          "Competitor analysis",
          "Audience profiling",
          "Conversion-focused frameworks",
          "Brand positioning",
        ],
      },
    ],
  },
  gear: {
    sectionBadge: "Production Spec-Sheet",
    headline: "Cinema-Grade Gear",
    subheadline:
      "Minimalist spec-sheet of our core capture, stabilization, lighting, and wireless audio inventory.",
    items: [
      {
        id: "gear-camera",
        category: "Camera",
        name: "Canon R6",
        spec: "Full-Frame 4K Cinema Capture • Dual Pixel CMOS AF II • High Dynamic Range",
        icon: "camera",
        badge: "Cinema Capture",
      },
      {
        id: "gear-gimbals",
        category: "Gimbals",
        name: "DJI RS 3 & RS 4",
        spec: "3-Axis Motor Stabilization • Automated Axis Locks • Native Vertical Short-Form Framing",
        icon: "sliders",
        badge: "Fluid Stability",
      },
      {
        id: "gear-lighting",
        category: "Studio Lighting",
        name: "Amaran 300c / Nanlite",
        spec: "Full-Color RGBWW Point-Source Fixtures • High Color Accuracy 95+ CRI • Bowens Mount Modifiers",
        icon: "sun-medium",
        badge: "Studio Illumination",
      },
      {
        id: "gear-audio",
        category: "Wireless Audio",
        name: "Hollyland Lark M2",
        spec: "48kHz / 24-bit Hi-Fi Audio Transmission • Environmental Noise Cancellation (ENC) • Ultra-lightweight",
        icon: "mic",
        badge: "Hi-Fi Sound",
      },
    ],
  },
  portfolio: {
    sectionBadge: "Client Portfolio",
    headline: "Brands Impossible to Ignore",
    subheadline:
      "Collaborating with commercial enterprises, specialized clinical leaders, and rapid-growth innovators across Ethiopia.",
    categories: [
      {
        id: "cat-major",
        title: "Major / Enterprise",
        description:
          "Leading commercial enterprises and established multi-sector market leaders.",
        isSpecialAuthority: false,
        badgeText: "Enterprise Portfolio",
        clients: [
          {
            id: "cl-free-spring",
            name: "Free Spring Water",
            industry: "Beverage & FMCG",
          },
          {
            id: "cl-wabi",
            name: "Wabi Business Group",
            industry: "Conglomerate & Trade",
          },
          {
            id: "cl-rg-family",
            name: "RG & Family Real Estate",
            industry: "Real Estate Development",
          },
          {
            id: "cl-shumbro",
            name: "Shumbro Plastic Factory",
            industry: "Industrial Manufacturing",
          },
          {
            id: "cl-b-capital",
            name: "B Capital Hotel",
            industry: "Hospitality & Tourism",
          },
          {
            id: "cl-kuku",
            name: "Kuku Chicken",
            industry: "Fast Food Franchise",
          },
        ],
      },
      {
        id: "cat-healthcare",
        title: "Healthcare & Medical Authority",
        description:
          "Specialized clinical and aesthetic institutions requiring high-trust credibility, precision compliance, and dedicated medical authority.",
        isSpecialAuthority: true,
        badgeText: "Specialized Authority",
        clients: [
          {
            id: "cl-kefelegn",
            name: "Dr. Kefelegn Dental Clinic",
            industry: "Advanced Clinical Dentistry & Surgery",
            badge: "Clinical Authority",
          },
          {
            id: "cl-bright-aesthetics",
            name: "Bright Aesthetics",
            industry: "Medical Aesthetics & Dermatology",
            badge: "Aesthetic Medicine",
          },
        ],
      },
      {
        id: "cat-fast-growing",
        title: "Fast-Growing Brands",
        description:
          "High-momentum consumer, beauty, and culinary brands aggressively expanding audience and retail footprint.",
        isSpecialAuthority: false,
        badgeText: "Fast-Growing",
        clients: [
          {
            id: "cl-mekdi",
            name: "Mekdi Perfume",
            industry: "Luxury Perfumes & Scents",
          },
          {
            id: "cl-raki",
            name: "Raki Cosmetics",
            industry: "Cosmetics & Skincare",
          },
          {
            id: "cl-delight-burger",
            name: "Delight Burger",
            industry: "Culinary & Dining",
          },
        ],
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

export function getAboutContentSync() {
  return brandProfileSeed.about;
}

export function getServicesContentSync() {
  return brandProfileSeed.services;
}

export function getGearContentSync() {
  return brandProfileSeed.gear;
}

export function getPortfolioContentSync() {
  return brandProfileSeed.portfolio;
}
