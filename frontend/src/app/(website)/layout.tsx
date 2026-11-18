
import Navbar from "@/components/website/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col flex-1 bg-white text-[#1B263B]">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}