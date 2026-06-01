"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ArtikelDetail() {
  const params = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/articles/slug/${params.slug}`
        );
        if (!res.ok) {
          setError(true);
          return;
        }
        const data = await res.json();
        setArticle(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    if (params.slug) fetchArticle();
  }, [params.slug]);

  if (loading) {
    return (
      <section className="bg-white">
        <div className="max-w-[1000px] mx-auto px-6 py-20 text-center text-gray-400">
          Memuat artikel...
        </div>
      </section>
    );
  }

  if (error || !article) {
    return (
      <section className="bg-white">
        <div className="max-w-[1000px] mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Artikel Tidak Ditemukan</h1>
          <p className="mt-3 text-gray-500">Artikel yang Anda cari tidak tersedia.</p>
          <Link href="/artikel" className="inline-block mt-6 text-[#0F6A6A] font-medium hover:underline">
            ← Kembali ke Semua Artikel
          </Link>
        </div>
      </section>
    );
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section className="bg-white">
      <div className="max-w-[1000px] mx-auto px-6 py-20">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-gray-900">Beranda</Link>
          <span className="mx-2">/</span>
          <Link href="/artikel" className="hover:text-gray-900">Artikel</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{article.title}</span>
        </div>

        {/* Status badge */}
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="px-4 py-2 rounded-full bg-[#0F6A6A]/10 text-[#0F6A6A] text-sm font-medium capitalize">
            {article.status || "draft"}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
          {article.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mt-6 text-gray-500">
          <span>{article.author?.name || "Admin"}</span>
          <span>•</span>
          <span>{formatDate(article.created_at)}</span>
        </div>

        {/* Thumbnail */}
        {article.thumbnail && (
          <div className="mt-10 overflow-hidden rounded-[32px]">
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/${article.thumbnail}`}
              alt={article.title}
              className="w-full h-[550px] object-cover"
            />
          </div>
        )}

        {/* Excerpt */}
        {article.excerpt && (
          <div className="mt-10 bg-[#0F6A6A]/5 border border-[#0F6A6A]/10 rounded-[24px] p-6">
            <h3 className="font-semibold text-gray-900">Ringkasan Artikel</h3>
            <p className="mt-3 text-gray-600 leading-relaxed">{article.excerpt}</p>
          </div>
        )}

        {/* Content */}
        <article className="prose prose-lg max-w-none mt-12 prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-8 prose-li:text-gray-700 prose-li:leading-8 prose-h2:text-3xl prose-h2:mt-12 prose-h3:text-2xl prose-a:text-[#0F6A6A]">
          <div className="whitespace-pre-wrap text-gray-700 leading-8">
            {article.content}
          </div>
        </article>

        {/* CTA */}
        <div className="mt-20">
          <div className="bg-[#0F6A6A] rounded-[32px] p-12 text-center">
            <h2 className="text-4xl font-bold text-white">
              Siap Memulai Investasi Properti?
            </h2>
            <p className="mt-4 text-white/80 max-w-2xl mx-auto">
              Konsultasikan kebutuhan properti Anda bersama tim profesional Namura Property.
            </p>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center mt-8 h-12 px-8 rounded-full bg-white text-[#0F6A6A] font-semibold"
            >
              Konsultasi Gratis
            </a>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link href="/artikel" className="text-[#0F6A6A] font-medium hover:underline">
            ← Kembali ke Semua Artikel
          </Link>
        </div>
      </div>
    </section>
  );
}
