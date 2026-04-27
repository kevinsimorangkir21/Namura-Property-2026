"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0b0f15] text-white">
      <div className="max-w-6xl mx-auto px-6 py-32 md:py-40 relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Membangun{" "}
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Talenta Muda
          </span>{" "}
          Indonesia
        </h1>

        <p className="mt-6 text-gray-400 max-w-2xl text-lg">
          MagangHub membantu mahasiswa dan perusahaan terhubung untuk
          menciptakan pengalaman magang yang bermakna dan berdampak bagi masa
          depan Indonesia.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold">
            Cari Magang Sekarang
          </button>
          <button className="px-6 py-3 rounded-xl border border-blue-500 text-blue-400 hover:bg-blue-500/10 transition font-semibold">
            Pelajari Alur Pendaftaran
          </button>
        </div>
      </div>

      {/* Wave bawah */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-32 text-[#0b0f15]"
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

      {/* Decorative light orb */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.15 }}
        transition={{ duration: 2 }}
        className="absolute right-20 top-32 w-64 h-64 bg-blue-600 rounded-full blur-3xl"
      ></motion.div>
    </section>
  );
}
