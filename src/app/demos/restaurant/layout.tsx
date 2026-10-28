import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spice Route — Authentic Flavours of Nellore",
  description:
    "Spice Route is Nellore's home of slow-cooked Andhra biryanis, village-style chicken fries and dum-baked sweets. Reserve a table on Trunk Road or order on WhatsApp.",
};

export default function RestaurantLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: "#FFFFFF", color: "#1A1A1A" }}>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");
        html { scroll-behavior: smooth; scroll-padding-top: 88px; }
        #spice-route-demo ::selection { background: rgba(224,90,51,0.18); color: #1A1A1A; }
        #spice-route-demo ::-webkit-scrollbar { width: 10px; height: 8px; }
        #spice-route-demo ::-webkit-scrollbar-thumb { background: rgba(224,90,51,0.28); border-radius: 8px; }
        #spice-route-demo .sr-btn-primary { transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease; }
        #spice-route-demo .sr-btn-primary:hover { background: #C94A25 !important; box-shadow: 0 12px 28px rgba(224,90,51,0.28) !important; }
        #spice-route-demo .sr-btn-secondary { transition: border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease; }
        #spice-route-demo .sr-btn-secondary:hover { border-color: #E05A33 !important; color: #E05A33 !important; box-shadow: 0 12px 28px rgba(26,26,26,0.08) !important; }
        #spice-route-demo .sr-lift { transition: box-shadow 0.3s ease, transform 0.3s ease; }
        #spice-route-demo .sr-lift:hover { box-shadow: 0 12px 32px rgba(26,26,26,0.08) !important; }
      `}</style>
      <div id="spice-route-demo">{children}</div>
    </div>
  );
}
