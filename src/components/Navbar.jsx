"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Bell } from "lucide-react";
import { API_URL } from "@/lib/api";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Notification state
  const [notifications, setNotifications] = useState([]);
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check auth state
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!(token && user));
  }, [pathname]);

  // Fetch notifications when logged in
  useEffect(() => {
    if (!isLoggedIn) return;

    async function fetchNotifications() {
      try {
        setNotifLoading(true);
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${API_URL}/api/notifications`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.ok) {
          const data = await res.json();
          setNotifications(data || []);
        }
      } catch (err) {
        // Silently fail
      } finally {
        setNotifLoading(false);
      }
    }
    fetchNotifications();
  }, [isLoggedIn]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.length;
  const latestNotifs = notifications
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const navItems = [
    { name: "Beranda", href: "/" },
    { name: "Daftar Properti", href: "/daftar-properti" },
    { name: "Tentang Kami", href: "/tentang-kami" },
    { name: "Artikel", href: "/artikel" },
    { name: "Kontak", href: "/kontak" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm"
        : "bg-white"
        }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <Image
              src="/Logo/Namura_Property1.png"
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
                  className={`relative text-sm transition-all duration-200 group ${isActive
                    ? "text-[#0F6A6A] font-semibold"
                    : "text-gray-500 hover:text-black"
                    }`}
                >
                  {item.name}
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 -bottom-3 h-1 rounded-full bg-[#0F6A6A] transition-all duration-300 ${isActive
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

            {/* Notification Bell (only when logged in) */}
            {isLoggedIn && (
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="relative w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
                >
                  <Bell size={18} className="text-gray-600" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown */}
                {notifOpen && (
                  <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">Notifikasi</p>
                    </div>

                    <div className="max-h-80 overflow-y-auto">
                      {notifLoading ? (
                        <div className="px-4 py-6 text-center text-sm text-gray-400">
                          Memuat...
                        </div>
                      ) : latestNotifs.length === 0 ? (
                        <div className="px-4 py-6 text-center text-sm text-gray-400">
                          Tidak ada notifikasi
                        </div>
                      ) : (
                        latestNotifs.map((notif) => (
                          <div
                            key={notif.id}
                            className="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition"
                          >
                            <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{notif.message}</p>
                            <p className="text-[10px] text-gray-400 mt-1">{formatDate(notif.created_at)}</p>
                          </div>
                        ))
                      )}
                    </div>

                    <Link
                      href="/notifikasi"
                      onClick={() => setNotifOpen(false)}
                      className="block px-4 py-3 text-center text-sm font-medium text-[#0F6A6A] hover:bg-gray-50 border-t border-gray-100 transition"
                    >
                      Lihat Semua Notifikasi
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Auth Button */}
            {isLoggedIn ? (
              <Link
                href="/admin"
                className="px-5 py-2.5 rounded-full bg-[#0F6A6A] text-white text-sm font-medium hover:bg-[#0C5A5A] transition hover:-translate-y-0.5 shadow-sm"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-5 py-2.5 rounded-full bg-[#0F6A6A] text-white text-sm font-medium hover:bg-[#0C5A5A] transition hover:-translate-y-0.5 shadow-sm"
              >
                Login Admin
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Mobile notification bell */}
            {isLoggedIn && (
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="relative w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200"
                >
                  <Bell size={18} className="text-gray-600" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button>

                {/* Mobile Notification Dropdown */}
                {notifOpen && (
                  <div className="absolute right-0 top-12 w-72 bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">Notifikasi</p>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {latestNotifs.length === 0 ? (
                        <div className="px-4 py-6 text-center text-sm text-gray-400">
                          Tidak ada notifikasi
                        </div>
                      ) : (
                        latestNotifs.map((notif) => (
                          <div key={notif.id} className="px-4 py-3 border-b border-gray-50">
                            <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{notif.message}</p>
                            <p className="text-[10px] text-gray-400 mt-1">{formatDate(notif.created_at)}</p>
                          </div>
                        ))
                      )}
                    </div>
                    <Link
                      href="/notifikasi"
                      onClick={() => setNotifOpen(false)}
                      className="block px-4 py-3 text-center text-sm font-medium text-[#0F6A6A] hover:bg-gray-50 border-t border-gray-100"
                    >
                      Lihat Semua Notifikasi
                    </Link>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => setOpen(!open)}
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200"
            >
              <i className={`bi ${open ? "bi-x-lg" : "bi-list"} text-lg`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-[500px] opacity-100 pb-4" : "max-h-0 opacity-0"
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
                    className={`text-sm transition ${isActive
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
                  onClick={() => setOpen(false)}
                  className="w-full text-center py-3 rounded-full border border-gray-200 font-medium"
                >
                  Hubungi Kami
                </Link>

                {isLoggedIn ? (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="w-full text-center py-3 rounded-full bg-[#0F6A6A] text-white font-medium"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="w-full text-center py-3 rounded-full bg-[#0F6A6A] text-white font-medium"
                  >
                    Login Admin
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
