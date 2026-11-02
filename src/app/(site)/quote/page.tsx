import { Suspense } from "react";
import type { Metadata } from "next";
import { QuoteWizard } from "@/components/QuoteWizard";

export const metadata: Metadata = {
  title: "Start a Project",
  description: "Tell FAIRA about your business in a few quick steps and we will call you for a free consultation."
};

export default function QuotePage() {
  return (
    <Suspense>
      <QuoteWizard />
    </Suspense>
  );
}
