"use client";

import { useState } from "react";
import { Save, Upload, X, ArrowLeft } from "lucide-react";
import Link from "next/link";

/* ================= FIELD COMPONENTS ================= */

function Label({ children }) {
  return (
    <label className="block text-xs font-medium text-gray-600 mb-1.5">
      {children}
    </label>
  );
}

function Input({ placeholder, value, onChange, type = "text" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 placeholder-gray-400 transition"
    />
  );
}

function Select({ value, onChange, children }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 text-gray-700 transition"
    >
      {children}
    </select>
  );
}

function Textarea({ placeholder, value, onChange, rows = 4 }) {
  return (
    <textarea
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 placeholder-gray-400 transition resize-none"
    />
  );
}

function SectionCard({ title, description, children }) {
  return (
    <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
      <div className="px-6 py-4 border-b border-black/[0.05]">
        <p className="text-sm font-medium text-gray-800">{title}</p>
        {description && (
          <p className="text-xs text-gray-400 mt-0.5">{description}</p>
        )}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

/* ================= PAGE ================= */

export default function EditArtikelPage() {
  const [thumbnail, setThumbnail] = useState(null);

  const [form, setForm] = useState({
    title: "Tips Investasi Properti untuk Pemula",
    slug: "tips-investasi-properti-pemula",
    category: "Investasi",
    status: "Publish",
    excerpt: "Panduan lengkap memulai investasi properti dengan risiko minimal.",
    content:
      "Investasi properti merupakan salah satu instrumen investasi yang memiliki nilai stabil dan cenderung meningkat dari waktu ke waktu...",
    seoTitle: "Tips Investasi Properti untuk Pemula",
    seoDescription:
      "Panduan lengkap memulai investasi properti untuk pemula.",
  });

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleThumbnail = (e) => {
    if (e.target.files?.[0]) setThumbnail(e.target.files[0]);
  };

  const removeThumbnail = () => setThumbnail(null);

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
            Perbarui artikel yang sudah dipublikasikan.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            href="/admin/artikel"
            className="px-4 py-2.5 text-sm rounded-xl border border-black/[0.08] text-gray-600 hover:bg-gray-50 transition"
          >
            Batal
          </Link>
          <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-[#0F6A6A] text-white hover:opacity-90 active:scale-[.98] transition">
            <Save size={15} />
            Update Artikel
          </button>
        </div>
      </div>

      {/* INFORMASI DASAR */}
      <SectionCard title="Informasi Dasar">
        <div className="grid md:grid-cols-2 gap-5">

          <div className="md:col-span-2">
            <Label>Judul Artikel</Label>
            <Input
              placeholder="Contoh: Tips Investasi Properti untuk Pemula"
              value={form.title}
              onChange={set("title")}
            />
          </div>

          <div>
            <Label>Slug</Label>
            <Input
              placeholder="tips-investasi-properti"
              value={form.slug}
              onChange={set("slug")}
            />
          </div>

          <div>
            <Label>Kategori</Label>
            <Select value={form.category} onChange={set("category")}>
              <option value="Investasi">Investasi</option>
              <option value="Properti">Properti</option>
              <option value="Tips">Tips</option>
              <option value="Desain">Desain</option>
            </Select>
          </div>

          <div>
            <Label>Status</Label>
            <Select value={form.status} onChange={set("status")}>
              <option value="Draft">Draft</option>
              <option value="Publish">Publish</option>
            </Select>
          </div>

        </div>
      </SectionCard>

      {/* THUMBNAIL */}
      <SectionCard
        title="Thumbnail Artikel"
        description="Gambar utama yang ditampilkan di halaman daftar artikel."
      >
        {thumbnail ? (
          <div className="relative group w-full h-52 rounded-xl overflow-hidden border border-black/[0.06]">
            <img
              src={URL.createObjectURL(thumbnail)}
              alt="thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <button
                onClick={removeThumbnail}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-red-500 text-xs font-medium"
              >
                <X size={13} />
                Hapus
              </button>
            </div>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center gap-3 w-full h-52 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-[#0F6A6A]/40 transition cursor-pointer">
            <Upload size={20} className="text-gray-400" />
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">
                Klik untuk ganti thumbnail
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                JPG, PNG, atau WEBP. Rekomendasi 1200×630px.
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleThumbnail}
            />
          </label>
        )}
      </SectionCard>

      {/* RINGKASAN */}
      <SectionCard
        title="Ringkasan Artikel"
        description="Ditampilkan sebagai preview di halaman daftar artikel."
      >
        <Textarea
          rows={4}
          placeholder="Tulis ringkasan singkat artikel..."
          value={form.excerpt}
          onChange={set("excerpt")}
        />
        <p className="text-xs text-gray-400 mt-2">
          {form.excerpt.length} / 200 karakter disarankan
        </p>
      </SectionCard>

      {/* ISI ARTIKEL */}
      <SectionCard
        title="Isi Artikel"
        description="Konten lengkap artikel yang akan ditampilkan."
      >
        <Textarea
          rows={16}
          placeholder="Tulis isi artikel di sini..."
          value={form.content}
          onChange={set("content")}
        />
      </SectionCard>

      {/* SEO */}
      <SectionCard
        title="SEO"
        description="Optimalkan artikel untuk mesin pencari."
      >
        <div className="flex flex-col gap-5">

          <div>
            <Label>SEO Title</Label>
            <Input
              placeholder="Judul yang muncul di Google"
              value={form.seoTitle}
              onChange={set("seoTitle")}
            />
            <p className="text-xs text-gray-400 mt-1.5">
              {form.seoTitle.length} / 60 karakter disarankan
            </p>
          </div>

          <div>
            <Label>SEO Description</Label>
            <Textarea
              rows={4}
              placeholder="Deskripsi singkat yang muncul di hasil pencarian Google"
              value={form.seoDescription}
              onChange={set("seoDescription")}
            />
            <p className="text-xs text-gray-400 mt-1.5">
              {form.seoDescription.length} / 160 karakter disarankan
            </p>
          </div>

        </div>
      </SectionCard>

      {/* ACTIONS */}
      <div className="flex items-center justify-end gap-3 pb-2">
        <Link
          href="/admin/artikel"
          className="px-5 py-2.5 text-sm rounded-xl border border-black/[0.08] text-gray-600 hover:bg-gray-50 transition"
        >
          Batal
        </Link>
        <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl bg-[#0F6A6A] text-white hover:opacity-90 active:scale-[.98] transition">
          <Save size={15} />
          Update Artikel
        </button>
      </div>

    </div>
  );
}