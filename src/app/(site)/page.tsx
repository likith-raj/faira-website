"use client";
import Link from "next/link";
import { DEMOS, PRICING, SERVICES } from "@/lib/site";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* HERO */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 pt-20">
        <h1 className="text-4xl md:text-6xl font-light uppercase tracking-[0.2em] mb-6 max-w-4xl leading-tight">
          Your Local Business. <br />
          <span className="text-[#E05A33] font-normal">Built for the Digital World.</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mb-10">
          Websites, web apps, and mobile apps designed for Nellore businesses.
        </p>
        <div className="flex gap-4">
          <Link href="/quote" className="bg-[#E05A33] px-8 py-4 font-bold uppercase tracking-wider text-white rounded hover:bg-[#C94A25] transition">Get a Consultation</Link>
          <Link href="/demos" className="border border-white/30 px-8 py-4 font-bold uppercase tracking-wider text-white rounded hover:bg-white/10 transition">View Demos</Link>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 px-4 md:px-12 bg-black/40">
        <h2 className="text-2xl font-light uppercase tracking-[0.2em] text-center mb-12">Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {SERVICES.map((s) => (
            <div key={s.id} className="bg-white/5 border border-white/10 p-8 rounded-xl hover:border-[#E05A33]/50 transition">
              <h3 className="text-xl font-bold uppercase tracking-wider mb-3">{s.title}</h3>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DEMOS PREVIEW */}
      <section className="py-20 px-4 md:px-12">
        <h2 className="text-2xl font-light uppercase tracking-[0.2em] text-center mb-12">Recent Demos</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {DEMOS.slice(0, 4).map((d) => (
            <Link key={d.slug} href={`/demos/${d.slug}`} className="group">
              <div className="bg-white/5 border border-white/10 p-6 rounded-xl group-hover:border-[#E05A33] transition h-full">
                <h3 className="text-lg font-bold uppercase tracking-wider mb-2">{d.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{d.desc}</p>
                <span className="text-[#E05A33] text-sm font-bold uppercase flex items-center gap-1">View Demo <ArrowRight size={14} /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
