export type MenuItem = {
  name: string;
  desc: string;
  price: number;
  veg: boolean;
  tag?: string;
};

export type MenuCategory = {
  id: string;
  label: string;
  note: string;
  items: MenuItem[];
};

/** Build a verified Unsplash CDN url (images.unsplash.com is whitelisted in next.config). */
export const img = (id: string, w = 1200, h?: number): string =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ""}&q=80`;

export const MENU: MenuCategory[] = [
  {
    id: "starters",
    label: "Starters",
    note: "Fired to order in our open kitchen",
    items: [
      {
        name: "Chicken 65 — Nellore Style",
        desc: "Curd-marinated boneless chicken fried twice, tossed with curry leaf, ginger and Guntur chilli.",
        price: 240,
        veg: false,
        tag: "Most ordered",
      },
      {
        name: "Andala Chicken Fry",
        desc: "Village-style pepper fry on the bone — black pepper, spring onion and a heavy hand of ghee.",
        price: 280,
        veg: false,
        tag: "Chef's pick",
      },
      {
        name: "Apollo Fish",
        desc: "Crisp basa fillets tossed in fiery red masala with onion, capsicum and curry leaf.",
        price: 320,
        veg: false,
      },
      {
        name: "Chicken Lollipop",
        desc: "Frenched wings in a garlic-chilli glaze, served with smoked-salt aioli.",
        price: 250,
        veg: false,
      },
      {
        name: "Ghee Karam Paneer Skewers",
        desc: "Malai paneer charred in tawa ghee, dusted with red chilli and roasted cumin.",
        price: 260,
        veg: true,
      },
      {
        name: "Crispy Corn Pepper Fry",
        desc: "Golden baby corn tossed with crushed pepper, spring onion and lime.",
        price: 190,
        veg: true,
      },
    ],
  },
  {
    id: "biryani",
    label: "Biryani",
    note: "Seeraga samba rice · serves 2 · with salan & raita",
    items: [
      {
        name: "Nellore Cheka Biryani",
        desc: "Our namesake — skin-on goat cheka slow-dummed in a clay pot over charcoal for four hours.",
        price: 340,
        veg: false,
        tag: "Signature",
      },
      {
        name: "Andhra Chicken Dum Biryani",
        desc: "Farm chicken layered with mint, fried onion and seeraga samba, sealed and cooked dum.",
        price: 320,
        veg: false,
      },
      {
        name: "Lamb Shoulder Biryani",
        desc: "Twelve-hour marinated lamb shoulder falling off the bone, finished with kewra water.",
        price: 420,
        veg: false,
        tag: "Weekend special",
      },
      {
        name: "Kona Veg Biryani",
        desc: "Garden vegetables and roasted cashews in a tamarind masala, layered like our mutton biryani.",
        price: 240,
        veg: true,
      },
      {
        name: "Egg Duniya Biryani",
        desc: "Six golden-fried eggs over saffron rice with onion salan.",
        price: 260,
        veg: false,
      },
      {
        name: "Prawan Biryani",
        desc: "Vankaya prawns tempered in coconut oil, tamarind and fresh turmeric.",
        price: 380,
        veg: false,
      },
    ],
  },
  {
    id: "curries",
    label: "Curries",
    note: "Served with rice or two phulkas",
    items: [
      {
        name: "Andala Koora",
        desc: "Nellore country chicken in a dry roasted red-chilli and sesame masala — the district on a plate.",
        price: 330,
        veg: false,
        tag: "Local classic",
      },
      {
        name: "Bonlet Mutton Curry",
        desc: "Goat bonelet simmered till the marrow melts into an Anamalai-spice gravy.",
        price: 420,
        veg: false,
      },
      {
        name: "Avakai Pulusu",
        desc: "Tangy tamarind chicken stew pounded with mustard seed and curry leaf.",
        price: 310,
        veg: false,
      },
      {
        name: "Butter Chicken Kasuri Methi",
        desc: "Tandoori chicken folded into a silky tomato-butter gravy finished with dried fenugreek.",
        price: 360,
        veg: false,
      },
      {
        name: "Paneer Butter Masala",
        desc: "Malai paneer in a mildly sweet onion-tomato gravy with white butter.",
        price: 300,
        veg: true,
      },
      {
        name: "Kadai Dal Tadka",
        desc: "Yellow lentils with a smoked ghee tadka of jeera, garlic and red chilli.",
        price: 220,
        veg: true,
      },
    ],
  },
  {
    id: "chinese",
    label: "Chinese",
    note: "Our wok runs hot from 12 noon",
    items: [
      {
        name: "Chicken Singari Fried Rice",
        desc: "Burnt-garlic fried rice with chicken singara bits and spring onion.",
        price: 240,
        veg: false,
      },
      {
        name: "Veg Hakka Noodles",
        desc: "Hand-pulled noodles wok-tossed with julienne vegetables and white pepper.",
        price: 200,
        veg: true,
      },
      {
        name: "Chilli Chicken Gravy",
        desc: "The Indo-Chinese standard — capsicum, onion and a glossy soy-chilli gravy.",
        price: 280,
        veg: false,
      },
      {
        name: "Schezwan Paneer",
        desc: "Paneer cubes in house-fermented schezwan chilli paste.",
        price: 260,
        veg: true,
      },
      {
        name: "Chicken Manchurian Dry",
        desc: "Crisp chicken dumplings tossed in garlic-ginger manchurian glaze.",
        price: 290,
        veg: false,
      },
      {
        name: "Honey Chilli Potato",
        desc: "Twice-fried potato batons in honey, chilli and toasted sesame.",
        price: 220,
        veg: true,
      },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    note: "Made in small batches through the day",
    items: [
      {
        name: "Dum Ka Roat",
        desc: "Layered bread pudding slow-baked in ghee with kesar, dry fruits and khoya.",
        price: 180,
        veg: true,
        tag: "Signature",
      },
      {
        name: "Double Ka Meetha",
        desc: "Ghee-fried bread soaked in saffron-milk pudding, topped with silver leaf.",
        price: 170,
        veg: true,
      },
      {
        name: "Gulab Jamun (2 pcs)",
        desc: "Warm khoya jamuns in cardamom syrup with a spoon of rabri.",
        price: 150,
        veg: true,
      },
      {
        name: "Shahi Tukda",
        desc: "Royal bread soaked in reduced milk, kesar and crushed pistachio.",
        price: 190,
        veg: true,
      },
      {
        name: "Salted Caramel Brownie",
        desc: "Fudgy brownie, vanilla bean ice cream, poured salted-caramel thread.",
        price: 240,
        veg: true,
        tag: "Table-side",
      },
      {
        name: "Kesar Rabri",
        desc: "Milk simmered for hours to a spoon-coating sweetness, chilled with pistachio.",
        price: 200,
        veg: true,
      },
    ],
  },
  {
    id: "beverages",
    label: "Beverages",
    note: "Zero-masala chai, all-day filter coffee",
    items: [
      {
        name: "Nellore Filter Coffee",
        desc: "Peering-grade decoction with frothed milk, served in the steel davara set.",
        price: 80,
        veg: true,
      },
      {
        name: "Masala Chaas",
        desc: "Churned buttermilk with ginger, green chilli and curry leaf.",
        price: 70,
        veg: true,
      },
      {
        name: "Sweet Lassi",
        desc: "Thick curd whipped with cardamom and a spoon of malai.",
        price: 120,
        veg: true,
      },
      {
        name: "Mango Mint Cooler",
        desc: "Seasonal pulped mango, muddled mint and lime over crushed ice.",
        price: 170,
        veg: true,
        tag: "Summer",
      },
      {
        name: "Rose Kulfi Falooda",
        desc: "Traditional kulfi shaved over falooda noodles, basil seed and rose syrup.",
        price: 190,
        veg: true,
      },
      {
        name: "Tender Coconut Water",
        desc: "Cracked to order from the Nellore coast, served with lime.",
        price: 90,
        veg: true,
      },
    ],
  },
];

export type SignatureDish = {
  name: string;
  desc: string;
  price: number;
  tag: string;
  imageId: string;
  alt: string;
};

export const SIGNATURES: SignatureDish[] = [
  {
    name: "Nellore Cheka Biryani",
    desc: "Skin-on goat cheka, seeraga samba rice and four hours under a sealed clay lid.",
    price: 340,
    tag: "Since 2008",
    imageId: "1589302168068-964664d93dc0",
    alt: "Chicken biryani plated with mint leaves, cucumber slices, salan and raita",
  },
  {
    name: "Andala Chicken Fry",
    desc: "Charcoal-kissed village chicken tumbled in cracked pepper, ghee and curry leaf.",
    price: 280,
    tag: "Fiery & famous",
    imageId: "1544025162-d76694265947",
    alt: "Slow-grilled meat glazed in dark barbecue spice, served on a wooden board",
  },
  {
    name: "Butter Chicken, Kasuri Methi",
    desc: "Tandoori chicken folded into a silky tomato-butter gravy, with tawa naan alongside.",
    price: 360,
    tag: "Delhi, our way",
    imageId: "1565557623262-b51c2513a641",
    alt: "Creamy butter chicken curry served on a plate with charred garlic naan",
  },
];

export type GalleryPhoto = { imageId: string; caption: string; alt: string; ratio: string };

export const GALLERY: GalleryPhoto[] = [
  {
    imageId: "1567188040759-fb8a883dc6d8",
    caption: "Paneer tikka sizzler, straight off the tawa",
    alt: "Charred paneer tikka cubes sizzling on an iron platter with onions",
    ratio: "4/3",
  },
  {
    imageId: "1606491956689-2ea866880c84",
    caption: "Pav bhaji evenings at the counter",
    alt: "Golden pav rolls served with batata curry, lemon and onion rings",
    ratio: "4/3",
  },
  {
    imageId: "1548943487-a2e4e43b4853",
    caption: "The day's red curry, finished with curry leaf",
    alt: "Bowl of fiery red curry garnished with chilli and curry leaves on a dark table",
    ratio: "3/4",
  },
  {
    imageId: "1526318896980-cf78c088247c",
    caption: "Wok-tossed noodles with burnt garlic",
    alt: "Bowl of noodles lifted with chopsticks, topped with egg, corn and greens",
    ratio: "3/4",
  },
  {
    imageId: "1546069901-ba9599a7e63c",
    caption: "Garden bowl for the lighter side",
    alt: "Overhead view of a fresh bowl with tofu, edamame, corn, tomato and cabbage",
    ratio: "1/1",
  },
  {
    imageId: "1551024506-0bccd828d307",
    caption: "Salted-caramel brownie sundae",
    alt: "Brownie with vanilla ice cream and a thread of salted caramel being poured",
    ratio: "3/4",
  },
  {
    imageId: "1563805042-7684c019e1cb",
    caption: "Belgian chocolate cookie parfait",
    alt: "Tall glass of chocolate parfait layered with cream and cookie crumble",
    ratio: "3/5",
  },
  {
    imageId: "1544145945-f90425340c7e",
    caption: "Citrus coolers at sundown",
    alt: "Stem glasses of citrus coolers garnished with lime on a yellow bar top",
    ratio: "3/4",
  },
  {
    imageId: "1414235077428-338989a2e8c0",
    caption: "Dinner service, the full route",
    alt: "Candle-lit restaurant table with a plated main course, wine and bread",
    ratio: "4/3",
  },
];

export const HERO_IMAGE = {
  imageId: "1476224203421-9ac39bcb3327",
  alt: "Rustic platter of grilled food with salad, bread and drinks on a dark wooden table",
};

export const ABOUT_IMAGE = {
  imageId: "1577219491135-ce391730fb2c",
  alt: "Chef in a dark apron plating dishes under warm copper lamps in an open kitchen",
};

export type Stat = { value: number; suffix: string; label: string };

export const STATS: Stat[] = [
  { value: 18, suffix: "+", label: "Years on Trunk Road" },
  { value: 120, suffix: "+", label: "Dishes on the route" },
  { value: 750, suffix: "", label: "Covers served daily" },
  { value: 3, suffix: "", label: "Outlets in Nellore" },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  stars: number;
  initials: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I've chased biryani from Hyderabad to Chennai, but the cheka biryani at Spice Route stops the search. The seeraga samba rice smells like my grandmother's kitchen in Vetapalem.",
    name: "Srikanth Reddy",
    role: "Software engineer, Bengaluru · Google review ★★★★★",
    stars: 5,
    initials: "SR",
  },
  {
    quote:
      "We come every Sunday since my kids were small. The Andala chicken fry is properly fiery, the staff remember our table, and the dum ka roat at the end is non-negotiable.",
    name: "Padmavathi Lakshmi",
    role: "Regular since 2013 · Sunna Peta",
    stars: 5,
    initials: "PL",
  },
  {
    quote:
      "As a food blogger I get invited everywhere — Spice Route is the one place I book on my own. Ghee karam paneer skewers and a filter coffee on the terrace at 10 pm. Nellore, you're lucky.",
    name: "Arjun Varma",
    role: "Food blogger · @NelloreEats, 40k followers",
    stars: 4,
    initials: "AV",
  },
];

export const HOURS: { day: string; time: string }[] = [
  { day: "Monday – Thursday", time: "11:30 am – 10:30 pm" },
  { day: "Friday – Saturday", time: "11:30 am – 11:00 pm" },
  { day: "Sunday", time: "11:00 am – 10:30 pm" },
  { day: "Public holidays", time: "11:00 am – 11:30 pm" },
];

export const NAV_LINKS = [
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Reserve", href: "#reserve" },
];

export const RESTAURANT = {
  name: "Spice Route",
  phoneDisplay: "+91 9849 240 861",
  phoneHref: "tel:+919849240861",
  whatsapp: "https://wa.me/919000000000",
  addressLines: [
    "6-1-12, 2nd Floor, Trunk Road,",
    "Near Charulatha Junction, Sunna Peta,",
    "Nellore, Andhra Pradesh — 524003",
  ],
  email: "table@spiceroute-nellore.in",
};
