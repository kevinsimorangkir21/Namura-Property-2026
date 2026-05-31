"use client";

import Link from "next/link";
import { useState } from "react";
import { Bell, Send, Search, Trash2, Eye } from "lucide-react";

/* ================= ICONS ================= */

const IconSend = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const IconDraft = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const IconToday = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

/* ================= STAT CARD ================= */

function StatCard({ label, value, icon, accentIcon }) {
  return (
    <div className="bg-white rounded-2xl border border-black/[0.06] p-5 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${accentIcon}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-semibold text-gray-900 tracking-tight leading-none">
          {value}
        </p>
        <p className="text-xs text-gray-400 mt-1">{label}</p>
      </div>
    </div>
  );
}

/* ================= PAGE ================= */

export default function NotifikasiPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [broadcastTitle, setBroadcastTitle] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");

  const notifications = [
    {
      id: 1,
      title: "Properti Baru Ditambahkan",
      message: "Rumah Minimalis Lampung berhasil dipublikasikan.",
      date: "30 Mei 2026",
      status: "Terkirim",
    },
    {
      id: 2,
      title: "Artikel Dipublish",
      message: "Artikel Investasi Properti untuk Pemula telah dipublish.",
      date: "29 Mei 2026",
      status: "Terkirim",
    },
    {
      id: 3,
      title: "User Baru",
      message: "Marketing baru berhasil ditambahkan ke sistem.",
      date: "28 Mei 2026",
      status: "Draft",
    },
  ];

  const filtered = notifications.filter((item) => {
    const matchSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "all" || item.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="flex flex-col gap-7">

      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Manage Notifikasi
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Kelola notifikasi dan broadcast sistem.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#0F6A6A] text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:opacity-90 active:scale-[.98] transition flex-shrink-0">
          <Send size={16} />
          <span className="hidden sm:inline">Kirim Notifikasi</span>
          <span className="sm:hidden">Kirim</span>
        </button>
      </div>

      {/* STATS */}
      <div className="grid sm:grid-cols-4 gap-4">
        <StatCard
          label="Total Notifikasi"
          value={48}
          icon={<Bell size={20} />}
          accentIcon="bg-gray-100 text-gray-500"
        />
        <StatCard
          label="Terkirim"
          value={42}
          icon={<IconSend />}
          accentIcon="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          label="Draft"
          value={6}
          icon={<IconDraft />}
          accentIcon="bg-amber-50 text-amber-600"
        />
        <StatCard
          label="Hari Ini"
          value={12}
          icon={<IconToday />}
          accentIcon="bg-sky-50 text-sky-600"
        />
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">

        {/* TOOLBAR */}
        <div className="px-5 py-3.5 border-b border-black/[0.05] flex flex-wrap gap-3 items-center">
          <p className="text-sm font-medium text-gray-800 flex-1 min-w-0">
            Daftar Notifikasi
          </p>

          {/* SEARCH */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Search size={14} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari notifikasi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 w-48 sm:w-56 placeholder-gray-400 transition"
            />
          </div>

          {/* STATUS FILTER */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 transition"
          >
            <option value="all">Semua status</option>
            <option value="Terkirim">Terkirim</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/[0.05]">
                {["Judul", "Pesan", "Tanggal", "Status", ""].map((h, i) => (
                  <th
                    key={i}
                    className={`px-5 py-2.5 text-[11px] font-medium text-gray-400 uppercase tracking-wide ${
                      i === 4 ? "text-right" : "text-left"
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-black/[0.04]">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-16 text-center text-sm text-gray-400"
                  >
                    Tidak ada notifikasi ditemukan.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/70 transition">

                    {/* TITLE */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#0F6A6A]/10 flex items-center justify-center flex-shrink-0">
                          <Bell size={15} className="text-[#0F6A6A]" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 whitespace-nowrap">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            ID #{item.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* MESSAGE */}
                    <td className="px-5 py-3.5 text-xs text-gray-500 max-w-xs truncate">
                      {item.message}
                    </td>

                    {/* DATE */}
                    <td className="px-5 py-3.5 text-xs text-gray-500 whitespace-nowrap">
                      {item.date}
                    </td>

                    {/* STATUS */}
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex text-[11px] font-medium px-2.5 py-0.5 rounded-full ring-1 ${
                          item.status === "Terkirim"
                            ? "bg-emerald-50 text-emerald-700 ring-emerald-200/80"
                            : "bg-amber-50 text-amber-700 ring-amber-200/80"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
<Link
  href={`/admin/notifikasi/detail/${item.id}`}
  className="
    w-8 h-8
    rounded-lg
    border border-black/[0.08]
    flex items-center justify-center
    text-gray-500
    hover:bg-gray-100
    hover:text-gray-900
    transition
  "
>
  <Eye size={14} />
</Link>
                        <button className="w-8 h-8 rounded-lg border border-red-200 flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 transition">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="px-5 py-3 border-t border-black/[0.05] flex items-center justify-between text-xs text-gray-400">
          <span>
            Menampilkan{" "}
            <span className="font-medium text-gray-600">{filtered.length}</span>{" "}
            dari{" "}
            <span className="font-medium text-gray-600">{notifications.length}</span>{" "}
            notifikasi
          </span>
          {(search || statusFilter !== "all") && (
            <button
              onClick={() => { setSearch(""); setStatusFilter("all"); }}
              className="text-[#0F6A6A] hover:opacity-70 transition font-medium"
            >
              Reset filter
            </button>
          )}
        </div>

      </div>

      {/* QUICK BROADCAST */}
      <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
        <div className="px-5 py-3.5 border-b border-black/[0.05]">
          <p className="text-sm font-medium text-gray-800">Quick Broadcast</p>
          <p className="text-xs text-gray-400 mt-0.5">
            Kirim notifikasi langsung ke seluruh pengguna.
          </p>
        </div>

        <div className="p-5 flex flex-col gap-3">
          <input
            value={broadcastTitle}
            onChange={(e) => setBroadcastTitle(e.target.value)}
            placeholder="Judul notifikasi"
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 placeholder-gray-400 transition"
          />
          <textarea
            rows={4}
            value={broadcastMessage}
            onChange={(e) => setBroadcastMessage(e.target.value)}
            placeholder="Tulis pesan notifikasi..."
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 placeholder-gray-400 transition resize-none"
          />
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => { setBroadcastTitle(""); setBroadcastMessage(""); }}
              className="px-4 py-2 text-sm rounded-xl border border-black/[0.08] text-gray-600 hover:bg-gray-50 transition"
            >
              Bersihkan
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-[#0F6A6A] text-white hover:opacity-90 active:scale-[.98] transition">
              <Send size={14} />
              Kirim Broadcast
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}