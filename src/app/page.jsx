import Hero from "@/components/Hero";
import PropertyList from "@/components/PropertyList";
import About from "@/components/About";
import LatestArticles from "@/components/LatestArticles";
import Testimonials from "@/components/Testimonials";

export const metadata = {
  title: "Namura Property | Hunian Berkualitas di Lampung",

  description:
    "Temukan rumah, tanah, ruko, dan properti pilihan di Lampung bersama Namura Property. Informasi properti yang transparan dan pendampingan profesional untuk kebutuhan hunian maupun investasi.",

  keywords: [
    "Namura Property",
    "properti Lampung",
    "rumah dijual Lampung",
    "rumah dijual Bandar Lampung",
    "tanah dijual Lampung",
    "ruko dijual Lampung",
    "investasi properti Lampung",
    "jual beli properti",
    "real estate Lampung",
  ],

  openGraph: {
    title: "Namura Property | Hunian Berkualitas di Lampung",

    description:
      "Temukan rumah, tanah, ruko, dan properti pilihan di Lampung bersama Namura Property.",

    url: "https://namuraproperty.com",

    siteName: "Namura Property",

    locale: "id_ID",

    type: "website",

    images: [
      {
        url: "/Logo/Namura.png",
        width: 200,
        height: 200,
        alt: "Namura Property",
      },
    ],
  },
};

export default function Home() {
  return (
    <main className="overflow-hidden">

      {/* ==========================================
          HERO
          ========================================== */}
      <Hero />

      {/* ==========================================
          FEATURED PROPERTIES
          ========================================== */}
      <PropertyList />

      {/* ==========================================
          ABOUT / TRUST
          ========================================== */}
      <About />

      {/* ==========================================
          LATEST ARTICLES
          ========================================== */}
      <LatestArticles />

      {/* ==========================================
          TESTIMONIALS
          ========================================== */}
      <Testimonials />

    </main>
  );
}