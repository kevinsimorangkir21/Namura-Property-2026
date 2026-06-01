"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { apiFetch } from "@/lib/api";

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

/* ================= PAGE ================= */

export default function ArtikelPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    try {
      setLoading(true);
      setError("");
      const data = await apiFetch("/api/articles");
      setArticles(data || []);
    } catch (err) {
      setError(err.message || "Gagal memuat data artikel.");
    } finally {
      setLoading(false);
    }
  }

  const filtered = articles.filter((item) => {
    const matchSearch = (item.title || "")
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "all" ||
      (item.status || "").toLowerCase() === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  const totalPublished = articles.filter(
    (a) => (a.status || "").toLowerCase() === "published"
  ).length;
  const totalDraft = articles.filter(
    (a) => (a.status || "").toLowerCase() === "draft"
  ).length;

  const handleDelete = async (id) => {
    try {
      await apiFetch(`/api/articles/${id}`, { method: "DELETE" });
      setArticles((prev) => prev.filter((a) => a.id !== id));
      setDeleteTarget(null);
    } catch (err) {
      setError(err.message || "Gagal menghapus artikel.");
      setDeleteTarget(null);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col gap-7">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Manage Artikel</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Kelola artikel dan konten website Namura Property.
          </p>
        </div>
        <Link
          href="/admin/artikel/tambah"
          className="flex items-center gap-2 bg-[#0F6A6A] text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:opacity-90 active:scale-[.98] transition flex-shrink-0"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">Tambah Artikel</span>
          <span className="sm:hidden">Tambah</span>
        </Link>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      {/* STATS */}
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Artikel"
          value={loading ? "..." : articles.length}
          icon={<IconNews />}
          accentIcon="bg-gray-100 text-gray-500"
        />
        <StatCard
          label="Published"
          value={loading ? "..." : totalPublished}
          icon={<IconCheck />}
          accentIcon="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          label="Draft"
          value={loading ? "..." : totalDraft}
          icon={<IconDraft />}
          accentIcon="bg-amber-50 text-amber-600"
        />
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
        {/* TOOLBAR */}
        <div className="px-5 py-3.5 border-b border-black/[0.05] flex flex-wrap gap-3 items-center">
          <p className="text-sm font-medium text-gray-800 flex-1 min-w-0">
            Daftar Artikel
          </p>

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

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 transition"
          >
            <option value="all">Semua status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/[0.05]">
                {["Judul", "Status", "Tanggal", "Penulis", ""].map((h, i) => (
                  <th
                    key={i}
                    className={`px-5 py-2.5 text-[11px] font-medium text-gray-400 uppercase tracking-wide ${i === 4 ? "text-right" : "text-left"
                      }`}
                  >
                    {h}
                  </th>
                ))}
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
                    Tidak ada artikel ditemukan.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/70 transition">
                    <td className="px-5 py-3.5">
                      <div>
                        <p className="font-medium text-gray-900 truncate max-w-[280px]">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          ID #{item.id}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex text-[11px] font-medium px-2.5 py-0.5 rounded-full ring-1 ${(item.status || "").toLowerCase() === "published"
                            ? "bg-emerald-50 text-emerald-700 ring-emerald-200/80"
                            : "bg-amber-50 text-amber-700 ring-amber-200/80"
                          }`}
                      >
                        {item.status || "Draft"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-500">
                      {formatDate(item.created_at)}
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-500">
                      {item.author_name || "-"}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/artikel/detail/${item.id}`}
                          className="w-8 h-8 rounded-lg border border-black/[0.08] flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition"
                        >
                          <Eye size={14} />
                        </Link>
                        <Link
                          href={`/admin/artikel/edit/${item.id}`}
                          className="w-8 h-8 rounded-lg border border-black/[0.08] flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition"
                        >
                          <Pencil size={14} />
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(item)}
                          className="w-8 h-8 rounded-lg border border-red-200 flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 transition"
                        >
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

      {/* DELETE MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-sm font-semibold text-gray-900">Hapus Artikel?</h3>
            <p className="text-xs text-gray-500 mt-1.5">
              <span className="font-medium text-gray-700">{deleteTarget.title}</span> akan dihapus permanen.
            </p>
            <div className="flex gap-2 mt-5">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 px-4 py-2 text-sm rounded-xl border text-gray-600 hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteTarget.id)}
                className="flex-1 px-4 py-2 text-sm rounded-xl bg-red-500 text-white font-medium hover:bg-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
