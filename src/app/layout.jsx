import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

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
      </body>
    </html>
  );
}