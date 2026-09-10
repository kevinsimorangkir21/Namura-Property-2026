export const metadata = {
  title: "Tentang Kami | Namura Property",

  description:
    "Kenali Namura Property lebih dekat. Kami menghadirkan solusi properti dan hunian berkualitas dengan lokasi strategis untuk kebutuhan keluarga dan investasi Anda.",

  keywords: [
    "Namura Property",
    "tentang Namura Property",
    "profil Namura Property",
    "perusahaan properti Lampung",
    "properti Lampung",
    "developer properti Lampung",
    "hunian Lampung",
    "rumah Lampung",
    "investasi properti Lampung",
  ],

  alternates: {
    canonical: "https://namuraproperty.com/tentang-kami",
  },

  openGraph: {
    title: "Tentang Kami | Namura Property",

    description:
      "Kenali Namura Property dan komitmen kami dalam menghadirkan hunian berkualitas dengan lokasi strategis untuk kebutuhan keluarga dan investasi.",

    url: "https://namuraproperty.com/tentang-kami",

    siteName: "Namura Property",

    type: "website",

    locale: "id_ID",

    images: [
      {
        url: "https://namuraproperty.com/Logo/Namura.png",
        width: 1200,
        height: 630,
        alt: "Namura Property",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Tentang Kami | Namura Property",

    description:
      "Kenali Namura Property dan komitmen kami dalam menghadirkan hunian berkualitas dengan lokasi strategis.",

    images: [
      "https://namuraproperty.com/Logo/Namura.png",
    ],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function TentangKamiLayout({ children }) {
  return children;
}