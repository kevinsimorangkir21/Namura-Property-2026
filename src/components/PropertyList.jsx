"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { API_URL } from "@/lib/api";
import PropertyCard from "./PropertyCard";

import {
  ArrowRight,
  Building2,
  CheckCircle2,
  MapPin,
} from "lucide-react";

export default function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

        const sorted = Array.isArray(data)
          ? [...data].sort(
              (a, b) =>
                new Date(b?.created_at || 0).getTime() -
                new Date(a?.created_at || 0).getTime()
            )
          : [];

        setProperties(sorted.slice(0, 6));
      } catch (err) {
        if (err?.name !== "AbortError") {
          setError("Gagal memuat properti. Silakan coba lagi.");
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

  const totalProperty = useMemo(() => {
    return properties.length;
  }, [properties]);

  return (
    <section className="relative overflow-hidden bg-[var(--surface)]">
      <div className="container section">

        {/* ==========================================
            SECTION HEADER
            ========================================== */}

        <div className="section-header flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[700px]">

            {/* Eyebrow */}

            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Properti Pilihan
            </div>

            {/* Heading */}

            <h2 className="heading-lg mt-5 text-[var(--foreground)]">
              Temukan Properti
              <span className="block text-[#0F6A6A]">
                yang Tepat untukmu.
              </span>
            </h2>

            {/* Description */}

            <p className="text-body mt-5 max-w-[600px] text-base">
              Jelajahi pilihan rumah, tanah, dan properti
              pilihan di Lampung untuk kebutuhan hunian
              maupun investasi.
            </p>
          </div>

          {/* Desktop CTA */}

          <Link
            href="/daftar-properti"
            className="btn btn-primary hidden shrink-0 lg:inline-flex"
          >
            Lihat Semua Properti

            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* ==========================================
            MOBILE CTA
            ========================================== */}

        <div className="mb-9 lg:hidden">
          <Link
            href="/daftar-properti"
            className="btn btn-primary w-full"
          >
            Lihat Semua Properti

            <ArrowRight size={16} />
          </Link>
        </div>

        {/* ==========================================
            QUICK INFO
            ========================================== */}

        {!loading && !error && properties.length > 0 && (
          <div
            className="
              mb-10
              flex
              flex-wrap
              items-center
              gap-x-7
              gap-y-3
              border-y
              border-[var(--border-soft)]
              py-4
              lg:mb-12
            "
          >
            <div className="flex items-center gap-2">
              <CheckCircle2
                size={16}
                strokeWidth={2}
                className="text-[#0F6A6A]"
              />

              <span className="text-sm text-[var(--foreground-muted)]">
                {totalProperty} properti pilihan
              </span>
            </div>

            <div className="hidden h-4 w-px bg-[var(--border)] sm:block" />

            <div className="flex items-center gap-2">
              <MapPin
                size={16}
                strokeWidth={2}
                className="text-[#0F6A6A]"
              />

              <span className="text-sm text-[var(--foreground-muted)]">
                Lokasi strategis
              </span>
            </div>

            <div className="hidden h-4 w-px bg-[var(--border)] sm:block" />

            <div className="flex items-center gap-2">
              <CheckCircle2
                size={16}
                strokeWidth={2}
                className="text-[#0F6A6A]"
              />

              <span className="text-sm text-[var(--foreground-muted)]">
                Pilihan terverifikasi
              </span>
            </div>
          </div>
        )}

        {/* ==========================================
            LOADING STATE
            ========================================== */}

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="
                  overflow-hidden
                  rounded-[var(--radius-lg)]
                  border
                  border-[var(--border)]
                  bg-[var(--surface)]
                "
              >
                {/* Image Skeleton */}

                <div
                  className="
                    aspect-[4/3]
                    animate-pulse
                    bg-[var(--surface-soft)]
                  "
                />

                {/* Content Skeleton */}

                <div className="space-y-3 p-5">
                  <div className="h-3.5 w-2/3 animate-pulse rounded bg-[var(--surface-soft)]" />

                  <div className="h-6 w-1/2 animate-pulse rounded bg-[var(--surface-soft)]" />

                  <div className="h-4 w-3/4 animate-pulse rounded bg-[var(--surface-soft)]" />

                  <div className="mt-5 h-10 w-full animate-pulse rounded-xl bg-[var(--surface-soft)]" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (

          /* ==========================================
             ERROR STATE
             ========================================== */

          <div
            className="
              rounded-[var(--radius-xl)]
              border
              border-[var(--border)]
              bg-[var(--surface)]
              px-6
              py-20
              text-center
              shadow-[var(--shadow-xs)]
            "
          >
            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-red-50
              "
            >
              <Building2
                size={22}
                className="text-red-400"
              />
            </div>

            <p className="mt-5 text-sm font-semibold text-[var(--foreground)]">
              {error}
            </p>

            <Link
              href="/daftar-properti"
              className="btn btn-outline mt-6"
            >
              Lihat Daftar Properti

              <ArrowRight size={15} />
            </Link>
          </div>
        ) : properties.length > 0 ? (

          /* ==========================================
             PROPERTY GRID
             ========================================== */

          <div
            className="
              grid
              grid-cols-1
              gap-6
              sm:grid-cols-2
              lg:grid-cols-3
              lg:gap-7
            "
          >
            {properties.map((item) => (
              <div
                key={item.id}
                className="
                  group
                  transition-transform
                  duration-300
                  hover:-translate-y-1
                "
              >
                <PropertyCard
                  id={item.id}
                  slug={item.slug}
                  title={item.title}
                  price={item.price}
                  location={item.location}
                  image={item.image}
                  type={item.type}
                />
              </div>
            ))}
          </div>
        ) : (

          /* ==========================================
             EMPTY STATE
             ========================================== */

          <div
            className="
              rounded-[var(--radius-xl)]
              border
              border-[var(--border)]
              bg-[var(--surface)]
              px-6
              py-20
              text-center
              shadow-[var(--shadow-xs)]
            "
          >
            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-[#0F6A6A]/[0.07]
              "
            >
              <Building2
                size={22}
                className="text-[#0F6A6A]"
              />
            </div>

            <p className="mt-5 text-sm font-semibold text-[var(--foreground)]">
              Belum ada properti tersedia.
            </p>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[var(--foreground-muted)]">
              Silakan kembali lagi nanti untuk melihat
              pilihan properti terbaru dari Namura Property.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}