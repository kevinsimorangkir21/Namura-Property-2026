"use client";

import Image from "next/image";
import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Andi Pratama",
      location: "Jakarta",
      image: "/user1.jpg",
      text: "Proses pembelian rumah sangat mudah dan transparan. Tim selalu responsif dan membantu sampai proses serah terima.",
    },
    {
      name: "Siti Rahma",
      location: "Bandung",
      image: "/user2.jpg",
      text: "Lokasi strategis dan kualitas bangunan sangat memuaskan. Investasi yang tepat untuk keluarga kami.",
    },
    {
      name: "Budi Santoso",
      location: "Lampung",
      image: "/user3.jpg",
      text: "Pelayanan profesional dan proses administrasi sangat jelas. Sangat direkomendasikan bagi yang mencari properti.",
    },
  ];

  return (
    <section className="bg-white">
      <div className="container section">
        {/* =========================
            HEADER
        ========================== */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow */}
          <div className="eyebrow justify-center">
            <span className="eyebrow-dot" />
            Testimoni Klien
          </div>

          {/* Heading */}
          <h2 className="heading-lg mt-5">
            Apa Kata Klien Kami
          </h2>

          {/* Description */}
          <p className="text-body mx-auto mt-6 max-w-2xl">
            Kepercayaan pelanggan adalah prioritas utama kami. Dengarkan
            pengalaman mereka dalam menemukan hunian terbaik bersama kami.
          </p>
        </div>

        {/* =========================
            TESTIMONIAL CARDS
        ========================== */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-7">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="
                group flex h-full flex-col
                rounded-[var(--radius-lg)]
                border border-[var(--border)]
                bg-white
                p-6
                shadow-[var(--shadow-sm)]
                transition-all duration-300
                hover:-translate-y-1
                hover:border-[var(--primary)]/20
                hover:shadow-[var(--shadow-lg)]
                sm:p-7
              "
            >
              {/* =========================
                  RATING
              ========================== */}
              <div
                className="flex items-center gap-1 text-amber-500"
                aria-label="Rating 5 dari 5"
              >
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className="h-[17px] w-[17px] fill-current"
                    strokeWidth={1.8}
                  />
                ))}
              </div>

              {/* =========================
                  QUOTE
              ========================== */}
              <div className="relative mt-6 flex-1">
                {/* Quote mark */}
                <span
                  className="
                    absolute -top-4 -left-1
                    text-5xl
                    font-serif
                    leading-none
                    text-[var(--primary)]/10
                  "
                  aria-hidden="true"
                >
                  “
                </span>

                <p className="relative text-[15px] leading-7 text-[var(--foreground-muted)]">
                  “{item.text}”
                </p>
              </div>

              {/* =========================
                  CLIENT
              ========================== */}
              <div className="mt-8 flex items-center gap-4 border-t border-[var(--border-soft)] pt-6">
                {/* Avatar */}
                <div
                  className="
                    relative
                    h-12 w-12
                    shrink-0
                    overflow-hidden
                    rounded-full
                    bg-[var(--surface-muted)]
                    ring-2
                    ring-[var(--primary-light)]
                    ring-offset-2
                    ring-offset-white
                  "
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>

                {/* Client Info */}
                <div className="min-w-0">
                  <h4 className="truncate text-sm font-semibold text-[var(--foreground)] sm:text-base">
                    {item.name}
                  </h4>

                  <p className="mt-0.5 text-xs text-[var(--foreground-soft)] sm:text-sm">
                    {item.location}
                  </p>
                </div>

                {/* Verified indicator */}
                <div className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--primary-light)]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-3.5 w-3.5 text-[var(--primary)]"
                    aria-label="Terverifikasi"
                  >
                    <path
                      d="M9 12.75 11.25 15 15.5 10.25"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}