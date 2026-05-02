"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Beranda", href: "/" },
    { name: "Daftar Properti", href: "/daftar-properti" },
    { name: "Tentang Kami", href: "/tentang-kami" },
    { name: "Artikel", href: "/artikel" },
    { name: "Karir", href: "/karir" },
    { name: "Kontak", href: "/kontak" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-white/80 shadow-sm border-b border-gray-100"
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <Image src="/Logo/Namura.png" alt="Logo Perusahaan" width={40} height={40} />
        </Link>

        {/* NAVIGATION */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative transition ${
                  isActive
                    ? "text-black font-semibold"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {item.name}

                {/* ACTIVE LINE */}
                <span
                  className={`absolute -bottom-2 left-0 h-[2px] bg-black rounded-full transition-all ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* MOBILE MENU */}
        <button className="md:hidden text-black text-xl">
          ☰
        </button>

      </div>
    </header>
  );
}