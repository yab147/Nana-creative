import Navbar from "@/components/website/Navbar";
import Hero from "@/components/website/Hero";
import Stats from "@/components/website/Stats";
import PartnersMap from "@/components/website/PartnersMap";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-white">
      <Navbar />
      <Hero />
      <Stats />
      <PartnersMap />
    </main>
  );
}