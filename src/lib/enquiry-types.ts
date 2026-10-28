export type EnquiryStatus = "New" | "Contacted" | "In Progress" | "Converted" | "Closed";

export type Enquiry = {
  id: string;
  created_at: string;
  business_name: string;
  business_type: string;
  service_needed: string[];
  budget_range: string;
  timeline: string;
  contact_name: string;
  phone: string;
  email: string;
  city: string;
  message: string;
  status: EnquiryStatus;
  internal_notes: string;
  source: string;
};

export const SERVICE_OPTIONS = [
  { id: "website", label: "Website" },
  { id: "webapp", label: "Web App / Dashboard" },
  { id: "mobileapp", label: "Mobile App" },
  { id: "booking", label: "Booking System" },
  { id: "leads", label: "Lead Forms" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "automation", label: "Automation / AI" },
  { id: "unsure", label: "Not Sure Yet" }
];

export const BUDGETS = ["₹3,000 – ₹6,000", "₹6,000 – ₹12,000", "₹10,000 – ₹25,000", "₹25,000+"];
export const TIMELINES = ["ASAP", "2–4 weeks", "1–2 months", "Just exploring"];
export const BUSINESS_TYPES = ["Restaurant", "Clinic", "Real Estate", "Coaching", "Retail", "Other"];

export function serviceLabel(id: string) {
  return SERVICE_OPTIONS.find((s) => s.id === id)?.label ?? id;
}
