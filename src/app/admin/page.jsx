"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

/* ================= ICONS ================= */

const IconEdit = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const IconTrash = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const IconView = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const IconSearch = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" strokeWidth={1.8} />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-4.35-4.35" />
  </svg>
);

const IconPlus = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const IconBuilding = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const IconArticle = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const IconUsers = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const IconBell = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

/* ================= STAT CARD ================= */

function StatCard({ label, value, icon, accentIcon, loading }) {
  return (
    <div className="bg-white rounded-2xl border border-black/[0.06] p-5 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${accentIcon}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-semibold text-gray-900 tracking-tight leading-none">
          {loading ? "..." : value}
        </p>
        <p className="text-xs text-gray-400 mt-1">{label}</p>
      </div>
    </div>
  );
}

/* ================= DELETE MODAL ================= */

function DeleteModal({ item, onConfirm, onCancel }) {
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl border border-black/[0.08] p-6 w-full max-w-sm">
        <div className="w-10 h-10 rounded-xl bg-red-50 text-red-400 flex items-center justify-center mb-4">
          <IconTrash />
        </div>
        <h3 className="text-sm font-semibold text-gray-900">Hapus Properti?</h3>
        <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
          <span className="font-medium text-gray-700">{item.title}</span> akan
          dihapus secara permanen dan tidak bisa dikembalikan.
        </p>
        <div className="flex gap-2 mt-5">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 text-sm rounded-xl border border-black/[0.08] text-gray-600 hover:bg-gray-50 transition"
          >
            Batal
          </button>
          <button
            onClick={() => onConfirm(item.id)}
            className="flex-1 px-4 py-2 text-sm rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= PAGE ================= */

export default function AdminPage() {
  const [properties, setProperties] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Fetch dashboard stats and properties
  useEffect(() => {
    async function fetchData() {
      try {
        const [statsData, propertiesData] = await Promise.all([
          apiFetch("/api/dashboard/stats"),
          apiFetch("/api/properties"),
        ]);
        setStats(statsData);
        setProperties(propertiesData || []);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // debounce search
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 300);
    return () => clearTimeout(t);
  }, [searchInput]);

  const filtered = properties.filter((p) => {
    const matchSearch =
      (p.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.location || "").toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ||
      (p.type || "").toLowerCase() === filter;
    return matchSearch && matchFilter;
  });

  const handleDelete = async (id) => {
    try {
      await apiFetch(`/api/properties/${id}`, { method: "DELETE" });
      setProperties((prev) => prev.filter((p) => p.id !== id));
      setDeleteTarget(null);
    } catch (err) {
      console.error("Failed to delete property:", err);
    }
  };

  const formatPrice = (price) => {
    if (!price) return "-";
    return `Rp ${Number(price).toLocaleString("id-ID")}`;
  };

  const filterLabels = { all: "Semua", jual: "Dijual", sewa: "Disewa" };

  return (
    <>
      <DeleteModal
        item={deleteTarget}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <div className="flex flex-col gap-7">

        {/* HEADER */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Kelola semua properti & data website
            </p>
          </div>
          <Link
            href="/admin/properti/tambah"
            className="flex items-center gap-2 bg-[#0F6A6A] text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:opacity-90 active:scale-[.98] transition"
          >
            <IconPlus />
            <span className="hidden sm:inline">Tambah Properti</span>
            <span className="sm:hidden">Tambah</span>
          </Link>
        </div>

        {/* STATS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Properti"
            value={stats?.total_properties ?? 0}
            icon={<IconBuilding />}
            accentIcon="bg-gray-100 text-gray-500"
            loading={loading}
          />
          <StatCard
            label="Total Artikel"
            value={stats?.total_articles ?? 0}
            icon={<IconArticle />}
            accentIcon="bg-emerald-50 text-emerald-600"
            loading={loading}
          />
          <StatCard
            label="Total User"
            value={stats?.total_users ?? 0}
            icon={<IconUsers />}
            accentIcon="bg-sky-50 text-sky-600"
            loading={loading}
          />
          <StatCard
            label="Total Notifikasi"
            value={stats?.total_notifications ?? 0}
            icon={<IconBell />}
            accentIcon="bg-amber-50 text-amber-600"
            loading={loading}
          />
        </div>

        {/* TABLE CARD */}
        <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">

          {/* TOOLBAR */}
          <div className="px-5 py-3.5 border-b border-black/[0.05] flex flex-wrap gap-3 items-center">
            <p className="text-sm font-medium text-gray-800 flex-1 min-w-0">
              Daftar Properti
            </p>

            {/* SEARCH */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <IconSearch />
              </div>
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Cari nama atau lokasi..."
                className="pl-9 pr-3 py-1.5 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 w-48 sm:w-56 placeholder-gray-400 transition"
              />
            </div>

            {/* FILTER TABS */}
            <div className="flex bg-gray-100 rounded-lg p-0.5 text-xs font-medium gap-0.5">
              {Object.entries(filterLabels).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setFilter(val)}
                  className={`px-3 py-1.5 rounded-md transition ${filter === val
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/[0.05]">
                  {["Nama Properti", "Lokasi", "Harga", "Tipe", ""].map(
                    (h, i) => (
                      <th
                        key={i}
                        className={`px-5 py-2.5 text-[11px] font-medium text-gray-400 uppercase tracking-wide ${i === 4 ? "text-right" : "text-left"
                          }`}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-black/[0.04]">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-16 text-center text-sm text-gray-400">
                      Memuat data...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-16 text-center text-sm text-gray-400">
                      Tidak ada properti ditemukan.
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/70 transition">
                      <td className="px-5 py-3.5 font-medium text-gray-900 max-w-[200px] truncate">
                        {item.title}
                      </td>
                      <td className="px-5 py-3.5 text-gray-500 text-xs">
                        {item.location}
                      </td>
                      <td className="px-5 py-3.5 text-gray-800 font-medium">
                        {formatPrice(item.price)}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex text-[11px] font-medium px-2.5 py-0.5 rounded-full ${(item.type || "").toLowerCase() === "jual"
                            ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/80"
                            : "bg-sky-50 text-sky-700 ring-1 ring-sky-200/80"
                          }`}>
                          {(item.type || "").toLowerCase() === "jual" ? "Dijual" : "Disewa"}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/admin/properti/detail/${item.id}`}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
                          >
                            <IconView /> Lihat
                          </Link>
                          <Link
                            href={`/admin/properti/edit/${item.id}`}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
                          >
                            <IconEdit /> Edit
                          </Link>
                          <button
                            onClick={() => setDeleteTarget(item)}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          >
                            <IconTrash /> Hapus
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
              <span className="font-medium text-gray-600">{properties.length}</span> properti
            </span>
            {search && (
              <button
                onClick={() => { setSearchInput(""); setSearch(""); }}
                className="text-[#0F6A6A] hover:opacity-70 transition font-medium"
              >
                Reset pencarian
              </button>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
