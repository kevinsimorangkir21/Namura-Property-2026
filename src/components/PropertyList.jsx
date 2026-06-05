"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { API_URL } from "@/lib/api";
import PropertyCard from "./PropertyCard";
import { ArrowRight, Building2 } from "lucide-react";

export default function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProperties() {
      try {
        const res = await fetch(`${API_URL}/api/properties`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("Gagal memuat data");
        }

        const data = await res.json();

        const sorted = [...(data || [])].sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        );

        setProperties(sorted.slice(0, 6));
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Gagal memuat properti");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();

    return () => controller.abort();
  }, []);

  const totalProperty = useMemo(() => {
    return properties.length;
  }, [properties]);

  return (
    <section className="bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* HEADER */}
        <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-8 mb-12 lg:mb-16">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#0F6A6A]/10 px-4 py-2 text-sm font-medium text-[#0F6A6A]">
              <Building2 size={15} />
              Properti Pilihan
            </span>

            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
              Temukan Properti
              <span className="block text-[#0F6A6A]">
                Impian Anda
              </span>
            </h2>

            <p className="mt-5 text-base sm:text-lg text-gray-600 leading-relaxed">
              Jelajahi berbagai pilihan hunian dan investasi terbaik
              dengan lokasi strategis, desain modern, serta potensi
              nilai yang terus berkembang.
            </p>
          </div>

          <Link
            href="/daftar-properti"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-[#0F6A6A] text-white font-medium hover:opacity-90 transition"
          >
            Lihat Semua Properti
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* STATS */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 lg:mb-14">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <p className="text-2xl font-bold text-gray-900">
                {totalProperty}+
              </p>
              <p className="text-sm text-gray-500">
                Properti Terbaru
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <p className="text-2xl font-bold text-gray-900">
                100%
              </p>
              <p className="text-sm text-gray-500">
                Terverifikasi
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <p className="text-2xl font-bold text-gray-900">
                Premium
              </p>
              <p className="text-sm text-gray-500">
                Lokasi Strategis
              </p>
            </div>
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="h-[380px] rounded-3xl bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="py-20 text-center">
            <p className="text-red-500 font-medium">
              {error}
            </p>
          </div>
        ) : properties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {properties.map((item) => (
                <div
                  key={item.id}
                  className="transition-all duration-300 hover:-translate-y-2"
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

            <div className="flex justify-center mt-12">
              <Link
                href="/daftar-properti"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:border-[#0F6A6A] hover:text-[#0F6A6A] transition"
              >
                Lihat Lebih Banyak
                <ArrowRight size={15} />
              </Link>
            </div>
          </>
        ) : (
          <div className="py-20 text-center">
            <p className="text-gray-500">
              Belum ada properti tersedia.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}