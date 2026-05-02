"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";

export default function About() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* LEFT */}
          <div className="relative order-1 md:order-none">

            <Image
              src="/Asset/Banner/Asset1.png"
              alt="Tentang Perusahaan"
              width={500}
              height={600}
              className="rounded-xl object-cover w-full h-[260px] sm:h-[320px] md:h-auto"
            />

            {/* Info Card */}
            <div className="absolute bottom-4 left-4 bg-white px-4 py-3 rounded-lg border border-gray-100 shadow-sm text-xs sm:text-sm">
              <p className="font-semibold text-gray-900">10+ Tahun</p>
              <p className="text-gray-500">Pengalaman</p>
            </div>

          </div>

          {/* RIGHT */}
          <div className="text-center md:text-left">

            {/* Label */}
            <p className="text-sm text-gray-400 uppercase tracking-wide mb-2 md:mb-3">
              Tentang Kami
            </p>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold leading-tight text-gray-900 mb-4 md:mb-6">
              Kemewahan, Kenyamanan, dan Investasi Terbaik.
            </h2>

            {/* Description */}
            <p className="text-gray-600 mb-6 md:mb-10 max-w-md md:max-w-lg mx-auto md:mx-0 text-sm md:text-base leading-relaxed">
              Kami percaya bahwa rumah adalah tempat di mana cerita dimulai. Dengan tim ahli dan jaringan luas, kami siap membantu kamu menemukan hunian impian yang sesuai dengan kebutuhan dan gaya hidupmu.
            </p>

            {/* VALUE */}
            <div className="space-y-4 md:space-y-6 text-left">

              <div className="flex gap-3 md:gap-4">
                <CheckCircle className="text-[var(--primary)] w-4 h-4 md:w-5 md:h-5 mt-1 shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 text-sm md:text-base">
                    Lokasi Strategis
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm">
                    Dekat dengan fasilitas publik dan pusat aktivitas utama.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 md:gap-4">
                <CheckCircle className="text-[var(--primary)] w-4 h-4 md:w-5 md:h-5 mt-1 shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 text-sm md:text-base">
                    Kualitas Terjamin
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm">
                    Standar konstruksi tinggi dengan material pilihan.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 md:gap-4">
                <CheckCircle className="text-[var(--primary)] w-4 h-4 md:w-5 md:h-5 mt-1 shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 text-sm md:text-base">
                    Investasi Berkelanjutan
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm">
                    Nilai properti yang terus berkembang dari waktu ke waktu.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}