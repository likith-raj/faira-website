import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nellore Homes & Lands — Premium Real Estate",
  description:
    "RERA-registered plots, luxury apartments, villas and commercial spaces in Nellore. Palla Thotta, Link Road, Trunk Road, Darnasi & ONGC Road.",
};

export default function RealEstateDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] antialiased">
      {/* eslint-disable-next-line react/no-danger -- Google Fonts import for this demo only */}
      <style
        dangerouslySetInnerHTML={{
          __html: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');`,
        }}
      />
      {children}
    </div>
  );
}
