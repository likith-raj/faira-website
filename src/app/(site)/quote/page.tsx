import { Suspense } from "react";
import type { Metadata } from "next";
import { QuoteWizard } from "@/components/QuoteWizard";

export const metadata: Metadata = {
  title: "Get a Quote",
  description: "Tell FAIRA about your business in 4 quick steps and get a free consultation with a fixed quote."
};

export default function QuotePage() {
  return (
    <Suspense>
      <QuoteWizard />
    </Suspense>
  );
}
