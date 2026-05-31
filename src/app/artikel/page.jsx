"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { articles } from "@/data/articles";
import { Search } from "lucide-react";

export default function ArtikelPage() {
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("semua");
  const [page, setPage] = useState(1);

  const perPage = 6;

  const tags = [
    "semua",
    ...new Set(articles.flatMap((a) => a.tags || [])),
  ];

  const filtered = useMemo(() => {
    return articles.filter((item) => {
      const matchSearch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchTag =
        tag === "semua" || item.tags?.includes(tag);

      return matchSearch && matchTag;
    });
  }, [search, tag]);

  const totalPages = Math.ceil(filtered.length / perPage);

  const paginated = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

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

          <div className="flex flex-wrap gap-3">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTag(t);
                  setPage(1);
                }}
                className={`h-11 px-5 rounded-full text-sm font-medium capitalize transition ${
                  tag === t
                    ? "bg-[#0F6A6A] text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-[#0F6A6A] hover:text-[#0F6A6A]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
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

        {paginated.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginated.map((item) => (
              <Link
                key={item.slug}
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
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={600}
                      height={400}
                      className="
                        w-full
                        h-[240px]
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                    />
                  </div>

                  <div className="p-6">
                    <p className="text-sm text-gray-400">
                      {item.date}
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
            ))}
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
                className={`w-11 h-11 rounded-full text-sm font-medium transition ${
                  page === num
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