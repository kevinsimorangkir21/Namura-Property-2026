"use client";

import Image from "next/image";
import { Star } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="bg-white">
      <div className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-[#0F6A6A]/10 px-4 py-2 text-sm font-medium text-[#0F6A6A]">
            Testimoni Klien
          </span>

          <h2 className="mt-6 text-4xl lg:text-5xl font-bold text-gray-900">
            Apa Kata Klien Kami
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Kepercayaan pelanggan adalah prioritas utama kami. Dengarkan
            pengalaman mereka dalam menemukan hunian terbaik bersama kami.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-16">
          <div className="bg-white rounded-[28px] p-8 shadow-sm border border-gray-100">
            <div className="flex gap-1 text-[#F59E0B]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-current"
                />
              ))}
            </div>

            <p className="mt-6 text-gray-600 leading-relaxed">
              Proses pembelian rumah sangat mudah dan transparan. Tim
              selalu responsif dan membantu sampai proses serah terima.
            </p>

            <div className="flex items-center gap-4 mt-8">
              <Image
                src="/user1.jpg"
                alt="Client"
                width={56}
                height={56}
                className="rounded-full object-cover"
              />

              <div>
                <h4 className="font-semibold text-gray-900">
                  Andi Pratama
                </h4>

                <p className="text-sm text-gray-500">
                  Jakarta
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[28px] p-8 shadow-sm border border-gray-100">
            <div className="flex gap-1 text-[#F59E0B]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-current"
                />
              ))}
            </div>

            <p className="mt-6 text-gray-600 leading-relaxed">
              Lokasi strategis dan kualitas bangunan sangat memuaskan.
              Investasi yang tepat untuk keluarga kami.
            </p>

            <div className="flex items-center gap-4 mt-8">
              <Image
                src="/user2.jpg"
                alt="Client"
                width={56}
                height={56}
                className="rounded-full object-cover"
              />

              <div>
                <h4 className="font-semibold text-gray-900">
                  Siti Rahma
                </h4>

                <p className="text-sm text-gray-500">
                  Bandung
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[28px] p-8 shadow-sm border border-gray-100">
            <div className="flex gap-1 text-[#F59E0B]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-current"
                />
              ))}
            </div>

            <p className="mt-6 text-gray-600 leading-relaxed">
              Pelayanan profesional dan proses administrasi sangat jelas.
              Sangat direkomendasikan bagi yang mencari properti.
            </p>

            <div className="flex items-center gap-4 mt-8">
              <Image
                src="/user3.jpg"
                alt="Client"
                width={56}
                height={56}
                className="rounded-full object-cover"
              />

              <div>
                <h4 className="font-semibold text-gray-900">
                  Budi Santoso
                </h4>

                <p className="text-sm text-gray-500">
                  Lampung
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-20 text-center">
          <div>
            <h3 className="text-4xl font-bold text-[#0F6A6A]">
              500+
            </h3>

            <p className="mt-2 text-gray-500">
              Klien Puas
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-[#0F6A6A]">
              4.9/5
            </h3>

            <p className="mt-2 text-gray-500">
              Rating Pelanggan
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-[#0F6A6A]">
              10+
            </h3>

            <p className="mt-2 text-gray-500">
              Tahun Pengalaman
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}