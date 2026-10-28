import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black/30 py-12 backdrop-blur-xl mt-auto">
      <div className="mx-auto flex max-w-[95%] flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-12">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <span className="font-display text-2xl font-black uppercase tracking-tighter text-white">FAIRA</span>
          <p className="text-sm text-gray-400">Built with love in Nellore.</p>
        </div>
        <div className="flex gap-8 text-sm font-bold uppercase tracking-wider text-gray-300">
          <Link href="/services" className="hover:text-[#E05A33]">Services</Link>
          <Link href="/demos" className="hover:text-[#E05A33]">Demos</Link>
          <Link href="/about" className="hover:text-[#E05A33]">About</Link>
          <Link href="/contact" className="hover:text-[#E05A33]">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
