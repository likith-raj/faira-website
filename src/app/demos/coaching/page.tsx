"use client";

import { useCallback, useState } from "react";
import FairaDemoBadge from "@/components/FairaDemoBadge";
import Courses from "./components/Courses";
import EnquiryForm from "./components/EnquiryForm";
import Faculty from "./components/Faculty";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import { ToastProvider } from "./components/Toast";
import Toppers from "./components/Toppers";
import WhyUs from "./components/WhyUs";
import { scrollToSection } from "./utils";

export default function BrightPathAcademyPage() {
  const [prefillCourse, setPrefillCourse] = useState("");

  /** Course card "Enquire": prefills the enquiry form select, then smooth-scrolls to it. */
  const handleEnquire = useCallback((courseName: string) => {
    setPrefillCourse(courseName);
    window.setTimeout(() => scrollToSection("enquiry"), 60);
  }, []);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <Courses onEnquire={handleEnquire} />
          <Faculty />
          <Toppers />
          <WhyUs />
          <EnquiryForm prefillCourse={prefillCourse} />
          <Testimonials />
        </main>
        <Footer />
        <FairaDemoBadge />
      </div>
    </ToastProvider>
  );
}
