"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";

const TowerScene = dynamic(() => import("./JapaneseTowerScene"), { ssr: false });

export function NightBackdrop() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden" aria-hidden>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ y, filter: "brightness(1.15) saturate(1.1)" }}
        className="absolute inset-x-0 -top-[5%] h-[110%]"
      >
        <TowerScene />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-black/30" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
    </div>
  );
}
