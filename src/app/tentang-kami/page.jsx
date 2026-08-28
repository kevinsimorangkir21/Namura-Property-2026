"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Users,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function TentangKamiPage() {
  const values = [
    {
      title: "Integritas",
      desc: "Transparansi dan kejujuran dalam setiap proses yang kami jalankan.",
      icon: ShieldCheck,
    },
    {
      title: "Profesional",
      desc: "Memberikan pelayanan terbaik dengan standar kerja yang tinggi.",
      icon: Users,
    },
    {
      title: "Inovasi",
      desc: "Terus berkembang mengikuti kebutuhan pasar dan teknologi.",
      icon: Sparkles,
    },
    {
      title: "Komitmen",
      desc: "Fokus pada kualitas dan kepuasan pelanggan jangka panjang.",
      icon: TrendingUp,
    },
  ];

  const achievements = [
    {
      value: "100+",
      label: "Properti",
    },
    {
      value: "80+",
      label: "Klien",
    },
    {
      value: "10+",
      label: "Tahun",
    },
    {
      value: "5+",
      label: "Kota",
    },
  ];

  return (
    <main className="bg-white">

      {/* =========================================================
          HERO / ABOUT INTRO
      ========================================================= */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 xl:gap-20">

            {/* IMAGE */}
            <div className="relative mx-auto w-full max-w-[560px] lg:mx-0">
              <div className="overflow-hidden rounded-[28px] sm:rounded-[32px]">
                <Image
                  src="/Asset/Banner/Asset1.png"
                  alt="Tentang Namura Property"
                  width={700}
                  height={800}
                  priority
                  className="h-[480px] w-full object-cover sm:h-[560px] lg:h-[600px]"
                />
              </div>

              {/* EXPERIENCE BADGE */}
              <div className="absolute bottom-5 left-5 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-xl sm:bottom-6 sm:left-6 sm:px-6 sm:py-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                  Pengalaman
                </p>

                <p className="mt-1 text-2xl font-bold tracking-tight text-[#0F6A6A] sm:text-3xl">
                  10+
                </p>

                <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                  Tahun Pengalaman
                </p>
              </div>
            </div>

            {/* CONTENT */}
            <div className="max-w-[620px]">

              {/* BADGE */}
              <span className="inline-flex items-center rounded-full border border-[#0F6A6A]/10 bg-[#0F6A6A]/[0.06] px-3.5 py-2 text-xs font-semibold tracking-wide text-[#0F6A6A] sm:text-sm">
                Tentang Kami
              </span>

              {/* HEADING */}
              <h1 className="mt-5 text-3xl font-bold leading-[1.08] tracking-tight text-gray-950 sm:text-4xl lg:text-5xl xl:text-[54px]">
                Membangun Hunian Berkualitas
                <span className="block text-[#0F6A6A]">
                  untuk Masa Depan Keluarga Indonesia
                </span>
              </h1>

              {/* DESCRIPTION */}
              <p className="mt-6 max-w-[600px] text-[15px] leading-7 text-gray-500 sm:text-base lg:text-lg">
                Kami percaya bahwa rumah bukan sekadar bangunan, tetapi
                tempat di mana kehidupan dan cerita dimulai. Dengan pengalaman
                lebih dari satu dekade, kami menghadirkan properti berkualitas
                yang memberikan kenyamanan, keamanan, dan nilai investasi
                jangka panjang.
              </p>

              {/* KEY POINTS */}
              <div className="mt-8 space-y-4">
                <div className="flex gap-3.5">
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0 text-[#0F6A6A]"
                  />

                  <p className="text-sm leading-6 text-gray-600 sm:text-[15px]">
                    Lokasi strategis dan terus berkembang.
                  </p>
                </div>

                <div className="flex gap-3.5">
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0 text-[#0F6A6A]"
                  />

                  <p className="text-sm leading-6 text-gray-600 sm:text-[15px]">
                    Kualitas konstruksi dengan standar terbaik.
                  </p>
                </div>

                <div className="flex gap-3.5">
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0 text-[#0F6A6A]"
                  />

                  <p className="text-sm leading-6 text-gray-600 sm:text-[15px]">
                    Nilai investasi yang terus bertumbuh.
                  </p>
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/kontak"
                className="group mt-9 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0F6A6A] px-7 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(15,106,106,0.15)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0C5A5A] hover:shadow-[0_12px_30px_rgba(15,106,106,0.2)] active:translate-y-0"
              >
                Hubungi Kami

                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          ACHIEVEMENTS
      ========================================================= */}
      <section className="border-y border-gray-100 bg-white">
        <div className="mx-auto max-w-[1280px] px-5 py-12 sm:px-6 sm:py-14 lg:px-8">
          <div className="grid grid-cols-2 divide-x divide-gray-100 md:grid-cols-4">

            {achievements.map((item) => (
              <div
                key={item.label}
                className="px-4 text-center first:pl-0 last:pr-0 sm:px-8"
              >
                <p className="text-2xl font-bold tracking-tight text-[#0F6A6A] sm:text-3xl lg:text-4xl">
                  {item.value}
                </p>

                <p className="mt-1.5 text-xs text-gray-400 sm:text-sm">
                  {item.label}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* =========================================================
          VISI & MISI
      ========================================================= */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

          {/* SECTION HEADER */}
          <div className="max-w-[680px]">
            <span className="inline-flex items-center rounded-full border border-[#0F6A6A]/10 bg-[#0F6A6A]/[0.06] px-3.5 py-2 text-xs font-semibold tracking-wide text-[#0F6A6A] sm:text-sm">
              Visi & Misi
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
              Arah Kami dalam
              <span className="block text-[#0F6A6A]">
                Membangun Masa Depan
              </span>
            </h2>

            <p className="mt-5 max-w-[620px] text-[15px] leading-7 text-gray-500 sm:text-base lg:text-lg">
              Setiap langkah kami berangkat dari visi yang jelas dan
              komitmen untuk memberikan pengalaman properti yang lebih baik.
            </p>
          </div>

          {/* VISI MISI */}
          <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">

            {/* VISI */}
            <div className="rounded-[28px] border border-gray-100 bg-white p-7 shadow-sm sm:p-9 lg:p-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0F6A6A]/[0.07]">
                <TrendingUp
                  size={20}
                  className="text-[#0F6A6A]"
                />
              </div>

              <h3 className="mt-6 text-2xl font-bold tracking-tight text-gray-950">
                Visi
              </h3>

              <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
                Menjadi pengembang properti terpercaya yang menghadirkan
                hunian berkualitas tinggi, bernilai investasi, dan mampu
                meningkatkan kualitas hidup masyarakat Indonesia.
              </p>
            </div>

            {/* MISI */}
            <div className="rounded-[28px] border border-gray-100 bg-white p-7 shadow-sm sm:p-9 lg:p-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0F6A6A]/[0.07]">
                <CheckCircle2
                  size={20}
                  className="text-[#0F6A6A]"
                />
              </div>

              <h3 className="mt-6 text-2xl font-bold tracking-tight text-gray-950">
                Misi
              </h3>

              <ul className="mt-4 space-y-3.5">
                <li className="flex gap-3 text-sm leading-6 text-gray-500 sm:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0F6A6A]" />
                  Menyediakan properti berkualitas dengan desain modern.
                </li>

                <li className="flex gap-3 text-sm leading-6 text-gray-500 sm:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0F6A6A]" />
                  Memberikan pelayanan terbaik kepada pelanggan.
                </li>

                <li className="flex gap-3 text-sm leading-6 text-gray-500 sm:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0F6A6A]" />
                  Membangun hubungan jangka panjang dengan mitra dan klien.
                </li>

                <li className="flex gap-3 text-sm leading-6 text-gray-500 sm:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0F6A6A]" />
                  Berkontribusi pada pembangunan yang berkelanjutan.
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          COMPANY VALUES
      ========================================================= */}
      <section className="border-y border-gray-100 bg-gray-50/40">
        <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

          {/* HEADER */}
          <div className="mx-auto max-w-[720px] text-center">

            <span className="inline-flex items-center rounded-full border border-[#0F6A6A]/10 bg-[#0F6A6A]/[0.06] px-3.5 py-2 text-xs font-semibold tracking-wide text-[#0F6A6A] sm:text-sm">
              Nilai Perusahaan
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
              Budaya yang Menjadi
              <span className="block text-[#0F6A6A]">
                Fondasi Perusahaan
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-[620px] text-[15px] leading-7 text-gray-500 sm:text-base lg:text-lg">
              Nilai-nilai yang menjadi panduan dalam setiap keputusan,
              pelayanan, dan hubungan yang kami bangun.
            </p>
          </div>

          {/* VALUES */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">

            {values.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-[26px] border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gray-200 hover:shadow-[0_18px_40px_rgba(0,0,0,0.06)] sm:p-7"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F6A6A]/[0.07] transition-colors duration-300 group-hover:bg-[#0F6A6A]">
                    <Icon
                      size={21}
                      className="text-[#0F6A6A] transition-colors duration-300 group-hover:text-white"
                    />
                  </div>

                  <h3 className="mt-6 text-lg font-bold text-gray-950">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    {item.desc}
                  </p>
                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* =========================================================
          TEAM
      ========================================================= */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

          {/* HEADER */}
          <div className="mx-auto max-w-[720px] text-center">

            <span className="inline-flex items-center rounded-full border border-[#0F6A6A]/10 bg-[#0F6A6A]/[0.06] px-3.5 py-2 text-xs font-semibold tracking-wide text-[#0F6A6A] sm:text-sm">
              Tim Kami
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
              Profesional yang Siap
              <span className="block text-[#0F6A6A]">
                Membantu Anda
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-[600px] text-[15px] leading-7 text-gray-500 sm:text-base lg:text-lg">
              Tim kami hadir untuk membantu Anda menemukan solusi properti
              yang sesuai dengan kebutuhan.
            </p>
          </div>

          {/* TEAM CARDS */}
          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2 lg:mt-14 lg:gap-8">

            {/* MARTIN */}
            <div className="group overflow-hidden rounded-[28px] border border-gray-100 bg-white text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]">
              <div className="relative mx-auto mt-7 h-28 w-28 overflow-hidden rounded-full bg-gray-100 ring-4 ring-[#0F6A6A]/[0.05] sm:mt-8">
                <Image
                  src="/team1.jpg"
                  alt="Martin Simorangkir"
                  fill
                  sizes="112px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6 sm:p-7">
                <h3 className="text-lg font-bold text-gray-950 sm:text-xl">
                  Martin Simorangkir
                </h3>

                <p className="mt-1.5 text-sm text-[#0F6A6A]">
                  Property Consultant
                </p>

                <p className="mx-auto mt-4 max-w-[260px] text-sm leading-6 text-gray-500">
                  Membantu pelanggan menemukan properti yang sesuai dengan
                  kebutuhan dan rencana mereka.
                </p>
              </div>
            </div>

            {/* KEVIN */}
            <div className="group overflow-hidden rounded-[28px] border border-gray-100 bg-white text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]">
              <div className="relative mx-auto mt-7 h-28 w-28 overflow-hidden rounded-full bg-gray-100 ring-4 ring-[#0F6A6A]/[0.05] sm:mt-8">
                <Image
                  src="/team2.jpg"
                  alt="Kevin Simorangkir"
                  fill
                  sizes="112px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6 sm:p-7">
                <h3 className="text-lg font-bold text-gray-950 sm:text-xl">
                  Kevin Simorangkir
                </h3>

                <p className="mt-1.5 text-sm text-[#0F6A6A]">
                  IT Developer
                </p>

                <p className="mx-auto mt-4 max-w-[260px] text-sm leading-6 text-gray-500">
                  Mengembangkan teknologi dan pengalaman digital untuk
                  mendukung kebutuhan pelanggan.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8">

          <div className="overflow-hidden rounded-[28px] bg-[#0F6A6A] px-6 py-12 text-center sm:rounded-[32px] sm:px-10 sm:py-14 lg:px-16 lg:py-16">

            <h2 className="mx-auto max-w-[700px] text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Siap Menemukan Hunian
              <span className="block text-white/90">
                Impian Anda?
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-[620px] text-sm leading-7 text-white/75 sm:text-base">
              Konsultasikan kebutuhan properti Anda bersama tim profesional
              kami dan temukan solusi terbaik untuk masa depan keluarga Anda.
            </p>

            <Link
              href="/kontak"
              className="group mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-[#0F6A6A] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-50 active:translate-y-0"
            >
              Hubungi Kami

              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>

          </div>
        </div>
      </section>

    </main>
  );
}