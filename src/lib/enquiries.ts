import type { Enquiry } from "./enquiry-types";

const KEY = "faira_enquiries";

function readLocal(): Enquiry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function writeLocal(list: Enquiry[]) {
  window.localStorage.setItem(KEY, JSON.stringify(list));
}

export function supabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

async function getSupabase() {
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function saveEnquiry(input: Omit<Enquiry, "id" | "created_at" | "status" | "internal_notes" | "source"> & { source?: string }) {
  const record: Enquiry = {
    ...input,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    status: "New",
    internal_notes: "",
    source: input.source || "website"
  };
  if (supabaseConfigured()) {
    try {
      const sb = await getSupabase();
      const { error } = await sb.from("enquiries").insert(record);
      if (!error) return record;
    } catch {
      /* fall through to local mode */
    }
  }
  const list = readLocal();
  list.unshift(record);
  writeLocal(list);
  return record;
}

export async function listEnquiries(): Promise<Enquiry[]> {
  if (supabaseConfigured()) {
    try {
      const sb = await getSupabase();
      const { data, error } = await sb.from("enquiries").select("*").order("created_at", { ascending: false });
      if (!error && data) return data as Enquiry[];
    } catch {
      /* fall through */
    }
  }
  return seedIfEmpty(readLocal());
}

export async function updateEnquiry(id: string, patch: { status?: Enquiry["status"]; internal_notes?: string }) {
  if (supabaseConfigured()) {
    try {
      const sb = await getSupabase();
      await sb.from("enquiries").update(patch).eq("id", id);
    } catch {
      /* fall through */
    }
  }
  const list = readLocal().map((e) => (e.id === id ? { ...e, ...patch } : e));
  writeLocal(list);
}

function seedIfEmpty(list: Enquiry[]): Enquiry[] {
  if (list.length > 0) return list;
  const now = Date.now();
  type Row = [string, string, string[], string, string, string, string, string, string, string];
  const seedRows: Row[] = [
    ["Spice Route Restaurant", "Restaurant", ["website", "booking"], "₹1,500 – ₹6,000", "2–4 weeks", "Ramesh Reddy", "9849xxxxx12", "chef@spiceroute.in", "Nellore", "Need a menu website with online table reservation."],
    ["Sunrise Clinic", "Clinic", ["website", "leads"], "₹6,000 – ₹15,000", "1–2 months", "Dr. Lakshmi", "9849xxxxx34", "admin@sunriseclinic.in", "Nellore", "Appointment booking + patient enquiry forms."],
    ["UrbanKart", "Retail", ["website", "ecommerce"], "₹15,000+", "Just exploring", "Abdul Kareem", "9849xxxxx56", "orders@urbankart.in", "Nellore", "Online catalog with WhatsApp ordering."],
    ["BrightPath Academy", "Coaching", ["website", "leads"], "₹1,500 – ₹6,000", "ASAP", "Suresh Kumar", "9849xxxxx78", "brightpath@gmail.com", "Nellore", "Admission enquiry form and toppers page."],
    ["Nellore Homes", "Real Estate", ["webapp", "leads"], "₹15,000+", "1–2 months", "Vijay Properties", "9849xxxxx90", "info@nellorehomes.in", "Nellore", "Property listings dashboard with lead management."]
  ];
  const seed: Enquiry[] = seedRows.map((r, i) => ({
    id: `seed-${i}`,
    created_at: new Date(now - (i + 1) * 86400000 * 1.6).toISOString(),
    business_name: r[0],
    business_type: r[1],
    service_needed: r[2] as string[],
    budget_range: r[3],
    timeline: r[4],
    contact_name: r[5],
    phone: r[6],
    email: r[7],
    city: r[8],
    message: r[9],
    status: (["New", "Contacted", "In Progress", "Converted", "New"] as const)[i % 5],
    internal_notes: i === 1 ? "Called on Monday, wants demo before signing." : "",
    source: "website"
  }));
  writeLocal(seed);
  return seed;
}
