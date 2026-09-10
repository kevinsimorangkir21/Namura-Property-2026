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
  ArrowRight,
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
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="bg-white">
        <div className="container section-sm">
          <div className="mx-auto max-w-4xl text-center">
            {/* Eyebrow */}
            <div className="eyebrow justify-center">
              <span className="eyebrow-dot" />
              Daftar Properti
            </div>

            {/* Heading */}
            <h1 className="heading-xl mt-5">
              Temukan Properti
              <span className="block text-[var(--primary)]">
                Impian Anda
              </span>
            </h1>

            {/* Description */}
            <p className="text-body mx-auto mt-6 max-w-2xl">
              Jelajahi berbagai pilihan properti dengan lokasi strategis,
              kualitas terbaik, dan pilihan yang sesuai dengan kebutuhan
              Anda.
            </p>
          </div>

          {/* =================================================
              SEARCH PANEL
          ================================================== */}
          <div className="mx-auto mt-10 max-w-5xl sm:mt-12">
            <div
              className="
                rounded-[var(--radius-xl)]
                border border-[var(--border)]
                bg-white
                p-3
                shadow-[var(--shadow-md)]
                sm:p-4
              "
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                {/* Search */}
                <div className="relative flex-1">
                  <Search
                    className="
                      pointer-events-none
                      absolute left-5 top-1/2
                      h-5 w-5
                      -translate-y-1/2
                      text-[var(--foreground-soft)]
                    "
                    strokeWidth={1.8}
                  />

                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari nama, lokasi, atau tipe properti..."
                    aria-label="Cari properti"
                    className="
                      h-14 w-full
                      rounded-2xl
                      border border-[var(--border)]
                      bg-[var(--surface-soft)]
                      pl-13 pr-12
                      text-sm
                      text-[var(--foreground)]
                      outline-none
                      transition-all
                      placeholder:text-[var(--foreground-soft)]
                      focus:border-[var(--primary)]
                      focus:bg-white
                      focus:ring-4
                      focus:ring-[var(--primary)]/[0.07]
                    "
                  />

                  {search && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      aria-label="Hapus pencarian"
                      className="
                        absolute right-4 top-1/2
                        flex h-8 w-8
                        -translate-y-1/2
                        items-center justify-center
                        rounded-full
                        text-[var(--foreground-soft)]
                        transition
                        hover:bg-[var(--border-soft)]
                        hover:text-[var(--foreground)]
                      "
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Filter */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
                  <div
                    className="
                      hidden h-11 w-11
                      shrink-0
                      items-center justify-center
                      rounded-xl
                      bg-[var(--primary-light)]
                      text-[var(--primary)]
                      sm:flex
                    "
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                  </div>

                  {["semua", "jual", "sewa"].map((item) => {
                    const isActive = activeFilter === item;

                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setActiveFilter(item)}
                        className={`
                          h-11
                          shrink-0
                          rounded-xl
                          px-5
                          text-sm
                          font-semibold
                          transition-all
                          duration-200
                          ${
                            isActive
                              ? "bg-[var(--primary)] text-white shadow-[var(--shadow-primary)]"
                              : "border border-[var(--border)] bg-white text-[var(--foreground-muted)] hover:border-[var(--primary)]/30 hover:text-[var(--primary)]"
                          }
                        `}
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
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROPERTY CONTENT
      ====================================================== */}
      <section className="bg-white">
        <div className="container section-tight">
          {/* =================================================
              RESULT HEADER
          ================================================== */}
          {!loading && !error && (
            <div
              className="
                flex flex-col gap-4
                border-b border-[var(--border-soft)]
                pb-6
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div>
                <p className="text-sm text-[var(--foreground-muted)]">
                  Menampilkan{" "}
                  <span className="font-semibold text-[var(--foreground)]">
                    {filteredData.length}
                  </span>{" "}
                  properti
                  {search && (
                    <>
                      {" "}
                      untuk{" "}
                      <span className="font-semibold text-[var(--primary)]">
                        “{search}”
                      </span>
                    </>
                  )}
                </p>
              </div>

              {activeFilter !== "semua" && (
                <button
                  type="button"
                  onClick={() => setActiveFilter("semua")}
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    self-start
                    text-xs
                    font-semibold
                    text-[var(--primary)]
                    transition
                    hover:opacity-70
                    sm:self-auto
                  "
                >
                  Reset filter
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          )}

          {/* =================================================
              LOADING
          ================================================== */}
          {loading ? (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {[...Array(6)].map((_, index) => (
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
                  <div className="aspect-[4/3] animate-pulse bg-[var(--surface-muted)]" />

                  {/* Content */}
                  <div className="space-y-4 p-5 sm:p-6">
                    <div className="h-4 w-2/3 animate-pulse rounded-md bg-[var(--surface-muted)]" />

                    <div className="h-6 w-1/2 animate-pulse rounded-md bg-[var(--surface-muted)]" />

                    <div className="h-4 w-3/4 animate-pulse rounded-md bg-[var(--surface-muted)]" />

                    <div className="h-10 w-full animate-pulse rounded-xl bg-[var(--surface-muted)]" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            /* =================================================
               ERROR
            ================================================== */
            <div
              className="
                mt-8
                rounded-[var(--radius-lg)]
                border border-[var(--border)]
                bg-white
                px-6 py-20
                text-center
                shadow-[var(--shadow-sm)]
              "
            >
              <div
                className="
                  mx-auto
                  flex h-14 w-14
                  items-center justify-center
                  rounded-full
                  bg-red-50
                "
              >
                <Building2
                  className="h-6 w-6 text-red-400"
                  strokeWidth={1.6}
                />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-[var(--foreground)]">
                Tidak dapat memuat properti
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--foreground-muted)]">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="btn btn-primary mt-6"
              >
                Coba Lagi
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : filteredData.length > 0 ? (
            /* =================================================
               PROPERTY GRID
            ================================================== */
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {filteredData.map((item) => (
                <div
                  key={item.id}
                  className="
                    transition-transform
                    duration-300
                    hover:-translate-y-1
                  "
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
            /* =================================================
               EMPTY SEARCH STATE
            ================================================== */
            <div
              className="
                mt-8
                rounded-[var(--radius-lg)]
                border border-dashed
                border-[var(--border)]
                bg-[var(--surface-soft)]
                px-6 py-20
                text-center
              "
            >
              <div
                className="
                  mx-auto
                  flex h-14 w-14
                  items-center justify-center
                  rounded-full
                  bg-[var(--primary-light)]
                "
              >
                <Search
                  className="h-6 w-6 text-[var(--primary)]"
                  strokeWidth={1.7}
                />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-[var(--foreground)]">
                Properti Tidak Ditemukan
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--foreground-muted)]">
                Tidak ada properti yang sesuai dengan pencarian atau filter
                Anda. Coba gunakan kata kunci lain.
              </p>

              <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
                {search && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="btn btn-outline"
                  >
                    Hapus Pencarian
                  </button>
                )}

                {activeFilter !== "semua" && (
                  <button
                    type="button"
                    onClick={() => setActiveFilter("semua")}
                    className="btn btn-primary"
                  >
                    Tampilkan Semua
                  </button>
                )}
              </div>
            </div>
          )}

          {/* =================================================
              BOTTOM HELP
          ================================================== */}
          {!loading && !error && filteredData.length > 0 && (
            <div
              className="
                mt-12
                border-t border-[var(--border-soft)]
                pt-8
                text-center
                lg:mt-14
              "
            >
              <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
                <div className="flex items-center gap-2 text-xs text-[var(--foreground-soft)] sm:text-sm">
                  <MapPin
                    className="h-3.5 w-3.5 text-[var(--primary)]"
                    strokeWidth={1.8}
                  />

                  Temukan hunian yang sesuai dengan kebutuhan Anda
                </div>

                <span className="hidden text-[var(--border)] sm:inline">
                  •
                </span>

                <Link
                  href="/kontak"
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    text-sm
                    font-semibold
                    text-[var(--primary)]
                    transition
                    hover:opacity-70
                  "
                >
                  Butuh bantuan memilih properti?
                  <ArrowRight
                    className="h-3.5 w-3.5"
                    strokeWidth={2}
                  />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}