"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { NightBackdrop } from "@/components/NightBackdrop";
import { CustomCursor } from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-[#0A0A0A] text-white font-sans antialiased overflow-x-hidden min-h-screen flex flex-col">
        <NightBackdrop />
        <CustomCursor />
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
