"use client";
import { motion } from "framer-motion";

export default function Impact() {
  const stats = [
    { label: "Peserta Magang Terdaftar", value: "120K+" },
    { label: "Perusahaan Mitra Aktif", value: "450+" },
    { label: "Program Magang Tersedia", value: "800+" },
    { label: "Sertifikat Diterbitkan", value: "30K+" },
  ];

  return (
    <section
      className="
        relative overflow-hidden
        bg-gray-50 dark:bg-[#0b0f15]
        text-gray-900 dark:text-white
        py-28 transition-colors duration-500
      "
    >
      {/* Konten utama */}
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Dampak Kami
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Mewujudkan ekosistem magang nasional yang inklusif dan berdaya saing.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="
                p-6 rounded-2xl
                bg-white/60 dark:bg-white/5
                backdrop-blur-sm
                shadow-sm dark:shadow-none
                hover:shadow-md hover:scale-[1.03]
                transition duration-300
              "
            >
              <h3 className="text-4xl font-bold text-primary dark:text-blue-400">
                {item.value}
              </h3>
              <p className="text-gray-700 dark:text-gray-400 mt-2">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Wave Bawah */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-24 text-gray-50 dark:text-[#0a0f1a]"
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
