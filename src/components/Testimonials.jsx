"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">

        {/* TITLE */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
          Apa Kata Klien Kami
        </h2>

        <p className="text-gray-600 max-w-xl mx-auto mb-8 md:mb-12 text-sm leading-relaxed">
          Kepercayaan klien adalah prioritas utama kami. Berikut pengalaman
          mereka dalam menemukan hunian terbaik bersama kami.
        </p>

        {/* CARD */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 text-center md:text-left shadow-sm">

          {/* Avatar */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 relative shrink-0">
            <Image
              src="/user1.jpg"
              alt="klien"
              fill
              className="rounded-lg object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Proses pembelian rumah berjalan sangat lancar dan transparan.
              Tim sangat membantu dalam setiap tahap, mulai dari konsultasi
              hingga serah terima. Saya sangat merekomendasikan untuk yang
              sedang mencari properti berkualitas.
            </p>

            <p className="mt-4 md:mt-5 font-semibold text-gray-900 text-sm md:text-base">
              Andi Pratama
            </p>

            <p className="text-gray-400 text-xs md:text-sm">
              Pembeli Rumah • Jakarta
            </p>
          </div>

        </div>

        {/* NAVIGATION */}
        <div className="flex justify-center gap-3 mt-6 md:mt-8">
          <button className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition">
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}