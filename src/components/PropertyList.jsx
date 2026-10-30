"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { API_URL } from "@/lib/api";
import PropertyCard from "./PropertyCard";

import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Pause,
  Play,
  RefreshCw,
} from "lucide-react";

const MAX_ITEMS = 6;
const AUTOPLAY_MS = 4000;
const SWIPE_THRESHOLD = 50;

const glassButton =
  "flex h-11 w-11 items-center justify-center rounded-full border border-[var(--glass-border-edge)] bg-[var(--glass-bg-strong)] text-[var(--foreground-secondary)] shadow-[inset_0_1px_0_var(--glass-highlight)] backdrop-blur-md transition-all duration-200 hover:border-[var(--border-primary)] hover:text-[var(--primary)] active:scale-95";

const glassPanel =
  "border border-[var(--glass-border)] bg-[var(--glass-bg-strong)] shadow-[var(--shadow-glass)] backdrop-blur-xl";

function useVisibleCount() {
  const [visible, setVisible] = useState(1);

  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)");
    const sm = window.matchMedia("(min-width: 640px)");
    const update = () => setVisible(lg.matches ? 3 : sm.matches ? 2 : 1);

    update();
    lg.addEventListener("change", update);
    sm.addEventListener("change", update);

    return () => {
      lg.removeEventListener("change", update);
      sm.removeEventListener("change", update);
    };
  }, []);

  return visible;
}

export default function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const visible = useVisibleCount();
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
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
        setLoading(true);
        setError("");

        const res = await fetch(`${API_URL}/api/properties`, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Gagal memuat data");

        const data = await res.json();

        const sorted = Array.isArray(data)
          ? [...data].sort(
              (a, b) =>
                new Date(b?.created_at || 0).getTime() -
                new Date(a?.created_at || 0).getTime()
            )
          : [];

        setProperties(sorted.slice(0, MAX_ITEMS));
      } catch (err) {
        if (err?.name !== "AbortError") {
          setError("Gagal memuat properti. Silakan coba lagi.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchProperties();
    return () => controller.abort();
  }, [reloadKey]);

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

  const total = properties.length;
  const canSlide = total > visible;
  const track = canSlide
    ? [...properties, ...properties.slice(0, visible)]
    : properties;

  useEffect(() => {
    setAnimate(false);
    setIndex(0);
  }, [visible, total]);

  const settle = useCallback(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
  }, []);

  const next = useCallback(() => {
    if (!canSlide) return;
    setAnimate(true);
    setIndex((i) => i + 1);
  }, [canSlide]);

  const prev = useCallback(() => {
    if (!canSlide) return;

    if (index <= 0) {
      setAnimate(false);
      setIndex(total);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimate(true);
          setIndex(total - 1);
        })
      );
    } else {
      setAnimate(true);
      setIndex((i) => i - 1);
    }
  }, [canSlide, index, total]);

  const goTo = (i) => {
    setAnimate(true);
    setIndex(i);
  };

  const handleTransitionEnd = (e) => {
    if (e.target !== e.currentTarget) return;
    if (canSlide && index >= total) {
      setAnimate(false);
      setIndex(index - total);
      settle();
    }
  };

  useEffect(() => {
    if (reduceMotion && canSlide && index >= total) {
      setIndex(index - total);
    }
  }, [reduceMotion, canSlide, index, total]);

  const autoplayActive =
    canSlide && !userPaused && !hovered && !focused && !docHidden && !reduceMotion;

  useEffect(() => {
    if (!autoplayActive) return;
    const timer = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [autoplayActive, index, next]);

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
      if (dx < 0) next();
      else prev();
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
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  const activeDot = total ? ((index % total) + total) % total : 0;

  return (
    <section className="relative overflow-hidden bg-[var(--surface)]">
      <div className="container section relative">
        <div className="section-header flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[700px]">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Properti Pilihan
            </div>

            <h2 className="heading-lg mt-5 text-[var(--foreground)]">
              Temukan Properti
              <span className="block text-[var(--primary)]">
                yang Tepat untukmu.
              </span>
            </h2>

            <p className="text-body mt-5 max-w-[600px] text-base">
              Jelajahi pilihan rumah, tanah, dan properti pilihan di Lampung
              untuk kebutuhan hunian maupun investasi.
            </p>
          </div>

          <Link
            href="/daftar-properti"
            className="btn btn-primary group hidden shrink-0 lg:inline-flex"
          >
            Lihat Semua Properti
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {!loading && !error && total > 0 && (
          <div
            className={`${glassPanel} mb-10 flex flex-wrap items-center gap-x-7 gap-y-3 rounded-full px-6 py-3.5 lg:mb-12`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2
                size={16}
                strokeWidth={2}
                className="text-[var(--primary)]"
                aria-hidden="true"
              />
              <span className="text-sm text-[var(--foreground-muted)]">
                {total} properti pilihan
              </span>
            </div>

            <div className="hidden h-4 w-px bg-[var(--border)] sm:block" />

            <div className="flex items-center gap-2">
              <MapPin
                size={16}
                strokeWidth={2}
                className="text-[var(--primary)]"
                aria-hidden="true"
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
                className="text-[var(--primary)]"
                aria-hidden="true"
              />
              <span className="text-sm text-[var(--foreground-muted)]">
                Pilihan terverifikasi
              </span>
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`${glassPanel} overflow-hidden rounded-[var(--radius-lg)] ${
                  i === 1 ? "hidden sm:block" : i === 2 ? "hidden lg:block" : ""
                }`}
              >
                <div className="aspect-[4/3] animate-pulse bg-[var(--surface-soft)]" />
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
          <div
            className={`${glassPanel} rounded-[var(--radius-xl)] px-6 py-20 text-center`}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--danger)]/10">
              <Building2
                size={22}
                className="text-[var(--danger)]"
                aria-hidden="true"
              />
            </div>

            <p className="mt-5 text-sm font-semibold text-[var(--foreground)]">
              {error}
            </p>

            <button
              type="button"
              onClick={() => setReloadKey((k) => k + 1)}
              className="btn btn-primary mt-6"
            >
              <RefreshCw size={15} aria-hidden="true" />
              Coba Lagi
            </button>
          </div>
        ) : total > 0 ? (
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Properti pilihan"
            onKeyDown={handleKeyDown}
            onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
            onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(false)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          >
            <div
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={() => (startXRef.current = null)}
              onClickCapture={handleClickCapture}
              onScroll={(e) => (e.currentTarget.scrollLeft = 0)}
              className="-mx-3 -my-6 touch-pan-y overflow-hidden py-6"
            >
              <div
                aria-live={autoplayActive ? "off" : "polite"}
                onTransitionEnd={handleTransitionEnd}
                className={`flex ${
                  animate
                    ? "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                    : ""
                }`}
                style={{
                  transform: `translateX(-${(index * 100) / visible}%)`,
                }}
              >
                {track.map((item, i) => {
                  const isClone = i >= total;
                  const isVisible = i >= index && i < index + visible;

                  return (
                    <div
                      key={`${item.id}-${isClone ? "clone" : "item"}`}
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`${(i % total) + 1} dari ${total}`}
                      aria-hidden={isClone || !isVisible}
                      ref={(el) => {
                        if (!el) return;
                        if (isVisible) el.removeAttribute("inert");
                        else el.setAttribute("inert", "");
                      }}
                      className="shrink-0 select-none px-3"
                      style={{ flexBasis: `${100 / visible}%` }}
                    >
                      <div className="h-full w-full [&>*]:h-full">
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
                    </div>
                  );
                })}
              </div>
            </div>

            {canSlide && (
              <div className="mt-8 flex items-center justify-between gap-3">
                <div
                  className="flex items-center"
                  role="tablist"
                  aria-label="Pilih properti"
                >
                  {properties.map((item, i) => {
                    const isActive = i === activeDot;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-label={`Properti ${i + 1}`}
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
                    onClick={prev}
                    aria-label="Properti sebelumnya"
                    className={glassButton}
                  >
                    <ChevronLeft size={18} aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={next}
                    aria-label="Properti berikutnya"
                    className={glassButton}
                  >
                    <ChevronRight size={18} aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}

            <div className="mt-8 lg:hidden">
              <Link href="/daftar-properti" className="btn btn-primary w-full">
                Lihat Semua Properti
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        ) : (
          <div
            className={`${glassPanel} rounded-[var(--radius-xl)] px-6 py-20 text-center`}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary)]/10">
              <Building2
                size={22}
                className="text-[var(--primary)]"
                aria-hidden="true"
              />
            </div>

            <p className="mt-5 text-sm font-semibold text-[var(--foreground)]">
              Belum ada properti tersedia.
            </p>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[var(--foreground-muted)]">
              Silakan kembali lagi nanti untuk melihat pilihan properti terbaru
              dari Namura Property.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}