import PropertyCard from "./PropertyCard";
import { properties } from "@/data/properties";

export default function PropertyList() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-10 md:mb-12">
          
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-400 uppercase tracking-wide mb-2">
              Properti
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">
              Pilihan Properti
            </h2>

            <p className="text-gray-600 mt-2 max-w-md mx-auto md:mx-0 text-sm md:text-base">
              Temukan hunian terbaik sesuai kebutuhan Anda.
            </p>
          </div>

          {/* FILTER (optional static dulu) */}
          <div className="flex justify-center md:justify-end gap-4 sm:gap-6 text-sm">
            <button className="text-gray-900 font-medium border-b-2 border-[var(--primary)] pb-1">
              Semua
            </button>
            <button className="text-gray-500 hover:text-gray-900 transition">
              Dijual
            </button>
            <button className="text-gray-500 hover:text-gray-900 transition">
              Disewa
            </button>
          </div>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {properties.map((item) => (
            <PropertyCard key={item.id} {...item} />
          ))}
        </div>

      </div>
    </section>
  );
}