"use client";
import { motion } from "framer-motion";

export default function Steps() {
  const steps = [
    {
      num: 1,
      title: "Daftar & Lengkapi Profil",
      desc: "Buat akun di MagangHub, isi data diri, pendidikan, dan minat bidang magang.",
    },
    {
      num: 2,
      title: "Telusuri dan Lamar Magang",
      desc: "Cari peluang magang sesuai minat dan kompetensimu, lalu kirim lamaran secara online.",
    },
    {
      num: 3,
      title: "Mulai Pengalaman Magangmu",
      desc: "Ikuti proses seleksi, dapatkan penempatan, dan mulai mengembangkan kemampuan di dunia kerja nyata.",
    },
  ];

  return (
    <section
      className="
        relative py-24 overflow-hidden
        bg-white dark:bg-[#0a0f1a]
        text-gray-900 dark:text-white
        transition-colors duration-500
      "
    >
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Langkah Mengikuti Program Magang di MagangHub
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-16">
          Panduan singkat untuk membantu kamu memulai pengalaman magang secara resmi dan terarah.
        </p>

        {/* Step Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="
                relative group
                bg-gray-50/80 dark:bg-[#101826]/70
                border border-gray-200/40 dark:border-gray-700/40
                backdrop-blur-xl rounded-2xl p-8
                shadow-sm hover:shadow-lg
                transition-all duration-300
              "
            >
              {/* Nomor Lingkaran */}
              <div
                className="
                  absolute -top-6 left-6
                  bg-primary dark:bg-blue-600
                  text-white w-12 h-12 flex items-center justify-center
                  text-xl font-bold rounded-full shadow-md
                  group-hover:scale-110 transition-transform duration-300
                "
              >
                {s.num}
              </div>

              <h3
                className="
                  mt-8 text-xl font-semibold
                  text-gray-900 dark:text-white
                  group-hover:text-primary dark:group-hover:text-blue-400
                  transition-colors duration-300
                "
              >
                {s.title}
              </h3>
              <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Wave bawah ke footer */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-24 text-gray-50 dark:text-[#090e18]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,
            82.39-16.45,168.19-17.48,250.45-0.39,
            59,12.27,113.79,31.89,172,47.78,
            82.62,22.51,168.38,31.15,250.61,13.69V120H0V27.35
            A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </section>
  );
}
