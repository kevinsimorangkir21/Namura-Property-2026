"use client";

import Link from "next/link";
import {
  Pencil,
  Trash2,
  Calendar,
  User,
  Tag,
  ArrowLeft,
} from "lucide-react";

function SectionCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
      <div className="px-6 py-4 border-b border-black/[0.05]">
        <p className="text-sm font-medium text-gray-800">{title}</p>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

export default function DetailArtikelPage() {
  const article = {
    id: 1,
    title: "Tips Investasi Properti untuk Pemula",
    slug: "tips-investasi-properti-pemula",
    category: "Investasi",
    status: "Publish",
    author: "Namura Team",
    date: "12 Mei 2026",
    image: "/a1.jpg",
    excerpt:
      "Panduan lengkap memulai investasi properti dengan strategi yang tepat dan risiko minimal.",
    content: `
      <h2>Mengapa Investasi Properti Menarik?</h2>
      <p>Properti merupakan salah satu instrumen investasi yang memiliki nilai stabil dan cenderung meningkat dari waktu ke waktu.</p>
      <ul>
        <li>Nilai aset meningkat</li>
        <li>Passive income dari sewa</li>
        <li>Risiko relatif rendah</li>
      </ul>
      <h2>Tips Memulai</h2>
      <p>Tentukan tujuan investasi, pilih lokasi strategis, dan lakukan riset pasar sebelum membeli properti.</p>
    `,
  };

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
          <div className="flex items-center gap-2 mt-1.5">
            <span className="inline-flex text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/80">
              {article.status}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 ring-1 ring-purple-200/80">
              <Tag size={10} />
              {article.category}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="flex items-center gap-2 px-4 py-2.5 text-sm rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition">
            <Trash2 size={15} />
            Hapus
          </button>
          <Link
            href={`/admin/artikel/${article.id}/edit`}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-[#0F6A6A] text-white hover:opacity-90 active:scale-[.98] transition"
          >
            <Pencil size={15} />
            Edit Artikel
          </Link>
        </div>
      </div>

      {/* THUMBNAIL */}
      <div className="w-full h-[380px] rounded-2xl overflow-hidden border border-black/[0.06]">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* ARTICLE CONTENT */}
      <div className="bg-white rounded-2xl border border-black/[0.06] p-8">

        <h1 className="text-3xl font-semibold text-gray-900 leading-snug">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 mt-4">
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <Calendar size={13} />
            {article.date}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <User size={13} />
            {article.author}
          </span>
        </div>

        {/* EXCERPT */}
        <div className="mt-6 p-4 rounded-xl bg-[#0F6A6A]/[0.06] border border-[#0F6A6A]/10">
          <p className="text-sm text-gray-700 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* CONTENT */}
        <article
          className="prose prose-sm max-w-none mt-8 prose-headings:text-gray-900 prose-headings:font-semibold prose-p:text-gray-600 prose-li:text-gray-600 prose-h2:text-lg prose-h2:mt-6 prose-h2:mb-3"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

      </div>

      {/* SEO */}
      <SectionCard title="SEO Information">
        <div className="flex flex-col gap-5">

          <div>
            <p className="text-xs text-gray-400 mb-1">SEO Title</p>
            <p className="text-sm font-medium text-gray-900">
              Tips Investasi Properti untuk Pemula
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {`Tips Investasi Properti untuk Pemula`.length} / 60 karakter
            </p>
          </div>

          <div className="border-t border-black/[0.05] pt-5">
            <p className="text-xs text-gray-400 mb-1">SEO Description</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Panduan lengkap investasi properti untuk pemula dengan strategi
              yang aman dan menguntungkan.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {`Panduan lengkap investasi properti untuk pemula dengan strategi yang aman dan menguntungkan.`.length}{" "}
              / 160 karakter
            </p>
          </div>

          <div className="border-t border-black/[0.05] pt-5">
            <p className="text-xs text-gray-400 mb-1">Slug</p>
            <p className="text-sm font-medium text-[#0F6A6A]">
              /artikel/{article.slug}
            </p>
          </div>

        </div>
      </SectionCard>

    </div>
  );
}