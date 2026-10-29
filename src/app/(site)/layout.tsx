import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NightBackdrop } from "@/components/NightBackdrop";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#0A0A0A]">
      <NightBackdrop />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-24 pb-32">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}