import Link from "next/link";
import { Home, SearchX } from "lucide-react";
import { GhostButton, GradientButton } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="relative grid min-h-screen place-items-center px-5">
      <div className="relative z-10 text-center">
        <SearchX className="mx-auto h-14 w-14 text-accent" />
        <p className="mono-label mt-6">Error 404</p>
        <h1 className="mt-3 font-display text-5xl font-bold">
          Page not <span className="text-gradient">found</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-ink-dim">
          The link may be broken, or the page moved. No stress — everything important is one click away.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <GradientButton href="/">
            <Home className="h-4 w-4" /> Go to Home
          </GradientButton>
          <GhostButton href="/demos">View Demos</GhostButton>
        </div>
        <p className="mt-6 text-sm text-ink-faint">
          Need help?{" "}
          <Link href="/contact" className="text-accent hover:underline">
            Contact FAIRA
          </Link>
        </p>
      </div>
    </div>
  );
}
