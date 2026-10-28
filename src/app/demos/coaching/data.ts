/* BrightPath Academy — demo content (Nellore coaching centre). All data is illustrative. */

export type CourseCategory =
  | "EAMCET"
  | "NEET"
  | "JEE"
  | "Bank Exams"
  | "School Tuitions"
  | "Spoken English";

export const FILTERS: Array<"All" | CourseCategory> = [
  "All",
  "EAMCET",
  "NEET",
  "JEE",
  "Bank Exams",
  "School Tuitions",
  "Spoken English"
];

export type Course = {
  id: string;
  name: string;
  category: CourseCategory;
  tagline: string;
  duration: string;
  batchSize: number;
  fee: number;
  feeNote: string;
  timing: string;
  features: string[];
  ribbon?: string;
};

export const COURSES: Course[] = [
  {
    id: "eamcet-excellence",
    name: "EAMCET Excellence — MPC",
    category: "EAMCET",
    tagline: "Complete Class 11 + 12 MPC programme built around the AP & TS EAMCET pattern.",
    duration: "12 months",
    batchSize: 45,
    fee: 48000,
    feeNote: "full programme incl. test series & notes",
    timing: "Evening batch · 5:00 – 8:30 PM",
    features: [
      "AP & TS EAMCET pattern papers every single week",
      "Hall-ticket level problem marathons in Maths & Physics",
      "Rank prediction report after each 4-test series",
      "Bilingual notes — same concept in Telugu and English"
    ],
    ribbon: "Most Popular"
  },
  {
    id: "eamcet-sprint",
    name: "EAMCET 90-Day Sprint",
    category: "EAMCET",
    tagline: "Focused revision batch for aspirants in the final stretch before the exam.",
    duration: "3 months",
    batchSize: 35,
    fee: 18500,
    feeNote: "incl. 18 part tests + 6 full mocks",
    timing: "Morning batch · 6:00 – 8:30 AM",
    features: [
      "Full syllabus compressed into 10 revision weeks",
      "Formula & shortcut handbook for all three subjects",
      "Daily 25-minute rapid-fire objective drills",
      "Option-form filling and counselling guidance included"
    ]
  },
  {
    id: "neet-dropper",
    name: "NEET Dropper Foundation",
    category: "NEET",
    tagline: "Year-long PCB programme for students giving NEET after 12th.",
    duration: "11 months",
    batchSize: 40,
    fee: 62000,
    feeNote: "incl. NTA-pattern mocks & practical biology lab",
    timing: "Evening batch · 5:00 – 8:30 PM",
    features: [
      "NCERT Biology line-by-line question banks",
      "15 full-length NTA-pattern mock tests",
      "Separate Physics numericals lab twice a week",
      "Dedicated error log reviewed with every student"
    ],
    ribbon: "42 selections in 2025"
  },
  {
    id: "neet-repeater",
    name: "NEET Repeater Intensive",
    category: "NEET",
    tagline: "High-accountability batch for second- and third-time NEET aspirants.",
    duration: "10 months",
    batchSize: 30,
    fee: 55000,
    feeNote: "incl. 12 part tests + 8 full mocks",
    timing: "Morning batch · 6:00 – 9:00 AM",
    features: [
      "Concept-wise weak-area audit on day one",
      "Rotating Botany / Zoology / Chemistry faculty",
      "Parent progress review on the first Saturday",
      "Performance psychologist session once a month"
    ]
  },
  {
    id: "jee-targetter",
    name: "JEE Main + Advanced Targetter",
    category: "JEE",
    tagline: "Small-batch programme for students aiming at IITs and NITs.",
    duration: "12 months",
    batchSize: 25,
    fee: 58000,
    feeNote: "incl. All-India test series",
    timing: "Evening batch · 4:30 – 8:30 PM",
    features: [
      "Advanced-level problem lab, every Saturday",
      "IIT-alumni doubt sessions on Sundays (online + in person)",
      "All-India test series with inter-state ranking",
      "Board answer-writing parallel preparation"
    ],
    ribbon: "Small batch"
  },
  {
    id: "bank-exams",
    name: "Bank & Group Exams (IBPS / SBI)",
    category: "Bank Exams",
    tagline: "Prelims to interview — full banking and AP Group exam preparation.",
    duration: "8 months",
    batchSize: 30,
    fee: 24000,
    feeNote: "incl. 30 mocks on IBPS-pattern platform",
    timing: "Weekend batch · Sat–Sun 9:00 AM – 1:00 PM",
    features: [
      "Quant & Reasoning shortcut drills, daily set",
      "General Awareness with current-affairs monthly booklet",
      "Mains-specific descriptive paper and email writing",
      "Interview and personality-development workshop"
    ]
  },
  {
    id: "school-tuition",
    name: "School Tuitions — Class 8 to 10",
    category: "School Tuitions",
    tagline: "SCERT / AP board syllabus with a Maths + Science foundation track.",
    duration: "10 months (academic year)",
    batchSize: 20,
    fee: 14400,
    feeNote: "per student, full academic year",
    timing: "Afternoon batch · 1:30 – 4:30 PM",
    features: [
      "Chapter-wise doubt hour after every school topic",
      "Weekly report card sent to parents on WhatsApp",
      "SAT & olympiad practice for strong students",
      "Class 10 → 11 MPC bridge module in April–May"
    ],
    ribbon: "New batch from June"
  },
  {
    id: "spoken-english",
    name: "Spoken English & Confidence Lab",
    category: "Spoken English",
    tagline: "Weekend communication course for college students and first-time job seekers.",
    duration: "4 months",
    batchSize: 18,
    fee: 9500,
    feeNote: "incl. certificate & 2 mock interviews",
    timing: "Weekend batch · Sat–Sun 2:00 – 4:30 PM",
    features: [
      "Daily speaking rounds — maximum 10 students per group",
      "Group discussions and interview role-plays",
      "Grammar, tense and pronunciation clinic",
      "Certificate useful for B.Ed, nursing and campus interviews"
    ]
  }
];

export const STATS = [
  { value: 500, suffix: "+", label: "Distinctions in 2024", hint: "90+ percentile holders across EAMCET, NEET & JEE" },
  { value: 24, suffix: "", label: "Expert Faculty", hint: "Post-graduates with 7+ years of coaching experience" },
  { value: 12, suffix: "", label: "Years in Nellore", hint: "Teaching on Stadium Road since 2014" },
  { value: 96, suffix: "%", label: "Pass Rate", hint: "Board + entrance exam success recorded last cycle" }
];

export type Faculty = {
  name: string;
  subject: string;
  credit: string;
  detail: string;
  photo: string;
  initials: string;
};

export const FACULTY: Faculty[] = [
  {
    name: "Dr. S. Suresh Babu",
    subject: "Physics",
    credit: "M.Sc, 11 yrs — Physics",
    detail: "Mechanics & Electrodynamics specialist. Writes every EAMCET internal paper.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop",
    initials: "SB"
  },
  {
    name: "K. Padma Sri",
    subject: "Chemistry",
    credit: "M.Sc (Analytical), 9 yrs — NEET",
    detail: "Famous for her organic reaction maps; 300+ NEET selections mentored.",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80&auto=format&fit=crop",
    initials: "PS"
  },
  {
    name: "R. Venkata Ratnam",
    subject: "Mathematics",
    credit: "M.Sc Maths, 14 yrs — JEE Advanced",
    detail: "University gold medallist. Handles the Saturday Advanced problem lab.",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80&auto=format&fit=crop",
    initials: "VR"
  },
  {
    name: "A. Sravan Kumar",
    subject: "Biology",
    credit: "M.Sc Botany, PhD, 12 yrs — NEET",
    detail: "NCERT line-by-line approach; runs the practical biology doubt lab.",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80&auto=format&fit=crop",
    initials: "AS"
  },
  {
    name: "M. Lakshmi Prasanna",
    subject: "English & Spoken",
    credit: "M.A. English, CELTA, 7 yrs",
    detail: "Communication coach for Group-2 and interview batches.",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80&auto=format&fit=crop",
    initials: "LP"
  },
  {
    name: "P. Anji Reddy",
    subject: "Quant & Reasoning",
    credit: "M.Com, 10 yrs — Bank Exams",
    detail: "Ex-SBI probationary officer; teaches shortcuts and Mains strategy.",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80&auto=format&fit=crop",
    initials: "AR"
  }
];

export type Topper = {
  name: string;
  exam: string;
  score: string;
  rank: string;
  now: string;
  initials: string;
  tint: string;
};

export const TOPPERS: Topper[] = [
  {
    name: "G. Sai Rohit",
    exam: "AP EAMCET 2025",
    score: "99.86",
    rank: "percentile · State Rank #1,148",
    now: "CSE, KL University Vijayawada",
    initials: "GR",
    tint: "from-[#E05A33] to-[#C94A25]"
  },
  {
    name: "B. Ananya Sri",
    exam: "NEET 2025",
    score: "671/720",
    rank: "AIR #1,902",
    now: "MBBS, Andhra Medical College, Visakhapatnam",
    initials: "AB",
    tint: "from-[#C94A25] to-[#E05A33]"
  },
  {
    name: "T. Harsha Vardhan",
    exam: "JEE Main 2025",
    score: "98.72",
    rank: "percentile · Session 1 + 2",
    now: "Mechanical Engg, NIT Warangal",
    initials: "TH",
    tint: "from-[#E05A33] to-[#C94A25]"
  }
];

export const RESULTS = [
  { name: "Ch. Divya Sri", exam: "NEET 2025", result: "655 marks · AIR #4,180" },
  { name: "P. Naga Sai Teja", exam: "AP EAMCET", result: "99.42 pct · Rank #2,340" },
  { name: "K. Triveni", exam: "NEET 2025", result: "640 marks · AIR #7,610" },
  { name: "V. Akash Deep", exam: "JEE Main", result: "97.66 percentile" },
  { name: "S. Manvitha", exam: "TS EAMCET", result: "99.18 pct · Rank #1,870" },
  { name: "D. Bharath Raj", exam: "SBI PO 2025", result: "Cleared Mains + Interview" },
  { name: "N. Sirisha", exam: "AP Board Class 10", result: "98.2% · Maths model paper" },
  { name: "G. Tarun Kumar", exam: "AP EAMCET", result: "98.10 pct · ECE, NIT AP" }
];

export const WHY_US = [
  {
    icon: "MessagesSquare",
    title: "Daily Doubt-Clearing",
    desc: "A fixed 5:00 – 6:00 PM Doubt Clinic, every working day. No question is told to wait for the next class.",
    meta: "Mon – Sat · free for all batches"
  },
  {
    icon: "ClipboardCheck",
    title: "Weekly Mock Tests",
    desc: "Sunday tests on the real exam pattern, with chapter-wise analysis, rank card and parent summary within 48 hours.",
    meta: "140+ tests a year"
  },
  {
    icon: "Users",
    title: "Personal Mentoring",
    desc: "One mentor for every 15 students. Attendance, test scores and syllabus pace reviewed with parents monthly.",
    meta: "1 : 15 mentor ratio"
  },
  {
    icon: "Languages",
    title: "Telugu & English Bilingual Teaching",
    desc: "The same concept taught in both mediums — board work, notes and doubt clearing — so nobody loses time on language.",
    meta: "Notes in both mediums"
  }
];

export type Testimonial = {
  name: string;
  role: string;
  rating: number;
  quote: string;
  initials: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "S. Prabhakara Reddy",
    role: "Parent · NEET dropper batch, Venkatagiri",
    rating: 5,
    quote:
      "My daughter repeated NEET and we were worried about her confidence. The monthly parent review and the error-log meetings kept us informed without us having to call anyone. She scored 640 this time.",
    initials: "SP"
  },
  {
    name: "Kavitha Sri",
    role: "Student · EAMCET 2025, Trunk Road",
    rating: 5,
    quote:
      "Physics was scary for me till the evening doubt clinic. Sir draws the whole concept on the board in Telugu first, then in English for the exam terms. I got 99.4 percentile.",
    initials: "KS"
  },
  {
    name: "T. Narasimha Murthy",
    role: "Parent · Class 9 tuition, Kovur",
    rating: 4.5,
    quote:
      "Batches are small, attendance is checked and the WhatsApp report card comes every Friday — I know exactly where my son stands. Only wish the afternoon batch started 30 minutes earlier.",
    initials: "TN"
  }
];

export const BATCH_TIMINGS = [
  { batch: "Morning", time: "6:00 – 8:30 AM", for: "EAMCET Sprint · NEET repeaters" },
  { batch: "Afternoon", time: "1:30 – 4:30 PM", for: "School tuitions, Class 8 – 10" },
  { batch: "Evening", time: "5:00 – 8:30 PM", for: "EAMCET · NEET · JEE degree batches" },
  { batch: "Weekend", time: "Sat – Sun, 9:00 AM – 4:30 PM", for: "Bank exams · Spoken English" }
];

export const CLASS_OPTIONS = [
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11 (MPC / BiPC)",
  "Class 12 (MPC / BiPC)",
  "NEET dropper",
  "JEE aspirant",
  "Graduate / Bank exam aspirant"
];

export const CENTRE = {
  name: "BrightPath Academy",
  addressLine1: "2nd Floor, Sujatha Towers",
  addressLine2: "Beside Stadium Road, Nellore – 524001",
  state: "Andhra Pradesh",
  phoneDisplay: "+91 861 234 5678",
  phoneHref: "+918612345678",
  mobileDisplay: "+91 98490 12345",
  mobileHref: "+919849012345",
  email: "admissions@brightpathacademy.in",
  since: 2014
};

export const NAV_LINKS = [
  { label: "Courses", id: "courses" },
  { label: "Faculty", id: "faculty" },
  { label: "Results", id: "results" },
  { label: "Why Us", id: "why-us" },
  { label: "Reviews", id: "testimonials" }
];
