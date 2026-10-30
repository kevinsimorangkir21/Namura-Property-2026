"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { API_URL, getImageUrl } from "@/lib/api";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  FileText,
  RefreshCw,
} from "lucide-react";

const MAX_ITEMS = 3;

const glassPanel =
  "border border-[var(--border)] bg-[var(--glass-bg-strong)] shadow-[var(--shadow-glass)] backdrop-blur-xl";

const rowClass =
  "-mx-[18px] -my-4 flex snap-x snap-mandatory scroll-px-[18px] gap-4 overflow-x-auto px-[18px] py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:my-0 lg:grid lg:grid-cols-3 lg:gap-7 lg:overflow-visible lg:px-0 lg:py-0";

const itemClass =
  "w-[85%] shrink-0 snap-start sm:w-[calc(50%-8px)] lg:w-auto";

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

function ArticleCard({ item }) {
  const [imageError, setImageError] = useState(false);

  const imageSrc = item?.thumbnail || item?.image;
  const imageUrl = imageSrc && !imageError ? getImageUrl(imageSrc) : null;

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
                  className="h-6 w-6 text-[var(--primary)]"
                  strokeWidth={1.5}
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
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-[var(--glass-bg-strong)] px-3 py-1.5 text-[11px] font-semibold text-[var(--primary)] shadow-sm backdrop-blur-md">
              <FileText className="h-3 w-3" aria-hidden="true" />
              {item.category || "Properti"}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--foreground-soft)]">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            <time dateTime={item.created_at}>{formatDate(item.created_at)}</time>
          </div>

          <h3 className="mt-3 line-clamp-2 text-lg font-bold leading-snug tracking-tight text-[var(--foreground)] transition-colors duration-200 group-hover:text-[var(--primary)] sm:text-xl">
            {item.title}
          </h3>

          {item.excerpt && (
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {item.excerpt}
            </p>
          )}

          <div className="mt-auto pt-6">
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

export default function LatestArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

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
          ? data
              .filter(
                (article) =>
                  String(article?.status || "").toLowerCase() === "published"
              )
              .sort(
                (a, b) =>
                  new Date(b?.created_at || 0).getTime() -
                  new Date(a?.created_at || 0).getTime()
              )
              .slice(0, MAX_ITEMS)
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

  return (
    <section className="bg-[var(--surface)]">
      <div className="container section">
        <div className="section-header flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Artikel Terbaru
            </div>

            <h2 className="heading-lg mt-5">
              Insight & Informasi
              <span className="block text-[var(--primary)]">
                Seputar Properti
              </span>
            </h2>

            <p className="text-body mt-6 max-w-xl">
              Temukan tips, panduan, dan informasi terbaru untuk membantu Anda
              memahami dunia properti dan membuat keputusan yang lebih tepat.
            </p>
          </div>

          <Link
            href="/artikel"
            className="btn btn-outline group hidden shrink-0 lg:inline-flex"
          >
            Lihat Semua Artikel
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2}
              aria-hidden="true"
            />
          </Link>
        </div>

        {loading ? (
          <div className={rowClass} aria-busy="true">
            {[0, 1, 2].map((i) => (
              <div key={i} className={itemClass}>
                <div
                  className={`${glassPanel} overflow-hidden rounded-[var(--radius-lg)]`}
                >
                  <div className="aspect-[16/10] animate-pulse bg-[var(--surface-muted)]" />
                  <div className="space-y-4 p-5 sm:p-6">
                    <div className="h-3 w-28 animate-pulse rounded-full bg-[var(--surface-muted)]" />
                    <div className="h-6 w-full animate-pulse rounded-md bg-[var(--surface-muted)]" />
                    <div className="h-4 w-5/6 animate-pulse rounded-md bg-[var(--surface-muted)]" />
                    <div className="h-4 w-2/3 animate-pulse rounded-md bg-[var(--surface-muted)]" />
                    <div className="pt-2">
                      <div className="h-4 w-32 animate-pulse rounded-md bg-[var(--surface-muted)]" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div
            role="alert"
            className={`${glassPanel} rounded-[var(--radius-lg)] px-6 py-16 text-center`}
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--danger)]/10">
              <FileText
                className="h-5 w-5 text-[var(--danger)]"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </div>

            <p className="mt-4 text-sm font-medium text-[var(--foreground)]">
              {error}
            </p>

            <button
              type="button"
              onClick={() => setReloadKey((k) => k + 1)}
              className="btn btn-primary mt-6"
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Coba Lagi
            </button>
          </div>
        ) : articles.length > 0 ? (
          <>
            <ul className={rowClass}>
              {articles.map((item) => (
                <li key={item.id} className={itemClass}>
                  <ArticleCard item={item} />
                </li>
              ))}
            </ul>

            <div className="mt-8 lg:hidden">
              <Link href="/artikel" className="btn btn-outline group w-full">
                Lihat Semua Artikel
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </>
        ) : (
          <div
            className={`${glassPanel} rounded-[var(--radius-lg)] px-6 py-16 text-center`}
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary-light)]">
              <FileText
                className="h-5 w-5 text-[var(--primary)]"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </div>

            <p className="mt-4 text-sm font-semibold text-[var(--foreground)]">
              Belum ada artikel tersedia.
            </p>

            <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-[var(--foreground-muted)]">
              Silakan kembali lagi nanti untuk membaca artikel terbaru dari
              kami.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}