"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { API_URL, getImageUrl } from "@/lib/api";
import { MapPin, ArrowRight, Star } from "lucide-react";

export default function Hero() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch(`${API_URL}/api/properties`);
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        setProperties(data || []);
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, []);

  const unitAvailable =
    properties.filter((p) => (p.status || "").toLowerCase() === "aktif")
      .length || properties.length;

  const featuredProperty =
    properties.length > 0
      ? properties.find((p) => p.featured) ||
        [...properties].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        )[0]
      : null;

  const heroImage = featuredProperty?.image
    ? getImageUrl(featuredProperty.image)
    : null;

  const formatPrice = (price) => {
    if (!price) return "Rp –";
    return `Rp ${Number(price).toLocaleString("id-ID")}`;
  };

  return (
    <section className="relative bg-white overflow-hidden">

      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0F6A6A]/[0.04] rounded-full translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0F6A6A]/[0.03] rounded-full -translate-x-1/3 translate-y-1/4" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6 py-16 sm:py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — COPY */}
          <div className="flex flex-col">

            {/* BADGE */}
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-[#0F6A6A]/10 px-4 py-2">
              <Star size={13} className="text-[#0F6A6A] fill-[#0F6A6A]" />
              <span className="text-sm font-medium text-[#0F6A6A]">
                Perusahaan Properti Terpercaya
              </span>
            </div>

            {/* HEADING */}
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.15] tracking-tight text-gray-900">
              Hunian Berkualitas
              <br />
              <span className="text-[#0F6A6A]">Untuk Masa Depan</span>
              <br />
              Anda
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-gray-500 max-w-[500px]">
              Menyediakan pilihan properti terbaik dengan lokasi strategis,
              desain modern, serta nilai investasi yang terus berkembang untuk
              keluarga Indonesia.
            </p>

            {/* CTA BUTTONS */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/daftar-properti"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-[#0F6A6A] text-white text-sm font-medium hover:opacity-90 active:scale-[.98] transition"
              >
                Lihat Properti
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/kontak"
                className="inline-flex items-center h-12 px-7 rounded-full border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
              >
                Hubungi Kami
              </Link>
            </div>

            {/* STATS */}
            <div className="mt-12 flex items-center gap-8 pt-8 border-t border-gray-100">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? "..." : unitAvailable > 0 ? `${unitAvailable}+` : "0"}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">Unit Tersedia</p>
              </div>
              <div className="w-px h-10 bg-gray-100" />
              <div>
                <p className="text-2xl font-bold text-gray-900">10+</p>
                <p className="text-xs text-gray-400 mt-0.5">Tahun Pengalaman</p>
              </div>
              <div className="w-px h-10 bg-gray-100" />
              <div>
                <p className="text-2xl font-bold text-gray-900">500+</p>
                <p className="text-xs text-gray-400 mt-0.5">Keluarga Puas</p>
              </div>
            </div>

          </div>

          {/* RIGHT — IMAGE */}
          <div className="relative">

            {/* MAIN IMAGE */}
            <div className="relative rounded-[28px] overflow-hidden shadow-2xl aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5]">
              {heroImage ? (
                <img
                  src={heroImage}
                  alt="Properti Unggulan"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src="/Asset/Properti5/Asset1.png"
                  alt="Properti Unggulan"
                  fill
                  priority
                  className="object-cover"
                />
              )}
              {/* GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* FEATURED PROPERTY CARD — BOTTOM LEFT */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 right-4 sm:right-auto bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3.5 sm:px-5 sm:py-4 shadow-xl border border-white/80 max-w-[240px]">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                Properti Unggulan
              </p>
              <p className="mt-1 text-base sm:text-lg font-bold text-gray-900 leading-tight">
                {featuredProperty
                  ? formatPrice(featuredProperty.price)
                  : "Rp 750.000.000"}
              </p>
              {(featuredProperty?.location || "Lampung Selatan") && (
                <div className="flex items-center gap-1 mt-1">
                  <MapPin size={11} className="text-[#0F6A6A] flex-shrink-0" />
                  <p className="text-xs text-gray-500 truncate">
                    {featuredProperty?.location || "Lampung Selatan"}
                  </p>
                </div>
              )}
            </div>

            {/* UNIT CARD — TOP RIGHT */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-[#0F6A6A] rounded-2xl px-4 py-3 sm:px-5 sm:py-4 shadow-xl">
              <p className="text-[10px] text-white/70 font-medium uppercase tracking-wider">
                Unit Tersedia
              </p>
              <p className="mt-1 text-2xl sm:text-3xl font-bold text-white leading-none">
                {loading ? "..." : unitAvailable > 0 ? `${unitAvailable}+` : "0"}
              </p>
            </div>

            {/* DECORATIVE DOT GRID */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 opacity-20 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, #0F6A6A 1.5px, transparent 1.5px)",
                backgroundSize: "12px 12px",
              }}
            />

          </div>

        </div>
      </div>
    </section>
  );
}