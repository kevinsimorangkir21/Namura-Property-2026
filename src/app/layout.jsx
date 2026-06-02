import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Toaster } from "sonner";

export const metadata = {
  title: {
    default: "Namura Property",
    template: "%s | Namura Property",
  },
  description:
    "Perusahaan properti terpercaya yang menyediakan hunian modern dan investasi berkualitas.",
  keywords: [
    "properti",
    "rumah",
    "investasi properti",
    "real estate Indonesia",
  ],
  metadataBase: new URL("https://namura-property.com"),
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