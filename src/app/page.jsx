import Hero from "@/components/Hero";
import About from "@/components/About";
import PropertyList from "@/components/PropertyList";
import LatestArticles from "@/components/LatestArticles";
import Testimonials from "@/components/Testimonials";

export const metadata = {
  title: "Namura Property | Hunian Berkualitas di Lampung",
  description:
    "Namura Property menyediakan pilihan properti terbaik dengan lokasi strategis, desain modern, dan nilai investasi yang menjanjikan di Lampung dan Indonesia.",
  keywords: [
    "properti Lampung",
    "rumah dijual Lampung",
    "tanah dijual Lampung",
    "investasi properti",
    "Namura Property",
  ],
  openGraph: {
    title: "Namura Property | Hunian Berkualitas di Lampung",
    description:
      "Temukan properti impian Anda bersama Namura Property. Hunian modern, lokasi strategis, dan nilai investasi terjamin.",
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <PropertyList />
      <About />
      <LatestArticles />
      <Testimonials />
    </main>
  );
}
