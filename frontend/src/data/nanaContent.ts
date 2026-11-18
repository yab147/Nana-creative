export interface NanaAboutTag {
  id: string;
  label: string;
  icon: "users" | "map-pin" | "trending-up" | "languages" | "sparkles";
}

export interface NanaAboutData {
  badge: string;
  sectionBadge?: string;
  image: string;
  imageAlt: string;
  headline: string;
  body: string;
  tags: NanaAboutTag[];
}

export interface NanaServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: "share-2" | "video" | "target" | "compass";
  deliverables: string[];
}

export interface NanaServicesData {
  badge: string;
  sectionBadge?: string;
  headline: string;
  subheadline: string;
  services: NanaServiceItem[];
}

export interface NanaGearItem {
  id?: string;
  tag: string;
  name: string;
  description: string;
  image: string;
  category?: string;
  specification?: string;
  icon?: "camera" | "sliders" | "sun-medium" | "mic";
  roleBadge?: string;
}

export interface NanaGearData {
  badge: string;
  sectionBadge?: string;
  headline: string;
  subheadline: string;
  items: NanaGearItem[];
}

export interface SuccessStoryItem {
  id: string;
  name: string;
  industry: string;
  tier: "Enterprise" | "Healthcare" | "Fast-Growing";
  logoPath: string;
  tiktokUrl: string;
  description?: string;
  category?: string;
  isHealthcare?: boolean;
  badge?: string;
}

export interface NanaAnalyticsViewMetric {
  id: string;
  views: string;
  title: string;
  tag: string;
}

export interface NanaAnalyticsData {
  badge: string;
  headline: string;
  subheadline: string;
  overview: {
    following: string;
    followers: string;
    likes: string;
  };
  viewsBreakdown: NanaAnalyticsViewMetric[];
  techSpec: string;
  tiktokHandle: string;
  tiktokUrl: string;
}

export interface NanaContactData {
  badge: string;
  hook: string;
  subhook: string;
  phone: string;
  phoneTel: string;
  secondaryPhone: string;
  secondaryPhoneTel: string;
  social: string;
  socialUrl: string;
  locations: string;
  cities: string[];
  headquarters: string;
  email: string;
  availability: string;
}

export interface NanaPartnershipData {
  badge: string;
  headline: string;
  subheadline: string;
  stats: { value: string; label: string }[];
}

export interface NanaNavigationItem {
  id: string;
  name: string;
  href: string;
  badge?: string;
}

// =========================================================================
// CENTRAL DATA SEEDS (ZERO HARDCODED CONTENT)
// =========================================================================

// A. About Data
export const nanaAboutContent: NanaAboutData = {
  badge: "About Nana Creative",
  sectionBadge: "About Nana Creative",
  image: "/images/image_5d569c.png",
  imageAlt: "Nana Creative Co-Founders",
  headline: "hi, we're nana.",
  body: "Nana Creative is a dynamic, industry-leading agency built to make brands impossible to ignore. Driven by three visionary co-founders and a dedicated production team, we fuse market research, cinema-grade video production, high-retention post-production and data-driven social media scaling into one relentless growth engine - headquartered in Dire Dawa, expanding into Addis Ababa.",
  tags: [
    {
      id: "about-tag-1",
      label: "Three co-founders",
      icon: "users",
    },
    {
      id: "about-tag-2",
      label: "Dire Dawa, Ethiopia",
      icon: "map-pin",
    },
    {
      id: "about-tag-3",
      label: "Expanding into Addis Ababa",
      icon: "trending-up",
    },
    {
      id: "about-tag-4",
      label: "Languages: English, Amharic, Afaan Oromoo",
      icon: "languages",
    },
  ],
};

// B. Services Data
export const nanaServicesContent: NanaServicesData = {
  badge: "01 to 04 Core Disciplines",
  sectionBadge: "01 to 04 Core Disciplines",
  headline: "Services & Capabilities",
  subheadline:
    "Integrated creative, production, and paid growth systems engineered for commercial momentum.",
  services: [
    {
      id: "service-01",
      number: "01",
      title: "Digital Marketing",
      description:
        "Strategy, content calendars, full page management and community growth.",
      icon: "share-2",
      deliverables: [
        "Strategy",
        "Content calendars",
        "Full page management",
        "Community growth",
      ],
    },
    {
      id: "service-02",
      number: "02",
      title: "Commercial Video Production",
      description:
        "Short-form viral hooks, brand commercials, scriptwriting, talent and modeling setup.",
      icon: "video",
      deliverables: [
        "Short-form viral hooks",
        "Brand commercials",
        "Scriptwriting",
        "Talent and modeling setup",
      ],
    },
    {
      id: "service-03",
      number: "03",
      title: "Performance Paid Advertising",
      description:
        "Targeted Meta and TikTok ad campaigns built for ROI.",
      icon: "target",
      deliverables: [
        "Targeted Meta campaigns",
        "TikTok ad campaigns",
        "Built for ROI",
        "Conversion optimization",
      ],
    },
    {
      id: "service-04",
      number: "04",
      title: "Creative Strategy & Market Research",
      description:
        "Competitor analysis, audience profiling.",
      icon: "compass",
      deliverables: [
        "Competitor analysis",
        "Audience profiling",
        "Market mapping",
        "Conversion architecture",
      ],
    },
  ],
};

// C. Success Stories / Client Data (SHARED by Portfolio & Partnership)
// C. Success Stories / Client Data (Master List in Portfolio)
export const successStories: SuccessStoryItem[] = [
  {
    id: "story-free-spring",
    name: "Free Spring Water",
    category: "Beverage",
    industry: "Beverage & FMCG",
    tier: "Enterprise",
    description:
      "Pioneering natural mineral water bottling, distribution, and large-scale commercial campaigns across Ethiopia.",
    logoPath: "/images/portfolio/free-spring.jpg",
    tiktokUrl: "https://www.tiktok.com/@nana_creatives",
    isHealthcare: false,
  },
  {
    id: "story-wabi",
    name: "Wabi Business Group",
    category: "Business Group",
    industry: "Conglomerate & Trade",
    tier: "Enterprise",
    description:
      "Multi-sector investment conglomerate driving international trade, industrial operations, and enterprise expansion.",
    logoPath: "/images/portfolio/wabi-group.png",
    tiktokUrl: "https://www.tiktok.com/@nana_creatives",
    isHealthcare: false,
  },
  {
    id: "story-rg-family",
    name: "RG & Family Real Estate",
    category: "Real Estate",
    industry: "Real Estate Development",
    tier: "Enterprise",
    description:
      "Luxury residential developments and modern architectural living spaces in prime metropolitan centers.",
    logoPath: "/images/portfolio/rg-family.png",
    tiktokUrl: "https://www.tiktok.com/@nana_creatives",
    isHealthcare: false,
  },
  {
    id: "story-shumbro",
    name: "Shumbro Plastic Factory",
    category: "Manufacturing",
    industry: "Industrial Manufacturing",
    tier: "Enterprise",
    description:
      "Industrial manufacturing delivering high-grade polymers, consumer packaging, and heavy production supplies.",
    logoPath: "/images/portfolio/shumbro.jpeg",
    tiktokUrl: "https://www.tiktok.com/@nana_creatives",
    isHealthcare: false,
  },
  {
    id: "story-b-capital",
    name: "B Capital Hotel",
    category: "Hospitality",
    industry: "Hospitality & Tourism",
    tier: "Enterprise",
    description:
      "Premier luxury hospitality and boutique business lodging offering world-class guest experiences.",
    logoPath: "/images/portfolio/b-capital.jpeg",
    tiktokUrl: "https://www.tiktok.com/@nana_creatives",
    isHealthcare: false,
  },
  {
    id: "story-kuku",
    name: "Kuku Chicken",
    category: "Food",
    industry: "Fast Food Franchise",
    tier: "Enterprise",
    description:
      "High-energy fast-food franchise scaling rapidly with viral short-form social hooks and community-driven promotions.",
    logoPath: "/images/portfolio/kuku-chicken.jpg",
    tiktokUrl: "https://www.tiktok.com/@nana_creatives",
    isHealthcare: false,
  },
  {
    id: "story-dr-kefelegn",
    name: "Dr. KeFelegn Dental Clinic",
    category: "Healthcare",
    industry: "Advanced Clinical Dentistry",
    tier: "Healthcare",
    description:
      "Specialized clinical dental surgery and oral healthcare center positioned with authoritative medical credibility.",
    logoPath: "/images/portfolio/dr-kefelegn.jpg",
    tiktokUrl: "https://www.tiktok.com/@nana_creatives",
    isHealthcare: true,
    badge: "Clinical Authority",
  },
  {
    id: "story-bright-aesthetics",
    name: "Bright Aesthetics",
    category: "Aesthetics",
    industry: "Medical Aesthetics & Dermatology",
    tier: "Healthcare",
    description:
      "Medical aesthetics and precision dermatology clinic delivering verified clinical skin transformations.",
    logoPath: "/images/portfolio/bright-aesthetics.jpeg",
    tiktokUrl: "https://www.tiktok.com/@nana_creatives",
    isHealthcare: true,
    badge: "Medical Aesthetic Authority",
  },
  {
    id: "story-mekdi",
    name: "Mekdi Perfume",
    category: "Perfume",
    industry: "Luxury Perfumes & Scents",
    tier: "Fast-Growing",
    description:
      "High-end luxury fragrance and curated perfumery house experiencing exponential audience momentum.",
    logoPath: "/images/portfolio/mekdi-perfume.jpeg",
    tiktokUrl: "https://www.tiktok.com/@nana_creatives",
    isHealthcare: false,
  },
  {
    id: "story-raki",
    name: "Raki Cosmetics",
    category: "Cosmetics",
    industry: "Cosmetics & Skincare",
    tier: "Fast-Growing",
    description:
      "Modern skincare and color cosmetics brand commanding viral social engagement and retail distribution.",
    logoPath: "/images/portfolio/raki-cosmetics.jpg",
    tiktokUrl: "https://www.tiktok.com/@nana_creatives",
    isHealthcare: false,
  },
  {
    id: "story-delight-burger",
    name: "Delight Burger",
    category: "Food",
    industry: "Culinary & Dining",
    tier: "Fast-Growing",
    description:
      "Artisanal gourmet burger concept scaling fast with high-retention food showcase videos.",
    logoPath: "/images/portfolio/delight-burger.png",
    tiktokUrl: "https://www.tiktok.com/@nana_creatives",
    isHealthcare: false,
  },
];

// D. Production Gear Data
export const nanaGearContent: NanaGearData = {
  badge: "Production Spec-Sheet",
  sectionBadge: "Production Spec-Sheet",
  headline: "Production Gear",
  subheadline:
    "Cinema-grade capture, motion stabilization, studio lighting, and wireless audio inventory.",
  items: [
    {
      id: "gear-canon-r6",
      tag: "CAMERA",
      name: "Canon R6",
      description:
        "Cinema-grade imaging with sharp low-light performance for commercials and social content.",
      image: "/images/gear-canon.jpg",
      category: "Camera",
      specification:
        "Full-Frame 4K Cinema Capture • Dual Pixel CMOS AF II • High Dynamic Range C-Log3",
      icon: "camera",
      roleBadge: "Cinema Capture",
    },
    {
      id: "gear-dji-rs",
      tag: "GIMBALS",
      name: "DJI RS 3 & RS 4",
      description:
        "Dynamic camera movement — tracking, orbit and reveal shots that keep viewers watching.",
      image: "/images/gear-dji.jpg",
      category: "Gimbals",
      specification:
        "3-Axis Professional Stabilization • Automated Axis Locks • Native Vertical Short-Form Framing",
      icon: "sliders",
      roleBadge: "Dynamic Movement",
    },
    {
      id: "gear-amaran-300c",
      tag: "STUDIO LIGHTING",
      name: "Amaran 300c / Nanlite",
      description:
        "Studio lighting with full control of mood, skin tones and product looks on every set.",
      image: "/images/gear-amaran.jpg",
      category: "Studio Lighting",
      specification:
        "Full-Color RGBWW Point-Source Fixtures • High Color Accuracy 95+ CRI • Bowens Mount Modifiers",
      icon: "sun-medium",
      roleBadge: "High-Output Illumination",
    },
    {
      id: "gear-hollyland-lark",
      tag: "WIRELESS AUDIO",
      name: "Hollyland Lark M2",
      description:
        "Clean wireless audio for talent, interviews and on-location shoots — no cable clutter.",
      image: "/images/gear-hollyland.jpg",
      category: "Wireless Audio",
      specification:
        "48kHz / 24-bit Hi-Fi Audio Transmission • Environmental Noise Cancellation (ENC) • Studio-Grade Clarity",
      icon: "mic",
      roleBadge: "Hi-Fi Wireless Audio",
    },
  ],
};

// E. Analytics Data
export const nanaAnalyticsContent: NanaAnalyticsData = {
  badge: "Social Performance",
  headline: "Data-Driven Social Scaling",
  subheadline:
    "Real-time social growth and high-retention video metrics from our active channels.",
  overview: {
    following: "49",
    followers: "2,252",
    likes: "52K",
  },
  viewsBreakdown: [
    { id: "v-1", views: "3,107", title: "Commercial Brand Spot", tag: "Brand Hook" },
    { id: "v-2", views: "2,329", title: "Product Launch Reel", tag: "Product Demo" },
    { id: "v-3", views: "7,798", title: "Clinical Authority Feature", tag: "Healthcare" },
    { id: "v-4", views: "5,778", title: "Hospitality Showcase", tag: "Tourism" },
    { id: "v-5", views: "8,188", title: "Lifestyle Narrative Short", tag: "Viral Format" },
    { id: "v-6", views: "29K", title: "Flagship Viral Campaign", tag: "High-Retention" },
  ],
  techSpec: "Shot on Canon R6",
  tiktokHandle: "@nana_creatives",
  tiktokUrl: "https://www.tiktok.com/@nana_creatives",
};

// Contact Data
export const nanaContactContent: NanaContactData = {
  badge: "Direct Contact",
  hook: "ready to out-build your competition.",
  subhook:
    "Let's build an aggressive, high-retention creative and marketing engine for your brand.",
  phone: "0947982260",
  phoneTel: "+251947982260",
  secondaryPhone: "0938158972",
  secondaryPhoneTel: "+251938158972",
  social: "@nana_creatives",
  socialUrl: "https://www.tiktok.com/@nana_creatives",
  locations: "Dire Dawa | Addis Ababa, Ethiopia",
  cities: ["Dire Dawa", "Addis Ababa"],
  headquarters: "Dire Dawa & Addis Ababa, Ethiopia",
  email: "hello@nanacreatives.et",
  availability: "Accepting new clients — Dire Dawa & Addis Ababa",
};

// Partnership Data
export const nanaPartnershipContent: NanaPartnershipData = {
  badge: "Strategic Network",
  headline: "Growing Together Across Ethiopia",
  subheadline:
    "Our partnerships connect ideas, organizations, and commercial opportunities across Dire Dawa and Addis Ababa.",
  stats: [
    { value: "20+", label: "Strategic Partners" },
    { value: "02", label: "Regional Hubs" },
    { value: "100%", label: "In-House Production" },
  ],
};

// Navigation
export const nanaNavigationItems: NanaNavigationItem[] = [
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
];
