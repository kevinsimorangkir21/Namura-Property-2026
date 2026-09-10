"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { API_URL, getImageUrl } from "@/lib/api";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Search,
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
    "Lampung, Indonesia";

  const formatPrice = (price) => {
    if (!price || Number.isNaN(Number(price))) {
      return "Hubungi Kami";
    }

    return `Rp ${Number(price).toLocaleString("id-ID")}`;
  };

  return (
    <section className="hero hero-gradient relative isolate overflow-hidden">
      {/* ==========================================
          BACKGROUND
          ========================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="hero-glow -right-40 -top-40" />

        <div
          className="
            absolute
            -bottom-56
            -left-40
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#0F6A6A]/[0.035]
            blur-3xl
          "
        />

        <div
          className="
            absolute
            left-[8%]
            top-[18%]
            hidden
            h-1.5
            w-1.5
            rounded-full
            bg-[#0F6A6A]/30
            lg:block
          "
        />

        <div
          className="
            absolute
            left-[12%]
            top-[23%]
            hidden
            h-1
            w-1
            rounded-full
            bg-[#0F6A6A]/20
            lg:block
          "
        />
      </div>

      {/* ==========================================
          CONTENT
          ========================================== */}

      <div className="container relative py-16 sm:py-20 lg:py-24 xl:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 xl:gap-24">

          {/* ========================================
              LEFT CONTENT
              ======================================== */}

          <div className="max-w-[620px]">

            {/* Eyebrow */}

            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Properti Terpercaya di Lampung
            </div>

            {/* Heading */}

            <h1 className="heading-xl mt-6 max-w-[700px] text-[var(--foreground)]">
              Temukan Hunian
              <span className="block text-primary">
                yang Tepat untukmu.
              </span>
            </h1>

            {/* Description */}

            <p className="text-body mt-6 max-w-[560px] text-base sm:text-lg">
              Temukan rumah, tanah, dan properti pilihan
              dengan lokasi strategis untuk hunian maupun
              investasi jangka panjang.
            </p>

            {/* ======================================
                SEARCH
                ====================================== */}

            <div className="mt-8 max-w-[600px]">

              <div className="search-box">
                <Search
                  size={19}
                  strokeWidth={1.8}
                  className="shrink-0 text-[var(--foreground-soft)]"
                />

                <input
                  type="text"
                  placeholder="Cari lokasi, tipe, atau nama properti..."
                  aria-label="Cari properti"
                />

                <Link
                  href="/daftar-properti"
                  className="
                    hidden
                    h-11
                    shrink-0
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    bg-[#0F6A6A]
                    px-5
                    text-sm
                    font-semibold
                    text-white
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:bg-[#0C5A5A]
                    sm:inline-flex
                  "
                >
                  Cari
                  <ArrowRight size={15} />
                </Link>
              </div>

              {/* Quick filters */}

              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  href="/daftar-properti?type=rumah"
                  className="badge-outline rounded-full px-3.5 py-2 text-xs font-medium transition hover:border-[#0F6A6A]/30 hover:bg-[#0F6A6A]/5 hover:text-[#0F6A6A]"
                >
                  Rumah
                </Link>

                <Link
                  href="/daftar-properti?type=tanah"
                  className="badge-outline rounded-full px-3.5 py-2 text-xs font-medium transition hover:border-[#0F6A6A]/30 hover:bg-[#0F6A6A]/5 hover:text-[#0F6A6A]"
                >
                  Tanah
                </Link>

                <Link
                  href="/daftar-properti?type=ruko"
                  className="badge-outline rounded-full px-3.5 py-2 text-xs font-medium transition hover:border-[#0F6A6A]/30 hover:bg-[#0F6A6A]/5 hover:text-[#0F6A6A]"
                >
                  Ruko
                </Link>

                <Link
                  href="/daftar-properti"
                  className="px-3.5 py-2 text-xs font-semibold text-[#0F6A6A]"
                >
                  Lihat Semua →
                </Link>
              </div>
            </div>

            {/* ======================================
                TRUST POINTS
                ====================================== */}

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              <div className="flex items-center gap-2 text-sm text-[var(--foreground-muted)]">
                <CheckCircle2
                  size={16}
                  className="text-[#0F6A6A]"
                />
                Properti Pilihan
              </div>

              <div className="flex items-center gap-2 text-sm text-[var(--foreground-muted)]">
                <CheckCircle2
                  size={16}
                  className="text-[#0F6A6A]"
                />
                Informasi Transparan
              </div>
            </div>

            {/* Mobile CTA */}

            <div className="mt-7 flex sm:hidden">
              <Link
                href="/daftar-properti"
                className="btn btn-primary w-full"
              >
                Lihat Semua Properti
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* ========================================
              RIGHT — FEATURED PROPERTY
              ======================================== */}

          <div className="relative mx-auto w-full max-w-[620px] lg:max-w-none">

            {/* Main image */}

            <div className="property-card-image aspect-[4/4.6] overflow-hidden rounded-[28px] shadow-xl sm:rounded-[34px]">

              {!imageError ? (
                <img
                  src={heroImage}
                  alt={
                    featuredProperty?.name ||
                    "Properti unggulan Namura Property"
                  }
                  className="h-full w-full object-cover"
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
                  sizes="(max-width: 1024px) 100vw, 620px"
                  className="object-cover"
                />
              )}

              {/* Gradient */}

              <div
                aria-hidden="true"
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/55
                  via-black/5
                  to-transparent
                "
              />

              {/* Top label */}

              <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
                <div className="property-badge gap-2">
                  <Star
                    size={12}
                    className="fill-[#0F6A6A] text-[#0F6A6A]"
                  />

                  Properti Unggulan
                </div>
              </div>

              {/* Bottom property info */}

              <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-auto sm:max-w-[360px]">

                <div className="rounded-[22px] border border-white/50 bg-white/[0.94] p-5 shadow-xl backdrop-blur-xl">

                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--foreground-soft)]">
                    Featured Property
                  </p>

                  <h2 className="mt-2 truncate text-lg font-bold tracking-tight text-[var(--foreground)] sm:text-xl">
                    {featuredProperty?.name ||
                      "Pilihan Properti Terbaik"}
                  </h2>

                  <div className="mt-2 flex items-center gap-1.5">
                    <MapPin
                      size={14}
                      className="shrink-0 text-[#0F6A6A]"
                    />

                    <p className="truncate text-xs text-[var(--foreground-muted)]">
                      {propertyLocation}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-[var(--border-soft)] pt-4">
                    <div>
                      <p className="text-[10px] text-[var(--foreground-soft)]">
                        Mulai dari
                      </p>

                      <p className="mt-0.5 text-base font-bold text-[#0F6A6A]">
                        {featuredProperty
                          ? formatPrice(featuredProperty.price)
                          : "Hubungi Kami"}
                      </p>
                    </div>

                    {featuredProperty && (
                      <Link
                        href={`/daftar-properti/${featuredProperty.id}`}
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-full
                          bg-[#0F6A6A]
                          text-white
                          transition
                          hover:-translate-y-0.5
                          hover:bg-[#0C5A5A]
                        "
                        aria-label="Lihat properti"
                      >
                        <ArrowRight size={16} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ======================================
                AVAILABLE UNIT
                ====================================== */}

            <div className="absolute right-3 top-3 sm:right-6 sm:top-6">
              <div className="rounded-[20px] bg-[#0F6A6A] px-4 py-3.5 text-white shadow-xl sm:px-5 sm:py-4">

                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/60">
                  Unit Tersedia
                </p>

                <p className="mt-1 text-2xl font-bold leading-none sm:text-3xl">
                  {loading
                    ? "..."
                    : unitAvailable > 0
                      ? `${unitAvailable}+`
                      : "0"}
                </p>
              </div>
            </div>

            {/* Decorative grid */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -bottom-8
                -right-8
                hidden
                h-36
                w-36
                opacity-20
                sm:block
              "
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