const BASE_URL = "https://namuraproperty.com";
const PAGE_URL = `${BASE_URL}/tentang-kami`;
const TITLE = "Tentang Kami";
const DESCRIPTION =
  "Kenali Namura Property lebih dekat. Kami menghadirkan solusi properti dan hunian berkualitas dengan lokasi strategis untuk kebutuhan keluarga dan investasi Anda.";
const SHORT_DESCRIPTION =
  "Kenali Namura Property dan komitmen kami dalam menghadirkan hunian berkualitas dengan lokasi strategis untuk kebutuhan keluarga dan investasi.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,

  keywords: [
    "Namura Property",
    "tentang Namura Property",
    "profil Namura Property",
    "visi misi Namura Property",
    "perusahaan properti Lampung",
    "properti Lampung",
    "developer properti Lampung",
    "hunian Lampung",
    "rumah Lampung",
    "investasi properti Lampung",
  ],

  alternates: {
    canonical: "/tentang-kami",
  },

  openGraph: {
    type: "website",
    locale: "id_ID",
    url: PAGE_URL,
    siteName: "Namura Property",
    title: `${TITLE} | Namura Property`,
    description: SHORT_DESCRIPTION,
    images: [
      {
        url: "/Logo/Namura.png",
        width: 200,
        height: 200,
        alt: "Namura Property",
      },
    ],
  },

  twitter: {
    card: "summary",
    title: `${TITLE} | Namura Property`,
    description: SHORT_DESCRIPTION,
    images: ["/Logo/Namura.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: `${TITLE} | Namura Property`,
      description: DESCRIPTION,
      inLanguage: "id-ID",
      isPartOf: { "@type": "WebSite", name: "Namura Property", url: BASE_URL },
      about: {
        "@type": "RealEstateAgent",
        name: "Namura Property",
        url: BASE_URL,
        logo: `${BASE_URL}/Logo/Namura.png`,
        areaServed: { "@type": "AdministrativeArea", name: "Lampung" },
      },
      breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: TITLE, item: PAGE_URL },
      ],
    },
  ],
};

export default function TentangKamiLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {children}
    </>
  );
}