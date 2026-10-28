// Mock data for the FAIRA ClientDesk demo — all names, numbers and amounts are illustrative.

export type EnquiryStatus = "New" | "Contacted" | "In Progress" | "Converted";

export interface Enquiry {
  id: string;
  business: string;
  contact: string;
  phone: string;
  city: string;
  service: string;
  source: "WhatsApp" | "Instagram" | "Google" | "Referral" | "Walk-in";
  amount: number; // INR
  status: EnquiryStatus;
  date: string; // display date
}

export interface Client {
  id: string;
  business: string;
  owner: string;
  type: "Restaurant" | "Clinic" | "Retail" | "Coaching" | "Other";
  city: string;
  phone: string;
  openProjects: number;
  lastContact: string;
  since: string;
}

export const STATUS_STYLES: Record<EnquiryStatus, { bg: string; color: string; dot: string }> = {
  New: { bg: "rgba(224,90,51,0.10)", color: "#C94A25", dot: "#E05A33" },
  Contacted: { bg: "rgba(180,83,9,0.10)", color: "#B45309", dot: "#B45309" },
  "In Progress": { bg: "rgba(217,119,6,0.10)", color: "#B45309", dot: "#D97706" },
  Converted: { bg: "rgba(22,163,74,0.10)", color: "#16A34A", dot: "#16A34A" },
};

export const CLIENT_TYPE_COLORS: Record<Client["type"], string> = {
  Restaurant: "#E05A33",
  Clinic: "#D97706",
  Retail: "#16A34A",
  Coaching: "#B45309",
  Other: "#A1A1AA",
};

export const CLIENTS: Client[] = [
  { id: "C-101", business: "Annapurna Mess", owner: "K. Sudhakar", type: "Restaurant", city: "Nellore", phone: "+91 98491 22340", openProjects: 2, lastContact: "24 Oct 2026", since: "Mar 2025" },
  { id: "C-102", business: "Sai Multi-Speciality Clinic", owner: "Dr. P. Lakshmi Devi", type: "Clinic", city: "Nellore", phone: "+91 94407 88125", openProjects: 1, lastContact: "22 Oct 2026", since: "Jan 2025" },
  { id: "C-103", business: "Nellore Silk House", owner: "B. Venkata Reddy", type: "Retail", city: "Sultan Bazaar, Nellore", phone: "+91 90000 45671", openProjects: 3, lastContact: "25 Oct 2026", since: "Aug 2024" },
  { id: "C-104", business: "Vidya Coaching Academy", owner: "T. Suresh Babu", type: "Coaching", city: "Guru Naidu Street, Nellore", phone: "+91 98851 30247", openProjects: 1, lastContact: "19 Oct 2026", since: "Jun 2025" },
  { id: "C-105", business: "Spice Garden Family Restaurant", owner: "M. Ananda", type: "Restaurant", city: "Trunk Road, Nellore", phone: "+91 97012 63384", openProjects: 2, lastContact: "21 Oct 2026", since: "Feb 2026" },
  { id: "C-106", business: "Little Stars Children's Clinic", owner: "Dr. R. Shailaja", type: "Clinic", city: "Ongole", phone: "+91 91008 77219", openProjects: 0, lastContact: "15 Oct 2026", since: "Nov 2024" },
  { id: "C-107", business: "Kavali Mobile Point", owner: "S. Imran Khan", type: "Retail", city: "Kavali", phone: "+91 93923 10568", openProjects: 1, lastContact: "23 Oct 2026", since: "Apr 2026" },
  { id: "C-108", business: "Spark Innovations (Interior Works)", owner: "G. Naresh Kumar", type: "Other", city: "Tirupati", phone: "+91 95421 90037", openProjects: 2, lastContact: "18 Oct 2026", since: "Jul 2025" },
  { id: "C-109", business: "Bharath Driving & IT Training", owner: "D. Krishna Murthy", type: "Coaching", city: "Markapur", phone: "+91 99632 41870", openProjects: 1, lastContact: "20 Oct 2026", since: "Sep 2025" },
  { id: "C-110", business: "Adya Bakery & Cafe", owner: "V. Swapna", type: "Restaurant", city: "Repalle", phone: "+91 90520 18346", openProjects: 1, lastContact: "26 Oct 2026", since: "May 2026" },
];

export const ENQUIRIES: Enquiry[] = [
  { id: "E-2041", business: "Chirala Fish Curry House", contact: "A. Raghu", phone: "+91 98760 11234", city: "Chirala", service: "Table booking + billing dashboard", source: "WhatsApp", amount: 24500, status: "New", date: "26 Oct 2026" },
  { id: "E-2040", business: "Ortho Life Clinic", contact: "Dr. S. Prasad", phone: "+91 94410 29876", city: "Nellore", service: "Patient appointment portal", source: "Google", amount: 32000, status: "New", date: "26 Oct 2026" },
  { id: "E-2038", business: "Tirumala Tiffins", contact: "K. Bhaskar", phone: "+91 90154 77620", city: "Tirupati", service: "Online ordering web app", source: "Referral", amount: 28900, status: "Contacted", date: "25 Oct 2026" },
  { id: "E-2036", business: "Green Leaf Mart", contact: "P. Anji Reddy", phone: "+91 98488 31205", city: "Nellore", service: "Stock & billing inventory system", source: "Instagram", amount: 41200, status: "Contacted", date: "24 Oct 2026" },
  { id: "E-2033", business: "Rank Up IIT Coaching", contact: "G. Suseela", phone: "+91 99591 60473", city: "Nellore", service: "Batch scheduling + fee tracker", source: "WhatsApp", amount: 36750, status: "In Progress", date: "22 Oct 2026" },
  { id: "E-2031", business: "Sri Balaji Sarees", contact: "M. Parvathi", phone: "+91 93944 25108", city: "Ongole", service: "Catalogue + billing dashboard", source: "Walk-in", amount: 22400, status: "In Progress", date: "21 Oct 2026" },
  { id: "E-2029", business: "Dental Smiles Studio", contact: "Dr. N. Teja", phone: "+91 97045 88312", city: "Guntur", service: "Clinic CRM with reminders", source: "Google", amount: 45300, status: "In Progress", date: "19 Oct 2026" },
  { id: "E-2026", business: "Spice Route Biryani Point", contact: "S. Abdul Kareem", phone: "+91 90301 54679", city: "Nellore", service: "Order + kitchen display app", source: "Referral", amount: 52600, status: "Converted", date: "16 Oct 2026" },
  { id: "E-2024", business: "Future Kids Play School", contact: "B. Madhavi", phone: "+91 98497 02213", city: "Kavali", service: "Admissions + parent portal", source: "Instagram", amount: 30990, status: "Converted", date: "14 Oct 2026" },
  { id: "E-2021", business: "Nellore Hardware Mart", contact: "J. Ramana Reddy", phone: "+91 91214 66780", city: "Nellore", service: "Inventory + GST billing app", source: "WhatsApp", amount: 38450, status: "Converted", date: "10 Oct 2026" },
  { id: "E-2019", business: "Aqua Salon & Spa", contact: "T. Divya", phone: "+91 95812 30946", city: "Tirupati", service: "Booking & staff roster app", source: "Google", amount: 21800, status: "Converted", date: "07 Oct 2026" },
  { id: "E-2016", business: "Vijayla Pet Clinic", contact: "Dr. K. Mounika", phone: "+91 99897 45120", city: "Vijayawada", service: "Vaccination reminder CRM", source: "Referral", amount: 34200, status: "Contacted", date: "23 Oct 2026" },
];

export const ENQUIRIES_PER_WEEK = [
  { week: "Sep 01", count: 4 },
  { week: "Sep 08", count: 6 },
  { week: "Sep 15", count: 5 },
  { week: "Sep 22", count: 8 },
  { week: "Sep 29", count: 6 },
  { week: "Oct 06", count: 9 },
  { week: "Oct 13", count: 7 },
  { week: "Oct 20", count: 11 },
];

export const REVENUE_6_MONTHS = [
  { month: "May", revenue: 112400 },
  { month: "Jun", revenue: 138900 },
  { month: "Jul", revenue: 126500 },
  { month: "Aug", revenue: 154200 },
  { month: "Sep", revenue: 171800 },
  { month: "Oct", revenue: 186400 },
];

export const CLIENT_TYPE_SPLIT = [
  { name: "Restaurant", value: 46 },
  { name: "Clinic", value: 28 },
  { name: "Retail", value: 24 },
  { name: "Coaching", value: 22 },
  { name: "Other", value: 28 },
];

export function formatINR(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}

export function initials(name: string): string {
  const skip = new Set(["and", "&", "the", "of", "(s)", "works"]);
  return name
    .replace(/[()]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !skip.has(w.toLowerCase()))
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}
