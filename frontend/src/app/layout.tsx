import type { Metadata } from "next";
import "./globals.css";
import { brandProfileSeed } from "@/data/brandProfile";

export const metadata: Metadata = {
  title: `${brandProfileSeed.legalName} — ${brandProfileSeed.tagline}`,
  description: `${brandProfileSeed.hero.signatureHook} ${brandProfileSeed.hero.description}`,
  icons: {
    icon: brandProfileSeed.logo.src,
  },
  openGraph: {
    title: brandProfileSeed.legalName,
    description: `${brandProfileSeed.tagline} — ${brandProfileSeed.hero.signatureHook}`,
    url: brandProfileSeed.contact.websiteUrl,
    siteName: brandProfileSeed.legalName,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-white text-[#082A19] antialiased">
        {children}
      </body>
    </html>
  );
}