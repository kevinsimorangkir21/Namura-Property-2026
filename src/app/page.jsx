"use client";

import Hero from "@/components/Hero";
import PropertySearch from "@/components/PropertySearch";
import About from "@/components/About";
import PropertyList from "@/components/PropertyList";
import LatestArticles from "@/components/LatestArticles";
import Testimonials from "@/components/Testimonials";
import Services from "@/components/Services";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <PropertyList />
      <LatestArticles />
      <Testimonials />
      <Services />

    </main>
  );
}