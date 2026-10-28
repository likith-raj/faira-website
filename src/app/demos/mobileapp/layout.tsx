import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QuickServe — Mobile App Demo by FAIRA",
  description:
    "An interactive demo of QuickServe — a fictional home-services booking app — built as a mobile app showcase by FAIRA, the digital agency in Nellore, Andhra Pradesh.",
};

export default function MobileAppDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-[#1A1A1A]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .qs-root { font-family: 'Inter', system-ui, sans-serif; }
        .qs-heading {
          font-family: 'Inter', system-ui, sans-serif;
          font-weight: 800;
          letter-spacing: 0.03em;
        }

        .qs-gradient-bg { background-image: linear-gradient(120deg, #E05A33 0%, #D14E28 100%); }
        .qs-gradient-text { color: #E05A33; }
        .qs-gradient-border {
          background: #FFFFFF;
          border: 1px solid #EAEAEA;
        }

        .qs-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        .qs-scroll::-webkit-scrollbar { display: none; }
      `}</style>
      <div className="qs-root">{children}</div>
    </div>
  );
}
