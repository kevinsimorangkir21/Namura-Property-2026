"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Building2, MapPin } from "lucide-react";
import { getImageUrl } from "@/lib/api";

const formatPrice = (price) => {
  if (!price || Number.isNaN(Number(price))) return "Hubungi Kami";
  return `Rp ${Number(price).toLocaleString("id-ID")}`;
};

export default function PropertyCard({
  id,
  title,
  price,
  location,
  image,
  type,
}) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = image && !imageError ? getImageUrl(image) : null;

  return (
    <Link
      href={`/daftar-properti/${id}`}
      className="notch-wrap notch-lift group block h-full motion-reduce:hover:translate-y-0"
    >
      <article className="notch flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] bg-[var(--surface-soft)]">
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-muted)]">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title || "Properti Namura Property"}
              loading="lazy"
              draggable={false}
              onError={() => setImageError(true)}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.045] motion-reduce:transition-none"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--surface)] shadow-sm">
                <Building2
                  className="h-6 w-6 text-[var(--primary)]"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>
            </div>
          )}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />

          {type && (
            <div className="absolute left-4 top-4">
              <span className="inline-flex items-center rounded-full border border-white/50 bg-[var(--glass-bg-strong)] px-3 py-1.5 text-[11px] font-semibold capitalize text-[var(--primary)] shadow-sm backdrop-blur-md">
                {type}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="line-clamp-2 text-lg font-bold leading-snug tracking-tight text-[var(--foreground)] transition-colors duration-200 group-hover:text-[var(--primary)] sm:text-xl">
            {title}
          </h3>

          {location && (
            <div className="mt-2.5 flex items-center gap-1.5">
              <MapPin
                size={14}
                className="shrink-0 text-[var(--primary)]"
                aria-hidden="true"
              />
              <p className="truncate text-sm text-[var(--foreground-muted)]">
                {location}
              </p>
            </div>
          )}

          <div className="mt-auto pt-6">
            <p className="text-[11px] text-[var(--foreground-soft)]">
              Mulai dari
            </p>
            <p className="mt-0.5 text-lg font-bold text-[var(--primary)]">
              {formatPrice(price)}
            </p>
          </div>
        </div>
      </article>

      <span className="notch-btn" aria-hidden="true">
        <ArrowUpRight
          size={26}
          strokeWidth={2.25}
          className="text-[var(--foreground)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--primary)]"
        />
      </span>
    </Link>
  );
}