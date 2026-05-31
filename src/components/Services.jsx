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
      desc: "Mengembangkan kawasan hunian modern dengan kualitas konstruksi terbaik dan nilai investasi yang terus berkembang.",
      icon: Home,
    },
    {
      title: "Konsultasi Properti",
      desc: "Membantu memilih properti yang tepat sesuai kebutuhan, lokasi, dan kemampuan finansial Anda.",
      icon: Building2,
    },
    {
      title: "Desain Arsitektur",
      desc: "Perencanaan desain yang mengutamakan fungsi, estetika, dan kenyamanan jangka panjang.",
      icon: Paintbrush,
    },
    {
      title: "Manajemen Properti",
      desc: "Pengelolaan aset properti secara profesional untuk menjaga nilai dan produktivitas investasi.",
      icon: Briefcase,
    },
    {
      title: "Perencanaan Investasi",
      desc: "Strategi investasi properti yang terukur untuk memberikan keuntungan berkelanjutan.",
      icon: TrendingUp,
    },
    {
      title: "Penjualan & Pemasaran",
      desc: "Pendekatan pemasaran modern untuk meningkatkan daya tarik dan nilai jual properti.",
      icon: Megaphone,
    },
  ];

  return (
    <section className="bg-white">
      <div className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-[#0F6A6A]/10 px-4 py-2 text-sm font-medium text-[#0F6A6A]">
            Layanan Kami
          </span>

          <h2 className="mt-6 text-4xl lg:text-5xl font-bold text-gray-900">
            Solusi Properti
            <br />
            Untuk Setiap Kebutuhan
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Kami menghadirkan berbagai layanan profesional yang dirancang untuk
            membantu Anda memiliki, mengembangkan, dan mengelola properti dengan
            lebih mudah.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {services.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group bg-white rounded-[28px] p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
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

                <button className="mt-6 text-[#0F6A6A] font-medium group-hover:translate-x-1 transition">
                  Pelajari Lebih →
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-20 bg-[#0F6A6A] rounded-[32px] p-10 lg:p-14 text-center">
          <h3 className="text-3xl lg:text-4xl font-bold text-white">
            Siap Mewujudkan Hunian Impian Anda?
          </h3>

          <p className="mt-4 text-white/80 max-w-2xl mx-auto">
            Konsultasikan kebutuhan properti Anda bersama tim profesional kami
            dan temukan solusi terbaik untuk masa depan keluarga Anda.
          </p>

          <button className="mt-8 h-12 px-8 rounded-full bg-white text-[#0F6A6A] font-semibold hover:opacity-90 transition">
            Hubungi Kami
          </button>
        </div>
      </div>
    </section>
  );
}