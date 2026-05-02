import Image from "next/image";
import {
  CheckCircle,
  ShieldCheck,
  Users,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function TentangKamiPage() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div className="relative">
            <Image
              src="/Asset/Banner/Asset1.png"
              alt="Tentang Kami"
              width={600}
              height={700}
              className="rounded-2xl object-cover"
            />

            <div className="absolute bottom-5 left-5 bg-white px-5 py-4 rounded-xl shadow-sm">
              <p className="text-lg font-semibold text-gray-900">
                10+ Tahun
              </p>
              <p className="text-gray-400 text-sm">
                Pengalaman
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <p className="text-sm text-gray-400 uppercase mb-3">
              Tentang Kami
            </p>

            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6 leading-tight">
              Kemewahan, Kenyamanan, dan Investasi Terbaik.
            </h1>

            <p className="text-gray-600 leading-relaxed mb-6">
              Kami percaya bahwa rumah adalah tempat di mana cerita dimulai. Dengan tim ahli dan jaringan luas, kami siap membantu kamu menemukan hunian impian yang sesuai dengan kebutuhan dan gaya hidupmu.
            </p>

            <div className="space-y-4">
              <div className="flex gap-3">
                <CheckCircle className="text-[var(--primary)] w-5 h-5 mt-1" />
                <p className="text-gray-600 text-sm">
                  Lokasi strategis & berkembang
                </p>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="text-[var(--primary)] w-5 h-5 mt-1" />
                <p className="text-gray-600 text-sm">
                  Kualitas bangunan terjamin
                </p>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="text-[var(--primary)] w-5 h-5 mt-1" />
                <p className="text-gray-600 text-sm">
                  Nilai investasi jangka panjang
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= VISI MISI ================= */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">

          <div className="p-8 rounded-2xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Visi
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Menjadi pengembang properti terkemuka yang menghadirkan hunian berkualitas tinggi dengan nilai investasi terbaik di Indonesia.
            </p>
          </div>

          <div className="p-8 rounded-2xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Misi
            </h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>1. Menyediakan properti berkualitas dengan desain inovatif dan fungsional.</li>
              <li>2. Memberikan layanan pelanggan yang unggul dan pengalaman membeli yang menyenangkan.</li>
              <li>3. Membangun hubungan jangka panjang dengan pelanggan, mitra, dan komunitas.</li>
              <li>4. Berkontribusi pada pembangunan berkelanjutan dan lingkungan yang lebih baik.</li>
            </ul>
          </div>

        </div>
      </section>

      {/* ================= NILAI ================= */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">

          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Nilai Budaya Perusahaan
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Prinsip utama dalam setiap langkah kami
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">

            <div className="p-6 rounded-2xl shadow-sm text-center">
              <div className="w-12 h-12 mx-auto flex items-center justify-center bg-white rounded-xl mb-4 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-[var(--primary)]" />
              </div>
              <h4 className="font-semibold mb-2">Integritas</h4>
              <p className="text-gray-500 text-sm">
                Transparansi dan kejujuran dalam setiap proses.
              </p>
            </div>

            <div className="p-6 rounded-2xl shadow-sm text-center">
              <div className="w-12 h-12 mx-auto flex items-center justify-center bg-white rounded-xl mb-4 shadow-sm">
                <Users className="w-5 h-5 text-[var(--primary)]" />
              </div>
              <h4 className="font-semibold mb-2">Profesional</h4>
              <p className="text-gray-500 text-sm">
                Memberikan pelayanan terbaik kepada klien.
              </p>
            </div>

            <div className="p-6 rounded-2xl shadow-sm text-center">
              <div className="w-12 h-12 mx-auto flex items-center justify-center bg-white rounded-xl mb-4 shadow-sm">
                <Sparkles className="w-5 h-5 text-[var(--primary)]" />
              </div>
              <h4 className="font-semibold mb-2">Inovasi</h4>
              <p className="text-gray-500 text-sm">
                Selalu berkembang mengikuti kebutuhan pasar.
              </p>
            </div>

            <div className="p-6 rounded-2xl shadow-sm text-center">
              <div className="w-12 h-12 mx-auto flex items-center justify-center bg-white rounded-xl mb-4 shadow-sm">
                <TrendingUp className="w-5 h-5 text-[var(--primary)]" />
              </div>
              <h4 className="font-semibold mb-2">Komitmen</h4>
              <p className="text-gray-500 text-sm">
                Fokus pada hasil terbaik dan jangka panjang.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= STAT ================= */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">

          <h2 className="text-2xl md:text-3xl font-semibold mb-10">
            Pencapaian Kami
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

            <div>
              <p className="text-3xl font-semibold text-[var(--primary)]">100+</p>
              <p className="text-gray-500 text-sm">Properti</p>
            </div>

            <div>
              <p className="text-3xl font-semibold text-[var(--primary)]">80+</p>
              <p className="text-gray-500 text-sm">Klien</p>
            </div>

            <div>
              <p className="text-3xl font-semibold text-[var(--primary)]">10+</p>
              <p className="text-gray-500 text-sm">Tahun</p>
            </div>

            <div>
              <p className="text-3xl font-semibold text-[var(--primary)]">5+</p>
              <p className="text-gray-500 text-sm">Kota</p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">

          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Tim Kami
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Profesional yang siap membantu Anda
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">

            <div className="p-6 rounded-2xl shadow-sm text-center">
              <img src="/team1.jpg" className="w-24 h-24 mx-auto rounded-full mb-4 object-cover" />
              <p className="font-semibold text-gray-900">Martin Simorangkir</p>
              <p className="text-gray-400 text-sm">Property Consultant</p>
            </div>

            <div className="p-6 rounded-2xl shadow-sm text-center">
              <img src="/team2.jpg" className="w-24 h-24 mx-auto rounded-full mb-4 object-cover" />
              <p className="font-semibold text-gray-900">Kevin Simorangkir</p>
              <p className="text-gray-400 text-sm">IT Developer</p>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}