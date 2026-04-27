"use client";
import { useState } from "react";
import {
  Users,
  Briefcase,
  Building2,
  FileText,
  ClipboardList,
  MessageSquare,
  Star,
  Bell,
} from "lucide-react";

export default function AdminDashboard() {
  const [laporan, setLaporan] = useState([
    {
      id: 1,
      nama: "Kevin Simorangkir",
      perusahaan: "PT Telkom Indonesia",
      file: "Laporan-Mingguan-Kevin.pdf",
      tanggal: "2025-10-18",
    },
    {
      id: 2,
      nama: "Sinta Dewi",
      perusahaan: "PT Pertamina",
      file: "Laporan-Mingguan-Sinta.pdf",
      tanggal: "2025-10-19",
    },
  ]);

  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      nama: "Kevin Simorangkir",
      perusahaan: "PT Telkom Indonesia",
      rating: 5,
      kategori: "Feedback Magang",
    },
    {
      id: 2,
      nama: "Mentor Budi",
      perusahaan: "PT Astra International",
      rating: 4,
      kategori: "Feedback Mentor",
    },
  ]);

  const [notifikasi] = useState([
    { id: 1, pesan: "Peserta baru mendaftar program magang.", waktu: "10 menit lalu" },
    { id: 2, pesan: "2 laporan mingguan baru diunggah hari ini.", waktu: "1 jam lalu" },
    { id: 3, pesan: "Feedback baru diterima dari peserta.", waktu: "3 jam lalu" },
  ]);

  const stats = [
    { label: "Total Peserta", value: "1.254", icon: Users, color: "blue" },
    { label: "Perusahaan Terdaftar", value: "48", icon: Building2, color: "indigo" },
    { label: "Lowongan Aktif", value: "86", icon: Briefcase, color: "green" },
    { label: "Lamaran Masuk", value: "329", icon: FileText, color: "yellow" },
  ];

  return (
    <div className="space-y-10">
      {/* 🧭 Header */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Selamat Datang, Admin 👋</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Kelola data peserta, laporan, dan feedback magang melalui dashboard ini.
        </p>
      </div>

      {/* 📊 Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <div
            key={i}
            className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#141a23] shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-full ${
                  item.color === "blue"
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    : item.color === "green"
                    ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                    : item.color === "indigo"
                    ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                    : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                }`}
              >
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {item.value}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 📋 Laporan Mingguan */}
      <section>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-blue-500" /> Laporan Mingguan
        </h3>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-[#1a1f2b] text-gray-700 dark:text-gray-300">
              <tr>
                <th className="py-3 px-4 text-left">Nama</th>
                <th className="py-3 px-4 text-left">Perusahaan</th>
                <th className="py-3 px-4 text-left">File</th>
                <th className="py-3 px-4 text-left">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {laporan.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5 transition"
                >
                  <td className="py-3 px-4">{item.nama}</td>
                  <td className="py-3 px-4">{item.perusahaan}</td>
                  <td className="py-3 px-4 text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                    {item.file}
                  </td>
                  <td className="py-3 px-4 text-gray-500">{item.tanggal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 💬 Feedback Magang & Mentor */}
      <section>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-green-500" /> Feedback Terbaru
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {feedbacks.map((fb) => (
            <div
              key={fb.id}
              className="p-5 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-[#141a23] shadow-sm"
            >
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-semibold text-blue-600 dark:text-blue-400">
                  {fb.nama}
                </h4>
                <span className="text-xs text-gray-500">{fb.kategori}</span>
              </div>
              <p className="text-sm text-gray-500 mb-2">{fb.perusahaan}</p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < fb.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔔 Notifikasi */}
      <section>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Bell className="w-5 h-5 text-yellow-500" /> Aktivitas Terbaru
        </h3>
        <div className="bg-white dark:bg-[#141a23] border border-gray-200 dark:border-gray-800 rounded-xl p-5 space-y-3">
          {notifikasi.map((n) => (
            <div
              key={n.id}
              className="flex justify-between items-center border-b last:border-none border-gray-100 dark:border-gray-800 pb-2"
            >
              <p className="text-sm text-gray-700 dark:text-gray-300">{n.pesan}</p>
              <span className="text-xs text-gray-500">{n.waktu}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
