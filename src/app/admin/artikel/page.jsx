"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import DeleteModal from "@/components/ui/DeleteModal";
import { StatCardSkeleton, TableRowSkeleton } from "@/components/ui/Skeleton";

const IconNews = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>;
const IconCheck = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconDraft = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;

function StatCard({ label, value, icon, accentIcon }) {
  return (
    <div className="bg-white rounded-2xl border border-black/[0.06] p-5 flex items-center gap-4 hover:shadow-md hover:scale-[1.02] transition-all duration-200">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${accentIcon}`}>{icon}</div>
      <div>
        <p className="text-2xl font-semibold text-gray-900 tracking-tight leading-none">{value}</p>
        <p className="text-xs text-gray-400 mt-1">{label}</p>
      </div>
    </div>
  );
}

export default function ArtikelPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { fetchArticles(); }, []);

  async function fetchArticles() {
    try {
      setLoading(true);
      const data = await apiFetch("/api/articles");
      setArticles(data || []);
    } catch {
      toast.error("Gagal mengambil data artikel");
    } finally {
      setLoading(false);
    }
  }

  const filtered = articles.filter((item) => {
    const matchSearch = (item.title || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || (item.status || "").toLowerCase() === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await apiFetch(`/api/articles/${deleteTarget.id}`, { method: "DELETE" });
      setArticles((prev) => prev.filter((a) => a.id !== deleteTarget.id));
      toast.success("✓ Artikel berhasil dihapus");
      setDeleteTarget(null);
    } catch {
      toast.error("Gagal menghapus artikel");
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  };

  const totalPublished = articles.filter((a) => (a.status || "").toLowerCase() === "published").length;
  const totalDraft = articles.filter((a) => (a.status || "").toLowerCase() === "draft").length;

  return (
    <div className="flex flex-col gap-7">
      <DeleteModal
        open={!!deleteTarget}
        title="Hapus Artikel?"
        description={`"${deleteTarget?.title}" akan dihapus permanen dan tidak dapat dikembalikan.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Manage Artikel</h1>
          <p className="text-sm text-gray-400 mt-0.5">Kelola artikel dan konten website Namura Property.</p>
        </div>
        <Link href="/admin/artikel/tambah" className="flex items-center gap-2 bg-[#0F6A6A] text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:opacity-90 transition flex-shrink-0">
          <Plus size={16} /> <span className="hidden sm:inline">Tambah Artikel</span>
        </Link>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-3 gap-4">{[...Array(3)].map((_, i) => <StatCardSkeleton key={i} />)}</div>
      ) : (
        <div className="grid sm:grid-cols-3 gap-4">
          <StatCard label="Total Artikel" value={articles.length} icon={<IconNews />} accentIcon="bg-gray-100 text-gray-500" />
          <StatCard label="Published" value={totalPublished} icon={<IconCheck />} accentIcon="bg-emerald-50 text-emerald-600" />
          <StatCard label="Draft" value={totalDraft} icon={<IconDraft />} accentIcon="bg-amber-50 text-amber-600" />
        </div>
      )}

      <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
        <div className="px-5 py-3.5 border-b border-black/[0.05] flex flex-wrap gap-3 items-center">
          <p className="text-sm font-medium text-gray-800 flex-1 min-w-0">Daftar Artikel</p>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Cari artikel..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 pr-3 py-1.5 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 w-48 sm:w-56 transition" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none transition">
            <option value="all">Semua status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/[0.05]">
                {["Judul", "Status", "Tanggal", "Penulis", ""].map((h, i) => (
                  <th key={i} className={`px-5 py-2.5 text-[11px] font-medium text-gray-400 uppercase tracking-wide ${i === 4 ? "text-right" : "text-left"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04]">
              {loading ? (
                [...Array(4)].map((_, i) => <TableRowSkeleton key={i} cols={5} />)
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="py-16 text-center text-sm text-gray-400">Tidak ada artikel ditemukan.</td></tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/70 transition">
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-gray-900 truncate max-w-[280px]">{item.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">ID #{item.id}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex text-[11px] font-medium px-2.5 py-0.5 rounded-full ring-1 ${(item.status || "").toLowerCase() === "published" ? "bg-emerald-50 text-emerald-700 ring-emerald-200/80" : "bg-amber-50 text-amber-700 ring-amber-200/80"}`}>
                        {item.status || "Draft"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-500">{formatDate(item.created_at)}</td>
                    <td className="px-5 py-3.5 text-xs text-gray-500">{item.author_name || "-"}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/admin/artikel/detail/${item.id}`} className="w-8 h-8 rounded-lg border border-black/[0.08] flex items-center justify-center text-gray-500 hover:bg-gray-100 transition"><Eye size={14} /></Link>
                        <Link href={`/admin/artikel/edit/${item.id}`} className="w-8 h-8 rounded-lg border border-black/[0.08] flex items-center justify-center text-gray-500 hover:bg-gray-100 transition"><Pencil size={14} /></Link>
                        <button onClick={() => setDeleteTarget(item)} className="w-8 h-8 rounded-lg border border-red-200 flex items-center justify-center text-red-400 hover:bg-red-50 transition"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-black/[0.05] flex items-center justify-between text-xs text-gray-400">
          <span>Menampilkan <span className="font-medium text-gray-600">{filtered.length}</span> dari <span className="font-medium text-gray-600">{articles.length}</span> artikel</span>
          {(search || statusFilter !== "all") && <button onClick={() => { setSearch(""); setStatusFilter("all"); }} className="text-[#0F6A6A] hover:opacity-70 font-medium">Reset filter</button>}
        </div>
      </div>
    </div>
  );
}
