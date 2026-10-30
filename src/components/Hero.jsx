"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_URL, getImageUrl } from "@/lib/api";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Pause,
  Play,
  Search,
  Star,
} from "lucide-react";

const FALLBACK_IMAGE = "/Asset/Properti5/Asset1.png";
const MAX_SLIDES = 5;
const AUTOPLAY_MS = 5000;
const SWIPE_THRESHOLD = 50;

const QUICK_FILTERS = [
  { label: "Rumah", href: "/daftar-properti?type=rumah" },
  { label: "Tanah", href: "/daftar-properti?type=tanah" },
  { label: "Ruko", href: "/daftar-properti?type=ruko" },
];

const formatPrice = (price) => {
  if (!price || Number.isNaN(Number(price))) return "Hubungi Kami";
  return `Rp ${Number(price).toLocaleString("id-ID")}`;
};

const glassButton =
  "flex h-11 w-11 items-center justify-center rounded-full border border-[var(--glass-border-edge)] bg-[var(--glass-bg-strong)] text-[var(--foreground-secondary)] shadow-[inset_0_1px_0_var(--glass-highlight)] backdrop-blur-md transition-all duration-200 hover:border-[var(--border-primary)] hover:text-[var(--primary)] active:scale-95";

export default function Hero() {
  const router = useRouter();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failedImages, setFailedImages] = useState({});
  const [query, setQuery] = useState("");

  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [docHidden, setDocHidden] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const startXRef = useRef(null);
  const movedRef = useRef(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProperties() {
      try {
        const res = await fetch(`${API_URL}/api/properties`, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch properties");

        const data = await res.json();
        setProperties(Array.isArray(data) ? data : []);
      } catch (error) {
        if (error?.name !== "AbortError") setProperties([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchProperties();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);

    const onVisibility = () => setDocHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      mq.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const unitAvailable = useMemo(() => {
    if (!properties.length) return 0;
    const activeUnits = properties.filter(
      (p) => String(p?.status || "").toLowerCase() === "aktif"
    ).length;
    return activeUnits || properties.length;
  }, [properties]);

  const slides = useMemo(() => {
    if (!properties.length) {
      return [{ id: null, name: "Pilihan Properti Terbaik", fallback: true }];
    }

    const active = properties.filter(
      (p) => String(p?.status || "").toLowerCase() === "aktif"
    );
    const pool = active.length ? active : properties;

    return [...pool]
      .sort(
        (a, b) =>
          (b?.featured ? 1 : 0) - (a?.featured ? 1 : 0) ||
          new Date(b?.created_at || 0).getTime() -
            new Date(a?.created_at || 0).getTime()
      )
      .slice(0, MAX_SLIDES);
  }, [properties]);

  const total = slides.length;
  const safeIndex = Math.min(index, total - 1);
  const activeSlide = slides[safeIndex];
  const autoplayActive =
    total > 1 && !userPaused && !hovered && !focused && !docHidden && !reduceMotion;

  useEffect(() => {
    setIndex(0);
  }, [total]);

  const goTo = useCallback(
    (i) => setIndex(((i % total) + total) % total),
    [total]
  );

  useEffect(() => {
    if (!autoplayActive) return;
    const timer = setTimeout(() => goTo(safeIndex + 1), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [autoplayActive, safeIndex, goTo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    router.push(
      q ? `/daftar-properti?search=${encodeURIComponent(q)}` : "/daftar-properti"
    );
  };

  const handlePointerDown = (e) => {
    startXRef.current = e.clientX;
    movedRef.current = false;
  };

  const handlePointerUp = (e) => {
    if (startXRef.current === null) return;
    const dx = e.clientX - startXRef.current;
    startXRef.current = null;

    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      movedRef.current = true;
      goTo(dx < 0 ? safeIndex + 1 : safeIndex - 1);
    }
  };

  const handleClickCapture = (e) => {
    if (movedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      movedRef.current = false;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") goTo(safeIndex - 1);
    if (e.key === "ArrowRight") goTo(safeIndex + 1);
  };

  return (
    <section className="hero hero-gradient relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="hero-glow -right-40 -top-40" />
        <div className="absolute -bottom-56 -left-40 h-[420px] w-[420px] rounded-full bg-[var(--primary)]/10 blur-3xl" />
      </div>

      <div className="container relative py-14 sm:py-20 lg:py-24 xl:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 xl:gap-24">
          <div className="min-w-0 max-w-[620px]">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Properti Terpercaya di Lampung
            </div>

            <h1 className="heading-xl mt-6 max-w-[700px] text-[var(--foreground)]">
              Temukan Hunian
              <span className="block text-primary">yang Tepat untukmu.</span>
            </h1>

            <p className="text-body mt-6 max-w-[560px] text-base sm:text-lg">
              Temukan rumah, tanah, dan properti pilihan dengan lokasi
              strategis untuk hunian maupun investasi jangka panjang.
            </p>

            <div className="mt-8 max-w-[600px]">
              <form role="search" onSubmit={handleSubmit} className="search-box">
                <Search
                  size={19}
                  strokeWidth={1.8}
                  className="shrink-0 text-[var(--foreground-soft)]"
                  aria-hidden="true"
                />

                <input
                  type="search"
                  name="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari lokasi atau nama properti"
                  aria-label="Cari properti"
                  autoComplete="off"
                  enterKeyHint="search"
                />

                <button
                  type="submit"
                  aria-label="Cari"
                  className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-3.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--primary-hover)] active:scale-95 sm:px-5"
                >
                  <span className="hidden sm:inline">Cari</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </form>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                {QUICK_FILTERS.map((filter) => (
                  <Link
                    key={filter.label}
                    href={filter.href}
                    className="inline-flex min-h-10 items-center rounded-full border border-[var(--glass-border-edge)] bg-[var(--glass-bg)] px-4 text-xs font-medium text-[var(--foreground-secondary)] shadow-[inset_0_1px_0_var(--glass-highlight)] backdrop-blur-md transition-all duration-200 hover:border-[var(--border-primary)] hover:bg-[var(--primary)]/5 hover:text-[var(--primary)]"
                  >
                    {filter.label}
                  </Link>
                ))}

                <Link
                  href="/daftar-properti"
                  className="link-primary min-h-10 px-2 text-xs"
                >
                  Lihat Semua
                  <ArrowRight size={13} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {["Properti Pilihan", "Informasi Transparan"].map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-2 text-sm text-[var(--foreground-muted)]"
                >
                  <CheckCircle2
                    size={16}
                    className="text-[var(--primary)]"
                    aria-hidden="true"
                  />
                  {point}
                </div>
              ))}
            </div>
          </div>

          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Properti unggulan"
            onKeyDown={handleKeyDown}
            onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
            onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(false)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="relative mx-auto w-full min-w-0 max-w-[620px] lg:max-w-none"
          >
            <div
              className="notch-wrap [filter:drop-shadow(0_24px_40px_rgba(15,60,60,0.16))]"
              style={{ "--nw": "76px", "--nh": "76px", "--nr": "28px" }}
            >
            <div
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={() => (startXRef.current = null)}
              onClickCapture={handleClickCapture}
              className="notch relative aspect-[4/4.4] touch-pan-y select-none overflow-hidden rounded-[28px] bg-[var(--surface-soft)] sm:aspect-[4/4.6] sm:rounded-[34px]"
            >
              <div
                aria-live={autoplayActive ? "off" : "polite"}
                className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                style={{ transform: `translateX(-${safeIndex * 100}%)` }}
              >
                {slides.map((property, i) => {
                  const isActive = i === safeIndex;
                  const key = property.id ?? "fallback";
                  const hasImage = property.image && !failedImages[key];
                  const src = hasImage ? getImageUrl(property.image) : FALLBACK_IMAGE;

                  return (
                    <div
                      key={key}
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`${i + 1} dari ${total}`}
                      aria-hidden={!isActive}
                      className="relative h-full min-w-full shrink-0"
                    >
                      <img
                        src={src}
                        alt={property.name || "Properti unggulan Namura Property"}
                        draggable={false}
                        loading={i === 0 ? "eager" : "lazy"}
                        fetchPriority={i === 0 ? "high" : "auto"}
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [key]: true }))
                        }
                        className="h-full w-full object-cover"
                      />

                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent"
                      />

                      <div className="absolute left-4 top-4 sm:left-7 sm:top-7">
                        <div className="property-badge gap-2">
                          <Star
                            size={12}
                            className="fill-[var(--primary)] text-[var(--primary)]"
                            aria-hidden="true"
                          />
                          {property.featured ? "Properti Unggulan" : "Properti Terbaru"}
                        </div>
                      </div>

                      <div className="absolute bottom-4 left-4 right-[96px] sm:bottom-7 sm:left-7 sm:right-auto sm:w-[360px]">
                        <div className="rounded-[22px] border border-[var(--glass-border)] bg-[var(--glass-bg-strong)] p-4 backdrop-blur-2xl backdrop-saturate-150 sm:p-5">
                          <h2 className="truncate text-lg font-bold tracking-tight text-[var(--foreground)] sm:text-xl">
                            {property.name || "Pilihan Properti Terbaik"}
                          </h2>

                          <div className="mt-1.5 flex items-center gap-1.5">
                            <MapPin
                              size={14}
                              className="shrink-0 text-[var(--primary)]"
                              aria-hidden="true"
                            />
                            <p className="truncate text-xs text-[var(--foreground-muted)]">
                              {property.location || "Lampung, Indonesia"}
                            </p>
                          </div>

                          <div className="mt-3.5 flex items-center justify-between gap-3 border-t border-[var(--border-soft)] pt-3.5">
                            <div className="min-w-0">
                              <p className="text-[10px] text-[var(--foreground-soft)]">
                                Mulai dari
                              </p>
                              <p className="mt-0.5 truncate text-base font-bold text-[var(--primary)]">
                                {property.fallback
                                  ? "Hubungi Kami"
                                  : formatPrice(property.price)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pointer-events-none absolute right-4 top-4 sm:right-6 sm:top-6">
                <div className="rounded-[20px] border border-white/25 bg-[var(--primary)]/85 px-4 py-3 text-white shadow-xl backdrop-blur-xl sm:px-5 sm:py-4">
                  <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/70">
                    Unit Tersedia
                  </p>
                  <p className="mt-1 text-2xl font-bold leading-none sm:text-3xl">
                    {loading ? "..." : unitAvailable > 0 ? `${unitAvailable}+` : "0"}
                  </p>
                </div>
              </div>
            </div>

            <Link
              href={
                activeSlide?.id
                  ? `/daftar-properti/${activeSlide.id}`
                  : "/daftar-properti"
              }
              aria-label={
                activeSlide?.id
                  ? `Lihat ${activeSlide.name || "properti"}`
                  : "Lihat semua properti"
              }
              className="notch-btn group text-[var(--foreground)] transition-colors duration-200 hover:text-[var(--primary)]"
            >
              <ArrowUpRight
                size={30}
                strokeWidth={2.25}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
            </div>

            {total > 1 && (
              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex items-center" role="tablist" aria-label="Pilih slide">
                  {slides.map((property, i) => {
                    const isActive = i === safeIndex;
                    return (
                      <button
                        key={property.id ?? i}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-label={`Slide ${i + 1}`}
                        onClick={() => goTo(i)}
                        className="flex h-11 items-center px-1.5"
                      >
                        <span
                          className={`block h-2 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                            isActive
                              ? "w-7 bg-[var(--primary)]"
                              : "w-2 bg-[var(--primary)]/25 hover:bg-[var(--primary)]/50"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setUserPaused((v) => !v)}
                    aria-label={
                      userPaused ? "Putar slide otomatis" : "Jeda slide otomatis"
                    }
                    className={glassButton}
                  >
                    {userPaused || reduceMotion ? (
                      <Play size={16} aria-hidden="true" />
                    ) : (
                      <Pause size={16} aria-hidden="true" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => goTo(safeIndex - 1)}
                    aria-label="Slide sebelumnya"
                    className={glassButton}
                  >
                    <ChevronLeft size={18} aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={() => goTo(safeIndex + 1)}
                    aria-label="Slide berikutnya"
                    className={glassButton}
                  >
                    <ChevronRight size={18} aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 top-[calc(50%-4rem)] -z-10 hidden h-36 w-36 opacity-20 sm:block"
              style={{
                backgroundImage:
                  "radial-gradient(circle, var(--primary) 1.5px, transparent 1.5px)",
                backgroundSize: "12px 12px",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}