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
    <section className="relative overflow-hidden bg-white">
      <div className="relative mx-auto max-w-[1280px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

        {/* HEADER */}
        <div className="mb-10 flex flex-col gap-7 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">

          {/* Heading */}
          <div className="max-w-[680px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0F6A6A]/10 bg-[#0F6A6A]/[0.06] px-3.5 py-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0F6A6A]/10">
                <Building2
                  size={12}
                  className="text-[#0F6A6A]"
                />
              </span>

              <span className="text-xs font-semibold tracking-wide text-[#0F6A6A] sm:text-sm">
                Properti Pilihan
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
              Temukan Properti
              <span className="block text-[#0F6A6A]">
                Impian Anda
              </span>
            </h2>

            <p className="mt-5 max-w-[600px] text-[15px] leading-7 text-gray-500 sm:text-base lg:text-lg">
              Jelajahi pilihan properti dengan lokasi strategis,
              desain modern, dan karakter hunian yang sesuai dengan
              kebutuhan Anda.
            </p>
          </div>

          {/* Desktop CTA */}
          <Link
            href="/daftar-properti"
            className="group hidden shrink-0 items-center gap-2 rounded-full bg-[#0F6A6A] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(15,106,106,0.15)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0C5A5A] hover:shadow-[0_12px_30px_rgba(15,106,106,0.2)] lg:inline-flex"
          >
            Lihat Semua Properti

            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Mobile CTA */}
        <div className="mb-8 lg:hidden">
          <Link
            href="/daftar-properti"
            className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0F6A6A] px-6 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(15,106,106,0.15)] transition-all duration-200 hover:bg-[#0C5A5A] active:scale-[0.98]"
          >
            Lihat Semua Properti

            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* QUICK INFO */}
        {!loading && !error && properties.length > 0 && (
          <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-gray-100 py-4 lg:mb-12">
            <div className="flex items-center gap-2">
              <CheckCircle2
                size={16}
                className="text-[#0F6A6A]"
              />

              <span className="text-sm text-gray-600">
                {totalProperty} properti pilihan
              </span>
            </div>

            <div className="hidden h-4 w-px bg-gray-200 sm:block" />

            <div className="flex items-center gap-2">
              <MapPin
                size={16}
                className="text-[#0F6A6A]"
              />

              <span className="text-sm text-gray-600">
                Lokasi strategis
              </span>
            </div>

            <div className="hidden h-4 w-px bg-gray-200 sm:block" />

            <div className="flex items-center gap-2">
              <CheckCircle2
                size={16}
                className="text-[#0F6A6A]"
              />

              <span className="text-sm text-gray-600">
                Pilihan terverifikasi
              </span>
            </div>
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-3xl border border-gray-100 bg-white"
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
          /* ERROR STATE */
          <div className="rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <Building2
                size={20}
                className="text-red-400"
              />
            </div>

            <p className="mt-4 text-sm font-medium text-gray-700">
              {error}
            </p>

            <Link
              href="/daftar-properti"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:border-[#0F6A6A] hover:text-[#0F6A6A]"
            >
              Lihat Daftar Properti
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : properties.length > 0 ? (
          <>
            {/* PROPERTY GRID */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {properties.map((item) => (
                <div
                  key={item.id}
                  className="group transition-all duration-300 hover:-translate-y-1.5"
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

            {/* BOTTOM CTA */}
            <div className="mt-12 flex justify-center lg:mt-14">
              <Link
                href="/daftar-properti"
                className="group inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-[#0F6A6A] hover:text-[#0F6A6A] hover:shadow-sm"
              >
                Lihat Lebih Banyak

                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </>
        ) : (
          /* EMPTY STATE */
          <div className="rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#0F6A6A]/[0.07]">
              <Building2
                size={20}
                className="text-[#0F6A6A]"
              />
            </div>

            <p className="mt-4 text-sm font-medium text-gray-700">
              Belum ada properti tersedia.
            </p>

            <p className="mx-auto mt-1 max-w-sm text-sm text-gray-400">
              Silakan kembali lagi nanti untuk melihat pilihan
              properti terbaru kami.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}