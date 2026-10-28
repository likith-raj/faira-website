"use client";

import { motion } from "framer-motion";
import Counter from "./Counter";
import { STATS } from "../data";

export default function Stats() {
  return (
    <section className="bg-[#F9F8F6] px-5 md:px-8">
      <div className="mx-auto -mt-2 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-[#E05A33] to-[#C94A25] px-6 py-9 shadow-[0_40px_60px_-32px_rgba(201,74,37,0.55)] md:px-10"
        >
          <div aria-hidden className="absolute -right-10 -top-16 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
          <div aria-hidden className="absolute -bottom-20 left-1/3 h-44 w-44 rounded-full bg-white/15 blur-2xl" />

          <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative lg:pr-6"
              >
                <p className="bp-font-display text-[40px] font-extrabold leading-none text-white md:text-[46px]">
                  <Counter to={s.value} suffix={s.suffix} duration={1.6 + i * 0.15} />
                </p>
                <p className="bp-font-display mt-2 text-[15px] font-semibold text-[#FFE4D6]">{s.label}</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-[#FFD6BC]">{s.hint}</p>
                {i < STATS.length - 1 && (
                  <span aria-hidden className="absolute -right-4 top-1 hidden h-16 w-px bg-white/20 lg:block" />
                )}
              </motion.div>
            ))}
          </div>

          <p className="relative mt-9 border-t border-white/15 pt-5 text-[14px] text-[#FFE4D6]">
            Numbers from the 2024–25 academic cycle at our Stadium Road centre. Verified against board and
            exam-cell results.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
