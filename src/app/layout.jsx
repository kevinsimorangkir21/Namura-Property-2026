import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Toaster } from "sonner";

const BASE_URL = "https://namuraproperty.com";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Namura Property",
    template: "%s | Namura Property",
  },
  description:
    "Namura Property - Jual beli properti terpercaya di Lampung dan Indonesia. Temukan rumah, tanah, dan ruko terbaik dengan harga terjangkau.",
  keywords: [
    "properti",
    "rumah dijual",
    "tanah dijual",
    "investasi properti",
    "real estate Lampung",
    "jual beli properti Indonesia",
    "Namura Property",
  ],
  authors: [{ name: "Namura Property" }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: BASE_URL,
    siteName: "Namura Property",
    title: "Namura Property",
    description:
      "Namura Property - Jual beli properti terpercaya di Lampung dan Indonesia.",
    images: [{ url: "/Logo/Namura.png", width: 200, height: 200, alt: "Namura Property" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Namura Property",
    description: "Jual beli properti terpercaya di Lampung dan Indonesia.",
    images: ["/Logo/Namura.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-[var(--background)] text-gray-900 antialiased">
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
