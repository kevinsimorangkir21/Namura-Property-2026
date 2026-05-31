import PropertyCard from "./PropertyCard";
import { properties } from "@/data/properties";
import Link from "next/link";

export default function PropertyList() {
  return (
    <section className="bg-white">
      <div className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div>
            <span className="inline-flex items-center rounded-full bg-[#0F6A6A]/10 px-4 py-2 text-sm font-medium text-[#0F6A6A]">
              Properti Pilihan
            </span>

            <h2 className="mt-6 text-4xl lg:text-5xl font-bold text-gray-900">
              Temukan Properti
              <br />
              Impian Anda
            </h2>

            <p className="mt-4 max-w-2xl text-lg text-gray-600">
              Jelajahi berbagai pilihan properti terbaik dengan lokasi
              strategis, desain modern, dan nilai investasi yang terus
              berkembang.
            </p>
          </div>

          <Link
            href="/daftar-properti"
            className="inline-flex items-center justify-center h-12 px-6 rounded-full border border-gray-200 bg-white text-gray-900 font-medium hover:bg-gray-50 transition"
          >
            Lihat Semua Properti
          </Link>
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          <button className="h-11 px-5 rounded-full bg-[#0F6A6A] text-white text-sm font-medium">
            Semua
          </button>

          <button className="h-11 px-5 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-[#0F6A6A] hover:text-[#0F6A6A] transition">
            Dijual
          </button>

          <button className="h-11 px-5 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-[#0F6A6A] hover:text-[#0F6A6A] transition">
            Disewa
          </button>

          <button className="h-11 px-5 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-[#0F6A6A] hover:text-[#0F6A6A] transition">
            Rumah
          </button>

          <button className="h-11 px-5 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-[#0F6A6A] hover:text-[#0F6A6A] transition">
            Ruko
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.slice(0, 6).map((item) => (
            <PropertyCard key={item.id} {...item} />
          ))}
        </div>

        <div className="flex justify-center mt-14">
          <Link
            href="/daftar-properti"
            className="h-12 px-8 rounded-full bg-[#0F6A6A] text-white font-medium flex items-center justify-center hover:bg-[#0C5A5A] transition"
          >
            Lihat Semua Properti
          </Link>
        </div>
      </div>
    </section>
  );
}