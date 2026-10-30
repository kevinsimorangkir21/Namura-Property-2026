const BASE_URL = "https://namuraproperty.com";
const PAGE_URL = `${BASE_URL}/artikel`;
const TITLE = "Artikel";
const DESCRIPTION =
  "Baca artikel, tips, dan panduan seputar properti, investasi, dan tren hunian modern dari Namura Property.";
const SHORT_DESCRIPTION =
  "Tips dan panduan properti terpercaya dari Namura Property.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,

  keywords: [
    "artikel properti",
    "tips investasi properti",
    "panduan beli rumah",
    "tren properti Indonesia",
    "tips beli rumah Lampung",
    "investasi properti Lampung",
    "Namura Property",
  ],

  alternates: {
    canonical: "/artikel",
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
      "@type": "CollectionPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: `${TITLE} | Namura Property`,
      description: DESCRIPTION,
      inLanguage: "id-ID",
      isPartOf: { "@type": "WebSite", name: "Namura Property", url: BASE_URL },
      publisher: {
        "@type": "Organization",
        name: "Namura Property",
        url: BASE_URL,
        logo: `${BASE_URL}/Logo/Namura.png`,
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

export default function ArtikelLayout({ children }) {
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