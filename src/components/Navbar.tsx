import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-[90%] items-center justify-between px-4 md:px-12">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent text-xl font-light text-white">
            F
          </div>
          <span className="font-display text-xl font-light uppercase tracking-[0.3em] text-white">
            FAIRA
          </span>
        </Link>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-8">
          {["Services", "Demos", "About", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-xs font-medium uppercase tracking-[0.2em] text-ink-dim transition-colors hover:text-accent"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <Link
          href="/quote"
          className="hidden md:inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-accent-deep"
        >
          Get a consultation
        </Link>
      </div>
    </header>
  );
}
