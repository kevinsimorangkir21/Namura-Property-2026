"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { API_URL, getImageUrl } from "@/lib/api";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Star,
} from "lucide-react";

export default function Hero() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProperties() {
      try {
        const res = await fetch(`${API_URL}/api/properties`, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch properties");
        }

        const data = await res.json();

        if (Array.isArray(data)) {
          setProperties(data);
        } else {
          setProperties([]);
        }
      } catch (error) {
        if (error?.name !== "AbortError") {
          setProperties([]);
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

  const unitAvailable = useMemo(() => {
    if (!properties.length) return 0;

    const activeUnits = properties.filter(
      (property) =>
        String(property?.status || "").toLowerCase() === "aktif"
    ).length;

    return activeUnits || properties.length;
  }, [properties]);

  const featuredProperty = useMemo(() => {
    if (!properties.length) return null;

    return (
      properties.find((property) => property?.featured) ||
      [...properties].sort(
        (a, b) =>
          new Date(b?.created_at || 0).getTime() -
          new Date(a?.created_at || 0).getTime()
      )[0]
    );
  }, [properties]);

  const heroImage = featuredProperty?.image
    ? getImageUrl(featuredProperty.image)
    : "/Asset/Properti5/Asset1.png";

  const propertyLocation =
    featuredProperty?.location ||
    "Lokasi tersedia di daftar properti";

  const formatPrice = (price) => {
    if (!price || Number.isNaN(Number(price))) {
      return "Hubungi Kami";
    }

    return `Rp ${Number(price).toLocaleString("id-ID")}`;
  };

  return (
    <section
      aria-label="Namura Property"
      className="relative isolate overflow-hidden bg-white"
    >
      {/* Background Decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-40 -top-48 h-[520px] w-[520px] rounded-full bg-[#0F6A6A]/[0.045] sm:h-[650px] sm:w-[650px]" />

        <div className="absolute -bottom-48 -left-40 h-[420px] w-[420px] rounded-full bg-[#0F6A6A]/[0.035]" />

        <div className="absolute left-[8%] top-[18%] hidden h-2 w-2 rounded-full bg-[#0F6A6A]/20 lg:block" />

        <div className="absolute left-[12%] top-[23%] hidden h-1.5 w-1.5 rounded-full bg-[#0F6A6A]/15 lg:block" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24 xl:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 xl:gap-24">

          {/* LEFT — CONTENT */}
          <div className="max-w-[620px]">

            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0F6A6A]/10 bg-[#0F6A6A]/[0.07] px-3.5 py-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0F6A6A]/10">
                <Star
                  size={11}
                  strokeWidth={2.5}
                  className="fill-[#0F6A6A] text-[#0F6A6A]"
                />
              </span>

              <span className="text-xs font-semibold tracking-wide text-[#0F6A6A] sm:text-sm">
                Properti Terpercaya
              </span>
            </div>

            {/* Heading */}
            <h1 className="mt-6 max-w-[680px] text-[40px] font-bold leading-[1.08] tracking-[-0.03em] text-gray-950 sm:text-5xl lg:text-[58px] xl:text-[64px]">
              Hunian Berkualitas
              <span className="block text-[#0F6A6A]">
                untuk Masa Depan
              </span>
              Anda
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-[560px] text-[15px] leading-7 text-gray-500 sm:text-base sm:leading-7 lg:text-lg">
              Temukan properti dengan lokasi strategis, desain modern,
              dan pilihan hunian yang dirancang untuk memberikan kenyamanan
              sekaligus nilai jangka panjang bagi keluarga Anda.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/daftar-properti"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0F6A6A] px-7 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(15,106,106,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0C5A5A] hover:shadow-[0_12px_30px_rgba(15,106,106,0.22)] active:translate-y-0"
              >
                Lihat Properti

                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                href="/kontak"
                className="inline-flex h-12 items-center justify-center rounded-full border border-gray-200 bg-white px-7 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 active:scale-[0.98]"
              >
                Hubungi Kami
              </Link>
            </div>

            {/* Trust Points */}
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-500 sm:text-sm">
              <div className="flex items-center gap-1.5">
                <CheckCircle2
                  size={15}
                  className="text-[#0F6A6A]"
                />
                Lokasi Strategis
              </div>

              <div className="flex items-center gap-1.5">
                <CheckCircle2
                  size={15}
                  className="text-[#0F6A6A]"
                />
                Pilihan Terverifikasi
              </div>
            </div>
          </div>

          {/* RIGHT — PROPERTY VISUAL */}
          <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">

            {/* Main Image */}
            <div className="relative aspect-[4/4.7] overflow-hidden rounded-[28px] bg-gray-100 shadow-[0_24px_70px_rgba(0,0,0,0.12)] sm:rounded-[32px]">
              {!imageError ? (
                <img
                  src={heroImage}
                  alt={
                    featuredProperty?.name ||
                    "Properti unggulan Namura Property"
                  }
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                  loading="eager"
                  fetchPriority="high"
                  onError={() => setImageError(true)}
                />
              ) : (
                <Image
                  src="/Asset/Properti5/Asset1.png"
                  alt="Properti unggulan Namura Property"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                />
              )}

              {/* Image Gradient */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/5"
              />

              {/* Brand Label */}
              <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
                <div className="rounded-full bg-black/20 px-3 py-1.5 backdrop-blur-md">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/90">
                    Namura Property
                  </span>
                </div>
              </div>

              {/* Featured Property Card */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[310px]">
                <div className="rounded-2xl border border-white/60 bg-white/[0.94] p-4 shadow-xl backdrop-blur-xl sm:p-5">

                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                    Properti Unggulan
                  </p>

                  <p className="mt-1.5 truncate text-lg font-bold leading-tight text-gray-950 sm:text-xl">
                    {featuredProperty?.name ||
                      "Pilihan Properti Terbaik"}
                  </p>

                  <div className="mt-2 flex items-center gap-1.5">
                    <MapPin
                      size={13}
                      className="shrink-0 text-[#0F6A6A]"
                    />

                    <p className="truncate text-xs text-gray-500">
                      {propertyLocation}
                    </p>
                  </div>

                  <div className="mt-3 border-t border-gray-100 pt-3">
                    <p className="text-sm font-bold text-[#0F6A6A]">
                      {featuredProperty
                        ? formatPrice(featuredProperty.price)
                        : "Lihat pilihan properti"}
                    </p>
                  </div>

                </div>
              </div>
            </div>

            {/* Available Unit Card */}
            <div className="absolute right-3 top-3 sm:right-5 sm:top-5">
              <div className="rounded-2xl bg-[#0F6A6A] px-4 py-3 shadow-xl sm:px-5 sm:py-4">

                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/65 sm:text-[10px]">
                  Unit Tersedia
                </p>

                <p className="mt-1 text-2xl font-bold leading-none text-white sm:text-3xl">
                  {loading
                    ? "..."
                    : unitAvailable > 0
                      ? `${unitAvailable}+`
                      : "0"}
                </p>

              </div>
            </div>

            {/* Decorative Dot Grid */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-7 -right-7 hidden h-32 w-32 opacity-20 sm:block"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #0F6A6A 1.5px, transparent 1.5px)",
                backgroundSize: "12px 12px",
              }}
            />

          </div>
        </div>
      </div>
    </section>
  );
}