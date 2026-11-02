import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileDock } from "@/components/MobileDock";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-20 pb-28">{children}</main>
      <Footer />
      <MobileDock />
    </div>
  );
}
