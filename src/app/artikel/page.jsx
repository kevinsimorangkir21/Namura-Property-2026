"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  X,
  Tag,
  ArrowRight,
  FileText,
  CalendarDays,
} from "lucide-react";
import { API_URL, getImageUrl } from "@/lib/api";

export default function ArtikelPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("semua");
  const [page, setPage] = useState(1);

  const perPage = 6;

  useEffect(() => {
    const controller = new AbortController();

    async function fetchArticles() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_URL}/api/articles`, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Gagal memuat artikel");
        }

        const data = await res.json();

        const sorted = Array.isArray(data)
          ? [...data]
              .filter(
                (item) =>
                  String(item?.status || "").toLowerCase() === "published"
              )
              .sort(
                (a, b) =>
                  new Date(b?.created_at || 0).getTime() -
                  new Date(a?.created_at || 0).getTime()
              )
          : [];

        setArticles(sorted);
      } catch (err) {
        if (err?.name !== "AbortError") {
          setError("Gagal memuat artikel. Silakan coba lagi.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchArticles();

    return () => controller.abort();
  }, []);

  /* TAGS */
  const tags = useMemo(() => {
    const allTags = articles.flatMap((article) => {
      if (!Array.isArray(article?.tags)) return [];

      return article.tags
        .map((item) => String(item).trim())
        .filter(Boolean);
    });

    return ["semua", ...new Set(allTags)];
  }, [articles]);

  /* FILTER */
  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return articles.filter((item) => {
      const title = String(item?.title || "").toLowerCase();
      const excerpt = String(item?.excerpt || "").toLowerCase();
      const articleTags = Array.isArray(item?.tags) ? item.tags : [];

      const matchSearch =
        !keyword ||
        title.includes(keyword) ||
        excerpt.includes(keyword);

      const matchTag =
        tag === "semua" || articleTags.includes(tag);

      return matchSearch && matchTag;
    });
  }, [search, tag, articles]);

  /* PAGINATION */
  const totalPages = Math.ceil(filtered.length / perPage);

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;

    return filtered.slice(start, start + perPage);
  }, [filtered, page]);

  /* RESET PAGE WHEN FILTER CHANGES */
  useEffect(() => {
    setPage(1);
  }, [search, tag]);

  /* FORMAT DATE */
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";

    const date = new Date(dateStr);

    if (Number.isNaN(date.getTime())) {
      return "-";
    }

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const clearSearch = () => {
    setSearch("");
  };

  const resetFilters = () => {
    setSearch("");
    setTag("semua");
    setPage(1);
  };

  return (
    <main className="bg-white">

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-[1280px] px-5 pb-12 pt-16 sm:px-6 sm:pb-14 sm:pt-20 lg:px-8 lg:pb-16 lg:pt-24">

          <div className="mx-auto max-w-[760px] text-center">

            {/* BADGE */}
            <span className="inline-flex items-center gap-2 rounded-full border border-[#0F6A6A]/10 bg-[#0F6A6A]/[0.06] px-3.5 py-2 text-xs font-semibold tracking-wide text-[#0F6A6A] sm:text-sm">
              <FileText size={13} />
              Artikel & Insight
            </span>

            {/* HEADING */}
            <h1 className="mt-5 text-3xl font-bold leading-[1.08] tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
              Informasi Properti
              <span className="block text-[#0F6A6A]">
                Untuk Keputusan Terbaik
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="mx-auto mt-5 max-w-[650px] text-[15px] leading-7 text-gray-500 sm:text-base lg:text-lg">
              Temukan berbagai tips, panduan, dan informasi terbaru
              seputar properti, investasi, serta tren hunian modern.
            </p>

          </div>
        </div>
      </section>

      {/* =========================================================
          CONTENT
      ========================================================= */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-5 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">

          {/* SEARCH */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div className="relative w-full lg:max-w-[480px]">
              <Search
                size={19}
                className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari artikel..."
                aria-label="Cari artikel"
                className="h-13 w-full rounded-full border border-gray-200 bg-white pl-12 pr-12 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#0F6A6A] focus:ring-4 focus:ring-[#0F6A6A]/[0.07]"
              />

              {search && (
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Hapus pencarian"
                  className="absolute right-4 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* TAG FILTER */}
            {tags.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:max-w-[650px] lg:justify-end lg:pb-0">
                <div className="mr-1 hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-400 sm:flex">
                  <Tag size={15} />
                </div>

                {tags.map((item) => {
                  const isActive = tag === item;

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setTag(item)}
                      className={`h-10 shrink-0 rounded-full px-5 text-sm font-semibold capitalize transition-all duration-200 ${
                        isActive
                          ? "bg-[#0F6A6A] text-white shadow-sm"
                          : "border border-gray-200 bg-white text-gray-600 hover:border-[#0F6A6A]/40 hover:text-[#0F6A6A]"
                      }`}
                    >
                      {item === "semua" ? "Semua" : item}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* RESULT INFO */}
          {!loading && !error && (
            <div className="mt-8 flex flex-col gap-2 border-b border-gray-100 pb-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">
                  Menampilkan{" "}
                  <span className="font-semibold text-gray-900">
                    {filtered.length}
                  </span>{" "}
                  artikel
                </p>

                {search && (
                  <>
                    <span className="hidden text-gray-300 sm:inline">
                      •
                    </span>

                    <p className="hidden max-w-[220px] truncate text-sm text-gray-400 sm:block">
                      “{search}”
                    </p>
                  </>
                )}
              </div>

              {(search || tag !== "semua") && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1.5 self-start text-xs font-semibold text-[#0F6A6A] hover:underline sm:self-auto"
                >
                  <X size={13} />
                  Reset filter
                </button>
              )}
            </div>
          )}

          {/* =====================================================
              LOADING
          ===================================================== */}
          {loading ? (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-[28px] border border-gray-100 bg-white"
                >
                  <div className="aspect-[16/10] animate-pulse bg-gray-100" />

                  <div className="space-y-4 p-5 sm:p-6">
                    <div className="h-3 w-28 animate-pulse rounded bg-gray-100" />
                    <div className="h-6 w-full animate-pulse rounded bg-gray-100" />
                    <div className="h-4 w-5/6 animate-pulse rounded bg-gray-100" />
                    <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
                    <div className="h-4 w-32 animate-pulse rounded bg-gray-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            /* ===================================================
               ERROR
            =================================================== */
            <div className="mt-8 rounded-[28px] border border-gray-100 px-6 py-20 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
                <FileText
                  size={20}
                  className="text-red-400"
                />
              </div>

              <h3 className="mt-4 text-base font-semibold text-gray-900">
                Tidak dapat memuat artikel
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-5 inline-flex h-10 items-center rounded-full bg-[#0F6A6A] px-5 text-sm font-semibold text-white transition hover:bg-[#0C5A5A]"
              >
                Coba Lagi
              </button>
            </div>
          ) : paginated.length > 0 ? (
            <>
              {/* =================================================
                  ARTICLE GRID
              ================================================= */}
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {paginated.map((item) => {
                  const imageSrc = item?.thumbnail || item?.image;
                  const imageUrl = imageSrc
                    ? getImageUrl(imageSrc)
                    : null;

                  return (
                    <Link
                      key={item.id}
                      href={`/artikel/${item.slug}`}
                      className="group block"
                    >
                      <article className="flex h-full flex-col overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-gray-200 group-hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)]">

                        {/* IMAGE */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={item.title || "Artikel properti"}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <FileText
                                size={42}
                                strokeWidth={1.2}
                                className="text-gray-300"
                              />
                            </div>
                          )}

                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </div>

                        {/* CONTENT */}
                        <div className="flex min-h-[250px] flex-1 flex-col p-5 sm:p-6">

                          {/* DATE */}
                          <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <CalendarDays size={13} />

                            <time dateTime={item.created_at}>
                              {formatDate(item.created_at)}
                            </time>
                          </div>

                          {/* TAGS */}
                          {Array.isArray(item?.tags) &&
                            item.tags.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-1.5">
                                {item.tags
                                  .slice(0, 2)
                                  .map((itemTag) => (
                                    <span
                                      key={itemTag}
                                      className="rounded-full bg-[#0F6A6A]/[0.06] px-2.5 py-1 text-[10px] font-semibold capitalize text-[#0F6A6A]"
                                    >
                                      {itemTag}
                                    </span>
                                  ))}
                              </div>
                            )}

                          {/* TITLE */}
                          <h2 className="mt-3 line-clamp-2 text-lg font-bold leading-snug text-gray-950 transition-colors duration-200 group-hover:text-[#0F6A6A] sm:text-xl">
                            {item.title}
                          </h2>

                          {/* EXCERPT */}
                          {item.excerpt && (
                            <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">
                              {item.excerpt}
                            </p>
                          )}

                          {/* READ MORE */}
                          <div className="mt-auto pt-5">
                            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F6A6A]">
                              Baca Selengkapnya

                              <ArrowRight
                                size={15}
                                className="transition-transform duration-200 group-hover:translate-x-1"
                              />
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>

              {/* =================================================
                  PAGINATION
              ================================================= */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2 sm:mt-14">

                  {/* PREVIOUS */}
                  <button
                    type="button"
                    disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                    className="hidden h-10 rounded-full border border-gray-200 px-4 text-sm font-medium text-gray-600 transition hover:border-[#0F6A6A] hover:text-[#0F6A6A] disabled:cursor-not-allowed disabled:opacity-40 sm:inline-flex sm:items-center"
                  >
                    Sebelumnya
                  </button>

                  {/* PAGE NUMBERS */}
                  <div className="flex items-center gap-1.5">
                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1
                    ).map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setPage(num)}
                        aria-label={`Halaman ${num}`}
                        aria-current={
                          page === num ? "page" : undefined
                        }
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all duration-200 ${
                          page === num
                            ? "bg-[#0F6A6A] text-white shadow-sm"
                            : "border border-gray-200 text-gray-600 hover:border-[#0F6A6A] hover:text-[#0F6A6A]"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>

                  {/* NEXT */}
                  <button
                    type="button"
                    disabled={page === totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                    className="hidden h-10 rounded-full border border-gray-200 px-4 text-sm font-medium text-gray-600 transition hover:border-[#0F6A6A] hover:text-[#0F6A6A] disabled:cursor-not-allowed disabled:opacity-40 sm:inline-flex sm:items-center"
                  >
                    Selanjutnya
                  </button>
                </div>
              )}
            </>
          ) : (
            /* ===================================================
               EMPTY STATE
            =================================================== */
            <div className="mt-8 rounded-[28px] border border-dashed border-gray-200 px-6 py-20 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#0F6A6A]/[0.06]">
                <Search
                  size={22}
                  className="text-[#0F6A6A]"
                />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                Artikel Tidak Ditemukan
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                Tidak ada artikel yang sesuai dengan pencarian atau
                filter yang Anda pilih.
              </p>

              {(search || tag !== "semua") && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 inline-flex h-10 items-center justify-center rounded-full bg-[#0F6A6A] px-5 text-sm font-semibold text-white transition hover:bg-[#0C5A5A]"
                >
                  Tampilkan Semua Artikel
                </button>
              )}
            </div>
          )}

        </div>
      </section>
    </main>
  );
}