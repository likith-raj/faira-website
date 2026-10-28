export type Product = {
  id: string;
  brand: string;
  name: string;
  category: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  image: string;
  tag?: string;
};

export type Category = {
  name: string;
  blurb: string;
  image: string;
};

export type Review = {
  name: string;
  area: string;
  text: string;
  rating: number;
  initials: string;
};

export const CATEGORIES: Category[] = [
  {
    name: "Smartphones",
    blurb: "5G & flagship phones",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=640&q=80&auto=format&fit=crop",
  },
  {
    name: "Laptops",
    blurb: "Work, study & gaming",
    image: "https://images.unsplash.com/photo-1496181133224-54060727f6c3?w=640&q=80&auto=format&fit=crop",
  },
  {
    name: "Audio",
    blurb: "Headphones & TWS",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=640&q=80&auto=format&fit=crop",
  },
  {
    name: "Wearables",
    blurb: "Smartwatches & bands",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=640&q=80&auto=format&fit=crop",
  },
  {
    name: "Home Tech",
    blurb: "Smart lights & hubs",
    image: "https://images.unsplash.com/photo-1558002038-1055907df820?w=640&q=80&auto=format&fit=crop",
  },
  {
    name: "Accessories",
    blurb: "Chargers, cases & more",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=640&q=80&auto=format&fit=crop",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "galaxy-m34",
    brand: "Samsung",
    name: "Galaxy M34 5G (6GB RAM · 128GB)",
    category: "Smartphones",
    price: 15999,
    mrp: 19999,
    rating: 4.5,
    reviews: 212,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=640&q=80&auto=format&fit=crop",
    tag: "Bestseller",
  },
  {
    id: "iphone-15",
    brand: "Apple",
    name: "iPhone 15 (128GB)",
    category: "Smartphones",
    price: 69999,
    mrp: 79900,
    rating: 4.8,
    reviews: 148,
    image: "https://images.unsplash.com/photo-1598327105636-57f44186a864?w=640&q=80&auto=format&fit=crop",
    tag: "Just landed",
  },
  {
    id: "macbook-air-m2",
    brand: "Apple",
    name: "MacBook Air M2 (8GB · 256GB SSD)",
    category: "Laptops",
    price: 92990,
    mrp: 105900,
    rating: 4.9,
    reviews: 96,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=640&q=80&auto=format&fit=crop",
  },
  {
    id: "vivobook-15",
    brand: "ASUS",
    name: "VivoBook 15 (i5 12th Gen · 8GB · 512GB)",
    category: "Laptops",
    price: 42990,
    mrp: 49990,
    rating: 4.3,
    reviews: 174,
    image: "https://images.unsplash.com/photo-1496181133224-54060727f6c3?w=640&q=80&auto=format&fit=crop",
    tag: "Student pick",
  },
  {
    id: "sony-ch720n",
    brand: "Sony",
    name: "WH-CH720N Wireless ANC Headphones",
    category: "Audio",
    price: 8990,
    mrp: 12990,
    rating: 4.6,
    reviews: 131,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=640&q=80&auto=format&fit=crop",
  },
  {
    id: "airdopes-141",
    brand: "boAt",
    name: "Airdopes 141 TWS Earbuds (42H Playback)",
    category: "Audio",
    price: 1299,
    mrp: 2499,
    rating: 4.3,
    reviews: 356,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=640&q=80&auto=format&fit=crop",
    tag: "Diwali deal",
  },
  {
    id: "noise-colorfit",
    brand: "Noise",
    name: "ColorFit Pro 4 Smartwatch (1.39\u2033 AMOLED)",
    category: "Wearables",
    price: 1999,
    mrp: 3499,
    rating: 4.2,
    reviews: 244,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=640&q=80&auto=format&fit=crop",
  },
  {
    id: "mi-smart-bulb",
    brand: "Mi Smart",
    name: "LED Bulb E27 (RGB · Wi-Fi, App Control)",
    category: "Home Tech",
    price: 849,
    mrp: 1199,
    rating: 4.4,
    reviews: 187,
    image: "https://images.unsplash.com/photo-1558002038-1055907df820?w=640&q=80&auto=format&fit=crop",
  },
];

export const REVIEWS: Review[] = [
  {
    name: "Priya Reddy",
    area: "Chorapadi Road, Nellore",
    text: "Bought my MacBook Air here with an exchange offer \u2014 GST bill given on the spot and delivery inside Nellore same evening. Much cheaper than the city showrooms!",
    rating: 5,
    initials: "PR",
  },
  {
    name: "Syed Imran",
    area: "Trunk Road, Nellore",
    text: "Walked in for boAt Airdopes, walked out with a warranty card and a working demo in 10 minutes. Staff actually knows gadgets, no hard selling.",
    rating: 4.5,
    initials: "SI",
  },
  {
    name: "Kavitha Rao",
    area: "Mogulaparthi Junction, Nellore",
    text: "Ordered a Samsung 5G phone on COD for my son. 7-day replacement promise made them swap a scratched unit without a fight. Genuine local business.",
    rating: 5,
    initials: "KR",
  },
];

export function formatINR(value: number): string {
  return "\u20B9" + value.toLocaleString("en-IN");
}

export function discountPct(price: number, mrp: number): number {
  return Math.round(((mrp - price) / mrp) * 100);
}
