import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BrightPath Academy — Coaching Centre, Nellore",
  description:
    "EAMCET, NEET, JEE, bank exam and school tuition coaching on Stadium Road, Nellore. 500+ distinctions, 24 expert faculty, daily doubt-clearing and weekly mock tests.",
  openGraph: {
    title: "BrightPath Academy — Coaching Centre, Nellore",
    description:
      "Bilingual (Telugu / English) coaching for EAMCET, NEET, JEE, bank exams and school tuitions. Admissions open — book a free counselling session.",
    type: "website",
    locale: "en_IN"
  }
};

/** Demo-only font loading + helper utilities (Inter everywhere — FAIRA light corporate palette). */
const THEME_CSS = `
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

.bp-font-body { font-family: "Inter", ui-sans-serif, system-ui, sans-serif; }
.bp-font-display { font-family: "Inter", ui-sans-serif, system-ui, sans-serif; }
/* FAIRA corporate headings: UPPERCASE, 0.03em tracking, weight 600, ink #1A1A1A. */
h1, h2, h3, h4, h5 {
  text-transform: uppercase;
  letter-spacing: 0.03em;
  font-weight: 600 !important;
  color: #1A1A1A;
}
::selection { background: rgba(224, 90, 51, 0.18); color: #C94A25; }
.bp-card { transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
.bp-card:hover { transform: translateY(-4px); box-shadow: 0 18px 40px -18px rgba(26, 26, 26, 0.14); }
.bp-underline { position: relative; }
.bp-underline::after {
  content: ""; position: absolute; left: 0; bottom: -6px; height: 2px; width: 0;
  background: #E05A33; transition: width .25s ease;
}
.bp-underline:hover::after { width: 100%; }
.bp-grid-bg {
  background-image: linear-gradient(rgba(224, 90, 51, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(224, 90, 51, 0.05) 1px, transparent 1px);
  background-size: 36px 36px;
}
`;

export default function CoachingDemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bp-font-body min-h-screen bg-white text-[#6B7280] antialiased">
      <style dangerouslySetInnerHTML={{ __html: THEME_CSS }} />
      {children}
    </div>
  );
}
