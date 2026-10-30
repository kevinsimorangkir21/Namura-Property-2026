"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

import {
  Search,
  X,
  ArrowUpRight,
  FileText,
  CalendarDays,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  ChevronDown,
} from "lucide-react";

import { API_URL, getImageUrl } from "@/lib/api";

const PER_PAGE = 6;
const BANNER_ILLUSTRATION_URL = "";

const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const fieldClass =
  "h-12 w-full rounded-xl border border-transparent bg-[var(--surface-muted)] text-sm text-[var(--foreground)] outline-none transition-all placeholder:text-[var(--foreground-soft)] focus:border-[var(--primary)]/20 focus:bg-[var(--surface)] focus:ring-4 focus:ring-[var(--primary)]/10";

const getDateParts = (dateStr) => {
  const date = new Date(dateStr || 0);
  if (!dateStr || Number.isNaN(date.getTime())) return null;
  return { month: String(date.getMonth()), year: String(date.getFullYear()) };
};

function FilterSelect({ label, value, onChange, disabled, children }) {
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`${fieldClass} cursor-pointer appearance-none pl-4 pr-10 disabled:cursor-not-allowed disabled:opacity-50`}
      >
        {children}
      </select>
      <ChevronDown
        size={16}
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--foreground-soft)]"
      />
    </label>
  );
}

const glassPanel =
  "border border-[var(--border)] bg-[var(--glass-bg-strong)] shadow-[var(--shadow-glass)] backdrop-blur-xl";

const pageButton =
  "flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold transition-all duration-200";

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const getPageItems = (page, total) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const items = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(total - 1, page + 1);

  if (start > 2) items.push("…");
  for (let i = start; i <= end; i += 1) items.push(i);
  if (end < total - 1) items.push("…");
  items.push(total);

  return items;
};

function ArticleCard({ item }) {
  const [imageError, setImageError] = useState(false);

  const imageSrc = item?.thumbnail || item?.image;
  const imageUrl = imageSrc && !imageError ? getImageUrl(imageSrc) : null;
  const itemTags = Array.isArray(item?.tags) ? item.tags.slice(0, 2) : [];

  return (
    <Link
      href={`/artikel/${item.slug}`}
      className="notch-wrap notch-lift group block h-full motion-reduce:hover:translate-y-0"
    >
      <article className="notch flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] bg-[var(--surface-soft)]">
        <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface-muted)]">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={item.title || "Artikel properti"}
              loading="lazy"
              draggable={false}
              onError={() => setImageError(true)}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.045] motion-reduce:transition-none"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--surface)] shadow-sm">
                <FileText
                  size={24}
                  strokeWidth={1.5}
                  className="text-[var(--primary)]"
                  aria-hidden="true"
                />
              </div>
            </div>
          )}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />

          <div className="absolute left-4 top-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-[var(--glass-bg-strong)] px-3 py-1.5 text-[10px] font-semibold text-[var(--primary)] shadow-sm backdrop-blur-md">
              <BookOpen size={11} aria-hidden="true" />
              Artikel
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-soft)]">
            <CalendarDays size={13} aria-hidden="true" />
            <time dateTime={item.created_at}>{formatDate(item.created_at)}</time>
          </div>

          {itemTags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {itemTags.map((itemTag) => (
                <span
                  key={itemTag}
                  className="rounded-full bg-[var(--primary)]/10 px-2.5 py-1 text-[10px] font-semibold capitalize text-[var(--primary)]"
                >
                  {itemTag}
                </span>
              ))}
            </div>
          )}

          <h2 className="mt-3 line-clamp-2 text-lg font-bold leading-snug tracking-tight text-[var(--foreground)] transition-colors duration-200 group-hover:text-[var(--primary)] sm:text-xl">
            {item.title}
          </h2>

          {item.excerpt && (
            <p className="mt-2.5 line-clamp-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {item.excerpt}
            </p>
          )}

          <div className="mt-auto pt-5">
            <span className="inline-flex min-h-11 items-center text-sm font-semibold text-[var(--primary)]">
              Baca Selengkapnya
            </span>
          </div>
        </div>
      </article>

      <span className="notch-btn" aria-hidden="true">
        <ArrowUpRight
          size={26}
          strokeWidth={2.25}
          className="text-[var(--foreground)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--primary)]"
        />
      </span>
    </Link>
  );
}

export default function ArtikelPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("semua");
  const [month, setMonth] = useState("semua");
  const [year, setYear] = useState("semua");
  const [page, setPage] = useState(1);

  const listRef = useRef(null);
  const tabBarRef = useRef(null);
  const tabRefs = useRef({});
  const mountedRef = useRef(false);

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

        if (!res.ok) throw new Error("Gagal memuat artikel");

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
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchArticles();
    return () => controller.abort();
  }, [reloadKey]);

  const tags = useMemo(() => {
    const allTags = articles.flatMap((article) =>
      Array.isArray(article?.tags)
        ? article.tags.map((item) => String(item).trim()).filter(Boolean)
        : []
    );
    return ["semua", ...new Set(allTags)];
  }, [articles]);

  const years = useMemo(() => {
    const set = new Set(
      articles.map((a) => getDateParts(a?.created_at)?.year).filter(Boolean)
    );
    return [...set].sort((a, b) => Number(b) - Number(a));
  }, [articles]);

  const availableMonths = useMemo(() => {
    const set = new Set(
      articles
        .map((a) => getDateParts(a?.created_at))
        .filter((parts) => parts && (year === "semua" || parts.year === year))
        .map((parts) => parts.month)
    );
    return [...set].sort((a, b) => Number(a) - Number(b));
  }, [articles, year]);

  useEffect(() => {
    const fromHash = () => {
      const raw = window.location.hash.slice(1);
      if (!raw) return;

      let decoded = raw;
      try {
        decoded = decodeURIComponent(raw);
      } catch {
        decoded = raw;
      }

      if (tags.includes(decoded)) {
        setTag(decoded);
        setPage(1);
      }
    };

    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [tags]);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    tabRefs.current[tag]?.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: "smooth",
    });
  }, [tag]);

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return articles.filter((item) => {
      const title = String(item?.title || "").toLowerCase();
      const articleTags = Array.isArray(item?.tags) ? item.tags : [];
      const parts = getDateParts(item?.created_at);

      const matchSearch = !keyword || title.includes(keyword);
      const matchTag = tag === "semua" || articleTags.includes(tag);
      const matchYear = year === "semua" || parts?.year === year;
      const matchMonth = month === "semua" || parts?.month === month;

      return matchSearch && matchTag && matchYear && matchMonth;
    });
  }, [search, tag, month, year, articles]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const paginated = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, page]);

  const scrollToList = () => {
    requestAnimationFrame(() =>
      listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    );
  };

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const selectTag = (value) => {
    setTag(value);
    setPage(1);

    const url =
      value === "semua"
        ? `${window.location.pathname}${window.location.search}`
        : `#${encodeURIComponent(value)}`;
    window.history.replaceState(null, "", url);

    const stuck =
      tabBarRef.current && tabBarRef.current.getBoundingClientRect().top <= 100;
    if (stuck) scrollToList();
  };

  const handleYear = (value) => {
    setYear(value);
    setPage(1);

    const stillAvailable = articles.some((a) => {
      const parts = getDateParts(a?.created_at);
      return (
        parts &&
        (value === "semua" || parts.year === value) &&
        parts.month === month
      );
    });
    if (!stillAvailable) setMonth("semua");
  };

  const handleMonth = (value) => {
    setMonth(value);
    setPage(1);
  };

  const resetFilters = () => {
    setSearch("");
    setMonth("semua");
    setYear("semua");
    selectTag("semua");
  };

  const goToPage = (num) => {
    setPage(num);
    scrollToList();
  };

  const handleTabKeyDown = (e) => {
    const i = tags.indexOf(tag);
    let next = null;
    if (e.key === "ArrowRight") next = (i + 1) % tags.length;
    if (e.key === "ArrowLeft") next = (i - 1 + tags.length) % tags.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = tags.length - 1;
    if (next === null) return;

    e.preventDefault();
    selectTag(tags[next]);
    tabRefs.current[tags[next]]?.focus();
  };

  const hasFilter =
    Boolean(search) || tag !== "semua" || month !== "semua" || year !== "semua";
  const periodLabel = [
    month !== "semua" ? MONTHS[Number(month)] : null,
    year !== "semua" ? year : null,
  ]
    .filter(Boolean)
    .join(" ");
  const activeIndex = Math.max(tags.indexOf(tag), 0);

  return (
    <main className="overflow-x-clip bg-[var(--surface)] text-[var(--foreground)]">
      <section>
        <div className="container pt-4 sm:pt-6">
          <div className="relative flex min-h-[240px] items-start overflow-hidden rounded-t-[28px] bg-[var(--surface-soft)] px-6 pb-16 pt-10 sm:min-h-[300px] sm:px-10 sm:pt-12 lg:min-h-[360px] lg:px-14 lg:pt-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 18% 30%, rgba(255,255,255,0.95), transparent 42%), radial-gradient(circle at 85% 70%, rgba(15,106,106,0.16), transparent 45%)",
              }}
            />

            <div className="relative z-10 max-w-[560px]">
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-[var(--foreground)] sm:text-5xl">
                Artikel & Insight
              </h1>
              <p className="mt-3 max-w-[460px] text-base leading-7 text-[var(--foreground-muted)] sm:text-lg">
                Tips, panduan, dan informasi terbaru seputar properti,
                investasi, serta tren hunian.
              </p>
            </div>

            {BANNER_ILLUSTRATION_URL && (
              <img
                src={BANNER_ILLUSTRATION_URL}
                alt=""
                draggable={false}
                className="pointer-events-none absolute bottom-0 right-0 hidden h-[88%] max-w-[55%] object-contain object-right-bottom md:block"
              />
            )}
          </div>
        </div>
      </section>

      <div
        ref={tabBarRef}
        className="sticky top-16 z-40 border-y border-[var(--border-soft)] bg-[var(--surface-soft)] lg:top-20"
      >
        <div className="container">
          <div
            role="tablist"
            aria-label="Kategori artikel"
            onKeyDown={handleTabKeyDown}
            className="-mx-[18px] flex overflow-x-auto px-[18px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
          >
            {tags.map((item, index) => {
              const isActive = item === tag;
              return (
                <button
                  key={item}
                  ref={(el) => (tabRefs.current[item] = el)}
                  type="button"
                  role="tab"
                  id={`tab-${index}`}
                  aria-selected={isActive}
                  aria-controls="panel-artikel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectTag(item)}
                  className={`relative shrink-0 whitespace-nowrap px-5 py-4 text-sm capitalize transition-colors duration-200 sm:px-6 sm:text-base ${
                    isActive
                      ? "font-semibold text-[var(--primary)]"
                      : "text-[var(--foreground-secondary)] hover:text-[var(--primary)]"
                  }`}
                >
                  {item === "semua" ? "Semua" : item}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-0 h-[3px] rounded-t-full bg-[var(--primary)] transition-opacity duration-200 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <section
        id="panel-artikel"
        role="tabpanel"
        aria-labelledby={`tab-${activeIndex}`}
      >
        <div className="container py-10 sm:py-12 lg:py-16">
          <div className={`${glassPanel} rounded-[24px] p-3 sm:p-4`}>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-[1fr_200px_160px]">
              <div className="relative col-span-2 lg:col-span-1">
                <Search
                  size={18}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground-soft)]"
                />

                <input
                  type="search"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Cari nama artikel..."
                  aria-label="Cari nama artikel"
                  autoComplete="off"
                  enterKeyHint="search"
                  className={`${fieldClass} pl-11 pr-12 [&::-webkit-search-cancel-button]:hidden`}
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => handleSearch("")}
                    aria-label="Hapus pencarian"
                    className="absolute right-1.5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-[var(--foreground-soft)] transition hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              <FilterSelect
                label="Filter bulan"
                value={month}
                onChange={handleMonth}
                disabled={availableMonths.length === 0}
              >
                <option value="semua">Semua Bulan</option>
                {availableMonths.map((m) => (
                  <option key={m} value={m}>
                    {MONTHS[Number(m)]}
                  </option>
                ))}
              </FilterSelect>

              <FilterSelect
                label="Filter tahun"
                value={year}
                onChange={handleYear}
                disabled={years.length === 0}
              >
                <option value="semua">Semua Tahun</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </FilterSelect>
            </div>
          </div>

          {!loading && !error && (
            <div className="mt-7 flex flex-col gap-2 border-b border-[var(--border-soft)] pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2" aria-live="polite">
                <p className="text-sm text-[var(--foreground-muted)]">
                  <span className="font-semibold text-[var(--foreground)]">
                    {filtered.length}
                  </span>{" "}
                  artikel tersedia
                </p>

                {periodLabel && (
                  <>
                    <span className="text-[var(--foreground-soft)]">•</span>
                    <p className="text-sm font-medium text-[var(--primary)]">
                      {periodLabel}
                    </p>
                  </>
                )}

                {search && (
                  <>
                    <span className="hidden text-[var(--foreground-soft)] sm:inline">
                      •
                    </span>
                    <p className="hidden max-w-[220px] truncate text-sm text-[var(--foreground-muted)] sm:block">
                      “{search}”
                    </p>
                  </>
                )}
              </div>

              {hasFilter && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex min-h-11 items-center gap-1.5 self-start text-xs font-semibold text-[var(--primary)] transition hover:opacity-70 sm:self-auto"
                >
                  <X size={13} aria-hidden="true" />
                  Reset filter
                </button>
              )}
            </div>
          )}

          <div ref={listRef} className="scroll-mt-36 lg:scroll-mt-40">
            {loading ? (
              <div
                className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
                aria-busy="true"
              >
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className={`${glassPanel} overflow-hidden rounded-[var(--radius-lg)]`}
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
              <div
                role="alert"
                className={`${glassPanel} mt-7 rounded-[24px] px-6 py-16 text-center`}
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--danger)]/10">
                  <FileText
                    size={20}
                    aria-hidden="true"
                    className="text-[var(--danger)]"
                  />
                </div>

                <h3 className="mt-4 text-base font-semibold text-[var(--foreground)]">
                  Tidak dapat memuat artikel
                </h3>

                <p className="mt-2 text-sm text-[var(--foreground-muted)]">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() => setReloadKey((k) => k + 1)}
                  className="btn btn-primary mt-6"
                >
                  <RefreshCw size={16} aria-hidden="true" />
                  Coba Lagi
                </button>
              </div>
            ) : paginated.length > 0 ? (
              <div key={`${tag}-${page}`} className="tab-panel-enter">
                <ul className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                  {paginated.map((item) => (
                    <li key={item.id}>
                      <ArticleCard item={item} />
                    </li>
                  ))}
                </ul>

                {totalPages > 1 && (
                  <nav
                    aria-label="Navigasi halaman"
                    className="mt-10 flex flex-wrap items-center justify-center gap-2"
                  >
                    <button
                      type="button"
                      disabled={page === 1}
                      onClick={() => goToPage(page - 1)}
                      aria-label="Halaman sebelumnya"
                      className={`${pageButton} border border-[var(--border)] text-[var(--foreground-muted)] hover:border-[var(--primary)] hover:text-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-35`}
                    >
                      <ChevronLeft size={18} />
                    </button>

                    {getPageItems(page, totalPages).map((num, index) =>
                      num === "…" ? (
                        <span
                          key={`gap-${index}`}
                          aria-hidden="true"
                          className="flex h-11 w-6 items-center justify-center text-[var(--foreground-soft)]"
                        >
                          …
                        </span>
                      ) : (
                        <button
                          key={num}
                          type="button"
                          onClick={() => goToPage(num)}
                          aria-label={`Halaman ${num}`}
                          aria-current={page === num ? "page" : undefined}
                          className={`${pageButton} ${
                            page === num
                              ? "bg-[var(--primary)] text-white shadow-sm"
                              : "border border-[var(--border)] text-[var(--foreground-muted)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
                          }`}
                        >
                          {num}
                        </button>
                      )
                    )}

                    <button
                      type="button"
                      disabled={page === totalPages}
                      onClick={() => goToPage(page + 1)}
                      aria-label="Halaman berikutnya"
                      className={`${pageButton} border border-[var(--border)] text-[var(--foreground-muted)] hover:border-[var(--primary)] hover:text-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-35`}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </nav>
                )}
              </div>
            ) : (
              <div
                className={`${glassPanel} mt-7 rounded-[24px] border-dashed px-6 py-16 text-center`}
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary-light)]">
                  <Search
                    size={22}
                    aria-hidden="true"
                    className="text-[var(--primary)]"
                  />
                </div>

                <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                  Artikel Tidak Ditemukan
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--foreground-muted)]">
                  Tidak ada artikel yang sesuai dengan pencarian atau filter
                  yang Anda pilih.
                </p>

                {hasFilter && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="btn btn-primary mt-6"
                  >
                    Tampilkan Semua Artikel
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}