import type { Metadata } from "next";
import FairaDemoBadge from "@/components/FairaDemoBadge";

export const metadata: Metadata = {
  title: "UrbanKart Store — Gadgets & Electronics, Nellore",
  description:
    "UrbanKart Store, Rajindra Market, Nellore. Smartphones, laptops, audio, wearables and home tech at unbeatable prices. Free delivery in Nellore above ₹999, GST bills, 7-day replacement and COD.",
};

export default function RetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");
        html { scroll-behavior: smooth; }
        .uk-root { font-family: "Inter", system-ui, -apple-system, sans-serif; }
        .uk-display { font-family: "Inter", system-ui, -apple-system, sans-serif; font-weight: 800; letter-spacing: 0.03em; text-transform: uppercase; }
      `}</style>
      <div className="uk-root">
        {children}
        <FairaDemoBadge />
      </div>
    </div>
  );
}
