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
  BookOpen,
  ChevronLeft,
  ChevronRight,
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

  /* =========================================================
     FETCH ARTICLES
  ========================================================= */
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

  /* =========================================================
     TAGS
  ========================================================= */
  const tags = useMemo(() => {
    const allTags = articles.flatMap((article) => {
      if (!Array.isArray(article?.tags)) return [];

      return article.tags
        .map((item) => String(item).trim())
        .filter(Boolean);
    });

    return ["semua", ...new Set(allTags)];
  }, [articles]);

  /* =========================================================
     FILTER
  ========================================================= */
  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return articles.filter((item) => {
      const title = String(item?.title || "").toLowerCase();
      const excerpt = String(item?.excerpt || "").toLowerCase();

      const articleTags = Array.isArray(item?.tags)
        ? item.tags
        : [];

      const matchSearch =
        !keyword ||
        title.includes(keyword) ||
        excerpt.includes(keyword);

      const matchTag =
        tag === "semua" || articleTags.includes(tag);

      return matchSearch && matchTag;
    });
  }, [search, tag, articles]);

  /* =========================================================
     PAGINATION
  ========================================================= */
  const totalPages = Math.ceil(filtered.length / perPage);

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;

    return filtered.slice(start, start + perPage);
  }, [filtered, page]);

  /* =========================================================
     RESET PAGE WHEN FILTER CHANGES
  ========================================================= */
  useEffect(() => {
    setPage(1);
  }, [search, tag]);

  /* =========================================================
     FORMAT DATE
  ========================================================= */
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

  /* =========================================================
     HELPERS
  ========================================================= */
  const clearSearch = () => {
    setSearch("");
  };

  const resetFilters = () => {
    setSearch("");
    setTag("semua");
    setPage(1);
  };

  return (
    <main className="overflow-hidden bg-white text-[var(--foreground)]">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="bg-white">
        <div className="container py-12 sm:py-14 lg:py-16">
          <div className="max-w-[780px]">
            {/* EYEBROW */}
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              Artikel & Insight
            </span>

            {/* HEADING */}
            <h1 className="heading-xl mt-4">
              Insight properti untuk
              <span className="block text-[var(--primary)]">
                keputusan yang lebih tepat.
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="text-body mt-5 max-w-[680px]">
              Temukan berbagai tips, panduan, dan informasi terbaru seputar
              properti, investasi, serta tren hunian untuk membantu Anda
              mengambil keputusan dengan lebih percaya diri.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTENT
      ========================================================= */}
      <section className="bg-white">
        <div className="container pb-14 sm:pb-16 lg:pb-20">
          {/* =====================================================
              SEARCH & FILTER
          ===================================================== */}
          <div className="rounded-[24px] border border-[var(--border)] bg-white p-3 shadow-[var(--shadow-sm)] sm:p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              {/* SEARCH */}
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--soft)]"
                />

                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari artikel..."
                  aria-label="Cari artikel"
                  className="h-12 w-full rounded-xl border border-transparent bg-[var(--surface-muted)] pl-11 pr-11 text-sm text-[var(--foreground)] outline-none transition-all placeholder:text-[var(--soft)] focus:border-[var(--primary)]/20 focus:bg-white focus:ring-4 focus:ring-[var(--primary)]/10"
                />

                {search && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    aria-label="Hapus pencarian"
                    className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[var(--soft)] transition hover:bg-white hover:text-[var(--foreground)]"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* TAG FILTER */}
              {tags.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-0.5 lg:max-w-[650px]">
                  <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-muted)] text-[var(--muted)] sm:flex">
                    <Tag size={14} />
                  </div>

                  {tags.map((item) => {
                    const isActive = tag === item;

                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setTag(item)}
                        className={`h-9 shrink-0 rounded-lg px-4 text-xs font-semibold capitalize transition-all duration-200 ${
                          isActive
                            ? "bg-[var(--primary)] text-white shadow-sm"
                            : "bg-[var(--surface-muted)] text-[var(--muted)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)]"
                        }`}
                      >
                        {item === "semua" ? "Semua" : item}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* =====================================================
              RESULT HEADER
          ===================================================== */}
          {!loading && !error && (
            <div className="mt-7 flex flex-col gap-2 border-b border-[var(--border-soft)] pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <p className="text-sm text-[var(--muted)]">
                  <span className="font-semibold text-[var(--foreground)]">
                    {filtered.length}
                  </span>{" "}
                  artikel tersedia
                </p>

                {search && (
                  <>
                    <span className="hidden text-[var(--soft)] sm:inline">
                      •
                    </span>

                    <p className="hidden max-w-[220px] truncate text-sm text-[var(--muted)] sm:block">
                      “{search}”
                    </p>
                  </>
                )}
              </div>

              {(search || tag !== "semua") && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1.5 self-start text-xs font-semibold text-[var(--primary)] transition hover:opacity-70 sm:self-auto"
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
            <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-[24px] border border-[var(--border-soft)] bg-white"
                >
                  <div className="aspect-[16/10] animate-pulse bg-[var(--surface-muted)]" />

                  <div className="space-y-3 p-5">
                    <div className="h-3 w-24 animate-pulse rounded bg-[var(--surface-muted)]" />

                    <div className="h-5 w-full animate-pulse rounded bg-[var(--surface-muted)]" />

                    <div className="h-4 w-5/6 animate-pulse rounded bg-[var(--surface-muted)]" />

                    <div className="h-4 w-2/3 animate-pulse rounded bg-[var(--surface-muted)]" />

                    <div className="h-4 w-28 animate-pulse rounded bg-[var(--surface-muted)]" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            /* ===================================================
               ERROR
            =================================================== */
            <div className="mt-7 rounded-[24px] border border-[var(--border)] px-6 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
                <FileText
                  size={20}
                  className="text-red-400"
                />
              </div>

              <h3 className="mt-4 text-base font-semibold text-[var(--foreground)]">
                Tidak dapat memuat artikel
              </h3>

              <p className="mt-2 text-sm text-[var(--muted)]">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-5 inline-flex h-10 items-center rounded-full bg-[var(--primary)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)]"
              >
                Coba Lagi
              </button>
            </div>
          ) : paginated.length > 0 ? (
            <>
              {/* =================================================
                  ARTICLE GRID
              ================================================= */}
              <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {paginated.map((item) => {
                  const imageSrc =
                    item?.thumbnail || item?.image;

                  const imageUrl = imageSrc
                    ? getImageUrl(imageSrc)
                    : null;

                  return (
                    <Link
                      key={item.id}
                      href={`/artikel/${item.slug}`}
                      className="group block"
                    >
                      <article className="flex h-full flex-col overflow-hidden rounded-[24px] border border-[var(--border)] bg-white shadow-[var(--shadow-sm)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[var(--primary)]/20 group-hover:shadow-[var(--shadow-lg)]">
                        {/* IMAGE */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface-muted)]">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={item.title || "Artikel properti"}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.045]"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <FileText
                                size={40}
                                strokeWidth={1.2}
                                className="text-[var(--soft)]"
                              />
                            </div>
                          )}

                          {/* IMAGE OVERLAY */}
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                          {/* ARTICLE BADGE */}
                          <div className="absolute left-4 top-4">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-[10px] font-semibold text-[var(--primary)] shadow-sm backdrop-blur-md">
                              <BookOpen size={11} />
                              Artikel
                            </span>
                          </div>
                        </div>

                        {/* CONTENT */}
                        <div className="flex flex-1 flex-col p-5 sm:p-5.5">
                          {/* DATE */}
                          <div className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
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
                                      className="rounded-full bg-[var(--primary-light)] px-2.5 py-1 text-[10px] font-semibold capitalize text-[var(--primary)]"
                                    >
                                      {itemTag}
                                    </span>
                                  ))}
                              </div>
                            )}

                          {/* TITLE */}
                          <h2 className="mt-3 line-clamp-2 text-lg font-bold leading-snug tracking-tight text-[var(--foreground)] transition-colors duration-200 group-hover:text-[var(--primary)] sm:text-xl">
                            {item.title}
                          </h2>

                          {/* EXCERPT */}
                          {item.excerpt && (
                            <p className="mt-2.5 line-clamp-3 text-sm leading-6 text-[var(--muted)]">
                              {item.excerpt}
                            </p>
                          )}

                          {/* READ MORE */}
                          <div className="mt-auto pt-5">
                            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--primary)]">
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
                <div className="mt-9 flex items-center justify-center gap-2">
                  {/* PREVIOUS */}
                  <button
                    type="button"
                    disabled={page === 1}
                    onClick={() =>
                      setPage((prev) => prev - 1)
                    }
                    aria-label="Halaman sebelumnya"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] transition hover:border-[var(--primary)] hover:text-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <ChevronLeft size={17} />
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
                          page === num
                            ? "page"
                            : undefined
                        }
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all duration-200 ${
                          page === num
                            ? "bg-[var(--primary)] text-white shadow-sm"
                            : "border border-[var(--border)] text-[var(--muted)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
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
                    onClick={() =>
                      setPage((prev) => prev + 1)
                    }
                    aria-label="Halaman berikutnya"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] transition hover:border-[var(--primary)] hover:text-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <ChevronRight size={17} />
                  </button>
                </div>
              )}
            </>
          ) : (
            /* ===================================================
               EMPTY STATE
            =================================================== */
            <div className="mt-7 rounded-[24px] border border-dashed border-[var(--border)] px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary-light)]">
                <Search
                  size={22}
                  className="text-[var(--primary)]"
                />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Artikel Tidak Ditemukan
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">
                Tidak ada artikel yang sesuai dengan pencarian
                atau filter yang Anda pilih.
              </p>

              {(search || tag !== "semua") && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 inline-flex h-10 items-center justify-center rounded-full bg-[var(--primary)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)]"
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