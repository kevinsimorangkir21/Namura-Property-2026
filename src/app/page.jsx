"use client";

import Hero from "@/components/Hero";
import PropertySearch from "@/components/PropertySearch";
import About from "@/components/About";
import PropertyList from "@/components/PropertyList";
import Testimonials from "@/components/Testimonials";
import Services from "@/components/Services";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <PropertyList />
      <Testimonials />
      <Services />
      <FAQ />
    </main>
  );
}