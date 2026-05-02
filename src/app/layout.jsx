import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  metadataBase: new URL("https://namura-property.com"), // ganti nanti domain kamu
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-[var(--background)] text-gray-900 antialiased">

        {/* NAVBAR */}
        <Navbar />

        {/* MAIN */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* FOOTER */}
        <Footer />

      </body>
    </html>
  );
}