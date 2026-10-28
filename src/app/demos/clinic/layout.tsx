import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sunrise Multispeciality Clinic — Nellore",
  description:
    "Trusted family healthcare in Nellore. 8 specialties, experienced doctors, 24/7 emergency care and easy online appointment booking at Sunrise Multispeciality Clinic, Aurobindo Junction."
};

export default function ClinicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="clinic-root min-h-screen" style={{ backgroundColor: "#FFFFFF", color: "#1A1A1A" }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          .clinic-root { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
          .clinic-root .clinic-heading {
            font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.03em;
            font-weight: 600;
          }
          html { scroll-behavior: smooth; }
        `}
      </style>
      {children}
    </div>
  );
}
