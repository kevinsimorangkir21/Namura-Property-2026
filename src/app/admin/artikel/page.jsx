"use client";

import Image from "next/image";
import { useState } from "react";
import { Search, Plus, Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

/* ================= ICONS ================= */

const IconNews = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
  </svg>
);

const IconCheck = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconDraft = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const IconCategory = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
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

export default function ArtikelPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const articles = [
    {
      id: 1,
      title: "Tips Investasi Properti untuk Pemula",
      category: "Investasi",
      status: "Published",
      date: "12 Mei 2026",
      image: "/a1.jpg",
    },
    {
      id: 2,
      title: "Tren Desain Rumah Modern 2026",
      category: "Desain",
      status: "Published",
      date: "10 Mei 2026",
      image: "/a2.jpg",
    },
    {
      id: 3,
      title: "Cara Memilih Lokasi Properti Strategis",
      category: "Tips",
      status: "Draft",
      date: "08 Mei 2026",
      image: "/a3.jpg",
    },
  ];

  const filtered = articles.filter((item) => {
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
            Manage Artikel
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Kelola artikel dan konten website Namura Property.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#0F6A6A] text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:opacity-90 active:scale-[.98] transition flex-shrink-0">
          <Plus size={16} />
          <span className="hidden sm:inline">Tambah Artikel</span>
          <span className="sm:hidden">Tambah</span>
        </button>
      </div>

      {/* STATS */}
      <div className="grid sm:grid-cols-4 gap-4">
        <StatCard
          label="Total Artikel"
          value={24}
          icon={<IconNews />}
          accentIcon="bg-gray-100 text-gray-500"
        />
        <StatCard
          label="Published"
          value={18}
          icon={<IconCheck />}
          accentIcon="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          label="Draft"
          value={6}
          icon={<IconDraft />}
          accentIcon="bg-amber-50 text-amber-600"
        />
        <StatCard
          label="Kategori"
          value={8}
          icon={<IconCategory />}
          accentIcon="bg-purple-50 text-purple-600"
        />
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">

        {/* TOOLBAR */}
        <div className="px-5 py-3.5 border-b border-black/[0.05] flex flex-wrap gap-3 items-center">
          <p className="text-sm font-medium text-gray-800 flex-1 min-w-0">
            Daftar Artikel
          </p>

          {/* SEARCH */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Search size={14} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari artikel..."
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
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/[0.05]">
                {["Artikel", "Kategori", "Tanggal", "Status", ""].map(
                  (h, i) => (
                    <th
                      key={i}
                      className={`px-5 py-2.5 text-[11px] font-medium text-gray-400 uppercase tracking-wide ${
                        i === 4 ? "text-right" : "text-left"
                      }`}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-black/[0.04]">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-16 text-center text-sm text-gray-400"
                  >
                    Tidak ada artikel ditemukan.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50/70 transition"
                  >
                    {/* ARTICLE */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-11 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-black/[0.05]">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={64}
                            height={44}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 truncate max-w-[220px]">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            ID #{item.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* CATEGORY */}
                    <td className="px-5 py-3.5">
                      <span className="inline-flex text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-black/[0.05]">
                        {item.category}
                      </span>
                    </td>

                    {/* DATE */}
                    <td className="px-5 py-3.5 text-xs text-gray-500">
                      {item.date}
                    </td>

                    {/* STATUS */}
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex text-[11px] font-medium px-2.5 py-0.5 rounded-full ${
                          item.status === "Published"
                            ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/80"
                            : "bg-amber-50 text-amber-700 ring-1 ring-amber-200/80"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <Link
  href={`/admin/artikel/detail/${item.id}`}
  className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
>
  <Eye size={16} />
</Link>
                        <Link
                          href={`/admin/artikel/edit/${item.id}`}
                          className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Pencil size={16} />
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
            <span className="font-medium text-gray-600">{articles.length}</span>{" "}
            artikel
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
    </div>
  );
}