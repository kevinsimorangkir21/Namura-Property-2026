"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Building2,
  Briefcase,
  FileText,
  Bell,
  LogOut,
  ClipboardList,
  MessageSquare,
  BarChart3,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [showNotif, setShowNotif] = useState(false);

  const menuItems = [
    {
      section: "Manajemen",
      items: [
        { href: "/admin", label: "Dashboard", icon: Home },
        { href: "/admin/peserta", label: "Peserta", icon: Users },
        { href: "/admin/perusahaan", label: "Perusahaan", icon: Building2 },
        { href: "/admin/lowongan", label: "Lowongan", icon: Briefcase },
        { href: "/admin/lamaran", label: "Lamaran", icon: FileText },
      ],
    },
    {
      section: "Magang & Laporan",
      items: [
        {
          href: "/admin/laporan",
          label: "Laporan Magang",
          icon: ClipboardList,
        },
        {
          href: "/admin/feedback",
          label: "Feedback",
          icon: MessageSquare,
        },
        {
          href: "/admin/status",
          label: "Status Lamaran",
          icon: BarChart3,
        },
      ],
    },
    {
      section: "Sistem",
      items: [
        { href: "/admin/notifikasi", label: "Notifikasi", icon: Bell },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-[#0b0f15] text-gray-800 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-72 sticky top-0 h-screen bg-white dark:bg-[#141a23] border-r border-gray-200 dark:border-gray-800 flex flex-col justify-between shadow-md">
        <div className="p-6 overflow-y-auto">
          <h1 className="text-xl font-bold mb-8 text-blue-600 dark:text-blue-400">
            MagangHub Admin
          </h1>

          {menuItems.map((section, idx) => (
            <div key={idx} className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                {section.section}
              </h3>
              <ul className="space-y-1.5">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                        pathname === item.href
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                          : "hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-gray-100 dark:border-gray-800">
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition">
            <LogOut className="w-4 h-4" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Konten Utama */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 flex items-center justify-between px-10 py-4 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-[#141a23]/80 backdrop-blur-md">
          <h2 className="font-semibold text-lg capitalize">
            {pathname.split("/").pop() || "Dashboard Admin"}
          </h2>

          <div className="flex items-center gap-6">
            {/* Notifikasi */}
            <button
              onClick={() => setShowNotif(!showNotif)}
              className="relative"
            >
              <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            </button>

            {/* Profil Admin */}
            <div className="flex items-center gap-3">
              <img
                src="/avatar.jpg"
                alt="Admin"
                className="w-9 h-9 rounded-full border border-gray-300 dark:border-gray-700"
              />
              <span className="text-sm font-medium">Admin MagangHub</span>
            </div>
          </div>
        </header>

        {/* Isi Halaman */}
        <div className="flex-1 p-10 overflow-y-auto">
          <div className="max-w-6xl mx-auto bg-white dark:bg-[#141a23] p-8 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
