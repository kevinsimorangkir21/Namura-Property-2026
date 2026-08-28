"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { API_URL } from "@/lib/api";
import {
  Search,
  SlidersHorizontal,
  X,
  Building2,
  MapPin,
} from "lucide-react";

export default function DaftarPropertiPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("semua");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProperties() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_URL}/api/properties`, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Gagal memuat data");
        }

        const data = await res.json();

        setProperties(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err?.name !== "AbortError") {
          setError("Gagal memuat data properti. Silakan coba lagi.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchProperties();

    return () => controller.abort();
  }, []);

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return properties.filter((item) => {
      const type = String(item?.type || "").toLowerCase();

      const matchType =
        activeFilter === "semua" || type === activeFilter;

      const searchableText = [
        item?.title,
        item?.location,
        item?.type,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchSearch =
        !keyword || searchableText.includes(keyword);

      return matchType && matchSearch;
    });
  }, [activeFilter, search, properties]);

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <main className="bg-white">
      {/* HERO / HEADER */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-[1280px] px-5 pb-12 pt-16 sm:px-6 sm:pb-14 sm:pt-20 lg:px-8 lg:pb-16 lg:pt-24">
          <div className="mx-auto max-w-[760px] text-center">

            {/* Badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-[#0F6A6A]/10 bg-[#0F6A6A]/[0.06] px-3.5 py-2 text-xs font-semibold tracking-wide text-[#0F6A6A] sm:text-sm">
              <Building2 size={13} />
              Daftar Properti
            </span>

            {/* Heading */}
            <h1 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
              Temukan Properti
              <span className="block text-[#0F6A6A]">
                Impian Anda
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-[650px] text-[15px] leading-7 text-gray-500 sm:text-base lg:text-lg">
              Jelajahi berbagai pilihan properti dengan lokasi strategis,
              desain modern, dan pilihan yang sesuai dengan kebutuhan Anda.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-5 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">

          {/* SEARCH & FILTER */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* Search */}
            <div className="relative w-full lg:max-w-[480px]">
              <Search
                size={19}
                className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama atau lokasi properti..."
                aria-label="Cari properti"
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

            {/* Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
              <div className="mr-1 hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-400 sm:flex">
                <SlidersHorizontal size={15} />
              </div>

              {["semua", "jual", "sewa"].map((item) => {
                const isActive = activeFilter === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setActiveFilter(item)}
                    className={`h-10 shrink-0 rounded-full px-5 text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-[#0F6A6A] text-white shadow-sm"
                        : "border border-gray-200 bg-white text-gray-600 hover:border-[#0F6A6A]/40 hover:text-[#0F6A6A]"
                    }`}
                  >
                    {item === "semua"
                      ? "Semua"
                      : item === "jual"
                        ? "Dijual"
                        : "Disewa"}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RESULT INFO */}
          {!loading && !error && (
            <div className="mt-8 flex flex-col gap-2 border-b border-gray-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">
                  Menampilkan{" "}
                  <span className="font-semibold text-gray-900">
                    {filteredData.length}
                  </span>{" "}
                  properti
                </p>

                {search && (
                  <span className="hidden text-sm text-gray-300 sm:inline">
                    •
                  </span>
                )}

                {search && (
                  <p className="max-w-[220px] truncate text-sm text-gray-400">
                    “{search}”
                  </p>
                )}
              </div>

              {activeFilter !== "semua" && (
                <button
                  type="button"
                  onClick={() => setActiveFilter("semua")}
                  className="self-start text-xs font-semibold text-[#0F6A6A] hover:underline sm:self-auto"
                >
                  Reset filter
                </button>
              )}
            </div>
          )}

          {/* LOADING */}
          {loading ? (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-[28px] border border-gray-100 bg-white"
                >
                  <div className="aspect-[4/3] animate-pulse bg-gray-100" />

                  <div className="space-y-3 p-5">
                    <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
                    <div className="h-6 w-1/2 animate-pulse rounded bg-gray-100" />
                    <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
                    <div className="h-10 w-full animate-pulse rounded-xl bg-gray-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            /* ERROR */
            <div className="mt-8 rounded-[28px] border border-gray-100 px-6 py-20 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
                <Building2
                  size={20}
                  className="text-red-400"
                />
              </div>

              <h3 className="mt-4 text-base font-semibold text-gray-900">
                Tidak dapat memuat properti
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
          ) : filteredData.length > 0 ? (
            /* PROPERTY GRID */
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {filteredData.map((item) => (
                <div
                  key={item.id}
                  className="transition-transform duration-300 hover:-translate-y-1.5"
                >
                  <PropertyCard
                    id={item.id}
                    title={item.title}
                    slug={item.slug}
                    price={item.price}
                    location={item.location}
                    image={item.image}
                    type={item.type}
                  />
                </div>
              ))}
            </div>
          ) : (
            /* EMPTY SEARCH STATE */
            <div className="mt-8 rounded-[28px] border border-dashed border-gray-200 px-6 py-20 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#0F6A6A]/[0.06]">
                <Search
                  size={22}
                  className="text-[#0F6A6A]"
                />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                Properti Tidak Ditemukan
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                Tidak ada properti yang sesuai dengan pencarian atau
                filter Anda. Coba gunakan kata kunci lain.
              </p>

              <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
                {search && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="inline-flex h-10 items-center justify-center rounded-full border border-gray-200 px-5 text-sm font-semibold text-gray-700 transition hover:border-[#0F6A6A] hover:text-[#0F6A6A]"
                  >
                    Hapus Pencarian
                  </button>
                )}

                {activeFilter !== "semua" && (
                  <button
                    type="button"
                    onClick={() => setActiveFilter("semua")}
                    className="inline-flex h-10 items-center justify-center rounded-full bg-[#0F6A6A] px-5 text-sm font-semibold text-white transition hover:bg-[#0C5A5A]"
                  >
                    Tampilkan Semua
                  </button>
                )}
              </div>
            </div>
          )}

          {/* BOTTOM INFORMATION */}
          {!loading && !error && filteredData.length > 0 && (
            <div className="mt-12 flex flex-col items-center justify-center gap-2 border-t border-gray-100 pt-8 text-center">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <MapPin
                  size={14}
                  className="text-[#0F6A6A]"
                />
                Temukan hunian yang sesuai dengan kebutuhan Anda
              </div>

              <Link
                href="/kontak"
                className="text-sm font-semibold text-[#0F6A6A] transition hover:text-[#0C5A5A]"
              >
                Butuh bantuan memilih properti?
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}