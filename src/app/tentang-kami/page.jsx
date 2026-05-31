import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle,
  ShieldCheck,
  Users,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function TentangKamiPage() {
  const values = [
    {
      title: "Integritas",
      desc: "Transparansi dan kejujuran dalam setiap proses yang kami jalankan.",
      icon: ShieldCheck,
    },
    {
      title: "Profesional",
      desc: "Memberikan pelayanan terbaik dengan standar kerja yang tinggi.",
      icon: Users,
    },
    {
      title: "Inovasi",
      desc: "Terus berkembang mengikuti kebutuhan pasar dan teknologi.",
      icon: Sparkles,
    },
    {
      title: "Komitmen",
      desc: "Fokus pada kualitas dan kepuasan pelanggan jangka panjang.",
      icon: TrendingUp,
    },
  ];

  const achievements = [
    {
      value: "100+",
      label: "Properti",
    },
    {
      value: "80+",
      label: "Klien",
    },
    {
      value: "10+",
      label: "Tahun",
    },
    {
      value: "5+",
      label: "Kota",
    },
  ];

  return (
    <>
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

              <div className="absolute bottom-6 left-6 bg-white rounded-3xl px-6 py-5 shadow-lg border border-gray-100">
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

              <h1 className="mt-6 text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
                Membangun Hunian Berkualitas
                <br />
                Untuk Masa Depan Keluarga Indonesia
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                Kami percaya bahwa rumah bukan sekadar bangunan, tetapi tempat
                di mana kehidupan dan cerita dimulai. Dengan pengalaman lebih
                dari satu dekade, kami menghadirkan properti berkualitas yang
                memberikan kenyamanan, keamanan, dan nilai investasi jangka
                panjang.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex gap-4">
                  <CheckCircle className="w-5 h-5 text-[#0F6A6A] mt-1" />
                  <p className="text-gray-600">
                    Lokasi strategis dan terus berkembang.
                  </p>
                </div>

                <div className="flex gap-4">
                  <CheckCircle className="w-5 h-5 text-[#0F6A6A] mt-1" />
                  <p className="text-gray-600">
                    Kualitas konstruksi dengan standar terbaik.
                  </p>
                </div>

                <div className="flex gap-4">
                  <CheckCircle className="w-5 h-5 text-[#0F6A6A] mt-1" />
                  <p className="text-gray-600">
                    Nilai investasi yang terus bertumbuh.
                  </p>
                </div>
              </div>

              <Link
                href="/kontak"
                className="inline-flex items-center justify-center mt-10 h-12 px-8 rounded-full bg-[#0F6A6A] text-white font-medium hover:bg-[#0C5A5A] transition"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-gray-100">
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {achievements.map((item) => (
              <div key={item.label}>
                <h3 className="text-4xl font-bold text-[#0F6A6A]">
                  {item.value}
                </h3>

                <p className="mt-2 text-gray-500">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC]">
        <div className="max-w-[1200px] mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-[28px] p-10 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-5">
                Visi
              </h2>

              <p className="text-gray-600 leading-relaxed">
                Menjadi pengembang properti terpercaya yang menghadirkan
                hunian berkualitas tinggi, bernilai investasi, dan mampu
                meningkatkan kualitas hidup masyarakat Indonesia.
              </p>
            </div>

            <div className="bg-white rounded-[28px] p-10 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-5">
                Misi
              </h2>

              <ul className="space-y-3 text-gray-600">
                <li>
                  • Menyediakan properti berkualitas dengan desain modern.
                </li>

                <li>
                  • Memberikan pelayanan terbaik kepada pelanggan.
                </li>

                <li>
                  • Membangun hubungan jangka panjang dengan mitra dan klien.
                </li>

                <li>
                  • Berkontribusi pada pembangunan yang berkelanjutan.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-24">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full bg-[#0F6A6A]/10 px-4 py-2 text-sm font-medium text-[#0F6A6A]">
              Nilai Perusahaan
            </span>

            <h2 className="mt-6 text-4xl lg:text-5xl font-bold text-gray-900">
              Budaya Yang Menjadi
              <br />
              Fondasi Perusahaan
            </h2>

            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Nilai-nilai yang menjadi panduan dalam setiap keputusan dan
              pelayanan yang kami berikan.
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

      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-24">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full bg-[#0F6A6A]/10 px-4 py-2 text-sm font-medium text-[#0F6A6A]">
              Tim Kami
            </span>

            <h2 className="mt-6 text-4xl lg:text-5xl font-bold text-gray-900">
              Profesional Yang Siap
              <br />
              Membantu Anda
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-3xl mx-auto">
            <div className="bg-white border border-gray-100 rounded-[28px] p-8 text-center">
              <Image
                src="/team1.jpg"
                alt="Martin Simorangkir"
                width={120}
                height={120}
                className="w-28 h-28 rounded-full object-cover mx-auto"
              />

              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                Martin Simorangkir
              </h3>

              <p className="mt-2 text-gray-500">
                Property Consultant
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-[28px] p-8 text-center">
              <Image
                src="/team2.jpg"
                alt="Kevin Simorangkir"
                width={120}
                height={120}
                className="w-28 h-28 rounded-full object-cover mx-auto"
              />

              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                Kevin Simorangkir
              </h3>

              <p className="mt-2 text-gray-500">
                IT Developer
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white pb-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="bg-[#0F6A6A] rounded-[32px] p-12 text-center">
            <h2 className="text-4xl font-bold text-white">
              Siap Menemukan Hunian Impian Anda?
            </h2>

            <p className="mt-4 text-white/80 max-w-2xl mx-auto">
              Konsultasikan kebutuhan properti Anda bersama tim profesional
              kami dan temukan solusi terbaik untuk masa depan keluarga Anda.
            </p>

            <Link
              href="/kontak"
              className="inline-flex items-center justify-center mt-8 h-12 px-8 rounded-full bg-white text-[#0F6A6A] font-semibold hover:opacity-90 transition"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}