"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 🟢 status login

  // 🌓 Mode terang/gelap
  useEffect(() => {
    const darkMode = localStorage.getItem("theme") === "dark";
    setIsDark(darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  // 🧠 Simulasi login
  useEffect(() => {
    // Misal ambil dari localStorage atau auth context
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  // 📜 Efek scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/lowonganMagang", label: "Lowongan Magang" },
    { href: "/alur-pendaftaran", label: "Alur Pendaftaran" },
    { href: "/tentang", label: "Tentang" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-white/70 dark:bg-[#0b0f15]/70 border-b border-gray-200/40 dark:border-white/10 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-4">
        {/* 🔹 Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.img
            src="/MagangHub.svg"
            alt="Logo MagangHub"
            className="w-9 h-9"
            whileHover={{ rotate: 10, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <span className="font-bold text-lg text-gray-800 dark:text-white group-hover:text-blue-500 transition">
            MagangHub
          </span>
        </Link>

        {/* 🔹 Menu Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative transition-all duration-300 ${
                  active
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="activeLink"
                    className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* 🔹 Kanan */}
        <div className="flex items-center gap-3">
          {/* Jika BELUM LOGIN */}
          {!isLoggedIn ? (
            <button
              onClick={() => {
                // simulasi login
                localStorage.setItem("user", "Kevin");
                setIsLoggedIn(true);
              }}
              className="hidden md:inline-flex bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-2 rounded-xl font-medium hover:shadow-lg hover:scale-[1.03] transition duration-300 shadow-sm"
            >
              Masuk / Daftar
            </button>
          ) : (
            // Jika SUDAH LOGIN
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="hidden md:inline-flex bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-2 rounded-xl font-medium hover:shadow-lg hover:scale-[1.03] transition duration-300 shadow-sm"
              >
                Dashboard
              </Link>

              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  setIsLoggedIn(false);
                }}
                className="text-sm text-red-500 hover:text-red-600 font-medium"
              >
                Keluar
              </button>

              <img
                src="/avatar.jpg"
                alt="User"
                className="w-9 h-9 rounded-full border border-gray-300 dark:border-gray-700"
              />
            </div>
          )}


          {/* 🍔 Tombol Mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-700 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-700 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m0 6H4" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 🔹 Menu Mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 w-full bg-white/90 dark:bg-[#0b0f15]/90 backdrop-blur-xl border-t border-gray-200/40 dark:border-white/10 shadow-lg"
          >
            <div className="flex flex-col py-4 px-6 space-y-3">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-2 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50/60 dark:bg-blue-500/10"
                        : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {!isLoggedIn ? (
                <button
                  onClick={() => {
                    localStorage.setItem("user", "Kevin");
                    setIsLoggedIn(true);
                    setMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-2 rounded-xl font-medium hover:shadow-lg transition duration-300"
                >
                  Masuk / Daftar
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-2 rounded-xl font-medium hover:shadow-lg transition duration-300 text-center"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      localStorage.removeItem("user");
                      setIsLoggedIn(false);
                      setMenuOpen(false);
                    }}
                    className="w-full text-red-500 hover:text-red-600 font-medium text-sm py-2"
                  >
                    Keluar
                  </button>
                </div>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
