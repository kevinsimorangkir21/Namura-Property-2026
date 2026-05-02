"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-[var(--primary)]">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">

          {/* LEFT */}
          <div className="text-center md:text-left">

            {/* Badge */}
            <span className="text-xs text-white/70 tracking-wide uppercase">
              Perusahaan Properti Terpercaya
            </span>

            {/* Heading */}
            <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-white">
              Hunian Berkualitas <br className="hidden sm:block" />
              untuk Masa Depan Anda
            </h1>

            {/* Description */}
            <p className="mt-4 md:mt-5 text-white/80 max-w-md mx-auto md:mx-0 text-sm md:text-base leading-relaxed">
              Menyediakan pilihan properti terbaik dengan desain modern,
              lokasi strategis, dan nilai investasi yang terus berkembang.
            </p>

            {/* CTA */}
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <button className="bg-white text-[var(--primary)] px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition w-full sm:w-auto">
                Lihat Properti
              </button>

              <button className="px-6 py-3 rounded-full text-sm border border-white/40 text-white hover:bg-white/10 transition w-full sm:w-auto">
                Tentang Kami
              </button>
            </div>

            {/* Stats */}
            <div className="flex justify-center md:justify-start flex-wrap gap-6 sm:gap-8 md:gap-10 mt-8 md:mt-10 text-sm text-white">
              <div>
                <p className="font-semibold text-lg">120+</p>
                <p className="text-white/70 text-xs md:text-sm">
                  Properti Tersedia
                </p>
              </div>
              <div>
                <p className="font-semibold text-lg">50+</p>
                <p className="text-white/70 text-xs md:text-sm">
                  Klien Puas
                </p>
              </div>
              <div>
                <p className="font-semibold text-lg">10+</p>
                <p className="text-white/70 text-xs md:text-sm">
                  Tahun Pengalaman
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT */}
          <div className="relative mt-6 md:mt-0">

            <Image
              src="/Asset/Properti5/Asset1.png"
              alt="Properti"
              width={600}
              height={420}
              className="rounded-xl object-cover shadow-lg w-full h-[240px] sm:h-[300px] md:h-auto"
            />

            {/* Info Card */}
            <div className="absolute bottom-4 left-4 bg-white px-4 py-3 rounded-lg border border-gray-100 shadow-sm text-xs sm:text-sm">
              <p className="font-medium text-gray-900">Rp 750 Juta</p>
              <p className="text-gray-500">
                Rumah Subsidi di Lampung Selatan
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}