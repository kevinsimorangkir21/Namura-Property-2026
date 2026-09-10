"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  FileText,
  MessageCircle,
} from "lucide-react";

import { API_URL, getImageUrl } from "@/lib/api";

export default function ArtikelDetail() {
  const params = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  /* =========================================================
     FETCH ARTICLE
  ========================================================= */
  useEffect(() => {
    async function fetchArticle() {
      try {
        setLoading(true);
        setError(false);

        const res = await fetch(
          `${API_URL}/api/articles/slug/${params.slug}`
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

    if (params.slug) {
      fetchArticle();
    }
  }, [params.slug]);

  /* =========================================================
     LOADING
  ========================================================= */
  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="container py-10 sm:py-12 lg:py-16 animate-pulse">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2">
            <div className="h-4 w-16 rounded bg-[var(--surface-muted)]" />
            <div className="h-4 w-3 rounded bg-[var(--surface-muted)]" />
            <div className="h-4 w-20 rounded bg-[var(--surface-muted)]" />
          </div>

          {/* Header */}
          <div className="mx-auto mt-10 max-w-[900px]">
            <div className="h-8 w-24 rounded-full bg-[var(--surface-muted)]" />

            <div className="mt-5 h-12 w-full rounded bg-[var(--surface-muted)] sm:h-14" />

            <div className="mt-3 h-12 w-4/5 rounded bg-[var(--surface-muted)] sm:h-14" />

            <div className="mt-5 h-4 w-64 rounded bg-[var(--surface-muted)]" />
          </div>

          {/* Thumbnail */}
          <div className="mx-auto mt-9 max-w-[1100px] overflow-hidden rounded-[28px]">
            <div className="h-[300px] bg-[var(--surface-muted)] sm:h-[420px] lg:h-[520px]" />
          </div>

          {/* Content */}
          <div className="mx-auto mt-10 max-w-[820px] space-y-4">
            <div className="h-4 w-full rounded bg-[var(--surface-muted)]" />
            <div className="h-4 w-full rounded bg-[var(--surface-muted)]" />
            <div className="h-4 w-5/6 rounded bg-[var(--surface-muted)]" />
            <div className="h-4 w-full rounded bg-[var(--surface-muted)]" />
            <div className="h-4 w-4/6 rounded bg-[var(--surface-muted)]" />
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */
  if (error || !article) {
    return (
      <main className="min-h-screen bg-white">
        <div className="container flex min-h-[65vh] items-center justify-center py-16">
          <div className="w-full max-w-[500px] text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary-light)]">
              <FileText
                size={22}
                className="text-[var(--primary)]"
              />
            </div>

            <h1 className="mt-5 text-2xl font-bold tracking-tight text-[var(--foreground)]">
              Artikel Tidak Ditemukan
            </h1>

            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Artikel yang Anda cari tidak tersedia atau mungkin
              sudah tidak dipublikasikan.
            </p>

            <Link
              href="/artikel"
              className="btn btn-primary group mt-6"
            >
              <ArrowLeft size={16} />

              Kembali ke Artikel

              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </main>
    );
  }

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

  const imageUrl = article.thumbnail
    ? getImageUrl(article.thumbnail)
    : null;

  return (
    <main className="overflow-hidden bg-white text-[var(--foreground)]">
      {/* =========================================================
          ARTICLE HEADER
      ========================================================= */}
      <section className="bg-white">
        <div className="container py-8 sm:py-10 lg:py-12">
          {/* =====================================================
              BREADCRUMB
          ===================================================== */}
          <div className="flex items-center gap-2 overflow-hidden text-xs text-[var(--muted)] sm:text-sm">
            <Link
              href="/"
              className="shrink-0 transition-colors hover:text-[var(--primary)]"
            >
              Beranda
            </Link>

            <span className="text-[var(--soft)]">/</span>

            <Link
              href="/artikel"
              className="shrink-0 transition-colors hover:text-[var(--primary)]"
            >
              Artikel
            </Link>

            <span className="text-[var(--soft)]">/</span>

            <span className="truncate text-[var(--secondary)]">
              {article.title}
            </span>
          </div>

          {/* =====================================================
              ARTICLE HEADING
          ===================================================== */}
          <div className="mx-auto mt-9 max-w-[920px]">
            {/* STATUS */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--primary-light)] px-3 py-1.5 text-[10px] font-semibold capitalize text-[var(--primary)] sm:text-xs">
                <CheckCircle2 size={12} />

                {article.status || "published"}
              </span>

              {Array.isArray(article?.tags) &&
                article.tags.length > 0 && (
                  <>
                    {article.tags.slice(0, 2).map((itemTag) => (
                      <span
                        key={itemTag}
                        className="rounded-full border border-[var(--border)] px-3 py-1.5 text-[10px] font-medium capitalize text-[var(--muted)] sm:text-xs"
                      >
                        {itemTag}
                      </span>
                    ))}
                  </>
                )}
            </div>

            {/* TITLE */}
            <h1 className="mt-5 text-3xl font-bold leading-[1.08] tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl xl:text-[56px]">
              {article.title}
            </h1>

            {/* META */}
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--muted)]">
              <span className="font-medium text-[var(--secondary)]">
                {article.author?.name || "Admin"}
              </span>

              <span className="h-1 w-1 rounded-full bg-[var(--soft)]" />

              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={14} />

                <time dateTime={article.created_at}>
                  {formatDate(article.created_at)}
                </time>
              </span>
            </div>
          </div>

          {/* =====================================================
              THUMBNAIL
          ===================================================== */}
          {imageUrl && (
            <div className="mx-auto mt-9 max-w-[1120px] overflow-hidden rounded-[26px] border border-[var(--border-soft)] bg-[var(--surface-muted)] sm:mt-10 sm:rounded-[30px]">
              <img
                src={imageUrl}
                alt={article.title}
                className="h-[280px] w-full object-cover sm:h-[400px] lg:h-[500px]"
              />
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          ARTICLE CONTENT
      ========================================================= */}
      <section className="bg-white">
        <div className="container pb-14 sm:pb-16 lg:pb-20">
          <div className="mx-auto max-w-[820px]">
            {/* ===================================================
                EXCERPT
            =================================================== */}
            {article.excerpt && (
              <div className="relative rounded-[22px] border border-[var(--primary)]/10 bg-[var(--primary-light)]/50 p-5 sm:p-6">
                <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-full bg-[var(--primary)]" />

                <div className="pl-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--primary)]">
                    Ringkasan
                  </p>

                  <p className="mt-2.5 text-sm leading-7 text-[var(--secondary)] sm:text-base">
                    {article.excerpt}
                  </p>
                </div>
              </div>
            )}

            {/* ===================================================
                CONTENT
            =================================================== */}
            <article
              className={`mt-9 text-[16px] leading-8 text-[var(--secondary)] sm:text-[17px] sm:leading-[1.9] ${
                article.excerpt ? "lg:mt-10" : "mt-8"
              }`}
            >
              <div className="whitespace-pre-wrap">
                {article.content}
              </div>
            </article>

            {/* ===================================================
                ARTICLE FOOTER
            =================================================== */}
            <div className="mt-10 border-t border-[var(--border-soft)] pt-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                {/* TAGS */}
                {Array.isArray(article?.tags) &&
                article.tags.length > 0 ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="mr-1 text-xs font-medium text-[var(--muted)]">
                      Tags:
                    </span>

                    {article.tags.map((itemTag) => (
                      <span
                        key={itemTag}
                        className="rounded-full bg-[var(--surface-muted)] px-3 py-1.5 text-[10px] font-semibold capitalize text-[var(--muted)]"
                      >
                        {itemTag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div />
                )}

                {/* BACK */}
                <Link
                  href="/artikel"
                  className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[var(--primary)] transition hover:opacity-70"
                >
                  <ArrowLeft size={15} />

                  Semua Artikel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SMALL CTA
      ========================================================= */}
      <section className="bg-white pb-14 sm:pb-16 lg:pb-20">
        <div className="container">
          <div className="mx-auto max-w-[820px] overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--surface-muted)] p-6 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[var(--primary)] shadow-sm">
                  <MessageCircle size={19} />
                </div>

                <div>
                  <h2 className="text-base font-bold text-[var(--foreground)] sm:text-lg">
                    Punya pertanyaan tentang properti?
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-[var(--muted)] sm:text-sm">
                    Konsultasikan kebutuhan Anda bersama tim Namura
                    Property.
                  </p>
                </div>
              </div>

              <a
                href="https://wa.me/6281369381111"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary group shrink-0"
              >
                Konsultasi

                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}