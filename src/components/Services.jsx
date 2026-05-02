"use client";

import {
  Home,
  Building2,
  Paintbrush,
  Briefcase,
  TrendingUp,
  Megaphone,
} from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Pengembangan Properti",
      desc: "Mengembangkan hunian modern dengan kualitas konstruksi terbaik.",
      icon: Home,
    },
    {
      title: "Konsultasi Properti",
      desc: "Membantu Anda memilih properti sesuai kebutuhan dan anggaran.",
      icon: Building2,
    },
    {
      title: "Desain Arsitektur",
      desc: "Perencanaan desain yang fungsional dan estetis.",
      icon: Paintbrush,
    },
    {
      title: "Manajemen Properti",
      desc: "Pengelolaan properti secara profesional dan efisien.",
      icon: Briefcase,
    },
    {
      title: "Perencanaan Investasi",
      desc: "Strategi investasi properti untuk hasil jangka panjang.",
      icon: TrendingUp,
    },
    {
      title: "Penjualan & Pemasaran",
      desc: "Pendekatan pemasaran yang efektif untuk meningkatkan nilai jual.",
      icon: Megaphone,
    },
  ];

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">

        {/* HEADER */}
        <div className="mb-10 md:mb-12 text-center md:text-left">
          <p className="text-sm text-gray-400 uppercase tracking-wide mb-2">
            Layanan
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">
            Layanan Kami
          </h2>

          <p className="text-gray-600 mt-2 max-w-md mx-auto md:mx-0 text-sm md:text-base">
            Kami menyediakan berbagai layanan properti untuk memenuhi kebutuhan Anda.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="border border-gray-100 rounded-xl p-5 md:p-6 hover:shadow-sm hover:-translate-y-1 transition duration-300"
              >
                
                {/* ICON */}
                <div className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-lg bg-gray-100 mb-4">
                  <Icon className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
                </div>

                {/* TITLE */}
                <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">
                  {item.title}
                </h3>

                {/* DESC */}
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  {item.desc}
                </p>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}