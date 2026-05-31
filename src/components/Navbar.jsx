"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { name: "Beranda", href: "/" },
    { name: "Tentang Kami", href: "/tentang-kami" },
    { name: "Artikel", href: "/artikel" },
    { name: "Karir", href: "/karir" },
    { name: "Kontak", href: "/kontak" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm"
          : "bg-white"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <Image
              src="/Logo/Namura.png"
              alt="Namura Property"
              width={50}
              height={42}
              priority
              className="h-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href ||
                    pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative text-sm transition-all duration-200 group ${
                    isActive
                      ? "text-[#0F6A6A] font-semibold"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {item.name}

                  <span
                    className={`absolute left-1/2 -translate-x-1/2 -bottom-3 h-1 rounded-full bg-[#0F6A6A] transition-all duration-300 ${
                      isActive
                        ? "w-6 opacity-100"
                        : "w-0 opacity-0 group-hover:w-6 group-hover:opacity-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/kontak"
              className="px-5 py-2.5 rounded-full border border-gray-200 text-sm font-medium hover:bg-gray-50 transition"
            >
              Hubungi Kami
            </Link>

            <Link
              href="/admin/login"
              className="px-5 py-2.5 rounded-full bg-[#0F6A6A] text-white text-sm font-medium hover:bg-[#0C5A5A] transition hover:-translate-y-0.5 shadow-sm"
            >
              Login Admin
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200"
          >
            <i className={`bi ${open ? "bi-x-lg" : "bi-list"} text-lg`} />
          </button>
        </div>

        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            open
              ? "max-h-[500px] opacity-100 pb-4"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="rounded-3xl bg-white border border-gray-100 shadow-xl p-6">
            <div className="flex flex-col gap-5">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href ||
                      pathname.startsWith(item.href + "/");

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`text-sm transition ${
                      isActive
                        ? "text-[#0F6A6A] font-semibold"
                        : "text-gray-500"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                <Link
                  href="/kontak"
                  className="w-full text-center py-3 rounded-full border border-gray-200 font-medium"
                >
                  Hubungi Kami
                </Link>

                <Link
                  href="/admin/login"
                  className="w-full text-center py-3 rounded-full bg-[#0F6A6A] text-white font-medium"
                >
                  Login Admin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}