"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-white to-[#F4F8F8]">
      <div className="max-w-[1200px] mx-auto px-6 py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-flex items-center rounded-full bg-[#0F6A6A]/10 px-4 py-2 text-sm font-medium text-[#0F6A6A]">
              Perusahaan Properti Terpercaya
            </span>

            <h1 className="mt-6 text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900">
              Hunian Berkualitas
              <br />
              Untuk Masa Depan Anda
            </h1>

            <p className="mt-6 max-w-[550px] text-lg leading-relaxed text-gray-600">
              Menyediakan pilihan properti terbaik dengan lokasi strategis,
              desain modern, serta nilai investasi yang terus berkembang untuk
              keluarga Indonesia.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/daftar-properti"
                className="h-12 px-7 rounded-full bg-[#0F6A6A] text-white font-medium flex items-center justify-center hover:bg-[#0C5A5A] transition"
              >
                Lihat Properti
              </Link>

              <Link
                href="/kontak"
                className="h-12 px-7 rounded-full border border-gray-200 text-gray-800 font-medium flex items-center justify-center hover:bg-white transition"
              >
                Hubungi Kami
              </Link>
            </div>

            <div className="mt-12 bg-white rounded-[24px] border border-gray-100 shadow-sm p-4">
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs text-gray-500">
                    Lokasi
                  </label>

                  <select className="mt-2 w-full bg-transparent outline-none text-sm font-medium">
                    <option>Lampung</option>
                    <option>Jakarta</option>
                    <option>Bandung</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-gray-500">
                    Tipe Properti
                  </label>

                  <select className="mt-2 w-full bg-transparent outline-none text-sm font-medium">
                    <option>Rumah</option>
                    <option>Ruko</option>
                    <option>Tanah</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-gray-500">
                    Harga
                  </label>

                  <select className="mt-2 w-full bg-transparent outline-none text-sm font-medium">
                    <option>Semua Harga</option>
                    <option>&lt; Rp500 Juta</option>
                    <option>Rp500 Juta - Rp1 Miliar</option>
                  </select>
                </div>

                <button className="h-12 self-end rounded-xl bg-[#0F6A6A] text-white font-medium hover:bg-[#0C5A5A] transition">
                  Cari Properti
                </button>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[32px] shadow-xl">
              <Image
                src="/Asset/Properti5/Asset1.png"
                alt="Properti Unggulan"
                width={900}
                height={700}
                priority
                className="w-full h-[600px] object-cover"
              />
            </div>

            <div className="absolute bottom-6 left-6 bg-white rounded-2xl px-5 py-4 shadow-lg border border-gray-100">
              <p className="text-xs uppercase tracking-wider text-gray-500">
                Properti Unggulan
              </p>

              <h3 className="mt-1 text-xl font-bold text-gray-900">
                Rp 750 Juta
              </h3>

              <p className="text-sm text-gray-500">
                Lampung Selatan
              </p>
            </div>

            <div className="absolute top-6 right-6 bg-white rounded-2xl px-5 py-4 shadow-lg border border-gray-100">
              <p className="text-xs text-gray-500">
                Unit Tersedia
              </p>

              <h3 className="mt-1 text-2xl font-bold text-[#0F6A6A]">
                120+
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}