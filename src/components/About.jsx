"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function About() {
  const features = [
    {
      title: "Lokasi Strategis",
      desc: "Dekat dengan fasilitas publik, pusat bisnis, pendidikan, dan transportasi.",
    },
    {
      title: "Kualitas Terjamin",
      desc: "Dibangun dengan standar konstruksi tinggi dan material pilihan terbaik.",
    },
    {
      title: "Investasi Menguntungkan",
      desc: "Nilai properti terus berkembang dan memberikan keuntungan jangka panjang.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="container section">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          {/* =========================
              IMAGE
          ========================== */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px]">
              <Image
                src="/Asset/Banner/Asset1.png"
                alt="Tentang Namura Property"
                width={700}
                height={800}
                className="h-[460px] w-full object-cover transition-transform duration-700 hover:scale-[1.02] sm:h-[540px] lg:h-[600px]"
              />

              {/* Image overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Experience badge */}
            <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7">
              <div className="rounded-2xl border border-white/70 bg-white/95 px-5 py-4 shadow-[0_12px_40px_rgba(15,23,42,0.12)] backdrop-blur-md sm:px-6 sm:py-5">
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-bold tracking-tight text-[var(--primary)] sm:text-4xl">
                    10+
                  </span>

                  <div className="pb-1">
                    <p className="text-xs font-semibold text-[var(--foreground)] sm:text-sm">
                      Tahun
                    </p>
                    <p className="text-xs text-[var(--foreground-muted)] sm:text-sm">
                      Pengalaman
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =========================
              CONTENT
          ========================== */}
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Tentang Kami
            </div>

            {/* Heading */}
            <h2 className="heading-lg mt-5">
              Membangun Hunian Nyaman
              <span className="block text-[var(--primary)]">
                untuk Masa Depan Keluarga
              </span>
            </h2>

            {/* Description */}
            <p className="text-body mt-6 max-w-xl">
              Kami menghadirkan solusi properti yang tidak hanya nyaman untuk
              dihuni, tetapi juga memberikan nilai investasi yang terus
              berkembang. Dengan pengalaman lebih dari satu dekade, kami telah
              membantu banyak keluarga menemukan rumah impiannya.
            </p>

            {/* Features */}
            <div className="mt-10">
              <div className="space-y-7">
                {features.map((item, index) => (
                  <div
                    key={item.title}
                    className="group relative flex gap-4 sm:gap-5"
                  >
                    {/* Connecting line */}
                    {index !== features.length - 1 && (
                      <div className="absolute left-[19px] top-11 h-[calc(100%+28px)] w-px bg-[var(--border)]" />
                    )}

                    {/* Icon */}
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary-light)] transition-all duration-300 group-hover:bg-[var(--primary)]">
                      <CheckCircle2
                        className="h-5 w-5 text-[var(--primary)] transition-colors duration-300 group-hover:text-white"
                        strokeWidth={2}
                      />
                    </div>

                    {/* Text */}
                    <div className="pt-0.5">
                      <h3 className="text-base font-semibold tracking-tight text-[var(--foreground)] sm:text-lg">
                        {item.title}
                      </h3>

                      <p className="mt-1.5 max-w-lg text-sm leading-6 text-[var(--foreground-muted)] sm:text-[15px]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10">
              <Link
                href="/tentang-kami"
                className="btn btn-primary group"
              >
                Pelajari Lebih Lanjut

                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}