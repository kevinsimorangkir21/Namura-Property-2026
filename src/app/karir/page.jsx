"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Users,
  TrendingUp,
  Briefcase,
  HeartHandshake,
} from "lucide-react";

export default function KarirPage() {
  const values = [
    {
      title: "Kolaboratif",
      desc: "Kami percaya hasil terbaik lahir dari kerja sama tim yang kuat.",
      icon: Users,
    },
    {
      title: "Bertumbuh",
      desc: "Setiap individu memiliki kesempatan untuk berkembang dan belajar.",
      icon: TrendingUp,
    },
    {
      title: "Profesional",
      desc: "Kami menjunjung tinggi integritas dan kualitas dalam bekerja.",
      icon: Briefcase,
    },
    {
      title: "Peduli",
      desc: "Kami membangun lingkungan kerja yang suportif dan positif.",
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="bg-white">
      <div className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-[#0F6A6A]/10 px-4 py-2 text-sm font-medium text-[#0F6A6A]">
            Karir
          </span>

          <h1 className="mt-6 text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Bangun Karir Bersama
            <br />
            Namura Property
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
            Kami percaya bahwa tim yang hebat adalah fondasi dari perusahaan
            yang hebat. Bergabunglah bersama kami dan tumbuh dalam lingkungan
            kerja yang profesional, kolaboratif, dan penuh peluang.
          </p>

          <Link
            href="/kontak"
            className="inline-flex items-center justify-center mt-8 h-12 px-8 rounded-full bg-[#0F6A6A] text-white font-medium hover:bg-[#0C5A5A] transition"
          >
            Lihat Peluang Karir
          </Link>
        </div>

        <div className="mt-16 overflow-hidden rounded-[32px]">
          <Image
            src="/team.jpg"
            alt="Tim Namura Property"
            width={1400}
            height={800}
            className="w-full h-[500px] object-cover"
          />
        </div>

        <div className="grid md:grid-cols-4 gap-8 mt-16 text-center">
          <div>
            <h3 className="text-4xl font-bold text-[#0F6A6A]">
              10+
            </h3>
            <p className="mt-2 text-gray-500">
              Tahun Pengalaman
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-[#0F6A6A]">
              100+
            </h3>
            <p className="mt-2 text-gray-500">
              Properti
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-[#0F6A6A]">
              50+
            </h3>
            <p className="mt-2 text-gray-500">
              Klien
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-[#0F6A6A]">
              20+
            </h3>
            <p className="mt-2 text-gray-500">
              Tim Profesional
            </p>
          </div>
        </div>
      </div>

      <section className="bg-[#F8FAFC]">
        <div className="max-w-[1200px] mx-auto px-6 py-24">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full bg-[#0F6A6A]/10 px-4 py-2 text-sm font-medium text-[#0F6A6A]">
              Budaya Kerja
            </span>

            <h2 className="mt-6 text-4xl lg:text-5xl font-bold text-gray-900">
              Nilai Yang Kami
              <br />
              Pegang Bersama
            </h2>

            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Kami membangun budaya kerja yang mendukung pertumbuhan,
              kolaborasi, dan profesionalisme.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {values.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="bg-white rounded-[28px] p-8 border border-gray-100 hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#0F6A6A]/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-[#0F6A6A]" />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="bg-[#0F6A6A] rounded-[32px] p-12 text-center">
          <h2 className="text-4xl font-bold text-white">
            Siap Menjadi Bagian Dari Tim Kami?
          </h2>

          <p className="mt-4 text-white/80 max-w-2xl mx-auto">
            Kami selalu terbuka untuk talenta terbaik yang ingin berkembang
            bersama dan menciptakan dampak positif melalui industri properti.
          </p>

          <a
            href="mailto:namuraproperty@gmail.com"
            className="inline-flex items-center justify-center mt-8 h-12 px-8 rounded-full bg-white text-[#0F6A6A] font-semibold hover:opacity-90 transition"
          >
            Kirim CV Anda
          </a>
        </div>
      </div>
    </section>
  );
}