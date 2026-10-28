"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, ChevronDown, Clock3, MapPin, PhoneCall, Send } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { CENTRE, CLASS_OPTIONS, COURSES } from "../data";
import { isValidIndianMobile } from "../utils";
import { Reveal, Section, SectionHeading } from "./Section";
import { useBrightPathToast } from "./Toast";

type Field = "student" | "phone" | "klass" | "course" | "message";
type Values = Record<Field, string>;

const EMPTY: Values = { student: "", phone: "", klass: "", course: "", message: "" };
const COURSE_OPTIONS = [...COURSES.map((c) => c.name), "Not sure yet — please suggest a course"];

const STEPS = [
  { title: "You submit the form", body: "Takes under a minute. No payment, no obligation." },
  { title: "Counsellor calls within 24 hrs", body: "We ask about marks, target exam and the batch that fits." },
  { title: "Free 3-day class trial", body: "Attend any batch for three working days before you pay." }
];

export default function EnquiryForm({ prefillCourse }: { prefillCourse: string }) {
  const { push } = useBrightPathToast();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [sending, setSending] = useState(false);
  const [pulseCourse, setPulseCourse] = useState(false);
  const courseRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (!prefillCourse) return;
    setValues((v) => ({ ...v, course: prefillCourse }));
    setErrors((e) => ({ ...e, course: undefined }));
    setPulseCourse(true);
    const t = window.setTimeout(() => setPulseCourse(false), 2200);
    return () => window.clearTimeout(t);
  }, [prefillCourse]);

  const validate = (v: Values): Partial<Record<Field, string>> => {
    const e: Partial<Record<Field, string>> = {};
    const name = v.student.trim();
    if (!name) e.student = "Please enter the student's name.";
    else if (name.length < 3) e.student = "Name looks too short.";
    else if (!/^[A-Za-z][A-Za-z\s.]*$/.test(name)) e.student = "Use letters only (e.g. G. Sai Rohit).";

    const phone = v.phone.trim();
    if (!phone) e.phone = "Parent phone number is required.";
    else if (!isValidIndianMobile(phone)) e.phone = "Enter a valid 10-digit Indian mobile number.";

    if (!v.klass) e.klass = "Select the class or exam target.";
    if (!v.course) e.course = "Select a course — or choose “suggest a course”.";
    if (v.message.trim().length > 400) e.message = "Please keep the message under 400 characters.";
    return e;
  };

  const set = (field: Field) => (value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field]) setErrors(validate(next));
  };

  const blur = (field: Field) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(values));
  };

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const e = validate(values);
    setErrors(e);
    setTouched({ student: true, phone: true, klass: true, course: true, message: true });

    const firstError = (Object.keys(e) as Field[]).find((k) => Boolean(e[k]));
    if (firstError) {
      push("Please fix the highlighted fields", "A couple of details are missing — check the form and resend.", "info");
      document.getElementById(`enq-${firstError}`)?.focus();
      return;
    }

    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      push(
        "Enquiry received — we will call you!",
        `Thank you ${values.student.trim().split(" ")[0]}. Our Stadium Road counsellor will ring ${values.phone.trim()} within 24 hours about ${values.course}.`,
        "success"
      );
      setValues(EMPTY);
      setTouched({});
      setErrors({});
    }, 850);
  };

  const fieldClass = (field: Field, extra = "") =>
    `w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-[#1A1A1A] outline-none transition-all placeholder:text-[#6B7280] focus:ring-4 ${
      errors[field] && touched[field]
        ? "border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/10"
        : "border-[#EAEAEA] focus:border-[#E05A33] focus:ring-[#E05A33]/10"
    } ${extra}`;

  const errorText = (field: Field) =>
    errors[field] && touched[field] ? (
      <p className="mt-1.5 flex items-center gap-1.5 text-[12.5px] font-medium text-[#DC2626]">
        <AlertCircle className="h-3.5 w-3.5" strokeWidth={2.4} />
        {errors[field]}
      </p>
    ) : null;

  return (
    <Section id="enquiry" tone="white">
      <SectionHeading
        eyebrow="Admission Enquiry"
        title={
          <>
            Book a <span className="text-[#E05A33]">free counselling</span> slot for 2026–27 batches
          </>
        }
        subtitle="Fill the form and our counsellor calls you within 24 hours with batch timings, fee slab and a three-day trial pass."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <div className="h-full rounded-[26px] bg-gradient-to-br from-[#E05A33] via-[#D2542F] to-[#C94A25] p-7 text-white shadow-[0_34px_60px_-34px_rgba(201,74,37,0.55)]">
            <h3 className="bp-font-display text-[20px] font-bold text-white">BrightPath Academy, Nellore</h3>
            <div className="mt-5 space-y-4 text-[14.5px] leading-relaxed text-[#FFE4D6]">
              <p className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#FDEBDD]" strokeWidth={2.1} />
                <span>
                  {CENTRE.addressLine1}
                  <br />
                  {CENTRE.addressLine2}, {CENTRE.state}
                </span>
              </p>
              <p className="flex gap-3">
                <PhoneCall className="mt-0.5 h-5 w-5 shrink-0 text-[#FDEBDD]" strokeWidth={2.1} />
                <span className="space-x-1">
                  <a href={`tel:${CENTRE.phoneHref}`} className="font-semibold text-white hover:underline">
                    {CENTRE.phoneDisplay}
                  </a>
                  <span>·</span>
                  <a href={`tel:${CENTRE.mobileHref}`} className="font-semibold text-white hover:underline">
                    {CENTRE.mobileDisplay}
                  </a>
                </span>
              </p>
              <p className="flex gap-3">
                <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-[#FDEBDD]" strokeWidth={2.1} />
                <span>
                  Counselling hours: Mon – Sat, 9:00 AM – 8:00 PM
                  <br />
                  Sunday closed (test evaluation day)
                </span>
              </p>
            </div>

            <div className="mt-7 border-t border-white/20 pt-6">
              <p className="bp-font-display text-[14px] font-bold uppercase tracking-[0.12em] text-[#FFD6BC]">
                What happens next
              </p>
              <ol className="mt-4 space-y-4">
                {STEPS.map((s, i) => (
                  <li key={s.title} className="flex gap-3">
                    <span className="bp-font-display grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-[14px] font-bold text-[#E05A33]">
                      {i + 1}
                    </span>
                    <span>
                      <p className="bp-font-display text-[14.5px] font-semibold text-white">{s.title}</p>
                      <p className="text-[14px] leading-relaxed text-[#FFD6BC]">{s.body}</p>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form noValidate onSubmit={onSubmit} className="rounded-[26px] border border-[#EAEAEA] bg-[#F9F8F6] p-6 md:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="enq-student" className="bp-font-display mb-2 block text-[14px] font-semibold text-[#1A1A1A]">
                  Student name <span className="text-[#DC2626]">*</span>
                </label>
                <input
                  id="enq-student"
                  type="text"
                  value={values.student}
                  onChange={(e) => set("student")(e.target.value)}
                  onBlur={blur("student")}
                  placeholder="e.g. G. Sai Rohit"
                  className={fieldClass("student")}
                  autoComplete="name"
                />
                {errorText("student")}
              </div>

              <div>
                <label htmlFor="enq-phone" className="bp-font-display mb-2 block text-[14px] font-semibold text-[#1A1A1A]">
                  Parent mobile number <span className="text-[#DC2626]">*</span>
                </label>
                <input
                  id="enq-phone"
                  type="tel"
                  inputMode="numeric"
                  value={values.phone}
                  onChange={(e) => set("phone")(e.target.value.slice(0, 15))}
                  onBlur={blur("phone")}
                  placeholder="10-digit number, e.g. 98490 12345"
                  className={fieldClass("phone")}
                  autoComplete="tel-national"
                />
                {errorText("phone")}
              </div>

              <div>
                <label htmlFor="enq-klass" className="bp-font-display mb-2 block text-[14px] font-semibold text-[#1A1A1A]">
                  Class / exam target <span className="text-[#DC2626]">*</span>
                </label>
                <div className="relative">
                  <select
                    id="enq-klass"
                    value={values.klass}
                    onChange={(e) => set("klass")(e.target.value)}
                    onBlur={blur("klass")}
                    className={fieldClass("klass", "appearance-none pr-11")}
                  >
                    <option value="">Select class or exam</option>
                    {CLASS_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]"
                    strokeWidth={2.2}
                  />
                </div>
                {errorText("klass")}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="enq-course" className="bp-font-display mb-2 block text-[14px] font-semibold text-[#1A1A1A]">
                  Course of interest <span className="text-[#DC2626]">*</span>
                  <AnimatePresence>
                    {pulseCourse && (
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="ml-2 inline-flex items-center gap-1 rounded-full bg-[#FDEBDD] px-2.5 py-0.5 text-[11.5px] font-bold text-[#C94A25]"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.6} />
                        filled from your course selection
                      </motion.span>
                    )}
                  </AnimatePresence>
                </label>
                <div className="relative">
                  <select
                    id="enq-course"
                    ref={courseRef}
                    value={values.course}
                    onChange={(e) => set("course")(e.target.value)}
                    onBlur={blur("course")}
                    className={fieldClass(
                      "course",
                      `appearance-none pr-11 ${pulseCourse ? "border-[#E05A33] ring-4 ring-[#E05A33]/15" : ""}`
                    )}
                  >
                    <option value="">Select a course</option>
                    {COURSE_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]"
                    strokeWidth={2.2}
                  />
                </div>
                {errorText("course")}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="enq-message" className="bp-font-display mb-2 block text-[14px] font-semibold text-[#1A1A1A]">
                  Message <span className="font-normal text-[#6B7280]">(optional)</span>
                </label>
                <textarea
                  id="enq-message"
                  rows={4}
                  value={values.message}
                  onChange={(e) => set("message")(e.target.value)}
                  onBlur={blur("message")}
                  placeholder="School, board of studies, preferred batch timing, or anything we should know."
                  className={fieldClass("message", "resize-none")}
                />
                <div className="mt-1.5 flex items-center justify-between">
                  {errorText("message")}
                  <span className="ml-auto text-[12px] text-[#6B7280]">{values.message.trim().length}/400</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-dashed border-[#EAEAEA] pt-5">
              <button
                type="submit"
                disabled={sending}
                className="bp-font-display inline-flex items-center gap-2 rounded-full bg-[#E05A33] px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_18px_32px_-16px_rgba(224,90,51,0.95)] transition-all hover:-translate-y-0.5 hover:bg-[#C94A25] disabled:pointer-events-none disabled:opacity-60"
              >
                <Send className="h-4 w-4" strokeWidth={2.4} />
                {sending ? "Sending enquiry…" : "Submit Enquiry"}
              </button>
              <p className="text-[12.5px] leading-relaxed text-[#6B7280]">
                Or call the centre directly:{" "}
                <a href={`tel:${CENTRE.mobileHref}`} className="bp-font-display font-semibold text-[#E05A33] hover:underline">
                  {CENTRE.mobileDisplay}
                </a>
              </p>
            </div>
            <p className="mt-4 text-[12px] leading-relaxed text-[#6B7280]">
              By submitting you agree to be contacted about admissions. We never share your number with third parties.
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
