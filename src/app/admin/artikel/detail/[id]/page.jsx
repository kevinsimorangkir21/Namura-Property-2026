"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";
import { apiFetch } from "@/lib/api";

/* ================= PAGE ================= */

export default function DetailArtikelPage() {
  const params = useParams();
  const id = params.id;

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchArticle() {
      try {
        setLoading(true);
        const data = await apiFetch(`/api/articles/${id}`);
        setArticle(data);
      } catch (err) {
        setError(err.message || "Gagal memuat data artikel.");
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [id]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <Link
            href="/admin/artikel"
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition"
          >
            <ArrowLeft size={14} />
            Kembali ke Artikel
          </Link>
          <h1 className="text-xl font-semibold text-gray-900 mt-2">Detail Artikel</h1>
        </div>
        <div className="bg-white rounded-2xl border border-black/[0.06] p-12 text-center text-sm text-gray-400">
          Memuat data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <Link
            href="/admin/artikel"
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition"
          >
            <ArrowLeft size={14} />
            Kembali ke Artikel
          </Link>
          <h1 className="text-xl font-semibold text-gray-900 mt-2">Detail Artikel</h1>
        </div>
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href="/admin/artikel"
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition"
          >
            <ArrowLeft size={14} />
            Kembali ke Artikel
          </Link>
          <h1 className="text-xl font-semibold text-gray-900 mt-2">
            Detail Artikel
          </h1>
        </div>
        <Link
          href={`/admin/artikel/edit/${id}`}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-[#0F6A6A] text-white hover:opacity-90 active:scale-[.98] transition"
        >
          <Pencil size={15} />
          Edit Artikel
        </Link>
      </div>

      {/* CONTENT */}
      <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
        <div className="px-6 py-4 border-b border-black/[0.05]">
          <p className="text-sm font-medium text-gray-800">Informasi Artikel</p>
        </div>
        <div className="p-6 flex flex-col gap-5">
          {/* Title */}
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
              Judul
            </p>
            <p className="text-base font-semibold text-gray-900">
              {article.title}
            </p>
          </div>

          {/* Meta */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                Status
              </p>
              <span
                className={`inline-flex text-[11px] font-medium px-2.5 py-0.5 rounded-full ring-1 ${(article.status || "").toLowerCase() === "published"
                    ? "bg-emerald-50 text-emerald-700 ring-emerald-200/80"
                    : "bg-amber-50 text-amber-700 ring-amber-200/80"
                  }`}
              >
                {article.status || "Draft"}
              </span>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                Penulis
              </p>
              <p className="text-sm text-gray-700">
                {article.author_name || "-"}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                Tanggal Dibuat
              </p>
              <p className="text-sm text-gray-700">
                {formatDate(article.created_at)}
              </p>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
              Konten
            </p>
            <div className="p-4 rounded-xl bg-gray-50 border border-black/[0.04] text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
              {article.content || "-"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
