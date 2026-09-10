import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Toaster } from "sonner";

const BASE_URL = "https://namuraproperty.com";

export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Namura Property | Hunian Berkualitas di Lampung",
    template: "%s | Namura Property",
  },

  description:
    "Temukan rumah, tanah, ruko, dan properti pilihan di Lampung bersama Namura Property. Informasi properti yang transparan dan pendampingan profesional untuk kebutuhan hunian maupun investasi.",

  keywords: [
    "Namura Property",
    "property Lampung",
    "properti Lampung",
    "rumah dijual Lampung",
    "rumah dijual Bandar Lampung",
    "tanah dijual Lampung",
    "ruko dijual Lampung",
    "investasi properti Lampung",
    "jual beli properti",
    "real estate Lampung",
  ],

  authors: [
    {
      name: "Namura Property",
      url: BASE_URL,
    },
  ],

  creator: "Namura Property",
  publisher: "Namura Property",

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

  alternates: {
    canonical: BASE_URL,
  },

  openGraph: {
    type: "website",
    locale: "id_ID",
    url: BASE_URL,
    siteName: "Namura Property",

    title: "Namura Property | Hunian Berkualitas di Lampung",

    description:
      "Temukan rumah, tanah, ruko, dan properti pilihan di Lampung bersama Namura Property.",

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
    card: "summary_large_image",

    title: "Namura Property | Hunian Berkualitas di Lampung",

    description:
      "Temukan rumah, tanah, ruko, dan properti pilihan di Lampung bersama Namura Property.",

    images: ["/Logo/Namura.png"],
  },

  icons: {
    icon: "/Logo/favicon.ico",
    apple: "/Logo/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-[var(--background)] text-[var(--foreground)] antialiased">
        <LayoutWrapper>{children}</LayoutWrapper>

        <Toaster
          position="top-right"
          richColors
          closeButton
          expand={false}
          duration={4000}
        />
      </body>
    </html>
  );
}