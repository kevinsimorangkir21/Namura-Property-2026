"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { API_URL, getImageUrl } from "@/lib/api";
import {
  ArrowRight,
  CalendarDays,
  FileText,
} from "lucide-react";

export default function LatestArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
          ? data
              .filter(
                (article) =>
                  String(article?.status || "").toLowerCase() ===
                  "published"
              )
              .sort(
                (a, b) =>
                  new Date(b?.created_at || 0).getTime() -
                  new Date(a?.created_at || 0).getTime()
              )
              .slice(0, 3)
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

  return (
    <section className="bg-white">
      <div className="container section">

        {/* =========================
            HEADER
        ========================== */}
        <div className="section-header">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Artikel Terbaru
            </div>

            {/* Heading */}
            <h2 className="heading-lg mt-5">
              Insight & Informasi
              <span className="block text-[var(--primary)]">
                Seputar Properti
              </span>
            </h2>

            {/* Description */}
            <p className="text-body mt-6 max-w-xl">
              Temukan tips, panduan, dan informasi terbaru untuk membantu Anda
              memahami dunia properti dan membuat keputusan yang lebih tepat.
            </p>
          </div>

          {/* Desktop CTA */}
          <Link
            href="/artikel"
            className="btn btn-outline group hidden shrink-0 lg:inline-flex"
          >
            Lihat Semua Artikel

            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2}
            />
          </Link>
        </div>

        {/* =========================
            MOBILE CTA
        ========================== */}
        <div className="mb-8 lg:hidden">
          <Link
            href="/artikel"
            className="btn btn-outline group w-full"
          >
            Lihat Semua Artikel

            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2}
            />
          </Link>
        </div>

        {/* =========================
            LOADING
        ========================== */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="
                  overflow-hidden
                  rounded-[var(--radius-lg)]
                  border border-[var(--border)]
                  bg-white
                "
              >
                {/* Image */}
                <div className="aspect-[16/10] animate-pulse bg-[var(--surface-muted)]" />

                {/* Content */}
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
            ))}
          </div>
        ) : error ? (
          /* =========================
             ERROR STATE
          ========================== */
          <div
            className="
              rounded-[var(--radius-lg)]
              border border-[var(--border)]
              bg-white
              px-6 py-16
              text-center
              shadow-[var(--shadow-sm)]
            "
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <FileText
                className="h-5 w-5 text-red-400"
                strokeWidth={1.8}
              />
            </div>

            <p className="mt-4 text-sm font-medium text-[var(--foreground)]">
              {error}
            </p>

            <Link
              href="/artikel"
              className="btn btn-outline mt-6"
            >
              Buka Artikel
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : articles.length > 0 ? (
          /* =========================
             ARTICLES
          ========================== */
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {articles.map((item) => {
              const imageSrc = item?.thumbnail || item?.image;

              const imageUrl = imageSrc
                ? getImageUrl(imageSrc)
                : null;

              return (
                <Link
                  key={item.id}
                  href={`/artikel/${item.slug}`}
                  className="group block h-full"
                >
                  <article
                    className="
                      flex h-full flex-col
                      overflow-hidden
                      rounded-[var(--radius-lg)]
                      border border-[var(--border)]
                      bg-white
                      shadow-[var(--shadow-sm)]
                      transition-all duration-300
                      group-hover:-translate-y-1
                      group-hover:border-[var(--primary)]/20
                      group-hover:shadow-[var(--shadow-lg)]
                    "
                  >
                    {/* =========================
                        IMAGE
                    ========================== */}
                    <div
                      className="
                        relative
                        aspect-[16/10]
                        overflow-hidden
                        bg-[var(--surface-muted)]
                      "
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={item.title || "Artikel properti"}
                          className="
                            h-full w-full object-cover
                            transition-transform duration-700
                            group-hover:scale-[1.045]
                          "
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                            <FileText
                              className="h-6 w-6 text-[var(--primary)]"
                              strokeWidth={1.5}
                            />
                          </div>
                        </div>
                      )}

                      {/* Image overlay */}
                      <div
                        className="
                          pointer-events-none
                          absolute inset-0
                          bg-gradient-to-t
                          from-black/20
                          via-transparent
                          to-transparent
                          opacity-0
                          transition-opacity duration-300
                          group-hover:opacity-100
                        "
                      />

                      {/* Article Badge */}
                      <div className="absolute left-4 top-4">
                        <span
                          className="
                            inline-flex items-center gap-1.5
                            rounded-full
                            bg-white/95
                            px-3 py-1.5
                            text-[11px]
                            font-semibold
                            text-[var(--primary)]
                            shadow-sm
                            backdrop-blur-sm
                          "
                        >
                          <FileText className="h-3 w-3" />
                          Properti
                        </span>
                      </div>
                    </div>

                    {/* =========================
                        CONTENT
                    ========================== */}
                    <div className="flex min-h-[245px] flex-1 flex-col p-5 sm:p-6">

                      {/* Date */}
                      <div
                        className="
                          flex items-center gap-1.5
                          text-xs font-medium
                          text-[var(--foreground-soft)]
                        "
                      >
                        <CalendarDays className="h-3.5 w-3.5" />

                        <time dateTime={item.created_at}>
                          {formatDate(item.created_at)}
                        </time>
                      </div>

                      {/* Title */}
                      <h3
                        className="
                          mt-3
                          line-clamp-2
                          text-lg
                          font-bold
                          leading-snug
                          tracking-tight
                          text-[var(--foreground)]
                          transition-colors duration-200
                          group-hover:text-[var(--primary)]
                          sm:text-xl
                        "
                      >
                        {item.title}
                      </h3>

                      {/* Excerpt */}
                      {item.excerpt && (
                        <p
                          className="
                            mt-3
                            line-clamp-3
                            text-sm
                            leading-6
                            text-[var(--foreground-muted)]
                          "
                        >
                          {item.excerpt}
                        </p>
                      )}

                      {/* Read More */}
                      <div className="mt-auto pt-6">
                        <span
                          className="
                            inline-flex
                            items-center
                            gap-2
                            text-sm
                            font-semibold
                            text-[var(--primary)]
                          "
                        >
                          Baca Selengkapnya

                          <ArrowRight
                            className="
                              h-4 w-4
                              transition-transform duration-300
                              group-hover:translate-x-1
                            "
                            strokeWidth={2}
                          />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        ) : (
          /* =========================
             EMPTY STATE
          ========================== */
          <div
            className="
              rounded-[var(--radius-lg)]
              border border-[var(--border)]
              bg-white
              px-6 py-16
              text-center
              shadow-[var(--shadow-sm)]
            "
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary-light)]">
              <FileText
                className="h-5 w-5 text-[var(--primary)]"
                strokeWidth={1.8}
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