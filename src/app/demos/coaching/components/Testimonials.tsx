"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "../data";
import { Section, SectionHeading } from "./Section";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = rating >= n;
        const half = !filled && rating > n - 1;
        return (
          <span key={n} className="relative">
            <Star className={`h-4 w-4 ${filled || half ? "text-[#E05A33]" : "text-[#EAEAEA]"}`} strokeWidth={2} />
            {half && (
              <span className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
                <Star className="h-4 w-4 fill-[#E05A33] text-[#E05A33]" strokeWidth={2} />
              </span>
            )}
            {filled && <Star className="absolute inset-0 h-4 w-4 fill-[#E05A33] text-[#E05A33]" strokeWidth={2} />}
          </span>
        );
      })}
      <span className="bp-font-display ml-1 text-[12.5px] font-bold text-[#6B7280]">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function Testimonials() {
  return (
    <Section id="testimonials" tone="light">
      <SectionHeading
        eyebrow="Parent & Student Reviews"
        title={
          <>
            What families around Nellore <span className="text-[#E05A33]">say about us</span>
          </>
        }
        subtitle="Collected from our 2024–25 parent-feedback forms and Google reviews of the Stadium Road centre."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.09 }}
            className="bp-card flex h-full flex-col rounded-[24px] border border-[#EAEAEA] bg-white p-6"
          >
            <Quote className="h-7 w-7 text-[#E05A33]/20" strokeWidth={2} />
            <Stars rating={t.rating} />
            <blockquote className="mt-3 flex-1 text-[14.5px] leading-relaxed text-[#6B7280]">“{t.quote}”</blockquote>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-[#EAEAEA] pt-4">
              <span className="bp-font-display grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#E05A33] to-[#C94A25] text-[14px] font-bold text-white">
                {t.initials}
              </span>
              <span>
                <p className="bp-font-display text-[14.5px] font-bold text-[#1A1A1A]">{t.name}</p>
                <p className="text-[12.5px] text-[#6B7280]">{t.role}</p>
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}
