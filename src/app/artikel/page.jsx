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

  // ambil semua tag unik
  const tags = ["semua", ...new Set(articles.flatMap(a => a.tags || []))];

  // FILTER
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

  // PAGINATION
  const totalPages = Math.ceil(filtered.length / perPage);

  const paginated = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-3xl font-semibold text-gray-900">
            Artikel
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Insight & tips properti terbaru
          </p>
        </div>

        {/* SEARCH + TAG */}
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-10">

          {/* SEARCH (FIX NO STROKE) */}
          <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2 w-full md:max-w-sm">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              placeholder="Cari artikel..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="bg-transparent outline-none text-sm w-full border-none focus:ring-0"
            />
          </div>

          {/* TAG FILTER */}
          <div className="flex gap-3 flex-wrap">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTag(t);
                  setPage(1);
                }}
                className={`px-4 py-1 rounded-full text-xs capitalize ${
                  tag === t
                    ? "bg-[var(--primary)] text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          {paginated.map((item) => (
            <Link key={item.slug} href={`/artikel/${item.slug}`}>
              <div className="group cursor-pointer">

                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={250}
                  className="rounded-xl object-cover w-full h-[200px]"
                />

                <p className="text-xs text-gray-400 mt-3">
                  {item.date}
                </p>

                <h3 className="font-medium mt-2 group-hover:text-[var(--primary)] transition">
                  {item.title}
                </h3>

              </div>
            </Link>
          ))}
        </div>

        {/* EMPTY */}
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 mt-10 text-sm">
            Artikel tidak ditemukan
          </p>
        )}

        {/* PAGINATION */}
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-9 h-9 rounded-full text-sm ${
                page === i + 1
                  ? "bg-[var(--primary)] text-white"
                  : "bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}