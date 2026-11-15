import Navbar from "@/components/website/Navbar";
import Hero from "@/components/website/Hero";
import PartnersMap from "@/components/website/PartnersMap";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-white">
      <Navbar />
      <Hero />
      <PartnersMap />
    </main>
  );
}