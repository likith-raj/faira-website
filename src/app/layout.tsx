import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NightBackdrop } from "@/components/NightBackdrop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "FAIRA — Your local business. Built for the digital world.",
    template: "%s · FAIRA"
  },
  description:
    "FAIRA is a digital agency in Nellore, Andhra Pradesh. We build websites, custom web apps and dashboards, mobile apps, and AI automation for local businesses.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "FAIRA — Digital agency in Nellore",
    description: "Websites, web apps, mobile apps and AI automation for local businesses.",
    type: "website",
    locale: "en_IN"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-[#0A0A0A] font-sans text-white antialiased">
        <NightBackdrop />
        <div className="relative z-10 flex min-h-screen flex-col">{children}</div>
      </body>
    </html>
  );
}
