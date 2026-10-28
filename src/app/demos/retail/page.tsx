"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Banknote,
  ChevronRight,
  FileText,
  Laptop,
  Lightbulb,
  MapPin,
  MessageCircle,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
  Watch,
  Headphones,
  Smartphone,
  Wrench,
  X,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import {
  CATEGORIES,
  PRODUCTS,
  REVIEWS,
  discountPct,
  formatINR,
  type Product,
} from "./data";

/* ---------------------------------- data ---------------------------------- */

const NAV_LINKS = [
  { label: "Categories", id: "categories" },
  { label: "Shop", id: "products" },
  { label: "Deals", id: "deals" },
  { label: "Why Us", id: "why-us" },
  { label: "About", id: "about" },
];

const WHY_CARDS = [
  {
    icon: FileText,
    title: "GST bill on every sale",
    text: "Tax invoices with your GSTIN, claimed on the spot. No \u201Cmismatch\u201D surprises later.",
  },
  {
    icon: RefreshCw,
    title: "7-day replacement",
    text: "Defective gadget? Walk into the store within 7 days and pick an identical swap unit.",
  },
  {
    icon: Wrench,
    title: "Service tie-up in Nellore",
    text: "Authorised pickup & drop for Samsung, boAt and Noise repairs \u2014 right from our counter.",
  },
  {
    icon: Banknote,
    title: "COD within Nellore city",
    text: "Pay at your doorstep on orders up to ₹10,000. Check the seal before you pay.",
  },
];

const CHIP_LABELS = ["All", ...CATEGORIES.map((c) => c.name)].filter(
  (c) => c !== "Accessories" || PRODUCTS.some((p) => p.category === "Accessories")
);

const CATEGORY_ICON: Record<string, typeof Smartphone> = {
  Smartphones: Smartphone,
  Laptops: Laptop,
  Audio: Headphones,
  Wearables: Watch,
  "Home Tech": Lightbulb,
  Accessories: ShoppingCart,
};

/* ------------------------------- small pieces ------------------------------- */

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  const rounded = Math.round(rating);
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < rounded
              ? "fill-[#D97706] text-[#D97706]"
              : "fill-transparent text-[#EAEAEA]"
          }
        />
      ))}
    </span>
  );
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-10 text-center">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
        {kicker}
      </p>
      <h2 className="uk-display text-3xl font-extrabold text-ink sm:text-4xl">{title}</h2>
      {sub ? <p className="mx-auto mt-3 max-w-xl text-sm text-ink-dim">{sub}</p> : null}
    </div>
  );
}

function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (p: Product) => void;
}) {
  const off = discountPct(product.price, product.mrp);
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[color:var(--border)] bg-panel shadow-panel transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_12px_32px_rgba(26,26,26,0.08)]"
    >
      <div className="relative aspect-square overflow-hidden bg-bg-2">
        <Image
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-white">
          {off}% OFF
        </span>
        {product.tag ? (
          <span className="absolute right-3 top-3 rounded-full border border-accent/20 bg-soft px-2.5 py-1 text-[11px] font-semibold text-accent-deep">
            {product.tag}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-ink-faint">
          {product.brand}
        </p>
        <h3 className="text-sm font-semibold leading-snug text-ink">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 text-xs text-ink-dim">
          <Stars rating={product.rating} />
          <span>
            {product.rating} · {product.reviews} reviews
          </span>
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-lg font-bold text-ink">
            {formatINR(product.price)}
          </span>
          <span className="text-sm text-ink-faint line-through">{formatINR(product.mrp)}</span>
        </div>
        <button
          type="button"
          onClick={() => onAdd(product)}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-deep active:scale-[0.98]"
        >
          <ShoppingCart size={16} /> Add to Cart
        </button>
      </div>
    </motion.article>
  );
}

/* ---------------------------------- page ---------------------------------- */

export default function UrbanKartPage() {
  const [cartCount, setCartCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [contact, setContact] = useState({ name: "", phone: "", message: "" });
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  function showToast(message: string) {
    setToast({ id: Date.now(), message });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  }

  function scrollToId(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function addToCart(product: Product) {
    setCartCount((c) => c + 1);
    showToast(`${product.brand} ${product.name} added to cart`);
  }

  function pickCategory(cat: string) {
    setActiveCategory(cat);
    scrollToId("products");
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const inCategory = activeCategory === "All" || p.category === activeCategory;
      const inSearch =
        !q ||
        `${p.brand} ${p.name} ${p.category}`.toLowerCase().includes(q) ||
        (q === "tws" && p.name.includes("TWS")) ||
        (q === "5g" && p.name.includes("5G"));
      return inCategory && inSearch;
    });
  }, [query, activeCategory]);

  function submitContact(e: React.FormEvent) {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (contact.name.trim().length < 2) errors.name = "Please enter your full name.";
    if (!/^[6-9]\d{9}$/.test(contact.phone.replace(/\s/g, "")))
      errors.phone = "Enter a valid 10-digit Indian mobile number.";
    if (contact.message.trim().length < 10)
      errors.message = "Tell us a bit more (min 10 characters).";
    setContactErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setContact({ name: "", phone: "", message: "" });
    showToast("Thanks! Our Nellore team will call you back within an hour.");
  }

  function submitNewsletter(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setEmailError("Enter a valid email address.");
      return;
    }
    setEmailError("");
    setEmail("");
    showToast("Subscribed! Diwali offers will land in your inbox first.");
  }

  return (
    <main className="overflow-x-clip bg-bg text-ink">
      {/* ------------------------------- 1. Navbar ------------------------------- */}
      <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-bg-2/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="uk-display flex items-center gap-2 text-lg font-extrabold text-ink"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-sm font-bold text-white">
              UK
            </span>
            Urban<span className="text-accent">Kart</span>
            <span className="hidden text-xs font-medium text-ink-faint sm:inline">Store</span>
          </button>

          <nav className="hidden items-center gap-6 text-sm text-ink-dim lg:flex">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => scrollToId(l.id)}
                className="transition-colors hover:text-accent"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Search products"
              onClick={() => {
                setSearchOpen((o) => !o);
                if (searchOpen) setQuery("");
              }}
              className={`grid h-10 w-10 place-items-center rounded-full transition-colors ${
                searchOpen ? "bg-accent text-white" : "text-ink-dim hover:bg-soft hover:text-accent"
              }`}
            >
              {searchOpen ? <X size={18} /> : <Search size={18} />}
            </button>
            <button
              type="button"
              aria-label={`Cart with ${cartCount} items`}
              onClick={() =>
                cartCount > 0
                  ? showToast(`Cart has ${cartCount} item${cartCount > 1 ? "s" : ""} — checkout opens soon!`)
                  : scrollToId("products")
              }
              className="relative grid h-10 w-10 place-items-center rounded-full text-ink-dim transition-colors hover:bg-soft hover:text-accent"
            >
              <ShoppingCart size={18} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className="hidden rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-deep sm:block"
            >
              Contact
            </button>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-[color:var(--border)]"
            >
              <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
                <Search size={16} className="text-ink-faint" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    scrollToId("products");
                  }}
                  placeholder="Search phones, laptops, TWS, smartwatch..."
                  className="w-full bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none"
                />
                {query ? (
                  <span className="text-xs text-ink-dim">
                    {filtered.length} result{filtered.length === 1 ? "" : "s"}
                  </span>
                ) : null}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ----------------------------- 2. Offer banner ----------------------------- */}
      <div className="relative overflow-hidden bg-[linear-gradient(90deg,#E05A33,#C94A25)]">
        <motion.div
          className="flex whitespace-nowrap py-2.5 text-sm font-semibold text-white"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, ease: "linear", repeat: Infinity }}
        >
          {[0, 1].map((k) => (
            <span key={k} className="flex shrink-0">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="mx-6 inline-flex items-center gap-2">
                  <Truck size={15} /> Free delivery in Nellore on orders above {"\u20B9"}999
                  <ChevronRight size={14} /> Diwali Sale up to 40% OFF
                </span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>

      {/* --------------------------------- 3. Hero --------------------------------- */}
      <section id="home" className="relative">
        <div className="pointer-events-none absolute -top-20 left-1/3 h-72 w-72 rounded-full bg-soft blur-[120px]" />
        <div className="pointer-events-none absolute right-0 top-40 h-64 w-64 rounded-full bg-accent/10 blur-[120px]" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <Reveal>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-soft px-3 py-1 text-xs font-semibold text-accent-deep">
              <Star size={12} className="fill-accent text-accent" /> Nellore&apos;s gadget
              bazaar since 2015
            </span>
            <h1 className="uk-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl lg:text-[3.4rem]">
              Latest Gadgets.
              <br />
              <span className="bg-[linear-gradient(120deg,#E05A33,#C94A25)] bg-clip-text text-transparent">
                Unbeatable Prices.
              </span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-dim">
              From {"\u20B9"}1,299 TWS earbuds to MacBook Airs with exchange offers — UrbanKart
              Store in Rajindra Market prices every box honestly, bills it with GST, and
              delivers across Nellore the same day.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => scrollToId("products")}
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_6px_22px_rgba(224,90,51,0.25)] transition-colors hover:bg-accent-deep"
              >
                Shop Now <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => scrollToId("deals")}
                className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--border)] bg-panel px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
              >
                See Diwali Deals
              </button>
            </div>
            <div className="mt-10 flex gap-8">
              <div>
                <p className="uk-display text-2xl font-extrabold text-accent">5,000+</p>
                <p className="text-sm text-ink-dim">orders delivered</p>
              </div>
              <div>
                <p className="uk-display text-2xl font-extrabold text-ink">4.8</p>
                <p className="text-sm text-ink-dim">Google store rating</p>
              </div>
              <div>
                <p className="uk-display text-2xl font-extrabold text-ink">10 yrs</p>
                <p className="text-sm text-ink-dim">in Rajindra Market</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-[color:var(--border)] shadow-panel">
                <Image
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80&auto=format&fit=crop"
                  alt="Customers exploring gadgets at UrbanKart Store"
                  width={960}
                  height={720}
                  priority
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-panel px-4 py-3 shadow-[0_12px_32px_rgba(26,26,26,0.08)]">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-soft text-accent">
                  <Truck size={17} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">Same-day delivery</p>
                  <p className="text-xs text-ink-dim">across Nellore city</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------- 4. Categories ------------------------------- */}
      <section id="categories" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <SectionHeading
            kicker="Browse"
            title="Shop by Category"
            sub="Six counters, one store — tap a category to filter the shelf below."
          />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => {
            const Icon = CATEGORY_ICON[cat.name] ?? Smartphone;
            return (
              <Reveal key={cat.name} delay={i * 0.05}>
                <button
                  type="button"
                  onClick={() => pickCategory(cat.name)}
                  className="group relative flex h-36 w-full items-end overflow-hidden rounded-2xl border border-[color:var(--border)] bg-panel text-left shadow-panel transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_12px_32px_rgba(26,26,26,0.08)]"
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.88)_58%,rgba(249,248,246,0.97))]" />
                  <div className="relative z-10 flex w-full items-center justify-between p-4">
                    <div>
                      <p className="uk-display flex items-center gap-2 font-bold text-ink">
                        <Icon size={16} className="text-accent" /> {cat.name}
                      </p>
                      <p className="text-sm text-ink-dim">{cat.blurb}</p>
                    </div>
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-[color:var(--border)] bg-panel text-ink-dim transition-colors group-hover:border-accent group-hover:text-accent">
                      <ChevronRight size={15} />
                    </span>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ----------------------------- 5. Featured products ----------------------------- */}
      <section id="products" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <SectionHeading
            kicker="Shelf"
            title="Featured Products"
            sub="Real stock, real prices. Every item carries the MRP with our discount cut right off it."
          />
        </Reveal>
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {CHIP_LABELS.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setActiveCategory(chip)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                activeCategory === chip
                  ? "border-accent bg-accent text-white"
                  : "border-[color:var(--border)] bg-panel text-ink-dim hover:border-accent hover:text-accent"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
        {filtered.length > 0 ? (
          <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((p, i) => (
              <Reveal key={p.id} delay={Math.min(i * 0.05, 0.3)}>
                <ProductCard product={p} onAdd={addToCart} />
              </Reveal>
            ))}
          </motion.div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[color:var(--border)] bg-bg-2 py-16 text-center">
            {query.trim() ? (
              <>
                <p className="uk-display text-lg font-bold">Nothing matches “{query}”</p>
                <p className="mt-2 text-sm text-ink-dim">
                  Try “phone”, “laptop”, “TWS” or clear the filters.
                </p>
              </>
            ) : (
              <>
                <p className="uk-display text-lg font-bold">
                  {activeCategory} stock is in-store only
                </p>
                <p className="mt-2 text-sm text-ink-dim">
                  Call +91 98490 45678 and we will hold pieces for you at the Rajindra Market
                  counter.
                </p>
              </>
            )}
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveCategory("All");
              }}
              className="mt-4 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>

      {/* ------------------------------- 6. Deals banner ------------------------------- */}
      <section id="deals" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <SectionHeading kicker="Diwali Sale" title="Deals Worth The Trip" />
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="relative flex min-h-56 items-end overflow-hidden rounded-3xl border border-[color:var(--border)] bg-panel p-6 shadow-panel transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(26,26,26,0.08)]">
              <Image
                src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1000&q=80&auto=format&fit=crop"
                alt="TWS earbuds on promotion"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.96),rgba(253,235,221,0.82))]" />
              <div className="relative z-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  Audio festival
                </p>
                <h3 className="uk-display mt-1 text-2xl font-extrabold text-ink">TWS under {"\u20B9"}1,499</h3>
                <p className="mt-1 max-w-xs text-sm text-ink-dim">
                  boAt, Noise & Poddie earbuds — try every model at our demo counter before you
                  buy.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory("Audio");
                    scrollToId("products");
                  }}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-bold text-white transition-transform hover:scale-[1.02] hover:bg-accent-deep"
                >
                  Grab a pair <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative flex min-h-56 items-end overflow-hidden rounded-3xl border border-[color:var(--border)] bg-panel p-6 shadow-panel transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(26,26,26,0.08)]">
              <Image
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1000&q=80&auto=format&fit=crop"
                alt="Laptop exchange offer"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.96),rgba(224,90,51,0.18))]" />
              <div className="relative z-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-deep">
                  Upgrade season
                </p>
                <h3 className="uk-display mt-1 text-2xl font-extrabold text-ink">Laptop Exchange Offer</h3>
                <p className="mt-1 max-w-xs text-sm text-ink-dim">
                  Bring any working laptop older than 2 years — get up to {"\u20B9"}12,000 off a
                  new one. Free data transfer.
                </p>
                <button
                  type="button"
                  onClick={() => scrollToId("contact")}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-bold text-white transition-transform hover:scale-[1.02] hover:bg-accent-deep"
                >
                  Get a valuation <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------ 7. Why shop with us ------------------------------ */}
      <section id="why-us" className="border-y border-[color:var(--border)] bg-bg-2">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Reveal>
            <SectionHeading
              kicker="The UrbanKart promise"
              title="Why Nellore Shops With Us"
            />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CARDS.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06}>
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-[color:var(--border)] bg-panel p-5 shadow-panel transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_12px_32px_rgba(26,26,26,0.08)]">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-soft text-accent">
                    <c.icon size={20} />
                  </span>
                  <h3 className="uk-display text-base font-bold">{c.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-dim">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------- 8. About ---------------------------------- */}
      <section id="about" className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-[color:var(--border)] shadow-panel">
            <Image
              src="https://images.unsplash.com/photo-1468495244126-58631f4d0277?w=1000&q=80&auto=format&fit=crop"
              alt="Inside the UrbanKart Store counter"
              width={900}
              height={640}
              className="h-80 w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0.95))] p-5">
              <p className="uk-display text-sm font-bold text-ink">
                Rajindra Market · MG Road, Nellore
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Our story
          </p>
          <h2 className="uk-display text-3xl font-extrabold sm:text-4xl">
            A family electronics business since 2015
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-dim">
            UrbanKart began as a two-shelf counter selling phone chargers in Rajindra Market.
            Brothers Ramesh and Suresh kept one rule from day one — the sticker price is the
            price, the bill is always GST, and a defective unit comes back to us, not to a
            vague care number.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-dim">
            Ten years later we ship 5,000+ orders a year across Nellore, demo every gadget on
            the counter, and still argue the same way with distributors on your behalf. Walk in
            any evening — chai is on us while the phone is being set up.
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <div className="rounded-2xl border border-[color:var(--border)] bg-panel px-5 py-3 shadow-panel">
              <p className="uk-display text-xl font-extrabold text-accent">2,000+</p>
              <p className="text-sm text-ink-dim">sq ft showroom</p>
            </div>
            <div className="rounded-2xl border border-[color:var(--border)] bg-panel px-5 py-3 shadow-panel">
              <p className="uk-display text-xl font-extrabold text-ink">40+</p>
              <p className="text-sm text-ink-dim">brands stocked</p>
            </div>
            <div className="rounded-2xl border border-[color:var(--border)] bg-panel px-5 py-3 shadow-panel">
              <p className="uk-display text-xl font-extrabold text-ink">7</p>
              <p className="text-sm text-ink-dim">days replacement</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* --------------------------------- 9. Reviews --------------------------------- */}
      <section id="reviews" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <SectionHeading kicker="Word of mouth" title="What Nellore Says About Us" />
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08}>
              <figure className="flex h-full flex-col gap-4 rounded-2xl border border-[color:var(--border)] bg-panel p-6 shadow-panel transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_12px_32px_rgba(26,26,26,0.08)]">
                <Stars rating={r.rating} size={15} />
                <blockquote className="flex-1 text-sm leading-relaxed text-ink-dim">
                  “{r.text}”
                </blockquote>
                <figcaption className="flex items-center gap-3 border-t border-[color:var(--border)] pt-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-soft text-sm font-bold text-accent">
                    {r.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{r.name}</p>
                    <p className="text-xs text-ink-faint">{r.area}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------- 10. Contact ------------------------------- */}
      <section id="contact" className="border-t border-[color:var(--border)] bg-bg-2">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Reach the counter
            </p>
            <h2 className="uk-display text-3xl font-extrabold sm:text-4xl">Ask. Order. Visit.</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-dim">
              Stock check, exchange valuation or bulk quotes for your office — send a message
              and we call back within an hour during store timings.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4 rounded-2xl border border-[color:var(--border)] bg-panel p-4 shadow-panel">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-soft text-accent">
                  <MapPin size={18} />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-ink">UrbanKart Store</p>
                  <p className="text-sm text-ink-dim">
                    Shop No. 14, Rajindra Market, Mahatma Gandhi Road, Nellore, AP 524001
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Rajindra+Market+Nellore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent-deep hover:underline"
                  >
                    Get directions on Google Maps <ChevronRight size={12} />
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-[color:var(--border)] bg-panel p-4 shadow-panel">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-soft text-accent">
                  <Phone size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">+91 98490 45678</p>
                  <p className="text-xs text-ink-dim">Mon–Sat 10:00–21:00 · Sun 11:00–19:00</p>
                </div>
              </div>
              <a
                href="https://wa.me/919849045678?text=Hi%20UrbanKart%2C%20I%20want%20to%20order%20a%20gadget.%20Please%20share%20the%20price."
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-3.5 text-sm font-bold text-white transition-transform hover:scale-[1.01]"
              >
                <MessageCircle size={18} /> Order on WhatsApp — quick reply
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={submitContact}
              noValidate
              className="rounded-3xl border border-[color:var(--border)] bg-panel p-6 shadow-panel sm:p-8"
            >
              <h3 className="uk-display text-lg font-bold">Send a message</h3>
              <div className="mt-6 space-y-5">
                <div>
                  <label htmlFor="c-name" className="mb-1.5 block text-xs font-semibold text-ink-dim">
                    Your name
                  </label>
                  <input
                    id="c-name"
                    value={contact.name}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    placeholder="e.g. Anudeep Varma"
                    className="w-full rounded-xl border border-[color:var(--border)] bg-bg px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
                  />
                  {contactErrors.name ? (
                    <p className="mt-1.5 text-xs text-[#DC2626]">{contactErrors.name}</p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="c-phone" className="mb-1.5 block text-xs font-semibold text-ink-dim">
                    Phone (10 digits)
                  </label>
                  <input
                    id="c-phone"
                    inputMode="numeric"
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    placeholder="98490 45678"
                    className="w-full rounded-xl border border-[color:var(--border)] bg-bg px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
                  />
                  {contactErrors.phone ? (
                    <p className="mt-1.5 text-xs text-[#DC2626]">{contactErrors.phone}</p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="c-msg" className="mb-1.5 block text-xs font-semibold text-ink-dim">
                    What do you need?
                  </label>
                  <textarea
                    id="c-msg"
                    rows={4}
                    value={contact.message}
                    onChange={(e) => setContact({ ...contact, message: e.target.value })}
                    placeholder="Is the iPhone 15 in stock at ₹69,999? I can pick up tomorrow."
                    className="w-full resize-none rounded-xl border border-[color:var(--border)] bg-bg px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
                  />
                  {contactErrors.message ? (
                    <p className="mt-1.5 text-xs text-[#DC2626]">{contactErrors.message}</p>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
                >
                  <ShieldCheck size={16} /> Request a call back
                </button>
                <p className="text-center text-xs text-ink-faint">
                  No spam. Your number stays with the store.
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------- 11. Footer --------------------------------- */}
      <footer className="border-t border-[color:var(--border)] bg-bg-2">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="uk-display flex items-center gap-2 text-lg font-extrabold text-ink">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-sm font-bold text-white">
                UK
              </span>
              UrbanKart Store
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-dim">
              Gadgets & electronics retail, Rajindra Market, Nellore. GST: 37AABCU1234K1Z9 ·
              FSSAI n/a, we only sell electronics.
            </p>
            <form onSubmit={submitNewsletter} noValidate className="mt-6">
              <label htmlFor="news" className="mb-2 block text-xs font-semibold text-ink-dim">
                Diwali offers in your inbox
              </label>
              <div className="flex gap-2">
                <input
                  id="news"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-[color:var(--border)] bg-bg px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-accent-deep"
                >
                  Join
                </button>
              </div>
              {emailError ? <p className="mt-1.5 text-xs text-[#DC2626]">{emailError}</p> : null}
            </form>
          </div>
          <div>
            <p className="uk-display mb-4 text-sm font-bold text-ink">Shop</p>
            <ul className="space-y-2.5 text-sm text-ink-dim">
              {CATEGORIES.slice(0, 5).map((c) => (
                <li key={c.name}>
                  <button
                    type="button"
                    onClick={() => pickCategory(c.name)}
                    className="transition-colors hover:text-accent"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="uk-display mb-4 text-sm font-bold text-ink">Store</p>
            <ul className="space-y-2.5 text-sm text-ink-dim">
              <li>
                <button type="button" onClick={() => scrollToId("about")} className="hover:text-accent">
                  About UrbanKart
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToId("reviews")} className="hover:text-accent">
                  Customer reviews
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToId("contact")} className="hover:text-accent">
                  Visit Rajindra Market
                </button>
              </li>
              <li>
                <a href="tel:+919849045678" className="hover:text-accent">
                  +91 98490 45678
                </a>
              </li>
              <li>
                <a href="mailto:orders@urbankartnellore.in" className="hover:text-accent">
                  orders@urbankartnellore.in
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[color:var(--border)] py-5 text-center text-xs text-ink-faint">
          © 2026 UrbanKart Store, Nellore. Prices include GST where applicable. Demo store —
          orders are not real.
        </div>
      </footer>

      {/* ---------------------------------- Toast ---------------------------------- */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 24, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 24, x: "-50%" }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 left-1/2 z-[95] flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-panel px-5 py-3 shadow-[0_12px_32px_rgba(26,26,26,0.08)]"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-white">
              <ShoppingCart size={14} />
            </span>
            <p className="max-w-[70vw] truncate text-sm font-medium text-ink">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
