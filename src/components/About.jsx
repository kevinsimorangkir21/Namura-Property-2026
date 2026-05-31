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
      <div className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="overflow-hidden rounded-[32px]">
              <Image
                src="/Asset/Banner/Asset1.png"
                alt="Tentang Kami"
                width={700}
                height={800}
                className="w-full h-[600px] object-cover"
              />
            </div>

            <div className="absolute bottom-6 left-6 bg-white rounded-3xl shadow-lg border border-gray-100 px-6 py-5">
              <h3 className="text-3xl font-bold text-[#0F6A6A]">
                10+
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Tahun Pengalaman
              </p>
            </div>
          </div>

          <div>
            <span className="inline-flex items-center rounded-full bg-[#0F6A6A]/10 px-4 py-2 text-sm font-medium text-[#0F6A6A]">
              Tentang Kami
            </span>

            <h2 className="mt-6 text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
              Membangun Hunian Nyaman
              untuk Masa Depan Keluarga
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-gray-600 max-w-xl">
              Kami menghadirkan solusi properti yang tidak hanya nyaman untuk
              dihuni, tetapi juga memberikan nilai investasi yang terus
              berkembang. Dengan pengalaman lebih dari satu dekade, kami telah
              membantu banyak keluarga menemukan rumah impiannya.
            </p>

            <div className="grid grid-cols-3 gap-6 mt-10">
              <div>
                <h3 className="text-3xl font-bold text-[#0F6A6A]">
                  120+
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Properti
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-[#0F6A6A]">
                  50+
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Klien
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-[#0F6A6A]">
                  10+
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Tahun
                </p>
              </div>
            </div>

            <div className="mt-10 space-y-6">
              {features.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="mt-1">
                    <CheckCircle
                      className="w-5 h-5 text-[#0F6A6A]"
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {item.title}
                    </h4>

                    <p className="text-gray-600 mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-10 h-12 px-7 rounded-full bg-[#0F6A6A] text-white font-medium hover:bg-[#0C5A5A] transition">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}