"use client";

import { Clock3, GraduationCap, Mail, MapPin, Phone } from "lucide-react";
import { BATCH_TIMINGS, CENTRE, COURSES, NAV_LINKS } from "../data";
import { scrollToSection } from "../utils";

export default function Footer() {
  return (
    <footer className="border-t border-[#EAEAEA] bg-[#F9F8F6] px-5 pb-8 pt-16 text-[#6B7280] md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr_0.85fr_1.1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#E05A33] to-[#C94A25] text-white">
                <GraduationCap className="h-6 w-6" strokeWidth={2.1} />
              </span>
              <span className="bp-font-display text-[17px] font-semibold text-[#1A1A1A]">
                BrightPath <span className="text-[#E05A33]">Academy</span>
              </span>
            </div>
            <p className="mt-4 text-[14px] leading-relaxed">
              EAMCET, NEET, JEE, bank exam and school-tuition coaching in Nellore since {CENTRE.since}. Bilingual
              teaching, small batches and a result board you can verify at the reception.
            </p>
            <ul className="mt-5 space-y-3 text-[14px]">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#E05A33]" strokeWidth={2.1} />
                <span>
                  {CENTRE.addressLine1}, {CENTRE.addressLine2}, {CENTRE.state}
                </span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#E05A33]" strokeWidth={2.1} />
                <span className="space-x-1.5">
                  <a href={`tel:${CENTRE.phoneHref}`} className="font-semibold text-[#1A1A1A] hover:text-[#E05A33]">
                    {CENTRE.phoneDisplay}
                  </a>
                  <span className="text-[#EAEAEA]">|</span>
                  <a href={`tel:${CENTRE.mobileHref}`} className="font-semibold text-[#1A1A1A] hover:text-[#E05A33]">
                    {CENTRE.mobileDisplay}
                  </a>
                </span>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#E05A33]" strokeWidth={2.1} />
                <a href={`mailto:${CENTRE.email}`} className="hover:text-[#E05A33] hover:underline">
                  {CENTRE.email}
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Footer sections">
            <h2 className="bp-font-display text-[14px] font-semibold uppercase tracking-[0.14em] text-[#1A1A1A]">Explore</h2>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(l.id)}
                    className="transition-colors hover:text-[#E05A33]"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("enquiry")}
                  className="bp-font-display font-semibold text-[#E05A33] hover:text-[#C94A25]"
                >
                  Admission enquiry →
                </button>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="bp-font-display text-[14px] font-semibold uppercase tracking-[0.14em] text-[#1A1A1A]">Courses</h2>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              {COURSES.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection("courses")}
                    className="text-left transition-colors hover:text-[#E05A33]"
                  >
                    {c.name.replace(/\s—.*$/, "")}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="bp-font-display flex items-center gap-2 text-[14px] font-semibold uppercase tracking-[0.14em] text-[#1A1A1A]">
              <Clock3 className="h-4 w-4 text-[#E05A33]" strokeWidth={2.2} /> Batch Timings
            </h2>
            <table className="mt-4 w-full border-collapse text-[14px]">
              <thead>
                <tr className="text-left text-[#6B7280]">
                  <th className="border-b border-[#EAEAEA] pb-2 font-semibold">Batch</th>
                  <th className="border-b border-[#EAEAEA] pb-2 font-semibold">Timing</th>
                  <th className="hidden border-b border-[#EAEAEA] pb-2 font-semibold sm:table-cell">Best for</th>
                </tr>
              </thead>
              <tbody>
                {BATCH_TIMINGS.map((b) => (
                  <tr key={b.batch} className="align-top">
                    <td className="bp-font-display border-b border-[#EAEAEA] py-2.5 pr-2 font-semibold text-[#1A1A1A]">
                      {b.batch}
                    </td>
                    <td className="border-b border-[#EAEAEA] py-2.5 pr-2 text-[#E05A33]">{b.time}</td>
                    <td className="hidden border-b border-[#EAEAEA] py-2.5 text-[#6B7280] sm:table-cell">{b.for}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-[12.5px] leading-relaxed text-[#6B7280]">
              Special Saturday batch for JEE Advanced problem lab, 9:00 AM – 1:00 PM.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[#EAEAEA] pt-6 text-[12.5px] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {CENTRE.name}, Stadium Road, Nellore. All rights reserved.</p>
          <p className="text-[#6B7280]">
            Sample website demo for a Nellore coaching centre — faculty, results and fees are illustrative.
          </p>
        </div>
      </div>
    </footer>
  );
}
