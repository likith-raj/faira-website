"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";

const FlowScene = dynamic(() => import("./StructureFlowScene"), { ssr: false });

export function NightBackdrop() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden" aria-hidden>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ y }}
        className="absolute inset-x-0 -top-[5%] h-[110%]"
      >
        <FlowScene />
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent via-transparent to-black/20" />
    </div>
  );
}
