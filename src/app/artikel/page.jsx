"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export default function ArtikelPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("semua");
  const [page, setPage] = useState(1);

  const perPage = 6;

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/articles`
        );
        if (!res.ok) throw new Error("Gagal memuat artikel");
        const data = await res.json();
        // Sort newest first by created_at
        const sorted = (data || []).sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setArticles(sorted);
      } catch (err) {
        setError("Gagal memuat artikel");
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  // Generate tags dynamically from fetched articles
  const tags = useMemo(() => {
    const allTags = articles.flatMap((a) => a.tags || []);
    return ["semua", ...new Set(allTags)];
  }, [articles]);

  const filtered = useMemo(() => {
    return articles.filter((item) => {
      const matchSearch = (item.title || "")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchTag =
        tag === "semua" || (item.tags || []).includes(tag);

      return matchSearch && matchTag;
    });
  }, [search, tag, articles]);

  const totalPages = Math.ceil(filtered.length / perPage);

  const paginated = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

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
      <div className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-[#0F6A6A]/10 px-4 py-2 text-sm font-medium text-[#0F6A6A]">
            Artikel & Insight
          </span>

          <h1 className="mt-6 text-4xl lg:text-5xl font-bold text-gray-900">
            Informasi Properti
            <br />
            Untuk Keputusan Terbaik
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Temukan berbagai tips, panduan, dan informasi terbaru seputar
            properti, investasi, serta tren hunian modern.
          </p>
        </div>

        <div className="mt-14 flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

            <input
              placeholder="Cari artikel..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="
                w-full
                h-14
                pl-14
                pr-5
                rounded-full
                border
                border-gray-200
                outline-none
                focus:border-[#0F6A6A]
                transition
              "
            />
          </div>

          {tags.length > 1 && (
            <div className="flex flex-wrap gap-3">
              {tags.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTag(t);
                    setPage(1);
                  }}
                  className={`h-11 px-5 rounded-full text-sm font-medium capitalize transition ${tag === t
                      ? "bg-[#0F6A6A] text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-[#0F6A6A] hover:text-[#0F6A6A]"
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 mb-10">
          <p className="text-sm text-gray-500">
            Menampilkan{" "}
            <span className="font-semibold text-gray-900">
              {filtered.length}
            </span>{" "}
            artikel
          </p>
        </div>

        {loading ? (
          <div className="py-24 text-center text-gray-400">
            Memuat artikel...
          </div>
        ) : error ? (
          <div className="py-24 text-center text-red-500">
            {error}
          </div>
        ) : paginated.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginated.map((item) => {
              const imageSrc = item.thumbnail || item.image;
              const imageUrl = imageSrc
                ? imageSrc.startsWith("http")
                  ? imageSrc
                  : `${process.env.NEXT_PUBLIC_API_URL}/${imageSrc}`
                : null;

              return (
                <Link
                  key={item.id}
                  href={`/artikel/${item.slug}`}
                  className="group"
                >
                  <article
                    className="
                      bg-white
                      border
                      border-gray-100
                      rounded-[28px]
                      overflow-hidden
                      shadow-sm
                      hover:shadow-lg
                      transition-all
                      duration-300
                      hover:-translate-y-2
                    "
                  >
                    <div className="overflow-hidden">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={item.title}
                          className="
                            w-full
                            h-[240px]
                            object-cover
                            transition-transform
                            duration-500
                            group-hover:scale-105
                          "
                        />
                      ) : (
                        <div className="w-full h-[240px] bg-gray-100 flex items-center justify-center text-gray-300">
                          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <p className="text-sm text-gray-400">
                        {formatDate(item.created_at)}
                      </p>

                      <h3 className="mt-3 text-xl font-semibold text-gray-900 group-hover:text-[#0F6A6A] transition">
                        {item.title}
                      </h3>

                      {item.excerpt && (
                        <p className="mt-3 text-gray-600 line-clamp-3">
                          {item.excerpt}
                        </p>
                      )}

                      <span className="inline-flex mt-5 text-[#0F6A6A] font-medium">
                        Baca Selengkapnya →
                      </span>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="py-24 text-center border border-dashed border-gray-200 rounded-[32px]">
            <h3 className="text-xl font-semibold text-gray-900">
              Artikel Tidak Ditemukan
            </h3>

            <p className="mt-2 text-gray-500">
              Coba gunakan kata kunci atau filter yang berbeda.
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-16">
            {Array.from(
              { length: totalPages },
              (_, i) => i + 1
            ).map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`w-11 h-11 rounded-full text-sm font-medium transition ${page === num
                    ? "bg-[#0F6A6A] text-white"
                    : "border border-gray-200 text-gray-600 hover:border-[#0F6A6A] hover:text-[#0F6A6A]"
                  }`}
              >
                {num}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
