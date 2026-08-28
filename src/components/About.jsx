"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";

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
    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* IMAGE */}
          <div className="relative">
            <div className="overflow-hidden rounded-[28px] sm:rounded-[32px]">
              <Image
                src="/Asset/Banner/Asset1.png"
                alt="Tentang Namura Property"
                width={700}
                height={800}
                className="h-[480px] w-full object-cover sm:h-[560px] lg:h-[600px]"
              />
            </div>

            {/* Experience Badge */}
            <div className="absolute bottom-5 left-5 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-xl sm:bottom-6 sm:left-6 sm:px-6 sm:py-5">
              <h3 className="text-2xl font-bold text-[#0F6A6A] sm:text-3xl">
                10+
              </h3>

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Tahun Pengalaman
              </p>
            </div>
          </div>

          {/* CONTENT */}
          <div>
            {/* Badge */}
            <span className="inline-flex items-center rounded-full border border-[#0F6A6A]/10 bg-[#0F6A6A]/[0.06] px-3.5 py-2 text-xs font-semibold tracking-wide text-[#0F6A6A] sm:text-sm">
              Tentang Kami
            </span>

            {/* Heading */}
            <h2 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
              Membangun Hunian Nyaman
              <span className="block text-[#0F6A6A]">
                untuk Masa Depan Keluarga
              </span>
            </h2>

            {/* Description */}
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-gray-500 sm:text-base lg:text-lg">
              Kami menghadirkan solusi properti yang tidak hanya nyaman untuk
              dihuni, tetapi juga memberikan nilai investasi yang terus
              berkembang. Dengan pengalaman lebih dari satu dekade, kami telah
              membantu banyak keluarga menemukan rumah impiannya.
            </p>

            {/* FEATURES */}
            <div className="mt-9 space-y-6">
              {features.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4"
                >
                  {/* Icon */}
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0F6A6A]/[0.07]">
                    <CheckCircle
                      className="h-4.5 w-4.5 text-[#0F6A6A]"
                      strokeWidth={2}
                    />
                  </div>

                  {/* Text */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 sm:text-base">
                      {item.title}
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-gray-500 sm:text-[15px]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              type="button"
              className="mt-9 inline-flex h-12 items-center justify-center rounded-full bg-[#0F6A6A] px-7 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(15,106,106,0.15)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0C5A5A] hover:shadow-[0_12px_30px_rgba(15,106,106,0.2)] active:translate-y-0"
            >
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}