"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Bath,
  BedDouble,
  CheckCircle2,
  ChevronRight,
  Home,
  MapPin,
  MessageCircle,
  Phone,
  Ruler,
  ShieldCheck,
  Car,
} from "lucide-react";

import { API_URL, getImageUrl } from "@/lib/api";

export default function PropertyDetail() {
  const params = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchProperty() {
      try {
        const res = await fetch(
          `${API_URL}/api/properties/slug/${params.slug}`
        );

        if (!res.ok) {
          setError(true);
          return;
        }

        const data = await res.json();
        setProperty(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (params.slug) {
      fetchProperty();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="container py-20 lg:py-28">
          <div className="animate-pulse space-y-8">
            <div className="h-4 w-48 rounded bg-[var(--surface-muted)]" />

            <div className="h-[320px] sm:h-[460px] lg:h-[560px] rounded-[28px] bg-[var(--surface-muted)]" />

            <div className="grid lg:grid-cols-[1fr_360px] gap-12">
              <div className="space-y-5">
                <div className="h-6 w-24 rounded-full bg-[var(--surface-muted)]" />
                <div className="h-12 w-3/4 rounded bg-[var(--surface-muted)]" />
                <div className="h-5 w-1/2 rounded bg-[var(--surface-muted)]" />

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="h-28 rounded-2xl bg-[var(--surface-muted)]"
                    />
                  ))}
                </div>
              </div>

              <div className="h-64 rounded-[28px] bg-[var(--surface-muted)]" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !property) {
    return (
      <main className="min-h-screen bg-white flex items-center">
        <div className="container py-24 text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center mb-6">
            <Home size={28} />
          </div>

          <h1 className="heading-md text-[var(--foreground)]">
            Properti tidak ditemukan
          </h1>

          <p className="text-body text-[var(--muted)] max-w-md mx-auto mt-4">
            Properti yang Anda cari mungkin sudah tidak tersedia atau
            tautannya tidak valid.
          </p>

          <Link
            href="/daftar-properti"
            className="btn btn-primary mt-8 inline-flex"
          >
            <ArrowLeft size={18} />
            Kembali ke Daftar Properti
          </Link>
        </div>
      </main>
    );
  }

  const formatPrice = (price) => {
    if (!price) return "-";

    return `Rp ${Number(price).toLocaleString("id-ID")}`;
  };

  const isForSale = (property.type || "").toLowerCase() === "jual";

  const statusLabel = isForSale ? "Dijual" : "Disewa";

  const whatsappNumber = "6281369381111";

  const whatsappMessage = encodeURIComponent(
    `Halo Namura Property, saya tertarik dengan properti "${property.title}". Saya ingin mendapatkan informasi lebih lanjut.`
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const propertySpecs = [
    {
      icon: BedDouble,
      label: "Kamar Tidur",
      value: property.bedrooms || "-",
    },
    {
      icon: Bath,
      label: "Kamar Mandi",
      value: property.bathrooms || "-",
    },
    {
      icon: Ruler,
      label: "Luas Bangunan",
      value: property.building_area
        ? `${property.building_area} m²`
        : "-",
    },
    {
      icon: Ruler,
      label: "Luas Tanah",
      value: property.land_area ? `${property.land_area} m²` : "-",
    },
    {
      icon: Car,
      label: "Garasi",
      value: property.garage || "-",
    },
  ];

  const summaryItems = [
    {
      label: "Status",
      value: statusLabel,
    },
    {
      label: "Lokasi",
      value: property.location || "-",
    },
    {
      label: "Kamar Tidur",
      value: property.bedrooms || "-",
    },
    {
      label: "Kamar Mandi",
      value: property.bathrooms || "-",
    },
    {
      label: "Luas Bangunan",
      value: property.building_area
        ? `${property.building_area} m²`
        : "-",
    },
    {
      label: "Luas Tanah",
      value: property.land_area ? `${property.land_area} m²` : "-",
    },
    {
      label: "Garasi",
      value: property.garage || "-",
    },
    {
      label: "Harga",
      value: formatPrice(property.price),
      highlight: true,
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* =====================================================
          BREADCRUMB
      ====================================================== */}
      <section className="pt-8 lg:pt-10">
        <div className="container">
          <div className="flex items-center gap-2 text-sm text-[var(--muted)] overflow-hidden">
            <Link
              href="/"
              className="shrink-0 hover:text-[var(--primary)] transition-colors"
            >
              Beranda
            </Link>

            <ChevronRight size={15} className="shrink-0 text-[var(--soft)]" />

            <Link
              href="/daftar-properti"
              className="shrink-0 hover:text-[var(--primary)] transition-colors"
            >
              Properti
            </Link>

            <ChevronRight size={15} className="shrink-0 text-[var(--soft)]" />

            <span className="truncate text-[var(--secondary)]">
              {property.title}
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROPERTY IMAGE
      ====================================================== */}
      <section className="pt-6 lg:pt-8">
        <div className="container">
          {property.image ? (
            <div className="relative overflow-hidden rounded-[24px] lg:rounded-[32px] bg-[var(--surface-muted)] shadow-[var(--shadow-lg)]">
              <img
                src={getImageUrl(property.image)}
                alt={property.title}
                className="w-full h-[300px] sm:h-[420px] lg:h-[580px] object-cover"
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 pointer-events-none" />

              {/* Status */}
              <div className="absolute top-5 left-5 lg:top-7 lg:left-7">
                <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/95 backdrop-blur-md text-[var(--primary)] text-sm font-semibold shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-[var(--primary)]" />
                  {statusLabel}
                </span>
              </div>

              {/* Verified */}
              <div className="absolute top-5 right-5 lg:top-7 lg:right-7">
                <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/35 backdrop-blur-md text-white text-sm font-medium">
                  <ShieldCheck size={16} />
                  Properti Pilihan
                </span>
              </div>

              {/* Bottom image info */}
              <div className="absolute left-5 right-5 bottom-5 lg:left-7 lg:right-7 lg:bottom-7">
                <div className="flex items-end justify-between gap-6">
                  <div className="max-w-3xl">
                    <p className="text-white/75 text-sm mb-2">
                      Namura Property
                    </p>

                    <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                      {property.title}
                    </h1>

                    <div className="flex items-center gap-2 text-white/85 mt-3">
                      <MapPin size={17} />
                      <span className="text-sm sm:text-base">
                        {property.location || "Lokasi tidak tersedia"}
                      </span>
                    </div>
                  </div>

                  <div className="hidden md:block shrink-0">
                    <div className="px-5 py-3 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg">
                      <p className="text-xs text-[var(--muted)]">
                        Harga
                      </p>

                      <p className="text-lg font-bold text-[var(--primary)] mt-0.5">
                        {formatPrice(property.price)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-[24px] lg:rounded-[32px] bg-[var(--primary-lighter)] h-[300px] sm:h-[420px] lg:h-[580px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-white text-[var(--primary)] flex items-center justify-center mx-auto shadow-[var(--shadow-sm)]">
                  <Home size={28} />
                </div>

                <p className="text-sm text-[var(--muted)] mt-4">
                  Foto properti belum tersedia
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <section className="py-14 lg:py-20">
        <div className="container">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-12 lg:gap-16 items-start">
            {/* =================================================
                LEFT CONTENT
            ================================================== */}
            <div className="min-w-0">
              {/* Mobile price */}
              <div className="md:hidden mb-8">
                <p className="text-sm text-[var(--muted)]">Harga</p>

                <p className="text-3xl font-bold text-[var(--primary)] mt-1">
                  {formatPrice(property.price)}
                </p>
              </div>

              {/* Title */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="badge bg-[var(--primary-light)] text-[var(--primary)] border-transparent">
                    {statusLabel}
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)]">
                    <ShieldCheck
                      size={16}
                      className="text-[var(--primary)]"
                    />
                    Informasi properti
                  </span>
                </div>

                <h2 className="heading-lg text-[var(--foreground)] max-w-4xl">
                  {property.title}
                </h2>

                <div className="flex items-start gap-2 mt-4 text-[var(--muted)]">
                  <MapPin
                    size={19}
                    className="text-[var(--primary)] shrink-0 mt-0.5"
                  />

                  <span>
                    {property.location || "Lokasi tidak tersedia"}
                  </span>
                </div>
              </div>

              {/* Property specs */}
              <div className="mt-10">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {propertySpecs.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className="group p-5 rounded-[20px] border border-[var(--border)] bg-white hover:border-[var(--primary)]/25 hover:shadow-[var(--shadow-md)] transition-all duration-300"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center group-hover:bg-[var(--primary)] group-hover:text-white transition-colors duration-300">
                          <Icon size={19} />
                        </div>

                        <p className="text-xs sm:text-sm text-[var(--muted)] mt-4">
                          {item.label}
                        </p>

                        <p className="font-semibold text-[var(--foreground)] mt-1">
                          {item.value}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-[var(--border-soft)] my-12" />

              {/* =================================================
                  DESCRIPTION
              ================================================== */}
              {property.description && (
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center">
                      <Home size={18} />
                    </div>

                    <h3 className="text-2xl font-bold text-[var(--foreground)]">
                      Tentang Properti
                    </h3>
                  </div>

                  <div className="text-[var(--secondary)] leading-8 text-base whitespace-pre-line">
                    {property.description}
                  </div>
                </div>
              )}

              {/* =================================================
                  SUMMARY
              ================================================== */}
              <div className="mt-14">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center">
                    <CheckCircle2 size={18} />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-[var(--foreground)]">
                      Ringkasan Properti
                    </h3>

                    <p className="text-sm text-[var(--muted)] mt-1">
                      Informasi utama mengenai properti ini
                    </p>
                  </div>
                </div>

                <div className="border border-[var(--border)] rounded-[24px] overflow-hidden">
                  <div className="grid sm:grid-cols-2">
                    {summaryItems.map((item, index) => (
                      <div
                        key={item.label}
                        className={`flex items-center justify-between gap-6 px-5 py-4.5 border-[var(--border-soft)]
                          ${
                            index % 2 === 0
                              ? "sm:border-r"
                              : ""
                          }
                          ${
                            index < summaryItems.length - 2
                              ? "border-b"
                              : ""
                          }
                          ${
                            index === summaryItems.length - 2
                              ? "sm:border-b"
                              : ""
                          }
                        `}
                      >
                        <span className="text-sm text-[var(--muted)]">
                          {item.label}
                        </span>

                        <span
                          className={`text-sm font-semibold text-right max-w-[60%] ${
                            item.highlight
                              ? "text-[var(--primary)]"
                              : "text-[var(--foreground)]"
                          }`}
                        >
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* =================================================
                  TRUST POINTS
              ================================================== */}
              <div className="mt-14 p-6 sm:p-8 rounded-[24px] bg-[var(--primary-lighter)] border border-[var(--primary)]/10">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center shrink-0">
                    <ShieldCheck size={21} />
                  </div>

                  <div>
                    <h3 className="font-bold text-[var(--foreground)]">
                      Cari properti dengan lebih tenang
                    </h3>

                    <p className="text-sm text-[var(--secondary)] leading-6 mt-1">
                      Tim Namura Property siap membantu memberikan informasi
                      lebih lanjut mengenai kondisi, lokasi, dan proses properti
                      yang Anda minati.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                RIGHT CONTACT CARD
            ================================================== */}
            <aside className="lg:sticky lg:top-28">
              <div className="rounded-[28px] border border-[var(--border)] bg-white shadow-[var(--shadow-lg)] p-6 sm:p-7">
                <p className="text-sm font-medium text-[var(--muted)]">
                  Tertarik dengan properti ini?
                </p>

                <h3 className="text-2xl font-bold text-[var(--foreground)] mt-2">
                  Hubungi Namura Property
                </h3>

                <p className="text-sm text-[var(--secondary)] leading-6 mt-3">
                  Dapatkan informasi lengkap dan konsultasikan kebutuhan
                  properti Anda bersama tim kami.
                </p>

                {/* Price */}
                <div className="mt-7 p-5 rounded-2xl bg-[var(--primary-lighter)] border border-[var(--primary)]/10">
                  <p className="text-xs uppercase tracking-[0.12em] font-semibold text-[var(--muted)]">
                    Harga Properti
                  </p>

                  <p className="text-2xl font-bold text-[var(--primary)] mt-1">
                    {formatPrice(property.price)}
                  </p>
                </div>

                {/* CTA */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full mt-5 justify-center"
                >
                  <MessageCircle size={18} />
                  Tanya via WhatsApp
                  <ArrowUpRight size={17} />
                </a>

                <a
                  href="tel:+6281369381111"
                  className="btn btn-outline w-full mt-3 justify-center"
                >
                  <Phone size={17} />
                  Hubungi Kami
                </a>

                {/* Trust */}
                <div className="mt-7 pt-6 border-t border-[var(--border-soft)] space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center">
                      <ShieldCheck size={17} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[var(--foreground)]">
                        Pendampingan Profesional
                      </p>

                      <p className="text-xs text-[var(--muted)] mt-0.5">
                        Dibantu tim Namura Property
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center">
                      <CheckCircle2 size={17} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[var(--foreground)]">
                        Informasi Transparan
                      </p>

                      <p className="text-xs text-[var(--muted)] mt-0.5">
                        Informasi properti yang jelas
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Back link */}
              <Link
                href="/daftar-properti"
                className="group flex items-center justify-center gap-2 mt-5 text-sm font-medium text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
              >
                <ArrowLeft
                  size={16}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                Kembali ke daftar properti
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {/* =====================================================
          BOTTOM CTA
      ====================================================== */}
      <section className="pb-20 lg:pb-28">
        <div className="container">
          <div className="relative overflow-hidden rounded-[28px] bg-[var(--primary)] px-7 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            {/* Decorative circles */}
            <div className="absolute -right-20 -top-24 w-64 h-64 rounded-full border border-white/10" />
            <div className="absolute -right-5 -bottom-32 w-72 h-72 rounded-full border border-white/10" />

            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold text-white/70 uppercase tracking-[0.14em]">
                  Butuh bantuan?
                </p>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mt-2">
                  Temukan properti yang paling sesuai untuk Anda.
                </h2>

                <p className="text-white/70 leading-7 mt-3 max-w-xl">
                  Jelajahi pilihan properti lainnya atau langsung konsultasikan
                  kebutuhan Anda dengan tim Namura Property.
                </p>
              </div>

              <Link
                href="/daftar-properti"
                className="btn bg-white text-[var(--primary)] hover:bg-white/90 shrink-0"
              >
                Lihat Properti Lainnya
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}