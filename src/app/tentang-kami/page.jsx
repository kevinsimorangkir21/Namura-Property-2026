"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Users,
  Sparkles,
  TrendingUp,
  Building2,
  Target,
  HeartHandshake,
  MapPin,
} from "lucide-react";

export default function TentangKamiPage() {
  const values = [
    {
      number: "01",
      title: "Integritas",
      desc: "Transparansi dan kejujuran dalam setiap proses yang kami jalankan.",
      icon: ShieldCheck,
    },
    {
      number: "02",
      title: "Profesional",
      desc: "Memberikan pelayanan terbaik dengan standar kerja yang tinggi.",
      icon: Users,
    },
    {
      number: "03",
      title: "Inovasi",
      desc: "Terus berkembang mengikuti kebutuhan pasar dan teknologi.",
      icon: Sparkles,
    },
    {
      number: "04",
      title: "Komitmen",
      desc: "Fokus pada kualitas dan kepuasan pelanggan jangka panjang.",
      icon: TrendingUp,
    },
  ];

  const achievements = [
    {
      value: "100+",
      label: "Properti",
      icon: Building2,
    },
    {
      value: "80+",
      label: "Klien",
      icon: Users,
    },
    {
      value: "10+",
      label: "Tahun",
      icon: TrendingUp,
    },
    {
      value: "5+",
      label: "Kota",
      icon: MapPin,
    },
  ];

  const highlights = [
    "Lokasi strategis dan terus berkembang.",
    "Kualitas konstruksi dengan standar terbaik.",
    "Nilai investasi yang terus bertumbuh.",
  ];

  const missions = [
    "Menyediakan properti berkualitas dengan desain modern.",
    "Memberikan pelayanan terbaik kepada pelanggan.",
    "Membangun hubungan jangka panjang dengan mitra dan klien.",
    "Berkontribusi pada pembangunan yang berkelanjutan.",
  ];

  return (
    <main className="overflow-hidden bg-white text-[var(--foreground)]">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative bg-white">
        <div className="container relative py-12 sm:py-14 lg:py-16 xl:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 xl:gap-20">
            {/* IMAGE */}
            <div className="relative mx-auto w-full max-w-[560px] lg:mx-0">
              <div className="relative overflow-hidden rounded-[26px] sm:rounded-[30px]">
                <Image
                  src="/Asset/Banner/Asset1.png"
                  alt="Tentang Namura Property"
                  width={800}
                  height={900}
                  priority
                  className="h-[420px] w-full object-cover sm:h-[500px] lg:h-[560px]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                {/* IMAGE LABEL */}
                <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6">
                  <div className="rounded-2xl border border-white/20 bg-black/25 px-4 py-3 backdrop-blur-md">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60">
                      Namura Property
                    </p>

                    <p className="mt-1 text-sm font-medium text-white">
                      Membangun masa depan bersama
                    </p>
                  </div>
                </div>
              </div>

              {/* EXPERIENCE CARD */}
              <div className="absolute -bottom-4 right-4 rounded-[20px] border border-[var(--border)] bg-white px-4 py-3.5 shadow-[var(--shadow-lg)] sm:-bottom-5 sm:right-5 sm:px-6 sm:py-4">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
                    <TrendingUp size={18} />
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                      Pengalaman
                    </p>

                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-bold tracking-tight text-[var(--primary)] sm:text-2xl">
                        10+
                      </span>

                      <span className="text-xs text-[var(--muted)]">
                        Tahun
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="max-w-[650px]">
              <span className="eyebrow">
                <span className="eyebrow-dot" />
                Tentang Kami
              </span>

              <h1 className="heading-xl mt-4 text-[var(--foreground)]">
                Lebih dari sekadar
                <span className="block text-[var(--primary)]">
                  tempat tinggal.
                </span>
              </h1>

              <p className="mt-5 max-w-[600px] text-[15px] leading-7 text-[var(--secondary)] sm:text-base lg:text-lg lg:leading-8">
                Kami percaya bahwa rumah bukan sekadar bangunan, tetapi tempat
                di mana kehidupan dan cerita dimulai. Dengan pengalaman lebih
                dari satu dekade, Namura Property menghadirkan properti
                berkualitas yang memberikan kenyamanan, keamanan, dan nilai
                investasi jangka panjang.
              </p>

              {/* HIGHLIGHTS */}
              <div className="mt-7 space-y-3.5">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--primary-light)] text-[var(--primary)]">
                      <CheckCircle2 size={15} />
                    </div>

                    <p className="text-sm leading-6 text-[var(--secondary)]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/kontak"
                  className="btn btn-primary group"
                >
                  Hubungi Kami

                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>

                <Link
                  href="/daftar-properti"
                  className="btn btn-ghost group"
                >
                  Lihat Properti

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          ACHIEVEMENTS
      ========================================================= */}
      <section className="border-y border-[var(--border-soft)] bg-white">
        <div className="container py-7 sm:py-8 lg:py-9">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {achievements.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className={`
                    group flex items-center gap-3.5
                    px-4 py-4
                    sm:px-6
                    md:py-2
                    ${
                      index % 2 !== 0
                        ? "border-l border-[var(--border-soft)]"
                        : ""
                    }
                    ${
                      index >= 2
                        ? "border-t border-[var(--border-soft)] md:border-t-0"
                        : ""
                    }
                    ${
                      index >= 2
                        ? "md:border-l"
                        : ""
                    }
                  `}
                >
                  <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)] sm:flex">
                    <Icon size={18} />
                  </div>

                  <div>
                    <p className="text-2xl font-bold tracking-tight text-[var(--primary)] sm:text-3xl lg:text-4xl">
                      {item.value}
                    </p>

                    <p className="mt-0.5 text-xs text-[var(--muted)] sm:text-sm">
                      {item.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          VISI & MISI
      ========================================================= */}
      <section className="bg-white">
        <div className="container py-14 sm:py-16 lg:py-20">
          {/* HEADER */}
          <div className="max-w-[760px]">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              Visi & Misi
            </span>

            <h2 className="heading-lg mt-4">
              Punya arah yang jelas,
              <span className="block text-[var(--primary)]">
                untuk masa depan yang lebih baik.
              </span>
            </h2>

            <p className="text-body mt-4 max-w-[650px]">
              Setiap langkah kami berangkat dari visi yang jelas dan komitmen
              untuk memberikan pengalaman properti yang lebih baik bagi
              pelanggan, mitra, dan masyarakat.
            </p>
          </div>

          {/* VISI MISI */}
          <div className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-7">
            {/* VISI */}
            <div className="group relative overflow-hidden rounded-[26px] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)] sm:p-8 lg:p-9">
              <div className="absolute right-0 top-0 h-36 w-36 translate-x-1/3 -translate-y-1/3 rounded-full bg-[var(--primary-light)] opacity-60 transition-transform duration-500 group-hover:scale-125" />

              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
                  <Target size={20} />
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
                  Visi
                </p>

                <h3 className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-[28px]">
                  Menjadi bagian dari masa depan properti Indonesia.
                </h3>

                <p className="mt-4 text-sm leading-7 text-[var(--secondary)] sm:text-base">
                  Menjadi pengembang properti terpercaya yang menghadirkan
                  hunian berkualitas tinggi, bernilai investasi, dan mampu
                  meningkatkan kualitas hidup masyarakat Indonesia.
                </p>
              </div>
            </div>

            {/* MISI */}
            <div className="rounded-[26px] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-sm)] sm:p-8 lg:p-9">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
                <HeartHandshake size={20} />
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
                Misi
              </p>

              <h3 className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-[28px]">
                Memberikan pengalaman properti yang lebih baik.
              </h3>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {missions.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl bg-[var(--surface-muted)] p-3.5"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-[11px] font-bold text-white">
                      {index + 1}
                    </span>

                    <p className="text-sm leading-6 text-[var(--secondary)]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          COMPANY VALUES
      ========================================================= */}
      <section className="bg-white">
        <div className="container py-14 sm:py-16 lg:py-20">
          {/* HEADER */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[700px]">
              <span className="eyebrow">
                <span className="eyebrow-dot" />
                Nilai Perusahaan
              </span>

              <h2 className="heading-lg mt-4">
                Prinsip yang menjadi
                <span className="block text-[var(--primary)]">
                  fondasi setiap langkah.
                </span>
              </h2>
            </div>

            <p className="max-w-[430px] text-sm leading-6 text-[var(--muted)] lg:pb-1">
              Nilai-nilai ini menjadi panduan dalam setiap keputusan,
              pelayanan, dan hubungan yang kami bangun bersama pelanggan
              maupun mitra.
            </p>
          </div>

          {/* VALUES */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-5">
            {values.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-[24px] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--primary)]/20 hover:shadow-[var(--shadow-lg)] sm:p-6"
                >
                  {/* Number */}
                  <span className="absolute right-5 top-4 text-4xl font-bold tracking-tight text-[var(--surface-muted)] transition-colors duration-300 group-hover:text-[var(--primary-light)]">
                    {item.number}
                  </span>

                  <div className="relative">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)] transition-all duration-300 group-hover:bg-[var(--primary)] group-hover:text-white">
                      <Icon size={20} />
                    </div>

                    <h3 className="mt-6 text-lg font-bold tracking-tight text-[var(--foreground)]">
                      {item.title}
                    </h3>

                    <p className="mt-2.5 text-sm leading-6 text-[var(--muted)]">
                      {item.desc}
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-[var(--primary)] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                      <span>Nilai Namura</span>
                      <ArrowRight size={13} />
                    </div>
                  </div>
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
        <div className="container py-14 sm:py-16 lg:py-20">
          {/* HEADER */}
          <div className="mx-auto max-w-[720px] text-center">
            <span className="eyebrow justify-center">
              <span className="eyebrow-dot" />
              Tim Kami
            </span>

            <h2 className="heading-lg mt-4">
              Orang-orang di balik
              <span className="block text-[var(--primary)]">
                perjalanan Namura.
              </span>
            </h2>

            <p className="text-body mx-auto mt-4 max-w-[620px]">
              Tim kami hadir untuk membantu Anda menemukan solusi properti
              yang sesuai dengan kebutuhan dan rencana masa depan.
            </p>
          </div>

          {/* TEAM CARDS */}
          <div className="mx-auto mt-8 grid max-w-4xl gap-5 sm:grid-cols-2 lg:mt-10 lg:gap-6">
            {/* MARTIN */}
            <div className="group overflow-hidden rounded-[26px] border border-[var(--border)] bg-white shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lg)]">
              <div className="relative overflow-hidden bg-[var(--surface-muted)]">
                <div className="relative mx-auto h-56 w-full sm:h-64">
                  <Image
                    src="/team1.jpg"
                    alt="Martin Simorangkir"
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/40 to-transparent" />

                <div className="absolute bottom-4 left-5">
                  <span className="rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-[var(--primary)] backdrop-blur-md">
                    Property Consultant
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-lg font-bold tracking-tight text-[var(--foreground)] sm:text-xl">
                  Martin Simorangkir
                </h3>

                <p className="mt-2.5 text-sm leading-6 text-[var(--muted)]">
                  Membantu pelanggan menemukan properti yang sesuai dengan
                  kebutuhan dan rencana mereka.
                </p>

                <div className="mt-5 flex items-center gap-2 border-t border-[var(--border-soft)] pt-4 text-xs font-medium text-[var(--primary)]">
                  <CheckCircle2 size={15} />
                  <span>Siap membantu kebutuhan properti Anda</span>
                </div>
              </div>
            </div>

            {/* KEVIN */}
            <div className="group overflow-hidden rounded-[26px] border border-[var(--border)] bg-white shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lg)]">
              <div className="relative overflow-hidden bg-[var(--surface-muted)]">
                <div className="relative mx-auto h-56 w-full sm:h-64">
                  <Image
                    src="/team2.jpg"
                    alt="Kevin Simorangkir"
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/40 to-transparent" />

                <div className="absolute bottom-4 left-5">
                  <span className="rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-[var(--primary)] backdrop-blur-md">
                    IT Developer
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-lg font-bold tracking-tight text-[var(--foreground)] sm:text-xl">
                  Kevin Simorangkir
                </h3>

                <p className="mt-2.5 text-sm leading-6 text-[var(--muted)]">
                  Mengembangkan teknologi dan pengalaman digital untuk
                  mendukung kebutuhan pelanggan.
                </p>

                <div className="mt-5 flex items-center gap-2 border-t border-[var(--border-soft)] pt-4 text-xs font-medium text-[var(--primary)]">
                  <CheckCircle2 size={15} />
                  <span>Membangun pengalaman digital Namura</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}