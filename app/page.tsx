"use client";

import { AboutSection } from "@/components/Sections/AboutSection";
import HeroSection from "@/components/Sections/HeroSection";
import { ServicesSection } from "@/components/Sections/ServicesSection";
import NewsEvents from "@/components/ui/News";
import Partnership from "@/components/Sections/PartnershipSection";

export default function Home() {
  return (
    <main className="">
      <HeroSection />
      <AboutSection />
      <NewsEvents />
      <Partnership />
      {/* <GetInvolvedSection/> */}
    </main>
  );
}
