export interface NavItem {
  id: string;
  name: string;
  href: string;
  badge?: string;
  isExternal?: boolean;
}

export interface MetricItem {
  id: string;
  value: string;
  label: string;
  sublabel?: string;
  icon?: string;
}

export interface BrandContact {
  primaryPhone: string;
  secondaryPhone: string;
  primaryPhoneTel: string;
  secondaryPhoneTel: string;
  email?: string;
  tiktokHandle: string;
  tiktokUrl: string;
  cities: string[];
  headquarters: string;
  websiteUrl: string;
}

export interface BrandStatus {
  acceptingNewClients: boolean;
  label: string;
  badgeText: string;
  cities: string;
}

export interface HeroCTA {
  label: string;
  href: string;
  isExternal?: boolean;
  isPhoneLink?: boolean;
}

export interface HeroContent {
  statusBadge: string;
  headlineLine1: string;
  headlineLine2: string;
  headlineHighlight: string;
  signatureHook: string;
  description: string;
  primaryCta: HeroCTA;
  secondaryCta: HeroCTA;
  metrics: MetricItem[];
}

export interface BrandLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
  badgeColor: string;
  stemColor: string;
}

export interface BrandPalette {
  canvasSurface: string;
  canvasEditorial: string;
  primaryDark: string;
  primaryDarkDeep: string;
  logoSlate: string;
  primaryAccent: string;
  accentGlow: string;
  secondaryPill: string;
}

export interface BrandProfile {
  name: string;
  legalName: string;
  domain: string;
  tagline: string;
  signatureHook: string;
  logo: BrandLogo;
  palette: BrandPalette;
  status: BrandStatus;
  contact: BrandContact;
  navigation: NavItem[];
  hero: HeroContent;
}
