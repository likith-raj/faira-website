"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { GALLERY, img } from "./data";
import { C, SectionHeading, sans } from "./ui";

export default function Gallery() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const close = useCallback(() => setOpenIdx(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setOpenIdx((i) => (i === null ? i : (i + dir + GALLERY.length) % GALLERY.length)),
    []
  );

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIdx, close, step]);

  const current = openIdx !== null ? GALLERY[openIdx] : null;

  return (
    <section id="gallery" style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px 20px" }}>
      <SectionHeading
        eyebrow="From the pass"
        title={
          <>
            A table worth <span style={{ color: C.accent }}>photographing</span>
          </>
        }
        lede="Nine frames from a week at Spice Route. Tap any photo to see it full screen."
      />

      <div
        style={{
          marginTop: 48,
          columnGap: 18,
          columnCount: 1,
        }}
        className="sr-masonry"
      >
        {GALLERY.map((p, i) => (
          <motion.button
            key={p.imageId}
            type="button"
            onClick={() => setOpenIdx(i)}
            aria-label={`Open photo: ${p.caption}`}
            className="sr-break sr-lift"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.21, 0.6, 0.35, 1] }}
            whileHover={{ y: -4 }}
            style={{
              position: "relative",
              display: "block",
              width: "100%",
              marginBottom: 18,
              padding: 0,
              border: `1px solid ${C.line}`,
              borderRadius: 16,
              overflow: "hidden",
              cursor: "pointer",
              background: C.bg,
              boxShadow: "0 1px 3px rgba(26,26,26,0.05)",
            }}
          >
            <span style={{ display: "block", position: "relative", aspectRatio: p.ratio }}>
              <Image
                src={img(p.imageId, 800)}
                alt={p.alt}
                fill
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 370px"
                style={{ objectFit: "cover", transition: "transform 0.6s ease" }}
              />
            </span>
            <span
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                padding: "34px 16px 14px",
                textAlign: "left",
                background: "linear-gradient(to top, rgba(255,255,255,0.96), rgba(255,255,255,0.6) 55%, transparent)",
                ...sans,
                fontSize: 13,
                fontWeight: 500,
                color: C.ink,
              }}
            >
              {p.caption}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {current ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              background: "rgba(26,26,26,0.85)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "72px 16px 96px",
            }}
          >
            <motion.figure
              key={current.imageId}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.21, 0.6, 0.35, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                margin: 0,
                maxWidth: 980,
                width: "100%",
                maxHeight: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  flex: 1,
                  minHeight: 0,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={img(current.imageId, 1600)}
                  alt={current.alt}
                  width={1200}
                  height={800}
                  style={{
                    objectFit: "contain",
                    maxHeight: "72vh",
                    width: "auto",
                    maxWidth: "100%",
                    borderRadius: 12,
                  }}
                />
              </div>
              <figcaption
                style={{
                  ...sans,
                  marginTop: 18,
                  fontSize: 14,
                  color: "rgba(255,255,255,0.85)",
                  textAlign: "center",
                }}
              >
                {current.caption}
                <span style={{ display: "block", marginTop: 4, fontSize: 12.5, color: "rgba(255,255,255,0.6)" }}>
                  {openIdx! + 1} / {GALLERY.length}
                </span>
              </figcaption>
            </motion.figure>

            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="sr-lb-btn"
              style={{ position: "absolute", top: 18, right: 18 }}
            >
              <X size={20} />
            </button>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="sr-lb-btn"
              style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="sr-lb-btn"
              style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)" }}
            >
              <ChevronRight size={22} />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <style>{`
        @media (min-width: 640px) { .sr-masonry { column-count: 2 !important; } }
        @media (min-width: 1024px) { .sr-masonry { column-count: 3 !important; } }
        .sr-break { break-inside: avoid; }
        .sr-lb-btn {
          display: grid; place-items: center;
          width: 44px; height: 44px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.28);
          background: rgba(26,26,26,0.45);
          color: #FFFFFF; cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .sr-lb-btn:hover { background: rgba(224,90,51,0.85); }
      `}</style>
    </section>
  );
}
