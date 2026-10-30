import "./globals.css";
import { Inter } from "next/font/google";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Toaster } from "sonner";

const BASE_URL = "https://namuraproperty.com";
const SITE_NAME = "Namura Property";
const TITLE = "Namura Property | Hunian Berkualitas di Lampung";
const SHORT_DESCRIPTION =
  "Temukan rumah, tanah, ruko, dan properti pilihan di Lampung bersama Namura Property.";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0f6a6a" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1515" },
  ],
};

export const metadata = {
  metadataBase: new URL(BASE_URL),
  applicationName: SITE_NAME,
  category: "real estate",

  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
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

  authors: [{ name: SITE_NAME, url: BASE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
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

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "id_ID",
    url: BASE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: SHORT_DESCRIPTION,
    images: [
      {
        url: "/Logo/Namura.png",
        width: 200,
        height: 200,
        alt: SITE_NAME,
      },
    ],
  },

  twitter: {
    card: "summary",
    title: TITLE,
    description: SHORT_DESCRIPTION,
    images: ["/Logo/Namura.png"],
  },

  icons: {
    icon: "/Logo/favicon.ico",
    shortcut: "/Logo/favicon.ico",
    apple: "/Logo/Namura.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: SITE_NAME,
  url: BASE_URL,
  logo: `${BASE_URL}/Logo/Namura.png`,
  image: `${BASE_URL}/Logo/Namura.png`,
  description: SHORT_DESCRIPTION,
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Lampung",
  },
};

const toastStyle = {
  background: "var(--glass-bg-strong)",
  color: "var(--foreground)",
  border: "1px solid var(--glass-border)",
  borderRadius: "var(--radius-md)",
  boxShadow: "var(--shadow-glass)",
  WebkitBackdropFilter: "var(--blur-lg)",
  backdropFilter: "var(--blur-lg)",
  fontFamily: "inherit",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />

        <LayoutWrapper>{children}</LayoutWrapper>

        <Toaster
          position="top-right"
          closeButton
          expand={false}
          duration={4000}
          toastOptions={{ style: toastStyle }}
        />
      </body>
    </html>
  );
}