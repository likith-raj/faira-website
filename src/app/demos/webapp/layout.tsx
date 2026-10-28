import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAIRA ClientDesk — Custom Web App Demo",
  description:
    "An interactive custom web app demo by FAIRA: dashboards, client CRM, enquiry tracking and reports for Indian businesses in and around Nellore.",
};

export default function WebAppDemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600;700&display=swap');
        .cd-display {
          font-family: 'Inter', system-ui, sans-serif;
          text-transform: uppercase;
          font-weight: 800;
          letter-spacing: 0.03em;
        }
        .cd-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; font-variant-numeric: tabular-nums; }
        .cd-font { font-family: 'Inter', system-ui, sans-serif; }
        .cd-panel {
          background: #FFFFFF;
          border: 1px solid #EAEAEA;
          box-shadow: 0 1px 3px rgba(26, 26, 26, 0.05);
          transition: box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .cd-panel:hover {
          box-shadow: 0 12px 32px rgba(26, 26, 26, 0.08);
        }
        .cd-grid-bg {
          background-image:
            linear-gradient(#EAEAEA 1px, transparent 1px),
            linear-gradient(90deg, #EAEAEA 1px, transparent 1px);
          background-size: 34px 34px;
          background-color: #F9F8F6;
        }
        .cd-page-bg { background: #FFFFFF; }
      `}</style>
      <div className="cd-font cd-page-bg">{children}</div>
    </div>
  );
}
