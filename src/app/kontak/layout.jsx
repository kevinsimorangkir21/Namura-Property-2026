const BASE_URL = "https://namuraproperty.com";
const PAGE_URL = `${BASE_URL}/kontak`;
const TITLE = "Kontak";
const DESCRIPTION =
  "Hubungi tim Namura Property untuk konsultasi properti gratis. Kami siap membantu Anda menemukan properti impian.";
const SHORT_DESCRIPTION =
  "Konsultasi properti bersama tim Namura Property melalui WhatsApp, telepon, atau kunjungi kantor kami di Bandar Lampung.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,

  keywords: [
    "kontak Namura Property",
    "konsultasi properti",
    "hubungi agen properti Lampung",
    "konsultasi properti Lampung",
    "alamat Namura Property",
    "WhatsApp Namura Property",
  ],

  alternates: {
    canonical: "/kontak",
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
      "@type": "ContactPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: `${TITLE} | Namura Property`,
      description: DESCRIPTION,
      inLanguage: "id-ID",
      isPartOf: { "@type": "WebSite", name: "Namura Property", url: BASE_URL },
      about: { "@id": `${BASE_URL}#agent` },
      breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
    },
    {
      "@type": "RealEstateAgent",
      "@id": `${BASE_URL}#agent`,
      name: "Namura Property",
      url: BASE_URL,
      logo: `${BASE_URL}/Logo/Namura.png`,
      image: `${BASE_URL}/Logo/Namura.png`,
      telephone: "+6281369381111",
      email: "namuraproperty@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jl. Karimun Sukarame",
        addressLocality: "Bandar Lampung",
        addressRegion: "Lampung",
        addressCountry: "ID",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -5.3909822,
        longitude: 105.3110481,
      },
      areaServed: { "@type": "AdministrativeArea", name: "Lampung" },
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

export default function KontakLayout({ children }) {
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