import type { Metadata } from "next";
import { SectionWrapper } from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Legal",
  description: "Privacy policy, terms of service and refund policy for FAIRA, Nellore."
};

const SECTIONS = [
  {
    t: "Privacy Policy",
    p: [
      `FAIRA ("we", "us") collects the information you submit through enquiry and contact forms on this website — your name, phone, email, city and message — solely to respond to your enquiry and provide our services.`,
      "We do not sell or share your personal information with third parties for marketing. Enquiry data is stored securely and retained only as long as needed for business follow-up. You may request deletion any time by writing to " +
        SITE.email +
        "."
    ]
  },
  {
    t: "Terms of Service",
    p: [
      "All project engagements are governed by a written proposal/scope document agreed before work begins. Timeline commitments assume timely feedback and content/assets from the client.",
      "Domain names, hosting accounts and third-party subscriptions (SMS, payment gateways, etc.) are purchased in the client's name and billed at actuals. On project completion, ownership of the delivered code, designs and content transfers to the client, except pre-existing reusable libraries and tools."
    ]
  },
  {
    t: "Refunds & Cancellations",
    p: [
      "Before work starts: full refund of any advance. Once design/development has begun, refunds are pro-rated against completed milestones as stated in your proposal.",
      "Support plans can be cancelled with 15 days' notice."
    ]
  },
  {
    t: "Content & Liability",
    p: [
      "Clients are responsible for the accuracy and legality of the content (text, images, product info) they provide. We do not host illegal content and may suspend projects that violate applicable law.",
      "Sample business names, prices and testimonials shown on this site and in /demos are illustrative demo content created by FAIRA."
    ]
  }
];

export default function LegalPage() {
  return (
    <SectionWrapper eyebrow="Legal" title="Terms, privacy & the fine print" subtitle="Plain-language version — because nobody reads legalese.">
      <div className="max-w-3xl space-y-8">
        {SECTIONS.map((s) => (
          <section key={s.t}>
            <h2 className="font-display text-xl font-bold text-accent">{s.t}</h2>
            {s.p.map((para, i) => (
              <p key={i} className="mt-3 text-sm leading-relaxed text-ink-dim">
                {para}
              </p>
            ))}
          </section>
        ))}
        <p className="mono-label pt-4">Last updated: October 2026 · {SITE.city}</p>
      </div>
    </SectionWrapper>
  );
}
