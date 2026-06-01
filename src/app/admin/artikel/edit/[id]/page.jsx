"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Save, ArrowLeft } from "lucide-react";
import { apiFetch } from "@/lib/api";

/* ================= PAGE ================= */

export default function EditArtikelPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [form, setForm] = useState({
    title: "",
    content: "",
    status: "draft",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchArticle() {
      try {
        setLoading(true);
        const data = await apiFetch(`/api/articles/${id}`);
        setForm({
          title: data.title || "",
          content: data.content || "",
          status: data.status || "draft",
        });
      } catch (err) {
        setError(err.message || "Gagal memuat data artikel.");
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [id]);

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title.trim()) {
      setError("Judul artikel wajib diisi.");
      return;
    }
    if (!form.content.trim()) {
      setError("Konten artikel wajib diisi.");
      return;
    }

    try {
      setSaving(true);
      await apiFetch(`/api/articles/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: form.title,
          content: form.content,
          status: form.status,
        }),
      });
      router.push("/admin/artikel");
    } catch (err) {
      setError(err.message || "Gagal menyimpan perubahan.");
    } finally {
      setSaving(false);
    }
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
          <h1 className="text-xl font-semibold text-gray-900 mt-2">Edit Artikel</h1>
        </div>
        <div className="bg-white rounded-2xl border border-black/[0.06] p-12 text-center text-sm text-gray-400">
          Memuat data...
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
            Edit Artikel
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Perbarui konten artikel.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            href="/admin/artikel"
            className="px-4 py-2.5 text-sm rounded-xl border border-black/[0.08] text-gray-600 hover:bg-gray-50 transition"
          >
            Batal
          </Link>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-[#0F6A6A] text-white hover:opacity-90 active:scale-[.98] transition disabled:opacity-50"
          >
            <Save size={15} />
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
          <div className="px-6 py-4 border-b border-black/[0.05]">
            <p className="text-sm font-medium text-gray-800">Konten Artikel</p>
            <p className="text-xs text-gray-400 mt-0.5">
              Perbarui judul dan konten artikel.
            </p>
          </div>
          <div className="p-6 flex flex-col gap-5">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Judul Artikel
              </label>
              <input
                type="text"
                placeholder="Masukkan judul artikel"
                value={form.title}
                onChange={set("title")}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 placeholder-gray-400 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Konten
              </label>
              <textarea
                rows={10}
                placeholder="Tulis konten artikel..."
                value={form.content}
                onChange={set("content")}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 placeholder-gray-400 transition resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Status
              </label>
              <select
                value={form.status}
                onChange={set("status")}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 text-gray-700 transition"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
        </div>

        {/* BOTTOM ACTIONS */}
        <div className="flex items-center justify-end gap-3 pb-2">
          <Link
            href="/admin/artikel"
            className="px-5 py-2.5 text-sm rounded-xl border border-black/[0.08] text-gray-600 hover:bg-gray-50 transition"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl bg-[#0F6A6A] text-white hover:opacity-90 active:scale-[.98] transition disabled:opacity-50"
          >
            <Save size={15} />
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}
