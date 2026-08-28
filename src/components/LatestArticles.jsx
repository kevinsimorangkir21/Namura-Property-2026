"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { API_URL, getImageUrl } from "@/lib/api";
import {
  ArrowRight,
  FileText,
  CalendarDays,
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
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

        {/* HEADER */}
        <div className="mb-10 flex flex-col gap-7 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">

          <div className="max-w-[680px]">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0F6A6A]/10 bg-[#0F6A6A]/[0.06] px-3.5 py-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0F6A6A]/10">
                <FileText
                  size={12}
                  className="text-[#0F6A6A]"
                />
              </span>

              <span className="text-xs font-semibold tracking-wide text-[#0F6A6A] sm:text-sm">
                Artikel Terbaru
              </span>
            </div>

            {/* Heading */}
            <h2 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
              Insight & Informasi
              <span className="block text-[#0F6A6A]">
                Seputar Properti
              </span>
            </h2>

            {/* Description */}
            <p className="mt-5 max-w-[600px] text-[15px] leading-7 text-gray-500 sm:text-base lg:text-lg">
              Temukan tips, panduan, dan informasi terbaru untuk
              membantu Anda memahami dunia properti dan membuat
              keputusan yang lebih tepat.
            </p>
          </div>

          {/* Desktop CTA */}
          <Link
            href="/artikel"
            className="group hidden shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-[#0F6A6A] hover:text-[#0F6A6A] hover:shadow-sm lg:inline-flex"
          >
            Lihat Semua Artikel

            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* MOBILE CTA */}
        <div className="mb-8 lg:hidden">
          <Link
            href="/artikel"
            className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-6 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-[#0F6A6A] hover:text-[#0F6A6A] active:scale-[0.98]"
          >
            Lihat Semua Artikel

            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-[28px] border border-gray-100 bg-white"
              >
                {/* Image skeleton */}
                <div className="aspect-[16/10] animate-pulse bg-gray-100" />

                {/* Content skeleton */}
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
          /* ERROR STATE */
          <div className="rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <FileText
                size={20}
                className="text-red-400"
              />
            </div>

            <p className="mt-4 text-sm font-medium text-gray-700">
              {error}
            </p>

            <Link
              href="/artikel"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:border-[#0F6A6A] hover:text-[#0F6A6A]"
            >
              Buka Artikel
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : articles.length > 0 ? (
          /* ARTICLES */
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {articles.map((item) => {
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
                  <article className="h-full overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-gray-200 group-hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)]">

                    {/* IMAGE */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={item.title || "Artikel properti"}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          loading="lazy"
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

                      {/* Image Overlay */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>

                    {/* CONTENT */}
                    <div className="flex min-h-[250px] flex-col p-5 sm:p-6">

                      {/* DATE */}
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <CalendarDays size={13} />

                        <time dateTime={item.created_at}>
                          {formatDate(item.created_at)}
                        </time>
                      </div>

                      {/* TITLE */}
                      <h3 className="mt-3 line-clamp-2 text-lg font-bold leading-snug text-gray-950 transition-colors duration-200 group-hover:text-[#0F6A6A] sm:text-xl">
                        {item.title}
                      </h3>

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
        ) : (
          /* EMPTY STATE */
          <div className="rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#0F6A6A]/[0.07]">
              <FileText
                size={20}
                className="text-[#0F6A6A]"
              />
            </div>

            <p className="mt-4 text-sm font-medium text-gray-700">
              Belum ada artikel tersedia.
            </p>

            <p className="mx-auto mt-1 max-w-sm text-sm text-gray-400">
              Silakan kembali lagi nanti untuk membaca artikel
              terbaru dari kami.
            </p>
          </div>
        )}

        {/* BOTTOM CTA */}
        {!loading && !error && articles.length > 0 && (
          <div className="mt-12 flex justify-center lg:mt-14">
            <Link
              href="/artikel"
              className="group inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-[#0F6A6A] hover:text-[#0F6A6A] hover:shadow-sm"
            >
              Jelajahi Semua Artikel

              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}